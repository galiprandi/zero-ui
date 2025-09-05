# Zero-UI Agent

## Project Overview
Zero-UI is a Next.js-based chat application for supermarket employees, integrating AI tools for product management, shipments, and printing.

## Architecture
The app uses Next.js with React and TypeScript. The backend is API routes in /app/api/, services handle business logic, tools define AI actions, and components render the UI. Database is PostgreSQL via environment variable.

## Folder Structure
- /app/components/: UI components (MessageText, UserMessage, ModelMessage)
- /app/tools/: AI tools (products/, shipment/)
- /app/services/: Business logic (products/, shipment/, printers/)
- /app/data/: Static data (products.json, categories.json)
- /app/api/: API routes (chat/)
- /app/config/: Configurations (initialQuickReplies.ts)

## Frontend (Front)
Built with Next.js and Tailwind CSS. Main page is /app/page.tsx, showing chat messages. Messages use MessageText component for rendering markdown and quick replies. UI is responsive with dark mode support.

## Tools
Tools use the 'ai' library for AI interactions. Each tool has description, inputSchema (zod), and execute function. Examples: findProductByName (searches products), printTicket (prints tickets). Tools are invoked by the AI to perform tasks like database queries or external actions.

## Quick Replies
Quick replies son respuestas sugeridas por el asistente para operar con una sola mano, sin abrir el teclado. Son botones que envían exactamente el texto de cada opción como un nuevo mensaje del usuario.

### Contrato de formato (canónico)
- Bloque explícito envolviendo opciones separadas por comas.

```md
<quick-replies>
🔍 Buscar producto, 📂 Ver categorías, 🎁 Ver ofertas, 🖨️ Imprimir ticket
</quick-replies>
```

Reglas principales (alineadas a `/app/prompts/quick-replies.prompt.ts`):
- Máximo 5 opciones. 2–5 palabras por opción.
- Cada opción inicia con un emoji relevante.
- Opciones accionables, mutuamente excluyentes y pertinentes al último turno.
- Si no hay acciones claras, omitir el bloque.
- El bloque debe ir al final del mensaje del asistente. No usar fences ``` ni JSON.

### Flujo de funcionamiento
1. **Generación**: El asistente incluye el bloque `<quick-replies>` al final del texto cuando corresponde.
2. **Extracción y limpieza**: `useOneHand()` separa los quick replies del mensaje usando `separateQuickRepliesFromText()` y los remueve del texto mostrado.
3. **Renderizado**: `app/components/QuickReplies.tsx` los muestra como botones horizontales.
4. **Interacción**: Al pulsar un botón, se envía el texto exacto como nuevo mensaje (`sendMessage({ text })`).

### Referencias de implementación
- Prompt y ejemplos: `app/prompts/quick-replies.prompt.ts` (también `initialQuickReplies`).
- Extracción/estado: `app/hooks/useOneHand.ts` (`separateQuickRepliesFromText`, `parseQuickReplies`).
- UI: `app/components/QuickReplies.tsx`.
- Server heurística (opcional): `parseQuickRepliesFromText()` en `app/lib/logger.ts` detecta `quick_replies` en JSON si el modelo alguna vez lo emite, pero el cliente móvil usa exclusivamente el bloque `<quick-replies>`.

### Buenas prácticas para herramientas (tools)
- Incluir quick replies cuando habilites una acción siguiente clara (p. ej., tras `findProductByEan`, ofrecer 🧠 Consultar y 💲 Precio).
- Mantener texto breve y específico al contexto actual.
- Evitar duplicados y opciones que no avancen el flujo.

Ejemplo en respuesta del asistente:

```md
Encontré 1 producto: Mayonesa Hellmann's 237g — EAN 7798901234569
<quick-replies>
🧠 Consultar 7798901234569, 💲 Precio 7798901234569, 🖨️ Imprimir ticket
</quick-replies>
```

Fallback inicial (sin mensajes del asistente aún):
- Se usan `initialQuickReplies` definidas en `app/prompts/quick-replies.prompt.ts`.

## Code Style Guidelines
- Use TypeScript for type safety.
- Prefer types and interfaces at the end of each file.
- Follow project structure.
- Use Tailwind for styling.
- Keep code modular.

## Build and Test Commands
- Install: `pnpm install`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Test: `pnpm test`

## Security Considerations
- Store sensitive data in environment variables.
- Validate inputs.
- Avoid hardcoding secrets.

---

## LLM Tool/Function Calling — Mejores prácticas (2025)

Esta guía resume prácticas recomendadas para diseñar y operar herramientas (tools) con LLMs, aplicadas a este repositorio (productos, recepciones, impresión). Incluye patrones accionables y ejemplos concretos.

### 1) Definiciones de tool precisas y accionables
- Describe objetivo, cuándo usar y cuándo NO usar, entradas, y formato esperado de salida.
- Mantén el contrato de datos claro: qué campos existen y cómo se interpretan.

```ts
// Ejemplo (resumen) en app/tools/products/findProductByName.ts
export const findProductByNameTool = tool({
  description: `Buscar por nombre.
    Cuándo usar: "stock de <nombre>", "precio de <nombre>", etc.
    Cuándo NO usar: si hay EAN, usa findProductByEan.
    Presentación: lista hasta 5; agrega <quick-replies>.`,
  inputSchema: z.object({ query: z.string().min(2) }),
  execute: async ({ query }) => { /* ... */ }
});
```

### 2) Esquemas de entrada estrictos (validación)
- Usa `zod` para validar y describir entradas. Rechaza temprano entradas inválidas y devuelve mensajes útiles.

```ts
const schema = z.object({ ean: z.string().regex(/^\d{8,14}$/) });
```

### 3) Limita el espacio de acción del agente
- Expone solo las tools necesarias por contexto. Mantén las descripciones cortas y enfocadas.
- En prompts de módulo, indica disparadores claros por intención de usuario.

```md
Patrones de intención (ejemplo):
- "stock de <nombre>": findProductByName → si 1 resultado, consultProduct.
- "779...": findProductByEan → ofrecer Consultar/Precio.
```

### 4) Encadenamiento explícito (orquestación ligera)
- Indica el siguiente paso recomendado según resultados (p. ej., si 1 resultado, llamar `consultProduct`).
- Ofrece `quick replies` para guiar rutas alternativas.

```md
Al final: <quick-replies> 🧠 Consultar <ean>, 💲 Precio <ean> </quick-replies>
```

### 5) Salidas determinísticas y fáciles de renderizar
- Pide Markdown simple: listas breves o tablas GFM pequeñas. Evita encabezados grandes en listas.
- Normaliza output en el cliente: limpia fences ``` y asegura quick replies cuando corresponde.

```ts
// app/components/chat/markdownComponents.tsx ya normaliza bloques markdown/code
```

### 6) Reflexión/razonamiento breve del modelo (cuando aporte valor)
- Para decisiones ambiguas (varias tools posibles), solicita reflexión corta (2–3 frases) antes de elegir.
- Usa límites de pasos (`stopWhen`) para evitar desvíos.

### 7) Reducir el número de tools simultáneamente
- Muchas tools degradan la elección. Agrupa por dominio (productos/recepciones/impresión) y activa set según contexto.

### 8) Manejo de errores y reintentos idempotentes
- Loguea entradas/salidas por tool, captura excepciones y devuelve errores accionables (sin filtrar secretos).
- Reintenta operaciones transitorias con backoff y garantiza idempotencia (no duplicar tickets/envíos).

```ts
try {
  const data = await service();
  return { ok: true, data };
} catch (e) {
  logToolResult({ toolName, output: { error: String(e) }, ts: new Date().toISOString() });
  return { ok: false, error: "Temporalmente no disponible. Intenta más tarde." };
}
```

### 9) Telemetría y trazabilidad
- Usa `logToolExecute`/`logToolResult` con timestamps. Adjunta `userInputType` (typed vs quick reply) cuando sea posible.
- Mide latencias, tasa de aciertos de intención, y errores por tool.

### 10) Guardrails contra prompt injection y datos sensibles
- Nunca interpolar instrucciones del usuario en descripciones de tools.
- Valida campos peligrosos (URLs, paths, selectores) y aplica allowlists.
- Sanitiza contenido antes de renderizar en la UI.

### 11) Intent routing híbrido (modelo + reglas)
- Complementa al modelo con heurísticas simples (regex/keywords) para disparar tools clave cuando fallan los prompts.
- Ej.: si mensaje coincide con `^\d{8,14}$` → `findProductByEan` prioritario.

### 12) Tests y verificación en frío
- Crea tests para: selección de tool por intención, formato de salida y presencia de quick replies.
- Usa fixtures de entradas reales (ES, abreviaturas, errores tipográficos).

```ts
// Pseudotest
it("stock de mayonesa → findProductByName", async () => {
  const intent = route("stock de mayonesa");
  expect(intent.tool).toBe("findProductByName");
});
```

### 13) Selección de modelo y límites
- Modelos más capaces mejoran el tool picking, pero controla costo/latencia.
- Establece `stopWhen` y límites de tokens/pasos (
  ver `app/api/chat/route.ts` con `stepCountIs(5)`).

### 14) Paginación y top‑k
- Para listados, limita a `k` (p. ej., 5–10) y ofrece acciones para ver más o exportar.

### 15) Contratos de quick replies estables
- Estandariza el formato (`<quick-replies> ... </quick-replies>` o `QUICK_REPLIES:`) y documenta cómo el cliente los parsea.
- Incluye opciones accionables y cortas, ligadas a la siguiente tool.

```md
<quick-replies>
🧠 Consultar 7798901234569, 💲 Precio 7798901234569, 🖨️ Imprimir ticket
</quick-replies>
```

### 16) Rendimiento y caching de servicios
- Cachea consultas frecuentes (ofertas, categorías) con invalidación adecuada.
- Establece timeouts en llamadas externas para no bloquear el stream.

### 17) Seguridad de ejecución
- Nunca ejecutes efectos irreversibles sin confirmación del usuario (ej.: impresión, envío por WhatsApp).
- Usa quick replies de confirmación y registra auditoría.

### 18) Ejemplo de plantilla de descripción para tools

```md
Objetivo: ¿Qué hace la tool en una frase?
Cuándo usar: bullets de disparadores (frases del usuario).
Cuándo NO usar: bullets de exclusiones.
Contrato de datos: campos de entrada/salida relevantes.
Formato de salida: Markdown simple; listas o tablas; quick replies.
Ejemplos: 1–2 ejemplos cortos.
```

Aplicar esta plantilla a todas las tools en `app/tools/**` para consistencia y mejor rate de invocación.

### 19) Ejemplo de encadenamiento recomendado

```md
Usuario: "stock de mayonesa"
→ findProductByName(query: "mayonesa")
  - 1 resultado → consultProduct(ean: "779...")
  - N resultados → lista top‑5 y ofrece quick replies para consultar por EAN
```

### 20) Logging de ciclo completo en chat
- Registra: última entrada de usuario (truncada), si fue quick reply, tool elegida, salida truncada, tiempo total.
- Usa estos datos para ajustar prompts y reglas.
