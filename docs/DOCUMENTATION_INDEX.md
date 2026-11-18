# Índice de documentación — STARSHIP UNIVERSE LEAGUE

**Revisión:** 17 de noviembre de 2026  
**Repositorio:** `starshiplegacy/starship-universe-league` · `main`

Este índice organiza la documentación sin cambiar nombres ni extensiones de los archivos fuente. Los documentos de referencia y prototipos no se consideran automáticamente código activo.

## 1. Documentos de operación y arquitectura

| [PROJECT_LOGISTICS_AUDIT.md](PROJECT_LOGISTICS_AUDIT.md) | Auditoría integral de inventario, dependencias, bloqueos y orden de entrega de todo el repositorio. |
| Documento | Función |
|---|---|
| [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) | Mapa general del portal, juegos, módulos y límites entre proyectos. |
| [TECHNICAL_OPERATING_PLAN.md](TECHNICAL_OPERATING_PLAN.md) | Orden de trabajo, dependencias, seguridad y criterios de preparación. |
| [ASSET_INGESTION_WORKFLOW.md](ASSET_INGESTION_WORKFLOW.md) | Procedimiento para recibir, clasificar, validar, publicar y conectar archivos. |
| [../assets/ASSET_MANIFEST.md](../assets/ASSET_MANIFEST.md) | Inventario canónico de recursos, rutas, tamaños, hashes y estado de integración. |
| [UNIVERSE_LAUNCH_SEQUENCE.md](UNIVERSE_LAUNCH_SEQUENCE.md) | Secuencia real de apertura, vídeos y destinos de los juegos. |

## 2. League Of Legacy

| [LEAGUE_OF_LEGACY_GAMEPLAY_BLUEPRINT.md](LEAGUE_OF_LEGACY_GAMEPLAY_BLUEPRINT.md) | Organización de recursos, estructura futura de runtime y primera vertical slice jugable de Entrenamiento. |

| Documento | Función |
|---|---|
| [LEAGUE_OF_LEGACY_LOGISTICS.md](LEAGUE_OF_LEGACY_LOGISTICS.md) | Fases de desarrollo, prioridades, dependencias y puertas de entrega. |
| [ENGINEERING_AUDIT.md](ENGINEERING_AUDIT.md) | Estado técnico, inventario de mapas, riesgos de licencia y límites de gameplay. |
| [MAP_MODE_MATRIX.md](MAP_MODE_MATRIX.md) | Relación entre modos, mapas, reglas e impedimentos de autorización. |

**Estado resumido:** el selector de personajes incluye ocho modelos GLB. El selector de mapas y sus cargadores son una base técnica, no una partida jugable. Los mapas siguen sujetos a validación de derechos, escala, colisiones, rendimiento y pruebas.

## 3. The LyrieLife y CAL/CUL

| Documento | Función |
|---|---|
| [lyrielife-integration.md](lyrielife-integration.md) | Funciones presentes y límites de la vertical slice de navegador. |
| [CAL_CUL_SETUP.md](CAL_CUL_SETUP.md) | Requisitos del conversor y rutas correctas de los modelos de CAL/CUL. |
| [source/Guia_de_Controles.txt](source/Guia_de_Controles.txt) | Documento fuente de controles de PC, cámara, CUL/CAS y controles táctiles. |
| [source/TheLirie_s_Inst.txt](source/TheLirie_s_Inst.txt) | Especificación fuente de sistemas, necesidades, emociones y rasgos. |
| [source/The_Logic01.txt](source/The_Logic01.txt) | Referencia visual y funcional de la logística del juego. |
| [source/More_Interactions.txt](source/More_Interactions.txt) | Prototipo de interacciones contextuales; archivo fuente HTML conservado con extensión .txt. |

**Estado resumido:** The LyrieLife funciona como prototipo web. Los archivos `.world` están almacenados en subcarpetas por mundo, pero todavía no tienen un importador que lea su formato original. CAL/CUL sigue esperando los modelos fuente masculino y femenino y sus texturas; no se deben sustituir por modelos de League Of Legacy.

## 4. Geffenite — Batalla Estelar

| Recurso | Función |
|---|---|
| [../assets/Geffenite/gameplay/Geffenite_ Batalla Estelar.html](../assets/Geffenite/gameplay/Geffenite_ Batalla Estelar.html) | Prototipo de gameplay de la beta. |
| [../assets/Geffenite/docs/Geffenite_ mapa de Eco Sónico Cósmico.html](../assets/Geffenite/docs/Geffenite_ mapa de Eco Sónico Cósmico.html) | Mapa conceptual interactivo y referencia de zonas/tormenta. |
| `../assets/Geffenite/docs/Geffenite - Dossier de Juego y Empresa.docx` | Dossier fuente del proyecto. |
| `../assets/Geffenite/docs/Geffenite - Acceso VIP y Requisitos.docx` | Documento fuente de acceso y requisitos. |

**Estado resumido:** la beta está presentada en el área VIP y el frontend exige una entitlement o plan compatible devuelto por la función Edge starship-entitlements. La validación real de vigencia/estado de pago debe confirmarse en esa función remota. Los DOCX se conservan en formato original. El mapa HTML se clasifica como referencia interactiva, no como sistema de mapas del motor.

## 5. GellyShow

| Documento | Función |
|---|---|
| [../assets/GellyShow/Docs/GellyShow_Informacion.md](../assets/GellyShow/Docs/GellyShow_Informacion.md) | Descripción, alcance, pantallas y pendientes. |
| [../assets/GellyShow/Docs/GellyShow_Reglas.md](../assets/GellyShow/Docs/GellyShow_Reglas.md) | Reglas de vestir, Battle, rondas y puntuación. |
| [../assets/GellyShow/Gameplay/GellyShow.html](../assets/GellyShow/Gameplay/GellyShow.html) | Juego 2D autónomo para navegador. |

**Estado resumido:** el juego base está conectado al catálogo Gratis · Demo y al flujo de instalación/biblioteca; QA de navegador pendiente. El modo Online está pendiente de servidor.

## 6. Nuevos juegos y plataforma

| Proyecto | Archivos y función |
|---|---|
| [Geffen: Monopoly](../assets/geffen-monopoly/geffen_monopoly_juego_de_mesa_interactivo.html) | Juego de mesa HTML con bots y modo local. [Documentación técnica](../assets/geffen-monopoly/documentaci_n_del_sistema_geffen_monopoly.txt). |
| [Club de Cartas](../assets/star-solitaire/club_de_cartas_solitario_y_versus.html) | Solitario en Fila y modo Versus contra bot. |
| [Starship Plus](../assets/starship-plus/starship-plus.html) | Plataforma audiovisual demostrativa. [Guía de funcionalidades](../assets/starship-plus/starship-plus-funcionalidades.txt). |

**Estado resumido:** Geffen: Monopoly y Club de Cartas están conectados al catálogo gratuito y a la biblioteca de juegos instalados; la instalación sigue siendo una simulación local de 60 segundos. Starship Plus tiene una interfaz funcional de demostración, pero su reproductor no contiene vídeo real y no usa cuentas ni backend propios. Su enlace se encuentra en el área de miembros.

## 7. Auditorías de servicios y sincronización

| Documento | Función |
|---|---|
| [SUPABASE_GITHUB_SYNC_AUDIT.md](SUPABASE_GITHUB_SYNC_AUDIT.md) | Comparación entre la configuración del frontend y los proyectos Supabase observados. |

**Bloqueo vigente:** el ref Supabase configurado por el frontend no coincide con los proyectos disponibles verificados. No cambiar URL/clave, crear tablas, modificar políticas ni copiar datos hasta confirmar el backend canónico.

## 8. Fuentes y referencias conservadas

Estos archivos se mantienen con sus nombres y ubicaciones originales. Son material de consulta, prototipos o fragmentos de referencia; no son automáticamente módulos activos:

- `Click_.txt` — fragmento mínimo de evento de clic.
- `Contex_Ducument_PRIV.txt` — esquema descriptivo privado de carpetas y componentes de The LyrieLife.
- `Desplay.txt` — prototipo HTML de desplazamiento; extensión original .txt conservada.
- `InteractionClick.txt` — prototipo HTML de interacciones; extensión original .txt conservada.
- `source/Guia_de_Controles.txt`, `source/More_Interactions.txt`, `source/TheLirie_s_Inst.txt` y `source/The_Logic01.txt` — fuentes originales de diseño y sistemas.
- `../assets/The-LyrieLife/UI/` — HUD y menú de referencia, no conectados automáticamente al lanzador.
- `../assets/The-LyrieLife/CAL-CUL/Create-A-Lyrie-preview.html` — vista previa separada del creador activo `cal-cul.html`.
- `../assets/league-of-legacy/references/` — referencia visual de un cliente externo; no es interfaz propia ni permiso de reutilización.
- `../assets/Geffenite/docs/` — dossier, requisitos VIP y mapa conceptual de Geffenite.
- `../assets/GellyShow/Docs/` — información y reglas de GellyShow; el HTML de gameplay permanece separado.
- `../assets/geffen-monopoly/` — juego Geffen: Monopoly y su documentación técnica.
- `../assets/star-solitaire/` — Club de Cartas, Solitario y Versus.
- `../assets/starship-plus/` — interfaz demostrativa de Starship Plus y guía de funcionalidades.

## 9. Reglas para mantener la documentación

1. Actualizar primero el manifiesto cuando se añada, mueva o retire un asset.
2. Actualizar rutas y referencias de código en el mismo cambio lógico.
3. Mantener los documentos de auditoría alineados con el árbol real de GitHub.
4. Distinguir siempre entre **almacenado**, **referenciado por código**, **integrado**, **probado en navegador** y **desplegado**.
5. No renombrar ni convertir archivos fuente por conveniencia; generar derivados en rutas separadas cuando se necesiten.
6. No declarar QA visual ni despliegue si no se ejecutaron y verificaron.
7. Mantener este índice al día cuando se creen nuevos documentos.
