import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  itemInfo:'',
  logoUrl:'',
  error: ''
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
