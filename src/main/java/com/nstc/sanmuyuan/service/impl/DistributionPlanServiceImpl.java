package com.nstc.sanmuyuan.service.impl;

import java.util.List;

import com.nstc.sanmuyuan.model.DistributionPlan;
import com.nstc.sanmuyuan.model.PlanItem;
import com.nstc.sanmuyuan.service.DistributionPlanService;

public class DistributionPlanServiceImpl implements DistributionPlanService {

	@Override
	public List<DistributionPlan> list() {
		return DistributionPlan.dao.list();
	}

	@Override
	public DistributionPlan info(String strPlanid) {
		return DistributionPlan.dao.info(strPlanid);
	}

	@Override
	public boolean save(DistributionPlan distributionPlan, List<PlanItem> items) throws Exception {
		return distributionPlan.save(distributionPlan, items);
	}

	@Override
	public boolean del(String strPlanid) throws Exception {
		return DistributionPlan.dao.del(strPlanid);
	}

	@Override
	public boolean update(DistributionPlan distributionPlan, List<PlanItem> items) throws Exception {
		return distributionPlan.update(distributionPlan, items);
	}

}
