var OperatingData = function () {
  /**
   * 表格实例对象
   * */
  var tableInstance = {};
  var canvasId = 'tb-datas-canvas';
  var tableId = 'tb-datas';
  var pagerId = 'table-datas-pager';

  //时间
  var date = '';
  //当前选中的类型值
  var currentType = '';

  //当前选中的子类型值
  var currentSubtype = [];
  //当前选中的单位
  var currentUnit = [];
  //数据查询地址
  var searchUrl = iphost + 'shareDataPlatform/dataSearch/';
  //是否已经成功查询过
  var hasQuery = false;
  // 表单面板组件对象
  var operatingDataDashboard  = {};

  /**
   *  创建模态框
   *  content 模态框内容
   * */
  var createModal = function (content) {
    var options = {
      title: "运行数据查询",
      content: content,
      status: 0,//1:正常 2:警告 3:危险  不填:默认情况
      width: 890,
      showCancelBtn: false,
      mtop: 200,
      isIcon: false,
      buttons: [{
        name: "查询",
        status: 0,
        isHidden: false,
        className: 'submit-form',
        callback: function () {
          var btn = this;
          // 处理表单提交
          handleSubmitForm(btn);
        }
      }, {
        name: "重置",
        isHidden: false,
        status: -1,
        className: 'reset-form',
        callback: function () {
          // 重置表单
          resetForm();
        }
      }, {
        name: "关闭",
        status: -1,
        callback: function () {
        }
      }]
    };
    BootstrapDialogFactory.dialog(options);
  };


  /**
   * 初始化日期插件datepicker
   * */
  var initDatepicker = function () {
    $('#bootstrap-modal-dialog-body .date-datepicker').datepicker({
      language: 'zh-CN',
      // showOnFocus: false, //是否在获取焦点时显示面板 true显示 false不显示 默认true
      autoclose: true, //选择日期后自动关闭面板
      // clearBtn: true, //是否显示清空按钮
      //todayHighlight: true,
      // startDate: '0d', //可选日期的开始日期 0d:当前 -1d:当前的前1天, +1d:当前的后1天
      endDate: '0d', //可选日期最后日期
      keepEmptyValues: true,
      // forceParse: true,
      //格式化
      format: 'yyyymmdd',
    });
  };

  /**
   * 处理表单提交
   * */
  var handleSubmitForm = function (btn) {
    //处理数据
    handleFormData();
    //校验表单
    var validate = validateForm();
    if (!validate.valid) {
      showAlear(validate);
      return;
    } else {
      // 清空警告
      clearAlert();
      // 清空提示
      clearTip();
      //清空数据生成时间
      operatingDataDashboard.clearGeneratetime();
      // 若表格已经存在，则重新加载表格(清空表格头及表格数据)
      if ($.isValidObject(tableInstance)) {
        $.jgrid.gridUnload('tb-datas');
      }
      // 更新查询条件
      updateConditions();
      //拼接参数
      var str = concatParameter();
      //数据查询
      searchData(str, btn);
    }
  };

  /**
   * 校验表单
   * */
  var validateForm = function () {
    var nowDate = $.getFullTime(new Date()).substring(0, 8);
    var regexp = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/;
    //起始时间
    var dateVal = regexp.test(date);

    if (!dateVal) {

      return {
        valid: false,
        mess: '请输入正确的时间,日期格式:YYYYMMDD'
      }
    } else if (date.substring(0, 8) * 1 > nowDate * 1) {
      return {
        valid: false,
        mess: '时间不能晚于今日'
      }
    } else if (currentSubtype == null) {
      return {
        valid: false,
        mess: '信息子类型不能为空'
      }
    }

    return {
      valid: true
    }

  };

  /**
   *  处理数据
   * */
  var handleFormData = function () {
    //起始时间
    date = $('.date-input').val();


    // 当前选中的子类型值(数组)
    currentSubtype = $('#subtype').val();
    // 当前选中的单位值(数组)
    currentUnit = $('#unit-list').val();
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
    var str = [date, currentType, subtypeVal, unitVal].join('/');
    return str;
  };

  /**
   * 数据查询
   * */
  var searchData = function (str, btn) {
    var url = searchUrl + str;
    var load = Ladda.create(btn);
    load.start();
    $('.modal-content').addClass('no-event');
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
          operatingDataDashboard.updateGeneratetime(time);
          // 若数据为空
          if (!$.isValidObject(result)) {

            //显示提示
            showTip('本次查询数据结果为空');

            load.stop();
            $('.modal-content').removeClass('no-event');
            //隐藏模态框
            toggleModal(false);
            return;
          }
          //初始化表格
          initTable();
          //表格数据加载
          // tableLoad(result);
          fireDataChange(result);

          load.stop();
          $('.modal-content').removeClass('no-event');
          //隐藏模态框
          toggleModal(false);

        } else if ($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
          var err = '查询失败:' + data.error;
          showAlear(err);
          load.stop();
          //显示提示
          showTip('本次查询失败');
          $('.modal-content').removeClass('no-event');
        } else {
          showAlear('查询失败');
          load.stop();//显示提示
          showTip('本次查询失败');

          $('.modal-content').removeClass('no-event');
        }

      },
      error: function (xhr, status, error) {
        load.stop();
        $('.modal-content').removeClass('no-event');
        showAlear('查询失败');
        showTip('本次查询失败');
        console.error('Search data failed');
        console.error(error);
      }
    });
  };


  /**
   * 初始化表格
   * */
  var initTable = function () {
    //生成表格实例
    tableInstance = new FlightGridTable({
      canvasId: canvasId,
      tableId: tableId,
      pagerId: pagerId,
      colNames: BasicData.tableObj.colName[currentType][currentSubtype],
      colModel: BasicData.tableObj.colModel[currentType][currentSubtype],
      cmTemplate: BasicData.tableObj.cmTemplate,
      colDisplay: BasicData.tableObj.display[currentType][currentSubtype],
      colStyle: {},
      colTitle: BasicData.tableObj.title[currentType][currentSubtype],
      colEdit: {},
      params: {
        shrinkToFit: false,
        // rowNum: 999999,
        //sortname: 'EOBT',
        // sortorder: 'asc',
        // sortname: 'SEQ',//排序列
        // 是否显示行号
        rownumbers: true,
        //是否显示快速过滤
        // showQuickFilter: true,
        rowNum :40, //表格中可见的记录数
        scroll : true, //创建动态滚动表格。当设为启用时，pager被禁用，可使用垂直滚动条来装入数据。
        afterSearchCallBack: function () {

        }
      }
    });

    //初始化
    tableInstance.initGridTableObject();
    // 显示pager
    $('#table-datas-pager').show();
    tableInstance.resizeToFitContainer();
  };

  /**
   * 重置表单
   * */
  var resetForm = function () {
    // 设置默认时间
      operatingDataDashboard.setDefaultDates(0);
    // 默认选中项
    initType();
    //取消下拉列表选中
    deselectList();
    // 清空警告
    clearAlert();
    //显示提示
    showTip('暂无数据');
  };

  /**
   *  更新查询条件
   *
   * */
  var updateConditions = function () {
    //当前选中的类型
    var currentTypeObj = BasicData.operatingDataTypeObj.result[currentType];
    var currentSubtypeLabel = '';
    var currentUnitLabel = '';
    if (Array.isArray(currentSubtype)) {
      currentSubtypeLabel = currentSubtype.map(function (i) {
        return currentTypeObj.subtype[i];
      }).join(' , ');
    }
    if (Array.isArray(currentUnit)) {
      currentUnitLabel = currentUnit.map(function (k) {
        return currentTypeObj.unit[k];
      }).join(' , ');
    }
    // 当前选中的类型索引位置
    var index = BasicData.operatingDataTypeObj.val.indexOf(currentType);
    //内容更新
    $('.data-query-summary').addClass('not-empty');
    $('.query-date').text(date).attr('title', '时间: ' + date);
    $('.nav-type').text(BasicData.operatingDataTypeObj.valCN[index]).attr('title', '类型: ' + BasicData.operatingDataTypeObj.valCN[index]);
    $('.nav-subtype').text(currentSubtypeLabel).attr('title', '信息子类型: ' + currentSubtypeLabel);
    $('.nav-unit').text(currentUnitLabel).attr('title', '上传单位: ' + currentUnitLabel);
    $('.to').text('-');
    //更新查询状态
    hasQuery = true;
  };

  /**
   * 类型切换
   * */
  var toggleType = function () {
    var $lables = $('#types .btn');
    $lables.on('click', function () {
      // 清空警告
      clearAlert();
      var $this = $(this);
      var val = $('.type', $this).val();
      //若当前点击的选项数值与currentType相同,则不做任何操作
      if (val == currentType) {
        return;
      }
      currentType = val;
      operatingDataDashboard.dataset.currentType = val;
      toggleTypeRadio($this);
      toggleTypeLabel(currentType);
      updateSelectPicker(currentType);
    })
  };

  /**
   * 默认选中项
   * */
  var initType = function () {
    $('#types .btn').first().trigger('click');
  };

  /**
   * 初始化下拉列表多选插件
   * */
  var initBootstrapSelect = function () {
    $('#subtype').selectpicker({
      liveSearch: true,
      maxOptions: 1,
    });

    $('#unit-list').selectpicker({
      liveSearch: true,
      actionsBox: true,
    });
  };

  /**
   * 切换模态框显示隐藏
   *
   * tag bool true显示 false 隐藏
   **/
  var toggleModal = function (tag) {
    //模态框对象
    var $modal = $('#bootstrap-modal-dialog');
    var $body = $('body');
    // 设置显示
    if (tag) {
      $body.removeClass('hide-modal');
      $modal.modal('show');
    } else {//设置隐藏
      $body.addClass('hide-modal');
      $modal.modal('hide');
    }
  };
  /**
   * 切换选中类型项
   * that 被点击元素
   * */
  var toggleTypeRadio = function (that) {
    var $lables = $('#types .btn');
    var $radios = $('#types .type');
    var radio = $('.types', that);
    $lables.removeClass('active');
    $radios.prop('checked', false);
    radio.prop('checked', true);
  };

  /**
   * 切换类型标签
   * val 选中的单选按钮值
   */
  var toggleTypeLabel = function (typeName) {
    operatingDataDashboard.updateTypeLabel(typeName);
  };


  /**
   * 更新下拉列表
   * */
  var updateSelectPicker = function (typeName) {
    operatingDataDashboard.updateSelectOptions(typeName);
  };

  /**
   * 取消下拉列表选中
   * */
  var deselectList = function () {
    $('#subtype').selectpicker('deselectAll');
    $('#unit-list').selectpicker('deselectAll');
  };


  /**
   *  警告
   *
   *  mess str 警告信息内容
   * */
  var showAlear = function (validate) {
    var mess = '';
    if ($.isValidObject(validate)) {
      mess = validate.mess;
    } else if ($.isValidVariable(validate)) {
      mess = validate;
    }
    var $dom = $('.query-form .alert-container');
    var str = '<div class="alert alert-danger alert-dismissible fade in" role="alert">' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' +
      '<p id="alert-mess">' + mess + ' </p>' +
      '</div>';
    $dom.empty().append(str);
  };

  /**
   * 清空警告
   *
   * */
  var clearAlert = function () {
    $('.alert-container').empty();
  };

  /**
   *
   * 提示
   * */

  var showTip = function (mess) {
    mess = mess || '';
    $('.operating-data-query .no-datas-tip').text(mess).show();
  };

  /**
   * 清空提示
   * */
  var clearTip = function () {
    $('.operating-data-query .no-datas-tip').text('').hide();
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
    //创建模态框
    createModal(BasicData.modalContent);
    // 初始始化表单面板组件
    initFormDashboard();
    // 初始化日历插件datepicker
    operatingDataDashboard.initDatepicker();
    // 设置默认时间
    operatingDataDashboard.setDefaultDates(0);
    // 初始化下拉列表多选插件
    initBootstrapSelect();
    //类型选项切换
    toggleType();
    //设置默认选中类型
    initType();
  };

  /**
   *
   * 初始始化表单面板组件
   * */
  var initFormDashboard = function () {
    operatingDataDashboard = new FormDashboard({
      containerId : 'operating-data-query',
      // 表单容器
      formId : 'query-form',
      // 数据生成时间选择器
      generatetimeId : 'generate-time',
      initDatepicker : initDatepicker,
      dataset : OperatingData,
      typeObj : BasicData.operatingDataTypeObj,
      typeSelector : '',
      subTypeSelector : 'subtype',
      unitSelector : 'unit-list',
      typeLableSelector : 'type-label'
    });

    operatingDataDashboard.initDashboard();
  };

  /**
   * 初始化事件绑定
   * */
  var initEvent = function () {
    //顶部导航事件处理
    initTopNavEvent();
    //绑定Window事件，窗口变化时重新调整表格大小
    initDocumentResize();
    //绑定左侧导航'运行数据查询'点击事件
    initNavMenu();
  };


  /**
   * 顶部导航事件处理
   * */
  var initTopNavEvent = function () {
    //查询按钮点击
    $('#query-btn').on('click', function () {
      //切换模态框显示隐藏
      toggleModal(true);
    });
  };

  /**
   * 绑定Window事件，窗口变化时重新调整表格大小
   * */
  var initDocumentResize = function () {
    $(window).resize(function () {
      if ($('.operating-data-query').is(':visible')) {
        $('.table-contianer').height(getTableContianerHeight() - 20);
      }
    });
  };
  /**
   *
   * 绑定左侧导航'运行数据查询'点击事件
   * */
  var initNavMenu = function () {
    //
    $('.nav-operating-data-query').on('click', function () {
      queryModalShow();
      // 调整表格所在容器大小以适应窗口大小
      $('.table-contianer').height(getTableContianerHeight() - 20);
      //调整表格大小以适应所在容器
      if ($.isValidObject(tableInstance)) {
        tableInstance.resizeToFitContainer();
      }
    });
  };

  var queryModalShow = function () {
    //显示模态框
    if (!hasQuery) {
      toggleModal(true);
    }
    //切换时间显隐
    $('.now_time').hide();
    $('.generate-time').show();
  };

  /**
   *  计算表格初始化前父容器的高度
   * */
  var getTableContianerHeight = function () {
    var body = $('body').height();
    var head = $('.headbar').outerHeight() + parseInt($('.headbar').css('marginBottom'));
    var nav = $('.nav-menu').outerHeight() + parseInt($('.nav-menu').css('marginBottom'));
    var innerNav = $('.data-query-summary').outerHeight() + parseInt($('.data-query-summary').css('marginBottom'));
    return body - head - nav - innerNav;
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
  OperatingData.init();
});