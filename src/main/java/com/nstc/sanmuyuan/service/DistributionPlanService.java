package com.nstc.sanmuyuan.service;

import java.util.List;

import com.nstc.sanmuyuan.model.DistributionPlan;
import com.nstc.sanmuyuan.model.PlanItem;

public interface DistributionPlanService {
	List<DistributionPlan> list();

	DistributionPlan info(String strPlanid);

	void save(DistributionPlan distributionPlan, List<PlanItem> items) throws Exception;

	void del(String strPlanid) throws Exception;

	void update(DistributionPlan distributionPlan, List<PlanItem> items) throws Exception;

}
