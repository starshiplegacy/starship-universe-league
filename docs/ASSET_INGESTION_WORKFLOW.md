# Flujo de incorporación y control de assets

**Proyecto:** STARSHIP UNIVERSE LEAGUE  
**Repositorio canónico:** `starshiplegacy/starship-universe-league` · rama `main`  
**Última revisión del inventario:** 17 de noviembre de 2026

## 1. Fuentes y responsabilidades

- **GitHub:** fuente canónica del código, rutas, documentación, manifiestos y assets estáticos publicados con el sitio.
- **Library de ChatGPT:** bandeja de entrada y archivo de originales que el usuario comparte para revisión. Un archivo presente aquí no se considera publicado en la web.
- **Supabase:** autenticación, datos de usuario, partidas sincronizadas y contenido generado/subido por la comunidad. Storage puede alojar binarios estáticos grandes si el proyecto correcto queda identificado.
- **No duplicar por defecto:** no copiar todos los archivos a Supabase. Mantener una sola fuente de verdad por clase de recurso y registrar su ubicación en el manifiesto.

## 2. Procedimiento para cada archivo nuevo

1. **Recepción:** localizar el archivo en Library por nombre, fecha y tipo. No asumir que un archivo adjunto ya está en GitHub.
2. **Identificación:** materializar una copia de trabajo y comprobar nombre, extensión, MIME real, dimensiones/duración, tamaño y SHA-256.
3. **Clasificación:** asignar juego, función y destino:
   - `assets/images/` — portadas, iconos, fondos y UI.
   - `assets/videos/` — opening y vídeos de carga.
   - `assets/league-of-legacy/characters/` — modelos GLB de League Of Legacy.
   - `assets/The-LyrieLife/CAL-CUL/models/` — modelos GLB del creador CAL/CUL.
   - `assets/source/` o Library — originales editables y paquetes propietarios que no deben transformarse.
4. **Validación técnica:** verificar que el formato sea el esperado y que el archivo abra/pueda analizarse. Para GLB, revisar versión, mallas, materiales, rigs, animaciones y compresión; para vídeo, comprobar códec, duración y resolución.
5. **Publicación:** elegir almacenamiento según el uso:
   - imágenes web optimizadas y archivos pequeños: GitHub;
   - vídeos/modelos grandes: Git LFS o bucket de assets dedicado, una vez confirmado el proyecto y el acceso;
   - archivos privados o subidos por usuarios: bucket privado y políticas RLS específicas.
6. **Integración:** actualizar las rutas de HTML/JS/CSS y este manifiesto en el mismo cambio lógico.
7. **Verificación:** comprobar que la ruta exista, el hash coincida y las referencias del código apunten al destino correcto. Hacer comprobación estática; no declarar prueba visual del navegador si no se ejecutó.
8. **Publicación web:** no desplegar automáticamente. Requiere autorización explícita del usuario.

## 3. Inventario reconocido en Library

### Portadas e imágenes de referencia

| Archivo original | Dimensiones | SHA-256 | Uso / estado |
|---|---:|---|---|
| `TheLyrie.starship.jpg` | 2048×2048 | `f65748aca4de10aee38bbe11dec18be15d6953db6a387f6a4194eaa5ba9ea8fa` | Portada oficial de The LyrieLife; original localizado, derivado actual del sitio demasiado pequeño |
| `LOL.starship.png` | 1024×1024 | `cd149bf9e0c9d547a834e12efc93ebafd104f7aa305583717aa2d748c7712803` | Portada oficial de League Of Legacy; original localizado, derivado actual del sitio demasiado pequeño |
| `1000002882_cc7409ec46d7047400b448b92f04ed81-16_11_2026, 0_40_39.jpg` | 2048×2048 | `b5ca170f5c626f26ec107f005fe5612cdc3b2f36142e9fcc79e997f89cbc4f1b` | Variante visual de The LyrieLife; conservar como alternativa, no sustituye la portada principal sin decisión del usuario |
| `chart-1(1).png` | 1250×270 | — | Hoja de contacto/preview con miniaturas; no usar como portada |
| `LyrieHomeMainMenu.jpg` | 1920×1080 | `5038b33830d211112f29a8ca7faa6018360f07d4ff6fdcb369e36c91fd633c21` | Fondo de sala blanca para el menú de The LyrieLife; localizado y visualmente identificado, aún no integrado |
| `LOL_MainMenu.jpg` | 1920×1080 | `301acd2f17a975054ecc6ff7bba4bfdc270b503a2f9c76904b6e66487a173769` | Fondo de arena fantástica para el menú de League Of Legacy; localizado, aún no integrado |

Los originales anteriores están en Library, no en el árbol actual de GitHub. No se sustituyen las portadas del sitio hasta disponer de los bytes originales y generar derivados verificados. Los dos WebP actuales del repositorio se generaron a 160×160 y son la causa probable de la pixelación al ampliarlos. Deben sustituirse por derivados de alta resolución antes de considerar las portadas terminadas.

### Modelos y vídeos

Los modelos GLB de personajes y los tres vídeos se verificaron en el árbol actual de GitHub y están publicados en sus rutas definitivas:

- Los ocho modelos `Charlotte.glb`, `Arthur.glb`, `Bella.glb`, `Emma.glb`, `Aquamarine.glb`, `Opal (Opalo).glb`, `Optopool.glb` y `Stella.glb` están presentes en `assets/league-of-legacy/characters/` y el selector del menú los incluye.
- `UNIVERSE LEAGUE (Opening).mp4`: opening compartido.
- `Lyrie Loanding.mp4`: carga de The LyrieLife.
- `Loading LOL.mp4`: carga de League Of Legacy.

**Estado:** los tres vídeos y los modelos principales de League Of Legacy están publicados en sus carpetas de GitHub. No cambiar los nombres de los archivos sin actualizar las referencias del código.

### Recursos CAL/CUL y paquete fuente

- `assets/The-LyrieLife/CAL-CUL/models/` no contiene todavía los GLB masculino y femenino; las carpetas de CAL/CUL conservan placeholders. El conversor espera fuentes locales que aún no están publicadas.
- La documentación menciona un paquete FBX/texture de CAL/CUL y `The LyreLife (Para HTML).tar.gz`. No se localizaron esos dos paquetes por nombre en el inventario actual de Library. No asumir que están disponibles ni reemplazarlos por otros GLB de la biblioteca.
- Los formatos propietarios de The LyrieLife (`.package`, `.world`, `.layer`, `.blueprint`, `.bpi`, `.ts4script`) se conservan intactos; no convertirlos a GLB.

## 4. Mapa de integración del código

- `index.html`, `styles.css`, `public-landing.css`, `private-home.css`: página pública, autenticación y launcher privado.
- `app.js`, `account-settings.js`, `entitlements.js`: navegación, cuenta y permisos/entitlements.
- `launch.html`: secuencia universal: opening compartido → vídeo de carga por juego → página/menú del juego.
- `lyrielife.html`: vertical slice jugable de navegador de The LyrieLife; no es todavía un motor nativo completo.
- `cal-cul.html` y `tools/convert_cal_cul.py`: creador CAL/CUL y conversión de FBX a GLB; los modelos GLB aún no están listos.
- `league-of-legacy.html`: menú/visor Three.js de Charlotte, Arthur y Bella; depende de los GLB y de Three.js/decodificadores cargados por CDN.
- `save-system.js`: guardado local y sincronización de nube prevista mediante `game_saves`.
- `gallery.js`: publicaciones, reacciones, comentarios y medios de comunidad; referencia el bucket `universe-gallery`.
- `games.js`: minijuegos.
- `docs/source/` y `docs/*.txt`: especificaciones y prototipos de referencia; no son automáticamente módulos de producción.

## 5. Pendientes y controles de seguridad

1. Sustituir los WebP de 160×160 por derivados de alta resolución cuando se incorporen los originales de portada desde Library.
2. Integrar `LyrieHomeMainMenu.jpg` y `LOL_MainMenu.jpg` en los menús correspondientes cuando se autorice el cambio visual.
3. Los ocho GLB de personajes de League Of Legacy y los tres MP4 de inicio ya están publicados; queda pendiente validar su carga real en navegador y optimizar los recursos grandes sin alterar los originales.
4. Incorporar las fuentes correctas de CAL/CUL y localizar el archivo fuente de The LyrieLife; no usar `Emma.fbx` ni otros modelos de League Of Legacy como sustitutos.
5. **Resolver la identidad del proyecto Supabase antes de crear buckets o mover archivos.** El frontend del repositorio apunta a `wvyveduslbsuvyekeccf.supabase.co`, pero las conexiones Supabase disponibles muestran proyectos con referencias distintas (`uyhcocdknweqvcqgbnez` y `fixwovymcfpfididtmud`). En el proyecto `uyhcocdknweqvcqgbnez` sí aparecen `profiles`, `user_badges` y `user_settings`, pero no aparecen las tablas/vistas `game_saves`, `gallery_posts`, `gallery_starlights`, `gallery_comments`, `gallery_mentions`, `public_profile_directory`, `creator_verification_applications` ni `user_feedback`. Tampoco existen los buckets `universe-gallery` y `universe-avatars` que esperan `gallery.js` y `account-settings.js`. Ese proyecto sí tiene buckets distintos (`community-posts`, `profile-media`, `shorts`). No crear copias ni modificar el esquema de un proyecto hasta confirmar cuál es el backend real.
6. Mantener separados los buckets de assets públicos del juego, los medios públicos de comunidad y los archivos privados de usuario. Un bucket público permite descargar a quien tenga la URL; las subidas y eliminaciones deben seguir restringidas por políticas RLS.
7. No subir claves secretas al frontend. La clave publishable puede estar en el cliente; nunca una service-role/secret key.

## 6. Regla de continuidad para futuras sesiones

Al recibir una nueva tanda de archivos, usar `docs/DOCUMENTATION_INDEX.md` para orientarse y empezar la validación con este documento y `assets/ASSET_MANIFEST.md`; después comparar Library, árbol de GitHub y referencias de código. Actualizar el inventario antes de modificar la experiencia. Informar claramente qué está solo en Library, qué ya está en GitHub, qué está integrado en el código y qué se ha desplegado.


## 7. Auditoría cruzada Supabase ↔ GitHub (2026-11-16)

La revisión ampliada está registrada en `docs/SUPABASE_GITHUB_SYNC_AUDIT.md`. Se verificaron los dos proyectos Supabase disponibles y ninguno coincide con el ref que el frontend configura (`wvyveduslbsuvyekeccf`). El proyecto `uyhcocdknweqvcqgbnez` tampoco tiene el esquema ni los buckets que espera el código actual; el proyecto `fixwovymcfpfididtmud` contiene un catálogo/Django separado y no debe conectarse al juego.

**Bloqueo de seguridad:** no cambiar URL/clave del frontend, crear tablas/buckets ni copiar datos hasta identificar el proyecto Supabase canónico. La auditoría registra el plan de migraciones versionadas y comprobaciones programadas para activar después de confirmar el backend.
