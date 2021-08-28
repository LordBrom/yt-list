import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
//import { BModal, BFormGroup, BFormInport, BButton, BSpinner, BCard, BTable } from 'bootstrap-vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/main.css'

Vue.config.productionTip = false

//Vue.component('BModal', BModal);
//Vue.component('BFormGroup', BFormGroup);
//Vue.component('BFormInport', BFormInport);
//Vue.component('BButton', BButton);
//Vue.component('BSpinner', BSpinner);
//Vue.component('BCard', BCard);
//Vue.component('BTable', BTable);

Vue.use(BootstrapVue);

new Vue({
	render: h => h(App),
	store,
	router,
}).$mount('#app')
