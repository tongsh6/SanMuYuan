package com.nstc.sanmuyuan.service;

import java.util.List;

import com.nstc.sanmuyuan.model.Orders;

public interface OrdersService {
	List<Orders> list();

	Orders info(String strOrderid);

	boolean save(Orders orders) throws Exception;

	boolean update(Orders orders) throws Exception;

	boolean del(String strOrderid) throws Exception;
}
