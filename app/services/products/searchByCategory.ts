import products from "../../data/products.json";
import { getProductByEan } from "./getProductByEan";
import type { Product } from "./types";

export function searchByCategory(categoryId: number): (Product | null)[] {
  const allProducts = products as Product[];
  const productEans = allProducts
    .filter((product) => product.categoryId === categoryId)
    .map((product) => product.ean);

  return productEans.map((ean) => getProductByEan(ean));
}
