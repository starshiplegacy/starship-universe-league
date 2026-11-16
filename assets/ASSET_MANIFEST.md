# Inventario de assets de STARSHIP UNIVERSE LEAGUE

**Última revisión:** 16 de noviembre de 2026  
**Regla:** los nombres y mayúsculas/minúsculas son parte de la ruta. No renombrar sin actualizar el código y volver a ejecutar la auditoría.

## 1. League Of Legacy — recursos visuales

La estructura visual queda unificada en `assets/league-of-legacy/images/`. Iconos, imágenes e ilustraciones deben guardarse directamente en esa carpeta, sin subcarpetas. No crear directorios `icons/` ni `illustrations/`. Se conservarán nombres descriptivos y extensiones originales. La revisión del 16 de noviembre de 2026 encontró únicamente archivos `.gitkeep` en las tres carpetas anteriores; no había recursos visuales reales que trasladar. Los placeholders de `icons/` e `illustrations/` se retiraron y `images/` queda como único destino.

## 2. League Of Legacy — modelos GLB

Los ocho archivos existen en GitHub bajo assets/league-of-legacy/characters/. El selector de league-of-legacy.html usa exactamente estos nombres:

| Archivo | GitHub blob SHA | SHA-256 de origen |
|---|---|---|
| Charlotte.glb | 6601f8a5be94163daee2fd8f5d9a8d71a2e69e6a | No recalculado desde GitHub |
| Arthur.glb | fade06893b056e7121445a4d52c08d30efa74326 | No recalculado desde GitHub |
| Bella.glb | cb782c11c8b4c5571c09d152c876d56dfec4f4c9 | No recalculado desde GitHub |
| Emma.glb | 11fc54d8c51a5c7516f00eee19208c3e56ab7276 | Pendiente |
| Aquamarine.glb | e5a60be889c4240a1c2f9a3163a67b0c9ba213f8 | Pendiente |
| Opal (Opalo).glb | e2352202cab34b3551ea0049a6d12578e963ea59 | Pendiente |
| Optopool.glb | 20b3324b6ee90cf33c1b30d031fdf8dbbf66ec60 | Pendiente |
| Stella.glb | 914b5d607360669d264bf5e57155d2a58a97c964 | Pendiente |

Los SHA indicados son Git blob IDs devueltos por GitHub, no SHA-256 de los archivos. El conector confirmó la existencia de los ocho archivos, pero no expuso los bytes de los binarios para recalcular sus hashes. Los datos de compresión, rig y animación de cada modelo deben verificarse individualmente antes de asumir compatibilidad.

## 3. Vídeos de inicio

Los tres archivos existen en assets/videos/ y sus rutas coinciden con launch.html.

| Archivo | GitHub blob SHA | Uso |
|---|---|---|
| UNIVERSE LEAGUE (Opening).mp4 | f90c6494af0d8e8ede90f5a4119bf277bbec9d06 | Opening universal compartido |
| Lyrie Loanding.mp4 | e54746fd888f5816e9ae48c40a54a31ae89539a9 | Carga de The LyrieLife |
| Loading LOL.mp4 | f279d0e80d782fd72c0e150ff712c8f3d866849b | Carga de League Of Legacy |

## 4. The LyrieLife — mundos fuente

Los cuatro archivos existen en assets/The-LyrieLife/Worlds/.

| Archivo | GitHub blob SHA | Estado de integración |
|---|---|---|
| Kataleya.world | 9d2488566fc1fda96fbcb2f9d406af92b748007f | Almacenado; importador pendiente |
| Kariskio.world | 9d2488566fc1fda96fbcb2f9d406af92b748007f | Almacenado; importador pendiente |
| Solnang.world | f972b0bdf641d057f196449123351bdc0c0b081a | Almacenado; importador pendiente |
| abandoned-island.world | c8e92d0f36960d4010715179c3db4397af33e35e | Almacenado; importador pendiente |

**Anomalía:** Kataleya.world y Kariskio.world tienen el mismo Git blob SHA. Se conservan intactos hasta comparar los originales; no asumir que son distintos ni sustituir uno por el otro.

Los archivos .world no están siendo interpretados por el navegador. El prototipo actual cambia fondos y elementos CSS según el mundo seleccionado. No confundir presencia del archivo con integración funcional.

## 5. Portadas y fondos visuales

| Archivo original | Dimensiones | SHA-256 de Library | Estado |
|---|---:|---|---|
| TheLyrie.starship.jpg | 2048×2048 | f65748aca4de10aee38bbe11dec18be15d6953db6a387f6a4194eaa5ba9ea8fa | Original en Library; derivado web actual 160×160 necesita reemplazo |
| LOL.starship.png | 1024×1024 | cd149bf9e0c9d547a834e12efc93ebafd104f7aa305583717aa2d748c7712803 | Original en Library; derivado web actual 160×160 necesita reemplazo |
| LyrieHomeMainMenu.jpg | 1920×1080 | 5038b33830d211112f29a8ca7faa6018360f07d4ff6fdcb369e36c91fd633c21 | En Library; pendiente de integrar |
| LOL_MainMenu.jpg | 1920×1080 | 301acd2f17a975054ecc6ff7bba4bfdc270b503a2f9c76904b6e66487a173769 | En Library; pendiente de integrar |
| chart-1(1).png | 1250×270 | — | Hoja de contacto; no usar como portada |

Los SHA-256 de esta sección identifican los originales de Library. No se recalcularon desde el contenido binario publicado en GitHub.

## 6. Archivos propietarios y fuente

Los formatos .package, .world, .layer, .blueprint, .bpi y .ts4script deben conservarse en su formato original. No convertirlos a GLB ni mezclarlos con los personajes de League Of Legacy.

El archivo fuente comprimido de The LyrieLife se menciona en documentación anterior, pero su ubicación y disponibilidad deben volver a confirmarse antes de considerarlo archivado o respaldado.

## 7. Verificación y mantenimiento

- Ejecutar python scripts/repo_audit.py para comprobar referencias locales, los ocho modelos, cuatro mundos y tres vídeos.
- GitHub blob SHA identifica la versión de cada archivo en Git; SHA-256 debe calcularse sobre los bytes originales para validar integridad entre Library, GitHub y cualquier almacenamiento externo.
- Registrar en este manifiesto toda alta, sustitución, conversión o movimiento de assets.


## 8. Nuevos recursos visuales — revisión 16 de noviembre de 2026

Los cuatro JPG siguientes se encontraron en sus carpetas finales y están registrados en GitHub. Los ICON se usan en tarjetas, catálogo y vistas compactas; los Poster se muestran en el diálogo PLAY, antes del botón INICIAR y de la información.

| Recurso | Ruta publicada | Tamaño | Git blob SHA |
|---|---|---:|---|
| The LyrieLife ICON | `assets/The-LyrieLife/images/The LyrieLife (ICON).jpg` | 444000 bytes | `13244858bcffd5785238fa6a4cf246aaac753f6b` |
| The LyrieLife Poster | `assets/The-LyrieLife/images/The LyrieLife (Postel).jpg` | 101076 bytes | `4e15439728a1e71dc19c9ab11d831cdf452e35e5` |
| League Of Legacy ICON | `assets/league-of-legacy/images/League Of Legacy (ICON).jpg` | 121194 bytes | `8a5e746d6c8ed2c560493a799b8e1951d53a8058` |
| League Of Legacy Poster | `assets/league-of-legacy/images/League Of Legends (Postel).jpg` | 125419 bytes | `11309539dd8ba6059760476850b91c74dde1ffea` |

**Pendiente de normalización:** los dos nombres de Poster conservan el error tipográfico original `Postel`; el de League Of Legacy también dice `Legends`. Se referencian con sus nombres reales para no romper las rutas ni recrear binarios. Se recomienda renombrarlos cuando se disponga de una operación binaria segura.
