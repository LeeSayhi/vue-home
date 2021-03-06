<template>
  <div>
    <transition name="slide">
      <div class="page-list" ref="pageList">
        <div class="list-wrapper">
          <ul>
            <li class="item" v-for="item in topics" @click="selectArticle(item.id)">
              <div class="avatar">
                <img v-lazy="item.author.avatar_url" width="36" height="36">
              </div>
              <div class="info-wrapper">
                <div class="info">
                  <!-- 待优化 -->
                  <span class="title" v-if="item.top">置顶</span>
                  <span class="title" v-else-if="item.good">精华</span>
                  <span class="title" v-else-if="item.tab === 'share'" :style="styleObj">分享</span>
                  <span class="title" v-else-if="item.tab === 'ask'" :style="styleObj">问答</span>
                  <span class="title" v-else-if="item.tab === 'job'" :style="styleObj">招聘</span>
                  <span class="desc" v-html="item.title"></span>
                </div>
                <div class="icon-group">
                  <i class="icon-message"></i>
                  <span>{{item.reply_count}}</span>
                  <i class="icon-eye"></i>
                  <span>{{item.visit_count}}</span>
                </div>
                <div class="time">
                  <span>{{item.last_reply_at | formatDate}}</span>
                </div>
              </div>
            </li>
            <v-loading v-show="hasMore || !topics.length"></v-loading>
          </ul>
        </div>
      </div>
    </transition>
    <router-view></router-view>
  </div>
</template>
<script>
  import axios from 'axios'
  import Loading from 'base/loading/loading.vue'
  import BScroll from 'better-scroll'
  import { formatNewDate } from 'common/js/filter'

  export default {
    data() {
      return {
        topics: [],
        styleObj: {
          backgroundColor: '#C5C5C7'
        },
        hasMore: true,
        id: 'all'
      }
    },
    watch: {
      $route(to) {
        this.id = to.params.id
        this.topics = []
        this.getTopic()
      }
    },
    created() {
      this.getTopic()
      this.initScroll()
    },
    methods: {
      getTopic() {
        const url = 'https://www.vue-js.com/api/v1/topics'
        this.page = 1
        this.hasMore = true
        axios.get(url, {
          params: {
            page: this.page,
            tab: this.id
          }
        })
        .then((res) => {
          this.topics = res.data.data
          this.checkMore(res.data.data)
        })
      },
      // 初始化滚动 并监听上拉加载动作
      initScroll() {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.pageList, {
            click: true
          })
          this.pullLoad()
        })
      },
      // 如没有更多内容，标识位设为 false，loading效果隐藏
      checkMore(data) {
        if (!data.length || data.length < 7) {
          this.hasMore = false
        }
      },
      // 上拉加载更多
      pullLoad() {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            if (!this.hasMore) {
              return
            }
            this.page += 1

            const url = 'https://www.vue-js.com/api/v1/topics'
            axios.get(url, {
              params: {
                page: this.page,
                tab: this.id
              }
            })
            .then((res) => {
              this.topics = this.topics.concat(res.data.data)
              this.checkMore(res.data.data)
            })
          }
        })
      },
      selectArticle(id) {
        this.$router.push({
          path: `/Home/${this.id}/${id}`
        })
      }
    },
    filters: {
      formatDate(time) {
        return formatNewDate(time)
      }
    },
    components: {
      'v-loading': Loading
    }
  }
</script>
<style lang="stylus">
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
      .item
        display: flex
        padding: 16px
        border-bottom: 4px solid #eee
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