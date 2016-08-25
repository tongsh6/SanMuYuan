package com.nstc.sanmuyuan.model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseWeixinUser<M extends BaseWeixinUser<M>> extends Model<M> implements IBean {

	public void setOpenid(java.lang.String openid) {
		set("openid", openid);
	}

	public java.lang.String getOpenid() {
		return get("openid");
	}

	public void setNickname(java.lang.String nickname) {
		set("nickname", nickname);
	}

	public java.lang.String getNickname() {
		return get("nickname");
	}

	public void setUsername(java.lang.String username) {
		set("username", username);
	}

	public java.lang.String getUsername() {
		return get("username");
	}

	public void setPhoneno(java.lang.String phoneno) {
		set("phoneno", phoneno);
	}

	public java.lang.String getPhoneno() {
		return get("phoneno");
	}

	public void setAddressed(java.lang.String addressed) {
		set("addressed", addressed);
	}

	public java.lang.String getAddressed() {
		return get("addressed");
	}

	public void setLinkname(java.lang.String linkname) {
		set("linkname", linkname);
	}

	public java.lang.String getLinkname() {
		return get("linkname");
	}

	public void setLinktelno(java.lang.String linktelno) {
		set("linktelno", linktelno);
	}

	public java.lang.String getLinktelno() {
		return get("linktelno");
	}

	public void setRemark(java.lang.String remark) {
		set("remark", remark);
	}

	public java.lang.String getRemark() {
		return get("remark");
	}

	public void setId(java.lang.Long id) {
		set("id", id);
	}

	public java.lang.Long getId() {
		return get("id");
	}

}
