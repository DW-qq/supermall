<template>
  <div id="home">
    <nav-tab class="home-nav">
      <div slot="center">购物街</div>
    </nav-tab>
     <tab-control :title="['流行' , '新款' ,'精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="content"
           :probe-type ="3"
           @scroll="contentScroll"
           :pull-up-load="true"
           @pullUpLoad = "loadMore"
           >
      <home-swiper :banners="banners"  @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行' , '新款' ,'精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <good-list :goods="goods[currentType].list"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isbackTop"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import navTab from 'components/common/navTabBar/navTab'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import scroll from 'components/content/scroll/scroll'

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  import {itemListenerMixin,backTopMixin} from 'common/mixin'

  export default{
    name:'Home',
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      navTab,
      TabControl,
      GoodList,
      scroll
    },
    data() {
      return{
         banners:[],
         recommends:[],
         goods: {
           'pop': {page: 0,list: []},
           'new': {page: 0,list: []},
           'sell': {page: 0,list: []},
         },
         currentType:'pop',
         isbackTop:false,
         tabOffseTop:0,
         isTabFixed:false,
         saveY:0,
         itemImgListenter:null,

      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    activated() {
      this.$refs.content.scrollTo(0,this.saveY,0)
      this.$refs.content.refresh()
    },
    deactivated() {
      //保存y值
      this.saveY = this.$refs.content.scroll.y
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListenter)

    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      /* //这个地方img标签的确被挂载，但是其中的图片还没有占据高度
      //this.$refs.content.refresh对这个函数进行防抖操作
      const refresh = debounce(this.$refs.content.refresh,200)
      //监听图片加载
      this.itemImgListenter = () => {  refresh() }
      this.$bus.$on('itemImageLoad' , this.itemImgListenter) */
    },
    methods:{
      /* 事件监听相关方法 */

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
           }
           //保存当前状态
           this.$refs.tabControl1.currentIndex = index;
           this.$refs.tabControl2.currentIndex = index
        },
        contentScroll(position) {
          //1.判断BackTop是否显示
          this.listenShowBackTop(position)
         //2.决定tabControl是否吸顶(position: fixed)
         this.isTabFixed = (-position.y) > this.tabOffseTop
        },
        loadMore() {
          this.getHomeGoods(this.currentType);
        },
        swiperImgLoad() {
          /* console.log(this.$refs.tabControl.$el.offsetTop) */
          this.tabOffseTop = this.$refs.tabControl2.$el.offsetTop
        },
      getHomeMultidata(){
        /* 网络请求相关方法 */
        getHomeMultidata().then( res =>{
          /* console.log(res.data.recommend.list); */
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res => {
          /* console.log(res.data.list); */
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1
          this.$refs.content.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped="scoped">
  #home{
    padding-top: 40px;
    height: 100vh;
    /* position: relative; */
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #FFFFFF;
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9;
  }
 /* .tab-control{
    position: sticky;
    top: 40px;
    background-color: white;
  } */
  /* .content{
    height: 550px;
    overflow: hidden;
    } */
    .content {
      overflow: hidden;
      position: absolute;
      top: 40px;
      bottom: 49px;
      left: 0;
      right: 0;
    }
    .tab-control {
      position: relative;
      z-index: 9;
      }
</style>
