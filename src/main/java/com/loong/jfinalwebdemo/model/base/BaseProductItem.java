package com.loong.jfinalwebdemo.model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseProductItem<M extends BaseProductItem<M>> extends Model<M> implements IBean {

	public void setItemid(java.lang.Long itemid) {
		set("itemid", itemid);
	}

	public java.lang.Long getItemid() {
		return get("itemid");
	}

	public void setProductid(java.lang.Long productid) {
		set("productid", productid);
	}

	public java.lang.Long getProductid() {
		return get("productid");
	}

	public void setCid(java.lang.Long cid) {
		set("cid", cid);
	}

	public java.lang.Long getCid() {
		return get("cid");
	}

	public void setItemnumber(java.lang.Long itemnumber) {
		set("itemnumber", itemnumber);
	}

	public java.lang.Long getItemnumber() {
		return get("itemnumber");
	}

}
