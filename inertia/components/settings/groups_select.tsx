import {
  Checkbox,
  FormGroup,
  FormLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { Settings, Promo } from '../../../types/Settings'
import { SchoolEvent } from '../../../types/Event'
import { useMetadata } from '~/context/metadata_context'
const GroupsSelect = ({
  code,
  value = {},
  setValue,
}: {
  code?: Promo['code']
  value: Settings['groups']
  setValue: (_newValue: Settings['groups']) => void
}) => {
  const { groups } = useMetadata()

  if (!code || !groups?.length) return null

  const val = value[code] || []
  const handleChange = (event: SelectChangeEvent<SchoolEvent[]>) => {
    const {
      target: { value: newValue },
    } = event
    setValue({ ...value, [code]: typeof newValue === 'string' ? newValue.split(',') : newValue })
  }

  return (
    <FormGroup>
      <FormLabel component="legend">Choix des groupes</FormLabel>
      <Select
        multiple
        value={val}
        renderValue={(selected) => selected.join(', ')}
        onChange={handleChange}
      >
        {groups.map((group, i) => {
          return (
            <MenuItem key={i} value={group}>
              <Checkbox checked={val.indexOf(group) > -1} />
              <ListItemText primary={group} />
            </MenuItem>
          )
        })}
      </Select>
    </FormGroup>
  )
}

export default GroupsSelect
