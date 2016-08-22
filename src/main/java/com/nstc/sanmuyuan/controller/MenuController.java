package com.nstc.sanmuyuan.controller;

import java.util.List;

import com.jfinal.core.Controller;
import com.nstc.sanmuyuan.model.MenuTree;
import com.nstc.sanmuyuan.service.MenuService;
import com.nstc.sanmuyuan.service.impl.MenuServiceImpl;

public class MenuController extends Controller {
	MenuService menuService;

	public void index() {
		menuService = new MenuServiceImpl();

		List<MenuTree> trees = menuService.getAllMenu();

		renderJson(trees);
	}

}
