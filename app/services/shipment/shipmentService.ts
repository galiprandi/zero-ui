import { getRandomProducts } from "../products/getRandomProducts";
import type { ProductExtended } from "../products/types";

export const getTodaysShipments = (): ShipmentDetailsDTO[] => {
  console.log("Getting today's mock shipments");
  const numShipments = Math.floor(Math.random() * 2) + 2; // 2 or 3 shipments
  const shipments: ShipmentDetailsDTO[] = [];

  for (let i = 1; i <= numShipments; i++) {
    const shipment = getShipmentDetails(
      `shipment-today-${String(i).padStart(3, "0")}`,
    );
    shipments.push(shipment);
  }

  return shipments;
};

export function getShipmentDetails(id: string): ShipmentDetailsDTO {
  console.log("Generating mock shipment details", id);
  const hour = Math.floor(Math.random() * 8) + 10; // 10 to 17
  const minute = Math.floor(Math.random() * 60);
  const estimatedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  const trackerLicense = Math.floor(Math.random() * 1000000).toString();

  const products = getRandomProducts(10);
  products.forEach((product) => {
    product.quantity = Math.floor(Math.random() * 51) + 50;
  });

  return {
    id,
    estimatedTime,
    products,
    trackerLicense,
  };
}

type ShipmentDetailsDTO = {
  id: string;
  products: ProductExtended[];
  trackerLicense: string;
  estimatedTime: string;
};
