package com.nstc.sanmuyuan.service;

import java.util.List;

import com.nstc.sanmuyuan.model.Orders;
import com.nstc.sanmuyuan.model.WeixinUser;

public interface WeiXinUserService {

	List<WeixinUser> list();

	void sync() throws Exception;

	WeixinUser info(String strOpenid);

	boolean update(WeixinUser model);

	List<Orders> orderlist(String strcode);

	WeixinUser infoByCode(String strcode);

	String getOpenId(String strcode);

}
