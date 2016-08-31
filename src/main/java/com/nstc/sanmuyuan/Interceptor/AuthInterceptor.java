package com.nstc.sanmuyuan.Interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.nstc.sanmuyuan.model.SysUser;

public class AuthInterceptor implements Interceptor {

	@Override
	public void intercept(Invocation inv) {
		Controller controller = inv.getController();
		SysUser user = controller.getSessionAttr("user");
		// 判断登录条件是否成立

		if (user == null) {
			controller.redirect("/sysuser");
		} else {
			inv.invoke();
		}

	}

}
