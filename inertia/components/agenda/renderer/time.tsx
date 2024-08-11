import { Typography } from "@mui/material"
import { format } from "date-fns"
import { SchoolEvent } from "~/types/Event"

const EventrendererTime = ({ start, end}: Pick<SchoolEvent, "start" | "end">) => {
  if(!start && !end) return
  return <Typography style={{ fontSize: '0.5rem', fontWeight: 'bold' }}>
  {`${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`}
</Typography>
}

export default EventrendererTime