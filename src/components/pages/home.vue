<template>
  <div>
    <div class="head">
      <router-link to="/home">
        <img src="/static/img/logo.jpg" />
      </router-link>
      <!-- <input type="search" slot placeholder="搜索商品" /> -->
      <div class="search">
        <input type="search" v-model.trim="searchText" placeholder="搜索商品" />
        <i class="iconfont icon-fangdajing" @click="search"></i>
      </div>
      <div class="menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="main">
        <!-- 导航 -->
      <div class="navbtn">
        <ul>
          <li v-for="item of catearr" :key="item.id">{{item.catename}}</li>
        </ul>
        <div class="arrow"></div>
      </div>
      <!-- 轮播 -->
      <div class="banner">
        <mt-swipe :auto="4000" class="swipe">
          <mt-swipe-item
            v-for="item of bannerarr"
            :key="item.id"
          >
              <img :src="item.img">
          </mt-swipe-item>
        </mt-swipe>
      </div>
        <!-- 4个导航 -->
        <div class="navcont">
            <div>
                <img src="/static/img/icon_1.jpg">
                <span>限时抢购</span>
            </div>
            <div>
                <img src="/static/img/icon_2.jpg">
                <span>积分商城</span>
            </div>
            <div>
                <img src="/static/img/icon_3.jpg">
                <span>联系我们</span>
            </div>
            <div @click="$router.push('/cate')">
                <img src="/static/img/icon_4.jpg">
                <span>商品分类</span>
            </div>
        </div>
        <!-- 限时秒杀 -->
        <div class="seckill">
            <div class="left">
                <p class="txt1">限时秒杀</p>
                <p class="txt2">每天零点场 好货秒不停</p>
                <p class="txt3">
                    <span>02</span>
                    <i>:</i>
                    <span>14</span>
                    <i>:</i>
                    <span>45</span>
                    <b>秒杀</b>
                </p>
                <img src="/static/img/shop_5.jpg">
                <span><i>￥</i>16.6</span>
            </div>
            <div class="right">
                <div class="top">
                    <div class="top-left">
                        <p class="txt1">品牌上新<span>折</span></p>
                        <p class="txt2">每日9点 抢大牌</p>
                        <img src="/static/img/brand.jpg">
                    </div>
                    <div class="top-right">
                        <img src="/static/img/shop_1.jpg">
                    </div>
                </div>
                <div class="bott">
                    <div class="bott-left">
                        <p class="txt1">每日十件</p>
                        <p class="txt2">只为你选好货</p>
                        <img src="/static/img/shop_2.jpg">
                    </div>
                    <div class="bott-right">
                        <p class="txt1">拼啊</p>
                        <p class="txt2">超级好评拼团</p>
                        <img src="/static/img/shop_3.jpg">
                    </div>
                </div>
            </div>
        </div>
        <!-- 广告栏 -->
        <div class="adverbar">
            <img src="/static/img/bar.jpg">
        </div>
        <!-- 商品 -->
        <div class="goods">
            <ul  class="btnul">
                <li
                    :class="{active:btnactive == idx}" 
                    v-for="(item,idx) of btnarr"   
                    :key="idx"
                    @click="btnactive = idx"
                >{{ item }}</li>
            </ul>
            <div class="list"
                v-for="(item,idx) of goodsarr"   
                    :key="idx"
                v-show="btnactive==idx"
            >
                <div class="content"
                    v-for="(goods,idx) of item.content"
                    :key="idx"
                >
                    <img :src="goods.img">
                    <div class="bt">
                        <h3>{{ goods.goodsname }}</h3>
                        <span>￥{{ goods.price }}</span>
                        <b>市场价￥{{goods.market_price}}</b>
                        <p>立即购买</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            btnactive:0,
            btnarr:[
                '热门商品','最新商品','全部商品'
            ],
            catearr:[],//分类信息
            bannerarr:[],//轮播图
            goodsarr:[],//商品
            searchText:'',//搜索
        }
    },
    methods:{
        // 搜索
        search(){
            if(!this.searchText)return;
            this.$router.push('/search/'+this.searchText);
            this.searchText = '';
        },
        //分类信息
        getcate(){
            return this.$axios.get(this.$apis.getcate);
        },
        // 轮播图
        getbanner(){
            return this.$axios.get(this.$apis.getbanner);
        },
        getindexgoods(){
            return this.$axios.get(this.$apis.getindexgoods);
        }
    },
    mounted(){
        //发起批量网络请求
        this.$axios.all([this.getcate(),this.getbanner(),this.getindexgoods()]).then(
            this.$axios.spread((cateres,bannerres,goodsres)=>{
                // console.log(cateres,111)
                // console.log(bannerres,111)
                this.catearr = cateres.data.list;
                this.bannerarr = bannerres.data.list;
                this.goodsarr = goodsres.data.list;
            })
        )
    }
};
</script>

<style scoped>
/* 头部部分 */
.head {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 0.8rem;
  box-sizing: border-box;
  z-index: 99;
  padding: 0.35rem 0.2rem 0.2rem;
  border-bottom: 1px solid #999;
  background-color: #fff;
}
.head a {
  display: block;
}
.head a img {
  width: 1.5rem;
  height: 0.29rem;
}
.head .search {
  width: 3.03rem;
  height: 0.38rem;
  background: #eee;
  border-radius: 0.05rem;
  color: #b8b8b8;
  font: 0.18rem/0.38rem "微软雅黑";
}
.head .search input{
  text-align: center;
}
.head .menu span {
  display: inline-block;
  width: 0.14rem;
  height: 0.14rem;
  border-radius: 50%;
  background-color: #333;
}

/* navbtn 导航部分 */
.main .navbtn {
  position: relative;
  background-color: #fff;
  overflow: hidden;
}
.main .navbtn ul {
  display: flex;
  /* align-content: center; */
  padding: 0 0.12rem;
}
.main .navbtn ul > li {
  margin: 0 0.1rem;
  flex-shrink: 0;
  display: block;
  font: 0.28rem/0.31rem "微软雅黑";
  padding: 0.2rem 0 0.1rem;
  color: #303030;
  border-bottom: 0.04rem solid transparent;
}
.main .navbtn ul .active,
.main .navbtn ul li:hover {
  color: #e00235;
  border-bottom-color: #e00235;
}
.main .navbtn .arrow {
  position: absolute;
  top: 0;
  right: 0;
  width: 0.76rem;
  height: 0.76rem;
  background: #fff url(/static/img/arrow.jpg) no-repeat center / 0.35rem 0.21rem;
}
/* banner图 */
.main .banner img{
    width: 100%;
    height: 100%;
}
.main .banner .swipe{
    height: 2.6rem;
}
/* 4个导航 */
.main .navcont{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .1rem 0.4rem;
}
.main .navcont div{
    display: flex;
    flex-direction: column;
    align-items: center;
    font: 0.28rem/0.68rem "微软雅黑";
    color: #6b6b6b;
}
.main .navcont div img{
    width: 0.64rem;
    height: 0.62rem;
}
/* 限时秒杀 */
.main .seckill{
    width: 100%;
    display: flex;
    overflow: hidden;
    border-top: .1rem solid #F1F1F1;
}
.main .seckill .left{
    flex: 1;
    position: relative;
    border-right: 1px solid #f0f0f0;
    padding: .1rem 0 .2rem .1rem;
}
.main .seckill .left .txt1{
    font: 0.3rem/0.31rem "微软雅黑";
    color: #ed3a64;
    text-indent: 0.4rem;
    background: url(/static/img/timer.jpg) no-repeat left center / 0.33rem 0.31rem;
}
.main .seckill .left .txt2{
    font: 0.22rem/0.33rem "微软雅黑";
    color: #7e7e7e;
}
.main .seckill .left .txt3 span {
    display: inline-block;
    width: 0.41rem;
    height: 0.41rem;
    font: 0.22rem/0.41rem "微软雅黑";
    color: #fff;
    text-align: center;
    border-radius: 0.04rem;
    background: #282830;
}
.main .seckill .left .txt3 i{
    display: inline-block;
    width: 0.1rem;
    height: 0.41rem;
    font: 0.22rem/0.41rem "微软雅黑";
    color: #282830;
    text-align: center;
}
.main .seckill .left .txt3 b{
    display: inline-block;
    margin: 0 0.03rem 0 0.27rem;
    width: 0.96rem;
    height: 0.4rem;
    font: 0.26rem/0.4rem "微软雅黑";
    color: #1e1905;
    text-align: center;
    background: url(/static/img/bg.jpg) no-repeat center / 0.96rem 0.4rem;
}
.main .seckill .left img{
    width: 2.8rem;
    height: 2.6rem;
}
.main .seckill .left>span>i{
    font-size: .16rem;
}
.main .seckill .left>span{
    position: absolute;
    bottom: .3rem;
    right: .38rem;
    display: inline-block;
    width: .8rem;
    height: .8rem;
    color: #fff;
    border-radius: 50%;
    font: 0.26rem/0.8rem "微软雅黑";
    background-color: #ff3179;
}
.main .seckill .right{
    flex: 1;
    padding: .1rem 0 .1rem 0;
}
.main .seckill .right .top{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    padding: 0 .1rem;
}
.main .seckill .right .top-left .txt1{
    font: 0.3rem/0.31rem "微软雅黑";
    color: #ed3a64;
    padding-top: 0.18rem;
}
.main .seckill .right .top-left .txt1>span{
    position: relative;
    top: -0.1rem;
    display: inline-block;
    width: 0.33rem;
    height: 0.25rem;
    font: 0.18rem/0.25rem "微软雅黑";
    color: #f5f5f7;
    text-align: center;
    background-color: #f3409b;
    border-radius: 0.03rem;
}
.main .seckill .right .top-left .txt2{
    font: 0.22rem/0.33rem "微软雅黑";
    color: #7e7e7e;
}
.main .seckill .right .top-left img{
    width: 0.93rem;
    height: 0.32rem;
    padding-top: 0.22rem;
}
.main .seckill .right .top-right img{
    width: 1.28rem;
    height: 1.78rem;
    padding: 0.06rem 0 0.05rem 0.1rem;
}
.main .seckill .right .bott{
    display: flex;
    padding: .1rem;
}
.main .seckill .right .bott .bott-left{
    flex: 1;
}
.main .seckill .right .bott .bott-right{
    flex: 1;
}
.main .seckill .right .bott-left{
    /* padding: 0.18rem 0.32rem 0.03rem 0.18rem; */
    border-right: 1px solid #f0f0f0;
}
.main .seckill .right .bott .txt1{
   font: 0.26rem/0.33rem "微软雅黑";
    color: #ed3a64; 
}
.main .seckill .right .bott .txt2{
    font: 0.22rem/0.33rem "微软雅黑";
    color: #7e7e7e;
}
.main .seckill .right .bott-left>img{
    width: 0.64rem;
    height: 1.02rem; 
    padding-left: .2rem;
}
.main .seckill .right .bott-right>img{
    width: 1.04rem;
    height: 0.88rem;
    padding-left: .2rem;
}
/* 广告栏 */
.main .adverbar{
    border-top: .2rem solid #F1F1F1;
    border-bottom: .2rem solid #F1F1F1;
}
.main .adverbar img{
    width: 100%;
}
/* 商品 */
.main .goods .btnul{
    display: flex;
    justify-content: space-between;
    padding: .2rem 0.2rem .2rem;
    overflow: hidden;
}
.main .goods .btnul li{
    flex-grow: 1;
    border: 1px solid #d0d0d0;
    margin-left: -1px;
    font: 0.28rem/0.68rem "微软雅黑";
    color: #0b0b0b;
    text-align: center;
}
.main .goods .btnul .active,.goods .btnul li:hover{
    position: relative;
    background: #f26b11;
    outline: 1px solid #f26b11;
    outline-offset: -1px;
    color: #fff;
}
/* 商品列表 */
.main .goods .content{
    display: flex;
    justify-content: space-between;
    margin: 0 .23rem 0.34rem;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.4);
    border-radius: .1rem;
}
.main .goods .content img{
    width: 2.16rem;
    height: 2.2rem;
    padding: 0.4rem 0.1rem 0.2rem 0.3rem;
}
.main .goods .content .bt{
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0 0 0;
    width: 55%;
}
.main .goods .content .bt h3{
    font: 0.3rem/0.57rem "微软雅黑";
    color: #2f2f2f;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
}
.main .goods .content .bt span{
    font: 0.3rem/0.51rem "微软雅黑";
    color: #e72e33;
}
.main .goods .content .bt b{
    font: 0.24rem/0.59rem "微软雅黑";
    color: #979797;
}
.main .goods .content .bt p{
    width: 1.64rem;
    height: 0.52rem;
    border-radius: .5rem;
    font: 0.24rem/0.52rem "微软雅黑";
    color: #fff;
    background: #f26b11;
    text-align: center;
}


</style>