package com.nstc.sanmuyuan.validator;

import com.jfinal.core.Controller;
import com.jfinal.validate.Validator;

public class LoginValidator extends Validator {

	@Override
	protected void validate(Controller c) {
		validateRequiredString("sysUser.uno", "errorMsg", "请输入用户名！");
		validateRequiredString("sysUser.pwd", "errorMsg", "请输入密码！");
	}

	@Override
	protected void handleError(Controller c) {
		c.setAttr("result", "fail");
		c.renderJson();
	}

}
