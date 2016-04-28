import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import App from './App';

import Admin from './views/Admin';
import Register from './views/Register';
import Login from './views/Login';
import Song from './views/Song';
import SongAdd from './views/SongAdd';
import SongList from './views/SongList';
import MySongAdd from './views/my/SongAdd';
import MySongList from './views/my/SongList';

Vue.use(Resource);

Vue.use(Router);

const router = new Router({
  history: false, // use history=false when testing
  saveScrollPosition: true
});

router.map({
  '/': {
    component: Login
  },
  '/admin': {
    component: Admin
  },
  '/register': {
    component: Register
  },
  '/login': {
    component: Login
  },
  '/song': {
    component: Song,
    subRoutes: {
      '/add': {
        component: SongAdd
      },
      '/list': {
        component: SongList
      }
    }
  },
  '/my/song': {
    component: Song,
    subRoutes: {
      '/add': {
        component: MySongAdd
      },
      '/list': {
        component: MySongList
      }
    }
  }
});

router.start(App, '#app');
