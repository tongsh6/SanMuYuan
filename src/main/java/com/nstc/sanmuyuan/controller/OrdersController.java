package com.nstc.sanmuyuan.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.core.Controller;
import com.jfinal.log.Log;
import com.nstc.sanmuyuan.message.ResultMessage;
import com.nstc.sanmuyuan.model.Orders;
import com.nstc.sanmuyuan.service.OrdersService;
import com.nstc.sanmuyuan.service.impl.OrdersServiceImpl;

public class OrdersController extends Controller {

	private static final Log log = Log.getLog(OrdersController.class);
	OrdersService ordersService;

	public void list() {
		ordersService = new OrdersServiceImpl();
		List<Orders> orders = ordersService.list();
		renderJson(orders);
	}

	public void info() {
		String strOrderid = getPara("orderid");

		ordersService = new OrdersServiceImpl();

		Orders orders = ordersService.info(strOrderid);

		renderJson(orders);
	}

	public void save() {
		ordersService = new OrdersServiceImpl();

		ResultMessage message = new ResultMessage();

		Orders orders = getModel(Orders.class);

		try {
			boolean result = ordersService.save(orders);
			if (result) {
				message.setResultMsg("操作成功！");
			} else {
				message.setResultCode(-1);
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

	public void update() {
		ordersService = new OrdersServiceImpl();

		ResultMessage message = new ResultMessage();

		Orders orders = getModel(Orders.class);

		try {
			boolean result = ordersService.update(orders);
			if (result) {
				message.setResultMsg("操作成功！");
			} else {
				message.setResultCode(-1);
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

	public void del() {
		String strOrderid = getPara("orderid");

		ordersService = new OrdersServiceImpl();

		ResultMessage message = new ResultMessage();
		try {
			boolean result = ordersService.del(strOrderid);
			if (result) {
				message.setResultMsg("操作成功！");
			} else {
				message.setResultCode(-1);
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
		int pagesize = getParaToInt("pagesize", 10);

		Map<String, String> params = new HashMap<String, String>();

		params.put("orderid", getPara("orderid"));
		params.put("nickname", getPara("nickname"));
		params.put("remark", getPara("remark"));

		renderJson("orderpage", Orders.dao.paginate(params, getParaToInt(0, 1), pagesize));
	}
}
