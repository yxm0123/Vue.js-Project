<template>
  <div class="goods-list">
    <ul>
      <li class="goods-item" v-for="item in list" :key="item.id" @click="goPage(item.id)">
        <img :src="item.img_url" alt="">
        <h2>{{item.title}}</h2>
        <div>
          <span class="price-cur">￥{{item.sell_price}}</span>
          <span class="price-prev">￥{{item.market_price}}}</span>
        </div>
        <p>
          <span>热卖中</span>
          <span>{{item.stock_quantity}}</span>
        </p>
      </li>

    </ul>

    <!-- 加载更多 -->
    <mt-button v-if="hasmore" plain size="large" type="primary" @click="loadMore">加载更多</mt-button>
     <p class="no-more" v-else>亲，没有更多数据了~</p>
  </div>
</template>

<script>

  export default {
      data(){
          return {
              list:[],
              pageIndex:1,
              hasmore:true
          }
      },
      created() {
          this.getGoodsList()
      },
      methods:{
          //获取列表数据
          getGoodsList(){
              this.$http
                .get(`/api/getgoods?pageindex=${this.pageIndex}`)
                .then(res=>{
                    console.log("商品详情中的数据",res.data.message)
                    this.list = [...this.list,...res.data.message]

                    if(res.data.message.length <10){
                        this.hasmore = false
                    }
                })
          },
        //加载更多
          loadMore(){
              this.pageIndex ++
              this. getGoodsList() 
          },
          goPage (id) {
            this.$router.push(`/home/goodsinfo/${id}`)
        }
      }
  }
</script>

<style lang="scss">
  .goods-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .goods-item {
      width: 48%;
      margin: 1%;
      padding: 3px;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px #ccc;

      h2 {
        font-size: 14px;
      }

      div {
        font-size: 14px;
        margin-top: 5px;

        .price-cur {
          color: #f00;
          margin-right: 10px;
        }
        .price-prev {
          text-decoration: line-through;
          color: #ccc;
        }
      }

      img {
        width: 100%;
      }

      p {
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 0 3px;
        color: #ccc;
      }
    }
  }
</style>