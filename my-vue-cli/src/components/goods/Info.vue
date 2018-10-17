<template>
  <div class="goods-info">
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 轮播图组件 -->
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, i) in imgList" :key="i">
              <img :src="item.src" alt="商品轮播图">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>

    <!-- 飞舞的小球 -->
    <!-- <transition 
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter">
      <div class="ball" v-show="isShow"></div>
    </transition> -->

    <!-- 商品数据展示 -->
    <div class="mui-card">
      <div class="mui-card-header" v-text="info.title"></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner info">
          <p>
            <span class="market-price">市场价：<del>￥{{ info.market_price }}</del></span> 
            <span>
            销售价：
            <span class="sell-price">￥{{ info.sell_price }}</span>
            </span>
          </p>
          <div class="numbox-container">
            购买数量：<NumberBox
             :maxCount="info.stock_quantity"
             @getNumberBoxcount = "getNumberBoxcount"
            ></NumberBox>
            {{count}}
            
          </div>
          <div>
            <mt-button type="primary">立即购买</mt-button>
            <mt-button type="danger" @click="addCart">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ info.goods_no }}</p>
          <p>库存情况：{{ info.stock_quantity }}件</p>
          <p>上架时间：{{ info.add_time | date('YYYY-MM-DD') }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// import Numberbox from "@components/common/NumberBox";
import NumberBox from '@/components/common/NumberBox.vue'
export default {
 
  data () {
    return {
      // 商品轮播图数组
      imgList: [],
      // 商品详情数据
      info: {},
      //NumberBox中的数据
      count:0
    }
  },
   created () {
    this.getGoodsImgs()
    this.getGoodsInfoById()
  },


  methods: {
    // 获取商品轮播图数据
    getGoodsImgs () {
      this.$http
        .get(`/api/getthumimages/${this.$route.params.id}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            this.imgList = data.message
          }
        })
    },

    // 获取商品详情数据
    getGoodsInfoById () {
      this.$http
        .get(`/api/goods/getinfo/${this.$route.params.id}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            this.info = data.message[0]
          }
        })
    },
    // 获取子组件传递过来的数据
    getNumberBoxcount(data){
      this.count = data
    },
   //点击加入购物车 获取到子组件传递过来的数量
    addCart(){
      console.log("加入购物车成功了")
      this.$store.commit('addCart',{id:this.$route.params.id ,count:this.count})
    }
   

  },
 components: { NumberBox }
  
}
</script>

<style lang="scss">
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      text-align: center;

      img {
        height: 100%;
        // width: 100%;
      }
    }
  }

  .info {

    p {
      color: #000;

      .market-price {
        margin-right: 10px;
      }

      .sell-price {
        color: #f00;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .mui-numbox {
      height: 25px;
    }

    .numbox-container {
      margin-bottom: 10px;
    }

    .mint-button {
      font-size: 14px;
      height: 34px;
    }
  }

  .mui-card-footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
  }

  .ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #f00;
    position: absolute;
    z-index: 11;
    top: 385px;
    left: 151px;
    /* 通过 贝塞尔曲线 设置动画效果 */
    transition: all 0.6s cubic-bezier(.52,-0.54,.83,.67);
  }
</style>
