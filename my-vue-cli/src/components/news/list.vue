<template>
    <div class="news_list">
        <ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id" @click="goPage(item.id)">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" 
                        :src="item.img_url">
						<div class="mui-media-body">
							<h3 class="mui-ellipsis news_title" v-text="item.title"></h3>
							<p class="news_info"> 
                                <span>发表时间：{{item.add_time | date }}</span>
                                <span>点击次数：{{item.click}}</span>
                            </p>
						</div>
					</a>
				</li>
				
			</ul>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            list:[]
        }
    },

    created(){
        this.getNewsList()
    },
    methods:{
        getNewsList(){
            this.$http
                .get("api/getnewslist")
                .then(res=>{
                    console.log(res)
                    this.list = res.data.message
                })
        },

        goPage (id){
            this.$router.push('/home/info' +id)
        }
    }
}
</script>

<style lang="scss">
    .news_list{
        .news_title{
            font-weight: 400;
            font-size: 16px;
        }
        .news_info{
            display: flex;
            justify-content: space-between;

            color: #26a2ff;
            font-size: 12px;
        }
        .mui-table-view-chevron .mui-table-view-cell{
            padding-right:50px;
        }
    }
</style>
