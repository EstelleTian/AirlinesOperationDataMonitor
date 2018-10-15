var HistoryData = function () {

    // 模块选择器
    var $container = $('.history-data-statistics');

  // URL
  var submitUrl = iphost + 'shareDataPlatform/hisDataCount/';
  // 开始时间输入框选择器
  var startDateSelector = 'start-date-input';
  // 截止时间输入框选择器
  var endDateSelector = 'end-date-input';
  // 类型选择器
  var typeSelector = 'history-data-type-select';
  // 信息子类型选择器
  var subTypeSelector = 'history-data-subtype-select';
  // 上传单位选择器
  var unitSelector = 'history-data-unit-select';
  // 类型数据中文标签选择器
  var typeLableSelector = 'type-label';

  //起始时间
  var startDate = '';
  //截止时间
  var endDate = '';
  //当前选中的类型值
  var currentType = '';
  //当前选中的子类型值
  var currentSubtype = [];
  //当前选中的单位值
  var currentUnit = [];
  //图表对象
  var dataCountChart = {};
  var fileCountChart = {};
  //图表配置
  var echartOption = {
    legend: [],
    date: [],
    fileCount: [],
    dataCount: [],
    seriesType: 'bar',
    colors: ['#9abcc3', '#ab857c', '#1ABB9C', '#3498DB', '#b6a2de']
  };

  // 表单面板组件对象
  var historyDataDashboard = {};

  // 初始化组件
  var initComponent = function () {
    // 初始始化表单面板组件
    initFormDashboard();
    // 初始化日历插件datepicker
    historyDataDashboard.initDatepicker();
    // 设置默认时间
    historyDataDashboard.setDefaultDates(-1);
    // 初始化下拉列表多选插件
    historyDataDashboard.initBootstrapSelect();
  };

  /**
   *  初始始化表单面板组件
   * */
  var initFormDashboard = function () {
    historyDataDashboard = new FormDashboard({

      containerId : 'history-data-statistics',
      // 表单容器
      formId : 'form-wrap',
      // 数据生成时间选择器
      generatetimeId : 'generate-time',
      initDatepicker : initDatepicker,
      dataset : HistoryData,
      typeObj : BasicData.historyDataTypeObj,
      typeSelector : typeSelector,
      subTypeSelector : subTypeSelector,
      unitSelector : unitSelector,
      typeLableSelector : typeLableSelector,
    });

    historyDataDashboard.initDashboard();
  };

  // 初始化事件绑定
  var initEvent = function () {
    // 导航
    initNavTabEvent();
    // 提交按钮
    initSubmitEvent();
    //绑定Window事件，窗口变化时重新调整表格大小
    initDocumentResize();
  };

  /**
   * 导航事件
   * */

  var initNavTabEvent = function () {
    $('.nav-history-data-statistics').on('click', function () {
      // echarts高度自适应
      resizeToFitContainer();
      // 若信息总数图表存在，则重新设置图表尺寸
      if ($.isValidObject(dataCountChart)) {
        dataCountChart.resize();
      }
      // 若文件总数图表存在，则重新设置图表尺寸
      if ($.isValidObject(fileCountChart)) {
        fileCountChart.resize();
      }
    });
  };

  /**
   * 提交按钮事件
   * */
  var initSubmitEvent = function () {
    $('.history-data-btn').on('click', function () {
      // 处理表单提交
      handleSubmitForm();
    });
  };


  /**
   * 处理表单提交
   * */
  var handleSubmitForm = function () {

    //清空图表
    clearChart(dataCountChart);
    clearChart(fileCountChart);
    // 置空图表对象
    dataCountChart = {};
    fileCountChart = {};

    // 清空警告
      historyDataDashboard.clearAlert();
    // 清空提示
      historyDataDashboard.clearTip();
      // 隐藏数据统计
      hideDataTotal();

    //处理数据
    handleFormData();
    //校验表单
    var validate = validateForm();
    if (!validate.valid) {
      // 清空数据时间
      historyDataDashboard.clearGeneratetime();
      //隐藏当前统计条件
      hideConditions();
      // 显示警告信息内容
        historyDataDashboard.showAlear(validate);
      return;
    } else {
      //拼接参数
      var str = concatParameter();
      //显示当前统计条件
      showConditions();
      //数据查询
      searchData(str);
    }
  };

  /**
   * 校验表单
   * */
  var validateForm = function () {
    var regexp = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/;

    //起始时间格式
    var startDateValid = regexp.test(startDate);
    //起始时间格式
    var endDateValid = regexp.test(endDate);

    var nowDate = $.getFullTime(new Date()).substring(0, 8);
    // var preDate = $.addStringTime(nowDate,3600*1000*24*-1).substring(0,8);

    if (!startDateValid) {
      return {
        valid: false,
        mess: '请输入正确的起始时间,日期格式:YYYYMMDD'
      }
    } else if (!endDateValid) {
      return {
        valid: false,
        mess: '请输入正确的截止时间,日期格式:YYYYMMDD'
      }
    } else if (startDate.substring(0, 8) * 1 >= nowDate * 1) {
      return {
        valid: false,
        mess: '起始时间不能晚于昨日'
      }
    } else if (endDate.substring(0, 8) * 1 >= nowDate * 1) {
      return {
        valid: false,
        mess: '截止时间不能晚于昨日'
      }
    }
    return {
      valid: true
    };
  };

  /**
   *  处理数据
   * */
  var handleFormData = function () {
    //起始时间
    startDate = $('.' + startDateSelector).val();
    endDate = $('.' + endDateSelector).val();
    // 当前选中的类型值
    currentType = $('#' + typeSelector).val();
    // 当前选中的子类型值(数组)
    currentSubtype = $('#' + subTypeSelector).val();
    // 当前选中的单位值(数组)
    currentUnit = $('#' + unitSelector).val();
  };

  /**
   * 拼接参数
   * */
  var concatParameter = function () {
    // 当前选中的子类型值(字符串)
    var subtypeVal = currentSubtype ? currentSubtype.join(',') : 'null';
    // 当前选中的单位值(字符串)
    var unitVal = currentUnit ? currentUnit.join(',') : 'null';
    // 拼接参数
    var str = [startDate, endDate, currentType, subtypeVal, unitVal].join('/');
    return str;
  };

  /**
   * 显示当前统计条件
   * */
  var showConditions = function () {
    //当前选中的类型
    var currentTypeObj = BasicData.historyDataTypeObj.result[currentType];
    var typeCN = BasicData.historyDataTypeObj.valCN[BasicData.historyDataTypeObj.val.indexOf(currentType)];

    var subtypeCN = '';
    if (Array.isArray(currentSubtype)) {
      subtypeCN = currentSubtype.map(function (item, index) {
        return currentTypeObj.subtype[item];
      }).join(' , ');
    }

    /*else {
        var arr = [];
        var types = currentTypeObj.subtype;
        for(var i in types){
            arr.push(types[i]);
        }
        subtypeCN = arr.join(' , ') ;
    }*/

    //上传单位
    var unitCN = '';
    if (Array.isArray(currentUnit)) {
      unitCN = currentUnit.map(function (item, index) {
        return currentTypeObj.unit[item];
      }).join(' , ');
    }

    /*else {
        var arr = [];
        var units = currentTypeObj.unit;
        for(var i in units){
            arr.push(units[i]);
        }
        unitCN = arr.join(' , ') ;
    }*/


    $('.conditions-start-data', $container).text(startDate).attr('title', '时间: ' + startDate + '-' + endDate);
    $('.conditions-end-data', $container).text(endDate).attr('title', '时间: ' + startDate + '-' + endDate);
    $('.conditions-type', $container).text(typeCN).attr('title', '类型: ' + typeCN);
    $('.conditions-subtype', $container).text(subtypeCN).attr('title', '信息子类型: ' + subtypeCN);
    $('.conditions-unit', $container).text(unitCN).attr('title', '上传单位: ' + unitCN);
    $('.conditions-content', $container).removeClass('hidden');
  };

  /**
   * 隐藏当前统计条件
   * */
  var hideConditions = function () {
    $('.conditions-content').addClass('hidden');
  };

    /**
     * 显示数据统计
     * */
  var showDataTotal = function(data){
      // 若数据有效
      if($.isValidObject(data)){
          var list = '';
          // 当前选中的类型对应集合
          var currentTypeObj = BasicData.operatingDataTypeObj.result[currentType];
          // 当前选中的类型下的所有信息子类型集合
          var subTypeObj = currentTypeObj.subtype;
          // 遍历数据
          for(var i in data){
              // 取得信息子类型类型名称
              var type = data[i].type;
              // 若类型名称有效
              if($.isValidVariable(type)){
                  // 取得信息子类型类型名称中文数值
                  var typeCN = subTypeObj[type];
                  // 文件总数之和
                  var fileTotal = data[i].fileTotal || '';
                  // 信息总数之和
                  var dataTotal = data[i].dataTotal || '';
                  // 拼接为html节点
                  var str = '<span class="list-item">'+ '<span class="type-name">'+ typeCN+'</span>' +' 信息总数:'+'<label>'+ dataTotal+'</label>' +'文件总数:'+ '<label>'+fileTotal +'</label>'+'</span>';
                  list += str;
              }
          }
          // 追加到指定容器
          $('.data-total .data-total-list').empty().append(list);
          // 显示统计数量栏
          $('.data-total').removeClass('hidden');
          // 计算echarts初始化前父容器的高度, echarts高度自适应
          resizeToFitContainer();
      }
  };
    /**
     * 隐藏数据统计
     * */
  var hideDataTotal = function () {
    $('.data-total').addClass('hidden');
  };

  /**
   * 数据查询
   * */
  var searchData = function (str) {
    var loading = Ladda.create($('.history-data-btn')[0]);
    loading.start();
    $('.form-wrap').addClass('no-event');
    var url = submitUrl + str;
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data, status, xhr) {
        // 当前数据
        if ($.isValidObject(data) && $.isValidVariable(data.status) && '200' == data.status) {
          //提取数据
          var time = data.generatetime;
          var result = data.hisData;
          var total = data.hisDataTotals;
          // 更新数据时间
          historyDataDashboard.updateGeneratetime(time);
          // 若数据为空
          if (!$.isValidObject(result)) {
            //显示提示
              historyDataDashboard.showTip('本次统计数据结果为空');
            loading.stop();
            $('.form-wrap').removeClass('no-event');
            return;
          }
          // 显示数据统计
          showDataTotal(total);

          //转换数据
          convertData(result);
          //初始化图表
          initEcharts();

          loading.stop();
          $('.form-wrap').removeClass('no-event');

        } else if ($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
          var err = "查询失败:" + data.error;
            historyDataDashboard.showAlear(err);
          loading.stop();
          $('.form-wrap').removeClass('no-event');
        } else {
            historyDataDashboard.showAlear("查询失败");
          loading.stop();
          $('.form-wrap').removeClass('no-event');
        }

      },
      error: function (xhr, status, error) {
        console.error('Search data failed');
        console.error(error);
        loading.stop();
        historyDataDashboard.showAlear('查询失败');
        $('.form-wrap').removeClass('no-event');
      }
    });
  };


  /**
   * 转换数据
   * */

  var convertData = function (result) {
    // 转换图例数据
    convertLegend();
    // 转换日期时间数据(横轴类目)
    convertDates(result);
    //转换 数据系列
    convertSeriesData(result);
    // console.log(echartOption);
  };
  /**
   * 转换图例数据
   * */
  var convertLegend = function () {
    var arr = [];
    //当前子类型
    var subtypes = currentSubtype || getSubtypes(BasicData.historyDataTypeObj.result[currentType].subtype);
    // 当前子类型对应的中文名称
    subtypes.map(function (item) {
      var itemCN = BasicData.historyDataTypeObj.result[currentType].subtype[item];
      arr.push(itemCN);
    });

    echartOption.legend = arr;
  };
  /**
   *  转换日期时间数据(横轴类目)
   *
   *  obj 数据集合
   * */
  var convertDates = function (obj) {
    var arr = [];
    // 数据集合是以日期为字段的，所以取字段名
    for (var k in obj) {
      arr.push(k);
    }
    ;
    echartOption.date = arr;
  };

  /**
   *  转换 数据系列
   *
   * */
  var convertSeriesData = function (result) {
    // 置空图表配置对象中的信息总数集合和文件总数集合
    echartOption.fileCount = [];
    echartOption.dataCount = [];
    // 当前子类型
    var subtypes = currentSubtype || getSubtypes(BasicData.historyDataTypeObj.result[currentType].subtype);
    subtypes.map(function (item, index) {
      // 新建对象
      var fileCountObj = {
        name: BasicData.historyDataTypeObj.result[currentType].subtype[item], // 当前子类型对应的中文名称
        type: echartOption.seriesType,
        itemStyle: {
          normal: {
            color: echartOption.colors[index],
          }
        },
        data: []
      };
      var dataCountObj = {
        name: BasicData.historyDataTypeObj.result[currentType].subtype[item], // 当前子类型对应的中文名称
        type: echartOption.seriesType,
        itemStyle: {
          normal: {
            color: echartOption.colors[index],
          }
        },
        data: []
      };
      // 遍历数据日期
      echartOption.date.map(function (d) {
        //若某一日期数据中无该子类型数据，则创建一个假数据，这个数据的fileCount和dataCount设置为0(防止数据错乱)
        if (!$.isValidObject(result[d][item])) {
          var obj = {
            fileCount: 0,
            dataCount: 0
          };
          result[d][item] = [];
          result[d][item].push(obj);
        }
        var obj = result[d][item][0]; // 数据目标对象
        if ($.isValidObject(obj)) {
          // 更新对象data
          fileCountObj.data.push(obj.fileCount);
          dataCountObj.data.push(obj.dataCount);
        }
      });
      // 向信息总数集合和文件总数集合追加对象
      echartOption.fileCount.push(fileCountObj);
      echartOption.dataCount.push(dataCountObj);
    });

  };

  var getSubtypes = function (obj) {
    var arr = [];
    for (var i in obj) {
      arr.push(i);
    }
    return arr;
  };

  /**
   * 初始化图表
   * */
  var initEcharts = function () {
    // 信息总数图表
    createDataCountChart();
    // 文件总数图表
    createFileCountChart();
  };

  /**
   * 信息总数图表
   * */
  var createDataCountChart = function () {
    // 图表初始化
    dataCountChart = echarts.init($('#data-count')[0]);
    // 图表使用
    var opt = {
      animation: false,
      title: {
        text: '信息数',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },

      legend: {
        data: echartOption.legend,
      },

      xAxis: [
        {
          type: 'category',
          data: echartOption.date,

        }
      ],
      yAxis: [
        {
          type: 'value',

        }
      ],
      dataZoom: {
        show: true,
        realtime: true,
      },
      series: echartOption.dataCount,
    };
    dataCountChart.setOption(opt);
    //绑定自适应大小
    $(window).resize(function () {
      dataCountChart.resize();
    });
  };

  /**
   * 文件总数图表
   * */
  var createFileCountChart = function () {
    // 图表初始化
    fileCountChart = echarts.init($('#file-count')[0]);
    // 图表使用
    var option = {
      animation: false,
      title: {
        text: '文件数',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },

      legend: {
        data: echartOption.legend,
      },

      xAxis: [
        {
          type: 'category',
          // boundaryGap: false,
          data: echartOption.date,

        }
      ],
      yAxis: [
        {
          type: 'value',

          /*axisLabel : {
           formatter: '{value} 架次'
           }*/
        }
      ],
      dataZoom: {
        show: true,
        realtime: true,
        // orient: 'vertical',   // 'horizontal'
        //x: 0,
        // y: 380,
        //width: 400,
        // height: 20,
        // backgroundColor: 'rgba(221,160,221,0.5)',
        // dataBackgroundColor: 'rgba(138,43,226,0.5)',
        //fillerColor: 'rgba(38,143,26,0.6)',
        //handleColor: 'rgba(128,43,16,0.8)',
        //xAxisIndex:[],
        //yAxisIndex:[],
        // start: 0,
        // end: 100
      },
      series: echartOption.fileCount,
    };
    fileCountChart.setOption(option);
    //绑定自适应大小
    $(window).resize(function () {
      fileCountChart.resize();
    })
  };

  /**
   * 清空图表
   * */
  var clearChart = function (chart) {
    // 若图表已经存在，则清空图表
    if ($.isValidObject(chart)) {
      chart.clear();
      chart.dispose();
    }
  };

  /**
   * 绑定Window事件，窗口变化时重新调整表格大小
   * */
  var initDocumentResize = function () {
    $(window).resize(function () {
      if ($('.history-data-statistics').is(":visible")) {
        resizeToFitContainer();
      }
    });
  };

  /**
   *  计算echarts初始化前父容器的高度, echarts高度自适应
   * */
  var resizeToFitContainer = function () {
    var body = $('body').height();
    var head = $('.headbar').outerHeight() + parseInt($('.headbar').css('marginBottom'));
    var nav = $('.nav-menu').outerHeight() + parseInt($('.nav-menu').css('marginBottom'));
    var innerNav = $('.history-data-title').outerHeight() + parseInt($('.history-data-title').css('marginBottom'));
    var form = $('.form-wrap', $container).outerHeight() + parseInt($('.form-wrap', $container).css('marginBottom'));

    var wrapHeight = body - head - nav - innerNav - form - 20;
    var chartHeight = wrapHeight - $('.conditions', $container).outerHeight() - $('.data-total').outerHeight();
    $('.charts-wrap').height(wrapHeight);
    $('.echart-row').height(chartHeight);
  };


  /**
   * 更新下拉列表
   * */
  var updateSelectPicker = function (typeName) {
    historyDataDashboard.updateSelectOptions(typeName);
  };

  /**
   * 初始化日期插件datepicker
   * */
  var initDatepicker = function () {
    $('.history-data-statistics .date-datepicker').datepicker({
      language: "zh-CN",
      // showOnFocus: false, //是否在获取焦点时显示面板 true显示 false不显示 默认true
      autoclose: true, //选择日期后自动关闭面板
      // clearBtn: true, //是否显示清空按钮
      //todayHighlight: true,
      // startDate: '0d', //可选日期的开始日期 0d:当前 -1d:当前的前1天, +1d:当前的后1天
      endDate: '-1d', //可选日期最后日期
      // keepEmptyValues: true,
      // forceParse: true,
      //格式化
      format: 'yyyymmdd',
    });

  };


  return {
    init: function () {
      // 初始化组件
      initComponent();
      // 初始化事件绑定
      initEvent();
    },
    updateSelectPicker: updateSelectPicker,
    currentType: currentType
  }
}();

$(document).ready(function () {
  HistoryData.init();
});