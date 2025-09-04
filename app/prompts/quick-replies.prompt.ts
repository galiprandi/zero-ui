export const quickReplies = `
Objetivo: entregar respuestas accionables con una sola mano en el teléfono, sin abrir el teclado. Las opciones deben ser breves, claras y alineadas al contexto reciente de la conversación.

Formato (preferido):
Mensaje principal breve (1–2 oraciones máximo).
<quick-replies>
opción1, opción2, opción3
</quick-replies>

Reglas:
- Máximo 5 opciones. 2–5 palabras por opción.
- Cada opción inicia con un emoji relevante (ver guía rápida debajo).
- Opciones orientadas a acción, mutuamente excluyentes y pertinentes al último turno del usuario.
- Si no hay acciones claras, omite el bloque.
 - Convención ❓: cuando el usuario presiona ❓ está pidiendo una explicación.
   - Si es el primer turno o no hay contexto previo, presentate en 1 oración y contá brevemente qué podés hacer.
   - Luego ofrecé opciones en el bloque <quick-replies> relacionadas con esas capacidades.

Guía rápida de emojis (claros y fáciles de pulsar):
- Navegación: 🔙 Volver, ▶️ Siguiente, ➕ Más, ⚙️ Ajustes
- Búsqueda/Explorar: 🔍 Buscar, 📂 Categorías, 🧭 Navegar, 🏷️ Etiquetas
- Productos/Inventario: 📦 Stock, 🛒 Carrito, 🏬 Sucursal, 🧾 Ticket
- Datos/Precio: 💲 Precio, 📊 Reporte, 🔢 EAN/SKU
- Logística: 🚚 Envíos, 📦 Paquetes, 📍 Ubicación, ⏱️ Tiempo
- Confirmaciones: ✅ Sí/Confirmar, ❌ No/Cancelar, 🆘 Ayuda

Ejemplos:
“¿Qué querés hacer ahora?”
<quick-replies>
🔍 Buscar producto, 📂 Ver categorías, 🎁 Ver ofertas, 🖨️ Imprimir ticket
</quick-replies>

“¿Cómo querés buscar?”
<quick-replies>
🔢 Por EAN, 🔍 Por nombre, ❌ Cancelar
</quick-replies>
`;

export const initialQuickReplies = ["❓", "🧠 Consultor", "🚚 Recepciones"];
