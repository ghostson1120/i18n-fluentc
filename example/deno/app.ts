// serve translations
import { Application } from 'https://deno.land/x/abc/mod.ts'
(new Application())
  .start({ port: 8080 })

// i18next in action...
import i18next from 'https://deno.land/x/i18next/index.js'
import FluentcBackend from '../../esm/index.js'
i18next.use(FluentcBackend).init({
  lng: 'de',
  fallbackLng: 'en',
  preload: ['en', 'fr'],
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    environmentId: '7f6de052-b94b-42e2-ba85-34475e2f7975'
  }
}, (err: Error, t: (...params: any[]) => string) => {
  if (err) return console.error(err)

  console.log('[default]', t('nokey'))
  console.log('[fr]', t('nokey', { lng: 'fr' }))
  console.log('[it]', t('nokey', { lng: 'it' }))
})
