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
    function isValidLogonInfo() {
        // 验证登陆信息
            $("#data_form").bootstrapValidator({
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
            $('#data_form').data('bootstrapValidator').validate();
            if(!$('#data_form').data('bootstrapValidator').isValid()){
            return false;
        }
        return true;
    }
    function login(userName,passWord) {
        if(isValidLogonInfo()){
            $.ajax({
                type: "GET",
                url: "http://192.168.243.104:1566/shareDataPlatform/login/"+userName+"/"+passWord+"",
                dataType: "json",
                success:function (data) {
                   if($.isValidObject(data)){
                       if(data.status == 200){
                           localStorage.removeItem("loginTime","")
                           localStorage.removeItem("userName","")
                           var generatetime = data.generatetime;
                           localStorage.setItem("loginTime",generatetime)
                           localStorage.setItem("userName",userName)
                           window.location = "home.html";
                       }else{
                           $(".form-group").removeClass("has-success");
                           $(".form-control-feedback").removeClass("glyphicon-ok");
                           $(".form-control-feedback").addClass("glyphicon-remove");
                           $(".form-group").addClass("has-error");
                           $(".error_tip").text(data.error).addClass("error");

                       }
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
