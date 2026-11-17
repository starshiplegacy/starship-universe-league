# Inventario de assets de STARSHIP UNIVERSE LEAGUE

**Última revisión:** 17 de noviembre de 2026  
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

Los cuatro archivos fuente existen dentro de subcarpetas por mundo bajo `assets/The-LyrieLife/Worlds/`.

| Archivo | GitHub blob SHA | Estado de integración |
|---|---|---|
| `kataleya/Kataleya.world` | 9d2488566fc1fda96fbcb2f9d406af92b748007f | Almacenado; importador pendiente |
| `kariskio/Kariskio.world` | 9d2488566fc1fda96fbcb2f9d406af92b748007f | Almacenado; importador pendiente |
| `solnang/Solnang.world` | f972b0bdf641d057f196449123351bdc0c0b081a | Almacenado; importador pendiente |
| `abandoned-island/abandoned-island.world` | c8e92d0f36960d4010715179c3db4397af33e35e | Almacenado; importador pendiente |

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
| The LyrieLife Poster | `assets/The-LyrieLife/images/The LyrieLife (Poster).jpg` | 101076 bytes | `4e15439728a1e71dc19c9ab11d831cdf452e35e5` |
| League Of Legacy ICON | `assets/league-of-legacy/images/League Of Legacy (ICON).jpg` | 121194 bytes | `8a5e746d6c8ed2c560493a799b8e1951d53a8058` |
| League Of Legacy Poster | `assets/league-of-legacy/images/League Of Legacy (Poster).jpg` | 125419 bytes | `11309539dd8ba6059760476850b91c74dde1ffea` |

Los nombres se normalizaron en Git conservando exactamente los mismos blobs binarios: `The LyrieLife (Poster).jpg` y `League Of Legacy (Poster).jpg`.


## 9. League Of Legacy — archivos de mapa incorporados

La revisión del árbol de GitHub detectó **421 archivos** en `assets/league-of-legacy/Map/`, con un tamaño publicado agregado de aproximadamente **664.6 MB (633.8 MiB)**:

| Formato | Cantidad | Uso identificado |
|---|---:|---|
| DDS | 405 | Texturas del mapa |
| OBJ | 2 | Geometría exportada |
| MTL | 2 | Materiales asociados a OBJ |
| C4D | 1 | Proyecto de Cinema 4D |
| GLB | 1 | Escenario de entrenamiento |

La estructura incluye `For BAttle Royale & De Clasificatoria/SummonersRift/` con `Source/` y `Textures/`, además de `For Training/For_Training.glb`. Los archivos se mantienen en sus formatos originales. Su presencia en el repositorio no significa que el mapa esté integrado en el motor ni listo para gameplay; todavía requiere validación de materiales, escalas, dependencias y rendimiento.

## 10. Limpieza de carpetas visuales vacías

Se retiraron los placeholders `.gitkeep` de las antiguas carpetas `icons/` e `illustrations/` de The LyrieLife, y de las carpetas visuales compartidas vacías. Los recursos visuales de cada juego quedan centralizados en su carpeta `images/`, sin subcarpetas.

## 11. Registro de modos y mapas — revisión 16 de noviembre de 2026

Se incorporó `map-registry.js` como fuente única de asignación de modos a mapas. La matriz completa está en `docs/MAP_MODE_MATRIX.md`.

| Modo | Mapa asignado | Archivo de entrada | Estado |
|---|---|---|---|
| Battle Royale | Summoner's Rift | `SummonersRift.obj` + MTL/DDS | Fuente; importador pendiente |
| De Clasificatoria | Summoner's Rift | Mismo recurso | Fuente; reglas independientes |
| Versus 1 to 3 | Mapa Versus 1 to 3 | `BeginningLobby.fbx` | Bloqueado para producción: licencia CC BY-NC |
| Versus 4 to 5 | Mapa Versus 4 to 5 | `battle_guys_map_500th_model.glb` | Candidato a preview; validación pendiente |
| Entrenamiento | Mapa de entrenamiento | `For_Training.glb` | Candidato a preview; validación pendiente |

**Hallazgo de licencia:** `Versus 1 to 3/LICENSE.txt` identifica el asset de Omeleto/Thingiverse como Creative Commons Attribution–Non-Commercial. No debe publicarse ni utilizarse comercialmente hasta obtener autorización comercial o sustituirlo por un modelo con licencia compatible.

El registro no define reglas de juego, tamaños de equipo, spawns, colisiones ni objetivos. La presencia de GLB no equivale a mapa listo para partidas.


## 12. Integración inicial del selector y visor de mapas — 16 noviembre 2026

- `game-modes.html` implementa selector de modos y vista previa 3D con Three.js.
- `league-of-legacy.html` conecta JUGAR con el selector.
- `map-registry.js` identifica mapa y ruleset por separado.
- GLB: Versus 4 to 5 y Entrenamiento conectados al cargador de vista previa.
- Summoner's Rift: se mantiene la asignación a Battle Royale y Clasificatoria, pero la carga queda bloqueada hasta obtener autorización escrita de Riot Games o sustituir el escenario. Se eliminó el MTL runtime temporal; los archivos originales se conservan. El cargador reescribe las rutas del MTL en memoria solo si la licencia se libera.
- Versus 1 to 3 sigue bloqueado por licencia CC BY-NC.
- La integración no añade física, colisiones, spawn points ni lógica de partidas.


**Revisión de propiedad intelectual:** la política oficial de Riot Games incluye los mapas entre sus recursos protegidos y restringe su uso en juegos/aplicaciones sin autorización aplicable. Summoner's Rift queda bloqueado en el registro. Fuente: https://www.riotgames.com/es-419/informacion-legal


**Control de licencias:** el registro ahora exige `licenseStatus: "cleared"` para habilitar cualquier vista previa. Los mapas sin licencia verificada quedan bloqueados aunque exista un cargador compatible.


## 13. Recursos nuevos — revisión 17 de noviembre de 2026

### Jaque Matte y Pinkie Star

| Recurso | Ruta en Git | Estado |
|---|---|---|
| Jaque Matte — icono | `assets/Jaque-Matte/Images/Jaque Matte (ICON).jpg` | Almacenado; conectado al catálogo |
| Jaque Matte — póster | `assets/Jaque-Matte/Images/Jaque Matte (Postel).jpg` | Almacenado; el nombre original contiene `Postel`; aún no se muestra en la tarjeta |
| Pinkie Star — icono | `assets/Pinkie-Star/Images/Pinkie Star (ICON).jpg` | Almacenado; conectado al catálogo gratuito |
| Pinkie Star — póster | `assets/Pinkie-Star/Images/Pinkie Star (Postel).jpg` | Almacenado; el nombre original contiene `Postel`; aún no se muestra en la tarjeta |

Los cuatro JPG se mantienen en sus carpetas originales. Pinkie Star es el juego Mahjong Solitaire antes identificado como Pixxy Up. El nombre visible es Pinkie Star; el token de lanzamiento heredado sigue siendo `pixxy`, las partidas nuevas usan la clave `pinkie-star` y `games.js` recupera partidas antiguas con la clave `pixxy-up` para migrarlas sin perder progreso. Los controles internos `pixxy-*` se conservan por compatibilidad.

### The LyrieLife — prototipos de interfaz

| Recurso | Ruta organizada | Clasificación |
|---|---|---|
| Create A Lyrie | `assets/The-LyrieLife/CAL-CUL/Create-A-Lyrie-preview.html` | Vista previa del módulo CAL/CUL; no sustituye `cal-cul.html` |
| Gameplay HUD | `assets/The-LyrieLife/UI/gameplay-hud-preview.html` | Prototipo visual independiente |
| Notas del HUD | `assets/The-LyrieLife/UI/gameplay-hud-notes.txt` | Especificación del prototipo |
| Menú principal | `assets/The-LyrieLife/UI/main-menu-reference.html` | Referencia visual; no conectada al lanzador |

Se corrigió el nombre de carpeta `IU` a `UI`. Los prototipos se conservaron íntegros y se movieron sin convertir su contenido. No se conectaron automáticamente a la navegación activa porque todavía son referencias independientes.

### League Of Legacy — referencia de interfaz

| Recurso | Ruta organizada | Clasificación |
|---|---|---|
| Home de League of Legends | `assets/league-of-legacy/references/league-client-home-reference.html` | Referencia visual externa; no es la pantalla Home propia de League Of Legacy |
| Texto de referencia | `assets/league-of-legacy/references/league-client-home-reference-notes.md` | Texto auxiliar asociado |

Se separó de una carpeta `home/` para evitar confundir una referencia de League of Legends con una pantalla original y funcional de League Of Legacy. No se conectó al juego ni se asumió permiso para reutilizar recursos protegidos.

## 14. Criterio de organización

- `CAL-CUL/`: prototipos y recursos exclusivos de Create A Lyrie.
- `UI/`: referencias y prototipos de interfaz de The LyrieLife.
- `references/`: material de consulta que no debe confundirse con pantallas activas del juego.
- Los nombres de archivo originales se conservan cuando cambiarlo podría romper referencias; los errores tipográficos pendientes quedan documentados hasta una normalización coordinada.


## 15. Estado de lectura e integración de los archivos .world — 16 de noviembre de 2026

Los cuatro archivos están versionados como binarios y no son texto legible directamente por el navegador. La página actual de The LyrieLife no contiene un lector/importador de este formato: el selector de mundos cambia entornos CSS de prototipo y no interpreta la geometría ni los recursos internos de estos archivos.

| Archivo | Tamaño | Git blob SHA | Estado |
|---|---:|---|---|
| `kataleya/Kataleya.world` | 57,333,840 bytes | `9d2488566fc1fda96fbcb2f9d406af92b748007f` | Almacenado; sin lector/importador |
| `kariskio/Kariskio.world` | 57,333,840 bytes | `9d2488566fc1fda96fbcb2f9d406af92b748007f` | Almacenado; sin lector/importador |
| `solnang/Solnang.world` | 30,659,696 bytes | `f972b0bdf641d057f196449123351bdc0c0b081a` | Almacenado; sin lector/importador |
| `abandoned-island/abandoned-island.world` | 49,656,910 bytes | `c8e92d0f36960d4010715179c3db4397af33e35e` | Almacenado; sin lector/importador |

El conjunto ocupa 194,984,286 bytes (aprox. 186 MiB). Kataleya.world y Kariskio.world comparten exactamente el mismo Git blob SHA y tamaño, por lo que Git los identifica como contenido binario idéntico; conservar ambos nombres no significa que contengan mundos distintos.

### Ruta técnica recomendada

1. Identificar qué programa o motor creó/exportó estos archivos y documentar su formato y versión.
2. Obtener el proyecto fuente o un exportador oficial; inspeccionar cabecera, estructura y dependencias antes de intentar convertir.
3. Si el formato lo permite, generar una copia de runtime en glTF/GLB con texturas separadas o empaquetadas. No sobrescribir los .world originales.
4. Validar escala, orientación, materiales, colisiones, zonas caminables y puntos de aparición.
5. Integrar el GLB exportado en el cargador web y probarlo en escritorio y móvil.

**Conclusión:** todavía no pueden leerse como mundos jugables dentro de The LyrieLife. Hace falta una vía de importación o conversión desde el formato de origen. No se debe prometer una conversión directa a GLB hasta identificar el formato real.


## 16. Revisión cruzada de rutas e integración — 17 de noviembre de 2026

- Se confirmó en el árbol recursivo de GitHub que `assets/league-of-legacy/Map/` contiene 421 archivos (633.82 MiB); el valor 411 de un borrador anterior era obsoleto.
- Los cuatro archivos `.world` están en subcarpetas: `Worlds/kataleya/`, `Worlds/kariskio/`, `Worlds/solnang/` y `Worlds/abandoned-island/`. No se mueven ni se convierten.
- El selector de League Of Legacy incluye los ocho modelos GLB publicados.
- Pinkie Star está conectado al catálogo gratuito. Se actualizó la persistencia para usar `pinkie-star` y migrar lecturas de `pixxy-up`.
- CAL/CUL usa la ruta canónica `assets/The-LyrieLife/CAL-CUL/models/`; sus modelos GLB masculino y femenino siguen pendientes de recibir y validar sus fuentes.
- Los tres vídeos MP4 están publicados en `assets/videos/` y `launch.html` usa los nombres exactos actuales.


## 17. Nuevos proyectos incorporados — revisión 17 de noviembre de 2026

### Geffenite — Batalla Estelar

La estructura está separada por función y se conserva en su carpeta propia:

| Archivo | Ruta | Tamaño | Git blob SHA | Clasificación |
|---|---|---:|---|---|
| Gameplay | `assets/Geffenite/gameplay/Geffenite_ Batalla Estelar.html` | 31,225 bytes | `751ef5e5ed6c11a50044dee74f0111c78b6c372c` | Prototipo de juego; acceso beta protegido |
| Mapa Eco Sónico Cósmico | `assets/Geffenite/docs/Geffenite_ mapa de Eco Sónico Cósmico.html` | 7,565 bytes | `a20287a5454dd30e221d996fb988b4f57c0427a2` | Documento/prototipo interactivo del mapa |
| Dossier de Juego y Empresa | `assets/Geffenite/docs/Geffenite - Dossier de Juego y Empresa.docx` | 19,954 bytes | `a3bfc861b7e815a77af30dd981cf2cbfe81d33a6` | Documento fuente DOCX |
| Acceso VIP y Requisitos | `assets/Geffenite/docs/Geffenite - Acceso VIP y Requisitos.docx` | 14,829 bytes | `34232e3e0c92f5418c2cf9c0aa9f4c33ac5026da` | Documento fuente DOCX |
| Icono | `assets/Geffenite/images/Geffenite (ICON).jpg` | 348,235 bytes | `11d864dbd306e9defea89e5723c7ffed2cb0ac8f` | Identidad visual |
| Póster | `assets/Geffenite/images/Geffenite (Postel).jpg` | 87,644 bytes | `f50ffb6f8bddc5660770644f5131644cf49caeb4` | Identidad visual; nombre original conservado |

La beta se presenta en el catálogo VIP. El enlace se revela cuando entitlements.js recibe de la función Edge starship-entitlements una entitlement o un plan compatible con Young-Moon o Exoplanet. La comprobación efectiva de vigencia/estado de pago depende de esa función remota y no puede certificarse solo desde el frontend. No publicar el HTML como acceso abierto ni eliminar la barrera VIP. El archivo del mapa queda clasificado como documentación/prototipo, no como motor de mapa independiente.

### GellyShow

| Archivo | Ruta | Tamaño | Git blob SHA | Clasificación |
|---|---|---:|---|---|
| Juego | `assets/GellyShow/Gameplay/GellyShow.html` | 1,289,915 bytes | `3c50d82d6c6a83ea677cc6bccb1ba8a054956b3f` | Juego 2D autónomo para navegador |
| Información | `assets/GellyShow/Docs/GellyShow_Informacion.md` | 1,229 bytes | `e5998e9343a364e2a4c00561098fcabac6e02869` | Descripción y alcance |
| Reglas | `assets/GellyShow/Docs/GellyShow_Reglas.md` | 1,352 bytes | `801712e8cc24d1ea734b40b77ebb93c084255ec9` | Reglas y puntuación |
| Icono | `assets/GellyShow/Images/GellyShow (ICON).jpg` | 293,558 bytes | `30f2828230c76c72e01e2fb81e53f4e355011bc0` | Identidad visual |
| Póster | `assets/GellyShow/Images/GellyShow (Postel).jpg` | 54,635 bytes | `c70513a68ef5c5808af778c1281a0af8bbf67b94` | Identidad visual; nombre original conservado |

La documentación describe una experiencia 2D autónoma con contenido visual incrustado en el HTML. El modo Online sigue pendiente de servidor. No se encontró una referencia de lanzamiento/catalogación en el portal durante esta revisión: permanece almacenado y documentado, sin declararlo conectado al catálogo ni publicado como juego accesible desde el portal.

### Reglas de conservación

- Se mantienen los directorios existentes `Docs/Gameplay/Images` de GellyShow y `docs/gameplay/images` de Geffenite; no se cambian mayúsculas de carpetas ni nombres.
- Los dos archivos `(Postel).jpg` conservan su ortografía original para evitar romper rutas.
- Los DOCX de Geffenite se registran por nombre, tamaño y Git blob SHA. La lectura binaria de esos documentos no estuvo disponible mediante la vista de texto; no se certifica aquí su contenido interno.
- No se mezclan estos proyectos con The LyrieLife, CAL/CUL, League Of Legacy, Pinkie Star ni Jaque Matte.


## 18. Nuevos juegos y plataforma — revisión 17 de noviembre de 2026

### Geffen: Monopoly

| Archivo | Ruta | Tamaño | Git blob SHA | Estado |
|---|---|---:|---|---|
| Juego de mesa interactivo | `assets/geffen-monopoly/geffen_monopoly_juego_de_mesa_interactivo.html` | 60,614 bytes | `44f4243786aa8fd7740adcda2c7e691d7e64ee1a` | Juego HTML autónomo; agregado al catálogo gratuito y a la biblioteca |
| Documentación técnica | `assets/geffen-monopoly/documentaci_n_del_sistema_geffen_monopoly.txt` | 7,824 bytes | `8b26d857862859d6d7f0dc08125882174694df34` | Fuente de reglas, tablero y estado del juego |

El tablero tiene 24 casillas en un perímetro 7×7. La documentación describe partidas 1v1, 1v2 y 1v3 contra bots, además de 2 jugadores locales (Pass & Play). No se documenta modo online ni sincronización remota. Los recursos permanecen aislados en su carpeta.

### Club de Cartas — Solitario y Versus

| Archivo | Ruta | Tamaño | Git blob SHA | Estado |
|---|---|---:|---|---|
| Juego | `assets/star-solitaire/club_de_cartas_solitario_y_versus.html` | 42,866 bytes | `88feac7a40dd8a335a1156b7443fb13e63613c56` | Juego HTML autónomo; agregado al catálogo gratuito y a la biblioteca |

El menú incluye Solitario en Fila (un jugador) y Versus contra un bot. No se afirma que tenga multijugador online. El nombre visible del HTML es CLUB DE CARTAS; la carpeta de origen `star-solitaire` se conserva.

### Starship Plus — plataforma audiovisual

| Archivo | Ruta | Tamaño | Git blob SHA | Estado |
|---|---|---:|---|---|
| Plataforma | `assets/starship-plus/starship-plus.html` | 174,042 bytes | `383e9bebc12ff39d877daffd7cd7e5fc8c9a7f49` | Interfaz web demostrativa; enlazada desde el área de miembros |
| Guía de funcionalidades | `assets/starship-plus/starship-plus-funcionalidades.txt` | 4,376 bytes | `b32cfcd944bfc26345e51e9b5285c814c70e7977` | Especificación de navegación, catálogo y controles |

Incluye vistas de catálogo (For You, Drama & Movie y SPORT), búsqueda, lista personal, ajustes y un reproductor simulado. El propio documento fuente indica que no reproduce vídeo real: el catálogo usa títulos de muestra y el reproductor simula el progreso con animación. El perfil, favoritos, progreso y ajustes se guardan en localStorage; no equivale a cuentas reales ni sincronización entre dispositivos.

El acceso directo se enlazó dentro del bloque de Starship Plus Pro visible para miembros. Esta visibilidad es una condición de interfaz, no un control de seguridad del archivo estático: cualquier contenido privado futuro debe protegerse mediante autorización del servidor y enlaces firmados/privados. No hay checkout, pasarela de pago ni enlaces de estrenos privados conectados.

### Integración en el portal

- Geffen: Monopoly y Club de Cartas aparecen en el panel **Gratis · Demo** del catálogo.
- Ambos utilizan el flujo existente **Catálogo → Instalar → Juegos instalados → PLAY**. El temporizador de 60 segundos simula el registro en la biblioteca local por cuenta; no descarga un paquete.
- El botón **Abrir Starship Plus** está dentro del bloque de beneficios para miembros.
- Se conservan nombres, extensiones y directorios originales. No se mezclan con Geffenite, GellyShow, The LyrieLife, CAL/CUL ni League Of Legacy.
- QA visual/interactivo en navegador queda pendiente; la conexión de rutas no demuestra que todas las mecánicas estén probadas.
