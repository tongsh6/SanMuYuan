/**
 * 点击菜单事件
 */
var _menuname = "";
function selectMenu(menu) {
	showCapion();
	_menuname = menu.text;
	menucode = menu.id;
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
		jsonAjax("get", "plans/list", showPlansListPage);
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
