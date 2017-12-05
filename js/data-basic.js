var BasicData = function () {

    // 类型集合
    var historyDataTypeObj = {
        val : ['APOI','ALOI','ATMI','OSCI'],
        valCN :['机场运行信息','航空公司运行信息','空管运行信息','运行监控中心运行信息'],
        label : ['机场','航空公司','空管','监控中心'],
        result: {
            'APOI' :{
                subtype : {
                    'PSNI' : '机场机位信息',
                    'FPDI' : '机场离港航班信息',
                    'FPAI' : '机场到港航班信息',
                    'PPCI' : '机场客货信息'
                },
                unit : {

                },
            },
            'ALOI' : {
                subtype : {
                    'FLGH' : '航班地面状态信息',
                    'FPLN' : '航班计划变更信息',
                    'FPCI' : '航班客货信息',
                    'FCRI' : '航班机组人员信息',
                    // 'FACI' : '航空器信息'
                },
                unit : {

                }
            },
            'ATMI' : {
                subtype : {
                    'FCDM' : '航班CDM信息',
                    'FTMI' : '流量控制措施信息',
                    'PADR' : '机场通行能力信息',
                    'MDRS' : 'MDRS信息',
                    'SECT' : '扇区开放合并信息'
                },
                unit : {
                    'ATMB' : '空管局'
                }
            },
            'OSCI' : {
                subtype : {
                    'FOSC' : '航班计划动态信息',
                    'FPER' : '航班统计信息',
                    'PPER' : '机场统计信息'

                },
                unit : {
                    'OMCCAAC' :'运行监控中心'
                }
            }
        }
    };

    var operatingDataTypeObj ={
        val : ['APOI','ALOI','ATMI','OSCI'],
        valCN :['机场运行信息','航空公司运行信息','空管运行信息','运行监控中心运行信息'],
        label : ['机场','航空公司','空管','监控中心'],
        result: {
            'APOI' :{
                subtype : {
                    'PSNI' : '机场机位信息',
                    'FPDI' : '机场离港航班信息',
                    'FPAI' : '机场到港航班信息',
                    'PPCI' : '机场客货信息'
                },
                unit : {

                },
            },
            'ALOI' : {
                subtype : {
                    'FLGH' : '航班地面状态信息',
                    'FPLN' : '航班计划变更信息',
                    'FPCI' : '航班客货信息',
                    'FCRI' : '航班机组人员信息',
                    'FACI' : '航空器信息'
                },
                unit : {

                }
            },
            'ATMI' : {
                subtype : {
                    'FCDM' : '航班CDM信息',
                    'FTMI' : '流量控制措施信息',
                    'PADR' : '机场通行能力信息',
                    'MDRS' : 'MDRS信息',
                    'SECT' : '扇区开放合并信息'
                },
                unit : {
                    'ATMB' : '空管局'
                }
            },
            'OSCI' : {
                subtype : {
                    'FOSC' : '航班计划动态信息',
                    'FPER' : '航班统计信息',
                    'PPER' : '机场统计信息'

                },
                unit : {
                    'OMCCAAC' :'运行监控中心'
                }
            }
        },
        unitURL : {
            'APOI' : 'http://192.168.243.104:1566/shareDataPlatform/allAirport',
            'ALOI' : 'http://192.168.243.104:1566/shareDataPlatform/allCompany'
        }
    };


    var unitURL = {
        'APOI' : 'http://192.168.243.104:1566/shareDataPlatform/allAirport',
        'ALOI' : 'http://192.168.243.104:1566/shareDataPlatform/allCompany'
    };

    /**
     * 初始始化基础数据
     * */
    var initBasicData = function () {
        //获取机场单位数据
        initAPOIUnitData();
        //获取航空公司单位数据
        initALOIUnitData();
    };

    /**
     * 获取机场单位数据
     * */
    var initAPOIUnitData = function () {
        var url = unitURL['APOI'];
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, xhr) {
                // 当前数据
                if ($.isValidObject(data) && $.isValidVariable(data.status) && '200' == data.status) {
                    //success
                    var result = data['allAirport'];
                    // 更新单位
                    updateUintsMultiple('APOI',result);
                    // 更新下拉列表
                    updateSelectMultiple('APOI');
                    //若当前选中的类型为机场
                   /* if(currentType == 'APOI'){
                        // 更新下拉列表
                        updateSelectPicker('APOI');
                    };*/

                } else {
                    console.error('retrieve APOI unit data failed');
                    console.warn('data:' + data);
                }

            },
            error: function (xhr, status, error) {
                console.error('retrieve APOI unit data failed');
            }
        });

    };

    /**
     * 获取航空公司单位数据
     * */
    var initALOIUnitData = function () {
        var url = unitURL['ALOI'];
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, xhr) {
                // 当前数据
                if ($.isValidObject(data) && $.isValidVariable(data.status) && '200' == data.status) {
                    var result = data['allAirport'];
                    // 更新单位
                    updateUintsMultiple('ALOI',result);
                    updateSelectMultiple('ALOI');
                } else {
                    console.error('retrieve APOI unit data failed');
                    console.warn('data:' + data);
                }

            },
            error: function (xhr, status, error) {
                console.error('retrieve ALOI unit data failed');
            }
        });
    };


    /**
     *  更新单位
     * */
    var updateUintsMultiple = function (typeName,data) {
        //历史数据
        BasicData.historyDataTypeObj.result[typeName].unit = {};
        for(var i in data){
            var key = i;
            var val = data[i];
            historyDataTypeObj.result[typeName].unit[key] = val;
        }
        //运行数据
        BasicData.operatingDataTypeObj.result[typeName].unit = {};
        for(var i in data){
            var key = i;
            var val = data[i];
            operatingDataTypeObj.result[typeName].unit[key] = val;
        }
    };

    /**
     *  更新下拉列表
     * */
    var updateSelectMultiple = function (typeName) {

        if(HistoryData.currentType == typeName){
            HistoryData.updateSelectPicker(typeName);
        }

        if(OperatingData.currentType == typeName){

            OperatingData.updateSelectPicker(typeName)
        }
    };

    return {
        init : function () {
            //初始始化基础数据
            initBasicData();
        },
        historyDataTypeObj : historyDataTypeObj,
        operatingDataTypeObj : operatingDataTypeObj
    }
}();

$(document).ready(function () {
    BasicData.init();
});