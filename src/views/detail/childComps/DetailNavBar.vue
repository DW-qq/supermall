<template>
  <navTab class="nav-bar">
    <div slot="left" class="left" @click="imagesClick()">
      <img src="~assets/img/common/back.svg" />
    </div>
    <div slot="center" class="center">
      <div  v-for="(item,index) in titles" class="titles" :class="{active : index === currentIndex}" @click="titlesClick(index)">
        {{item}}
      </div>
    </div>
  </navTab>

</template>

<script>
  import navTab from 'components/common/navTabBar/navTab.vue'
  export default{
    data() {
      return{
        titles:['商品' , '参数' , '评论' , '推荐'],
        currentIndex:0
      }
    },
    components:{
      navTab
    },
    methods:{
      titlesClick(index) {
        this.currentIndex = index
        this.$emit('titlesClick',index)
      },
      imagesClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped="scoped">
  .nav-bar{
    position: relative;
    z-index: 9;
    background-color: #FFF;
  }
  .left{
    margin-top: 7px;
  }
.center{
  display: flex;
  font-size: 15px;
}
.titles{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}

</style>
