package com.loong.jfinalwebdemo.model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseSysUser<M extends BaseSysUser<M>> extends Model<M> implements IBean {

	public void setUSERID(java.lang.Long USERID) {
		set("USERID", USERID);
	}

	public java.lang.Long getUSERID() {
		return get("USERID");
	}

	public void setUNO(java.lang.String UNO) {
		set("UNO", UNO);
	}

	public java.lang.String getUNO() {
		return get("UNO");
	}

	public void setUNAME(java.lang.String UNAME) {
		set("UNAME", UNAME);
	}

	public java.lang.String getUNAME() {
		return get("UNAME");
	}

	public void setUTYPE(java.lang.Integer UTYPE) {
		set("UTYPE", UTYPE);
	}

	public java.lang.Integer getUTYPE() {
		return get("UTYPE");
	}

	public void setPWD(java.lang.String PWD) {
		set("PWD", PWD);
	}

	public java.lang.String getPWD() {
		return get("PWD");
	}

	public void setCREATEDATE(java.util.Date CREATEDATE) {
		set("CREATEDATE", CREATEDATE);
	}

	public java.util.Date getCREATEDATE() {
		return get("CREATEDATE");
	}

}
