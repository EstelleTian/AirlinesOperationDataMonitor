/**
 * Created by caowei on 2017/11/20.
 */
var MONITOR = function () {
    /*获取监控主页数据统计*/
    var getTotalDateCount =function () {
        $.ajax({
            type: "GET",
            url: "http://192.168.243.104:1566/shareDataPlatform/totalDataCount",
            data: {},
            dataType: "json",
            success:function (data) {
                console.log(data);
                if($.isValidObject(data)){
                    var totalDataCount = data.totalDataCount
                    for(var x in totalDataCount){
                        if(totalDataCount[x] === "undefined"||totalDataCount[x] === ""||totalDataCount[x] === "NAN"){
                            totalDataCount[x] = "-";
                        }
                    }
                    //机场机位信息
                    $(".airport_position_num").html(totalDataCount.APOI_PSNI_DATA)
                    $(".airport_position_num_file").html(totalDataCount.APOI_PSNI_FILE)
                    //机场离港信息
                    $(".fpdi").html(totalDataCount.APOI_FPDI_DATA)
                    $(".fpdi_file").html(totalDataCount.APOI_FPDI_FILE)
                    //机场到港信息
                    $(".fpai").html(totalDataCount.APOI_FPAI_DATA)
                    $(".fpai_file").html(totalDataCount.APOI_FPAI_FILE)
                    //机场客货信息
                    $(".ppci").html(totalDataCount.APOI_PPCI_DATA)
                    $(".ppci_file").html(totalDataCount.APOI_PPCI_FILE)
                    //航班地面状态
                    $(".flgh").html(totalDataCount.ALOI_FLGH_DATA)
                    $(".flgh_file").html(totalDataCount.ALOI_FLGH_FILE)
                    //航班计划变更
                    $(".fpln").html(totalDataCount.ALOI_FPLN_DATA)
                    $(".fpln_file").html(totalDataCount.ALOI_FPLN_FILE)
                    //航班客货
                    $(".fpci").html(totalDataCount.ALOI_FPCI_DATA)
                    $(".fpci_file").html(totalDataCount.ALOI_FPCI_FILE)
                    //航班机组人员
                    $(".fcri").html(totalDataCount.ALOI_FCRI_DATA)
                    $(".fcri_file").html(totalDataCount.ALOI_FCRI_FILE)
                    //航空器
                    $(".faci").html(totalDataCount.ALOI_FACI_DATA)
                    $(".faci_file").html(totalDataCount.ALOI_FACI_FILE)
                    //CDM
                    $(".fcdm").html(totalDataCount.ATMI_FCDM_DATA)
                    $(".fcdm_file").html(totalDataCount.ATMI_FCDM_FILE)
                    //流量控制措施
                    $(".ftmi").html(totalDataCount.ATMI_FTMI_DATA)
                    $(".ftmi_file").html(totalDataCount.ATMI_FTMI_FILE)
                    //机场通行能力
                    $(".padr").html(totalDataCount.ATMI_PADR_DATA)
                    $(".padr_file").html(totalDataCount.ATMI_PADR_FILE)
                    //MDRS
                    $(".mdrs").html(totalDataCount.ATMI_MDRS_DATA)
                    $(".mdrs_file").html(totalDataCount.ATMI_MDRS_FILE)
                    //扇区开放
                    $(".sect").html(totalDataCount.ATMI_SECT_DATA)
                    $(".sect_file").html(totalDataCount.ATMI_SECT_FILE)
                    //航班计划动态
                    $(".fosc").html(totalDataCount.OSCI_FOSC_DATA)
                    $(".fosc_file").html(totalDataCount.OSCI_FOSC_FILE)
                    //航班统计
                    $(".fper").html(totalDataCount.OSCI_FPER_DATA)
                    $(".fper_file").html(totalDataCount.OSCI_FPER_FILE)
                    //机场统计
                    $(".pper").html(totalDataCount.OSCI_PPER_DATA)
                    $(".pper_file").html(totalDataCount.OSCI_PPER_FILE)
                    //传递曲线图数据参数并初始化echarts
                    initCurveCharts(totalDataCount)

                }
            },
            error:function (error) {
                console.log(error);
            }
        })
    };
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
    var Charts = function (anc,afc,fnc,ffc,mnc,mfc,monc,mofc) {
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
     * */
    var indexAirChartOpt = {
        fpai:"APOI_FPAI_HOUR",
        ppci:"APOI_PPCI_HOUR",
        fpdi:"APOI_FPDI_HOUR",
        psni:"APOI_PSNI_HOUR"

    }
    var indexComChartOpt = {
        faci:"ALOI_FACI_HOUR",
        fcri:"ALOI_FCRI_HOUR",
        flgh:"ALOI_FLGH_HOUR",
        fpci:"ALOI_FPCI_HOUR",
        fpln:"ALOI_FPLN_HOUR",

    }
    var AirportsOptions = function (dataObj,type,dataOpt) {
        this.backgroundColor = '#FFFFFF',
            this.color =  ['#3398DB'],
            this.title =  {
                text: ''},
            this.grid =  {
                left: '3%',
                right: '4%',
                bottom: '10%',
                width:"80%",
                height:"75%",
                containLabel: true
            },
            this.tooltip =  {
                trigger: 'axis',
                height:15,
                textStyle:{fontSize:"12"},
                axisPointer: {
                    label: {
                        backgroundColor: '#6a7985',
                    }
                }
            },
            this .legend = {
                data: ["到港航班","离港航班","客货","机位"],
                top:"20",
                right: "10",
                textStyle:{fontSize:"11"},
                orient:'vertical'
            },
            this.xAxis = {
                name: "时间",
                data: dataConvert(dataObj,dataOpt.fpai,"hour").xArr,
                boundaryGap : false,

            },
            this.yAxis = {
                name: "信息数量",
            },
            this.dataZoom = {
                show: true,
                start: 30,
                height:13,
                zoomLock:false,
                minSpan:25,
                bottom:"5",
                end: 60
            },
            this.series = [
                {
                    name: "到港航班",
                    type: 'line',
                    symbol:'none',
                    smooth:true,
                    border:0,
                    lineStyle: {normal: {color:"#9abcc3",}},
                    itemStyle: {normal: {color:"#9abcc3",}},
                    data: dataConvert(dataObj,dataOpt.fpai,type)
                },{
                    name: "离港航班",
                    type: 'line',
                    symbol:'none',
                    smooth:true,
                    border:0,
                    lineStyle: {normal: {color:"#CCCCFF",}},
                    itemStyle: {normal: {color:"#CCCCFF",}},
                    data: dataConvert(dataObj,dataOpt.fpdi,type)
                },{
                    name: "客货",
                    type: 'line',
                    symbol:'none',
                    smooth:true,
                    border:0,
                    lineStyle: {normal:{color:"#1ABB9C",}},
                    itemStyle: {normal:{color:"#1ABB9C",}},
                    data: dataConvert(dataObj,dataOpt.ppci,type)
                },{
                    name: "机位",
                    type: 'line',
                    symbol:'none',
                    smooth:true,
                    border:0,
                    lineStyle: {normal:{color:"#3498DB",}},
                    itemStyle: {normal:{color:"#3498DB",}},
                    data: dataConvert(dataObj,dataOpt.psni,type)
                }
            ]
    }
    var CompanyOptions = function (dataObj,type,dataOpt) {
        this.backgroundColor = '#FFFFFF',
            this.color = ['#3398DB'],
            this.title = {
                text: ''
            },
            this.grid = {
                left: '3%',
                right: '4%',
                bottom: '10%',
                width:"80%",
                height:"75%",
                containLabel: true
            },
            this .tooltip = {
                trigger: 'axis',
                height:15,
                textStyle:{fontSize:"12"},
                axisPointer: {
                    label: {
                        backgroundColor: '#6a7985',
                    }
                }
            },
            this.legend = {
                data: ["航空器","机组人员","地面状态","客货","计划变更"],
                top:"20",
                right: "15",
                textStyle:{fontSize:"11"},
                orient:'vertical'
            },
            this.xAxis = {
                name: "时间",
                data:dataConvert(dataObj,dataOpt.faci,"hour").xArr,
                boundaryGap : false,

            },
            this.yAxis = {
                name: "信息数量",
            },
            this.dataZoom = {
                show: true,
                start: 30,
                height:13,
                zoomLock:false,
                minSpan:25,
                bottom:"5",
                end: 60
            },
            this.series =[
                {
                    name: "航空器",
                    type: 'line',
                    symbol:'none',
                    smooth:true,
                    border:0,
                    itemStyle: {normal: {color:"#9abcc3",}},
                    lineStyle: {normal: {color:"#9abcc3",}},
                    data: dataConvert(dataObj,dataOpt.faci,type)
                },{
                    name: "机组人员",
                    type: 'line',
                    symbol:'none',
                    smooth:true,
                    border:0,
                    itemStyle: {normal: {color:"#CCCCFF",}},
                    lineStyle: {normal: {color:"#CCCCFF",}},
                    data: dataConvert(dataObj,dataOpt.fcri,type)
                },{
                    name: "地面状态",
                    type: 'line',
                    symbol:'none',
                    smooth:true,
                    border:0,
                    itemStyle: {normal: {color:"#1ABB9C",}},
                    lineStyle: {normal: {color:"#1ABB9C",}},
                    data: dataConvert(dataObj,dataOpt.flgh,type)
                },{
                    name: "客货",
                    type: 'line',
                    symbol:'none',
                    smooth:true,
                    border:0,
                    itemStyle: {normal: {color:"#3498DB",}},
                    lineStyle: {normal: {color:"#3498DB",}},
                    data: dataConvert(dataObj,dataOpt.fpci,type)
                },{
                    name: "计划变更",
                    type: 'line',
                    symbol:'none',
                    smooth:true,
                    border:0,
                    itemStyle: {normal: {color:"#E74C3C",}},
                    lineStyle: {normal: {color:"#E74C3C",}},
                    data: dataConvert(dataObj,dataOpt.fpln,type)
                }
            ]
    }
    var ManageOptions = function (dataObj,type) {
        this.backgroundColor = '#FFFFFF',
        this.color = ['#3398DB'],
        this.title = {
            text: ''
        },
        this.grid = {
            left: '3%',
                right: '4%',
                bottom: '10%',
                width:"80%",
                height:"75%",
                containLabel: true
        },
        this.tooltip = {
            trigger: 'axis',
            height:'50',
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985',
                }
            },
            textStyle:{fontSize:"12"},
        },
        this.legend = {
            data: ["航班CDM","流量控制措施","MDRS","机场通行能力","扇区开放合并"],
                top:"20",
                right: "0",
                textStyle:{fontSize:"11"},
            orient:'vertical'
        },
        this.xAxis = {
            name: "时间",
                data: dataConvert(dataObj,"ATMI_FCDM_HOUR","hour").xArr,
                boundaryGap : false,

        },
        this.yAxis = {
            name: "信息数量",
        },
        this.dataZoom = {
            show: true,
                start: 30,
                height:13,
                zoomLock:false,
                minSpan:25,
                bottom:"5",
                end: 60
        },
        this.series =[
            {
                name: "航班CDM",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#9abcc3"}},
                lineStyle: {normal: {color:"#9abcc3"}},
                data: dataConvert(dataObj,"ATMI_FCDM_HOUR",type)
            },{
                name: "流量控制措施",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#CCCCFF",}},
                lineStyle: {normal: {color:"#CCCCFF",}},
                data: dataConvert(dataObj,"ATMI_FTMI_HOUR",type)
            },{
                name: "MDRS",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#1ABB9C",}},
                lineStyle: {normal: {color:"#1ABB9C",}},
                data: dataConvert(dataObj,"ATMI_MDRS_HOUR",type)
            },{
                name: "机场通行能力",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#3498DB"}},
                lineStyle: {normal: {color:"#3498DB"}},
                data: dataConvert(dataObj,"ATMI_PADR_HOUR",type)
            },{
                name: "扇区开放合并",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#E74C3C",}},
                lineStyle: {normal: {color:"#E74C3C",}},
                data: dataConvert(dataObj,"ATMI_SECT_HOUR",type)
            }
        ]
    }
    var MonitorOption =function (dataObj,type) {
        this.backgroundColor = '#FFFFFF',
        this.color = ['#3398DB'],
        this.title = {
            text: ''
        },
        this.grid = {
            left: '3%',
                right: '4%',
                bottom: '10%',
                width:"80%",
                height:"75%",
                containLabel: true
        },
        this.tooltip = {
            trigger: 'axis',
                height:15,
                textStyle:{fontSize:"12"},
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985',
                }
            }
        },
        this.legend = {
            data: ["航班计划动态","航班统计","机场统计"],
                top:"20",
                right: "0",
                textStyle:{fontSize:"11"},
            orient:'vertical'
        },
        this.xAxis = {
            name: "时间",
                data: dataConvert(dataObj,"OSCI_FPER_HOUR","hour").xArr,
                boundaryGap : false,

        },
        this.yAxis = {
            name: "信息数量",
        },
        this.dataZoom = {
            show: true,
                start: 30,
                height:13,
                zoomLock:false,
                minSpan:25,
                bottom:"5",
                end: 60
        },
        this.series = [
            {
                name: "航班计划动态",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#9abcc3",}},
                lineStyle: {normal: {color:"#9abcc3",}},
                data: dataConvert(dataObj,"OSCI_FOSC_HOUR",type)
            },{
                name: "航班统计",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#CCCCFF",}},
                lineStyle: {normal: {color:"#CCCCFF",}},
                data: dataConvert(dataObj,"OSCI_FPER_HOUR",type)
            },{
                name: "机场统计",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#1ABB9C",}},
                lineStyle: {normal: {color:"#1ABB9C",}},
                data: dataConvert(dataObj,"OSCI_PPER_HOUR",type)
            }
        ]
    }
    var charts = new Charts($("#airport_num_chart")[0],$("#airport_file_chart")[0],$("#flight_num_chart")[0],$("#flight_file_chart")[0],$("#manage_num_chart")[0],$("#manage_file_chart")[0],$("#monitor_num_chart")[0],$("#monitor_file_chart")[0])
    var initCurveCharts = function (dataObj) {
        // var airportData = {
        //     "generatetime": "20171129190137",
        //     "status": "200",
        //     "error": null,
        //     "hisData": {
        //         "APOI": {
        //             "PSNI": [{
        //                 "id": 256,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 2,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 3,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 4,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 5,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }, {
        //                 "id": 7,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 8,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 9,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 10,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 11,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 15,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 12,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }],
        //             "FPDI": [{
        //                 "id": 31,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 32,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 33,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 34,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 35,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 36,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 37,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 38,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 39,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 40,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 41,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 45,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 42,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 43,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 44,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }],
        //             "FPAI": [{
        //                 "id": 16,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 17,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 18,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 19,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 20,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 21,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 22,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 23,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 24,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 25,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 26,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 30,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 27,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 28,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 29,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }],
        //             "PPCI": [{
        //                 "id": 61,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 62,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 63,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 64,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 65,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 66,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 67,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 68,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 69,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 70,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 71,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 75,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 72,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 73,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 74,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }]},
        //         "ATMI": {
        //             "FCDM": [{
        //                 "id": 256,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 2,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 3,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 4,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 5,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }, {
        //                 "id": 7,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 8,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 9,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 10,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 11,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 15,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 12,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }],
        //             "FTMI": [{
        //                 "id": 31,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 32,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 33,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 34,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 35,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 36,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 37,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 38,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 39,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 40,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 41,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 45,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 42,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 43,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 44,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }],
        //             "PADR": [{
        //                 "id": 16,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 17,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 18,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 19,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 20,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 21,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 22,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 23,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 24,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 25,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 26,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 30,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 27,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 28,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 29,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }],
        //             "MDRS": [{
        //                 "id": 61,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 62,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 63,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 64,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 65,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 66,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 67,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 68,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 69,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 70,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 71,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 75,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 72,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 73,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 74,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }],
        //             "SECT": [{
        //                 "id": 46,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 47,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 48,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 49,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 50,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 51,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 52,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 53,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 54,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 55,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 56,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 60,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 57,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 58,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 59,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }]},
        //         "OSCI": {
        //             "FOSC": [{
        //                 "id": 256,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 2,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 3,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 4,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 5,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }, {
        //                 "id": 7,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 8,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 9,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 10,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 11,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 15,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 12,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }],
        //             "FPER": [{
        //                 "id": 31,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 32,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 33,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 34,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 35,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 36,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 37,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 38,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 39,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 40,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 41,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 45,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 42,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 43,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 44,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }],
        //             "PPER": [{
        //                 "id": 16,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 17,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 18,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 19,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 20,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 21,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 22,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 23,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 24,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 25,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 26,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 30,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 27,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 28,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 29,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }]},
        //         "ALOI": {
        //             "FACI": [{
        //                 "id": 256,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 2,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 3,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 4,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 5,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }, {
        //                 "id": 7,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 8,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 9,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 10,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 11,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 15,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 12,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }, {
        //                 "id": null,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FACI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 0,
        //                 "dataCount": 0
        //             }],
        //             "FPCI": [{
        //                 "id": 31,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 32,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 33,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 34,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 35,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 36,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 37,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 38,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 39,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 40,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 41,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 45,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 42,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 43,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 44,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPCI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }],
        //             "FCRI": [{
        //                 "id": 16,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 17,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 18,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 19,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 20,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 21,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 22,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 23,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 24,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 25,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 26,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 30,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 27,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 28,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 29,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FCRI",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }],
        //             "FLGH": [{
        //                 "id": 61,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 62,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 63,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 64,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 65,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 66,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 67,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 68,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 69,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 70,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 71,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 75,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 72,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 73,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 74,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FLGH",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }],
        //             "FPLN": [{
        //                 "id": 46,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171114",
        //                 "fileCount": 27,
        //                 "dataCount": 135
        //             }, {
        //                 "id": 47,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171115",
        //                 "fileCount": 43,
        //                 "dataCount": 215
        //             }, {
        //                 "id": 48,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171116",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 49,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171117",
        //                 "fileCount": 54,
        //                 "dataCount": 270
        //             }, {
        //                 "id": 50,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171118",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 51,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171119",
        //                 "fileCount": 52,
        //                 "dataCount": 260
        //             }, {
        //                 "id": 52,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171120",
        //                 "fileCount": 23,
        //                 "dataCount": 115
        //             }, {
        //                 "id": 53,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171121",
        //                 "fileCount": 35,
        //                 "dataCount": 175
        //             }, {
        //                 "id": 54,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171122",
        //                 "fileCount": 76,
        //                 "dataCount": 380
        //             }, {
        //                 "id": 55,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171123",
        //                 "fileCount": 45,
        //                 "dataCount": 225
        //             }, {
        //                 "id": 56,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171124",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 60,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171125",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 57,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171126",
        //                 "fileCount": 25,
        //                 "dataCount": 125
        //             }, {
        //                 "id": 58,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171127",
        //                 "fileCount": 63,
        //                 "dataCount": 315
        //             }, {
        //                 "id": 59,
        //                 "messageType": "ALOI",
        //                 "messageSubType": "FPLN",
        //                 "messageSendDate": "20171128",
        //                 "fileCount": 34,
        //                 "dataCount": 170
        //             }]},
        //     }
        // }
        dataObj = dataObj;
        var airportNumOption = new AirportsOptions(dataObj,"data_COUNT",indexAirChartOpt)
        var airportFileOption = new AirportsOptions(dataObj,"file_COUNT",indexAirChartOpt);
        var companyNumOption = new CompanyOptions(dataObj,"data_COUNT",indexComChartOpt);
        var companyFileOption = new CompanyOptions(dataObj,"file_COUNT",indexComChartOpt);
        var manageNumOption = new ManageOptions(dataObj,"data_COUNT");
        var manageFileOption = new ManageOptions(dataObj,"file_COUNT");;
        var monitorNumOption = new MonitorOption(dataObj,"data_COUNT");
        var monitorFileOption = new MonitorOption(dataObj,"file_COUNT");
// 曲线图参数设置。
        charts.airportNumChart.setOption(airportNumOption);
        charts.airportFlieChart.setOption(airportFileOption);
        charts.flightNumChart.setOption(companyNumOption);
        charts.flightFlieChart.setOption(companyFileOption);
        charts.manageNumChart.setOption(manageNumOption);
        charts.manageFlieChart.setOption(manageFileOption);
        charts.monitorNumChart.setOption(monitorNumOption);
        charts.monitorFlieChart.setOption(monitorFileOption);
    }
//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
    var resizeWorldMapContainer = function () {
        $("#airport_num_chart").width($(".flight_group").innerWidth/2)
        $("#airport_file_chart").width($(".flight_group").innerWidth/2)
        $("#flight_num_chart").width($(".flight_group").innerWidth/2)
        $("#flight_file_chart").width($(".flight_group").innerWidth/2)
        $("#manage_num_chart").width($(".flight_group").innerWidth/2)
        $("#manage_file_chart").width($(".flight_group").innerWidth/2)
        $("#monitor_num_chart").width($(".flight_group").innerWidth/2)
        $("#monitor_file_chart").width($(".flight_group").innerWidth/2)
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
        //重置容器高宽
        resizeWorldMapContainer();
        charts.airportNumChart.resize();
        charts.airportFlieChart.resize();
        charts.flightNumChart.resize();
        charts.flightFlieChart.resize();
        charts.manageNumChart.resize();
        charts.manageFlieChart.resize();
        charts.monitorNumChart.resize();
        charts.monitorFlieChart.resize();
        resetML($('.airports_container'),$('.as'));
        resetML($('.flights_container'),$('.fs'));
    },300);
    /**曲线图数据转换
     *
     * data数据集合
     * opt机场、航空公司、空管、监控中心的字段
     * type 数量 文件数量字段
     *
     * **/
    var  dataConvert = function(data,opt,type) {
        var arr = [];
        var dataarr = data[opt];
        if($.isValidObject(dataarr)){
            var timeArr = [];
            var len = dataarr.length;
            for(var i=0;i<len;i++){
                if(type == "hour"){
                    var dataTime = dataarr[i][type]
                    var time = dataTime.substring(4,6)+"-"+dataTime.substring(6,8)+"-"+dataTime.substring(8,10);
                    timeArr.push(time);
                }
                arr.push(dataarr[i][type]);
            }
            arr.xArr = timeArr;
            return arr;
        }
    }

    /*机场运行信息*/
    var setAirportsInformation = function (fatherDom) {
        $.ajax({
            type: "GET",
            url: "http://192.168.243.104:1566/shareDataPlatform/airportDataCount",
            data: {},
            dataType: "json",
            success:function (data) {
                if($.isValidObject(data)){
                    console.log(data);
                    var airportsData = data.airportDatas
                    //数据校验
                    // for(var x in airportsData){
                    //     if(airportsData[x] === undefined||airportsData[x] === ""||airportsData[x] ==="NAN"){
                    //         x = "-";
                    //     }
                    // }
                    var airOptions = [];
                    var airportChartOpt = {
                        fpai:"FPAI_HOUR",
                        fpdi:"FPDI_HOUR",
                        ppci:"PPCI_HOUR",
                        psni:"PSNI_HOUR",
                    }
                    for(var i=0;i<airportsData.length;i++){
                        var  airportsDom = '<div class="flight_group box"> <h2>'+airportsData[i].airportName+'运行信息</h2> <div class="information"> <div class="num_chart col-md-5" id="airport_num'+i+'"></div> <div class="airport col-md-2"> <div class="airport_head"> <div class="airport_num">数量</div> <div class="information_name">信息类型</div> <div class="file_num">文件数</div></div>  <ul class="airport_data_detail"> <li> <p class="num airport_position_num">'+airportsData[i].PSNI_DATA+'</p> <p class="airport_position">机场机位信息</p> <p class="f_num airport_position_num_file">'+airportsData[i].PSNI_FILE+'</p> </li> <li> <p class="num fpdi">'+airportsData[i].FPDI_DATA+'</p> <p class="airport_position">机场离港航班信息</p> <p class="f_num fpdi_file">'+airportsData[i].FPDI_FILE+'</p> </li> <li> <p class="num fpai">'+airportsData[i].FPAI_DATA+'</p><p class="airport_position">机场到港航班信息</p> <p class="f_num fpai_file">'+airportsData[i].FPAI_FILE+'</p> </li> <li> <p class="num ppci">'+airportsData[i].PPCI_DATA+'</p> <p class="airport_position">机场客货信息</p> <p class="f_num ppci_file">'+airportsData[i].PPCI_FILE+'</p> </li> </ul> </div> <div class="file_chart col-md-5" id="airport_file'+i+'"></div><div class="clb"></div> </div> </div>'
                        fatherDom.append(airportsDom);
                        var numOptions = new AirportsOptions(dataObj,"data_COUNT",airportChartOpt)
                    }
                }
            },
            error:function (error) {
                console.log(error);
            }
        })
    }
    /*航空公司运行信息*/
    var setFlightsInformation = function (fatherDom) {
        $.ajax({
            type: "GET",
            url: "http://192.168.243.104:1566/shareDataPlatform/companyDataCount",
            data: {},
            dataType: "json",
            success:function (data) {
                if($.isValidObject(data)){
                    var companyDatas  = data.companyDatas
                    //数据校验
                    for(var x in companyDatas){
                        if(companyDatas[x] === undefined||companyDatas[x] === ""||companyDatas[x] ==="NAN"){
                            x = "-";
                        }
                    }
                    for(var i=0;i<companyDatas.length;i++){
                        var  flightsDom = '<div class="flight_group box"><h2>'+companyDatas[i].companyName+'航空运行信息</h2><div class="information"><div class="num_chart col-md-5" id="flight_num_chart"></div><div class="airport col-md-2"><div class="airport_head"><div class="airport_num">数量</div><div class="information_name">信息类型</div><div class="file_num">文件数</div></div><ul class="airport_data_detail"><li><p class="num flgh">'+companyDatas[i].FLGH_DATA+'</p><p class="airport_position">航班地面状态信息</p><p class="f_num flgh_file">'+companyDatas[i].FLGH_FILE+'</p></li><li><p class="num fpln">'+companyDatas[i].FPLN_DATA+'</p><p class="airport_position">航班计划变更信息</p><p class="f_num fpln_file">'+companyDatas[i].FPLN_FILE+'</p></li><li><p class="num fpci">'+companyDatas[i].FPCI_DATA+'</p><p class="airport_position">航班客货信息</p><p class="f_num fpci_file">'+companyDatas[i].FPCI_FILE+'</p> </li> <li> <p class="num fcri">'+companyDatas[i].FCRI_DATA+'</p> <p class="airport_position">航班机组人员信息</p> <p class="f_num fcri_file">'+companyDatas[i].FCRI_FILE+'</p> </li> <li> <p class="num faci">'+companyDatas[i].FACI_DATA+'</p> <p class="airport_position">航空器信息</p> <p class="f_num faci_file">'+companyDatas[i].FACI_FILE+'</p> </li> </ul> </div> <div class="file_chart col-md-5" id="flight_file_chart"></div> <div class="clb"></div> </div> </div>'
                        fatherDom.append(flightsDom);
                    }
                }
            },
            error:function (error) {
                console.log(error);
            }
        })
    }
    /*机场&&航空公司布局适配*/
    function resetML(father,son){
        var aW = father.width();
        var bW = son.width();
        var bN = parseInt(aW/bW);
        var mL = (aW - bW*bN)/(bN+1);
        son.css('margin-left', mL+'px')
    }
    /*机场航空公司初始化*/
    var initAirCom = function () {
        //机场
        $('#airport_operation').on('click',function () {
            $('li',nav).removeClass('active');
            $(".nav_monitor").addClass('active');
            $('.content-container .row').removeClass('active');
            $('#airport').addClass('active');
            setAirportsInformation($("#airport_container"));
        });
        //航空公司
        $('#flights_operation').on('click',function () {
            $('li',nav).removeClass('active');
            $('.nav_monitor').addClass('active');
            $('.content-container .row').removeClass('active');
            $('#company').addClass('active');
            setFlightsInformation($("#company_container"));
        });
    }

    return{
        initMonitor: function () {
            initAirCom();//机场航空公司初始化
            getTotalDateCount();//获取航班监控页面数据
        }


    }
}();
$(document).ready(function () {
    MONITOR.initMonitor()
})

