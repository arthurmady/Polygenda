import { Settings } from '../../types/Settings'

export const hslToHex = (h: number, s: number, l: number) => {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export const generateColors = (count: number) => {
  let colors = []
  for (let i = 0; i < count; i++) {
    // On divise le cercle chromatique (360°) en parts égales
    let hue = Math.floor(Math.random() * 360) //i * (360 / count + 1)
    let color = hslToHex(hue, 60, 50)
    colors.push(color)
  }
  return colors
}

export const getContrastYIQ = (hexcolor: Settings['color']) => {
  var r = Number.parseInt(hexcolor.substring(1, 3), 16)
  var g = Number.parseInt(hexcolor.substring(3, 5), 16)
  var b = Number.parseInt(hexcolor.substring(5, 7), 16)
  var yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}
