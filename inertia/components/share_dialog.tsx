import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  Paper,
  Switch,
  Typography,
  useTheme,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Check, Share } from '@mui/icons-material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useSettings } from '~/context/settings_context'
import * as Encoder from '~/utils/encoder'

const ShareDialog = () => {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [withSettings, setWithSettings] = useState(false)
  const theme = useTheme()
  const { settings } = useSettings()

  const link =
    window.origin +
    useMemo(
      () => (withSettings === true ? `?settings=${Encoder.encode(settings)}` : ''),
      [withSettings]
    )

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3 * 1000) // Reset the state after 2 seconds
  }

  return (
    <>
      <Button variant="text" onClick={() => setOpen(true)}>
        <Share />
      </Button>
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogContent dividers={true}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: theme.palette.grey[700],
              padding: '16px',
              borderRadius: '8px',
              position: 'relative',
            }}
          >
            <Typography
              component="a"
              href={link}
              onClick={(e) => {
                e.preventDefault() // Empêcher la navigation
                handleCopyLink() // Copier le lien quand cliqué
              }}
              noWrap
              sx={{
                'color': theme.palette.primary.contrastText,
                'textDecoration': 'none',
                'wordBreak': 'break-all', // Gère les liens longs
                'display': 'block',
                ':hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {link}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end', // Aligner le bouton à droite,
                p: 0,
              }}
            >
              <Chip
                icon={copied ? <Check /> : <ContentCopyIcon color="inherit" />}
                label={copied ? 'Lien copié' : 'Copier le lien'}
                color={copied ? 'success' : 'default'}
                variant={copied ? 'filled' : 'outlined'}
                onClick={handleCopyLink}
                size="small"
                sx={{ fontSize: '0.75rem', color: theme.palette.primary.contrastText, p: '5px' }}
              />
            </Box>
          </Paper>
          <FormControlLabel
            label="Partager mes paramètres"
            control={
              <Switch
                checked={withSettings}
                onChange={(e) => {
                  setCopied(false)
                  setWithSettings(e.target.checked)
                }}
              />
            }
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={() => setOpen(false)}>Fermer</Button>
          <Button
            variant="contained"
            onClick={() =>
              navigator.share({
                url: link,
                title: 'Polygenda',
                text: `Regarde ma super app pour gérer mon emploi du temps à Polytech.${!!withSettings && "\nJe t'ai mis ma config avec !"}`,
              })
            }
          >
            Partager via
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ShareDialog
