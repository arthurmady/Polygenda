import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useSettings } from './settings_context'
import { generateColors } from '../utils/colors'
import { SchoolEvent } from '~/types/Event'
import { ProcessedEvent } from '@aldabil/react-scheduler/types'
import { useTheme } from '@mui/material/styles'
import configLangs from '~/config/langs'

const EventsContext = createContext<{ events: ProcessedEvent[] }>({
  events: [],
})

export const useEvents = () => useContext(EventsContext)

export const EventsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<SchoolEvent[]>([])
  const [colors, setColors] = useState<{ [key: string]: string }>({})
  const { settings } = useSettings()
  const theme = useTheme()

  useEffect(() => {
    const fetchRemoteEvents = async () => {
      if (!settings.promo?.code) return
      const response = await fetch(`/api/${settings.promo.code}`)
      const result: SchoolEvent[] = await response.json()
      setEvents(result)
    }
    fetchRemoteEvents()
  }, [settings.promo?.code])

  useEffect(() => {
    if (!events) return

    const key =
      settings.colorMode === 'subject'
        ? 'subject'
        : settings.colorMode === 'sizegroup'
          ? 'sizegroup'
          : null
    if (key === null) return

    const uniqueColors = [...new Set(events.map((e) => e[key]))]
    const generatedColors = generateColors(uniqueColors.length)
    setColors(() => {
      let result: any = {}
      generatedColors.forEach((color: string, index: number) => {
        result[uniqueColors[index]] = color
      })
      return result
    })
  }, [events])

  const updateEvents = useCallback(
    (schoolEvents: SchoolEvent[]): ProcessedEvent[] => {
      return schoolEvents
        .filter((event) => {
          if (!settings.promo?.code) {
            return true
          }
          // Check if it's a lang
          if (
            configLangs.some((lang) => event.subject.toUpperCase().includes(lang.toUpperCase())) &&
            settings.langs?.[settings.promo.code]?.[event.subject]
          ) {
            return settings.langs?.[settings.promo.code]?.[event.subject]?.some(
              (s) => s === event.group
            )
            // Check if it's "global" subject, split with sizegroup (td, tp)
          } else if (
            ['TD', 'TP'].some(
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
          color: colors[event[settings.colorMode]] || theme.palette.primary.main,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
    },
    [colors, settings]
  )

  if (!settings.promo) {
    return null
  }

  return (
    <EventsContext.Provider value={{ events: updateEvents(events) }}>
      {children}
    </EventsContext.Provider>
  )
}
