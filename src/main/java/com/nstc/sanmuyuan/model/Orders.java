package com.nstc.sanmuyuan.model;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.ActiveRecordException;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Page;
import com.nstc.sanmuyuan.model.base.BaseOrders;

/**
 * Generated by JFinal.
 */
@SuppressWarnings("serial")
public class Orders extends BaseOrders<Orders> {
	public static final Orders dao = new Orders();

	public List<Orders> list() {
		StringBuffer sql = new StringBuffer();
		sql.append("select orderid,ifnull(wu.id,'卡号：'||o.openid)id,productid, FORMAT(o.price,2)price,ifnull(o.remark,'')remark");
		sql.append(" from ORDERS o");
		sql.append(" left join WEIXIN_USER wu on wu.openid=o.openid");
		sql.append(" ORDER by o.orderid desc");
		return find(sql.toString());
	}

	public Orders info(String strOrderid) {
		StringBuffer sql = new StringBuffer();
		sql.append("select orderid,o.openid,ifnull(wu.nickname,'')nickname,ifnull(wu.id,'卡号：'||o.openid)id,o.productid,p.productname, FORMAT(o.price,2)price,ifnull(o.remark,'')remark");
		sql.append(" from ORDERS o");
		sql.append(" left join WEIXIN_USER wu on wu.openid=o.openid");
		sql.append(" left join product p on o.productid=p.productid");
		sql.append(" where o.orderid = ? ");
		return findFirst(sql.toString(), strOrderid);
	}

	public boolean del(String strOrderid) throws Exception {
		try {
			return Db.tx(new IAtom() {

				@Override
				public boolean run() throws SQLException {
					boolean reslut = false;

					reslut = deleteById(strOrderid);
					if (reslut) {
						Db.update("delete from DISTRIBUTION_PLAN where orderid = ?", strOrderid);
					}
					return reslut;
				}
			});
		} catch (ActiveRecordException e) {
			throw new Exception(e);
		}
	}

	public Page<Orders> paginate(Map<String, String> params, int pageNumber, int pageSize) {
		String select = "select orderid,ifnull(wu.id,'卡号：'||o.openid)id,productid, FORMAT(o.price,2)price,ifnull(o.remark,'')remark";

		String sqlExceptSelect = " from ORDERS o left join WEIXIN_USER wu on wu.openid=o.openid";
		sqlExceptSelect += " where 1=1 ";
		if (params != null && params.size() > 0) {
			if (params.get("orderid") != null && !params.get("orderid").equals("")) {
				sqlExceptSelect += " and orderid like '%" + params.get("orderid") + "%'";
			}
			if (params.get("remark") != null && !params.get("remark").equals("")) {
				sqlExceptSelect += " and o.remark like '%" + params.get("remark") + "%'";
			}
			if (params.get("nickname") != null && !params.get("nickname").equals("")) {
				sqlExceptSelect += " and wu.nickname like '%" + params.get("nickname") + "%'";
			}

		}
		sqlExceptSelect += " ORDER by o.orderid ";

		return paginate(pageNumber, pageSize, select, sqlExceptSelect);
	}

	public List<Orders> query(Map<String, String> params) {
		StringBuffer sql = new StringBuffer();
		sql.append("select orders.orderid,ifnull(wu.id,'卡号：'||orders.openid) weixinid,ifnull(wu.nickname,'')nickname,orders.productid,p.productname,FORMAT(orders.price,2)price,p.cycle,d.detail,dp.adetail,");
		sql.append("	DATE_FORMAT(datet.nextdate,'%Y-%m-%d')nextdate,");
		sql.append("	(case when sdatet.plinum=0 then '未开始配送' when sdatet.plinum>0 and sdatet.plinum<sdatet.pinum then '部分已配送'");
		sql.append("	 when sdatet.plinum>=sdatet.pinum  then '全部已配送' end )state");
		sql.append(" from orders orders left join product p on orders.productid = p.productid ");
		sql.append("	left join weixin_user wu on orders.openid = wu.openid");
		sql.append("	left join(select pi.productid, group_concat((c.cname || ' ' || pi.itemnumber)");
		sql.append("			order by pi.cid separator '  ') as detail");
		sql.append("				from PRODUCT_ITEM pi left join COMMODITIES c on c.cid = pi.cid");
		sql.append("				group by pi.productid ) d on p.productid = d.productid");
		sql.append("	left join(select z.orderid, group_concat(");
		sql.append("				(z.cname || ' ' || z.bNum) ORDER BY z.cname  separator '  ') as adetail");
		sql.append("				from (select o.orderid,c.cname,");
		sql.append("							(pi.itemnumber - ifnull(pli.aNum,0)) bNum");
		sql.append("						from orders o");
		sql.append("						left join product_item pi on o.productid = pi.productid");
		sql.append("						left join(select dp.orderid, pi.cid, sum( pi.itemnumber ) aNum");
		sql.append("								from distribution_plan dp ");
		sql.append("								left join plan_item pi on dp.planid = pi.planid");
		sql.append("								where dp.planstate = '2' group by dp.orderid, pi.cid");
		sql.append("							) pli on o.orderid = pli.orderid and pi.cid = pli.cid");
		sql.append("						left join commodities c on pi.cid = c.cid");
		sql.append("						order by o.orderid, c.cid ) z group by z.orderid");
		sql.append("			) dp on orders.orderid = dp.orderid");
		sql.append("	 left join (select od.orderid,");
		sql.append("					 (case p.cycle when '周' then  date_add(ifnull(max(dp.plandate),od.createdate), interval 1 week)");
		sql.append("					 	when '月' then date_add(ifnull(max(dp.plandate),od.createdate), interval 1 month)");
		sql.append("					 	when '年' then date_add(ifnull(max(dp.plandate),od.createdate), interval 1 year) end )nextdate	");
		sql.append("					 from orders od");
		sql.append("					 left join distribution_plan dp on od.orderid=dp.orderid and dp.planstate='2'");
		sql.append("					 left join product p on p.productid = od.productid");
		sql.append("					 group by od.orderid) datet on orders.orderid=datet.orderid");
		sql.append("	 left join (select o.orderid,sum(pi.itemnumber)pinum,sum(ifnull(pli.aNum,0))plinum");
		sql.append("					from orders o ");
		sql.append("					left join product_item pi on o.productid = pi.productid");
		sql.append("					left join(select dp.orderid, pi.cid, sum( pi.itemnumber ) aNum");
		sql.append("							from distribution_plan dp ");
		sql.append("							left join plan_item pi on dp.planid = pi.planid");
		sql.append("							where dp.planstate = '2'");
		sql.append("							group by dp.orderid, pi.cid");
		sql.append("						) pli on o.orderid = pli.orderid and pi.cid = pli.cid ");
		sql.append("					left join commodities c on pi.cid = c.cid");
		sql.append("					group by o.orderid) sdatet on orders.orderid=sdatet.orderid");
		if (params != null && params.size() > 0) {
			sql.append(" where 1=1 ");
			if (params.get("begdate") != null && !params.get("begdate").equals("")) {
				sql.append(" and DATE_FORMAT(orders.createdate,'%Y-%m-%d') >='" + params.get("begdate") + "'");
			}
			if (params.get("enddate") != null && !params.get("enddate").equals("")) {
				sql.append(" and DATE_FORMAT(orders.createdate,'%Y-%m-%d') <='" + params.get("enddate") + "'");
			}
			if (params.get("orderid") != null && !params.get("orderid").equals("")) {
				sql.append(" and cast(orders.orderid as char)  like '" + params.get("orderid") + "%'");
			}
			if (params.get("productid") != null && !params.get("productid").equals("")) {
				sql.append(" and  cast(orders.productid as char) like '" + params.get("productid") + "%'");
			}
			if (params.get("weixinuserid") != null && !params.get("weixinuserid").equals("")) {
				sql.append(" and  cast(wu.id as char) like '" + params.get("weixinuserid") + "%'");
			}
			if (params.get("openid") != null && !params.get("openid").equals("")) {
				sql.append(" and  wu.openid = '" + params.get("openid") + "'");
			}
			if (params.get("cardno") != null && !params.get("cardno").equals("")) {
				sql.append(" and  wu.openid = '卡号：" + params.get("cardno") + "'");
			}
		}
		sql.append(" order by orders.orderid");
		return find(sql.toString());
	}

	public boolean receive(String cardno, String openid) {
		int ret = Db.update("update orders set openid=? where openid=?", openid, cardno);

		return ret > 0 ? true : false;
	}

}
