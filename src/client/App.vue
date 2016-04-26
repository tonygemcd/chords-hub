<template>
  <div class="app_wrap">
    <h1>Hello world!!</h1>
    <a href="javascript:void(0);" @click="addNewUser()">添加新用户</a>
    <a href="javascript:void(0);" @click="getUser()">获取用户信息</a>
    <a href="javascript:void(0);" @click="getUsers()">获取所有用户信息</a>
    <a href="javascript:void(0);" @click="deleteUser()">删除用户</a>
    <a href="javascript:void(0);" @click="deleteUsers()">删除所有用户</a><br/>
    <a href="javascript:void(0);" @click="generateInviteCode()">生成邀请码</a>
    <a href="javascript:void(0);" @click="getInviteCodes()">获取邀请码</a>
    <a href="javascript:void(0);" @click="deleteInviteCodes()">删除邀请码</a>
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
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        response.data;
        console.log(response);
      }, function (response) {
        // error callback
      });
    },
    getUser (id = '571cd9d8815c5d710c4c3738') {
      this.$http.get(`/api/user/${id}`, [], {
        headers: {
          'Accept': 'application/json',
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
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        response.data;
        console.log(response);
      }, function (response) {
        // error callback
      });
    },
    deleteUser (id = '571cd9d8815c5d710c4c3738') {
      this.$http.delete(`/api/user/${id}`, [], {
        headers: {
          'Accept': 'application/json',
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
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        response.data;
        console.log(response);
      }, function (response) {
        // error callback
      });
    },
    generateInviteCode () {
      this.$http.post('/api/invite-code/generate', [], {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        response.data;
        console.log(response);
      }, function (response) {
        // error callback
      });
    },
    getInviteCodes () {
      this.$http.get('/api/invite-code/all', [], {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {});
    },
    deleteInviteCodes () {
      this.$http.delete('/api/invite-code/all', [], {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {});
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
