import { Button } from "./_ButtonList";
import generateFile from "../utils/generateFile";
import { addPeer } from "../utils/server-api";

export const genconfig = {
  customId: "genconfig",
  execute: async (interaction) => {
    // generate file
    const result = await generateFile(IFACE)
    // push to server
    await addPeer(IFACE, result.pubkey, result.ip)
    const body = {
      files: [{
        name: `${VPN_NAME}.conf`,
        attachment: result.config
      }],
      flags: 64
    }
    return body
  }
} as Button;
