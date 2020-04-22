<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default{
    name:'Scroll',
    props:{
      probeType: {
        type:Number,
        default :0
      },
      pullUpLoad: {
        type:Boolean,
        default: false
      }
    },
    data() {
      return{
        scroll:null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      //监听滚动位置
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll' , (position) => {
          this.$emit('scroll',position)
        })
      }

      //加载完成
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp' , () => {
          this.$emit('pullUpLoad')
        })
      }


    },
    methods: {
      scrollTo(x,y,time=300) {
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      //刷新数据
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        /* console.log("jiji") */
       this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped="scoped">
  
</style>
