<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-contro2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <good-list :goods="showgoods"></good-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from '@/views/home/childComps/FeatureView'

// 公共组件
import NavBar from '@/components/common/navbar/NavBar.vue'
import TabControl from '@/components/content/tabcontrol/TabControl.vue'
import GoodList from '@/components/content/goods/GoodList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backtop/BackTop'
// 数据
// 因为home.js没有用default到处，因此需要用大括号引入
import { getHomeMultidata, getHomeGoods } from '@/network/home'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    // 展示数据
    showgoods() {
      return this.goods[this.currentType].list
    },
    // activeted() {
    //   this.$refs.scroll.scrollTo(0, this.saveY, 0), this.$refs.scroll.refresh()
    // },
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  created() {
    // 请求banner和recommends
    this.getHomeMultidata()
    // 请求商品数据

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    backClick() {
      console.log('jtl')
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 切换pop new sell
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 内容滚动发生的变化
    contentScroll(position) {
      // 判断backtop是否显示
      this.isShowBackTop = -position.y > 1000
      // 决定tabcontrol是否吸顶（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 加载更多数据
    loadMore() {
      console.log('shangla')
      this.getHomeGoods(this.currentType)
    },
    // 请求数据
    getHomeMultidata() {
      // 请求不会在首页发，然后再props传给子组件
      getHomeMultidata().then((res) => {
        // console.log('首页banner和recommends的请求数据')
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      // 请求是该类型的页码+1
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        // 把请求完成后的数据追加给list

        this.goods[type].list.push(...res.data.list)
        // 更新自身类型的页码
        this.goods[type].page += 1
        // console.log('goods的请求数据')
        // console.log(res)
        this.$refs.scroll.finishPullUp()
      })
    },
  },
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: pink;
  color: white;

  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
