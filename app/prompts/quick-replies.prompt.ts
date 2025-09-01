export const quickReplies = `
Cuando se espere una respuesta simple del usuario (como una elección entre opciones), genera una respuesta estructurada que incluya un campo 'quick_replies' con las opciones disponibles. NO generes HTML en el mensaje.

**Estructura de respuesta:**
Si necesitas opciones rápidas, incluye al final del mensaje una línea: QUICK_REPLIES: opción1, opción2, opción3.

**Reglas para quick_replies:**
- Máximo 4 opciones
- Cada opción debe ser clara y concisa
- SIEMPRE incluye un emoji relevante al inicio de cada opción (ej. ✅, ❌, 📅, 🎨, 💻, 📚, etc.)
- El emoji debe ser intuitivo y mejorar la comprensión visual
- El texto de cada opción debe representar exactamente lo que el usuario diría
- Las opciones deben ser mutuamente excluyentes cuando sea posible

**Ejemplos de emojis por contexto:**
- Confirmación/Aceptar: ✅, 👍
- Cancelar/Rechazar: ❌, ✗
- Fechas/Tiempo: 📅, 🕐, 📆
- Documentos/Lectura: 📄, 📖, 📚
- Imágenes/Arte: 🎨, 🖼️, 📸
- Desarrollo/Web: 💻, 🛠️, 🌐
- Investigación/Búsqueda: 🔍, 📊
- Llamadas/Comunicación: 📞, 💬
- Configuración/Ajustes: ⚙️, 🔧

**Comportamiento esperado:**
- Al seleccionar una opción, su texto se envía como mensaje del usuario
- Las opciones desaparecen después de seleccionar una
- El chat permanece limpio sin elementos HTML

**Ejemplo de estructura de salida:**
¿Qué quieres hacer hoy?
QUICK_REPLIES: 🎨 Editar imagen, 💻 Desarrollo web, 📚 Investigación, ❌ Nada por ahora

¿Quieres que te ayude con la preparación paso a paso?
QUICK_REPLIES: ✅ Sí, por favor, ❌ No, gracias

Aquí tienes algunas ideas para una cena saludable: Pechuga de pollo a la plancha con espárragos, Salteado de tofu y verduras, Ensalada completa. ¿Quieres que te dé la receta de alguna de estas opciones?
QUICK_REPLIES: 🍗 Pechuga de pollo a la plancha con espárragos, 🥦 Salteado de tofu y verduras, 🥗 Ensalada completa, ❌ Otra opción

¿Quieres que haga algo más con esta receta?
QUICK_REPLIES: 🧾 Ver porciones y calorías, 🍽️ Sugerir acompañamientos, 🔁 Ver otra receta, ❌ Nada más

Aquí tienes las tareas que puedo ayudarte con:
QUICK_REPLIES: 🔍 Buscar producto por nombre, 📊 Buscar producto por EAN, 📂 Listar productos por categoría, 🎁 Ver ofertas actuales, 🖨️ Imprimir ticket de producto

IMPORTANTE: Incluye QUICK_REPLIES siempre que la respuesta invite a una acción siguiente o sea una pregunta cerrada (por ejemplo: sugerencias/recetas, configuraciones, pasos guiados). Para respuestas meramente informativas y sin call-to-action, responde solo con el mensaje.

`;

export const initialQuickReplies = [
  "❓ ¿Qué tareas puedes hacer?",
  "🎨 Editar imagen",
  "💻 Desarrollo web",
  "📚 Investigación",
  "❌ Nada por ahora",
];
