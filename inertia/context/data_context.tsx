import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useSettings } from './settings_context'
import { generateColors } from '../utils/colors'
import { useTheme } from '@mui/material/styles'
import { SchoolEvent } from '../../types/Event'
import { langs as langsConfig, sizegroups as sizegroupsConfig } from '../../config/data'

interface DataType {
  events: SchoolEvent[]
  langs?: {
    subject: SchoolEvent['subject']
    group: SchoolEvent['group']
  }[]
  groups?: SchoolEvent['group'][]
}

const DataContext = createContext<DataType>({
  events: [],
  langs: [],
  groups: [],
})

export const useData = () => useContext(DataContext)

export const DataContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataType>()
  const { settings } = useSettings()
  const theme = useTheme()

  useEffect(() => {
    const fetchRemoteEvents = async () => {
      if (!settings.promo?.code) return
      const response = await fetch(`/api/${settings.promo.code}`)
      const fetchedData = await response.json()
      setData(fetchedData)
    }
    fetchRemoteEvents()
  }, [settings.promo?.code])

  const colors = useMemo(() => {
    if (!data?.events) return

    const key =
      settings.colorMode === 'subject'
        ? 'subject'
        : settings.colorMode === 'sizegroup'
          ? 'sizegroup'
          : null
    if (key === null) return

    const uniqueColors = [...new Set(data.events.map((e) => e[key]))]
    const generatedColors = generateColors(uniqueColors.length)
    let result: any = {}
    generatedColors.forEach((color: string, index: number) => {
      result[uniqueColors[index]] = color
    })
    return result
  }, [data?.events, settings])

  const filterEvents = useCallback(
    (schoolEvents?: SchoolEvent[]): SchoolEvent[] => {
      if (!data?.events) return []
      if (!schoolEvents) return []
      return schoolEvents
        .filter((event) => {
          if (!colors) return true
          if (!settings.promo?.code) return true
          // Check if it's a lang
          if (
            langsConfig.some((lang) => event.subject.toUpperCase().includes(lang.toUpperCase())) &&
            settings.langs?.[settings.promo.code]?.[event.subject]
          ) {
            return settings.langs?.[settings.promo.code]?.[event.subject]?.some(
              (s) => s === event.group
            )
            // Check if it's "global" subject, split with sizegroup (td, tp)
          } else if (
            sizegroupsConfig.some(
              (sizegroup) => sizegroup?.toUpperCase() === event.sizegroup?.toUpperCase()
            ) &&
            settings.groups?.[settings.promo.code]
          ) {
            return settings.groups?.[settings.promo.code].indexOf(event.group) !== -1
          }
          return true
        })
        .map((event) => ({
          ...event,
          title: event.subject,
          color:
            settings.colorMode === 'default'
              ? theme.palette.primary.main
              : colors[event[settings.colorMode]] || theme.palette.primary.main,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
    },
    [colors, settings, data?.events]
  )

  return (
    <DataContext.Provider
      value={{
        events: filterEvents(data?.events),
        langs: data?.langs,
        groups: data?.groups,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
