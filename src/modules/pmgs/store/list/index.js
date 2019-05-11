import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  error: '',
  itemName:'',
  itemPicUrl:'',
  itemList: '',
  list: [],
  pager:'',
  recruitScrollY:'',
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
