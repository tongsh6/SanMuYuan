package com.nstc.sanmuyuan.model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseOrders<M extends BaseOrders<M>> extends Model<M> implements IBean {

	public void setOrderid(java.lang.Long orderid) {
		set("orderid", orderid);
	}

	public java.lang.Long getOrderid() {
		return get("orderid");
	}

	public void setOpenid(java.lang.String openid) {
		set("openid", openid);
	}

	public java.lang.String getOpenid() {
		return get("openid");
	}

	public void setProductid(java.lang.Long productid) {
		set("productid", productid);
	}

	public java.lang.Long getProductid() {
		return get("productid");
	}

	public void setPrice(java.lang.Double price) {
		set("price", price);
	}

	public java.lang.Double getPrice() {
		return get("price");
	}

	public void setRemark(java.lang.String remark) {
		set("remark", remark);
	}

	public java.lang.String getRemark() {
		return get("remark");
	}

}