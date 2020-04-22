<template>
  <div class="tab-control">
    <div v-for="(item,index) in title"
     class="tab-control-item"
     :class="{active : index === currentIndex}"
     @click="tabBnt(index)"
     >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    name:'TabControl',
    data() {
      return{
        currentIndex:0
      }
    },
    props:{
      title: {
        type:Array,
        default() {
          return []
        }
      }
    },
    methods:{
      tabBnt(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped="scoped">
  .tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
