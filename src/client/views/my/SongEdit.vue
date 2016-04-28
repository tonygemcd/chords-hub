<template>
<div class="song_edit_wrap">
  <group title="歌曲信息">
    <m-input
    title="歌曲名"
    :value.sync="title"></m-input>
    <template v-for="singer in singers">
      <m-input
      title="演唱者"
      :value.sync="singer"></m-input>
    </template>
    <group-item
    title="歌曲选调"
    :right-desc="tonePicker.value[0]"
    @click="triggerTonePickerShow()"></group-item>
  </group>

  <group title="添加歌词">
    <m-textarea placeholder="在此填写歌词" :value.sync="lyric"></m-textarea>
  </group>
  <div class="buttons_wrap">
    <m-button type="primary" @click="createSong()">创建</m-button>
  </div>

  <popup :show.sync="tonePicker.show">
    <p class="picker_title">请选择选调</p>
    <picker :data="tonePicker.data" :value.sync="tonePicker.value"></picker>
  </popup>
</div>
</template>

<script>
import Group from 'mui_components/group';
import GroupItem from 'mui_components/group-item';
import MInput from 'mui_components/m-input';
import MTextarea from 'mui_components/m-textarea';
import MButton from 'mui_components/m-button';
import Popup from 'mui_components/popup';
import Picker from 'mui_components/picker';

export default {
  created () {
  },
  ready () {
  },
  components: {
    Group,
    GroupItem,
    MInput,
    MTextarea,
    MButton,
    Popup,
    Picker
  },
  data () {
    return {
      title: '',
      singers: [''],
      lyric: '',
      tonePicker: {
        show: false,
        data: [['C', 'D', 'E', 'F', 'G', 'A', 'B']],
        value: ['']
      }
    };
  },
  methods: {
    showAlert (content = '失败了，请重试') {
      this.$dispatch('show-alert', content);
    },
    triggerTonePickerShow () {
      this.tonePicker.show = !this.tonePicker.show;
    },
    createSong () {
      let that = this;
      let newSongData = {
        title: this.title,
        singers: this.singers,
        tone: this.tonePicker.value[0],
        lyric: this.lyric
      };
      this.$http.post('/api/my/song', newSongData, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        if (response.data.errCode === 0) {
          that.showAlert('添加成功！');
        } else {
          that.showAlert(response.data.errMsg);
        }
        console.log(response);
      }, function (response) {
      });
    }
  }
};
</script>

<style lang="scss">
.song_edit_wrap {
  .buttons_wrap {
    margin-top: 20px;
    padding: 0 10px;
  }
  .picker_title {
    text-align: center;
    padding: 10px 0;
  }
}
</style>
