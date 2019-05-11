import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  categoryInfo:'',
  itemData:'',
  comName:'',
  logoUrl:'',
  preImgUrl:'',
  articleImgUrl:'',
  recruitScrollY:'',
  specialInfo:'',
  list:'',
  page:1,
  error: ''
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
