<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录页面</title>
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">

<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' -->
<!-- 	rel='stylesheet' type='text/css'> -->
<link rel="stylesheet" type="text/css"
	href="lib/bootstrap/css/bootstrap.css">
<link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">
<link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
<link rel="stylesheet" type="text/css" href="stylesheets/premium.css">

<script src="lib/jquery-1.11.1.min.js" type="text/javascript"></script>
</head>
<body class=" theme-blue">

	<!-- Demo page code -->

	<script type="text/javascript">
		$(function() {
			var match = document.cookie.match(new RegExp('color=([^;]+)'));
			if (match)
				var color = match[1];
			if (color) {
				$('body').removeClass(function(index, css) {
					return (css.match(/\btheme-\S+/g) || []).join(' ')
				})
				$('body').addClass('theme-' + color);
			}

			$('[data-popover="true"]').popover({
				html : true
			});

		});
	</script>
	<style type="text/css">
#line-chart {
	height: 300px;
	width: 800px;
	margin: 0px auto;
	margin-top: 1em;
}

.navbar-default .navbar-brand, .navbar-default .navbar-brand:hover {
	color: #fff;
}
</style>

	<script type="text/javascript">
		$(function() {
			var uls = $('.sidebar-nav > ul > *').clone();
			uls.addClass('visible-xs');
			$('#main-menu').append(uls.clone());
		});
	</script>

	<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

	<!-- Le fav and touch icons -->
	<link rel="shortcut icon" href="../assets/ico/favicon.ico">
	<link rel="apple-touch-icon-precomposed" sizes="144x144"
		href="../assets/ico/apple-touch-icon-144-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114"
		href="../assets/ico/apple-touch-icon-114-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72"
		href="../assets/ico/apple-touch-icon-72-precomposed.png">
	<link rel="apple-touch-icon-precomposed"
		href="../assets/ico/apple-touch-icon-57-precomposed.png">


	<!--[if lt IE 7 ]> <body class="ie ie6"> <![endif]-->
	<!--[if IE 7 ]> <body class="ie ie7 "> <![endif]-->
	<!--[if IE 8 ]> <body class="ie ie8 "> <![endif]-->
	<!--[if IE 9 ]> <body class="ie ie9 "> <![endif]-->
	<!--[if (gt IE 9)|!(IE)]><!-->

	<!--<![endif]-->

	<div class="navbar navbar-default" role="navigation">
		<div class="navbar-header">
			<a class="" href="main"><span class="navbar-brand">三亩园</span></a>
		</div>

		<div class="navbar-collapse collapse" style="height: 1px;"></div>
	</div>
	</div>

	<div class="dialog">
		<div class="panel panel-default">
			<div class="panel-body">
				<form method="post" action="sysuser/login" id="loginform">
					<div class="form-group">
						<label>用户名</label> <input type="text" name="sysUser.uno"
							class="form-control span12">${unameMsg}
					</div>
					<div class="form-group">
						<label>密码</label> <input type="password" name="sysUser.pwd"
							class="form-controlspan12 form-control">${pwdMsg}
					</div>
					<input type="button" class="btn btn-primary pull-right" value="登录"
						id="loginbtn" /> <label class="remember-me" id="errorMsg">${loginMsg}</label>
					<div class="clearfix"></div>
				</form>
			</div>
		</div>
	</div>



	<script src="lib/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript">
		$("[rel=tooltip]").tooltip();
		$(function() {
			$('.demo-cancel-click').click(function() {
				return false;
			});

			$("#loginbtn").click(function() {
				var formParam = $("#loginform").serialize();//序列化表格内容为字符串 
				//开始发送数据
				$.ajax({ //请求登录处理页
					type : "Post",
					url : "sysuser/login", //登录处理页
					data : formParam,
					dataType : "html",
					success : function(result) {
						var obj = jQuery.parseJSON(result);
						//根据返回值进行状态显示
						if (obj.result == "fail") {
							$("#errorMsg").html(obj.errorMsg);
						} else if (obj.result == "success") {
							var url = window.location.href;
							url = url.substring(0, url.lastIndexOf("/"));
							window.location.href = url; //如果登录成功则跳到管理界面
						} else {
							alert("未知错误！");
						}
					}
				})
			});
		});
	</script>
</body>
</html>