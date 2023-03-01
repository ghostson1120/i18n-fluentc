import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import i18n from './i18n';

Vue.config.productionTip = false
Vue.use(i18n)

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
