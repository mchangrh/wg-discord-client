import generateKeypair from "./genKey"
import { generateIp, generateIp6 } from "./genIP"
import * as api from "./server-api"

import { Env } from "../index"

export default async function generateFile(env: Env) {
  const usedIps = await api.getIPs(env)
  let ip = generateIp()
  while (usedIps.includes(ip)) {
    ip = generateIp()
  }
  let ip6 = generateIp6()
  
  const keys = generateKeypair()
  const clientConfig = `[Interface]\nPrivateKey = ${keys.privateKey}\nAddress = ${ip}/32, ${ip6}/128\n\n[Peer]\nPublicKey = ${env.WG_SERVER_PUBKEY}\nAllowedIPs = ${env.WG_SERVER_ALLOWEDIPS}\nEndpoint = ${env.WG_SERVER_ADDR}`
  const ips = `${ip}/32,${ip6}/128`
  return { config: clientConfig, ips, pubkey: keys.publicKey }
}
