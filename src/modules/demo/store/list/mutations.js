const mutations = {
  getCatList (state,listData) {
    let {isSuccess, data ,error, type} = listData;
    if(isSuccess){
        state.list = data?data:'noData';
        state.progress = false;
    }else{
        state.error = error;
        state.progress = true;
    }
  },
  setTitle (state,listData) {
    let {isSuccess, data ,error} = listData;
    if(isSuccess){
        state.title = data[0].catName
    }else{
        state.title = '帮助中心'
    }
  },
  clearList (state){
    state.title = '';
    state.list = '';
    state.progress = true;
  }
}

export default mutations;
