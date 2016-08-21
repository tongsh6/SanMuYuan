package com.loong.jfinalwebdemo.Interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.loong.jfinalwebdemo.model.SysUser;

public class AuthInterceptor implements Interceptor {

	@Override
	public void intercept(Invocation inv) {
		Controller controller = inv.getController();
		SysUser user = controller.getSessionAttr("user");
		// 判断登录条件是否成立(除了登录功能不拦截之外，其他都拦截)
		if (user == null && !inv.getMethod().getName().equals("login")) {
			controller.redirect("/sysuser");
		} else {
			inv.invoke();
		}

	}

}
