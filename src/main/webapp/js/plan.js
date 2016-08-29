function showPlansListPage(data) {
	var str = "<div class='panel-heading no-collapse' style='height:50px;'>" + "<div style='float:left;'><h5>" + _menuname + "</h5></div>";
	str += "<div style='float:right;'><button id='addplanpagebtn' class='btn btn-danger'><i class='fa fa-plus'></i>&nbsp;新增</button></div>";
	str += "</div>";
	str += "<table id='ordertable' class='table table-responsive table-condensed table-bordered table-striped'>";
	str += "<thead>";
	str += "<tr>";
	str += "<th>配送编号</th>";
	str += "<th>订单编号</th>";
	str += "<th>产品编号</th>";
	str += "<th>产品名称</th>";
	str += "<th>配送日期</th>";
	str += "<th>配送内容</th>";
	str += "<th>状态</th>";
	str += "<th>备注</th>";
	str += "<th>操作</th>";
	str += "</tr>";
	str += "</thead>";

	str += "<tbody>";

	if (data != null && data.length > 0) {
		for (i = 0; i < data.length; i++) {
			str += "<tr>";
			str += "<td>" + data[i].planid + "</td>";
			str += "<td>" + data[i].orderid + "</td>";
			str += "<td>" + data[i].productid + "</td>";
			str += "<td>" + data[i].productname + "</td>";
			str += "<td>" + data[i].plandate + "</td>";
			str += "<td>" + data[i].detail + "</td>";
			str += "<td>" + data[i].planstate + "</td>";
			str += "<td>" + data[i].remark + "</td>";
			str += "<td align='center'><a href='javascript:void(0);' onclick=editOrder('" + data[i].planid + "')><i class='fa fa-pencil'></i></a>&nbsp;&nbsp;";
			str += "<a role='button' data-toggle='modal' href='javascript:void(0);' onclick=delPlan('" + data[i].planid + "')><i class='fa fa-trash-o'></i></a></td>";
			str += "</tr>";
		}
	}
	str += "</tbody>";

	str += "</table>";
	$("#mainpanel").html(str);
	$("#addplanpagebtn").click(addPlanPage);
	hideCapion();
}

function addPlanPage(data) {
	hideCapion();
	var strHtml = '<div class="row">';
	strHtml += '<div class="col-md-12">';
	strHtml += '<br>';
	strHtml += '<div id="myTabContent" class="tab-content">';
	strHtml += '<div class="tab-pane active in" id="home">';
	strHtml += '<form id="editform">';
	strHtml += '<div class="form-group">';
	strHtml += '<label>配送编号</label> <input type="text" name="distributionPlan.planid" value="" class="form-control" readonly>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>订单编号</label> <input type="text" id="orderid" name="distributionPlan.orderid" value="" class="form-control" readonly onclick="showOrderList();">';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<input type="hidden" id="productid" name="distributionPlan.productid">';
	strHtml += '<label>产品编号</label> <input type="text" id="productview" class="form-control" readonly>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>配送日期</label> <input type="text" name="distributionPlan.plandate" value="" class="datepicker form-control">';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<div id="divdetails">';
	strHtml += '<table id="tabledetails"><tr id="trdetails"></tr><table>';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>配送状态</label>';
	strHtml += '<select name="distributionPlan.planstate" class="form-control">';
	strHtml += '<option value="1">未配送</option>';
	strHtml += '<option value="2">已配送</option>';
	strHtml += '</select>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>备注</label><textarea name="distributionPlan.remark" value="" class="form-control"></textarea> ';
	strHtml += '</div>';
	strHtml += '</form>';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '<div class="btn-toolbar list-toolbar">';
	strHtml += '<button type="button" id="planCancelBtn" class="btn btn-default" style="float:right">取消</button>';
	strHtml += '<button type="button" id="planSaveBtn" onclick=planOper("save") class="btn btn-danger" style="float:right">保存</button>&nbsp;&nbsp;';
	strHtml += '<label class="remember-me" style="color: red;" id="errorMsg"></label>';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '</div>';
	$("#editinfo").html(strHtml);

	$(".datepicker").datepicker({
		language : "zh-CN",
		autoclose : true,// 选中之后自动隐藏日期选择框
		clearBtn : true,// 清除按钮
		todayBtn : true,// 今日按钮
		format : "yyyy-mm-dd"// 日期格式
	});

	$("#planCancelBtn").click(Cancel);
	showMask();
	ShowEditDiv("#editdiv");
}

function editOrder(planid) {
	showCapion();
	jsonAjax("get", "plans/info?planid=" + planid, editOrderCallBack);
}

function editOrderCallBack(data) {
	hideCapion();
	if (data != null) {
		var strHtml = '<div class="row">';
		strHtml += '<div class="col-md-12">';
		strHtml += '<br>';
		strHtml += '<div id="myTabContent" class="tab-content">';
		strHtml += '<div class="tab-pane active in" id="home">';
		strHtml += '<form id="editform">';
		strHtml += '<div class="form-group">';
		strHtml += '<label>配送编号</label> <input type="text" name="distributionPlan.planid" value="' + data.planid + '" class="form-control" readonly>';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>订单编号</label> <input type="text" id="orderid" name="distributionPlan.orderid" value="' + data.orderid + '" class="form-control" readonly onclick="showOrderList();">';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<input type="hidden" id="productid" name="distributionPlan.productid" value="' + data.productid + '">';
		strHtml += '<label>产品编号</label> <input type="text" id="productview" value="' + data.productid + '" class="form-control" readonly>';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>配送日期</label> <input type="text" name="distributionPlan.plandate" value="' + data.plandate + '" class="datepicker form-control">';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<div">';
		strHtml += '<table><tr> ';
		if (data.items != null && data.items.length > 0) {
			var items = data.items;
			for (i = 0; i < items.length; i++) {
				strHtml += '<td width="5%" align="center">' + items[i].cname + '</td>';
				strHtml += '<td width="3%"><a href="javascript:void(0);" onclick=minus("#itemnumber' + i + '")><i class="fa fa-minus-square-o"></i></a>';
				strHtml += '<input type="hidden" name="planItem.itemid" value="' + items[i].itemid + '"></td>';
				strHtml += '<td align="center" width="8%"><input type="text" id="itemnumber' + i + '" name="planItem.itemnumber" value="' + items[i].itemnumber + '" class="form-control" style="text-align: center;"></td>';
				strHtml += '<td width="3%" align="right"><a href="javascript:void(0);" onclick=plus("#itemnumber' + i + '")><i class="fa fa-plus-square-o"></i></a></td>';
				if (i < items.length - 1) {
					strHtml += '<td width="10%"></i></td>';
				}
			}
		}
		strHtml += ' </tr><table>';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>配送状态</label>';
		strHtml += '<select id="planstate" name="distributionPlan.planstate" class="form-control">';
		strHtml += '<option value="1">未配送</option>';
		strHtml += '<option value="2">已配送</option>';
		strHtml += '</select>';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>备注</label><textarea name="distributionPlan.remark" class="form-control">' + data.remark + '</textarea> ';
		strHtml += '</div>';
		strHtml += '</form>';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '<div class="btn-toolbar list-toolbar">';
		strHtml += '<button type="button" id="planCancelBtn" class="btn btn-default" style="float:right">取消</button>';
		strHtml += '<button type="button" id="planSaveBtn" onclick=planOper("update") class="btn btn-danger" style="float:right">保存</button>&nbsp;&nbsp;';
		strHtml += '<label class="remember-me" style="color: red;" id="errorMsg"></label>';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '</div>';
		$("#editinfo").html(strHtml);
		$("#planstate").val(data.planstate);
		$("#planCancelBtn").click(Cancel);
		showMask();
		ShowEditDiv("#editdiv");
		
		$(".datepicker").datepicker({
			language : "zh-CN",
			autoclose : true,// 选中之后自动隐藏日期选择框
			clearBtn : true,// 清除按钮
			todayBtn : true,// 今日按钮
			format : "yyyy-mm-dd"// 日期格式
		});
	} else {
		showCapionMsg("操作失败！");
	}
}

function planOper(oper) {
	var formParam = $("#editform").serialize();// 序列化表格内容为字符串

	jsonAjaxForm("post", "plans/" + oper, formParam, planOperCallBack);
}

function planOperCallBack(data) {
	if (data != null) {
		{
			// 根据返回值进行状态显示
			if (data.result == "fail") {
				$("#errorMsg").html(data.errorMsg);
			} else {
				Cancel();
				showCapionMsg(data.resultMsg);
				jsonAjax("get", "plans/list", showPlansListPage);
			}
		}
	}
}

function delPlan(planid) {
	showCfm("您确定要删除吗？", function() {
		$("#delcalbtn").click();
		showCapion();
		jsonAjax("post", "plans/del?planid=" + planid, function(data) {
			hideCapion();
			if (data != null) {
				showCapionMsg(data.resultMsg);
				jsonAjax("get", "plans/list", showPlansListPage);
			} else {
				showCapionMsg("未知错误！");
			}
		});
	});
}

function dbclickOrderCallBack(tr) {
	$("#orderid").val(tr.cells[0].textContent);
	$("#productid").val(tr.cells[2].textContent);

	jsonAjax("get", "product/info?productid=" + tr.cells[2].textContent, function(product) {
		if (product != null) {
			$("#productview").val(product.productid + "(" + product.productname + ")");
			if (product.items != null && product.items.length > 0) {
				var items = product.items;
				var strHtml = "";
				for (i = 0; i < items.length; i++) {
					strHtml += '<td width="5%" align="center">' + items[i].cname + '</td>';
					strHtml += '<td width="3%"><a href="javascript:void(0);" onclick=minus("#itemnumber' + i + '")><i class="fa fa-minus-square-o"></i></a>';
					strHtml += '<input type="hidden" name="planItem.cid" value="' + items[i].cid + '"></td>';
					strHtml += '<td align="center" width="8%"><input type="text" id="itemnumber' + i + '" name="planItem.itemnumber" value="' + items[i].itemnumber + '" class="form-control" style="text-align: center;"></td>';
					strHtml += '<td width="3%" align="right"><a href="javascript:void(0);" onclick=plus("#itemnumber' + i + '")><i class="fa fa-plus-square-o"></i></a></td>';
					if (i < items.length - 1) {
						strHtml += '<td width="10%"></i></td>';
					}
				}
				$("#trdetails").html(strHtml);
			}
		}
		closeListPage();
	});
}
