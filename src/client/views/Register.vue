<template>
<div class="register_wrap">
  <group title="注册 Chrods Hub">
    <m-input
    title="用户名"
    placeholder="请输入你的用户名"
    :value.sync="username"
    @change="validate()"></m-input>

    <m-input
    title="密码"
    placeholder="请输入密码"
    type="password"
    :value.sync="password"
    @change="validate()"></m-input>

    <m-input
    title="确认密码"
    placeholder="请再次输入密码"
    type="password"
    :value.sync="passwordCheck"
    @change="validate()"></m-input>

    <m-input
    title="邀请码"
    placeholder="请输入邀请码"
    :value.sync="invitecode"
    @change="validate()"></m-input>
  </group>
  <div class="bottom_wrap">
    <p class="tip">{{ bottomTip }}</p>
    <m-button type="primary" @click="addNewUser()" :disabled="!(validate())">注册</m-button>
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
      password: '',
      passwordCheck: '',
      invitecode: '',
      bottomTip: ''
    };
  },
  methods: {
    addNewUser () {
      if (!this.validate()) {
        return;
      }

      let newUserData = {
        username: this.username,
        password: this.password,
        invitecode: this.invitecode
      };
      let that = this;
      this.$http.post('/api/user', newUserData, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        if (response.data.errCode === 0) {
          that.showAlert('恭喜注册成功！');
        } else {
          that.showAlert(response.data.errMsg);
        }
        console.log(response);
      }, function (response) {

      });
    },
    showAlert (content = '失败了，请重试') {
      this.$dispatch('show-alert', content);
    },
    validate () {
      let validated = false;

      // 检验用户名
      if (!(this.username.length > 0)) {
        this.bottomTip = '请输入用户名';
        return validated;
      }
      // 检验密码
      if (this.password !== this.passwordCheck) {
        this.bottomTip = '两次输入的密码不一样';
        return validated;
      }
      // 检验邀请码
      if (!(this.invitecode.length > 0)) {
        this.bottomTip = '请填写邀请码';
        return validated;
      }
      // 验证通过
      validated = true;
      this.bottomTip = '';

      return validated;
    }
  }
};
</script>

<style lang="scss">
.register_wrap {
  .tip {
    color: #666;
    font-size: 14px;
  }
  .bottom_wrap {
    margin-top: 20px;
    padding: 0 10px;
  }
}
</style>
