export const getIPs = async (iface: string) =>
  fetch(`${SERVER_URL}/${iface}/ips?auth=${SERVER_AUTH}`)
  .then(res => res.json())
  .then(data => (data as any[])
    .reduce((acc: string[], cur: { pubkey: string, allowedips: string[] }) =>
      acc.concat(cur.allowedips)))

export const addPeer = (iface: string, pubkey: string, allowedips: string) =>
  fetch(`${SERVER_URL}/${iface}?auth=${SERVER_AUTH}`,
  { method: 'POST',
    body: JSON.stringify({
      pubkey,
      allowedips
    })
  })