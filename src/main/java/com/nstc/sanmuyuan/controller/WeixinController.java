package com.nstc.sanmuyuan.controller;

import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.log.Log;
import com.nstc.sanmuyuan.message.ResultMessage;
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

	public void page() {
		renderJson("weixinuserpage", WeixinUser.dao.paginate(getParaToInt(0, 1), 6));
	}
}
