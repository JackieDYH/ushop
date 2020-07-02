<template>
  <div>
    <mt-header fixed title="确认订单">
      <router-link to="/cate" icon="back" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="main">
      <!-- 地址 -->
      <div class="mis">
        <div class="left">
          <div class="top">
            <span>
              收货人：
              <i>JsckieHao</i>
            </span>
            <b>17344030576</b>
          </div>
          <div class="bott">
            <b>收货地址：</b>
            <i>北京市海淀区隐泉路清林苑6号楼中公优就业总部3层</i>
          </div>
        </div>
        <div class="right">
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
      <!-- 商品信息 -->
      <div class="good">
        <div class="item" v-for="(item,idx) of cartlist" :key="idx">
          <div class="left">
            <img :src="item.img" />
            <div class="txt1">
              <h3>{{item.goodsname}}</h3>
              <b>
                {{ item.attribute.name }}
                <i>{{ item.attribute.bute }}</i>
              </b>
            </div>
          </div>
          <div class="right">
            <span>
              <i>￥</i>
              {{ item.price | formatPrice() }}
            </span>
            <b>x{{ item.num }}</b>
          </div>
        </div>
        <div class="item2">
          <div class="left">
            <h3>配送方式:</h3>
          </div>
          <div class="right">
            <b>闪送快速</b>
            <i class="iconfont icon-jiantouyou"></i>
          </div>
        </div>
      </div>
      <!-- 优惠 -->
      <div class="disco">
        <div class="num">
          <span>优惠卷</span>
          <span>无可用</span>
        </div>
        <div class="num">
          <span>使用积分：{{integral}}</span>
          <mt-range
            v-model.number="integral"
            :min="0"
            :max="parseInt(goodsPrice + integral) / 2"
            :step="1"
            :bar-height="5"
          >
            <div slot="start">0</div>
            <div slot="end">{{parseInt(goodsPrice + integral) / 2}}</div>
          </mt-range>
          <!-- <input type="number" placeholder="输入积分" v-model.number="integral" /> -->
          <!-- <span>可用50积分</span> -->
        </div>
      </div>
      <!-- 结算 -->
      <div class="settle">
        <div class="lm">
          <div class="left">
            <h4>商品金额</h4>
            <h4>运费</h4>
            <h4>优惠卷</h4>
            <h4>会员优惠</h4>
            <h4>积分抵扣</h4>
          </div>
          <div class="right">
            <span>
              <i>￥</i>
              {{goodsPrice + integral | formatPrice()}}
            </span>
            <span>
              <i>+￥</i>00.00
            </span>
            <span>
              <i>-￥</i>00.00
            </span>
            <span>
              <i>-￥</i>00.00
            </span>
            <span>
              <i>-￥</i>
              {{ integral | formatPrice() }}
            </span>
          </div>
        </div>
        <div class="pay">
          <span>
            实付金额:
            <i>￥{{goodsPrice | formatPrice()}}</i>
          </span>
        </div>
        <div class="btn">
          <span @click="submit">提交订单</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      integral: 0 //积分
    };
  },
  computed: {
    // 获取购物车商品
    ...mapGetters(["cartlist"]),
    goodsPrice() {
      let sum = 0;
      // let cartlist = this.cartlist ? this.cartlist : [];
      this.cartlist.map(item => {
        sum += item.price * item.num;
      });
      // if (this.integral > sum) {
      //   Toast({
      //     message: "积分不能大于总价格",
      //     position: "bottom",
      //     duration: 800
      //   });
      //   this.integral = sum;
      // }
      return sum - this.integral;
    }
  },
  filters: {
    //局部 过滤器
    formatPrice(val, n = 2) {
      return val.toFixed(n);
    }
  },
  mounted() {},
  methods: {
    ...mapActions(["setCartlistSync"]),
    //提交订单 清空购物车
    submit() {
      // console.log(this.cartlist);
      this.cartlist.map(goods => {
        this.$http.post(this.$apis.cartdelete, { id: goods.id }).then(res => {
          if (res.data.code == 200) {
            Indicator.open("购买成功...");
            setTimeout(() => {
              this.$router.push("/");
              Indicator.close();
              this.setCartlistSync([]); //清空本地数据
            }, 600);
          } else {
            Indicator.open(res.data.msg);
            setTimeout(() => {
              Indicator.close();
              this.$router.push("/login");
            }, 600);
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.mt-range {
  width: 50%;
}
.mint-header {
  background-color: #f26b11;
  height: 0.8rem;
  /* box-sizing: border-box; */
  padding: 0.35rem 0.2rem 0.2rem;
}
/* 地址 */
.main .mis {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 0.3rem;
}
.main .mis .left {
  font: 0.24rem/100% "微软雅黑";
  color: #5f5f5f;
}
.main .mis .left .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main .mis .left .top span {
  display: flex;
  line-height: 0.46rem;
  padding: 0.13rem 0 0.09rem;
}
.main .mis .left .top span i {
  color: #f26b11;
}
.main .mis .left .top b {
  padding-right: 0.14rem;
}

.main .mis .left .bott {
  display: flex;
  line-height: 0.31rem;
  padding-bottom: 0.2rem;
}
.main .mis .left .bott b {
  flex-shrink: 0;
}
.main .mis .left .bott i {
  color: #999;
}
.main .mis .right i {
  font-size: 0.25rem;
}
/* 商品信息 */
.main .good {
  border-top: 0.1rem solid #f1f1f1;
}
.main .good .item {
  padding: 0 0.26rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.01rem solid #f1f1f1;
}
.main .good .item .left {
  display: flex;
  width: 70%;
  align-items: center;
}
.main .good .item .left img {
  width: 1.16rem;
  height: 1.2rem;
  padding: 0.2rem 0.27rem 0.2rem 0.06rem;
}
.main .good .item .left .txt1 {
  width: 70%;
}
.main .good .item .left .txt1 h3 {
  font: 0.26rem/0.47rem "微软雅黑";
  color: #646464;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.main .good .item .left .txt1 b {
  font: 0.26rem/0.47rem "微软雅黑";
  color: #a9a9a9;
}
.main .good .item .left .txt1 b i {
  color: #f26b11;
}
.main .good .item .right {
  display: flex;
  flex-direction: column;
}
.main .good .item .right span i {
  font-size: 0.24rem;
}
.main .good .item .right span {
  font: 0.36rem/100% "微软雅黑";
  color: #e7343a;
}
.main .good .item .right b {
  text-align: right;
  color: #f26b11;
}
.main .good .item2 {
  padding: 0 0.26rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: 0.26rem/0.95rem "微软雅黑";
  color: #666;
}
.main .good .item2 .right b {
  color: #f26b11;
}
.main .good .item2 .right i {
  font-size: 0.25rem;
}
/* 优惠 */
.main .disco {
  border-top: 0.1rem solid #f1f1f1;
}
.main .disco .num {
  padding: 0 0.26rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font: 0.26rem/1.01rem "微软雅黑";
  color: #666;
}
.main .disco .num input {
  width: 1.2rem;
  height: 0.44rem;
  border: 1px solid #f26b11;
  border-radius: 0.2rem;
  padding: 0 0.1rem;
}
.main .disco .num span:last-child {
  color: #999;
}
.main .disco .num:last-child {
  border-top: 0.01rem solid #f1f1f1;
}
/* 结算 */
.main .settle {
  width: 100%;
  border-top: 0.1rem solid #f1f1f1;
}
.main .settle .lm {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  padding: 0 0.26rem;
}
.main .settle .lm .left {
  padding: 0.25rem 0 0.2rem;
}
.main .settle .lm .left h4 {
  font: 0.26rem/0.43rem "微软雅黑";
  color: #666;
}
.main .settle .lm .right {
  padding: 0.25rem 0 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font: 0.26rem/0.43rem "微软雅黑";
  color: #e63837;
}
.main .settle .lm .right span i {
  font-size: 0.2rem;
}
.main .settle .pay {
  display: flex;
  flex-direction: row-reverse;
  padding: 0.22rem 0;
}
.main .settle .pay span {
  font: 0.36rem/100% "微软雅黑";
  color: #646464;
  padding-right: 0.26rem;
}
.main .settle .pay span i {
  color: #ef3536;
}
.main .settle .btn {
  display: flex;
  justify-content: space-around;
  padding: 0.1rem 0 0.2rem;
}
.main .settle .btn span {
  width: 2.55rem;
  height: 1rem;
  font: 0.32rem/1rem "微软雅黑";
  color: #fff;
  text-align: center;
  background: #f26b11;
  border-radius: 0.14rem;
}
</style>