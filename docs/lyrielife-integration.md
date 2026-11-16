# The LyrieLife — integración de documentos y prototipo

## Archivos de referencia

La implementación combina las especificaciones y prototipos suministrados para:

- **Controles:** PC, cámara, CUL_CAS, modo construcción, controles táctiles, reasignación y manejo de entradas.
- **Logística:** arranque, recuperación de partida, guardado automático/manual, cambio entre mundos, cierre seguro y separación entre datos del juego y datos del jugador.
- **Sistemas de Lyries:** ocho necesidades, emociones, rutina, relaciones, autonomía, rasgos y ciclo de vida.
- **Interacciones:** menús contextuales para objetos, desplazamiento y categorías sociales con requisitos de relación.
- **Desplazamiento:** movimiento por el escenario, selección del Lyrie activo y desplazamiento individual o acompañado.

## Integración realizada

La página `lyrielife.html` es un prototipo jugable conectado al sitio:

1. El botón **Iniciar** del panel de The LyrieLife abre el menú existente.
2. **Resume / Load Game** abre el prototipo y recupera el último estado guardado.
3. **New Game** crea una partida nueva y comienza en Kataleya.
4. Se puede mover el Lyrie por el escenario, seleccionar personajes e interactuar con cama, nevera, fregadero, ordenador, parque y piscina.
5. Las ocho necesidades se muestran en barras y cambian con el paso del tiempo y las acciones.
6. Los menús sociales implementan Amistoso, Gracioso, Pillería, Mezquino, Más opciones, Clubes y Acciones. Algunas opciones se bloquean hasta alcanzar el nivel de relación requerido.
7. La autonomía parcial revisa periódicamente la necesidad más baja y elige una acción de respuesta. Se puede cambiar entre autonomía total, parcial y ninguna.
8. El cambio entre Kataleya, Kariskio y Solnang conserva el mismo estado de partida.
9. Se implementan velocidad/pausa, movimiento con flechas, cambio de Lyrie con Tab, menú con Esc y acceso a los controles de referencia.
10. **Guardar** escribe el estado local; STARSHIP SAVE SYSTEM puede sincronizarlo con `game_saves` cuando hay una sesión válida. **Guardar como…** crea copias manuales locales.

## Persistencia

Se añadió `the-lyrielife` a la lista de juegos admitidos por `save-system.js`. El estado serializado incluye mundo, día y hora, velocidad, modo, autonomía, Lyries, posición, necesidades, rasgos, emoción, relación, inventario y cola de acciones.

La partida se recupera en pausa para que el jugador pueda orientarse. El cambio de mundo y el cambio de día disparan guardados. El autoguardado periódico se ejecuta cuando hay cambios.

## Límites actuales del prototipo

Esto es una **vertical slice jugable de navegador**, no el motor final ni una build nativa. El entorno visual, movimiento, acciones y simulación son representaciones de prototipo. La reasignación de teclas, cámara 3D real, CUL_CAS completo, inventario persistente interactivo, trabajos/escuela, progresión completa de edades, muerte, casas/objetos `.package`, validación de instalaciones y guardados manuales en nube todavía requieren implementación adicional. Las opciones de Gallery y Options del menú principal siguen marcadas como próximas.

Las reglas originales se han mantenido como guía; donde el motor real aún no existe, el prototipo no finge tener una simulación completa.