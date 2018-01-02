
var LayoutEvent = function () {

    /**
     * 更新登录用户信息
     *
     * */
    var updateUserInfo = function () {
        var userName = localStorage.getItem("userName");
        $(".loginer_name").text(userName);
    };
    /**
     * 更新用户登录时间
     *
     * */
    var updateLoginTime = function () {
        var generateTime = localStorage.getItem("loginTime");
        if($.isValidVariable(generateTime)){
            var dataTime ="登录时间:"+ $.formateTime(generateTime);
            $(".login-time").text(dataTime);
        }
    };

    /**
     * 导航菜单点击事件
     * */
    var handleMenu = function () {
        //导航栏
        var nav = $('#nav');
        // 当日运行数据监控
        $('.nav_monitor').on('click',function () {
            $('li',nav).removeClass('active');
            $(this).addClass('active');
            $('.content-container .row').removeClass('active');
            $('#home').addClass('active');
            $(".data_time").show();
        });
        // 历史运行数据量统计
        $('.nav-history-data-statistics').on('click',function () {
            $('li',nav).removeClass('active');
            $(this).addClass('active');
            $('.content-container .row').removeClass('active');
            $('.history-data-statistics').addClass('active');
            $(".data_time").hide();
        });
        // 运行数据查询
        $('.nav-operating-data-query').on('click',function () {
            $('li',nav).removeClass('active');
            $(this).addClass('active');
            $('.content-container .row').removeClass('active');
            $('.operating-data-query').addClass('active');
            $(".data_time").hide();
        });
    };

    return {
        init : function () {
            updateUserInfo();
            updateLoginTime();
            handleMenu();
        }
    }
}();

$(document).ready(function () {
   LayoutEvent.init();
});