const mutations = {
  getIndexData (state,listData){
    let {isSuccess, data, error} = listData;
     if(isSuccess){
       state.comInfo = data.comInfo;
       state.addrInfo = data.addrInfo;
       state.impression = data.impression;
       state.categoryList = data.categoryList;
       state.logoUrl = data.logoUrl;
     }else {
       state.error = error;
     }
  },
  clearList (state){
    state.comInfo = '';
    state.addrInfo = '';
    state.impression = '';
    state.categoryList = '';
    state.logoUrl = '';
  },
  changeRecruitScrollY(state,recruitScrollY) {
    state.recruitScrollY = recruitScrollY;
  }
}

export default mutations
