/**
 * 点击菜单事件
 */
var _menucode = "";
function selectMenu(menucode) {
	_menucode = menucode;
	var strHtml = "";
	if (menucode == "101") {
		jsonAjax("get", "sysuser/list", showSysUserPage);
	} else if (menucode == "102") {
		jsonAjax("get", "weixin/list", showWeixinUserPage);
	} else if (menucode == "103") {
		jsonAjax("get", "product/list", showProductListPage);
	} else if (menucode == "104") {

	} else if (menucode == "105") {

	} else if (menucode == "106") {

	} else if (menucode == "107") {

	} else {
		strHtml = "<h>操作错误！</h>";
	}
}

function showSysUserPage(data) {
	var str = "<div class='panel-heading no-collapse'style='height:50px;'><h5>系统用户</h5></div>";
	str += "<table class='table table-bordered table-striped'>";
	str += "<thead>";
	str += "<tr>";
	str += "<th>编码</th>";
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
}

/*
 * WeixinUser begain
 */
/**
 * 微信用户列表回调函数
 */
function showWeixinUserPage(data) {
	var str = "<div class='panel-heading no-collapse' style='height:50px;'>" + "<div style='float:left;'><h5>微信用户</h5></div>";
	str += "<div style='float:right;'><button id='syncwebxinuserbtn' class='btn btn-danger'><i class='fa fa-gears'></i>&nbsp;同步微信用户</button></div>";
	str += "</div>";

	str += "<table class='table table-bordered table-striped'>";
	str += "<thead>";
	str += "<tr>";
	str += "<th>用户编码</th>";
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
			jsonAjax("get", "weixin/list", showWeixinUserPage);
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
		strHtml += '<label>用户编码</label> <input type="text" name="weixinUser.id" value="' + data.id + '" disabled="disabled" class="form-control">';
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
			jsonAjax("get", "weixin/list", showWeixinUserPage);
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
	str += "<table class='table table-bordered table-striped'>";
	str += "<thead>";
	str += "<tr>";
	str += "<th>产品编码</th>";
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
	strHtml += '<label>价格</label> <input type="text" name="product.price" value="" class="form-control">';
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
		strHtml += '<label>产品编码</label> <input type="text" name="product.productid" value="' + data.productid + '" class="form-control" readonly >';
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
		strHtml += '<label>价格</label> <input type="text" name="product.price" value="' + data.price + '" class="form-control">';
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

/**
 * utils
 */

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