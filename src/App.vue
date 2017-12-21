<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-footer></v-footer>
  </div>
</template>

<script>
  /* eslint-disable */
  import Footer from 'components/footer/footer.vue'

  export default {
    components: {
      'v-footer': Footer
    }
  }
</script>

<style>
</style>
