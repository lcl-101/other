const mutations = {
  getIndexData (state,listData){
    let {isSuccess, data, error,load} = listData;
     if(isSuccess){
       state.categoryInfo = data.categoryInfo;
       state.itemData = data.itemData;
       state.comName = data.comInfo.comName;
       state.articleImgUrl = data.articleImgUrl;
       state.logoUrl = data.logoUrl;
       state.preImgUrl = data.preImgUrl;
       state.specialInfo = data.specialInfo;
     }else {
       state.error = error;
     }
  },
  clearList (state){
    state.categoryInfo = '';
    state.itemData = '';
    state.comName = '';
    state.articleImgUrl = '';
    state.list = '';
    state.logoUrl = '';
    state.specialInfo = '';
  },
  putList (state,appData){
    let {data} = appData;
    state.list = data;
  },
  putPage (state,page){
    state.page = page;
  },
  changeRecruitScrollY(state,recruitScrollY) {
    state.recruitScrollY = recruitScrollY;
  }
}

export default mutations
