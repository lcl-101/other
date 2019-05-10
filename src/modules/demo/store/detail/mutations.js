const mutations = {
  getCatList (state,listData) {
    let {isSuccess, data ,error, type} = listData;
    if(isSuccess){
        state.detail = data;
        state.progress = false;
    }else{
        state.error = error;
        state.progress = true;
    }
  },
  setTitle (state,listData) {
    let {isSuccess, data ,error} = listData;
    if(isSuccess){
        state.title = data.helpTitle
    }else{
        state.title = '帮助中心'
    }
  },
  clearList (state){
    state.detail = '';
    state.progress = true;
  }
}

export default mutations;
