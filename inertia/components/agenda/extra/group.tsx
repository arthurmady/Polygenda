import { Typography } from "@mui/material"
import Groups2Icon from '@mui/icons-material/Groups2'
import { SchoolEvent } from "~/types/Event"

const ExtraGroup = ({ sizegroup, group} : Pick<SchoolEvent, 'group' | 'sizegroup'>) => {
  if(!sizegroup && !group) return
return <Typography
    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
    color="textSecondary"
    variant="caption"
  >
    <Groups2Icon /> {sizegroup} {!!sizegroup && ' - '}{group}
  </Typography>
}

export default ExtraGroup