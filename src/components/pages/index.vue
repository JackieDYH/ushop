<template>
  <div>
    <router-view id="views"></router-view>
    <v-nav></v-nav>
  </div>
</template>

<script>
import vNav from "../views/tabnav";
export default {
  components: {
    vNav
  }
};
</script>

<style scoped>
#views {
  width: 100vw;
  height: auto;
  flex: 1;
  /* height: calc(100% - .8rem); */
  margin: .8rem 0 1rem;
}
</style>