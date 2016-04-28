import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import App from './App';

import Register from './views/Register';
import Login from './views/Login';
import Song from './views/Song';
import SongEdit from './views/SongEdit';
import SongList from './views/SongList';
import MySongEdit from './views/my/SongEdit';
import MySongList from './views/my/SongList';

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
  '/song': {
    component: Song,
    subRoutes: {
      '/edit': {
        component: SongEdit
      },
      '/list': {
        component: SongList
      }
    }
  },
  '/my/song': {
    component: Song,
    subRoutes: {
      '/edit': {
        component: MySongEdit
      },
      '/list': {
        component: MySongList
      }
    }
  }
});

router.start(App, '#app');
