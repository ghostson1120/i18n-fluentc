import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-fluentc-backend';

i18next
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    backend: {
      environmentId: 'eb9b992a-81d9-4a6e-9cdc-4dccacba943e'
    }
  });

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}