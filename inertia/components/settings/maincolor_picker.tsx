import { FormGroup, FormLabel } from '@mui/material'
import { Color, ColorPicker, useTranslate } from 'material-ui-color'
import { frFR } from '../../config/colors'
import { Settings } from '../../../types/Settings'

const MainColorPicker = ({
  value,
  setValue,
}: {
  value: Settings['color']
  setValue: (_newValue: Settings['color']) => void
}) => {
  const translate = (translationId: string) => {
    let valueTranslated
    if (translationId) valueTranslated = frFR[translationId]
    return valueTranslated || translationId
  }
  useTranslate(() => ({ i18n: { language: 'fr' }, t: translate }))

  return (
    <FormGroup>
      <FormLabel component="legend">Couleur principale</FormLabel>
      <ColorPicker value={value} onChange={(color: Color) => setValue('#' + color.hex)} />
    </FormGroup>
  )
}

export default MainColorPicker
