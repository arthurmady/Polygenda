import { createTheme, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'
import { useSettings } from '~/context/settings_context'
import { getContrastYIQ } from '~/utils/colors'

const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const { settings } = useSettings()
  const color = settings.color

  return (
    <ThemeProvider
      theme={createTheme({
        typography: {
          fontWeightMedium: 800,
        },
        palette: {
          primary: {
            main: color,
            contrastText: getContrastYIQ(color),
          },
          secondary: {
            main: color,
            contrastText: getContrastYIQ(color),
          },
        },
      })}
    >
      {children}
    </ThemeProvider>
  )
}

export default CustomThemeProvider
