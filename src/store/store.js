import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default  new Vuex.Store({
  state :{
    goodsNum:0,
    amount:0,
    cartId:''
  },
  mutations:{
    updateNum(state,num){
      state.goodsNum += num;
    },
    updateAmount(state,num){
      state.amount += num;
    }
  }
})
