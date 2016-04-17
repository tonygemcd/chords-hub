import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import App from './App';

Vue.use(Resource);

Vue.use(Router);

const router = new Router({
  history: false, // use history=false when testing
  saveScrollPosition: true
});

router.start(App, '#app');
