import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSearch, faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(faUser, faInfoCircle, faSearch, faTrashAlt)
Vue.use(BootstrapVue)
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('token') != null;
  if (isLogin) {
    next();
  } else {
    if (to.path !== '/LoginRegisterDialog')
      next('/LoginRegisterDialog');
    else
      next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
