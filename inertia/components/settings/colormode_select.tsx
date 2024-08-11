import { Select, MenuItem } from '@mui/material'
import { ColorMode, Settings } from '~/types/Settings'

const ColorModeSelect = ({
  value,
  setValue,
}: {
  value: Settings['colorMode']
  setValue: (_newValue: Settings['colorMode']) => void
}) => {
  return (
    <Select
      labelId="colormode-label"
      value={value}
      onChange={(e) => setValue(e.target.value as ColorMode)}
    >
      <MenuItem value={'default'}>Par défaut</MenuItem>
      <MenuItem value={'subject'}>Par matière</MenuItem>
      <MenuItem value={'sizegroup'}>Par type de groupe</MenuItem>
    </Select>
  )
}

export default ColorModeSelect
