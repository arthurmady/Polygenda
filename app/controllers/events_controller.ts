// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

import eventsUtils from '#utils/events'
import cache from '@adonisjs/cache/services/main'
import promos from '#utils/promo'
import { Promo } from '../../types/Settings.js'

export default class EventsController {
  async fetchEvents(promo?: Promo) {
    if (!promo?.code) {
      return []
    }
    return cache.getOrSet(
      `events_${promo.code}`,
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
        ttl: '5s',
        gracePeriod: { enabled: true, duration: '24h', fallbackDuration: '5m' },
      }
    )
  }

  async test() {
    const events = await this.fetchEvents(promos.find((p) => p.label === 'IS3'))
    const subjectsWithGroups = events
      .filter(
        (event) =>
          ['anglais', 'allemand', 'espagnol', 'portugais', 'english'].some((lang) =>
            event.subject.toUpperCase().includes(lang.toUpperCase())
          ) && event.group !== null
      )
      .reduce((acc: any, event) => {
        const subject = event.subject
        if (!acc[subject]) {
          acc[subject] = new Set()
        }
        acc[subject].add(event.group)
        return acc
      }, {})

    const result = Object.keys(subjectsWithGroups).map((subject) => {
      return {
        subject,
        groups: Array.from(subjectsWithGroups[subject]), // Convert Set to Array
      }
    })
    return result
    //return Object.groupBy(events.filter(e => e.group !== null && ["TD", "TP"].indexOf(e.sizegroup) !== -1), (event) => event.subject);
  }

  async api({ request, response }: HttpContext) {
    const code = request.param('code')
    const promo = promos.find((p: Promo) => p.code === code)
    if (!promo) {
      return response.notFound()
    }

    return this.fetchEvents(promo)
  }
}
