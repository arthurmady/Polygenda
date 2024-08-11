import { FormControlLabel, Checkbox } from '@mui/material'
import { Settings } from '../../../types/Settings'

const ShowWeekendCheckBox = ({
  value,
  setValue,
}: {
  value: Settings['showWeekends']
  setValue: (_newValue: Settings['showWeekends']) => void
}) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={value} onChange={(e) => setValue(e.target.checked)} />}
      label="Afficher les weekends"
    />
  )
}

export default ShowWeekendCheckBox
