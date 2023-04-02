import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';

const app=createApp(App);
app.use(router);
app.use(store);
app.use(VueAxios, axios)

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
// app.component('the-header',TheHeader);
// app.component('the-footer',TheFooter);

app.mount('#app');

