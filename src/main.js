import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import moment from 'moment';

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCkljRyS61mSD6xkEfVjh704xKEkGUtOvk',
  authDomain: 'yakitori-rb.firebaseapp.com',
  databaseURL: 'https://yakitori-rb.firebaseio.com',
  projectId: 'yakitori-rb',
  storageBucket: 'yakitori-rb.appspot.com',
  messagingSenderId: '393750373830',
  appId: '1:393750373830:web:bb344b2bda6bb1762abec7',
  measurementId: 'G-XJW0Y3JRVV',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
