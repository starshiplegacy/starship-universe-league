# UNIVERSE LEAGUE — Secuencia universal de inicio

## Regla universal

Todos los juegos entran por el mismo lanzador. El video **UNIVERSE LEAGUE (Opening).mp4** se comparte y se reproduce una vez por cada flujo de lanzamiento, antes del video de carga específico del juego.

## Orden

1. Jugar → seleccionar juego.
2. Panel del juego.
3. INICIAR.
4. Logo del juego.
5. `UNIVERSE LEAGUE (Opening).mp4`.
6. Video de carga del juego.
7. Main Menu del juego.

## Flujos

- **The LyrieLife:** Panel → INICIAR → logo → Opening universal → `Lyrie Loanding.mp4` → menú de The LyrieLife.
- **League Of Legacy:** Panel → INICIAR → logo → Opening universal → `Loading 01.mp4` → `league-of-legacy.html` (menú con vista 3D de Charlotte).

## Archivos y ubicaciones

- `assets/videos/UNIVERSE LEAGUE (Opening).mp4` — compartido.
- `assets/videos/Lyrie Loanding.mp4` — The LyrieLife.
- `assets/videos/Loading 01.mp4` — League Of Legacy.
- `assets/league-of-legacy/characters/charlotte.glb` — personaje Charlotte, exclusivo de League Of Legacy.

Charlotte ya se encuentra en GLB 2.0, con texturas WebP integradas, rig de 257 articulaciones y 56 clips de animación. No requiere conversión FBX ni conversión de texturas. El visor usa Three.js GLTFLoader y MeshoptDecoder para cargar las extensiones incluidas en el GLB.

## Estado de implementación

- [x] Lanzador universal y orden de reproducción.
- [x] Panel INICIAR de The LyrieLife conectado.
- [x] Panel INICIAR de League Of Legacy conectado.
- [x] Menú de League Of Legacy creado con Charlotte como personaje destacado.
- [x] Selector de las animaciones incluidas en Charlotte.
- [ ] Añadir los binarios MP4 y `charlotte.glb` al repositorio en las rutas indicadas. Están reunidos en el paquete de assets preparado para publicar.
- [ ] Conectar el modo de partida multijugador; el botón JUGAR se mantiene desactivado hasta que exista esa integración.

## Reproducción y fallos

El lanzador inicia en silencio para respetar las restricciones de autoplay del navegador y ofrece activar sonido y saltar. Si un video no está disponible o falla, continúa con la siguiente etapa para no bloquear el acceso. El menú 3D muestra un aviso si el GLB falta o no puede decodificarse.
