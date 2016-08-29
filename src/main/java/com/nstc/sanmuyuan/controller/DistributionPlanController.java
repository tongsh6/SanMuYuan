package com.nstc.sanmuyuan.controller;

import java.util.ArrayList;
import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.log.Log;
import com.nstc.sanmuyuan.message.ResultMessage;
import com.nstc.sanmuyuan.model.DistributionPlan;
import com.nstc.sanmuyuan.model.PlanItem;
import com.nstc.sanmuyuan.service.DistributionPlanService;
import com.nstc.sanmuyuan.service.impl.DistributionPlanServiceImpl;

public class DistributionPlanController extends Controller {

	private static final Log log = Log.getLog(DistributionPlanController.class);
	DistributionPlanService distributionPlanService;

	public void list() {
		distributionPlanService = new DistributionPlanServiceImpl();
		List<DistributionPlan> DistributionPlans = distributionPlanService.list();
		renderJson(DistributionPlans);
	}

	public void info() {
		String strDistributionPlanid = getPara("planid");

		distributionPlanService = new DistributionPlanServiceImpl();

		DistributionPlan DistributionPlan = distributionPlanService.info(strDistributionPlanid);

		renderJson(DistributionPlan);
	}

	public void save() {
		distributionPlanService = new DistributionPlanServiceImpl();

		ResultMessage message = new ResultMessage();

		DistributionPlan distributionPlan = getModel(DistributionPlan.class);
		List<PlanItem> items = new ArrayList<PlanItem>();

		Long[] cids = getParaValuesToLong("planItem.cid");
		Long[] itemnumbers = getParaValuesToLong("planItem.itemnumber");
		for (int i = 0; i < cids.length; i++) {
			PlanItem item = new PlanItem();
			item.setCid(cids[i]);
			item.setItemnumber(itemnumbers[i]);
			items.add(item);
		}

		try {
			boolean res = distributionPlanService.save(distributionPlan, items);
			if (res) {
				message.setResultMsg("操作成功！");
			} else {
				throw new Exception("操做失败！");
			}
		} catch (Exception e) {
			message.setResultCode(-1);
			message.setResultMsg("操做失败！");
			log.error(e.getMessage());
		} finally {
			renderJson(message);
		}
	}

	public void update() {
		distributionPlanService = new DistributionPlanServiceImpl();

		ResultMessage message = new ResultMessage();

		DistributionPlan DistributionPlan = getModel(DistributionPlan.class);
		List<PlanItem> items = new ArrayList<PlanItem>();

		Long[] itemids = getParaValuesToLong("planItem.itemid");
		Long[] itemnumbers = getParaValuesToLong("planItem.itemnumber");

		try {
			for (int i = 0; i < itemids.length; i++) {
				PlanItem item = new PlanItem();
				item.setItemid(itemids[i]);
				item.setItemnumber(itemnumbers[i]);
				items.add(item);
			}
			boolean res = distributionPlanService.update(DistributionPlan, items);
			if (res) {
				message.setResultMsg("操作成功！");
			} else {
				throw new Exception("操做失败！");
			}
		} catch (Exception e) {
			message.setResultCode(-1);
			message.setResultMsg("操做失败！");
			log.error(e.getMessage());
		} finally {
			renderJson(message);
		}
	}

	public void del() {
		String strDistributionPlanid = getPara("planid");
		distributionPlanService = new DistributionPlanServiceImpl();

		ResultMessage message = new ResultMessage();
		try {
			boolean res = distributionPlanService.del(strDistributionPlanid);
			if (res) {
				message.setResultMsg("操作成功！");
			} else {
				throw new Exception("操做失败！");
			}
		} catch (Exception e) {
			message.setResultCode(-1);
			message.setResultMsg("操做失败！");
			log.error(e.getMessage());
		} finally {
			renderJson(message);
		}
	}

}
