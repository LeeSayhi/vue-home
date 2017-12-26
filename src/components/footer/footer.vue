<template>
  <div class="footer">
    <router-link to="/Home/all" tag="div" class="tab-item">
      <i class="icon-home2 icon"></i>
      <span class="tab-link">首页</span>
    </router-link>
    <router-link to="/Message" tag="div" class="tab-item">
      <i class="icon-envelop icon"></i>
      <span class="tab-link">信息</span>
    </router-link>
    <router-link to="/User" tag="div" class="tab-item">
      <i class="icon-user icon"></i>
      <span class="tab-link">我的</span>
    </router-link>
    <router-link to="/More" tag="div" class="tab-item">
      <i class="icon-envelop icon"></i>
      <span class="tab-link">更多</span>
    </router-link>
  </div>
</template>
<script>
  export default {
    created() {},
    watch: {
      $route: 'fatchDate'
    },
    methods: {
      fatchDate() {
        const accesstoken = localStorage.getItem('accesstoken')
        if (accesstoken) {
          if (this.$route.path === '/User') {
            this.$router.push('/Center')
          }
        }
        // console.log(this.$route.path)
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/stylus/variable'

  .footer
    display: flex
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    border-top: 1px solid rgb(241, 241, 241)
    .tab-item
      flex: 1
      display: flex
      flex-direction: column
      align-items:center
      justify-content:center
      height: 4.5rem
      color: $color-text
      &.router-link-active
        color: #1c6132
      .icon
        margin-bottom: 0.5rem
        font-size: $font-size-large
      .tab-link
        font-size: $font-size-medium
</style>