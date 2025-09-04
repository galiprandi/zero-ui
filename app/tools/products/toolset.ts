import { findProductByEanTool } from "./findProductByEan";
import { findProductByNameTool } from "./findProductByName";
import { getOffersTool } from "./getOffers";
import { listProductsByCategoryTool } from "./listProductsByCategory";

/**
 * Product tools, all tools related to products
 */
export const productsToolSet = {
  findProductByName: findProductByNameTool,
  findProductByEan: findProductByEanTool,
  listProductsByCategory: listProductsByCategoryTool,
  getOffers: getOffersTool,
};
