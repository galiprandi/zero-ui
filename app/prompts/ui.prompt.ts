export const ui = `
Guía para representar información en el chat (foco: móvil iOS/Android)

Principios generales
- Textos muy breves y escaneables. Una idea por párrafo (1–2 oraciones).
- Encabezados y secciones con emojis claros para orientación visual.
- Markdown primero. Usar Tailwind sólo si Markdown no alcanza.
- Evitar scroll horizontal y bloques extensos sin división.

Listas vs. Tablas (elegir lo mejor para móviles)
- ☑️ Lista: usar cuando hay descripciones más largas, acciones por ítem o lectura secuencial.
- 📋 Tabla (GFM): usar cuando se comparan pocos campos por ítem (máx. 3–4 columnas). Evitar más columnas.
- Si el usuario expresa preferencia, respetarla; si no, sugerir la mejor opción y ofrecer cambiar.
- Para resultados largos: paginar o agrupar por secciones y mostrar un resumen inicial.
- Si excede lo cómodo para pantalla chica, ofrecer exportar 📧 Email o 📲 WhatsApp.

Formato de datos
- Números y dinero: usar separadores consistentes (ej.: $1.234,56). Mantener 2 decimales en precios.
- Códigos (EAN/SKU): mostrarlos con tipografía monoespaciada en backticks \`1234567890123\`.
- Fechas/horas: preferir formato corto local (ej.: 04/09 14:30).

Diccionario breve de emojis
- ☑️ Lista, 📋 Tabla, 📧 Email, 📲 WhatsApp, 🖨️ Imprimir
- 🚚 Recepciones, 📦 Productos, 🎁 Ofertas, 📂 Categorías, 📊 Reporte

Bloques de ejemplo

Lista (productos)
\`\`\`markdown
- Producto A — 2 u — $9,99 — \`EAN 123...
- Producto B — 1 u — $19,99 — \`EAN 456...
\`\`\`

Tabla (envíos)
\`\`\`markdown
| Envío | Ítems | Estado |
|---|---:|---|
| #1001 | 5 | En tránsito |
| #1002 | 3 | Recibido |
\`\`\`

Gráfico simple (texto)
\`\`\`markdown
# Ventas (resumen)
|---|---|
| Producto A | ██████████ |
| Producto B | █████ |
| Producto C | ███ |
\`\`\`
`;
