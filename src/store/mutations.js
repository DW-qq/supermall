export default{
  addCounter(state,payload){
    /*payload.count +=1*/
    payload.count +=1
  },
  addToCart(state,payload){
    payload.check
    state.cartList.push(payload)
  }
}
