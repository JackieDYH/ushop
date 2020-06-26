<template>
  <div>
    <mt-header fixed title="我的">
      <router-link to="/cate" icon="back" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!-- 个人信息 -->
    <div class="head">
            <img src="/static/img/mine.png">
            <div class="txt">
                <span>{{userinfo.nickname}}</span>
                <i>{{userinfo.phone}}</i>
            </div>
        </dv>
    </div>
    <div class="order">
        <div>
            <i class="iconfont icon-dingdan"></i>
            全部订单
        </div>
        <div>
            <i class="iconfont icon-fukuan"></i>
            待付款
        </div>
        <div>
            <i class="iconfont icon-huochedong"></i>
            待收货
        </div>
    </div>
    <div class="main">
        <div class="nu">
            <div class="left">
                <i class="iconfont icon-dizhi"></i>
                地址管理
            </div>
            <div class="right">
                <i class="iconfont icon-jiantouyou" @click="$router.push('/login')"></i>
            </div>
        </div>
        <div class="nu">
            <div class="left">
                <i class="iconfont icon-qianbao"></i>
                我的钱包
            </div>
            <div class="right">
                <i class="iconfont icon-jiantouyou" @click="$router.push('/register')"></i>
            </div>
        </div>
        <div class="nu">
            <div class="left">
                <i class="iconfont icon-youhuijuan"></i>
                我的优惠卷
            </div>
            <div class="right">
                <i class="iconfont icon-jiantouyou"></i>
            </div>
        </div>
        <div class="nu">
            <div class="left">
                <i class="iconfont icon-ico"></i>
                我的二维码
            </div>
            <div class="right">
                <i class="iconfont icon-jiantouyou"></i>
            </div>
        </div>
<div class="nu">
            <div class="left">
                <i class="iconfont icon-renyuan"></i>
                我的小伙伴
            </div>
            <div class="right">
                <i class="iconfont icon-jiantouyou"></i>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters(['userinfo']),
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
/* 信息 */
.head{
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    background: #f26b11;
    padding: 0 0.23rem;
}
.head img{
    width: 1.3rem;
    height: 1.36rem;
    margin: 0.28rem 0.25rem 0.28rem 0.09rem;
    border-radius: 50%;
    border: thick solid #f8fdff;
    background: #822e02;
}
.head .txt{
    display: flex;
    flex-direction: column;
}
.head .txt span{
       font: 0.3rem/0.52rem "微软雅黑";
    color: #fffdff; 
}
.head .txt i{
   font: 0.28rem/100% "微软雅黑";
    color: #081911;
    font-style: italic; 
}
.order{
    display: flex;
    justify-content: space-around;
    padding: .2rem 0;
}
.order div{
    width: 33%;
    text-align: center;
    display: flex;
    flex-direction: column;
    font: 0.24rem/0.45rem "微软雅黑";
    color: #676767;
}
.order div i{
    font-size: .5rem;
}
.main{
    border-top: .1rem solid #F1F1F1;
}
.main .nu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: thin solid #d9d9d9;
    padding: 0 0.28rem;
    font: 0.26rem/1rem "微软雅黑";
    color: #5e5e5e;
    border-top: .01rem solid #F1F1F1;
}
.main .nu .left{
    display: flex;
    align-items: center;
}
.main .nu i{
    font-size: .4rem;
}
.main .nu .left i{
    color: #f26b11;
    margin-right: .1rem;
}
</style>