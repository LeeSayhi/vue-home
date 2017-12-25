<template>
  <div class="home">
    <v-header>
      <div class="logo-wrapper">
        <div class="logo">
          <img src="../../common/images/vue.png" width="48"height="48">
          Vue.js
        </div>        
      </div>
    </v-header>
    <v-tab @select="selectInfo"></v-tab>
    <router-view></router-view>
  </div>
</template>
<script>
  import Header from 'components/header/header.vue'
  import Tab from 'components/tab/tab.vue'

  export default {
    data() {
      return {
        topics: []
      }
    },
    methods: {
      selectInfo(index) {
        this.$router.push({
          path: `/Home/${index}`
        })
      }
    },
    components: {
      'v-header': Header,
      'v-tab': Tab
    }
  }
</script>
<style scoped lang="stylus">
  .home
    .logo-wrapper
      position: relative
      height: 100%
      .logo
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        font-size: 20px
        color: #fff
        font-weight: 200
        text-shadow: 0 1px 0 #fff
</style>