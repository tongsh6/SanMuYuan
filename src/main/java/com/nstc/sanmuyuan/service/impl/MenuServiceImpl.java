package com.nstc.sanmuyuan.service.impl;

import java.util.List;

import com.nstc.sanmuyuan.model.MenuTree;
import com.nstc.sanmuyuan.model.SysUser;
import com.nstc.sanmuyuan.service.MenuService;

public class MenuServiceImpl implements MenuService {
	@Override
	public List<MenuTree> getAllMenu() {
		return MenuTree.dao.list();
	}

	@Override
	public List<MenuTree> getMenuByUser(SysUser user) {
		return MenuTree.dao.getMenuByUser(user);
	}
}
