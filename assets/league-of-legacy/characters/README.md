# League Of Legacy — personajes 3D

Copia los modelos originales en esta carpeta con estos nombres exactos:

- `charlotte.glb` — personaje riggeado, 56 animaciones, compresión Meshopt.
- `arthur.glb` — personaje riggeado, animación `Default`, compresión Draco.
- `bella.glb` — modelo estático, sin rig ni animaciones.

El menú `league-of-legacy.html` los carga desde estas rutas y ofrece un selector de personaje. La lista de animaciones se adapta al modelo seleccionado.

Los tres archivos ya están en GLB 2.0 y contienen sus imágenes/texturas. No se necesita conversión FBX ni extracción manual de texturas. El visor utiliza Three.js `GLTFLoader`, `MeshoptDecoder` y `DRACOLoader`.

**Separación de proyectos:** estos modelos son recursos de League Of Legacy. No deben copiarse a `CUL_CAS` ni tratarse como avatares de The LyrieLife.
