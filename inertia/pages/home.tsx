import Agenda from '~/components/agenda'
import Navigation from '~/components/navigation'
import { DataContextProvider } from '~/context/data_context'
import { SettingsContextProvider } from '~/context/settings_context'
import ThemeContextProvider from '~/context/theme_context'
import type {} from '@mui/lab/themeAugmentation'
import type { InferPageProps } from '@adonisjs/inertia/types'
import EventsController from '#controllers/events_controller'
import ConfigContextProvider from '~/context/config_context'

const Home = (props: InferPageProps<EventsController, 'api'>) => {
  return (
    <ConfigContextProvider config={props.config}>
      <SettingsContextProvider>
        <ThemeContextProvider>
          <DataContextProvider>
            <Navigation />
            <Agenda />
          </DataContextProvider>
        </ThemeContextProvider>
      </SettingsContextProvider>
    </ConfigContextProvider>
  )
}
export default Home
