/**
 * 
 */
(function($) {
	$.extend({
		FloatConfirm : function(options) { // 定义一个函数名
			var options = $.extend({ // data初始化
				width : "300",
				height : "200",
				id : "FloatConfirm",
				closeBtn : true,
				title : '',
				text : "default text",
				holdTime : 0,
				opacity : 0.75,
				contentClass : 'contentClass'
			}, options);
			var $box, $bg, $title, $boxBody, $textContent, $text, $iconType, $close;
			var timer;
			if ($('body').find('#' + options.id).length) { // 只创建一次
				return;
			} else {
				InitDom(); // dom初始化
				Show();
			}
			function InitDom() {
				$box = $('#' + options.id);
				if ($box.length < 1) {
					$box = $('<div id="' + options.id + '" class="' + options.id + '">');
					$box.appendTo($('body'));
				}
				;
				$bg = $("div.bg", $box);
				if ($bg.length < 1) {
					$bg = $('<div class="bg"></div>');
					$bg.appendTo($box);
				}
				;
				if ($boxBody, $box) {
					$boxBody = $('<div class="boxBody"></div>');
					$boxBody.appendTo($box);
				}
				;
				if (options.title) {
					$title = $('<div class="title"></div>');
					$title.appendTo($boxBody);
					$title.html(options.title);
				}
				;
				// if (options.type) {
				// if (options.type == "success") {
				// $iconType = $('<span class="iconType"></span>')
				// $iconType.appendTo($boxBody);
				// $box.addClass('success');
				// } else if (options.type == 'error') {
				// $iconType = $('<span class="iconType"></span>')
				// $iconType.appendTo($boxBody);
				// $box.addClass('error');
				// }
				// }
				// ;
				if (options.closeBtn) {
					$close = $('<a href="" class="closeBtn">X</a>');
					if ($title && $title.length) {
						$close.appendTo($title);
					} else {
						$close.appendTo($boxBody);
					}
					$close.click(function(e) {
						e.preventDefault();
						Hide();
					})
				}
				;
				if (options.text) {
					$textContent = $('<div class="text"></div>');
					$textContent.appendTo($boxBody);
					$textContent.html(options.text);
				}
				;
				if (options.width) {
					$box.css('width', options.width);
				}
				if (options.height) {
					$box.css('height', options.height);
				}
				if (options.opacity) {
					$bg.fadeTo(0, 0.2);
					$box.fadeTo(100, options.opacity)
				} else {
					$bg.fadeTo(0, 0.2);
				}
				;
				$(window).resize(function() {
					InitPosition();
				});
				$box.hover(function() {
					if (options.holdTime) {
						clearTimeout(timer);
						$box.fadeTo(100, 1)
					} else {
						$box.fadeTo(100, 1)
					}
				}, function() {
					if (options.holdTime) {
						timer = setTimeout(Hide, options.holdTime);
						$box.fadeTo(1, options.opacity);
					} else {
						$box.fadeTo(1, options.opacity);
					}

				});
			}
			function InitPosition() {
				var width = $box.width();
				var height = $box.height();
				var winW = $(window).width();
				var winH = $(window).height();
				$box.css({
					left : (winW - width) / 2 + 'px',
					top : '-' + options.height
				})
			}
			;
			function Show() {
				InitPosition();
				$box.show();
				$box.animate({
					top : ($(window).height() - options.height) / 2
				}, 500);
				if (options.holdTime) {
					timer = setTimeout(Hide, options.holdTime);
				}
			}
			;
			function Hide() {
				if (options.holdTime) {
					clearTimeout(timer)
				}
				$box.stop(true, true).animate({
					'top' : -options.height
				}, 500, '', function() {
					$(this).remove();
				});
			}
		}
	});
})(jQuery)
