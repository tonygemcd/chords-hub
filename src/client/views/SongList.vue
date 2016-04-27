<template>
<div class="song_list_wrap">
  <p v-show="!(songList.length > 0)">数据加载中...</p>
  <div class="song_item" v-for="item in songList">
    <h4>{{ item.meta.title }}</h4>
    <div class="song_metas">
      <span>演唱者: {{ item.meta.singers[0] }}</span>
      <span>选调: {{ item.meta.tone }}</span>
    </div>
    <pre>{{ item.content.lyric }}</pre>
  </div>
</div>
</template>

<script>
export default {
  created () {
  },
  ready () {
    this.renderSongList();
  },
  components: {
  },
  data () {
    return {
      songList: []
    };
  },
  methods: {
    renderSongList () {
      let that = this;
      this.$http.get('/api/song', [], {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        if (response.data.errCode === 0) {
          that.songList = response.data.songList;
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
