<template>
  <div>
    <mt-header fixed title="我的">
      <router-link to="/" icon="back" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button
        slot="right"
        class="iconfont icon-tuichudenglu"
        @click="quit"
        v-if="userinfo.nickname"
      ></mt-button>
      <mt-button slot="right" @click="$router.push('/login')" v-else>登录</mt-button>
    </mt-header>
    <!-- 个人信息 -->
    <div class="head">
      <img src="/static/img/mine.png" />
      <div class="txt">
        <span>{{userinfo.nickname}}</span>
        <i>Tel:{{userinfo.phone}}</i>
      </div>
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
import store from "../../store";
import { mapGetters, mapActions } from "vuex";
import { Indicator, MessageBox } from "mint-ui";
export default {
  computed: {
    ...mapGetters(["userinfo"])
  },
  methods: {
    ...mapActions(["setUserinfoSync"]),
    quit() {
      MessageBox.confirm("", {
        message: "你确定退出登录吗？",
        title: "提示"
      })
        .then(action => {
          if (action == "confirm") {
            // console.log(1);
            this.setUserinfoSync({});
            Indicator.open("退出成功...");
            setTimeout(() => {
              Indicator.close();
              this.$router.push("/");
            }, 600);
          }
        })
        .catch(err => {
          if (err == "cancel") {
            // console.log(2);
            Indicator.open("取消成功...");
            setTimeout(() => {
              Indicator.close();
            }, 600);
          }
        });
    }
  }
  // 组件守卫
  // beforeRouteEnter(to,from,next){
  //     const user = store.state.userinfo;
  //     console.log(user,111)
  //     if(user.token){
  //         next();
  //     }else{

  //         Indicator.open("请先登录...");
  //         setTimeout(() => {
  //             next('/login')
  //             Indicator.close();
  //         }, 600);
  //     }
  // }
};
</script>

<style scoped>
.mint-header {
  background-color: #f26b11;
  height: 0.8rem;
  /* box-sizing: border-box; */
  padding: 0.35rem 0.2rem 0.2rem;
}
.icon-tuichudenglu {
  font-size: 0.35rem;
}
/* 信息 */
.head {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  background: #f26b11;
  padding: 0 0.23rem;
}
.head img {
  width: 1.3rem;
  height: 1.36rem;
  margin: 0.28rem 0.25rem 0.28rem 0.09rem;
  border-radius: 50%;
  border: thick solid #f8fdff;
  background: #822e02;
}
.head .txt {
  display: flex;
  flex-direction: column;
}
.head .txt span {
  font: 0.3rem/0.52rem "微软雅黑";
  color: #fffdff;
}
.head .txt i {
  font: 0.28rem/100% "微软雅黑";
  color: #505553;
  font-style: italic;
}
.order {
  display: flex;
  justify-content: space-around;
  padding: 0.2rem 0;
}
.order div {
  width: 33%;
  text-align: center;
  display: flex;
  flex-direction: column;
  font: 0.24rem/0.45rem "微软雅黑";
  color: #676767;
}
.order div i {
  font-size: 0.5rem;
}
.main {
  border-top: 0.1rem solid #f1f1f1;
}
.main .nu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: thin solid #d9d9d9;
  padding: 0 0.28rem;
  font: 0.26rem/1rem "微软雅黑";
  color: #5e5e5e;
  border-top: 0.01rem solid #f1f1f1;
}
.main .nu .left {
  display: flex;
  align-items: center;
}
.main .nu i {
  font-size: 0.4rem;
}
.main .nu .left i {
  color: #f26b11;
  margin-right: 0.1rem;
}
</style>