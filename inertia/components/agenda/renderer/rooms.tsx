import { Typography } from "@mui/material"
import { Fragment } from "react/jsx-runtime"
import { Room, SchoolEvent } from "~/types/Event"

const EventRendererRooms = ({ rooms }: Pick<SchoolEvent, 'rooms'>) => {
  if(!rooms) return <Typography variant="subtitle2" style={{ fontSize: 12 }}>-</Typography>

  return <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>
  {rooms?.length > 2 ? (
    <>{rooms.length} salles</>
  ) : (
    rooms?.map((room: Room, index: number) => (
      <Fragment key={index}>
        {room.name}
        {index !== rooms?.length - 1 ? ', ' : ''}
      </Fragment>
    ))
  )}
</Typography>
}

export default EventRendererRooms