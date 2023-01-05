import Vue from 'vue';
import App from './App'
import router from './router';
import vuetify from './plugins/vuetify';
import "vuetify/dist/vuetify.min.css";
import VueCookies from 'vue-cookies'
import { Auth0Plugin } from './auth';
import dotenv from 'dotenv'

dotenv.config()
// import { domain, clientId, audience } from '../auth_config.json';
Vue.config.productionTip = false;


// Install the authentication plugin here
Vue.use(VueCookies)
Vue.use(Auth0Plugin, {
  domain:process.env.VUE_APP_API_DOMAIN,
  clientId:process.env.VUE_APP_API_CLIENT_ID,
  audience:process.env.VUE_APP_API_AUDIENCE,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});
new Vue({
    router,
    vuetify,
  render: h => h(App),
}).$mount('#app');
