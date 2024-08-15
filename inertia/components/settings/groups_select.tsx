import { Autocomplete, Checkbox, FormGroup, FormLabel, TextField } from '@mui/material'
import { Settings, Promo } from '../../../types/Settings'
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'

const GroupsSelect = ({
  code,
  value = {},
  setValue,
}: {
  code?: Promo['code']
  value: Settings['groups']
  setValue: (_newValue: Settings['groups']) => void
}) => {
  if (!code) {
    return null
  }

  const handleChange = (e: any, values: string[]) => {
    setValue({ ...value, [code]: values })
  }

  return (
    <FormGroup>
      <FormLabel component="legend">Choix des groupes</FormLabel>
      <Autocomplete
        fullWidth
        multiple
        value={value[code]}
        options={['Grp1', 'Grp2']}
        disableCloseOnSelect
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBox fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )
        }}
      />
    </FormGroup>
  )
}

export default GroupsSelect
