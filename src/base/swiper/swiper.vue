<template>
	<div class="swiper" ref="swiper">
		<div class="swiper-group" ref="swiperGroup">
			<slot>
			</slot>
		</div>
		<div class="dots">
			<span v-for="(item,index) in dots" class="dot" :class="{active: currentPageIndex === index}"></span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import { addClass } from 'common/js/dom'
import BScroll from 'better-scroll'

export default {
	data() {
		return {
			dots: [],
			currentPageIndex: 0
		}
	},
	props: {
		loop: {
			type: Boolean,
			default: true
		},
		autoPlay: {
			type: Boolean,
			default: true
		},
		interval: {
			type: Number,
			default: 4000
		}
	},
	mounted() {
		setTimeout(() => {
			this._setSwiperWidth()
			this._initDots()
			this._initSwiper()
			if (this.autoPlay) {
				this._play()
			}
		}, 20)

		window.addEventListener('resize', () => {
			if (!this.swiper) {
				return
			}
			this._setSwiperWidth(true)
			this.swiper.refresh()
		})
	},
	destroyed() {
		clearTimeout(this.timer)
	},
	methods: {
		_setSwiperWidth(isResize) {
			this.children = this.$refs.swiperGroup.children
			let width = 0
			let swiperWidth = this.$refs.swiper.clientWidth
			for (let i = 0; i < this.children.length; i++) {
				let child = this.children[i]
				addClass(child, 'swiper-item')

				child.style.width = swiperWidth + 'px'
				width += swiperWidth
			}

			if (this.loop && !isResize) {
				width += 2 * swiperWidth
			}
			this.$refs.swiperGroup.style.width = width + 'px'
		},
		_initSwiper() {
			this.swiper = new BScroll(this.$refs.swiper, {
				scrollX: true,
				scrollY: false,
				momentum: false,
				snap: true,
				snapLoop: this.loop,
				snapThreshold: 0.3,
				snapSpeed: 400,
				click: true
			})
			this.swiper.on('scrollEnd', () => {
				let pageIndex = this.swiper.getCurrentPage().pageX
				if (this.loop) {
					pageIndex -= 1
				}
				this.currentPageIndex = pageIndex
				if (this.autoPlay) {
					clearTimeout(this.timer)
					this._play()
				}
			})
		},
		_initDots() {
			this.dots = this.children.length
		},
		_play() {
			let pageIndex = this.currentPageIndex + 1
			if (this.loop) {
				pageIndex += 1
			}
			this.timer = setTimeout(() => {
				this.swiper.goToPage(pageIndex, 0, 400)
			}, this.interval)
		}
	}
}
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"

 .swiper
    min-height: 1px
    .swiper-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .swiper-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
                
                    
</style>