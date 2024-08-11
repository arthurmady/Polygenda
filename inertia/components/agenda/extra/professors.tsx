import SchoolIcon from '@mui/icons-material/School'
import { Typography } from '@mui/material'
import { SchoolEvent } from '~/types/Event'

const ExtraProfessors = ({ professors} : Pick<SchoolEvent, 'professors'>) => {
  if(!professors.length) return
  return <Typography
    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
    color="textSecondary"
    variant="caption"
  >
    <SchoolIcon />
    {professors.join(', ')}
  </Typography>
}

export default ExtraProfessors