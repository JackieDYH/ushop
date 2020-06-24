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
 padding: .8rem 0 55px;
 box-sizing: border-box;
}
</style>