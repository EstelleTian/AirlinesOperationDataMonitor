var OperatingData = function () {
    //模态框内容
    var modalContent =
        '<div class="query-form"><div class="row"><div class="col-xs-12">' +

        '<div class="row row-line">' +
        '<div class="col-sm-6 col-xs-12 col-md-5 col-md-offset-1">' +
        '<label class="text">时间</label>' +
        '<div class="input-group date date-datepicker">' +
        '<input type="text" class="date-input form-control" maxlength="8" value=""> ' +
        '<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
        '</div>' +

        '</div>'+

        '</div>' +
        '<div class="row">' +
        '<div class="col-xs-12 col-md-10 col-md-offset-1">' +
        '<label class="text">类型</label>' +
        '<div class="btn-group query-type " id="types" data-toggle="buttons">' +
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
        '<input type="radio" name="type" class="type"  value="OSCI" autocomplete="off"> 监控中心运行信息' +
        '</label>'+
        '</div>' +

        '</div>'+
        '</div>'+
        '<div class="row">' +
        '<div class="col-xs-12 col-md-10 col-md-offset-1">' +
        '<label class="text">信息子类型</label>' +
        '<select id="subtype" class="form-control selectpicker show-tick" multiple >' +
        '</select>' +
        '</div>'+
        '</div>'+
        '<div class="row">' +
        '<div class="col-xs-12 col-md-10 col-md-offset-1">' +
        '<label class="text">上传单位：<span class="type-label"></span></label>' +
        '<select id="unit-list" name="" class="selectpicker show-tick form-control" multiple >' +
        '</select>' +
        '</div>'+
        '</div>'+
        '<div class="row">'+
        '<div class="col-xs-12 col-md-10 col-md-offset-1 alert-container">' +
        '</div>' +
        '</div>'+
        '</div></div></div>';


    /*// 类型集合
    var BasicData.operatingDataTypeObj = {
        val : ['APOI','ALOI','ATMI','OSCI'],
        valCN :['机场运行信息','航空公司运行信息','空管运行信息','监控中心运行信息'],
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
    };*/

    // 表格列名称
    var tableColumns = {
        'APOI' :{
            'PSNI' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID',
                    // visible : false
                },
                {
                    field: 'airportNameEN',
                    title: '机场英文名称'
                },
                {
                    field: 'startTime',
                    title: '开始时间'
                },
                {
                    field: 'endTime',
                    title: '终止时间'
                },
                {
                    field: 'nowOcpStandsASum',
                    title: '已占用机位数量（A类）'
                },
                {
                    field: 'nowAviStandsASum',
                    title: '当前空余机位数量（A类）'
                },
                {
                    field: 'estOcpStandsASum',
                    title: '预占用机位数量（A类）'
                },
                {
                    field: 'estAviStandsASum',
                    title: '预计空余机位数量（A类）'
                },
                {
                    field: 'estAviCPLStandsASum',
                    title: '可用备降机位数量（A类）'
                },
                {
                    field: 'estAviFixStandsASum',
                    title: '可用系留机位数量（A类）'
                },
                {
                    field: 'nowOcpStandsBSum',
                    title: '已占用机位数量（B类）'
                },
                {
                    field: 'nowAviStandsBSum',
                    title: '当前空余机位数量（B类）'
                },
                {
                    field: 'estOcpStandsBSum',
                    title: '预占用机位数量（B类）'
                },
                {
                    field: 'nstAviStandsBSum',
                    title: '预计空余机位数量（B类）'
                },
                {
                    field: 'estAviCPLStandsBSum',
                    title: '可用备降机位数量（B类）'
                },
                {
                    field: 'estAviFixStandsBSum',
                    title: '可用系留机位数量（B类）'
                },
                {
                    field: 'nowOcpStandsCSum',
                    title: '已占用机位数量（C类）'
                },
                {
                    field: 'nowAviStandsCSum',
                    title: '当前空余机位数量（C类）'
                },
                {
                    field: 'estOcpStandsCSum',
                    title: '预占用机位数量（C类）'
                },
                {
                    field: 'estAviStandsCSum',
                    title: '预计空余机位数量（C类）'
                },
                {
                    field: 'estAviCPLStandsCSum',
                    title: '可用备降机位数量（C类）'
                },
                {
                    field: 'estAviFixStandsCSum',
                    title: '可用系留机位数量（C类）'
                },
                {
                    field: 'nowOcpStandsDSum',
                    title: '已占用机位数量（D类）'
                },
                {
                    field: 'nowAviStandsDSum',
                    title: '当前空余机位数量（D类）'
                },
                {
                    field: 'estOcpStandsDSum',
                    title: '预占用机位数量（D类）'
                },
                {
                    field: 'estAviStandsDSum',
                    title: '预计空余机位数量（D类）'
                },
                {
                    field: 'estAviCPLStandsDSum',
                    title: '可用备降机位数量（D类）'
                },
                {
                    field: 'estAviFixStandsDSum',
                    title: '可用系留机位数量（D类）'
                },
                {
                    field: 'eowOcpStandsESum',
                    title: '已占用机位数量（E类）'
                },
                {
                    field: 'eowAviStandsESum',
                    title: '当前空余机位数量（E类）'
                },
                {
                    field: 'estOcpStandsESum',
                    title: '预占用机位数量（E类）'
                },
                {
                    field: 'estAviStandsESum',
                    title: '预计空余机位数量（E类）'
                },
                {
                    field: 'estAviCPLStandsESum',
                    title: '可用备降机位数量（E类）'
                },
                {
                    field: 'estAviFixStandsESum',
                    title: '可用系留机位数量（E类）'
                },
                {
                    field: 'nowOcpStandsFSum',
                    title: '已占用机位数量（F类）'
                },
                {
                    field: 'nowAviStandsFSum',
                    title: '当前空余机位数量（F类）'
                },
                {
                    field: 'estOcpStandsFSum',
                    title: '预占用机位数量（F类）'
                },
                {
                    field: 'estAviStandsFSum',
                    title: '预计空余机位数量（F类）'
                },{
                    field: 'estAviCPLStandsFSum',
                    title: '可用备降机位数量（F类）'
                },{
                    field: 'estAviFixStandsFSum',
                    title: '可用系留机位数量（F类）'
                }
            ],
            'FPDI' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'callSign',
                    title: '航空器识别标志'
                },{
                    field: 'GUFI',
                    title: '全球航班唯一标识符'
                },{
                    field: 'regNumber',
                    title: '注册号'
                },{
                    field: 'SOBT',
                    title: '计划离港时间'
                },{
                    field: 'EOBT',
                    title: '预计撤轮档时间'
                },{
                    field: 'depAP',
                    title: '起飞机场'
                },{
                    field: 'arrAP',
                    title: '目的地机场'
                }, {
                    field: 'stand',
                    title: '离港航班停机位'
                },
                {
                    field: 'gate',
                    title: '航班登机口'
                },{
                    field: 'startBoradingTime',
                    title: '开始登机时间'
                },{
                    field: 'endBoardingTime',
                    title: '完成登机时间'
                },{
                    field: 'startLuggageTime',
                    title: '开始装载行李时间'
                },{
                    field: 'endLuggageTime',
                    title: '完成行李装载时间'
                },{
                    field: 'startCateringTime',
                    title: '开始配餐时间'
                },{
                    field: 'endCateringTime',
                    title: '完成配餐时间'
                },{
                    field: 'startWaterTime',
                    title: '开始加清水时间'
                },{
                    field: 'endWaterTime',
                    title: '完成加清水时间'
                },{
                    field: 'startSewageTime',
                    title: '开始排污时间'
                },{
                    field: 'endSewageTime',
                    title: '完成排污时间'
                },{
                    field: 'startCleanTime',
                    title: '开始保洁时间'
                },{
                    field: 'endCleanTime',
                    title: '完成保洁时间'
                },{
                    field: 'startFuelTime',
                    title: '开始供油时间'
                },{
                    field: 'endFuelTime',
                    title: '完成供油时间'
                },{
                    field: 'startDeiceTime',
                    title: '开始除冰时间'
                },{
                    field: 'endDeiceTime',
                    title: '完成除冰时间'
                },{
                    field: 'aeroBridgeOffTime',
                    title: '离桥时间'
                },{
                    field: 'depPassengerStepsOffTime',
                    title: '离港客梯车撤离时间'
                },{
                    field: 'actualDepatureTime',
                    title: '实际离港时间'
                },{
                    field: 'trailerInPlaceTime',
                    title: '拖车到位时间'
                },{
                    field: 'depShuttleOffTime',
                    title: '离港摆渡车撤离时间'
                },{
                    field: 'securityCheckedPassangerSum',
                    title: '过安检旅客人数'
                }
            ],
            'FPAI' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'callSign',
                    title: '航空器识别标志'
                },{
                    field: 'GUFI',
                    title: '全球航班唯一标识符'
                },{
                    field: 'regNumber',
                    title: '注册号'
                },{
                    field: 'SOBT',
                    title: '计划离港时间'
                },{
                    field: 'EOBT',
                    title: '预计撤轮档时间'
                },{
                    field: 'depAP',
                    title: '起飞机场'
                },{
                    field: 'arrAP',
                    title: '目的地机场'
                }, {
                    field: 'stand',
                    title: '到港航班停机位'
                }, {
                    field: 'gate',
                    title: '航班到达口'
                }, {
                    field: 'actualArrivalTime',
                    title: '实际到港时间'
                }, {
                    field: 'aeroBridgeOnTime',
                    title: '靠桥时间'
                }, {
                    field: 'arrPassengerStepsOnTime',
                    title: '进港客梯车对接时间'
                }, {
                    field: 'arrShuttleReadyTime',
                    title: '进港摆渡车到位时间'
                }, {
                    field: 'startUnBoardTime',
                    title: '开始下客时间'
                }, {
                    field: 'endUnBoardTime',
                    title: '完成下客时间'
                },
            ],
            'PPCI' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'airportNameEN',
                    title: '机场英文名称'
                }, {
                    field: 'date',
                    title: '日期'
                }, {
                    field: 'depPassengerSum',
                    title: '出港旅客总人数'
                }, {
                    field: 'arrPassengerSum',
                    title: '进港旅客总人数'
                }
            ]
        },
        'ALOI' : {
            'FLGH' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'callSign',
                    title: '航空器识别标志'
                },{
                    field: 'GUFI',
                    title: '全球航班唯一标识符'
                },{
                    field: 'regNumber',
                    title: '注册号'
                },{
                    field: 'SOBT',
                    title: '计划离港时间'
                },{
                    field: 'EOBT',
                    title: '预计撤轮档时间'
                },{
                    field: 'depAP',
                    title: '起飞机场'
                },{
                    field: 'arrAP',
                    title: '目的地机场'
                }, {
                    field: 'crewReadyTime',
                    title: '机组到位时间'
                }, {
                    field: 'startBoardingTime',
                    title: '开始登机时间'
                }, {
                    field: 'endBoardingTime',
                    title: '完成登机时间'
                }, {
                    field: 'startLuggageTime',
                    title: '开始行李装载时间'
                }, {
                    field: 'endLuggageTime',
                    title: '完成行李装载时间'
                }, {
                    field: 'startCateringTime',
                    title: '开始配餐时间'
                }, {
                    field: 'endCateringTime',
                    title: '完成配餐时间'
                }, {
                    field: 'startWaterTime',
                    title: '开始加清水时间'
                },{
                    field: 'endWaterTime',
                    title: '完成加清水时间'
                }, {
                    field: 'startSewageTime',
                    title: '开始排污时间'
                }, {
                    field: 'endSewageTime',
                    title: '完成排污时间'
                }, {
                    field: 'startCleanTime',
                    title: '开始保洁时间'
                }, {
                    field: 'endCleanTime',
                    title: '完成保洁时间'
                }, {
                    field: 'startFuelTime',
                    title: '开始供油时间'
                }, {
                    field: 'endFuelTime',
                    title: '完成供油时间'
                }, {
                    field: 'startDeiceTime',
                    title: '开始除冰时间'
                }, {
                    field: 'endDeiceTime',
                    title: '完成除冰时间'
                },{
                    field: 'aeroBridgeOffTime',
                    title: '离桥时间'
                }, {
                    field: 'aeroBridgeOnTime',
                    title: '靠桥时间'
                },{
                    field: 'depPassengerStepsOffTime',
                    title: '离港客梯车撤离时间'
                }, {
                    field: 'arrPassengerStepsOnTime',
                    title: '进港客梯车对接时间'
                },{
                    field: 'depShuttleOffTime',
                    title: '离港摆渡车撤离时间'
                }, {
                    field: 'arrShuttleReadyTime',
                    title: '进港摆渡车到位时间'
                },{
                    field: 'trailerReadyTime',
                    title: '拖车到位时间'
                },{
                    field: 'startUnBoardTime',
                    title: '开始下客时间'
                }, {
                    field: 'endUnBoardTime',
                    title: '完成下客时间'
                },{
                    field: 'liftFrontWheelTime',
                    title: '抬前轮时间'
                }, {
                    field: 'landingTime',
                    title: '着陆时间'
                },{
                    field: 'looseBrakeTime',
                    title: '松刹车时间'
                }, {
                    field: 'brakeTime',
                    title: '刹车时间'
                }, {
                    field: 'startTaxiingTime',
                    title: '开始滑行时间'
                }, {
                    field: 'actualDepatureTime',
                    title: '实际离港时间'
                }, {
                    field: 'actualArrivalTime',
                    title: '实际到港时间'
                }, {
                    field: 'actualGateCloseTime',
                    title: '实际关舱门时间'
                }, {
                    field: 'actualGateOpenTime',
                    title: '实际开舱门时间'
                }, {
                    field: 'enduranceDistance',
                    title: '航班续航距离'
                }
            ],
            'FPLN' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'callSign',
                    title: '航空器识别标志'
                },{
                    field: 'GUFI',
                    title: '全球航班唯一标识符'
                },{
                    field: 'regNumber',
                    title: '注册号'
                },{
                    field: 'SOBT',
                    title: '计划离港时间'
                },{
                    field: 'EOBT',
                    title: '预计撤轮档时间'
                },{
                    field: 'depAP',
                    title: '起飞机场'
                },{
                    field: 'arrAP',
                    title: '目的地机场'
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
                    field: 'remark',
                    title: '备注'
                },
            ],
            'FPCI' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'callSign',
                    title: '航空器识别标志'
                },{
                    field: 'GUFI',
                    title: '全球航班唯一标识符'
                },{
                    field: 'regNumber',
                    title: '注册号'
                },{
                    field: 'SOBT',
                    title: '计划离港时间'
                },{
                    field: 'EOBT',
                    title: '预计撤轮档时间'
                },{
                    field: 'depAP',
                    title: '起飞机场'
                },{
                    field: 'arrAP',
                    title: '目的地机场'
                }, {
                    field: 'checkinPassengerSum',
                    title: '已值机旅客人数'
                }, {
                    field: 'boardingPassengerSum',
                    title: '已登机旅客人数'
                }, {
                    field: 'passengerDomesticSum',
                    title: '国内旅客总人数'
                },{
                    field: 'passengerInternationalSum',
                    title: '国际旅客总人数'
                },{
                    field: 'passengerAdultSum',
                    title: '成年旅客人数'
                },{
                    field: 'passengerChildSum',
                    title: '儿童旅客人数'
                },{
                    field: 'passengerBabySum',
                    title: '婴儿旅客人数'
                }, {
                    field: 'cargoDomesticWeight',
                    title: '国内货物重量'
                }, {
                    field: 'cargoInternationalWeight',
                    title: '国际货物重量'
                }, {
                    field: 'mailDomesticWeight',
                    title: '国内邮件重量'
                }, {
                    field: 'mailInternationalWeight',
                    title: '国际邮件重量'
                }, {
                    field: 'luggageDomesticWeight',
                    title: '国内行李重量'
                }, {
                    field: 'luggageInternationalWeight',
                    title: '国际行李重量'
                }, {
                    field: 'luggageDomesticSum',
                    title: '国内行李数量'
                }, {
                    field: 'luggageInternationalSum',
                    title: '国际行李数量'
                }, {
                    field: 'cargoFreeLoad',
                    title: '腹舱剩余载量'
                }
            ],
            'FCRI' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'callSign',
                    title: '航空器识别标志'
                },{
                    field: 'GUFI',
                    title: '全球航班唯一标识符'
                },{
                    field: 'regNumber',
                    title: '注册号'
                },{
                    field: 'SOBT',
                    title: '计划离港时间'
                },{
                    field: 'EOBT',
                    title: '预计撤轮档时间'
                },{
                    field: 'depAP',
                    title: '起飞机场'
                },{
                    field: 'arrAP',
                    title: '目的地机场'
                }, {
                    field: 'Name',
                    title: '姓名'
                },{
                    field: 'Role',
                    title: '职务'
                },{
                    field: 'NewCaptain',
                    title: '是否新机长'
                },{
                    field: 'ForeignCaptain',
                    title: '是否为外籍人员'
                },{
                    field: 'Remark',
                    title: '备注'
                }, {
                    field: 'crewILSLevel',
                    title: '机组仪表飞行标准'
                }, {
                    field: 'crewEstTimeoutTime',
                    title: '机组预计超时时间'
                }
            ],
            'FACI' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'regNumber',
                    title: '航空器注册号'
                }, {
                    field: 'aircraftType',
                    title: '机型'
                }, {
                    field: 'wingSpanLength',
                    title: '翼展长度'
                }, {
                    field: 'fuselageLength',
                    title: '机身长度'
                },{
                    field: 'startServiceTime',
                    title: '机龄起始时间'
                }
            ]
        },
        'ATMI' : {
            'FCDM' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'callSign',
                    title: '航空器识别标志'
                },{
                    field: 'GUFI',
                    title: '全球航班唯一标识符'
                },{
                    field: 'regNumber',
                    title: '注册号'
                },{
                    field: 'SOBT',
                    title: '计划离港时间'
                },{
                    field: 'EOBT',
                    title: '预计撤轮档时间'
                },{
                    field: 'depAP',
                    title: '起飞机场'
                },{
                    field: 'arrAP',
                    title: '目的地机场'
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
                    field: 'reason',
                    title: '航班受控原因'
                }
            ],
            'FTMI' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'FTMID',
                    title: '流控标识'
                }, {
                    field: 'publishArea',
                    title: '流控发布地区'
                }, {
                    field: 'publishUnit',
                    title: '流控发布单位'
                }, {
                    field: 'acceptUnit',
                    title: '流控接受单位'
                }, {
                    field: 'applyTime',
                    title: '流控申请时间'
                }, {
                    field: 'publicTime',
                    title: '流控发布时间'
                }, {
                    field: 'fix',
                    title: '交接点'
                }, {
                    field: 'scope',
                    title: '流控影响范围'
                }, {
                    field: 'seperationValue',
                    title: '流控间隔数值'
                }, {
                    field: 'seperationUnit',
                    title: '流控间隔单位'
                }, {
                    field: 'FLScope',
                    title: '高度要求'
                }, {
                    field: 'exempt',
                    title: '流控豁免范围'
                },{
                    field: 'startTime',
                    title: '流控开始时间'
                }, {
                    field: 'endTime',
                    title: '流控结束时间'
                },{
                    field: 'reason',
                    title: '流控限制原因'
                }, {
                    field: 'targetArea',
                    title: '事发地'
                }
            ],
            'PADR' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'airportNameEN',
                    title: '机场英文名称'
                }, {
                    field: 'date',
                    title: '日期'
                }, {
                    field: 'startTime',
                    title: '开始时间'
                }, {
                    field: 'endTime',
                    title: '终止时间'
                }, {
                    field: 'depRunWay',
                    title: '起飞跑道'
                }, {
                    field: 'arrRunWay',
                    title: '落地跑道'
                }, {
                    field: 'APCPT',
                    title: '机场容量'
                }, {
                    field: 'ARR',
                    title: '接受率'
                }, {
                    field: 'ADR',
                    title: '离场率'
                }, {
                    field: 'remark',
                    title: '备注'
                }
            ],
            'MDRS' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
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
                }, {
                    field: 'MDRSExpectInfluence',
                    title: 'MDRS预期影响'
                }, {
                    field: 'MDRSExpectRespond',
                    title: 'MDRS预期响应'
                }
            ],
            'SECT' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'sectorIdentification',
                    title: '扇区标识'
                }, {
                    field: 'mergedSector',
                    title: '被合并扇区'
                }
            ]
        },
        'OSCI' : {
            'FOSC' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'callSign',
                    title: '航空器识别标志'
                },{
                    field: 'GUFI',
                    title: '全球航班唯一标识符'
                },{
                    field: 'regNumber',
                    title: '注册号'
                },{
                    field: 'SOBT',
                    title: '计划离港时间'
                },{
                    field: 'EOBT',
                    title: '预计撤轮档时间'
                },{
                    field: 'depAP',
                    title: '起飞机场'
                },{
                    field: 'arrAP',
                    title: '目的地机场'
                }, {
                    field: 'missionDate',
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
                    field: 'status',
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
                    field: 'executeDate',
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
                    field: 'regNumber',
                    title: '航空器注册号'
                }
            ],
            'FPER' : [
                {
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'callSign',
                    title: '航空器识别标志'
                },{
                    field: 'GUFI',
                    title: '全球航班唯一标识符'
                },{
                    field: 'regNumber',
                    title: '注册号'
                },{
                    field: 'SOBT',
                    title: '计划离港时间'
                },{
                    field: 'EOBT',
                    title: '预计撤轮档时间'
                },{
                    field: 'depAP',
                    title: '起飞机场'
                },{
                    field: 'arrAP',
                    title: '目的地机场'
                }, {
                    field: 'ETA',
                    title: '航班预达时间'
                }, {
                    field: 'delayTime',
                    title: '航班延误时间'
                }, {
                    field: 'closeWaitTime',
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
                    field: 'rowNumber',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'airportNameEN',
                    title: '机场英文名称'
                }, {
                    field: 'hourlySchDepSum',
                    title: '机场小时计划离港架次'
                }, {
                    field: 'hourlySchArrSum',
                    title: '机场小时计划进港架次'
                }, {
                    field: 'hourlyActTakeOffSum',
                    title: '机场小时实际起飞架次'
                }, {
                    field: 'hourlyActLandingSum',
                    title: '机场小时实际落地架次'
                }, {
                    field: 'hourlyActTakeOffPunctualityRate',
                    title: '小时实际起飞正常率'
                }, {
                    field: 'dailyActTakeOffPunctualityRate',
                    title: '当日实际起飞正常率'
                }, {
                    field: 'hourlySchTakeOffPunctualityRate',
                    title: '小时计划起飞正常率'
                }, {
                    field: 'dailySchTakeOffPunctualityRate',
                    title: '当日计划起飞正常率'
                }, {
                    field: 'hourlyActDepPunctualityRate',
                    title: '小时实际离港正常率'
                }, {
                    field: 'dailyActDepPunctualityRate',
                    title: '当日实际离港正常率'
                }, {
                    field: 'hourlySchDepPunctualityRate',
                    title: '小时计划离港正常率'
                }, {
                    field: 'dailySchDepPunctualityRate',
                    title: '当日计划离港正常率'
                }, {
                    field: 'hourlyOriActTakeOffPunctualityRate',
                    title: '小时始发航班实际起飞正常率'
                }, {
                    field: 'dailyOriActTakeOffPunctualityRate',
                    title: '当日始发航班实际起飞正常率'
                }, {
                    field: 'hourlyOriSchTakeOffPunctualityRate',
                    title: '小时始发航班计划起飞正常率'
                }, {
                    field: 'dailyOriSchTakeOffPunctualityRate',
                    title: '当日始发航班计划起飞正常率'
                }, {
                    field: 'hourlyActClearancePunctualityRate',
                    title: '小时机场实际放行正常率'
                }, {
                    field: 'dailyActClearancePunctualityRate',
                    title: '当日机场实际放行正常率'
                }, {
                    field: 'hourlySchClearancePunctualityRate',
                    title: '机场计划放行正常率'
                }, {
                    field: 'dailySchClearancePunctualityRate',
                    title: '当日机场计划放行正常率'
                }, {
                    field: 'hourlyActLandingPunctualityRate',
                    title: '小时实际落地正常率'
                }, {
                    field: 'dailyActLandingPunctualityRate',
                    title: '当日实际落地正常率'
                }, {
                    field: 'hourlySchLandingPunctualityRate',
                    title: '小时计划落地正常率'
                }, {
                    field: 'dailySchLandingPunctualityRate',
                    title: '当日计划落地正常率'
                }, {
                    field: 'hourlyActArrPunctualityRate',
                    title: '小时实际到港正常率'
                }, {
                    field: 'dailyActArrPunctualityRate',
                    title: '当日实际到港正常率'
                }, {
                    field: 'hourlySchArrPunctualityRate',
                    title: '小时计划到港正常率'
                }, {
                    field: 'dailySchArrPunctualityRate',
                    title: '当日计划到港正常率'
                }
            ]
        }
    };

    //表格排序列集合
    var tableSortName = {
        'APOI' : {
            'PSNI' : 'id',
            'FPDI' : 'id',
            'FPAI' : 'id',
            'PPCI' : 'id'
        },
        'ALOI' : {
            'FLGH' : 'id',
            'FPLN' : 'id',
            'FPCI' : 'id',
            'FCRI' : 'id',
            'FACI' : 'id'
        },
        'ATMI' : {
            'FCDM' : 'id',
            'FTMI' : 'id',
            'PADR' : 'id',
            'MDRS' : 'id',
            'SECT' : 'id'
        },
        'OSCI' : {
            'FOSC' : 'id',
            'FPER' : 'id',
            'PPER' : 'id'
        },
    }
    //时间
    var date = '';
    //当前选中的类型值
    var currentType = '';
    //当前选中的类型索引位置
    var index = -1;
    //当前选中的子类型值
    var currentSubtype = [];
    //当前选中的单位
    var currentUnit = [];
    //数据查询地址
    var searchUrl = iphost + "shareDataPlatform/dataSearch/";
    // 表格对象
    var tableObj = {};
    //是否已经成功查询过
    var hasQuery = false;

    /**
     * 初始化模态框
     * content 模态框内容
     */
    var initModal = function (content) {
        //创建模态框
        createModal(content);
        //设置默认时间
        initDates();
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
            status: 0,//1:正常 2:警告 3:危险  不填:默认情况
            width : 890,
            showCancelBtn :false,
            mtop: 200,
            isIcon : false,
            buttons : [{
                name:"查询",
                status : 0,
                isHidden : false,
                className: 'submit-form',
                callback : function () {
                    var btn = this;
                    // 处理表单提交
                    handleSubmitForm(btn);
                }
            },{
                name:"重置",
                isHidden : false,
                status: -1,
                className: 'reset-form',
                callback : function () {
                    // 重置表单
                    resetForm();
                }
            },{
                name:"关闭",
                status: -1,
                callback : function () {
                }
            }]
        };
        BootstrapDialogFactory.dialog(options);
    };


    /**
     *  设置默认时间
     * */
    var initDates = function () {
        var nowDate = $.getFullTime(new Date()).substring(0,8);
        $('.date-input').val(nowDate);

    };

    /**
     * 初始化日期插件datepicker
     * */
    var initDatepicker = function () {
        $('#bootstrap-modal-dialog-body .date-datepicker').datepicker({
            language: "zh-CN",
            showOnFocus: false, //是否在获取焦点时显示面板 true显示 false不显示 默认true
            autoclose: true, //选择日期后自动关闭面板
            // clearBtn: true, //是否显示清空按钮
            //todayHighlight: true,
            // startDate: '0d', //可选日期的开始日期 0d:当前 -1d:当前的前1天, +1d:当前的后1天
            // endDate: '+1d', //可选日期最后日期
            keepEmptyValues: true,
            // forceParse: true,
            //格式化
            format: 'yyyymmdd',
        }) ;
    };

    /**
     * 处理表单提交
     * */
    var handleSubmitForm = function (btn) {
        //处理数据
        handleFormData();
        //校验表单
        var bool = validateForm();
        if(!bool){
            //警告
            var mess = "请输入正确的时间,日期格式:YYYYMMDD";
            showAlear(mess);
            return;
        }else {
            // 清空警告
            clearAlert();
            //拼接参数
            var str = concatParameter();
            //数据查询
            searchData(str,btn);
        }
    };

    /**
     * 校验表单
     * */
    var validateForm = function () {
        var valid = true;
        var regexp = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/;
        //起始时间
        var dateVal = regexp.test(date);

        if(!dateVal){
            valid = false;
        }
        return valid;
    };

    /**
     *  处理数据
     * */
    var handleFormData = function () {
        //起始时间
        date = $('.date-input').val();
        // 当前选中的子类型值(数组)
        currentSubtype =$('#subtype').val();
        // 当前选中的单位值(数组)
        currentUnit = $('#unit-list').val();
    };

    /**
     * 拼接参数
     * */
    var concatParameter = function () {
        // 当前选中的子类型值(字符串)
        var subtypeVal = currentSubtype ? currentSubtype.join(',') : 'null';
        // 当前选中的单位值(字符串)
        var unitVal = currentUnit ? currentUnit.join(',') : 'null';
        // 拼接参数
        var str = [date,currentType,subtypeVal,unitVal].join('/');
        return str;
    };

    /**
     * 数据查询
     * */
    var searchData = function (str,btn) {
        var url = searchUrl + str;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, xhr) {
                // 当前数据
                if ($.isValidObject(data) && $.isValidVariable(data.status) && '200' == data.status) {

                    //success
                    //提取数据
                    var result = data.sharingDatas;
                    var time = data.generatetime;

                    // 更新数据时间
                    if($.isValidVariable(time)){
                        // 更新数据时间
                        updateGeneratetime(time);
                    }
                    // 更新顶部导航内容
                    // (要在表格初始化前，因为顶部导航内容多少影响顶部导航高度进而影响表格容器的高度)
                    updateNavLabel();
                    //
                    $('.no-datas-tip').hide();
                    //初始化表格
                    initTable();
                    //表格数据加载
                    tableLoad(result);
                    //隐藏模态框
                    toggleModal(false);

                } else if($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
                    var err = "查询失败:" + data.error;
                    showAlear(err);
                }else {
                    showAlear("查询失败");
                }

            },
            error: function (xhr, status, error) {
                console.error('Search data failed');
                console.error(error);
            }
        });
    };


    /**
     * 重置表单
     * */
    var resetForm = function () {
        //设置默认时间
        initDates();
        // 默认选中项
        initType();
        //取消下拉列表选中
        deselectList();
        // 清空警告
        clearAlert();
    };

    /**
     *  更新顶部导航内容
     *
     * */
    var updateNavLabel = function () {
        //当前选中的类型
        var currentTypeObj = BasicData.operatingDataTypeObj.result[currentType];
        var currentSubtypeLabel = '';
        var currentUnitLabel = '';
        if(Array.isArray(currentSubtype)){
            currentSubtypeLabel = currentSubtype.map(function (i) {
                return  currentTypeObj.subtype[i];
            }).join(' , ');
        }
        if(Array.isArray(currentUnit)){
            currentUnitLabel = currentUnit.map(function (k) {
                return  currentTypeObj.unit[k];
            }).join(' , ');
        }
        //内容更新
        $('.data-query-summary').addClass('not-empty');
        $('.query-date').text(date).attr('title','时间: '+date);
        $('.nav-type').text(BasicData.operatingDataTypeObj.valCN[index]).attr('title','类型: '+BasicData.operatingDataTypeObj.valCN[index]);
        $('.nav-subtype').text(currentSubtypeLabel).attr('title','信息子类型: '+currentSubtypeLabel);
        $('.nav-unit').text(currentUnitLabel).attr('title','上传单位: '+currentUnitLabel);
        $('.to').text('-');
        //更新查询状态
        hasQuery = true;
    };

    /**
     * 重置顶部导航内容
     * */
    var resetNavLabel = function () {
        $('.nav-start-time').text('');
        $('.nav-end-time').text('');
        $('.nav-type').text('');
        $('.nav-subtype').text('');
        $('.nav-unit').text('');
        $('.to').text('');
    };

    /**
     *  更新数据时间
     * */

    var updateGeneratetime = function(time){
        var timeFormatter = formateTime(time);
        $('.generate-time').text('数据生成时间: ' + timeFormatter);
    };


    /**
     * 类型切换
     * */
    var toggleType = function () {
        var $lables = $('#types .btn');
        $lables.on('click',function () {
            // 清空警告
            clearAlert();
            var $this = $(this);
            var val = $('.type',$this).val();
            //若当前点击的选项数值与currentType相同,则不做任何操作
            if(val == currentType){
                return;
            }
            currentType  = val;
            OperatingData.currentType = val;
            toggleTypeRadio($this);
            toggleTypeLabel(currentType);
            updateSelectPicker(currentType);
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
     **/
    var toggleModal = function (tag) {
        //模态框对象
        var $modal = $('#bootstrap-modal-dialog');
        var $body = $('body');
        // 设置显示
        if (tag) {
            $body.removeClass('hide-modal');
            $modal.modal('show');
        } else {//设置隐藏
            $body.addClass('hide-modal');
            $modal.modal('hide');
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
        index = BasicData.operatingDataTypeObj.val.indexOf(typeName);
        var label = BasicData.operatingDataTypeObj.label[index];
        $('.query-form .type-label').text(label);
    };


    /**
     * 更新下拉列表
     * */
    var updateSelectPicker = function (typeName) {
        var subtypeStr = concatOptionString(BasicData.operatingDataTypeObj.result[typeName].subtype);
        var units = BasicData.operatingDataTypeObj.result[typeName].unit;
        var unitListStr = concatOptionString(units);
        $('#subtype').empty().append( subtypeStr ).selectpicker('refresh');
        $('#unit-list').empty().append( unitListStr ).selectpicker('refresh');
    };

    /**
     * 取消下拉列表选中
     * */
    var deselectList = function () {
        $('#subtype').selectpicker('deselectAll');
        $('#unit-list').selectpicker('deselectAll');
    };

    /**
     *  拼接下拉列表串
     * */
    var concatOptionString = function (obj) {
        // 通过Object.keys()获取对象可枚举属性所组成的数组
        var array = Object.keys(obj);
        var arr = [];
        // 若array的长度为1，则下拉列表只不一项，设置其为选中
        if(array.length ==1){
            arr.push('<option selected  value="'+ array[0] +'">' + obj[array[0]] +'</option>');
        }else if(array.length > 1) {
            for(var i in obj){
                arr.push('<option value="'+ i +'">' + obj[i] +'</option>');
            }
        }

        return arr.join(' ');
    };


    /**
     *  警告
     *
     *  mess str 警告信息内容
     * */
    var showAlear = function (mess) {
        var $dom = $('.query-form .alert-container');
        var str = '<div class="alert alert-danger alert-dismissible fade in" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' +
            '<p id="alert-mess">'+ mess +' </p>' +
            '</div>' ;
        $dom.empty().append(str);
    };

    /**
     * 清空警告
     *
     * */
    var clearAlert  = function () {
        $('.alert-container').empty();
    };

    /**
     * 初始化表格
     * */
    var initTable = function () {
        //高度获取
        var height = $('.table-contianer').height();
        //先注销表格
        destroyTable();
        tableObj = $('#tb-datas').bootstrapTable({
            striped: false,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: false,                   //是否显示分页（*）
            sortable: true,                     //是否启用排序
            sortName : tableSortName[currentType][currentSubtype],      //定义排序列
            sortOrder: "asc",                   //排序方式
            // queryParams: oTableInit.queryParams,//传递参数（*）
            pagination : true,                   //设置为 true 会在表格底部显示分页条
            onlyInfoPagination : true,          //设置为 true 只显示总数据数，而不显示分页按钮。需要 pagination='True'
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 99999999999,               //每页的记录行数（*）
            pageList: '[All]',                  //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端
            strictSearch: false,                 //设置为 true启用 全匹配搜索，否则为模糊搜索
            showColumns: false,                  //是否显示所有的列
            // showRefresh: true,                //是否显示刷新按钮
            minimumCountColumns: 1,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: height,                      //定义表格的高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            // fixedColumns: true,                 //是否开冻结列
            // fixedNumber: "3",                     //结列数
            columns: tableColumns[currentType][currentSubtype],
        });
    };
    /**
     *  表格数据加载
     * */
    var tableLoad = function (data) {
        $('#tb-datas').bootstrapTable('load',data);
    };
    /**
     *  注销表格
     * */
    var destroyTable = function () {
        $('#tb-datas').bootstrapTable('destroy');
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
     * 初始始化操作
     * */
    var initOperators = function () {
        //初始化模态框
        initModal(modalContent);
        //顶部导航事件处理
        initTopNavEvent();
        //绑定Window事件，窗口变化时重新调整表格大小
        initDocumentResize();
        //绑定左侧导航'运行数据查询'点击事件
        initNavMenu();
    };
    /**
     * 获取机场单位数据
     * */
    var initAPOIUnitData = function () {
        var url = BasicData.operatingDataTypeObj.unitURL['APOI'];
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
                    updateUints('APOI',result);
                    //若当前选中的类型为机场
                    if(currentType == 'APOI'){
                        // 更新下拉列表
                        updateSelectPicker('APOI');
                    };

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
        var url = BasicData.operatingDataTypeObj.unitURL['ALOI'];
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, xhr) {
                // 当前数据
                if ($.isValidObject(data) && $.isValidVariable(data.status) && '200' == data.status) {
                    var result = data['allAirport'];
                    // 更新单位
                    updateUints('ALOI',result);
                    //若当前选中的类型为航空公司
                    if(currentType == 'ALOI'){
                        // 更新下拉列表
                        updateSelectPicker('ALOI');
                    };
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
    var updateUints = function (typeName,data) {
        BasicData.operatingDataTypeObj.result[typeName].unit = {};
        for(var i in data){
            var key = i;
            var val = data[i];
            BasicData.operatingDataTypeObj.result[typeName].unit[key] = val;
        }
    };


    /**
     * 顶部导航事件处理
     * */
    var initTopNavEvent = function () {
        //查询按钮点击
        $('#query-btn').on('click',function () {
            //切换模态框显示隐藏
            toggleModal(true);
        });
        //重置按钮点击
        $('#reset-btn').on('click',function () {
            // 重置顶部导航内容
            resetNavLabel();
            // 注销表格
            destroyTable();

        })
    };

    /**
     * 绑定Window事件，窗口变化时重新调整表格大小
     * */
    var initDocumentResize = function () {
        $(window).resize(function () {
            if($('.operating-data-query').is(":visible")){
                $('.table-contianer').height(getTableContianerHeight()-20);
                var height = $('.table-contianer').height();
                $('#tb-datas').bootstrapTable('resetView',{
                    height: height
                });
            }
        });
    };
    /**
     *
     * 绑定左侧导航'运行数据查询'点击事件
     * */
    var initNavMenu = function () {
        //
        $('.nav-operating-data-query').on('click', function () {
            queryModalShow();

            $('.table-contianer').height(getTableContianerHeight()-20);
        });
    };

    var queryModalShow = function () {
        //显示模态框
        if (!hasQuery) {
            toggleModal(true);
        }
        //切换时间显隐
        $('.now_time').hide();
        $('.generate-time').show();
    };

    /**
     *  计算表格初始化前父容器的高度
     * */
    var getTableContianerHeight = function () {
        var  body = $('body').height();
        var head = $('.headbar').outerHeight() + parseInt($('.headbar').css('marginBottom'));
        var  nav = $('.nav-menu').outerHeight() +parseInt($('.nav-menu').css('marginBottom'));
        var  innerNav = $('.data-query-summary').outerHeight() +parseInt($('.data-query-summary').css('marginBottom'));
        return body - head - nav - innerNav;
    };

    /**
     * 格式化时间
     * */
    var formateTime = function (time) {
        var year = time.substring(0,4);
        var mon = time.substring(4,6);
        var date = time.substring(6,8);
        var hour = time.substring(8,10);
        var min = time.substring(10,12);
        var str = year+'-' + mon +'-' + date + ' ' + hour +":"+ min;
        return str;
    };
    return {
        init: function () {
            //初始始化基础数据
            // initBasicData();
            //初始始化操作
            initOperators();

        },
        updateSelectPicker : updateSelectPicker,
        currentType : currentType

    }
}();
$(document).ready(function () {
    OperatingData.init();

});