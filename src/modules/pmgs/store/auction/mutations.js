const mutations = {
  getIndexData (state,listData){
    let {isSuccess, data, error} = listData;
     if(isSuccess){
       state.categoryInfo = data.categoryInfo;
       state.specialInfo = data.specialInfo;
       state.logoUrl = data.logoUrl;
       state.preImgUrl = data.preImgUrl;
     }else {
       state.error = error;
     }
  },
  clearList (state){
    state.categoryInfo = '';
    state.specialInfo = '';
    state.logoUrl = '';
  },
  changeRecruitScrollY(state,recruitScrollY) {
    state.recruitScrollY = recruitScrollY;
  }
}

export default mutations
