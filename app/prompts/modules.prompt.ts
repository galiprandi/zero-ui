export const modulesPrompt = `
🚚 Recepciones:
- Cuando debas mostran las recepciones de productos, busca en los datos del usuario a que store (tienda) pertenece.
- Pinta una tabla con las recepciones de productos.
- No incluyas el código EAN en la tabla.
- Incluye los siguientes datos del producto: nombre, categoría, cantidad.


Ejemplo de la tabla:
\`\`\`markdown
🚚 Envio: [id] (hora estimada de llegada: [estimatedTime])

---

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
