import icg from 'ip-classifier-generator'

export function generateIp(): string {
  // ip range
  const ipRange = {
    firstOctet: { min: 172, max: 172 },
    secondOctet: { min: 20, max: 20 },
    thirdOctet: { min: 0, max: 255 },
    fourthOctet: { min: 2, max: 255 },
  }
  return icg.randomIPV4ByRange(ipRange)
}

function genHexString(len: number) {
  const hex = '0123456789abcdef';
  let output = '';
  for (let i = 0; i < len; ++i) {
      output += hex.charAt(Math.floor(Math.random() * hex.length));
  }
  return output;
}

export function generateIp6(): string {
  const prefix = "fdc1:c1::"
  const suffix1 = genHexString(4)
  const suffix2 = genHexString(4)
  return prefix + suffix1 + ":" + suffix2
}