<template>
  <div id="app">
    <main-dashboard/>
  </div>
</template>

<script>
import MainDashboard from './components/Dashboard/MainDashboard.vue'

export default {
  name: 'App',
  components: {
    MainDashboard
  }
}
</script>

<style>
#app {
  font-family:  Raleway, Avenir, Helvetica, Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
