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
	_menuname = menu.innerText;
	menucode = menu.id;
	var strHtml = "";
	addCountNum = 0;
	if (menucode == "101") {
		$("#querydiv").hide();
		jsonAjax("get", "sysuser/list?pagesize=" + _mainpagesize, showSysUserListPage);
	} else if (menucode == "102") {
		$("#querydiv").hide();
		jsonAjax("get", "weixin/list?pagesize=" + _mainpagesize, showWeixinUserListPage);
	} else if (menucode == "103") {
		$("#querydiv").hide();
		jsonAjax("get", "product/list?pagesize=" + _mainpagesize, showProductListPage);
	} else if (menucode == "104") {
		$("#querydiv").hide();
		jsonAjax("get", "orders/list?pagesize=" + _mainpagesize, showOrdersListPage);
	} else if (menucode == "105") {
		$("#querydiv").hide();
		jsonAjax("get", "plans/list?pagesize=" + _mainpagesize, showPlansListPage);
	} else if (menucode == "106") {
		showQueryListPage();
	}
}
