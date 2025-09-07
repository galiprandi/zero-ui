import { getRandomProducts } from "../products/getRandomProducts";
import type { ProductExtended } from "../products/types";

export const getTodaysShipments = (): ShipmentDetailsDTO[] => {
  console.log("Getting today's mock shipments");
  const numShipments = Math.floor(Math.random() * 4) + 3; // 3~6 shipments
  const shipments: ShipmentDetailsDTO[] = [];

  for (let i = 1; i <= numShipments; i++) {
    const shipment = getShipmentDetails(`# ${String(i).padStart(3, "0")}`);
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

  const products: ShipmentProduct[] = getRandomProducts(10).map((product) => {
    const quantity = Math.floor(Math.random() * 51) + 50;
    const { ean: _ean, categoryId: _categoryId, ...rest } = product;
    return { ...rest, quantity };
  });

  return {
    id,
    driverName: "Juan Pérez",
    products,
    trackerLicense,
    estimatedTime,
  };
}

type ShipmentProduct = Omit<ProductExtended, "ean" | "categoryId">;

type ShipmentDetailsDTO = {
  id: string;
  driverName: string;
  products: ShipmentProduct[];
  trackerLicense: string;
  estimatedTime: string;
};
