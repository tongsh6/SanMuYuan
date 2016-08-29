package com.nstc.sanmuyuan.service;

import java.util.List;

import com.nstc.sanmuyuan.model.DistributionPlan;
import com.nstc.sanmuyuan.model.PlanItem;

public interface DistributionPlanService {
	List<DistributionPlan> list();

	DistributionPlan info(String strPlanid);

	boolean save(DistributionPlan distributionPlan, List<PlanItem> items) throws Exception;

	boolean del(String strPlanid) throws Exception;

	boolean update(DistributionPlan distributionPlan, List<PlanItem> items) throws Exception;

}
