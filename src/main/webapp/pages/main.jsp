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
<link rel="stylesheet" type="text/css"
	href="lib/bootstrap/css/bootstrap.css">
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
					</ul>
				</li>
			</ul>

		</div>
	</div>


	<div class="sidebar-nav">
		<ul>
			<li><a href="#" data-target=".dashboard-menu" class="nav-header"
				data-toggle="collapse"><i class="fa fa-fw fa-dashboard"></i>
					Dashboard<i class="fa fa-collapse"></i></a></li>
			<li><ul class="dashboard-menu nav nav-list collapse in">
					<li><a href="index.html"><span class="fa fa-caret-right"></span>
							Main</a></li>
					<li><a href="users.html"><span class="fa fa-caret-right"></span>
							User List</a></li>
					<li><a href="user.html"><span class="fa fa-caret-right"></span>
							User Profile</a></li>
					<li><a href="media.html"><span class="fa fa-caret-right"></span>
							Media</a></li>
					<li><a href="calendar.html"><span
							class="fa fa-caret-right"></span> Calendar</a></li>
				</ul></li>

			<li data-popover="true"
				data-content="Items in this group require a <strong><a href='http://portnine.com/bootstrap-themes/aircraft' target='blank'>premium license</a><strong>."
				rel="popover" data-placement="right"><a href="#"
				data-target=".premium-menu" class="nav-header collapsed"
				data-toggle="collapse"><i class="fa fa-fw fa-fighter-jet"></i>
					Premium Features<i class="fa fa-collapse"></i></a></li>
			<li><ul class="premium-menu nav nav-list collapse">
					<li class="visible-xs visible-sm"><a href="#">- Premium
							features require a license -</a></span>
					<li><a href="premium-profile.html"><span
							class="fa fa-caret-right"></span> Enhanced Profile</a></li>
					<li><a href="premium-blog.html"><span
							class="fa fa-caret-right"></span> Blog</a></li>
					<li><a href="premium-blog-item.html"><span
							class="fa fa-caret-right"></span> Blog Page</a></li>
					<li><a href="premium-pricing-tables.html"><span
							class="fa fa-caret-right"></span> Pricing Tables</a></li>
					<li><a href="premium-upgrade-account.html"><span
							class="fa fa-caret-right"></span> Upgrade Account</a></li>
					<li><a href="premium-widgets.html"><span
							class="fa fa-caret-right"></span> Widgets</a></li>
					<li><a href="premium-timeline.html"><span
							class="fa fa-caret-right"></span> Activity Timeline</a></li>
					<li><a href="premium-users.html"><span
							class="fa fa-caret-right"></span> Enhanced Users List</a></li>
					<li><a href="premium-media.html"><span
							class="fa fa-caret-right"></span> Enhanced Media</a></li>
					<li><a href="premium-invoice.html"><span
							class="fa fa-caret-right"></span> Invoice</a></li>
					<li><a href="premium-build.html"><span
							class="fa fa-caret-right"></span> Advanced Tools</a></li>
					<li><a href="premium-colors.html"><span
							class="fa fa-caret-right"></span> Additional Color Themes</a></li>
				</ul></li>

			<li><a href="#" data-target=".accounts-menu"
				class="nav-header collapsed" data-toggle="collapse"><i
					class="fa fa-fw fa-briefcase"></i> Account <span
					class="label label-info">+3</span></a></li>
			<li><ul class="accounts-menu nav nav-list collapse">
					<li><a href="sign-in.html"><span class="fa fa-caret-right"></span>
							Sign In</a></li>
					<li><a href="sign-up.html"><span class="fa fa-caret-right"></span>
							Sign Up</a></li>
					<li><a href="reset-password.html"><span
							class="fa fa-caret-right"></span> Reset Password</a></li>
				</ul></li>

			<li><a href="#" data-target=".legal-menu"
				class="nav-header collapsed" data-toggle="collapse"><i
					class="fa fa-fw fa-legal"></i> Legal<i class="fa fa-collapse"></i></a></li>
			<li><ul class="legal-menu nav nav-list collapse">
					<li><a href="privacy-policy.html"><span
							class="fa fa-caret-right"></span> Privacy Policy</a></li>
					<li><a href="terms-and-conditions.html"><span
							class="fa fa-caret-right"></span> Terms and Conditions</a></li>
				</ul></li>

			<li><a href="help.html" class="nav-header"><i
					class="fa fa-fw fa-question-circle"></i> Help</a></li>
			<li><a href="faq.html" class="nav-header"><i
					class="fa fa-fw fa-comment"></i> Faq</a></li>
			<li><a href="http://portnine.com/bootstrap-themes/aircraft"
				class="nav-header" target="blank"><i class="fa fa-fw fa-heart"></i>
					Get Premium</a></li>
		</ul>
	</div>

	<div class="content">
		<div class="main-content">
			
		</div>
	</div>


	<script src="lib/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript">
		$("[rel=tooltip]").tooltip();
		$(function() {
			$('.demo-cancel-click').click(function() {
				return false;
			});
		});
	</script>

</body>
</html>