import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VuePapaParse from 'vue-papa-parse'

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseDialog from './components/ui/BaseDialog.vue';

const app=createApp(App);
app.use(router);
app.use(store);
app.use(VuePapaParse);

app.use(VueAxios, axios)

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);

// app.component('the-header',TheHeader);
// app.component('the-footer',TheFooter);
app.mount('#app');

