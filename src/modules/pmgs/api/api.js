import Axios from 'axios';

const api = {
  indexData(params) {
    return new Promise(function(resolve, reject){
      params = params?params:'';
      Axios.get('/'+(params.data?params.data:''),{
        headers: {
          'X-Requested-With': 'xmlhttprequest'
        }
      })
      .then(function(res){
        if(res.data.status){
          resolve({
            isSuccess: true,
            data: res.data.data
          })
        }else {
          resolve({
            isSuccess: false,
            error: res.message
          })
        }
      }).catch(function(res){
        resolve({
          isSuccess: false,
          error: ''
        })
      })
    })
  },
  getList(params) {
    return new Promise(function(resolve, reject){
      Axios.get('/search_'+params.comId+'/'+params.itemName+'/p_'+params.page,{
        headers: {
          'X-Requested-With': 'xmlhttprequest'
        }
      })
      .then(function(res){
        if(res.data.status){
          resolve({
            isSuccess: true,
            data: res.data.data
          })
        }else {
          resolve({
            isSuccess: false,
            error: res.message
          })
        }
      })
      .catch(function(res){
        resolve({
          isSuccess: false,
          error: ''
        })
      })
    })
  }
}

export default api;
