import Toast from '../../../../common/components/toast/index';
import api from '../../api/api';

const actions = {
  async catList ({ commit, state},params) {
    const s = await api.help(params);
    commit('getCatList',s);
    commit('setTitle',s);
  }
}

export default actions;
