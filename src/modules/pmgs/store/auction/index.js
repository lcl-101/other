import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  categoryInfo: '',
  specialInfo: '',
  logoUrl:'',
  preImgUrl:'',
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
