# Índice de documentación — STARSHIP UNIVERSE LEAGUE

**Revisión:** 17 de noviembre de 2026  
**Repositorio:** `starshiplegacy/starship-universe-league` · `main`

Este índice organiza la documentación sin cambiar nombres ni extensiones de los archivos fuente. Los documentos de referencia y prototipos no se consideran automáticamente código activo.

## 1. Documentos de operación y arquitectura

| Documento | Función |
|---|---|
| [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) | Mapa general del portal, juegos, módulos y límites entre proyectos. |
| [TECHNICAL_OPERATING_PLAN.md](TECHNICAL_OPERATING_PLAN.md) | Orden de trabajo, dependencias, seguridad y criterios de preparación. |
| [ASSET_INGESTION_WORKFLOW.md](ASSET_INGESTION_WORKFLOW.md) | Procedimiento para recibir, clasificar, validar, publicar y conectar archivos. |
| [../assets/ASSET_MANIFEST.md](../assets/ASSET_MANIFEST.md) | Inventario canónico de recursos, rutas, tamaños, hashes y estado de integración. |
| [UNIVERSE_LAUNCH_SEQUENCE.md](UNIVERSE_LAUNCH_SEQUENCE.md) | Secuencia real de apertura, vídeos y destinos de los juegos. |

## 2. League Of Legacy

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

## 4. Auditorías de servicios y sincronización

| Documento | Función |
|---|---|
| [SUPABASE_GITHUB_SYNC_AUDIT.md](SUPABASE_GITHUB_SYNC_AUDIT.md) | Comparación entre la configuración del frontend y los proyectos Supabase observados. |

**Bloqueo vigente:** el ref Supabase configurado por el frontend no coincide con los proyectos disponibles verificados. No cambiar URL/clave, crear tablas, modificar políticas ni copiar datos hasta confirmar el backend canónico.

## 5. Fuentes y referencias conservadas

Estos archivos se mantienen con sus nombres y ubicaciones originales. Son material de consulta, prototipos o fragmentos de referencia; no son automáticamente módulos activos:

- `Click_.txt` — fragmento mínimo de evento de clic.
- `Contex_Ducument_PRIV.txt` — esquema descriptivo privado de carpetas y componentes de The LyrieLife.
- `Desplay.txt` — prototipo HTML de desplazamiento; extensión original .txt conservada.
- `InteractionClick.txt` — prototipo HTML de interacciones; extensión original .txt conservada.
- `source/Guia_de_Controles.txt`, `source/More_Interactions.txt`, `source/TheLirie_s_Inst.txt` y `source/The_Logic01.txt` — fuentes originales de diseño y sistemas.
- `../assets/The-LyrieLife/UI/` — HUD y menú de referencia, no conectados automáticamente al lanzador.
- `../assets/The-LyrieLife/CAL-CUL/Create-A-Lyrie-preview.html` — vista previa separada del creador activo `cal-cul.html`.
- `../assets/league-of-legacy/references/` — referencia visual de un cliente externo; no es interfaz propia ni permiso de reutilización.
- `../assets/Geffenite/docs/` — documentos de Geffenite, mantenidos en su área independiente.

## 6. Reglas para mantener la documentación

1. Actualizar primero el manifiesto cuando se añada, mueva o retire un asset.
2. Actualizar rutas y referencias de código en el mismo cambio lógico.
3. Mantener los documentos de auditoría alineados con el árbol real de GitHub.
4. Distinguir siempre entre **almacenado**, **referenciado por código**, **integrado**, **probado en navegador** y **desplegado**.
5. No renombrar ni convertir archivos fuente por conveniencia; generar derivados en rutas separadas cuando se necesiten.
6. No declarar QA visual ni despliegue si no se ejecutaron y verificaron.
7. Mantener este índice al día cuando se creen nuevos documentos.
