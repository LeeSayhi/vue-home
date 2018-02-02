<template>
  <div class="search_box">
    <i class="icon-search"></i>
    <input class="box" v-model="query" ref="query">
    <i class="icon-cancel" @click="clear"></i>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      // 输入框失去焦点，移动端会收起键盘
      blur() {
        this.$refs.query.blur()
      },
      setQuery(query) {
        this.query = query
      }
    },
    watch: {
      query(newQuery) {
        this.$emit('query', newQuery)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .search_box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    height: 40px
    background: #eee
    border-radius: 6px
    .icon-search
      font-size: 14px
      color: RGB(71, 74, 79)
      padding-left: 5px
    .box
      flex: 1
      margin:0 5px
      line-height: 18px
      background: #eee
      color: #000
      font-size: 14px
      outline: none
    .icon-cancel
      font-size: 14px
      color: RGB(71, 74, 79)
      padding: 10px
</style>