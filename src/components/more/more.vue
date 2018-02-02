<template>
  <div class="more">
    <v-header>
      <div class="header">
        <h2 class="title">搜索</h2>
      </div>     
    </v-header>
    <div class="main">
      <div class="search-box-wrapper">
        <search-box></search-box>
      </div>    
    </div>   
  </div>
</template>
<script>
  import Header from 'components/header/header.vue'
  import SearchBox from 'base/search-box/search-box.vue'

  export default {
    components: {
      'v-header': Header,
      SearchBox
    }
  }
</script>
<style scoped lang="stylus">
  .more
    .header 
      .title
        text-align: center
        line-height: 5rem
        font-size: 20px
        color: #fff
    .main
      position: fixed
      top: 5rem
      right: 0
      bottom: 4.5rem
      left: 0
      .search-box-wrapper
        margin: 20px
</style>