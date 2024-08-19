import Agenda from '~/components/agenda'
import Navigation from '~/components/navigation'
import { EventsContextProvider } from '~/context/events_context'
import { SettingsContextProvider } from '~/context/settings_context'
import ThemeContextProvider from '~/context/theme_context'
import type {} from '@mui/lab/themeAugmentation'

const Home = () => {
  return (
    <SettingsContextProvider>
      <ThemeContextProvider>
        <EventsContextProvider>
          <Navigation />
          <Agenda />
        </EventsContextProvider>
      </ThemeContextProvider>
    </SettingsContextProvider>
  )
}
export default Home
