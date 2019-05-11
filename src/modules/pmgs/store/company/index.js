import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  comInfo: '',
  addrInfo:'',
  impression:'',
  categoryList:'',
  logoUrl:'',
  recruitScrollY:'',
  error: ''
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
