package com.nstc.sanmuyuan.service.impl;

import java.util.List;

import com.nstc.sanmuyuan.model.Orders;
import com.nstc.sanmuyuan.service.OrdersService;

public class OrdersServiceImpl implements OrdersService {

	@Override
	public List<Orders> list() {
		return Orders.dao.list();
	}

	@Override
	public Orders info(String strOrderid) {
		return Orders.dao.info(strOrderid);
	}

	@Override
	public boolean save(Orders orders) throws Exception {
		return orders.save();
	}

	@Override
	public boolean update(Orders orders) throws Exception {
		return orders.update();
	}

	@Override
	public void del(String strOrderid) throws Exception {
		Orders.dao.del(strOrderid);
	}

}
