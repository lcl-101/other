import Axios from 'axios';

const api = {
  help(params) {
    return new Promise(function(resolve, reject){
      Axios.get('/api-help/ajax.php'+params.data)
      .then(function(res){
        if(res.data.status){
          resolve({
            isSuccess: true,
            type: params.type,
            data:res.data.data
          })
        }else {
          resolve({
            isSuccess: false,
            error: res.data.message
          })
        }
      }).catch(function(res){
        resolve({
          isSuccess: false,
          error: ''
        })
      })
    })
  }
}

export default api;
