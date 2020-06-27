<template>
  <div class="bg">
    <mt-header fixed title="注册">
      <router-link to="/" icon="back" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="main">
      <div class="reg">
        <i class="iconfont icon-zhuce"></i>
        <div>
          <i class="iconfont icon-user-line"></i>
          <input type="text" placeholder="用户名 长度8位" v-model.trim="info.nickname" />
        </div>
        <div>
          <i class="iconfont icon-shouji"></i>
          <input type="tel" placeholder="手机号" v-model.trim="info.phone" />
        </div>
        <div>
          <i class="iconfont icon-mima"></i>
          <input type="password" placeholder="密码 长度6~13位" v-model.trim="pwd" />
        </div>
        <div>
          <i class="iconfont icon-mima"></i>
          <input type="password" placeholder="确认密码" v-model.trim="pwd2" />
        </div>
        <p @click="add">注册</p>
        <span @click="$router.push('/login')">已有账号 立即登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      info: {
        nickname: "",
        phone: "",
        password: ""
      },
      pwd: "",
      pwd2: ""
    };
  },
  watch: {},
  methods: {
    add() {
      // 验证用户名
      if (this.info.nickname !== "" && this.info.nickname.length <= 8) {
      } else {
        Toast({
          message: "用户名格式错误...",
          position: "bottom"
        });
        setTimeout(() => {
          instance.close();
        }, 600);
        return false;
      }
      // 验证手机号
      const reg = /^1[345789]\d{9}$/;
      if (reg.test(this.info.phone)) {
      } else {
        Toast({
          message: "手机号错误...",
          position: "bottom"
        });
        setTimeout(() => {
          instance.close();
        }, 600);
        return false;
      }
      //验证密码
      if (this.pwd !== "" && this.pwd2 !== "") {
        if (
          this.pwd == this.pwd2 &&
          this.pwd.length >= 6 &&
          this.pwd.length <= 13
        ) {
          this.info.password = this.pwd;
        } else {
          Toast({
            message: "密码格式错误...",
            position: "bottom"
          });
          setTimeout(() => {
            instance.close();
          }, 600);
          return false;
        }
      } else {
        Toast({
          message: "密码不能为空...",
          position: "bottom"
        });
        setTimeout(() => {
          instance.close();
        }, 600);
        return false;
      }
      //   console.log(this.info)

      this.$axios({
        url: this.$apis.register,
        method: "post",
        data: this.info
      }).then(res => {
        if (res.data.code == 200) {
          Indicator.open("注册成功...");
          setTimeout(() => {
            Indicator.close();
            this.$router.push("/login");
          }, 600);
        }else{
            Indicator.open(res.data.msg);
          setTimeout(() => {
            Indicator.close();
            // this.$router.push("/login");
          }, 600);
        }
      });
    }
  }
};
</script>

<style scoped>
.bg {
  /* height: 100vh;
    margin-top: -.8rem;
    background-color: rgba(174, 178, 179, 0.801); */
  /* background: -webkit-linear-gradient(left, #88ada6, #d6ecf0); */
}
.mint-header {
  background-color: #f26b11;
  height: 0.8rem;
  /* box-sizing: border-box; */
  padding: 0.35rem 0.2rem 0.2rem;
}
.main {
  margin-top: 0.8rem;
}
.main .reg {
  width: 80%;
  transform: translateY(10%);
  margin: 0 auto;
}
.main .reg>i{
  display: block;
  font-size: 1rem;
  padding-bottom: .2rem;
  color: #f26b11;
  text-align: center;
}
.main .reg div {
  border: 0.01rem solid #f26b11;
  margin: 0.1rem 0;
  border-radius: 0.2rem;
  padding: 0.1rem 0.15rem;
  display: flex;
}
.main .reg div i {
  vertical-align: middle;
  font-size: 0.4rem;
}
.main .reg div input {
  flex: 1;
  height: 0.4rem;
  font-size: 0.28rem;
  padding: 0 0.05rem;
}
.main .reg p {
  margin: 0.2rem 0;
  background-color: #09b480;
  font-size: 0.3rem;
  color: #fff;
  line-height: 0.6rem;
  border-radius: 0.4rem;
  text-align: center;
}
.main .reg span {
  float: right;
  font-size: .25rem;
  color: rgb(168, 168, 240);
  text-decoration: underline;
}
</style>