import { Env } from "../index"

export const getIPs = async (env: Env) =>
  fetch(`${env.SERVER_URL}/${env.IFACE}/ips?auth=${env.SERVER_AUTH}`)
  .then(res => res.json())
  .then(data => (data as any[])
    .reduce((acc: string[], cur: { pubkey: string, allowedips: string[] }) =>
      acc.concat(cur.allowedips)))

export const addPeer = (env: Env, pubkey: string, allowedips: string) =>
  fetch(`${env.SERVER_URL}/${env.IFACE}?auth=${env.SERVER_AUTH}`,
  { method: 'POST',
    body: JSON.stringify({
      pubkey,
      allowedips
    })
  })