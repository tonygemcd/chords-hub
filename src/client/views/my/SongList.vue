<template>
<div class="song_list_wrap">
  <p>{{ tips }}</p>
  <div class="buttons_wrap">
    <m-button v-link="'/my/song/add'">添加歌曲</m-button>
  </div>
  <div class="song_item" v-for="song in songs">
    <h4>{{ song.meta.title }}</h4>
    <div class="song_metas">
      <span>演唱者: {{ song.meta.singers[0] }}</span>
      <span>选调: {{ song.meta.tone }}</span>
    </div>
    <pre>{{ song.content.lyric }}</pre>
  </div>
</div>
</template>

<script>
import MButton from 'mui_components/m-button';

export default {
  created () {
  },
  ready () {
    this.renderSongList();
  },
  components: {
    MButton
  },
  data () {
    return {
      tips: '数据加载中...',
      songs: []
    };
  },
  methods: {
    renderSongList () {
      let that = this;
      this.$http.get('/api/my/song', [], {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        if (response.data.errCode === 0) {
          that.songs = response.data.songs;
          that.tips = that.songs.length === 0 ? '没有歌曲，快去添加' : '';
        }
        console.log(response);
      }, function (response) {
      });
    }
  }
};
</script>

<style lang="scss">
.song_list_wrap {
  .buttons_wrap {
    padding: 15px 10px;
  }
  p {
    text-align: center;
    margin: 10px 0;
  }
  .song_item {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    h4 {
      font-size: 18px;
      margin-bottom: 5px;
    }
  }
  .song_metas {
    font-size: 14px;
    margin-bottom: 5px;
    span {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
