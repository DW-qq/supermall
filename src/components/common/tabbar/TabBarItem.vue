<template>
  <div class="tab-bar-item" @click="bntItem()">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    props: {
      path:String,
      activeColor: {
        type:String,
        default: 'red'
      }
    },
    data(){
        return{

        }
      },
    computed:{
      isActive() {
        //indexOf()匹配下标
        //indexOf==-1为false
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    methods:{
      bntItem(){
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped="scoped">
  .tab-bar-item {
      flex: 1;
      text-align: center;
      height: 46px;
      font-size: 0.14rem;
      padding-top: 0.05rem;
    }

    .tab-bar-item img {
      width: 20px;
      height: 20px;
      margin: 5px 0;
      vertical-align: middle;
    }

    .tab-bar-item p {
      margin: 0;
    }
</style>
