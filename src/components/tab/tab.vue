<template>
  <div class="tab">
    <div class="wrapper">
      <ul class="tab-list">
        <li class="tab-item" v-for="(item, index) in list" :key="index" :value="item.id" :class="{active: currentIndex === index}" @click="tabSelect(index, item.id)">{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [
          {
            title: '全部',
            id: 'all'
          },
          {
            title: '精华',
            id: 'good'
          },
          {
            title: 'weex',
            id: 'weex'
          },
          {
            title: '分享',
            id: 'share'
          },
          {
            title: '问答',
            id: 'ask'
          },
          {
            title: '招聘',
            id: 'job'
          }
        ],
        currentIndex: 0
      }
    },
    methods: {
      tabSelect(index, id) {
        this.currentIndex = index
        this.$emit('select', id)
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