<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

import './assets/js/adapter'
import './assets/css/reset.css'
export default {
  name: 'App'
}
</script>

<style>

</style>
