package com.nstc.sanmuyuan.controller;

import java.util.ArrayList;
import java.util.List;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.log.Log;
import com.nstc.sanmuyuan.message.ResultMessage;
import com.nstc.sanmuyuan.model.Product;
import com.nstc.sanmuyuan.model.ProductItem;
import com.nstc.sanmuyuan.model.WeixinUser;
import com.nstc.sanmuyuan.service.ProductService;
import com.nstc.sanmuyuan.service.impl.ProductServiceImpl;
import com.nstc.sanmuyuan.validator.ProductValidator;

public class ProductController extends Controller {

	private static final Log log = Log.getLog(ProductController.class);
	ProductService productService;

	public void list() {
		productService = new ProductServiceImpl();
		List<Product> products = productService.list();
		renderJson(products);
	}

	public void info() {
		String strProductid = getPara("productid");

		productService = new ProductServiceImpl();

		Product product = productService.info(strProductid);

		renderJson(product);
	}

	@Before(ProductValidator.class)
	public void save() {
		productService = new ProductServiceImpl();

		ResultMessage message = new ResultMessage();

		Product product = getModel(Product.class);
		List<ProductItem> items = new ArrayList<ProductItem>();

		Long[] cids = getParaValuesToLong("productItem.cid");
		Long[] itemnumbers = getParaValuesToLong("productItem.itemnumber");
		for (int i = 0; i < cids.length; i++) {
			ProductItem item = new ProductItem();
			item.setCid(cids[i]);
			item.setItemnumber(itemnumbers[i]);
			items.add(item);
		}

		try {
			productService.save(product, items);
			message.setResultMsg("操作成功！");
		} catch (Exception e) {
			message.setResultCode(-1);
			message.setResultMsg("操做失败！");
			log.error(e.getMessage());
		} finally {
			renderJson(message);
		}
	}

	@Before(ProductValidator.class)
	public void update() {
		productService = new ProductServiceImpl();

		ResultMessage message = new ResultMessage();

		Product product = getModel(Product.class);
		List<ProductItem> items = new ArrayList<ProductItem>();

		Long[] itemids = getParaValuesToLong("productItem.itemid");
		Long[] itemnumbers = getParaValuesToLong("productItem.itemnumber");

		try {
			for (int i = 0; i < itemids.length; i++) {
				ProductItem item = new ProductItem();
				item.setItemid(itemids[i]);
				item.setItemnumber(itemnumbers[i]);
				items.add(item);
			}
			productService.update(product, items);
			message.setResultMsg("操作成功！");
		} catch (Exception e) {
			message.setResultCode(-1);
			message.setResultMsg("操做失败！");
			log.error(e.getMessage());
		} finally {
			renderJson(message);
		}
	}

	public void del() {
		String strProductid = getPara("productid");
		productService = new ProductServiceImpl();

		ResultMessage message = new ResultMessage();
		try {
			productService.del(strProductid);
			message.setResultMsg("操作成功！");
		} catch (Exception e) {
			message.setResultCode(-1);
			message.setResultMsg("操做失败！");
			log.error(e.getMessage());
		} finally {
			renderJson(message);
		}
	}

	public void page() {
		renderJson("productpage", Product.dao.paginate(getParaToInt(0, 1), 6));
	}
}
