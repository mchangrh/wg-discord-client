import { Button } from "./_ButtonList";
import generateFile from "../utils/generateFile";
import { addPeer } from "../utils/server-api";
import { Env } from "../index"

export const genconfig = {
  customId: "genconfig",
  execute: async (interaction, env: Env) => {
    // generate file
    const result = await generateFile(env)
    console.log(result)
    // push to server
    await addPeer(env, result.pubkey, result.ips)
    // upload to bin
    const binResult = await fetch("https://b.mchang.xyz/b", { method: "POST", body: result.config })
      .then(res => res.text())
    const body = {
      type: 4,
      data: {
        flags: 64,
        content: `Your config is ready! Download it [here](https://b.mchang.xyz/b/${binResult})`,
      }
    }
    return body
  }
} as Button;
