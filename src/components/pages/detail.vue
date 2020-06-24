<template>
  <div>
    <mt-header fixed title="商品详情">
      <router-link to="/cate" icon="back" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="main">
        
    </div>
    <!-- 底部加入购物车 -->
    <div class="footer">
      <div class="cart">
        <i class="iconfont icon-48"></i>
        <span>购物车</span>
      </div>
      <div class="btns">
          <span>加入购物车</span>
          <span>立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("id:", this.$route.params);
  }
};
</script>

<style scoped>
.mint-header {
  background-color: #f26b11;
  height: 0.8rem;
  /* box-sizing: border-box; */
  padding: 0.35rem 0.2rem 0.2rem;
}

/* 底部 */
.footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    display: flex;
    height: 55px;
    z-index: 9999;
    border-top: 1px solid #999;
}
.footer .cart{
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #f26b11;
}
.footer .cart i{
    font-size: 24px;
}
.footer .btns{
    flex: 1;
    display: flex;
    align-items: center;
    text-align: center;
    font: 0.3rem/55px "微软雅黑";
    color: #fff;
}
.footer .btns span{
    flex: 1;
    display: inline-block;
    background-color: #f26b11;
}
.footer .btns span:nth-child(2){
    background-color: #e43a3d;
}
</style>