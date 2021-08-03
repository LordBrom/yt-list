import Vue from 'vue'
import App from './App.vue'
//import { BCard, BButton } from 'bootstrap-vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
//Vue.component('BCard', BCard);
//Vue.component('BButton', BButton);

new Vue({
  render: h => h(App),
}).$mount('#app')
