import { findProductByNameTool } from "./findProductByName";
import { findProductByEanTool } from "./findProductByEan";
import { listProductsByCategoryTool } from "./listProductsByCategory";
import { getOffersTool } from "./getOffers";
import type { Tool } from "ai";

interface ToolSet {
  name: string;
  description: string;
  tools: Record<string, Tool>;
}

export const productsToolSet: ToolSet = {
  name: "Product Tools",
  description: "Tools for managing products",
  tools: {
    findProductByName: findProductByNameTool,
    findProductByEan: findProductByEanTool,
    listProductsByCategory: listProductsByCategoryTool,
    getOffers: getOffersTool,
  },
};
