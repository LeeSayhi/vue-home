<template>
  <transition name="slide">
    <div class="page-list">
      <div class="list-wrapper">
        <ul>
          <li class="item" v-for="item in topics">
            <div class="avatar">
              <img :src="item.author.avatar_url" width="36" height="36">
            </div>
            <div class="info-wrapper">
              <div class="info">
                <span class="title">招聘</span>
                <span class="desc" v-html="item.title"></span>
              </div>
              <div class="icon-group">
                <i class="icon-message"></i>
                <span>100</span>
                <i class="icon-eye"></i>
                <span>2222</span>
              </div>
              <div class="time">
                <span>56秒前</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        topics: []
      }
    },
    created() {
      this.topic()
    },
    methods: {
      topic() {
        axios.get('https://www.vue-js.com/api/v1/topics', {
          page: 1,
          tab: 'all',
          limit: 20,
          mdrender: true
        })
        .then((res) => {
          this.topics = res.data.data
          console.log(this.topics)
        })
        .catch((err) => {

        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  .page-list
    position: fixed
    top: 9rem
    right: 0
    bottom: 4.5rem
    left: 0
    overflow: hidden
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.4s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(-100%, 0, 0)
    .list-wrapper
      padding: 20px 16px
      .item
        display: flex
        margin-bottom: 20px
        .avatar
          width: 3rem
          flex: 3rem 0 0
          margin-right: 14px
        .info-wrapper
          flex: 1
          position: relative
          .info
            font-size: 0
            .title
              display: inline-block
              width: 36px
              height: 20px
              line-height: 20px
              text-align: center
              background: #369219
              border-radius: 4px
              color: #fff
              font-size: 14px
              margin-right: 1.2rem
            .desc
              font-size: 14px
              font-weight: 700
              word-wrap: normal
          .icon-group
            margin-top: 1.6667rem
            color: #a3a3a3
          .time
            position: absolute
            right: 0
            bottom: 0
            span
              color: #a3a3a3
</style>