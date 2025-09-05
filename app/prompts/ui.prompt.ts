export const ui = `
Guía para representar información en el chat (foco: móvil iOS/Android)

Principios generales
- Textos muy breves y escaneables. Una idea por párrafo (1–2 oraciones).
- Encabezados y secciones con emojis claros para orientación visual.
- Markdown primero. Usar Tailwind sólo si Markdown no alcanza.
- Evitar scroll horizontal y bloques extensos sin división.
- Preferir listas sobre tablas para móviles.
- 📋 Tabla (GFM): usar cuando se comparan pocos campos por ítem (máx. 3–4 columnas). Evitar más columnas.

Si debes presentar info de 1 a 4 solo item, hazlo así:
[Nombre]

- Precio: $1.234,56
- Stock: 12 un.
- EAN: 1234567890123
- [Otros datos relevantes]

quick replies: Consultar stock, Cambiar precio, Imprimir fleje

Si debes presentar info de más de 4 items, hazlo así:
| Nombre | Precio | Stock | EAN |
| --- | --- | --- | --- |
| Nombre | Precio | Stock | <code>1234567890123</code> |
| Nombre | Precio | Stock | <code>1234567890123</code> |
| Nombre | Precio | Stock | <code>1234567890123</code> |
| Nombre | Precio | Stock | <code>1234567890123</code> |
| Nombre | Precio | Stock | <code>1234567890123</code> |

`;
