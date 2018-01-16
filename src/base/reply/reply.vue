<template>
  <div class="reply" v-show="showFlag">
    <div class="reply-content">
      <input name="" value="评论">
    </div>
    <div class="confirm">
      <div class="confirm-content">
        <div class="operate">
          <div class="operate-btn left" @click="cancel">取消</div>
          <div class="operate-btn" @click="confirm">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      showFlag: false
    },
    methods: {
      cancel() {
        this.$emit('cancel')
        this.showFlag = false
      },
      confirm() {
        this.$emit('confirm')
      }
    }
  }
</script>
<style scoped lang="stylus">
  .reply
    padding: 12px
    .reply-content
      input
        width: 100%
        height: 50px
        border-bottom: 1px solid RGB(71, 74, 79)
        outline: none
        font-size: 14px
    .confirm
      margin-top: 10px
      .confirm-content
        width: 100%
        background: #eee
        border-radius: 5px
        .operate
          display: flex
          height: 30px
          align-items: center
          text-align: center
          color: #333
          .operate-btn
            flex: 1
            padding: 5px
            &.left
              border-right: 1px solid #333
</style>