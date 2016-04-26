<template>
<div class="chords_list_wrap">
  <p v-show="!(chordsList.length > 0)">数据加载中...</p>
  <div class="chords_item" v-for="item in chordsList">
    <h4>{{ item.meta.title }}</h4>
    <div class="chords_metas">
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
    this.renderChordsList();
  },
  components: {
  },
  data () {
    return {
      chordsList: []
    };
  },
  methods: {
    renderChordsList () {
      let that = this;
      this.$http.get('/api/chords', [], {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        if (response.data.errCode === 0) {
          that.chordsList = response.data.chordsList;
        }
        console.log(response);
      }, function (response) {
      });
    }
  }
};
</script>

<style lang="scss">
.chords_list_wrap {
  .chords_item {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    h4 {
      font-size: 18px;
      margin-bottom: 5px;
    }
  }
  .chords_metas {
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
