const FluentcBackend = require('../../cjs')
const ChainedBackend= require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

const isBrowser = typeof window !== 'undefined'

module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  backend: {
    backendOptions: [{
      expirationTime: 60 * 60 * 1000 // 1 hour
    }, {
      environmentId: 'c9f4b5fc-3c67-4de7-b59a-9b2899048726',
    }],
    backends: isBrowser ? [LocalStorageBackend, FluentcBackend] : [],
  },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : [],
}