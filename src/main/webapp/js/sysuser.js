function showSysUserListPage(data) {
	var str = "<div class='panel-heading no-collapse'style='height:50px;'><h5>" + _menuname + "</h5></div>";
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