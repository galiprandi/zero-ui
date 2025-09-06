import ticketMock from "../../data/ticket.json";

export type Ticket = typeof ticketMock;

/**
 * Returns the ticket data. For now, regardless of the ticket number provided,
 * it always returns the mock from app/data/ticket.json
 */
export function getTicket(_ticketNumber: string): Ticket {
  // ticketNumber is intentionally ignored as per requirements
  return ticketMock;
}
