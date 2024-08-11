import { Typography } from "@mui/material"
import ApartmentIcon from '@mui/icons-material/Apartment'

const ExtraBuildings = ({ rooms } : Pick<SchoolEvent, 'rooms'>) => {
  if(!rooms) return
  const buildings = !rooms?.length
    ? []
    : [...new Set(rooms?.map((r: Room) => r.building))]
  const types = !rooms?.length ? [] : [...new Set(rooms?.map((r: Room) => r.type))]
  const names = !rooms?.length ? [] : [...new Set(rooms?.map((r: Room) => r.name))]

  return (
    <Typography
      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      color="textSecondary"
      variant="caption"
    >
      <ApartmentIcon /> {buildings.join(', ')} ({types.join(', ')})
      <br />
      {names.join(', ')}
    </Typography>
  )
}

export default ExtraBuildings