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
Quick replies are AI-suggested responses in JSON format within model messages. Parsed by MessageText component using regex and JSON.parse. Displayed as buttons, triggering onQuickReplies callback for user interaction.

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
