#!/usr/bin/env python3
"""Static repository and optional Supabase drift audit. Uses only Python stdlib."""
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
REQUIRED_TABLES = {
    "game_saves", "gallery_posts", "gallery_starlights", "gallery_comments",
    "gallery_mentions", "creator_verification_applications", "user_feedback",
}
MODEL_NAMES = ["Charlotte", "Arthur", "Bella", "Emma", "Aquamarine", "Opal (Opalo)", "Optopool", "Stella"]\nWORLD_NAMES = ["Kataleya.world", "Kariskio.world", "Solnang.world", "abandoned-island.world"]


def tracked_text_files():
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        if any(part in {".git", "node_modules", ".venv"} for part in path.parts):
            continue
        yield path


def static_audit():
    errors, warnings = [], []
    refs = set()
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
            if not value or value.startswith(("http://", "https://", "data:", "blob:", "//", "mailto:", "tel:")):
                continue
            if value.startswith(("/", "{", "${")) or "://" in value:
                continue
            if any(token in value for token in ("<%", "${", "{{")):
                continue
            target = (file.parent / value).resolve()
            try:
                target.relative_to(ROOT)
            except ValueError:
                warnings.append(f"External/escaping local reference skipped: {file.relative_to(ROOT)} -> {raw}")
                continue
            if not target.exists():
                errors.append(f"Missing local asset: {file.relative_to(ROOT)} -> {raw}")
    if len(project_refs) > 1:
        errors.append("Multiple hard-coded Supabase projects found: " + ", ".join(sorted(project_refs)))
    if not project_refs:
        warnings.append("No hard-coded Supabase project ref found; check runtime config.")
    for ref, files in sorted(project_refs.items()):
        print(f"Supabase ref in source: {ref} ({', '.join(sorted(files))})")
    print(f"Static reference scan: {len(errors)} errors, {len(warnings)} warnings")
    for item in errors:
        print("ERROR:", item)
    for item in warnings:
        print("WARN:", item)
    return errors


def request_json(url: str, api_key: str):
    req = urllib.request.Request(url, headers={"apikey": api_key, "Authorization": f"Bearer {api_key}", "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def remote_audit():
    url = os.getenv("SUPABASE_URL", "").strip().rstrip("/")
    key = os.getenv("SUPABASE_ANON_KEY", "").strip()
    expected = os.getenv("SUPABASE_EXPECTED_PROJECT_REF", "").strip()
    if not (url and key and expected):
        print("Supabase remote audit: SKIPPED (configure SUPABASE_URL, SUPABASE_ANON_KEY secret and SUPABASE_EXPECTED_PROJECT_REF variable).")
        return 0
    actual = urlparse(url).hostname.split(".")[0] if urlparse(url).hostname else ""
    if actual != expected:
        print(f"ERROR: Supabase project ref mismatch: expected {expected}, URL points to {actual or 'unknown'}.")
        return 1
    errors = []
    try:
        request_json(f"{url}/auth/v1/health", key)\n        schema = request_json(f"{url}/rest/v1/", key)
        paths = schema.get("paths", {}) if isinstance(schema, dict) else {}
        exposed = {path.strip("/").split("/")[0] for path in paths}
        missing_tables = REQUIRED_TABLES - exposed
        if missing_tables:
            errors.append("Missing/unexposed REST tables: " + ", ".join(sorted(missing_tables)))
        buckets = request_json(f"{url}/storage/v1/bucket", key)
        names = {item.get("name") for item in buckets if isinstance(item, dict)} if isinstance(buckets, list) else set()
        missing_buckets = REQUIRED_BUCKETS - names
        if missing_buckets:
            errors.append("Missing/inaccessible Storage buckets: " + ", ".join(sorted(missing_buckets)))
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, ValueError, json.JSONDecodeError) as exc:
        errors.append(f"Supabase health/schema request failed: {exc}")
    if errors:
        for item in errors:
            print("ERROR:", item)
        return 1
    print(f"Supabase remote audit: OK ({actual}); required tables and buckets exposed.")
    return 0


if __name__ == "__main__":
    errors = static_audit()
    remote = remote_audit()
    sys.exit(1 if errors or remote else 0)
