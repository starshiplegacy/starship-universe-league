# CAL/CUL — Create A Lyrie / Crear Un Lyrie

## Integración implementada
- El menú inicial de The LyrieLife incorpora **Crear un Lyrie · CAL/CUL** y abre `cal-cul.html`.
- El creador permite seleccionar la base masculina o femenina, introducir nombre, tono de piel de previsualización, pronombres y personalidad inicial.
- Las fichas se guardan en el almacenamiento local del navegador.
- El visor 3D busca `assets/The-LyrieLife/CAL-CUL/models/lyrie_male.glb` y `lyrie_female.glb`.

## Archivos fuente
El conversor espera una carpeta fuente local `CAL_CUL_converted/` con `male/blender.Fbx`, `female/blender.Fbx` y sus texturas WebP. Esos archivos fuente no están actualmente publicados en `assets/The-LyrieLife/CAL-CUL/`; las carpetas `characters/`, `models/` y `textures/` solo contienen placeholders. No confundir `Emma.fbx` de League Of Legacy con los modelos de CAL/CUL.

## Conversión a GLB
El entorno de edición no dispone de Blender; por tanto, los GLB todavía no se han generado ni validado. Con Blender 4.2+ ejecuta:

```bash
blender --background --python tools/convert_cal_cul.py -- --source ./CAL_CUL_converted --output ./assets/The-LyrieLife/CAL-CUL/models
```

El script importa los FBX, intenta relocalizar mapas WebP por nombre, exporta GLB con armature, morph targets y animaciones, y crea un informe por personaje. Revisa `unresolved_images` antes de publicar.

Los GLB deben quedar en `assets/The-LyrieLife/CAL-CUL/models/`. Los FBX y mapas de textura fuente deben conservarse en sus carpetas originales. No ejecutar la conversión hasta disponer de los dos modelos correctos y sus texturas. Los GLB resultantes deben revisarse antes de conectarlos al creador.
