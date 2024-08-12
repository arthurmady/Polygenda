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

const defaultSettings = {
  showWeekends: false,
  promo: null,
  rangeHours: [8, 18] as [DayHours, DayHours],
  colorMode: 'default' as ColorMode,
  agendaMode: false,
  groups: {},
}

const SettingsContext = createContext<{
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
}>({
  settings: defaultSettings,
  setSettings: () => {},
})

export const useSettings = () => useContext(SettingsContext)

export const SettingsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    const storedData = localStorage.getItem('settings')
    if (storedData) {
      setSettings(JSON.parse(storedData))
    }
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
      {children}
    </SettingsContext.Provider>
  )
}
