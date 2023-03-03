import { createApp } from 'vue';
import i18n from './i18n';

import BaseSearch from './components/UI/BaseSearch.vue';
import BaseContainer from './components/UI/BaseContainer.vue';
import App from './App.vue';

const app = createApp(App);
app.use(i18n);

app.component('base-search', BaseSearch);
app.component('base-container', BaseContainer);

app.mount('#app');
