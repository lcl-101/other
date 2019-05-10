const mutations = {
  getCatList (state,listData) {
    let {isSuccess, data ,error, type} = listData;
    if(isSuccess){
        state.cat = data;
        state.progress = false;
    }else{
        state.error = error;
        state.progress = true;
    }
  },
  clearList (state){
    state.list = '';
    state.progress = true;
  }
}

export default mutations;
