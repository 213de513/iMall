import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default  new Vuex.Store({
  state :{
    goodsNum:0
  },
  mutations:{
    updateNum(state,num){
      state.goodsNum += num;
    }
  }
})
