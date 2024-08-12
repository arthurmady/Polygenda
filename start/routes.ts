/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import EventsController from '#controllers/events_controller'
import router from '@adonisjs/core/services/router'

router.get('/api/:code', [EventsController, 'api'])
router.get('/test', [EventsController, 'test'])

router.on('/').renderInertia('home')
