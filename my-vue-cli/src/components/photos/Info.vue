<template>
  <div class="photo-info">
    <header>
      <h2 class="title">{{info.title}}</h2>
      <p class="mui-ellipsis">
        <span>发表时间：{{info.add_time |date}}</span>
        <span>点击次数：{{info.click}}次</span>
      </p>
    </header>
     <div class="thumb-img">
      <!-- 使用 vue-preview 插件 -->
      <vue-preview :slides="list"></vue-preview>
    </div>
    
    <div class="content" v-html="info.content"></div>

    <!-- 评论功能 -->
   <Comments :commentId="info.id" ></Comments>
  </div>
</template>

<script>
import Comments from '@/components/common/commons.vue'
export default {
  data () {
    return {
      info:{},
      list:[],
       isLoaded: false
    }
  },

  created () {
    // 获取图片详情信息
    this.getImageinfo()
    // 获取缩略图
    this.getThumimages()
    
  },

  methods: {
      getImageinfo(){
          this.$http
          .get(`/api/getimageInfo/${this.$route.params.id}`)
          .then(res=>{
              this.info = res.data.message[0]
              console.log(res.data)
              this.isLoaded = true
          })
      },

    // 获取当前详情的缩略图信息
   
   getThumimages(){
        this.$http
          .get(`/api/getthumimages/${this.$route.params.id}`)
          .then(res=>{
             this.list= res.data.message.map(item=>{
                 return{
                     src:item.src,
                     msrc:item.src,
                     alt: '缩略图',
                     title: '缩略图',
                     w: 600,
                     h: 400
                 }
             })
          })
    },
   
  },
  components: { Comments }


}
</script>

<style lang="scss">
.photo-info {
  padding-left: 3px;
  padding-right: 3px;

  .thumb-img {
    border-top: 1px solid #ccc;

    .my-gallery {
      display: flex;
      flex-wrap: wrap;

      figure {
        width: 33.3333%;
        margin: 0;

        img {
          width: 100px;
          height: 100px;
          margin: 9px;
          box-shadow: 0 0 15px #ccc;
        }
      }
    }

  }

  .title {
    font-size: 18px;
    color: #26a2ff;
    text-align: center;
  }

  .mui-ellipsis {
    display: flex;
    justify-content: space-between;
    padding: 0 3px;
  }

  .content {
    font-size: 14px;
    line-height: 28px;
    padding-top: 20px;
  }
}
</style>
