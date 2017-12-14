var OperatingData = function () {
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


    /**
     * 表格实例对象
     * */
    var tableInstance;
    var canvasId = "tb-datas-canvas";
    var tableId = "tb-datas";
    var pagerId = "table-datas-pager";

    /**
     * 初始化表格
     * */
    var initTable = function () {
        // 若表格已经存在，则重新加载表格(清空表格头及表格数据)
        if($.isValidObject(tableInstance)){
            $.jgrid.gridUnload("tb-datas");
        }
        //生成表格实例
        tableInstance = new FlightGridTable({
            canvasId: canvasId,
            tableId: tableId,
            pagerId: pagerId,
            colNames: BasicData.tableObj.colName[currentType][currentSubtype],
            colModel: BasicData.tableObj.colModel[currentType][currentSubtype],
            cmTemplate: BasicData.tableObj.cmTemplate,
            colDisplay: BasicData.tableObj.display[currentType][currentSubtype],
            colStyle: {},
            colTitle: BasicData.tableObj.title[currentType][currentSubtype],
            colEdit: {},

            //colConverter: FlightGridTableDataUtil,
            params: {
                scorll: true,
                shrinkToFit: false,
                // rowNum: 999999,
                //sortname: 'EOBT',
                // sortorder: 'asc',
                // sortname: 'SEQ',//排序列
                // 是否显示行号
                rownumbers: true,
                //是否显示快速过滤
                showQuickFilter: true,
                rowNum :40, //表格中可见的记录数
                scroll : true, //创建动态滚动表格。当设为启用时，pager被禁用，可使用垂直滚动条来装入数据。
                afterSearchCallBack : function(){

                }
            }
        });

        //初始化
        tableInstance.initGridTableObject();
        tableInstance.resizeToFitContainer();
    };



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
    var searchUrl = iphost + 'shareDataPlatform/dataSearch/';
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
        //初始化日历插件datepicker
        initDatepicker();
        //设置默认时间
        initDates();
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
        // $('.date-input').val(nowDate);

        $('#bootstrap-modal-dialog-body .date-datepicker').datepicker('setDate', $.parseFullTime(nowDate+'0000') );
    };

    /**
     * 初始化日期插件datepicker
     * */
    var initDatepicker = function () {
        $('#bootstrap-modal-dialog-body .date-datepicker').datepicker({
            language: "zh-CN",
            // showOnFocus: false, //是否在获取焦点时显示面板 true显示 false不显示 默认true
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

    /**
     * 处理表单提交
     * */
    var handleSubmitForm = function (btn) {
        //处理数据
        handleFormData();
        //校验表单
        var validate = validateForm();
        if(!validate.valid){

            showAlear(validate);
            return;
        }else {
            // 清空警告
            clearAlert();
            // 清空提示
            clearTip();

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
        var nowDate = $.getFullTime( new Date()).substring(0,8);
        var regexp = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/;
        //起始时间
        var dateVal = regexp.test(date);

        if(!dateVal){

            return {
                valid : false,
                mess : '请输入正确的时间,日期格式:YYYYMMDD'
            }
        }else if(date.substring(0,8) *1 > nowDate*1){
            return {
                valid : false,
                mess : "时间不能晚于今日"
            }
        } else if(currentSubtype == null){
            return {
                valid : false,
                mess : "信息子类型不能为空"
            }
        }

        return {
            valid : true
        }

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
        var load = Ladda.create(btn);
        load.start();
        $('.modal-content').addClass('no-event');
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
                    // 若数据为空
                    if(!$.isValidObject(result)){
                        // 若表格已经存在，则重新加载表格(清空表格头及表格数据)
                        if($.isValidObject(tableInstance)){
                            $.jgrid.gridUnload("tb-datas");
                        }
                        //显示提示
                        showTip();

                        load.stop();
                        $('.modal-content').removeClass('no-event');
                        //隐藏模态框
                        toggleModal(false);
                        return;
                    }
                    //初始化表格
                    initTable();
                    //表格数据加载
                    // tableLoad(result);
                    fireDataChange( result);

                    load.stop();
                    $('.modal-content').removeClass('no-event');
                    //隐藏模态框
                    toggleModal(false);

                } else if($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
                    var err = "查询失败:" + data.error;
                    showAlear(err);
                    load.stop();
                    $('.modal-content').removeClass('no-event');
                }else {
                    showAlear("查询失败");
                    load.stop();
                    $('.modal-content').removeClass('no-event');
                }

            },
            error: function (xhr, status, error) {
                load.stop();
                $('.modal-content').removeClass('no-event');
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
        //显示提示
        showTip();
        showTip();
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
    var showAlear = function (validate) {
        var mess = '';
        if($.isValidObject(validate)){
            mess = validate.mess;
        }else if($.isValidVariable(validate)){
            mess = validate;
        }
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
     *
     * 提示
     * */

    var showTip = function () {
        $('.operating-data-query .no-datas-tip').show();
    };

    /**
     * 清空提示
     * */
    var clearTip = function () {
        $('.operating-data-query .no-datas-tip').hide();
    };

    /**
     * 初始化表格
     * */
   /* var initTable = function () {
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
    };*/
    /**
     *  表格数据加载
     * */
    var tableLoad = function (data) {
        $('#tb-datas').bootstrapTable('load',data);
    };

    /**
     * 触发表格全部数据更新
     * @param flights
     * @param generateTime
     */
    var fireDataChange = function (obj) {

        var tableData = [];
        var tableMap = {};
        for (var index in obj) {
            var d = obj[index];
            tableData.push(d);
            tableMap[index] = d;
        }

       /* var sortTableData = tableData;
        //var sortTableData=sortGridData(tableData, ['ORDER', 'SOBT']);
        tableInstance.tableData = sortTableData;*/

        //绘制表格
        tableInstance.tableDataMap = tableMap;
        tableInstance.tableData = tableData;

        tableInstance.drawGridTableData();


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
            // 调整表格所在容器大小以适应窗口大小
            $('.table-contianer').height(getTableContianerHeight()-20);
            //调整表格大小以适应所在容器
            if($.isValidObject(tableInstance)){
                tableInstance.resizeToFitContainer();
            }
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