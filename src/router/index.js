/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import Message from 'components/message/message'
import User from 'components/user/user'
import More from 'components/more/more'
import Center from 'components/center/center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Home'
    },
    {
      path: '/Home',
      component: Home
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
