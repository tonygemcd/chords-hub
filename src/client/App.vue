<template>
  <div class="app_wrap">
    <h1>Hello world!!</h1>
    <a href="javascript:void(0);" @click="addNewUser()">添加新用户</a>
    <a href="javascript:void(0);" @click="getUser()">获取用户信息</a>
    <a href="javascript:void(0);" @click="getUsers()">获取所有用户信息</a>
    <a href="javascript:void(0);" @click="deleteUser()">删除用户</a>
    <a href="javascript:void(0);" @click="deleteUsers()">删除所有用户</a><br/>
    
    <router-view
    transition
    transition-mode="out-in"></router-view>
  </div>
</template>

<script>
export default {
  created () {
  },
  ready () {
  },
  methods: {
    addNewUser () {
      this.$http.post('/api/user/add', [], {
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        response.data;
        console.log(response);
      }, function (response) {
        // error callback
      });
    },
    getUser (uid = 1002) {
      this.$http.get(`/api/user/${uid}`, [], {
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        response.data;
        console.log(response);
      }, function (response) {
        // error callback
      });
    },
    getUsers () {
      this.$http.get('/api/users', [], {
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        response.data;
        console.log(response);
      }, function (response) {
        // error callback
      });
    },
    deleteUser (uid = 1002) {
      this.$http.delete(`/api/user/${uid}`, [], {
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        response.data;
        console.log(response);
      }, function (response) {
        // error callback
      });
    },
    deleteUsers () {
      this.$http.delete('/api/users', [], {
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        response.data;
        console.log(response);
      }, function (response) {
        // error callback
      });
    }
  }
};
</script>

<style>
@import "./assets/vendors/normalize.css";
body {
  background-color: #fbf9fe;
  font-family: Helvetica, sans-serif;
}
</style>
