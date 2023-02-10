// serve translations
const express = require('express')
const app = express()
app.use('/locales', express.static('locales'))
app.listen(8080)

// i18next in action...
const i18next = require('i18next')
// const HttpBackend = require('i18next-http-backend')
const HttpBackend = require('../../cjs')
i18next.use(HttpBackend).init({
  lng: 'de',
  fallbackLng: 'en',
  preload: ['en', 'de'],
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    environmentId: '24dcb33e-f567-44c5-95d7-870e54a3c3ae'
  }
}, (err, t) => {
  if (err) return console.error(err)
  console.log(t('preview'))
  console.log(t('preview', { lng: 'de' }))
})
