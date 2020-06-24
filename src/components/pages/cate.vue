<template>
  <div>
    <mt-header fixed title="商品分类页">
        <router-link to="/" icon="back" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="main">
        <div class="left">
            <ul>
                <li
                    v-for="(item,idx) of catesarr" :key="idx"
                    :class="{active:btnactive == idx}"
                    @click="btnactive = idx"
                >{{ item.catename }}</li>
            </ul>
        </div>
        <div class="right">
            <!-- 二级分类 -->
            <div class="list"
                v-for="(item,idx) of catesarr" :key="idx"
                v-show="btnactive == idx"
            >
                <div class="item"
                     v-for="goods of item.children" :key="goods.id"
                     @click="tolist(goods.pid)"
                >
                    <img :src="goods.img">
                    <h4>{{ goods.catename }}</h4>
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
            catesarr:[],
            btnactive:0,
        }
    },
    methods:{
        // 跳转列表list页面
        tolist(id){
            this.$router.push('/cate/'+id);
        }
    },
    mounted(){
        this.$axios.get(this.$apis.getcatelist).then(res=>{
            this.catesarr = res.data.list;
        })
    },
};
</script>

<style scoped>
.mint-header{
    background-color: #f26b11;
    height: .8rem;
    /* box-sizing: border-box; */
    padding: 0.35rem 0.2rem 0.2rem;
}
.main{
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
}
.main .left{
    width: 1.6rem;
    border-right: 1px solid #d9d9d9;
    flex-shrink: 0;
}
.main .left ul{
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
}
.main .left ul li{
    display: flex;
    justify-content: center;
    margin: .2rem 0; 
    font: 0.22rem/0.4rem "微软雅黑";
    text-align: center; 
    border-left: .06rem solid transparent;
}
.main .left ul .active,.main .left ul li:hover{
    border-left: .06rem solid #f26b11;
    color: #f26b11;
}
.main .right{
    flex: 1;
    padding: 0 .04rem;
}
.main .right .list{
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around; */
    padding: 0.2rem 0 0 .15rem;
    box-sizing: border-box;
}
.main .right .list .item{
    text-align: center;
    width: 30%;
    border: 1px solid #d9d9d9;
    border-radius: .12rem;
    overflow: hidden;
    margin: .04rem .03rem;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.4);
}
.main .right .list .item img{
    width: 1.4rem;
    height: 1.45rem;
}
.main .right .list .item h4{
    font: 0.22rem/0.4rem "微软雅黑";
    color: #868686;
    /* 超出显示省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
}


</style>