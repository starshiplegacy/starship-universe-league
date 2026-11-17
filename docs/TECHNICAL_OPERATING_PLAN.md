# STARSHIP UNIVERSE LEAGUE — Technical operating plan

**Last reviewed:** 2026-11-17  
**Repository:** `starshiplegacy/starship-universe-league` · `main`

## 1. Product boundaries

| Area | Responsibility | Source of truth |
|---|---|---|
| Public/private web shell | Landing, navigation, auth entry points, account UI | GitHub |
| The LyrieLife | World selection, life-simulation prototype, save integration | GitHub for code/assets; Supabase for cloud saves |
| League Of Legacy | Eight-character viewer and future multiplayer game | GitHub for code/GLB assets; Supabase for future game data |
| Astronaut mini-games | Jaque Matte and Pinkie Star (Mahjong Solitaire) | GitHub for game code/assets; local/cloud saves only after backend confirmation |
| Geffenite | VIP beta battle-royale prototype | GitHub for gameplay/docs/assets; frontend gate consumes `starship-entitlements`; active-status validation is server-side |
| GellyShow | Standalone 2D dress-up and runway game | GitHub for gameplay/docs/assets; online mode requires a future server |
| Community | Gallery, comments, reactions, profile media | Supabase data/Storage; GitHub for client code |
| CAL/CUL | Character creator and conversion pipeline | GitHub for tools; original source assets remain immutable |
| Shared platform | Auth, profiles, settings, entitlements | Supabase after canonical project is confirmed |

## 2. Current verified blockers

1. Shared browser config is centralized in `supabase-config.js`; it preserves the existing target ref `wvyveduslbsuvyekeccf`, which is not yet confirmed as canonical.
2. Connected Supabase project `uyhcocdknweqvcqgbnez` is not schema-aligned with current client expectations.
3. Connected project `fixwovymcfpfididtmud` is a separate catalog/Django backend and must not be reused for these games.
4. Cloud save, gallery, avatar Storage, creator verification, and feedback resources are not yet verified on the frontend's configured project.
5. The world files are preserved under `assets/The-LyrieLife/Worlds/<world>/`; the browser prototype currently renders CSS-based environments and does not parse proprietary `.world` formats.
6. League Of Legacy currently provides a Three.js GLB character viewer, not a completed multiplayer gameplay loop.

## 3. Delivery phases

### Phase 0 — Protect and baseline
- Keep the repository private and preserve `main`.
- Keep proprietary archives and source formats unchanged.
- Do not deploy while backend identity is unresolved.
- Run the repository audit on pushes, pull requests, manually, and daily.
- Record every backend schema change as a versioned SQL migration in GitHub.

### Phase 1 — Canonical backend and synchronization
- Identify the Supabase project ref configured by the frontend.
- Set repository Actions secret `SUPABASE_URL`.
- Set repository Actions secret `SUPABASE_ANON_KEY` (publishable/anon only; never service-role).
- Set repository Actions variable `SUPABASE_EXPECTED_PROJECT_REF`.
- Run the scheduled drift audit and resolve every mismatch.
- Confirm schema, RLS, grants, Storage buckets, and Storage object policies before enabling client features.

### Phase 2 — Shared platform
- Centralize Supabase client creation in one module.
- Remove duplicate URL/key literals from game pages.
- Define shared contracts for profiles, settings, entitlements, and session events.
- Test sign-up, sign-in, sign-out, session refresh, account settings, and avatar upload with real test accounts.
- Keep secrets server-side; browser code may contain only publishable/anon keys.

### Phase 3 — The LyrieLife
- Define save schema and ownership policies before enabling cloud saves.
- Validate local save/load and cloud save/load separately.
- Document the original `.world` file format and legal/technical loading requirements.
- Build a converter/importer only after the format is understood; do not pretend CSS scenes are imported worlds.
- Verify each world asset by filename, size, hash, and loader compatibility.

### Phase 4 — League Of Legacy
- Verify every GLB path and model load, including loading/error states.
- Add asset metadata (source, licence/permission, size, hash, scale, rig/animation status).
- Keep Play disabled until gameplay and multiplayer services exist.
- Define game session, player, match, and progression contracts before creating tables.

### Phase 5 — Quality and release
- Automated static path audit and JavaScript syntax checks.
- Browser smoke tests on desktop and mobile.
- Accessibility, responsive layout, and error-state checks.
- Performance budgets for large GLB/video assets.
- Release checklist, rollback point, and deployment approval.

## 4. Database governance

- Never modify an unconfirmed Supabase project.
- Every table must have a documented purpose, primary key, timestamps, and ownership model.
- Enable RLS and write explicit SELECT/INSERT/UPDATE/DELETE policies for every user-facing table.
- Storage buckets need explicit public/private decisions and object-level policies.
- Never use a service-role key in HTML, JavaScript, or GitHub repository files.
- Avoid duplicate concepts: inspect existing `profiles`, `user_settings`, `posts`, `comments`, `starlights`, and messaging tables before designing new equivalents.
- A migration is complete only after its version is committed and the target project's live schema is verified.

## 5. GitHub governance

- `main` is the stable integration branch; use short feature branches for risky changes.
- Keep code, SQL migrations, static assets, manifests, and operating docs versioned.
- Store CI credentials in GitHub Actions secrets/variables only.
- Do not upload large original archives or generated cache files without an explicit asset policy.
- Every change should include: purpose, affected paths, data impact, validation, and rollback notes.

## 6. Monitoring

The workflow `.github/workflows/repo-audit.yml` runs on pushes, pull requests, manual dispatch, and daily schedule. It checks local references and source configuration. The remote Supabase portion activates only after the three GitHub Actions settings above are configured. Until then, the workflow reports that remote monitoring is skipped rather than guessing which backend is canonical.

## 7. Definition of ready

A game area is ready for continued development only when:
- all referenced local assets exist;
- all asset paths and names are case-correct;
- client configuration points to the approved project;
- backend tables and buckets exist and are exposed intentionally;
- RLS and Storage policies are reviewed;
- save/load or game-specific persistence has a tested contract;
- desktop/mobile smoke tests pass;
- the current state and known limitations are documented.


## Map integration status (16 November 2026)

See [ENGINEERING_AUDIT.md](ENGINEERING_AUDIT.md) for the full map inventory, rights blockers, runtime limitations and recommended order. The main-menu-to-mode-selector route and format-specific preview loaders are prepared. All map previews remain gated until license status is documented as cleared. No matchmaking, physics, collisions, spawn points or authoritative match simulation is claimed as implemented.


## Additional experiences — inventory update (2026-11-17)

- **Geffenite:** keep gameplay, design/map documentation, VIP requirements, and images under `assets/Geffenite/{gameplay,docs,images}/`. Preserve the VIP gate. The frontend consumes entitlements/plan returned by `starship-entitlements`; confirm active-status and expiry checks in that remote function. Treat the map HTML as a design reference, not a production map engine.
- **GellyShow:** keep its standalone HTML, Markdown documentation, and images under `assets/GellyShow/{Gameplay,Docs,Images}/`. The documented online mode is not ready because it requires a server. A catalog route and install-to-library flow are now present; browser QA remains pending. The Online mode still requires a server.
- Preserve original capitalization, spaces, extensions, and the existing `(Postel).jpg` filenames. Update the asset manifest and documentation index whenever these paths change.


## Uniform game installation flow (2026-11-17)

Every catalog game, including free/demo titles, must follow **Store/Catalog → Download/Install → Installed Games → Play**. Free access removes the payment step, not installation. Jaque Matte, Pinkie Star, and GellyShow are included in this flow; Geffenite retains its active VIP entitlement gate. The current 60-second installation progress is a demo simulation that registers the game in the account-keyed browser library; it does not download a native package or synchronize installs across devices.
