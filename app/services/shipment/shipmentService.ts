import { searchByEan } from "./searchByEan";
import products from "../../data/products.json";
import type { Product } from "./types";

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
