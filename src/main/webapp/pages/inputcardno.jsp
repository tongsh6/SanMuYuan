<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>输入卡号</title>
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" type="text/css" href="../lib/bootstrap/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="../stylesheets/theme.css">
<script src="../lib/jquery-1.11.1.min.js" type="text/javascript"></script>
<style type="text/css">
.navbar-default .navbar-brand, .navbar-default .navbar-brand:hover {
	color: #fff;
}
</style>
</head>
<body class=" theme-blue">
	<div class="navbar navbar-default" role="navigation">
		<div class="navbar-header">
			<div class="navbar-brand">三亩园</div>
		</div>
	</div>
	<%
		String openid = (String) request.getAttribute("openid");
	%>
	<div class="dialog">
		<div class="panel panel-default">
			<div class="panel-body">
				<form method="post" action="receive">
					<div class="form-group">
						<label>卡号</label> <input type="text" name="cardno" class="form-control span12"> <input type="hidden" name="openid" value="<%=openid%>">
					</div>
					<button class="btn btn-primary pull-right">领取</button>
				</form>
			</div>
		</div>
	</div>
	<script src="../lib/bootstrap/js/bootstrap.js"></script>
</body>
</html>