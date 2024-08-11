import { FormControlLabel, Checkbox } from '@mui/material'
import { Settings } from '../../../types/Settings'

const ShowWeekendCheckBox = ({
  value,
  setValue,
}: {
  value: Settings['agendaMode']
  setValue: (_newValue: Settings['agendaMode']) => void
}) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={value} onChange={(e) => setValue(e.target.checked)} />}
      label="Afficher en mode agenda"
    />
  )
}

export default ShowWeekendCheckBox
