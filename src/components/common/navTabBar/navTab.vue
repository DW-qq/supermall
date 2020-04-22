<template>
  <div class="nav-tab">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default{
    name:'NavTabBar',
  }
</script>

<style scoped="scoped">
  .left,.right{
    width: 60px;
    /* background-color: #000088; */
  }
  .center{
    flex: 1;
  }
  .nav-tab{
    display: flex;
    line-height: 40px;
    height: 40px;
    text-align: center;
    /* background-color: brown; */
  }
</style>
