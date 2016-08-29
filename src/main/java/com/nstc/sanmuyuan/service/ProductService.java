package com.nstc.sanmuyuan.service;

import java.util.List;

import com.nstc.sanmuyuan.model.Product;
import com.nstc.sanmuyuan.model.ProductItem;

public interface ProductService {
	List<Product> list();

	Product info(String strProductid);

	boolean save(Product product, List<ProductItem> items) throws Exception;

	boolean del(String strProductid) throws Exception;

	boolean update(Product product, List<ProductItem> items) throws Exception;
}
