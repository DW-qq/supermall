<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar'
  }
</script>

<style scoped="scoped">
#tab-bar{
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  right: 0px;
  bottom: 0px;
  left: 0px;
  box-shadow: 0px -3px 1px rgba(100,100,100,0.05);
}

</style>
