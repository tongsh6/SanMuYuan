package com.loong.jfinalwebdemo.controller;

import com.jfinal.aop.Before;
import com.jfinal.aop.Clear;
import com.jfinal.core.Controller;
import com.loong.jfinalwebdemo.Interceptor.AuthInterceptor;
import com.loong.jfinalwebdemo.model.SysUser;
import com.loong.jfinalwebdemo.service.SysUserService;
import com.loong.jfinalwebdemo.service.impl.SysUserServiceImpl;
import com.loong.jfinalwebdemo.validator.LoginValidator;

public class SysUserController extends Controller {
	SysUserService sysUserService;

	@Clear(AuthInterceptor.class)
	public void index() {
		renderJsp("login.jsp");
	}

	@Before(LoginValidator.class)
	public void login() {
		SysUser user = getModel(SysUser.class);

		sysUserService = new SysUserServiceImpl();
		user = sysUserService.login(user);

		String result = "success";
		if (user == null || user.getUserid() == null) {
			result = "fail";
			setAttr("errorMsg", "用户名或密码错误！");
		} else {
			setSessionAttr("user", user);
		}
		setAttr("result", result);
		renderJson();
	}

	public void logout() {
		removeSessionAttr("user");
		redirect("/");
	}
}
