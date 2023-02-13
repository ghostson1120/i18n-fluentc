import { createI18n } from './vue-i18next'
import i18nextMod from 'i18next'
// import i18nextFluentcBackend from 'i18next-fluentc-backend'
import i18nextFluentcBackend from '../../../cjs'
import LanguageDetector from 'i18next-browser-languagedetector'

export const i18next = i18nextMod

export const i18nextPromise = i18next
  .use(LanguageDetector)
  .use(i18nextFluentcBackend)
  .init({
    debug: true,
    preload: ['en', 'es'],
    fallbackLng: 'en',
    backend: {
      environmentId: '24dcb33e-f567-44c5-95d7-870e54a3c3ae'
    }
  });

export const i18n = createI18n(i18next);
