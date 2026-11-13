# League Of Legacy — playable combat foundation

Original fantasy 5v5 MOBA-inspired arena prototype. This is an original game implementation; it does not copy League of Legends assets, characters, map art or code.

## Implemented prototype
- Third-person free orbit camera (mouse drag + wheel zoom).
- WASD / arrow movement.
- 5v5 training field: player + four allied bots against five enemy bots.
- Three enemy Localizer Towers with health and destruction state.
- Basic attack by left-click or Space.
- Forest Shadowmonters chase and attack; defeating one converts it to an allied unit.
- Collectible essence orbs.
- Match timer, player health, team count and objective HUD.
- Pause / resume / leave match.
- Original procedural placeholder character models.

## Deliberately pending
- Exact user-defined hero roster and each character's powers: the hero/power registry is intentionally not populated with invented entries.
- Ability effects and per-character balance until the approved roster data is connected.
- Online matchmaking, authoritative game server, latency handling and anti-cheat. Current 5v5 is local training against bots, not online multiplayer.
- Final character GLBs, VFX, audio and original Loading 01.mp4 asset. The loading screen requests assets/Loading 01.mp4 and falls back to an original title animation if that file is not present.

## Controls
- WASD / arrows: move.
- Mouse drag: free camera.
- Mouse wheel: zoom.
- Left click / Space: basic attack.
- Escape: pause.
