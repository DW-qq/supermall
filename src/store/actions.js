export default{
  addCart(context,payload){
    return new Promise((resolve,reject) =>{
      /* context.commit('addToCart',payload) */
      //find()数组函数：传入item return item.iid === payload.iid （等于为true 不等于为false）
      const oldInfo = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldInfo){
        context.commit('addCounter',oldInfo)
        console.log(oldInfo.count)
        resolve('商品数量+1')
      }else{
        context.commit('addToCart',payload)
        payload.count = 1
        resolve('成功添加商品')
      }
    })
  }
}
