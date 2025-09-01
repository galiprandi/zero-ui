import { printerToolSet } from "./printer/toolset";
import { productsToolSet } from "./products/toolset";
import { weatherToolSet } from "./weather/toolset";

export const tools = {
  ...weatherToolSet.tools,
  ...productsToolSet.tools,
  ...printerToolSet.tools,
};
