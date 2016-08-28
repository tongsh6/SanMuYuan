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
			str += "<td>" + data[i].details + "</td>";
			str += "<td>" + data[i].planstate + "</td>";
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
	$("#addplanpagebtn").click(addPlanPage);
	hideCapion();
}

function addPlanPage() {
	hideCapion();
	var strHtml = '<div class="row">';
	strHtml += '<div class="col-md-12">';
	strHtml += '<br>';
	strHtml += '<div id="myTabContent" class="tab-content">';
	strHtml += '<div class="tab-pane active in" id="home">';
	strHtml += '<form id="editform">';
	strHtml += '<div class="form-group">';
	strHtml += '<label>订单编号</label> <input type="text" name="distributionPlan.orderid" value="" class="form-control" readonly onclick="showWeixinUserList();">';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>产品编号</label> <input type="text" name="distributionPlan.productid" value="" class="form-control" readonly>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>产品名称</label> <input type="text" id="productname" value="" class="form-control" readonly>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>配送日期</label>';
	strHtml += '<input type="text" id="productname" value="" class="form-control datepicker">';
	strHtml += '</div>';
//	strHtml += '<div id="divdetails" class="form-group">';
//	strHtml += '<label>配送内容</label>';
//	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>配送状态</label>';
	strHtml += '<select name="product.cycle" class="form-control">';
	strHtml += '<option value="1">未配送</option>';
	strHtml += '<option value="2">已配送</option>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>备注</label><textarea name="product.remark" value="" class="form-control"></textarea> ';
	strHtml += '</div>';
	strHtml += '</form>';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '<div class="btn-toolbar list-toolbar">';
	strHtml += '<button id="productCancelBtn" class="btn btn-default" style="float:right">取消</button>';
	strHtml += '<button id="productSaveBtn" onclick="productOper(1);" class="btn btn-danger" style="float:right">保存</button>&nbsp;&nbsp;';
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

	$("#btnbtn").click(newDiv);
	showMask();
	ShowEditDiv("#editdiv");
}

function newDiv() {
	showWeixinUserList();
}

// strHtml += '<table><tr>';
//
// if (data == null || data.length <= 0) {
// showCapionMsg("操作失败！");
// return;
// } else {
// for (i = 0; i < data.length; i++) {
// strHtml += '<td width="5%" align="center">' + data[i].cname + '</td>';
// strHtml += '<td width="3%"><a href="javascript:void(0);"
// onclick=minus("#itemnumber' + i + '")><i class="fa
// fa-minus-square-o"></i></a>';
// strHtml += '<input type="hidden" name="productItem.cid" value="' +
// data[i].cid + '"></td>';
// strHtml += '<td align="center" width="8%"><input type="text" id="itemnumber'
// + i + '" name="productItem.itemnumber" value="1" class="form-control"
// style="text-align: center;"></td>';
// strHtml += '<td width="3%" align="right"><a href="javascript:void(0);"
// onclick=plus("#itemnumber' + i + '")><i class="fa
// fa-plus-square-o"></i></a></td>';
// if (i < data.length - 1) {
// strHtml += '<td width="10%"></i></td>';
// }
// }
// }
//
// strHtml += '</tr></table>';
