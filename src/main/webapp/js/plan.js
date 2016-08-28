function showPlansListPage() {
	var str = "<div class='panel-heading no-collapse' style='height:50px;'>" + "<div style='float:left;'><h5>" + _menuname + "</h5></div>";
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