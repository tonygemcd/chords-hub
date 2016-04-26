<template>
<div class="login_wrap">
  <group title="欢迎使用 Chrods Hub">
    <m-textarea :max="200" placeholder="I'm placeholder"></m-textarea>
  </group>
  <div class="buttons_wrap">
    <m-button type="primary" @click="createChords()">创建</m-button>
    <m-button type="primary" @click="checkLogin()">校验登入态</m-button>
  </div>
</div>
</template>

<script>
import Group from 'mui_components/group';
import MTextarea from 'mui_components/m-input';
import MButton from 'mui_components/m-button';
import Cookie from 'js-cookie';

export default {
  created () {
  },
  ready () {
  },
  components: {
    Group,
    MTextarea,
    MButton
  },
  data () {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
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
