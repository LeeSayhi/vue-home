/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home.vue'
import Message from 'components/message/message.vue'
import User from 'components/user/user.vue'
import More from 'components/more/more.vue'
import Center from 'components/center/center.vue'
import List from 'components/page-list/page-list.vue'
import Detail from 'components/page-detail/page-detail.vue' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Home'
    },
    {
      path: '/Home',
      component: Home,
      children: [
        {
          path: ':id',
          component: List,
          children: [
            {
              path: ':id',
              component: Detail
            }
          ]
        }
      ]
    },
    {
      path: '/Message',
      component: Message
    },
    {
      path: '/User',
      component: User
    },
    {
      path: '/More',
      component: More
    },
    {
      path: '/Center',
      component: Center
    }
  ]
})
