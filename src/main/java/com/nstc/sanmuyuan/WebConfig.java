package com.nstc.sanmuyuan;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;
import com.nstc.sanmuyuan.Interceptor.AuthInterceptor;
import com.nstc.sanmuyuan.controller.MainController;
import com.nstc.sanmuyuan.controller.MenuController;
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
	}

	public static C3p0Plugin createC3p0Plugin() {
		return new C3p0Plugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim(),PropKit.get("driverClass").trim());
	}

	@Override
	public void configPlugin(Plugins me) {
		C3p0Plugin C3p0Plugin = createC3p0Plugin();
		me.add(C3p0Plugin);

		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin(C3p0Plugin);
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
		// TODO Auto-generated method stub

	}

}
