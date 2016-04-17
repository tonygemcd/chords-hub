<template>
  <div class="app_wrap">
    <h1>Hello world!!</h1>
    <a href="javascript:void(0);" @click="addNewUser">添加新用户</a>
    <a href="javascript:void(0);" @click="getUsers">获取所有用户信息</a>
    <a href="javascript:void(0);" @click="deleteUsers">删除所有用户</a>
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
    getUsers () {
      this.$http.get('/user/list', [], {
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
    addNewUser () {
      this.$http.post('/user/add', [], {
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
      this.$http.delete('/user/deleteall', [], {
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
body {
  font-family: Helvetica, sans-serif;
}
</style>
