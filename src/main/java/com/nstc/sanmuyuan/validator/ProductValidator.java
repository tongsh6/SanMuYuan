package com.nstc.sanmuyuan.validator;

import com.jfinal.core.Controller;
import com.jfinal.validate.Validator;

public class ProductValidator extends Validator {

	@Override
	protected void validate(Controller c) {
		validateRequiredString("product.price", "errorMsg", "请输入产品价格！");
		validateRequiredString("product.productname", "errorMsg", "请输入产品名称！");
	}

	@Override
	protected void handleError(Controller c) {
		c.setAttr("result", "fail");
		c.renderJson();
	}

}
