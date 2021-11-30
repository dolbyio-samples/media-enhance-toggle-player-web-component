<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <media-comparison
        beforeSrc="./assets/videos/before.mp4"
        afterSrc="./assets/videos/after.mp4"
        mediaType="video"
      ></media-comparison>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import 'media-comparison-component'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
