<template>
  <transition name="slide">
    <div
      @click.stop
      class="add-song"
      v-show="showList"
    >
      <div class="header">
        <h1 class="title">添加到歌曲列表</h1>
        <div
          @click="hide"
          class="close"
        >
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box
          @query="onQueryChange"
          placeholder="搜索歌曲"
          ref="searchBox"
        ></search-box>
      </div>
      <div
        class="shortcut"
        v-show="!query"
      >
        <switchs
          :currentIndex="currentIndex"
          :switches="tabs"
          @switch="changeIndex"
        ></switchs>
        <div class="list-wrapper">
          <scroll
            :data="playHistory"
            class="list-scroll"
            ref="songList"
            v-if="currentIndex===0"
          >
            <div class="list-inner">
              <song-list
                :songs="playHistory"
                @select="selectSong"
              ></song-list>
            </div>
          </scroll>
          <scroll
            :data="searchHistory"
            class="list-scroll"
            ref="searchList"
            v-if="currentIndex===1"
          >
            <div class="list-inner">
              <search-list
                :refreshTime="100"
                :searches="searchHistory"
                @delete="delectSearchHistory"
                @select="addQuery"
              ></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div
        class="search-result"
        v-show="query"
      >
        <suggest
          :query="query"
          :showSinger="showSinger"
          @listScroll="blurInput"
          @select="selectSuggest"
        ></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放列表</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>
<script>
import SearchBox from 'base/search-box/search-box'
import Switchs from 'base/switchs/switchs'
import Suggest from 'components/suggest/suggest'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import TopTip from 'base/top-tip/top-tip'
import SearchList from 'base/search-list/search-list'

import { Song } from 'common/js/song'
import { searchMixins } from 'common/js/mixin'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    SearchBox,
    Suggest,
    Switchs,
    Scroll,
    SongList,
    SearchList,
    TopTip
  },
  mixins: [searchMixins],
  data() {
    return {
      showList: false,
      showSinger: false,
      currentIndex: 0,
      tabs: [{ name: '最近播放' }, { name: '搜索历史' }]
    }
  },
  computed: {
    ...mapGetters({
      playHistory: 'playHistory',
      searchHistory: 'searchHistory'
    })
  },
  methods: {
    show() {
      this.showList = true
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songList.refresh()
        } else {
          this.$refs.searchBox.refresh()
        }
      }, 20)
    },
    hide() {
      this.showList = false
    },
    changeIndex(index) {
      this.currentIndex = index
    },
    selectSong(song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song))

        this.$refs.topTip.show()
      }
    },
    selectSuggest() {
      console.log('in')
      this.$refs.topTip.show()
      this.saveSearch()
    },
    ...mapActions(['insertSong'])
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: $color-background;

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .header {
    position: relative;
    height: 44px;
    text-align: center;

    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }

    .close {
      position: absolute;
      top: 0;
      right: 8px;

      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }

  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut {
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;

      .list-scroll {
        height: 100%;
        overflow: hidden;

        .list-inner {
          padding: 20px 30px;
        }
      }
    }
  }

  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }

  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;

    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }

    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>