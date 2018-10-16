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
          'FPER': '航班运行效率',
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
          'FPER': '航班运行效率',
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

    //数据完整性报告查询模块类型集合
    var qualityDataTypeObj = {
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '接受百分比',
            en: 'ARR',
            width: 130
          }, ADR: {
            cn: '离场百分比',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 400,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '预计总飞行时间(分钟)',
            en: 'EET',
            // formatter: timeFormater,
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
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '航班延误时间(分钟)',
            en: 'delayTime',
            width: 130,
            // formatter: timeFormater
          }, closeWaitTime: {
            cn: '关舱门后等待时间(分钟)',
            en: 'closeWaitTime',
            width: 150,
            // formatter: timeFormater
          }, AXIT: {
            cn: '航班进港滑行时间(分钟)',
            en: 'AXIT',
            width: 150,
            // formatter: timeFormater
          }, AXOT: {
            cn: '航班离港滑行时间(分钟)',
            en: 'AXOT',
            width: 150,
            // formatter: timeFormater
          }
        },
        'PPER': {
          id: {
            cn: 'ID',
            en: 'ID'
          }, messageSendDateTime: {
            cn: '数据生成时间',
            en: 'messageSendDateTime',
            width: 200,
            formatter: fullTimeFormater
          }, generateTime: {
            cn: '更新时间',
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
            cn: '小时实际起飞百分比',
            en: 'hourlyActTakeOffPunctualityRate',
            width: 350
          }, dailyActTakeOffPunctualityRate: {
            cn: '当日实际起飞百分比',
            en: 'dailyActTakeOffPunctualityRate',
            width: 180
          }, hourlySchTakeOffPunctualityRate: {
            cn: '小时计划起飞百分比',
            en: 'hourlySchTakeOffPunctualityRate',
            width: 400
          }, dailySchTakeOffPunctualityRate: {
            cn: '当日计划起飞百分比',
            en: 'dailySchTakeOffPunctualityRate',
            width: 180
          }, hourlyActDepPunctualityRate: {
            cn: '小时实际离港百分比',
            en: 'hourlyActDepPunctualityRate',
            width: 400
          }, dailyActDepPunctualityRate: {
            cn: '当日实际离港百分比',
            en: 'dailyActDepPunctualityRate',
            width: 180
          }, hourlySchDepPunctualityRate: {
            cn: '小时计划离港百分比',
            en: 'hourlySchDepPunctualityRate',
            width: 400
          }, dailySchDepPunctualityRate: {
            cn: '当日计划离港百分比',
            en: 'dailySchDepPunctualityRate',
            width: 180
          }, hourlyOriActTakeOffPunctualityRate: {
            cn: '小时始发航班实际起飞百分比',
            en: 'hourlyOriActTakeOffPunctualityRate',
            width: 400
          }, dailyOriActTakeOffPunctualityRate: {
            cn: '当日始发航班实际起飞百分比',
            en: 'dailyOriActTakeOffPunctualityRate',
            width: 180
          }, hourlyOriSchTakeOffPunctualityRate: {
            cn: '小时始发航班计划起飞百分比',
            en: 'hourlyOriSchTakeOffPunctualityRate',
            width: 400
          }, dailyOriSchTakeOffPunctualityRate: {
            cn: '当日始发航班计划起飞百分比',
            en: 'dailyOriSchTakeOffPunctualityRate',
            width: 180
          }, hourlyActClearancePunctualityRate: {
            cn: '小时机场实际放行百分比',
            en: 'hourlyActClearancePunctualityRate',
            width: 400
          }, dailyActClearancePunctualityRate: {
            cn: '当日机场实际放行百分比',
            en: 'dailyActClearancePunctualityRate',
            width: 180
          }, hourlySchClearancePunctualityRate: {
            cn: '机场计划放行百分比',
            en: 'hourlySchClearancePunctualityRate',
            width: 400
          }, dailySchClearancePunctualityRate: {
            cn: '当日机场计划放行百分比',
            en: 'dailySchClearancePunctualityRate',
            width: 180
          }, hourlyActLandingPunctualityRate: {
            cn: '小时实际落地百分比',
            en: 'hourlyActLandingPunctualityRate',
            width: 350
          }, dailyActLandingPunctualityRate: {
            cn: '当日实际落地百分比',
            en: 'dailyActLandingPunctualityRate',
            width: 180
          }, hourlySchLandingPunctualityRate: {
            cn: '小时计划落地百分比',
            en: 'hourlySchLandingPunctualityRate',
            width: 400
          }, dailySchLandingPunctualityRate: {
            cn: '当日计划落地百分比',
            en: 'dailySchLandingPunctualityRate',
            width: 180
          }, hourlyActArrPunctualityRate: {
            cn: '小时实际到港百分比',
            en: 'hourlyActArrPunctualityRate',
            width: 400
          }, dailyActArrPunctualityRate: {
            cn: '当日实际到港百分比',
            en: 'dailyActArrPunctualityRate',
            width: 180
          }, hourlySchArrPunctualityRate: {
            cn: '小时计划到港百分比',
            en: 'hourlySchArrPunctualityRate',
            width: 400
          }, dailySchArrPunctualityRate: {
            cn: '当日计划到港百分比',
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

    /**
     * 数据完整性模块各类型对应表格参数配置
     *
     * */
  var qualityTableObj =  {
      colName: {
          'APOI': {
              'PSNI': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  },startTimeCount : {
                      cn: '开始时间',
                      en: 'startTimeCount',
                      width: 200,
                  },startTimeCount_CR : {
                      cn: '完整性',
                      en: 'startTimeCount_CR',
                      width: 200,
                  },endTimeCount : {
                      cn: '终止时间',
                      en: 'endTimeCount',
                      width: 200,
                  },endTimeCount_CR : {
                      cn: '完整性',
                      en: 'endTimeCount_CR',
                      width: 200,
                  },nowOcpStandsASumCount : {
                      cn: '已占用机位数量(A类)',
                      en: 'nowOcpStandsASumCount',
                      width: 200,
                  },nowOcpStandsASumCount_CR : {
                      cn: '完整性',
                      en: 'nowOcpStandsASumCount_CR',
                      width: 200,
                  },nowAviStandsASumCount : {
                      cn: '当前空余机位数量(A类)',
                      en: 'nowAviStandsASumCount',
                      width: 200,
                  },nowAviStandsASumCount_CR : {
                      cn: '完整性',
                      en: 'nowAviStandsASumCount_CR',
                      width: 200,
                  },estOcpStandsASumCount : {
                      cn: '预占用机位数量(A类)',
                      en: 'estOcpStandsASumCount',
                      width: 200,
                  },estOcpStandsASumCount_CR : {
                      cn: '完整性',
                      en: 'estOcpStandsASumCount_CR',
                      width: 200,
                  },estAviStandsASumCount : {
                      cn: '预计空余机位数量(A类)',
                      en: 'estAviStandsASumCount',
                      width: 200,
                  },estAviStandsASumCount_CR : {
                      cn: '完整性',
                      en: 'estAviStandsASumCount_CR',
                      width: 200,
                  },estAviCPLStandsASumCount : {
                      cn: '可用备降机位数量(A类)',
                      en: 'estAviCPLStandsASumCount',
                      width: 200,
                  },estAviCPLStandsASumCount_CR : {
                      cn: '完整性',
                      en: 'estAviCPLStandsASumCount_CR',
                      width: 200,
                  },estAviFixStandsASumCount : {
                      cn: '可用系留机位数量(A类)',
                      en: 'estAviFixStandsASumCount',
                      width: 200,
                  },estAviFixStandsASumCount_CR : {
                      cn: '完整性',
                      en: 'estAviFixStandsASumCount_CR',
                      width: 200,
                  },nowOcpStandsBSumCount : {
                      cn: '已占用机位数量(B类)',
                      en: 'nowOcpStandsBSumCount',
                      width: 200,
                  },nowOcpStandsBSumCount_CR : {
                      cn: '完整性',
                      en: 'nowOcpStandsBSumCount_CR',
                      width: 200,
                  },nowAviStandsBSumCount : {
                      cn: '当前空余机位数量(B类)',
                      en: 'nowAviStandsBSumCount',
                      width: 200,
                  },nowAviStandsBSumCount_CR : {
                      cn: '完整性',
                      en: 'nowAviStandsBSumCount_CR',
                      width: 200,
                  },estAviStandsBSumCount : {
                      cn: '预计空余机位数量(B类)',
                      en: 'estAviStandsBSumCount',
                      width: 200,
                  },estAviStandsBSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviStandsBSumCount_CR',
                      width: 200,
                  },estAviCPLStandsBSumCount : {
                      cn: '可用备降机位数量(B类)',
                      en: 'estAviCPLStandsBSumCount',
                      width: 200,
                  },estAviCPLStandsBSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviCPLStandsBSumCount_CR',
                      width: 200,
                  },estAviFixStandsBSumCount : {
                      cn: '可用系留机位数量(B类)',
                      en: 'estAviFixStandsBSumCount',
                      width: 200,
                  },estAviFixStandsBSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviFixStandsBSumCount_CR',
                      width: 200,
                  },nowOcpStandsCSumCount : {
                      cn: '已占用机位数量(C类)',
                      en: 'nowOcpStandsCSumCount',
                      width: 200,
                  },nowOcpStandsCSumCount_CR : {
                      cn: '完整性',
                      en: 'nowOcpStandsCSumCount_CR',
                      width: 200,
                  },nowAviStandsCSumCount : {
                      cn: '当前空余机位数量(C类)',
                      en: 'nowAviStandsCSumCount',
                      width: 200,
                  },nowAviStandsCSumCount_CR : {
                      cn: '完整性',
                      en: 'nowAviStandsCSumCount_CR',
                      width: 200,
                  },estOcpStandsCSumCount : {
                      cn: '预占用机位数量(C类)',
                      en: 'estOcpStandsCSumCount',
                      width: 200,
                  },estOcpStandsCSumCount_CR : {
                      cn: '完整性',
                      en: 'estOcpStandsCSumCount_CR',
                      width: 200,
                  },estAviStandsCSumCount : {
                      cn: '预计空余机位数量(C类)',
                      en: 'estAviStandsCSumCount',
                      width: 200,
                  },estAviStandsCSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviStandsCSumCount_CR',
                      width: 200,
                  },estAviCPLStandsCSumCount : {
                      cn: '可用备降机位数量(C类)',
                      en: 'estAviCPLStandsCSumCount',
                      width: 200,
                  },estAviCPLStandsCSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviCPLStandsCSumCount_CR',
                      width: 200,
                  },estAviFixStandsCSumCount : {
                      cn: '可用系留机位数量(C类)',
                      en: 'estAviFixStandsCSumCount',
                      width: 200,
                  },estAviFixStandsCSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviFixStandsCSumCount_CR',
                      width: 200,
                  },nowOcpStandsDSumCount : {
                      cn: '已占用机位数量(D类)',
                      en: 'nowOcpStandsDSumCount',
                      width: 200,
                  },nowOcpStandsDSumCount_CR : {
                      cn: '完整性',
                      en: 'nowOcpStandsDSumCount_CR',
                      width: 200,
                  },nowAviStandsDSumCount : {
                      cn: '当前空余机位数量(D类)',
                      en: 'nowAviStandsDSumCount',
                      width: 200,
                  },nowAviStandsDSumCount_CR : {
                      cn: '完整性',
                      en: 'nowAviStandsDSumCount_CR',
                      width: 200,
                  },estOcpStandsDSumCount : {
                      cn: '预占用机位数量(D类)',
                      en: 'estOcpStandsDSumCount',
                      width: 200,
                  },estOcpStandsDSumCount_CR : {
                      cn: '完整性',
                      en: 'estOcpStandsDSumCount_CR',
                      width: 200,
                  },estAviStandsDSumCount : {
                      cn: '预计空余机位数量(D类)',
                      en: 'estAviStandsDSumCount',
                      width: 200,
                  },estAviStandsDSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviStandsDSumCount_CR',
                      width: 200,
                  },estAviCPLStandsDSumCount : {
                      cn: '可用备降机位数量(D类)',
                      en: 'estAviCPLStandsDSumCount',
                      width: 200,
                  },estAviCPLStandsDSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviCPLStandsDSumCount_CR',
                      width: 200,
                  },estAviFixStandsDSumCount : {
                      cn: '可用系留机位数量(D类)',
                      en: 'estAviFixStandsDSumCount',
                      width: 200,
                  },estAviFixStandsDSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviFixStandsDSumCount_CR',
                      width: 200,
                  },nowOcpStandsESumCount : {
                      cn: '已占用机位数量(E类)',
                      en: 'nowOcpStandsESumCount',
                      width: 200,
                  },nowOcpStandsESumCount_CR : {
                      cn: '完整性',
                      en: 'nowOcpStandsESumCount_CR',
                      width: 200,
                  },nowAviStandsESumCount : {
                      cn: '当前空余机位数量(E类)',
                      en: 'nowAviStandsESumCount',
                      width: 200,
                  },nowAviStandsESumCount_CR : {
                      cn: '完整性',
                      en: 'nowAviStandsESumCount_CR',
                      width: 200,
                  },estOcpStandsESumCount : {
                      cn: '预占用机位数量(E类)',
                      en: 'estOcpStandsESumCount',
                      width: 200,
                  },estOcpStandsESumCount_CR : {
                      cn: '完整性',
                      en: 'estOcpStandsESumCount_CR',
                      width: 200,
                  },estAviStandsESumCount : {
                      cn: '预计空余机位数量(E类)',
                      en: 'estAviStandsESumCount',
                      width: 200,
                  },estAviStandsESumCount_CR : {
                      cn: '完整性',
                      en: 'estAviStandsESumCount_CR',
                      width: 200,
                  },estAviCPLStandsESumCount : {
                      cn: '可用备降机位数量(E类)',
                      en: 'estAviCPLStandsESumCount',
                      width: 200,
                  },estAviCPLStandsESumCount_CR : {
                      cn: '完整性',
                      en: 'estAviCPLStandsESumCount_CR',
                      width: 200,
                  },estAviFixStandsESumCount : {
                      cn: '可用系留机位数量(E类)',
                      en: 'estAviFixStandsESumCount',
                      width: 200,
                  },estAviFixStandsESumCount_CR : {
                      cn: '完整性',
                      en: 'estAviFixStandsESumCount_CR',
                      width: 200,
                  },nowOcpStandsFSumCount : {
                      cn: '已占用机位数量(F类)',
                      en: 'nowOcpStandsFSumCount',
                      width: 200,
                  },nowOcpStandsFSumCount : {
                      cn: '完整性',
                      en: 'nowOcpStandsFSumCount_CR',
                      width: 200,
                  },nowAviStandsFSumCount : {
                      cn: '当前空余机位数量(F类)',
                      en: 'nowAviStandsFSumCount',
                      width: 200,
                  },nowAviStandsFSumCount_CR : {
                      cn: '完整性',
                      en: 'nowAviStandsFSumCount_CR',
                      width: 200,
                  },estOcpStandsFSumCount : {
                      cn: '预占用机位数量(F类)',
                      en: 'estOcpStandsFSumCount',
                      width: 200,
                  },estOcpStandsFSumCount_CR : {
                      cn: '完整性',
                      en: 'estOcpStandsFSumCount_CR',
                      width: 200,
                  },estAviStandsFSumCount : {
                      cn: '预计空余机位数量(F类)',
                      en: 'estAviStandsFSumCount',
                      width: 200,
                  },estAviStandsFSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviStandsFSumCount_CR',
                      width: 200,
                  },estAviCPLStandsFSumCount : {
                      cn: '可用备降机位数量(F类)',
                      en: 'estAviCPLStandsFSumCount',
                      width: 200,
                  },estAviCPLStandsFSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviCPLStandsFSumCount_CR',
                      width: 200,
                  },estAviFixStandsFSumCount : {
                      cn: '可用系留机位数量(F类)',
                      en: 'estAviFixStandsFSumCount',
                      width: 200,
                  },estAviFixStandsFSumCount_CR : {
                      cn: '完整性',
                      en: 'estAviFixStandsFSumCount_CR',
                      width: 200,
                  }
              },
              'FPDI': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  },StandCount: {
                      cn: '离港航班停机位',
                      en: 'StandCount',
                      width: 200,
                  },StandCount_CR: {
                      cn: '完整性',
                      en: 'StandCount_CR',
                      width: 200,
                  },GateCount: {
                      cn: '航班登机口',
                      en: 'GateCount',
                      width: 200,
                  },GateCount_CR: {
                      cn: '完整性',
                      en: 'GateCount_CR',
                      width: 200,
                  },StartBoardingTimeCount: {
                      cn: '开始登机时间',
                      en: 'StartBoardingTimeCount',
                      width: 200,
                  },StartBoardingTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartBoardingTimeCount_CR',
                      width: 200,
                  },EndBoardingTimeCount: {
                      cn: '完成登机时间',
                      en: 'EndBoardingTimeCount',
                      width: 200,
                  },EndBoardingTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndBoardingTimeCount_CR',
                      width: 200,
                  },StartLuggageTimeCount: {
                      cn: '开始装载行李时间',
                      en: 'StartLuggageTimeCount',
                      width: 200,
                  },StartLuggageTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartLuggageTimeCount_CR',
                      width: 200,
                  },EndLuggageTimeCount: {
                      cn: '完成行李装载时间',
                      en: 'EndLuggageTimeCount',
                      width: 200,
                  },EndLuggageTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndLuggageTimeCount_CR',
                      width: 200,
                  },StartCateringTimeCount: {
                      cn: '开始配餐时间',
                      en: 'StartCateringTimeCount',
                      width: 200,
                  },StartCateringTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartCateringTimeCount_CR',
                      width: 200,
                  },EndCateringTimeCount: {
                      cn: '完成配餐时间',
                      en: 'EndCateringTimeCount',
                      width: 200,
                  },EndCateringTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndCateringTimeCount_CR',
                      width: 200,
                  },StartWaterTimeCount: {
                      cn: '开始加清水时间',
                      en: 'StartWaterTimeCount',
                      width: 200,
                  },StartWaterTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartWaterTimeCount_CR',
                      width: 200,
                  },EndWaterTimeCount: {
                      cn: '完成加清水时间',
                      en: 'EndWaterTimeCount',
                      width: 200,
                  },EndWaterTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndWaterTimeCount_CR',
                      width: 200,
                  },StartSewageTimeCount: {
                      cn: '开始排污时间',
                      en: 'StartSewageTimeCount',
                      width: 200,
                  },StartSewageTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartSewageTimeCount_CR',
                      width: 200,
                  },EndSewageTimeCount: {
                      cn: '完成排污时间',
                      en: 'EndSewageTimeCount',
                      width: 200,
                  },EndSewageTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndSewageTimeCount_CR',
                      width: 200,
                  },StartCleanTimeCount: {
                      cn: '开始保洁时间',
                      en: 'StartCleanTimeCount',
                      width: 200,
                  },StartCleanTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartCleanTimeCount_CR',
                      width: 200,
                  },EndCleanTimeCount: {
                      cn: '完成保洁时间',
                      en: 'EndCleanTimeCount',
                      width: 200,
                  },EndCleanTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndCleanTimeCount_CR',
                      width: 200,
                  },StartFuelTimeCount: {
                      cn: '开始供油时间',
                      en: 'StartFuelTimeCount',
                      width: 200,
                  },StartFuelTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartFuelTimeCount_CR',
                      width: 200,
                  },EndFuelTimeCount: {
                      cn: '完成供油时间',
                      en: 'EndFuelTimeCount',
                      width: 200,
                  },EndFuelTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndFuelTimeCount_CR',
                      width: 200,
                  },StartDeiceTimeCount: {
                      cn: '开始除冰时间',
                      en: 'StartDeiceTimeCount',
                      width: 200,
                  },StartDeiceTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartDeiceTimeCount_CR',
                      width: 200,
                  },EndDeiceTimeCount: {
                      cn: '完成除冰时间',
                      en: 'EndDeiceTimeCount',
                      width: 200,
                  },EndDeiceTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndDeiceTimeCount_CR',
                      width: 200,
                  },AeroBridgeOffTimeCount: {
                      cn: '离桥时间',
                      en: 'AeroBridgeOffTimeCount',
                      width: 200,
                  },AeroBridgeOffTimeCount_CR: {
                      cn: '完整性',
                      en: 'AeroBridgeOffTimeCount_CR',
                      width: 200,
                  },DepPassengerStepsOffTimeCount: {
                      cn: '离港客梯车撤离时间',
                      en: 'DepPassengerStepsOffTimeCount',
                      width: 200,
                  },DepPassengerStepsOffTimeCount_CR: {
                      cn: '完整性',
                      en: 'DepPassengerStepsOffTimeCount_CR',
                      width: 200,
                  },ActualDepartureTimeCount: {
                      cn: '实际离港时间',
                      en: 'ActualDepartureTimeCount',
                      width: 200,
                  },ActualDepartureTimeCount_CR: {
                      cn: '完整性',
                      en: 'ActualDepartureTimeCount_CR',
                      width: 200,
                  },TrailerInPlaceTimeCount: {
                      cn: '拖车到位时间',
                      en: 'TrailerInPlaceTimeCount',
                      width: 200,
                  },TrailerInPlaceTimeCount_CR: {
                      cn: '完整性',
                      en: 'TrailerInPlaceTimeCount_CR',
                      width: 200,
                  },DepShuttleOffTimeCount: {
                      cn: '离港摆渡车撤离时间',
                      en: 'DepShuttleOffTimeCount',
                      width: 200,
                  },DepShuttleOffTimeCount_CR: {
                      cn: '完整性',
                      en: 'DepShuttleOffTimeCount_CR',
                      width: 200,
                  },SecurityCheckedPassengerSumCount: {
                      cn: '过安检旅客人数',
                      en: 'SecurityCheckedPassengerSumCount',
                      width: 200,
                  },SecurityCheckedPassengerSumCount_CR: {
                      cn: '完整性',
                      en: 'SecurityCheckedPassengerSumCount_CR',
                      width: 200,
                  }
              },
              'FPAI': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  }, StandCount: {
                      cn: '到港航班停机位',
                      en: 'StandCount',
                      width: 200,
                  },StandCount_CR: {
                      cn: '完整性',
                      en: 'StandCount_CR',
                      width: 200,
                  },GateCount: {
                      cn: '航班到达口',
                      en: 'GateCount',
                      width: 200,
                  },GateCount_CR: {
                      cn: '完整性',
                      en: 'GateCount_CR',
                      width: 200,
                  },ActualArrivalTimeCount: {
                      cn: '实际到港时间',
                      en: 'ActualArrivalTimeCount',
                      width: 200,
                  },ActualArrivalTimeCount_CR: {
                      cn: '完整性',
                      en: 'ActualArrivalTimeCount_CR',
                      width: 200,
                  },AeroBridgeOnTimeCount: {
                      cn: '靠桥时间',
                      en: 'AeroBridgeOnTimeCount',
                      width: 200,
                  },AeroBridgeOnTimeCount_CR: {
                      cn: '完整性',
                      en: 'AeroBridgeOnTimeCount_CR',
                      width: 200,
                  },ArrPassengerStepsOnTimeCount: {
                      cn: '进港客梯车对接时间',
                      en: 'ArrPassengerStepsOnTimeCount',
                      width: 200,
                  },ArrPassengerStepsOnTimeCount_CR: {
                      cn: '完整性',
                      en: 'ArrPassengerStepsOnTimeCount_CR',
                      width: 200,
                  },ArrShuttleReadyTimeCount: {
                      cn: '进港摆渡车到位时间',
                      en: 'ArrShuttleReadyTimeCount',
                      width: 200,
                  },ArrShuttleReadyTimeCount_CR: {
                      cn: '完整性',
                      en: 'ArrShuttleReadyTimeCount_CR',
                      width: 200,
                  },StartUnBoardTimeCount: {
                      cn: '开始下客时间',
                      en: 'StartUnBoardTimeCount',
                      width: 200,
                  },StartUnBoardTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartUnBoardTimeCount_CR',
                      width: 200,
                  },EndUnBoardTimeCount: {
                      cn: '完成下客时间',
                      en: 'EndUnBoardTimeCount',
                      width: 200,
                  },EndUnBoardTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndUnBoardTimeCount_CR',
                      width: 200,
                  },
              },
              'PPCI': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  }, DateCount: {
                      cn: '日期',
                      en: 'DateCount',
                      width: 200,
                  }, DateCount_CR: {
                      cn: '完整性',
                      en: 'DateCount_CR',
                      width: 200,
                  },  DepPassengerSumCount: {
                      cn: '出港旅客总人数',
                      en: 'DepPassengerSumCount',
                      width: 280
                  }, DepPassengerSumCount_CR: {
                      cn: '完整性',
                      en: 'DepPassengerSumCount_CR',
                      width: 280
                  },ArrPassengerSumCount: {
                      cn: '进港旅客总人数',
                      en: 'ArrPassengerSumCount',
                      width: 280
                  },ArrPassengerSumCount_CR: {
                      cn: '完整性',
                      en: 'ArrPassengerSumCount_CR',
                      width: 280
                  }
              },
          },
          'ALOI': {
              'FLGH': {
                  id: {
                      cn: 'ID',
                      en: 'ID',
                      frozen:true
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updateTime : {
                      cn: '日期',
                      en: 'updateTime',
                      width: 200,
                  },planCount: {
                      cn: '计划总量',
                      en: 'planCount',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  }, crewReadyTimeCount: {
                      cn: '机组到位时间',
                      en: 'crewReadyTimeCount',
                      width: 200,
                  }, crewReadyTimeCount_CR: {
                      cn: '完整性',
                      en: 'crewReadyTimeCount_CR',
                      width: 200,
                  }, StartBoardingTimeCount: {
                      cn: '开始登机时间',
                      en: 'StartBoardingTimeCount',
                      width: 200,
                  }, StartBoardingTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartBoardingTimeCount_CR',
                      width: 200,
                  }, EndBoardingTimeCount: {
                      cn: '完成登机时间',
                      en: 'EndBoardingTimeCount',
                      width: 200,
                  }, EndBoardingTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndBoardingTimeCount_CR',
                      width: 200,
                  },  StartLuggageTimeCount: {
                      cn: '开始行李装载时间',
                      en: 'StartLuggageTimeCount',
                      width: 200,
                  }, StartLuggageTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartLuggageTimeCount_CR',
                      width: 200,
                  }, EndLuggageTimeCount: {
                      cn: '完成行李装载时间',
                      en: 'EndLuggageTimeCount',
                      width: 200,
                  }, EndLuggageTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndLuggageTimeCount_CR',
                      width: 200,
                  }, StartCateringTimeCount: {
                      cn: '开始配餐时间',
                      en: 'StartCateringTimeCount',
                      width: 200,
                  }, StartCateringTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartCateringTimeCount_CR',
                      width: 200,
                  },  EndCateringTimeCount: {
                      cn: '完成配餐时间',
                      en: 'EndCateringTimeCount',
                      width: 200,
                  }, EndCateringTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndCateringTimeCount_CR',
                      width: 200,
                  }, StartWaterTimeCount: {
                      cn: '开始加清水时间',
                      en: 'StartWaterTimeCount',
                      width: 200,
                  }, StartWaterTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartWaterTimeCount_CR',
                      width: 200,
                  }, EndWaterTimeCount: {
                      cn: '完成加清水时间',
                      en: 'EndWaterTimeCount',
                      width: 200,
                  }, EndWaterTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndWaterTimeCount_CR',
                      width: 200,
                  },  StartSewageTimeCount: {
                      cn: '开始排污时间',
                      en: 'StartSewageTimeCount',
                      width: 200,
                  }, StartSewageTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartSewageTimeCount_CR',
                      width: 200,
                  }, EndSewageTimeCount: {
                      cn: '完成排污时间',
                      en: 'EndSewageTimeCount',
                      width: 200,
                  }, EndSewageTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndSewageTimeCount_CR',
                      width: 200,
                  }, StartCleanTimeCount: {
                      cn: '开始保洁时间',
                      en: 'StartCleanTimeCount',
                      width: 200,
                  }, StartCleanTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartCleanTimeCount_CR',
                      width: 200,
                  },  EndCleanTimeCount: {
                      cn: '完成保洁时间',
                      en: 'EndCleanTimeCount',
                      width: 200,
                  }, EndCleanTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndCleanTimeCount_CR',
                      width: 200,
                  }, StartFuelTimeCount: {
                      cn: '开始供油时间',
                      en: 'StartFuelTimeCount',
                      width: 200,
                  }, StartFuelTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartFuelTimeCount_CR',
                      width: 200,
                  }, EndFuelTimeCount: {
                      cn: '完成供油时间',
                      en: 'EndFuelTimeCount',
                      width: 200,
                  }, EndFuelTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndFuelTimeCount_CR',
                      width: 200,
                  },  StartDeiceTimeCount: {
                      cn: '开始除冰时间',
                      en: 'StartDeiceTimeCount',
                      width: 200,
                  }, StartDeiceTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartDeiceTimeCount_CR',
                      width: 200,
                  }, EndDeiceTimeCount: {
                      cn: '完成除冰时间',
                      en: 'EndDeiceTimeCount',
                      width: 200,
                  }, EndDeiceTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndDeiceTimeCount_CR',
                      width: 200,
                  }, AeroBridgeOffTimeCount: {
                      cn: '离桥时间',
                      en: 'AeroBridgeOffTimeCount',
                      width: 200,
                  }, AeroBridgeOffTimeCount_CR: {
                      cn: '完整性',
                      en: 'AeroBridgeOffTimeCount_CR',
                      width: 200,
                  },  AeroBridgeOnTimeCount: {
                      cn: '靠桥时间',
                      en: 'AeroBridgeOnTimeCount',
                      width: 200,
                  }, AeroBridgeOnTimeCount_CR: {
                      cn: '完整性',
                      en: 'AeroBridgeOnTimeCount_CR',
                      width: 200,
                  }, DepPassengerStepsOffTimeCount: {
                      cn: '离港客梯车撤离时间',
                      en: 'DepPassengerStepsOffTimeCount',
                      width: 200,
                  }, DepPassengerStepsOffTimeCount_CR: {
                      cn: '完整性',
                      en: 'DepPassengerStepsOffTimeCount_CR',
                      width: 200,
                  },ArrPassengerStepsOnTimeCount: {
                      cn: '进港客梯车对接时间',
                      en: 'ArrPassengerStepsOnTimeCount',
                      width: 200,
                  }, ArrPassengerStepsOnTimeCount_CR: {
                      cn: '完整性',
                      en: 'ArrPassengerStepsOnTimeCount_CR',
                      width: 200,
                  },  DepShuttleOffTimeCount: {
                      cn: '离港摆渡车撤离时间',
                      en: 'DepShuttleOffTimeCount',
                      width: 200,
                  }, DepShuttleOffTimeCount_CR: {
                      cn: '完整性',
                      en: 'DepShuttleOffTimeCount_CR',
                      width: 200,
                  }, ArrShuttleReadyTimeCount: {
                      cn: '进港摆渡车到位时间',
                      en: 'ArrShuttleReadyTimeCount',
                      width: 200,
                  }, ArrShuttleReadyTimeCount_CR: {
                      cn: '完整性',
                      en: 'ArrShuttleReadyTimeCount_CR',
                      width: 200,
                  }, TrailerReadyTimeCount: {
                      cn: '拖车到位时间',
                      en: 'TrailerReadyTimeCount',
                      width: 200,
                  }, TrailerReadyTimeCount_CR: {
                      cn: '完整性',
                      en: 'TrailerReadyTimeCount_CR',
                      width: 200,
                  }, StartUnBoardTimeCount: {
                      cn: '开始下客时间',
                      en: 'StartUnBoardTimeCount',
                      width: 200,
                  }, StartUnBoardTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartUnBoardTimeCount_CR',
                      width: 200,
                  }, EndUnBoardTimeCount: {
                      cn: '完成下客时间',
                      en: 'EndUnBoardTimeCount',
                      width: 200,
                  }, EndUnBoardTimeCount_CR: {
                      cn: '完整性',
                      en: 'EndUnBoardTimeCount_CR',
                      width: 200,
                  }, LiftFrontWheelTimeCount: {
                      cn: '抬前轮时间',
                      en: 'LiftFrontWheelTimeCount',
                      width: 200,
                  }, LiftFrontWheelTimeCount_CR: {
                      cn: '完整性',
                      en: 'LiftFrontWheelTimeCount_CR',
                      width: 200,
                  }, LandingTimeCount: {
                      cn: '着陆时间',
                      en: 'LandingTimeCount',
                      width: 200,
                  }, LandingTimeCount_CR: {
                      cn: '完整性',
                      en: 'LandingTimeCount_CR',
                      width: 200,
                  }, LooseBrakeTimeCount: {
                      cn: '松刹车时间',
                      en: 'LooseBrakeTimeCount',
                      width: 200,
                  }, LooseBrakeTimeCount_CR: {
                      cn: '完整性',
                      en: 'LooseBrakeTimeCount_CR',
                      width: 200,
                  }, BrakeTimeCount: {
                      cn: '刹车时间',
                      en: 'BrakeTimeCount',
                      width: 200,
                  }, BrakeTimeCount_CR: {
                      cn: '完整性',
                      en: 'BrakeTimeCount_CR',
                      width: 200,
                  }, StartTaxiingTimeCount: {
                      cn: '开始滑行时间',
                      en: 'StartTaxiingTimeCount',
                      width: 200,
                  }, StartTaxiingTimeCount_CR: {
                      cn: '完整性',
                      en: 'StartTaxiingTimeCount_CR',
                      width: 200,
                  }, ActualDepartureTimeCount: {
                      cn: '实际离港时间',
                      en: 'ActualDepartureTimeCount',
                      width: 200,
                  }, ActualDepartureTimeCount_CR: {
                      cn: '完整性',
                      en: 'ActualDepartureTimeCount_CR',
                      width: 200,
                  }, ActualArrivalTimeCount: {
                      cn: '实际到港时间',
                      en: 'ActualArrivalTimeCount',
                      width: 200,
                  }, ActualArrivalTimeCount_CR: {
                      cn: '完整性',
                      en: 'ActualArrivalTimeCount_CR',
                      width: 200,
                  }, ActualGateCloseTimeCount: {
                      cn: '实际关舱门时间',
                      en: 'ActualGateCloseTimeCount',
                      width: 200,
                  }, ActualGateCloseTimeCount_CR: {
                      cn: '完整性',
                      en: 'ActualGateCloseTimeCount_CR',
                      width: 200,
                  }, ActualGateOpenTimeCount: {
                      cn: '实际开舱门时间',
                      en: 'ActualGateOpenTimeCount',
                      width: 200,
                  }, ActualGateOpenTimeCount_CR: {
                      cn: '完整性',
                      en: 'ActualGateOpenTimeCount_CR',
                      width: 200,
                  }, EnduranceDistanceCount: {
                      cn: '航班续航距离',
                      en: 'EnduranceDistanceCount',
                      width: 200,
                  }, EnduranceDistanceCount_CR: {
                      cn: '完整性',
                      en: 'EnduranceDistanceCount_CR',
                      width: 200,
                  },

              },
              'FPLN': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },PlanCount: {
                      cn: '计划总量',
                      en: 'PlanCount',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  }, PLNStatusCount: {
                      cn: '当日计划变更状态',
                      en: 'PLNStatusCount',
                      width: 200,
                  }, PLNStatusCount_CR: {
                      cn: '完整性',
                      en: 'PLNStatusCount_CR',
                      width: 200,
                  }, PLNRegNumberCount: {
                      cn: '变更航空器注册号',
                      en: 'PLNRegNumberCount',
                      width: 200,
                  }, PLNRegNumberCount_CR: {
                      cn: '完整性',
                      en: 'PLNRegNumberCount_CR',
                      width: 200,
                  }, PLNAircraftTypeCount: {
                      cn: '变更机型',
                      en: 'PLNAircraftTypeCount',
                      width: 200,
                  }, PLNAircraftTypeCount_CR: {
                      cn: '完整性',
                      en: 'PLNAircraftTypeCount_CR',
                      width: 200,
                  }, PLNDepApCount: {
                      cn: '变更离港机场',
                      en: 'PLNDepApCount',
                      width: 200,
                  }, PLNDepApCount_CR: {
                      cn: '完整性',
                      en: 'PLNDepApCount_CR',
                      width: 200,
                  }, PLNSobtCount: {
                      cn: '变更离港时间',
                      en: 'PLNSobtCount',
                      width: 200,
                  }, PLNSobtCount_CR: {
                      cn: '完整性',
                      en: 'PLNSobtCount_CR',
                      width: 200,
                  }, PLNSibtCount: {
                      cn: '变更进港时间',
                      en: 'PLNSibtCount',
                      width: 200,
                  }, PLNSibtCount_CR: {
                      cn: 'PLNSibtCount_CR',
                      en: 'PLNSibtCount_CR',
                      width: 200,
                  }, PLNArrApCount: {
                      cn: '变更目的地机场',
                      en: 'PLNArrApCount',
                      width: 200,
                  }, PLNArrApCount_CR: {
                      cn: '完整性',
                      en: 'PLNArrApCount_CR',
                      width: 200,
                  }, RemarkCount: {
                      cn: '备注',
                      en: 'RemarkCount',
                      width: 200,
                  }, RemarkCount_CR: {
                      cn: '完整性',
                      en: 'RemarkCount_CR',
                      width: 200,
                  },

              },
              'FPCI': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },planCount: {
                      cn: '计划总量',
                      en: 'planCount',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  },CheckinPassengerSumCount: {
                      cn: '已值机旅客人数',
                      en: 'CheckinPassengerSumCount',
                      width: 200,
                  },CheckinPassengerSumCount_CR: {
                      cn: '完整性',
                      en: 'CheckinPassengerSumCount_CR',
                      width: 200,
                  },BoardingPassengerSumCount: {
                      cn: '已登机旅客人数',
                      en: 'BoardingPassengerSumCount',
                      width: 200,
                  },BoardingPassengerSumCount_CR: {
                      cn: '完整性',
                      en: 'BoardingPassengerSumCount_CR',
                      width: 200,
                  },passengerDomesticSumCount: {
                      cn: '国内旅客总人数',
                      en: 'passengerDomesticSumCount',
                      width: 200,
                  },passengerDomesticSumCount_CR: {
                      cn: '完整性',
                      en: 'passengerDomesticSumCount_CR',
                      width: 200,
                  },passengerInternationalSumCount: {
                      cn: '国际旅客总人数',
                      en: 'passengerInternationalSumCount',
                      width: 200,
                  },passengerInternationalSumCount_CR: {
                      cn: '完整性',
                      en: 'passengerInternationalSumCount_CR',
                      width: 200,
                  },passengerAdultSumCount: {
                      cn: '成年旅客人数',
                      en: 'passengerAdultSumCount',
                      width: 200,
                  },passengerAdultSumCount_CR: {
                      cn: '完整性',
                      en: 'passengerAdultSumCount_CR',
                      width: 200,
                  },passengerChildSumCount: {
                      cn: '儿童旅客人数',
                      en: 'passengerChildSumCount',
                      width: 200,
                  },passengerChildSumCount_CR: {
                      cn: '完整性',
                      en: 'passengerChildSumCount_CR',
                      width: 200,
                  },passengerBabySumCount: {
                      cn: '婴儿旅客人数',
                      en: 'passengerBabySumCount',
                      width: 200,
                  },passengerBabySumCount_CR: {
                      cn: '完整性',
                      en: 'passengerBabySumCount_CR',
                      width: 200,
                  },cargoDomesticWeightCount: {
                      cn: '国内货物重量',
                      en: 'cargoDomesticWeightCount',
                      width: 200,
                  },cargoDomesticWeightCount_CR: {
                      cn: '完整性',
                      en: 'cargoDomesticWeightCount_CR',
                      width: 200,
                  },cargoInternationalWeightCount: {
                      cn: '国际货物重量',
                      en: 'cargoInternationalWeightCount',
                      width: 200,
                  },cargoInternationalWeightCount_CR: {
                      cn: '完整性',
                      en: 'cargoInternationalWeightCount_CR',
                      width: 200,
                  },mailDomesticWeightCount: {
                      cn: '国内邮件重量',
                      en: 'mailDomesticWeightCount',
                      width: 200,
                  },mailDomesticWeightCount_CR: {
                      cn: '完整性',
                      en: 'mailDomesticWeightCount_CR',
                      width: 200,
                  },mailInternationalWeightCount: {
                      cn: '国际邮件重量',
                      en: 'mailInternationalWeightCount',
                      width: 200,
                  },mailInternationalWeightCount_CR: {
                      cn: '完整性',
                      en: 'mailInternationalWeightCount_CR',
                      width: 200,
                  },luggageDomesticWeightCount: {
                      cn: '国内行李重量',
                      en: 'luggageDomesticWeightCount',
                      width: 200,
                  },luggageDomesticWeightCount_CR: {
                      cn: '完整性',
                      en: 'luggageDomesticWeightCount_CR',
                      width: 200,
                  },luggageInternationalWeightCount: {
                      cn: '国际行李重量',
                      en: 'luggageInternationalWeightCount',
                      width: 200,
                  },luggageInternationalWeightCount_CR: {
                      cn: '完整性',
                      en: 'luggageInternationalWeightCount_CR',
                      width: 200,
                  },luggageDomesticSumCount: {
                      cn: '国内行李数量',
                      en: 'luggageDomesticSumCount',
                      width: 200,
                  },luggageDomesticSumCount_CR: {
                      cn: '完整性',
                      en: 'luggageDomesticSumCount_CR',
                      width: 200,
                  },luggageInternationalSumCount: {
                      cn: '国际行李数量',
                      en: 'luggageInternationalSumCount',
                      width: 200,
                  },luggageInternationalSumCount_CR: {
                      cn: '完整性',
                      en: 'luggageInternationalSumCount_CR',
                      width: 200,
                  },cargoFreeLoadCount: {
                      cn: '腹仓剩余载量',
                      en: 'cargoFreeLoadCount',
                      width: 200,
                  },cargoFreeLoadCount_CR: {
                      cn: '完整性',
                      en: 'cargoFreeLoadCount_CR',
                      width: 200,
                  }

              },
              'FCRI': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },planCount: {
                      cn: '计划总量',
                      en: 'planCount',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  },flightCrewsCount: {
                      cn: '机组名单块',
                      en: 'flightCrewsCount',
                      width: 200,
                  },flightCrewsCount_CR: {
                      cn: '完整性',
                      en: 'flightCrewsCount_CR',
                      width: 200,
                  },CrewILSLevelCount: {
                      cn: '机组仪表飞行标准',
                      en: 'CrewILSLevelCount',
                      width: 200,
                  },CrewILSLevelCount_CR: {
                      cn: '完整性',
                      en: 'CrewILSLevelCount_CR',
                      width: 200,
                  },crewEstTimeoutTimeCount: {
                      cn: '机组预计超时时间',
                      en: 'crewEstTimeoutTimeCount',
                      width: 200,
                  },crewEstTimeoutTimeCount_CR: {
                      cn: '完整性',
                      en: 'crewEstTimeoutTimeCount_CR',
                      width: 200,
                  }

              },
              'FACI': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  },regNumberCount: {
                      cn: '航空注册器号',
                      en: 'regNumberCount',
                      width: 200,
                  },regNumberCount_CR: {
                      cn: '完整性',
                      en: 'regNumberCount_CR',
                      width: 200,
                  },aircraftTypeCount: {
                      cn: '机型',
                      en: 'aircraftTypeCount',
                      width: 200,
                  },aircraftTypeCount_CR: {
                      cn: '完整性',
                      en: 'aircraftTypeCount_CR',
                      width: 200,
                  },wingSpanLengthCount: {
                      cn: '翼展长度',
                      en: 'wingSpanLengthCount',
                      width: 200,
                  },wingSpanLengthCount_CR: {
                      cn: '完整性',
                      en: 'wingSpanLengthCount_CR',
                      width: 200,
                  },fuseLageLengthCount: {
                      cn: '机身长度',
                      en: 'fuseLageLengthCount',
                      width: 200,
                  },fuseLageLengthCount_CR: {
                      cn: '完整性',
                      en: 'fuseLageLengthCount_CR',
                      width: 200,
                  },startServiceTimeCount: {
                      cn: '机龄起始时间',
                      en: 'startServiceTimeCount',
                      width: 200,
                  },startServiceTimeCount_CR: {
                      cn: '完整性',
                      en: 'startServiceTimeCount_CR',
                      width: 200,
                  },
              }
          },
          'ATMI': {
              'FCDM': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  }, messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  }, sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  }, updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  }, planCount: {
                      cn: '计划总量',
                      en: 'planCount',
                      width: 200,
                  }, allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  }, CTOTCount: {
                      cn: '计算起飞时间',
                      en: 'CTOTCount',
                      width: 110
                  },CTOTCount_CR: {
                      cn: '完整性',
                      en: 'CTOTCount_CR',
                      width: 110
                  },COBTCount: {
                      cn: '计算撤轮档时间',
                      en: 'COBTCount',
                      width: 110
                  },COBTCount_CR: {
                      cn: '完整性',
                      en: 'COBTCount_CR',
                      width: 110
                  },TOBTCount: {
                      cn: '目标撤轮档时间',
                      en: 'TOBTCount',
                      width: 110
                  },TOBTCount_CR: {
                      cn: '完整性',
                      en: 'TOBTCount_CR',
                      width: 110
                  },TSATCount: {
                      cn: '目标许可开车时间',
                      en: 'TSATCount',
                      width: 110
                  },TSATCount_CR: {
                      cn: '完整性',
                      en: 'TSATCount_CR',
                      width: 110
                  },reasonCount: {
                      cn: '航班受控原因',
                      en: 'reasonCount',
                      width: 110
                  },reasonCount_CR: {
                      cn: '完整性',
                      en: 'reasonCount_CR',
                      width: 110
                  }
              },
              'FTMI': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  },
              },
              'PADR': {
                  id: {
                      cn: 'ID',
                      en: 'ID',
                      width: 130
                  },
              },
              'MDRS': {
                  id: {
                      cn: 'ID',
                      en: 'ID',
                      width: 130
                  },
              },
              'SECT': {
                  id: {
                      cn: 'ID',
                      en: 'ID',
                      width: 400
                  },
              },
          },
          'OSCI': {
              'FOSC': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  },MissionDateCount: {
                      cn: '计划执行日期',
                      en: 'MissionDateCount',
                      width: 200,
                  },MissionDateCount_CR: {
                      cn: '完整性',
                      en: 'MissionDateCount_CR',
                      width: 200,
                  },SDepAPCount: {
                      cn: '计划起飞机场',
                      en: 'SDepAPCount',
                      width: 200,
                  },SDepAPCountt_CR: {
                      cn: '完整性',
                      en: 'SDepAPCountt_CR',
                      width: 200,
                  },SOBTCount: {
                      cn: '计划离港时间',
                      en: 'SOBTCount',
                      width: 200,
                  },SOBTCountt_CR: {
                      cn: '完整性',
                      en: 'SOBTCountt_CR',
                      width: 200,
                  },SArrAPCount: {
                      cn: '计划目的地机场',
                      en: 'SArrAPCount',
                      width: 200,
                  },SArrAPCountt_CR: {
                      cn: '完整性',
                      en: 'SArrAPCountt_CR',
                      width: 200,
                  },aSIBTCount: {
                      cn: '计划到岗时间',
                      en: 'SIBTCount',
                      width: 200,
                  },SIBTCountt_CR: {
                      cn: '完整性',
                      en: 'SIBTCountt_CR',
                      width: 200,
                  },SAircraftTypeCount: {
                      cn: '计划机型',
                      en: 'SAircraftTypeCount',
                      width: 200,
                  },SAircraftTypeCountt_CR: {
                      cn: '完整性',
                      en: 'SAircraftTypeCountt_CR',
                      width: 200,
                  },STaskCount: {
                      cn: '计划任务性质',
                      en: 'aSTaskCount',
                      width: 200,
                  },STaskCountt_CR: {
                      cn: '完整性',
                      en: 'STaskCountt_CR',
                      width: 200,
                  },StatusCount: {
                      cn: '航班执行状态',
                      en: 'StatusCount',
                      width: 200,
                  },StatusCountt_CR: {
                      cn: '完整性',
                      en: 'StatusCountt_CR',
                      width: 200,
                  },PDepAPCount: {
                      cn: '预计起飞机场',
                      en: 'PDepAPCount',
                      width: 200,
                  },PDepAPCountt_CR: {
                      cn: '完整性',
                      en: 'PDepAPCountt_CR',
                      width: 200,
                  },EOBTCount: {
                      cn: '预计撤轮档时间',
                      en: 'EOBTCount',
                      width: 200,
                  }, EOBTCountt_CR: {
                      cn: '完整性',
                      en: 'EOBTCountt_CR',
                      width: 200,
                  },EETCount: {
                      cn: '预计总飞行时间',
                      en: 'EETCount',
                      width: 200,
                  },EETCountt_CR: {
                      cn: '完整性',
                      en: 'EETCountt_CR',
                      width: 200,
                  },PArrAPCount: {
                      cn: '预计目的地机场',
                      en: 'PArrAPCount',
                      width: 200,
                  },PArrAPCountt_CR: {
                      cn: '完整性',
                      en: 'PArrAPCountt_CR',
                      width: 200,
                  },ALNAPCount: {
                      cn: '预计备降机场',
                      en: 'ALNAPCount',
                      width: 200,
                  },ALNAPCountt_CR: {
                      cn: '完整性',
                      en: 'ALNAPCountt_CR',
                      width: 200,
                  },RAircraftTypeCount: {
                      cn: '实际机型',
                      en: 'RAircraftTypeCount',
                      width: 200,
                  },RAircraftTypeCountt_CR: {
                      cn: '完整性',
                      en: 'RAircraftTypeCountt_CR',
                      width: 200,
                  },ExecuteDateCount: {
                      cn: '实际执行日期',
                      en: 'ExecuteDateCount',
                      width: 200,
                  },ExecuteDateCountt_CR: {
                      cn: '完整性',
                      en: 'ExecuteDateCountt_CR',
                      width: 200,
                  },RDepAPCount: {
                      cn: '实际起飞机场',
                      en: 'RDepAPCount',
                      width: 200,
                  },RDepAPCountt_CR: {
                      cn: '完整性',
                      en: 'RDepAPCountt_CR',
                      width: 200,
                  },ATOTCount: {
                      cn: '实际起飞时间',
                      en: 'ATOTCount',
                      width: 200,
                  },ATOTCountt_CR: {
                      cn: '完整性',
                      en: 'ATOTCountt_CR',
                      width: 200,
                  },RArrAPCount: {
                      cn: '实际落地机场',
                      en: 'RArrAPCount',
                      width: 200,
                  },RArrAPCountt_CR: {
                      cn: '完整性',
                      en: 'RArrAPCountt_CR',
                      width: 200,
                  },ALDTCount: {
                      cn: '实际落地时间',
                      en: 'ALDTCount',
                      width: 200,
                  },ALDTCountt_CR: {
                      cn: '完整性',
                      en: 'ALDTCountt_CR',
                      width: 200,
                  },RegNumberCount: {
                      cn: '航空器注册号',
                      en: 'RegNumberCount',
                      width: 200,
                  },aRegNumberCountt_CR: {
                      cn: '完整性',
                      en: 'RegNumberCountt_CR',
                      width: 200,
                  },
              },
              'FPER': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },PlanCount: {
                      cn: '计划总量',
                      en: 'PlanCount',
                      width: 200,
                  }, allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  }, ETACount: {
                      cn: '航班预达时间',
                      en: 'ETACount',
                      width: 200,
                  }, ETACount_CR: {
                      cn: '完整性',
                      en: 'ETACount_CR',
                      width: 200,
                  }, DelayTimeCount: {
                      cn: '航班延误时间',
                      en: 'DelayTimeCount',
                      width: 200,
                  }, DelayTimeCount_CR: {
                      cn: '完整性',
                      en: 'DelayTimeCount_CR',
                      width: 200,
                  }, CloseWaitTimeCount: {
                      cn: '关舱门后等待时间',
                      en: 'CloseWaitTimeCount',
                      width: 200,
                  }, CloseWaitTimeCount_CR: {
                      cn: '完整性',
                      en: 'CloseWaitTimeCount_CR',
                      width: 200,
                  }, AXITCount: {
                      cn: '航班进港滑行时间',
                      en: 'AXITCount',
                      width: 200,
                  }, AXITCount_CR: {
                      cn: '完整性',
                      en: 'AXITCount_CR',
                      width: 200,
                  }, AXOTCount: {
                      cn: '航班离港滑行时间',
                      en: 'AXOTCount',
                      width: 200,
                  }, AXOTCount_CR: {
                      cn: '完整性',
                      en: 'AXOTCount_CR',
                      width: 200,
                  },
              },
              'PPER': {
                  id: {
                      cn: 'ID',
                      en: 'ID'
                  }, messageType : {
                      cn: '消息类型',
                      en: 'messageType',
                      width: 200,
                  },messageSubType : {
                      cn: '消息子类型',
                      en: 'messageSubType',
                      width: 200,
                  },sourceSystemID : {
                      cn: '消息源',
                      en: 'sourceSystemID',
                      width: 200,
                  },updatetime : {
                      cn: '日期',
                      en: 'updatetime',
                      width: 200,
                  },allCount: {
                      cn: '总量',
                      en: 'allCount',
                      width: 200,
                  }, HourlySchDepSumCount: {
                      cn: '机场小时计划离港架次',
                      en: 'HourlySchDepSumCount',
                      width: 200,
                  }, HourlySchDepSumCount_CR: {
                      cn: '完整性',
                      en: 'HourlySchDepSumCount_CR',
                      width: 200,
                  }, HourlySchArrSumCount: {
                      cn: '机场小时计划进港架次',
                      en: 'HourlySchArrSumCount',
                      width: 200,
                  }, HourlySchArrSumCount_CR: {
                      cn: '完整性',
                      en: 'HourlySchArrSumCount_CR',
                      width: 200,
                  }, HourlyActTakeOffSumCount_CR: {
                      cn: '完整性',
                      en: 'HourlyActTakeOffSumCount_CR',
                      width: 200,
                  }, HourlyActLandingSumCount: {
                      cn: '机场小时实际落地架次',
                      en: 'HourlyActLandingSumCount',
                      width: 200,
                  }, HourlyActLandingSumCount_CR: {
                      cn: '完整性',
                      en: 'HourlyActLandingSumCount_CR',
                      width: 200,
                  }, HourlyActTakeOffPunctualityRateCount: {
                      cn: '小时实际起飞正常率',
                      en: 'HourlyActTakeOffPunctualityRateCount',
                      width: 200,
                  }, HourlyActTakeOffPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlyActTakeOffPunctualityRateCount_CR',
                      width: 200,
                  }, DailyActTakeOffPunctualityRateCount: {
                      cn: '当日实际起飞正常率',
                      en: 'DailyActTakeOffPunctualityRateCount',
                      width: 200,
                  }, DailyActTakeOffPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailyActTakeOffPunctualityRateCount_CR',
                      width: 200,
                  }, HourlySchTakeOffPunctualityRateCount: {
                      cn: '小时计划起飞正常率',
                      en: 'HourlySchTakeOffPunctualityRateCount',
                      width: 200,
                  }, HourlySchTakeOffPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlySchTakeOffPunctualityRateCount_CR',
                      width: 200,
                  }, DailySchTakeOffPunctualityRateCount: {
                      cn: '当日计划起飞正常率',
                      en: 'DailySchTakeOffPunctualityRateCount',
                      width: 200,
                  }, DailySchTakeOffPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailySchTakeOffPunctualityRateCount_CR',
                      width: 200,
                  }, HourlyActDepPunctualityRateCount: {
                      cn: '小时实际离港正常率',
                      en: 'HourlyActDepPunctualityRateCount',
                      width: 200,
                  }, HourlyActDepPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlyActDepPunctualityRateCount_CR',
                      width: 200,
                  }, DailyActDepPunctualityRateCount: {
                      cn: '当日实际离港正常率',
                      en: 'DailyActDepPunctualityRateCount',
                      width: 200,
                  }, DailyActDepPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailyActDepPunctualityRateCount_CR',
                      width: 200,
                  }, HourlySchDepPunctualityRateCount: {
                      cn: '小时计划离港正常率',
                      en: 'HourlySchDepPunctualityRateCount',
                      width: 200,
                  }, HourlySchDepPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlySchDepPunctualityRateCount_CR',
                      width: 200,
                  }, DailySchDepPunctualityRateCount: {
                      cn: '当日计划离港正常率',
                      en: 'DailySchDepPunctualityRateCount',
                      width: 200,
                  }, DailySchDepPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailySchDepPunctualityRateCount_CR',
                      width: 200,
                  }, HourlyOriActTakeOffPunctualityRateCount: {
                      cn: '小时始发航班实际起飞正常率',
                      en: 'HourlyOriActTakeOffPunctualityRateCount',
                      width: 200,
                  }, HourlyOriActTakeOffPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlyOriActTakeOffPunctualityRateCount_CR',
                      width: 200,
                  }, DailyOriSchTakeOffPunctualityRateCount: {
                      cn: '当日始发航班实际起飞正常率',
                      en: 'DailyOriSchTakeOffPunctualityRateCount',
                      width: 200,
                  }, DailyOriSchTakeOffPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailyOriSchTakeOffPunctualityRateCount_CR',
                      width: 200,
                  }, HourlyOriSchTakeOffPunctualityRateCount: {
                      cn: '小时始发航班计划起飞正常率',
                      en: 'HourlyOriSchTakeOffPunctualityRateCount',
                      width: 200,
                  }, HourlyOriSchTakeOffPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlyOriSchTakeOffPunctualityRateCount_CR',
                      width: 200,
                  }, DailyOriSchTakeOffPunctualityRateCount: {
                      cn: '当日始发航班计划起飞正常率',
                      en: 'DailyOriSchTakeOffPunctualityRateCount',
                      width: 200,
                  }, DailyOriSchTakeOffPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailyOriSchTakeOffPunctualityRateCount_CR',
                      width: 200,
                  }, HourlyActClearancePunctualityRateCount: {
                      cn: '小时机场实际放行正常率',
                      en: 'HourlyActClearancePunctualityRateCount',
                      width: 200,
                  }, HourlyActClearancePunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlyActClearancePunctualityRateCount_CR',
                      width: 200,
                  }, DailyActClearancePunctualityRateCount: {
                      cn: '当日机场实际放行正常率',
                      en: 'DailyActClearancePunctualityRateCount',
                      width: 200,
                  }, DailyActClearancePunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailyActClearancePunctualityRateCount_CR',
                      width: 200,
                  }, HourlySchClearancePunctualityRateCount: {
                      cn: '机场计划放行正常率',
                      en: 'HourlySchClearancePunctualityRateCount',
                      width: 200,
                  }, HourlySchClearancePunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlySchClearancePunctualityRateCount_CR',
                      width: 200,
                  }, DailySchClearancePunctualityRateCount: {
                      cn: '当日机场计划放行正常率',
                      en: 'DailySchClearancePunctualityRateCount',
                      width: 200,
                  }, DailySchClearancePunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailySchClearancePunctualityRateCount_CR',
                      width: 200,
                  }, HourlyActLandingPunctualityRateCount: {
                      cn: '小时实际落地正常率',
                      en: 'HourlyActLandingPunctualityRateCount',
                      width: 200,
                  }, HourlyActLandingPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlyActLandingPunctualityRateCount_CR',
                      width: 200,
                  }, DailyActLandingPunctualityRateCount: {
                      cn: '当日实际落地正常率',
                      en: 'DailyActLandingPunctualityRateCount',
                      width: 200,
                  },DailyActLandingPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailyActLandingPunctualityRateCount_CR',
                      width: 200,
                  }, HourlySchLandingPunctualityRateCount: {
                      cn: '小时计划落地正常率',
                      en: 'HourlySchLandingPunctualityRateCount',
                      width: 200,
                  }, HourlySchLandingPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlySchLandingPunctualityRateCount_CR',
                      width: 200,
                  }, DailySchLandingPunctualityRateCount: {
                      cn: '当日计划落地正常率',
                      en: 'DailySchLandingPunctualityRateCount',
                      width: 200,
                  }, DailySchLandingPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailySchLandingPunctualityRateCount_CR',
                      width: 200,
                  }, HourlyActArrPunctualityRateCount: {
                      cn: '小时实际到港正常率',
                      en: 'HourlyActArrPunctualityRateCount',
                      width: 200,
                  }, HourlyActArrPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlyActArrPunctualityRateCount_CR',
                      width: 200,
                  }, DailyActArrPunctualityRateCount: {
                      cn: '当日实际到港正常率',
                      en: 'DailyActArrPunctualityRateCount',
                      width: 200,
                  }, DailyActArrPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailyActArrPunctualityRateCount_CR',
                      width: 200,
                  }, HourlySchArrPunctualityRateCount: {
                      cn: '小时计划到港正常率',
                      en: 'HourlySchArrPunctualityRateCount',
                      width: 200,
                  }, HourlySchArrPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'HourlySchArrPunctualityRateCount_CR',
                      width: 200,
                  }, DailySchArrPunctualityRateCount: {
                      cn: '当日计划到港正常率',
                      en: 'DailySchArrPunctualityRateCount',
                      width: 200,
                  }, DailySchArrPunctualityRateCount_CR: {
                      cn: '完整性',
                      en: 'DailySchArrPunctualityRateCount_CR',
                      width: 200,
                  },
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
      return cellvalue || '';
    }
  };

  // 格式化14位时间
  function fullTimeFormater(cellvalue, options, rowObject) {
    var val = cellvalue * 1;
    if ($.isValidVariable(cellvalue) && !isNaN(val) && cellvalue.length == 14) {
      return cellvalue.substring(6, 8) + '/' + cellvalue.substring(8, 10) + ':' + cellvalue.substring(10, 12) + ':' + cellvalue.substring(12, 14);
    } else {
      return cellvalue || '';
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
  var initTableOption = function (tableObj) {
    var colName = tableObj.colName;
    for (var i in colName) {
      tableObj.colModel[i] = {};
      tableObj.display[i] = {};
      tableObj.title[i] = {};
      var item = colName[i];
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
          if ($.isValidVariable(val.frozen)) {
            tableObj.colModel[i][k][j]['frozen'] = val.frozen;
          }


          tableObj.display[i][k][j] = {display: 1};
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

    updateUints(BasicData.qualityDataTypeObj.result, typeName, data);



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
    updateSelect(QualityData, typeName);
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
      initTableOption(tableObj);
      initTableOption(qualityTableObj)

    },
    historyDataTypeObj: historyDataTypeObj,
    operatingDataTypeObj: operatingDataTypeObj,
    qualityDataTypeObj: qualityDataTypeObj,
    tableObj: tableObj,
    qualityTableObj : qualityTableObj,
    modalContent : modalContent
  }
}();

$(document).ready(function () {
  BasicData.init();
});