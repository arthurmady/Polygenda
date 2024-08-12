import { ProcessedEvent } from '@aldabil/react-scheduler/types'

type Professor = string

interface Room {
  building: string
  type: string
  name: string
}

interface RemoteData {
  description: string
  title: string
  end: TDateISO
  start: TDateISO
}

interface SchoolEvent extends ProcessedEvent {
  origin: RemoteData['title']
  event_id: string
  subject: string
  sizegroup: string
  group: string
  rooms: Room[]
  professors: Professor[]
}
