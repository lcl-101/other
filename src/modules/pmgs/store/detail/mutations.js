const mutations = {
  getIndexData (state,listData){
    let {isSuccess, data, error,load} = listData;
     if(isSuccess){
       state.itemInfo = data.itemInfo;
       state.logoUrl = data.logoUrl;
     }else {
       state.error = error;
     }
  },
  clearList (state){
    state.itemInfo = '';
    state.logoUrl = '';
  }
}

export default mutations
