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
                var totaoDataCount = data.totaoDataCount
                for(var x in totaoDataCount){
                    if(x == undefined||x == ""){
                        x = "-";
                    }
                }
                //机场机位信息
                $(".airport_position_num").html(totaoDataCount.APOI_PSNI_DATA)
                $(".airport_position_num_file").html(totaoDataCount.APOI_PSNI_FILE)
                //机场离港信息
                $(".fpdi").html(totaoDataCount.APOI_FPDI_DATA)
                $(".fpdi_file").html(totaoDataCount.APOI_FPDI_FILE)
                //机场到港信息
                $(".fpai").html(totaoDataCount.APOI_FPAI_DATA)
                $(".fpai_file").html(totaoDataCount.APOI_FPAI_FILE)
                //机场客货信息
                $(".ppci").html(totaoDataCount.APOI_PPCI_DATA)
                $(".ppci_file").html(totaoDataCount.APOI_PPCI_FILE)
                //航班地面状态
                $(".flgh").html(totaoDataCount.ALOI_FLGH_DATA)
                $(".flgh_file").html(totaoDataCount.ALOI_FLGH_FILE)
                //航班计划变更
                $(".fpln").html(totaoDataCount.ALOI_FPLN_DATA)
                $(".fpln_file").html(totaoDataCount.ALOI_FPLN_FILE)
                //航班客货
                $(".fpci").html(totaoDataCount.ALOI_FPCI_DATA)
                $(".fpci_file").html(totaoDataCount.ALOI_FPCI_FILE)
                //航班机组人员
                $(".fcri").html(totaoDataCount.ALOI_FCRI_DATA)
                $(".fcri_file").html(totaoDataCount.ALOI_FCRI_FILE)
                //航空器
                $(".faci").html(totaoDataCount.ALOI_FACI_DATA)
                $(".faci_file").html(totaoDataCount.ALOI_FACI_FILE)
                //CDM
                $(".fcdm").html(totaoDataCount.ATMI_FCDM_DATA)
                $(".fcdm_file").html(totaoDataCount.ATMI_FCDM_FILE)
                //流量控制措施
                $(".ftmi").html(totaoDataCount.ATMI_FTMI_DATA)
                $(".ftmi_file").html(totaoDataCount.ATMI_FTMI_FILE)
                //机场通行能力
                $(".padr").html(totaoDataCount.ATMI_PADR_DATA)
                $(".padr_file").html(totaoDataCount.ATMI_PADR_FILE)
                //MDRS
                $(".mdrs").html(totaoDataCount.ATMI_MDRS_DATA)
                $(".mdrs_file").html(totaoDataCount.ATMI_MDRS_FILE)
                //扇区开放
                $(".sect").html(totaoDataCount.ATMI_SECT_DATA)
                $(".sect_file").html(totaoDataCount.ATMI_SECT_FILE)
                //航班计划动态
                $(".fosc").html(totaoDataCount.OSCI_FOSC_DATA)
                $(".fosc_file").html(totaoDataCount.OSCI_FOSC_FILE)
                //航班统计
                $(".fper").html(totaoDataCount.OSCI_FPER_DATA)
                $(".fper_file").html(totaoDataCount.OSCI_FPER_FILE)
                //机场统计
                $(".pper").html(totaoDataCount.OSCI_PPER_DATA)
                $(".pper_file").html(totaoDataCount.OSCI_PPER_FILE)
            }
        },
        error:function (error) {
            console.log(error);
        }
    })
};
/*echarts 绘制*/
// 初始化echarts曲线图
var initCurveCharts = function () {
    var airportChart = echarts.init($("#airport_chart")[0]);
    var flightChart = echarts.init($("#flight_chart")[0]);
    var manageChart = echarts.init($("#manage_chart")[0]);
    var monitorChart = echarts.init($("#monitor_chart")[0]);

// 获取图表的配置项和数据
    var option = {
        backgroundColor: '#FFFFFF',
        color: ['#3398DB'],
        title: {
            text: ''
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        tooltip: {},
        legend: {
            data: ['流控数量',"告警数量","**数量","***数量"],
            bottom: "2"
        },
        xAxis: {
            name: "时间",
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", '24', '25', '26', '27', '28', '29', '30'],
            boundaryGap : false,

        },
        yAxis: {
            name: "数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            zoomLock:false,
            end: 60
        },
        series: [{
            name: "流控数量",
            type: 'line',
            symbol:'none',
            smooth:true,
            border:0,
            itemStyle: {normal: {areaStyle: {type: 'default'},color:"#9abcc3",lineStyle:{width:0}}},
            data: [6, 39,20,85,7,39,20,85,39,20,101, 7,25,107,31,74,6,74,6,85,7,31,74,6,39,20,85,7,2]
        }, {
            name: "告警数量",
            type: 'line',
            symbol:'none',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'},color:"#CCCCFF",lineStyle:{width:0}}},
            data: [31,74,6,39,20,85,7,31,74,45,9,70,35,7,61,24,96,39,20,85,7,31,74,6,39,20,85,7,26,45]
        }, {
            name: "**数量",
            type: 'line',
            symbol:'none',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'},color:"#9B59B6",lineStyle:{width:0}}},
            data: [31,74,6,39,20,39,20,85,7,51,25,7,31,74,6,74,6,39,20,85,7,26,85,7,31,74,6,39,45,5]
        }, {
            name: "***数量",
            type: 'line',
            symbol:'none',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'},color:"#1ABB9C",lineStyle:{width:0}}},
            data: [31,74,6,39,20,74,6,39,74,6,65,15,85,7,50,2,85,7,26,85,7,31,31,74,6,39,20,85,7]
        }]
    };
// 曲线图参数设置。
    airportChart.setOption(option);
    flightChart.setOption(option);
    manageChart.setOption(option);
    monitorChart.setOption(option);
    //适应屏幕宽高尺寸
    window.onresize = function () {
        //重置容器高宽
        resizeWorldMapContainer();
        airportChart.resize();
        flightChart.resize();
        manageChart.resize();
        monitorChart.resize();
        resetML($('.airports_container'),$('.as'));
        resetML($('.flights_container'),$('.fs'));
    };
}
//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
var resizeWorldMapContainer = function () {
    $("#airport_chart").width (window.innerWidth);
    $("#airport_chart").height (window.innerHeight);
};
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
                for(var x in airportsData){
                    if(x == undefined||x == ""){
                        x = "-";
                    }
                }
                console.log(airportsData)
                for(var i=0;i<airportsData.length;i++){
                    var  airportsDom = '<div class="airport as"><div class="airport_head"><h4>'+airportsData[i].airportName+'运行信息</h4><div class="file_num">文件数</div><div class="airport_num">数量</div></div><ul class="airport_data_detail"><li><p class="btn btn_poa"></p><p class="airport_position">机位信息</p><p class="num airport_position_num">'+airportsData[i].PSNI_DATA+'</p><p class="f_num">'+airportsData[i].PSNI_FILE+'</p></li><li><p class="btn btn_lev"></p><p class="airport_position">离港航班信息</p><p class="num fpdi">'+airportsData[i].FPDI_DATA+'</p><p class="f_num">'+airportsData[i].FPDI_FILE+'</p></li><li><p class="btn btn_arr"></p><p class="airport_position">到港航班信息</p><p class="num fpai">'+airportsData[i].FPAI_DATA+'</p><p class="f_num">'+airportsData[i].FPAI_FILE+'</p></li><li><p class="btn btn_cou"></p><p class="airport_position">客货信息</p><p class="num ppci">'+airportsData[i].PPCI_DATA+'</p><p class="f_num">'+airportsData[i].PPCI_FILE+'</p></li></ul></div>'
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
                for(var x in companyDatas){
                    if(x == undefined||x == ""){
                        x = "-";
                    }
                }
                console.log(companyDatas )
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
/*导航栏初始化*/
var initNavigator = function () {
    $(".monitoring").click(function () {
        $(this).addClass("item_selected")
        $(".search").removeClass("item_selected")
    });
    $(".search").click(function () {
        $(this).addClass("item_selected")
        $(".monitoring").removeClass("item_selected")
    })
    $(".monitoring_sm").click(function () {
        $(this).addClass("item_selected")
        $(".search_sm").removeClass("item_selected")
    });
    $(".search_sm").click(function () {
        $(this).addClass("item_selected")
        $(".monitoring_sm").removeClass("item_selected")
    })
    $("#switch_nav").click(function () {
        $(".navigation").toggle();
        $(".navigation_sm").toggle();
        airportChart.resize();
        flightChart.resize();
        manageChart.resize();
        monitorChart.resize();
    })
}
$(document).ready(function () {
    initNavigator();//初始化导航栏
    getTotalDateCount();//获取航班监控页面数据
    initCurveCharts();//初始化曲线图
    setAirportsInformation($("#airports_container"));//机场运行监控
    setFlightsInformation($("#flights_container"));//航空公司运行监控
})

