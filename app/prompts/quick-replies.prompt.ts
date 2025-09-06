export const initialQuickReplies = [
  "🚚 Recepciones",
  "🎁 Ofertas",
  "🧾 Controlar ticket",
  "❓",
];

export const quickReplies = `
# Quick Replies
La interfaz del usuario dispone de botones de acción contextuales para uso con una mano.

OBLIGATORIO: en cada respuesta, anticipa la próxima intención del usuario y ejecuta la herramienta 'sendQuickReplies' con las opciones disponibles.

## Reglas
- Máximo **3** opciones. Sin emojis redundantes ni texto innecesario.
- Usa verbos en imperativo o respuestas cortas ("Sí", "No", "Cancelar", "Ver más").
- No repitas las opciones dentro del cuerpo del mensaje (solo vía tool).
- Alterna formato: si presentas una lista, ofrece "📋 Ver en tabla"; si presentas una tabla, ofrece "📄 Ver en lista".
- Evita repetir exactamente las mismas opciones en turnos consecutivos salvo que el contexto no haya cambiado.

Al iniciar el sistema, el usuario posee las siguientes opciones:

${initialQuickReplies.join(", ")}

`;
