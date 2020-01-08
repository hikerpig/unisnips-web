const BASE_URL = process.env.BASE_URL

export function SHP(uri: string) {
  let validUri = uri
  if (validUri[0] === '/') {
    validUri = validUri.substr(1)
  }
  return BASE_URL + validUri
}
