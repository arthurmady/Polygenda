import { DayHours } from '@aldabil/react-scheduler/types'
import { WeekDays } from '@aldabil/react-scheduler/views/Month'

interface Promo {
  label: string
  code: string
}

type ColorMode = 'default' | 'subject' | 'sizegroup'

interface Settings {
  groups: Record<Promo['code'], Record<SchoolEvent['subject'], Array<SchoolEvent['group']>>>
  showWeekends: boolean
  agendaMode: boolean
  promo: Promo | null
  rangeHours: [DayHours, DayHours]
  colorMode: ColorMode
}
