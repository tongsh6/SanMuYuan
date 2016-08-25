package com.nstc.sanmuyuan.service;

import java.util.List;

import com.nstc.sanmuyuan.model.Product;
import com.nstc.sanmuyuan.model.ProductItem;

public interface ProductService {
	List<Product> list();

	Product info(String strProductid);

	void save(Product product, List<ProductItem> items) throws Exception;

	void del(String strProductid) throws Exception;

	void update(Product product, List<ProductItem> items) throws Exception;
}
