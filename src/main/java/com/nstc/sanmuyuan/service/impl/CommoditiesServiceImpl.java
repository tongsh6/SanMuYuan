package com.nstc.sanmuyuan.service.impl;

import java.util.List;

import com.nstc.sanmuyuan.model.Commodities;
import com.nstc.sanmuyuan.service.CommoditiesService;

public class CommoditiesServiceImpl implements CommoditiesService {

	@Override
	public List<Commodities> list() {
		return Commodities.dao.list();
	}

}
