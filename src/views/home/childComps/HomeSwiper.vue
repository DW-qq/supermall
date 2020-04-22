<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="swiperLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banners: {
        type:Array,
        default() {
          return []
        }
      }
    },
    data() {
      return{
        isLoad: false
      }
    },
    methods:{
     swiperLoad() {
      if(!this.isLoad) {
          this.$emit('swiperImgLoad');
          this.isLoad = true
        }
      }

    }
  }
</script>

<style>
</style>
