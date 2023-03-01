import {
  ChatInputCommandInteraction
} from "discord.js"

import { Env } from "../index"

export type Button = {
  customId: string;
  execute: (interaction: ChatInputCommandInteraction, env: Env) => Promise<Object>;
}

import { genconfig } from "./generateconfig";

export const buttonList: Button[] = [
  genconfig
]