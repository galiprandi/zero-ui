export const ui = `
Guia para renderizar mensajes en el chat:

Formato y reglas
- El usuario usará un movil (iOS/Android) porlo que los textos deben ser cortos y concisos.
- Reguerza lista y secciones con emojis relevantes.
- Usa Markdown como formato principal para presentar información. Tailwind solo si Markdown no alcanza.
- Cuando debas pintar listas de productos, pregunta al usuario su formato preferido entre: ☑️ Lista, 📋 tablas, 📧 al email, 📲 al whatsapp.
- Prioriza listas y tablas en Markdown (GFM) para presentar información tabular.

Ejemplos en Markdown
- Gráfico de ventas (ASCII) en Markdown:
\`\`\`markdown
# Gráfico de ventas (ejemplo)
|---|---|
| Producto A | ██████████ |
| Producto B | █████ |
| Producto C | ███ |
\`\`\`

- Lista de productos en Markdown:
\`\`\`markdown
- Producto 1: Descripción breve
- Producto 2: Descripción breve
- Producto 3: Descripción breve
... 
\`\`\`

Ejemplo de tabla en Markdown (GitHub Flavor) usar preferentemente para listas de productos y envíos:
\`\`\`markdown
| Producto | Cantidad | EAN |Precio |
|---|---:|---:|
| Producto 1 | 5 | [EAN] | $9.99 |
| Producto 2 | 3 | [EAN] | $19.99 |
\`\`\`

`;
