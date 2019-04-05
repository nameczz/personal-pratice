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
        ></search-box>
      </div>
      <div
        class="shortcur"
        v-show="!query"
      >
        <switchs
          :currentIndex="currentIndex"
          :switches="tabs"
          @switch="changeIndex"
        ></switchs>
      </div>
      <div
        class="search-result"
        v-show="query"
      >
        <suggest
          :query="query"
          :showSinger="false"
          @select="saveSearch"
        ></suggest>
      </div>
    </div>
  </transition>
</template>
<script>
import SearchBox from 'base/search-box/search-box'
import Switchs from 'base/switchs/switchs'
import Suggest from 'components/suggest/suggest'
import { searchMixins } from 'common/js/mixin'
export default {
  components: { SearchBox, Suggest, Switchs },
  mixins: [searchMixins],
  data() {
    return {
      showList: false,
      currentIndex: 0,
      tabs: [{ name: '最近播放' }, { name: '搜索历史' }]
    }
  },
  methods: {
    show() {
      this.showList = true
    },
    hide() {
      this.showList = false
    },
    changeIndex(index) {
      this.currentIndex = index
    }
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