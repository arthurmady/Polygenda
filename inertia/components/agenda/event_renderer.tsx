import { Stack, useTheme } from '@mui/material'
import { MouseEventHandler } from 'react'
import EventrendererTime from './renderer/time'
import EventRendererSubject from './renderer/subject'
import EventRendererRooms from './renderer/rooms'

const EventRenderer = ({
  onClick,
  event,
}: {
  onClick?: MouseEventHandler<HTMLElement>
  event: any
}) => {
  const theme = useTheme()

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      spacing={0}
      onClick={onClick}
      style={{
        padding: '2px 5px',
        height: '100%',
        border: '2px solid black',
        boxSizing: 'border-box',
        backgroundColor: event.color || theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <EventrendererTime {...event}/>
      <EventRendererSubject {...event} />
      <EventRendererRooms {...event} />
    </Stack>
  )
}

export default EventRenderer
