# Map and Game Mode Matrix

This document records the confirmed relationship between game modes and map assets. It does not imply that map loading, collision, spawning, or gameplay rules are already implemented.

## Confirmed map assignment

| Game mode | Map assignment | Relationship |
|---|---|---|
| Battle Royale | Summoner's Rift | Shares the map asset with Ranked; uses its own mode rules |
| De Clasificatoria (Ranked) | Summoner's Rift | Shares the map asset with Battle Royale; uses its own mode rules |
| Versus | Dedicated Versus map | Separate map; must not be replaced by Summoner's Rift |
| Training | Dedicated Training map | Separate training environment |

## Implementation requirements

- Keep map selection separate from game-mode rules.
- Battle Royale and Ranked may reference the same Summoner's Rift map asset, while maintaining independent mode configurations.
- Versus must load its own map assets.
- Training must load its own map assets.
- Do not infer or invent team sizes, objectives, timers, elimination rules, spawn coordinates, or victory conditions. These require explicit game-design decisions.
- Keep source map files and textures intact; do not convert or discard proprietary source formats without an approved pipeline.

## Asset locations currently recorded

- Summoner's Rift: `assets/league-of-legacy/Map/For BAttle Royale & De Clasificatoria/SummonersRift/`
- Training: `assets/league-of-legacy/Map/For Training/`

The Versus map is confirmed as a distinct map by the project owner; its exact repository path should be linked here after it is identified in the asset tree.

## Status

**Design assignment confirmed. Runtime integration pending.**

The next implementation stage should identify the exact Versus map path, then build a map registry that resolves each mode to its map and independent ruleset. Runtime loading, materials, collision, spawn points, and gameplay behavior must be validated separately.
