# Auditoría logística integral — STARSHIP UNIVERSE LEAGUE

**Corte de revisión:** 17 de noviembre de 2026  
**Repositorio:** starshiplegacy/starship-universe-league · rama main  
**Alcance:** inventario, dependencias, integración de código, documentación, backend, licencias, QA y preparación de entrega.

## 1. Dictamen ejecutivo

El repositorio ya contiene un portal común y varias experiencias diferenciadas. La estructura permite continuar el desarrollo, pero no debe tratarse como una versión final ni desplegarse como conjunto completo de juegos.

La prioridad logística es cerrar primero los bloqueos de backend, derechos y validación de recursos. No conviene desarrollar matchmaking, guardado remoto ni publicar mapas hasta confirmar esas dependencias.

## 2. Inventario verificado

| Área | Estado comprobado en GitHub | Lectura logística |
|---|---|---|
| Portal y lanzador | index.html, app.js, launch.html y módulos compartidos presentes | Integración base presente; QA visual pendiente |
| League Of Legacy — personajes | 8 GLB publicados y los 8 nombres aparecen en el selector | Conectado al visor; falta QA de carga y rendimiento por modelo |
| League Of Legacy — mapas | 421 archivos; 633.82 MiB; 405 DDS, 3 MTL, 2 OBJ, 2 GLB y fuentes adicionales | Inventario reconciliado; derechos y validación técnica bloquean uso jugable |
| The LyrieLife — mundos | 4 archivos .world en subcarpetas por mundo | Almacenados, pero el navegador no interpreta el formato |
| CAL/CUL | Módulo cal-cul.html, vista previa y conversor presentes; no hay GLB masculino/femenino publicados | Espera fuentes correctas y validación de conversión |
| Jaque Matte | Minijuego de ajedrez; descarga/instalación y lanzamiento desde biblioteca | Implementación presente; requiere prueba real del motor externo y guardado |
| Pinkie Star | Mahjong Solitaire; descarga/instalación y lanzamiento desde biblioteca | Implementado bajo nombre visible Pinkie Star; guardado nuevo usa pinkie-star y recupera pixxy-up anterior |
| Vídeos de inicio | 3 MP4 publicados en assets/videos/ | Lanzador usa los nombres reales actuales |
| Geffenite | Gameplay HTML, mapa conceptual, 2 DOCX, icono y póster | Beta VIP presentada; conservar entitlement activo y fuentes originales |
| GellyShow | Juego HTML autónomo, 2 documentos MD y recursos; Gratis · Demo con instalación desde catálogo | Juego base conectado al flujo de instalación; Online pendiente de servidor |
| Documentación | Índice, arquitectura, manifiesto, planes y auditorías | Referencias principales consolidadas; fuentes originales preservadas |

### Rutas de mundo

- assets/The-LyrieLife/Worlds/kataleya/Kataleya.world
- assets/The-LyrieLife/Worlds/kariskio/Kariskio.world
- assets/The-LyrieLife/Worlds/solnang/Solnang.world
- assets/The-LyrieLife/Worlds/abandoned-island/abandoned-island.world

Kataleya y Kariskio comparten el mismo Git blob SHA y tamaño. Se conservan ambos nombres; no se asume que sean mundos distintos ni se reemplaza uno por el otro.

### Nuevas experiencias — revisión 17 de noviembre

**Geffenite:** el juego y sus documentos están agrupados en `assets/Geffenite/`. El catálogo VIP revela el enlace según la entitlement/plan que devuelve la función Edge `starship-entitlements`; la vigencia real de la membresía debe verificarse en esa función. El HTML del mapa es una referencia conceptual. Los dos DOCX se preservan, sin afirmar que su contenido interno haya sido auditado en esta pasada.

**GellyShow:** el juego autónomo y sus documentos están agrupados en `assets/GellyShow/`. La información del proyecto indica que Online requiere servidor y está pendiente. No se encontró conexión al catálogo/lanzador; queda almacenado, no integrado.

## 3. Dependencias y bloqueos

### P0 — Backend y sincronización

El frontend apunta al proyecto Supabase wvyveduslbsuvyekeccf, que no coincide con los dos proyectos disponibles que se verificaron en la auditoría. Uno tiene un esquema distinto y el otro es un backend separado de catálogo/Django.

**No hacer:** cambiar URL o claves, crear tablas, alterar RLS, crear buckets ni copiar datos antes de identificar el backend canónico.

**Salida requerida:** confirmar el proyecto correcto, contrastar tablas y buckets, preparar migraciones versionadas, revisar RLS/Storage y verificar el esquema vivo.

### P0 — Derechos de mapas

- Summoner's Rift: requiere autorización escrita aplicable de Riot Games o sustitución por un mapa original.
- Versus 1 to 3: la licencia incluida es CC BY-NC; no autoriza por sí sola uso comercial.
- Versus 4 to 5 y Training: falta verificar titularidad/licencia y procedencia de cada recurso.

Los estados de licencia no deben marcarse como aprobados sin evidencia. Los cargadores permanecen bloqueados.

### P1 — QA y rendimiento

- Probar los ocho GLB en navegador y registrar errores, escala, animaciones, memoria y tiempos.
- Aquamarine.glb pesa aproximadamente 102.4 MB; requiere atención especial de descarga y memoria.
- Los vídeos y mapas son binarios grandes; no recodificar ni reemplazar originales sin generar y verificar derivados separados.
- El selector de mapas no implementa física, colisiones, navegación, spawns ni partida multijugador.

### P1 — The LyrieLife y CAL/CUL

- Los .world son fuentes preservadas, no mundos importados por el prototipo web.
- CAL/CUL espera los FBX y texturas masculinos/femeninos en su estructura de fuente local. No usar Emma.fbx ni modelos de League Of Legacy como sustitutos.
- La ruta canónica de salida GLB es assets/The-LyrieLife/CAL-CUL/models/.

### P2 — Recursos visuales

Los iconos de Jaque Matte y Pinkie Star están conectados al catálogo. Los archivos llamados (Postel).jpg se conservan con su nombre original y aún no se muestran en las tarjetas. Los originales de portada de alta resolución identificados en Library no se consideran publicados hasta que sus bytes estén en GitHub y se verifiquen.

## 4. Estado de conexión — no confundir niveles

| Elemento | Almacenado | Referenciado por código | Integrado | QA navegador | Desplegado |
|---|---:|---:|---:|---:|---:|
| Lanzador y vídeos | Sí | Sí | Sí | Pendiente | No verificado aquí |
| Visor de personajes | Sí | Sí | Sí | Pendiente | No verificado aquí |
| Mapas y selector | Sí | Sí | Parcial; carga bloqueada por licencia | Pendiente | No verificado aquí |
| The LyrieLife web | Sí | Sí | Vertical slice | Pendiente | No verificado aquí |
| Archivos .world | Sí | No como geometría jugable | No | No | No |
| CAL/CUL GLB | No | Ruta preparada | Pendiente de modelos | No | No |
| Jaque Matte | Código y assets | Sí | Minijuego | Pendiente | No verificado aquí |
| Pinkie Star | Código y assets | Sí | Mahjong Solitaire | Pendiente | No verificado aquí |
| Guardado remoto | No confirmado | Sí | Bloqueado por proyecto/schema | No | No |

## 5. Orden recomendado de trabajo

1. **Proteger la línea base:** mantener main, manifiesto, documentación y originales; no desplegar ni mover binarios.
2. **Cerrar backend:** confirmar Supabase canónico y revisar esquema, RLS, Auth y Storage.
3. **Cerrar derechos:** resolver permisos o reemplazos para los mapas antes de habilitar previews.
4. **QA de recursos:** verificar los ocho GLB, tres MP4 y rutas de assets con pruebas reales de navegador.
5. **CAL/CUL:** recibir los dos modelos fuente y texturas correctos; ejecutar el conversor y revisar informes de imágenes no resueltas.
6. **The LyrieLife:** identificar el formato de los archivos .world y una vía oficial de importación; no prometer conversión hasta conocerlo.
7. **Gameplay de League Of Legacy:** especificar reglas, colisiones, spawns y Training vertical slice con mapa autorizado antes de matchmaking.
8. **QA y release:** pruebas desktop/móvil, accesibilidad, rendimiento, errores, rollback y autorización explícita de despliegue.

## 6. Cambios de mantenimiento realizados en esta revisión

- Se creó docs/DOCUMENTATION_INDEX.md para localizar documentos operativos, auditorías y fuentes.
- Se actualizó el manifiesto con rutas reales de mundos, integración de Pinkie Star y estado de los recursos.
- Se corrigieron referencias antiguas de vídeos y rutas de CAL/CUL en documentación y código.
- Se cambió la persistencia de Pinkie Star a la clave pinkie-star, con recuperación y migración desde pixxy-up.
- Se corrigió el auditor estático para buscar los cuatro mundos en sus subcarpetas y verificar la migración de Pinkie Star.
- Se añadieron comprobaciones de sintaxis JavaScript al workflow de GitHub Actions.
- Se actualizó el selector/leyenda de personajes de League Of Legacy para reflejar los ocho modelos publicados.
- Se inventariaron Geffenite y GellyShow; se clasificaron sus documentos, gameplay e imágenes y se documentó el estado real de conexión.

## 7. Límites de esta auditoría

La revisión se realizó sobre el árbol y los archivos de GitHub. No se ejecutó una sesión interactiva en navegador, no se probaron dispositivos físicos, no se aplicaron cambios de Supabase, no se modificaron licencias y no se lanzó un despliegue. Los resultados de GitHub Actions deben consultarse después de que finalice la ejecución correspondiente al último commit.


## Flujo uniforme de instalación — actualización 17 de noviembre de 2026

- Todos los juegos del catálogo pasan por **Catálogo → Descargar/Instalar → Juegos instalados → Jugar**. El estado gratuito elimina el pago, no el paso de instalación.
- Jaque Matte, Pinkie Star y GellyShow se ofrecen como **Gratis · Demo** y se registran en la biblioteca de la cuenta después de completar la instalación.
- The LyrieLife y League Of Legacy conservan sus entradas de catálogo y el mismo mecanismo de instalación. Geffenite conserva el control VIP y solo se ofrece a cuentas con la entitlement `geffenite_beta`.
- El progreso de 60 segundos es una simulación de instalación para la demo: registra el juego en la biblioteca local por usuario, pero no descarga un paquete nativo ni sincroniza instalaciones entre dispositivos.
