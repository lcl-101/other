import Vue from 'vue';
import vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import Index from './index/index';
import List from './list/index';
import Detail from './detail/index';


const state = {
  header: '',
  from: ''
}

Vue.use(vuex);

export default new vuex.Store({ //store对象
  state,
  getters,
  actions,
  mutations,
  modules: {
    Index:Index,
    List:List,
    Detail:Detail
  }
})
