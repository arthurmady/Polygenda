import { createTheme, ThemeProvider } from '@mui/material'
import Agenda from '~/components/agenda'
import Navigation from '~/components/navigation'
import { EventsContextProvider } from '~/context/events_context'
import { SettingsContextProvider } from '~/context/settings_context'

const Home = () => {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: '#1E5E90',
          },
        },
      })}
    >
      <SettingsContextProvider>
        <Navigation />
        <EventsContextProvider>
          <Agenda />
        </EventsContextProvider>
      </SettingsContextProvider>
    </ThemeProvider>
  )
}
export default Home
