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
import { Promo, Settings } from '../../types/Settings'
import { useSettings } from '../context/settings_context'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import GroupSelect from './settings/group_select'

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

  const groups = useMemo(() => {
    if (!localSettings.promo?.code || !localSettings.groups?.[localSettings.promo.code]) return []
    return localSettings.groups?.[localSettings.promo.code]
      ? Object.entries(localSettings.groups?.[localSettings.promo.code]).flatMap(
          ([subject, groups]) => groups.map((group) => `${subject}-${group}`)
        )
      : []
  }, [localSettings.promo?.code, localSettings.groups])

  return (
    <>
      <Button
        variant="text"
        onClick={() => setOpen(true)}
        startIcon={<SettingsOutlinedIcon />}
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
            <PromoSelect
              value={localSettings.promo}
              setValue={(newValue) => updateLocalSettings('promo', newValue)}
            />
            <GroupSelect
              code={localSettings.promo?.code}
              value={groups}
              setValue={(newValues: string[]) => {
                if (!localSettings.promo?.code) return []
                const oldGroups: Settings['groups'][Promo['code']] = {}
                newValues.forEach((newValue) => {
                  const [subject, group] = newValue.split('-')
                  oldGroups[subject] = oldGroups[subject] || []
                  oldGroups[subject].push(group)
                })
                updateLocalSettings('groups', {
                  ...localSettings.groups,
                  [localSettings.promo.code]: oldGroups,
                })
              }}
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
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={handleCancel}>Annuler</Button>
          <Button type="submit" variant="contained">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SettingsDialog
