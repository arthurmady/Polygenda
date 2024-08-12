import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useSettings } from './settings_context'
import { generateColors } from '../utils/colors'
import { SchoolEvent } from '~/types/Event'
import { ProcessedEvent } from '@aldabil/react-scheduler/types'
import { useTheme } from '@mui/material/styles'
import langs from '~/config/langs'

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
    (events: SchoolEvent[]): ProcessedEvent[] => {
      return events
        .filter(
          (event) =>
            !langs.some((lang) => event.subject?.toUpperCase().includes(lang.toUpperCase())) ||
            (langs.some((lang) => event.subject.toUpperCase().includes(lang.toUpperCase())) &&
              settings.promo?.code &&
              settings.groups?.[settings.promo.code]?.[event.subject]?.some(
                (s) => s === event.group
              ))
        )
        .map((event) => {
          return {
            ...event,
            title: event.subject,
            color: colors[event[settings.colorMode]] || theme.palette.primary.main,
            start: new Date(event.start),
            end: new Date(event.end),
          }
        })
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
