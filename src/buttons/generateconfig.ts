import { Button } from "./_ButtonList";
import generateFile from "../utils/generateFile";
import { addPeer } from "../utils/server-api";
import { Env } from "../index"

export const genconfig = {
  customId: "genconfig",
  execute: async (interaction, env: Env) => {
    // generate file
    const result = await generateFile(env)
    // push to server
    await addPeer(env, result.pubkey, result.ips)
    const body = {
      type: 4,
      flags: 64,
      files: [{
        name: `${env.VPN_NAME}.conf`,
        attachment: result.config
      }],
    }
    return body
  }
} as Button;
