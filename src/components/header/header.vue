<template>
  <div class="header">
    <slot></slot>
  </div>
</template>
<script>
  
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .header
    position: fixed
    top: 0
    left: 0
    height: 5rem
    width: 100%
    background: $color-background-d
</style>