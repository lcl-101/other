import Vue from 'vue';
import vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import Index from './index/index';
import Company from './company/index';
import Auction from './auction/index';
import Special from './special/index';
import Detail from './detail/index';
import Search from './search/index';
import List from './list/index';

const state = {
  header: '',
  from: '',
  recruitScrollY: 0
}

Vue.use(vuex);

export default new vuex.Store({ //store对象
  state,
  getters,
  actions,
  mutations,
  modules: {
    Index:Index,
    Company:Company,
    Auction:Auction,
    Special:Special,
    Detail:Detail,
    Search:Search,
    List:List
  }
})
