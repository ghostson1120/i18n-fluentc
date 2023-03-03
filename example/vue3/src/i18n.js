import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from '../../../cjs';

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
      environmentId: 'a41674da-505f-4ca6-a731-302b333e54c6'
    }
  });

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}