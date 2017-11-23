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
                    if(totaoDataCount[x] === "undefined"||totaoDataCount[x] === ""||totaoDataCount[x] === "NAN"){
                        totaoDataCount[x] = "-";
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
/*echarts 绘制
* data 曲线图需要的数据
* */
var initCurveCharts = function (data) {
    var airportNumChart = echarts.init($("#airport_num_chart")[0]);
    var airportFlieChart = echarts.init($("#airport_file_chart")[0]);
    var flightNumChart = echarts.init($("#flight_num_chart")[0]);
    var flightFlieChart = echarts.init($("#flight_file_chart")[0]);
    var manageNumChart = echarts.init($("#manage_num_chart")[0]);
    var manageFlieChart = echarts.init($("#manage_file_chart")[0]);
    var monitorNumChart = echarts.init($("#monitor_num_chart")[0]);
    var monitorFlieChart = echarts.init($("#monitor_file_chart")[0]);
    // var dataObj = {
    //     "generatetime": "20171123153110",
    //     "status": "200",
    //     "error": null,
    //     "hisData": {
    //         "ATMI": {
    //             "ATMI": [{
    //                 "id": 181,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "ATMI",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }],
    //             "SECT": [{
    //                 "id": 166,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 182,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 183,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 184,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 185,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 186,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 187,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 188,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 189,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 190,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 191,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 192,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 193,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 194,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "SECT",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "FCDM": [{
    //                 "id": 121,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 122,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 123,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 124,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 125,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 126,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 127,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 128,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 129,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 130,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 131,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 132,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 133,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 134,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FCDM",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "PADR": [{
    //                 "id": 152,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 153,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 154,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 155,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 156,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 157,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 158,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 159,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 160,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 161,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 162,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 163,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 164,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "PADR",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "FTMI": [{
    //                 "id": 136,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 137,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 138,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 139,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 140,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 141,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 142,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 143,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 144,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 145,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 146,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 147,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 148,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 149,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "FTMI",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "MDRS": [{
    //                 "id": 151,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 167,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 168,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 169,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 170,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 171,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 172,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 173,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 174,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 175,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 176,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 177,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 178,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 179,
    //                 "messageType": "ATMI",
    //                 "messageSubType": "MDRS",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }]
    //         },
    //         "APOI": {
    //             "FPAI": [{
    //                 "id": 211,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 212,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 213,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 214,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 215,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 216,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 217,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 218,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 219,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 220,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 221,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 222,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 223,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 224,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPAI",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "PPCI": [{
    //                 "id": 196,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 197,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 198,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 199,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 200,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 201,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 202,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 203,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 204,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 205,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 206,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 207,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 208,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 209,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PPCI",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "PSNI": [{
    //                 "id": 241,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 242,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 243,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 244,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 245,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 246,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 247,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 248,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 249,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 250,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 251,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 252,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 253,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 254,
    //                 "messageType": "APOI",
    //                 "messageSubType": "PSNI",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "FPDI": [{
    //                 "id": 226,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 227,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 228,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 229,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 230,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 231,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 232,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 233,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 234,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 235,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 236,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 237,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 238,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 239,
    //                 "messageType": "APOI",
    //                 "messageSubType": "FPDI",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }]
    //         },
    //         "ALOI": {
    //             "FACI": [{
    //                 "id": 1,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 2,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 3,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 4,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 5,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 6,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 7,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 8,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 9,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 10,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 11,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 12,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 13,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 14,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FACI",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "FPCI": [{
    //                 "id": 31,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 32,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 33,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 34,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 35,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 36,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 37,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 38,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 39,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 40,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 41,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 42,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 43,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 44,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPCI",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "FCRI": [{
    //                 "id": 16,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 17,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 18,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 19,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 20,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 21,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 22,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 23,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 24,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 25,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 26,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 27,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 28,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 29,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FCRI",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "FLGH": [{
    //                 "id": 61,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 62,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 63,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 64,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 65,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 66,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 67,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 68,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 69,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 70,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 71,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 72,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 73,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 74,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FLGH",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "FPLN": [{
    //                 "id": 46,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 47,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 48,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 49,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 50,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 51,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 52,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 53,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 54,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 55,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 56,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 57,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 58,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 59,
    //                 "messageType": "ALOI",
    //                 "messageSubType": "FPLN",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }]
    //         },
    //         "OSCI": {
    //             "FPER": [{
    //                 "id": 91,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 92,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 93,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 94,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 95,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 96,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 97,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 98,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 99,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 100,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 101,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 102,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 103,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 104,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FPER",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "FOSC": [{
    //                 "id": 76,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 77,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 78,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 79,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 80,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 81,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 82,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 83,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 84,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 85,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 86,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 87,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 88,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 89,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "FOSC",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }],
    //             "PPER": [{
    //                 "id": 106,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171108",
    //                 "fileCount": 27,
    //                 "dataCount": 135
    //             }, {
    //                 "id": 107,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171109",
    //                 "fileCount": 43,
    //                 "dataCount": 215
    //             }, {
    //                 "id": 108,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171110",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 109,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171111",
    //                 "fileCount": 54,
    //                 "dataCount": 270
    //             }, {
    //                 "id": 110,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171112",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 111,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171113",
    //                 "fileCount": 52,
    //                 "dataCount": 260
    //             }, {
    //                 "id": 112,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171114",
    //                 "fileCount": 23,
    //                 "dataCount": 115
    //             }, {
    //                 "id": 113,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171115",
    //                 "fileCount": 35,
    //                 "dataCount": 175
    //             }, {
    //                 "id": 114,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171116",
    //                 "fileCount": 76,
    //                 "dataCount": 380
    //             }, {
    //                 "id": 115,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171117",
    //                 "fileCount": 45,
    //                 "dataCount": 225
    //             }, {
    //                 "id": 116,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171118",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 117,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171120",
    //                 "fileCount": 25,
    //                 "dataCount": 125
    //             }, {
    //                 "id": 118,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171121",
    //                 "fileCount": 63,
    //                 "dataCount": 315
    //             }, {
    //                 "id": 119,
    //                 "messageType": "OSCI",
    //                 "messageSubType": "PPER",
    //                 "messageSendDate": "20171122",
    //                 "fileCount": 34,
    //                 "dataCount": 170
    //             }]
    //         }
    //     }
    // }
    var dataObj = data;
    var dataObj = dataObj.hisData
// 获取图表的配置项和数据
    var airportNumOption = {
        backgroundColor: '#FFFFFF',
        color: ['#3398DB'],
        title: {
            text: ''
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            width:"98%",
            containLabel: true
        },
        tooltip: {},
        legend: {
            data: ["机场到港航班信息","机场离港航班信息","机场客货信息","机场机位信息"],
            bottom: "2"
        },
        xAxis: {
            name: "时间",
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            boundaryGap : false,

        },
        yAxis: {
            name: "数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            zoomLock:false,
            minSpan:25,
            end: 60
        },
        series:[
            {
                name: "机场到港航班信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#9abcc3",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"APOI","FPAI","dataCount")
            },{
                name: "机场离港航班信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#CCCCFF",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"APOI","FPDI","dataCount")
            },{
                name: "机场客货信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#1ABB9C",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"APOI","PPCI","dataCount")
            },{
                name: "机场机位信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#3498DB",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"APOI","PSNI","dataCount")
            }
        ]
    };
    var airportFileOption = {
        backgroundColor: '#FFFFFF',
        color: ['#3398DB'],
        title: {
            text: ''
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            width:"90%",
            containLabel: true
        },
        tooltip: {},
        legend: {
            data: ["机场到港航班信息","机场离港航班信息","机场客货信息","机场机位信息"],
            bottom: "2"
        },
        xAxis: {
            name: "时间",
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            boundaryGap : false,

        },
        yAxis: {
            name: "文件数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            zoomLock:false,
            minSpan:25,
            end: 60
        },
        series:[
            {
                name: "机场到港航班信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#9abcc3",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"APOI","FPAI","fileCount")
            },{
                name: "机场离港航班信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#CCCCFF",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"APOI","FPDI","fileCount")
            },{
                name: "机场客货信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#1ABB9C",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"APOI","PPCI","fileCount")
            },{
                name: "机场机位信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#3498DB",lineStyle:{width:0}}},
                data:dataConvert(dataObj,"APOI","PSNI","fileCount")
            }
        ]
    };
    var companyNumOption = {
        backgroundColor: '#FFFFFF',
        color: ['#3398DB'],
        title: {
            text: ''
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            width:"90%",
            containLabel: true
        },
        tooltip: {},
        legend: {
            data: ["航空器信息","航班机组人员信息","航班地面状态信息","航班客货信息","航班计划变更信息"],
            bottom: "2"
        },
        xAxis: {
            name: "时间",
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            boundaryGap : false,

        },
        yAxis: {
            name: "数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            zoomLock:false,
            minSpan:25,
            end: 60
        },
        series:[
            {
                name: "航空器信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#9abcc3",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ALOI","FACI","dataCount")
            },{
                name: "航班机组人员信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#CCCCFF",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ALOI","FCRI","dataCount")
            },{
                name: "航班地面状态信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#1ABB9C",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ALOI","FLGH","dataCount")
            },{
                name: "航班客货信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#3498DB",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ALOI","FPCI","dataCount")
            },{
                name: "航班计划变更信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#E74C3C",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ALOI","FPLN","dataCount")
            }
        ]
    };
    var companyFileOption = {
        backgroundColor: '#FFFFFF',
        color: ['#3398DB'],
        title: {
            text: ''
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            width:"90%",
            containLabel: true
        },
        tooltip: {},
        legend: {
            data: ["航空器信息","航班机组人员信息","航班地面状态信息","航班客货信息","航班计划变更信息"],
            bottom: "2"
        },
        xAxis: {
            name: "时间",
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            boundaryGap : false,

        },
        yAxis: {
            name: "文件数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            zoomLock:false,
            minSpan:25,
            end: 60
        },
        series:[
            {
                name: "航空器信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#9abcc3",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ALOI","FACI","fileCount")
            },{
                name: "航班机组人员信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#CCCCFF",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ALOI","FCRI","fileCount")
            },{
                name: "航班地面状态信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#1ABB9C",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ALOI","FLGH","fileCount")
            },{
                name: "航班客货信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#3498DB",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ALOI","FPCI","fileCount")
            },{
                name: "航班计划变更信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#E74C3C",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ALOI","FPLN","fileCount")
            }
        ]
    };
    var manageNumOption = {
        backgroundColor: '#FFFFFF',
        color: ['#3398DB'],
        title: {
            text: ''
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            width:"90%",
            containLabel: true
        },
        tooltip: {},
        legend: {
            data: ["航班CDM信息","流量控制措施信息","MDRS信息","机场通行能力信息","扇区开放合并信息"],
            bottom: "2"
        },
        xAxis: {
            name: "时间",
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            boundaryGap : false,

        },
        yAxis: {
            name: "数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            zoomLock:false,
            minSpan:25,
            end: 60
        },
        series:[
            {
                name: "航班CDM信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#9abcc3",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ATMI","FCDM","dataCount")
            },{
                name: "流量控制措施信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#CCCCFF",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ATMI","FTMI","dataCount")
            },{
                name: "MDRS信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#1ABB9C",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ATMI","MDRS","dataCount")
            },{
                name: "机场通行能力信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#3498DB",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ATMI","PADR","dataCount")
            },{
                name: "扇区开放合并信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#E74C3C",lineStyle:{width:0}}},
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
            bottom: '15%',
            width:"90%",
            containLabel: true
        },
        tooltip: {},
        legend: {
            data: ["航班CDM信息","流量控制措施信息","MDRS信息","机场通行能力信息","扇区开放合并信息"],
            bottom: "2"
        },
        xAxis: {
            name: "时间",
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            boundaryGap : false,

        },
        yAxis: {
            name: "数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            zoomLock:false,
            minSpan:25,
            end: 60
        },
        series:[
            {
                name: "航班CDM信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#9abcc3",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ATMI","FCDM","fileCount")
            },{
                name: "流量控制措施信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#CCCCFF",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ATMI","FTMI","fileCount")
            },{
                name: "MDRS信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#1ABB9C",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ATMI","MDRS","fileCount")
            },{
                name: "机场通行能力信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#3498DB",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"ATMI","PADR","fileCount")
            },{
                name: "扇区开放合并信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#E74C3C",lineStyle:{width:0}}},
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
            bottom: '15%',
            width:"90%",
            containLabel: true
        },
        tooltip: {},
        legend: {
            data: ["航班计划动态信息","航班统计信息","机场统计信息"],
            bottom: "2"
        },
        xAxis: {
            name: "时间",
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            boundaryGap : false,

        },
        yAxis: {
            name: "数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            zoomLock:false,
            minSpan:25,
            end: 60
        },
        series:[
            {
                name: "航班计划动态信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#9abcc3",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"OSCI","FOSC","dataCount")
            },{
                name: "航班统计信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#CCCCFF",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"OSCI","FPER","dataCount")
            },{
                name: "机场统计信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#1ABB9C",lineStyle:{width:0}}},
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
            bottom: '15%',
            width:"90%",
            containLabel: true
        },
        tooltip: {},
        legend: {
            data: ["航班计划动态信息","航班统计信息","机场统计信息"],
            bottom: "2"
        },
        xAxis: {
            name: "时间",
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            boundaryGap : false,

        },
        yAxis: {
            name: "数量",
        },
        dataZoom: {
            show: true,
            start: 30,
            zoomLock:false,
            minSpan:25,
            end: 60
        },
        series:[
            {
                name: "航班计划动态信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#9abcc3",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"OSCI","FOSC","fileCount")
            },{
                name: "航班统计信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#CCCCFF",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"OSCI","FPER","fileCount")
            },{
                name: "机场统计信息",
                type: 'line',
                symbol:'none',
                smooth:true,
                border:0,
                itemStyle: {normal: {areaStyle: {type: 'default'},color:"#1ABB9C",lineStyle:{width:0}}},
                data: dataConvert(dataObj,"OSCI","PPER","fileCount")
            }
        ]
    };
// 曲线图参数设置。
    airportNumChart.setOption(airportNumOption);
    airportFlieChart.setOption(airportFileOption);
    flightNumChart.setOption(companyNumOption);
    flightFlieChart.setOption(companyFileOption);
    manageNumChart.setOption(manageNumOption);
    manageFlieChart.setOption(manageFileOption);
    monitorNumChart.setOption(monitorNumOption);
    monitorFlieChart.setOption(monitorFileOption);
    //适应屏幕宽高尺寸
    $(window).resize(function () {
        //重置容器高宽
        resizeWorldMapContainer();
        airportNumChart.resize();
        airportFlieChart.resize();
        flightNumChart.resize();
        flightFlieChart.resize();
        manageNumChart.resize();
        manageFlieChart.resize();
        monitorNumChart.resize();
        monitorFlieChart.resize();
        resetML($('.airports_container'),$('.as'));
        resetML($('.flights_container'),$('.fs'));
    });
    $("#switch_nav").click(function () {
        $(".navigation").toggle();
        $(".navigation_sm").toggle();
        airportNumChart.resize();
        airportFlieChart.resize();
        flightNumChart.resize();
        flightFlieChart.resize();
        manageNumChart.resize();
        manageFlieChart.resize();
        monitorNumChart.resize();
        monitorFlieChart.resize();
        resizeWorldMapContainer();
        resetML($('.airports_container'),$('.as'));
        resetML($('.flights_container'),$('.fs'));
    })
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
//获取曲线图数据参数并初始化echarts
var getChartsData = function () {
    $.ajax({
        type: "GET",
        url: "http://192.168.243.104:1566/shareDataPlatform/hisDataCount",
        data: {},
        dataType: "json",
        success:function (data) {
            if($.isValidObject(data)){
                var chatrsDatas  = data.hisData
                initCurveCharts(data)
            }

        },
        error: function (xhr, status, error) {
            console.error('get data failed');
            console.error(error);
        }
    })
}
/**曲线图数据转换
 * data数据集合
 * opt机场、航空公司、空管、监控中心的字段
 * opter  opt对应下的子字段
 * type 数量 文件数量字段
 * **/
var  dataConvert = function(data,opt,opter,type) {
    var arr = [];
    var dataarr = data[opt][opter];
    var len = dataarr.length;
    for(var i=0;i<len;i++){
        arr.push(dataarr[i][type]);
    }
    console.log(arr+opt+opter+type);
    return arr;
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
}
$(document).ready(function () {
    initNavigator();//初始化导航栏
    getTotalDateCount();//获取航班监控页面数据
    getChartsData()//获取曲线图数据并初始化曲线图
    setAirportsInformation($("#airports_container"));//机场运行监控
    setFlightsInformation($("#flights_container"));//航空公司运行监控
})

