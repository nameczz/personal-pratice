export default (Vue, options = {}) => {
    let defaultImg = {
        default: 'http://pic.92to.com/201705/08/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png'
    }

    let listenList = []
    let imgCatcheList = []
    const isLoad = (imgSrc) => {
        return imgCatcheList.indexOf(imgSrc) > -1
    }

    const iCanShow = (item) => {
        let ele = item.ele
        let src = item.src
        let top = ele.getBoundingClientRect().top
        let windowHeight = window.innerHeight
        if (top + 10 < windowHeight) {
            let img = new Image()
            img.src = src
            img.onload = function() {
                ele.src = src
                imgCatcheList.push(src)
                listenList.splice(item, 1)
            }
            return true
        } else {
            return false
        }
    }

    const onListenScroll = () => {
        console.log(2)
        window.addEventListener('scroll', function() {
            var length = listenList.length
            console.log(2)
            for (let i = 0; i < length; i++) {
                iCanShow(listenList[i])
            }
        })
    }
    const addListenner = (ele, binding) => {
        let imgSrc = binding.value
        if (isLoad(imgSrc)) {
            ele.src = imgSrc
            return false
        }
        let item = {
            ele: ele,
            src: imgSrc
        }
        ele.src = defaultImg.default
        if (iCanShow(item)) {
            return
        }
        listenList.push(item)
        onListenScroll()
    }
    Vue.directive('lazyload', {
        inserted: addListenner,
        updated: addListenner
    })
}