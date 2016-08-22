package com.nstc.sanmuyuan.controller;

import com.jfinal.core.Controller;

public class MainController extends Controller {
	public void index() {
		renderJsp("main.jsp");
	}
}
