var HistoryData = function () {

    // URL
    var submitUrl = 'http://192.168.243.104:1566/shareDataPlatform/hisDataCount/';
    var startDateSelector ='start-date-input';
    var endDateSelector ='end-date-input';
    var typeSelector = 'history-data-type-select';
    var subTypeSelector = 'history-data-subtype-select';
    var unitSelector = 'history-data-unit-select';

    //起始时间
    var startDate = '';
    //截止时间
    var endDate = '';
    //当前选中的类型值
    var currentType = '';
    //当前选中的类型索引位置
    var index = -1;
    //当前选中的子类型值
    var currentSubtype = [];
    //当前选中的单位值
    var currentUnit = [];
    //图表对象
    var dataCountChart = {};
    var fileCountChart = {};
    //图表配置
    var echartOption = {
        legend : [],
        date : [],
        fileCount : [],
        dataCount : [],
        seriesType : 'bar',
        colors: ['#9abcc3','#CCCCFF','#1ABB9C','#3498DB','#E74C3C'],
    };
    // 初始化组件
    var initComponent = function () {

        //初始化下拉列表多选插件
        initBootstrapSelect();
        //设置上传单位名称为默认选中的类型
        toggleTypeLabel(currentType);
        //设置默认时间
        initDates();
        //初始化日历插件datepicker
        initDatepicker();
        //绑定Window事件，窗口变化时重新调整表格大小
        initDocumentResize();

    };
    // 初始化事件绑定
    var initEvent = function () {
        // 导航
        initNavTabEvent();
        // 提交按钮
        initSubmitEvent();
    };

    /**
     * 导航事件
     * */

    var initNavTabEvent = function () {
        $('.nav-history-data-statistics').on('click',function () {
            // 计算echarts容器高度
            $('.charts-wrap').height(getChartsWrapHeight()-20);
            // 若数据总数图表存在，则重新设置图表尺寸
            if($.isValidObject(dataCountChart)){
                dataCountChart.resize();
            }
            // 若文件总数图表存在，则重新设置图表尺寸
            if($.isValidObject(fileCountChart)){
                fileCountChart.resize();
            }
        });


    };

    /**
     * 提交按钮事件
     * */
    var initSubmitEvent = function () {
      $('.history-data-btn').on('click',function () {
          // 处理表单提交
          handleSubmitForm();
      });
    };


    /**
     * 处理表单提交
     * */
    var handleSubmitForm = function () {

        //处理数据
        handleFormData();
        //校验表单
        var bool = validateForm();
        if(!bool){
            //警告
            var mess = "请输入正确的起始时间或截止时间,日期格式:YYYYMMDD";
            showAlear(mess);
            return;
        }else {
            //拼接参数
            var str = concatParameter();
            //数据查询
            searchData(str);
        }
    };

    /**
     * 校验表单
     * */
    var validateForm = function () {
        var valid = true;
        var regexp = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/;
        //起始时间
        var startDateValid = regexp.test(startDate);
        //起始时间
        var endDateValid = regexp.test(endDate);

        if(!startDateValid){
            valid = false;
        }else if(!endDateValid){
            valid = false;
        }
        return valid;
    };

    /**
     *  处理数据
     * */
    var handleFormData = function () {
        //起始时间
        startDate = $('.' + startDateSelector).val();
        endDate = $('.' + endDateSelector).val();
        // 当前选中的子类型值(数组)
        currentSubtype =$('#'+ subTypeSelector).val();
        // 当前选中的单位值(数组)
        currentUnit = $('#' + unitSelector).val();
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
        var str = [startDate,endDate,currentType,subtypeVal,unitVal].join('/');
        return str;
    };

    /**
     *  警告
     *
     *  mess str 警告信息内容
     * */
    var showAlear = function (mess) {
        var $dom = $('.alert-container');
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
     *
     * 提示
     * */

    var showTip = function () {
        $('.history-data-statistics .no-datas-tip').show();
    };

    /**
     * 清空提示
     * */
    var clearTip = function () {
        $('.history-data-statistics .no-datas-tip').hide();
    };

    /**
     * 数据查询
     * */
    var searchData = function (str) {
        var url  = submitUrl + str;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, xhr) {
                // 当前数据
                if ($.isValidObject(data) && $.isValidVariable(data.status) && '200' == data.status) {


                    // 清空警告
                    clearAlert();
                    //清空提示
                    clearTip();

                    //提取数据
                    var time = data.generatetime;
                    var result = data.hisData;
                    // 更新数据时间
                    if($.isValidVariable(time)){
                        // 更新数据时间
                        updateGeneratetime(time);
                    }
                    // 若数据为空
                    if(!$.isValidObject(result)){
                        //清空图表
                        clearChart(dataCountChart);
                        clearChart(fileCountChart);
                        // 置空图表对象
                        dataCountChart = {};
                        fileCountChart = {};
                        //显示提示
                        showTip();
                        return;
                    }

                    //转换数据
                    convertData(result);
                    //初始化图表
                    initEcharts();

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
     * 转换数据
     * */

    var convertData = function (result) {
        // 转换图例数据
        convertLegend();
        // 转换日期时间数据(横轴类目)
        convertDates(result);
        //转换 数据系列
        convertSeriesData(result);
        // console.log(echartOption);
    };
    /**
     * 转换图例数据
     * */
    var convertLegend = function () {
        var arr = [];
        //当前子类型
        var subtypes = currentSubtype  || getSubtypes(BasicData.historyDataTypeObj.result[currentType].subtype );
        // 当前子类型对应的中文名称
        subtypes.map(function (item) {
            var itemCN = BasicData.historyDataTypeObj.result[currentType].subtype[item];
            arr.push(itemCN);
        });

        echartOption.legend = arr;
    };
    /**
     *  转换日期时间数据(横轴类目)
     *
     *  obj 数据集合
     * */
    var convertDates = function (obj) {
        var arr = [];
        // 数据集合是以日期为字段的，所以取字段名
        for(var k in obj){
            arr.push(k);
        };
        echartOption.date = arr;
    };

    /**
     *  转换 数据系列
     *
     * */
    var convertSeriesData = function (result) {
        // 置空图表配置对象中的数据总数集合和文件总数集合
        echartOption.fileCount = [];
        echartOption.dataCount = [];
        // 当前子类型
        var subtypes = currentSubtype  || getSubtypes(BasicData.historyDataTypeObj.result[currentType].subtype );
        subtypes.map(function (item,index) {
            // 新建对象
            var fileCountObj = {
                name : BasicData.historyDataTypeObj.result[currentType].subtype[item], // 当前子类型对应的中文名称
                type : echartOption.seriesType,
                itemStyle : {
                    normal : {
                        color: echartOption.colors[index],
                    }
                },
                data : []
            };
            var dataCountObj = {
                name : BasicData.historyDataTypeObj.result[currentType].subtype[item], // 当前子类型对应的中文名称
                type : echartOption.seriesType,
                itemStyle : {
                    normal : {
                        color: echartOption.colors[index],
                    }
                },
                data : []
            };
            // 遍历数据日期
            echartOption.date.map(function (d) {
                if(!$.isValidObject(result[d][item])){
                    return;
                }
                var obj = result[d][item][0]; // 数据目标对象
                if($.isValidObject(obj)){
                    // 更新对象data
                    fileCountObj.data.push(obj.fileCount);
                    dataCountObj.data.push(obj.dataCount);
                }
            });
            // 向数据总数集合和文件总数集合追加对象
            echartOption.fileCount.push(fileCountObj);
            echartOption.dataCount.push(dataCountObj) ;
        });

    };

    var getSubtypes = function (obj) {
        var arr = [];
        for(var i in obj){
            arr.push(i);
        }
        return arr;
    };

    /**
     * 初始化图表
     * */
    var initEcharts = function () {
        // 数据总数图表
        createDataCountChart();
        // 文件总数图表
        createFileCountChart();
    };

    /**
     * 数据总数图表
     * */
    var createDataCountChart = function () {
        // 先清空图表
        clearChart(dataCountChart);
        // 图表初始化
        dataCountChart = echarts.init($('#data-count')[0]);
        // 图表使用
        var opt = {
            animation: false,
            title : {
                text: '数据总数',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },

            legend: {
                data: echartOption.legend,
            },

            xAxis: [
                {
                    type: 'category',
                    data: echartOption.date,

                }
            ],
            yAxis: [
                {
                    type: 'value',

                }
            ],
            dataZoom: {
                show: true,
                realtime: true,
            },
            series: echartOption.dataCount,
        };
        dataCountChart.setOption(opt);
        //绑定自适应大小
        $(window).resize(function () {
            dataCountChart.resize();
        });
    };

    /**
     * 文件总数图表
     * */
    var createFileCountChart = function () {
        // 若图表已经存在，则先清空图表
        if($.isValidObject(fileCountChart)){
            clearChart(fileCountChart);
        }
        // 图表初始化
        fileCountChart = echarts.init($('#file-count')[0]);
        // 图表使用
        var option = {
            animation: false,
            title : {
                text: '文件总数',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },

            legend: {
                data: echartOption.legend,
            },

            xAxis: [
                {
                    type: 'category',
                    // boundaryGap: false,
                    data: echartOption.date,

                }
            ],
            yAxis: [
                {
                    type: 'value',

                    /*axisLabel : {
                     formatter: '{value} 架次'
                     }*/
                }
            ],
            dataZoom: {
                show: true,
                realtime: true,
                // orient: 'vertical',   // 'horizontal'
                //x: 0,
                // y: 380,
                //width: 400,
                // height: 20,
                // backgroundColor: 'rgba(221,160,221,0.5)',
                // dataBackgroundColor: 'rgba(138,43,226,0.5)',
                //fillerColor: 'rgba(38,143,26,0.6)',
                //handleColor: 'rgba(128,43,16,0.8)',
                //xAxisIndex:[],
                //yAxisIndex:[],
                // start: 0,
                // end: 100
            },
            series: echartOption.fileCount,
        };
        fileCountChart.setOption(option);
        //绑定自适应大小
        $(window).resize(function () {
            fileCountChart.resize();
        })
    };

    /**
     * 清空图表
     * */
    var clearChart = function (chart) {
        // 若图表已经存在，则清空图表
        if($.isValidObject(chart)){
            chart.clear();
            chart.dispose();
        }
    };

    /**
     *  更新数据时间
     * */
    var updateGeneratetime = function(time){
        var timeFormatter = formateTime(time);
        $('.history-data-statistics .generate-time').text('数据生成时间: ' + timeFormatter);
    };

    /**
     *  清空数据时间
     * */
    var clearGeneratetime = function () {
        $('.history-data-statistics .generate-time').empty();
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

    /**
     * 绑定Window事件，窗口变化时重新调整表格大小
     * */
    var initDocumentResize = function () {
        $(window).resize(function () {
            if($('.history-data-statistics').is(":visible") ){
                $('.charts-wrap').height(getChartsWrapHeight()-20);
            }
        });
    };

    /**
     *  计算表格初始化前父容器的高度
     * */
    var getChartsWrapHeight = function () {
        var  body = $('body').height();
        var head = $('.headbar').outerHeight() + parseInt($('.headbar').css('marginBottom'));
        var  nav = $('.nav-menu').outerHeight() +parseInt($('.nav-menu').css('marginBottom'));
        var  innerNav = $('.history-data-title').outerHeight() +parseInt($('.history-data-title').css('marginBottom'));
        var  form = $('.form-wrap').outerHeight() +parseInt($('.form-wrap').css('marginBottom'));
        return body - head - nav - innerNav-form;
    };


    /**
     * 初始化下拉列表多选插件
     * */
    var initBootstrapSelect = function(){
        //类型
        $('#'+ typeSelector).selectpicker({
            // liveSearch: true,
            // maxOptions: 1,
        }).on('hidden.bs.select',function () {
            var $this = $(this);
            var val = $this.val();
            if(val && val != HistoryData.currentType){
                currentType = $('#'+ typeSelector).val();
                HistoryData.currentType = $('#'+ typeSelector).val();
                updateSelectPicker(val);
                toggleTypeLabel(val);
            }
        });
        //设置当前选中的类型
        currentType = $('#'+ typeSelector).val();
        HistoryData.currentType = $('#'+ typeSelector).val();

        //子类型
        $('#'+subTypeSelector).selectpicker({
            liveSearch: true,
            // maxOptions: 1
            // actionsBox: true
        });


        //单位
        $('#'+unitSelector).selectpicker({
            liveSearch: true,
            actionsBox: true
        });
    };

    /**
     * 更新下拉列表
     * */
    var updateSelectPicker = function (typeName) {
        var typeObj = BasicData.historyDataTypeObj;
        var subtypeStr = concatOptionString(typeObj.result[typeName].subtype);
        var units = typeObj.result[typeName].unit;
        var unitListStr = concatOptionString(units);
        $('#'+ subTypeSelector).empty().append( subtypeStr ).selectpicker('refresh');
        $('#'+ unitSelector).empty().append( unitListStr ).selectpicker('refresh');
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
     * 切换类型标签
     * val 选中的单选按钮值
     */
    var toggleTypeLabel = function (typeName) {
        index = BasicData.operatingDataTypeObj.val.indexOf(typeName);
        var label = BasicData.operatingDataTypeObj.label[index];
        $('.history-data-statistics .type-label').text(label);
    };


    /**
     *  设置默认时间
     * */
    var initDates = function () {
        var nowDate = $.getFullTime(new Date()).substring(0,8);
        $('.'+ startDateSelector).val(nowDate);
        $('.' + endDateSelector).val(nowDate);
    };

    /**
     * 初始化日期插件datepicker
     * */
    var initDatepicker = function () {
        $('.history-data-statistics .date-datepicker').datepicker({
            language: "zh-CN",
            showOnFocus: false, //是否在获取焦点时显示面板 true显示 false不显示 默认true
            autoclose: true, //选择日期后自动关闭面板
            // clearBtn: true, //是否显示清空按钮
            //todayHighlight: true,
            // startDate: '0d', //可选日期的开始日期 0d:当前 -1d:当前的前1天, +1d:当前的后1天
            endDate: '0d', //可选日期最后日期
            keepEmptyValues: true,
            // forceParse: true,
            //格式化
            format: 'yyyymmdd',
        }) ;
    };


    return {
        init : function () {
            // 初始化组件
            initComponent();
            // 初始化事件绑定
            initEvent();
        },
        updateSelectPicker : updateSelectPicker,
        currentType: currentType,
    }
}();

$(document).ready(function () {
    HistoryData.init();
});