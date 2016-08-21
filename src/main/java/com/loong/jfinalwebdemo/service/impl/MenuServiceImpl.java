package com.loong.jfinalwebdemo.service.impl;

import java.util.List;

import com.loong.jfinalwebdemo.model.MenuTree;
import com.loong.jfinalwebdemo.service.MenuService;

public class MenuServiceImpl implements MenuService {
	@Override
	public List<MenuTree> getAllMenu() {
		// TODO Auto-generated method stub
		return MenuTree.dao.find("select * from menu_tree order by sortno");
	}
}
