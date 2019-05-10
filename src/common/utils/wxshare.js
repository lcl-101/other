/*
微信分享功能封装
*/

 export default function wxShare(share_data,config){
        var nowUrl = encodeURIComponent(location.href.split('#')[0]);
        var _url = config.wechat+'interface/config/getJSSDK?callback=JSON_CALLBACK&_t=' + (new Date).getTime();
        $.ajax({
            type: 'GET',
            url: _url,
            data: { url: nowUrl },
            dataType: 'jsonp',
            success: function(res){
                console.log('wx'+res);
                if(res && res.status){
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.appId, // 必填，公众号的唯一标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                        signature: res.data.signature, // 必填，签名，见附录1
                        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone", "hideMenuItems"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function() {
                        //朋友圈
                        wx.onMenuShareTimeline({
                            title: share_data.title, // 分享标题
                            link: share_data.link, // 分享链接
                            imgUrl: share_data.imgUrl, // 分享图标
                            success: function() {
                            },
                            cancel: function() {
                            }
                        });
                        //朋友
                        wx.onMenuShareAppMessage({
                            title: share_data.title, // 分享标题
                            desc: share_data.desc, // 分享描述
                            link: share_data.link, // 分享链接
                            imgUrl: share_data.imgUrl, // 分享图标
                            type: '', // 分享类型,music、video或nklink，不填默认为li
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function() {
                            },
                            cancel: function() {
                            }
                        });
                        // //批量隐藏功能按钮接口 隐藏safary浏览器
                        // wx.hideMenuItems({
                        //     menuList: ['menuItem:openWithSafari', 'menuItem:openWithQQBrowser'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                        // });
                    });
                }else{
                    //alert(res.message);
                }
            },
            error: function(xhr, type){
            }
        });
    }
    // if(typeof wxshare_data !='undefined'){
    //     wxShare(wxshare_data);
    // }else{
    //     wxShare({
    //         title:"孔网旧书回收平台，批量买书卖书",
    //         desc:"一键发布，自由报价",
    //         imgUrl:KFZ.sites.adapter.m + "shop/mobile2-0/common/images/logo2.png",
    //         link:"https://m.kongfz.com/"
    //     });
    // }

// })();


