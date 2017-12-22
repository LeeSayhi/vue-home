<template>
  <div class="tab">
    <div class="wrapper">
      <ul class="tab-list">
        <li class="tab-item" v-for="(item, index) in list" :class="{active: currentIndex === index}" @click="tabSelect(index)">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: ['全部', '精华', 'weex', '分享', '问答', '招聘'],
        currentIndex: 0
      }
    },
    methods: {
      tabSelect(index) {
        this.currentIndex = index
        this.$emit('select', index)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .tab
    position: fixed
    top: 5rem
    left: 0
    width: 100%
    overflow: hidden
    background: #f6f6f6
    .wrapper
      height: 4rem
      line-height: 4rem
      .tab-list
        display: flex
      .tab-item
        flex: 1
        text-align: center
        font-size: 14px
        color: #1c6132
        &.active
          color: #fff
          background: #BEBEBE
</style>