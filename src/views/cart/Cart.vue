<template>
  <div class="cart-list">
    <nav-tab class="nav-bar">
      <div slot="center">购物车({{cartLenght}})</div>
    </nav-tab>
    <scroll class="content" ref="scroll">
      <!--li{内容$}*1000-->
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/>

    </scroll>
    <CartBottomBar/>
  </div>

</template>

<script>
  import scroll from 'components/content/scroll/scroll'

  import navTab from 'components/common/navTabBar/navTab'

  import CartList from "./childComps/CartList";
  import CartListItem from "./childComps/CartListItem";

  //Vuex提供的mapGetters的属性把getters转换成computed
  import {mapGetters} from 'vuex'
  import CartBottomBar from "./childComps/CartBottomBar";
  export default{
    components:{
      CartBottomBar,
      navTab,
      CartList,
      CartListItem,
      scroll
    },
    computed:{
      //两种语法
      //方法一
      //...mapGetters(['cartLenght','...','...'])
      //方法二（如果名字不一致可以传对象）
      /* ...mapGetters({
        length:'cartLenght'
      }) */
      ...mapGetters(['cartLenght','cartList']),


    },
    //添加数据时刷新
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped="scoped">
  .cart-list{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .content{
    height: calc(100% - 49px - 49px);
    position: relative;
    z-index: 1;
    overflow: hidden;
  }
</style>
