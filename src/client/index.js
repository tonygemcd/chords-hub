import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import App from './App';

import Register from './views/Register';
import Login from './views/Login';
import Chords from './views/Chords';
import ChordsEdit from './views/ChordsEdit';
import ChordsList from './views/ChordsList';

Vue.use(Resource);

Vue.use(Router);

const router = new Router({
  history: false, // use history=false when testing
  saveScrollPosition: true
});

router.map({
  '/register': {
    component: Register
  },
  '/login': {
    component: Login
  },
  '/chords': {
    component: Chords,
    subRoutes: {
      '/edit': {
        component: ChordsEdit
      },
      '/list': {
        component: ChordsList
      }
    }
  }
});

router.start(App, '#app');
