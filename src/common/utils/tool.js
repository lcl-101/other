const MessageUrl=(url) => {
    return url.indexOf('neibu')!==-1? 'http://neibummessage.kongfz.com/?type=chat#/': 'http://mmessage.kongfz.com/?type=chat#/'
}
const loginUrl=(url) => {
    return url.indexOf('neibu')!==-1? 'https://neibum.kongfz.com/m/?mustLogin=1&returnUrl=': 'https://m.kongfz.com/m/?mustLogin=1&returnUrl='
}
const picUrl=(url) => {
    return url.indexOf('neibu')!==-1? 'http://neibuimage-upload.kongfz.com/photo/preview?filename=': 'http://image-upload.kongfz.com/photo/preview?filename='
}
export {
    loginUrl,
   MessageUrl,
    picUrl
}
