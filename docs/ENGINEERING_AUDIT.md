# League Of Legacy — engineering and logistics audit

**Review date:** 16 November 2026  
**Scope:** repository structure, map assets, mode routing, preview integration, rights risks, and current gameplay readiness.

## Executive assessment

The repository now has a single mode-to-map registry and a working navigation path from the League Of Legacy main menu to a mode selector. The selector has Three.js loaders prepared for GLB and OBJ/MTL/DDS. However, all map previews are intentionally gated until the relevant rights are documented. This is a technical integration milestone, not a playable match system.

## Mode and map inventory

| Mode | Assigned map | Source files | Current state |
|---|---|---|---|
| Battle Royale | Summoner's Rift | OBJ 62,969,109 bytes; MTL; 405 DDS files | Assignment retained; blocked pending written Riot authorization |
| De Clasificatoria | Summoner's Rift | Same assets | Same map; independent ruleset; same rights block |
| Versus 1 to 3 | BeginningLobby | FBX 7,818,332 bytes plus BLEND, STL, TIF and images | Blocked: included license is CC BY-NC |
| Versus 4 to 5 | Dedicated GLB | 30,607,812 bytes | Loader prepared; preview blocked until license is verified |
| Entrenamiento | Dedicated GLB | 146,204 bytes currently tracked in folder | Loader prepared; preview blocked until license is verified |

The map directory currently contains 421 files: 405 DDS, 3 MTL, 2 OBJ, 2 GLB, 1 C4D, 1 BLEND, 1 BLEND1, 1 FBX, 1 STL, 1 TIF and 3 PNG. The tracked Training folder currently exposes one GLB. If more training scenarios were delivered elsewhere, they are not currently visible in this repository path.

## Rights and licensing — release blockers

1. **Summoner's Rift:** the asset appears to reproduce Riot Games map IP. Riot's official policy names maps as protected IP and restricts using Riot IP in games/apps without applicable written authorization. The mode-to-map assignment remains recorded, but the loader is blocked. Obtain written permission or replace it with an original map. Source: https://www.riotgames.com/es-419/informacion-legal
2. **Versus 1 to 3:** the checked-in LICENSE.txt states Creative Commons Attribution–Non-Commercial. The accompanying README identifies the model source as Omeleto / Thingiverse. A non-commercial license is not sufficient for a commercial/company game. Obtain a compatible license from the rights holder or replace the asset.
3. **Versus 4 to 5 and Training:** no license document was found in their map folders during this review. Confirm ownership or obtain licenses before preview/public release.
4. **Other Summoner's Rift textures:** the MTL references a large set of DDS files. The presence of the files in the repository does not establish redistribution rights.

The registry requires `licenseStatus: "cleared"` before enabling map preview. Do not change a map to `cleared` without a rights basis.

## Runtime and performance

- The Summoner's Rift OBJ is about 60 MiB. 112 unique DDS textures referenced by the MTL total about 215.5 MiB. A browser preview would therefore be expensive in download, memory and decode time.
- The original Summoner's Rift MTL uses absolute Windows paths. It is unsuitable for direct deployment without a rights-cleared runtime conversion and texture-path audit. A temporary runtime MTL was created during this task and removed after the licensing review; original assets were left intact.
- Versus 4 to 5's GLB is about 29.2 MiB. Training's GLB is small, but size alone does not validate scale, geometry, materials or collisions.
- The current preview page includes GLTFLoader and OBJLoader/MTLLoader/DDSLoader paths. These are prepared code paths; map rendering has not been browser-tested in this task.

## Application architecture — current boundary

### Connected
- Main-menu `JUGAR` routes to `game-modes.html`.
- `map-registry.js` is the canonical mode/map registry.
- Battle Royale and Clasificatoria point to the same map ID but different ruleset IDs.
- Versus 1 to 3, Versus 4 to 5 and Training have separate map IDs.
- Preview loading is gated by license status.

### Not implemented
- Matchmaking, lobbies, invites and player queues.
- Server-authoritative match state, team assignment and anti-cheat validation.
- Player caps, team sizes, objectives, timers, scoring, respawns and win conditions.
- Spawn coordinates, collision meshes, physics, navigation meshes and pathfinding.
- Map optimization, LOD, streaming/chunking and texture compression.
- Real browser visual QA across desktop/mobile.
- Production deployment.

## Backend and data governance

The shared frontend configuration currently points to Supabase project `wvyveduslbsuvyekeccf`. Other Supabase project IDs have appeared in the wider project history, and the canonical backend for League Of Legacy has not been confirmed. No schema, credentials, tables or policies were changed during this map integration. Before implementing matchmaking or persistence, confirm the canonical project and document the data model, RLS policies, realtime usage and server-side authority.

## Recommended implementation order

1. **Rights clearance:** get written permission or replace assets; record evidence and attribution.
2. **Asset validation:** inspect GLB/OBJ dimensions, orientation, material coverage, texture references, geometry complexity and memory.
3. **Map preparation:** generate and review collision meshes, navmesh, walkable areas and spawn markers from authored source data.
4. **Rules design:** specify exact team/player limits, objectives, round duration, respawns, scoring and win conditions per mode. Shared maps must not imply shared rules.
5. **Match architecture:** build server-authoritative match state, matchmaking/lobbies, reconnect handling and result persistence.
6. **Browser QA:** test map loading and controls on desktop/mobile, including low-memory behavior and network failures.
7. **Release gate:** enable a map only after rights, visual QA, collision/spawn validation and mode tests pass.

## Current release recommendation

**Do not deploy this map selector as a playable map experience yet.** The navigation and loader architecture are prepared, but the map rights are unresolved and no match simulation exists. Keep the project in development until the release gates above are met.
