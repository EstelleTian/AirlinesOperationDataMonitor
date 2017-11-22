/**
 * Created by caowei on 2017/11/20.
 */
//echarts 绘制
// 基于准备好的dom，初始化echarts实例
var airportChart = echarts.init($("#airport_chart")[0]);
var flightChart = echarts.init($("#flight_chart")[0]);
var manageChart = echarts.init($("#manage_chart")[0]);
var monitorChart = echarts.init($("#monitor_chart")[0]);
// 指定图表的配置项和数据
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
        bottom: "-5"
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

// 使用刚指定的配置项和数据显示图表。
airportChart.setOption(option);
flightChart.setOption(option);
manageChart.setOption(option);
monitorChart.setOption(option);
//适应echarts宽高尺寸
window.onresize = function () {
    //重置容器高宽
    resizeWorldMapContainer();
    airportChart.resize();
    flightChart.resize();
    manageChart.resize();
    monitorChart.resize();
};
//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
var resizeWorldMapContainer = function () {
    $("#airport_chart").width = window.innerWidth+'px';
    $("#airport_chart").height = window.innerHeight+'px';
};
