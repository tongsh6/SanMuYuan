/*
 * Orders beg
 */
function showOrdersListPage(data) {
	var str = "<div class='panel-heading no-collapse' style='height:50px;'>" + "<div style='float:left;'><h5>" + _menuname + "</h5></div>";
	str += "<div style='float:right;'><button id='addorderpagebtn' class='btn btn-danger'><i class='fa fa-plus'></i>&nbsp;新增</button></div>";
	str += "<div style='float:right;padding-right: 5px;'><button id='addviporderpagebtn' class='btn btn-danger'><i class='fa fa-plus'></i>&nbsp;新增会员卡订单</button></div>";
	str += "</div>";
	str += "<table id='ordertable' class='table table-responsive table-condensed table-bordered table-striped'>";
	str += "<thead>";
	str += "<tr>";
	str += "<th>订单编号</th>";
	str += "<th>客户编号</th>";
	str += "<th>产品编号</th>";
	str += "<th>实际价格</th>";
	str += "<th>备注</th>";
	str += "<th>操作</th>";
	str += "</tr>";
	str += "</thead>";

	str += "<tbody>";

	if (data != null && data.length > 0) {
		for (i = 0; i < data.length; i++) {
			str += "<tr>";
			str += "<td>" + data[i].orderid + "</td>";
			str += "<td>" + data[i].id + "</td>";
			str += "<td>" + data[i].productid + "</td>";
			str += "<td align='right'>" + data[i].price + "</td>";
			str += "<td>" + data[i].remark + "</td>";
			str += "<td align='center'><a href='javascript:void(0);' onclick=editOrder(this.parentNode.parentNode)><i class='fa fa-pencil'></i></a>&nbsp;&nbsp;";
			str += "<a role='button' data-toggle='modal' href='javascript:void(0);' onclick=delOrder('" + data[i].orderid + "')><i class='fa fa-trash-o'></i></a></td>";
			str += "</tr>";
		}
	}
	str += "</tbody>";

	str += "</table>";
	$("#mainpanel").html(str);
	$("#addorderpagebtn").click(addOrdersPage);
	$("#addviporderpagebtn").click(addVipCardOrdersPage);
	hideCapion();
}
var addCountNum = 0;
/**
 * 添加会员卡订单
 */
function addVipCardOrdersPage() {
	if (addCountNum > 0) {
		alert("请先保存！");
		return;
	}
	var str = "";
	str += "<tr>";
	str += "<td>" + '<input type="text" id="orderid" value="' + "" + '" class="form-control" readonly> ' + "</td>";
	str += '<td><input type="text" id="openid" class="form-control" value="请填写卡号"></td>';
	str += "<td><input type='hidden' id='productid'/>" + '<input type="text" id="productview" value="" class="form-control" readonly >' + "</td>";
	str += "<td>" + '<input type="number" id="price" value="' + "" + '" class="form-control" style="text-align:right;"> ' + "</td>";
	str += "<td>" + '<textarea id="remark" value="' + "" + '" class="form-control"/> ' + "</td>";
	str += "<td align='center'><a href='javascript:void(0);' title='保存' id='saveorderpagebtn'><i class='fa fa-save'></i></a>&nbsp;&nbsp;";
	str += "<a href='javascript:void(0);' title='取消' id='undobtn'><i class='fa fa-undo'></i></a></td>";
	str += "</tr>";

	addTr("ordertable", 0, str);
	$("#saveorderpagebtn").click(function() {
		operOrder("save");
	});
	$("#undobtn").click(unDoOrder);
	$("#productview").click(function() {
		showProductListPanel();
	});
	addCountNum++;
}
function addOrdersPage() {
	if (addCountNum > 0) {
		alert("请先保存！");
		return;
	}
	var str = "";
	str += "<tr>";
	str += "<td>" + '<input type="text" id="orderid" value="' + "" + '" class="form-control" readonly> ' + "</td>";
	str += "<td><input type='hidden' id='openid'/>" + '<input type="text" id="weixinuserid" value="' + "" + '" class="form-control" readonly> ' + "</td>";
	str += "<td><input type='hidden' id='productid'/>" + '<input type="text" id="productview" value="" class="form-control" readonly >' + "</td>";
	str += "<td>" + '<input type="number" id="price" value="' + "" + '" class="form-control" style="text-align:right;"> ' + "</td>";
	str += "<td>" + '<textarea id="remark" value="' + "" + '" class="form-control"/> ' + "</td>";
	str += "<td align='center'><a href='javascript:void(0);' title='保存' id='saveorderpagebtn'><i class='fa fa-save'></i></a>&nbsp;&nbsp;";
	str += "<a href='javascript:void(0);' title='取消' id='undobtn'><i class='fa fa-undo'></i></a></td>";
	str += "</tr>";

	addTr("ordertable", 0, str);
	$("#saveorderpagebtn").click(function() {
		operOrder("save");
	});
	$("#undobtn").click(unDoOrder);

	$("#weixinuserid").click(function() {
		showWeixinUserListPanel();
	});
	$("#productview").click(function() {
		showProductListPanel();
	});
	addCountNum++;
}

function editOrder(tr) {
	if (addCountNum > 0) {
		alert("请先保存！");
		return;
	}
	var orderid = tr.cells[0].textContent;
	if (orderid == "") {
		showCapionMsg("未知错误！");
	} else {
		jsonAjax("get", "orders/info?orderid=" + orderid, function(data) {
			tr.cells[0].innerHTML = '<input type="text" id="orderid" value="' + orderid + '" class="form-control" readonly>';
			tr.cells[1].innerHTML = '<input type="hidden" id="openid" value="' + data.openid + '"/><input type="text" id="weixinuserid" value="' + data.id + '(' + data.nickname + ')' + '" class="form-control" readonly> ';
			tr.cells[2].innerHTML = '<input type="hidden" id="productid" value="' + data.productid + '"/><input type="text" id="productview" value="' + data.productid + '(' + data.productname + ')' + '" class="form-control" readonly>';
			tr.cells[3].innerHTML = '<input type="number" id="price" value="' + data.price.replace(/,/gm, '') + '" class="form-control" style="text-align:right;"> ';
			tr.cells[4].innerHTML = '<textarea id="remark" class="form-control">' + data.remark + '</textarea> ';
			var html = '<a href="javascript:void(0);" title="保存" id="saveorderpagebtn"><i class="fa fa-save"></i></a>&nbsp;&nbsp;';
			html += '<a href="javascript:void(0);" title="取消"  onclick=unDoOrder()><i class="fa fa-undo"></i></a></td>';
			tr.cells[5].innerHTML = html;
			tr.cells[5].align = "center";
			$("#saveorderpagebtn").click(function() {
				operOrder("update");
			});
			$("#weixinuserid").click(function() {
				showWeixinUserListPanel();
			});
			$("#productview").click(function() {
				showProductListPanel();
			});
		})
	}
	addCountNum++;
}

function unDoOrder() {
	jsonAjax("get", "orders/list?pagesize=" + _mainpagesize, showOrdersListPage);
	addCountNum = 0;
}

function unEditOrder(tr) {
	var orderid = tr.cells[0].textContent;
	if (orderid == "") {
		showCapionMsg("未知错误！");
	} else {
		jsonAjax("get", "orders/info?orderid=" + orderid, function(data) {
			tr.cells[0].innerHTML = '<input type="text" id="orderid" value="' + orderid + '" class="form-control" readonly>';
			tr.cells[1].innerHTML = '<input type="hidden" id="openid" value="' + data.openid + '"/><input type="text" id="weixinuserid" value="' + data.id + '(' + data.nickname + ')' + '" class="form-control" readonly onclick="showWeixinUserListPanel();"> ';
			tr.cells[2].innerHTML = '<input type="hidden" id="productid" value="' + data.productid + '"/><input type="text" id="productview" value="' + data.productid + '(' + data.productname + ')' + '" class="form-control" readonly onclick="showProductListPanel();" >';
			tr.cells[3].innerHTML = '<input type="number" id="price" value="' + data.price + '" class="form-control" style="text-align:right;"> ';
			tr.cells[4].innerHTML = '<textarea id="remark" value="' + data.remark + '" class="form-control"/> ';
			tr.cells[5].innerHTML = '<button id="saveorderpagebtn" class="btn btn-danger"><i class="fa fa-save"></i></button>';
			tr.cells[5].align = "center";
			$("#saveorderpagebtn").click(function() {
				operOrder("update");
			});
		})
	}
	addCountNum++;
}

function operOrder(oper) {
	var msg = "";
	if ($.trim($("#openid").val()) == "") {
		msg += "<li>请点击输入框选择客户编号！</li>";
	}
	if ($.trim($("#productid").val()) == "") {
		msg += "<li>请点击输入框请选择套餐编号！</li>";
	}
	if ($.trim($("#price").val()) == "") {
		msg += "<li>请输入实际价格！</li>";
	}
	if (msg != null && msg.length > 0) {
		$.FloatConfirm({
			title : '提示',
			type : 'error',
			text : msg
		})

		return;
	} else {
		var params = "orders.orderid=" + $.trim($("#orderid").val()) + "&";
		params += "orders.openid=" + $.trim($("#openid").val()) + "&";
		params += "orders.productid=" + $.trim($("#productid").val()) + "&";
		params += "orders.price=" + $.trim($("#price").val()) + "&";
		params += "orders.remark=" + $.trim($("#remark").val());

		showCapion();
		jsonAjax("post", "orders/" + oper + "?" + params, function(data) {
			hideCapion();
			if (data != null) {
				showCapionMsg(data.resultMsg);
				jsonAjax("get", "orders/list?pagesize=" + _mainpagesize, showOrdersListPage);
			} else {
				showCapionMsg("未知错误！");
			}
			addCountNum = 0;
		});
	}
}

function delOrder(orderid) {
	showCfm("您确定要删除吗,此操作将会同时把配货计划一起删除？", function() {
		$("#delcalbtn").click();
		showCapion();
		jsonAjax("post", "orders/del?orderid=" + orderid, function(data) {
			hideCapion();
			if (data != null) {
				showCapionMsg(data.resultMsg);
				jsonAjax("get", "orders/list?pagesize=" + _mainpagesize, showOrdersListPage);
			} else {
				showCapionMsg("未知错误！");
			}
		});
	});
}

/**
 * 订单选择窗口
 */
function showOrderListPanel() {
	showCapion();
	var strHtml = '';
	strHtml += '<input type="hidden"  id="ordertables"/>';
	strHtml += '<form id="querylistform" class="form-horizontal" style="padding-top: 15px;" role="form">';
	strHtml += '<div class="form-group">';
	strHtml += '<label  class="col-sm-2 control-label">订单编号</label>';
	strHtml += '<div class="col-sm-4">';
	strHtml += '<input type="text" class="form-control" name="orderid" value="">';
	strHtml += '</div>';
	strHtml += '<label class="col-sm-2 control-label">客户昵称</label>';
	strHtml += '<div class="col-sm-4">';
	strHtml += '<input type="text" class="form-control" name="nickname" value="">';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label class="col-sm-2 control-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label>';
	strHtml += '<div class="col-sm-4">';
	strHtml += '<input type="text" class="form-control" name="remark" value="">';
	strHtml += '</div>';
	strHtml += '<div class="col-sm-2">';
	strHtml += '</div>';
	strHtml += '<div class="col-sm-2">';
	strHtml += '<input type="button" class="form-control" value="清空" onclick=clearForm("querylistform"); />';
	strHtml += '</div>';
	strHtml += '<div class="col-sm-2">';
	strHtml += '<input type="button" class="form-control" id="querybin" value="查询" onclick=showOrderList(); />';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '</form>';

	strHtml += '<div id="querylistdiv">';
	strHtml += '<table class="table">';
	strHtml += '<thead>';
	strHtml += '<tr>';
	strHtml += '<th>订单编号</th>';
	strHtml += '<th>客户编号</th>';
	strHtml += '<th>产品编号</th>';
	strHtml += '<th>实际价格</th>';
	strHtml += '<th>备注</th>';
	strHtml += '</tr>';
	strHtml += '</thead>';
	strHtml += '<tbody>';
	jsonAjax("get", "orders/page/" + 1 + "?pagesize=" + _pagesize, function(data) {
		hideCapion();
		if (data != null) {
			if (data.orderpage.list != null && data.orderpage.list.length > 0) {
				var orders = data.orderpage.list;

				var pNum = (parseInt(data.orderpage.pageNumber) - 1);
				var nNum = (parseInt(data.orderpage.pageNumber) + 1);
				var strDisabledP = 'onclick=showOrderList("' + pNum + '")';
				var strDisabledN = ' onclick=showOrderList("' + nNum + '")';

				if (data.orderpage.pageNumber == 1) {
					strDisabledP = "";
				}
				if (data.orderpage.pageNumber == data.orderpage.totalPage) {
					strDisabledN = "";
				}

				for (i = 0; i < orders.length; i++) {
					strHtml += '<tr ondblclick="dbclickOrderCallBack(this);">';
					strHtml += '<td>' + orders[i].orderid + '</td>';
					strHtml += '<td>' + orders[i].id + '</td>';
					strHtml += '<td>' + orders[i].productid + '</td>';
					strHtml += '<td align="right">' + orders[i].price + '</td>';
					strHtml += '<td>' + orders[i].remark + '</td>';
					strHtml += '</tr>';
				}
				strHtml += '</tbody>';
				strHtml += '</table>';
				strHtml += '<ul class="pager"> ';
				strHtml += '<li ><a href="javascript:void(0);" ' + strDisabledP + '>&larr; 上一页</a></li>&nbsp;';
				strHtml += '<span>' + data.orderpage.pageNumber + '/' + data.orderpage.totalPage + '&nbsp;&nbsp;总条数：' + data.orderpage.totalRow + ' </span>';
				strHtml += '<li ><a href="javascript:void(0);" ' + strDisabledN + ' >下一页  &rarr;</a></li>';
				strHtml += '</ul>';
			}
		}
		strHtml += '</div>';
		$("#listinfo").html(strHtml);
		ShowListDivCenter("#listdiv");
		showMask();
	});
}

function showOrderList(pagenum) {
	if (typeof (pagenum) == "undefined") {
		pagenum = "";
	}

	var formParam = $("#querylistform").serialize();// 序列化表格内容为字符串
	jsonAjaxForm("get", "orders/page/" + pagenum, formParam, function(data) {
		if (data != null) {
			var strHtml = "";
			strHtml += '<table class="table">';
			strHtml += '<thead>';
			strHtml += '<tr>';
			strHtml += '<th>订单编号</th>';
			strHtml += '<th>客户编号</th>';
			strHtml += '<th>产品编号</th>';
			strHtml += '<th>实际价格</th>';
			strHtml += '<th>备注</th>';
			strHtml += '</tr>';
			strHtml += '</thead>';
			strHtml += '<tbody>';
			if (data.orderpage.list != null && data.orderpage.list.length > 0) {
				var orders = data.orderpage.list;

				var pNum = (parseInt(data.orderpage.pageNumber) - 1);
				var nNum = (parseInt(data.orderpage.pageNumber) + 1);
				var strDisabledP = 'onclick=showOrderList("' + pNum + '")';
				var strDisabledN = ' onclick=showOrderList("' + nNum + '")';

				if (data.orderpage.pageNumber == 1) {
					strDisabledP = "";
				}
				if (data.orderpage.pageNumber == data.orderpage.totalPage) {
					strDisabledN = "";
				}

				for (i = 0; i < orders.length; i++) {
					strHtml += '<tr ondblclick="dbclickOrderCallBack(this);">';
					strHtml += '<td>' + orders[i].orderid + '</td>';
					strHtml += '<td>' + orders[i].id + '</td>';
					strHtml += '<td>' + orders[i].productid + '</td>';
					strHtml += '<td align="right">' + orders[i].price + '</td>';
					strHtml += '<td>' + orders[i].remark + '</td>';
					strHtml += '</tr>';
				}
				strHtml += '</tbody>';
				strHtml += '</table>';
				strHtml += '<ul class="pager"> ';
				strHtml += '<li ><a href="javascript:void(0);" ' + strDisabledP + '>&larr; 上一页</a></li>&nbsp;';
				strHtml += '<span>' + data.orderpage.pageNumber + '/' + data.orderpage.totalPage + '&nbsp;&nbsp;总条数：' + data.orderpage.totalRow + ' </span>';
				strHtml += '<li ><a href="javascript:void(0);" ' + strDisabledN + ' >下一页  &rarr;</a></li>';
				strHtml += '</ul>';
			}
			$("#querylistdiv").html(strHtml);
		} else {
			showCapionMsg("未知错误！");
		}
	});
}

/*
 * Orders end
 */