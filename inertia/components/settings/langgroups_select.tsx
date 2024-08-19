import {
  Checkbox,
  FormGroup,
  FormLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material'
import { Promo, Settings } from '../../../types/Settings'
import { useMetadata } from '~/context/metadata_context'

const LangGroupsSelect = ({
  code,
  value = {},
  setValue,
}: {
  code?: Promo['code']
  value: Settings['langs']
  setValue: (_newValue: Settings['langs']) => void
}) => {
  const { langs } = useMetadata()
  if (!code || !langs?.length) return null

  const handleChange = (newValue: { subject: string; group: string }, remove = false) => {
    const newLangs = { ...value[code] }

    const { subject, group } = newValue

    if (remove) {
      // Remove the group from the selected subject
      newLangs[subject] = newLangs[subject].filter((g) => g !== group)

      // If no groups are left for the subject, remove the subject entry
      if (newLangs[subject].length === 0) {
        delete newLangs[subject]
      }
    } else {
      // Add the group to the selected subject
      if (!newLangs[subject]) {
        newLangs[subject] = []
      }

      newLangs[subject].push(group)
    }

    setValue({ ...value, [code]: newLangs })
  }

  const data = value?.[code]
    ? Object.entries(value[code]).flatMap(([subject, groups]) =>
        groups.map((group) => ({ subject, group }))
      )
    : []

  let currentSubject: string
  return (
    <FormGroup>
      <FormLabel component="legend">Choix des groupes de langue</FormLabel>
      <Select
        multiple
        value={data}
        renderValue={(selected) => selected.map((s) => s.subject + '-' + s.group).join(', ')}
        //onChange={handleChange}
      >
        {langs.map(({ subject, group }, i) => {
          const result = []
          if (currentSubject !== subject) {
            currentSubject = subject
            result.push(<ListSubheader>{subject}</ListSubheader>)
          }
          const checked = !!data.find((d) => d.group === group && d.subject === subject)
          result.push(
            <MenuItem key={i} onClick={() => handleChange({ subject, group }, checked)}>
              <Checkbox checked={checked} />
              <ListItemText primary={group} />
            </MenuItem>
          )

          return result
        })}
      </Select>
    </FormGroup>
  )
}

export default LangGroupsSelect
