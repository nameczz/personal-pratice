<template>
  <transition name="list-fade">
    <div
      @click="hide"
      class="playlist"
      v-show="showFlag"
    >
      <div
        @click.stop
        class="list-wrapper"
      >
        <div class="list-header">
          <h1 class="title">
            <i class="icon"></i>
            <span class="text"></span>
            <span class="clear">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll
          :data="sequenceList"
          class="list-content"
          ref="scroll"
        >
          <ul>
            <li
              :key="song.id"
              @click="selectSong(song,index)"
              class="item"
              ref="listItem"
              v-for="(song,index) in sequenceList"
            >
              <i
                :class="getCurrentSong(song)"
                class="current"
              ></i>
              <span class="text">{{song.name}}</span>
              <span class="like">
                <i class="icon-not-favorite"></i>
              </span>
              <span
                @click.stop="deleteSong(song)"
                class="delete"
              >
                <i class="icon-delete"></i>
              </span>
            </li>
          </ul>
        </scroll>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到列表</span>
          </div>
        </div>
        <div class="list-close">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'

export default {
  data() {
    return {
      showFlag: false
    }
  },
  computed: {
    ...mapGetters(['sequenceList', 'currentSong', 'playList', 'mode'])
  },
  methods: {
    show() {
      this.showFlag = true
      requestAnimationFrame(() => {
        this.$refs.scroll.refresh()
        this.scrollToCurrent(this.currentSong)
      })
    },
    hide() {
      this.showFlag = false
    },
    getCurrentSong(item) {
      if (this.currentSong.id === item.id) {
        return 'icon-play'
      }
    },
    selectSong(song, index) {
      if (this.mode === playMode.random) {
        index = this.playList.findIndex(item => item.id === song.id)
      }
      this.setCurrentIndex(index)
      this.setPlayingStatus(true)
    },
    scrollToCurrent(song) {
      const index = this.playList.findIndex(item => song.id === item.id)
      this.$refs.scroll.scrollToElement(this.$refs.listItem[index], 300)
    },

    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingStatus: 'SET_PLAYING_STATE'
    }),
    ...mapActions({ deleteSong: 'deleteSong' })
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) return
      console.log(newSong)
      this.scrollToCurrent(newSong)
    }
  },
  components: { Scroll }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;

  &.list-fade-enter-active, &.list-fade-leave-active {
    transition: opacity 0.3s;

    .list-wrapper {
      transition: all 0.3s;
    }
  }

  &.list-fade-enter, &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  &.list-fade-enter, .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: $color-highlight-background;

    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 30px;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .clear {
          extend-click();

          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }

    .list-content {
      max-height: 240px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;

        &.list-enter-active, &.list-leave-active {
          transition: all 0.1s;
        }

        &.list-enter, &.list-leave-to {
          height: 0;
        }

        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }

        .like {
          extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;

          .icon-favorite {
            color: $color-sub-theme;
          }
        }

        .delete {
          extend-click();
          font-size: $font-size-small;
          color: $color-theme;
        }
      }
    }

    .list-operate {
      width: 140px;
      margin: 20px auto 30px auto;

      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;

        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }

        .text {
          font-size: $font-size-small;
        }
      }
    }

    .list-close {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>