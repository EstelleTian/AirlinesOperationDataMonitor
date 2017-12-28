
/**
 * 表单面板组件
 * @param  params 对象-参数
 *
 * */
function FormDashboard(params) {
  // 检查参数有效性
  if (!$.isValidObject(params)) {
    return;
  }
  //容器
  this.containerId = params.containerId;

  this.container = {};
  // 表单容器
  this.formId = params.formId;
  // 表单容器jQuery对象
  this.form = {};

  // 数据生成时间
  this.generatetimeId = params.generatetimeId;
  //数据-基础数据对象
  this.dataset = params.dataset;
  //数据-类型数据对象
  this.typeObj = params.typeObj;

  //回调方法-初始化日历插件datepicker
  this.initDatepicker = params.initDatepicker;
  // 类型选择器
  this.typeSelector = params.typeSelector;
  // 信息子类型选择器
  this.subTypeSelector = params.subTypeSelector;
  // 上传单位选择器
  this.unitSelector = params.unitSelector;
  // 当前选中的类型中文标签选择器
  this.typeLableSelector = params.typeLableSelector;

}

/**
 * 初始化表单面板组件
 *
 * */
FormDashboard.prototype.initDashboard = function () {
  // 当前对象this代理
  var thisProxy = this;

  thisProxy.form = $('.' + thisProxy.formId);

  thisProxy.container = $('.' + thisProxy.containerId);
};

/**
 *  设置默认时间
 * */
FormDashboard.prototype.setDefaultDates = function (num) {
  // 当前对象this代理
  var thisProxy = this;

  //当前日期
  var n = $.getFullTime(new Date()).substring(0, 8);
  //指定日期
  var target = $.addStringTime(n + '0000', 3600 * 1000 * 24 * num);
  //设置昨日为默认时间
  $('.date-datepicker', thisProxy.form).datepicker('setDate', $.parseFullTime(target));
};

/**
 * 绑定下拉列表多选插件
 *
 *
 * */
FormDashboard.prototype.initBootstrapSelect = function () {
  // 当前对象this代理
  var thisProxy = this;
  //类型
  $type = $('#' +thisProxy.typeSelector);
  if($.isValidVariable(thisProxy.typeSelector)){
    $type.selectpicker({
      // liveSearch: true,
      // maxOptions: 1,
    }).on('hidden.bs.select', function () {
      var $this = $(this);
      var val = $this.val();
      if (val && val != thisProxy.dataset.currentType) {
        thisProxy.dataset.currentType = $type.val();
        thisProxy.updateSelectOptions(val);
        thisProxy.updateTypeLabel(val);
      }
    });

    //设置当前选中的类型
    thisProxy.dataset.currentType = $type.val();
    //设置当前选中的类型
    thisProxy.updateTypeLabel(thisProxy.dataset.currentType);
  }

  //子类型
  var $subType = $('#' + thisProxy.subTypeSelector);
  if($.isValidVariable(thisProxy.subTypeSelector)){
    $subType .selectpicker({
      liveSearch: true,
      // maxOptions: 1
      // actionsBox: true
    });
  }

  //单位
  $unit = $('#' + thisProxy.unitSelector);
  if($.isValidVariable(thisProxy.unitSelector)){
    $unit.selectpicker({
      liveSearch: true,
      actionsBox: true
    });
  }
};

/**
 *  更新信息子类型和上传单位下拉列表
 *  @param typeName 类型
 *
 * */
FormDashboard.prototype.updateSelectOptions = function (typeName) {
  // 当前对象this代理
  var thisProxy = this;
  var typeObj = thisProxy.typeObj;
  var subtypeStr = thisProxy.concatOptionString(typeObj.result[typeName].subtype);
  var units = typeObj.result[typeName].unit;
  var unitListStr = thisProxy.concatOptionString(units);
  $('#' + thisProxy.subTypeSelector).empty().append(subtypeStr).selectpicker('refresh');
  $('#' + thisProxy.unitSelector).empty().append(unitListStr).selectpicker('refresh');
};


/**
 *  拼接下拉列表串
 * */
FormDashboard.prototype.concatOptionString = function (obj) {
  // 通过Object.keys()获取对象可枚举属性所组成的数组
  var array = Object.keys(obj);
  var arr = [];
  // 若array的长度为1，则下拉列表只不一项，设置其为选中
  if (array.length == 1) {
    arr.push('<option selected  value="' + array[0] + '">' + obj[array[0]] + '</option>');
  } else if (array.length > 1) {
    for (var i in obj) {
      arr.push('<option value="' + i + '">' + obj[i] + '</option>');
    }
  }
  return arr.join(' ');
};

/**
 * 设置当前选中的类型中文标签(位于上传单位标签后面)
 * */
FormDashboard.prototype.updateTypeLabel = function (typeName) {
  // 当前对象this代理
  var thisProxy = this;
  var typeObj = thisProxy.typeObj;
  var index = typeObj.val.indexOf(typeName);
  var label = typeObj.label[index];
  $('.' + thisProxy.typeLableSelector, thisProxy.form).text(label);
};

/**
 * 更新数据生成时间
 * */
FormDashboard.prototype.updateGeneratetime = function (time) {
  // 当前对象this代理
  var thisProxy = this;
  var timeFormatter = $.formateTime(time);
  $('.' + thisProxy.generatetimeId, thisProxy.container).text('数据生成时间: ' + timeFormatter);
};

/**
 * 清空数据生成时间
 * */
FormDashboard.prototype.clearGeneratetime = function () {
  // 当前对象this代理
  var thisProxy = this;
  $('.' + thisProxy.generatetimeId, thisProxy.container).text('');
}