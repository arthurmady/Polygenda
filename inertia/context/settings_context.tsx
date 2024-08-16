import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { ColorMode, Settings } from '../../types/Settings'
import { DayHours } from '@aldabil/react-scheduler/types'
import * as Encoder from '~/utils/encoder'
import NoSettings from '~/components/settings/nosettings'

const defaultSettings = {
  color: '#1E5E90',
  showWeekends: false,
  promo: null,
  rangeHours: [8, 18] as [DayHours, DayHours],
  colorMode: 'default' as ColorMode,
  agendaMode: false,
  groups: {},
  langs: {},
}

const SettingsContext = createContext<{
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
}>({
  settings: defaultSettings,
  setSettings: () => {},
})

const cleanFromParams = (input: any) => {
  // input n'est pas un JSON
  if (!(typeof input === 'object' && input !== null && !Array.isArray(input))) {
    return null
  }
  const output: Record<string, any> = {}
  // Itération sur les clés de config
  for (const key in defaultSettings) {
    if (input.hasOwnProperty(key)) {
      output[key] = input[key]
    }
  }
  return output
}

const getAndRemoveURLParam = (param: string) => {
  const currentUrl = new URL(window.location.href)
  const paramValue = currentUrl.searchParams.get(param)
  currentUrl.searchParams.delete(param)
  window.history.replaceState({}, '', currentUrl)
  return paramValue
}

export const useSettings = () => useContext(SettingsContext)

export const SettingsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    const storedData = localStorage.getItem('settings') || null
    setSettings({
      ...defaultSettings,
      ...(storedData ? JSON.parse(storedData) : {}),
      ...cleanFromParams(Encoder.decode(getAndRemoveURLParam('settings') || '')),
    })
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings: (newSettings) => {
          localStorage.setItem('settings', JSON.stringify(newSettings))
          setSettings(newSettings)
        },
      }}
    >
      {settings?.promo?.code ? children : <NoSettings />}
    </SettingsContext.Provider>
  )
}
