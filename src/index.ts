export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;

  CLIENT_PUBLIC_KEY: string
  IFACE: string
  VPN_NAME: string
  SERVER_AUTH: string
  SERVER_URL: string
  WG_SERVER_ALLOWEDIPS: string
  WG_SERVER_ADDR: string
  WG_SERVER_PUBKEY: string
}

import { verifyKey } from "discord-interactions";
import generateFile from "./utils/generateFile";
import { addPeer } from "./utils/server-api";

import { commandList } from "./commands/_CommandList";
import { buttonList } from "./buttons/_ButtonList";

// Util to send a JSON response
const jsonResponse = (obj: Object) => new Response(JSON.stringify(obj), {
  headers: { "Content-Type": "application/json" }
});

const textResponse = (str: string) => new Response(str, {
  headers: {
    "Content-Type": "text/plain",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Expires": "0",
    "Surrogate-Control": "no-store"
  }
});

// Util to verify a Discord interaction is legitimate
const handleInteractionVerification = (request: Request, bodyBuffer: ArrayBuffer, pubkey: string) => {
  const timestamp = request.headers.get("X-Signature-Timestamp") || "";
  const signature = request.headers.get("X-Signature-Ed25519") || "";
  return verifyKey(bodyBuffer, signature, timestamp, pubkey);
};

const generateFileEndpoint = async (env: Env, vpn_name: string) => {
  // generate file
  const result = await generateFile(env)
  // push to server
  await addPeer(env, result.pubkey, result.ips)
  // return file
  const contentDisposition = `attachment; filename= ${vpn_name}.conf`;
  return new Response(result.config, {
    status: 200,
    headers: { "content-type": "text/plain", "Content-Disposition": contentDisposition}
  })
}

// Process a Discord interaction POST request
const handleInteraction = async (request: Request, env: Env) => {
  // Get the body as a buffer and as text
  const bodyBuffer = await request.arrayBuffer();
  const bodyText = (new TextDecoder("utf-8")).decode(bodyBuffer);

  // Verify a legitimate request
  if (!handleInteractionVerification(request, bodyBuffer, env.CLIENT_PUBLIC_KEY))
    return new Response(null, { status: 401 });

  // Work with JSON body going forward
  const body = JSON.parse(bodyText);

  // Handle a PING
  if (body.type === 1)
    return jsonResponse({ type: 1 });
  try {
    if (body.type == 2) { // handle commands
      const commandName = body.data.name;
      if (commandList.includes(commandName)) { // check in userCmd list
        // load and execute
        const command = commandList[commandName]
        return jsonResponse(await command.execute(body, env));
      } else { // command not found, 404
        return new Response(null, { status: 404 });
      }
    } else if (body.type == 3) { // handle buttons
      // Locate button data
      const buttonName = body.data.custom_id;
      if (buttonList.includes(buttonName)) { // check in userCmd list
        // load and execute
        const command = buttonList[buttonName]
        return jsonResponse(await command.execute(body, env));
      } else { // command not found, 404
        return new Response(null, { status: 404 });
      }
    } else { // if not ping, button or message send 501
      return new Response(null, { status: 501 });
    }
  } catch (err) {
    // Catch & log any errors
    // eslint-disable-next-line no-console
    console.log(err);

    // Send an ephemeral message to the user
    return jsonResponse({
      type: 4,
      data: {
        //content: "An unexpected error occurred when executing the command.",
        content: `error: ${err}`,
        flags: 64
      }
    });
  }
};

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);
  // Send interactions off to their own handler
  if (request.method === "POST" && url.pathname === "/interactions")
    return await handleInteraction(request, env);
  if (url.pathname === "/ping")
    return textResponse("pong");
  if (url.pathname === "/genconfig") {
    if (url.searchParams.get("auth") != env.SERVER_AUTH)
      return new Response(null, { status: 403 });
    return await generateFileEndpoint(env, env.VPN_NAME);
  }
  return new Response(null, { status: 404 });
	},
};