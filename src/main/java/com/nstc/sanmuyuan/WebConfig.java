package com.nstc.sanmuyuan;

import com.alibaba.druid.filter.stat.StatFilter;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.plugin.druid.DruidStatViewHandler;
import com.jfinal.render.ViewType;
import com.nstc.sanmuyuan.Interceptor.AuthInterceptor;
import com.nstc.sanmuyuan.controller.CommoditiesController;
import com.nstc.sanmuyuan.controller.MainController;
import com.nstc.sanmuyuan.controller.MenuController;
import com.nstc.sanmuyuan.controller.ProductController;
import com.nstc.sanmuyuan.controller.SysUserController;
import com.nstc.sanmuyuan.controller.WeixinController;
import com.nstc.sanmuyuan.model._MappingKit;

public class WebConfig extends JFinalConfig {

	@Override
	public void configConstant(Constants me) {
		PropKit.use("webconfig.txt");
		me.setDevMode(true);
		me.setViewType(ViewType.JSP);
	}

	@Override
	public void configRoute(Routes me) {
		me.add("/", MainController.class, "/pages");
		me.add("/sysuser", SysUserController.class, "/pages");
		me.add("/menu", MenuController.class);
		me.add("/weixin", WeixinController.class);
		me.add("/product", ProductController.class);
		me.add("/commodities", CommoditiesController.class);
	}

	public static DruidPlugin createDruidPlugin() {
		return new DruidPlugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim(), PropKit.get("driverClass").trim());
	}

	@Override
	public void configPlugin(Plugins me) {
		DruidPlugin druidPlugin = createDruidPlugin();
		druidPlugin.addFilter(new StatFilter());
		me.add(druidPlugin);

		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin(druidPlugin);
		me.add(arp);
		// 所有配置在 MappingKit 中搞定
		_MappingKit.mapping(arp);
	}

	@Override
	public void configInterceptor(Interceptors me) {
		me.add(new AuthInterceptor());

	}

	@Override
	public void configHandler(Handlers me) {
		DruidStatViewHandler dvh = new DruidStatViewHandler("/druid");
		me.add(dvh);
	}

}
