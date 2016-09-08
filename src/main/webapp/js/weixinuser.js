/*
 * WeixinUser begain
 */
/**
 * 微信用户列表回调函数
 */
function showWeixinUserListPage(data) {
	var str = "<div class='panel-heading no-collapse' style='height:50px;'>" + "<div style='float:left;'><h5>" + _menuname + "</h5></div>";
	str += "<div style='float:right;'><button id='syncwebxinuserbtn' class='btn btn-danger'><i class='fa fa-gears'></i>&nbsp;同步微信用户</button></div>";
	str += "<div style='float:right;padding-right: 5px;'><button id='addUserPageBtn' class='btn btn-danger'><i class='fa fa-plus'></i>&nbsp;新增会员</button></div>";
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
			str += "<td align='center'><a href='javascript:void(0);' onclick=editWebxinUser('" + data[i].openid + "')><i class='fa fa-pencil'></i></a>";
			str += "&nbsp;&nbsp;<a role='button' data-toggle='modal' href='javascript:void(0);' onclick=delUser('" + data[i].openid + "')><i class='fa fa-trash-o'></i></a></td>";

			str += "</tr>";
		}
	}
	str += "</tbody>";

	str += "</table>";
	$("#mainpanel").html(str);

	$("#syncwebxinuserbtn").click(syncWebxinUser);
	$("#addUserPageBtn").click(addUserPage);
	hideCapion();
}

function delUser(openid) {
	showCfm("您确定要删除吗,此操作将会同时把该用户的订单和配货计划一起删除？", function() {
		showCapion();
		jsonAjax("post", "weixin/del?openid=" + openid, function(data) {
			hideCapion();
			if (data != null) {
				showCapionMsg(data.resultMsg);
				jsonAjax("get", "weixin/list?pagesize=" + _mainpagesize, showWeixinUserListPage);
			} else {
				showCapionMsg("未知错误！");
			}
		});
	});
}

function addUserPage() {
	var strHtml = '<div class="row">';
	strHtml += '<div class="col-md-12">';
	strHtml += '<br>';
	strHtml += '<div id="myTabContent" class="tab-content">';
	strHtml += '<div class="tab-pane active in" id="home">';
	strHtml += '<form id="editform">';
	strHtml += '<input type="hidden" name="weixinUser.openid">';
	strHtml += '<div class="form-group">';
	strHtml += '<label>用户编号</label> <input type="text" name="weixinUser.id" class="form-control" readonly>';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>微信昵称</label> <input type="text" name="weixinUser.nickname" class="form-control">';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>手机号码</label> <input type="text" name="weixinUser.phoneno" class="form-control">';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>地址</label>';
	strHtml += '<input type="text" name="weixinUser.addressed" class="form-control">';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>联系人</label> <input type="text" name="weixinUser.linkname" class="form-control">';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>联系人手机</label> <input type="text" name="weixinUser.linktelno"  class="form-control">';
	strHtml += '</div>';
	strHtml += '<div class="form-group">';
	strHtml += '<label>备注</label><textarea name="weixinUser.remark"  class="form-control"/> ';
	strHtml += '</div>';
	strHtml += '</form>';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '<div class="btn-toolbar list-toolbar" style="float:right;">';
	strHtml += '<button id="weixinUserCancelBtn" class="btn btn-default" style="float:right">取消</button>';
	strHtml += '<button id="weixinUserSaveBtn" class="btn btn-danger" style="float:right">保存</button>&nbsp;&nbsp;';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '</div>';
	$("#editinfo").html(strHtml);
	$("#weixinUserSaveBtn").click(function() {
		weixinUserSave("save");
	});
	$("#weixinUserCancelBtn").click(Cancel);
	showMask();
	ShowEditDiv("#editdiv");
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
			jsonAjax("get", "weixin/list?pagesize=" + _mainpagesize, showWeixinUserListPage);
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
		strHtml += '<label>备注</label><textarea name="weixinUser.remark" value="' + data.remark + '" class="form-control"/> ';
		strHtml += '</div>';
		strHtml += '</form>';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '<div class="btn-toolbar list-toolbar" style="float:right;">';
		strHtml += '<button id="weixinUserCancelBtn" class="btn btn-default" style="float:right">取消</button>';
		strHtml += '<button id="weixinUserSaveBtn" class="btn btn-danger" style="float:right">保存</button>&nbsp;&nbsp;';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '</div>';
		$("#editinfo").html(strHtml);
		$("#weixinUserSaveBtn").click(function() {
			weixinUserSave("update");
		});
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
function weixinUserSave(oper) {
	var formParam = $("#editform").serialize();// 序列化表格内容为字符串

	Cancel();
	hideMask();
	showCapion();

	jsonAjaxForm("post", "weixin/" + oper, formParam, weixinUserSaveCallBack);
}

function weixinUserSaveCallBack(data) {
	hideCapion();
	if (data != null) {
		{
			showCapionMsg(data.resultMsg);
			Cancel();
			jsonAjax("get", "weixin/list?pagesize=" + _mainpagesize, showWeixinUserListPage);
		}
	}
}

/**
 * 微信用户选择窗口
 */
function showWeixinUserListPanel() {
	showCapion();
	var strHtml = '';
	strHtml += '<form id="querylistform" class="form-horizontal" style="padding-top: 15px;" role="form">';
	strHtml += '<div class="form-group">';
	strHtml += '<label  class="col-sm-2 control-label">用户编号</label>';
	strHtml += '<div class="col-sm-4">';
	strHtml += '<input type="text" class="form-control" name="weixinuserid" value="">';
	strHtml += '</div>';
	strHtml += '<label class="col-sm-2 control-label">微信昵称</label>';
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
	strHtml += '<input type="button" class="form-control" id="querybin" value="查询" onclick=showWeixinUserList(); />';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '</form>';

	strHtml += '<div id="querylistdiv">';
	strHtml += '<table class="table">';
	strHtml += '<thead>';
	strHtml += '<tr>';
	strHtml += '<th>用户编号</th>';
	strHtml += '<th>微信昵称</th>';
	strHtml += '<th>备注</th>';
	strHtml += '</tr>';
	strHtml += '</thead>';
	strHtml += '<tbody>';
	jsonAjax("get", "weixin/page/" + 1 + "?pagesize=" + _pagesize, function(data) {
		hideCapion();
		if (data != null) {
			if (data.weixinuserpage.list != null && data.weixinuserpage.list.length > 0) {
				var users = data.weixinuserpage.list;

				var pNum = (parseInt(data.weixinuserpage.pageNumber) - 1);
				var nNum = (parseInt(data.weixinuserpage.pageNumber) + 1);
				var strDisabledP = 'onclick=showWeixinUserList("' + pNum + '")';
				var strDisabledN = ' onclick=showWeixinUserList("' + nNum + '")';

				if (data.weixinuserpage.pageNumber == 1) {
					strDisabledP = "";
				}
				if (data.weixinuserpage.pageNumber == data.weixinuserpage.totalPage) {
					strDisabledN = "";
				}

				for (i = 0; i < users.length; i++) {
					strHtml += '<tr ondblclick="dbclickWeixinUserCallBack(this);">';
					strHtml += '<td><span id="weixinuserid">' + users[i].id + '</span><input type="hidden" id="openid" value="' + users[i].openid + '" /></td>';
					strHtml += '<td>' + users[i].nickname + '</td>';
					strHtml += '<td>' + users[i].remark + '</td>';
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
		}
		strHtml += '</div>';
		$("#listinfo").html(strHtml);
		$("#closelistbtn").click(closeListPage);
		showMask();
		showListCapionByDivId("#listdiv");
	});
}

function showWeixinUserList(pagenum) {
	if (typeof (pagenum) == "undefined") {
		pagenum = "";
	}

	var formParam = $("#querylistform").serialize();// 序列化表格内容为字符串

	jsonAjaxForm("get", "weixin/page/" + pagenum + "?pagesize=" + _pagesize, formParam, function(data) {
		if (data != null) {
			var strHtml = "";
			strHtml += '<table class="table">';
			strHtml += '<thead>';
			strHtml += '<tr>';
			strHtml += '<th>用户编号</th>';
			strHtml += '<th>微信昵称</th>';
			strHtml += '<th>备注</th>';
			strHtml += '</tr>';
			strHtml += '</thead>';
			strHtml += '<tbody>';
			if (data.weixinuserpage.list != null && data.weixinuserpage.list.length > 0) {
				var users = data.weixinuserpage.list;

				var pNum = (parseInt(data.weixinuserpage.pageNumber) - 1);
				var nNum = (parseInt(data.weixinuserpage.pageNumber) + 1);
				var strDisabledP = 'onclick=showWeixinUserList("' + pNum + '")';
				var strDisabledN = ' onclick=showWeixinUserList("' + nNum + '")';

				if (data.weixinuserpage.pageNumber == 1) {
					strDisabledP = "";
				}
				if (data.weixinuserpage.pageNumber == data.weixinuserpage.totalPage) {
					strDisabledN = "";
				}

				for (i = 0; i < users.length; i++) {
					strHtml += '<tr ondblclick="dbclickWeixinUserCallBack(this);">';
					strHtml += '<td><span id="weixinuserid">' + users[i].id + '</span><input type="hidden" id="openid" value="' + users[i].openid + '" /></td>';
					strHtml += '<td>' + users[i].nickname + '</td>';
					strHtml += '<td>' + users[i].remark + '</td>';
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
			$("#querylistdiv").html(strHtml);
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
/*
 * WeixinUser end
 */
