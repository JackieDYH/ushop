<template>
  <div>
    <mt-header fixed title="商品详情">
      <router-link to="/cate" icon="back" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="main">
      <!-- 商品头部信息 -->
      <div class="goodhead">
        <img :src="goodtxt.img" />
        <!-- <img src="/static/img/picDetail_2.jpg" /> -->
        <h3>{{goodtxt.goodsname}}</h3>
        <span>
          ￥{{goodtxt.price}}
          <i>市场价￥{{goodtxt.market_price}}(仅供参考)</i>
        </span>
      </div>
      <!-- 商品属性信息 -->
      <div class="specs">
        <div class="la">
          <em>促销</em>
          <i>满减</i>
          <span>满2件9折; 3件8折</span>
        </div>
        <div class="ls">
          <em>购买数量</em>
          <div class="num">
            <i class="iconfont icon-jian" @click="numDown"></i>
            <span>{{ this.num }}</span>
            <i class="iconfont icon-icon-" @click="numUp"></i>
          </div>
        </div>
        <div class="ld">
          <em>商品属性</em>
          <i class="iconfont icon-jiantouxia" @click="toggle = !toggle"></i>
        </div>
        <div class="lf" v-show="toggle == 1">
          <span>{{ goodtxt.specsname }}</span>
          <b
            v-for="(item,idx) of attarr"
            :key="idx"
            :class="{active:attid == idx}"
            @click="attrbtn(idx)"
          >{{ item }}</b>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="details">
        <div class="top">
          <h4>商品详情</h4>
        </div>
        <div class="text" v-html="goodtxt.description">
          <img src="/static/img/picDetail_3.jpg" />
          <img src="/static/img/picDetail_4.jpg" />
          <img src="/static/img/picDetail_5.jpg" />
          <img src="/static/img/picDetail_6.jpg" />
          <img src="/static/img/picDetail_7.jpg" />
        </div>
      </div>
    </div>
    <!-- 底部加入购物车 -->
    <div class="footer">
      <div class="cart">
        <i class="iconfont icon-48"></i>
        <span>购物车</span>
      </div>
      <div class="btns">
        <span @click="cartadd">加入购物车</span>
        <span>立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      toggle: 0, //显示隐藏
      goodtxt: [],
      attarr: [],
      num: 1, //商品数量
      attid: 0,
      attribute:'',//选中的商品属性
    };
  },
  computed:{
    ...mapGetters(['userinfo']),
  },
  methods: {
    // 加入购物车
    cartadd(){
      this.attrbtn(this.attid);

      let data = {};
      data.uid = this.userinfo.uid;
      data.goodsid = this.goodtxt.id;
      data.num = this.num;
      data.attribute = this.goodtxt.specsname +','+ this.attribute;
      this.$http.post(this.$apis.cartadd,data).then(res=>{
        console.log(res,11);
        if (res.data.code == 200) {
          Indicator.open("添加成功...");
          setTimeout(() => {
            Indicator.close();
            this.$router.push("/cart");
          }, 600);
        } else {
          Indicator.open(res.data.msg);
          setTimeout(() => {
            Indicator.close();
          }, 600);
        }
      })
    },
    // 商品属性选中
    attrbtn(id){
      this.attid = id;
      this.attribute = this.attarr[id];
      console.log(this.attribute)
    },
    numDown() {
      if (this.num <= 1) {
        // this.num = 1;
        Toast({
          message: "数量不能小于1",
          position: "bottom"
        });
        return false;
        setTimeout(() => {
          instance.close();
        }, 600);
      } else {
        this.num--;
        // this.cartadd();//调用接口存储商品
      }
    },
    numUp() {
      if (this.num >= 99) {
        // this.num = 99;
        Toast({
          message: "数量不能大于99",
          position: "bottom"
        });
        return false;
        setTimeout(() => {
          instance.close();
        }, 600);
      } else {
        this.num++;
        // this.cartadd();//调用接口存储商品
      }
    }
  },
  mounted() {
    Indicator.open("加载中...");
    console.log("id:", this.$route.params.id);
    this.$axios({
      url: this.$apis.getgoodsinfo,
      params: { id: this.$route.params.id }
    }).then(res => {
      console.log(res);
      if (res.data.code == 200) {
        setTimeout(() => {
          Indicator.close();
          this.goodtxt = res.data.list[0];
          this.attarr = this.goodtxt.specsattr.split(",");
        }, 600);
      }
    });
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
.main {
  width: 100%;
}
/* 商品头 标题 */
.main .goodhead img {
  width: 100%;
  height: auto;
}
.main .goodhead h3 {
  font: 0.3rem/0.47rem "微软雅黑";
  color: #333;
  padding: 0.23rem 0.25rem 0;
}
.main .goodhead span {
  font: 0.3rem/0.81rem "Arial";
  color: #e5383a;
  padding: 0 0.25rem 0;
}
.main .goodhead span > i {
  font: 0.22rem/100% "微软雅黑";
  color: #878787;
}
/* 商品属性 */
.main .specs {
  border-top: 0.2rem solid #f1f1f1;
}
.main .specs .la {
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
  padding: 0.3rem 0.23rem;
  border-bottom: thin solid #f1f1f1;
  font: 0.26rem/100% "微软雅黑";
  color: #454545;
  word-spacing: 0.05rem;
}
.main .specs .la i {
  display: inline-block;
  width: 0.64rem;
  height: 0.35rem;
  font: 0.24rem/0.35rem "微软雅黑";
  color: #b1271a;
  border: 1px solid #b12818;
  text-align: center;
  border-radius: 0.05rem;
  letter-spacing: 0.03rem;
}
.main .specs .la span {
  font: 0.24rem/100% "微软雅黑";
  color: #464646;
}
.main .specs .ls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0.25rem 0.23rem;
  font: 0.26rem/100% "微软雅黑";
  color: #454545;
  border-bottom: thin solid #f1f1f1;
}
.main .specs .ls i {
  font-size: 0.4rem;
  vertical-align: middle;
}
.main .specs .ls span {
  font-size: 0.35rem;
  vertical-align: middle;
}
.main .specs .ld {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.23rem;
}
.main .specs .ld em {
  font: 0.26rem/100% "微软雅黑";
  color: #454545;
  word-spacing: 0.05rem;
}
.main .specs .ld i {
  font-size: 0.3rem;
}
.main .specs .lf {
  display: flex;
  align-items: center;
  padding: 0 0.23rem 0.38rem;
}
.main .specs .lf span {
  font: 0.24rem/100% "微软雅黑";
  color: #b4b4b4;
  padding-right: 0.2rem;
}
.main .specs .lf b {
  width: 1rem;
  height: 0.4rem;
  display: block;
  font: 0.28rem/0.4rem "微软雅黑";
  color: #fff;
  background: #e1e1e3;
  text-align: center;
  border-radius: 0.04rem;
  margin: 0 0.04rem;
}
.main .specs .lf .active,
.main .specs .lf b:hover {
  background: #e43a3d;
}
/* 商品详情 */
.main .details {
}
.main .details .top {
  border-top: 0.2rem solid #f1f1f1;
  padding: 0 0.23rem;
}
.main .details .top h4 {
  font: 0.3rem/1rem "微软雅黑";
  color: #454545;
}
.main .details .text {
  width: 100%;
  font: 0.3rem/0.5rem "微软雅黑";
}
.main .details .text img {
  width: 100%;
}

/* 底部 */
.footer {
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
.footer .cart {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f26b11;
}
.footer .cart i {
  font-size: 24px;
}
.footer .btns {
  flex: 1;
  display: flex;
  align-items: center;
  text-align: center;
  font: 0.3rem/55px "微软雅黑";
  color: #fff;
}
.footer .btns span {
  flex: 1;
  display: inline-block;
  background-color: #f26b11;
}
.footer .btns span:nth-child(2) {
  background-color: #e43a3d;
}
</style>