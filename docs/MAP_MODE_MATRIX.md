# Map and Game Mode Matrix

Map assignment and rulesets are independent. The registry is `map-registry.js`; this page is the human-readable source of truth.

## Mode assignments

| Mode | Map | Runtime asset | Preview state |
|---|---|---|---|
| Battle Royale | Summoner's Rift | OBJ + original MTL + DDS | **Blocked pending written Riot license** |
| De Clasificatoria | Summoner's Rift | Same map assets | **Blocked pending written Riot license**; separate ruleset ID |
| Versus 1 to 3 | Own map | BeginningLobby.fbx | Disabled pending CC BY-NC rights review |
| Versus 4 to 5 | Own map | battle_guys_map_500th_model.glb | Loader implemented; blocked pending license verification |
| Entrenamiento | Own map | For_Training.glb | Loader implemented; blocked pending license verification |

## What is connected now

- The League Of Legacy menu's JUGAR button opens `game-modes.html`.
- The mode selector reads `map-registry.js` and resolves the map assigned to each mode.
- GLB loaders are implemented for Versus 4 to 5 and Entrenamiento, but preview is gated until their licenses are confirmed.
- Summoner's Rift remains assigned to Battle Royale and Clasificatoria in the registry, but its loader is blocked pending written authorization. No modified runtime MTL is retained.
- Battle Royale and Clasificatoria share one map but have different ruleset IDs.
- Versus 1 to 3 and Summoner's Rift remain blocked and are not loaded by the preview page.

## Licensing / asset provenance

`Versus 1 to 3/LICENSE.txt` states Creative Commons Attribution–Non-Commercial and identifies the source as Omeleto / Thingiverse. This is not cleared for commercial use. The map stays disabled until a compatible license or written permission is obtained. Do not treat attribution alone as permission for commercial use.

The Summoner's Rift assets appear to reproduce Riot Games intellectual property. Riot's official [Legal Jibber Jabber policy](https://www.riotgames.com/es-419/informacion-legal) explicitly includes maps among protected IP and says Riot IP may not be used in games or apps without an applicable written license/API authorization. Since this repository is a game/app project and is associated with an entertainment company, this map is blocked pending written permission or replacement with an original, rights-cleared map. This is a risk flag, not legal advice.

Other map asset license status has not yet been verified. Their presence in the repository is not proof of redistribution or commercial-use rights.

## Technical findings and limits

- Summoner's Rift contains a 62,969,109-byte OBJ and 405 DDS texture files in the repository. The source MTL contains absolute Windows paths; a temporary runtime MTL was created during analysis, then removed after the licensing review. The original MTL and all original map assets remain unchanged.
- The map preview page has format-specific loaders prepared, but does not create physics, navigation meshes, collision shapes, spawn points, player teams, networking, matchmaking, scoring, respawns, timers or victory conditions.
- GLB presence does not prove the model is optimized or correctly scaled. Preview loading is a first visual integration step only.
- The repository currently lists one GLB under `For Training`; if additional training maps exist outside this path, they are not currently discoverable in the tracked tree.
- Versus 1 to 3 has several source formats (BLEND, FBX, STL, TIF and PNG references). The FBX is the chosen runtime candidate but remains license-blocked.

## Next engineering stages

1. Verify the preview in a real browser and inspect model orientation, scale, texture completeness and memory.
2. Confirm licenses for every map and texture set.
3. Define each mode's player limits, team structure, objectives, timers, respawn policy and win condition.
4. Add collision/physics and authored spawn points per map.
5. Connect match state and multiplayer authority; never trust client-side win/score decisions.
6. Only then enable production launch.
