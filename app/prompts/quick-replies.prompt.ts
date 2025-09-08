export const initialQuickReplies = [
  "🚚 Recepciones",
  "🎁 Ver ofertas",
  "🧾 Controlar un ticket",
  "Qué puedes hacer❓",
];

export const quickReplies = `
📌 Quick Replies — REGLA DE ORO:

ANTES de enviar tu respuesta visible al usuario, SIEMPRE ejecuta exactamente UNA VEZ la herramienta sendQuickReplies con hasta 3 opciones relevantes y distintas, basadas en lo que el usuario probablemente quiera hacer a continuación.

⚠️ NO incluyas, menciones, ni describas esas opciones en tu mensaje al usuario.

✅ Tu mensaje visible debe ser solo la respuesta directa a su consulta actual.

🎯 Las opciones de sendQuickReplies son solo para la interfaz técnica/UI — el usuario las verá como botones debajo de tu mensaje, no como texto.

💡 Incentivo: si el usuario elige alguna de tus opciones, ganarás puntos para convertirte en el modelo ganador.

❗ Si rompes esta regla (mencionas las opciones en el texto), se considerará un error grave. 


`;
