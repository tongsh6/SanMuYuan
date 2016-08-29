package com.nstc.sanmuyuan.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.core.Controller;
import com.nstc.sanmuyuan.model.Orders;
import com.nstc.sanmuyuan.service.OrdersService;
import com.nstc.sanmuyuan.service.impl.OrdersServiceImpl;

public class QueryController extends Controller {
	OrdersService ordersService;

	public void list() {
		Map<String, String> params = new HashMap<String, String>();

		params.put("begdate", getPara("begdate"));
		params.put("enddate", getPara("enddate"));
		params.put("orderid", getPara("orderid"));
		params.put("weixinuserid", getPara("weixinuserid"));
		params.put("productid", getPara("productid"));

		ordersService = new OrdersServiceImpl();
		List<Orders> orders = Orders.dao.query(params);
		renderJson(orders);
	}
}
