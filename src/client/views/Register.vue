<template>
<div class="register_wrap">
  <group title="注册 Chrods Hub">
    <m-input title="用户名" placeholder="请输入你的用户名" :value.sync="username"></m-input>
    <m-input title="密码" placeholder="请输入密码" type="password" :value.sync="password"></m-input>
    <m-input title="确认密码" placeholder="请再次输入密码" type="password" :value.sync="password"></m-input>
    <m-input title="邀请码" placeholder="请输入邀请码" :value.sync="invitecode"></m-input>
  </group>
  <div class="buttons_wrap">
    <m-button type="primary" @click="addNewUser()">注册</m-button>
  </div>

  <dialog
  :show="dialog.show"
  :head="dialog.head"
  :buttons="dialog.buttons">
  </dialog>
</div>
</template>

<script>
import Group from 'mui_components/group';
import MInput from 'mui_components/m-input';
import MButton from 'mui_components/m-button';
import Dialog from 'mui_components/dialog';

export default {
  created () {
  },
  ready () {
  },
  components: {
    Group,
    MInput,
    MButton,
    Dialog
  },
  data () {
    let that = this;
    return {
      username: '',
      password: '',
      invitecode: '',
      dialog: {
        show: false,
        head: '',
        buttons: [{
          name: '确认',
          onClick () {
            that.dialog.show = false;
          }
        }]
      }
    };
  },
  methods: {
    addNewUser () {
      let newUserData = {
        username: this.username,
        password: this.password,
        invitecode: this.invitecode
      };
      let that = this;
      this.$http.post('/api/user/add', newUserData, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        if (response.data.errCode === 0) {
          that.showAlert('恭喜注册成功！');
        } else {
          that.showAlert();
        }
        console.log(response);
      }, function (response) {

      });
    },
    showAlert (content = '失败了，请重试') {
      this.dialog.show = true;
      this.dialog.head = content;
    }
  }
};
</script>

<style lang="scss">
.register_wrap {
  .buttons_wrap {
    margin-top: 20px;
    padding: 0 10px;
  }
}
</style>
