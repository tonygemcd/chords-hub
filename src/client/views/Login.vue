<template>
<div class="login_wrap">
  <group title="欢迎进入 Chrods Hub">
    <m-input title="用户名" placeholder="请输入你的用户名" :value.sync="username"></m-input>
    <m-input title="密码" placeholder="请输入密码" type="password" :value.sync="password"></m-input>
  </group>
  <div class="buttons_wrap">
    <m-button type="primary" @click="login()">注册</m-button>
  </div>
</div>
</template>

<script>
import Group from 'mui_components/group';
import MInput from 'mui_components/m-input';
import MButton from 'mui_components/m-button';

export default {
  created () {
  },
  ready () {
  },
  components: {
    Group,
    MInput,
    MButton
  },
  data () {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login () {
      let newUserData = {
        username: this.username,
        password: this.password
      };
      this.$http.post('/api/user/add', newUserData, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        response.data;
        console.log(response);
      }, function (response) {
      });
    }
  }
};
</script>

<style lang="scss">
.login_wrap {
  .buttons_wrap {
    margin-top: 20px;
    padding: 0 10px;
  }
}
</style>
