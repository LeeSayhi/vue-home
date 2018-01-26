<template>
  <div class="message">
    <v-header>
      <div class="header-wrapper">
        <h2 class="title">我的消息</h2>
      </div>
    </v-header> 
    <div class="message-wrapper">
      <ul>
        <li class="item" @click="hasNotRead()">
          <div class="left">
            <i class="icon-eye-blocked icon"></i>
            <span class="title">未读消息</span>
          </div>
          <div class="right">
            <span class="num">{{count}}</span>
            <i class="icon-chevron-down icon"></i>
          </div>
        </li>
        <li class="item">
          <div class="left">
            <i class="icon-eye icon"></i>
            <span class="title">已读消息</span>
          </div>
          <div class="right">
            <span class="num">0</span>
            <i class="icon-chevron-down icon"></i>
          </div>
          <article-list></article-list>
        </li>
      </ul>
    </div>
    <layer :showLayer="showLayer" ref="layer"></layer>
  </div>
</template>
<script>
  import Header from 'components/header/header.vue'
  import Layer from 'base/layer/layer.vue'
  import ArticleList from 'components/article-list/article-list.vue'
  import { getNoReadCount, getMessages } from 'common/api/api.js'

  export default {
    data() {
      return {
        count: 0,
        accesstoken: '',
        showLayer: false,
        hasReadMessages: [],
        hasNotReadMessages: []
      }
    },
    created() {
      this.accesstoken = localStorage.getItem('accesstoken')
      this._getNoReadCount()
    },
    methods: {
      _getNoReadCount() {
        getNoReadCount(this.accesstoken).then((res) => {
          // console.log(this.res)
          this.count = res.data.data
        })
        .catch((e) => {
          // this.$refs.layer.layer_msg('Please login first')
          console.log(e)
        })
      },
      _getMessage() {
        getMessages(this.accesstoken).then((res) => {
          console.log(res)
        })
      },
      hasNotRead() {
        this._getMessage()
      }
    },
    components: {
      'v-header': Header,
      Layer,
      ArticleList
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/stylus/variable'

  .message
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
        .icon
          position: absolute
          right: 1.25rem
          top: 1.6rem
          font-size: 22px
          color: #fff
    .message-wrapper
      padding: 0 2.1667rem
      .item
        position: relative
        padding: 2rem 0
        font-size: 0
        .left
          font-size: 0
          .icon
            display: inline-block
            vertical-align: middle
            font-size: 22px
          .title
            display: inline-block
            vertical-align: middle
            font-size: 16px
            margin-left: 1.6667rem
        .right
          position: absolute
          right: 0
          top: 2.2rem
          font-size: 0
          .num
            font-size: 16px
            margin-right: 0.8333rem
          .icon
            font-size: 16px
</style>