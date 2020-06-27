<template>
  <div>
    <mt-header fixed title="购物车">
      <router-link to="/" icon="back" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!-- 购物车列表 -->
    <div class="main">
      <div class="list" v-for="(item,idx) of goods" :key="idx">
        <div class="left">
          <!-- <em class=""></em> -->
          <input type="checkbox" v-model="item.ischeck" @click="ck(idx)" />
          <div class="good">
            <img :src="item.img" @click="$router.push('/detail/'+item.goodsid)" />
            <div class="txt">
              <h4>{{ item.goodsname }}</h4>
              <span>
                {{ item.attribute.name }}
                <i>{{ item.attribute.bute }}</i>
              </span>
              <!-- <b>￥{{ item.price }}</b> -->
              <b>{{ item.price | formatPrice() }}</b>
            </div>
          </div>
        </div>
        <div class="right" @touchstart.self="start" @touchmove.self="move" @touchend.self="end">
          <div class="num">
            <i class="iconfont icon-jian" @click="btndown(1,item.id,idx)"></i>
            <b>{{ item.num }}</b>
            <i class="iconfont icon-icon-" @click="btnup(2,item.id,idx)"></i>
          </div>
          <span v-show="endX<startX" @click="cartdel(item.id,idx)">删除</span>
        </div>
      </div>
      <div class="kong" v-show="goods.length == 0">
        <i class="iconfont icon-huochedong"></i>
        <h2>您的购物车空空如也</h2>
        <h3>快快去把购物车填满吧</h3>
      </div>
    </div>

    <!-- 尾部结算 -->
    <div class="footer">
      <div class="left">
        <!-- <em class="active"></em> -->
        <input type="checkbox" v-model="checkAll" @click="ckAll" />
        <i>全选</i>
      </div>
      <div class="right">
        <div class="lm">
          <div class="txt1">
            总计:
            <i>{{ sumPrice | formatPrice() }}</i>
          </div>
          <div class="txt2">不含运费，已优惠￥00.0</div>
        </div>
        <div class="lbtn" @click="order">去结算</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Indicator, Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      startX: 0, //滑动
      endX: 0,
      goods: [], //商品
      // attribute: [],
      checkAll: false,
      lastTime: 0 //默认上一次点击时间为0 ,
    };
  },
  computed: {
    ...mapGetters(["userinfo"]),

    //计算价格
    sumPrice() {
      let sum = 0;
      // 选中
      this.goods.map(item => {
        if (item.ischeck) {
          sum += item.price * item.num;
        }
      });
      this.checkAll = this.goods.every(item => {
        return item.ischeck;
      });
      return sum;
    }
  },
  mounted() {
    Indicator.open("数据加载中...");
    this.getCartlist();
  },
  filters: {
    //局部 过滤器
    formatPrice(val, n = 2) {
      return "￥ " + val.toFixed(n) + " 元";
    }
  },
  methods: {
    // 购物车厂库
    ...mapActions(["setCartlistSync"]),
    // 删除商品
    cartdel(id, idx) {
      console.log(id, idx, 222);
      MessageBox.confirm("", {
        message: "你确定删除吗？",
        title: "警告"
      })
        .then(action => {
          if (action == "confirm") {
            console.log(1);
            this.$http.post(this.$apis.cartdelete, { id }).then(res => {
              console.log(res, 11);
              if (res.data.code == 200) {
                this.goods.splice(idx, 1);
                Indicator.open("删除成功...");
                setTimeout(() => {
                  Indicator.close();
                }, 600);
              } else {
                Indicator.open(res.data.msg);
                setTimeout(() => {
                  Indicator.close();
                  this.$router.push("/login");
                }, 600);
              }
            });
          }
        })
        .catch(err => {
          if (err == "cancel") {
            console.log(2);
          }
        });
    },
    // 结算
    order() {
      // if(!this.userinfo.token)return;
      // 返回选中的商品
      let arr = this.goods.filter((value, idx) => {
        return value.ischeck == true;
      });
      // console.log(arr,11)
      if (arr.length == 0) {
        Toast({
          message: "未勾选商品",
          position: "bottom",
          duration: 800
        });
        return false;
      }
      // 添加到本地厂库
      this.setCartlistSync(arr);
      this.$router.push("/order");
    },
    //-
    btndown(type, id, idx) {
      if (this.goods[idx].num <= 1) {
        Toast({
          message: "数量不能小于1",
          position: "bottom",
          duration: 800
        });
        return false;
      }
      this.throttle(type, id, idx);
      // this.goods[idx].num--;
      // this.editCart(type, id);
    },
    //+
    btnup(type, id, idx) {
      if (this.goods[idx].num >= 99) {
        Toast({
          message: "数量不能大于99",
          position: "bottom",
          duration: 800
        });
        return false;
      }
      this.throttle(type, id, idx);
      // this.goods[idx].num++;
      // this.editCart(type, id);
    },
    //修改购物车
    editCart(type, id) {
      this.$http.post(this.$apis.cartedit, { type, id }).then(res => {
        console.log(res, 111);
      });
    },
    goodsJson() {
      this.goods = JSON.parse(JSON.stringify(this.goods));
    },
    // 截流
    throttle(type, id, idx) {
      //获取当前时间的时间戳
      let now = new Date().valueOf();
      //第一次点击
      if (this.lastTime == 0) {
        console.log("触发事件");
        this.editCart(type, id);
        this.goods[idx].num =
          type == 1 ? --this.goods[idx].num : ++this.goods[idx].num;
        this.lastTime = now;
      } else {
        if (now - this.lastTime > 1000) {
          //重置上一次点击时间，1000是我自己设置的1秒间隔，根据自己的需要更改
          this.lastTime = now;
          // console.log("间隔大于1秒，触发方法");
          //添加自己要调用的方法
          this.editCart(type, id);
          this.goods[idx].num =
            type == 1 ? --this.goods[idx].num : ++this.goods[idx].num;
        } else {
          Toast({
            message: "您点的太快了！",
            position: "bottom",
            duration: 800
          });
          return false;
        }
      }
    },
    // 全选
    ckAll() {
      this.goods = JSON.parse(JSON.stringify(this.goods));
      this.goods.map(item => {
        item.ischeck = !this.checkAll;
      });
    },
    // 复选框
    ck(id) {
      let arr = JSON.parse(JSON.stringify(this.goods));
      arr[id].ischeck = !arr[id].ischeck;
      this.goods = arr;
      // this.goods[id].ischeck = !this.goods[id].ischeck
    },
    // 获取购物车信息
    getCartlist() {
      const uid = this.userinfo.uid;
      this.$http.get(this.$apis.cartlist, { uid }).then(res => {
        if (res.data.code == 200) {
          this.goods = res.data.list ? res.data.list : [];
          this.goods.map(item => {
            item.ischeck = false;
            let arr = item.attribute.split(",");
            // this.attribute.push({ name: arr[0], bute: arr[1] });
            item.attribute = { name: arr[0], bute: arr[1] };
          });
          setTimeout(() => {
            Indicator.close();
          }, 600);
        } else {
          Indicator.open(res.data.msg);
          setTimeout(() => {
            Indicator.close();
            this.$router.push("/login");
          }, 600);
        }

        console.log(this.goods, "购物车数据");
      });
    },
    start: function(e) {
      this.startX = e.touches[0].clientX;
    },
    move(e) {
      this.endX = e.touches[0].clientX;
    },
    end(e) {
      console.log(this.startX);
      console.log(this.endX);
      //结束的坐标点大于开始的坐标点，认为用户已经从左往右滑动了屏幕
    }
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
.main .list:last-child {
  margin-bottom: 1rem;
}

/* 空 */
.main .kong {
  padding-top: 20%;
  text-align: center;
  font-size: 0.5rem;
  color: pink;
}
.main .kong i {
  font-size: 1.5rem;
  color: #f26b11;
}

/* 复选框 */
input {
  flex-shrink: 0;
  display: inline-block;
  width: 0.34rem;
  height: 0.34rem;
  margin: 0 0.15rem 0 0.1rem;
}

/* 商品列表信息 */
.main .list {
  height: 1.72rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
  margin-bottom: 0.3rem;
}
.main .list .left {
  display: flex;
  align-items: center;
  width: 70%;
}
.main .list .left .good {
  display: flex;
  align-items: center;
}
.main .list .left .good img {
  width: 1.1rem;
  height: 1.2rem;
  padding-right: 0.34rem;
}
.main .list .left .good .txt {
  height: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.main .list .left .good .txt h4 {
  width: 66%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font: 0.26rem/100% "微软雅黑";
  color: #333;
  padding-top: 0.05rem;
}
.main .list .left .good .txt span {
  color: #999;
}
.main .list .left .good .txt span i {
  color: #f26b11;
}
.main .list .left .good .txt b {
  color: #e43a3b;
}

.main .list .right {
  display: flex;
  align-items: center;
  height: 100%;
}
.main .list .right .num {
  display: flex;
  font-size: 0.32rem;
  line-height: 0.6rem;
  padding-right: 0.08rem;
}
.main .list .right .num b {
  padding: 0 0.02rem;
}
.main .list .right .num i {
  font-size: 0.4rem;
}
.main .list .right span {
  width: 0.98rem;
  text-align: center;
  font: 0.24rem/1.72rem "微软雅黑";
  color: #fefeff;
  background: #e43a3d;
  transition: width 2s;
}

/* 复选框效果 */
.left em {
  flex-shrink: 0;
  display: inline-block;
  width: 0.34rem;
  height: 0.34rem;
  border: 0.02rem solid #b32e1f;
  border-radius: 50%;
  margin: 0 0.15rem 0 0.1rem;
}
.left em.active,
.left em:hover {
  background: #fff url(/static/img/selectCart.jpg) no-repeat center / 0.17rem
    0.13rem;
}

/* 尾部 */
.footer {
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 55px;
  background: #fff;
  height: 0.8rem;
  display: flex;
  justify-content: space-between;
}
.footer .left {
  display: flex;
  align-items: center;
}
.footer .right {
  display: flex;
}
.footer .right .lm {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
}
.footer .right .lm .txt1 {
  font: 0.3rem/100% "微软雅黑";
  color: #333;
}
.footer .right .lm .txt1 i {
  color: #e43a3b;
}
.footer .right .lm .txt2 {
  font: 0.2rem/100% "微软雅黑";
  color: #a4a4a4;
}
.footer .right .lbtn {
  width: 2rem;
  margin-left: 0.1rem;
  font: 0.34rem/0.8rem "微软雅黑";
  color: #fff;
  text-align: center;
  background: #f26b11;
  border-radius: 0.5rem;
}
</style>