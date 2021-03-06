import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: function(resolve) {
        require(['components/recommend/recommend'], resolve)
      }
    },
    {
      path: '/recommend',
      component: function(resolve) {
        require(['components/recommend/recommend'], resolve)
      },
      children: [
        {
          path: ':id',
          component: function(resolve) {
            require(['components/disc/disc'], resolve)
          }
        }
      ]
    },
    {
      path: '/rank',
      component: function(resolve) {
        require(['components/rank/rank'], resolve)
      },
      children: [
        {
          path: ':id',
          component: function(resolve) {
            require(['components/top-list/top-list'], resolve)
          }
        }
      ]
    },
    {
      path: '/search',
      component: function(resolve) {
        require(['components/search/search'], resolve)
      },
      children: [
        {
          path: ':id',
          component: function(resolve) {
            require(['components/singer-detail/singer-detail'], resolve)
          }
        }
      ]
    },
    {
      path: '/singer',
      component: function(resolve) {
        require(['components/singer/singer'], resolve)
      },
      children: [
        {
          path: ':id',
          component: function(resolve) {
            require(['components/singer-detail/singer-detail'], resolve)
          }
        }
      ]
    },
    {
      path: '/user',
      component: function(resolve) {
        require(['components/user-center/user-center'], resolve)
      }
    }
  ]
})
