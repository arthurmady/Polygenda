/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const EventsController = () => import('#controllers/events_controller')
import router from '@adonisjs/core/services/router'

router.get('/api/:code', [EventsController, 'api'])

router.on('/').renderInertia('home')

router.get(
  '/robots.txt',
  () => `
  User-agent: *
  Disallow: /
`
)
