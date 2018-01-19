<template>
  <transition name="layer-fade">
    <div class="layer" v-show="showLayer" @click="hide">
      <div class="layer-wrapper">
        <div class="layer-content">
          <p class="text">{{layerText}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        showLayer: false
      }
    },
    props: {
      layerText: {
        type: String,
        default: '评论成功'
      }
    },
    methods: {
      show() {
        this.showLayer = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.showLayer = false
        }, 2000)
      },
      hide() {
        this.showLayer = false
      },
      layer_msg(text) {
        this.layerText = text
        this.show()
      }
    }
  }
</script>
<style scoped lang="stylus">
  .layer
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 998
    background: rgba(0, 0, 0, .4)
    .layer-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      .layer-content
        width: 16.6667rem
        border-radius: 10px
        background: #fff
        .text
          padding: 10px
          line-height: 14px
          text-align: center
          font-size: 14px
  @keyframes layer-fadein
    0%
      opacity: 0
    100%
      opactiy: 100%
  
  @keyframes layer-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>