const config = {
  base_url:
    'https://sos-salle.polytech-lille.fr/wsADE_events.php?serveurade=planning-2024&numprojet=0',
  options: {
    //mode: 'no-cors',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml',
      origin: 'sos-salle.polytech-lille.fr',
    },
  } as RequestInit,
}

export default config
