import icg from 'ip-classifier-generator'

export default function generateIp(): string {
  // ip range
  const ipRange = {
    firstOctet: { min: 172, max: 172 },
    secondOctet: { min: 20, max: 60 },
    thirdOctet: { min: 0, max: 255 },
    fourthOctet: { min: 2, max: 255 },
  }
  return icg.randomIPV4ByRange(ipRange)
}
