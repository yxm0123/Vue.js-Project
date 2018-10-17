<template>
    <div class="comment">
      <h3>发表评论</h3>
      <textarea cols="30" rows="6" placeholder="请输入评论内容" v-model="content"></textarea>
      <mt-button type="primary" size="large" @click="sendComent">发表评论</mt-button>
      <ul class="comment-list">
        <li class="comment-item" v-for="(item,i) in list" :key="i">
          <h4>
            <span>第{{i + 1}}楼</span>
            <span>用户：{{item.user_name}}</span>
            <span>发表时间：{{item.add_time |date}}</span>
          </h4>
          <p v-text="item.content"></p>
        </li>
      </ul>
      <mt-button type="primary" plain size="large" @click="getMoreList">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    props:['commentId'],

    watch:{
        commentId(curVal){
           this.getCommentList()
        }
    },
    data(){
        return{
            list:[],
            pageIndex: 0,
            content:''
        }
    },
    created() {
        if(!this.commentId){
            return
        }
         this.getCommentList()


    },
    methods:{
        //加载更多
        getCommentList(){
            this.$http
                .get(`/api/getcomments/${this.$route.params.id}?pageindex=1`)
                .then(res=>{
                    console.log(res)
                    this.list = res.data.message
                })
        },
        getMoreList(){
        this.pageIndex++
            this.$http
            .get(`/api/getcomments/${this.$route.params.id}?pageindex=${this.pageIndex}`)
            .then(res=>{
                console.log(res)
                // this.list = this.list.concat(res.data.message)
                this.list =[...this.list,...res.data.message]
        })
    },
    //发表评论
    sendComent(){
            if(this.content.trim()===''){
                return 
            }
            this.$http
             .post(`/api/postcomment/${this.$route.params.id}`,`content=${this.content}`)
             .then(res=>{
                 console.log("评论数据",res)
                 this.list.unshift({
                     add_time:new Date(),
                     content:this.content,
                     user_name:"匿名用户"
                 })
                 this.content=''
             })

             
        }
 }
}
</script>

<style lang="scss" scoped>
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
