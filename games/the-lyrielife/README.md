# The LyrieLife — browser prototype

Standalone static browser game in its own folder and deployment.

## Prototype scope
- Character naming, personality and aspiration selection.
- Small Three.js 3D starter lot.
- WASD / arrow-key movement.
- Free orbit camera: drag to rotate, wheel to zoom.
- Five needs and six simple activities.
- Browser-local save and continue.
- Responsive HUD and five theme choices.

## Generated GLB assets
Put the files in the assets folder:
- assets/lyrie-character.glb — generated Lyrie character, 29,185 triangles, 1.70 m.
- assets/starter-home.glb — generated starter home, 44,913 triangles.

Until the files are transferred, the game uses procedural placeholder meshes and logs a console note. Source projects:
- https://creations3d.com/models/IF1QLpnTiPkDq0EpK1Eb
- https://creations3d.com/models/ruUPCBY1G1xtDWs8Beeu

## Run
Serve this folder over HTTP. ES modules and GLTF loading do not work reliably from file://.

## Not implemented yet
Detailed body/face/hair/clothing customization, NPCs, relationships, careers, furniture navigation, build mode, cloud saves, full localization and multiplayer. This is a first playable prototype, not a complete life simulator.
