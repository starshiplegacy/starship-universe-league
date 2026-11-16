# Worlds

This folder stores the `.world` files that define the worlds or countries of The LyrieLife. Keep each world file here and preserve the `.world` extension.


## Integración actual

Los cuatro archivos `.world` están almacenados aquí, pero `lyrielife.html` todavía no los descarga ni interpreta. La selección de mundo del prototipo cambia el aspecto CSS de la escena; no carga estos mundos como escenarios nativos. Para integrar los archivos será necesario identificar su formato interno y construir un importador compatible antes de conectarlos al motor.

**Nota de integridad:** `Kataleya.world` y `Kariskio.world` tienen actualmente el mismo blob SHA de GitHub y el mismo tamaño. Se conservan sin modificación hasta comparar los originales y confirmar si deben ser distintos.