/**
 * 点击菜单事件
 */
function selectMenu(menucode) {
	var strHtml = "";
	if (menucode == "101") {
		jsonAjax("get", "sysuser/list", showSysUserPage);
	} else if (menucode == "102") {
		jsonAjax("get", "weixin/list", showWeixinUserPage);
	} else if (menucode == "103") {
		jsonAjax("get", "product/list", showProductPage);
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
	str += "<div style='float:right;'><button id='syncwebxinuserbtn' class='btn btn-primary'><i class='fa fa-gears'></i>&nbsp;同步微信用户</button></div>";
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
	str += "<th></th>";
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
			str += "<td><a href='javascript:void(0);' onclick=editWebxinUser('" + data[i].openid + "')><i class='fa fa-pencil'></i></a></td>";
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
		strHtml += '<div class="btn-toolbar list-toolbar">';
		strHtml += '<button id="weixinUserSaveBtn" class="btn btn-danger">保存</button>';
		strHtml += '<button id="weixinUserCancelBtn" class="btn btn-default">取消</button>';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '</div>';
		$("#editinfo").html(strHtml);
		$("#weixinUserSaveBtn").click(weixinUserSave);
		$("#weixinUserCancelBtn").click(weixinUserCancel);
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
function weixinUserCancel() {
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
function showProductPage(data) {
	var str = "<div class='panel-heading no-collapse'>" + "<h5>微信用户</h5>" + "</div>";
	str += "<table class='table table-bordered table-striped'>";
	str += "<thead>";
	str += "<tr>";
	str += "<th>微信昵称</th>";
	str += "<th>手机号码</th>";
	str += "<th>地址</th>";
	str += "<th>联系人</th>";
	str += "<th>联系人手机</th>";
	str += "<th>备注</th>";
	str += "</tr>";
	str += "</thead>";

	str += "<tbody>";

	if (data != null && data.length > 0) {
		for (i = 0; i < data.length; i++) {
			str += "<tr>";
			str += "<td>" + data[i].nickname + "</td>";
			str += "<td>" + data[i].phoneno + "</td>";
			str += "<td>" + data[i].addressed + "</td>";
			str += "<td>" + data[i].linkname + "</td>";
			str += "<td>" + data[i].linktelno + "</td>";
			str += "<td>" + data[i].remark + "</td>";
			str += "</tr>";
		}
	}
	str += "</tbody>";

	str += "</table>";
	$("#mainpanel").html(str);
}
/*
 * Product end
 */

/**
 * utils
 */
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

function showCapion(divName) {
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