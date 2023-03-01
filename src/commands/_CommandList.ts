import {
  ChatInputCommandInteraction,
  APIApplicationCommandOption
} from "discord.js"

export type Command = {
  name: string;
  description: string;
  options?: APIApplicationCommandOption[];
  execute: (interaction: ChatInputCommandInteraction) => Promise<Object>;
}

import { createpanel } from "./createpanel";

export const commandList: Command[] = [
  createpanel
]