// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http";

import eventsUtils from '#utils/events'
import cache from '@adonisjs/cache/services/main'
import promos from "#utils/promo";
import { Promo } from '../../types/Settings.js'

export default class EventsController {
  async api({ request, response }: HttpContext) {
    const code = request.param('code')
    const promo = promos.find((p: Promo) => p.code === code)
    if (!promo) {
      return response.notFound()
    }

    const events = await cache.getOrSet(
      `events_${code}`,
      async () => {
        const url = `https://sos-salle.polytech-lille.fr/wsADE_events.php?serveurade=planning-2024&numprojet=0&promo=${promo.code}`
        const result = await fetch(url, {
          signal: AbortSignal.timeout(5000),
          headers: {
            Accept: 'text/html,application/xhtml+xml,application/xml',
          },
        })
        const text = await result.text()
        return eventsUtils.transform(JSON.parse(text), promo.label)
      },
      {
        //ttl: '1h',
        gracePeriod: { enabled: true, duration: '24h', fallbackDuration: '5m' }
      }
    )
    return events
  }
}