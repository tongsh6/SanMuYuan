package com.nstc.sanmuyuan.service.impl;

import java.util.List;

import com.nstc.sanmuyuan.model.MenuTree;
import com.nstc.sanmuyuan.service.MenuService;

public class MenuServiceImpl implements MenuService {
	@Override
	public List<MenuTree> getAllMenu() {
		// TODO Auto-generated method stub
		return MenuTree.dao.find("select * from menu_tree order by sortno");
	}
}
