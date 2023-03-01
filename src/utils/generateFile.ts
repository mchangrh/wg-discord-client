import generateKeypair from "./genKey"
import generateIp from "./genIP"
import * as api from "./server-api"

export default async function generateFile(iface: string) {
  const usedIps = await api.getIPs(iface)
  let ip = generateIp()
  while (usedIps.includes(ip)) {
    ip = generateIp()
  }
  
  const keys = generateKeypair()
  const clientConfig = `
  [Interface]
  PrivateKey = ${keys.privateKey}
  Address = ${ip}/32
  
  [Peer]
  PublicKey = ${WG_SERVER_PUBKEY}
  AllowedIPs = ${WG_SERVER_ALLOWEDIPS}
  Endpoint = ${WG_SERVER_ADDR}`
  return { config: clientConfig, ip, pubkey: keys.publicKey }
}
