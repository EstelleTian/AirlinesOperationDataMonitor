var QUERY = function () {
    //模态框内容
    var ModalContent = '<div><div class="row"><div class="col-xs-12">' +
        '<div class="row row-line">' +
        '<div class="col-xs-2"><p>起始时间</p></div>'+
        '<div class="col-xs-3"><input type="text" class="start-date form-control" value="20171120"></div>'+
        '<div class="col-xs-2"><p>截止时间</p></div>'+
        '<div class="col-xs-3"><input type="text" class="end-date form-control" value="20171120"></div>'+
        '</div>' +
        '<div class="row">' +
        '<div class="col-xs-2 ">类型</div>' +
        '<div class="col-xs-8">' +
        '<div class="btn-group " id="types" data-toggle="buttons">' +
        '<label class="btn btn-default active">' +
        '<input type="radio" name="type" class="type"  value="APOI" autocomplete="off" checked>机场运行信息' +
        '</label>' +
        '<label class="btn btn-default">' +
        '<input type="radio" name="type" class="type"  value="ALOI" autocomplete="off"> 航空公司运行信息' +
        '</label>'+
        '<label class="btn btn-default">' +
        '<input type="radio" name="type" class="type"  value="ATMI" autocomplete="off"> 空管运行信息' +
        '</label>'+
        '<label class="btn btn-default">' +
        '<input type="radio" name="type" class="type"  value="OSCI" autocomplete="off"> 运行监控中心运行信息' +
        '</label>'+
        '</div>' +

        '</div>'+
        '</div>'+
        '<div class="row">' +
        '<div class="col-xs-2 col-xs-offset-2">信息类型</div>' +
        '<div class="col-xs-6">' +
        '<select id="subtype" class="form-control selectpicker show-tick" multiple >' +
        '<option value="One">One</option>' +
        '<option value="Two">Two</option>' +
        '<option value="Three">Three</option>' +
        '</select>' +
        ''+
        
        '</div>'+
        '</div>'+
        '<div class="row">' +
        '<div class="col-xs-2 col-xs-offset-2 type-label">机场</div>' +
        '<div class="col-xs-6">' +
        '<select id="unit-list" name="" class="selectpicker show-tick form-control" multiple >' +
        '<option value="ZUCK">ZUCK</option>' +
        '<option value="ZUUU">ZUUU</option>' +
        '<option value="ZHCZ">ZHCZ</option>' +
        '<option value="ZPPP">ZPPP</option>' +
        '<option value="ZUGY">ZUGY</option>' +
        '<option value="ZUGE">ZUGE</option>' +
        '<option value="ZCJY">ZCJY</option>' +
        '<option value="ZSDC">ZSDC</option>' +
        '</select>' +
        ''+
        '</div>'+
        '</div>'+
        '</div></div></div>';

    // 类型集合
    var typeObj = {
        val : ['APOI','ALOI','ATMI','OSCI'],
        label : ['机场','航空公司','空管','监控中心'],
        result: ['airportDatas','companyDatas','',''],
        fieldName: ['airportName','companyName','',''],
        url : ['http://192.168.243.104:1566/shareDataPlatform/airportDataCount','http://192.168.243.104:1566/shareDataPlatform/companyDataCount','',''],
    };

    // 所有数据
    var allDatas = {
        'APOI' :{},
        'ALOI' : {},
        'ATMI' : {},
        'OSCI' : {}
    };

    // subtype
    var subtype = {
        'APOI' :{
            'PSNI' : '机场机位信息',
            'FPDI' : '机场离港航班信息',
            'FPAI' : '机场到港航班信息',
            'PPCI' : '机场客货信息'
        },
        'ALOI' : {
            'FLGH' : '航班地面状态信息',
            'FPLN' : '航班计划变更信息',
            'FPCI' : '航班客货信息',
            'FCRI' : '航班机组人员信息',
            'FACI' : '航空器信息'
        },
        'ATMI' : {
            'FCDM' : '航班CDM信息',
            'FTMI' : '流量控制措施信息',
            'PADR' : '机场通行能力信息',
            'MDRS' : 'MDRS信息',
            'SECT' : '扇区开放合并信息'
        },
        'OSCI' : {
            'FOSC' : '航班计划动态信息',
            'FPER' : '航班统计信息',
            'PPER' : '机场统计信息'
        }
    };
    // 表格列名称
    var tableColumns = {
        'APOI' :{
            'PSNI' : [
                {
                    field: 'AirportIdentification',
                    title: '机场标识'
                },
                {
                    field: 'AirportStandsStatics',
                    title: '机场机位统计信息'
                }
            ],
            'FPDI' : [
                {
                    field: 'FlightIdentification',
                    title: '航班标识'
                },
                {
                    field: 'Stand',
                    title: '离港航班停机位'
                },
                {
                    field: 'Gate',
                    title: '航班登机口'
                },{
                    field: 'StartBoradingTime',
                    title: '开始登机时间'
                },{
                    field: 'EndBoardingTime',
                    title: '完成登机时间'
                },{
                    field: 'StartLuggageTime',
                    title: '开始装载行李时间'
                },{
                    field: 'EndLuggageTime',
                    title: '完成行李装载时间'
                },{
                    field: 'StartCateringTime',
                    title: '开始配餐时间'
                },{
                    field: 'EndCateringTime',
                    title: '完成配餐时间'
                },{
                    field: 'StartWaterTime',
                    title: '开始加清水时间'
                },{
                    field: 'EndWaterTime',
                    title: '完成加清水时间'
                },{
                    field: 'StartSewageTime',
                    title: '开始排污时间'
                },{
                    field: 'EndSewageTime',
                    title: '完成排污时间'
                },{
                    field: 'StartCleanTime',
                    title: '开始保洁时间'
                },{
                    field: 'EndCleanTime',
                    title: '完成保洁时间'
                },{
                    field: 'StartFuelTime',
                    title: '开始供油时间'
                },{
                    field: 'EndFuelTime',
                    title: '完成供油时间'
                },{
                    field: 'StartDeiceTime',
                    title: '开始除冰时间'
                },{
                    field: 'EndDeiceTime',
                    title: '完成除冰时间'
                },{
                    field: 'AeroBridgeOffTime',
                    title: '离桥时间'
                },{
                    field: 'DepPassengerStepsOffTime',
                    title: '离港客梯车撤离时间'
                },{
                    field: 'ActualDepatureTime',
                    title: '实际离港时间'
                },{
                    field: 'TrailerInPlaceTime',
                    title: '拖车到位时间'
                },{
                    field: 'DepShuttleOffTime',
                    title: '离港摆渡车撤离时间'
                },{
                    field: 'SecurityCheckedPassangerSum',
                    title: '过安检旅客人数'
                }
            ],
            'FPAI' : [
                {
                    field: 'FlightIdentification',
                    title: '航班标识'
                }, {
                    field: 'Stand',
                    title: '到港航班停机位'
                }, {
                    field: 'Gate',
                    title: '航班到达口'
                }, {
                    field: 'ActualArrivalTime',
                    title: '实际到港时间'
                }, {
                    field: 'AeroBridgeOnTime',
                    title: '靠桥时间'
                }, {
                    field: 'ArrPassengerStepsOnTime',
                    title: '进港客梯车对接时间'
                }, {
                    field: 'ArrShuttleReadyTime',
                    title: '进港摆渡车到位时间'
                }, {
                    field: 'StartUnBoardTime',
                    title: '开始下客时间'
                }, {
                    field: 'EndUnBoardTime',
                    title: '完成下客时间'
                },
            ],
            'PPCI' : [
                {
                    field: 'AirportIdentification',
                    title: '机场标识'
                }, {
                    field: 'Date',
                    title: '日期'
                }, {
                    field: 'DepPassengerSum',
                    title: '出港旅客总人数'
                }, {
                    field: 'ArrPassengerSum',
                    title: '进港旅客总人数'
                }
            ]
        },
        'ALOI' : {
            'FLGH' : [
                {
                    field: 'FlightIdentification',
                    title: '航班标识块'
                }, {
                    field: 'CrewReadyTime',
                    title: '机组到位时间'
                }, {
                    field: 'StartBoardingTime',
                    title: '开始登机时间'
                }, {
                    field: 'EndBoardingTime',
                    title: '完成登机时间'
                }, {
                    field: 'StartLuggageTime',
                    title: '开始行李装载时间'
                }, {
                    field: 'EndLuggageTime',
                    title: '完成行李装载时间'
                }, {
                    field: 'StartCateringTime',
                    title: '开始配餐时间'
                }, {
                    field: 'EndCateringTime',
                    title: '完成配餐时间'
                }, {
                    field: 'StartWaterTime',
                    title: '开始加清水时间'
                },{
                    field: 'EndWaterTime',
                    title: '完成加清水时间'
                }, {
                    field: 'StartSewageTime',
                    title: '开始排污时间'
                }, {
                    field: 'EndSewageTime',
                    title: '完成排污时间'
                }, {
                    field: 'StartCleanTime',
                    title: '开始保洁时间'
                }, {
                    field: 'EndCleanTime',
                    title: '完成保洁时间'
                }, {
                    field: 'StartFuelTime',
                    title: '开始供油时间'
                }, {
                    field: 'EndFuelTime',
                    title: '完成供油时间'
                }, {
                    field: 'StartDeiceTime',
                    title: '开始除冰时间'
                }, {
                    field: 'EndDeiceTime',
                    title: '完成除冰时间'
                },{
                    field: 'AeroBridgeOffTime',
                    title: '离桥时间'
                }, {
                    field: 'AeroBridgeOnTime',
                    title: '靠桥时间'
                },{
                    field: 'DepPassengerStepsOffTime',
                    title: '离港客梯车撤离时间'
                }, {
                    field: 'ArrPassengerStepsOnTime',
                    title: '进港客梯车对接时间'
                },{
                    field: 'DepShuttleOffTime',
                    title: '离港摆渡车撤离时间'
                }, {
                    field: 'ArrShuttleReadyTime',
                    title: '进港摆渡车到位时间'
                },{
                    field: 'TrailerReadyTime',
                    title: '拖车到位时间'
                },{
                    field: 'StartUnBoardTime',
                    title: '开始下客时间'
                }, {
                    field: 'EndUnBoardTime',
                    title: '完成下客时间'
                },{
                    field: 'LiftFrontWheelTime',
                    title: '抬前轮时间'
                }, {
                    field: 'LandingTime',
                    title: '着陆时间'
                },{
                    field: 'LooseBrakeTime',
                    title: '松刹车时间'
                }, {
                    field: 'BrakeTime',
                    title: '刹车时间'
                }, {
                    field: 'StartTaxiingTime',
                    title: '开始滑行时间'
                }, {
                    field: 'ActualDepatureTime',
                    title: '实际离港时间'
                }, {
                    field: 'ActualArrivalTime',
                    title: '实际到港时间'
                }, {
                    field: 'ActualGateCloseTime',
                    title: '实际关舱门时间'
                }, {
                    field: 'ActualGateOpenTime',
                    title: '实际开舱门时间'
                }, {
                    field: 'EnduranceDistance',
                    title: '航班续航距离'
                }
            ],
            'FPLN' : [
                {
                    field: 'FlightIdentification',
                    title: '航班标识块'
                }, {
                    field: 'PLNStatus',
                    title: '当日计划变更状态'
                }, {
                    field: 'PLNRegNumber',
                    title: '变更航空器注册号'
                }, {
                    field: 'PLNAircraftType',
                    title: '变更机型'
                }, {
                    field: 'PLNDepAp',
                    title: '变更离港机场'
                }, {
                    field: 'PLNSobt',
                    title: '变更离港时间'
                }, {
                    field: 'PLNSibt',
                    title: '变更进港时间'
                }, {
                    field: 'PLNArrAp',
                    title: '变更目的地机场'
                }, {
                    field: 'Remark',
                    title: '备注'
                },
            ],
            'FPCI' : [
                {
                    field: 'FlightIdentification',
                    title: '航班标识块'
                }, {
                    field: 'CheckinPassengerSum',
                    title: '已值机旅客人数'
                }, {
                    field: 'BoardingPassengerSum',
                    title: '已登机旅客人数'
                }, {
                    field: 'PassengerStatistics',
                    title: '旅客统计'
                }, {
                    field: 'CargoStatistics',
                    title: '货物统计'
                }
            ],
            'FCRI' : [
                {
                    field: 'FlightIdentification',
                    title: '航班标识块'
                }, {
                    field: 'FlightCrews',
                    title: '机组名单块'
                }, {
                    field: 'CrewILSLevel',
                    title: '机组仪表飞行标准'
                }, {
                    field: 'CrewEstTimeoutTime',
                    title: '机组预计超时时间'
                }
            ],
            'FACI' : [
                 {
                    field: 'RegNumber',
                    title: '航空器注册号'
                }, {
                    field: 'AircraftType',
                    title: '机型'
                }, {
                    field: 'WingSpanLength',
                    title: '翼展长度'
                }, {
                    field: 'FuselageLength',
                    title: '机身长度'
                },{
                    field: 'StartServiceTime',
                    title: '机龄起始时间'
                }
            ]
        },
        'ATMI' : {
            'FCDM' : [
                {
                    field: 'FlightIdentification',
                    title: '航班标识块'
                }, {
                    field: 'CTOT',
                    title: '计算起飞时间'
                }, {
                    field: 'COBT',
                    title: '计算撤轮挡时间'
                }, {
                    field: 'TOBT',
                    title: '目标撤轮挡时间'
                }, {
                    field: 'TSAT',
                    title: '目标许可开车时间'
                }, {
                    field: 'Reason',
                    title: '航班受控原因'
                }
            ],
            'FTMI' : [
                {
                    field: 'FTMID',
                    title: '流控标识'
                }, {
                    field: 'PublishArea',
                    title: '流控发布地区'
                }, {
                    field: 'PublishUnit',
                    title: '流控发布单位'
                }, {
                    field: 'AcceptUnit',
                    title: '流控接受单位'
                }, {
                    field: 'ApplyTime',
                    title: '流控申请时间'
                }, {
                    field: 'PublicTime',
                    title: '流控发布时间'
                }, {
                    field: 'Fix',
                    title: '交接点'
                }, {
                    field: 'Scope',
                    title: '流控影响范围'
                }, {
                    field: 'SeperationValue',
                    title: '流控间隔数值'
                }, {
                    field: 'SeperationUnit',
                    title: '流控间隔单位'
                }, {
                    field: 'FLScope',
                    title: '高度要求'
                }, {
                    field: 'Exempt',
                    title: '流控豁免范围'
                },{
                    field: 'StartTime',
                    title: '流控开始时间'
                }, {
                    field: 'EndTime',
                    title: '流控结束时间'
                },{
                    field: 'Reason',
                    title: '流控限制原因'
                }, {
                    field: 'TargetArea',
                    title: '事发地'
                }
            ],
            'PADR' : [
                {
                    field: 'AirportIdentification',
                    title: '机场标识'
                }, {
                    field: 'Date',
                    title: '日期'
                }, {
                    field: 'AirportDeclaredCapacity ',
                    title: '机场通行能力'
                }
            ],
            'MDRS' : [
                {
                    field: 'MDRSIdentification',
                    title: 'MDRS标识'
                }, {
                    field: 'MDRSName',
                    title: 'MDRS通告名称'
                }, {
                    field: 'MDRSPublishTime',
                    title: 'MDRS发布时间'
                }, {
                    field: 'MDRSPublishUnit',
                    title: 'MDRS发布单位'
                }, {
                    field: 'MDRSLevel',
                    title: 'MDRS延误等级'
                },{
                    field: 'MDRSArea',
                    title: 'MDRS延误区域'
                }, {
                    field: 'MDRSTimeScope',
                    title: 'MDRS延误时段'
                }, {
                    field: 'MDRSReason',
                    title: 'MDRS延误原因'
                }
            ],
            'SECT' : [
                {
                    field: 'SectorIdentification',
                    title: '扇区标识'
                }, {
                    field: 'MergedSector',
                    title: '被合并扇区'
                }
            ]
        },
        'OSCI' : {
            'FOSC' : [
                {
                    field: 'FlightIdentification',
                    title: '航班标识块'
                }, {
                    field: 'MissionDate',
                    title: '计划执行日期'
                }, {
                    field: 'SDepAP',
                    title: '计划起飞机场'
                }, {
                    field: 'SOBT',
                    title: '计划离港时间'
                }, {
                    field: 'SArrAP',
                    title: '计划目的地机场'
                }, {
                    field: 'SIBT',
                    title: '计划到港时间'
                }, {
                    field: 'SAircraftType',
                    title: '计划机型'
                }, {
                    field: 'STask',
                    title: '计划任务性质'
                }, {
                    field: 'Status',
                    title: '航班执行状态'
                }, {
                    field: 'PDepAP',
                    title: '预计起飞机场'
                }, {
                    field: 'EOBT',
                    title: '预计撤轮档时间'
                }, {
                    field: 'EET',
                    title: '预计总飞行时间'
                }, {
                    field: 'PArrAP',
                    title: '预计目的地机场'
                }, {
                    field: 'ALNAP',
                    title: '预计备降机场'
                }, {
                    field: 'RAircraftType',
                    title: '实际机型'
                }, {
                    field: 'ExecuteDate',
                    title: '实际执行日期'
                }, {
                    field: 'RDepAP',
                    title: '实际起飞机场'
                }, {
                    field: 'ATOT',
                    title: '实际起飞时间'
                }, {
                    field: 'RArrAP',
                    title: '实际落地机场'
                }, {
                    field: 'ALDT',
                    title: '实际落地时间'
                }, {
                    field: 'RegNumber',
                    title: '航空器注册号'
                }
            ],
            'FPER' : [
                {
                    field: 'FlightIdentification',
                    title: '航班标识块'
                }, {
                    field: 'ETA',
                    title: '航班预达时间'
                }, {
                    field: 'DelayTime',
                    title: '航班延误时间'
                }, {
                    field: 'CloseWaitTime',
                    title: '关舱门后等待时间'
                }, {
                    field: 'AXIT',
                    title: '航班进港滑行时间'
                }, {
                    field: 'AXOT',
                    title: '航班离港滑行时间'
                }
            ],
            'PPER' : [
                {
                    field: 'AirportIdentification',
                    title: '机场标识块'
                }, {
                    field: 'HourlySchDepSum',
                    title: '机场小时计划离港架次'
                }, {
                    field: 'HourlySchArrSum',
                    title: '机场小时计划进港架次'
                }, {
                    field: 'HourlyActTakeOffSum',
                    title: '机场小时实际起飞架次'
                }, {
                    field: 'HourlyActLandingSum',
                    title: '机场小时实际落地架次'
                }, {
                    field: 'HourlyActTakeOffPunctualityRate',
                    title: '小时实际起飞正常率'
                }, {
                    field: 'DailyActTakeOffPunctualityRate',
                    title: '当日实际起飞正常率'
                }, {
                    field: 'HourlySchTakeOffPunctualityRate',
                    title: '小时计划起飞正常率'
                }, {
                    field: 'DailySchTakeOffPunctualityRate',
                    title: '当日计划起飞正常率'
                }, {
                    field: 'HourlyActDepPunctualityRate',
                    title: '小时实际离港正常率'
                }, {
                    field: 'DailyActDepPunctualityRate',
                    title: '当日实际离港正常率'
                }, {
                    field: 'HourlySchDepPunctualityRate',
                    title: '小时计划离港正常率'
                }, {
                    field: 'DailySchDepPunctualityRate',
                    title: '当日计划离港正常率'
                }, {
                    field: 'HourlyOriActTakeOffPunctualityRate',
                    title: '小时始发航班实际起飞正常率'
                }, {
                    field: 'DailyOriActTakeOffPunctualityRate',
                    title: '当日始发航班实际起飞正常率'
                }, {
                    field: 'HourlyOriSchTakeOffPunctualityRate',
                    title: '小时始发航班计划起飞正常率'
                }, {
                    field: 'DailyOriSchTakeOffPunctualityRate',
                    title: '当日始发航班计划起飞正常率'
                }, {
                    field: 'HourlyActClearancePunctualityRate',
                    title: '小时机场实际放行正常率'
                }, {
                    field: 'DailyActClearancePunctualityRate',
                    title: '当日机场实际放行正常率'
                }, {
                    field: 'HourlySchClearancePunctualityRate',
                    title: '机场计划放行正常率'
                }, {
                    field: 'DailySchClearancePunctualityRate',
                    title: '当日机场计划放行正常率'
                }, {
                    field: 'HourlyActLandingPunctualityRate',
                    title: '小时实际落地正常率'
                }, {
                    field: 'DailyActLandingPunctualityRate',
                    title: '当日实际落地正常率'
                }, {
                    field: 'HourlySchLandingPunctualityRate',
                    title: '小时计划落地正常率'
                }, {
                    field: 'DailySchLandingPunctualityRate',
                    title: '当日计划落地正常率'
                }, {
                    field: 'HourlyActArrPunctualityRate',
                    title: '小时实际到港正常率'
                }, {
                    field: 'DailyActArrPunctualityRate',
                    title: '当日实际到港正常率'
                }, {
                    field: 'HourlySchArrPunctualityRate',
                    title: '小时计划到港正常率'
                }, {
                    field: 'DailySchArrPunctualityRate',
                    title: '当日计划到港正常率'
                }
            ]
        }
    };
    var startTime = '', endTime = '', currentType = '', currentSubtype = '';
    var index = -1;
    var searchUrl = 'http://192.168.243.104:1566/shareDataPlatform/dataSearch/';

    /**
     * 初始化模态框
     * content 模态框内容
     */
    var initModal = function (content) {
        //创建模态框
        createModal(content);
        //初始化日历插件datepicker
        initDatepicker();

        //初始化下拉列表多选插件
        initBootstrapSelect();
        //类型选项切换
        toggleType();
        //设置默认选中类型
        initType();
    };
    /**
     *  创建模态框
     *  content 模态框内容
     * */
    var  createModal = function (content) {
        var options = {
            title : "运行数据查询",
            content :  content,
            status: 1,//1:正常 2:警告 3:危险  不填:默认情况
            width : 840,
            showCancelBtn :false,
            mtop: 100,
            isIcon : false,
            buttons : [{
                name:"查询",
                isHidden : false,
                className: 'submit-form',
                callback : function () {
                    console.log($('#subtype').val()+'***'+$('#unit-list').val());
                    handleSubmitForm();
                    // reset form
                }
            },{
                name:"重置",
                isHidden : false,
                status: -1,
                className: 'reset-form',
                callback : function () {
                    // reset form
                }
            }]
        };
        BootstrapDialogFactory.dialog(options);
    };

    /**
     * 初始化日期插件datepicker
     * */
    var initDatepicker = function () {
        $('.start-date').datepicker({
            language: "zh-CN",
            showOnFocus: true, //是否在获取焦点时显示面板 true显示 false不显示 默认true
            autoclose: true, //选择日期后自动关闭面板
            // clearBtn: true, //是否显示清空按钮
            //todayHighlight: true,
            startDate: '0d', //可选日期的开始日期 0d:当前 -1d:当前的前1天, +1d:当前的后1天
            endDate: '+1d', //可选日期最后日期
            keepEmptyValues: true,
            // forceParse: true,
            //格式化
            format: 'yyyymmdd',
        }) ;
        $('.end-date').datepicker({
            language: "zh-CN",
            showOnFocus: true, //是否在获取焦点时显示面板 true显示 false不显示 默认true
            autoclose: true, //选择日期后自动关闭面板
            // clearBtn: true, //是否显示清空按钮
            // todayHighlight: true,
            // startDate: '0d', //可选日期的开始日期 0d:当前 -1d:当前的前1天, +1d:当前的后1天
            // endDate: '+1d', //可选日期最后日期
            keepEmptyValues: true,
            //forceParse: true,
            //格式化
            format: 'yyyymmdd',
        }) ;
    };

    /**
     * 导航查询按钮事件
     *
     * */
    var handleQueryBtn = function () {
      $('#query-btn').on('click',function () {
            //切换模态框显示隐藏
            toggleModal(true,ModalContent);
      });
    };
    /**
     * 处理表单提交
     * */
    var handleSubmitForm = function () {

            //校验表单

            if(false){

                return;
            }else {
                //处理数据
                var str = handleFormData();
                //数据查询
                searchData(str);
            }
    };

    /**
     *  处理表单参数
     * */
    var handleFormData = function () {
        startTime = $('.start-date').val();
        endTime = $('.end-date').val();
        currentSubtype = $('#subtype').val().join(',');
        var unitName = $('#unit-list').val().join(',');
        var str = [startTime,endTime,currentType,currentSubtype,unitName].join('/');
        return str;
    };

    /**
     * 数据查询
     * */
    var searchData = function (str) {
        var url = searchUrl + str;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, xhr) {
                // 当前数据
                if ($.isValidObject(data) && $.isValidVariable(data.status) && '200' == data.status) {
                    //success
                    //updata nav lable
                    //init table

                } else {
                    console.error('Search ' + typeName + ' data failed');
                    console.warn('data:' + data);
                }

            },
            error: function (xhr, status, error) {
                console.error('Search '+ typeName +' data failed');
                console.error(error);
            }
        });
    };


    /**
     * 重置表单
     * */
    var resetForm = function () {

    };

    /**
     *  更新顶部导航内容
     *
     * */
    var updateNavLabel = function () {

    };

    /**
     * 重置顶部导航内容
     * */
    var resetNavLabel = function () {

    };

    /**
     * 类型切换
     * */
    var toggleType = function () {
        var $lables = $('#types .btn');
        $lables.on('click',function () {
            var $this = $(this);
            currentType  = $('.type',$this).val();
            toggleTypeRadio($this);
            toggleTypeLabel(currentType);
            toggleTypeInfo(currentType);
        })
    };

    /**
     * 默认选中项
     * */
    var initType = function () {
          $('#types .btn').first().trigger('click');
    };

    /**
     * 初始化下拉列表多选插件
     * */
    var initBootstrapSelect = function(){
        $('#subtype').selectpicker({
            liveSearch: true,
            maxOptions: 1,
        });

        $('#unit-list').selectpicker({
            liveSearch: true,
            actionsBox: true,
        });
    };

    /**
     * 切换模态框显示隐藏
     *
     * tag bool true显示 false 隐藏
     * content string  模态框内容
     **/
    var toggleModal = function (tag,content) {
        //模态框对象
        var $modal = $('#bootstrap-modal-dialog');
        // 设置显示
        if(tag){
            //若已有模态框，则设置其显示
            var len = $modal.length;
            if(len > 0){
                $modal.modal('show');
            }else {
                //否则初始化模态框
                initModal(content);
            }
        }else {//设置隐藏
            $modal.modal('hidden');
        }
    };
    /**
     * 切换选中类型项
     * that 被点击元素
     * */
    var toggleTypeRadio = function(that){
        var $lables = $('#types .btn');
        var $radios = $('#types .type');
        var radio = $('.types',that);
        $lables.removeClass('active');
        $radios.prop('checked',false);
        radio.prop('checked',true);
    };

    /**
     * 切换类型标签
     * val 选中的单选按钮值
     */
    var toggleTypeLabel = function (typeName) {
        index = typeObj.val.indexOf(typeName);
        var label = typeObj.label[index];
        $('.type-label').text(label);
    };

    /**
     * 切换类型信息
     * */
    var toggleTypeInfo = function (typeName) {

        //若此类型数据已经存在，则不再获取,直接更新下拉列表信息
        if($.isValidObject(allDatas[typeName])){
            updateSelectPicker(typeName);
            return;
        }else {
            //获取此类型的数据
            retrieveTypeDates(typeName);
        }
    };
    /**
     * 获取选项数据
     * typeName 类型
     * */
    var retrieveTypeDates = function (typeName){
        //ajax get datas
        var url = typeObj.url[index];
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, xhr) {

                // 当前数据
                if ($.isValidObject(data) && $.isValidVariable(data.status) && '200' == data.status) {
                    allDatas[typeName] = data;
                    getUnits(data,typeName);
                    console.log(data);
                    updateSelectPicker(typeName);
                } else {
                    console.error('retrieve ' + typeName + ' data failed');
                    console.warn('data:' + data);
                }

            },
            error: function (xhr, status, error) {
                console.error('retrieve '+ typeName +' data failed');
                console.error(error);
            }
        });

    };

    /**
     * 更新下拉列表
     * */
    var updateSelectPicker = function (typeName) {
        var subtypeStr = concatString(subtype[typeName]);
        var units = allDatas[typeName].unit;
        var unitListStr = concatString(units);
        $('#subtype').empty().append( subtypeStr ).selectpicker('refresh');
        $('#unit-list').empty().append( unitListStr ).selectpicker('refresh');
    };


    /**
     * 获取类型单位
     * */
    var getUnits = function (data,typeName) {

        var obj = data[typeObj.result[index]];
        var propertyName = typeObj.fieldName[index];
        allDatas[typeName].unit = {};
          for(var i in obj){
              var unitName = obj[i][propertyName]
              allDatas[typeName].unit[unitName]  = unitName;
          }
    };

    /**
     *  拼接下拉列表串
     * */
    var concatString = function (obj) {
        var arr = [];
        for(var i in obj){
            arr.push('<option value="'+ i +'">' + obj[i] +'</option>');
        }
        return arr.join(' ');
    };

    /**
     * 初始化表格
     * */

    var initTable = function () {
        $('#tb-datas').bootstrapTable({
            striped: false,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: false,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            // queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            // search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列
            // showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            onlyInfoPagination : true,
            columns: tableColumns.APOI.FPDI,

        });
    };

    var tableLoad = function (data) {
        $('#tb-datas').bootstrapTable('load',data);
    };


    return {
        init: function () {
            handleQueryBtn();
            initTable();

            var arr = [];
            for(var i = 0; i< 50; i++){
                arr.push({
                    AirportIdentification: 'A',
                    AirportStandsStatics : '100'
                },);
            }

            tableLoad(arr);
        }
    }
}();
$(document).ready(function () {
    QUERY.init();
});