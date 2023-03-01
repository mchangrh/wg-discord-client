import {
  ChatInputCommandInteraction
} from "discord.js"

export type Button = {
  customId: string;
  execute: (interaction: ChatInputCommandInteraction) => Promise<Object>;
}

import { genconfig } from "./generateconfig";

export const buttonList: Button[] = [
  genconfig
]