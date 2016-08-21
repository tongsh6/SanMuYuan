package com.loong.jfinalwebdemo.controller;

import java.util.List;

import com.jfinal.core.Controller;
import com.loong.jfinalwebdemo.model.MenuTree;
import com.loong.jfinalwebdemo.service.MenuService;
import com.loong.jfinalwebdemo.service.impl.MenuServiceImpl;

public class MenuController extends Controller {
	MenuService menuService;

	public void index() {
		menuService = new MenuServiceImpl();

		List<MenuTree> trees = menuService.getAllMenu();

		renderJson(trees);
	}

}
