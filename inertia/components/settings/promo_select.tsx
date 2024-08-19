import { Autocomplete, FormGroup, FormLabel, TextField } from '@mui/material'
import { Promo, Settings } from '../../../types/Settings'
import { promos } from '#config/data'
import { useMetadata } from '~/context/metadata_context'

const PromoSelect = ({
  value,
  setValue,
  noLabel = false,
}: {
  value: Settings['promo']
  setValue: (_newValue: Settings['promo']) => void
  noLabel?: boolean
}) => {
  const { setCode } = useMetadata()

  return (
    <FormGroup>
      {noLabel === false && <FormLabel component="legend">Choix de la promo</FormLabel>}
      <Autocomplete
        isOptionEqualToValue={(o, v) => JSON.stringify(o) === JSON.stringify(v)}
        disablePortal
        options={promos}
        value={value}
        onChange={(e: any, newValue: Promo | null) => {
          if (newValue?.code) {
            setCode(newValue?.code)
          }
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </FormGroup>
  )
}

export default PromoSelect
