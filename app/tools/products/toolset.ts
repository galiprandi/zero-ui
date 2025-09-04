import { findProductByEanTool } from "./findProductByEan";
import { findProductByNameTool } from "./findProductByName";
import { getOffersTool } from "./getOffers";
import { listProductsByCategoryTool } from "./listProductsByCategory";
import { consultProductTool } from "./consultProduct";
import { changePriceTool } from "./changePrice";
import { requestRestockTool } from "./requestRestock";

/**
 * Product tools, all tools related to products
 */
export const productsToolSet = {
  findProductByName: findProductByNameTool,
  findProductByEan: findProductByEanTool,
  listProductsByCategory: listProductsByCategoryTool,
  getOffers: getOffersTool,
  consultProduct: consultProductTool,
  changePrice: changePriceTool,
  requestRestock: requestRestockTool,
};
