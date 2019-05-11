import api from '../../api/api';

const actions = {
  async indexData ({ commit, state},params) {
    const s = await api.indexData(params);
    commit('getIndexData',s);
  }
}

export default actions;
