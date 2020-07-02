<template>
  <div>
    <mt-header fixed title="商品列表页">
      <router-link to="/cate" icon="back" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="main">
      <!-- 搜索框 -->
      <div class="search">
        <input type="search" v-model.trim="searchText" placeholder="搜索商品" />
        <i class="iconfont icon-fangdajing" @click="search"></i>
      </div>
      <!-- 商品列表 -->
      <div class="list">
        <div
          class="item"
          v-for="goods of goodslist"
          :key="goods.id"
          @click="$router.push('/detail/'+goods.id)"
        >
          <img :src="goods.img" />
          <div class="txt">
            <h3>{{ goods.goodsname }}</h3>
            <span>￥{{ goods.price }}</span>
            <b>3625条评论</b>
          </div>
        </div>
        <div class="cont" v-show="goodslist.length == 0">
          <h3>暂无商品</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      goodslist: [],
      searchText: ""
    };
  },
  mounted() {
    Indicator.open("加载中...");

    // console.log("cateid:", this.$route.params,111);
    let text = this.$route.params.searchtext;
    if (text == undefined) {
      let data;
      if(this.$route.params.fid){//查询所有一级分类商品
        // console.log(this.$route.params,3111)
        data = {fid:this.$route.params.fid}
      }else{//查询所有二级分类商品
        // console.log(this.$route.params,3222)
        data = {sid:this.$route.params.cateid}
      }
      this.getcategoods(data);
    } else {
      this.searchText = text;
      this.search();
    }
  },
  methods: {
    // 搜索
    search(t) {
      if (!this.searchText) return;
      this.$axios({
        url: this.$apis.getsearch,
        params: { searchText: this.searchText }
      }).then(res => {
        if (res.data.code == 200) {
          Indicator.open("加载中...");
          setTimeout(() => {
            Indicator.close();
            //   this.searchText = "";
            if (res.data.list == null) {
              this.goodslist = [];
            } else {
              this.goodslist = res.data.list;
            }
          }, 600);
        } else {
          Indicator.open(res.data.msg);
          setTimeout(() => {
            Indicator.close();
            this.$router.push("/");
          }, 600);
        }
      });
    },
    //   获取商品信息
    getcategoods(data) {
      this.$axios({
        url: this.$apis.getcategoods,
        params: data
        // params: { sid: this.$route.params.cateid }
      }).then(res => {
        setTimeout(() => {
          Indicator.close();
          if (res.data.list == null) {
            this.goodslist = [];
          } else {
            this.goodslist = res.data.list;
          }
        }, 600);
      });
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
/* 搜索 */
.main .search {
  display: flex;
  width: 70%;
  height: 0.4rem;
  line-height: 0.4rem;
  margin: 0.2rem auto;
  border: 1px solid #f26b11;
  border-radius: 0.4rem;
  padding: 0.05rem 0.2rem;
  background-color: #fff;
  /* box-sizing: border-box; */
}
.main .search input {
  width: 88%;
  height: 0.4rem;
  text-align: center;
  color: #f26b11;
  vertical-align: text-bottom;
  font: 0.24rem/0.4rem "微软雅黑";
}
.main .search i {
  flex: 1;
  font-size: 0.4rem;
  color: #f26b11;
}
/* 商品列表 */
.main .list {
  width: 95%;
  margin: 0 auto;
}
.main .list .item {
  display: flex;
  justify-content: space-between;
  padding: 0.26rem 0;
  margin: 0.2rem 0;
  border-bottom: thin solid #d1d1d1;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.4);
  border-radius: 0.12rem;
  overflow: hidden;
}
.main .list .item img {
  width: 1.47rem;
  height: 1.6rem;
  padding: 0.08rem 0 0.08rem 0.2rem;
  /* box-sizing: border-box; */
}
.main .list .item .txt {
  flex: 1;
  width: 70%;
  display: flex;
  flex-direction: column;
  padding-left: 0.2rem;
}
.main .list .item h3 {
  font: 0.26rem/0.5rem "微软雅黑";
  color: #333;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.main .list .item span {
  font: 0.3rem/0.8rem "Arial";
  color: #e43a3d;
}
.main .list .item b {
  font: 0.26rem/0.4rem "微软雅黑";
  color: #9a9a9a;
}
.main .list .cont {
  font: 0.3rem/0.4rem "微软雅黑";
  text-align: center;
  padding: 2rem 0;
}
</style>