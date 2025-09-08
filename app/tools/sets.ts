import type { ToolSet } from "ai";

import { emailsToolSet } from "./messaging/toolset";
import { printerToolSet } from "./printer/toolset";
import { productsToolSet } from "./products/toolset";
import { shipmentToolSet } from "./shipment/toolset";
import { usersToolSet } from "./users/toolset";
// import { weatherToolSet } from "./weather/toolset";
import { ticketToolSet } from "./ticket/toolset";
import { uiToolSet } from "./ui/toolset";

export const toolSet: ToolSet = {
  ...emailsToolSet,
  // ...weatherToolSet,
  ...printerToolSet,
  ...productsToolSet,
  ...shipmentToolSet,
  ...usersToolSet,
  ...ticketToolSet,
  ...uiToolSet,
};
