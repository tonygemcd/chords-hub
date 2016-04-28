<template>
<div class="login_wrap">
  <group title="欢迎进入 Chrods Hub">
    <m-input title="用户名" placeholder="请输入你的用户名" :value.sync="username"></m-input>
    <m-input title="密码" placeholder="请输入密码" type="password" :value.sync="password"></m-input>
  </group>
  <p class="tips" v-link="'/register'">没有账号？去注册>></p>
  <div class="buttons_wrap">
    <m-button type="primary" @click="login()">登入</m-button>
    <m-button v-link="'/song/list'">随便看看</m-button>
  </div>
</div>
</template>

<script>
import Group from 'mui_components/group';
import MInput from 'mui_components/m-input';
import MButton from 'mui_components/m-button';
import Cookie from 'js-cookie';
import md5 from 'md5';

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
    showAlert (content = '失败了，请重试') {
      this.$dispatch('show-alert', content);
    },
    login () {
      let that = this;
      let loginData = {
        username: this.username,
        password: md5(this.password)
      };
      this.$http.post('/api/login', loginData, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        // 成功
        if (response.data.errCode === 0) {
          // 存下登入态
          Cookie.set('user_id', response.data.id, { expires: 1 });
          Cookie.set('user_skey', response.data.skey, { expires: 1 });
          // 跳转到个人歌曲列表页
          that.$route.router.go('/my/song/list');
        } else {
          that.showAlert('登入失败');
        }
      }, function (response) {
        // 失败
        that.showAlert('登入失败');
      });
    },
    checkLogin () {
      this.$http.get('/api/login', [], {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        // 成功
        if (response.data.errCode === 0) {
          console.log('校验成功');
        } else {
          console.log('校验失败');
        }
      }, function (response) {
        // 失败
      });
    }
  }
};
</script>

<style lang="scss">
.login_wrap {
  .tips {
    margin-top: 15px;
    padding-left: 10px;
  }
  .buttons_wrap {
    margin-top: 20px;
    padding: 0 10px;
  }
}
</style>
