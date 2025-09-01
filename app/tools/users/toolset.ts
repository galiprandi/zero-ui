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
    "Tools for retrieving user data, including email, store information.",
  tools: {
    getUserData: getUserDataTool,
  },
};
