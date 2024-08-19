// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

import cache from '@adonisjs/cache/services/main'
import { promos } from '#config/data'
import { Promo } from '../../types/Settings.js'
import { ApiService } from '#services/api_service'

export default class EventsController {
  async events({ request, response }: HttpContext) {
    const code = request.param('code')
    const promo = promos.find((p: Promo) => p.code === code)
    if (!promo) {
      return response.notFound()
    }
    return cache.getOrSet(`events_${promo.code}`, () => ApiService.getEvents(promo))
  }

  async metadata({ request, response }: HttpContext) {
    const code = request.param('code')
    const promo = promos.find((p: Promo) => p.code === code)
    if (!promo) {
      return response.notFound()
    }
    const events = await cache.getOrSet(`events_${promo.code}`, () => ApiService.getEvents(promo))
    const [langs, groups] = await Promise.all([
      ApiService.getLangs(events),
      ApiService.getGroups(events),
    ])
    return cache.getOrSet(`metadata_${promo.code}`, () => {
      return {
        langs,
        groups,
      }
    })
  }
}
