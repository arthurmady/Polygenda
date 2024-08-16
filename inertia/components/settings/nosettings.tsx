import { Grid, Paper, Typography, Link } from '@mui/material'
import PromoSelect from '~/components/settings/promo_select'
import { useSettings } from '~/context/settings_context'
import Logo from '~/components/logo'

const NoSettings = () => {
  const { settings, setSettings } = useSettings()

  return (
    <Grid container spacing={2} minHeight={'100vh'}>
      <Grid xs item display="flex" justifyContent="center" alignItems="center">
        <Paper elevation={6} sx={{ padding: 4, minWidth: '30%', maxWidth: '80%' }}>
          <Logo />
          <Typography textAlign={'justify'}>
            Bonjour et bienvenu(e) sur cette application d'emploi du temps de Polytech Lille.
            <br />
            <br />
            Cette application n'est pas officielle et est la réalisation d'un étudiant.
            <br />
            Ce projet a été réalisé pour le fun et ne doit en aucun cas être pris pour vérité
            absolue.
            <br />
            Vous pouvez utiliser cette application autant que vous le souhaitez,
            <br />
            mais ne soyez pas surpris si elle contient des bugs ou des informations erronées.
            <br />
            N'oubliez pas que la vraie info se trouve sur&nbsp;
            <Link href={'https://sos-salle.polytech-lille.fr/'}>
              https://sos-salle.polytech-lille.fr/
            </Link>
            .<br />
            <br />
            Si toutefois vous souhaitez au moins voir à quoi cela ressemble,
            <br />
            il vous suffit de sélectionner votre promo dans la liste :
            <PromoSelect
              value={settings.promo}
              setValue={(newPromo) => {
                setSettings((s) => {
                  localStorage.setItem('settings', JSON.stringify({ ...s, promo: newPromo }))
                  return { ...s, promo: newPromo }
                })
              }}
              noLabel={true}
            />
            <br />
            <br />
            Cordialement,
            <br />
            Arthur Mady
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default NoSettings
