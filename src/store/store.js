import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

let store = new Vuex.Store({
  // 1. state
  state:{
    article: {}
  },

  // // 2. getters
  getters:{
    // 参数列表state指的是state数据
    getCityFn(state){
      return state.article;
    }
  },
  // 3. actions
  // 通常跟api接口打交道
  actions:{
    // 设置城市信息
    // 参数列表：{commit, state}
    // state指的是state数据
    // commit调用mutations的方法
    // name就是调用此方法时要传的参数
    setCityName({commit,state}, name){
      // 跟后台打交道
      // 调用mutaions里面的方法
      commit("setCity", name);
    }
  },
  // 4. mutations
  mutations:{
    // state指的是state的数据
    // name传递过来的数据
    setCity(state, name){
      state.city = name;//将传参设置给state的city
    }
  }
});

export default store;
