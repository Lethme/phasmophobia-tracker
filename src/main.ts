import Tooltip from "primevue/tooltip";
import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';

import "./assets/less/global.less";

import "primevue/resources/themes/soho-dark/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";


createApp(App)
	.use(store)
	.use(router)
	.use(PrimeVue, { ripple: true })
	.directive('tooltip', Tooltip)
	.mount('#app');
