import { Typography } from "@mui/material"
import { SchoolEvent } from "~/types/Event"

const EventRendererSubject = ({subject, sizegroup, group}: Pick<SchoolEvent, "subject" | "sizegroup" | "group">) => {
  if(!subject && !sizegroup && !group) return
  return <Typography variant="subtitle2" style={{ fontSize: "0.7rem", fontWeight: 'bolder' }}>
  {`${subject}${sizegroup && sizegroup.toUpperCase() !== 'GRP' ? ' - ' + sizegroup : ''}${group ? ' (' + group + ')' : ''}`}
  </Typography>
}

export default EventRendererSubject