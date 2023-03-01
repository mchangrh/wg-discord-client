import { Command } from "./_CommandList";

export const createpanel = {
  name: "createpanel",
  description: "Create Wireguard Request panel",
  execute: async (interaction, env) => {
    const body = {
      type: 4,
      data: {
        flags: 4,
        content: `** ${env.VPN_NAME} VPN Setup **\n\nTo connect to ${env.VPN_NAME} VPN\n1. Install [Wireguard](https://www.wireguard.com/install/)\n2. Click the 🔄 Button below\n2. Download the attached configuration file\n3. In Wireguard, click on \`Add Tunnel\` and select the file you just downloaded\n4. In the sidebar, select the newly added tunnel and click \`Activate\`\n5. Success! Enjoy your connection!`,
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
