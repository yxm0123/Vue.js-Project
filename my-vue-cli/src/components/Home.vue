<template>
    <div class="home">
        <!-- 轮播图 -->
        <div class="swiper">
            <mt-swipe :auto="4000" :speed="1000">
                <mt-swipe-item v-for="item in list" :key="item.id">
                    <img :src="item.img" :alt="item.url">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 九宫格菜单 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/list">
                    <span class="mui-icon mui-icon-1"></span>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
             </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="home/photolist">
                    <span class="mui-icon mui-icon-2"></span>
                    <div class="mui-media-body">图片分享</div>
                </router-link>
             </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <span class="mui-icon mui-icon-3"></span>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-4"></span>
                    <div class="mui-media-body">留言反馈</div>
                </a>
             </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-5"></span>
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-6"></span>
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
            
		  </ul>
    </div>
</template>
<script>
    import axios from "axios"
    export default{

        data() {
            return {
            // 轮播图数组
            list: []
            }
        },

        created(){
            this.getLunbo()
        },
        methods:{
            getLunbo(){
                axios
                .get("http://www.liulongbin.top:3005/api/getlunbo")
                .then(res=>{
                    this.list = res.data.message
                    console.log(this.list)
                    console.log(res.data)
                })
            }
        }
    }
</script>
<style lang="scss">
    .home{
        .swiper{
            height: 200px;

            
            img {
            width: 100%;
            height: 200px;
            }

            .mint-swipe-indicator{
                opacity: 0.7;
            }
        }

        .mui-grid-view.mui-grid-9 {
            border: 0;
            background-color: #fff;
        }
        .mui-grid-view.mui-grid-9 .mui-table-view-cell{
            border: 0;
        }
        .mui-icon {
            width: 60px;
            height: 60px;
            background-size: cover;
        }
        .mui-icon-1{
           background-image: url(../assets/images/menu1.png)
        }
        .mui-icon-2{
           background-image: url(../assets/images/menu2.png)
        }
         .mui-icon-3{
           background-image: url(../assets/images/menu3.png)
        }
         .mui-icon-4{
           background-image: url(../assets/images/menu4.png)
        }
         .mui-icon-5{
           background-image: url(../assets/images/menu5.png)
        }
         .mui-icon-6{
           background-image: url(../assets/images/menu6.png)
        }
        .mui-table-view-cell{
            width: 33.3%;
        }
    }
</style>
