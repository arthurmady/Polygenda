import app from '@adonisjs/core/services/app'
import { defineConfig, store, drivers } from '@adonisjs/cache'
import env from '#start/env'

const cacheConfig = defineConfig({
  default: 'file',
  stores: {
    file: store().useL2Layer(
      drivers.file({
        directory: app.tmpPath('cache'),
      })
    ),
  },
  ttl: env.get('CACHE_TTL'),
  gracePeriod: {
    enabled: env.get('CACHE_GRACEPERIOD_ENABLED'),
    duration: env.get('CACHE_GRACEPERIOD_DURATION'),
    fallbackDuration: env.get('CACHE_GRACEPERIOD_DURATION'),
  },
})

export default cacheConfig

declare module '@adonisjs/cache/types' {
  interface CacheStores extends InferStores<typeof cacheConfig> {}
}
