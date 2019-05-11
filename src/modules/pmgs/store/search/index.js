import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  comListAll:'',
  name: '全部公司',
  error: ''
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
