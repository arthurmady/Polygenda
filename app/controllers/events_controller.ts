// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

import cache from '@adonisjs/cache/services/main'
import promos from '#utils/promo'
import { Promo } from '../../types/Settings.js'
import { ApiService } from '#services/api_service'

export default class EventsController {
  async api({ request, response }: HttpContext) {
    const code = request.param('code')
    const promo = promos.find((p: Promo) => p.code === code)
    if (!promo) {
      return response.notFound()
    }
    return cache.getOrSet(`events_${promo.code}`, () => ApiService.getEvents(promo))
  }
}
