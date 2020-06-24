<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 引入样式重置
import "./assets/css/reset.css";
// 引入rem
import "./assets/js/rem.js";

export default {
  name: "App"
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
#app {
  box-sizing: border-box;
}
</style>
