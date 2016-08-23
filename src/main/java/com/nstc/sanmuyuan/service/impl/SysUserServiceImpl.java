package com.nstc.sanmuyuan.service.impl;

import java.util.List;

import com.nstc.sanmuyuan.model.SysUser;
import com.nstc.sanmuyuan.service.SysUserService;

public class SysUserServiceImpl implements SysUserService {
	public SysUser login(SysUser sysUser) {
		return sysUser.login(sysUser);
	}

	@Override
	public List<SysUser> list() {
		return SysUser.dao.list();
	}
}
