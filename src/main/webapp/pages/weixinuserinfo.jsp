<%@page import="com.nstc.sanmuyuan.model.WeixinUser"%>
<%@page import="com.nstc.sanmuyuan.model.Orders"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page language="java" import="java.util.*"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>会员信息</title>
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
<link rel="stylesheet" href="../css/Balloon.css">
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
			WeixinUser info = (WeixinUser) request.getAttribute("weixinuserinfo");
		%>
		<div class="panel panel-default">
			<div class="panel-body">
				<form method="post" id="editform" action="mobileUpdate">
					<input type="hidden" name="weixinUser.openid"
						value="<%=info.getOpenid()%>">
					<div class="form-group">
						<label>用户编号</label> <input type="text" name="weixinUser.id"
							value="<%=info.getId()%>" disabled="disabled"
							class="form-control">
					</div>
					<div class="form-group">
						<label>微信昵称</label> <input type="text" name="weixinUser.nickname"
							value="<%=info.getNickname()%>" disabled="disabled"
							class="form-control">
					</div>
					<div class="form-group">
						<label>手机号码</label> <input type="text" name="weixinUser.phoneno"
							value="<%=info.getPhoneno()%>" class="form-control">
					</div>
					<div class="form-group">
						<label>地址</label> <input type="text" name="weixinUser.addressed"
							value="<%=info.getAddressed()%>" class="form-control">
					</div>
					<div class="form-group">
						<label>联系人</label> <input type="text" name="weixinUser.linkname"
							value="<%=info.getLinkname()%>" class="form-control">
					</div>
					<div class="form-group">
						<label>联系人手机</label> <input type="text"
							name="weixinUser.linktelno" value="<%=info.getLinktelno()%>"
							class="form-control">
					</div>
					<div class="form-group">
						<label>备注</label>
						<textarea name="weixinUser.remark" class="form-control"><%=info.getRemark()%></textarea>
					</div>
					<div class="btn-toolbar list-toolbar">
						<button id="weixinUserSaveBtn" class="btn btn-danger"
							style="float: right">保存</button>
						&nbsp;&nbsp;
					</div>
				</form>
			</div>
		</div>
	</div>
	<script src="../lib/bootstrap/js/bootstrap.js"></script>
	<script src="../js/Balloon.js"></script>
	<script type="text/javascript">
		$(function() {

			$("table tr:nth-child(even)").addClass("even");
		});
	</script>
</body>
</html>