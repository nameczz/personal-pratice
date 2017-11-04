import { mapGetters } from 'vuex'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playList'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playList)
    },
    activated() {
        this.handlePlaylist(this.playList)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        // 给具体组件去实现
        handlePlaylist(playList) {
            throw new Error('component must implement handlePlaylist method')
        }
    }
}