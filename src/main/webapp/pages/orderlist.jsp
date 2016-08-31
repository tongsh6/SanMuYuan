<%@page import="com.nstc.sanmuyuan.model.Orders"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.util.*"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>订单页面</title>
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">

<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' -->
<!-- 	rel='stylesheet' type='text/css'> -->
<link rel="stylesheet" type="text/css"
	href="../lib/bootstrap/css/bootstrap.css">
<link rel="stylesheet" href="../lib/font-awesome/css/font-awesome.css">
<link rel="stylesheet" type="text/css" href="../stylesheets/theme.css">
<link rel="stylesheet" type="text/css" href="../stylesheets/premium.css">

<script src="../lib/jquery-1.11.1.min.js" type="text/javascript"></script>
<style type="text/css">
.navbar-default .navbar-brand, .navbar-default .navbar-brand:hover {
	color: #fff;
}
</style>
</head>
<body class=" theme-blue">
	<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

	<!--[if lt IE 7 ]> <body class="ie ie6"> <![endif]-->
	<!--[if IE 7 ]> <body class="ie ie7 "> <![endif]-->
	<!--[if IE 8 ]> <body class="ie ie8 "> <![endif]-->
	<!--[if IE 9 ]> <body class="ie ie9 "> <![endif]-->
	<!--[if (gt IE 9)|!(IE)]><!-->

	<!--<![endif]-->
	<div class="navbar navbar-default" role="navigation">
		<div class="navbar-header">
			<div class="navbar-brand">三亩园</div>
		</div>
	</div>
	<div id="orderlistdiv">
		<%
			List<Orders> orderlist = (List<Orders>) request.getAttribute("orderlist");
			if (orderlist == null || orderlist.size() <= 0) {
		%>
		<h4>您还未产生订单。</h4>
		<%
			} else {
				for (int i = 0; i < orderlist.size(); i++) {
					Orders orders = orderlist.get(i);
		%>
		<div class="list-group">
			<a href="#" class="list-group-item active">
				<h4 class="list-group-item-heading">
					订单编号<%=orders.get("orderid")%>(<%=orders.get("productname")%>)
				</h4>
			</a> <a href="#" class="list-group-item">
				<p class="list-group-item-text">
					价格：<%=orders.get("price")%>&nbsp;&nbsp;&nbsp;&nbsp;<%=orders.get("detail")%>&nbsp;&nbsp;&nbsp;&nbsp;<br />
					剩余未送：<%=orders.get("adetail")%>&nbsp;&nbsp;&nbsp;&nbsp;下次配送时间：<%=orders.get("nextdate")%>
				</p>
			</a>
		</div>
		<%
			}
			}
		%>
	</div>
	<script src="../lib/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript">
		$(function() {

			$("table tr:nth-child(even)").addClass("even");
		});
	</script>
</body>
</html>