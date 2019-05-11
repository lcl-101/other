import api from '../../api/api';

const actions = {
  async indexData ({ commit, state},params) {
    console.log(params)
    const s = await api.indexData(params);
    console.log(s)
    commit('getIndexData',s);
  }
}

export default actions;
