/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const EventsController = () => import('#controllers/events_controller')
const HomeController = () => import('#controllers/home_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('events/:code', [EventsController, 'events'])
    router.get('metadata/:code', [EventsController, 'metadata'])
  })
  .prefix('api')

router.get('/', [HomeController, 'home'])

router.get(
  '/robots.txt',
  () => `
  User-agent: *
  Disallow: /
`
)
