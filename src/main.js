import Vue from 'vue'
import App from './App.vue'
import '@/utils/rem'
import router from '@/router/router';
import './common/common.scss';
import { Toast } from 'vant';
import 'vant/lib/toast/style';
Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
