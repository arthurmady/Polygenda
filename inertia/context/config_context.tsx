import EventsController from '#controllers/events_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { createContext, ReactNode, useContext } from 'react'

const ConfigContext = createContext<InferPageProps<EventsController, 'api'>['config']>({
  langs: [],
  promos: [],
  sizegroups: [],
})

export const useConfig = () => useContext(ConfigContext)

const ConfigContextProvider = ({
  children,
  config,
}: {
  children: ReactNode
  config: InferPageProps<EventsController, 'api'>['config']
}) => <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>

export default ConfigContextProvider
