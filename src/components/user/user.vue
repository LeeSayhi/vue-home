<template>
  <div class="login">
    <v-header>
      <div class="header-wrapper">
        <h2 class="title">登录</h2>
        <p class="text">注册</p>
      </div>
    </v-header>
    <div class="login-key">
      <div class="key-wrapper">
        <div class="content">
          <transition name="fade">
            <div class="lable" v-show="showLable">请输入accessToken</div>
          </transition>
          <div class="hint" v-show="showHint">accessToken</div>
          <input type="password" v-model="value" name="password" :placeholder="placeholder" @focus="focus" @blur="blur">
          <p class="err">{{error}}</p>
        </div>
      </div>
    </div>
    <div class="login-btm">
      <button>
        <div class="wrapper"></div>
        <span class="text" @click="_login">登录</span>
      </button>
    </div>
  </div>
</template>
<script>
  import Header from 'components/header/header.vue'
  import { login } from 'common/api/api'

  export default {
    data() {
      return {
        showLable: false,
        showHint: false,
        placeholder: '请输入accessToken',
        value: '',
        error: ''
      }
    },
    methods: {
      focus() {
        this.showLable = true
        this.placeholder = ''
        this.value = ''
      },
      blur() {
        this.showLable = false
        setTimeout(() => {
          this.placeholder = '请输入accessToken'
        }, 300)
      },
      _login() {
        login(this.value).then((res) => {
          localStorage.setItem('accesstoken', this.value)
          localStorage.setItem('user_id', res.data.id)
          localStorage.setItem('loginname', res.data.loginname)

          this.$router.push('/Center')
        })
        .catch(() => {
          if (!this.value) {
            this.error = 'accessToken不能为空'
          } else {
            this.error = '输入有误，请重新输入'
          }
        })
      }
    },
    components: {
      'v-header': Header
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .login
    position: fixed
    top: 5rem
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
      .text
        position: absolute
        right: 1.25rem
        top: 1.8rem
        font-size: $font-size-large
        color: red
    .login-key
      margin-top: 14rem
      .key-wrapper
        min-height: 72px
        .content
          position: relative
          margin: 0 auto
          width: 50%
          padding-top: 28px
          padding-bottom: 12px
          text-align: left
          font-size: $font-size-medium-x
          .lable
            position: absolute
            top: 0
            color: red
            font-size: 12px
            &.fade-enter-active, &.fade-leave-active
              transition: all 0.3s
            &.fade-enter, &.fade-leave-to
              transform: translate3d(0, 36px, 0)
              font-size: 16px
              color: #474a4f
          input
            width: 100%
            height: 2.6rem
            outline: 0
            border-bottom: 1px solid #474a4f
          .err
            margin-top: 1rem
            font-size: $font-size-small
            color: red
    .login-btm
      margin-top: 6rem
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