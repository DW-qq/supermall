<template>
  <div class="recommend-info">
    <div class="info-header">
      <span>热门推荐</span>
    </div>
    <good-list :goods="recommendList" class="recommendList"></good-list>

  </div>

</template>

<script>
  import GoodList from 'components/content/goods/GoodsList'
  export default{
    components:{
      GoodList
    },
    props:{
      recommendList:{
        type:Array,
        default(){
          return[]
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .info-header{
    margin: 20px 12px;
  }
</style>
