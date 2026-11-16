# STARSHIP UNIVERSE LEAGUE

Repositorio principal del universo de juegos de STARSHIP LEGACY ENTERTAINMENT.

## Juegos

### The LyrieLife
- Juego de simulación de vida.
- Creador de personajes: `CUL_CAS` / `CAL-CUL`.
- Los recursos originales del juego se mantienen separados en su archivo fuente.
- Entrada: `launch.html?game=lyrie` → menú de The LyrieLife.

### League Of Legacy
- Juego de batalla multijugador.
- Menú 3D: `league-of-legacy.html`.
- Personajes 3D: Charlotte, Arthur y Bella.
- Entrada: `launch.html?game=legacy` → `league-of-legacy.html`.

## Lanzador universal
`launch.html` reproduce primero el opening compartido y después el vídeo de carga específico del juego. La secuencia completa está documentada en [docs/UNIVERSE_LAUNCH_SEQUENCE.md](docs/UNIVERSE_LAUNCH_SEQUENCE.md).

## Estructura de recursos

```
assets/
  videos/
    UNIVERSE LEAGUE (Opening).mp4
    Lyrie Loanding.mp4
    Loading 01.mp4
  league-of-legacy/
    characters/
      charlotte.glb
      arthur.glb
      bella.glb
```

Los nombres y rutas de los archivos binarios deben conservarse exactamente. Los modelos GLB ya incluyen sus imágenes y datos geométricos; el visor configura Meshopt y Draco cuando corresponde. Los MP4 se usan en su formato original.

## Estado de publicación de binarios

El código, el visor de los tres personajes y la documentación ya están en este repositorio. Los archivos GLB y MP4 originales están organizados en el paquete de assets entregado aparte y aún deben copiarse a las rutas de `assets/`. El archivo fuente de The LyrieLife se conserva aparte porque contiene recursos propietarios y no debe mezclarse con los personajes de League Of Legacy.

## Documentación
- [Secuencia de inicio e inventario de assets](docs/UNIVERSE_LAUNCH_SEQUENCE.md)
- [Personajes de League Of Legacy](assets/league-of-legacy/characters/README.md)
- [Vídeos de inicio](assets/videos/README.md)

## Requisitos de ejecución
Las páginas usan HTML, CSS y JavaScript de navegador. El visor 3D carga Three.js desde CDN y necesita conexión para descargar Three.js y sus decodificadores. El modo de partida multijugador de League Of Legacy todavía no está conectado; el botón JUGAR permanece desactivado.
