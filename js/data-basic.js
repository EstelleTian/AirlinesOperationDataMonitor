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

    var tableObj = {
        colName: {
            'APOI': {
                'PSNI': {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    },airportNameEN: {
                        cn: '机场英文名称',
                        en: 'airportNameEN'
                    },startTime: {
                        cn: '开始时间',
                        en: 'startTime'
                    },endTime: {
                        cn: '终止时间',
                        en: 'endTime'
                    },nowOcpStandsASum: {
                        cn: '已占用机位数量（A类）',
                        en: 'nowOcpStandsASum'
                    },nowAviStandsASum: {
                        cn: '当前空余机位数量（A类）',
                        en: 'nowAviStandsASum'
                    },estOcpStandsASum: {
                        cn: '预占用机位数量（A类）',
                        en: 'estOcpStandsASum'
                    },estAviStandsASum: {
                        cn: '预计空余机位数量（A类）',
                        en: 'estAviStandsASum'
                    },estAviCPLStandsASum: {
                        cn: '可用备降机位数量（A类）',
                        en: 'estAviCPLStandsASum'
                    },estAviFixStandsASum: {
                        cn: '可用系留机位数量（A类）',
                        en: 'estAviFixStandsASum'
                    },nowOcpStandsBSum: {
                        cn: '已占用机位数量（B类）',
                        en: 'nowOcpStandsBSum'
                    },nowAviStandsBSum: {
                        cn: '当前空余机位数量（B类）',
                        en: 'nowAviStandsBSum'
                    },estOcpStandsBSum: {
                        cn: '预占用机位数量（B类）',
                        en: 'estOcpStandsBSum'
                    },nstAviStandsBSum: {
                        cn: '预计空余机位数量（B类）',
                        en: 'nstAviStandsBSum'
                    },estAviCPLStandsBSum: {
                        cn: '可用备降机位数量（B类）',
                        en: 'estAviCPLStandsBSum'
                    },estAviFixStandsBSum: {
                        cn: '可用系留机位数量（B类）',
                        en: 'estAviFixStandsBSum'
                    },nowOcpStandsCSum: {
                        cn: '已占用机位数量（C类）',
                        en: 'nowOcpStandsCSum'
                    },nowAviStandsCSum: {
                        cn: '当前空余机位数量（C类）',
                        en: 'nowAviStandsCSum'
                    },estOcpStandsCSum: {
                        cn: '预占用机位数量（C类）',
                        en: 'estOcpStandsCSum'
                    },estAviStandsCSum: {
                        cn: '预计空余机位数量（C类）',
                        en: 'estAviStandsCSum'
                    },estAviCPLStandsCSum: {
                        cn: '可用备降机位数量（C类）',
                        en: 'estAviCPLStandsCSum'
                    },estAviFixStandsCSum: {
                        cn: '可用系留机位数量（C类）',
                        en: 'estAviFixStandsCSum'
                    },nowOcpStandsDSum: {
                        cn: '已占用机位数量（D类）',
                        en: 'nowOcpStandsDSum'
                    },nowAviStandsDSum: {
                        cn: '当前空余机位数量（D类）',
                        en: 'nowAviStandsDSum'
                    },estOcpStandsDSum: {
                        cn: '预占用机位数量（D类）',
                        en: 'estOcpStandsDSum'
                    },estAviStandsDSum: {
                        cn: '预计空余机位数量（D类）',
                        en: 'estAviStandsDSum'
                    },estAviCPLStandsDSum: {
                        cn: '可用备降机位数量（D类）',
                        en: 'estAviCPLStandsDSum'
                    },estAviFixStandsDSum: {
                        cn: '可用系留机位数量（D类）',
                        en: 'estAviFixStandsDSum'
                    },eowOcpStandsESum: {
                        cn: '已占用机位数量（E类）',
                        en: 'eowOcpStandsESum'
                    },eowAviStandsESum: {
                        cn: '当前空余机位数量（E类）',
                        en: 'eowAviStandsESum'
                    },estOcpStandsESum: {
                        cn: '预占用机位数量（E类）',
                        en: 'estOcpStandsESum'
                    },estAviStandsESum: {
                        cn: '预计空余机位数量（E类）',
                        en: 'estAviStandsESum'
                    },estAviCPLStandsESum: {
                        cn: '可用备降机位数量（E类）',
                        en: 'estAviCPLStandsESum'
                    },estAviFixStandsESum: {
                        cn: '可用系留机位数量（E类）',
                        en: 'estAviFixStandsESum'
                    },nowOcpStandsFSum: {
                        cn: '已占用机位数量（F类）',
                        en: 'nowOcpStandsFSum'
                    },nowAviStandsFSum: {
                        cn: '当前空余机位数量（F类）',
                        en: 'nowAviStandsFSum'
                    },estOcpStandsFSum: {
                        cn: '预占用机位数量（F类）',
                        en: 'estOcpStandsFSum'
                    },estAviStandsFSum: {
                        cn: '预计空余机位数量（F类）',
                        en: 'estAviStandsFSum'
                    },estAviCPLStandsFSum : {
                        cn: '可用备降机位数量（F类）',
                        en: 'estAviCPLStandsFSum'
                    },estAviFixStandsFSum: {
                        cn: '可用系留机位数量（F类）',
                        en: 'estAviFixStandsFSum'
                    }
                },
                'FPDI': {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    },callSign: {
                        cn: '航空器识别标志',
                        en: 'callSign'
                    },GUFI: {
                        cn: '全球航班唯一标识符',
                        en: 'GUFI'
                    },regNumber: {
                        cn: '注册号',
                        en: 'regNumber'
                    },SOBT: {
                        cn: '计划离港时间',
                        en: 'SOBT'
                    },EOBT: {
                        cn: '预计撤轮档时间',
                        en: 'EOBT'
                    },depAP: {
                        cn: '起飞机场',
                        en: 'depAP'
                    },arrAP: {
                        cn: '目的地机场',
                        en: 'arrAP'
                    },stand: {
                        cn: '离港航班停机位',
                        en: 'stand'
                    },gate: {
                        cn: '航班登机口',
                        en: 'gate'
                    },startBoradingTime: {
                        cn: '开始登机时间',
                        en: 'startBoradingTime'
                    },endBoardingTime: {
                        cn: '完成登机时间',
                        en: 'endBoardingTime'
                    },startLuggageTime: {
                        cn: '开始装载行李时间',
                        en: 'startLuggageTime'
                    },endLuggageTime: {
                        cn: '完成行李装载时间',
                        en: 'endLuggageTime'
                    },startCateringTime: {
                        cn: '开始配餐时间',
                        en: 'startCateringTime'
                    },endCateringTime: {
                        cn: '完成配餐时间',
                        en: 'endCateringTime'
                    },startWaterTime: {
                        cn: '开始加清水时间',
                        en: 'startWaterTime'
                    },endWaterTime: {
                        cn: '完成加清水时间',
                        en: 'endWaterTime'
                    },startSewageTime: {
                        cn: '开始排污时间',
                        en: 'startSewageTime'
                    },endSewageTime: {
                        cn: '完成排污时间',
                        en: 'endSewageTime'
                    },startCleanTime: {
                        cn: '开始保洁时间',
                        en: 'startCleanTime'
                    },endCleanTime: {
                        cn: '完成保洁时间',
                        en: 'endCleanTime'
                    },startFuelTime: {
                        cn: '开始供油时间',
                        en: 'startFuelTime'
                    },endFuelTime: {
                        cn: '完成供油时间',
                        en: 'endFuelTime'
                    },startDeiceTime: {
                        cn: '开始除冰时间',
                        en: 'startDeiceTime'
                    },endDeiceTime: {
                        cn: '完成除冰时间',
                        en: 'endDeiceTime'
                    },aeroBridgeOffTime: {
                        cn: '离桥时间',
                        en: 'aeroBridgeOffTime'
                    },depPassengerStepsOffTime: {
                        cn: '离港客梯车撤离时间',
                        en: 'depPassengerStepsOffTime'
                    },actualDepatureTime: {
                        cn: '实际离港时间',
                        en: 'actualDepatureTime'
                    },trailerInPlaceTime: {
                        cn: '拖车到位时间',
                        en: 'trailerInPlaceTime'
                    },depShuttleOffTime: {
                        cn: '离港摆渡车撤离时间',
                        en: 'depShuttleOffTime'
                    },securityCheckedPassangerSum: {
                        cn: '过安检旅客人数',
                        en: 'securityCheckedPassangerSum'
                    }
                },
                'FPAI': {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    },callSign: {
                        cn: '航空器识别标志',
                        en: 'callSign'
                    },GUFI: {
                        cn: '全球航班唯一标识符',
                        en: 'GUFI'
                    },regNumber: {
                        cn: '注册号',
                        en: 'regNumber'
                    },SOBT: {
                        cn: '计划离港时间',
                        en: 'SOBT'
                    },EOBT: {
                        cn: '预计撤轮档时间',
                        en: 'EOBT'
                    },depAP: {
                        cn: '起飞机场',
                        en: 'depAP'
                    },arrAP: {
                        cn: '目的地机场',
                        en: 'arrAP'
                    },stand: {
                        cn: '到港航班停机位',
                        en: 'stand'
                    },gate: {
                        cn: '航班到达口',
                        en: 'gate'
                    },actualArrivalTime: {
                        cn: '实际到港时间',
                        en: 'actualArrivalTime'
                    },aeroBridgeOnTime: {
                        cn: '靠桥时间',
                        en: 'aeroBridgeOnTime'
                    },arrPassengerStepsOnTime: {
                        cn: '进港客梯车对接时间',
                        en: 'arrPassengerStepsOnTime'
                    },arrShuttleReadyTime: {
                        cn: '进港摆渡车到位时间',
                        en: 'arrShuttleReadyTime'
                    },startUnBoardTime: {
                        cn: '开始下客时间',
                        en: 'startUnBoardTime'
                    },endUnBoardTime: {
                        cn: '完成下客时间',
                        en: 'endUnBoardTime'
                    }
                },
                'PPCI': {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    },airportNameEN: {
                        cn: '机场英文名称',
                        en: 'airportNameEN'
                    },date: {
                        cn: '日期',
                        en: 'date'
                    },depPassengerSum: {
                        cn: '出港旅客总人数',
                        en: 'depPassengerSum'
                    },arrPassengerSum: {
                        cn: '进港旅客总人数',
                        en: 'arrPassengerSum'
                    }
                },
            },
            'ALOI' : {
                'FLGH'  : {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    },callSign: {
                        cn: '航空器识别标志',
                        en: 'callSign'
                    },GUFI: {
                        cn: '全球航班唯一标识符',
                        en: 'GUFI'
                    },regNumber: {
                        cn: '注册号',
                        en: 'regNumber'
                    },SOBT: {
                        cn: '计划离港时间',
                        en: 'SOBT'
                    },EOBT: {
                        cn: '预计撤轮档时间',
                        en: 'EOBT'
                    },depAP: {
                        cn: '起飞机场',
                        en: 'depAP'
                    },arrAP: {
                        cn: '目的地机场',
                        en: 'arrAP'
                    },crewReadyTime: {
                        cn: '机组到位时间',
                        en: 'crewReadyTime'
                    },startBoardingTime: {
                        cn: '开始登机时间',
                        en: 'startBoardingTime'
                    },endBoardingTime: {
                        cn: '完成登机时间',
                        en: 'endBoardingTime'
                    },startLuggageTime: {
                        cn: '开始行李装载时间',
                        en: 'startLuggageTime'
                    },endLuggageTime: {
                        cn: '完成行李装载时间',
                        en: 'endLuggageTime'
                    },startCateringTime: {
                        cn: '开始配餐时间',
                        en: 'startCateringTime'
                    },endCateringTime: {
                        cn: '完成配餐时间',
                        en: 'endCateringTime'
                    },startWaterTime: {
                        cn: '开始加清水时间',
                        en: 'startWaterTime'
                    },endWaterTime: {
                        cn: '完成加清水时间',
                        en: 'endWaterTime'
                    },startSewageTime: {
                        cn: '开始排污时间',
                        en: 'startSewageTime'
                    },endSewageTime: {
                        cn: '完成排污时间',
                        en: 'endSewageTime'
                    },startCleanTime: {
                        cn: '开始保洁时间',
                        en: 'startCleanTime'
                    },endCleanTime: {
                        cn: '完成保洁时间',
                        en: 'endCleanTime'
                    },startFuelTime: {
                        cn: '开始供油时间',
                        en: 'startFuelTime'
                    },endFuelTime: {
                        cn: '完成供油时间',
                        en: 'endFuelTime'
                    },startDeiceTime: {
                        cn: '开始除冰时间',
                        en: 'startDeiceTime'
                    },endDeiceTime: {
                        cn: '完成除冰时间',
                        en: 'endDeiceTime'
                    },aeroBridgeOffTime: {
                        cn: '离桥时间',
                        en: 'aeroBridgeOffTime'
                    },aeroBridgeOnTime: {
                        cn: '靠桥时间',
                        en: 'aeroBridgeOnTime'
                    },depPassengerStepsOffTime: {
                        cn: '离港客梯车撤离时间',
                        en: 'depPassengerStepsOffTime'
                    },arrPassengerStepsOnTime: {
                        cn: '进港客梯车对接时间',
                        en: 'arrPassengerStepsOnTime'
                    },depShuttleOffTime: {
                        cn: '离港摆渡车撤离时间',
                        en: 'depShuttleOffTime'
                    },arrShuttleReadyTime: {
                        cn: '进港摆渡车到位时间',
                        en: 'arrShuttleReadyTime'
                    },trailerReadyTime: {
                        cn: '拖车到位时间',
                        en: 'trailerReadyTime'
                    },startUnBoardTime: {
                        cn: '开始下客时间',
                        en: 'startUnBoardTime'
                    },endUnBoardTime: {
                        cn: '完成下客时间',
                        en: 'endUnBoardTime'
                    },liftFrontWheelTime: {
                        cn: '抬前轮时间',
                        en: 'liftFrontWheelTime'
                    },landingTime: {
                        cn: '着陆时间',
                        en: 'landingTime'
                    },looseBrakeTime: {
                        cn: '松刹车时间',
                        en: 'looseBrakeTime'
                    },brakeTime: {
                        cn: '刹车时间',
                        en: 'brakeTime'
                    },startTaxiingTime: {
                        cn: '开始滑行时间',
                        en: 'startTaxiingTime'
                    },actualDepatureTime: {
                        cn: '实际离港时间',
                        en: 'actualDepatureTime'
                    },actualArrivalTime: {
                        cn: '实际到港时间',
                        en: 'actualArrivalTime'
                    },actualGateCloseTime: {
                        cn: '实际关舱门时间',
                        en: 'actualGateCloseTime'
                    },actualGateOpenTime: {
                        cn: '实际开舱门时间',
                        en: 'actualGateOpenTime'
                    },enduranceDistance: {
                        cn: '航班续航距离',
                        en: 'enduranceDistance'
                    }

                },'FPLN'  : {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    },callSign: {
                        cn: '航空器识别标志',
                        en: 'callSign'
                    },GUFI: {
                        cn: '全球航班唯一标识符',
                        en: 'GUFI'
                    },regNumber: {
                        cn: '注册号',
                        en: 'regNumber'
                    },SOBT: {
                        cn: '计划离港时间',
                        en: 'SOBT'
                    },EOBT: {
                        cn: '预计撤轮档时间',
                        en: 'EOBT'
                    },depAP: {
                        cn: '起飞机场',
                        en: 'depAP'
                    },arrAP: {
                        cn: '目的地机场',
                        en: 'arrAP'
                    },PLNStatus: {
                        cn: '当日计划变更状态',
                        en: 'PLNStatus'
                    },PLNRegNumber: {
                        cn: '变更航空器注册号',
                        en: 'PLNRegNumber'
                    },PLNAircraftType: {
                        cn: '变更机型',
                        en: 'PLNAircraftType'
                    },PLNDepAp: {
                        cn: '变更离港机场',
                        en: 'PLNDepAp'
                    },PLNSobt: {
                        cn: '变更离港时间',
                        en: 'PLNSobt'
                    },PLNSibt: {
                        cn: '变更进港时间',
                        en: 'PLNSibt'
                    },PLNArrAp: {
                        cn: '变更目的地机场',
                        en: 'PLNArrAp'
                    },remark: {
                        cn: '备注',
                        en: 'remark'
                    }

                },'FPCI'  : {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    },callSign: {
                        cn: '航空器识别标志',
                        en: 'callSign'
                    },GUFI: {
                        cn: '全球航班唯一标识符',
                        en: 'GUFI'
                    },regNumber: {
                        cn: '注册号',
                        en: 'regNumber'
                    },SOBT: {
                        cn: '计划离港时间',
                        en: 'SOBT'
                    },EOBT: {
                        cn: '预计撤轮档时间',
                        en: 'EOBT'
                    },depAP: {
                        cn: '起飞机场',
                        en: 'depAP'
                    },arrAP: {
                        cn: '目的地机场',
                        en: 'arrAP'
                    },checkinPassengerSum: {
                        cn: '已值机旅客人数',
                        en: 'checkinPassengerSum'
                    },boardingPassengerSum: {
                        cn: '已登机旅客人数',
                        en: 'boardingPassengerSum'
                    },passengerDomesticSum: {
                        cn: '国内旅客总人数',
                        en: 'passengerDomesticSum'
                    },passengerInternationalSum: {
                        cn: '国际旅客总人数',
                        en: 'passengerInternationalSum'
                    },passengerAdultSum: {
                        cn: '成年旅客人数',
                        en: 'passengerAdultSum'
                    },passengerChildSum: {
                        cn: '儿童旅客人数',
                        en: 'passengerChildSum'
                    },passengerBabySum: {
                        cn: '婴儿旅客人数',
                        en: 'passengerBabySum'
                    },cargoDomesticWeight: {
                        cn: '国内货物重量',
                        en: 'cargoDomesticWeight'
                    },cargoInternationalWeight: {
                        cn: '国际货物重量',
                        en: 'cargoInternationalWeight'
                    },mailDomesticWeight: {
                        cn: '国内邮件重量',
                        en: 'mailDomesticWeight'
                    },mailInternationalWeight: {
                        cn: '国际邮件重量',
                        en: 'mailInternationalWeight'
                    },luggageDomesticWeight: {
                        cn: '国内行李重量',
                        en: 'luggageDomesticWeight'
                    },luggageInternationalWeight: {
                        cn: '国际行李重量',
                        en: 'luggageInternationalWeight'
                    },luggageDomesticSum: {
                        cn: '国内行李数量',
                        en: 'luggageDomesticSum'
                    },luggageInternationalSum: {
                        cn: '国际行李数量',
                        en: 'luggageInternationalSum'
                    },cargoFreeLoad: {
                        cn: '腹舱剩余载量',
                        en: 'cargoFreeLoad'
                    }

                },'FCRI'  : {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    },callSign: {
                        cn: '航空器识别标志',
                        en: 'callSign'
                    },GUFI: {
                        cn: '全球航班唯一标识符',
                        en: 'GUFI'
                    },regNumber: {
                        cn: '注册号',
                        en: 'regNumber'
                    },SOBT: {
                        cn: '计划离港时间',
                        en: 'SOBT'
                    },EOBT: {
                        cn: '预计撤轮档时间',
                        en: 'EOBT'
                    },depAP: {
                        cn: '起飞机场',
                        en: 'depAP'
                    },arrAP: {
                        cn: '目的地机场',
                        en: 'arrAP'
                    },Name: {
                        cn: '姓名',
                        en: 'Name'
                    },Role: {
                        cn: '职务',
                        en: 'Role'
                    },NewCaptain: {
                        cn: '是否新机长',
                        en: 'NewCaptain'
                    },ForeignCaptain: {
                        cn: '是否为外籍人员',
                        en: 'ForeignCaptain'
                    },Remark: {
                        cn: '备注',
                        en: 'Remark'
                    }, crewILSLevel: {
                        cn: '机组仪表飞行标准',
                        en: 'crewILSLevel'
                    }, crewEstTimeoutTime: {
                        cn: '机组预计超时时间',
                        en: 'crewEstTimeoutTime'
                    }

                },'FACI'  : {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    }, regNumber: {
                        cn: '航空器注册号',
                        en: 'regNumber'
                    }, aircraftType: {
                        cn: '机型',
                        en: 'aircraftType'
                    }, wingSpanLength: {
                        cn: '翼展长度',
                        en: 'wingSpanLength'
                    }, fuselageLength: {
                        cn: '机身长度',
                        en: 'fuselageLength'
                    }, startServiceTime: {
                        cn: '机龄起始时间',
                        en: 'startServiceTime'
                    }
                }
            },
            'ATMI': {
                'FCDM': {
                    id: {
                        cn: 'ID',
                        en: 'ID',
                        width : 110
                    }, callSign: {
                        cn: '航空器识别标志',
                        en: 'callSign',
                        width : 110
                    }, GUFI: {
                        cn: '全球航班唯一标识符',
                        en: 'GUFI',
                        width : 110
                    }, regNumber: {
                        cn: '注册号',
                        en: 'regNumber',
                        width : 110
                    }, SOBT: {
                        cn: '计划离港时间',
                        en: 'SOBT',
                        width : 110
                    }, EOBT: {
                        cn: '预计撤轮档时间',
                        en: 'EOBT',
                        width : 110
                    }, depAP: {
                        cn: '起飞机场',
                        en: 'depAP',
                        width : 110
                    }, arrAP: {
                        cn: '目的地机场',
                        en: 'arrAP',
                        width : 110
                    }, CTOT: {
                        cn: '计算起飞时间',
                        en: 'CTOT',
                        width : 110
                    }, COBT: {
                        cn: '计算撤轮挡时间',
                        en: 'COBT',
                        width : 110
                    }, TOBT: {
                        cn: '目标撤轮挡时间',
                        en: 'TOBT',
                        width : 110
                    }, TSAT: {
                        cn: '目标许可开车时间',
                        en: 'TSAT',
                        width : 110
                    }, reason: {
                        cn: '航班受控原因',
                        en: 'reason',
                        width : 110
                    }
                },
                'FTMI': {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    }, FTMID: {
                        cn: '流控标识',
                        en: 'FTMID'
                    }, publishArea: {
                        cn: '流控发布地区',
                        en: 'publishArea'
                    }, publishUnit: {
                        cn: '流控发布单位',
                        en: 'publishUnit'
                    }, acceptUnit: {
                        cn: '流控接受单位',
                        en: 'acceptUnit'
                    }, applyTime: {
                        cn: '流控申请时间',
                        en: 'applyTime'
                    }, publicTime: {
                        cn: '流控发布时间',
                        en: 'publicTime'
                    }, fix: {
                        cn: '交接点',
                        en: 'fix'
                    }, scope: {
                        cn: '流控影响范围',
                        en: 'scope'
                    }, seperationValue: {
                        cn: '流控间隔数值',
                        en: 'seperationValue'
                    }, seperationUnit: {
                        cn: '流控间隔单位',
                        en: 'seperationUnit'
                    }, FLScope: {
                        cn: '高度要求',
                        en: 'FLScope'
                    }, exempt: {
                        cn: '流控豁免范围',
                        en: 'exempt'
                    }, startTime: {
                        cn: '流控开始时间',
                        en: 'startTime'
                    }, endTime: {
                        cn: '流控结束时间',
                        en: 'endTime'
                    }, reason: {
                        cn: 'reason',
                        en: 'reason'
                    }, targetArea: {
                        cn: '事发地',
                        en: 'targetArea'
                    }
                },
                'PADR': {
                    id: {
                        cn: 'ID',
                        en: 'ID',
                        width : 130
                    }, airportNameEN: {
                        cn: '机场英文名称',
                        en: 'airportNameEN',
                        width : 130
                    }, date: {
                        cn: '日期',
                        en: 'date',
                        width : 130
                    }, startTime: {
                        cn: '开始时间',
                        en: 'startTime',
                        width : 130
                    }, endTime: {
                        cn: '终止时间',
                        en: 'endTime',
                        width : 130
                    }, depRunWay: {
                        cn: '起飞跑道',
                        en: 'depRunWay',
                        width : 130
                    }, arrRunWay: {
                        cn: '落地跑道',
                        en: 'arrRunWay',
                        width : 130
                    }, APCPT: {
                        cn: '机场容量',
                        en: 'APCPT',
                        width : 130
                    }, ARR: {
                        cn: '接受率',
                        en: 'ARR',
                        width : 130
                    }, ADR: {
                        cn: '离场率',
                        en: 'ADR',
                        width : 130
                    }, remark: {
                        cn: '备注',
                        en: 'remark',
                        width : 130
                    }
                },
                'MDRS': {
                    id: {
                        cn: 'ID',
                        en: 'ID',
                        width : 130
                    }, MDRSIdentification: {
                        cn: 'MDRS标识',
                        en: 'MDRSIdentification',
                        width : 130
                    }, MDRSName: {
                        cn: 'MDRS通告名称',
                        en: 'MDRSName',
                        width : 130
                    }, MDRSPublishTime: {
                        cn: 'MDRS发布时间',
                        en: 'MDRSPublishTime',
                        width : 130
                    }, MDRSPublishUnit: {
                        cn: 'MDRS发布单位',
                        en: 'MDRSPublishUnit',
                        width : 130
                    }, MDRSLevel: {
                        cn: 'MDRS延误等级',
                        en: 'MDRSLevel',
                        width : 130
                    }, MDRSArea: {
                        cn: 'MDRS延误区域',
                        en: 'MDRSArea',
                        width : 130
                    }, MDRSTimeScope: {
                        cn: 'MDRS延误时段',
                        en: 'MDRSTimeScope',
                        width : 130
                    }, MDRSReason: {
                        cn: 'MDRS延误原因',
                        en: 'MDRSReason',
                        width : 130
                    }, MDRSExpectInfluence: {
                        cn: 'MDRS预期影响',
                        en: 'MDRSExpectInfluence',
                        width : 130
                    }, MDRSExpectRespond: {
                        cn: 'MDRS预期响应',
                        en: 'MDRSExpectRespond',
                        width : 130
                    }
                },
                'SECT': {
                    id: {
                        cn: 'ID',
                        en: 'ID',
                        width : 475
                    }, sectorIdentification: {
                        cn: '扇区标识',
                        en: 'sectorIdentification',
                        width : 475
                    }, mergedSector: {
                        cn: '被合并扇区',
                        en: 'mergedSector',
                        width : 475
                    }
                },
            },
            'OSCI' : {
                'FOSC' : {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    },callSign: {
                        cn: '航空器识别标志',
                        en: 'callSign'
                    },GUFI: {
                        cn: '全球航班唯一标识符',
                        en: 'GUFI'
                    },regNumber: {
                        cn: '注册号',
                        en: 'regNumber'
                    },SOBT: {
                        cn: '计划离港时间',
                        en: 'SOBT'
                    },EOBT: {
                        cn: '预计撤轮档时间',
                        en: 'EOBT'
                    },depAP: {
                        cn: '起飞机场',
                        en: 'depAP'
                    },arrAP: {
                        cn: '目的地机场',
                        en: 'arrAP'
                    },missionDate: {
                        cn: '计划执行日期',
                        en: 'missionDate'
                    },SDepAP: {
                        cn: '计划起飞机场',
                        en: 'SDepAP'
                    },SOBT: {
                        cn: '计划离港时间',
                        en: 'SOBT'
                    },SArrAP: {
                        cn: '计划目的地机场',
                        en: 'SArrAP'
                    },SIBT: {
                        cn: '计划到港时间',
                        en: 'SIBT'
                    },SAircraftType: {
                        cn: '计划机型',
                        en: 'SAircraftType'
                    },STask: {
                        cn: '计划任务性质',
                        en: 'STask'
                    },status: {
                        cn: '航班执行状态',
                        en: 'status'
                    },PDepAP: {
                        cn: '预计起飞机场',
                        en: 'PDepAP'
                    },EOBT: {
                        cn: '预计撤轮档时间',
                        en: 'EOBT'
                    },EET: {
                        cn: '预计总飞行时间',
                        en: 'EET'
                    },PArrAP: {
                        cn: '预计目的地机场',
                        en: 'PArrAP'
                    },ALNAP: {
                        cn: '预计备降机场',
                        en: 'ALNAP'
                    },RAircraftType: {
                        cn: '实际机型',
                        en: 'RAircraftType'
                    },executeDate: {
                        cn: '实际执行日期',
                        en: 'executeDate'
                    },RDepAP: {
                        cn: '实际起飞机场',
                        en: 'RDepAP'
                    },ATOT: {
                        cn: '实际起飞时间',
                        en: 'ATOT'
                    },RArrAP: {
                        cn: '实际落地机场',
                        en: 'RArrAP'
                    },ALDT: {
                        cn: '实际落地时间',
                        en: 'ALDT'
                    },regNumber: {
                        cn: '航空器注册号',
                        en: 'regNumber'
                    }
                },
                'FPER' : {
                    id: {
                        cn: 'ID',
                        en: 'ID',
                        width : 110
                    },callSign: {
                        cn: '航空器识别标志',
                        en: 'callSign',
                        width : 110
                    },GUFI: {
                        cn: '全球航班唯一标识符',
                        en: 'GUFI',
                        width : 110
                    },regNumber: {
                        cn: '注册号',
                        en: 'regNumber',
                        width : 110
                    },SOBT: {
                        cn: '计划离港时间',
                        en: 'SOBT',
                        width : 110
                    },EOBT: {
                        cn: '预计撤轮档时间',
                        en: 'EOBT',
                        width : 110
                    },depAP: {
                        cn: '起飞机场',
                        en: 'depAP',
                        width : 110
                    },arrAP: {
                        cn: '目的地机场',
                        en: 'arrAP',
                        width : 110
                    },ETA: {
                        cn: '航班预达时间',
                        en: 'ETA',
                        width : 110
                    },delayTime: {
                        cn: '航班延误时间',
                        en: 'delayTime',
                        width : 110
                    },closeWaitTime: {
                        cn: '关舱门后等待时间',
                        en: 'closeWaitTime',
                        width : 110
                    },AXIT: {
                        cn: '航班进港滑行时间',
                        en: 'AXIT',
                        width : 110
                    },AXOT: {
                        cn: '航班离港滑行时间',
                        en: 'AXOT',
                        width : 110
                    }
                },
                'PPER' : {
                    id: {
                        cn: 'ID',
                        en: 'ID'
                    }, airportNameEN: {
                        cn: '机场英文名称',
                        en: 'airportNameEN'
                    }, hourlySchDepSum: {
                        cn: '机场小时计划离港架次',
                        en: 'hourlySchDepSum',
                        width : 320
                    }, hourlySchArrSum: {
                        cn: '机场小时计划进港架次',
                        en: 'hourlySchArrSum',
                        width : 320
                    }, hourlyActTakeOffSum: {
                        cn: '机场小时实际起飞架次',
                        en: 'hourlyActTakeOffSum',
                        width : 320
                    }, hourlyActLandingSum: {
                        cn: '机场小时实际落地架次',
                        en: 'hourlyActLandingSum',
                        width : 320
                    }, hourlyActTakeOffPunctualityRate: {
                        cn: '小时实际起飞正常率',
                        en: 'hourlyActTakeOffPunctualityRate',
                        width : 320
                    }, dailyActTakeOffPunctualityRate: {
                        cn: '当日实际起飞正常率',
                        en: 'dailyActTakeOffPunctualityRate'
                    }, hourlySchTakeOffPunctualityRate: {
                        cn: '小时计划起飞正常率',
                        en: 'hourlySchTakeOffPunctualityRate',
                        width : 320
                    }, dailySchTakeOffPunctualityRate: {
                        cn: '当日计划起飞正常率',
                        en: 'dailySchTakeOffPunctualityRate'
                    }, hourlyActDepPunctualityRate: {
                        cn: '小时实际离港正常率',
                        en: 'hourlyActDepPunctualityRate',
                        width : 320
                    }, dailyActDepPunctualityRate: {
                        cn: '当日实际离港正常率',
                        en: 'dailyActDepPunctualityRate'
                    }, hourlySchDepPunctualityRate: {
                        cn: '小时计划离港正常率',
                        en: 'hourlySchDepPunctualityRate',
                        width : 320
                    }, dailySchDepPunctualityRate: {
                        cn: '当日计划离港正常率',
                        en: 'dailySchDepPunctualityRate'
                    }, hourlyOriActTakeOffPunctualityRate: {
                        cn: '小时始发航班实际起飞正常率',
                        en: 'hourlyOriActTakeOffPunctualityRate',
                        width : 320
                    }, dailyOriActTakeOffPunctualityRate: {
                        cn: '当日始发航班实际起飞正常率',
                        en: 'dailyOriActTakeOffPunctualityRate'
                    }, hourlyOriSchTakeOffPunctualityRate: {
                        cn: '小时始发航班计划起飞正常率',
                        en: 'hourlyOriSchTakeOffPunctualityRate',
                        width : 320
                    }, dailyOriSchTakeOffPunctualityRate: {
                        cn: '当日始发航班计划起飞正常率',
                        en: 'dailyOriSchTakeOffPunctualityRate'
                    }, hourlyActClearancePunctualityRate: {
                        cn: '小时机场实际放行正常率',
                        en: 'hourlyActClearancePunctualityRate',
                        width : 320
                    }, dailyActClearancePunctualityRate: {
                        cn: '当日机场实际放行正常率',
                        en: 'dailyActClearancePunctualityRate'
                    }, hourlySchClearancePunctualityRate: {
                        cn: '机场计划放行正常率',
                        en: 'hourlySchClearancePunctualityRate',
                        width : 320
                    }, dailySchClearancePunctualityRate: {
                        cn: '当日机场计划放行正常率',
                        en: 'dailySchClearancePunctualityRate'
                    }, hourlyActLandingPunctualityRate: {
                        cn: '小时实际落地正常率',
                        en: 'hourlyActLandingPunctualityRate',
                        width : 320
                    }, dailyActLandingPunctualityRate: {
                        cn: '当日实际落地正常率',
                        en: 'dailyActLandingPunctualityRate'
                    },hourlySchLandingPunctualityRate: {
                        cn: '小时计划落地正常率',
                        en: 'hourlySchLandingPunctualityRate',
                        width : 320
                    }, dailySchLandingPunctualityRate: {
                        cn: '当日计划落地正常率',
                        en: 'dailySchLandingPunctualityRate'
                    }, hourlyActArrPunctualityRate: {
                        cn: '小时实际到港正常率',
                        en: 'hourlyActArrPunctualityRate',
                        width : 320
                    }, dailyActArrPunctualityRate: {
                        cn: '当日实际到港正常率',
                        en: 'dailyActArrPunctualityRate'
                    },hourlySchArrPunctualityRate: {
                        cn: '小时计划到港正常率',
                        en: 'hourlySchArrPunctualityRate',
                        width : 320
                    }, dailySchArrPunctualityRate: {
                        cn: '当日计划到港正常率',
                        en: 'dailySchArrPunctualityRate'
                    }
                }
            }
        },
        display: {},
        colModel: {},
        title: {},
        cmTemplate: {
            width: 100,
            align: 'center',
            sortable: true,
            search: true,
            searchoptions : {
                sopt : ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','in','ni','ew','en'],
                dataEvents:[{
                    type: 'keyup',
                    fn: function(e) {
                        $(this).change();
                    }
                }]
            },
        }
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
     * 初始化表格配置
     * */
    var initTableOption = function (obj) {
        for(var i in obj){
            tableObj.colModel[i] = {};
            tableObj.display[i] = {};
            tableObj.title[i] = {};
            var item = obj[i];
            for(var k in item){
                var o = item[k];
                tableObj.colModel[i][k] = {};
                tableObj.display[i][k] = {};
                tableObj.title[i][k] = {};
                for(var j in o){
                    var val = o[j];
                    tableObj.colModel[i][k][j] = {name: j};
                    if($.isValidVariable(val.width)){
                        tableObj.colModel[i][k][j]['width'] =  val.width;
                    }
                    tableObj.display[i][k][j] = {display : 1};
                    tableObj.title[i][k][j] = val.cn;
                }
            }
        };
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
            //初始化表格配置
            initTableOption(tableObj.colName);
        },
        historyDataTypeObj : historyDataTypeObj,
        operatingDataTypeObj : operatingDataTypeObj,
        tableObj : tableObj
    }
}();

$(document).ready(function () {
    BasicData.init();
});