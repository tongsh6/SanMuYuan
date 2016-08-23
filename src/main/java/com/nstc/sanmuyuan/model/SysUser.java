package com.nstc.sanmuyuan.model;

import java.util.List;

import com.nstc.sanmuyuan.model.base.BaseSysUser;

/**
 * Generated by JFinal.
 */
@SuppressWarnings("serial")
public class SysUser extends BaseSysUser<SysUser> {
	public static final SysUser dao = new SysUser();

	/**
	 * 根据用户名获取对象
	 */
	public SysUser login(SysUser sysUser) {
		String sql = "select userid,uname,utype from sys_user where uno=? and pwd=?";
		return findFirst(sql, sysUser.getUno(), sysUser.getPwd());
	}

	/**
	 * 根据用户名获取对象
	 */
	public List<SysUser> list() {
		String sql = "select userid,uno,uname from sys_user order by userid";
		return find(sql);
	}

}
