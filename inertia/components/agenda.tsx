import { Scheduler } from '@aldabil/react-scheduler'
import { useSettings } from '~/context/settings_context'
import { useData } from '~/context/data_context'
import { fr } from 'date-fns/locale'
import EventRenderer from '~/components/agenda/event_renderer'
import translations from '~/config/translations'
import ViewerExtraComponent from './agenda/view_extra_component'
import { useCookies } from 'react-cookie'
import { getMax } from '~/utils/date'
import { SchoolEvent } from '../../types/Event'
import { useEffect, useRef } from 'react'
import { SchedulerRef } from '@aldabil/react-scheduler/types'

const Agenda = () => {
  const { settings } = useSettings()
  const [cookies, setCookies] = useCookies(['current_date'])
  const calendarRef = useRef<SchedulerRef>(null)
  const { events } = useData()

  const initialDate = cookies.current_date
    ? getMax(new Date(cookies.current_date), new Date())
    : new Date()

  /*
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scheduler.handleState(events.length === 0, 'loading')
    }
  }, [events.length]) */

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scheduler.handleState(settings.agendaMode, 'agenda')
    }
  }, [settings.agendaMode])

  return (
    <Scheduler
      ref={calendarRef}
      height={650}
      view="week"
      editable={false}
      deletable={false}
      draggable={false}
      hourFormat="24"
      selectedDate={initialDate}
      locale={fr}
      translations={translations.agenda}
      onSelectedDateChange={(newDate: Date) => setCookies('current_date', newDate)}
      week={{
        weekDays: settings.showWeekends ? [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 3, 4],
        weekStartOn: 1,
        startHour: settings.rangeHours[0],
        endHour: settings.rangeHours[1],
        step: 60,
      }}
      day={{
        startHour: settings.rangeHours[0],
        endHour: settings.rangeHours[1],
        step: 60,
      }}
      eventRenderer={({ event, onClick }) => {
        return (
          <EventRenderer
            onClick={onClick}
            key={`${event.event_id}_${event.start.toString()}_${event.end.toString()}`}
            event={event}
          />
        )
      }}
      viewerExtraComponent={(fields, event) => (
        <ViewerExtraComponent fields={fields} event={event as SchoolEvent} />
      )}
      events={events}
    />
  )
}

export default Agenda
