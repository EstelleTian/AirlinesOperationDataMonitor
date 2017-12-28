/**
 * Created by caowei on 2017/11/20.
 *
 */
'use strict'
var $ = jQuery.noConflict()
var Monitor = function () {
  /*定时器总开关*/
  var isRefresh = true
  /*航班监控数据*/
  var totalDataCount = null
  /**
   * @method fomatterTime 时间格式化
   * @param {string} time 时间字符串
   * @return {string} str 返回****-**-** **:**时间格式
   * */
  var fomatterTime = function (time) {
    var year = time.substring(0, 4)
    var mon = time.substring(4, 6)
    var date = time.substring(6, 8)
    var hour = time.substring(8, 10)
    var min = time.substring(10, 12)
    var str = year + '-' + mon + '-' + date + ' ' + hour + ':' + min
    return str;
  }
  /**
   * @method getTotalDateCount获取监控主页数据统计
   * @param { object }  instanceObj  数据更新对象
   * @param { Boolean }  refresh  是否进行下次更新
   * */
  var getTotalDateCount = function (instanceObj, refresh) {
    $.ajax({
      type: 'GET',
      url: iphost + 'shareDataPlatform/totalDataCount',
      data: {},
      dataType: 'json',
      success: function (data) {
        if ($.isValidObject(data)) {
          //时间转换显示
          var generateTime = data.generatetime
          var dataTime = '数据生成时间:' + fomatterTime(generateTime)
          $('.data_time').text(dataTime)
          for (var x in totalDataCount) {
            if (totalDataCount[x] === 'undefined' || totalDataCount[x] === '' || totalDataCount[x] === 'NAN') {
              totalDataCount[x] = '-'
            }
          }
          if (totalDataCount == null) {
            totalDataCount = data.totalDataCount
            instanceObj = data.totalDataCount
            setTotalData(totalDataCount)
            //传递曲线图数据参数并初始化echarts
            totalDataCount.currentTime = generateTime
            initCurveCharts(totalDataCount)
          } else {
            refreshData(data)
          }
          // setFlightsInformation($('#company_container')) //航空公司数据初始化
          // setAirportsInformation($('#airport_container')) //机场数据初始化
          if (refresh) {
            startTimer(getTotalDateCount, totalDataCount, true, 1000 * 30)
          }
        }
      },
      error: function (error) {
        console.error(error)
      }
    })
  }
  /**
   *@method setTotalData设置监控页面数据
   *@parma 首页信息类型数据对象
   */
  var setTotalData = function (totalDataCount) {
    //机场机位信息
    $('#airport_position_num').html(totalDataCount.APOI_PSNI_DATA)
    $('#airport_position_num_file').html(totalDataCount.APOI_PSNI_FILE)
    //机场离港信息
    $('#fpdi').html(totalDataCount.APOI_FPDI_DATA)
    $('#fpdi_file').html(totalDataCount.APOI_FPDI_FILE)
    //机场到港信息
    $('#fpai').html(totalDataCount.APOI_FPAI_DATA)
    $('#fpai_file').html(totalDataCount.APOI_FPAI_FILE)
    //机场客货信息
    $('#ppci').html(totalDataCount.APOI_PPCI_DATA)
    $('#ppci_file').html(totalDataCount.APOI_PPCI_FILE)
    //航班地面状态
    $('#flgh').html(totalDataCount.ALOI_FLGH_DATA)
    $('#flgh_file').html(totalDataCount.ALOI_FLGH_FILE)
    //航班计划变更
    $('#fpln').html(totalDataCount.ALOI_FPLN_DATA)
    $('#fpln_file').html(totalDataCount.ALOI_FPLN_FILE)
    //航班客货
    $('#fpci').html(totalDataCount.ALOI_FPCI_DATA)
    $('#fpci_file').html(totalDataCount.ALOI_FPCI_FILE)
    //航班机组人员
    $('#fcri').html(totalDataCount.ALOI_FCRI_DATA)
    $('#fcri_file').html(totalDataCount.ALOI_FCRI_FILE)
    //CDM
    $('#fcdm').html(totalDataCount.ATMI_FCDM_DATA)
    $('#fcdm_file').html(totalDataCount.ATMI_FCDM_FILE)
    //流量控制措施
    $('#ftmi').html(totalDataCount.ATMI_FTMI_DATA)
    $('#ftmi_file').html(totalDataCount.ATMI_FTMI_FILE)
    //机场通行能力
    $('#padr').html(totalDataCount.ATMI_PADR_DATA)
    $('#padr_file').html(totalDataCount.ATMI_PADR_FILE)
    //MDRS
    $('#mdrs').html(totalDataCount.ATMI_MDRS_DATA)
    $('#mdrs_file').html(totalDataCount.ATMI_MDRS_FILE)
    //扇区开放
    $('#sect').html(totalDataCount.ATMI_SECT_DATA)
    $('#sect_file').html(totalDataCount.ATMI_SECT_FILE)
    //航班计划动态
    $('#fosc').html(totalDataCount.OSCI_FOSC_DATA)
    $('#fosc_file').html(totalDataCount.OSCI_FOSC_FILE)
    //航班统计
    $('#fper').html(totalDataCount.OSCI_FPER_DATA)
    $('#fper_file').html(totalDataCount.OSCI_FPER_FILE)
    //机场统计
    $('#pper').html(totalDataCount.OSCI_PPER_DATA)
    $('#pper_file').html(totalDataCount.OSCI_PPER_FILE)
  }
  /**
   * @class Charts 首页全部曲线图类名
   * @param { object } anc机场运行信息数量Jq对象
   *@param { object }  afc机场运行信息文件数量Jq对象
   * @param { object } fnc航空公司信息数量Jq对象
   *@param { object }  ffc航空公司信息文件数量Jq对象
   * @param { object } mnc空管局信息数量Jq对象
   * @param { object } mfc空管局信息文件数量Jq对象
   *@param { object }  monc监控中心信息数量Jq对象
   * @param { object } mofc监控中心信息文件数量Jq对象
   *
   * */
  var Charts = function (anc, afc, fnc, ffc, mnc, mfc, monc, mofc) {
    this.airportNumOption = echarts.init(anc)
    this.airportFileOption = echarts.init(afc)
    this.companyNumOption = echarts.init(fnc)
    this.companyFileOption = echarts.init(ffc)
    this.manageNumOption = echarts.init(mnc)
    this.manageFileOption = echarts.init(mfc)
    this.monitorNumOption = echarts.init(monc)
    this.monitorFileOption = echarts.init(mofc)
  }
  /*首页机场曲线图接口对应参数*/
  var indexAirChartOpt = {
    fpai: 'APOI_FPAI_HOUR',
    ppci: 'APOI_PPCI_HOUR',
    fpdi: 'APOI_FPDI_HOUR',
    psni: 'APOI_PSNI_HOUR'

  }
  /*首页航空公司曲线图接口对应参数*/
  var indexComChartOpt = {
    faci: 'ALOI_FACI_HOUR',
    fcri: 'ALOI_FCRI_HOUR',
    flgh: 'ALOI_FLGH_HOUR',
    fpci: 'ALOI_FPCI_HOUR',
    fpln: 'ALOI_FPLN_HOUR',
  }
  /*首页空管运行中心曲线图接口对应参数*/
  var manageOpt = {
    fcdm: 'ATMI_FCDM_HOUR',
    ftmi: 'ATMI_FTMI_HOUR',
    mdrs: 'ATMI_MDRS_HOUR',
    padr: 'ATMI_PADR_HOUR',
    sect: 'ATMI_SECT_HOUR'
  }
  /*首页监控中心曲线图接口对应参数*/
  var monitorOpt = {
    fosc: 'OSCI_FOSC_HOUR',
    fper: 'OSCI_FPER_HOUR',
    pper: 'OSCI_PPER_HOUR'
  }
  /**
   * @Class CommonOptions 曲线图公共参数类
   * @param { object } dataObj 数据对象
   * @param { object } type 数据类型 可选（dataCount/fileCount）
   * @param { string } dataOpt 需要提取的参数字段
   * @param { string } inforType 信息类型 可选（信息数/文件数）
   * */
  var CommonOptions = function (dataObj, dataOpt, type, inforType) {
    var resData = dataConvert(dataObj, dataOpt, type) || {}
    this.backgroundColor = '#FFFFFF',
    this.color = ['#3398DB'],
    this.title = {
      text: ''
    },
    this.grid = {
      left: '3%',
      right: '4%',
      bottom: '10%',
      width: '80%',
      height: '75%',
      containLabel: true
    },
    this.tooltip = {
      trigger: 'axis',
      height: 15,
      textStyle: {
        fontSize: '12'
      },
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    this.legend = {
      data: [],
      top: '20',
      right: '10',
      textStyle: {
        fontSize: '11'
      },
      orient: 'vertical'
    },
    this.xAxis = {
      name: resData.xTime || '',
      data: resData.xTimeArr,
      axisLabel: {
        formatter: function (value) {
          var res = value.substring(6, 8) + '/' + value.substring(8, 12)
          return res
        }
      },
      boundaryGap: false
    },
    this.yAxis = {
      name: inforType,
      type: 'value',
      minInterval: 1
    },
    this.dataZoom = {
      show: true,
      start: 70,
      height: 13,
      zoomLock: false,
      bottom: '5',
      end: 100
    },
    this.series = []
  }
  /**
   * @Class AirportsOptions 机场曲线图参数类
   * @param { object } dataObj 数据对象
   * @param { object } type 数据类型 可选（dataCount/fileCount）
   * @param { string } dataOpt 需要提取的参数字段
   * @param { string } inforType 信息类型 可选（信息数/文件数）
   * @for Options
   * */
  var AirportsOptions = function (dataObj, dataOpt, type, inforType) {
    var resData = dataConvert(dataObj, dataOpt, type) || {}
    CommonOptions.call(this, dataObj, dataOpt, type, inforType)
    this.legend.data = ['到港航班', '离港航班', '客货', '机位']
    this.series = [
      {
        name: '到港航班',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        lineStyle: {
          normal: {
            color: '#9abcc3'
          }
        },
        itemStyle: {
          normal: {
            color: '#9abcc3'
          }
        },
        data: Object.values(resData[dataOpt.fpai])
      }, {
        name: '离港航班',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        lineStyle: {
          normal: {
            color: '#CCCCFF'
          }
        },
        itemStyle: {
          normal: {
            color: '#CCCCFF'
          }
        },
        data: Object.values(resData[dataOpt.fpdi])
      }, {
        name: '客货',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        lineStyle: {
          normal: {
            color: '#1ABB9C'
          }
        },
        itemStyle: {
          normal: {
            color: '#1ABB9C'
          }
        },
        data: Object.values(resData[dataOpt.ppci])
      }, {
        name: '机位',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        lineStyle: {
          normal: {
            color: '#3498DB'
          }
        },
        itemStyle: {
          normal: {
            color: '#3498DB'
          }
        },
        data: Object.values(resData[dataOpt.psni])
      }
    ]
  }
  /**
   * @method refreshOption 机场曲线图数据刷新方法
   * @for AirportsOptions
   * @param 同机场曲线图参数类
   * */
  AirportsOptions.prototype.refreshOption = function (dataObj, dataOpt, type) {
    var resData = dataConvert(dataObj, dataOpt, type) || {}
    this.xAxis = {
      name: resData.xTime || '',
      data: resData.xTimeArr,
      axisLabel: {
        formatter: function (value) {
          var res = value.substring(6, 8) + '/' + value.substring(8, 12)
          return res
        }
      }
    }
    this.series = [
      {
        data: Object.values(resData[dataOpt.fpai])
      },
      {
        data: Object.values(resData[dataOpt.fpdi])
      },
      {
        data: Object.values(resData[dataOpt.ppci])
      },
      {
        data: Object.values(resData[dataOpt.psni])
      }
    ]

  }
  /**
   * @Class CompanyOptions 航空公司曲线图参数类
   * @param { object } dataObj 数据对象
   * @param { object } type 数据类型 可选（dataCount/fileCount）
   * @param { string } dataOpt 需要提取的参数字段
   * @param { string } inforType 信息类型 可选（信息数/文件数）
   * @for Options
   * */
  var CompanyOptions = function (dataObj, dataOpt, type, inforType) {
    var resData = dataConvert(dataObj, dataOpt, type) || {}
    CommonOptions.call(this, dataObj, dataOpt, type, inforType)
    this.legend.data = ['机组人员', '地面状态', '客货', '计划变更']
    this.series = [
      {
        name: '机组人员',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#CCCCFF'
          }
        },
        lineStyle: {
          normal: {
            color: '#CCCCFF'
          }
        },
        data: Object.values(resData[dataOpt.fcri])
      }, {
        name: '地面状态',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#1ABB9C'
          }
        },
        lineStyle: {
          normal: {
            color: '#1ABB9C'
          }
        },
        data: Object.values(resData[dataOpt.flgh])
      }, {
        name: '客货',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#3498DB'
          }
        },
        lineStyle: {
          normal: {
            color: '#3498DB'
          }
        },
        data: Object.values(resData[dataOpt.fpci])
      }, {
        name: '计划变更',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#E74C3C'
          }
        },
        lineStyle: {
          normal: {
            color: '#E74C3C'
          }
        },
        data: Object.values(resData[dataOpt.fpln])
      }
    ]
  }
  /**
   * @method refreshOption 航空公司曲线图数据刷新方法
   * @for CompanyOptions
   * @param 同航空公司曲线图参数类
   * */
  CompanyOptions.prototype.refreshOption = function (dataObj, dataOpt, type) {
    var resData = dataConvert(dataObj, dataOpt, type) || {}
    this.xAxis = {
      name: resData.xTime || '',
      data: resData.xTimeArr,
      axisLabel: {
        formatter: function (value) {
          var res = value.substring(6, 8) + '/' + value.substring(8, 12)
          return res
        }
      }
    }
    this.series = [
      {
        data: Object.values(resData[dataOpt.fcri])
      },
      {
        data: Object.values(resData[dataOpt.flgh])
      },
      {
        data: Object.values(resData[dataOpt.fpci])
      },
      {
        data: Object.values(resData[dataOpt.fpln])
      }
    ]
  }
  /**
   * @Class ManageOptions 空管运行中心曲线图参数类
   * @param { object } dataObj 数据对象
   * @param { object } type 数据类型 可选（dataCount/fileCount）
   * @param { string } dataOpt 需要提取的参数字段
   * @param { string } inforType 信息类型 可选（信息数/文件数）
   * @for Options
   * */
  var ManageOptions = function (dataObj, dataOpt, type, inforType) {
    var resData = dataConvert(dataObj, dataOpt, type) || {}
    CommonOptions.call(this, dataObj, dataOpt, type, inforType)
    this.legend.data = ['航班CDM', '流量控制措施', 'MDRS', '机场通行能力', '扇区开放合并']
    this.series = [
      {
        name: '航班CDM',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#9abcc3'
          }
        },
        lineStyle: {
          normal: {
            color: '#9abcc3'
          }
        },
        data: Object.values(resData[dataOpt.fcdm])
      }, {
        name: '流量控制措施',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#CCCCFF'
          }
        },
        lineStyle: {
          normal: {
            color: '#CCCCFF'
          }
        },
        data: Object.values(resData[dataOpt.ftmi])
      }, {
        name: 'MDRS',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#1ABB9C'
          }
        },
        lineStyle: {
          normal: {
            color: '#1ABB9C'
          }
        },
        data: Object.values(resData[dataOpt.mdrs])
      }, {
        name: '机场通行能力',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#3498DB'
          }
        },
        lineStyle: {
          normal: {
            color: '#3498DB'
          }
        },
        data: Object.values(resData[dataOpt.padr])
      }, {
        name: '扇区开放合并',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#E74C3C'
          }
        },
        lineStyle: {
          normal: {
            color: '#E74C3C'
          }
        },
        data: Object.values(resData[dataOpt.sect])
      }
    ]
  }
  /**
   * @method refreshOption 空管运行中心曲线图数据刷新方法
   * @for ManageOptions
   * @param 同空管运行中心曲线图参数类
   * */
  ManageOptions.prototype.refreshOption = function (dataObj, dataOpt, type) {
    var resData = dataConvert(dataObj, dataOpt, type) || {}
    this.xAxis = {
      name: resData.xTime || '',
      data: resData.xTimeArr,
      axisLabel: {
        formatter: function (value) {
          var res = value.substring(6, 8) + '/' + value.substring(8, 12)
          return res
        }
      }
    }
    this.series = [
      {
        data: Object.values(resData[dataOpt.fcdm])
      },
      {
        data: Object.values(resData[dataOpt.ftmi])
      },
      {
        data: Object.values(resData[dataOpt.mdrs])
      },
      {
        data: Object.values(resData[dataOpt.padr])
      },
      {
        data: Object.values(resData[dataOpt.sect])
      }
    ]
  }
  /**
   * @Class CommonOptions 监控中心曲线图参数类
   * @param { object } dataObj 数据对象
   * @param { object } type 数据类型 可选（dataCount/fileCount）
   * @param { string } dataOpt 需要提取的参数字段
   * @param { string } inforType 信息类型 可选（信息数/文件数）
   *
   * @for Options
   * */
  var MonitorOption = function (dataObj, dataOpt, type, inforType) {
    var resData = dataConvert(dataObj, dataOpt, type) || {}
    CommonOptions.call(this, dataObj, dataOpt, type, inforType)
    this.legend.data = ['航班计划动态', '航班统计', '机场统计']
    this.series = [
      {
        name: '航班计划动态',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#9abcc3'
          }
        },
        lineStyle: {
          normal: {
            color: '#9abcc3'
          }
        },
        data: Object.values(resData[dataOpt.fosc])
      }, {
        name: '航班统计',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#CCCCFF'
          }
        },
        lineStyle: {
          normal: {
            color: '#CCCCFF'
          }
        },
        data: Object.values(resData[dataOpt.fper])
      }, {
        name: '机场统计',
        type: 'line',
        symbol: 'none',
        smooth: true,
        border: 0,
        itemStyle: {
          normal: {
            color: '#1ABB9C'
          }
        },
        lineStyle: {
          normal: {
            color: '#1ABB9C'
          }
        },
        data: Object.values(resData[dataOpt.pper])
      }
    ]
  }
  /**
   * @method refreshOption 监控中心曲线图数据刷新方法
   * @for MonitorOption
   * @param 同监控中心曲线图参数类
   * */
  MonitorOption.prototype.refreshOption = function (dataObj, dataOpt, type) {
    var resData = dataConvert(dataObj, dataOpt, type) || {}
    this.xAxis = {
      name: resData.xTime || '',
      data: resData.xTimeArr,
      axisLabel: {
        formatter: function (value) {
          var res = value.substring(6, 8) + '/' + value.substring(8, 12)
          return res
        }
      }
    }
    this.series = [
      {
        data: Object.values(resData[dataOpt.fosc])
      },
      {
        data: Object.values(resData[dataOpt.fper])
      },
      {
        data: Object.values(resData[dataOpt.pper])
      }
    ]
  }
  /*初始化首页曲线图实例*/
  var charts = new Charts($('#airport_num_chart')[0], $('#airport_file_chart')[0], $('#flight_num_chart')[0], $('#flight_file_chart')[0], $('#manage_num_chart')[0], $('#manage_file_chart')[0], $('#monitor_num_chart')[0], $('#monitor_file_chart')[0])
  /**
   * 首页曲线图参数实例化
   * @param { string } dataObj 曲线图数据对象集合
   * @for initCurveCharts
   * */
  var Options = function (dataObj) {
    this.airportNumOption = new AirportsOptions(dataObj, indexAirChartOpt, 'data_COUNT', '信息数/个')
    this.airportFileOption = new AirportsOptions(dataObj, indexAirChartOpt, 'file_COUNT', '文件数/个')
    this.companyNumOption = new CompanyOptions(dataObj, indexComChartOpt, 'data_COUNT', '信息数/个')
    this.companyFileOption = new CompanyOptions(dataObj, indexComChartOpt, 'file_COUNT', '文件数/个')
    this.manageNumOption = new ManageOptions(dataObj, manageOpt, 'data_COUNT', '信息数/个')
    this.manageFileOption = new ManageOptions(dataObj, manageOpt, 'file_COUNT', '文件数/个')
    this.monitorNumOption = new MonitorOption(dataObj, monitorOpt, 'data_COUNT', '信息数/个')
    this.monitorFileOption = new MonitorOption(dataObj, monitorOpt, 'file_COUNT', '文件数/个')
  }
  //首页曲线图参数实例
  var options = {}
  /**
   * @method initCurveCharts 初始化当日监控曲线图
   * @param { object } dataObj 首页曲线图对象集合
   * */
  var initCurveCharts = function (dataObj) {
    options = new Options(dataObj)
    // 曲线图参数设置。
    $.each(charts, function (i) {
      this.setOption(options[i])
    })
  }
  /**
   * @method dataConvert 曲线图数据转换
   * @param { object } data数据集合
   * @param { string } opt机场、航空公司、空管、监控中心的字段
   * @param { string } type 数量 文件数量字段
   * @return {object}  res 返回曲线图所需的数据对象格式
   * **/
  var dataConvert = function (data, opt, type) {
    var res = {}
    if (!$.isValidVariable(opt) || !$.isValidVariable(type)) {
      return res
    }
    //x轴标题
    var xTime = data.currentTime.substring(0, 4) + '年' + data.currentTime.substring(4, 6) + '月'
    //X轴日期 yyyy-MM
    res.xTime = xTime
    var xTimeArr = []

    for (var key in opt) {
      if ($.isValidVariable(key)) {
        //子类型
        var option = opt[key]
        res[option] = {}
        //子类型对应的数值
        var dataarr = data[option]
        if ($.isValidObject(dataarr) && dataarr != null) {
          //遍历数据
          for (var i = 0, len = dataarr.length; i < len; i++) {
            //获取时间
            var time = dataarr[i]['hour']
            //获取数值
            var value = dataarr[i][type] * 1
            //添加数据
            if (xTimeArr.indexOf(time) == -1) {
              xTimeArr.push(time)
            }
            res[option][time] = value
          }
        }
      }
    }
    res.xTimeArr = xTimeArr.sort()
    return res
  }
  /*机场详情运行信息对象数组*/
  var airportsChartArr = {
    numChartArr: [],
    fileChartArr: [],
    airNumOptions: [],
    airFileOptions: [],
    dataArr: []
  }
  /*机场详情曲线图接口对应参数*/
  var airportChartOpt = {
    fpai: 'FPAI_HOUR',
    fpdi: 'FPDI_HOUR',
    ppci: 'PPCI_HOUR',
    psni: 'PSNI_HOUR'
  }
  /**
   * @method setAirportsInformation 渲染机场详情页面dom节点
   * @param fatherDom 接受机场详情页面节点的父级节点
   * */
  var setAirportsInformation = function (fatherDom) {
    $.ajax({
      type: 'GET',
      url: iphost + 'shareDataPlatform/airportDataCount',
      data: {},
      dataType: 'json',
      success: function (data) {
        if ($.isValidObject(data)) {
          var airportsData = Object.values(data.airportDatas)
          airportsChartArr.dataArr = airportsData
          var generateTime = data.generatetime
          var dataTime = '数据生成时间:' + fomatterTime(generateTime)
          $('.data_time').text(dataTime)
          if (airportsData.length > 0) {
            $('#company_container').find('.no_data').hide()
            //时间转换显示
            var generateTime = data.generatetime
            var airDataLen = airportsData.length
            for (var i = 0; i < airDataLen; i++) {
              airportsData[i].currentTime = generateTime
              var airportsDom = '<div class="flight_group box flights_charts"> <h2>' + airportsData[i].airportName + '机场运行信息</h2> <div class="information"> <div class="num_chart col-lg-5 col-sm-4" id="airport_num' + i + '"></div> <div class="airport col-lg-2 col-sm-4"> <div class="airport_head"> <div class="airport_num">信息数</div> <div class="information_name">信息类型</div> <div class="file_num">文件数</div></div>  <ul class="airport_data_detail"> <li> <p class="num airport_position_num">' + airportsData[i].PSNI_DATA + '</p> <p class="airport_position">机场机位信息</p> <p class="f_num airport_position_num_file">' + airportsData[i].PSNI_FILE + '</p> </li> <li> <p class="num fpdi">' + airportsData[i].FPDI_DATA + '</p> <p class="airport_position">机场离港航班信息</p> <p class="f_num fpdi_file">' + airportsData[i].FPDI_FILE + '</p> </li> <li> <p class="num fpai">' + airportsData[i].FPAI_DATA + '</p><p class="airport_position">机场到港航班信息</p> <p class="f_num fpai_file">' + airportsData[i].FPAI_FILE + '</p> </li> <li> <p class="num ppci">' + airportsData[i].PPCI_DATA + '</p> <p class="airport_position">机场客货信息</p> <p class="f_num ppci_file">' + airportsData[i].PPCI_FILE + '</p> </li> </ul> </div> <div class="file_chart col-lg-5 col-sm-4" id="airport_file' + i + '"></div><div class="clb"></div> </div> </div>'
              fatherDom.append(airportsDom)
              var numOptions = new AirportsOptions(airportsData[i], airportChartOpt, 'data_COUNT', '信息数/个')
              airportsChartArr.airNumOptions.push(numOptions)
              var fileOptions = new AirportsOptions(airportsData[i], airportChartOpt, 'file_COUNT', '文件数/个')
              airportsChartArr.airFileOptions.push(fileOptions)
            }
            var flightChartLen = $('.flights_charts').length
            for (var j = 0; j < flightChartLen; j++) {
              var chartsMulNum = echarts.init($('#airport_num' + j)[0])
              var chartsMulFile = echarts.init($('#airport_file' + j)[0])
              airportsChartArr.numChartArr.push(chartsMulNum)
              airportsChartArr.fileChartArr.push(chartsMulFile)
              chartsMulNum.setOption(airportsChartArr.airNumOptions[j])
              chartsMulFile.setOption(airportsChartArr.airFileOptions[j])
            }
          } else {
            $('#airport_container').find('.no_data').show()
          }
        }
      },
      error: function (error) {
        console.error(error)
      }
    })
  }
  /**
   * @method refreshAirportsInformation 刷新机场详情页面方法
   * */
  var refreshAirportsInformation = function () {
    $.ajax({
      type: 'GET',
      url: iphost + 'shareDataPlatform/airportDataCount',
      data: {},
      dataType: 'json',
      success: function (data) {
        if ($.isValidObject(data)) {
          var generateTime = data.generatetime
          var dataTime = '数据生成时间:' + fomatterTime(generateTime)
          $('.data_time').text(dataTime)
          var airportsData = data.airportDatas
          if (airportsChartArr.dataArr.length == airportsData.length) {
            var len = airportsChartArr.airNumOptions.length
            for (var i = 0; i < len; i++) {
              airportsData[i].currentTime = generateTime
              airportsChartArr.airNumOptions[i].refreshOption(airportsData[i], 'data_COUNT', airportChartOpt)
              airportsChartArr.numChartArr[i].setOption(airportsChartArr.airNumOptions[i])
              airportsChartArr.airFileOptions[i].refreshOption(airportsData[i], 'file_COUNT', airportChartOpt)
              airportsChartArr.fileChartArr[i].setOption(airportsChartArr.airFileOptions[i])
            }
          } else if (airportsData.length > airportsChartArr.dataArr.length) {
            var len = airportsChartArr.dataArr.length
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < airportsData.length; j++) {
                if (airportsData[j].airportName == airportsChartArr.dataArr[i].airportName) {
                  airportsData[i].currentTime = generateTime
                  airportsChartArr.airNumOptions[i].refreshOption(airportsData[i], 'data_COUNT', airportChartOpt)
                  airportsChartArr.numChartArr[i].setOption(airportsChartArr.airNumOptions[i])
                  airportsChartArr.airFileOptions[i].refreshOption(airportsData, 'file_COUNT', airportChartOpt)
                  airportsChartArr.fileChartArr[i].setOption(airportsChartArr[i].airFileOptions[i])
                } else {
                  airportsData[i].currentTime = generateTime
                  var airportsDom = '<div class="flight_group box flights_charts"> <h2>' + airportsData[i].airportName + '机场运行信息</h2> <div class="information"> <div class="num_chart col-lg-5 col-sm-4" id="airport_num' + i + '"></div> <div class="airport col-lg-2 col-sm-4"> <div class="airport_head"> <div class="airport_num">信息数</div> <div class="information_name">信息类型</div> <div class="file_num">文件数</div></div>  <ul class="airport_data_detail"> <li> <p class="num airport_position_num">' + airportsData[i].PSNI_DATA + '</p> <p class="airport_position">机场机位信息</p> <p class="f_num airport_position_num_file">' + airportsData[i].PSNI_FILE + '</p> </li> <li> <p class="num fpdi">' + airportsData[i].FPDI_DATA + '</p> <p class="airport_position">机场离港航班信息</p> <p class="f_num fpdi_file">' + airportsData[i].FPDI_FILE + '</p> </li> <li> <p class="num fpai">' + airportsData[i].FPAI_DATA + '</p><p class="airport_position">机场到港航班信息</p> <p class="f_num fpai_file">' + airportsData[i].FPAI_FILE + '</p> </li> <li> <p class="num ppci">' + airportsData[i].PPCI_DATA + '</p> <p class="airport_position">机场客货信息</p> <p class="f_num ppci_file">' + airportsData[i].PPCI_FILE + '</p> </li> </ul> </div> <div class="file_chart col-lg-5 col-sm-4" id="airport_file' + i + '"></div><div class="clb"></div> </div> </div>'
                  $('#airport_container').append(airportsDom)
                  var numOptions = new AirportsOptions(airportsData[i], airportChartOpt, 'data_COUNT')
                  airportsChartArr.airNumOptions.push(numOptions)
                  var fileOptions = new AirportsOptions(airportsData[i], airportChartOpt, 'file_COUNT')
                  airportsChartArr.airFileOptions.push(fileOptions)
                  var chartsMulNum = echarts.init($('#airport_num' + j)[0])
                  var chartsMulFile = echarts.init($('#airport_file' + j)[0])
                  airportsChartArr.numChartArr.push(chartsMulNum)
                  airportsChartArr.fileChartArr.push(chartsMulFile)
                  chartsMulNum.setOption(airportsChartArr.airNumOptions[j])
                  chartsMulFile.setOption(airportsChartArr.airFileOptions[j])
                  airportsChartArr.dataArr.push(airportsData[j])
                }
              }
            }
          } else if (airportsData.length < airportsChartArr.dataArr.length) {
            var len = airportsData.length
            var difLen = airportsChartArr.dataArr.length - airportsData.length
            airportsChartArr.comNumOptions.slice(0, len + 1)
            for (var i = 0; i < difLen; i++) {
              $('#airport_container').removeChild($('.flights_charts')[i])
            }
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < airportsData.length; j++) {
                airportsData[i].currentTime = generateTime
                airportsChartArr.airNumOptions[i].refreshOption(airportsData[i], 'data_COUNT', airportChartOpt)
                airportsChartArr.numChartArr[i].setOption(airportsChartArr.airNumOptions[i])
                airportsChartArr.airFileOptions[i].refreshOption(airportsData, 'file_COUNT', airportChartOpt)
                airportsChartArr.fileChartArr[i].setOption(airportsChartArr[i].airFileOptions[i])
              }
            }
          }
        }
      },
      error: function (error) {
        console.error(error)
      }
    })
  }
  /*航空公司详情运行信息对象数组*/
  var companyChartsArr = {
    numChartArr: [],
    fileChartArr: [],
    comNumOptions: [],
    comFileOptions: [],
    dataArr: []
  }
  /*航空公司详情曲线图接口对应参数*/
  var companyChartOpt = {
    faci: 'FACI_HOUR',
    fcri: 'FCRI_HOUR',
    flgh: 'FLGH_HOUR',
    fpci: 'FPCI_HOUR',
    fpln: 'FPLN_HOUR'
  }
  /**
   * @method setFlightsInformation 初始化航空公司运行信息
   * @param fatherDom 存放航空公司运行信息的父节点
   * */
  var setFlightsInformation = function (fatherDom) {
    $.ajax({
      type: 'GET',
      url: iphost + 'shareDataPlatform/companyDataCount',
      data: {},
      dataType: 'json',
      success: function (data) {
        if ($.isValidObject(data)) {
          var generateTime = data.generatetime
          var dataTime = '数据生成时间:' + fomatterTime(generateTime)
          $('.data_time').text(dataTime)
          var companyDatas = Object.values(data.companyDatas)
          if (companyDatas.length > 0) {
            $('#company_container').find('.no_data').hide()
            //时间转换显示
            var generateTime = data.generatetime
            var comDataLen = companyDatas.length
            for (var i = 0; i < comDataLen; i++) {
              companyDatas[i].currentTime = generateTime
              var flightsDom = '<div class="flight_group box company_charts"><h2>' + companyDatas[i].companyName + '航空运行信息</h2><div class="information"><div class="num_chart col-lg-5 col-sm-4" id="flight_num' + i + '"></div><div class="airport col-lg-2 col-sm-4"><div class="airport_head"><div class="airport_num">信息数</div><div class="information_name">信息类型</div><div class="file_num">文件数</div></div><ul class="airport_data_detail"><li><p class="num flgh">' + companyDatas[i].FLGH_DATA + '</p><p class="airport_position">航班地面状态信息</p><p class="f_num flgh_file">' + companyDatas[i].FLGH_FILE + '</p></li><li><p class="num fpln">' + companyDatas[i].FPLN_DATA + '</p><p class="airport_position">航班计划变更信息</p><p class="f_num fpln_file">' + companyDatas[i].FPLN_FILE + '</p></li><li><p class="num fpci">' + companyDatas[i].FPCI_DATA + '</p><p class="airport_position">航班客货信息</p><p class="f_num fpci_file">' + companyDatas[i].FPCI_FILE + '</p> </li> <li> <p class="num fcri">' + companyDatas[i].FCRI_DATA + '</p> <p class="airport_position">航班机组人员信息</p> <p class="f_num fcri_file">' + companyDatas[i].FCRI_FILE + '</p> </li> </ul> </div> <div class="file_chart col-lg-5 col-sm-4" id="flight_file' + i + '"></div> <div class="clb"></div> </div> </div>'
              fatherDom.append(flightsDom)
              var numOptions = new CompanyOptions(companyDatas[i], companyChartOpt, 'data_COUNT', '信息数/个')
              companyChartsArr.comNumOptions.push(numOptions)
              var fileOptions = new CompanyOptions(companyDatas[i], companyChartOpt, 'file_COUNT', '文件数/个')
              companyChartsArr.comFileOptions.push(fileOptions)
            }
            var comChartsLen = $('.company_charts').length
            for (var j = 0; j < comChartsLen; j++) {
              var chartsMulNum = echarts.init($('#flight_num' + j)[0])
              var chartsMulFile = echarts.init($('#flight_file' + j)[0])
              companyChartsArr.numChartArr.push(chartsMulNum)
              companyChartsArr.fileChartArr.push(chartsMulFile)
              chartsMulNum.setOption(companyChartsArr.comNumOptions[j])
              chartsMulFile.setOption(companyChartsArr.comFileOptions[j])
            }
          } else {
            $('#company_container').find('.no_data').show()
          }
        }
      },
      error: function (error) {
        console.error(error)
      }
    })
  }
  /**
   * @method refreshFlightInformation 刷新航空公司详情页面方法
   * */
  var refreshFlightInformation = function () {
    $.ajax({
      type: 'GET',
      url: iphost + 'shareDataPlatform/companyDataCount',
      data: {},
      dataType: 'json',
      success: function (data) {
        if ($.isValidObject(data)) {
          var generateTime = data.generatetime
          var dataTime = '数据生成时间:' + fomatterTime(generateTime)
          $('.data_time').text(dataTime)
          var companyDatas = data.companyDatas
          if (companyChartsArr.dataArr.length == companyDatas.length) {
            var len = companyChartsArr.comFileOptions.length
            for (var i = 0; i < len; i++) {
              companyDatas[i].currentTime = generateTime
              companyChartsArr.comNumOptions[i].refreshOption(companyDatas[i], 'data_COUNT', companyChartOpt)
              companyChartsArr.numChartArr[i].setOption(companyChartsArr.comNumOptions[i])
              companyChartsArr.comFileOptions[i].refreshOption(companyDatas[i], 'file_COUNT', companyChartOpt)
              companyChartsArr.fileChartArr[i].setOption(companyChartsArr.comFileOptions[i])
            }
          } else if (companyDatas.length > companyChartsArr.dataArr.length) {
            var len = companyChartsArr.dataArr.length
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < companyDatas.length; j++) {
                if (companyDatas[j].airportName == companyChartsArr.dataArr[i].airportName) {
                  airportsData[i].currentTime = generateTime
                  companyChartsArr.comNumOptions[i].refreshOption(companyDatas[i], 'data_COUNT', companyChartOpt)
                  companyChartsArr.numChartArr[i].setOption(companyChartsArr.comNumOptions[i])
                  companyChartsArr.comFileOptions[i].refreshOption(companyDatas[i], 'file_COUNT', companyChartOpt)
                  companyChartsArr.fileChartArr[i].setOption(companyChartsArr.comFileOptions[i])
                } else {
                  airportsData[i].currentTime = generateTime
                  var flightsDom = '<div class="flight_group box company_charts"><h2>' + companyDatas[i].companyName + '航空运行信息</h2><div class="information"><div class="num_chart col-lg-5 col-sm-4" id="flight_num' + i + '"></div><div class="airport col-lg-2 col-sm-4"><div class="airport_head"><div class="airport_num">信息数</div><div class="information_name">信息类型</div><div class="file_num">文件数</div></div><ul class="airport_data_detail"><li><p class="num flgh">' + companyDatas[i].FLGH_DATA + '</p><p class="airport_position">航班地面状态信息</p><p class="f_num flgh_file">' + companyDatas[i].FLGH_FILE + '</p></li><li><p class="num fpln">' + companyDatas[i].FPLN_DATA + '</p><p class="airport_position">航班计划变更信息</p><p class="f_num fpln_file">' + companyDatas[i].FPLN_FILE + '</p></li><li><p class="num fpci">' + companyDatas[i].FPCI_DATA + '</p><p class="airport_position">航班客货信息</p><p class="f_num fpci_file">' + companyDatas[i].FPCI_FILE + '</p> </li> <li> <p class="num fcri">' + companyDatas[i].FCRI_DATA + '</p> <p class="airport_position">航班机组人员信息</p> <p class="f_num fcri_file">' + companyDatas[i].FCRI_FILE + '</p> </li> </ul> </div> <div class="file_chart col-lg-5 col-sm-4" id="flight_file' + i + '"></div> <div class="clb"></div> </div> </div>'
                  $('#company_container').append(flightsDom)
                  var numOptions = new CompanyOptions(companyDatas[i], companyChartOpt, 'data_COUNT', '信息数/个')
                  companyChartsArr.comNumOptions.push(numOptions)
                  var fileOptions = new CompanyOptions(companyDatas[i], companyChartOpt, 'file_COUNT', '文件数/个')
                  companyChartsArr.comFileOptions.push(fileOptions)
                  var chartsMulNum = echarts.init($('#flight_num' + j)[0])
                  var chartsMulFile = echarts.init($('#flight_file' + j)[0])
                  companyChartsArr.numChartArr.push(chartsMulNum)
                  companyChartsArr.fileChartArr.push(chartsMulFile)
                  chartsMulNum.setOption(companyChartsArr.comNumOptions[j])
                  chartsMulFile.setOption(companyChartsArr.comFileOptions[j])
                }
              }
            }

          } else if (companyDatas.length < companyChartsArr.dataArr.length) {
            var len = companyDatas.length
            var difLen = companyChartsArr.dataArr.length - companyDatas.length
            companyChartsArr.comNumOptions.slice(0, len + 1)
            for (var i = 0; i < difLen; i++) {
              $('#company_container').removeChild($('.company_charts')[i])
            }
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < companyDatas.length; j++) {
                companyDatas[i].currentTime = generateTime
                companyChartsArr.comNumOptions[i].refreshOption(companyDatas[i], 'data_COUNT', companyChartOpt)
                companyChartsArr.numChartArr[i].setOption(companyChartsArr.comNumOptions[i])
                companyChartsArr.comFileOptions[i].refreshOption(companyDatas[i], 'file_COUNT', companyChartOpt)
                companyChartsArr.fileChartArr[i].setOption(companyChartsArr.comFileOptions[i])
              }
            }
          }

        }
      },
      error: function (error) {
        console.error(error)
      }
    })
  }
  /**
   * @method initAirCom 机场航空公司点击切换事件
   * */
  var initAirCom = function () {
    //机场
    $('#airport_operation').on('click', function () {
      $('.content-container .row').removeClass('active')
      $('#airport').addClass('active')
      $('#airport_container').find('.flight_group').remove()
      setAirportsInformation($('#airport_container')) //机场数据初始化
      resizeFit()
    })
    //航空公司
    $('#flights_operation').on('click', function () {
      $('.content-container .row').removeClass('active')
      $('#company').addClass('active')
      $('#company_container').find('.flight_group').remove()
      setFlightsInformation($('#company_container')) //航空公司数据初始化
      resizeFit()
    })
    //机场面包屑点击事件
    $('.bread_air').on('click', function () {
      $('.content-container .row').removeClass('active')
      $('#home').addClass('active')
      refreshData(true) //监控页面数据刷新
      resizeFit()
    })
    //航空公司面包屑点击事件
    $('.bread_com').on('click', function () {
      $('.content-container .row').removeClass('active')
      $('#home').addClass('active')
      refreshData(true) //监控页面数据刷新
      resizeFit()
    })
  }
  /**@method resizeEnd 延迟加载屏幕尺寸计算方法
   * @param {function} callback 要执行的回调函数
   * @param {number} timeout 拖动停止后的延时参数
   * */
  $.fn.resizeEnd = function (callback, timeout) {
    $(this).resize(function () {
      var $this = $(this)
      if ($this.data('resizeTimeout')) {
        clearTimeout($this.data('resizeTimeout'))
      }
      $this.data('resizeTimeout', setTimeout(callback, timeout))
    })
  }
  //适应屏幕宽高尺寸
  $(window).resizeEnd(function () {
    $.each(charts, function () {
      this.resize()
    })
    if (!$('#airports_container').is(':hidden')) {
      var len = airportsChartArr.numChartArr.length
      var airChartNumArr = airportsChartArr.numChartArr
      var airChartFileArr = airportsChartArr.fileChartArr
      for (var i = 0; i < len; i++) {
        airChartNumArr[i].resize()
        airChartFileArr[i].resize()
      }
    }
    if (!$('#company_container').is(':hidden')) {
      var len = companyChartsArr.numChartArr.length
      var comChartNumArr = companyChartsArr.numChartArr
      var comChartFileArr = companyChartsArr.fileChartArr
      for (var i = 0; i < len; i++) {
        comChartNumArr[i].resize()
        comChartFileArr[i].resize()
      }
    }
  }, 200)
  /**
   * @method refreshChartsOption 全部数据刷新方法集合调用
   * @param （object） data 刷新数据对象集合
   * */
  function refreshChartsOption(data) {
    if ($('#home').is(':visible')) {
      if ($.isValidObject(data)) {
        var totalDataCount = data.totalDataCount
        //时间转换显示
        var generateTime = data.generatetime
        var dataTime = '数据生成时间:' + fomatterTime(generateTime)
        $('.data_time').text(dataTime)
        for (var x in totalDataCount) {
          if (totalDataCount[x] === 'undefined' || totalDataCount[x] === '' || totalDataCount[x] === 'NAN') {
            totalDataCount[x] = '-'
          }
        }
        setTotalData(totalDataCount)
        //更新时间
        totalDataCount.currentTime = generateTime
        //参数刷新
        options.airportNumOption.refreshOption(totalDataCount, indexAirChartOpt, 'data_COUNT')
        options.airportFileOption.refreshOption(totalDataCount, indexAirChartOpt, 'file_COUNT')
        options.companyNumOption.refreshOption(totalDataCount, indexComChartOpt, 'data_COUNT')
        options.companyFileOption.refreshOption(totalDataCount, indexComChartOpt, 'file_COUNT')
        options.manageNumOption.refreshOption(totalDataCount, manageOpt, 'data_COUNT')
        options.manageFileOption.refreshOption(totalDataCount, manageOpt, 'file_COUNT')
        options.monitorNumOption.refreshOption(totalDataCount, monitorOpt, 'data_COUNT')
        options.monitorFileOption.refreshOption(totalDataCount, monitorOpt, 'file_COUNT')
        // 刷新后曲线图参数设置。
        $.each(charts, function (i) {
          this.setOption(options[i])
        })
      }
    }
    //机场数据刷新
    if ($('#airport_container').is(':visible')) {
      refreshAirportsInformation()
    }
    //航空公司数据刷新
    if ($('#company_container').is(':visible')) {
      refreshFlightInformation()
    }
  }

  /**
   * @method refreshData 定时刷新方法
   * @param （object） data 刷新数据对象集合
   **/
  var refreshData = function (data) {
    refreshChartsOption(data)
  }
  //定时器
  var startTimer = function (func, instance, isNext, time) {
    if (isRefresh) { // 定时器总开关为true
      if (typeof func == 'function') {
        setTimeout(function () {
          func(instance, isNext)
        }, time)
      }
    }
  }
  var resizeFit = function () {
    $.each(charts, function () {
      this.resize()
    })
    if (!$('.airports_container').is(':hidden')) {
      var len = airportsChartArr.numChartArr.length
      var airChartNumArr = airportsChartArr.numChartArr
      var airChartFileArr = airportsChartArr.fileChartArr
      for (var i = 0; i < len; i++) {
        airChartNumArr[i].resize()
        airChartFileArr[i].resize()
      }
    }
    if (!$('.company_container').is(':hidden')) {
      var len = companyChartsArr.numChartArr.length
      var comChartNumArr = companyChartsArr.numChartArr
      var comChartFileArr = companyChartsArr.fileChartArr
      for (var i = 0; i < len; i++) {
        comChartNumArr[i].resize()
        comChartFileArr[i].resize()
      }
    }
  }
  return {
    initMonitor: function () {
      initAirCom() //机场航空公司点击事件初始化
      getTotalDateCount(totalDataCount, true) //获取航班监控页面数据
    },
    resizeFit: function () {
      resizeFit() //适配屏幕尺寸
    }
  }
}()
$(document).ready(function () {
  Monitor.initMonitor()
})
