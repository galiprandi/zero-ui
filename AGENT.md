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
Quick replies are AI-suggested responses in a simple line format within model messages: `QUICK_REPLIES: option1, option2, ...`. Parsed by utility functions in `/app/utils/quickRepliesParser.ts`. Displayed as clickable pills in the UI, triggering user selections that send the option text as a new message.

### Functionality and Architecture
Quick replies enhance user interaction by providing predefined options for common actions.

#### How it Works
1. **Generation**: The AI includes a `QUICK_REPLIES:` line at the end of responses when offering choices.
2. **Parsing**: Utility functions extract the options and clean message text.
3. **Display**: The UI renders the message and options as interactive buttons.
4. **Interaction**: User selections are sent as new messages, continuing the conversation.

#### Architecture Components
- **Prompt Guidance**: `/app/prompts/quick-replies.prompt.ts` instructs the AI on format and usage.
- **Parsing Utilities**: `/app/utils/quickRepliesParser.ts` handles format detection and extraction.
- **UI Rendering**: `MessageText.tsx` displays messages and pills.
- **State Management**: `useQuickReplies.ts` hook manages quick reply state.
- **Configuration**: `/app/config/initialQuickReplies.ts` defines initial options.

This architecture ensures consistent, user-friendly interactions across the application.

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
