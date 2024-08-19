import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useSettings } from './settings_context'
import { generateColors } from '../utils/colors'
import { useTheme } from '@mui/material/styles'
import { SchoolEvent } from '../../types/Event'
import { langs as langsConfig, sizegroups as sizegroupsConfig } from '#config/data'

const EventsContext = createContext<SchoolEvent[]>([])

export const useEvents = () => useContext(EventsContext)

export const EventsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { settings } = useSettings()
  const [events, setEvents] = useState<SchoolEvent[]>()
  const theme = useTheme()

  useEffect(() => {
    const fetchRemoteEvents = async () => {
      if (!settings.promo?.code) return
      const response = await fetch(`/api/events/${settings.promo.code}`)
      const fetchedData = await response.json()
      setEvents(fetchedData)
    }
    fetchRemoteEvents()
  }, [settings.promo?.code])

  const colors = useMemo(() => {
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
    let result: any = {}
    generatedColors.forEach((color: string, index: number) => {
      result[uniqueColors[index]] = color
    })
    return result
  }, [events, settings])

  const filterEvents = useMemo(() => {
    if (!events) return []
    return events.filter((event) => {
      if (!settings.promo?.code) return true
      // Check if it's a lang
      if (langsConfig.some((lang) => event.subject.toUpperCase().includes(lang.toUpperCase()))) {
        return (
          settings.langs?.[settings.promo.code]?.[event.subject] &&
          settings.langs?.[settings.promo.code]?.[event.subject].length !== 0 &&
          Object.keys(settings.langs?.[settings.promo.code]).indexOf(event.subject) > -1 &&
          settings.langs?.[settings.promo.code]?.[event.subject]?.some((s) => s === event.group)
        )
        // Check if it's "global" subject, split with sizegroup (td, tp)
      } else if (
        settings.groups?.[settings.promo.code] &&
        sizegroupsConfig.some(
          (sizegroup) => sizegroup?.toUpperCase() === event.sizegroup?.toUpperCase()
        )
      ) {
        return (
          settings.groups?.[settings.promo.code].length !== 0 &&
          settings.groups?.[settings.promo.code].indexOf(event.group) !== -1
        )
      }
      return true
    })
  }, [settings, events]).map((event) => ({
    ...event,
    title: event.subject,
    color:
      settings.colorMode === 'default'
        ? theme.palette.primary.main
        : colors[event[settings.colorMode]] || theme.palette.primary.main,
    start: new Date(event.start),
    end: new Date(event.end),
  }))

  const colorizedEvents = useMemo(() => {
    if (!colors) return filterEvents
    return filterEvents.map((event) => ({
      ...event,
      title: event.subject,
      color:
        settings.colorMode === 'default'
          ? theme.palette.primary.main
          : colors[event[settings.colorMode]] || theme.palette.primary.main,
      start: new Date(event.start),
      end: new Date(event.end),
    }))
  }, [filterEvents, colors])

  return <EventsContext.Provider value={colorizedEvents}>{children}</EventsContext.Provider>
}
