import { Command } from "./_CommandList";

export const createpanel = {
  name: "createpanel",
  description: "Create Wireguard Request panel",
  execute: async (interaction, env) => {
    const body = {
      type: 4,
      data: {
        embeds: [{
          title: "CRIOS VPN Setup",
          description: `1. Install [Wireguard](https://www.wireguard.com/install/)\n2. Click the: **🔄 Generate Config** Button below\n2. Download the attached configuration file]\n3. In Wireguard, click \`Add Tunnel\` and select the file you just downloaded\n4. In the sidebar, select the newly added tunnel and click \`Activate\`\n5. Success! Enjoy your connection!\n\nWhile this is a VPN, we only route traffic to our servers to keep your internet fast and secure.`,
        }],
        components: [{
          type: 1,
          components: [{
            type: 2,
            style: 1,
            label: "🔄 Generate Config",
            custom_id: "genconfig"
          }]
        }]
      }
    }
    return body
  }
} as Command;
