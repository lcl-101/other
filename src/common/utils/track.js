/**
 *  通用统计埋点工具方法
 *  author：luorh
 *  date:20180818
 *  version:1.0.0
 * */
;(function(win){
    var _selfUrl = encodeURIComponent(location.href),
        _refUrl  = encodeURIComponent(document.referrer),
        winWidth = window.screen.width,
        winHeight= window.screen.height;
    var commonData = {
        resolution:winWidth + 'x' + winHeight,
        selfUrl:_selfUrl,
        refUrl:_refUrl
    };
    var track = function(){
        this.v = '1.0.0';
    };
    track.prototype.send = function(ev,data){
        var dataStr = '';
        if(data && typeof data =='object'){
            dataStr = encodeURIComponent(JSON.stringify(data));
        }
        var __imgurl = '//tj.kongfz.com/web/collect/1.gif';
        if(window.location.href.indexOf('neibu') > -1){
            __imgurl = '//neibutj.kongfz.com/web/collect/1.gif';
        }
        __imgurl += '?event=' + ev + '&resolution=' + commonData.resolution + '&selfUrl=' + commonData.selfUrl + '&refUrl=' + commonData.refUrl + '&eventAttr=' + dataStr + "&n_" + Math.random();
        var _img = document.createElement('img');
        _img.src = __imgurl;
        _img.className = 'track_img';
        _img.style.display = 'none';
        var trackImgList = document.getElementsByClassName('track_img');
        if(trackImgList && trackImgList.length){
            for(var i=0; i < trackImgList.length; i++){
                trackImgList[i].parentNode.removeChild(trackImgList[i]);
            }
        }
        document.body.appendChild(_img);
    };
    win.track = new track();
})(window);