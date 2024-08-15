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
import { useEffect, useState } from 'react'
import langs from '~/config/langs'
import { SchoolEvent } from '~/types/Event'
import { Promo } from '~/types/Settings'
import { Settings } from '../../../types/Settings'

const fetchRemoteEvents = async (code: Promo['code']) => {
  const response = await fetch(`/api/${code}`)
  return response.json()
}

const LangGroupsSelect = ({
  code,
  value = {},
  setValue,
}: {
  code?: Promo['code']
  value: Settings['langs']
  setValue: (_newValue: Settings['langs']) => void
}) => {
  const [subjectsWithGroups, setSubjectsWithGroups] = useState<
    {
      subject: string
      group: string
    }[]
  >()

  useEffect(() => {
    if (!code) return
    fetchRemoteEvents(code).then((events: SchoolEvent[]) => {
      const langEvents = events.filter(
        (event) =>
          langs.some((lang) => event.subject.toUpperCase().includes(lang.toUpperCase())) &&
          event.group !== null
      )
      setSubjectsWithGroups(
        Array.from(
          new Map(langEvents.map((event) => [event.subject + '-' + event.group, event])).values()
        )
      )
    })
  }, [code])

  if (!subjectsWithGroups?.length || !code) {
    return null
  }

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
        options={subjectsWithGroups.sort((a, b) => {
          if (a.subject < b.subject) return -1
          if (a.subject > b.subject) return 1
          if (a.group < b.group) return -1
          if (a.group > b.group) return 1
          return 0
        })}
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
