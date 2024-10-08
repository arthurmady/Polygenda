import env from '#start/env'
import eventsUtils from '#utils/events'
import { Promo } from '../../types/Settings.js'
import * as config from '#config/data'
import { SchoolEvent } from '../../types/Event.js'

export class ApiService {
  static async getLangs(events: SchoolEvent[]) {
    const langEvents = events.filter(
      (event) =>
        config.langs.some((lang) => event.subject.toUpperCase().includes(lang.toUpperCase())) &&
        event.group !== null
    )
    const langs = Array.from(
      new Map(
        langEvents.map((item) => [
          item.subject + '-' + item.group,
          { subject: item.subject, group: item.group },
        ])
      ).values()
    )
    return langs.sort((a, b) => {
      if (a.subject < b.subject) return -1
      if (a.subject > b.subject) return 1
      if (a.group < b.group) return -1
      if (a.group > b.group) return 1
      return 0
    })
  }

  static async getGroups(events: SchoolEvent[]) {
    const groupEvents = events.filter(
      (event) =>
        config.sizegroups.some((sizegroup) => sizegroup.toUpperCase() === event.sizegroup) &&
        event.group !== null
    )
    const groups = [...new Set(groupEvents.map((event) => event.group))]
    return groups.sort()
  }

  static async getEvents(promo: Promo) {
    const url = `${env.get('API_URL')}?serveurade=planning-2024&numprojet=0&promo=${promo.code}`
    const result = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml',
      },
    })
    const text = await result.text()
    return eventsUtils.transform(JSON.parse(text), promo.label)
  }
}
