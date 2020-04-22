<template>
  <div>
    <button @click="show()"></button>
    <h2>我的{{a}}</h2>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        a:''
      }
    },
    methods:{
      show(){
        this.a = "nsiaj"
      }
    }
  }
</script>

<style>
</style>
