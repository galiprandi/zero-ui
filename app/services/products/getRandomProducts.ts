import categories from "../../data/categories.json";
import products from "../../data/products.json";
import type { ProductExtended } from "./types";

export function getRandomProducts(count: number): ProductExtended[] {
  const shuffled = products.sort(() => 0.5 - Math.random());
  const result = shuffled.slice(0, count).map((product) => ({
    ...product,
    categoryName:
      categories.find((cat) => cat.id === product.categoryId)?.name ??
      "Sin categoría",
  }));
  return result;
}
