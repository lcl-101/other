const mutations = {
  getIndexData (state,listData){
    let {isSuccess, data, error} = listData;
     if(isSuccess){
       state.previewList = data.previewList || '';
       state.comListBj = data.comListBj || '';
       state.comListOth = data.comListOth || '';
       state.logoUrl = data.logoUrl || '';
     }else {
       state.error = error;
     }
  },
  changeRecruitScrollY(state,recruitScrollY) {
    state.recruitScrollY = recruitScrollY;
  }
}

export default mutations
