type HexaNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type HexaLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
type HexaChar = HexaLetter | HexaNumber
type Hexa3 = `${HexaChar}${HexaChar}${HexaChar}`
type Hexa6 = `${Hexa3}${Hexa3}`
type Hexa8 = `${Hexa6}${HexaChar}${HexaChar}`
type Color = `#${Hexa3 | Hexa6 | Hexa8}`
