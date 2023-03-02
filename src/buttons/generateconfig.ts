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
    // add to audit log
    const expiry = Math.floor((new Date().getTime() + 1000 * 60 * 60 * 12)/1000)
    const user = `${interaction?.member?.user.username}#${interaction?.member?.user.discriminator}`
    fetch(env.AUDIT_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: `Added peer \`${result.pubkey}\`...\nAllowedIPs \`${result.ips}\`\nUser: \`${user}\`\nExpires at: <t:${expiry}>\n\n[Revoke](${env.SERVER_URL}/revoke/${result.pubkey}?auth=${env.SERVER_AUTH})`
      })
    })
    // push to server
    await addPeer(env, result.pubkey, result.ips)
    // upload to bin
    const id = result.pubkey.substring(0, 4)
    await fetch(`${env.SERVER_URL}/config/${id}`, { method: "POST", body: result.config })
    const body = {
      type: 4,
      data: {
        flags: 64,
        content: `Your config is ready! Download it [here](${env.SERVER_URL}/config/${id})`,
      }
    }
    return body
  }
} as Button;
