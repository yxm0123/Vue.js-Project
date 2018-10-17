<template>
  <div>
    <div class="mui-slider mui-fullscreen">
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a href="#" class="mui-control-item" 
                 :class="{'mui-active': item.id === 0 }"
                 v-for="item in listCatgro" :key="item.id"
                 @click.prevent="getPotoImg(item.id)">
                        {{item.title}}
                </a>
            </div>
        </div>
	</div>

		<!-- 图片列表 -->
	<ul class="category-img-list">
        <li class="img-list-item" v-for="item in list" :key="item.id" @click="goPage(item.id)">
            <img :src="item.img_url" lazy="loaded"> 
            <div>
            <h2 v-text="item.title"></h2>
            <p v-text="item.content"></p>
            </div>
        </li>
     
    </ul>
  </div>
</template>

<script>
import mui from "../../libs/mui/js/mui";
export default {
  data() {
    return {
      list: [],
      listCatgro: []
    };
  },
  created() {
    this.getPotoImg(0), this.getListTop();
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    getPotoImg(id) {
      this.$http.get(`/api/getimages/${id}`)
      .then(res => {
        console.log(res);
        this.list = res.data.message;
      });
    },

    getListTop() {
      this.$http.get("/api/getimgcategory").then(res => {
        console.log("顶部的数据", res);
        this.listCatgro = [{id: 0, title: '全部'}, ...res.data.message]
      })
    },

    //获取图片详情
    goPage(id){
      this.$router.push(`/home/infolist/${id}`)
    }
  }
};
</script>

<style lang="scss">
.mui-slider-indicator.mui-segmented-control {
  background-color: #fff;
}

.mui-fullscreen {
  position: fixed;
  top: 40px;
  height: 38px;
}

/* scroll滚动警告的处理方式参考：http://www.jianshu.com/p/baf61adc8667 */
* {
  touch-action: none;
}

.category-img-list {
  list-style: none;
  padding: 5px;
  padding-top: 30px;

  .img-list-item {
    position: relative;
    margin-bottom: 5px;

    div {
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;

      h2 {
        font-size: 16px;
      }

      p {
        color: #fff;
        margin-bottom: 0px;
      }
    }

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
