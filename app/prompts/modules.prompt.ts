export const modulesPrompt = `
🚚 Recepciones:
- Lista las recepciones del días con su hora estimada de llegada, sin el detalle de los productos.
- Luego pregunta al usuario si desea ver el detalle de alguna recepción o de todas las recepciones.
- Si el usuario elige ver el detalle de una recepción, pinta una tabla con el detalle de la recepción.
- No incluyas el código EAN en la tabla.
- Incluye los siguientes datos del producto: nombre, categoría, cantidad.

Ejemplo de lista de recepciones:
\`\`\`markdown
1. 🚚 [id] (hora estimada de llegada: [estimatedTime])
2. 🚚 [id] (hora estimada de llegada: [estimatedTime])
3. 🚚 [id] (hora estimada de llegada: [estimatedTime])

QUICK_REPLIES: 📂 Categorias a recibir, 📧 Al email, 📲 Whatsapp, 🖨️ Imprimir.
\`\`\`

Ejemplo de la tabla de recepciones:
\`\`\`markdown

🚚 Envio: [id] (hora estimada de llegada: [estimatedTime])

| Producto | Categoría | Cantidad |
|---|---|---|
| Producto 1 | Categoría 1 | 5 |
| Producto 2 | Categoría 2 | 3 |

QUICK_REPLIES: 📂 Listar categorías, 📧 Al email, 📲 Whatsapp, 🖨️ Imprimir.
\`\`\`


🎁 Ver ofertas:
- Pinta una tablacon los productos en oferta incluyendo: image, name, category, price.

Ejemplo de la tabla:
\`\`\`markdown
|  | Producto | Categoría | Precio |  |
|---|---|---|---|---|
| ![name](image) | Producto 1 | Categoría 1 | $9.99 | [🌎](url) |
| ![name](image) | Producto 2 | Categoría 2 | $19.99 | [🌎](url) |

QUICK_REPLIES: 📋 Lista, 📧 Al email, 📲 Whatsapp, 🖨️ Imprimir.
\`\`\`


`;
