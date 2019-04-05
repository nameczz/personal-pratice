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
            <i
              :class="iconMode"
              @click="changeMode"
              class="icon"
            ></i>
            <span class="text">{{modeText}}</span>
            <span
              @click="showConfirm"
              class="clear"
            >
              <i
                @click="showConfirm"
                class="icon-clear"
              ></i>
            </span>
          </h1>
        </div>
        <scroll
          :data="sequenceList"
          class="list-content"
          ref="scroll"
        >
          <transition-group
            name="list"
            tag="ul"
          >
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
          </transition-group>
        </scroll>
        <div
          @click="showAddSong"
          class="list-operate"
        >
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到列表</span>
          </div>
        </div>
        <div
          @click="hide"
          class="list-close"
        >
          <span>关闭</span>
        </div>
        <confirm
          @confirm="clearSongs"
          ref="confirm"
          text="是否清空播放列表"
        ></confirm>
      </div>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import { mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import Confirm from 'base/confirm/confirm'
import { playerMixins } from 'common/js/mixin'
import AddSong from 'components/add-song/add-song'
export default {
  mixins: [playerMixins],
  data() {
    return {
      showFlag: false
    }
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence
        ? '顺序播放'
        : this.mode === playMode.loop
        ? '单曲循环'
        : '随机播放'
    }
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
    showConfirm() {
      console.log('in')
      this.$refs.confirm.show()
    },
    showAddSong() {
      this.$refs.addSong.show()
    },

    ...mapActions({ deleteSong: 'deleteSong', clearSongs: 'clearSongs' })
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) return
      if (!this.showFlag || newSong.id === oldSong.id) return
      this.scrollToCurrent(newSong)
    }
  },
  components: { Scroll, Confirm, AddSong }
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