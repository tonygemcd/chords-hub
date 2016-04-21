<template>
<div class="register_wrap">
  <group title="注册 Chrods Hub">
    <m-input title="用户名" placeholder="请输入你的用户名"></m-input>
    <m-input title="密码" placeholder="请输入密码"></m-input>
    <m-input title="邀请码" placeholder="请输入邀请码"></m-input>
  </group>
</div>
</template>

<script>
import Group from 'mui_components/group';
import MInput from 'mui_components/m-input';

export default {
  created () {
  },
  ready () {
  },
  components: {
    MInput,
    Group
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
    }
  }
};
</script>

<style>
</style>
