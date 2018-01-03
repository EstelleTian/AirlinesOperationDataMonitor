/**
 * Created by caowei on 2017/11/20.
 *
 */
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
    return str
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
            //定时刷新
            refreshChartsOption(data)
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
  /*首页机场曲线图接口对应参数*/
  var indexAirChartOpt = {
    fpai: 'APOI_FPAI_HOUR',
    ppci: 'APOI_PPCI_HOUR',
    fpdi: 'APOI_FPDI_HOUR',
    psni: 'APOI_PSNI_HOUR'

  }
  /*首页航空公司曲线图接口对应参数*/
  var indexComChartOpt = {
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
   * @param { object } resData 数据对象
   * @param { object } type 数据类型 可选（dataCount/fileCount）
   * @param { string } dataOpt 需要提取的参数字段
   * @param { string } inforType 信息类型 可选（信息数/文件数）
   * */
  var CommonOptions = function (resData, dataOpt, type, inforType) {
    this.chart = {
      type: "spline",
      height: "170px",
      margin: [20,90,10,50],
      spacingLeft:0,
      events:{
        load:'',
      }
    },
      this.loading = {
        showDuration:2
      },
      this.global = {
        useUTC: false
      },
      this.rangeSelector = {
        enabled: false
      },
      this.credits = {
        enabled: false
      },
      this.navigator = {
        enabled:true,
        height: 10,
        xAxis: {
          labels: false,
        }
      },
      this.scrollbar = {
        height: 10,
      },
      this.backgroundColor = '#EEFFFF',
      this.plotOptions = {
        series:{
          marker:{
            enabled:false,
          }
        },
        areaspline:{

        }
      },
      this.title = {
        text: ''
      },
      this.tooltip = {
        borderColor: 'transparent',
        padding:1,
        split:true,
        shape:'square'
      },
      this.legend = {
        enabled: true,
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
      },
      this.xAxis = {
        allowDecimals: false,
        max:40,
        title: {
          text: resData.xTime || '',
          align: 'high',
          y:-30,
          x:80
        },
        categories: resData.xTimeArr,
        labels:{
          step: 20,
          formatter:function () {
            var res = this.value.substring(6, 8) + '/' + this.value.substring(8, 12)
            return res
          }
        }
      },
      this.yAxis = {
        allowDecimals:false,
        title: {
          text: inforType,
          align:'high',
          rotation:360,
          y:-10,
          x:60
        },
        opposite:false
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
    CommonOptions.call(this, resData, dataOpt, type, inforType);
    this.series = [
      {
        id:'fpai',
        name: '到港航班',
        type: 'spline',
        data: Object.values(resData[dataOpt.fpai])
      }, {
        id:'fpdi',
        name: '离港航班',
        type: 'spline',
        data: Object.values(resData[dataOpt.fpdi])
      }, {
        id:'ppci',
        name: '客货',
        type: 'spline',
        data: Object.values(resData[dataOpt.ppci])
      }, {
        id:'psni',
        name: '机位',
        type: 'spline',
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
    CommonOptions.call(this, resData, dataOpt, type, inforType)
    this.series = [
      {
        id:'fcri',
        name: '机组人员',
        type: 'spline',
        data: Object.values(resData[dataOpt.fcri])
      }, {
        id:'flgh',
        name: '地面状态',
        type: 'spline',
        data: Object.values(resData[dataOpt.flgh])
      }, {
        id:'fpci',
        name: '客货',
        type: 'spline',
        data: Object.values(resData[dataOpt.fpci])
      }, {
        id:'fpln',
        name: '计划变更',
        type: 'spline',
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
    CommonOptions.call(this, resData, dataOpt, type, inforType)
    this.series = [
      {
        id:'fcdm',
        name: '航班CDM',
        type: 'spline',
        data: Object.values(resData[dataOpt.fcdm])
      }, {
        id:'ftmi',
        name: '流量控制措施',
        type: 'spline',
        data: Object.values(resData[dataOpt.ftmi])
      }, {
        id:'mdrs',
        name: 'MDRS',
        type: 'spline',
        data: Object.values(resData[dataOpt.mdrs])
      }, {
        id:'padr',
        name: '机场通行能力',
        type: 'spline',
        data: Object.values(resData[dataOpt.padr])
      }, {
        id:'sect',
        name: '扇区开放合并',
        type: 'spline',
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
   * @for Options
   * */
  var MonitorOption = function (dataObj, dataOpt, type, inforType) {
    var resData = dataConvert(dataObj, dataOpt, type) || {}
    CommonOptions.call(this, resData, dataOpt, type, inforType)
    this.series = [
      {
        id:'fosc',
        name: '航班计划动态',
        type: 'spline',
        data: Object.values(resData[dataOpt.fosc])
      }, {
        id:'fper',
        name: '航班统计',
        type: 'spline',
        data: Object.values(resData[dataOpt.fper])
      }, {
        id:'pper',
        name: '机场统计',
        type: 'spline',
        data: Object.values(resData[dataOpt.pper])
      }
    ]
  }
  //首页曲线图参数对象原型
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
  var indexCharts = {
    airportNumChart:{},
    airportFlieChart:{},
    flightNumChart:{},
    flightFlieChart:{},
    manageNumChart:{},
    manageFlieChart:{},
    monitorNumChart:{},
    monitorFlieChart:{}
  }
  /**
   * @method initCurveCharts 初始化当日监控曲线图
   * @param { object } dataObj 首页曲线图对象集合
   * */
  var initCurveCharts = function (dataObj) {
    options = new Options(dataObj)
    // 曲线图参数设置。
    indexCharts.airportNumChart = Highcharts.chart($('#airport_num_chart')[0],options.airportNumOption)
    indexCharts.airportFlieChart = Highcharts.chart($('#airport_file_chart')[0], options.airportFileOption)
    indexCharts.flightNumChart = Highcharts.chart($('#flight_num_chart')[0], options.companyNumOption)
    indexCharts.flightFlieChart = Highcharts.chart($('#flight_file_chart')[0], options.companyFileOption)
    indexCharts.manageNumChart = Highcharts.chart($('#manage_num_chart')[0], options.manageNumOption)
    indexCharts.manageFlieChart = Highcharts.chart($('#manage_file_chart')[0], options.manageFileOption)
    indexCharts.monitorNumChart = Highcharts.chart($('#monitor_num_chart')[0], options.monitorNumOption)
    indexCharts.monitorFlieChart = Highcharts.chart($('#monitor_file_chart')[0], options.monitorFileOption)
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
    airports:[],
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
              var fileOptions = new AirportsOptions(airportsData[i], airportChartOpt, 'file_COUNT', '文件数/个')
              var chartsMulNum = Highcharts.chart($('#airport_num' + i)[0],numOptions)
              var chartsMulFile = Highcharts.chart($('#airport_file' + i)[0],fileOptions)
              var airObj = {
                numOptions:numOptions,
                fileOptions:fileOptions,
                chartsMulNum:chartsMulNum,
                chartsMulFile:chartsMulFile
              }
              airportsChartArr.airports.push(airObj);
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
          var airportsData = []
          $.each(data.airportDatas,function (i,e) {
            airportsData.push(e)
          })
          $.each(airportsChartArr.airports,function (num,air) {
            airportsData[num].currentTime = generateTime
            var  dataRes = dataConvert(airportsData[num], airportChartOpt, 'data_COUNT')
            var  fileRes = dataConvert(airportsData[num], airportChartOpt, 'file_COUNT')
            $.each(airportChartOpt,function (index,e) {
              var dataElement = air.chartsMulNum.get(index)
              dataElement.xAxis.categories = dataRes.xTimeArr
              dataElement.setData(Object.values(dataRes[airportChartOpt[index]]),true, false, false);
              var fileElement = air.chartsMulFile.get(index)
              fileElement.xAxis.categories = fileRes.xTimeArr
              fileElement.setData(Object.values(fileRes[airportChartOpt[index]]),true, false, false);
            })
            air.chartsMulNum.redraw()
            air.chartsMulFile.redraw()
          })
        }
      },
      error: function (error) {
        console.error(error)
      }
    })
  }
  /*航空公司详情运行信息对象数组*/
  var companyChartsArr = {
    companys:[],
    dataArr: []
  }
  /*航空公司详情曲线图接口对应参数*/
  var companyChartOpt = {
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
              var fileOptions = new CompanyOptions(companyDatas[i], companyChartOpt, 'file_COUNT', '文件数/个')
              var chartsMulNum = Highcharts.chart($('#flight_num' + i)[0],numOptions)
              var chartsMulFile = Highcharts.chart($('#flight_file' + i)[0],fileOptions)
              var comObj = {
                numOptions:numOptions,
                fileOptions:fileOptions,
                chartsMulNum:chartsMulNum,
                chartsMulFile:chartsMulFile
              }
              companyChartsArr.companys.push(comObj)
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
          var companyDatas = []
          $.each(data.companyDatas,function (i,e) {
            companyDatas.push(e)
          })
          $.each(companyChartsArr.companys,function (num,air) {
            companyDatas[num].currentTime = generateTime
            var  dataRes = dataConvert(companyDatas[num], companyChartOpt, 'data_COUNT')
            var  fileRes = dataConvert(companyDatas[num], companyChartOpt, 'file_COUNT')
            $.each(companyChartOpt,function (index,e) {
              var dataElement = air.chartsMulNum.get(index)
              dataElement.xAxis.categories = dataRes.xTimeArr
              dataElement.setData(Object.values(dataRes[companyChartOpt[index]]), true, false, false);
              var dataElement = air.chartsMulFile.get(index)
              dataElement.xAxis.categories = fileRes.xTimeArr
              dataElement.setData(Object.values(fileRes[companyChartOpt[index]]), true, false, false);
            })
            air.chartsMulNum.redraw()
            air.chartsMulFile.redraw()
          })

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
      setAirportsInformation($('#airport_container'))  //机场数据初始化
    })
    //航空公司
    $('#flights_operation').on('click', function () {
      $('.content-container .row').removeClass('active')
      $('#company').addClass('active')
      $('#company_container').find('.flight_group').remove()
      setFlightsInformation($('#company_container'))  //航空公司数据初始化
    })
    //机场面包屑点击事件
    $('.bread_air').on('click', function () {
      $('.content-container .row').removeClass('active')
      $('#home').addClass('active')
    })
    //航空公司面包屑点击事件
    $('.bread_com').on('click', function () {
      $('.content-container .row').removeClass('active')
      $('#home').addClass('active')
    })
  }
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
        //传递曲线图数据参数并初始化echarts
        totalDataCount.currentTime = generateTime
        //参数刷新
        $.each(indexAirChartOpt,function (index, e) {
          var  dataRes = dataConvert(totalDataCount, indexAirChartOpt, 'data_COUNT')
          var dataElement = indexCharts.airportNumChart.get(index)
          dataElement.xAxis.categories = dataRes.xTimeArr
          dataElement.setData(Object.values(dataRes[indexAirChartOpt[index]]),true, false, false);
          indexCharts.airportNumChart.redraw()
          var  fileRes = dataConvert(totalDataCount, indexAirChartOpt, 'file_COUNT')
          var fileElement = indexCharts.airportFlieChart.get(index)
          fileElement.xAxis.categories = dataRes.xTimeArr
          fileElement.setData(Object.values(fileRes[indexAirChartOpt[index]]),true, false, false);
          indexCharts.airportFlieChart.redraw()
        })
        $.each(indexComChartOpt,function (index, e) {
          var  dataRes = dataConvert(totalDataCount, indexComChartOpt, 'data_COUNT')
          var dataElement = indexCharts.flightNumChart.get(index);
          dataElement.xAxis.categories = dataRes.xTimeArr;
          dataElement.setData(Object.values(dataRes[indexComChartOpt[index]]),true, false, false);
          indexCharts.flightNumChart.redraw()
          var  fileRes = dataConvert(totalDataCount, indexComChartOpt, 'file_COUNT')
          var fileElement = indexCharts.flightFlieChart.get(index);
          fileElement.xAxis.categories = dataRes.xTimeArr;
          fileElement.setData(Object.values(fileRes[indexComChartOpt[index]]),true, false, false);
          indexCharts.flightFlieChart.redraw()
        })
        $.each(manageOpt,function (index, e) {
          var  dataRes = dataConvert(totalDataCount, manageOpt, 'data_COUNT')
          var dataElement = indexCharts.manageNumChart.get(index);
          dataElement.xAxis.categories = dataRes.xTimeArr;
          dataElement.setData(Object.values(dataRes[manageOpt[index]]),true, false, false);
          indexCharts.manageNumChart.redraw()
          var  fileRes = dataConvert(totalDataCount, manageOpt, 'file_COUNT')
          var fileElement = indexCharts.manageFlieChart.get(index);
          fileElement.xAxis.categories = dataRes.xTimeArr;
          fileElement.setData(Object.values(fileRes[manageOpt[index]]),true, false, false);
          indexCharts.manageFlieChart.redraw()
        })
        $.each(monitorOpt,function (index, e) {
          var  dataRes = dataConvert(totalDataCount, monitorOpt, 'data_COUNT')
          var dataElement = indexCharts.monitorNumChart.get(index);
          dataElement.xAxis.categories = dataRes.xTimeArr;
          dataElement.setData(Object.values(dataRes[monitorOpt[index]]),true, false, false);
          indexCharts.monitorNumChart.redraw()
          var  fileRes = dataConvert(totalDataCount, monitorOpt, 'file_COUNT')
          var fileElement = indexCharts.monitorFlieChart.get(index);
          fileElement.xAxis.categories = dataRes.xTimeArr;
          fileElement.setData(Object.values(fileRes[monitorOpt[index]]),true, false, false);
          indexCharts.monitorFlieChart.redraw()
        })
      }
    }
    //机场数据刷新
    if ($('#airport_container').is(':visible')) {
      // $('#airport_container').find('.flight_group').remove()
      // setAirportsInformation($('#airport_container'))  //机场数据初始化
      refreshAirportsInformation()

    }
    //航空公司数据刷新
    if ($('#company_container').is(':visible')) {
      // $('#company_container').find('.flight_group').remove()
      // setFlightsInformation($('#company_container'))  //航空公司数据初始化
      refreshFlightInformation()
    }
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
  return {
    initMonitor: function () {
      initAirCom() //机场航空公司点击事件初始化
      getTotalDateCount(totalDataCount, true) //获取航班监控页面数据
    },
  }
}()
$(document).ready(function () {
  Monitor.initMonitor()
})
