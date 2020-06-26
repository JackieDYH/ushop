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
          <input type="checkbox" v-model="item.ischeck" @click="ck(idx)">
          <div class="good">
            <img :src="item.img" />
            <div class="txt">
              <h4>{{ item.goodsname }}</h4>
              <span>
                {{ attribute[idx].name }}
                <i>{{ attribute[idx].bute }}</i>
              </span>
              <b>￥{{ item.price }}</b>
            </div>
          </div>
        </div>
        <div class="right" @touchstart.self="start" @touchmove.self="move" @touchend.self="end">
          <div class="num">
            <i class="iconfont icon-jian" @click="btndown"></i>
            {{ item.num }}
            <i class="iconfont icon-icon-" @click="btnup"></i>
          </div>
          <span v-show="endX<startX">删除</span>
        </div>
      </div>
      
    </div>

    <!-- 尾部结算 -->
    <div class="footer">
      <div class="left">
        <!-- <em class="active"></em> -->
        <input type="checkbox" v-model="checkAll" @click="ckAll">
        <i>全选</i>
      </div>
      <div class="right">
        <div class="lm">
          <div class="txt1">
            总计:
            <i>{{ sumPrice }}</i>
          </div>
          <div class="txt2">不含运费，已优惠￥00.0</div>
        </div>
        <div class="lbtn" @click="$router.push('/order/'+1)">去结算</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      startX: 0,
      endX: 0,
      goods:[],
      attribute:[],
      checkAll:false,
    };
  },
  computed: {
    ...mapGetters(["userinfo"]),

    //计算价格
    sumPrice(){
      let sum = 0;
      // 选中
      this.goods.map(item=>{
        if(item.ischeck){
          sum += item.price * item.num;
        }
      });
      this.checkAll = this.goods.every(item=>{
        return item.ischeck;
      })
      return sum;
    }
  },
  mounted() {
    this.getCartlist();
  },
  methods: {
    // 全选
    ckAll(){
      this.goods = JSON.parse(JSON.stringify(this.goods))
      this.goods.map(item=>{
        item.ischeck = !this.checkAll;
      })
    },
    // 复选框
    ck(id){
      let arr = JSON.parse(JSON.stringify(this.goods))
      arr[id].ischeck = !arr[id].ischeck
      this.goods = arr
    },
    // 获取购物车信息
    getCartlist() {
      const uid = this.userinfo.uid;
      this.$http.get(this.$apis.cartlist, { uid }).then(res => {
          // console.log(res.data, '购物车数据');
          this.goods = res.data.list;
          this.goods.map(item=>{
            item.ischeck = false;
            let arr = item.attribute.split(',');
            this.attribute.push({name:arr[0],bute:arr[1]})
          })
          console.log(this.goods,'购物车数据')
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
    },
    btndown() {
      console.log(11);
    },
    btnup() {
      console.log(22);
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

/* 复选框 */
input{
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
  width: 60%;
}
.main .list .left .good {
  display: flex;
  align-items: center;
}
.main .list .left .good img {
  width: 1.02rem;
  height: 0.82rem;
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
.main .list .right .num span {
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