import {
  Autocomplete,
  AutocompleteGetTagProps,
  Checkbox,
  Chip,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material'
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import { SchoolEvent } from '../../../types/Event'
import { Promo, Settings } from '../../../types/Settings'
import { useData } from '~/context/data_context'

const LangGroupsSelect = ({
  code,
  value = {},
  setValue,
}: {
  code?: Promo['code']
  value: Settings['langs']
  setValue: (_newValue: Settings['langs']) => void
}) => {
  const { langs } = useData()
  if (!code || !langs?.length) return null

  const handleChange = (_e: any, values: Array<Pick<SchoolEvent, 'subject' | 'group'>>) => {
    const newLangs = values.reduce(
      (acc, { subject, group }) => {
        if (!acc[subject]) {
          acc[subject] = []
        }
        acc[subject].push(group)
        return acc
      },
      {} as Settings['langs'][Promo['code']]
    )
    setValue({ ...value, [code]: newLangs })
  }

  const data = value?.[code]
    ? Object.entries(value[code]).flatMap(([subject, groups]) =>
        groups.map((group) => ({ subject, group }))
      )
    : []

  return (
    <FormGroup>
      <FormLabel component="legend">Choix des groupes de langue</FormLabel>
      <Autocomplete
        fullWidth
        isOptionEqualToValue={(optionLang, selectedLang) =>
          optionLang.group === selectedLang.group && optionLang.subject === selectedLang.subject
        }
        onChange={handleChange}
        multiple
        options={langs}
        value={data}
        disableCloseOnSelect
        getOptionLabel={(option) => option.group}
        groupBy={(option) => option.subject.toUpperCase()}
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
              {option.group}
            </li>
          )
        }}
        renderInput={(params) => <TextField {...params} />}
        renderTags={(options, getTagProps: AutocompleteGetTagProps) => {
          return options.map((option, index: number) => (
            <Chip
              {...getTagProps({ index })}
              label={option.subject + '-' + option.group}
              key={index}
            />
          ))
        }}
      />
    </FormGroup>
  )
}

export default LangGroupsSelect
