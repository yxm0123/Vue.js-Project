<template>
  <div id="app">
    <mt-header title="快乐购" fixed>
    <router-link to="/" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    </mt-header>

    <!-- 路由出口 -->
    <router-view class="content"></router-view>


     <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home" @click.native="goPage('/home')"> 
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link >
			<router-link class="mui-tab-item" to="/vip" @click.native="goPage('/vip')">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item"  to="/cart" @click.native="goPage('/cart')">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{ $store.getters.allCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item"  to="/search" @click.native="goPage('/search')">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
 
</template>

<script>
export default {
  methods: {
    goPage(path) {
      this.$router.push(path);
    }
  }
};

</script>
  
<style scoped>
.content {
  padding-top: 40px;
  padding-bottom: 60px;
}
.mint-header {
  background-color: orangered;
}
.mui-bar-tab .mui-tab-item.mui-active {
  color: orange;
}
.mint-header-title {
  font-size: 20px;
}
</style>
