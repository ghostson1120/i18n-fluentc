/* eslint-disable no-undef, new-cap */

i18next.use(i18nextFluentcBackend).init({
  debug: true,
  lng: 'en',
  fallbackLng: 'en',
  backend: {
    environmentId: '24dcb33e-f567-44c5-95d7-870e54a3c3ae'
  }
}, () => {
  const i18n = new VueI18next(i18next);

  Vue.component('app', {
    template: `
    <div>
      <div>
          <h3>Translation</h3>
          <language-changer></language-changer>
          <p>$t: {{ $t("apikey-first") }}</p>
      </div>
      <div>
        <h3>Interpolation</h3>
        <i18next path="term" tag="label" for="tos">
          <a href="#" target="_blank">{{ $t("nokey") }}</a>
          <strong>a</strong>
        </i18next>
      </div>
      <div>
        <h3>Prefix</h3>
        <key-prefix></key-prefix>
      </div>
      <div>
        <h3>Inline translations</h3>
        <inline-translations></inline-translations>
      </div>
    </div>`,
  });

  Vue.component('language-changer', {
    template: `
      <div>
        <a v-on:click="changeLanguage('de')">DE</a>
        &nbsp;|&nbsp;
        <a v-on:click="changeLanguage('en')">EN</a>
      </div>`,
    methods: {
      changeLanguage(lang) {
        this.$i18n.i18next.changeLanguage(lang);
      },
    },
  });

  Vue.component('key-prefix', {
    template: `
      <div>
        <p>{{$t('preview')}}</p>
      </div>`,
  });

  Vue.component('inline-translations', {
    i18nOptions: {
      messages: {
        en: {
          welcome: 'Welcome!',
        },
        de: {
          welcome: 'Guten Tag!',
        },
      },
    },
    template: `
      <div>
        {{$t('welcome')}}
      </div>`,
  });

  new Vue({
    i18n,
  }).$mount('#app');
});