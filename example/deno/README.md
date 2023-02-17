# just like usual...

```ts
import i18next from 'https://deno.land/x/i18next/index.js'

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        welcome: 'hello world'
      }
    },
    de: {
      translation: {
        welcome: 'hallo welt'
      }
    }
  }
}, (err: Error, t: (...params: any[]) => string) => {
  if (err) return console.error(err)
  console.log(t('welcome')) // hello world
  console.log(t('welcome', { lng: 'de' })) // hallo welt
})
```

```sh
deno run --allow-net --allow-env --allow-read app.ts
```