package com.nstc.sanmuyuan.validator;

import com.jfinal.core.Controller;
import com.jfinal.validate.Validator;

public class PlanValidator extends Validator {

	@Override
	protected void validate(Controller c) {
		validateRequiredString("distributionPlan.plandate", "errorMsg", "请选择配送日期！");
		validateRequiredString("distributionPlan.orderid", "errorMsg", "请选择订单！");
	}

	@Override
	protected void handleError(Controller c) {
		c.setAttr("result", "fail");
		c.renderJson();
	}

}
