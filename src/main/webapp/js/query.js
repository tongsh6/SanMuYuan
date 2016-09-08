/**
 * 综合查询
 */
function showQueryListPage() {
	var str = '';

	str += '<div id="querydiv" class="panel panel-default"> ';
	str += '<div class="panel-heading"> ';
	str += '<h3 class="panel-title">' + _menuname + '</h3> ';
	str += '</div> ';
	str += '<form id="queryform" class="form-horizontal" style="padding-top: 7px;padding-left: 15px;" role="form">';
	str += '<div class="form-group">';
	str += '<label  class="col-sm-1 control-label">开始日期</label>';
	str += '<div class="col-sm-2">';
	str += '<input type="text" class="datepicker form-control" name="begdate" id="begdate" value="">';
	str += '</div>';
	str += '<label class="col-sm-1 control-label">截止日期</label>';
	str += '<div class="col-sm-2">';
	str += '<input type="text" class="datepicker form-control" name="enddate" id="enddate" value="">';
	str += '</div>';
	str += '<div class="col-sm-1">';
	str += '<input type="button" class="btn btn-default form-control" value="本周" onclick=clickWeekMonthYear(this);>';
	str += '</div>';
	str += '<div class="col-sm-1">';
	str += '<input type="button" class="btn btn-default form-control" value="本月" onclick=clickWeekMonthYear(this);>';
	str += '</div>';
	str += '<div class="col-sm-1">';
	str += '<input type="button" class="btn btn-default form-control" value="本年" onclick=clickWeekMonthYear(this);>';
	str += '</div>';
	str += '</div>';
	str += '<div class="form-group">';
	str += '<label  class="col-sm-1 control-label">订单编号</label>';
	str += '<div class="col-sm-2">';
	str += '<input type="text" class="form-control" name="orderid" value="">';
	str += '</div>';
	str += '<label class="col-sm-1 control-label">客户编号</label>';
	str += '<div class="col-sm-2">';
	str += '<input type="text" class="form-control" name="weixinuserid" value="">';
	str += '</div>';
	str += '<label class="col-sm-1 control-label">产品编号</label>';
	str += '<div class="col-sm-2">';
	str += '<input type="text" class="form-control" name="productid" value="">';
	str += '</div>';
	str += '<div class="col-sm-1">';
	str += '<input type="button" class="form-control" id="querybin" value="查询" onclick=query(); />';
	str += '</div>';
	str += '</div>';
	str += '</form>';
	str += '</div> ';

	str += '<div id="mainpanel" class="panel panel-default">';
	str += '<table class="table table-responsive table-condensed table-bordered table-striped">';
	str += '<thead>';
	str += '<tr>';
	str += '<th>订单编号</th>';
	str += '<th>客户编号</th>';
	str += '<th>客户昵称</th>';
	str += '<th>产品编码</th>';
	str += '<th>产品名称</th>';
	str += '<th>实际价格</th>';
	str += '<th>订单内容</th>';
	str += '<th>订单剩余内容</th>';
	str += '<th>配送周期</th>';
	str += '<th>下次配送日期</th>';
	str += '<th>订单状态</th>';
	str += '</tr>';
	str += '</thead>';
	str += '</table>';
	str += '</div>';
	$("#maincontent").html(str);
	hideCapion();

	$(".datepicker").datepicker({
		language : "zh-CN",
		autoclose : true,// 选中之后自动隐藏日期选择框
		clearBtn : true,// 清除按钮
		todayBtn : true,// 今日按钮
		format : "yyyy-mm-dd"// 日期格式
	});
}
function query() {
	var formParam = $("#queryform").serialize();// 序列化表格内容为字符串

	jsonAjaxForm("post", "query/list/1?pagesize=" + _mainpagesize, formParam, queryCallBack);
}

function queryCallBack(data) {
	var str = '';
	str += '<table class="table table-responsive table-condensed table-bordered table-striped">';
	str += '<thead>';
	str += '<tr>';
	str += '<th>订单编号</th>';
	str += '<th>客户编号</th>';
	str += '<th>客户昵称</th>';
	str += '<th>产品编码</th>';
	str += '<th>产品名称</th>';
	str += '<th>实际价格</th>';
	str += '<th>订单内容</th>';
	str += '<th>订单剩余内容</th>';
	str += '<th>配送周期</th>';
	str += '<th>下次配送日期</th>';
	str += '<th>订单状态</th>';
	str += '</tr>';
	str += '</thead>';

	str += '<tbody>';

	if (data != null && data.length > 0) {
		for (i = 0; i < data.length; i++) {
			str += '<tr>';
			str += '<td>' + data[i].orderid + '</td>';
			str += '<td>' + data[i].weixinid + ' </td>';
			str += '<td>' + data[i].nickname + '</td>';
			str += '<td>' + data[i].productid + '</td>';
			str += '<td>' + data[i].productname + '</td>';
			str += '<td align="right">' + data[i].price + '</td>';
			str += '<td>' + data[i].detail + '</td>';
			str += '<td>' + data[i].adetail + '</td>';
			str += '<td align="center">' + data[i].cycle + '</td>';
			str += '<td align="center">' + data[i].nextdate + '</td>';
			str += '<td align="center">' + data[i].state + '</td>';
			str += '</tr>';
		}
	}
	str += '</tbody>';
	str += '</table>';
	$("#mainpanel").html(str);
	hideCapion();
}

function clickWeekMonthYear(obj) {
	var value = obj.value;
	var array = {};

	switch (value) {
	case "本周":
		array = dateRangeUtil.getCurrentWeek();
		break;
	case "本月":
		array = dateRangeUtil.getCurrentMonth();
		break;
	case "本年":
		array = dateRangeUtil.getCurrentYear();
		break;
	}
	$("#begdate").val(array[0].Format("yyyy-MM-dd"));
	$("#enddate").val(array[1].Format("yyyy-MM-dd"));
	$("#querybin").click();
}