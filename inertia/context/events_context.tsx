import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { useSettings } from './settings_context'
import { generateColors } from '../utils/colors'
import { SchoolEvent } from '~/types/Event';

const EventsContext = createContext<{ events: SchoolEvent[]; colors: { [key: string]: string } }>({
  events: [],
  colors: {},
})

export const useEvents = () => useContext(EventsContext)

export const EventsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<SchoolEvent[]>([])
  const [colors, setColors] = useState<{ [key: string]: string }>({})
  const { settings } = useSettings()

  useEffect(() => {
    const fetchRemoteEvents = async () => {
      if (!settings.promo?.code) return
      const response = await fetch(`/api/${settings.promo.code}`)
      const result = await response.json()
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

  return (
    <EventsContext.Provider value={{ events, colors }}>
      {children}
    </EventsContext.Provider>
  )
}
