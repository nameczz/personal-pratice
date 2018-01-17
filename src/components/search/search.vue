<template>
	<div class="search">
		<div class="search-box-wrapper">
			<search-box ref="searchBox" @query="onQueryChange"></search-box>
		</div>
		<div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
			<scroll class="shortcut" ref="shortcut" :data="shotcut">
				<div>
					<div class="hot-key">
						<h1 class="title">热门搜索</h1>
						<ul>
							<li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
								<span>{{item.k}}</span>
							</li>
						</ul>
					</div>
					<div class="search-history" v-show="searchHistory.length>0">
						<h1 class="title">
							<span class="text">搜索历史</span>
							<span class="clear" @click="showConfirm">
								<i class="icon-clear"></i>
							</span>
						</h1>
						<search-list @select="addQuery" @delete="delectSearchHistory" :searches="searchHistory"></search-list>
					</div>
				</div>
			</scroll>
		</div>
		<div ref="searchResult" class="search-result" v-show="query">
			<suggest ref="suggest" @select="saveSearch" :query="query" @listScroll="blurInput"></suggest>
		</div>
		<confirm ref="confirm" text="是否清空历史数据" @confirm="clearSearchHistory"></confirm>
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
  import { playlistMixin } from 'common/js/mixin'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    mixins: [playlistMixin],
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
      },
      ...mapGetters(['searchHistory'])
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
      addQuery(query) {
        this.$refs.searchBox.setQuery(query)
      },
      onQueryChange(query) {
        this.query = query
      },
      // 关闭手机键盘 派发了2个事件上来
      blurInput() {
        this.$refs.searchBox.blur()
      },
      saveSearch() {
        console.log('in')
        this.saveSearchHistory(this.query)
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
      ...mapActions([
        'saveSearchHistory',
        'delectSearchHistory',
        'clearSearchHistory'
      ])
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