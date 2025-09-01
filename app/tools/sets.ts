import { emailsToolSet } from "./emails/toolset";
import { printerToolSet } from "./printer/toolset";
import { productsToolSet } from "./products/toolset";
import { shipmentToolSet } from "./shipment/toolset";
import { usersToolSet } from "./users/toolset";
import { weatherToolSet } from "./weather/toolset";
import { whatsappToolSet } from "./whatsapp/toolset";

export const tools = {
  ...weatherToolSet.tools,
  ...productsToolSet.tools,
  ...printerToolSet.tools,
  ...shipmentToolSet.tools,
  ...usersToolSet.tools,
  ...emailsToolSet.tools,
  ...whatsappToolSet.tools,
};
