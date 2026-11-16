# STARSHIP UNIVERSE LEAGUE

Repositorio privado principal del universo de juegos de STARSHIP LEGACY ENTERTAINMENT.

## Juegos

### The LyrieLife
- Simulación de vida y prototipo de navegador en `lyrielife.html`.
- Selector de mundos: `world-selection.html`.
- Mundos fuente: `assets/The-LyrieLife/Worlds/` — Kataleya, Kariskio, Solnang y Abandoned Island.
- CAL/CUL: `cal-cul.html` y `assets/The-LyrieLife/CAL-CUL/`.
- **Importante:** el prototipo actual representa los ambientes con CSS; todavía no importa ni interpreta el formato interno de los archivos `.world`.

### League Of Legacy
- Menú y visor de personajes: `league-of-legacy.html`.
- Selector de modos y preparación de vista previa: `game-modes.html`.
- Registro central de modos/mapas: `map-registry.js`.
- Ocho modelos GLB: `assets/league-of-legacy/characters/`.
- Mapas fuente: `assets/league-of-legacy/Map/`; consulta `docs/MAP_MODE_MATRIX.md` para asignaciones y estados de licencia.
- El botón JUGAR abre el selector de modos. Esto no significa que matchmaking o partidas jugables estén implementados.
- Las vistas previas de mapas permanecen bloqueadas hasta que la licencia de cada recurso esté documentada como autorizada.
- Todos los recursos visuales (iconos, imágenes e ilustraciones) van directamente en `assets/league-of-legacy/images/`, sin subcarpetas. No crear `icons/` ni `illustrations/`.

## Lanzador universal

`launch.html` reproduce el opening compartido y después el vídeo del juego elegido:

- `assets/videos/UNIVERSE LEAGUE (Opening).mp4`
- `assets/videos/Lyrie Loanding.mp4`
- `assets/videos/Loading LOL.mp4`

No renombrar estos archivos sin actualizar el lanzador y el manifiesto.

## Estructura de recursos

```
assets/
  The-LyrieLife/
    Worlds/
    images/  # ICON, Poster e imágenes del juego, sin subcarpetas
    CAL-CUL/
    README.md
  league-of-legacy/
    characters/
  videos/
  ASSET_MANIFEST.md
docs/
scripts/
.github/workflows/
```

Los originales propietarios y formatos como `.package`, `.world`, `.layer`, `.blueprint`, `.bpi` y `.ts4script` deben conservarse sin conversiones improvisadas. Consulta el manifiesto antes de mover o sustituir binarios.

## Backend y sincronización

- La configuración pública compartida está centralizada en `supabase-config.js`; `index.html` y `lyrielife.html` la consumen para evitar URLs/keys duplicadas.

- GitHub es la fuente de verdad del código, migraciones, documentación y assets estáticos.
- Supabase es la fuente de verdad de Auth, datos dinámicos, partidas en la nube y contenido de comunidad.
- La identidad del proyecto Supabase canónico aún debe confirmarse: el frontend apunta a `wvyveduslbsuvyekeccf`, mientras que los dos proyectos disponibles en las conexiones no coinciden.
- No usar el proyecto de catálogo musical/Django como backend del juego.
- No almacenar service-role keys en frontend ni en archivos versionados.

Documentos operativos:
- [Plan técnico y fases de entrega](docs/TECHNICAL_OPERATING_PLAN.md)
- [Matriz de modos y mapas](docs/MAP_MODE_MATRIX.md)
- [Auditoría técnica y logística](docs/ENGINEERING_AUDIT.md)
- [Logística y plan de entregas de League Of Legacy](docs/LEAGUE_OF_LEGACY_LOGISTICS.md)
- [Auditoría de sincronización Supabase ↔ GitHub](docs/SUPABASE_GITHUB_SYNC_AUDIT.md)
- [Flujo de incorporación de assets](docs/ASSET_INGESTION_WORKFLOW.md)
- [Secuencia de inicio](docs/UNIVERSE_LAUNCH_SEQUENCE.md)

## Auditoría automatizada

`scripts/repo_audit.py` comprueba referencias locales, los ocho GLB, los cuatro archivos de mundo y los tres vídeos de inicio. GitHub Actions ejecuta el chequeo al hacer push, en pull requests, manualmente y diariamente.

La comprobación remota de Supabase requiere configurar en Settings → Secrets and variables → Actions:
- Secret `SUPABASE_URL`
- Secret `SUPABASE_ANON_KEY` (publishable/anon; nunca service-role)
- Variable `SUPABASE_EXPECTED_PROJECT_REF`

Hasta configurar esos valores, el workflow informa que el chequeo remoto está omitido; no inventa una conexión ni modifica la base de datos.

## Estado de ejecución

El visor de personajes y el prototipo de vida son experiencias de desarrollo. La integración real de mundos, partidas cloud, comunidad y multiplayer depende de terminar la arquitectura y validar el backend. No se considera listo para producción hasta pasar pruebas de navegador, seguridad y rendimiento.
