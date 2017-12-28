var BasicData = function () {

  // 历史数据统计模块类型集合
  var historyDataTypeObj = {
    //类型数值
    val: ['APOI', 'ALOI', 'ATMI', 'OSCI'],
    //类型数值中文
    valCN: ['机场运行信息', '航空公司运行信息', '空管运行信息', '监控中心运行信息'],
    // 类型数据中文标签
    label: ['机场', '航空公司', '空管', '监控中心'],
    // 类型集合
    result: {
      'APOI': {
        subtype: {
          'PSNI': '机场机位信息',
          'FPDI': '机场离港航班信息',
          'FPAI': '机场到港航班信息',
          'PPCI': '机场客货信息'
        },
        unit: {},
      },
      'ALOI': {
        subtype: {
          'FLGH': '航班地面状态信息',
          'FPLN': '航班计划变更信息',
          'FPCI': '航班客货信息',
          'FCRI': '航班机组人员信息',
          // 'FACI' : '航空器信息'
        },
        unit: {}
      },
      'ATMI': {
        subtype: {
          'FCDM': '航班CDM信息',
          'FTMI': '流量控制措施信息',
          'PADR': '机场通行能力信息',
          'MDRS': 'MDRS信息',
          'SECT': '扇区开放合并信息'
        },
        unit: {
          'ATMB': '空管局'
        }
      },
      'OSCI': {
        subtype: {
          'FOSC': '航班计划动态信息',
          'FPER': '航班统计信息',
          'PPER': '机场统计信息'

        },
        unit: {
          'OMCCAAC': '监控中心'
        }
      }
    }
  };
  //运行数据查询模块类型集合
  var operatingDataTypeObj = {
    val: ['APOI', 'ALOI', 'ATMI', 'OSCI'],
    valCN: ['机场运行信息', '航空公司运行信息', '空管运行信息', '监控中心运行信息'],
    label: ['机场', '航空公司', '空管', '监控中心'],
    result: {
      'APOI': {
        subtype: {
          'PSNI': '机场机位信息',
          'FPDI': '机场离港航班信息',
          'FPAI': '机场到港航班信息',
          'PPCI': '机场客货信息'
        },
        unit: {},
      },
      'ALOI': {
        subtype: {
          'FLGH': '航班地面状态信息',
          'FPLN': '航班计划变更信息',
          'FPCI': '航班客货信息',
          'FCRI': '航班机组人员信息',
          'FACI': '航空器信息'
        },
        unit: {}
      },
      'ATMI': {
        subtype: {
          'FCDM': '航班CDM信息',
          'FTMI': '流量控制措施信息',
          'PADR': '机场通行能力信息',
          'MDRS': 'MDRS信息',
          'SECT': '扇区开放合并信息'
        },
        unit: {
          'ATMB': '空管局'
        }
      },
      'OSCI': {
        subtype: {
          'FOSC': '航班计划动态信息',
          'FPER': '航班统计信息',
          'PPER': '机场统计信息'

        },
        unit: {
          'OMCCAAC': '监控中心'
        }
      }
    },
    unitURL: {
      'APOI': iphost + "shareDataPlatform/allAirport",
      'ALOI': iphost + "shareDataPlatform/allCompany"
    }
  };

  /**
   * 运行数据查询模块各类型对应表格参数配置
   *
   * */
  var tableObj = {
    colName: {
      'APOI': {
        'PSNI': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, airportNameEN: {
            cn: '机场英文名称',
            en: 'airportNameEN'
          }, startTime: {
            cn: '开始时间',
            en: 'startTime',
            width: 200,
            formatter: timeFormater
          }, endTime: {
            cn: '终止时间',
            en: 'endTime',
            width: 200,
            formatter: timeFormater
          }, nowOcpStandsASum: {
            cn: '已占用机位数量（A类）',
            en: 'nowOcpStandsASum',
            width: 240
          }, nowAviStandsASum: {
            cn: '当前空余机位数量（A类）',
            en: 'nowAviStandsASum',
            width: 240
          }, estOcpStandsASum: {
            cn: '预占用机位数量（A类）',
            en: 'estOcpStandsASum',
            width: 240
          }, estAviStandsASum: {
            cn: '预计空余机位数量（A类）',
            en: 'estAviStandsASum',
            width: 240
          }, estAviCPLStandsASum: {
            cn: '可用备降机位数量（A类）',
            en: 'estAviCPLStandsASum',
            width: 240
          }, estAviFixStandsASum: {
            cn: '可用系留机位数量（A类）',
            en: 'estAviFixStandsASum',
            width: 240
          }, nowOcpStandsBSum: {
            cn: '已占用机位数量（B类）',
            en: 'nowOcpStandsBSum',
            width: 240
          }, nowAviStandsBSum: {
            cn: '当前空余机位数量（B类）',
            en: 'nowAviStandsBSum',
            width: 240
          }, estOcpStandsBSum: {
            cn: '预占用机位数量（B类）',
            en: 'estOcpStandsBSum',
            width: 240
          }, nstAviStandsBSum: {
            cn: '预计空余机位数量（B类）',
            en: 'nstAviStandsBSum',
            width: 240
          }, estAviCPLStandsBSum: {
            cn: '可用备降机位数量（B类）',
            en: 'estAviCPLStandsBSum',
            width: 240
          }, estAviFixStandsBSum: {
            cn: '可用系留机位数量（B类）',
            en: 'estAviFixStandsBSum',
            width: 240
          }, nowOcpStandsCSum: {
            cn: '已占用机位数量（C类）',
            en: 'nowOcpStandsCSum',
            width: 240
          }, nowAviStandsCSum: {
            cn: '当前空余机位数量（C类）',
            en: 'nowAviStandsCSum',
            width: 240
          }, estOcpStandsCSum: {
            cn: '预占用机位数量（C类）',
            en: 'estOcpStandsCSum',
            width: 200
          }, estAviStandsCSum: {
            cn: '预计空余机位数量（C类）',
            en: 'estAviStandsCSum',
            width: 240
          }, estAviCPLStandsCSum: {
            cn: '可用备降机位数量（C类）',
            en: 'estAviCPLStandsCSum',
            width: 240
          }, estAviFixStandsCSum: {
            cn: '可用系留机位数量（C类）',
            en: 'estAviFixStandsCSum',
            width: 240
          }, nowOcpStandsDSum: {
            cn: '已占用机位数量（D类）',
            en: 'nowOcpStandsDSum',
            width: 240
          }, nowAviStandsDSum: {
            cn: '当前空余机位数量（D类）',
            en: 'nowAviStandsDSum',
            width: 240
          }, estOcpStandsDSum: {
            cn: '预占用机位数量（D类）',
            en: 'estOcpStandsDSum',
            width: 240
          }, estAviStandsDSum: {
            cn: '预计空余机位数量（D类）',
            en: 'estAviStandsDSum',
            width: 240
          }, estAviCPLStandsDSum: {
            cn: '可用备降机位数量（D类）',
            en: 'estAviCPLStandsDSum',
            width: 240
          }, estAviFixStandsDSum: {
            cn: '可用系留机位数量（D类）',
            en: 'estAviFixStandsDSum',
            width: 240
          }, eowOcpStandsESum: {
            cn: '已占用机位数量（E类）',
            en: 'eowOcpStandsESum',
            width: 240
          }, eowAviStandsESum: {
            cn: '当前空余机位数量（E类）',
            en: 'eowAviStandsESum',
            width: 240
          }, estOcpStandsESum: {
            cn: '预占用机位数量（E类）',
            en: 'estOcpStandsESum',
            width: 240
          }, estAviStandsESum: {
            cn: '预计空余机位数量（E类）',
            en: 'estAviStandsESum',
            width: 240
          }, estAviCPLStandsESum: {
            cn: '可用备降机位数量（E类）',
            en: 'estAviCPLStandsESum',
            width: 240
          }, estAviFixStandsESum: {
            cn: '可用系留机位数量（E类）',
            en: 'estAviFixStandsESum',
            width: 240
          }, nowOcpStandsFSum: {
            cn: '已占用机位数量（F类）',
            en: 'nowOcpStandsFSum',
            width: 240
          }, nowAviStandsFSum: {
            cn: '当前空余机位数量（F类）',
            en: 'nowAviStandsFSum',
            width: 240
          }, estOcpStandsFSum: {
            cn: '预占用机位数量（F类）',
            en: 'estOcpStandsFSum',
            width: 240
          }, estAviStandsFSum: {
            cn: '预计空余机位数量（F类）',
            en: 'estAviStandsFSum',
            width: 240
          }, estAviCPLStandsFSum: {
            cn: '可用备降机位数量（F类）',
            en: 'estAviCPLStandsFSum',
            width: 240
          }, estAviFixStandsFSum: {
            cn: '可用系留机位数量（F类）',
            en: 'estAviFixStandsFSum',
            width: 240
          }
        },
        'FPDI': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, callSign: {
            cn: '航空器识别标志',
            en: 'callSign',
            width: 200
          }, GUFI: {
            cn: '全球航班唯一标识符',
            en: 'GUFI',
            width: 200
          }, regNumber: {
            cn: '注册号',
            en: 'regNumber'
          }, SOBT: {
            cn: '计划离港时间',
            en: 'SOBT',
            formatter: timeFormater,
            width: 200
          }, EOBT: {
            cn: '预计撤轮档时间',
            en: 'EOBT',
            formatter: timeFormater,
            width: 200
          }, depAP: {
            cn: '起飞机场',
            en: 'depAP'
          }, arrAP: {
            cn: '目的地机场',
            en: 'arrAP'
          }, stand: {
            cn: '离港航班停机位',
            en: 'stand',
            width: 200
          }, gate: {
            cn: '航班登机口',
            en: 'gate'
          }, startBoradingTime: {
            cn: '开始登机时间',
            en: 'startBoradingTime',
            formatter: timeFormater,
            width: 200
          }, endBoardingTime: {
            cn: '完成登机时间',
            en: 'endBoardingTime',
            formatter: timeFormater,
            width: 200
          }, startLuggageTime: {
            cn: '开始装载行李时间',
            en: 'startLuggageTime',
            formatter: timeFormater,
            width: 200
          }, endLuggageTime: {
            cn: '完成行李装载时间',
            en: 'endLuggageTime',
            formatter: timeFormater,
            width: 200
          }, startCateringTime: {
            cn: '开始配餐时间',
            en: 'startCateringTime',
            formatter: timeFormater,
            width: 200
          }, endCateringTime: {
            cn: '完成配餐时间',
            en: 'endCateringTime',
            formatter: timeFormater,
            width: 200
          }, startWaterTime: {
            cn: '开始加清水时间',
            en: 'startWaterTime',
            formatter: timeFormater,
            width: 200
          }, endWaterTime: {
            cn: '完成加清水时间',
            en: 'endWaterTime',
            formatter: timeFormater,
            width: 200
          }, startSewageTime: {
            cn: '开始排污时间',
            en: 'startSewageTime',
            formatter: timeFormater,
            width: 200
          }, endSewageTime: {
            cn: '完成排污时间',
            en: 'endSewageTime',
            formatter: timeFormater,
            width: 200
          }, startCleanTime: {
            cn: '开始保洁时间',
            en: 'startCleanTime',
            formatter: timeFormater,
            width: 200
          }, endCleanTime: {
            cn: '完成保洁时间',
            en: 'endCleanTime',
            formatter: timeFormater,
            width: 200
          }, startFuelTime: {
            cn: '开始供油时间',
            en: 'startFuelTime',
            formatter: timeFormater,
            width: 200
          }, endFuelTime: {
            cn: '完成供油时间',
            en: 'endFuelTime',
            formatter: timeFormater,
            width: 200
          }, startDeiceTime: {
            cn: '开始除冰时间',
            en: 'startDeiceTime',
            formatter: timeFormater,
            width: 200
          }, endDeiceTime: {
            cn: '完成除冰时间',
            en: 'endDeiceTime',
            formatter: timeFormater,
            width: 200
          }, aeroBridgeOffTime: {
            cn: '离桥时间',
            en: 'aeroBridgeOffTime',
            formatter: timeFormater,
            width: 200
          }, depPassengerStepsOffTime: {
            cn: '离港客梯车撤离时间',
            en: 'depPassengerStepsOffTime',
            formatter: timeFormater,
            width: 200
          }, actualDepatureTime: {
            cn: '实际离港时间',
            en: 'actualDepatureTime',
            formatter: timeFormater,
            width: 200
          }, trailerInPlaceTime: {
            cn: '拖车到位时间',
            en: 'trailerInPlaceTime',
            formatter: timeFormater,
            width: 200
          }, depShuttleOffTime: {
            cn: '离港摆渡车撤离时间',
            en: 'depShuttleOffTime',
            formatter: timeFormater,
            width: 200
          }, securityCheckedPassangerSum: {
            cn: '过安检旅客人数',
            en: 'securityCheckedPassangerSum',
            width: 200
          }
        },
        'FPAI': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, callSign: {
            cn: '航空器识别标志',
            en: 'callSign',
            width: 200
          }, GUFI: {
            cn: '全球航班唯一标识符',
            en: 'GUFI',
            width: 200
          }, regNumber: {
            cn: '注册号',
            en: 'regNumber'
          }, SOBT: {
            cn: '计划离港时间',
            en: 'SOBT',
            formatter: timeFormater,
            width: 200
          }, EOBT: {
            cn: '预计撤轮档时间',
            en: 'EOBT',
            formatter: timeFormater,
            width: 200
          }, depAP: {
            cn: '起飞机场',
            en: 'depAP',
            width: 200
          }, arrAP: {
            cn: '目的地机场',
            en: 'arrAP',
            width: 200
          }, stand: {
            cn: '到港航班停机位',
            en: 'stand',
            width: 200
          }, gate: {
            cn: '航班到达口',
            en: 'gate',
            width: 200
          }, actualArrivalTime: {
            cn: '实际到港时间',
            en: 'actualArrivalTime',
            formatter: timeFormater,
            width: 200
          }, aeroBridgeOnTime: {
            cn: '靠桥时间',
            en: 'aeroBridgeOnTime',
            formatter: timeFormater,
            width: 200
          }, arrPassengerStepsOnTime: {
            cn: '进港客梯车对接时间',
            en: 'arrPassengerStepsOnTime',
            formatter: timeFormater,
            width: 200
          }, arrShuttleReadyTime: {
            cn: '进港摆渡车到位时间',
            en: 'arrShuttleReadyTime',
            formatter: timeFormater,
            width: 200
          }, startUnBoardTime: {
            cn: '开始下客时间',
            en: 'startUnBoardTime',
            formatter: timeFormater,
            width: 200
          }, endUnBoardTime: {
            cn: '完成下客时间',
            en: 'endUnBoardTime',
            formatter: timeFormater,
            width: 200
          }
        },
        'PPCI': {
          id: {
            cn: 'ID',
            en: 'ID',
            width: 100
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, airportNameEN: {
            cn: '机场英文名称',
            en: 'airportNameEN',
            width: 280
          }, date: {
            cn: '日期',
            en: 'date',
            width: 280
          }, depPassengerSum: {
            cn: '出港旅客总人数',
            en: 'depPassengerSum',
            width: 280
          }, arrPassengerSum: {
            cn: '进港旅客总人数',
            en: 'arrPassengerSum',
            width: 280
          }
        },
      },
      'ALOI': {
        'FLGH': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, callSign: {
            cn: '航空器识别标志',
            en: 'callSign',
            width: 200
          }, GUFI: {
            cn: '全球航班唯一标识符',
            en: 'GUFI',
            width: 200
          }, regNumber: {
            cn: '注册号',
            en: 'regNumber'
          }, SOBT: {
            cn: '计划离港时间',
            en: 'SOBT',
            formatter: timeFormater,
            width: 200
          }, EOBT: {
            cn: '预计撤轮档时间',
            en: 'EOBT',
            formatter: timeFormater,
            width: 200
          }, depAP: {
            cn: '起飞机场',
            en: 'depAP'
          }, arrAP: {
            cn: '目的地机场',
            en: 'arrAP'
          }, crewReadyTime: {
            cn: '机组到位时间',
            en: 'crewReadyTime',
            formatter: timeFormater,
            width: 200
          }, startBoardingTime: {
            cn: '开始登机时间',
            en: 'startBoardingTime',
            formatter: timeFormater,
            width: 200
          }, endBoardingTime: {
            cn: '完成登机时间',
            en: 'endBoardingTime',
            formatter: timeFormater,
            width: 200
          }, startLuggageTime: {
            cn: '开始行李装载时间',
            en: 'startLuggageTime',
            formatter: timeFormater,
            width: 200
          }, endLuggageTime: {
            cn: '完成行李装载时间',
            en: 'endLuggageTime',
            formatter: timeFormater,
            width: 200
          }, startCateringTime: {
            cn: '开始配餐时间',
            en: 'startCateringTime',
            formatter: timeFormater,
            width: 200
          }, endCateringTime: {
            cn: '完成配餐时间',
            en: 'endCateringTime',
            formatter: timeFormater,
            width: 200
          }, startWaterTime: {
            cn: '开始加清水时间',
            en: 'startWaterTime',
            formatter: timeFormater,
            width: 200
          }, endWaterTime: {
            cn: '完成加清水时间',
            en: 'endWaterTime',
            formatter: timeFormater,
            width: 200
          }, startSewageTime: {
            cn: '开始排污时间',
            en: 'startSewageTime',
            formatter: timeFormater,
            width: 200
          }, endSewageTime: {
            cn: '完成排污时间',
            en: 'endSewageTime',
            formatter: timeFormater,
            width: 200
          }, startCleanTime: {
            cn: '开始保洁时间',
            en: 'startCleanTime',
            formatter: timeFormater,
            width: 200
          }, endCleanTime: {
            cn: '完成保洁时间',
            en: 'endCleanTime',
            formatter: timeFormater,
            width: 200
          }, startFuelTime: {
            cn: '开始供油时间',
            en: 'startFuelTime',
            formatter: timeFormater,
            width: 200
          }, endFuelTime: {
            cn: '完成供油时间',
            en: 'endFuelTime',
            formatter: timeFormater,
            width: 200
          }, startDeiceTime: {
            cn: '开始除冰时间',
            en: 'startDeiceTime',
            formatter: timeFormater,
            width: 200
          }, endDeiceTime: {
            cn: '完成除冰时间',
            en: 'endDeiceTime',
            formatter: timeFormater,
            width: 200
          }, aeroBridgeOffTime: {
            cn: '离桥时间',
            en: 'aeroBridgeOffTime',
            formatter: timeFormater,
            width: 200
          }, aeroBridgeOnTime: {
            cn: '靠桥时间',
            en: 'aeroBridgeOnTime',
            formatter: timeFormater,
            width: 200
          }, depPassengerStepsOffTime: {
            cn: '离港客梯车撤离时间',
            en: 'depPassengerStepsOffTime',
            formatter: timeFormater,
            width: 200
          }, arrPassengerStepsOnTime: {
            cn: '进港客梯车对接时间',
            en: 'arrPassengerStepsOnTime',
            formatter: timeFormater,
            width: 200
          }, depShuttleOffTime: {
            cn: '离港摆渡车撤离时间',
            en: 'depShuttleOffTime',
            formatter: timeFormater,
            width: 200
          }, arrShuttleReadyTime: {
            cn: '进港摆渡车到位时间',
            en: 'arrShuttleReadyTime',
            formatter: timeFormater,
            width: 200
          }, trailerReadyTime: {
            cn: '拖车到位时间',
            en: 'trailerReadyTime',
            formatter: timeFormater,
            width: 200
          }, startUnBoardTime: {
            cn: '开始下客时间',
            en: 'startUnBoardTime',
            formatter: timeFormater,
            width: 200
          }, endUnBoardTime: {
            cn: '完成下客时间',
            en: 'endUnBoardTime',
            formatter: timeFormater,
            width: 200
          }, liftFrontWheelTime: {
            cn: '抬前轮时间',
            en: 'liftFrontWheelTime',
            formatter: timeFormater,
            width: 200
          }, landingTime: {
            cn: '着陆时间',
            en: 'landingTime',
            formatter: timeFormater,
            width: 200
          }, looseBrakeTime: {
            cn: '松刹车时间',
            en: 'looseBrakeTime',
            formatter: timeFormater,
            width: 200
          }, brakeTime: {
            cn: '刹车时间',
            en: 'brakeTime',
            formatter: timeFormater,
            width: 200
          }, startTaxiingTime: {
            cn: '开始滑行时间',
            en: 'startTaxiingTime',
            formatter: timeFormater,
            width: 200
          }, actualDepatureTime: {
            cn: '实际离港时间',
            en: 'actualDepatureTime',
            formatter: timeFormater,
            width: 200
          }, actualArrivalTime: {
            cn: '实际到港时间',
            en: 'actualArrivalTime',
            formatter: timeFormater,
            width: 200
          }, actualGateCloseTime: {
            cn: '实际关舱门时间',
            en: 'actualGateCloseTime',
            formatter: timeFormater,
            width: 200
          }, actualGateOpenTime: {
            cn: '实际开舱门时间',
            en: 'actualGateOpenTime',
            formatter: timeFormater,
            width: 200
          }, enduranceDistance: {
            cn: '航班续航距离',
            en: 'enduranceDistance'
          }

        },
        'FPLN': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, callSign: {
            cn: '航空器识别标志',
            en: 'callSign',
            width: 200
          }, GUFI: {
            cn: '全球航班唯一标识符',
            en: 'GUFI',
            width: 200
          }, regNumber: {
            cn: '注册号',
            en: 'regNumber'
          }, SOBT: {
            cn: '计划离港时间',
            en: 'SOBT',
            formatter: timeFormater,
            width: 200
          }, EOBT: {
            cn: '预计撤轮档时间',
            en: 'EOBT',
            formatter: timeFormater,
            width: 200
          }, depAP: {
            cn: '起飞机场',
            en: 'depAP'
          }, arrAP: {
            cn: '目的地机场',
            en: 'arrAP'
          }, PLNStatus: {
            cn: '当日计划变更状态',
            en: 'PLNStatus'
          }, PLNRegNumber: {
            cn: '变更航空器注册号',
            en: 'PLNRegNumber'
          }, PLNAircraftType: {
            cn: '变更机型',
            en: 'PLNAircraftType'
          }, PLNDepAp: {
            cn: '变更离港机场',
            en: 'PLNDepAp'
          }, PLNSobt: {
            cn: '变更离港时间',
            en: 'PLNSobt',
            formatter: timeFormater,
            width: 200
          }, PLNSibt: {
            cn: '变更进港时间',
            en: 'PLNSibt',
            formatter: timeFormater,
            width: 200
          }, PLNArrAp: {
            cn: '变更目的地机场',
            en: 'PLNArrAp'
          }, remark: {
            cn: '备注',
            en: 'remark'
          }

        },
        'FPCI': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, callSign: {
            cn: '航空器识别标志',
            en: 'callSign',
            width: 200
          }, GUFI: {
            cn: '全球航班唯一标识符',
            en: 'GUFI',
            width: 200
          }, regNumber: {
            cn: '注册号',
            en: 'regNumber'
          }, SOBT: {
            cn: '计划离港时间',
            en: 'SOBT',
            formatter: timeFormater,
            width: 200
          }, EOBT: {
            cn: '预计撤轮档时间',
            en: 'EOBT',
            formatter: timeFormater,
            width: 200
          }, depAP: {
            cn: '起飞机场',
            en: 'depAP'
          }, arrAP: {
            cn: '目的地机场',
            en: 'arrAP'
          }, checkinPassengerSum: {
            cn: '已值机旅客人数',
            en: 'checkinPassengerSum',
            width: 170
          }, boardingPassengerSum: {
            cn: '已登机旅客人数',
            en: 'boardingPassengerSum',
            width: 170
          }, passengerDomesticSum: {
            cn: '国内旅客总人数',
            en: 'passengerDomesticSum',
            width: 170
          }, passengerInternationalSum: {
            cn: '国际旅客总人数',
            en: 'passengerInternationalSum',
            width: 170
          }, passengerAdultSum: {
            cn: '成年旅客人数',
            en: 'passengerAdultSum'
          }, passengerChildSum: {
            cn: '儿童旅客人数',
            en: 'passengerChildSum'
          }, passengerBabySum: {
            cn: '婴儿旅客人数',
            en: 'passengerBabySum'
          }, cargoDomesticWeight: {
            cn: '国内货物重量',
            en: 'cargoDomesticWeight'
          }, cargoInternationalWeight: {
            cn: '国际货物重量',
            en: 'cargoInternationalWeight'
          }, mailDomesticWeight: {
            cn: '国内邮件重量',
            en: 'mailDomesticWeight'
          }, mailInternationalWeight: {
            cn: '国际邮件重量',
            en: 'mailInternationalWeight'
          }, luggageDomesticWeight: {
            cn: '国内行李重量',
            en: 'luggageDomesticWeight'
          }, luggageInternationalWeight: {
            cn: '国际行李重量',
            en: 'luggageInternationalWeight'
          }, luggageDomesticSum: {
            cn: '国内行李数量',
            en: 'luggageDomesticSum'
          }, luggageInternationalSum: {
            cn: '国际行李数量',
            en: 'luggageInternationalSum'
          }, cargoFreeLoad: {
            cn: '腹舱剩余载量',
            en: 'cargoFreeLoad'
          }

        },
        'FCRI': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, callSign: {
            cn: '航空器识别标志',
            en: 'callSign',
            width: 200
          }, GUFI: {
            cn: '全球航班唯一标识符',
            en: 'GUFI',
            width: 200
          }, regNumber: {
            cn: '注册号',
            en: 'regNumber'
          }, SOBT: {
            cn: '计划离港时间',
            en: 'SOBT',
            formatter: timeFormater,
            width: 200
          }, EOBT: {
            cn: '预计撤轮档时间',
            en: 'EOBT',
            formatter: timeFormater,
            width: 200
          }, depAP: {
            cn: '起飞机场',
            en: 'depAP'
          }, arrAP: {
            cn: '目的地机场',
            en: 'arrAP'
          }, Name: {
            cn: '姓名',
            en: 'Name'
          }, Role: {
            cn: '职务',
            en: 'Role'
          }, NewCaptain: {
            cn: '是否新机长',
            en: 'NewCaptain'
          }, ForeignCaptain: {
            cn: '是否为外籍人员',
            en: 'ForeignCaptain',
            width: 170
          }, Remark: {
            cn: '备注',
            en: 'Remark'
          }, crewILSLevel: {
            cn: '机组仪表飞行标准',
            en: 'crewILSLevel',
            width: 200
          }, crewEstTimeoutTime: {
            cn: '机组预计超时时间',
            en: 'crewEstTimeoutTime',
            formatter: timeFormater,
            width: 200
          }

        },
        'FACI': {
          id: {
            cn: 'ID',
            en: 'ID',
            width: 150
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, regNumber: {
            cn: '航空器注册号',
            en: 'regNumber',
            width: 250
          }, aircraftType: {
            cn: '机型',
            en: 'aircraftType',
            width: 250
          }, wingSpanLength: {
            cn: '翼展长度',
            en: 'wingSpanLength',
            width: 250
          }, fuselageLength: {
            cn: '机身长度',
            en: 'fuselageLength',
            width: 250
          }, startServiceTime: {
            cn: '机龄起始时间',
            en: 'startServiceTime',
            formatter: timeFormater,
            width: 250
          }
        }
      },
      'ATMI': {
        'FCDM': {
          id: {
            cn: 'ID',
            en: 'ID',
            width: 110
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, callSign: {
            cn: '航空器识别标志',
            en: 'callSign',
            width: 110
          }, GUFI: {
            cn: '全球航班唯一标识符',
            en: 'GUFI',
            width: 130
          }, regNumber: {
            cn: '注册号',
            en: 'regNumber',
            width: 110
          }, SOBT: {
            cn: '计划离港时间',
            en: 'SOBT',
            width: 110,
            formatter: timeFormater
          }, EOBT: {
            cn: '预计撤轮档时间',
            en: 'EOBT',
            width: 110,
            formatter: timeFormater
          }, depAP: {
            cn: '起飞机场',
            en: 'depAP',
            width: 110
          }, arrAP: {
            cn: '目的地机场',
            en: 'arrAP',
            width: 110
          }, CTOT: {
            cn: '计算起飞时间',
            en: 'CTOT',
            width: 110,
            formatter: timeFormater
          }, COBT: {
            cn: '计算撤轮挡时间',
            en: 'COBT',
            width: 110,
            formatter: timeFormater
          }, TOBT: {
            cn: '目标撤轮挡时间',
            en: 'TOBT',
            width: 110,
            formatter: timeFormater
          }, TSAT: {
            cn: '目标许可开车时间',
            en: 'TSAT',
            width: 130,
            formatter: timeFormater
          }, reason: {
            cn: '航班受控原因',
            en: 'reason',
            width: 110
          }
        },
        'FTMI': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
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
            en: 'applyTime',
            formatter: timeFormater
          }, publicTime: {
            cn: '流控发布时间',
            en: 'publicTime',
            formatter: timeFormater
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
            en: 'startTime',
            formatter: timeFormater,
          }, endTime: {
            cn: '流控结束时间',
            en: 'endTime',
            formatter: timeFormater,
          }, reason: {
            cn: '流控限制原因',
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
            width: 130
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, airportNameEN: {
            cn: '机场英文名称',
            en: 'airportNameEN',
            width: 130
          }, date: {
            cn: '日期',
            en: 'date',
            width: 130
          }, startTime: {
            cn: '开始时间',
            en: 'startTime',
            formatter: timeFormater,
            width: 130
          }, endTime: {
            cn: '终止时间',
            en: 'endTime',
            width: 130,
            formatter: timeFormater
          }, depRunWay: {
            cn: '起飞跑道',
            en: 'depRunWay',
            width: 130
          }, arrRunWay: {
            cn: '落地跑道',
            en: 'arrRunWay',
            width: 130
          }, APCPT: {
            cn: '机场容量',
            en: 'APCPT',
            width: 130
          }, ARR: {
            cn: '接受率',
            en: 'ARR',
            width: 130
          }, ADR: {
            cn: '离场率',
            en: 'ADR',
            width: 130
          }, remark: {
            cn: '备注',
            en: 'remark',
            width: 130
          }
        },
        'MDRS': {
          id: {
            cn: 'ID',
            en: 'ID',
            width: 130
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, MDRSIdentification: {
            cn: 'MDRS标识',
            en: 'MDRSIdentification',
            width: 130
          }, MDRSName: {
            cn: 'MDRS通告名称',
            en: 'MDRSName',
            width: 130
          }, MDRSPublishTime: {
            cn: 'MDRS发布时间',
            en: 'MDRSPublishTime',
            width: 130,
            formatter: timeFormater
          }, MDRSPublishUnit: {
            cn: 'MDRS发布单位',
            en: 'MDRSPublishUnit',
            width: 130
          }, MDRSLevel: {
            cn: 'MDRS延误等级',
            en: 'MDRSLevel',
            width: 130
          }, MDRSArea: {
            cn: 'MDRS延误区域',
            en: 'MDRSArea',
            width: 130
          }, MDRSTimeScope: {
            cn: 'MDRS延误时段',
            en: 'MDRSTimeScope',
            width: 130
          }, MDRSReason: {
            cn: 'MDRS延误原因',
            en: 'MDRSReason',
            width: 130
          }, MDRSExpectInfluence: {
            cn: 'MDRS预期影响',
            en: 'MDRSExpectInfluence',
            width: 130
          }, MDRSExpectRespond: {
            cn: 'MDRS预期响应',
            en: 'MDRSExpectRespond',
            width: 130
          }
        },
        'SECT': {
          id: {
            cn: 'ID',
            en: 'ID',
            width: 400
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 400,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 400,
            formatter: fullTimeFormater
          }, sectorIdentification: {
            cn: '扇区标识',
            en: 'sectorIdentification',
            width: 400
          }, mergedSector: {
            cn: '被合并扇区',
            en: 'mergedSector',
            width: 400
          }
        },
      },
      'OSCI': {
        'FOSC': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, callSign: {
            cn: '航空器识别标志',
            en: 'callSign',
            width: 110
          }, GUFI: {
            cn: '全球航班唯一标识符',
            en: 'GUFI',
            width: 130
          }, regNumber: {
            cn: '注册号',
            en: 'regNumber'
          }, SOBT: {
            cn: '计划离港时间',
            en: 'SOBT',
            formatter: timeFormater
          }, EOBT: {
            cn: '预计撤轮档时间',
            en: 'EOBT',
            formatter: timeFormater
          }, depAP: {
            cn: '起飞机场',
            en: 'depAP'
          }, arrAP: {
            cn: '目的地机场',
            en: 'arrAP'
          }, missionDate: {
            cn: '计划执行日期',
            en: 'missionDate',
            width: 200
          }, SDepAP: {
            cn: '计划起飞机场',
            en: 'SDepAP'
          }, SOBT: {
            cn: '计划离港时间',
            en: 'SOBT',
            formatter: timeFormater,
            width: 200
          }, SArrAP: {
            cn: '计划目的地机场',
            en: 'SArrAP'
          }, SIBT: {
            cn: '计划到港时间',
            en: 'SIBT',
            formatter: timeFormater,
            width: 200
          }, SAircraftType: {
            cn: '计划机型',
            en: 'SAircraftType'
          }, STask: {
            cn: '计划任务性质',
            en: 'STask'
          }, status: {
            cn: '航班执行状态',
            en: 'status'
          }, PDepAP: {
            cn: '预计起飞机场',
            en: 'PDepAP'
          }, EOBT: {
            cn: '预计撤轮档时间',
            en: 'EOBT',
            formatter: timeFormater,
            width: 200
          }, EET: {
            cn: '预计总飞行时间',
            en: 'EET',
            formatter: timeFormater,
            width: 200
          }, PArrAP: {
            cn: '预计目的地机场',
            en: 'PArrAP'
          }, ALNAP: {
            cn: '预计备降机场',
            en: 'ALNAP'
          }, RAircraftType: {
            cn: '实际机型',
            en: 'RAircraftType'
          }, executeDate: {
            cn: '实际执行日期',
            en: 'executeDate',
            width: 200
          }, RDepAP: {
            cn: '实际起飞机场',
            en: 'RDepAP'
          }, ATOT: {
            cn: '实际起飞时间',
            en: 'ATOT',
            formatter: timeFormater,
            width: 200
          }, RArrAP: {
            cn: '实际落地机场',
            en: 'RArrAP'
          }, ALDT: {
            cn: '实际落地时间',
            en: 'ALDT',
            formatter: timeFormater,
            width: 200
          }, regNumber: {
            cn: '航空器注册号',
            en: 'regNumber'
          }
        },
        'FPER': {
          id: {
            cn: 'ID',
            en: 'ID',
            width: 110
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, callSign: {
            cn: '航空器识别标志',
            en: 'callSign',
            width: 110
          }, GUFI: {
            cn: '全球航班唯一标识符',
            en: 'GUFI',
            width: 130
          }, regNumber: {
            cn: '注册号',
            en: 'regNumber',
            width: 110
          }, SOBT: {
            cn: '计划离港时间',
            en: 'SOBT',
            width: 110,
            formatter: timeFormater
          }, EOBT: {
            cn: '预计撤轮档时间',
            en: 'EOBT',
            width: 110,
            formatter: timeFormater
          }, depAP: {
            cn: '起飞机场',
            en: 'depAP',
            width: 110
          }, arrAP: {
            cn: '目的地机场',
            en: 'arrAP',
            width: 110
          }, ETA: {
            cn: '航班预达时间',
            en: 'ETA',
            width: 110,
            formatter: timeFormater
          }, delayTime: {
            cn: '航班延误时间',
            en: 'delayTime',
            width: 110,
            formatter: timeFormater
          }, closeWaitTime: {
            cn: '关舱门后等待时间',
            en: 'closeWaitTime',
            width: 130,
            formatter: timeFormater
          }, AXIT: {
            cn: '航班进港滑行时间',
            en: 'AXIT',
            width: 130,
            formatter: timeFormater
          }, AXOT: {
            cn: '航班离港滑行时间',
            en: 'AXOT',
            width: 130,
            formatter: timeFormater
          }
        },
        'PPER': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '发送时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '接收时间',
            en: 'generateTime',
            width: 200,
            formatter: fullTimeFormater
          }, airportNameEN: {
            cn: '机场英文名称',
            en: 'airportNameEN'
          }, hourlySchDepSum: {
            cn: '机场小时计划离港架次',
            en: 'hourlySchDepSum',
            width: 350
          }, hourlySchArrSum: {
            cn: '机场小时计划进港架次',
            en: 'hourlySchArrSum',
            width: 350
          }, hourlyActTakeOffSum: {
            cn: '机场小时实际起飞架次',
            en: 'hourlyActTakeOffSum',
            width: 350
          }, hourlyActLandingSum: {
            cn: '机场小时实际落地架次',
            en: 'hourlyActLandingSum',
            width: 350
          }, hourlyActTakeOffPunctualityRate: {
            cn: '小时实际起飞正常率',
            en: 'hourlyActTakeOffPunctualityRate',
            width: 350
          }, dailyActTakeOffPunctualityRate: {
            cn: '当日实际起飞正常率',
            en: 'dailyActTakeOffPunctualityRate',
            width: 180
          }, hourlySchTakeOffPunctualityRate: {
            cn: '小时计划起飞正常率',
            en: 'hourlySchTakeOffPunctualityRate',
            width: 400
          }, dailySchTakeOffPunctualityRate: {
            cn: '当日计划起飞正常率',
            en: 'dailySchTakeOffPunctualityRate',
            width: 180
          }, hourlyActDepPunctualityRate: {
            cn: '小时实际离港正常率',
            en: 'hourlyActDepPunctualityRate',
            width: 400
          }, dailyActDepPunctualityRate: {
            cn: '当日实际离港正常率',
            en: 'dailyActDepPunctualityRate',
            width: 180
          }, hourlySchDepPunctualityRate: {
            cn: '小时计划离港正常率',
            en: 'hourlySchDepPunctualityRate',
            width: 400
          }, dailySchDepPunctualityRate: {
            cn: '当日计划离港正常率',
            en: 'dailySchDepPunctualityRate',
            width: 180
          }, hourlyOriActTakeOffPunctualityRate: {
            cn: '小时始发航班实际起飞正常率',
            en: 'hourlyOriActTakeOffPunctualityRate',
            width: 400
          }, dailyOriActTakeOffPunctualityRate: {
            cn: '当日始发航班实际起飞正常率',
            en: 'dailyOriActTakeOffPunctualityRate',
            width: 180
          }, hourlyOriSchTakeOffPunctualityRate: {
            cn: '小时始发航班计划起飞正常率',
            en: 'hourlyOriSchTakeOffPunctualityRate',
            width: 400
          }, dailyOriSchTakeOffPunctualityRate: {
            cn: '当日始发航班计划起飞正常率',
            en: 'dailyOriSchTakeOffPunctualityRate',
            width: 180
          }, hourlyActClearancePunctualityRate: {
            cn: '小时机场实际放行正常率',
            en: 'hourlyActClearancePunctualityRate',
            width: 400
          }, dailyActClearancePunctualityRate: {
            cn: '当日机场实际放行正常率',
            en: 'dailyActClearancePunctualityRate',
            width: 180
          }, hourlySchClearancePunctualityRate: {
            cn: '机场计划放行正常率',
            en: 'hourlySchClearancePunctualityRate',
            width: 400
          }, dailySchClearancePunctualityRate: {
            cn: '当日机场计划放行正常率',
            en: 'dailySchClearancePunctualityRate',
            width: 180
          }, hourlyActLandingPunctualityRate: {
            cn: '小时实际落地正常率',
            en: 'hourlyActLandingPunctualityRate',
            width: 350
          }, dailyActLandingPunctualityRate: {
            cn: '当日实际落地正常率',
            en: 'dailyActLandingPunctualityRate',
            width: 180
          }, hourlySchLandingPunctualityRate: {
            cn: '小时计划落地正常率',
            en: 'hourlySchLandingPunctualityRate',
            width: 400
          }, dailySchLandingPunctualityRate: {
            cn: '当日计划落地正常率',
            en: 'dailySchLandingPunctualityRate',
            width: 180
          }, hourlyActArrPunctualityRate: {
            cn: '小时实际到港正常率',
            en: 'hourlyActArrPunctualityRate',
            width: 400
          }, dailyActArrPunctualityRate: {
            cn: '当日实际到港正常率',
            en: 'dailyActArrPunctualityRate',
            width: 180
          }, hourlySchArrPunctualityRate: {
            cn: '小时计划到港正常率',
            en: 'hourlySchArrPunctualityRate',
            width: 400
          }, dailySchArrPunctualityRate: {
            cn: '当日计划到港正常率',
            en: 'dailySchArrPunctualityRate',
            width: 180
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
      searchoptions: {
        sopt: ['cn', 'nc', 'eq', 'ne', 'lt', 'le', 'gt', 'ge', 'bw', 'bn', 'in', 'ni', 'ew', 'en'],
        dataEvents: [{
          type: 'keyup',
          fn: function (e) {
            $(this).change();
          }
        }]
      },
      cellattr: function (rowId, value, rowObject, colModel, arrData) {
        // 需要赋予表格的属性
        var attrs = '';
        // 无效数值不做处理
        if (!$.isValidVariable(value)) {
          return attrs;
        }

        var title = rowObject[colModel.name];
        if (!$.isValidVariable(title)) {
          title = '';
        }
        var len = title.length;
        //时间格式化 YYYYMMDD HH:MM
        var regexp = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/;
        //12位有效时间
        if (regexp.test(title) && len == 12) {
          title = title.substring(0, 8) + ' ' + title.substring(8, 10) + ":" + title.substring(10, 12);
        } else if (regexp.test(title) && len == 14) { //14位有效时间
          title = title.substring(0, 8) + ' ' + title.substring(8, 10) + ":" + title.substring(10, 12) + ':' + title.substring(12, 14);
        }
        attrs = ' title="' + title + '"';

        return attrs;
      }
    },

  };

  // 获取单位数据请求地址
  var unitURL = {
    'APOI': iphost + "shareDataPlatform/allAirport",
    'ALOI': iphost + "shareDataPlatform/allCompany"
  };

  //格式化12位时间
  function timeFormater(cellvalue, options, rowObject) {
    var val = cellvalue * 1;
    if ($.isValidVariable(cellvalue) && !isNaN(val) && cellvalue.length == 12) {
      return cellvalue.substring(6, 8) + '/' + cellvalue.substring(8, 12);
    } else {
      return '';
    }
  };

  // 格式化14位时间
  function fullTimeFormater(cellvalue, options, rowObject) {
    var val = cellvalue * 1;
    if ($.isValidVariable(cellvalue) && !isNaN(val) && cellvalue.length == 14) {
      return cellvalue.substring(6, 8) + '/' + cellvalue.substring(8, 10) + ':' + cellvalue.substring(10, 12) + ':' + cellvalue.substring(12, 14);
    } else {
      return '';
    }
  }


  /**
   * 初始始化基础数据(单位)
   * */
  var initBasicData = function () {
    //获取机场单位数据
    initAPOIUnitData();
    //获取航空公司单位数据
    initALOIUnitData();
  };

  /**
   * 初始化表格配置
   *
   * @param obj 参数配置对象
   * 依据colName遍历生成对应的colModel，colDisplay,title
   *
   * */
  var initTableOption = function (obj) {
    for (var i in obj) {
      tableObj.colModel[i] = {};
      tableObj.display[i] = {};
      tableObj.title[i] = {};
      var item = obj[i];
      for (var k in item) {
        var o = item[k];
        tableObj.colModel[i][k] = {};
        tableObj.display[i][k] = {};
        tableObj.title[i][k] = {};
        for (var j in o) {
          var val = o[j];
          tableObj.colModel[i][k][j] = {name: j};
          if ($.isValidVariable(val.width)) {
            tableObj.colModel[i][k][j]['width'] = val.width;
          }
          if ($.isValidVariable(val.formatter)) {
            tableObj.colModel[i][k][j]['formatter'] = val.formatter;
          }

          tableObj.display[i][k][j] = {display: 1};
          tableObj.title[i][k][j] = val.cn;
        }
      }
    }
    ;
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
          updateUintsMultiple('APOI', result);
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
          updateUintsMultiple('ALOI', result);
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
   *  @param typeName 类型
   *
   *  @param data 单位数据集合
   *
   * */
  var updateUintsMultiple = function (typeName, data) {
    //更新历史数据单位集合
    updateUints(BasicData.historyDataTypeObj.result, typeName, data);

    //更新运行数据单位集合
    updateUints(BasicData.operatingDataTypeObj.result, typeName, data);
  };

  /**
  * 更新单位
   *  @param typeData 类型集合
  *  @param typeName 类型
  *
  *  @param data 单位数据集合
  * */
  var  updateUints = function (typeData,typeName,data) {
    for (var i in data) {
      var val = data[i];
      typeData[typeName].unit[i] = val;
    }
  };

  /**
   *  更新下拉列表
   * */
  var updateSelectMultiple = function (typeName) {
    updateSelect(HistoryData, typeName);
    updateSelect(OperatingData, typeName);
  };

  /**
   * 更新下拉列表
   *
   * @param dataset 数据对象
   *
   * @param typeName 类型
   *
   * */
  var updateSelect = function (dataset, typeName) {
    if (dataset.currentType == typeName) {
      dataset.updateSelectPicker(typeName);
    }
  };

  //模态框内容
  var modalContent =
    '<div class="query-form"><div class="row"><div class="col-xs-12">' +

    '<div class="row row-line">' +
    '<div class="col-sm-6 col-xs-12 col-md-5 col-md-offset-1">' +
    '<label class="text">时间</label>' +
    '<div class="input-group date date-datepicker">' +
    '<input type="text" class="date-input form-control" maxlength="8" value="" readonly> ' +
    '<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
    '</div>' +

    '</div>' +

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
    '</label>' +
    '<label class="btn btn-default">' +
    '<input type="radio" name="type" class="type"  value="ATMI" autocomplete="off"> 空管运行信息' +
    '</label>' +
    '<label class="btn btn-default">' +
    '<input type="radio" name="type" class="type"  value="OSCI" autocomplete="off"> 监控中心运行信息' +
    '</label>' +
    '</div>' +

    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-xs-12 col-md-10 col-md-offset-1">' +
    '<label class="text">信息子类型</label>' +
    '<select id="subtype" class="form-control selectpicker show-tick" multiple >' +
    '</select>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-xs-12 col-md-10 col-md-offset-1">' +
    '<label class="text">上传单位：<span class="type-label"></span></label>' +
    '<select id="unit-list" name="" class="selectpicker show-tick form-control" multiple >' +
    '</select>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-xs-12 col-md-10 col-md-offset-1 alert-container">' +
    '</div>' +
    '</div>' +
    '</div></div></div>';
  return {
    init: function () {
      //初始始化基础数据
      initBasicData();
      //初始化表格配置
      initTableOption(tableObj.colName);
    },
    historyDataTypeObj: historyDataTypeObj,
    operatingDataTypeObj: operatingDataTypeObj,
    tableObj: tableObj,
    modalContent : modalContent
  }
}();

$(document).ready(function () {
  BasicData.init();
});