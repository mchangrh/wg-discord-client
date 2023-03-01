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
      files: [{
        name: `${env.VPN_NAME}.conf`,
        attachment: result.config
      }],
      flags: 64
    }
    return body
  }
} as Button;
