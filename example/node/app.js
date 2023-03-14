// serve translations
const express = require('express')
const app = express()
app.listen(8080)

// i18next in action...
const i18next = require('i18next')
const FluentcBackend = require('../../cjs')
i18next.use(FluentcBackend).init({
  lng: 'de',
  fallbackLng: 'en',
  preload: ['en', 'fr'],
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    environmentId: '24dcb33e-f567-44c5-95d7-870e54a3c3ae'
  }
}, (err, t) => {
  if (err) return console.error(err)
  console.log('[default]', t('nokey'))
  console.log('[fr]', t('nokey', { lng: 'fr' }))
  console.log('[it]', t('nokey', { lng: 'it' }))

  i18next.
})
