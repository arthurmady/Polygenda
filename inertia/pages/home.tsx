import Agenda from '~/components/agenda'
import Navigation from '~/components/navigation'
import { EventsContextProvider } from '~/context/events_context'
import { SettingsContextProvider } from '~/context/settings_context'
import ThemeProvider from '~/context/theme_context'
import type {} from '@mui/lab/themeAugmentation'

const Home = () => {
  return (
    <SettingsContextProvider>
      <ThemeProvider>
        <Navigation />
        <EventsContextProvider>
          <Agenda />
        </EventsContextProvider>
      </ThemeProvider>
    </SettingsContextProvider>
  )
}
export default Home
