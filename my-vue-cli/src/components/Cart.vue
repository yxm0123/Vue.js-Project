<template>
  <div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cart" v-for="item in list" :key="item.id">
          <mt-switch v-model="item.isChecked"></mt-switch>
          <img data-v-0505f5cb="" :src="item.thumb_path" alt="">
          <div>
            <h2 data-v-0505f5cb="">{{item.title}}</h2>
            <div data-v-0505f5cb="" class="info">
              <span data-v-0505f5cb="">￥{{item.sell_price}}}</span>
              <CartNumberBox
                :initCount="item.count"
                :id="item.id"
                @changeCount="changeCount"
              ></CartNumberBox>
              <a data-v-0505f5cb="" href="#"
                @click.prevent="delCods(item.id)"
              >删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cart-buy">
          <div>
            <p>总计（不包含运费）</p>
            <p>已勾选商品&nbsp;
              <span>{{checkedCount}}</span>&nbsp;件&nbsp;&nbsp;总价：
              <span>￥{{checkedPrice}}</span>
            </p>
          </div>
          <div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartNumberBox from "@/components/common/CartNumberBox";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getCartinfo();
  },
  methods: {
    //获取购物车详情
    getCartinfo() {
      const ids = this.$store.getters.ids;
      const id2Count = this.$store.getters.id2Count;

      this.$http.get(`/api/goods/getshopcarlist/${ids}`)
      .then(res => {
        console.log("购物详情", res);
        // this.list = res.data.message
        // console.warn(this.list)
        this.list = res.data.message.map(item => {
          return {
            ...item,

            //开关
            isChecked: true,
            count: id2Count[item.id]
          }
        })
      })
    },

    //修改购物车
    changeCount(id, count) {
      // 根据id获取到商品
      const goods = this.list.find(item => item.id === id - 0);
      // 修改当前商品的数量
      goods.count = count;
      console.log(goods.count)
    },

    //删除商品
    delCods(id){
        for(let i = 0;i<this.list.length;i++){
            if(this.list[i].id === id){
                this.list.splice(i,1)
                break
            }
        }
    }

  },
 
 //监听list中数据的变化
    watch:{
        list:{
            deep:true,
            handler(curlist){
                const newList = curlist.map(item=>{
                    return {
                        id:item.id,
                        count:item.count
                    }
                })

                this.$store.commit('changeCart',{newList})
            }
        }
    },

    computed:{
        checkedCount(){
            let count = 0

            this.list.forEach(item=> {
                if(item.isChecked){
                    count +=item.count
                }
            })
            return count
        },
        checkedPrice(){
            let allPrice = 0

            this.list.forEach(item=>{
                if(item.isChecked){
                    allPrice += item.count * item.sell_price
                }
            })

            return allPrice
        }
        
    },
  components: { CartNumberBox }
};
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 14px;
  }

  img {
    height: 60px;
  }

  span {
    color: #f00;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.cart-buy {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #f00;
  }
}
</style>