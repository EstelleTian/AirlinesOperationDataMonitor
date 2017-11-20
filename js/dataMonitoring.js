/**
 * Created by caowei on 2017/11/20.
 */
// 导航栏切换
$('#myTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
})
$('#myTabs a[href="#profile"]').tab('show') 
$('#myTabs a:first').tab('show') 
$('#myTabs a:last').tab('show') 
