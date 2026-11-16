# CAL/CUL — Create A Lyrie / Crear Un Lyrie

## Integración implementada
- El menú inicial de The LyrieLife incorpora **Crear un Lyrie · CAL/CUL** y abre `cal-cul.html`.
- El creador permite seleccionar la base masculina o femenina, introducir nombre, tono de piel de previsualización, pronombres y personalidad inicial.
- Las fichas se guardan en el almacenamiento local del navegador.
- El visor 3D busca `assets/cal-cul/models/lyrie_male.glb` y `lyrie_female.glb`.

## Archivos fuente
Los paquetes recibidos contienen modelos FBX binarios de generación RL_CC3_Plus, metadatos Blender y mapas BMP. Se conservaron los FBX y se prepararon las texturas como WebP sin pérdida, manteniendo sus carpetas.

## Conversión a GLB
El entorno de edición no dispone de Blender; por tanto, los GLB todavía no se han generado ni validado. Con Blender 4.2+ ejecuta:

```bash
blender --background --python tools/convert_cal_cul.py -- --source ./CAL_CUL_converted --output ./assets/cal-cul/models
```

El script importa los FBX, intenta relocalizar mapas WebP por nombre, exporta GLB con armature, morph targets y animaciones, y crea un informe por personaje. Revisa `unresolved_images` antes de publicar.

Los GLB deben quedar en `assets/cal-cul/models/`. Los FBX y mapas de textura pesados no se suben en este commit; usa Git LFS o un almacenamiento de assets para publicarlos.
