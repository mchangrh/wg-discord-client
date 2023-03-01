import {
  ChatInputCommandInteraction,
  APIApplicationCommandOption
} from "discord.js"
import { Env } from "../index"

export type Command = {
  name: string;
  description: string;
  options?: APIApplicationCommandOption[];
  execute: (interaction: ChatInputCommandInteraction, env: Env) => Promise<Object>;
}

import { createpanel } from "./createpanel";

export const commandList: Command[] = [
  createpanel
]