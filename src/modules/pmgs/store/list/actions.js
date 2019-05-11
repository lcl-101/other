import api from '../../api/api';

const actions = {
  async getList ({ commit, state},params) {
    const s = await api.getList(params);
    commit('getList',s);
  }
}

export default actions;
