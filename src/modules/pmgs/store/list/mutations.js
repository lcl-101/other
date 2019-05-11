const mutations = {
  getList (state,listData){
    let {isSuccess, data, error} = listData;
    if(isSuccess){
      state.itemList = data.itemList;
      state.pager = data.pager;
      state.itemPicUrl = data.itemPicUrl;
      state.itemName = data.itemName;
    }else {
      state.error = error;
    }
  },
  clearList (state){
    state.itemList = '';
    state.list = [];
    state.pager = '';
    state.itemName = '';
  },
  putList (state,appData){
    let {data} = appData;
    state.list = data;
  },
  putPage (state,page){
    state.pager = page;
  },
  changeRecruitScrollY(state,recruitScrollY) {
    state.recruitScrollY = recruitScrollY;
  }
}

export default mutations
