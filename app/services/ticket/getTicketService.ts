import ticketMock from "../../data/ticket.json";
import { getRandomProducts } from "../products/getRandomProducts";
export type Ticket = typeof ticketMock;

/**
 * Returns the ticket data. For now, regardless of the ticket number provided,
 * it always returns the mock from app/data/ticket.json
 */
export function getTicket(_ticketNumber: string) {
  if (!_ticketNumber) {
    return { error: "No ticket number provided" };
  }
  const products = getRandomProducts(5);
  // Prefer workstation as the visible checkout identifier; fallback to cashier
  const checkoutNumber = String(
    ticketMock.source?.workstation ?? ticketMock.source?.cashier ?? "",
  );
  return { ...ticketMock, products, checkoutNumber };
}
