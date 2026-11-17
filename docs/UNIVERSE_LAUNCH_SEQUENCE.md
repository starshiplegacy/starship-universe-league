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
7. Menú principal del juego.

## Flujos
- **The LyrieLife:** Panel → INICIAR → logo → Opening universal → `Lyrie Loanding.mp4` → menú de The LyrieLife.
- **League Of Legacy:** Panel → INICIAR → logo → Opening universal → `Loading LOL.mp4` → `league-of-legacy.html`.

## Inventario y ubicación de archivos

### League Of Legacy
Los ocho modelos GLB pertenecen al conjunto de personajes de League Of Legacy y están publicados en `assets/league-of-legacy/characters/`. El selector de `league-of-legacy.html` incluye los ocho nombres:

| Archivo | Contenido verificado | Requiere conversión |
|---|---|---|
| `Charlotte.glb` | GLB 2.0, 267 nodos, 7 mallas, 7 materiales, 7 skins, 56 animaciones, 2 imágenes WebP embebidas; usa Meshopt y KHR quantization | No |
| `Arthur.glb` | GLB 2.0, 105 nodos, 1 malla, 1 material, 1 skin, 1 animación `Default`, 2 imágenes; usa Draco | No |
| `Bella.glb` | GLB 2.0, 2 nodos, 1 malla, 1 material, 4 imágenes; modelo estático sin rig ni animaciones | No |
| `Emma.glb` | GLB publicado (32,834,236 bytes); inspección detallada de rig, animaciones y materiales pendiente | No se requiere conversión por ahora |
| `Aquamarine.glb` | GLB publicado (102,393,040 bytes); inspección detallada y perfil de rendimiento pendiente | No se requiere conversión por ahora |
| `Opal (Opalo).glb` | GLB publicado (2,133,496 bytes); inspección detallada pendiente | No se requiere conversión por ahora |
| `Optopool.glb` | GLB publicado (2,231,416 bytes); inspección detallada pendiente | No se requiere conversión por ahora |
| `Stella.glb` | GLB publicado (31,908,604 bytes); inspección detallada pendiente | No se requiere conversión por ahora |

El menú `league-of-legacy.html` incluye selector para Charlotte, Arthur, Bella, Emma, Aquamarine, Opal (Opalo), Optopool y Stella. Los metadatos detallados de estructura solo están documentados para Charlotte, Arthur y Bella. Los otros cinco están publicados y listados, pero requieren inspección técnica individual antes de optimizar o modificar. El selector de animación se activa cuando el modelo tiene clips. El visor configura Three.js `GLTFLoader`, `MeshoptDecoder` y `DRACOLoader`; no hay que volver a convertir ni comprimir estos modelos.

### The LyrieLife y CAL_CUL
Documentación previa describe un archivo fuente `The LyreLife (Para HTML).tar.gz` con 339 entradas (aprox. 411 MB sin comprimir), incluyendo:
- CUL_CAS: contenido masculino, femenino, mascotas y recursos de ADN.
- UI & Complements, Main Menu, Menu_De_Configuraciones, Intros, Pantalla de Carga y Mapa.
- Contenido de juego `.package`, `.layer`, `.world`, `.blueprint`, `.bpi` y `.ts4script`.
- Documentos PDF y DOCX de referencia.

La disponibilidad actual de ese paquete no está confirmada en Library ni en el árbol de GitHub; no afirmar que está respaldado ni convertirlo en requisito del repositorio. Si se localiza, se conserva como archivo fuente. No convertir los formatos propietarios del juego (`.package`, `.world`, `.layer`, etc.) a GLB o a imágenes: no son modelos 3D intercambiables y convertirlos dañaría su función. Los modelos GLB de League Of Legacy nunca se mezclan con CUL_CAS.

### Vídeos
Los originales son MP4 y deben copiarse sin renombrar ni recodificar a `assets/videos/`:
- `UNIVERSE LEAGUE (Opening).mp4` — compartido.
- `Lyrie Loanding.mp4` — The LyrieLife.
- `Loading LOL.mp4` — League Of Legacy.

## Estado de implementación
- [x] Lanzador universal y secuencia de reproducción.
- [x] Panel INICIAR de The LyrieLife conectado.
- [x] Panel INICIAR de League Of Legacy conectado.
- [x] Menú 3D de League Of Legacy con selector de los ocho personajes.
- [x] Compatibilidad del visor con Meshopt y Draco.
- [x] Inventario técnico y separación de recursos por juego.
- [x] Publicar los ocho GLB de personajes y los tres MP4 en sus rutas definitivas de GitHub.
- [ ] Conectar el modo de partida multijugador; la vista de personajes y el selector de mapas no constituyen todavía una partida jugable.

## Reproducción y fallos
El lanzador inicia en silencio para respetar las restricciones de autoplay del navegador y ofrece activar sonido y saltar. Si un vídeo no está disponible o falla, continúa con la siguiente etapa para no bloquear el acceso. El menú 3D muestra un aviso si falta un GLB o no puede decodificarse. Los nombres de archivo distinguen mayúsculas y espacios; no renombrar los originales.
