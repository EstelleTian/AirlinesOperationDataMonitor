$(document).ready(function () {
    //导航栏

   var nav = $('#nav');
    // 当日运行数据监控

    // 历史运行数据量统计
   $('.nav-history-data-statistics').on('click',function () {

      $('li',nav).removeClass('active');
      $(this).addClass('active');
      $('.content-container .row').removeClass('active');
      $('.history-data-statistics').addClass('active');

   });
    // 运行数据查询
   $('.nav-operating-data-query').on('click',function () {
       $('li',nav).removeClass('active');
       $(this).addClass('active');
       $('.content-container .row').removeClass('active');
       $('.operating-data-query').addClass('active');
   });


    // 登出

});