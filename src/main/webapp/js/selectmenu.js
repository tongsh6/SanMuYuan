/**
 * 点击菜单事件
 */
var _menucode = "";
function selectMenu(menucode) {
	showCapion();
	_menucode = menucode;
	var strHtml = "";
	if (menucode == "101") {
		jsonAjax("get", "sysuser/list", showSysUserListPage);
	} else if (menucode == "102") {
		jsonAjax("get", "weixin/list", showWeixinUserListPage);
	} else if (menucode == "103") {
		jsonAjax("get", "product/list", showProductListPage);
	} else if (menucode == "104") {
		jsonAjax("get", "orders/list", showOrdersListPage);
	} else if (menucode == "105") {
		hideCapion();
		showCapionMsg("暂未完成，敬请期待！");
	} else if (menucode == "106") {
		hideCapion();
		showCapionMsg("暂未完成，敬请期待！");
	} else if (menucode == "107") {
		hideCapion();
		showCapionMsg("暂未完成，敬请期待！");
	} else {
		strHtml = "<h>操作错误！</h>";
		hideCapion();
	}
}

function showSysUserListPage(data) {
	var str = "<div class='panel-heading no-collapse'style='height:50px;'><h5>系统用户</h5></div>";
	str += "<table class='table table-condensed  table-bordered table-striped'>";
	str += "<thead>";
	str += "<tr>";
	str += "<th>编号</th>";
	str += "<th>登录码</th>";
	str += "<th>用户名</th>";
	str += "</tr>";
	str += "</thead>";

	str += "<tbody>";

	if (data != null && data.length > 0) {
		for (i = 0; i < data.length; i++) {
			str += "<tr>";
			str += "<td>" + data[i].userid + "</td>";
			str += "<td>" + data[i].uno + "</td>";
			str += "<td>" + data[i].uname + "</td>";
			str += "</tr>";
		}
	}
	str += "</tbody>";

	str += "</table>";
	$("#mainpanel").html(str);
	hideCapion();
}

/*
 * WeixinUser begain
 */
/**
 * 微信用户列表回调函数
 */
function showWeixinUserListPage(data) {
	var str = "<div class='panel-heading no-collapse' style='height:50px;'>" + "<div style='float:left;'><h5>微信用户</h5></div>";
	str += "<div style='float:right;'><button id='syncwebxinuserbtn' class='btn btn-danger'><i class='fa fa-gears'></i>&nbsp;同步微信用户</button></div>";
	str += "</div>";

	str += "<table class='table table-condensed table-bordered table-striped'>";
	str += "<thead>";
	str += "<tr>";
	str += "<th>用户编号</th>";
	str += "<th>微信昵称</th>";
	str += "<th>手机号码</th>";
	str += "<th>地址</th>";
	str += "<th>联系人</th>";
	str += "<th>联系人手机</th>";
	str += "<th>备注</th>";
	str += "<th>操作</th>";
	str += "</tr>";
	str += "</thead>";

	str += "<tbody>";

	if (data != null && data.length > 0) {
		for (i = 0; i < data.length; i++) {
			str += "<tr>";
			str += "<td>" + data[i].id + "</td>";
			str += "<td>" + data[i].nickname + "</td>";
			str += "<td>" + data[i].phoneno + "</td>";
			str += "<td>" + data[i].addressed + "</td>";
			str += "<td>" + data[i].linkname + "</td>";
			str += "<td>" + data[i].linktelno + "</td>";
			str += "<td>" + data[i].remark + "</td>";
			str += "<td align='center'><a href='javascript:void(0);' onclick=editWebxinUser('" + data[i].openid + "')><i class='fa fa-pencil'></i></a></td>";
			str += "</tr>";
		}
	}
	str += "</tbody>";

	str += "</table>";
	$("#mainpanel").html(str);

	$("#syncwebxinuserbtn").click(syncWebxinUser);
	hideCapion();
}

/**
 * 同步公众号微信用户
 */
function syncWebxinUser() {
	showCapion();
	jsonAjax("post", "weixin/sync", syncWebxinUserCallBack);
}

/**
 * 同步公众号微信用户回调函数
 * 
 * @param data
 */
function syncWebxinUserCallBack(data) {
	hideCapion();
	if (data != null) {
		{
			showCapionMsg(data.resultMsg);
			jsonAjax("get", "weixin/list", showWeixinUserListPage);
		}
	}
}
function editWebxinUser(openid) {
	showCapion();
	jsonAjax("get", "weixin/info?openid=" + openid, editWeixinUserCallBack);
}

function editWeixinUserCallBack(data) {
	hideCapion();
	if (data != null) {
		var strHtml = '<div class="row">';
		strHtml += '<div class="col-md-12">';
		strHtml += '<br>';
		strHtml += '<div id="myTabContent" class="tab-content">';
		strHtml += '<div class="tab-pane active in" id="home">';
		strHtml += '<form id="editform">';
		strHtml += '<input type="hidden" name="weixinUser.openid" value="' + data.openid + '">';
		strHtml += '<div class="form-group">';
		strHtml += '<label>用户编号</label> <input type="text" name="weixinUser.id" value="' + data.id + '" disabled="disabled" class="form-control">';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>微信昵称</label> <input type="text" name="weixinUser.nickname" value="' + data.nickname + '" disabled="disabled" class="form-control">';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>手机号码</label> <input type="text" name="weixinUser.phoneno" value="' + data.phoneno + '" class="form-control">';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>地址</label>';
		strHtml += '<input type="text" name="weixinUser.addressed" value="' + data.addressed + '" class="form-control">';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>联系人</label> <input type="text" name="weixinUser.linkname" value="' + data.linkname + '" class="form-control">';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>联系人手机</label> <input type="text" name="weixinUser.linktelno" value="' + data.linktelno + '" class="form-control">';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>备注</label><input type="text"  name="weixinUser.remark" value="' + data.remark + '" class="form-control"> ';
		strHtml += '</div>';
		strHtml += '</form>';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '<div class="btn-toolbar list-toolbar" stlye="float:right;">';
		strHtml += '<button id="weixinUserCancelBtn" class="btn btn-default" style="float:right">取消</button>';
		strHtml += '<button id="weixinUserSaveBtn" class="btn btn-danger" style="float:right">保存</button>&nbsp;&nbsp;';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '</div>';
		$("#editinfo").html(strHtml);
		$("#weixinUserSaveBtn").click(weixinUserSave);
		$("#weixinUserCancelBtn").click(Cancel);
		showMask();
		ShowEditDiv("#editdiv");
	} else {
		showCapionMsg("操作失败！");
	}
}

/**
 * 保存
 */
function weixinUserSave() {
	var formParam = $("#editform").serialize();// 序列化表格内容为字符串

	weixinUserCancel();
	hideMask();
	showCapion();

	jsonAjaxForm("post", "weixin/update", formParam, weixinUserSaveCallBack);
}

function weixinUserSaveCallBack(data) {
	hideCapion();
	if (data != null) {
		{
			showCapionMsg(data.resultMsg);
			weixinUserCancel();
			jsonAjax("get", "weixin/list", showWeixinUserListPage);
		}
	}
}

/**
 * 取消
 */
function Cancel() {
	$("#editinfo").html("");
	hideDiv("#editdiv");
	hideMask();
}

/*
 * WeixinUser end
 */

/*
 * Product begain
 */
function showProductListPage(data) {
	var str = "<div class='panel-heading no-collapse' style='height:50px;'>" + "<div style='float:left;'><h5>产品管理</h5></div>";
	str += "<div style='float:right;'><button id='addproductpagebtn' class='btn btn-danger'><i class='fa fa-plus'></i>&nbsp;新增</button></div>";
	str += "</div>";
	str += "<table class='table table-condensed table-bordered table-striped'>";
	str += "<thead>";
	str += "<tr>";
	str += "<th>产品编号</th>";
	str += "<th>产品名称</th>";
	str += "<th>配送周期</th>";
	str += "<th>价格</th>";
	str += "<th>内容</th>";
	str += "<th>备注</th>";
	str += "<th>操作</th>";
	str += "</tr>";
	str += "</thead>";

	str += "<tbody>";

	if (data != null && data.length > 0) {
		for (i = 0; i < data.length; i++) {
			str += "<tr>";
			str += "<td>" + data[i].productid + "</td>";
			str += "<td>" + data[i].productname + "</td>";
			str += "<td align='center'>" + data[i].cycle + "</td>";
			str += "<td align='right'>" + data[i].price + "</td>";
			str += "<td align='center'>" + data[i].details + "</td>";
			str += "<td>" + data[i].remark + "</td>";
			str += "<td align='center'><a href='javascript:void(0);' onclick=editProduct('" + data[i].productid + "')><i class='fa fa-pencil'></i></a>&nbsp;&nbsp;";
			str += "<a role='button' data-toggle='modal' href='javascript:void(0);' onclick=delProduct('" + data[i].productid + "')><i class='fa fa-trash-o'></i></a></td>";
			str += "</tr>";
		}
	}
	str += "</tbody>";

	str += "</table>";
	$("#mainpanel").html(str);
	$("#addproductpagebtn").click(addProductPage);
	hideCapion();
}

function addProductPage() {
	showCapion();
	jsonAjax("get", "commodities/list", addProductCallBack);
}

function addProductCallBack(data) {
	hideCapion();
	var strHtml = '<div class="row">';
	strHtml += '<div class="col-md-12">';
	strHtml += '<br>';
	strHtml += '<div id="myTabContent" class="tab-content">';
	strHtml += '<div class="tab-pane active in" id="home">';
	strHtml += '<form id="editform">';
	strHtml += '<div class="form-group">';
	strHtml += '<label>产品名称</label> <input type="text" name="product.productname" value="" class="form-control">';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>配送周期</label>';
	strHtml += '<select name="product.cycle" class="form-control">';
	strHtml += '<option value="周">周</option>';
	strHtml += '<option value="月">月</option>';
	strHtml += '</select>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>价格</label> <input type="number" name="product.price" value="" class="form-control" >';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<div>';
	strHtml += '<table><tr>';

	if (data == null || data.length <= 0) {
		showCapionMsg("操作失败！");
		return;
	} else {
		for (i = 0; i < data.length; i++) {
			strHtml += '<td width="5%" align="center">' + data[i].cname + '</td>';
			strHtml += '<td width="3%"><a href="javascript:void(0);" onclick=minus("#itemnumber' + i + '")><i class="fa fa-minus-square-o"></i></a>';
			strHtml += '<input type="hidden" name="productItem.cid" value="' + data[i].cid + '"></td>';
			strHtml += '<td align="center" width="8%"><input type="text" id="itemnumber' + i + '" name="productItem.itemnumber" value="1" class="form-control" style="text-align: center;"></td>';
			strHtml += '<td width="3%" align="right"><a href="javascript:void(0);" onclick=plus("#itemnumber' + i + '")><i class="fa fa-plus-square-o"></i></a></td>';
			if (i < data.length - 1) {
				strHtml += '<td width="10%"></i></td>';
			}
		}
	}

	strHtml += '</tr></table>';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>备注</label><input type="text"  name="product.remark" value="" class="form-control"> ';
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
	$("#productCancelBtn").click(Cancel);
	showMask();
	ShowEditDiv("#editdiv");
}

function delProduct(productid) {
	showCfm("您确定要删除吗？", function() {
		$("#delcalbtn").click();
		showCapion();
		jsonAjax("post", "product/del?productid=" + productid, function(data) {
			hideCapion();
			if (data != null) {
				showCapionMsg(data.resultMsg);
				jsonAjax("get", "product/list", showProductListPage);
			} else {
				showCapionMsg("未知错误！");
			}
		});
	});
}

function editProduct(productid) {
	showCapion();
	jsonAjax("get", "product/info?productid=" + productid, editProductCallBack);
}

function editProductCallBack(data) {
	hideCapion();
	if (data != null) {
		var strHtml = '<div class="row">';
		strHtml += '<div class="col-md-12">';
		strHtml += '<br>';
		strHtml += '<div id="myTabContent" class="tab-content">';
		strHtml += '<div class="tab-pane active in" id="home">';
		strHtml += '<form id="editform">';
		strHtml += '<div class="form-group">';
		strHtml += '<label>产品编号</label> <input type="text" name="product.productid" value="' + data.productid + '" class="form-control" readonly >';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>产品名称</label> <input type="text" name="product.productname" value="' + data.productname + '" class="form-control">';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>配送周期</label>';
		strHtml += '<select id="selectcycle" name="product.cycle" class="form-control" >';
		strHtml += '<option value="周">周</option>';
		strHtml += '<option value="月">月</option>';
		strHtml += '</select>';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>价格</label> <input type="number" name="product.price" value="' + data.price + '" class="form-control" />';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<div>';
		strHtml += '<table><tr>';

		if (data.items == null || data.items.length <= 0) {
			showCapionMsg("操作失败！");
			return;
		} else {
			for (i = 0; i < data.items.length; i++) {
				strHtml += '<td width="5%" align="center">' + data.items[i].cname + '</td>';
				strHtml += '<td width="3%"><a href="javascript:void(0);" onclick=minus("#itemnumber' + i + '")><i class="fa fa-minus-square-o"></i></a>';
				strHtml += '<input type="hidden" name="productItem.itemid" value="' + data.items[i].itemid + '"></td>';
				strHtml += '<td align="center" width="8%"><input type="text" id="itemnumber' + i + '" name="productItem.itemnumber" value="' + data.items[i].itemnumber + '" class="form-control" style="text-align: center;"></td>';
				strHtml += '<td width="3%" align="right"><a href="javascript:void(0);" onclick=plus("#itemnumber' + i + '")><i class="fa fa-plus-square-o"></i></a></td>';
				if (i < data.items.length - 1) {
					strHtml += '<td width="10%"></i></td>';
				}
			}
		}

		strHtml += '</tr></table>';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '<div class="form-group">';
		strHtml += '<label>备注</label><input type="text"  name="product.remark" value="' + data.remark + '" class="form-control"> ';
		strHtml += '</div>';
		strHtml += '</form>';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '<div class="btn-toolbar list-toolbar">';
		strHtml += '<button id="productCancelBtn" class="btn btn-default" style="float:right">取消</button>';
		strHtml += '<button id="productSaveBtn" onclick="productOper(2);" class="btn btn-danger" style="float:right">保存</button>&nbsp;&nbsp;';
		strHtml += '<label class="remember-me" style="color: red;" id="errorMsg"></label>';
		strHtml += '</div>';
		strHtml += '</div>';
		$("#editinfo").html(strHtml);
		$("#selectcycle").val(data.cycle);
		$("#productCancelBtn").click(Cancel);
		showMask();
		ShowEditDiv("#editdiv");
	} else {
		showCapionMsg("操作失败！");
	}
}

/**
 * 保存
 */
function productOper(saveflag) {
	var formParam = $("#editform").serialize();// 序列化表格内容为字符串

	var oper = "";
	if (saveflag == 1) {
		oper = "save"
	} else if (saveflag == 2) {
		oper = "update"
	}
	jsonAjaxForm("post", "product/" + oper, formParam, productOperCallBack);
}

function productOperCallBack(data) {
	if (data != null) {
		{
			// 根据返回值进行状态显示
			if (data.result == "fail") {
				$("#errorMsg").html(data.errorMsg);
			} else {
				Cancel();
				showCapionMsg(data.resultMsg);
				jsonAjax("get", "product/list", showProductListPage);
			}
		}
	}
}

/*
 * Product end
 */
/*
 * Orders beg
 */
function showOrdersListPage(data) {
	var str = "<div class='panel-heading no-collapse' style='height:50px;'>" + "<div style='float:left;'><h5>订单管理</h5></div>";
	str += "<div style='float:right;'><button id='addorderpagebtn' class='btn btn-danger'><i class='fa fa-plus'></i>&nbsp;新增</button></div>";
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
	hideCapion();
}
var addCountNum = 0;
function addOrdersPage() {
	if (addCountNum > 0) {
		alert("请先保存！");
		return;
	}
	var str = "";
	str += "<tr>";
	str += "<td>" + '<input type="text" id="orderid" value="' + "" + '" class="form-control" readonly> ' + "</td>";
	str += "<td><input type='hidden' id='openid'/>" + '<input type="text" id="weixinuserid" value="' + "" + '" class="form-control" readonly onclick="showWeixinUserList();"> ' + "</td>";
	str += "<td><input type='hidden' id='productid'/>" + '<input type="text" id="productview" value="" class="form-control" readonly onclick="showProductList();" >' + "</td>";
	str += "<td>" + '<input type="number" id="price" value="' + "" + '" class="form-control" style="text-align:right;"> ' + "</td>";
	str += "<td>" + '<input type="text" id="remark" value="' + "" + '" class="form-control"/> ' + "</td>";
	str += "<td align='center'><button id='saveorderpagebtn' class='btn btn-danger'><i class='fa fa-save'></i></button></td>";
	str += "</tr>";

	addTr("ordertable", 0, str);
	$("#saveorderpagebtn").click(function() {
		operOrder("save");
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
			tr.cells[1].innerHTML = '<input type="hidden" id="openid" value="' + data.openid + '"/><input type="text" id="weixinuserid" value="' + data.id + '(' + data.nickname + ')' + '" class="form-control" readonly onclick="showWeixinUserList();"> ';
			tr.cells[2].innerHTML = '<input type="hidden" id="productid" value="' + data.productid + '"/><input type="text" id="productview" value="' + data.productid + '(' + data.productname + ')' + '" class="form-control" readonly onclick="showProductList();" >';
			tr.cells[3].innerHTML = '<input type="number" id="price" value="' + data.price + '" class="form-control" style="text-align:right;"> ';
			tr.cells[4].innerHTML = '<input type="text" id="remark" value="' + data.remark + '" class="form-control"/> ';
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
				jsonAjax("get", "orders/list", showOrdersListPage);
			} else {
				showCapionMsg("未知错误！");
			}
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
				jsonAjax("get", "orders/list", showOrdersListPage);
			} else {
				showCapionMsg("未知错误！");
			}
		});
	});
}

/*
 * Orders end
 */

function showWeixinUserList(pagenum) {
	if (typeof (pagenum) == "undefined") {
		pagenum = "";
	}

	closeListPage();
	showCapion();
	jsonAjax("get", "weixin/page/" + pagenum, function(data) {
		hideCapion();
		if (data != null) {
			var strHtml = "";
			strHtml += '<div>';
			strHtml += '<button id="closelistbtn" type="button" class="close" aria-hidden="true">&times;</button>';
			strHtml += '</div>';
			strHtml += '<table class="table">';
			strHtml += '<thead>';
			strHtml += '<tr>';
			strHtml += '<th>用户编号</th>';
			strHtml += '<th>微信昵称</th>';
			strHtml += '<th>地址</th>';
			strHtml += '</tr>';
			strHtml += '</thead>';
			strHtml += '<tbody>';
			if (data.weixinuserpage.list != null && data.weixinuserpage.list.length > 0) {
				var users = data.weixinuserpage.list;

				var pNum = (parseInt(data.weixinuserpage.pageNumber) - 1);
				pNum = pNum < 1 ? 1 : pNum;
				var nNum = (parseInt(data.weixinuserpage.pageNumber) + 1);
				nNum = nNum > data.weixinuserpage.totalPage ? data.weixinuserpage.totalPage : nNum;

				var strDisabledP = "";
				if (pNum > 1) {
					strDisabledP = 'onclick=showWeixinUserList("' + pNum + '")';
				}
				var strDisabledN = "";
				if (nNum <= data.weixinuserpage.totalPage) {
					strDisabledN = ' onclick=showWeixinUserList("' + nNum + '")';
				}

				for (i = 0; i < users.length; i++) {
					strHtml += '<tr ondblclick="dbclickWeixinUserCallBack(this);">';
					strHtml += '<td><span id="weixinuserid">' + users[i].id + '</span><input type="hidden" id="openid" value="' + users[i].openid + '" /></td>';
					strHtml += '<td>' + users[i].nickname + '</td>';
					strHtml += '<td>' + users[i].addressed + '</td>';
					strHtml += '</tr>';
				}
				strHtml += '</tbody>';
				strHtml += '</table>';
				strHtml += '<ul class="pager"> ';
				strHtml += '<li ><a href="javascript:void(0);" ' + strDisabledP + '>&larr; 上一页</a></li>';
				strHtml += '<span>' + data.weixinuserpage.pageNumber + '/' + data.weixinuserpage.totalPage + '&nbsp;&nbsp;总条数：' + data.weixinuserpage.totalRow + ' </span>';
				strHtml += '<li ><a href="javascript:void(0);" ' + strDisabledN + ' >下一页  &rarr;</a></li>';
				strHtml += '</ul>';
			}
			$("#listinfo").html(strHtml);
			$("#closelistbtn").click(closeListPage);
			showCapionByDivId("#listdiv");
		} else {
			showCapionMsg("未知错误！");
		}
	});
}
function showProductList(pagenum) {
	if (typeof (pagenum) == "undefined") {
		pagenum = "";
	}

	closeListPage();
	showCapion();
	jsonAjax("get", "product/page/" + pagenum, function(data) {
		hideCapion();
		if (data != null) {
			var strHtml = "";
			strHtml += '<div>';
			strHtml += '<button id="closelistbtn" type="button" class="close" aria-hidden="true">&times;</button>';
			strHtml += '</div>';
			strHtml += '<table class="table">';
			strHtml += '<thead>';
			strHtml += '<tr>';
			strHtml += '<th>产品编号</th>';
			strHtml += '<th>产品名称</th>';
			strHtml += '<th>配送周期</th>';
			strHtml += '<th>价格</th>';
			strHtml += '<th>内容</th>';
			strHtml += '</tr>';
			strHtml += '</thead>';
			strHtml += '<tbody>';
			if (data.productpage.list != null && data.productpage.list.length > 0) {
				var products = data.productpage.list;

				var pNum = (parseInt(data.productpage.pageNumber) - 1);
				pNum = pNum < 1 ? 1 : pNum;
				var nNum = (parseInt(data.productpage.pageNumber) + 1);
				nNum = nNum > data.productpage.totalPage ? data.productpage.totalPage : nNum;

				var strDisabledP = "";
				if (pNum > 1) {
					strDisabledP = 'onclick=showProductList("' + pNum + '")';
				}
				var strDisabledN = "";
				if (nNum != 1 && nNum <= data.productpage.totalPage) {
					strDisabledN = ' onclick=showProductList("' + nNum + '")';
				}

				for (i = 0; i < products.length; i++) {
					strHtml += '<tr ondblclick="dbclickProductCallBack(this);">';
					strHtml += '<td>' + products[i].productid + '</td>';
					strHtml += '<td>' + products[i].productname + '</td>';
					strHtml += '<td>' + products[i].cycle + '</td>';
					strHtml += '<td align="right">' + products[i].price + '</td>';
					strHtml += '<td>' + products[i].details + '</td>';
					strHtml += '</tr>';
				}
				strHtml += '</tbody>';
				strHtml += '</table>';
				strHtml += '<ul class="pager"> ';
				strHtml += '<li ><a href="javascript:void(0);" ' + strDisabledP + '>&larr; 上一页</a></li>&nbsp;';
				strHtml += '<span>' + data.productpage.pageNumber + '/' + data.productpage.totalPage + '&nbsp;&nbsp;总条数：' + data.productpage.totalRow + ' </span>';
				strHtml += '<li ><a href="javascript:void(0);" ' + strDisabledN + ' >下一页  &rarr;</a></li>';
				strHtml += '</ul>';
			}
			$("#listinfo").html(strHtml);
			$("#closelistbtn").click(closeListPage);
			showCapionByDivId("#listdiv");
		} else {
			showCapionMsg("未知错误！");
		}
	});
}

function dbclickWeixinUserCallBack(tr) {
	$("#openid").val(tr.cells[0].lastChild.value);
	$("#weixinuserid").val(tr.cells[0].firstChild.textContent + "(" + tr.cells[1].textContent + ")");
	closeListPage();
}

function dbclickProductCallBack(tr) {
	$("#productid").val(tr.cells[0].textContent);
	$("#productview").val(tr.cells[0].textContent + "(" + tr.cells[1].textContent + ")");
	$("#price").val(tr.cells[3]);
	closeListPage();
}

/**
 * utils
 */
/**
 * 为table指定行添加一行
 * 
 * tab 表id row 行数，如：0->第一行 1->第二行 -2->倒数第二行 -1->最后一行 trHtml 添加行的html代码
 * 
 */
function addTr(tab, row, trHtml) {
	// 获取table最后一行 $("#tab tr:last")
	// 获取table第一行 $("#tab tr").eq(0)
	// 获取table倒数第二行 $("#tab tr").eq(-2)
	var $tr = $("#" + tab + " tr").eq(row);
	if ($tr.size() == 0) {
		alert("指定的table id或行数不存在！");
		return;
	}
	$tr.after(trHtml);
}

function closeListPage() {
	$("#listinfo").html("");
	hideCapionByDivId("#listdiv");
}

function showCfm(msg, callbackfun) {
	var strHtml = '';
	// <!-- 信息删除确认 -->
	strHtml += '<div class="modal fade" id="delcfmModel">';
	strHtml += '<div class="modal-dialog">';
	strHtml += '<div class="modal-content message_align">';
	strHtml += '<div class="modal-header">';
	strHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>';
	strHtml += '<h4 class="modal-title">提示信息</h4>';
	strHtml += '</div>';
	strHtml += '<div class="modal-body">';
	strHtml += '<p>' + msg + '</p>';
	strHtml += '</div>';
	strHtml += '<div class="modal-footer"> ';
	strHtml += '<input type="hidden" id="url"/> ';
	strHtml += '<button id="delcalbtn" type="button" class="btn btn-default" data-dismiss="modal">取消</button>';
	strHtml += '<a id="cfmbtn"  class="btn btn-success" data-dismiss="modal">确定</a> ';
	strHtml += '</div>  ';
	strHtml += '</div><!-- /.modal-content -->  ';
	strHtml += ' </div><!-- /.modal-dialog -->  ';
	strHtml += '</div><!-- /.modal -->  ';
	onclick = "urlSubmit()"
	$("#cfm").html(strHtml);
	$("#cfmbtn").click(callbackfun);
	$('#delcfmModel').modal();
}

// 兼容火狐、IE8
function showMask() {
	$("#mask").css("height", $(document).height());
	$("#mask").css("width", $(document).width());
	$("#mask").show();
}
function hideMask() {
	$("#mask").css("height", 0);
	$("#mask").css("width", 0);
	$("#mask").hide();
}
// 让指定的DIV始终显示在屏幕正中间
function ShowDivCenter(divName) {
	var top = ($(window).height() - $(divName).height()) / 2;
	var left = ($(window).width() - $(divName).width()) / 2;
	var scrollTop = $(document).scrollTop();
	var scrollLeft = $(document).scrollLeft();
	$(divName).css({
		position : 'absolute',
		'top' : top + scrollTop,
		left : left + scrollLeft
	}).show();
}
// 让指定的DIV始终显示在屏幕正中间
function ShowEditDiv(divName) {
	var top = (($(window).height() - $(divName).height()) / 2) - 150;
	var left = ($(window).width() - $(divName).width()) / 2;
	var scrollTop = $(document).scrollTop();
	var scrollLeft = $(document).scrollLeft();
	$(divName).css({
		position : 'absolute',
		'top' : top + scrollTop,
		left : left + scrollLeft
	}).show();
}
function hideDiv(divName) {
	$(divName).hide();
}

function showCapionByDivId(divId) {
	showMask();
	ShowDivCenter(divId);
}
function hideCapionByDivId(divId) {
	hideMask();
	hideDiv(divId);
}

function showCapion() {
	var divName = "#shade";
	showMask();
	ShowDivCenter(divName);
}

function hideCapion(divName) {
	var divName = "#shade";
	hideMask();
	hideDiv(divName);
}

function showCapionMsg(msg) {
	var divName = "#capion";
	$("#capionmsg").text(msg);
	ShowDivCenter(divName);
}

function minus(objid) {
	var value = parseInt($(objid).val()) - 1;
	if (value < 0) {
		value = 0;
	}
	$(objid).val(value);
}
function plus(objid) {
	$(objid).val(parseInt($(objid).val()) + 1);
}

function onlyNum(value) {
	return value.replace(/[^\d.]/g, '');
}

/**
 * ajax
 * 
 * @param url
 * @param param
 * @param datat
 *            为html,json,text
 * @param callback回调函数
 * @return
 */
function jsonAjax(type, url, callback) {
	$.ajax({
		type : type,
		url : url,
		success : callback,
		error : function() {
			jQuery.fn.mBox({
				message : '请求失败！'
			});
		}
	});
}
function jsonAjaxForm(type, url, data, callback) {
	$.ajax({
		type : type,
		url : url,
		data : data,
		success : callback,
		error : function() {
			jQuery.fn.mBox({
				message : '请求失败！'
			});
		}
	});
}