package com.loong.jfinalwebdemo.controller;

import com.jfinal.core.Controller;

public class HelloController extends Controller {
	public void index() {
		renderText("Hello J world.");
	}
}
