import {debounce} from './const'
import backTop from 'components/content/backTop/backTop'

export const itemListenerMixin = {

  data(){
    newRefresh:null

  },
  mounted() {
    //这个地方img标签的确被挂载，但是其中的图片还没有占据高度
    //this.$refs.content.refresh对这个函数进行防抖操作
     this.newRefresh = debounce(this.$refs.content.refresh,200)
    //监听图片加载
    this.itemImgListenter = () => {  this.newRefresh() }
    this.$bus.$on('itemImageLoad' , this.itemImgListenter)
  }
}

export const backTopMixin = {
  components:{
    backTop
  },
  data(){
    isbackTop:null
  },
  methods:{
    backClick() {
      this.$refs.content.scrollTo(0,0 )
    },
    listenShowBackTop(position){
      //1.判断BackTop是否显示
      this.isbackTop = (-position.y) > 1000
    }
  }

}
