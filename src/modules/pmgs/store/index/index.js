import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  previewList: '',            //拍卖预展
  comListBj:'',               //北京地区
  comListOth:'',              //其他地区
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
