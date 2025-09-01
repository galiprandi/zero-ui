import type { Tool } from "ai";
import { getUserDataTool } from "./getUserData";

interface ToolSet {
  name: string;
  description: string;
  tools: Record<string, Tool>;
}

export const usersToolSet: ToolSet = {
  name: "User Tools",
  description:
    "Retrieve user data, including store information. Useful for getting details about the current user and their store.",
  tools: {
    getUserData: getUserDataTool,
  },
};
