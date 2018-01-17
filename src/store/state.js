import { playMode } from 'common/js/config'
import { loadSearch } from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch() // 可以从本地存储读取数据
}

export default state
