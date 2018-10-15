/**
 * Created by caowei on 2017/11/20.
 *
 */
var Monitor = function () {
    /*定时器总开关*/
    var isRefresh = true
    /*航班监控数据*/
    var totalDataCount = null
    //主模块折线图对象
    var indexCharts = {
        airportNumChart:{},
        companyNumChart:{},
        manageNumChart:{},
        monitorNumChart:{}
    }
    //主模块折线图对象曲线图接口对应参数
    var dataKeyObj = {
        airport: {
            fpai: 'APOI_FPAI_HOUR',
            ppci: 'APOI_PPCI_HOUR',
            fpdi: 'APOI_FPDI_HOUR',
            psni: 'APOI_PSNI_HOUR'
        },
        company: {
            fcri: 'ALOI_FCRI_HOUR',
            flgh: 'ALOI_FLGH_HOUR',
            fpci: 'ALOI_FPCI_HOUR',
            fpln: 'ALOI_FPLN_HOUR',
        },
        manage: {
            fcdm: 'ATMI_FCDM_HOUR',
            ftmi: 'ATMI_FTMI_HOUR',
            mdrs: 'ATMI_MDRS_HOUR',
            padr: 'ATMI_PADR_HOUR',
            sect: 'ATMI_SECT_HOUR'
        },
        monitor: {
            fosc: 'OSCI_FOSC_HOUR',
            fper: 'OSCI_FPER_HOUR',
            pper: 'OSCI_PPER_HOUR'
        }
    }
    /*机场详情曲线图接口对应参数*/
    var airportsSubCharts = {}
    var airportChartOpt = {
        fpai: 'FPAI_HOUR',
        fpdi: 'FPDI_HOUR',
        ppci: 'PPCI_HOUR',
        psni: 'PSNI_HOUR'
    }
    /*航空公司详情曲线图接口对应参数*/
    var componySubCharts = {}
    var companyChartOpt = {
        faci: 'FACI_HOUR',
        fcri: 'FCRI_HOUR',
        flgh: 'FLGH_HOUR',
        fpci: 'FPCI_HOUR',
        fpln: 'FPLN_HOUR'
    }
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
    var getTotalDateCount = function (refresh) {
        $.ajax({
            type: 'GET',
            url: iphost + 'shareDataPlatform/totalDataCount',
            data: {},
            dataType: 'json',
            success: function (data) {
                if ($.isValidObject(data)) {
                    //时间转换显示
                    var generateTime = data.generatetime || ''
                    //取数据 覆盖旧数据
                    var newTotalDataCount = data.totalDataCount || {}
                    totalDataCount = newTotalDataCount
                    totalDataCount.currentTime = generateTime
                    //更新数据
                    refreshChartsOption(totalDataCount, dataKeyObj)
                    //定时刷新启动
                    if (refresh) {
                        startTimer(getTotalDateCount, true, 1000 * 30)
                    }
                }
            },
            error: function (error) {
                //否则5分钟之后重新请求
                startTimer(getTotalDateCount, true, 1000 * 60 * 5)
                console.error(error)
            }
        })
    }
    /**
     *@method setTotalData设置监控页面数据
     *@parma 首页信息类型数据对象
     */
    var setTotalData = function (totalDataCount) {
        var handleData = function(data){
            var res = '-'
            if(data*1 >= 0){
                res = data
            }
            return res
        }
        //机场机位信息
        $('#airport_position_num').html(handleData(totalDataCount.APOI_PSNI_DATA ))
        //机场离港信息
        $('#fpdi').html(handleData(totalDataCount.APOI_FPDI_DATA))
        //机场到港信息
        $('#fpai').html(handleData(totalDataCount.APOI_FPAI_DATA))
        //机场客货信息
        $('#ppci').html(handleData(totalDataCount.APOI_PPCI_DATA))
        //航班地面状态
        $('#flgh').html(handleData(totalDataCount.ALOI_FLGH_DATA))
        //航班计划变更
        $('#fpln').html(handleData(totalDataCount.ALOI_FPLN_DATA))
        //航班客货
        $('#fpci').html(handleData(totalDataCount.ALOI_FPCI_DATA))
        //航班机组人员
        $('#fcri').html(handleData(totalDataCount.ALOI_FCRI_DATA))
        //CDM
        $('#fcdm').html(handleData(totalDataCount.ATMI_FCDM_DATA))
        //流量控制措施
        $('#ftmi').html(handleData(totalDataCount.ATMI_FTMI_DATA))
        //机场通行能力
        $('#padr').html(handleData(totalDataCount.ATMI_PADR_DATA))
        //MDRS
        $('#mdrs').html(handleData(totalDataCount.ATMI_MDRS_DATA))
        //扇区开放
        $('#sect').html(handleData(totalDataCount.ATMI_SECT_DATA))
        //航班计划动态
        $('#fosc').html(handleData(totalDataCount.OSCI_FOSC_DATA))
        //航班统计
        $('#fper').html(handleData(totalDataCount.OSCI_FPER_DATA))
        //机场统计
        $('#pper').html(handleData(totalDataCount.OSCI_PPER_DATA))
    }

    /**
     * @Class commonOptions 曲线图公共参数类
     * @param { string } inforType 信息类型 可选（信息数/文件数）
     * */
    var commonOptions = function (inforType) {
        var opts = {
            backgroundColor: '#FFFFFF',
            title : {
                text: ''
            },
            grid : {
                left: '3%',
                right: '4%',
                bottom: '10%',
                width: '92%',
                height: '75%',
                containLabel: true
            },
            tooltip : {
                trigger: 'axis',
                height: 15,
                textStyle: {
                    fontSize: '12'
                },
                axisPointer: {
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                formatter: function(params){
                    var str = '';
                    var seriesName = ''
                    var content = ''
                    for(var i in params){
                        var obj = params[i]
                        seriesName = fomatterTime(obj.name)
                        content += obj.seriesName + ' : ' + obj.value + '<br />'
                    }
                    str = seriesName + '<br />' + content
                    return str
                }
            },
            legend : {
                data: [],
                top: '0',
                right: '0',
                textStyle: {
                    fontSize: '11'
                },
                itemWidth: 8,
                itemGap: 0,

                // orient: 'vertical'
            },
            xAxis : {
                name:  '',
                data: [],
                axisLabel: {
                    formatter: function (value) {
                        var res = value;
                        if(value.length == 12){
                            res = value.substring(6, 8) + '/' + value.substring(8, 12)
                        }
                        return res
                    }
                },
                boundaryGap: false
            },
            yAxis : {
                name: inforType,
                type: 'value',
                minInterval: 1
            },
            dataZoom : {
                show: true,
                start: 70,
                height: 13,
                zoomLock: false,
                bottom: '5',
                end: 100
            },
            series : []
        }
        return opts;
    }


    /**
     * @method initCurveCharts 初始化当日监控曲线图
     * @param { object } dataObj 首页曲线图对象集合
     * */
    var initCurveCharts = function () {
        var arr = Object.keys(dataKeyObj);
        for(var key in arr){
            var item = arr[key]
            var series = getEchartsSeries( {}, item )

            var chartNumDom = document.getElementById( item +'_num_chart' )
            indexCharts[item + 'NumChart'] = echarts.init(chartNumDom)
            var numData = commonOptions('信息数/个')
            numData.series = series.series
            indexCharts[item + 'NumChart'].setOption(numData)
        }

    }
    //监听页面缩放后重绘
    var handleChartsResize = function(){
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
            //机场详情重绘
            if (!$('#home').is(':hidden')) {
                //首页重绘
                for(var key in indexCharts){
                    indexCharts[key].resize()
                }
            }else if (!$('#airport_container').is(':hidden')) {//机场详情重绘
                for(var key in airportsSubCharts){
                    airportsSubCharts[key].resize()
                }
            }else if (!$('#company_container').is(':hidden')) {
                //航空公司详情重绘
                for(var key in componySubCharts){
                    componySubCharts[key].resize()
                }
            }
        }, 200)
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
    /**
     * @method  机场详情数据获取及初始化
     * @param fatherDom 接受机场详情页面节点的父级节点
     * */
    var setAirportsInformation = function (refresh) {
        var fatherDom = $('#airport_container')
        if( !fatherDom.is(':hidden')){
            $.ajax({
                type: 'GET',
                url: iphost + 'shareDataPlatform/airportDataCount',
                data: {},
                dataType: 'json',
                success: function (data) {
                    if ($.isValidObject(data)) {
                        var airportsData = Object.values(data.airportDatas)
                        var generateTime = data.generatetime
                        var dataTime = '数据生成时间:' + fomatterTime(generateTime)
                        $('.data_time').text(dataTime)
                        if (airportsData.length > 0) {
                            $('#company_container').find('.no_data').hide()
                            //时间转换显示
                            var generateTime = data.generatetime
                            var airDataLen = airportsData.length
                            //遍历机场，生成每组信息和文件
                            for (var i = 0; i < airDataLen; i++) {
                                var airportData =  airportsData[i]
                                //机场名称
                                var airportName = airportData.airportName

                                airportData.currentTime = generateTime
                                //如果不存在，做初始化  存在，更新数据
                                if( !airportsSubCharts[airportName + 'NumChart' ] ){
                                    //节点挂载
                                    airportData.currentTime = generateTime
                                    var airportsDom = '<div class="flight_group box flights_charts"> <h2>' + airportName + '机场运行信息</h2>  <div class="information"> <div class="airport col-lg-2 col-sm-2"> <div class="airport_head"><div class="information_name">信息类型</div> <div class="airport_num">信息数</div>  </div>  <ul class="airport_data_detail"> <li><p class="airport_position">机场机位信息</p> <p class="num airport_position_num">' + airportsData[i].PSNI_DATA + '</p>   </li> <li><p class="airport_position">机场离港航班信息</p>  <p class="num fpdi">' + airportsData[i].FPDI_DATA + '</p>  </li> <li><p class="airport_position">机场到港航班信息</p>  <p class="num fpai">' + airportsData[i].FPAI_DATA + '</p> </li> <li><p class="airport_position">机场客货信息</p>  <p class="num ppci">' + airportsData[i].PPCI_DATA + '</p>  </li> </ul> </div><div class="num_chart col-lg-10 col-sm-10" id="airport_num' + i + '"></div> <div class="clb"></div> </div> </div>'
                                    fatherDom.append(airportsDom)

                                    //信息数 图
                                    var numChartObj = echarts.init($('#airport_num' + i)[0])
                                    airportsSubCharts[airportName + 'NumChart' ] = numChartObj
                                    //图配置参数
                                    var numOptions = commonOptions( '信息数/个')
                                    //数据转换
                                    numChartObj.setOption(numOptions)

                                }

                                //更新数据
                                var dataNumRes = dataConvert(airportData, airportChartOpt, 'data_COUNT')
                                //获取数据
                                var numSeries = getAirportEchartsSeries(dataNumRes, airportChartOpt )
                                //表对象
                                var numChart = airportsSubCharts[airportName + 'NumChart' ]
                                var numOpts = {
                                    xAxis: {
                                        // name: dataNumRes.xTime || '',
                                        data: dataNumRes.xTimeArr
                                    },
                                    legend: {
                                        data: numSeries.legend.data
                                    },
                                    series: numSeries.series
                                }
                                numChart.setOption(numOpts)
                            }
                        } else {
                            $('#airport_container').find('.no_data').show()
                        }
                    }
                    //定时刷新
                    if(refresh){
                        startTimer(setAirportsInformation, true, 1000 * 30)
                    }
                },
                error: function (error) {
                    startTimer(setAirportsInformation, true, 1000 * 60 * 5)
                    console.error(error)
                }
            })
        }
    }
    /**
     * @method 航空公司运行信息数据获取及初始化
     * @param fatherDom 存放航空公司运行信息的父节点
     * */
    var setCompanyInformation = function (refresh) {
        var fatherDom = $('#company_container')
        if( !fatherDom.is(':hidden')){
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
                                var companyData =  companyDatas[i]
                                //机场名称
                                var companyName = companyData.companyName
                                companyData.currentTime = generateTime
                                //如果不存在，做初始化  存在，更新数据
                                if( !componySubCharts[companyName + 'NumChart' ] ){
                                    //节点挂载
                                    companyData.currentTime = generateTime
                                    var flightsDom = '<div class="flight_group box company_charts"><h2>' + companyDatas[i].companyName + '航空运行信息</h2><div class="information"><div class="airport col-lg-2 col-sm-2"><div class="airport_head"><div class="information_name">信息类型</div><div class="airport_num">信息数</div></div><ul class="airport_data_detail"><li><p class="airport_position">航班地面状态信息</p><p class="num flgh">' + companyDatas[i].FLGH_DATA + '</p></li><li><p class="airport_position">航班计划变更信息</p><p class="num fpln">' + companyDatas[i].FPLN_DATA + '</p></li><li><p class="airport_position">航班客货信息</p><p class="num fpci">' + companyDatas[i].FPCI_DATA + '</p> </li> <li> <p class="airport_position">航班机组人员信息</p> <p class="num fcri">' + companyDatas[i].FCRI_DATA + '</p>  </li> </ul> </div> <div class="num_chart col-lg-10 col-sm-10" id="company_num' + i + '"></div> <div class="clb"></div> </div> </div>'
                                    fatherDom.append(flightsDom)

                                    //信息数 图
                                    var numChartObj = echarts.init($('#company_num' + i)[0])
                                    componySubCharts[companyName + 'NumChart' ] = numChartObj
                                    //图配置参数
                                    var numOptions = commonOptions( '信息数/个')
                                    //数据转换
                                    numChartObj.setOption(numOptions)
                                }
                                //更新数据
                                var dataNumRes = dataConvert(companyData, companyChartOpt, 'data_COUNT')
                                //获取数据
                                var numSeries = getCompanyEchartsSeries(dataNumRes, companyChartOpt )
                                //表对象
                                var numChart = componySubCharts[companyName + 'NumChart' ]
                                var numOpts = {
                                    xAxis: {
                                        // name: dataNumRes.xTime || '',
                                        data: dataNumRes.xTimeArr
                                    },
                                    legend: {
                                        data: numSeries.legend.data
                                    },
                                    series: numSeries.series
                                }
                                numChart.setOption(numOpts)
                            }
                        } else {
                            $('#company_container').find('.no_data').show()
                        }
                    }
                    //定时刷新
                    if(refresh){
                        startTimer(setCompanyInformation, true, 1000 * 30)
                    }
                },
                error: function (error) {
                    startTimer(setCompanyInformation, true, 1000 * 5)
                    console.error(error)
                }
            })
        }

    }
    /**
     * @method handleClickEvents
     * 机场航空公司点击切换事件
     * 机场面包屑点击事件
     * 航空公司面包屑点击事件
     * */
    var handleClickEvents = function () {
        //机场
        $('#airport_operation').on('click', function () {
            $('.content-container .row').removeClass('active')
            $('#airport').addClass('active')
            // $('#airport_container').find('.flight_group').remove()
            setAirportsInformation(true)  //机场数据初始化
        })
        //航空公司
        $('#company_operation').on('click', function () {
            $('.content-container .row').removeClass('active')
            $('#company').addClass('active')
            // $('#company_container').find('.flight_group').remove()
            setCompanyInformation(true)  //航空公司数据初始化
        })
        //机场面包屑点击事件

        var homeEvents = function(){
            $('.content-container .row').removeClass('active')
            $('#home').addClass('active')
            //主页数据重绘
            for(var key in indexCharts){
                indexCharts[key].resize()
            }
        }
        $('.bread_air').on('click', homeEvents)
        //航空公司面包屑点击事件
        $('.bread_com').on('click', homeEvents)
    }

    //首页获取折线图数据
    var getEchartsSeries = function (resData, item) {
        resData = resData || {}
        var dataOpt = dataKeyObj[item]
        var obj = {
            series : [],
            legend: {}
        }
        switch (item){
            case 'airport': {
                obj.legend.data = ['到港航班', '离港航班', '客货', '机位']
                obj.series = [
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
                        data: Object.values(resData[dataOpt.fpai] || [])
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
                        data: Object.values(resData[dataOpt.fpdi] || [])
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
                        data: Object.values(resData[dataOpt.ppci] || [])
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
                        data: Object.values(resData[dataOpt.psni] || [])
                    }
                ]
                break
            }
            case 'company': {
                obj.legend.data = ['机组人员', '地面状态', '客货', '计划变更']
                obj.series = [
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
                        data: Object.values(resData[dataOpt.fcri] || [])
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
                        data: Object.values(resData[dataOpt.flgh] || [])
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
                        data: Object.values(resData[dataOpt.fpci] || [])
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
                        data: Object.values(resData[dataOpt.fpln] || [])
                    }
                ]
                break
            }
            case 'manage': {
                obj.legend.data = ['航班CDM', '流量控制措施', 'MDRS', '机场通行能力', '扇区开放合并']
                obj.series = [
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
                        data: Object.values(resData[dataOpt.fcdm] || [])
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
                        data: Object.values(resData[dataOpt.ftmi] || [])
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
                        data: Object.values(resData[dataOpt.mdrs] || [])
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
                        data: Object.values(resData[dataOpt.padr] || [])
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
                        data: Object.values(resData[dataOpt.sect] || [])
                    }
                ]
                break
            }
            case 'monitor': {
                obj.legend.data = ['航班计划动态', '航班统计', '机场统计']
                obj.series = [
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
                        data: Object.values(resData[dataOpt.fosc] || [])
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
                        data: Object.values(resData[dataOpt.fper] || [])
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
                        data: Object.values(resData[dataOpt.pper] || [])
                    }
                ]
                break
            }
            default: {

                break
            }
        }
        return obj
    }

    //机场详情获取折线图数据
    var getAirportEchartsSeries = function (resData, dataOpt) {
        resData = resData || {}
        var obj = {
            series : [
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
                    data: Object.values(resData[dataOpt.fpai] || [])
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
                    data: Object.values(resData[dataOpt.fpdi] || [])
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
                    data: Object.values(resData[dataOpt.ppci] || [])
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
                    data: Object.values(resData[dataOpt.psni] || [])
                }
            ],
            legend: {
                data : ['到港航班', '离港航班', '客货', '机位']
            }
        }
        return obj
    }

    //航空公司详情获取折线图数据
    var getCompanyEchartsSeries = function (resData, dataOpt) {
        resData = resData || {}
        var obj = {
            series : [
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
                    data: Object.values(resData[dataOpt.fcri] || [])
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
                    data: Object.values(resData[dataOpt.flgh] || [])
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
                    data: Object.values(resData[dataOpt.fpci] || [])
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
                    data: Object.values(resData[dataOpt.fpln] || [])
                }
            ],
            legend: {
                data : ['机组人员', '地面状态', '客货', '计划变更']
            }
        }
        return obj
    }
    /**
     * @method refreshChartsOption 全部数据刷新方法集合调用
     * @param （object） data 刷新数据对象集合
     * */
    var refreshChartsOption = function(data, dataKeyObj) {
        if ( !$('#home').is(':hidden')) {
            if ($.isValidObject(data)) {
                var totalDataCount = data
                //时间转换显示
                var currentTime = totalDataCount.currentTime || ''
                var dataTime = '数据生成时间:' + fomatterTime(currentTime)
                $('.data_time').text(dataTime)

                //中间模块数字赋值
                setTotalData(totalDataCount)
                var arr = Object.keys(dataKeyObj)
                for(var key in arr){
                    var item = arr[key]
                    var objOpts = dataKeyObj[item]
                    //信息数
                    var  dataNumRes = dataConvert(totalDataCount, objOpts, 'data_COUNT')
                    //获取数据
                    var numSeries = getEchartsSeries(dataNumRes, item)
                    //表对象
                    var numChart = indexCharts[item + 'NumChart']
                    var numOpts = {
                        xAxis: {
                            // name: dataNumRes.xTime || '',
                            data: dataNumRes.xTimeArr
                        },
                        legend: {
                            data: numSeries.legend.data
                        },
                        series: numSeries.series
                    }
                    numChart.setOption(numOpts)
                }
            }
        }
    }
    //定时器
    var startTimer = function (func, isNext, time) {
        if (isRefresh) { // 定时器总开关为true
            if (typeof func == 'function') {
                setTimeout(function () {
                    func(isNext)
                }, time)
            }
        }
    }
    return {
        initMonitor: function () {
            initCurveCharts()//初始化折线图
            handleClickEvents() //机场航空公司点击事件初始化
            handleChartsResize()
            getTotalDateCount(true) //获取航班监控页面数据
        }
    }
}()
$(document).ready(function () {
    Monitor.initMonitor()
})
