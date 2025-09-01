import products from "../../data/products.json";
import { searchByEan } from "../products/searchByEan";
import type { Product } from "../products/types";

interface ShipmentItem {
  ean: string;
  quantity: number;
}

interface Shipment {
  id: string;
  items: ShipmentItem[];
}

const FIXED_SHIPMENT_ID = "shipment-today-001";

// Generate random shipment for today
function generateTodaysShipment(): Shipment {
  const allProducts = products as Product[];
  const numItems = Math.floor(Math.random() * 10) + 5; // 5 to 14 items
  const selectedProducts = allProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, numItems);

  const items: ShipmentItem[] = selectedProducts.map((product) => ({
    ean: product.ean,
    quantity: Math.floor(Math.random() * 20) + 1, // 1 to 20
  }));

  return {
    id: FIXED_SHIPMENT_ID,
    items,
  };
}

const todaysShipment = generateTodaysShipment();

export function getTodaysShipmentId(): string {
  return FIXED_SHIPMENT_ID;
}

export function getTodaysShipments(): {
  id: string;
  approximateTime: string;
  items: {
    ean: string;
    name: string;
    quantity: number;
    categoryId: number;
  }[];
}[] {
  const numShipments = Math.floor(Math.random() * 2) + 2; // 2 or 3 shipments
  const shipments = [];

  for (let i = 1; i <= numShipments; i++) {
    const id = `shipment-today-${String(i).padStart(3, "0")}`;
    const hour = Math.floor(Math.random() * 8) + 10; // 10 to 17
    const minute = Math.floor(Math.random() * 60);
    const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

    const allProducts = products as Product[];
    const numItems = Math.floor(Math.random() * 10) + 5; // 5 to 14 items
    const selectedProducts = allProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, numItems);

    const items = selectedProducts.map((product) => {
      const item = searchByEan(product.ean);
      return {
        ean: product.ean,
        name: item ? item.name : "Desconocido",
        quantity: Math.floor(Math.random() * 20) + 1, // 1 to 20
        categoryId: item ? item.categoryId : 0,
      };
    });

    shipments.push({
      id,
      approximateTime: time,
      items,
    });
  }

  return shipments;
}

export function getShipmentDetails(id: string): {
  products: {
    ean: string;
    name: string;
    quantity: number;
    categoryId: number;
  }[];
} | null {
  if (id !== FIXED_SHIPMENT_ID) return null;

  const productsDetails = todaysShipment.items.map((item) => {
    const product = searchByEan(item.ean);
    return {
      ean: item.ean,
      name: product ? product.name : "Desconocido",
      quantity: item.quantity,
      categoryId: product ? product.categoryId : 0,
    };
  });

  return { products: productsDetails };
}
