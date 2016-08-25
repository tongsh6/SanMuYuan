<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>管理页面</title>
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
<link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">
<script src="lib/jquery-1.11.1.min.js" type="text/javascript"></script>

<script src="lib/jQuery-Knob/js/jquery.knob.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {
		$(".knob").knob();
	});
</script>


<link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
<link rel="stylesheet" type="text/css" href="stylesheets/premium.css">
</head>
<body class="theme-blue">
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

th {
	text-align: center;
}

.Table-Cell {
	display: table-cell;
	vertical-align: middle;
}

.Center-Block {
	width: 90%;
	margin: 0 auto;
}

.shade {
	position: absolute;
	z-index: 1003;
	width: 20%;
	height: 15%;
	text-align: center;
	background-color: #6A7281;
	display: table;
}

.shade-edit {
	position: absolute;
	z-index: 1003;
	width: 25%;
	height: 45%;
/* 	text-align: left; */
	background-color: #DBE5F1;
	display: table;
}

.mask {
	position: absolute;
	top: 0px;
	filter: alpha(opacity = 60);
	background-color: #777;
	z-index: 1002;
	left: 0px;
	opacity: 0.5;
	-moz-opacity: 0.5;
}
</style>
	<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

	<!-- Le fav and touch icons -->
	<link rel="shortcut icon" href="assets/ico/favicon.ico">

		<!--[if lt IE 7 ]> <body class="ie ie6"> <![endif]-->
		<!--[if IE 7 ]> <body class="ie ie7 "> <![endif]-->
		<!--[if IE 8 ]> <body class="ie ie8 "> <![endif]-->
		<!--[if IE 9 ]> <body class="ie ie9 "> <![endif]-->
		<!--[if (gt IE 9)|!(IE)]><!-->

		<!--<![endif]-->
		
	<div id="mask" class="mask"></div>
	<div class="navbar navbar-default" role="navigation" >
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="" href="index.html"><span class="navbar-brand">三亩园</span></a>
		</div>

		<div class="navbar-collapse collapse" style="height: 1px;">
			<ul id="main-menu" class="nav navbar-nav navbar-right">
				<li class="dropdown hidden-xs"><a href="#"
					class="dropdown-toggle" data-toggle="dropdown"> <span
						class="glyphicon glyphicon-user padding-right-small"
						style="position: relative; top: 3px;"></span>${ sessionScope.user.uname}<i
						class="fa fa-caret-down"></i>
				</a>
					<ul class="dropdown-menu">
						<li><a href="sysuser/logout">注销</a></li>
					</ul></li>
			</ul>
		</div>
		
	</div>
	<div class="sidebar-nav">
		<ul id="menutreeul" style="text-align: center;">
		</ul>
	</div>

	<div class="content">
		<div class="main-content">
			<div class="row">
				<div class="col-sm-12 col-md-12">
					<div id="mainpanel" class="panel panel-default">
						<H1 align="center">欢迎使用</H1>
					</div>
				</div>
			</div>
		</div>
		<a href="#" style="float: right; line-height: 1.25em; display: inline-block; padding: .75em 0em;"><i class="fa fa-arrow-circle-up"></i>回到顶部</a>
	</div>
	<div id="shade" class="shade">
		<div class="Table-Cell">
			<div class="Center-Block">
				正在操作，请稍后...<IMG alt="" src="images/loading-icons/loading1.gif" />
			</div>
		</div>
	</div>
	<div id="capion" class="shade">
		<div class="Table-Cell">
			<div id="capionmsg" class="Center-Block"></div>
		</div>
	</div>
	<div id="editdiv" class="shade-edit">
		<div class="Table-Cell">
			<div id="editinfo" class="Center-Block">
			</div>
		</div>
	</div>
	<DIV id="cfm">
	
	</DIV>
	<script src="lib/bootstrap/js/bootstrap.js"></script>
	<script src="js/selectmenu.js"></script>
	<script type="text/javascript">
		$("[rel=tooltip]").tooltip();
		$(function() {
			$('.demo-cancel-click').click(function() {
				return false;
			});
			$("#capion").click(function(e) {
				$(this).show();
				e.stopPropagation();
			});
			$(document).click(function(event) {
				$("#capionmsg").text("");
				$("#capion").hide();
			});

			hideCapion();
			$("#capionmsg").text("");
			$("#capion").hide();
			$("#editdiv").hide();
		});
		$(function() {
			$.ajax({
				type : "get",
				url : "menu",
				success : function(result) {
					if (result != null && result.length > 0) {
						var lihtml = "";
						for (i = 0; i < result.length; i++) {
							lihtml += "<li><a href='javascript:void(0);' onclick='selectMenu(" + result[i].menucode + ")' id='menu_"+result[i].menucode+"' class='nav-header'>" + result[i].menuname + "</a></li>"
						}
						$("#menutreeul").html(lihtml);

						var uls = $('.sidebar-nav > ul > *').clone();
						uls.addClass('visible-xs');
						$('#main-menu').append(uls.clone());
					} else {
						alert("加载菜单失败！");
					}
				}
			})
		});
	</script>

</body>
</html>