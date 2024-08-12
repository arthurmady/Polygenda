import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import SettingsDialog from './settings_dialog'

const Navigation = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" sx={{ flexGrow: 1 }}>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={'/public/images/polygenda.png'} style={{ height: '50px' }} />
          </Typography>
          <SettingsDialog />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navigation
