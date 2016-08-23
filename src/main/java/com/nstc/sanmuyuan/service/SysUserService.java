package com.nstc.sanmuyuan.service;

import java.util.List;

import com.nstc.sanmuyuan.model.SysUser;

public interface SysUserService {
	public SysUser login(SysUser sysUser);

	public List<SysUser> list();
}
