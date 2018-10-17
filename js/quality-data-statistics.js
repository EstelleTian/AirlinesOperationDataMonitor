var QualityData = function () {
  /**
   * 表格实例对象
   * */
  var tableInstance = {};
  var canvasId = 'quality-table-canvas';
  var tableId = 'quality-table-datas';
  var pagerId = 'quality-table-datas-pager';
  // 模块选择器
  var $container = $('.quality-statistics');

    // 开始时间输入框选择器
    var startDateSelector = 'start-date-input';
    // 截止时间输入框选择器
    var endDateSelector = 'end-date-input';
    // 类型选择器
    var typeSelector = 'quality-data-type-select';
    // 信息子类型选择器
    var subTypeSelector = 'quality-data-subtype-select';
    // 上传单位选择器
    var unitSelector = 'quality-data-unit-select';
    // 类型数据中文标签选择器
    var typeLableSelector = 'quality-data-type-label';

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

  //数据查询地址
  var searchUrl = iphost+'shareDataPlatform/exportExcel/';

  // 表单面板组件对象
  var qualityDataDashboard  = {};

    /**
     * 初始化日期插件datepicker
     * */
    var initDatepicker = function () {
        $('.quality-statistics .date-datepicker').datepicker({
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

  /**
   * 处理表单提交
   *
   * type 类型 查询/导出
   *
   * */
  var handleSubmitForm = function (type,btn) {
    //处理数据
    handleFormData();
    //校验表单
    var validate = validateForm();
    if (!validate.valid) {
        qualityDataDashboard.showAlear(validate);
      return;
    } else {
      // 清空警告
        qualityDataDashboard.clearAlert();
      // 清空提示
        qualityDataDashboard.clearTip();
      //清空数据生成时间
      qualityDataDashboard.clearGeneratetime();
      // 若表格已经存在，则重新加载表格(清空表格头及表格数据)
      if ($.isValidObject(tableInstance)) {
        $.jgrid.gridUnload('quality-table-datas');
      }
      // 更新查询条件
      showConditions();
      //拼接参数
      var str = concatParameter(type);
        // 标记
        if(type == 'query'){ // 查询
            //数据查询
            searchData(str, btn);
        }else if(type == 'export'){ // 导出
            // 导出Excel文件
            exportExcel(str);
        }

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
        }else if (currentSubtype == null) {
            return {
                valid: false,
                mess: '信息子类型不能为空'
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
      startDate = $('.' + startDateSelector,$container).val();
      endDate = $('.' + endDateSelector, $container).val();
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
  var concatParameter = function (type) {
    // 当前选中的子类型值(字符串)
    var subtypeVal = currentSubtype ? currentSubtype.join(',') : 'null';
    // 当前选中的单位值(字符串)
    var unitVal = currentUnit ? currentUnit.join(',') : 'null';
    // 标记
    if(type == 'query'){ // 查询
        type = 2;
    }else if(type == 'export'){ // 导出
       type = 1;
    }

    // 拼接参数
    var str = [startDate, endDate, currentType, subtypeVal, unitVal,type].join('/');
    return str;
  };

  /**
   * 数据查询
   * */
  var searchData = function (str, btn) {
      var url = searchUrl + str;
      var load = Ladda.create(btn);
      $('.quality-form').addClass('no-event');
      load.start();
      $.ajax({
          url: url,
          type: 'GET',
          dataType: 'json',
          success: function (data, status, xhr) {
              // 当前数据
              if ($.isValidObject(data) && $.isValidVariable(data.status) && '200' == data.status) {

                  //提取数据
                  var result = data.sharingDatas;
                  var time = data.generatetime;

                  // 更新数据时间
                  qualityDataDashboard.updateGeneratetime(time);
                  // 若数据为空
                  if (!$.isValidObject(result)) {
                      //显示提示
                      qualityDataDashboard.showTip('本次查询数据结果为空');
                      load.stop();
                      $('.quality-form').removeClass('no-event');
                      return;
                  }
                  //初始化表格
                  initTable();
                  //表格数据加载
                  // tableLoad(result);
                  fireDataChange(result);
                  load.stop();
                  $('.quality-form').removeClass('no-event');

              } else if ($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
                  var err = '查询失败:' + data.error;
                  qualityDataDashboard.showAlear(err);
                  load.stop();
                  $('.quality-form').removeClass('no-event');
              } else {
                  qualityDataDashboard.showAlear('查询失败,请稍后重试');
                  load.stop();//显示提示
                  $('.quality-form').removeClass('no-event');
              }

          },
          error: function (xhr, status, error) {
              load.stop();
              $('.quality-form').removeClass('no-event');
              qualityDataDashboard.showAlear('查询失败,请稍后重试');
              console.error('Search data failed');
              console.error(error);
          }
      });
  };

  /**
   *
   * url 导出路径及参数
   *
   * */
  var exportExcel = function (url) {
      window.location.href = encodeURI(searchUrl + url);
  }


  /**
   * 初始化表格
   * */
  var initTable = function () {
    //生成表格实例
    tableInstance = new FlightGridTable({
      canvasId: canvasId,
      tableId: tableId,
      pagerId: pagerId,
      colNames: BasicData.qualityTableObj.colName[currentType][currentSubtype],
      colModel: BasicData.qualityTableObj.colModel[currentType][currentSubtype],
      cmTemplate: BasicData.qualityTableObj.cmTemplate,
      colDisplay: BasicData.qualityTableObj.display[currentType][currentSubtype],
      colStyle: {},
      colTitle: BasicData.qualityTableObj.title[currentType][currentSubtype],
      colEdit: {},
        params: {
            shrinkToFit: false,
            // rowNum: 999999,
            //sortname: 'EOBT',
            // sortorder: 'asc',
            // sortname: 'SEQ',//排序列
            // 数据类型
            datatype: 'local',
            // 定义工具栏是否显示翻页键
            pgbuttons: true,
            //设置行号列宽度
            rownumWidth: 80,
            // 是否显示跳转页面的输入框
            pginput: true,
            // 是否要显示总记录数
            viewrecords: true,
            // 是否显示行号
            rownumbers: true,
            //是否显示快速过滤
            // showQuickFilter: true,
            rowNum: 100, //表格中可见的记录数
            scroll: false, //创建动态滚动表格。当设为启用时，pager被禁用，可使用垂直滚动条来装入数据。
            afterSearchCallBack: function () {

            }
      }
    });

    //初始化
    tableInstance.initGridTableObject();
    // 显示pager
    $('#quality-table-datas-pager').show();
    tableInstance.resizeToFitContainer();
  };

    /**
     * 显示当前统计条件
     * */
    var showConditions = function () {
        //当前选中的类型
        var currentTypeObj = BasicData.qualityDataTypeObj.result[currentType];
        var typeCN = BasicData.qualityDataTypeObj.valCN[BasicData.historyDataTypeObj.val.indexOf(currentType)];

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
   * 更新下拉列表
   * */
  var updateSelectPicker = function (typeName) {
    qualityDataDashboard.updateSelectOptions(typeName);
  };


  /**
   * 触发表格全部数据更新
   * @param flights
   * @param generateTime
   */
  var fireDataChange = function (obj) {

    var tableData = [];
    var tableMap = {};
    for (var index in obj) {
      var d = obj[index];
      tableData.push(d);
      tableMap[index] = d;
    }

    /* var sortTableData = tableData;
     //var sortTableData=sortGridData(tableData, ['ORDER', 'SOBT']);
     tableInstance.tableData = sortTableData;*/

    //绘制表格
    tableInstance.tableDataMap = tableMap;
    tableInstance.tableData = tableData;

    tableInstance.drawGridTableData();


  };

  /**
   * 初始化组件
   *
   * */
  var initComponent = function () {
      // 初始始化表单面板组件
      initFormDashboard();
      // 初始化日历插件datepicker
      qualityDataDashboard.initDatepicker();
      // 设置默认时间
      qualityDataDashboard.setDefaultDates(-1);
      // 初始化下拉列表多选插件
      qualityDataDashboard.initBootstrapSelect();

      //子类型下拉列表重新初化
      var $subType = $('#' + subTypeSelector);
      if ($.isValidVariable(subTypeSelector)) {
          $subType.selectpicker({
              liveSearch: true,
              maxOptions: 1 // 不可多选
              // actionsBox: true
          });
      }
  };

  /**
   *
   * 初始始化表单面板组件
   * */
  var initFormDashboard = function () {
    qualityDataDashboard = new FormDashboard({
      containerId : 'quality-statistics',
      // 表单容器
      formId : 'quality-form',
      // 数据生成时间选择器
      generatetimeId : 'generate-time',
      initDatepicker : initDatepicker,
      dataset : QualityData,
      typeObj : BasicData.qualityDataTypeObj,
      typeSelector : typeSelector,
      subTypeSelector : subTypeSelector,
      unitSelector : unitSelector,
      typeLableSelector : typeLableSelector
    });

    qualityDataDashboard.initDashboard();
  };

    /**
     * 初始化事件绑定
     * */
    var initEvent = function () {
        initSubmitEvent();
        //绑定Window事件，窗口变化时重新调整表格大小
        initDocumentResize();
        //绑定左侧导航'运行数据查询'点击事件
        initNavMenu();

    };


    /**
     * 提交按钮事件
     * */
    var initSubmitEvent = function () {
        // 查询
        $('.quality-data-query-btn').on('click', function () {
            // 处理表单提交
            handleSubmitForm('query', this);
        });
        // 导出
        $('.quality-data-export-btn').on('click', function () {
            // 处理表单提交
            handleSubmitForm('export', this);
        });
    };

  /**
   * 绑定Window事件，窗口变化时重新调整表格大小
   * */
  var initDocumentResize = function () {
    $(window).resize(function () {
      if ($container.is(':visible')) {
          resizeToFitContainer();
      }
    });
  };
  /**
   *
   * 绑定左侧导航'运行数据查询'点击事件
   * */
  var initNavMenu = function () {
    //
    $('.nav-quality-statistics').on('click', function () {
        resizeToFitContainer();
      //调整表格大小以适应所在容器
      if ($.isValidObject(tableInstance)) {
        tableInstance.resizeToFitContainer();
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
        var innerNav = $('.title', $container).outerHeight() + parseInt($('.title', $container).css('marginBottom'));
        var form = $('.form-wrap', $container).outerHeight() + parseInt($('.form-wrap', $container).css('marginBottom'));
        var conditions = $('.conditions', $container).outerHeight();
        var wrapHeight = body - head - nav - innerNav - form - conditions - 20;

        $('#quality-table-container').height(wrapHeight);
    };

  return {
    init: function () {
      // 初始化组件
      initComponent();
      //初始化事件绑定
      initEvent();
    },
    updateSelectPicker: updateSelectPicker,
    currentType: currentType

  }
}();
$(document).ready(function () {
    QualityData.init();
});