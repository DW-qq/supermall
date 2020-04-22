<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titlesClick="titlesClick" ref="nav"/>
   <scroll class="content" ref="content" :probe-type ="3" @scroll="contentScroll" >
      <!--<div>{{$store.state.cartList}}</div> -->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" ></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <detail-recommend-info :recommendList="recommendList" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isbackTop"/>
  </div>
</template>

<script>
  import scroll from 'components/content/scroll/scroll'
  import GoodList from 'components/content/goods/GoodsList'

  import DetailSwiper from './childComps/DetailSwiper'
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import Toast from "../../components/common/toast/Toast";



  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {itemListenerMixin,backTopMixin} from 'common/mixin'
  import {debounce} from 'common/const'
  import { mapActions } from 'vuex'

  export default {
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailGoodsInfo,
      DetailBaseInfo,
      DetailShopInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      GoodList,
      scroll,
      DetailBottomBar,
      Toast
    },
    data() {
      return {
        iid:null,
        topImages:null,
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommendList:[],
        itemImgListenter:null,
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:null,
        isbackTop:false,
        message:''

      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created() {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result

        this.topImages = data.itemInfo.topImages

        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        this.shop = new Shop(data.shopInfo)

        this.detailInfo = data.detailInfo
        // 2.6.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }

        /* this.$nextTick( ()=>{
          this.themeTopYs = []

          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs)
        }) */

      })

      getRecommend().then(res => {
        this.recommendList = res.data.list
      })

      this.getThemeTopY = debounce( () => {
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        /*console.log(this.themeTopYs)*/
      },100)
    },
    mounted() {

     },
     //取消
     destroyed() {
       this.$bus.$off('itemImageLoad',this.itemImgListenter)
     },
     methods:{
      ...mapActions(['addCart']),
       detailImageLoad() {
         this.newRefresh()
         this.getThemeTopY()
       },
       titlesClick(index){
         this.$refs.content.scrollTo(0,-this.themeTopYs[index],100)
       },
       contentScroll(position){
         //1.获取Y值
         const positionY = -position.y
         //2.positionY和主题的值进行对比
         for(let i in this.themeTopYs){
           let length = this.themeTopYs.length
           if((this.currentIndex !== parseInt(i)) && positionY >= this.themeTopYs[parseInt(i)] && positionY <this.themeTopYs[parseInt(i)+1]){
             this.currentIndex = parseInt(i)
             this.$refs.nav.currentIndex = this.currentIndex
           }
           /* if(this.currentIndex !== parseInt(i) && (i< length-1 && positionY>=this.themeTopYs[parseInt(i)] && positionY<this.themeTopYs[parseInt(i)+1])
           || ( parseInt(i) === length-1 && positionY >= this.themeTopYs[i])){
             this.currentIndex = parseInt(i)
             this.$refs.nav.currentIndex = this.currentIndex
           } */
         }
         //1.判断BackTop是否显示
        this.listenShowBackTop(position)
       },
       addToCart(){
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        obj.count = this.goods.count;
        obj.check = this.goods.check;

        // 3.添加到Store中
        /* this.$store.cartList.push(obj) */
        //用mutations的提交方式
       /* this.$store.commit('addCart',obj); */
        //用actions
        /*this.$store.dispatch('addCart',obj);*/
        this.addCart(obj).then(res => {
          this.$toast(res,2000)

        })
       }
     }
  }
</script>

<style scoped="scoped">
  #detail {
    height: 100vh;
    background-color: #FFF;
    z-index: 1;
    position: relative;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
    background-color: white;
    width: 100%;
    height: calc(100% - 49px - 49px);

  }

</style>
