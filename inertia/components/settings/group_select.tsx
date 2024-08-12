import {
  Checkbox,
  FormGroup,
  FormLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useEffect, useState } from 'react'
import langs from '~/config/langs'
import { SchoolEvent } from '~/types/Event'
import { Promo } from '~/types/Settings'

const fetchRemoteEvents = async (code: Promo['code']) => {
  const response = await fetch(`/api/${code}`)
  return response.json()
}

const GroupSelect = ({
  code,
  value,
  setValue,
}: {
  code?: Promo['code']
  value: string[]
  setValue: (_newValue: string[]) => void
}) => {
  const [subjectsWithGroups, setSubjectsWithGroups] = useState<
    {
      subject: string
      groups: string[]
    }[]
  >()

  useEffect(() => {
    if (!code) return
    fetchRemoteEvents(code).then((events: SchoolEvent[]) => {
      const subjectsWithGroups = events
        .filter(
          (event) =>
            langs.some((lang) => event.subject.toUpperCase().includes(lang.toUpperCase())) &&
            event.group !== null
        )
        .reduce((acc: any, event) => {
          const subject = event.subject
          if (!acc[subject]) {
            acc[subject] = new Set()
          }
          acc[subject].add(event.group)
          return acc
        }, {})

      const data = Object.keys(subjectsWithGroups).map((subject) => {
        return {
          subject,
          groups: Array.from<string>(subjectsWithGroups[subject]).sort(), // Convert Set to Array
        }
      })

      setSubjectsWithGroups(data)
    })
  }, [code])


  if (!subjectsWithGroups?.length || !code) {
    return null
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    const selected = typeof value === 'string' ? [value] : value
    setValue(selected)
  }

  return (
    <FormGroup>
      <FormLabel component="legend">Choix des groupes de langue</FormLabel>
      <Select
        multiple
        onChange={handleChange}
        value={value}
        renderValue={(selected) => selected.join(', ')}
        input={<OutlinedInput fullWidth={true} multiline />}
      >
        {subjectsWithGroups.map((subjectWithGroups, i) => {
          const { subject, groups } = subjectWithGroups
          return groups.map((group: string, j) => (
            <MenuItem key={`${i}-${j}`} value={subject + '-' + group}>
              <Checkbox checked={value.includes(subject + '-' + group)} />
              <ListItemText primary={subject + ' - ' + group} />
            </MenuItem>
          ))
        })}
      </Select>
    </FormGroup>
  )
}

export default GroupSelect
