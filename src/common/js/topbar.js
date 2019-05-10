var header = {
    site: baseInfo.site,
    dom: {
        $header: $('header'),
        $forUser: $('#forUser'),
        $body: $('body')
        
    },
    init: function () {
        var that = this;
        that.initEvent();
        that.getMsgNum();
        that.localChan();
        that.getCarNumn();
        

    },
    initEvent: function () {
        var that = this;
        that.dom.$header.on('click', '.more-icon', function () {
            that.menuToggle.apply(this);
        })
    },
    menuToggle: function () {
        var _this = $(this),
            flag = $(this).attr('data-toggle');
        if (flag == '1') {
            $('.nav-lay-out').hide();
            $('.lay_bg').remove();
            _this.attr('data-toggle', '0');
        } else {
            $('.nav-lay-out').show();
            _this.attr('data-toggle', '1');
            // 透明背景
            var loadStr = '<div class="lay_bg"></div>';
            $('body').append(loadStr);
            $('.lay_bg').on('touchstart', function (event) {
                $('.nav-lay-out').hide();
                $('.more-icon').attr('data-toggle', '0');
                setTimeout(function () {
                    $('.lay_bg').remove();
                }, 400);
                event.stopPropagation();
            });
        }
    },
    //getMsgNum
    getMsgNum: function () {
        var that = this;
        $.ajax({
            type: "get",
            url: that.site.m + 'api-msg/Interface/User/getUnreadNum',
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "jsonpCallback",
            success: function (n) {

                if (n > 0) {
                    var num = n;
                    if (num > 100) {
                        num = "99+";
                    }
                    $('.more-icon').html('<i class="msg_num">' + num + '</i>');
                    $('.msg-link').append('<span class="msg-link_num">' + num + '</span >');
                }
            },
            error: function (err) {
            }
        });
    },
    //getCarNumn
    getCarNumn:function(){
        var that = this;
        $.ajax({
            type: "get",
            url: that.site.m + 'cart/jsonp/getCartNum',
            success: function (data) {
                if (data.result > 0) {
                    var num = data.result;
                    if (num > 100) {
                        num = "99+";
                    }
                    $('.car-link').append('<span class="car-link_num">' + num + '</span >');
                }
            },
            error: function (err) {
            }
        });
    },
    localChan: function () {
        var that = this;
        that.dom.$forUser.find('.msg-link').attr('href', that.site.m + 'm/#/message/msg/inbox/');
        that.dom.$forUser.find('.home-link').attr('href', that.site.m);
        that.dom.$forUser.find('.search-link').attr('href', that.site.m + 'search/');
        that.dom.$forUser.find('.car-link').attr('href', that.site.m + 'm/#/shop/cart/list');
    }
}
header.init();

