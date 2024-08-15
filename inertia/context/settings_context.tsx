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
import { Grid, Link, Paper, Typography } from '@mui/material'
import PromoSelect from '~/components/settings/promo_select'

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
      {settings?.promo?.code ? (
        children
      ) : (
        <Grid container spacing={2} minHeight={'100vh'}>
          <Grid xs item display="flex" justifyContent="center" alignItems="center">
            <Paper elevation={6} sx={{ padding: 4, minWidth: '30%', maxWidth: '80%' }}>
              <Typography textAlign={'justify'}>
                Bonjour et bienvenu(e) sur cette application d'emploi du temps de Polytech Lille.
                <br />
                <br />
                Cette application n'est pas officielle et est la réalisation d'un étudiant.
                <br />
                Ce projet a été réalisé pour le fun et ne doit en aucun cas être pris pour vérité
                absolue.
                <br />
                Vous pouvez utiliser cette application autant que vous le souhaitez,
                <br />
                mais ne soyez pas surpris si elle contient des bugs ou des informations erronées.
                <br />
                N'oubliez pas que la vraie info se trouve sur&nbsp;
                <Link href={'https://sos-salle.polytech-lille.fr/'}>
                  https://sos-salle.polytech-lille.fr/
                </Link>
                .<br />
                <br />
                Si toutefois vous souhaitez au moins voir à quoi cela ressemble,
                <br />
                il vous suffit de sélectionner votre promo dans la liste :
                <PromoSelect
                  value={settings.promo}
                  setValue={(newPromo) => {
                    setSettings((s) => {
                      localStorage.setItem('settings', JSON.stringify({...s, promo: newPromo}))
                      return {...s, promo: newPromo}
                    })
                  }}
                  noLabel={true}
                />
                <br />
                <br />
                Cordialement,
                <br />
                Arthur Mady
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </SettingsContext.Provider>
  )
}
