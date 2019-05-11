const mutations = {
  changHeader (state,appData){
    let {title} = appData;
    state.header = title;
  },
  changeFrom (state,appData){
    let { data } = appData;
    state.from = data;
  },
  changeRecruitScrollY(state,recruitScrollY) {
    state.recruitScrollY = recruitScrollY;
  }
}

export default mutations
