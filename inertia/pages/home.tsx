import Agenda from '~/components/agenda'
import Navigation from '~/components/navigation'
import { EventsContextProvider } from '~/context/events_context'
import { SettingsContextProvider } from '~/context/settings_context'

const Home = () => {
  return (
    <SettingsContextProvider>
      <EventsContextProvider>
        <Navigation/>
        <Agenda />
      </EventsContextProvider>
    </SettingsContextProvider>
  )
}
export default Home