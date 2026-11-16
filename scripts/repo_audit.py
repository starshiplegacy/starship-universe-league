#!/usr/bin/env python3
"""Static repository and optional Supabase drift audit. Python standard library only."""
from __future__ import annotations

import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
TEXT_SUFFIXES = {".html", ".js", ".css"}
SUPABASE_RE = re.compile(r"https://([a-z0-9-]+)\.supabase\.co", re.I)
ATTR_RE = re.compile(r"""\b(?:src|href)\s*=\s*["']([^"'#]+)["']""", re.I)
CSS_URL_RE = re.compile(r"""url\(\s*["']?([^"'\)]+)""", re.I)
MODEL_NAMES = ["Charlotte", "Arthur", "Bella", "Emma", "Aquamarine", "Opal (Opalo)", "Optopool", "Stella"]
WORLD_NAMES = ["Kataleya.world", "Kariskio.world", "Solnang.world", "abandoned-island.world"]
REQUIRED_TABLES = {
    "game_saves", "gallery_posts", "gallery_starlights", "gallery_comments",
    "gallery_mentions", "creator_verification_applications", "user_feedback",
}


def tracked_text_files():
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        if any(part in {".git", "node_modules", ".venv"} for part in path.parts):
            continue
        yield path


def static_audit():
    errors, warnings = [], []
    project_refs = {}
    for file in tracked_text_files():
        try:
            content = file.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        for match in SUPABASE_RE.finditer(content):
            project_refs.setdefault(match.group(1), set()).add(file.relative_to(ROOT).as_posix())
        candidates = []
        if file.suffix.lower() == ".html":
            candidates.extend(ATTR_RE.findall(content))
        if file.suffix.lower() in {".html", ".css"}:
            candidates.extend(CSS_URL_RE.findall(content))
        for raw in candidates:
            value = raw.strip().split("?", 1)[0].split("#", 1)[0]
            if not value or value.startswith(("http://", "https://", "data:", "blob:", "//", "mailto:", "tel:", "javascript:", "var(")):
                continue
            if value.startswith(("/", "{")) or "://" in value:
                continue
            if any(token in value for token in ("<%", "$" + "{", "{{")):
                continue
            target = (file.parent / value).resolve()
            try:
                target.relative_to(ROOT)
            except ValueError:
                warnings.append(f"Reference escapes repository: {file.relative_to(ROOT)} -> {raw}")
                continue
            if not target.exists():
                errors.append(f"Missing local reference: {file.relative_to(ROOT)} -> {raw}")

    if len(project_refs) > 1:
        errors.append("Multiple hard-coded Supabase projects found: " + ", ".join(sorted(project_refs)))
    if not project_refs:
        warnings.append("No hard-coded Supabase project ref found; check runtime config.")
    for ref, files in sorted(project_refs.items()):
        print(f"Supabase ref in source: {ref} ({', '.join(sorted(files))})")

    character_dir = ROOT / "assets/league-of-legacy/characters"
    for name in MODEL_NAMES:
        if not (character_dir / f"{name}.glb").is_file():
            errors.append(f"Missing model: assets/league-of-legacy/characters/{name}.glb")

    world_dir = ROOT / "assets/The-LyrieLife/Worlds"
    for name in WORLD_NAMES:
        if not (world_dir / name).is_file():
            errors.append(f"Missing world source: assets/The-LyrieLife/Worlds/{name}")

    launch = ROOT / "launch.html"
    if launch.exists():
        launch_text = launch.read_text(encoding="utf-8")
        videos = re.findall(r'loading\s*:\s*["\']([^"\']+\.mp4)["\']', launch_text, re.I)
        videos += re.findall(r'file\s*:\s*["\']([^"\']+\.mp4)["\']', launch_text, re.I)
        for video in set(videos):
            if not (ROOT / "assets/videos" / video).is_file():
                errors.append(f"Missing launch video: assets/videos/{video}")

    print(f"Static audit: {len(errors)} errors, {len(warnings)} warnings")
    for item in errors:
        print("ERROR:", item)
    for item in warnings:
        print("WARN:", item)
    return errors


def request_json(url: str, api_key: str):
    request = urllib.request.Request(
        url,
        headers={"apikey": api_key, "Authorization": f"Bearer {api_key}", "Accept": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def remote_audit():
    url = os.getenv("SUPABASE_URL", "").strip().rstrip("/")
    key = os.getenv("SUPABASE_ANON_KEY", "").strip()
    expected = os.getenv("SUPABASE_EXPECTED_PROJECT_REF", "").strip()
    if not (url and key and expected):
        print("Supabase remote audit: SKIPPED; configure SUPABASE_URL and SUPABASE_ANON_KEY secrets plus SUPABASE_EXPECTED_PROJECT_REF variable.")
        return 0

    hostname = urlparse(url).hostname or ""
    actual = hostname.split(".")[0]
    if actual != expected:
        print(f"ERROR: Supabase ref mismatch: expected {expected}, URL points to {actual or 'unknown'}.")
        return 1

    errors = []
    try:
        request_json(f"{url}/auth/v1/health", key)
        schema = request_json(f"{url}/rest/v1/", key)
        paths = schema.get("paths", {}) if isinstance(schema, dict) else {}
        exposed = {path.strip("/").split("/")[0] for path in paths}
        missing = REQUIRED_TABLES - exposed
        if missing:
            errors.append("Missing or unexposed REST tables: " + ", ".join(sorted(missing)))
        print("Storage bucket inventory is intentionally not queried with a browser publishable key; verify bucket existence and object policies in Supabase.")
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, ValueError, json.JSONDecodeError) as exc:
        errors.append(f"Supabase health/schema request failed: {exc}")

    if errors:
        for item in errors:
            print("ERROR:", item)
        return 1
    print(f"Supabase remote audit: OK ({actual}); Auth and required REST tables are reachable.")
    return 0


if __name__ == "__main__":
    static_errors = static_audit()
    remote_status = remote_audit()
    sys.exit(1 if static_errors or remote_status else 0)
