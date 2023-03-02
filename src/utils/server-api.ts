import { Env } from "../index"

export const getIPs = async (env: Env) => {
  const response = await fetch(`${env.SERVER_URL}/${env.IFACE}/ips?auth=${env.SERVER_AUTH}`)
  if (response.status === 204) return []
  else return response.json()
    .then(data => (data as any).peers
      .reduce((acc: string[], cur: { pubkey: string, allowedips: string[] }) =>
        acc.concat(cur.allowedips), []))
}

export const addPeer = (env: Env, pubkey: string, allowedips: string) =>
  fetch(`${env.SERVER_URL}/${env.IFACE}?auth=${env.SERVER_AUTH}`,
  { method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pubkey,
      allowedips
    })
  })