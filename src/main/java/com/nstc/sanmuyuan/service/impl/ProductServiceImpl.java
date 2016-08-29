package com.nstc.sanmuyuan.service.impl;

import java.util.List;

import com.nstc.sanmuyuan.model.Product;
import com.nstc.sanmuyuan.model.ProductItem;
import com.nstc.sanmuyuan.service.ProductService;

public class ProductServiceImpl implements ProductService {

	@Override
	public List<Product> list() {
		return Product.dao.list();
	}

	@Override
	public Product info(String strProductid) {
		return Product.dao.info(strProductid);
	}

	@Override
	public boolean update(Product product, List<ProductItem> items) throws Exception {
		return product.update(product, items);
	}

	@Override
	public boolean save(Product product, List<ProductItem> items) throws Exception {
		return product.save(product, items);
	}

	@Override
	public boolean del(String strProductid) throws Exception {
		return Product.dao.del(strProductid);
	}

}
