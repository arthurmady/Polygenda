import { AppBar, Toolbar } from '@mui/material'
import SettingsDialog from '~/components/dialogs/settings'
import ShareDialog from '~/components/dialogs/share'
import Logo from '~/components/logo'

const Navigation = () => {
  return (
    <AppBar position="static" color="transparent" sx={{ flexGrow: 1 }}>
      <Toolbar disableGutters>
        <Logo />
        <ShareDialog />
        <SettingsDialog />
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
