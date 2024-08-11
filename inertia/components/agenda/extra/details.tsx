import { useState } from "react"
import { Collapse, Link, Typography } from '@mui/material';
import { SchoolEvent } from "~/types/Event";

const ExtraDetails = ({ origin } : Pick<SchoolEvent, 'origin'>) => {
  if(!origin) return


  const [isOpen, setIsOpen] = useState(false)

  return <>
  <Typography style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}
    color="textSecondary"
    variant="caption"
  >

  <Link
    component="button"
    color="inherit"
    underline="hover"
    onClick={() => {
      setIsOpen(!isOpen)
    }}
    >
    Voir les détails
  </Link>
    </Typography>
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
    <Typography
      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      color="textSecondary"
      variant="caption"
    >{origin}</Typography>
    </Collapse>
   </>
}

export default ExtraDetails