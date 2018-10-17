<template>
    <div class="news-info">
    <h3 class="news-title" v-text="info.title"></h3>
    <p class="news-desc">
      <span>发表时间:{{info.add_time | date}}</span>
      <span>点击次数：{{info.click}}次</span>
    </p>

    <!-- 内容 -->
    <div class="content" v-html="info.content"></div>

    <!-- 评论组件 -->
    <Comments :commentId="info.id"></Comments>
  </div>
</template>

<script>
import Comments from '@/components/common/commons.vue'
export default {
    data(){
        return{
            info:{},
            isLoaded: false
        }
    },
    created() {
        this.getInfo()
        // this.getCommentList()
    },
    methods:{

        getInfo(){
            this.$http
                .get(`/api/getnew/${this.$route.params.id}`)
                .then(res=>{
                    console.log("详情返回的数据",res);
                    const data = res.data
                    if(data.status===0){
                        this.info = data.message[0]
                    }
                    this.isLoaded = true
             })
        }
        
       
        // 发表评论
        
    },
    components: {
    Comments
  }

}
</script>


<style lang="scss" scoped>
  .news-info {
    padding-left: 5px;
    padding-right: 5px;

    .news-title {
      font-size: 18px;
    }
    .news-desc {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      font-size: 12px;
      color: #26a2ff;
    }

    .content {
      margin-bottom: 30px;
      border-bottom: 1px solid #ccc;
    }
  }

  .comment {
    .comment-item {
      h4 {
        display: flex;
        justify-content: space-between;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        font-weight: normal;
        background-color: #eee;
      }

      p {
        padding: 5px 10px;
        color: #000;
      }
    }
  }
</style>

<style lang="scss">
