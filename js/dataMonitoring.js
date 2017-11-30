/**
 * Created by caowei on 2017/11/20.
 */
/*获取监控主页数据统计*/
var getTotalDateCount =function () {
    $.ajax({
        type: "GET",
        url: "http://192.168.243.104:1566/shareDataPlatform/totalDataCount",
        data: {},
        dataType: "json",
        success:function (data) {
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
var airportsOptions = function (dataObj,type) {
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
            orient:'vertical'
    },
    this.xAxis = {
        name: "时间",
            data: dataConvert(dataObj,"APOI","FPAI","messageSendDate"),
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
            data: dataConvert(dataObj,"APOI","FPAI",type)
        },{
            name: "离港航班",
            type: 'line',
            symbol:'none',
            smooth:true,
            border:0,
            lineStyle: {normal: {color:"#CCCCFF",}},
            itemStyle: {normal: {color:"#CCCCFF",}},
            data: dataConvert(dataObj,"APOI","FPDI",type)
        },{
            name: "客货",
            type: 'line',
            symbol:'none',
            smooth:true,
            border:0,
            lineStyle: {normal:{color:"#1ABB9C",}},
            itemStyle: {normal:{color:"#1ABB9C",}},
            data: dataConvert(dataObj,"APOI","PPCI",type)
        },{
            name: "机位",
            type: 'line',
            symbol:'none',
            smooth:true,
            border:0,
            lineStyle: {normal:{color:"#3498DB",}},
            itemStyle: {normal:{color:"#3498DB",}},
            data: dataConvert(dataObj,"APOI","PSNI",type)
        }
    ]
}
var companyOptions = function (dataObj,type) {
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
            orient:'vertical'
    },
    this.xAxis = {
        name: "时间",
            data:dataConvert(dataObj,"ALOI","FACI","messageSendDate"),
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
            data: dataConvert(dataObj,"ALOI","FACI",type)
        },{
            name: "机组人员",
            type: 'line',
            symbol:'none',
            smooth:true,
            border:0,
            itemStyle: {normal: {color:"#CCCCFF",}},
            lineStyle: {normal: {color:"#CCCCFF",}},
            data: dataConvert(dataObj,"ALOI","FCRI",type)
        },{
            name: "地面状态",
            type: 'line',
            symbol:'none',
            smooth:true,
            border:0,
            itemStyle: {normal: {color:"#1ABB9C",}},
            lineStyle: {normal: {color:"#1ABB9C",}},
            data: dataConvert(dataObj,"ALOI","FLGH",type)
        },{
            name: "客货",
            type: 'line',
            symbol:'none',
            smooth:true,
            border:0,
            itemStyle: {normal: {color:"#3498DB",}},
            lineStyle: {normal: {color:"#3498DB",}},
            data: dataConvert(dataObj,"ALOI","FPCI",type)
        },{
            name: "计划变更",
            type: 'line',
            symbol:'none',
            smooth:true,
            border:0,
            itemStyle: {normal: {color:"#E74C3C",}},
            lineStyle: {normal: {color:"#E74C3C",}},
            data: dataConvert(dataObj,"ALOI","FPLN",type)
        }
    ]
}
var charts = new Charts($("#airport_num_chart")[0],$("#airport_file_chart")[0],$("#flight_num_chart")[0],$("#flight_file_chart")[0],$("#manage_num_chart")[0],$("#manage_file_chart")[0],$("#monitor_num_chart")[0],$("#monitor_file_chart")[0])
var initCurveCharts = function (data) {
    var dataObj = data;
// 获取图表的配置项和数据
    var airportNumOption = new airportsOptions(data,"dataCount")
    var airportFileOption = new airportsOptions(data,"fileCount");
    var companyNumOption = new companyOptions(data,"dataCount");
    var companyFileOption = new companyOptions(data,"fileCount");
    var manageNumOption = {
        backgroundColor: '#FFFFFF',
        color: ['#3398DB'],
        title: {
            text: ''
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            width:"80%",
            height:"75%",
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            height:15,
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985',
                }
            }
        },
        legend: {
            data: ["航班CDM","流量控制措施","MDRS","机场通行能力","扇区开放合并"],
            top:"20",
            right: "-10",
            orient:'vertical'
        },
        xAxis: {
            name: "时间",
            data: dataConvert(dataObj,"ATMI","FCDM","messageSendDate"),
            boundaryGap : false,

        },
        yAxis: {
            name: "信息数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            height:13,
            zoomLock:false,
            minSpan:25,
            bottom:"5",
            end: 60
        },
        series:[
            {
                name: "航班CDM",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#9abcc3"}},
                lineStyle: {normal: {color:"#9abcc3"}},
                data: dataConvert(dataObj,"ATMI","FCDM","dataCount")
            },{
                name: "流量控制措施",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#CCCCFF",}},
                lineStyle: {normal: {color:"#CCCCFF",}},
                data: dataConvert(dataObj,"ATMI","FTMI","dataCount")
            },{
                name: "MDRS",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#1ABB9C",}},
                lineStyle: {normal: {color:"#1ABB9C",}},
                data: dataConvert(dataObj,"ATMI","MDRS","dataCount")
            },{
                name: "机场通行能力",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#3498DB"}},
                lineStyle: {normal: {color:"#3498DB"}},
                data: dataConvert(dataObj,"ATMI","PADR","dataCount")
            },{
                name: "扇区开放合并",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#E74C3C",}},
                lineStyle: {normal: {color:"#E74C3C",}},
                data: dataConvert(dataObj,"ATMI","SECT","dataCount")
            }
        ]
    };
    var manageFileOption = {
        backgroundColor: '#FFFFFF',
        color: ['#3398DB'],
        title: {
            text: ''
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            width:"80%",
            height:"75%",
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            height:15,
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985',
                }
            }
        },
        legend: {
            data: ["航班CDM","流量控制措施","MDRS","机场通行能力","扇区开放合并"],
            top:"20",
            right: "0",
            orient:'vertical'
        },
        xAxis: {
            name: "时间",
            data: dataConvert(dataObj,"ATMI","FTMI","messageSendDate"),
            boundaryGap : false,

        },
        yAxis: {
            name: "信息文件数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            height:13,
            zoomLock:false,
            minSpan:25,
            bottom:"5",
            end: 60
        },
        series:[
            {
                name: "航班CDM",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#9abcc3",}},
                lineStyle: {normal: {color:"#9abcc3",}},
                data: dataConvert(dataObj,"ATMI","FCDM","fileCount")
            },{
                name: "流量控制措施",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#CCCCFF",}},
                lineStyle: {normal: {color:"#CCCCFF",}},
                data: dataConvert(dataObj,"ATMI","FTMI","fileCount")
            },{
                name: "MDRS",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#1ABB9C",}},
                lineStyle: {normal: {color:"#1ABB9C",}},
                data: dataConvert(dataObj,"ATMI","MDRS","fileCount")
            },{
                name: "机场通行能力",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#3498DB",}},
                lineStyle: {normal: {color:"#3498DB",}},
                data: dataConvert(dataObj,"ATMI","PADR","fileCount")
            },{
                name: "扇区开放合并",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#E74C3C",}},
                lineStyle: {normal: {color:"#E74C3C",}},
                data: dataConvert(dataObj,"ATMI","SECT","fileCount")
            }
        ]
    };
    var monitorNumOption = {
        backgroundColor: '#FFFFFF',
        color: ['#3398DB'],
        title: {
            text: ''
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            width:"80%",
            height:"75%",
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            height:15,
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985',
                }
            }
        },
        legend: {
            data: ["航班计划动态","航班统计","机场统计"],
            top:"20",
            right: "0",
            orient:'vertical'
        },
        xAxis: {
            name: "时间",
            data: dataConvert(dataObj,"OSCI","FPER","messageSendDate"),
            boundaryGap : false,

        },
        yAxis: {
            name: "信息数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            height:13,
            zoomLock:false,
            minSpan:25,
            bottom:"5",
            end: 60
        },
        series:[
            {
                name: "航班计划动态",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#9abcc3",}},
                lineStyle: {normal: {color:"#9abcc3",}},
                data: dataConvert(dataObj,"OSCI","FOSC","dataCount")
            },{
                name: "航班统计",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#CCCCFF",}},
                lineStyle: {normal: {color:"#CCCCFF",}},
                data: dataConvert(dataObj,"OSCI","FPER","dataCount")
            },{
                name: "机场统计",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#1ABB9C",}},
                lineStyle: {normal: {color:"#1ABB9C",}},
                data: dataConvert(dataObj,"OSCI","PPER","dataCount")
            }
        ]
    };
    var monitorFileOption = {
        backgroundColor: '#FFFFFF',
        color: ['#3398DB'],
        title: {
            text: ''
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            width:"80%",
            height:"75%",
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            height:15,
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985',
                }
            }
        },
        legend: {
            data: ["航班计划动态","航班统计","机场统计"],
            top:"20",
            right: "0",
            orient:'vertical'
        },
        xAxis: {
            name: "时间",
            data: dataConvert(dataObj,"OSCI","FOSC","messageSendDate"),
            boundaryGap : false,

        },
        yAxis: {
            name: "信息文件数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            height:13,
            zoomLock:false,
            minSpan:25,
            bottom:"5",
            end: 60
        },
        series:[
            {
                name: "航班计划动态",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#9abcc3",}},
                lineStyle: {normal: {color:"#9abcc3",}},
                data: dataConvert(dataObj,"OSCI","FOSC","fileCount")
            },{
                name: "航班统计",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#CCCCFF",}},
                lineStyle: {normal: {color:"#CCCCFF",}},
                data: dataConvert(dataObj,"OSCI","FPER","fileCount")
            },{
                name: "机场统计",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {color:"#1ABB9C",}},
                lineStyle: {normal: {color:"#1ABB9C",}},
                data: dataConvert(dataObj,"OSCI","PPER","fileCount")
            }
        ]
    };
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
//获取曲线图数据参数并初始化echarts
var getChartsData = function () {
    $.ajax({
        type: "GET",
        url: "http://192.168.243.104:1566/shareDataPlatform/hisDataCount",
        data: {},
        dataType: "json",
        success:function (data) {
            if($.isValidObject(data)){
                if(data.status == 500){
                    console.log(data.error);
                    return;
                }else if(data.status == 200){
                    if($.isValidObject(data.hisData)){
                        var chatrsDatas  = data.hisData
                        initCurveCharts(chatrsDatas);
                        var generateTime = data.generatetime
                        var dataTime =
                            generateTime.substring(0, 4) + '年' +
                            generateTime.substring(4, 6) + '月' +
                            generateTime.substring(6, 8) + '日 '
                       $("#n_time").text(dataTime);
                    }
                }
            }

        },
        error: function (xhr, status, error) {
            console.error('get data failed');
            console.error(error);
        }
    })
}
/**曲线图数据转换
 *
 * data数据集合
 * opt机场、航空公司、空管、监控中心的字段
 * opter  opt对应下的子字段
 * type 数量 文件数量字段
 *
 * **/
var  dataConvert = function(data,opt,opter,type) {
    var arr = [];
    var dataarr = data[opt][opter];
    if($.isValidObject(dataarr)){
        var len = dataarr.length;
        for(var i=0;i<len;i++){
            if(type == "messageSendDate"){
                 var dataTime = dataarr[i][type]
                var time = dataTime.substring(0,4)+"-"+dataTime.substring(4,6)+"-"+dataTime.substring(6,8);
                dataarr[i][type] = time;
            }
            arr.push(dataarr[i][type]);
        }
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
                var airportsData = data.airportDatas
                //数据校验
                for(var x in airportsData){
                    if(airportsData[x] === undefined||airportsData[x] === ""||airportsData[x] ==="NAN"){
                        x = "-";
                    }
                }
                for(var i=0;i<airportsData.length;i++){
                    var  airportsDom = '<div class="flight_group box"> <h2>'+airportsData.airport+'运行信息</h2> <div class="information"> <div class="num_chart col-md-5"></div> <div class="airport col-md-2"> <div class="airport_head"> <div class="airport_num">数量</div> <div class="information_name">信息类型</div> <div class="file_num">文件数</div></div>  <ul class="airport_data_detail"> <li> <p class="num airport_position_num"></p> <p class="airport_position">机场机位信息</p> <p class="f_num airport_position_num_file"></p> </li> <li> <p class="num fpdi"></p> <p class="airport_position">机场离港航班信息</p> <p class="f_num fpdi_file"></p> </li> <li> <p class="num fpai"></p> <p class="airport_position">机场到港航班信息</p> <p class="f_num fpai_file"></p> </li> <li> <p class="num ppci"></p> <p class="airport_position">机场客货信息</p> <p class="f_num ppci_file"></p> </li> </ul> </div> <div class="file_chart col-md-5"></div><div class="clb"></div> </div> </div>'
                    fatherDom.append(airportsDom);
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
                    var  flightsDom = '<div class="airport fs"> <div class="airport_head"> <h4>'+companyDatas[i].companyName+'航空运行信息</h4> <div class="file_num">文件数</div> <div class="airport_num">数量</div> </div> <ul class="airport_data_detail"> <li> <p class="btn btn_poa"></p> <p class="airport_position">航班地面状态信息：</p> <p class="num flgh">'+companyDatas[i].FLGH_DATA+'</p> <p class="f_num">'+companyDatas[i].FLGH_FILE+'</p> </li> <li> <p class="btn btn_lev"></p> <p class="airport_position">航班计划变更信息：</p> <p class="num fpln">'+companyDatas[i].FPLN_DATA+'</p> <p class="f_num">'+companyDatas[i].FPLN_FILE+'</p> </li> <li> <p class="btn btn_arr"></p> <p class="airport_position">航班客货信息:</p> <p class="num fpci">'+companyDatas[i].FPCI_DATA+'</p> <p class="f_num">'+companyDatas[i].FPCI_FILE+'</p> </li> <li> <p class="btn btn_cou"></p> <p class="airport_position">航班机组人员信息：</p> <p class="num fcri">'+companyDatas[i].FCRI_DATA+'</p> <p class="f_num">'+companyDatas[i].FCRI_FILE+'</p> </li> <li> <p class="btn btn_fly"></p> <p class="airport_position">航空器信息：</p> <p class="num faci">'+companyDatas[i].FACI_DATA+'</p> <p class="f_num">'+companyDatas[i].FACI_FILE+'</p> </li> </ul>  </div>'
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
var initNavigator = function () {
    //机场
    $('#airport_operation').on('click',function () {
        $('li',nav).removeClass('active');
        $(".nav_monitor").addClass('active');
        $('#body .row').removeClass('active');
        $('#airport').addClass('active');
    });
    //航空公司
    $('#flights_operation').on('click',function () {
        $('li',nav).removeClass('active');
        $('.nav_monitor').addClass('active');
        $('#body .row').removeClass('active');
        $('#company').addClass('active');
    });
}
$(document).ready(function () {
    initNavigator();//初始化导航栏
    getTotalDateCount();//获取航班监控页面数据
    getChartsData()//获取曲线图数据并初始化曲线图
})

