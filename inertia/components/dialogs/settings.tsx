import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormLabel,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import PromoSelect from '../settings/promo_select'
import ShowWeekendCheckBox from '../settings/showweekend_checkbox'
import AgendaModeCheckbox from '../settings/agendamode_checkbox'
import ColormodeSelect from '../settings/colormode_select'
import HoursSlider from '../settings/hours_slider'
import { Settings } from '../../../types/Settings'
import { useSettings } from '../../context/settings_context'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LangGroupsSelect from '../settings/langgroups_select'
import GroupsSelect from '../settings/groups_select'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import MainColorPicker from '../settings/maincolor_picker'
import { MetadataContextProvider } from '~/context/metadata_context'

const SettingsDialog = () => {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const { settings, setSettings } = useSettings()
  const [localSettings, setLocalSettings] = useState<Settings>(useMemo(() => settings, [settings]))

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings)
    }
  }, [settings])

  const updateLocalSettings = (key: keyof Settings, value: Settings[typeof key]) => {
    setLocalSettings({ ...localSettings, [key]: value })
  }

  const handleCancel = () => {
    setLocalSettings(settings)
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="text"
        onClick={() => setOpen(true)}
        sx={
          settings.promo
            ? {}
            : {
                '@keyframes pulse': {
                  '0%': { backgroundColor: '#ed8c55' },
                  '50%': { backgroundColor: 'white' },
                  '100%': { backgroundColor: '#ed8c55' },
                },
                'animation': 'pulse 1s infinite',
              }
        }
      >
        <SettingsOutlinedIcon />
      </Button>
      <Dialog
        fullScreen={window.innerWidth < 768}
        fullWidth={true}
        open={open}
        onClose={handleCancel}
        PaperProps={{
          component: 'form',
          sx: { minHeight: '70%' },
          onSubmit: () => {
            setSettings(localSettings)
            setOpen(false)
          },
        }}
      >
        <DialogTitle>
          <Typography variant="inherit" color="primary">
            PARAMETRES
          </Typography>
        </DialogTitle>
        <DialogContent dividers={true} sx={{ p: 0 }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={(e: any, newValue: string) => setActiveTab(newValue)}
                aria-label="lab API tabs example"
              >
                <Tab label="Général" value="general" />
                <Tab label="Affichage" value="affichage" />
              </TabList>
            </Box>
            <TabPanel value="general">
              <Stack spacing={3}>
                <MetadataContextProvider code={localSettings.promo?.code}>
                  <PromoSelect
                    value={localSettings.promo}
                    setValue={(newValue) => updateLocalSettings('promo', newValue)}
                  />
                  <GroupsSelect
                    code={localSettings.promo?.code}
                    value={localSettings.groups}
                    setValue={(newValue) => updateLocalSettings('groups', newValue)}
                  />
                  <LangGroupsSelect
                    code={localSettings.promo?.code}
                    value={localSettings.langs}
                    setValue={(newValue) => updateLocalSettings('langs', newValue)}
                  />
                </MetadataContextProvider>
              </Stack>
            </TabPanel>
            <TabPanel value="affichage">
              <Stack spacing={3}>
                <MainColorPicker
                  value={localSettings.color}
                  setValue={(newValue) => updateLocalSettings('color', newValue)}
                />
                <HoursSlider
                  value={localSettings.rangeHours}
                  setValue={(newValue) => updateLocalSettings('rangeHours', newValue)}
                />
                <FormGroup>
                  <FormLabel component="legend">Personnalisation de l'affichage</FormLabel>
                  <AgendaModeCheckbox
                    value={localSettings.agendaMode}
                    setValue={(newValue) => updateLocalSettings('agendaMode', newValue)}
                  />
                  <ShowWeekendCheckBox
                    value={localSettings.showWeekends}
                    setValue={(newValue) => updateLocalSettings('showWeekends', newValue)}
                  />
                </FormGroup>
                <ColormodeSelect
                  value={localSettings.colorMode}
                  setValue={(newValue) => updateLocalSettings('colorMode', newValue)}
                />
              </Stack>
            </TabPanel>
          </TabContext>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={handleCancel} size="large">
            Annuler
          </Button>
          <Button type="submit" variant="contained" size="large">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SettingsDialog
