import { FormGroup, FormLabel, Slider } from '@mui/material'
import { SyntheticEvent } from 'react'
import { Settings } from '../../../types/Settings'
import { DayHours } from '@aldabil/react-scheduler/types'

const marks = [
  {
    value: 0,
    label: '0h',
  },
  {
    value: 24,
    label: '24h',
  },
  {
    value: 12,
    label: '12h',
  },
  {
    value: 8,
    label: '8h',
  },
  {
    value: 18,
    label: '18h',
  },
]

const HoursSlider = ({
  value,
  setValue,
}: {
  value: Settings['rangeHours']
  setValue: (_newValue: Settings['rangeHours']) => void
}) => {
  const handleChange = (event: Event | SyntheticEvent, newValue: number | number[]) => {
    setValue(newValue as [DayHours, DayHours])
  }

  return (
    <FormGroup>
      <FormLabel component="legend">Définition des horaires d'une journée</FormLabel>
      <Slider
        size="small"
        sx={{ marginTop: '25px' }}
        valueLabelFormat={(val) => val + 'h'}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChange}
        valueLabelDisplay="on"
        min={0}
        max={24}
        marks={[0, 24, 12, 8, 18].map((v) => ({ value: v, label: v + 'h' }))}
      />
    </FormGroup>
  )
}

export default HoursSlider
