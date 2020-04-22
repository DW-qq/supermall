<template>
    <div class="bar-bg">
      <div class="check-content">
        <CheckButton :is-checked="isSelcetAll" @click.native="isCheck"  class="check-button" />
        <span class="check-span">全选</span>
      </div>

      <div class="price">
        合计：{{totalPrice}}
      </div>

      <div class="calculate" @click="calculateBtn">
        去结算{{checkLength}}
      </div>
    </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton";
    //Vuex提供的mapGetters的属性把getters转换成computed
    import {mapGetters} from 'vuex'
    export default {
        name: "CartBottomBar",
      components: {CheckButton},
      computed:{
          ...mapGetters(['cartList']),
        totalPrice(){
          return "￥"+this.$store.state.cartList.filter(item => {
            return item.check
          }).reduce((previousValue, currentValue) => {
            return previousValue+currentValue.newPrice*currentValue.count
          },0).toFixed(2)
        },
        checkLength(){
          return "("+this.$store.state.cartList.filter(item => item.check).length+")"
        },
        isSelcetAll(){
          //判断有购物车有没有商品
          if(this.$store.state.cartList.length === 0) return false
          //普通方法：遍历
         /* for(let item of this.$store.state.cartList){
            if(!item.check){
              return  false
            }
            return true
          }*/
         //filter数组函数
          /*return !(this.$store.state.cartList.filter(item => !item.check).length)*/
          //filter数组函数(如果有一个不选中则为false)
            return !this.cartList.find(item => !item.check)
        }
      },
      methods:{
        isCheck(){
          if(this.isSelcetAll){
            //全部不选中
            this.cartList.forEach(item => item.check = false)
          }else {
            //部分不选中
            this.cartList.forEach(item => item.check = true)
          }
        },
        calculateBtn(){
        this.$toast("axa")
        }
      }
    }
</script>

<style scoped>
    .bar-bg{
      background-color: #eee;
      position: relative;
      height: 40px;
      bottom: 20px;
      line-height: 40px;
      display: flex;
    }
    .check-content{
      width: 100px;
      display: flex;
      align-items: center;
      width: 80px;
    }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
  }
  .check-span{
    margin-left: 10px;
  }
  .price{
    font-size: 15px;
    flex: 1;
  }
  .calculate {
    background-color: red;
    text-align: center;
    width: 80px;
    color: #fff;
    height: 40px;

  }
</style>
