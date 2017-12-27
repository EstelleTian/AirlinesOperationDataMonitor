/**
 * Created by caowei on 2017/11/20.
 */
var MONITOR = function () {
    /*定时器总开关*/
    var isRefresh = true;
    var totalDataCount
    /*获取监控主页数据统计*/
    var getTotalDateCount = function (totalDataCount,isRefresh) {
        $.ajax({
            type: "GET",
            url: iphost + "shareDataPlatform/totalDataCount",
            data: {},
            dataType: "json",
            success: function (data) {
                if ($.isValidObject(data)) {
                    totalDataCount = data.totalDataCount
                    //时间转换显示
                    var generateTime = data.generatetime;
                    var dataTime = "数据生成时间:" +
                        generateTime.substring(0, 4) + '-' +
                        generateTime.substring(4, 6) + '-' +
                        generateTime.substring(6, 8) + '  ' +
                        generateTime.substring(8, 10) + ':' +
                        generateTime.substring(10, 12);
                    $(".data_time").text(dataTime);
                    for (var x in totalDataCount) {
                        if (totalDataCount[x] === "undefined" || totalDataCount[x] === "" || totalDataCount[x] === "NAN") {
                            totalDataCount[x] = "-";
                        }
                    }
                    setTotalData(totalDataCount);
                    //传递曲线图数据参数并初始化echarts
                    totalDataCount.currentTime = generateTime;
                    initCurveCharts(totalDataCount)
                    // setFlightsInformation($("#company_container"));//航空公司数据初始化
                    // setAirportsInformation($("#airport_container"));//机场数据初始化
                    if(isRefresh){
                        startTimer(getTotalDateCount,totalDataCount,true,1000*30)
                    }

                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    };
    /*设置监控页面数据*/
    var setTotalData = function (totalDataCount) {
        //机场机位信息
        $("#airport_position_num").html(totalDataCount.APOI_PSNI_DATA)
        $("#airport_position_num_file").html(totalDataCount.APOI_PSNI_FILE)
        //机场离港信息
        $("#fpdi").html(totalDataCount.APOI_FPDI_DATA)
        $("#fpdi_file").html(totalDataCount.APOI_FPDI_FILE)
        //机场到港信息
        $("#fpai").html(totalDataCount.APOI_FPAI_DATA)
        $("#fpai_file").html(totalDataCount.APOI_FPAI_FILE)
        //机场客货信息
        $("#ppci").html(totalDataCount.APOI_PPCI_DATA)
        $("#ppci_file").html(totalDataCount.APOI_PPCI_FILE)
        //航班地面状态
        $("#flgh").html(totalDataCount.ALOI_FLGH_DATA)
        $("#flgh_file").html(totalDataCount.ALOI_FLGH_FILE)
        //航班计划变更
        $("#fpln").html(totalDataCount.ALOI_FPLN_DATA)
        $("#fpln_file").html(totalDataCount.ALOI_FPLN_FILE)
        //航班客货
        $("#fpci").html(totalDataCount.ALOI_FPCI_DATA)
        $("#fpci_file").html(totalDataCount.ALOI_FPCI_FILE)
        //航班机组人员
        $("#fcri").html(totalDataCount.ALOI_FCRI_DATA)
        $("#fcri_file").html(totalDataCount.ALOI_FCRI_FILE)
        //CDM
        $("#fcdm").html(totalDataCount.ATMI_FCDM_DATA)
        $("#fcdm_file").html(totalDataCount.ATMI_FCDM_FILE)
        //流量控制措施
        $("#ftmi").html(totalDataCount.ATMI_FTMI_DATA)
        $("#ftmi_file").html(totalDataCount.ATMI_FTMI_FILE)
        //机场通行能力
        $("#padr").html(totalDataCount.ATMI_PADR_DATA)
        $("#padr_file").html(totalDataCount.ATMI_PADR_FILE)
        //MDRS
        $("#mdrs").html(totalDataCount.ATMI_MDRS_DATA)
        $("#mdrs_file").html(totalDataCount.ATMI_MDRS_FILE)
        //扇区开放
        $("#sect").html(totalDataCount.ATMI_SECT_DATA)
        $("#sect_file").html(totalDataCount.ATMI_SECT_FILE)
        //航班计划动态
        $("#fosc").html(totalDataCount.OSCI_FOSC_DATA)
        $("#fosc_file").html(totalDataCount.OSCI_FOSC_FILE)
        //航班统计
        $("#fper").html(totalDataCount.OSCI_FPER_DATA)
        $("#fper_file").html(totalDataCount.OSCI_FPER_FILE)
        //机场统计
        $("#pper").html(totalDataCount.OSCI_PPER_DATA)
        $("#pper_file").html(totalDataCount.OSCI_PPER_FILE)
    }
    /*echarts 绘制
     * data 曲线图需要的数据
     * */
    /**echarts对象
     * anc机场运行信息数量
     * afc机场运行信息文件数量
     * fnc航空公司信息数量
     * ffc航空公司信息文件数量
     * mnc空管局信息数量
     * mfc空管局信息文件数量
     * monc监控中心信息数量
     * mofc监控中心信息文件数量
     * */
    var Charts = function (anc, afc, fnc, ffc, mnc, mfc, monc, mofc) {
        this.airportNumChart = echarts.init(anc);
        this.airportFlieChart = echarts.init(afc);
        this.flightNumChart = echarts.init(fnc);
        this.flightFlieChart = echarts.init(ffc);
        this.manageNumChart = echarts.init(mnc);
        this.manageFlieChart = echarts.init(mfc);
        this.monitorNumChart = echarts.init(monc);
        this.monitorFlieChart = echarts.init(mofc);
    }
    // 获取图表的配置项和数据
    /**
     * dataObj 数据对象
     * type 数据类型 可选（dataCount/fileCount）
     * dataOpt 需要提取的参数字段
     * inforType 信息类型（信息数/文件数）
     * */
    var indexAirChartOpt = {
        fpai: "APOI_FPAI_HOUR",
        ppci: "APOI_PPCI_HOUR",
        fpdi: "APOI_FPDI_HOUR",
        psni: "APOI_PSNI_HOUR"

    };
    var indexComChartOpt = {
        faci: "ALOI_FACI_HOUR",
        fcri: "ALOI_FCRI_HOUR",
        flgh: "ALOI_FLGH_HOUR",
        fpci: "ALOI_FPCI_HOUR",
        fpln: "ALOI_FPLN_HOUR",
    };
    var manageOpt = {
        fcdm: "ATMI_FCDM_HOUR",
        ftmi: "ATMI_FTMI_HOUR",
        mdrs: "ATMI_MDRS_HOUR",
        padr: "ATMI_PADR_HOUR",
        sect: "ATMI_SECT_HOUR"
    };

    var monitorOpt = {
        fosc: "OSCI_FOSC_HOUR",
        fper: "OSCI_FPER_HOUR",
        pper: "OSCI_PPER_HOUR"
    };
    var AirportsOptions = function (dataObj, dataOpt, type, inforType) {
        var resData = dataConvert(dataObj, dataOpt, type) || {};
        this.backgroundColor = '#FFFFFF',
            this.color = ['#3398DB'],
            this.title = {
                text: '',
            },
            this.grid = {
                left: '3%',
                right: '4%',
                bottom: '10%',
                width: "80%",
                height: "75%",
                containLabel: true
            },
            this.tooltip = {
                trigger: 'axis',
                height: 15,
                textStyle: {
                    fontSize: "12"
                },
                axisPointer: {
                    label: {
                        backgroundColor: '#6a7985',
                    }
                }
            },
            this.legend = {
                data:  ["到港航班", "离港航班", "客货", "机位"],
                top: "20",
                right: "10",
                textStyle: {
                    fontSize: "11"
                },
                orient: 'vertical'
            },
            this.xAxis = {
                name: resData.xTime || "",
                data: resData.xTimeArr,
                axisLabel:{
                    formatter: function(value, inde){
                        var res = value.substring(6,8) + "/" +value.substring(8,12);
                        return res;
                    },
                },
                boundaryGap: false,

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
                bottom: "5",
                end: 100
            },
            this.series = [
                {
                    name: "到港航班",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    lineStyle: {
                        normal: {
                            color: "#9abcc3",
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#9abcc3",
                        }
                    },
                    data: Object.values( resData[dataOpt.fpai] )
                }, {
                    name: "离港航班",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    lineStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    data: Object.values( resData[dataOpt.fpdi] )
                }, {
                    name: "客货",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    lineStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    data: Object.values( resData[dataOpt.ppci] )
                }, {
                    name: "机位",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    lineStyle: {
                        normal: {
                            color: "#3498DB",
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#3498DB",
                        }
                    },
                    data: Object.values( resData[dataOpt.psni] )
                }
            ]
    };
    AirportsOptions.prototype.refreshOption = function (dataObj, dataOpt, type, inforType) {
        var resData = dataConvert(dataObj, dataOpt, type) || {};
        this.xAxis = {
            name: resData.xTime || "",
            data: resData.xTimeArr,
            axisLabel:{
                formatter: function(value, inde){
                    var res = value.substring(6,8) + "/" +value.substring(8,12)
                    return res
                },
            },
            boundaryGap: false,

        };
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
                bottom: "5",
                end: 100
            },
            this.series = [
                {
                    name: "到港航班",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    lineStyle: {
                        normal: {
                            color: "#9abcc3",
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#9abcc3",
                        }
                    },
                    data: Object.values( resData[dataOpt.fpai] )
                }, {
                    name: "离港航班",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    lineStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    data: Object.values( resData[dataOpt.fpdi] )
                }, {
                    name: "客货",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    lineStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    data: Object.values( resData[dataOpt.ppci] )
                }, {
                    name: "机位",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    lineStyle: {
                        normal: {
                            color: "#3498DB",
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#3498DB",
                        }
                    },
                    data: Object.values( resData[dataOpt.psni] )
                }
            ]

    };
    var CompanyOptions = function (dataObj, dataOpt, type, inforType) {
        var resData = dataConvert(dataObj, dataOpt, type) || {};
        this.backgroundColor = '#FFFFFF',
            this.color = ['#3398DB'],
            this.title = {
                text: ''
            },
            this.grid = {
                left: '3%',
                right: '4%',
                bottom: '10%',
                width: "80%",
                height: "75%",
                containLabel: true
            },
            this.tooltip = {
                trigger: 'axis',
                height: 15,
                textStyle: {
                    fontSize: "12"
                },
                axisPointer: {
                    label: {
                        backgroundColor: '#6a7985',
                    }
                }
            },
            this.legend = {
                data: ["机组人员", "地面状态", "客货", "计划变更"],
                top: "20",
                right: "15",
                textStyle: {
                    fontSize: "11"
                },
                orient: 'vertical'
            },
            this.xAxis = {
                name: resData.xTime || "",
                data: resData.xTimeArr,
                axisLabel:{
                    formatter: function(value, inde){
                        var res = value.substring(6,8) + "/" +value.substring(8,12)
                        return res
                    },
                },
                boundaryGap: false,
            };
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
                bottom: "5",
                end: 100
            },
            this.series = [
                {
                    name: "机组人员",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    data: Object.values( resData[dataOpt.fcri] )
                }, {
                    name: "地面状态",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    data: Object.values( resData[dataOpt.flgh] )
                }, {
                    name: "客货",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#3498DB",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#3498DB",
                        }
                    },
                    data: Object.values( resData[dataOpt.fpci] )
                }, {
                    name: "计划变更",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#b6a2de",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#b6a2de",
                        }
                    },
                    data: Object.values( resData[dataOpt.fpln] )
                }
            ]
    };
    CompanyOptions.prototype.refreshOption = function (dataObj, dataOpt, type, inforType) {
        var resData = dataConvert(dataObj, dataOpt, type) || {};
        this.xAxis = {
            name: resData.xTime || "",
            data: resData.xTimeArr,
            axisLabel:{
                formatter: function(value, inde){
                    var res = value.substring(6,8) + "/" +value.substring(8,12)
                    return res
                },
            },
            boundaryGap: false,

        };
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
                bottom: "5",
                end: 100
            },
            this.series = [
                {
                    name: "机组人员",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    data: Object.values( resData[dataOpt.fcri] )
                }, {
                    name: "地面状态",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    data: Object.values( resData[dataOpt.flgh] )
                }, {
                    name: "客货",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#3498DB",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#3498DB",
                        }
                    },
                    data: Object.values( resData[dataOpt.fpci] )
                }, {
                    name: "计划变更",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#b6a2de",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#b6a2de",
                        }
                    },
                    data: Object.values( resData[dataOpt.fpln] )
                }
            ]
    };
    var ManageOptions = function (dataObj, dataOpt, type, inforType) {
        var resData = dataConvert(dataObj, dataOpt, type) || {};
        this.backgroundColor = '#FFFFFF',
            this.color = ['#3398DB'],
            this.title = {
                text: ''
            },
            this.grid = {
                left: '3%',
                right: '4%',
                bottom: '10%',
                width: "80%",
                height: "75%",
                containLabel: true
            },
            this.tooltip = {
                trigger: 'axis',
                height: '50',
                axisPointer: {
                    label: {
                        backgroundColor: '#6a7985',
                    }
                },
                textStyle: {
                    fontSize: "12"
                },
            },
            this.legend = {
                data: ["航班CDM", "流量控制措施", "MDRS", "机场通行能力", "扇区开放合并"],
                top: "20",
                right: "-8",
                textStyle: {
                    fontSize: "11"
                },
                orient: 'vertical'
            },
            this.xAxis = {
                name: resData.xTime || "",
                data: resData.xTimeArr,
                axisLabel:{
                    formatter: function(value, inde){
                        var res = value.substring(6,8) + "/" +value.substring(8,12)
                        return res
                    },
                },
                boundaryGap: false,

            };
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
                bottom: "5",
                end: 100
            },
            this.series = [
                {
                    name: "航班CDM",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#9abcc3"
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#9abcc3"
                        }
                    },
                    data: Object.values( resData[dataOpt.fcdm] )
            }, {
                    name: "流量控制措施",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    data: Object.values( resData[dataOpt.ftmi] )
            }, {
                    name: "MDRS",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    data: Object.values( resData[dataOpt.mdrs] )
            }, {
                    name: "机场通行能力",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#3498DB"
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#3498DB"
                        }
                    },
                    data: Object.values( resData[dataOpt.padr] )
            }, {
                    name: "扇区开放合并",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#b6a2de",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#b6a2de",
                        }
                    },
                    data: Object.values( resData[dataOpt.sect] )
            }
        ]
    };
    ManageOptions.prototype.refreshOption = function (dataObj, dataOpt, type, inforType) {
        var resData = dataConvert(dataObj, dataOpt, type) || {};
        this.xAxis = {
            name: resData.xTime || "",
            data: resData.xTimeArr,
            axisLabel:{
                formatter: function(value, inde){
                    var res = value.substring(6,8) + "/" +value.substring(8,12)
                    return res
                },
            },
            boundaryGap: false,

        };
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
                bottom: "5",
                end: 100
            },
            this.series = [
                {
                    name: "航班CDM",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#9abcc3"
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#9abcc3"
                        }
                    },
                    data: Object.values( resData[dataOpt.fcdm] )
                }, {
                    name: "流量控制措施",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    data: Object.values( resData[dataOpt.ftmi] )
                }, {
                    name: "MDRS",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    data: Object.values( resData[dataOpt.mdrs] )
                }, {
                    name: "机场通行能力",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#3498DB"
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#3498DB"
                        }
                    },
                    data: Object.values( resData[dataOpt.padr] )
                }, {
                    name: "扇区开放合并",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#b6a2de",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#b6a2de",
                        }
                    },
                    data: Object.values( resData[dataOpt.sect] )
                }
            ]
    };
    var MonitorOption = function (dataObj, dataOpt, type, inforType) {
        var resData = dataConvert(dataObj, dataOpt, type) || {};
        this.backgroundColor = '#FFFFFF',
            this.color = ['#3398DB'],
            this.title = {
                text: ''
            },
            this.grid = {
                left: '3%',
                right: '4%',
                bottom: '10%',
                width: "80%",
                height: "75%",
                containLabel: true
            },
            this.tooltip = {
                trigger: 'axis',
                height: 15,
                textStyle: {
                    fontSize: "12"
                },
                axisPointer: {
                    label: {
                        backgroundColor: '#6a7985',
                    }
                }
            },
            this.legend = {
                data: ["航班计划动态", "航班统计", "机场统计"],
                top: "20",
                right: "-8",
                textStyle: {
                    fontSize: "11"
                },
                orient: 'vertical'
            },
            this.xAxis = {
                name: resData.xTime || "",
                data: resData.xTimeArr,
                axisLabel:{
                    formatter: function(value, inde){
                        var res = value.substring(6,8) + "/" +value.substring(8,12)
                        return res
                    },
                },
                boundaryGap: false,

            };
            this.yAxis = {
                name: inforType,
                type: 'value',
                minInterval: 1
            },
            this.dataZoom = {
                show: true,
                start: 67,
                height: 13,
                zoomLock: false,
                bottom: "5",
                end: 100
            },
            this.series = [
                {
                    name: "航班计划动态",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#9abcc3",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#9abcc3",
                        }
                    },
                    data: Object.values( resData[dataOpt.fosc] )
            }, {
                    name: "航班统计",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    data: Object.values( resData[dataOpt.fper] )
            }, {
                    name: "机场统计",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    data: Object.values( resData[dataOpt.pper] )
            }
        ]
    };
    MonitorOption.prototype.refreshOption = function (dataObj, dataOpt, type, inforType) {
        var resData = dataConvert(dataObj, dataOpt, type) || {};
        this.xAxis = {
            name: resData.xTime || "",
            data: resData.xTimeArr,
            axisLabel:{
                formatter: function(value, inde){
                    var res = value.substring(6,8) + "/" +value.substring(8,12)
                    return res
                },
            },
            boundaryGap: false,

        };
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
                bottom: "5",
                end:100
            },
            this.series = [
                {
                    name: "航班计划动态",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#9abcc3",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#9abcc3",
                        }
                    },
                    data: Object.values( resData[dataOpt.fosc] )
                }, {
                    name: "航班统计",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#ab857c",
                        }
                    },
                    data: Object.values( resData[dataOpt.fper] )
                }, {
                    name: "机场统计",
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    border: 0,
                    itemStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#1ABB9C",
                        }
                    },
                    data: Object.values( resData[dataOpt.pper] )
                }
            ]
    };
    var charts = new Charts($("#airport_num_chart")[0], $("#airport_file_chart")[0], $("#flight_num_chart")[0], $("#flight_file_chart")[0], $("#manage_num_chart")[0], $("#manage_file_chart")[0], $("#monitor_num_chart")[0], $("#monitor_file_chart")[0])
    //首页曲线图参数对象原型
    var Options = function (dataObj) {
        this.airportNumOption = new AirportsOptions(dataObj, indexAirChartOpt, "data_COUNT", "信息数/个");
        this.airportFileOption = new AirportsOptions(dataObj, indexAirChartOpt, "file_COUNT", "文件数/个");
        this.companyNumOption = new CompanyOptions(dataObj, indexComChartOpt, "data_COUNT", "信息数/个");
        this.companyFileOption = new CompanyOptions(dataObj, indexComChartOpt, "file_COUNT", "文件数/个");
        this.manageNumOption = new ManageOptions(dataObj, manageOpt, "data_COUNT", "信息数/个");
        this.manageFileOption = new ManageOptions(dataObj, manageOpt, "file_COUNT", "文件数/个");
        this.monitorNumOption = new MonitorOption(dataObj, monitorOpt, "data_COUNT", "信息数/个");
        this.monitorFileOption = new MonitorOption(dataObj, monitorOpt, "file_COUNT", "文件数/个");
    };
    //首页曲线图参数实例
    var options = {};
    //初始化当日监控曲线图
    var initCurveCharts = function (dataObj) {
        options = new Options(dataObj);
        // 曲线图参数设置。
        charts.airportNumChart.setOption(options.airportNumOption);
        charts.airportFlieChart.setOption(options.airportFileOption);
        charts.flightNumChart.setOption(options.companyNumOption);
        charts.flightFlieChart.setOption(options.companyFileOption);
        charts.manageNumChart.setOption(options.manageNumOption);
        charts.manageFlieChart.setOption(options.manageFileOption);
        charts.monitorNumChart.setOption(options.monitorNumOption);
        charts.monitorFlieChart.setOption(options.monitorFileOption);
    };
    /**曲线图数据转换
     * data数据集合
     * opt机场、航空公司、空管、监控中心的字段
     * type 数量 文件数量字段
     * **/
    var dataConvert = function (data, opt, type) {
        var res = {};
        if(!$.isValidVariable(opt) || !$.isValidVariable(type)){
            return res;
        }
        //x轴标题
        var xTime = data.currentTime.substring(0, 4) + "年" + data.currentTime.substring(4, 6) + "月";
        //X轴日期 yyyy-MM
        res.xTime = xTime;
        var xTimeArr = [];

        for(var key in opt){
            if($.isValidVariable(key)){
                //子类型
                var option = opt[key];
                res[option] = {};
                //子类型对应的数值
                var dataarr = data[option];
                if ($.isValidObject(dataarr) && dataarr != null) {
                    //遍历数据
                    for  (var i = 0, len = dataarr.length; i < len; i++ ) {
                        //获取时间
                        var time = dataarr[i]["hour"];
                        //获取数值
                        var value = dataarr[i][type]*1;
                        //添加数据
                        if( xTimeArr.indexOf(time) == -1){
                            xTimeArr.push(time);
                        }
                        res[option][time] = value;
                    }
                }
            }
        }
        res.xTimeArr = xTimeArr.sort();
        return res;
    };
    /*机场运行信息*/
    var airportsChartArr = {
        numChartArr: [],
        fileChartArr: [],
        airNumOptions: [],
        airFileOptions: [],
        dataArr:[]
    };
    var airportChartOpt = {
        fpai: "FPAI_HOUR",
        fpdi: "FPDI_HOUR",
        ppci: "PPCI_HOUR",
        psni: "PSNI_HOUR",
    }
    var setAirportsInformation = function (fatherDom) {
        $.ajax({
            type: "GET",
            url: iphost + "shareDataPlatform/airportDataCount",
            data: {},
            dataType: "json",
            success: function (data) {
                if ($.isValidObject(data)) {
                    var airportsData = Object.values(data.airportDatas);
                    airportsChartArr.dataArr = airportsData;
                    var generateTime = data.generatetime;
                    var dataTime = "数据生成时间:" +
                        generateTime.substring(0, 4) + '-' +
                        generateTime.substring(4, 6) + '-' +
                        generateTime.substring(6, 8) + '  ' +
                        generateTime.substring(8, 10) + ':' +
                        generateTime.substring(10, 12);
                    $(".data_time").text(dataTime);
                    if (airportsData.length > 0) {
                        $("#company_container").find(".no_data").hide()
                        //时间转换显示
                        var generateTime = data.generatetime;
                        var airDataLen = airportsData.length;
                        for (var i = 0; i < airDataLen; i++) {
                            airportsData[i].currentTime = generateTime;
                            var airportsDom = '<div class="flight_group box flights_charts"> <h2>' + airportsData[i].airportName + '机场运行信息</h2> <div class="information"> <div class="num_chart col-lg-5 col-sm-4" id="airport_num' + i + '"></div> <div class="airport col-lg-2 col-sm-4"> <div class="airport_head"> <div class="airport_num">信息数</div> <div class="information_name">信息类型</div> <div class="file_num">文件数</div></div>  <ul class="airport_data_detail"> <li> <p class="num airport_position_num">' + airportsData[i].PSNI_DATA + '</p> <p class="airport_position">机场机位信息</p> <p class="f_num airport_position_num_file">' + airportsData[i].PSNI_FILE + '</p> </li> <li> <p class="num fpdi">' + airportsData[i].FPDI_DATA + '</p> <p class="airport_position">机场离港航班信息</p> <p class="f_num fpdi_file">' + airportsData[i].FPDI_FILE + '</p> </li> <li> <p class="num fpai">' + airportsData[i].FPAI_DATA + '</p><p class="airport_position">机场到港航班信息</p> <p class="f_num fpai_file">' + airportsData[i].FPAI_FILE + '</p> </li> <li> <p class="num ppci">' + airportsData[i].PPCI_DATA + '</p> <p class="airport_position">机场客货信息</p> <p class="f_num ppci_file">' + airportsData[i].PPCI_FILE + '</p> </li> </ul> </div> <div class="file_chart col-lg-5 col-sm-4" id="airport_file' + i + '"></div><div class="clb"></div> </div> </div>'
                            fatherDom.append(airportsDom);
                            var numOptions = new AirportsOptions(airportsData[i], airportChartOpt, "data_COUNT", "信息数/个")
                            airportsChartArr.airNumOptions.push(numOptions);
                            var fileOptions = new AirportsOptions(airportsData[i], airportChartOpt, "file_COUNT", "文件数/个")
                            airportsChartArr.airFileOptions.push(fileOptions);
                        }
                        var flightChartLen = $(".flights_charts").length
                        for (var j = 0; j < flightChartLen; j++) {
                            var chartsMulNum = echarts.init($("#airport_num" + j)[0])
                            var chartsMulFile = echarts.init($("#airport_file" + j)[0])
                            airportsChartArr.numChartArr.push(chartsMulNum);
                            airportsChartArr.fileChartArr.push(chartsMulFile);
                            chartsMulNum.setOption(airportsChartArr.airNumOptions[j]);
                            chartsMulFile.setOption(airportsChartArr.airFileOptions[j]);
                        }
                    } else {
                        $("#airport_container").find(".no_data").show()
                    }
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    };
    var refreshAirportsInformation = function () {
        $.ajax({
            type: "GET",
            url: iphost + "shareDataPlatform/airportDataCount",
            data: {},
            dataType: "json",
            success: function (data) {
                if ($.isValidObject(data)) {
                    var generateTime = data.generatetime;
                    var dataTime = "数据生成时间:" +
                        generateTime.substring(0, 4) + '-' +
                        generateTime.substring(4, 6) + '-' +
                        generateTime.substring(6, 8) + '  ' +
                        generateTime.substring(8, 10) + ':' +
                        generateTime.substring(10, 12);
                    $(".data_time").text(dataTime);
                    var airportsData = data.airportDatas;
                    if(airportsChartArr.dataArr.length == airportsData.length){
                        var len =  airportsChartArr.airNumOptions.length;
                        for(var i=0;i<len;i++){
                            airportsData[i].currentTime = generateTime;
                            airportsChartArr.airNumOptions[i].refreshOption(airportsData[i], "data_COUNT", airportChartOpt, "信息数/个")
                            airportsChartArr.numChartArr[i].setOption(airportsChartArr.airNumOptions[i]);
                            airportsChartArr.airFileOptions[i].refreshOption(airportsData[i], "file_COUNT", airportChartOpt, "文件数/个")
                            airportsChartArr.fileChartArr[i].setOption(airportsChartArr.airFileOptions[i]);
                        }
                    }else if(airportsData.length > airportsChartArr.dataArr.length){
                        var len =  airportsChartArr.dataArr.length;
                        for(var i=0;i<len;i++){
                            for(var j=0;j<airportsData.length;j++){
                                if(airportsData[j].airportName == airportsChartArr.dataArr[i].airportName ){
                                    airportsData[i].currentTime = generateTime;
                                    airportsChartArr.airNumOptions[i].refreshOption(airportsData[i], "data_COUNT", airportChartOpt, "信息数/个")
                                    airportsChartArr.numChartArr[i].setOption(airportsChartArr.airNumOptions[i]);
                                    airportsChartArr.airFileOptions[i].refreshOption(airportsData, "file_COUNT", airportChartOpt, "文件数/个")
                                    airportsChartArr.fileChartArr[i].setOption(airportsChartArr[i].airFileOptions[i]);
                                }else{
                                    airportsData[i].currentTime = generateTime;
                                    var airportsDom = '<div class="flight_group box flights_charts"> <h2>' + airportsData[i].airportName + '机场运行信息</h2> <div class="information"> <div class="num_chart col-lg-5 col-sm-4" id="airport_num' + i + '"></div> <div class="airport col-lg-2 col-sm-4"> <div class="airport_head"> <div class="airport_num">信息数</div> <div class="information_name">信息类型</div> <div class="file_num">文件数</div></div>  <ul class="airport_data_detail"> <li> <p class="num airport_position_num">' + airportsData[i].PSNI_DATA + '</p> <p class="airport_position">机场机位信息</p> <p class="f_num airport_position_num_file">' + airportsData[i].PSNI_FILE + '</p> </li> <li> <p class="num fpdi">' + airportsData[i].FPDI_DATA + '</p> <p class="airport_position">机场离港航班信息</p> <p class="f_num fpdi_file">' + airportsData[i].FPDI_FILE + '</p> </li> <li> <p class="num fpai">' + airportsData[i].FPAI_DATA + '</p><p class="airport_position">机场到港航班信息</p> <p class="f_num fpai_file">' + airportsData[i].FPAI_FILE + '</p> </li> <li> <p class="num ppci">' + airportsData[i].PPCI_DATA + '</p> <p class="airport_position">机场客货信息</p> <p class="f_num ppci_file">' + airportsData[i].PPCI_FILE + '</p> </li> </ul> </div> <div class="file_chart col-lg-5 col-sm-4" id="airport_file' + i + '"></div><div class="clb"></div> </div> </div>'
                                    $("#airport_container").append(airportsDom);
                                    var numOptions = new AirportsOptions(airportsData[i], airportChartOpt, "data_COUNT", "信息数/个")
                                    airportsChartArr.airNumOptions.push(numOptions);
                                    var fileOptions = new AirportsOptions(airportsData[i], airportChartOpt, "file_COUNT", "文件数/个")
                                    airportsChartArr.airFileOptions.push(fileOptions);
                                    var chartsMulNum = echarts.init($("#airport_num" + j)[0])
                                    var chartsMulFile = echarts.init($("#airport_file" + j)[0])
                                    airportsChartArr.numChartArr.push(chartsMulNum);
                                    airportsChartArr.fileChartArr.push(chartsMulFile);
                                    chartsMulNum.setOption(airportsChartArr.airNumOptions[j]);
                                    chartsMulFile.setOption(airportsChartArr.airFileOptions[j]);
                                    airportsChartArr.dataArr.push(airportsData[j]);
                                }
                            }
                        }
                    }else if(airportsData.length < airportsChartArr.dataArr.length){
                        var len =  airportsData.length;
                        var difLen = airportsChartArr.dataArr.length - airportsData.length;
                        airportsChartArr.comNumOptions.slice(0,len+1);
                        for(var i=0;i<difLen;i++){
                            $("#airport_container").removeChild($(".flights_charts")[i]);
                        }
                        for(var i=0;i<len;i++){
                            for(var j=0;j<airportsData.length;j++){
                                airportsData[i].currentTime = generateTime;
                                airportsChartArr.airNumOptions[i].refreshOption(airportsData[i], "data_COUNT", airportChartOpt, "信息数/个")
                                airportsChartArr.numChartArr[i].setOption(airportsChartArr.airNumOptions[i]);
                                airportsChartArr.airFileOptions[i].refreshOption(airportsData, "file_COUNT", airportChartOpt, "文件数/个")
                                airportsChartArr.fileChartArr[i].setOption(airportsChartArr[i].airFileOptions[i]);
                            }
                        }
                    }
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
    /*航空公司运行信息*/
    var companyChartsArr = {
        numChartArr: [],
        fileChartArr: [],
        comNumOptions: [],
        comFileOptions: [],
        dataArr:[]
    };
    var companyChartOpt = {
        faci: "FACI_HOUR",
        fcri: "FCRI_HOUR",
        flgh: "FLGH_HOUR",
        fpci: "FPCI_HOUR",
        fpln: "FPLN_HOUR",
    }
    var setFlightsInformation = function (fatherDom) {
        $.ajax({
            type: "GET",
            url: iphost + "shareDataPlatform/companyDataCount",
            data: {},
            dataType: "json",
            success: function (data) {
                if ($.isValidObject(data)) {
                    var generateTime = data.generatetime;
                    var dataTime = "数据生成时间:" +
                        generateTime.substring(0, 4) + '-' +
                        generateTime.substring(4, 6) + '-' +
                        generateTime.substring(6, 8) + '  ' +
                        generateTime.substring(8, 10) + ':' +
                        generateTime.substring(10, 12);
                    $(".data_time").text(dataTime);
                    var companyDatas =  Object.values(data.companyDatas);
                    if (companyDatas.length > 0) {
                        $("#company_container").find(".no_data").hide()
                        //时间转换显示
                        var generateTime = data.generatetime;
                        var comDataLen = companyDatas.length
                        for (var i = 0; i < comDataLen; i++) {
                            companyDatas[i].currentTime = generateTime;
                            var flightsDom = '<div class="flight_group box company_charts"><h2>' + companyDatas[i].companyName + '航空运行信息</h2><div class="information"><div class="num_chart col-lg-5 col-sm-4" id="flight_num' + i + '"></div><div class="airport col-lg-2 col-sm-4"><div class="airport_head"><div class="airport_num">信息数</div><div class="information_name">信息类型</div><div class="file_num">文件数</div></div><ul class="airport_data_detail"><li><p class="num flgh">' + companyDatas[i].FLGH_DATA + '</p><p class="airport_position">航班地面状态信息</p><p class="f_num flgh_file">' + companyDatas[i].FLGH_FILE + '</p></li><li><p class="num fpln">' + companyDatas[i].FPLN_DATA + '</p><p class="airport_position">航班计划变更信息</p><p class="f_num fpln_file">' + companyDatas[i].FPLN_FILE + '</p></li><li><p class="num fpci">' + companyDatas[i].FPCI_DATA + '</p><p class="airport_position">航班客货信息</p><p class="f_num fpci_file">' + companyDatas[i].FPCI_FILE + '</p> </li> <li> <p class="num fcri">' + companyDatas[i].FCRI_DATA + '</p> <p class="airport_position">航班机组人员信息</p> <p class="f_num fcri_file">' + companyDatas[i].FCRI_FILE + '</p> </li> </ul> </div> <div class="file_chart col-lg-5 col-sm-4" id="flight_file' + i + '"></div> <div class="clb"></div> </div> </div>'
                            fatherDom.append(flightsDom);
                            var numOptions = new CompanyOptions(companyDatas[i], companyChartOpt, "data_COUNT", "信息数/个")
                            companyChartsArr.comNumOptions.push(numOptions);
                            var fileOptions = new CompanyOptions(companyDatas[i], companyChartOpt, "file_COUNT", "文件数/个")
                            companyChartsArr.comFileOptions.push(fileOptions)
                        }
                        var comChartsLen = $(".company_charts").length
                        for (var j = 0; j < comChartsLen; j++) {
                            var chartsMulNum = echarts.init($("#flight_num" + j)[0])
                            var chartsMulFile = echarts.init($("#flight_file" + j)[0])
                            companyChartsArr.numChartArr.push(chartsMulNum);
                            companyChartsArr.fileChartArr.push(chartsMulFile);
                            chartsMulNum.setOption(companyChartsArr.comNumOptions[j]);
                            chartsMulFile.setOption(companyChartsArr.comFileOptions[j]);
                        }
                    } else {
                        $("#company_container").find(".no_data").show()
                    }
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    };
    var refreshFlightInformation = function () {
        $.ajax({
            type: "GET",
            url: iphost + "shareDataPlatform/companyDataCount",
            data: {},
            dataType: "json",
            success: function (data) {
                if ($.isValidObject(data)) {
                    var generateTime = data.generatetime;
                    var dataTime = "数据生成时间:" +
                        generateTime.substring(0, 4) + '-' +
                        generateTime.substring(4, 6) + '-' +
                        generateTime.substring(6, 8) + '  ' +
                        generateTime.substring(8, 10) + ':' +
                        generateTime.substring(10, 12);
                    $(".data_time").text(dataTime);
                    var companyDatas = data.companyDatas;
                    if(companyChartsArr.dataArr.length == companyDatas.length){
                        var len =  companyChartsArr.comFileOptions.length;
                        for(var i=0;i<len;i++){
                            companyDatas[i].currentTime = generateTime;
                            companyChartsArr.comNumOptions[i].refreshOption(companyDatas[i], "data_COUNT", companyChartOpt, "信息数/个")
                            companyChartsArr.numChartArr[i].setOption(companyChartsArr.comNumOptions[i]);
                            companyChartsArr.comFileOptions[i].refreshOption(companyDatas[i], "file_COUNT", companyChartOpt, "文件数/个")
                            companyChartsArr.fileChartArr[i].setOption(companyChartsArr.comFileOptions[i]);
                        }
                    }else if(companyDatas.length > companyChartsArr.dataArr.length ){
                        var len =  companyChartsArr.dataArr.length;
                        for(var i=0;i<len;i++){
                            for(var j=0;j<companyDatas.length;j++){
                                if(companyDatas[j].airportName == companyChartsArr.dataArr[i].airportName ){
                                    airportsData[i].currentTime = generateTime;
                                    companyChartsArr.comNumOptions[i].refreshOption(companyDatas[i], "data_COUNT", companyChartOpt, "信息数/个")
                                    companyChartsArr.numChartArr[i].setOption(companyChartsArr.comNumOptions[i]);
                                    companyChartsArr.comFileOptions[i].refreshOption(companyDatas[i], "file_COUNT", companyChartOpt, "文件数/个")
                                    companyChartsArr.fileChartArr[i].setOption(companyChartsArr.comFileOptions[i]);
                                }else{
                                    airportsData[i].currentTime = generateTime;
                                    var flightsDom = '<div class="flight_group box company_charts"><h2>' + companyDatas[i].companyName + '航空运行信息</h2><div class="information"><div class="num_chart col-lg-5 col-sm-4" id="flight_num' + i + '"></div><div class="airport col-lg-2 col-sm-4"><div class="airport_head"><div class="airport_num">信息数</div><div class="information_name">信息类型</div><div class="file_num">文件数</div></div><ul class="airport_data_detail"><li><p class="num flgh">' + companyDatas[i].FLGH_DATA + '</p><p class="airport_position">航班地面状态信息</p><p class="f_num flgh_file">' + companyDatas[i].FLGH_FILE + '</p></li><li><p class="num fpln">' + companyDatas[i].FPLN_DATA + '</p><p class="airport_position">航班计划变更信息</p><p class="f_num fpln_file">' + companyDatas[i].FPLN_FILE + '</p></li><li><p class="num fpci">' + companyDatas[i].FPCI_DATA + '</p><p class="airport_position">航班客货信息</p><p class="f_num fpci_file">' + companyDatas[i].FPCI_FILE + '</p> </li> <li> <p class="num fcri">' + companyDatas[i].FCRI_DATA + '</p> <p class="airport_position">航班机组人员信息</p> <p class="f_num fcri_file">' + companyDatas[i].FCRI_FILE + '</p> </li> </ul> </div> <div class="file_chart col-lg-5 col-sm-4" id="flight_file' + i + '"></div> <div class="clb"></div> </div> </div>'
                                    $("#company_container").append(flightsDom);
                                    var numOptions = new CompanyOptions(companyDatas[i], companyChartOpt, "data_COUNT", "信息数/个");
                                    companyChartsArr.comNumOptions.push(numOptions);
                                    var fileOptions = new CompanyOptions(companyDatas[i], companyChartOpt, "file_COUNT", "文件数/个");
                                    companyChartsArr.comFileOptions.push(fileOptions);
                                    var chartsMulNum = echarts.init($("#flight_num" + j)[0]);
                                    var chartsMulFile = echarts.init($("#flight_file" + j)[0]);
                                    companyChartsArr.numChartArr.push(chartsMulNum);
                                    companyChartsArr.fileChartArr.push(chartsMulFile);
                                    chartsMulNum.setOption(companyChartsArr.comNumOptions[j]);
                                    chartsMulFile.setOption(companyChartsArr.comFileOptions[j]);
                                }
                            }
                        }

                    }else if( companyDatas.length < companyChartsArr.dataArr.length){
                        var len =  companyDatas.length;
                        var difLen = companyChartsArr.dataArr.length - companyDatas.length;
                        companyChartsArr.comNumOptions.slice(0,len+1);
                        for(var i=0;i<difLen;i++){
                            $("#company_container").removeChild($(".company_charts")[i]);
                        }
                        for(var i=0;i<len;i++){
                            for(var j=0;j<companyDatas.length;j++){
                                    companyDatas[i].currentTime = generateTime;
                                    companyChartsArr.comNumOptions[i].refreshOption(companyDatas[i], "data_COUNT", companyChartOpt, "信息数/个")
                                    companyChartsArr.numChartArr[i].setOption(companyChartsArr.comNumOptions[i]);
                                    companyChartsArr.comFileOptions[i].refreshOption(companyDatas[i], "file_COUNT", companyChartOpt, "文件数/个")
                                    companyChartsArr.fileChartArr[i].setOption(companyChartsArr.comFileOptions[i]);
                            }
                        }
                    }

                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
    /*机场航空公司切换事件*/
    var initAirCom = function () {
        //机场
        $('#airport_operation').on('click', function () {
            $('.content-container .row').removeClass('active');
            $('#airport').addClass('active');
            $("#airport_container").find(".flight_group").remove()
            setAirportsInformation($("#airport_container")); //机场数据初始化
            resizeFit()
        });
        //航空公司
        $('#flights_operation').on('click', function () {
            $('.content-container .row').removeClass('active');
            $('#company').addClass('active');
            $("#company_container").find(".flight_group").remove()
            setFlightsInformation($("#company_container")); //航空公司数据初始化
            resizeFit();
        });
        //机场面包屑点击事件
        $('.bread_air').on('click', function () {
            $('.content-container .row').removeClass('active');
            $('#home').addClass('active');
            refreshData(true); //监控页面数据刷新
            resizeFit();
        });
        //航空公司面包屑点击事件
        $('.bread_com').on('click', function () {
            $('.content-container .row').removeClass('active');
            $('#home').addClass('active');
            refreshData(true); //监控页面数据刷新
            resizeFit();
        });
    };
    //适应屏幕宽高尺寸
    $.fn.resizeEnd = function (callback, timeout) {
        $(this).resize(function () {
            var $this = $(this);
            if ($this.data('resizeTimeout')) {
                clearTimeout($this.data('resizeTimeout'));
            }
            $this.data('resizeTimeout', setTimeout(callback, timeout));
        });
    };
    $(window).resizeEnd(function () {
        charts.airportNumChart.resize();
        charts.airportFlieChart.resize();
        charts.flightNumChart.resize();
        charts.flightFlieChart.resize();
        charts.manageNumChart.resize();
        charts.manageFlieChart.resize();
        charts.monitorNumChart.resize();
        charts.monitorFlieChart.resize();
        if (!$("#airports_container").is(":hidden")) {
            var len = airportsChartArr.numChartArr.length
            var airChartNumArr = airportsChartArr.numChartArr
            var airChartFileArr = airportsChartArr.fileChartArr
            for (var i = 0; i < len; i++) {
                airChartNumArr[i].resize();
                airChartFileArr[i].resize();
            }
        }
        if (!$("#company_container").is(":hidden")) {
            var len = companyChartsArr.numChartArr.length
            var comChartNumArr = companyChartsArr.numChartArr
            var comChartFileArr = companyChartsArr.fileChartArr
            for (var i = 0; i < len; i++) {
                comChartNumArr[i].resize();
                comChartFileArr[i].resize();
            }
        }
    }, 200);
    //曲线图参数更新
    function refreshChartsOption() {
        if ($("#home").is(":visible")) {
            $.ajax({
                type: "GET",
                url: iphost + "shareDataPlatform/totalDataCount",
                data: {},
                dataType: "json",
                success: function (data) {
                    if ($.isValidObject(data)) {
                        var totalDataCount = data.totalDataCount
                        //时间转换显示
                        var generateTime = data.generatetime;
                        var dataTime = "数据生成时间:" +
                            generateTime.substring(0, 4) + '-' +
                            generateTime.substring(4, 6) + '-' +
                            generateTime.substring(6, 8) + '  ' +
                            generateTime.substring(8, 10) + ':' +
                            generateTime.substring(10, 12);
                        $(".data_time").text(dataTime);
                        for (var x in totalDataCount) {
                            if (totalDataCount[x] === "undefined" || totalDataCount[x] === "" || totalDataCount[x] === "NAN") {
                                totalDataCount[x] = "-";
                            }
                        }
                        setTotalData(totalDataCount);
                        //传递曲线图数据参数并初始化echarts
                        totalDataCount.currentTime = generateTime;
                        //参数刷新
                        options.airportNumOption.refreshOption(totalDataCount, indexAirChartOpt, "data_COUNT",  "信息数/个");
                        options.airportFileOption.refreshOption(totalDataCount, indexAirChartOpt, "file_COUNT",  "文件数/个");
                        options.companyNumOption.refreshOption(totalDataCount, indexComChartOpt, "data_COUNT",  "信息数/个");
                        options.companyFileOption.refreshOption(totalDataCount, indexComChartOpt, "file_COUNT",  "文件数/个");
                        options.manageNumOption.refreshOption(totalDataCount, manageOpt, "data_COUNT", "信息数/个");
                        options.manageFileOption.refreshOption(totalDataCount, manageOpt, "file_COUNT", "文件数/个");
                        options.monitorNumOption.refreshOption(totalDataCount, monitorOpt, "data_COUNT", "信息数/个");
                        options.monitorFileOption.refreshOption(totalDataCount, monitorOpt, "file_COUNT", "文件数/个");
                        // 刷新后曲线图参数设置。
                        charts.airportNumChart.setOption(options.airportNumOption);
                        charts.airportFlieChart.setOption(options.airportFileOption);
                        charts.flightNumChart.setOption(options.companyNumOption);
                        charts.flightFlieChart.setOption(options.companyFileOption);
                        charts.manageNumChart.setOption(options.manageNumOption);
                        charts.manageFlieChart.setOption(options.manageFileOption);
                        charts.monitorNumChart.setOption(options.monitorNumOption);
                        charts.monitorFlieChart.setOption(options.monitorFileOption);
                    }

                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
        //机场数据刷新
        if ($("#airport_container").is(":visible")) {
            // $("#airport_container").find(".flight_group").remove();
            // setAirportsInformation($("#airport_container")); //机场数据初始化
            refreshAirportsInformation();

        }
        //航空公司数据刷新
        if ($("#company_container").is(":visible")) {
            // $("#company_container").find(".flight_group").remove();
            // setFlightsInformation($("#company_container")); //航空公司数据初始化
            refreshFlightInformation()
        }
    }
    //定时刷新
    var refreshData = function () {
        refreshChartsOption()
    };
    //开始定时器
    var startTimer = function (func,instance, isNext, time) {
        if(isRefresh) { // 定时器总开关为true
            if (typeof func == "function") {
                setTimeout(function () {
                    func(instance, isNext);
                }, time);
            }
        }
    };
    var resizeFit = function () {
        charts.airportNumChart.resize();
        charts.airportFlieChart.resize();
        charts.flightNumChart.resize();
        charts.flightFlieChart.resize();
        charts.manageNumChart.resize();
        charts.manageFlieChart.resize();
        charts.monitorNumChart.resize();
        charts.monitorFlieChart.resize();
        if (!$(".airports_container").is(":hidden")) {
            var len = airportsChartArr.numChartArr.length
            var airChartNumArr = airportsChartArr.numChartArr
            var airChartFileArr = airportsChartArr.fileChartArr
            for (var i = 0; i < len; i++) {
                airChartNumArr[i].resize();
                airChartFileArr[i].resize();
            }
        }
        if (!$(".company_container").is(":hidden")) {
            var len = companyChartsArr.numChartArr.length
            var comChartNumArr = companyChartsArr.numChartArr
            var comChartFileArr = companyChartsArr.fileChartArr
            for (var i = 0; i < len; i++) {
                comChartNumArr[i].resize();
                comChartFileArr[i].resize();
            }
        }
    };
    return {
        initMonitor: function () {
            initAirCom(); //机场航空公司点击事件初始化
            getTotalDateCount(totalDataCount,true); //获取航班监控页面数据
        },
        resizeFit: function () {
            resizeFit()
        }
    }
}();
$(document).ready(function () {
    MONITOR.initMonitor()
});
