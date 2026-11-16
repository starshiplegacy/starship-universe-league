# Map and Game Mode Matrix

This is the canonical assignment of League Of Legacy modes to their map assets. Map selection and rulesets are separate: two modes may share one map without sharing gameplay rules.

## Confirmed assignments

| Mode | Map | Asset / format | Status |
|---|---|---|---|
| Battle Royale | Summoner's Rift | `For BAttle Royale & De Clasificatoria/SummonersRift/SummonersRift.obj` + MTL/DDS | Source-only; renderer pipeline pending |
| De Clasificatoria | Summoner's Rift | Same map assets as Battle Royale | Source-only; independent ruleset |
| Versus 1 to 3 | Versus 1 to 3 | `Versus/Versus 1 to 3/files/BeginningLobby.fbx` | License review required; CC BY-NC |
| Versus 4 to 5 | Versus 4 to 5 | `Versus/Versus 4 to 5/battle_guys_map_500th_model.glb` | GLB preview candidate; validation pending |
| Entrenamiento | Training | `For Training/For_Training.glb` | GLB preview candidate; validation pending |

## Ruleset separation

The registry assigns a distinct ruleset ID to every mode:
- `battle-royale` and `ranked` share `summoners-rift`, but have independent ruleset IDs.
- `versus-1-to-3` and `versus-4-to-5` use their own map and ruleset.
- `training` uses its own map and ruleset.

Team sizes, player caps, objectives, timers, respawns, spawn coordinates, scoring, and victory conditions remain **undefined** until the game owner specifies them. No defaults are silently applied.

## Important licensing finding

The `Versus 1 to 3/LICENSE.txt` file identifies the included Thingiverse asset by Omeleto and states **Creative Commons — Attribution — Non-Commercial**. The accompanying README describes it as a low-detail waiting lobby. Therefore:
- Keep the files preserved as source assets.
- Do not use this asset in a commercial release or production build until commercial rights are obtained or the asset is replaced with a suitably licensed model.
- Attribution and non-commercial restrictions must be reviewed before enabling this map in production.

## Runtime integration contract

The canonical registry is `map-registry.js` at the repository root. Import it from the match/preview layer:
- `getGameMode(modeId)` resolves a mode.
- `getMapForMode(modeId)` resolves its assigned map.
- `getModeLaunchInfo(modeId)` returns map + independent ruleset metadata and preview eligibility.
- `assertMapAllowedForProduction(modeId)` blocks maps with unresolved licensing or non-ready formats.

The registry does **not** claim that a map is playable. Summoner's Rift still needs OBJ/MTL/DDS material handling; the two GLBs need scale, materials, collision and spawn validation. The FBX map remains blocked for production pending license clearance.

## Asset integrity

Original source files and folder names are preserved. No conversion, deletion, renaming, collision generation, or spawn-point invention is performed by the registry.
