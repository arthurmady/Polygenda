export const encode = (obj: Object) => {
  const jsonMinified = JSON.stringify(obj)
  const utf8Bytes = new TextEncoder().encode(jsonMinified)
  const base64Encode = btoa(String.fromCharCode(...utf8Bytes))
  return encodeURIComponent(base64Encode)
}

export const decode = (str: string) => {
  try {
    const base64Decode = decodeURIComponent(str)
    const binaryStr = atob(base64Decode)
    const utf8Bytes = Uint8Array.from(binaryStr, (char) => char.charCodeAt(0))
    const jsonMinified = new TextDecoder().decode(utf8Bytes)
    return JSON.parse(jsonMinified)
  } catch (e) {
    // jsonMinified is not a JSON
  }
  return null
}
