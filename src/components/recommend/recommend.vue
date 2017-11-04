<template>
	<div class="recommend" ref="recommend">
		<scroll ref="scroll" class="recommend-content" :data="playList">
			<div>
				<div v-if="recommends.length" class="swiper-wrapper">
					<swiper>
						<div v-for="item in recommends">
							<a :href="item.linkUrl">
								<img @load="_loadImage" :src="item.picUrl">
							</a>
						</div>
					</swiper>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐2</h1>
					<ul>
						<li v-for="item in playList" class="item">
							<div class="icon">
								<img v-lazy="item.imgurl" alt="歌曲图片" width="60" height="60">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!playList.length">
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import swiper from 'base/swiper/swiper'
import { getRecommand, getPlayList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { playlistMixin } from 'common/js/mixin'

export default {
	data() {
		return {
			recommends: [],
			playList: []
		}
	},
	mixins: [playlistMixin],
	created() {
		this._getRecommend()
		this._getPlayList()
	},
	methods: {
		handlePlaylist(playlist) {
			const bottom = playlist.length > 0 ? '60px' : ''
			this.$refs.recommend.style.bottom = bottom
			this.$refs.scroll.refresh()
		},
		_getRecommend() {
			let _this = this
			getRecommand().then(function(res) {
				if (res.code === ERR_OK) {
					_this.recommends = res.data.slider
				}
			})
		},
		_getPlayList() {
			let _this = this
			getPlayList().then(function(res) {
				if (res.code === ERR_OK) {
					console.log(res.data)
					_this.playList = res.data.list
				}
			})
		},
		_loadImage() {
			if (!this.checkLoader) {
				this.$refs.scroll.refresh()
				this.checkLoader = true
			}
		}
	},
	components: {
		swiper,
		Scroll,
		Loading
	}
}

</script>

<style  lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
	position: fixed;
	width: 100%;
	top: 88px;
	bottom: 0;

	.recommend-content {
		height: 100%;
		overflow: hidden;

		.swiper-wrapper {
			position: relative;
			width: 100%;
			overflow: hidden;
		}

		.recommend-list {
			.list-title {
				height: 65px;
				line-height: 65px;
				text-align: center;
				font-size: $font-size-medium;
				color: $color-theme;
			}

			.item {
				display: flex;
				box-sizing: border-box;
				align-items: center;
				padding: 0 20px 20px 20px;

				.icon {
					flex: 0 0 60px;
					width: 60px;
					padding-right: 20px;
				}

				.text {
					display: flex;
					flex-direction: column;
					justify-content: center;
					flex: 1;
					line-height: 20px;
					overflow: hidden;
					font-size: $font-size-medium;

					.name {
						margin-bottom: 10px;
						color: $color-text;
					}

					.desc {
						color: $color-text-d;
					}
				}
			}
		}

		.loading-container {
			position: absolute;
			width: 100%;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}
</style>