const mutations = {
  getIndexData (state,listData){
    let {isSuccess, data, error} = listData;
     if(isSuccess){
       state.comListAll = data.comListAll || '';
     }else {
       state.error = error;
     }
  },
  setComName (state,appData){
    state.name = appData;
  },
  clearList (state){
    state.name = '全部公司';
  }
}

export default mutations
