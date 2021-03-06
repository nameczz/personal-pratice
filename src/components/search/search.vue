<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box
        @query="onQueryChange"
        ref="searchBox"
      ></search-box>
    </div>
    <div
      class="shortcut-wrapper"
      ref="shortcutWrapper"
      v-show="!query"
    >
      <scroll
        :data="shotcut"
        :refreshTime="100"
        class="shortcut"
        ref="shortcut"
      >
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li
                :key="item.n"
                @click="addQuery(item.k)"
                class="item"
                v-for="item in hotKey"
              >
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div
            class="search-history"
            v-show="searchHistory.length>0"
          >
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span
                @click="showConfirm"
                class="clear"
              >
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list
              :searches="searchHistory"
              @delete="delectSearchHistory"
              @select="addQuery"
            ></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div
      class="search-result"
      ref="searchResult"
      v-show="query"
    >
      <suggest
        :query="query"
        @listScroll="blurInput"
        @select="saveSearch"
        ref="suggest"
      ></suggest>
    </div>
    <confirm
      @confirm="clearSearchHistory"
      ref="confirm"
      text="是否清空历史数据"
    ></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchBox from 'base/search-box/search-box'
import SearchList from 'base/search-list/search-list'
import Suggest from 'components/suggest/suggest'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import { playlistMixin, searchMixins } from 'common/js/mixin'
import { mapActions } from 'vuex'
export default {
  mixins: [playlistMixin, searchMixins],
  components: {
    SearchBox,
    Suggest,
    Confirm,
    Scroll,
    SearchList
  },
  created() {
    this._getHotKey()
  },
  data() {
    return {
      hotKey: [],
      query: ''
    }
  },
  computed: {
    shotcut() {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  watch: {
    query(newQuery) {
      console.log(newQuery)
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()

      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
    },

    showConfirm() {
      this.$refs.confirm.show()
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions(['clearSearchHistory'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;

          .text {
            flex: 1;
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
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>