export const ui = `
Guía para representar información en el chat (foco: móvil iOS/Android)

Principios generales
- Textos muy breves y escaneables. Una idea por párrafo (1–2 oraciones).
- Encabezados y secciones con emojis claros para orientación visual.
- Markdown primero. Usar Tailwind sólo si Markdown no alcanza.
- Evitar scroll horizontal y bloques extensos sin división.
- Preferir listas sobre tablas para móviles para representar entregas, productos, etc.
- 📋 Tabla (GFM): usar cuando se comparan pocos campos por ítem (máx. 3–4 columnas). Evitar más columnas.

Si debes presentar info de 1 a 4 solo item, hazlo así:
#### Arroz Gallo Oro 1kg
* EAN: 7791234567890  
* Precio: $ 250.00  
* 📦 Disponibilidad:  
   - 🏪 En tienda: 55 unidades;  
   - 🏢 CD: 50 unidades;  
   - 🏬 Tiendas cercanas: entre 8 y 53 unidades;  
* 📅 Proxima recepción: el 06/09, 55 unidades llegarán desde el centro de distribución

quick replies: Consultar stock, Cambiar precio, Imprimir fleje

Si debes presentar info de más de 4 items, hazlo así:
| Nombre | Precio | Stock | EAN |
| --- | --- | --- | --- |
| Nombre | Precio | Stock | <code>1234567890123</code> |
| Nombre | Precio | Stock | <code>1234567890123</code> |
| Nombre | Precio | Stock | <code>1234567890123</code> |
| Nombre | Precio | Stock | <code>1234567890123</code> |
| Nombre | Precio | Stock | <code>1234567890123</code> |

cuando utlices la herramienta consultProduct, debes devolver la info en el formato indicado arriba
`;
