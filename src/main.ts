import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSpinners from 'vue-spinners'

import "@/assets/_theme.scss";
import '@mdi/font/css/materialdesignicons.css'


Vue.use(VueSpinners)

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
