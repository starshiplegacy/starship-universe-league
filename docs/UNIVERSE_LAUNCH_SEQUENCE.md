# UNIVERSE LEAGUE — Secuencia universal de inicio

## Regla universal

Todo juego de UNIVERSE LEAGUE debe seguir la misma secuencia al entrar desde su panel. El video **UNIVERSE LEAGUE (Opening).mp4** es compartido por todos los juegos y se reproduce una sola vez por inicio de sesión/flujo de lanzamiento. No debe repetirse al pasar de una pantalla interna a otra.

## Orden de pantallas

1. El usuario abre **Jugar** y selecciona un juego.
2. Se muestra el **Panel del juego**.
3. El usuario pulsa **INICIAR**.
4. Se muestra el **logo del juego** (pantalla breve de identidad).
5. Se reproduce **UNIVERSE LEAGUE (Opening).mp4**.
6. Se reproduce la pantalla de carga exclusiva del juego.
7. Al terminar, se muestra el **Main Menu** del juego.

## Flujos definidos

### The LyrieLife

Jugar → Panel → INICIAR → Logo de The LyrieLife → UNIVERSE LEAGUE (Opening).mp4 → Lyrie Loanding.mp4 → Main Menu de The LyrieLife.

### League Of Legacy

Jugar → Panel → INICIAR → Logo de League Of Legacy → UNIVERSE LEAGUE (Opening).mp4 → Loading 01.mp4 → Main Menu de League Of Legacy.

## Assets de video

Ubicación prevista en el repositorio:

- `assets/videos/UNIVERSE LEAGUE (Opening).mp4` — compartido por todos los juegos.
- `assets/videos/Lyrie Loanding.mp4` — carga de The LyrieLife.
- `assets/videos/Loading 01.mp4` — carga de League Of Legacy.

Los nombres se conservan exactamente como fueron entregados. No convertirlos ni renombrarlos sin actualizar las referencias.

## Reglas de reproducción

- Reproducir en pantalla completa dentro del contenedor de lanzamiento, con relación de aspecto conservada.
- Usar reproducción automática con audio cuando el navegador lo permita; si el navegador bloquea el audio, iniciar en silencio y ofrecer control para activar sonido.
- Avanzar al siguiente video cuando termine el anterior.
- Incluir opción **Saltar** para accesibilidad y para navegadores que no puedan reproducir el video.
- Si un archivo no carga o falla, registrar el error y continuar con la siguiente etapa para no bloquear el acceso al juego.
- El Opening universal se reproduce una vez en cada flujo de lanzamiento, antes de la carga específica. No se reproduce al volver al Main Menu ni al navegar dentro del mismo juego.
- No mostrar el Main Menu hasta que finalice o se omita la carga específica.

## Estado de integración

- [x] Especificación y nombres de archivo registrados.
- [x] Lanzador común creado en `launch.html`.
- [x] Botón **INICIAR** del panel de The LyrieLife conectado al lanzador.
- [x] Retorno de The LyrieLife al menú principal tras los videos.
- [ ] Publicar los tres MP4 en `assets/videos/`; la carpeta contiene instrucciones, pero todavía no los binarios.
- [ ] Conectar el panel real de League Of Legacy al lanzador.
- [ ] Integrar el Main Menu real de League Of Legacy; el repositorio todavía no contiene esa pantalla.

El lanzador reproduce primero el Opening universal y después el video específico del juego. Tiene controles para activar sonido y saltar; si un archivo no carga, continúa para evitar bloquear el acceso. Los videos deben estar presentes con los nombres exactos para que la secuencia se reproduzca correctamente.

