<template>
  <div class="app_wrap">
    <router-view
    transition
    transition-mode="out-in"></router-view>

    <dialog
    :show="dialog.show"
    :head="dialog.head"
    :buttons="dialog.buttons">
    </dialog>
  </div>
</template>

<script>
import Dialog from 'mui_components/dialog';

export default {
  created () {
  },
  ready () {
  },
  components: {
    Dialog
  },
  events: {
    'show-alert': function (content = '系统繁忙') {
      this.dialog.show = true;
      this.dialog.head = content;
    }
  },
  data () {
    let that = this;
    return {
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
  }
};
</script>

<style>
@import "./assets/vendors/normalize.css";
body {
  background-color: #fbf9fe;
  font-family: Helvetica, sans-serif;
}
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
</style>
