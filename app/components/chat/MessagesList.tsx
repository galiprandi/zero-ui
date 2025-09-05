"use client";
import { useOneHand } from "@/app/hooks/useOneHand";
import MessageText from "../MessageText";
import ToolDetails from "../ToolDetails";

export default function MessagesList() {
  const { messages } = useOneHand();
  // Mensajes de demostración para visualizar Markdown correctamente sin depender del modelo
  const demoMessages = [
    {
      id: "demo-1",
      role: "user",
      parts: [{ type: "text", text: "🚚 Recepciones" }],
    },
    {
      id: "demo-2",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: [
            "# Recepciones del día:",
            "",
            "Aquí tienes los envíos programados y sus horas estimadas.",
            "",
            "- 🚚 shipment-today-001 (llega: 11:46)",
            "- 🚚 shipment-today-002 (llega: 14:32)",
            "- 🚚 shipment-today-003 (llega: 13:01)",
            "- 🚚 shipment-today-004 (llega: 14:04)",
            "- 🚚 shipment-today-005 (llega: 13:45)",
            "- 🚚 shipment-today-006 (llega: 15:38)",
          ].join("\n"),
        },
      ],
    },
    {
      id: "demo-3",
      role: "user",
      parts: [{ type: "text", text: "📂 Categorías a recibir" }],
    },
    {
      id: "demo-4",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: [
            "Selecciona una categoría para ver los productos de recepción.",
            "",
            "| Categoría | Ítems |",
            "|---|---:|",
            "| Alimentos | 128 |",
            "| Bebidas | 76 |",
            "| Higiene | 64 |",
            "| Lácteos | 55 |",
          ].join("\n"),
        },
      ],
    },
    {
      id: "demo-5",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: [
            "Recepción 15:38: shipment-today-006. Detalle:",
            "",
            "- Harina 0000 Pureza 1kg — Alimentos — 51",
            "- Sal Fina Dos Anclas 500g — Condimentos — 88",
            "- Pasta Dental Colgate 90g — Higiene — 67",
            "- Cerveza Quilmes 1L — Bebidas — 89",
            "- Helado Vanila 1L — Helados — 93",
            "- Ajo 100g — Frutas y Verduras — 58",
            "- Papel Higiénico Higienol 30m — Higiene — 96",
            "- Leche La Serenísima 1L — Lácteos — 72",
            "- Yogur Danone Natural 120g — Lácteos — 63",
            "- Peras 1kg — Frutas y Verduras — 100",
            "",
            "Sugerencias: **📋 Tabla** para pocas columnas, **☑️ Lista** si quieres leer secuencialmente.",
            "",
            "<quick-replies>🚚 10:30 | 🚚 12:45 | 📲 WhatsApp | 🖨️ Imprimir</quick-replies>",
          ].join("\n"),
        },
      ],
    },
  ];

  const list = messages.length > 0 ? messages : demoMessages;
  return (
    <>
      {list.map((message) => (
        <div
          key={message.id}
          className="message whitespace-normal leading-tight break-words"
        >
          {message.parts.map((part, i) => {
            const isTool = "toolCallId" in part;
            const partId = `${message.id}-${i}`;
            if (isTool)
              return <ToolDetails key={partId} part={part} id={partId} />;

            if (part.type === "text")
              return (
                <MessageText
                  key={partId}
                  role={message.role}
                  content={part.text}
                  id={partId}
                />
              );

            return null;
          })}
        </div>
      ))}
    </>
  );
}
