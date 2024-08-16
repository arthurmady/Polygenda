import { Autocomplete, FormGroup, FormLabel, TextField } from '@mui/material'
import { Promo, Settings } from '../../../types/Settings'
import { useConfig } from '~/context/config_context'

const PromoSelect = ({
  value,
  setValue,
  noLabel = false,
}: {
  value: Settings['promo']
  setValue: (_newValue: Settings['promo']) => void
  noLabel?: boolean
}) => {
  const { promos } = useConfig()

  return (
    <FormGroup>
      {noLabel === false && <FormLabel component="legend">Choix de la promo</FormLabel>}
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
    </FormGroup>
  )
}

export default PromoSelect
