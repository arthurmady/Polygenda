import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormLabel,
  Stack,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import PromoSelect from './settings/promo_select'
import ShowWeekendCheckBox from './settings/showweekend_checkbox'
import AgendaModeCheckbox from './settings/agendamode_checkbox'
import ColormodeSelect from './settings/colormode_select'
import HoursSlider from './settings/hours_slider'
import { Settings } from '../../types/Settings'
import { useSettings } from '../context/settings_context'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

const SettingsDialog = () => {
  const [open, setOpen] = useState(false)
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
      <Button variant="text" onClick={() => setOpen(true)} startIcon={<SettingsOutlinedIcon />}>
        Paramètres
      </Button>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleCancel}
        PaperProps={{
          component: 'form',
          onSubmit: () => {
            setSettings(localSettings)
            setOpen(false)
          },
        }}
      >
        <DialogTitle>Paramètres</DialogTitle>
        <DialogContent dividers={true}>
        <Stack spacing={2}>
          <FormGroup>
            <FormLabel component="legend">Choix de la promo</FormLabel>
            <PromoSelect
              value={localSettings.promo}
              setValue={(newValue) => updateLocalSettings('promo', newValue)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="legend">Définition des horaires d'une journées</FormLabel>
            <HoursSlider
              value={localSettings.rangeHours}
              setValue={(newValue) => updateLocalSettings('rangeHours', newValue)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="legend">Personnalisation de l'affichage</FormLabel>
            <AgendaModeCheckbox
              value={localSettings.agendaMode }
              setValue={(newValue) => updateLocalSettings('agendaMode', newValue)}
              />
            <ShowWeekendCheckBox
              value={localSettings.showWeekends}
              setValue={(newValue) => updateLocalSettings('showWeekends', newValue)}
              />
              </FormGroup>
          <FormGroup>
            <FormLabel component="legend">Mode de colorisation</FormLabel>
            <ColormodeSelect
              value={localSettings.colorMode}
              setValue={(newValue) => updateLocalSettings('colorMode', newValue)}
            />
         </FormGroup>
         </Stack>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'space-between'}}>
          <Button onClick={handleCancel}>Annuler</Button>
          <Button type="submit" variant='contained'>Valider</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SettingsDialog
