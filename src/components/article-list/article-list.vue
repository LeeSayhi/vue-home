<template>
  <div class="content" v-if="interestingTopic.length > 0">
    <ul class="list">
      <li class="item" v-for="(item, index) in interestingTopic" @click="selectInfo(index)">
        <div class="item-left">
          <i class="icon-eye"></i>
          <h2>{{item.title}}</h2>
        </div>
        <div class="item-right">
          <p class="time">{{item.collectTime | formatDate}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { formatNewDate } from 'common/js/filter'

  export default {
    props: {
      interestingTopic: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      selectInfo(index) {
        this.$router.push ({
          path: `Center/${(this.interestingTopic)[index].id}`
        })
      }
    },
    filters: {
      formatDate(time) {
        return formatNewDate(time)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .content
    .list
      .item
        position: relative
        border-top: 1px solid #eee
        &:last-child
          border-bottom: 1px solid #eee
        .item-left
          i
            display: inline-block
            font-size: 1rem
            vertical-align: middle
            margin-right: 3rem
            color: #757575
          h2
            display: inline-block
            vertical-align: middle
            width: 60%
            text-overflow: ellipsis
            overflow: hidden
            white-space: nowrap
            font-size: 14px
        .item-right
          position: absolute
          top: 0
          right: 0
          p
            font-size: 14px
</style>