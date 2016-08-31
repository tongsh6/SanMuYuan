package com.nstc.sanmuyuan.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.aop.Clear;
import com.jfinal.core.Controller;
import com.jfinal.log.Log;
import com.nstc.sanmuyuan.Interceptor.AuthInterceptor;
import com.nstc.sanmuyuan.message.ResultMessage;
import com.nstc.sanmuyuan.model.Orders;
import com.nstc.sanmuyuan.model.WeixinUser;
import com.nstc.sanmuyuan.service.WeiXinUserService;
import com.nstc.sanmuyuan.service.impl.WeiXinUserServiceImpl;

public class WeixinController extends Controller {

	private static final Log log = Log.getLog(WeixinController.class);
	WeiXinUserService weiXinUserService;

	public void list() {
		weiXinUserService = new WeiXinUserServiceImpl();
		List<WeixinUser> users = weiXinUserService.list();
		renderJson(users);
	}

	public void sync() throws Exception {
		weiXinUserService = new WeiXinUserServiceImpl();

		ResultMessage message = new ResultMessage();
		try {
			weiXinUserService.sync();
			message.setResultMsg("操作成功！");
		} catch (Exception e) {
			message.setResultCode(-1);
			message.setResultMsg("操做失败！");
			log.error(e.getMessage());
		} finally {
			renderJson(message);
		}
	}

	public void info() {

		String strOpenid = getPara("openid");

		weiXinUserService = new WeiXinUserServiceImpl();

		WeixinUser weixinUser = weiXinUserService.info(strOpenid);

		renderJson(weixinUser);
	}

	@Clear(AuthInterceptor.class)
	public void infopagetemp() {

		String strOpenid = getPara("openid");

		weiXinUserService = new WeiXinUserServiceImpl();

		WeixinUser weixinUser = weiXinUserService.info(strOpenid);
		setAttr("weixinuserinfo", weixinUser);
		renderJsp("/pages/weixinuserinfo.jsp");
	}

	@Clear(AuthInterceptor.class)
	public void infopage() {
		String strcode = getPara("code");
		if (strcode == null || strcode.trim().equals("")) {
			log.error("未获取到有效strcode,code为空或是空字符串!");
			renderJson("未获取到有效strcode,code为空或是空字符串!");
		} else {
			weiXinUserService = new WeiXinUserServiceImpl();
			WeixinUser weixinUser = weiXinUserService.infoByCode(strcode);

			setAttr("weixinuserinfo", weixinUser);
			renderJsp("/pages/weixinuserinfo.jsp");
		}
	}

	public void update() {
		weiXinUserService = new WeiXinUserServiceImpl();

		ResultMessage message = new ResultMessage();
		try {
			boolean reslut = weiXinUserService.update(getModel(WeixinUser.class));
			if (reslut) {
				message.setResultMsg("操作成功！");
			} else {
				message.setResultMsg("操做失败！");
			}
		} catch (Exception e) {
			message.setResultCode(-1);
			message.setResultMsg("操做失败！");
			log.error(e.getMessage());
		} finally {
			renderJson(message);
		}
	}

	@Clear(AuthInterceptor.class)
	public void mobileUpdate() {
		weiXinUserService = new WeiXinUserServiceImpl();

		ResultMessage message = new ResultMessage();
		try {
			boolean reslut = weiXinUserService.update(getModel(WeixinUser.class));
			if (reslut) {
				message.setResultMsg("操作成功！");
			} else {
				message.setResultMsg("操做失败！");
			}
		} catch (Exception e) {
			message.setResultCode(-1);
			message.setResultMsg("操做失败！");
			log.error(e.getMessage());
		} finally {
			setAttr("message", message);
			renderJsp("/pages/message.jsp");
		}
	}

	public void page() {
		renderJson("weixinuserpage", WeixinUser.dao.paginate(getParaToInt(0, 1), 6));
	}

	@Clear(AuthInterceptor.class)
	public void orderlistpage() {
		String openid = getPara("openid");
		if (openid == null || openid.trim().equals("")) {
			log.error("未获取到有效openid,openid为空或是空字符串!");
			renderJson("未获取到有效openid,openid为空或是空字符串!");
		} else {
			Map<String, String> params = new HashMap<String, String>();
			params.put("openid", openid);
			setAttr("orderlist", Orders.dao.query(params));
			renderJsp("/pages/orderlist.jsp");
		}
	}

	@Clear(AuthInterceptor.class)
	public void orders() {
		String strcode = getPara("code");
		if (strcode == null || strcode.trim().equals("")) {
			log.error("未获取到有效strcode,code为空或是空字符串!");
			renderJson("未获取到有效strcode,code为空或是空字符串!");
		} else {
			weiXinUserService = new WeiXinUserServiceImpl();
			List<Orders> orders = weiXinUserService.orderlist(strcode);

			setAttr("orderlist", orders);
			renderJsp("/pages/orderlist.jsp");
		}
	}
}
