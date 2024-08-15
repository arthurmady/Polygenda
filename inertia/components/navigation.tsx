import { AppBar, Toolbar, Typography } from '@mui/material'
import SettingsDialog from './settings_dialog'
import ShareDialog from './share_dialog'
import '@fontsource-variable/teko'

const Navigation = () => {
  return (
    <AppBar position="static" color="transparent" sx={{ flexGrow: 1 }}>
      <Toolbar disableGutters>
        {/*           <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            <img src={'/public/images/polygenda.png'} style={{ height: '50px' }} />
          </Typography> */}
        <Typography
          variant="h3"
          color="primary"
          sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'Teko Variable' }}
        >
          POLYGENDA
        </Typography>
        <ShareDialog />
        <SettingsDialog />
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
