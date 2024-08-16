import { Typography } from '@mui/material'
import '@fontsource-variable/teko'

const Logo = () => {
  return (
    <Typography
      variant="h3"
      color="primary"
      sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'Teko Variable' }}
    >
      POLYGENDA
    </Typography>
  )
}

export default Logo
