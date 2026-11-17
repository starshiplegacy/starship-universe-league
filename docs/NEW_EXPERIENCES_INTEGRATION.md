# Integración de nuevos juegos y Starship Plus

**Fecha de revisión:** 17 de noviembre de 2026  
**Repositorio:** `starshiplegacy/starship-universe-league` · `main`

## 1. Geffen: Monopoly

- Fuente: `assets/geffen-monopoly/geffen_monopoly_juego_de_mesa_interactivo.html`.
- Especificación: `assets/geffen-monopoly/documentaci_n_del_sistema_geffen_monopoly.txt`.
- Juego de mesa económico ambientado en la ciudad de Geffen, con Zeny como moneda.
- Tablero CSS Grid 7×7 y 24 casillas perimetrales.
- Modos descritos: 1v1, 1v2 y 1v3 contra bots; 2 jugadores locales (Pass & Play).
- Integración: panel Gratis · Demo → Instalar → Juegos instalados → PLAY.
- El juego abre como HTML autónomo. No se ha conectado persistencia remota ni multijugador online.

## 2. Club de Cartas — Solitario y Versus

- Fuente: `assets/star-solitaire/club_de_cartas_solitario_y_versus.html`.
- Título interno: CLUB DE CARTAS. La carpeta de origen `star-solitaire` se conserva.
- Modos descritos en la interfaz: Solitario en Fila y Versus contra bot.
- Integración: panel Gratis · Demo → Instalar → Juegos instalados → PLAY.
- El modo Versus contra bot no equivale a juego online; no se encontró un servidor de partidas.

## 3. Starship Plus

- Plataforma: `assets/starship-plus/starship-plus.html`.
- Guía: `assets/starship-plus/starship-plus-funcionalidades.txt`.
- El portal ofrece el enlace desde el bloque Starship Plus Pro del área de miembros.
- La interfaz contiene navegación For You / Drama & Movie / SPORT, búsqueda, filas de catálogo, fichas, My List, ajustes y reproductor simulado.
- Los datos del perfil, favoritos, progreso y preferencias se guardan en localStorage del navegador.
- No hay vídeo real: el reproductor simula el avance y anima un fondo espacial. Los títulos son datos de muestra.
- No hay autenticación real, sincronización de perfiles, backend de catálogo, HLS, checkout ni enlaces privados de estrenos.

**Seguridad:** el bloque del portal oculta el acceso directo a visitantes sin membresía, pero el HTML estático puede abrirse por su ruta. No almacenar ni publicar contenido privado dentro del archivo. Antes de estrenos exclusivos, implementar autorización de servidor basada en entitlement y URLs de vídeo privadas/firmadas.

## 4. Flujo de catálogo y biblioteca

Los dos juegos nuevos usan el mecanismo existente de instalación de 60 segundos. Es una simulación que guarda el identificador del juego en localStorage por usuario; no descarga archivos, no instala software nativo y no sincroniza la biblioteca entre dispositivos.

## 5. Validación pendiente

- Probar arranque, turnos, compras, rentas, bancarrota y victoria de Geffen: Monopoly.
- Probar reparto, selección de parejas, condiciones de fin y reinicio en Club de Cartas.
- Probar navegación, búsqueda, filtros, favoritos, progreso, ajustes y responsive de Starship Plus.
- Verificar accesibilidad, errores de consola y uso en móvil.
- Conectar medios reales, backend de catálogo y cuentas antes de presentar Starship Plus como servicio de streaming operativo.
