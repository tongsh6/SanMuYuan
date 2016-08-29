/*
 * Product begain
 */
function showProductListPage(data) {
	var str = "<div class='panel-heading no-collapse' style='height:50px;'>" + "<div style='float:left;'><h5>" + _menuname + "</h5></div>";
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
	strHtml += '<label>备注</label><textarea name="product.remark" value="" class="form-control"></textarea> ';
	strHtml += '</div>';
	strHtml += '</form>';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '<div class="btn-toolbar list-toolbar">';
	strHtml += '<button id="productCancelBtn" class="btn btn-default" style="float:right">取消</button>';
	strHtml += '<button id="productSaveBtn" onclick=productOper("save") class="btn btn-danger" style="float:right">保存</button>&nbsp;&nbsp;';
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
		strHtml += '<label>备注</label><textarea name="product.remark" class="form-control">' + data.remark + '</textarea> ';
		strHtml += '</div>';
		strHtml += '</form>';
		strHtml += '</div>';
		strHtml += '</div>';
		strHtml += '<div class="btn-toolbar list-toolbar">';
		strHtml += '<button id="productCancelBtn" class="btn btn-default" style="float:right">取消</button>';
		strHtml += '<button id="productSaveBtn" onclick=productOper("update") class="btn btn-danger" style="float:right">保存</button>&nbsp;&nbsp;';
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
function productOper(oper) {
	var formParam = $("#editform").serialize();// 序列化表格内容为字符串

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
				var nNum = (parseInt(data.productpage.pageNumber) + 1);
				var strDisabledP = 'onclick=showProductList("' + pNum + '")';
				var strDisabledN = ' onclick=showProductList("' + nNum + '")';

				if (data.productpage.pageNumber == 1) {
					strDisabledP = "";
				}
				if (data.productpage.pageNumber == data.productpage.totalPage) {
					strDisabledN = "";
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

function dbclickProductCallBack(tr) {
	$("#productid").val(tr.cells[0].textContent);
	$("#productview").val(tr.cells[0].textContent + "(" + tr.cells[1].textContent + ")");
	$("#price").val(parseFloat(tr.cells[3].textContent.replace(/,/gm, '')));
	closeListPage();
}
/*
 * Product end
 */