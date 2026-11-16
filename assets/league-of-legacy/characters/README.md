# League Of Legacy — personajes 3D

Los ocho modelos GLB se encuentran publicados en esta carpeta. Los nombres son sensibles a mayúsculas/minúsculas y deben coincidir exactamente con las opciones del selector:

| Archivo | Selector |
|---|---|
| `Charlotte.glb` | Charlotte |
| `Arthur.glb` | Arthur |
| `Bella.glb` | Bella |
| `Emma.glb` | Emma |
| `Aquamarine.glb` | Aquamarine |
| `Opal (Opalo).glb` | Opal (Opalo) |
| `Optopool.glb` | Optopool |
| `Stella.glb` | Stella |

El menú `league-of-legacy.html` construye la ruta `./assets/league-of-legacy/characters/<nombre>.glb` a partir del selector. Por eso se conserva la capitalización exacta de cada archivo.

El visor usa Three.js `GLTFLoader`, `MeshoptDecoder` y `DRACOLoader`. Los tres modelos originales Charlotte, Arthur y Bella tienen detalles de compresión/animación documentados en el inventario; no asumir que todos los demás modelos tienen el mismo rig, compresión o animaciones hasta inspeccionarlos individualmente.

**Separación de proyectos:** estos modelos pertenecen a League Of Legacy. No copiarlos a CAL/CUL ni tratarlos como avatares de The LyrieLife.
