/**
 * 全局变量
 */
var _menuname = "";
var _pagesize = 6;
var _mainpagesize = 15;

/**
 * 点击菜单事件
 */
function selectMenu(menu) {
	showCapion();
	_menuname = menu.text;
	menucode = menu.id;
	var strHtml = "";
	if (menucode == "101") {
		jsonAjax("get", "sysuser/list?pagesize=" + _mainpagesize, showSysUserListPage);
	} else if (menucode == "102") {
		jsonAjax("get", "weixin/list?pagesize=" + _mainpagesize, showWeixinUserListPage);
	} else if (menucode == "103") {
		jsonAjax("get", "product/list?pagesize=" + _mainpagesize, showProductListPage);
	} else if (menucode == "104") {
		jsonAjax("get", "orders/list?pagesize=" + _mainpagesize, showOrdersListPage);
	} else if (menucode == "105") {
		jsonAjax("get", "plans/list?pagesize=" + _mainpagesize, showPlansListPage);
	} else if (menucode == "106") {
		showQueryListPage();
	}
}
