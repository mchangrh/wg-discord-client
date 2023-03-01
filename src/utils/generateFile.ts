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
  const clientConfig = `
  [Interface]
  PrivateKey = ${keys.privateKey}
  Address = ${ip}/32, ${ip6}/128
  
  [Peer]
  PublicKey = ${env.WG_SERVER_PUBKEY}
  AllowedIPs = ${env.WG_SERVER_ALLOWEDIPS}
  Endpoint = ${env.WG_SERVER_ADDR}`
  const ips = `${ip}/32, ${ip6}/128`
  return { config: clientConfig, ips, pubkey: keys.publicKey }
}
