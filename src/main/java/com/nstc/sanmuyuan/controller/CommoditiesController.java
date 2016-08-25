package com.nstc.sanmuyuan.controller;

import java.util.List;

import com.jfinal.core.Controller;
import com.nstc.sanmuyuan.model.Commodities;
import com.nstc.sanmuyuan.service.CommoditiesService;
import com.nstc.sanmuyuan.service.impl.CommoditiesServiceImpl;

public class CommoditiesController extends Controller {
	CommoditiesService commoditiesService;
	public void list() {
		commoditiesService = new CommoditiesServiceImpl();
		List<Commodities> commodities = commoditiesService.list();
		renderJson(commodities);
	}
}
