package com.nstc.sanmuyuan.model;

import com.jfinal.plugin.activerecord.ActiveRecordPlugin;

/**
 * Generated by JFinal, do not modify this file.
 * <pre>
 * Example:
 * public void configPlugin(Plugins me) {
 *     ActiveRecordPlugin arp = new ActiveRecordPlugin(...);
 *     _MappingKit.mapping(arp);
 *     me.add(arp);
 * }
 * </pre>
 */
public class _MappingKit {

	public static void mapping(ActiveRecordPlugin arp) {
		arp.addMapping("commodities", "cid", Commodities.class);
		arp.addMapping("distribution_plan", "planid", DistributionPlan.class);
		arp.addMapping("menu_tree", "menuid", MenuTree.class);
		arp.addMapping("orders", "orderid", Orders.class);
		arp.addMapping("plan_item", "itemid", PlanItem.class);
		arp.addMapping("product", "productid", Product.class);
		arp.addMapping("product_item", "itemid", ProductItem.class);
		arp.addMapping("sys_user", "userid", SysUser.class);
		arp.addMapping("tmessage", "msgid", Tmessage.class);
		arp.addMapping("weixin_user", "openid", WeixinUser.class);
	}
}

