import { utils, curve25519} from "@noble/ed25519"

const Uint8ArrayToBase64 = (u8a: Uint8Array) => Buffer.from(u8a).toString('base64')

export default function generateKeypair() {
  const privateKey = utils.randomPrivateKey();
  const publicKey = curve25519.scalarMultBase(privateKey);
  return {
    privateKey: Uint8ArrayToBase64(privateKey),
    publicKey: Uint8ArrayToBase64(publicKey)
  }
}