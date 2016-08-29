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

/**
 * 取消
 */
function Cancel() {
	$("#editinfo").html("");
	hideDiv("#editdiv");
	hideMask();
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
			hideCapion();
			$.FloatConfirm({
				title : '提示',
				type : 'error',
				text : '请求失败！'
			})
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
			hideCapion();
			$.FloatConfirm({
				title : '提示',
				type : 'error',
				text : '请求失败！'
			})
		}
	});
}