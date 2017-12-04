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
        if (!$.isValidVariable(userName) || $.trim(userName) == ''
            || !$.isValidVariable(passWord) || $.trim(passWord) == '') {
            $("#data_form").bootstrapValidator({
                message: '验证失败',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields:{
                    username:{
                        message: 'The username is not valid',
                        validators: {
                            notEmpty: {
                                message: '用户名不能为空'
                            }
                        }
                    },
                    password:{
                        validators: {
                            notEmpty: {
                                message: '密码不能为空'
                            }
                        }
                    }
                }
            })
            return false;
        }

        return true;
    }
    function login(userName,passWord) {
        if(isValidLogonInfo(userName,passWord)){
            $.ajax({
                type: "GET",
                url: "http://192.168.243.104:1566/shareDataPlatform/login/{"+userName+"}/{"+passWord+"}",
                dataType: "json",
                success:function (data) {
                   if($.isValidObject(data)){
                       localStorage.removeItem("loginTime","")
                       var generatetime = data.generatetime;
                       localStorage.setItem("loginTime",generatetime)
                       window.location = "home.html";
                   }
                },
                error:function (error) {
                    console.log(error);
                }
            })
        }else{

        }
    }
    $(".sub_button").click(function () {
        // 获取登陆信息
        var loginUserName = $('#inputName').val();
        var loginPassWord = $('#inputPassword').val();
        login(loginUserName,loginPassWord);
    })
}
$(document).ready(function () {
    LOGIN();
})
