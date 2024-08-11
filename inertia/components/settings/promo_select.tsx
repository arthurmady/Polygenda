import { Autocomplete, TextField } from '@mui/material'
import promos from '../../config/promo'
import { Promo, Settings } from '~/types/Settings'

const PromoSelect = ({
  value,
  setValue,
}: {
  value: Settings['promo']
  setValue: (_newValue: Settings['promo']) => void
}) => {
  return (
    <Autocomplete
      isOptionEqualToValue={(o, v) => JSON.stringify(o) === JSON.stringify(v)}
      disablePortal
      options={promos}
      value={value}
      onChange={(e: any, newValue: Promo | null) => {
        setValue(newValue)
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  )
}

export default PromoSelect
