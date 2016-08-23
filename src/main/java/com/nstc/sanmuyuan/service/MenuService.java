package com.nstc.sanmuyuan.service;

import java.util.List;

import com.nstc.sanmuyuan.model.MenuTree;
import com.nstc.sanmuyuan.model.SysUser;

public interface MenuService {
	public List<MenuTree> getAllMenu();

	public List<MenuTree> getMenuByUser(SysUser user);
}
