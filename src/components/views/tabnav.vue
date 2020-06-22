<template>
  <mt-tabbar v-model="selectActive" fixed>
    <mt-tab-item id="/home" @click.native="switchTab('/home')">
      <img slot="icon" src="../../assets/img/home_on.png" v-if="this.selectActive == '/home'" />
      <img slot="icon" src="../../assets/img/home.png" v-else />
      首页
    </mt-tab-item>
    <mt-tab-item id="/cart" @click.native="switchTab('/cart')">
      <img slot="icon" src="../../assets/img/cart_on.png" v-if="this.selectActive == '/cart'" />
      <img slot="icon" src="../../assets/img/cart.png" v-else />
      购物车
    </mt-tab-item>
    <mt-tab-item id="/me" @click.native="switchTab('/me')">
      <img slot="icon" src="../../assets/img/me_on.png" v-if="this.selectActive == '/me'" />
      <img slot="icon" src="../../assets/img/me.png" v-else />
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data() {
    return {
      selectActive: "/home"
    };
  },
  methods: {
    switchTab(name) {
      // 处理报错，防止重复点击同一个路由地址报错bug
      if (this.$route.path == name) return;
      this.$router.push(name);
    }
  },
  mounted() {
    this.selectActive = this.$route.path;
  },
  watch: {
    $route(newVel) {
      this.selectActive = newVel.path;
    }
  }
};
</script>

<style>
</style>