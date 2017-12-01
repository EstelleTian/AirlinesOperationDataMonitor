/**
 * Created by caowei on 2017/11/30.
 */
var LOGIN = function () {
    //判断是否是谷歌浏览器
    var isChrome = navigator.userAgent.toLowerCase().match(/chrome/) != null;
    if (!isChrome) {
        alert('推荐使用谷歌浏览器');
    }
    /**
     * 用户登录
     */
    function isValidLogonInfo(userName,passWord) {
        // 验证登陆信息
        if (!$.isValidVariable(userName) || $.trim(userName) == '请输入用户名'
            || !$.isValidVariable(passWord) || $.trim(passWord) == '请输入密码') {
            return false;
        }
        return true;
    }
    function login(userName,passWord) {
        if(isValidLogonInfo(userName,passWord)){
            $.ajax({
                type: "GET",
                url: "http://192.168.243.104:1566/shareDataPlatform/login/{userName}/{passWord}",
                data: {
                    userName:userName,
                    passWord:passWord
                },
                dataType: "json",
                success:function (data) {
                    console.log(data);
                },
                error:function (error) {
                    console.log(error);
                }
            })
        }else{
            console.log("ddd")
        }
    }
    $(".sub_button").click(function () {
        // 获取登陆信息
        var loginUserName = $('#username').val();
        var loginPassWord = $('#userpwd').val();
        login(loginUserName,loginPassWord);
    })
}();
$(document).ready(function () {

})
