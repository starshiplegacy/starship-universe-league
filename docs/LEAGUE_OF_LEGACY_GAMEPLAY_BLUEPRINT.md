# League Of Legacy — Gameplay Foundation Blueprint

**Revision:** 18 November 2026  
**Repository:** `starshiplegacy/starship-universe-league` · `main`  
**Purpose:** organize the existing game assets and define the first safe, testable gameplay milestone.

## 1. Current project boundary

League Of Legacy is the game under development. Its active entry points are:

- `league-of-legacy.html` → redirects to `assets/league-of-legacy/references/New_MainMenu.html`.
- The main menu's JUGAR action → `game-modes.html`.
- `game-modes.html` → reads `map-registry.js` and resolves the selected mode/map.

The menu, character selection and map-selection flow are not themselves a playable match. Do not describe the game as multiplayer-ready.

## 2. Canonical asset organization

Keep the existing paths unchanged during this preparation pass:

| Existing path | Classification | Handling |
|---|---|---|
| `assets/league-of-legacy/characters/*.glb` | Primary 3D character assets | Canonical runtime candidates; inspect scale, orientation, materials, rig and animations before gameplay integration |
| `assets/league-of-legacy/characters/*.js` | Legacy/alternate character payloads | Preserve; compare provenance and content with GLB before deciding whether they are still needed |
| `assets/league-of-legacy/Map/For Training/` | Training map source | Candidate for first gameplay slice; rights and technical validation are still required |
| `assets/league-of-legacy/Map/Versus/` | Versus map source assets | Keep isolated by player-count mode; rights review required |
| `assets/league-of-legacy/Map/For BAttle Royale & De Clasificatoria/` | Shared Battle Royale/Ranked map source | Preserve source files; blocked until written rights clearance or replacement |
| `assets/league-of-legacy/images/` | Game identity | Icon and poster; not gameplay textures |
| `assets/league-of-legacy/references/` | Reference and legacy UI | Design/reference only unless explicitly reviewed and integrated |
| `assets/videos/Loading LOL.mp4` | Shared launch media | Keep in shared videos; do not move into the game asset folder |

Do not rename source files, flatten texture folders, duplicate large binaries, or replace one mode's map with another mode's asset just to make a preview load.

## 3. Proposed gameplay code layout

When implementation begins, new League Of Legacy runtime code should be isolated under `assets/league-of-legacy/Gameplay/` and grouped by responsibility:

```text
assets/league-of-legacy/
├── characters/              # original character models and legacy payloads
├── Map/                     # original map packages, textures and source files
├── images/                  # game icon and poster
├── references/              # menu/UI references and legacy notes
└── Gameplay/                # new runtime code (create modules only when implemented)
    ├── Core/                # game loop, lifecycle, scene bootstrap
    ├── Player/              # character controller and player state
    ├── Camera/              # follow camera and camera constraints
    ├── Physics/             # collision, gravity and ground checks
    ├── Maps/                # runtime map adapters, spawn and walkable areas
    ├── Modes/               # independent mode rulesets
    ├── UI/                  # in-match HUD, pause and result screens
    ├── Audio/               # gameplay sound routing
    ├── Network/             # future session protocol; no client-authoritative results
    └── Tests/               # repeatable gameplay and asset checks
```

This is the target layout, not a claim that these modules already exist. Keep the current menu and map selector stable while the gameplay runtime is developed separately.

## 4. First playable milestone: Training vertical slice

Build one local, single-player training session before online systems.

Required sequence:

1. Load one original or rights-cleared training environment.
2. Load one validated character model and its approved animation set.
3. Spawn the character at an authored, collision-safe position.
4. Implement keyboard movement, camera follow, ground detection and basic collision.
5. Add one simple interaction or training target.
6. Add a minimal HUD for controls/session state and a reliable reset/pause path.
7. Test loading, movement, camera, collision, animation and recovery from asset-load errors in desktop browsers.

**Do not select the current Training GLB for public/runtime use until its rights are verified and its scale, geometry, materials and collision suitability are inspected.** If it cannot be cleared, use an original greybox test arena rather than a restricted map.

## 5. Work that must remain separate

- Battle Royale and De Clasificatoria share a map assignment but have separate ruleset IDs and must retain independent rules.
- Versus 1 to 3 and Versus 4 to 5 keep their own map and rules configuration.
- The LyrieLife, CAL/CUL, Geffenite, GellyShow, Pinkie Star, Jaque Matte and other experiences are not League Of Legacy gameplay assets.
- The account, Universe Pay, portal and Supabase modules are platform services, not game simulation code.

## 6. Gates before implementation or release

| Gate | Required evidence |
|---|---|
| Asset provenance | Creator/source, license and permission recorded for each runtime asset |
| Character validation | GLB loads; dimensions, orientation, materials, rig and animations checked |
| Map validation | Rights cleared; scale, geometry, materials, collision and spawn zones checked |
| Rules design | Player counts, objectives, timers, respawns, scoring and win conditions approved per mode |
| Runtime | Movement, camera, physics and reset work in a repeatable local session |
| Multiplayer | Canonical backend confirmed; server-authoritative sessions, validation and reconnect flow designed |
| Release | Browser QA, performance checks, rights clearance and deployment approval completed |

## 7. Known blockers carried forward

- Summoner's Rift: written Riot authorization required or replace with an original map.
- Versus 1 to 3: existing CC BY-NC terms do not clear commercial use; obtain compatible permission or replace.
- Versus 4 to 5 and Training: license/provenance not verified.
- No matchmaking, authoritative match server, collision system, spawn system, navigation, scoring, respawns or win-condition engine is currently implemented.
- The configured Supabase project reference remains unconfirmed as the canonical backend. Do not change keys, URL, schema, RLS, buckets or data until confirmed.

## 8. Change-control rules

1. Preserve every original model, map, texture and source document.
2. Put new runtime code in the proposed `Gameplay/` tree; do not turn reference HTML into production code without review.
3. Update `assets/ASSET_MANIFEST.md` when assets are added, moved or replaced.
4. Update `map-registry.js` only when a map's source, rights status or runtime state has verified evidence.
5. Keep mode rules separate from map assignment.
6. Run the repository audit and syntax checks after structural or code changes.
7. Mark an item as integrated, browser-tested or deployed only after that exact step has been performed and verified.
