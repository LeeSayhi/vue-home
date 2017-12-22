<template>
  <div class="center">
    <v-header>
      <div class="header-wrapper">
        <h2 class="title">个人中心</h2>
        <i class="icon-envelop icon"></i>
      </div>
    </v-header>
    <div class="info-wrapper">
      <div class="avatar">
        <img :src="user.avatar_url" width="60" height="60">
      </div>
      <div class="info">
        <h2 class="name">{{user.loginname}}</h2>
        <p class="point">积分：{{user.score}}</p>
        <p class="time">注册时间：{{user.create_at | formatDate}}</p>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="topic recent">
        <div class="left">
          <i class="icon-message icon"></i>
          <h2 class="text">最近的话题</h2>
        </div>
        <div class="right">
          <div class="num">
            <span>0</span>
          </div>          
          <i class="icon-chevron-up icon-chevron"></i>
        </div>  
      </div>
      <div class="topic recent">
        <div class="left">
          <i class="icon-earth icon"></i>
          <h2 class="text">最近的回复</h2>
        </div>
        <div class="right">
          <div class="num">
            <span>0</span>
          </div>          
          <i class="icon-chevron-up icon-chevron"></i>
        </div>  
      </div>
      <div class="topic recent">
        <div class="left">
          <i class="icon-star-full icon"></i>
          <h2 class="text">收藏的话题</h2>
        </div>
        <div class="right">
          <div class="num">
            <span>0</span>
          </div>          
          <i class="icon-chevron-up icon-chevron"></i>
        </div>  
      </div>
    </div>
    <div class="login-btm">
      <button>
        <div class="wrapper"></div>
        <span class="text" @click="logout">退出登录</span>
      </button>
    </div>
  </div>
</template>
<script>
  import Header from 'components/header/header.vue'
  import axios from 'axios'
  import { formatNewDate } from 'common/js/filter'

  export default {
    data() {
      return {
        loginname: '',
        user: {}
      }
    },
    created() {
      this.loginname = localStorage.getItem('loginname')

      axios.get(`https://www.vue-js.com/api/v1/user/${this.loginname}`, {
      })
      .then((res) => {
        this.user = res.data.data
      })
    },
    methods: {
      logout() {
        localStorage.removeItem('accesstoken')
        localStorage.removeItem('user_id')
        localStorage.removeItem('loginname')

        this.$router.push('/Home')
      }
    },
    filters: {
      formatDate(time) {
        return formatNewDate(time)
      }
    },
    components: {
      'v-header': Header
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/stylus/variable'

  .center
    position: fixed
    top: 0
    right: 0
    bottom: 4.5rem
    left: 0
    overflow: hidden
    .header-wrapper
        position: relative
        .title
          line-height: 5rem
          font-size: $font-size-large-x
          color: $color-title
          text-align: center
        .icon
          position: absolute
          right: 1.25rem
          top: 1.6rem
          font-size: 22px
          color: #fff
    .info-wrapper
      display: flex
      margin-top: 5rem
      padding: 8px 10px
      font-size: 0
      .avatar
        width: 5rem
        height: 5rem
        flex: 5rem 0 0
        vertical-align: middle
        margin-right: 25px
      .info
        flex: 1
        vertical-align: middle
        .name
          font-size: 16px
        .point
          margin: 0.6667rem 0
        p
          font-size: 14px
    .content-wrapper
      margin: 0.25rem 2.1667rem 0 1.3334rem
      .recent
        position: relative
        line-height: 34px
        font-size: 0
        .left
          display: inline-block
          .icon
            display: inline-block
            font-size: 1.6667rem
            vertical-align: middle
            margin-right: 3rem
          .text
            display: inline-block
            font-size: 16px
            vertical-align: middle
        .right
          display: inline-block
          position: absolute
          right: 0
          font-size: 16px
          .num
            display: inline-block
            width: 1.6667rem
            height: 1.6667rem
    .login-btm
      margin-top: 2rem
      text-align: center
      button
        width: 10rem
        height: 3rem
        background: #7e848c
        color: #fff
        border: none
        outline: 0
        border-radius: 4px
        .text
          font-size: $font-size-medium-x
          letter-spacing:4px
</style>