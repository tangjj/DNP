/* Author:

*/

// Function for filtering used by IR section that is being loaded in from IRASIA via <script> tag
function docContent(obj){
	//$('body').addClass('peachy');
	if (obj != "") {
		if(document.getElementById){
			var $curr = $('.tab-content .tab').filter('.inview');
			//var el = document.getElementById("P"+obj);
			var el = $curr.find('#P'+obj);
			//var ar = document.getElementById("divQs").getElementsByTagName("div");
			var ar = $curr.find('#divQs div');
			for (var i=0; i<ar.length; i++){
				if (ar[i].className=="divA")
				ar[i].style.display = "none";
			}
			//el.style.display = "block";
			el.css({'display':'block'});
		}
	}
}

(function ($, F) {
    F.transitions.resizeIn = function() {
        var previous = F.previous,
            current  = F.current,
            startPos = previous.wrap.stop(true).position(),
            endPos   = $.extend({opacity : 1}, current.pos);

        startPos.width  = previous.wrap.width();
        startPos.height = previous.wrap.height();

        previous.wrap.stop(true).trigger('onReset').remove();

        delete endPos.position;

        current.inner.hide();

        current.wrap.css(startPos).animate(endPos, {
            duration : current.nextSpeed,
            easing   : current.nextEasing,
            step     : F.transitions.step,
            complete : function() {
                F._afterZoomIn();

                current.inner.fadeIn("fast");
            }
        });
    };

}(jQuery, jQuery.fancybox));

(function(){

	$(document).ready(function() {
		$('.fancybox').fancybox({
			nextMethod : 'resizeIn',
			padding : [10, 35, 10, 35],
			helpers : {
				title : {
					type : 'inside'
				}
			}
		});
	});

	var propertyImgSwitch = function() {
		var $container = $('#property-dropdown'),
			first= $container.find('.img-container img.1');
		$(first).addClass('z-img');
		$container.find('ul li a').on({
			mouseenter : function() {
				$container.find('img').each(function() {
					$(this).removeClass('z-img');
				});
				var propertyID = $(this).attr('data-link');
				$container.find('.img-container img.'+propertyID).addClass('z-img');
			}
		});
	};
	if ($('#property-dropdown').length) {
		propertyImgSwitch();
	}
	var mainHeroSlider = function() {
		function getMargin(newItems) {
			var center  = newItems.eq(0).outerWidth(true) + (newItems.eq(1).outerWidth(true)/2);
			var minMarg = ($(window).width()/2) - center;

			return minMarg;
		}
		function centerIMG( newItems ) {
			var slideCenter = newItems.find('img').width();
			var imgCenter = ($(window).width() - slideCenter)/2;

			return imgCenter;
		}

		if($('#main-hero .slider div').length < 2) {
			$('#main-hero .slider-controls').hide();
		}
		// Slider functionality
		$("#main-hero .slider").carouFredSel({
			responsive: true,
			height: 300,
			width: '100%',
			items: {
				width: 1400,
				height: '100%',
				visible: {
					min: 1,
					max: 1
				}
			},
			pagination: {
				container: "#main-hero .slider-pagin"
			},
			auto: {
				play: true,
				timeoutDuration: 5000,
				button: '#main-hero .slider-play',
				pauseOnEvent: 'resume'
			},
			scroll: {
				items: 1,
				fx: 'crossfade',
				onBefore: function( data ) {

					data.items.old.removeClass('current');
					data.items['new'].addClass('current');
					data.items.visible.eq(0).addClass('current');

					var offsetW = (data.width  - $('#main-hero').width())/2;
					var offsetH = (data.height - $('#main-hero').height())/2;

					$('#main-hero .slider div img').css({
						'marginLeft': '0px',
						'marginTop': '0px'
					});
					$('#main-hero .slider div.current img').css({
						'marginLeft': -offsetW+'px',
						'marginTop': -offsetH+'px'
					});

					$(window).resize();
				}
			},
			onCreate: function( data ) {

				data.items.addClass('current');

				var offsetW = (data.width - $('#main-hero').width())/2;
				var offsetH = (data.height - $('#main-hero').height())/2;

				$('#main-hero .slider div img').css({
					'marginLeft': '0px',
					'marginTop': '0px'
				});
				$('#main-hero .slider div.current img').css({
					'marginLeft': -offsetW+'px',
					'marginTop': -offsetH+'px'
				});

				$('#main-hero').animate({
					'left': 0
				}, function() {
					$(window).resize();
					$(this).animate({
						'opacity': 1
					});
					if($('html').hasClass('lt-ie7')){
						var heroHeight = $('#main-hero').height();
						$('#main-hero').find('.slider-nav').find('span').css({height: heroHeight});
					}
				});

			},
			swipe: true
		});

		$(window).resize(function() {

			if($('html').hasClass('lt-ie7')){
				var heroHeight = $('#main-hero').height();
				$('#main-hero').find('.slider-nav').find('span').css({height: heroHeight});
			}

			if( $(window).width() < 1800 ) {
				var offset = ($('#main-hero .slider div img').width() - $(window).width())/2;
				$('#main-hero .slider div img').css({
					'marginLeft': '0px'
				});
				$('#main-hero .slider div.current img').css({
					'marginLeft': -offset+'px'
				});
			}
		});

		$('.slider-prev').find('span').on({
			mouseenter: function(){
				$(this).stop().animate({left: 10}, 200);
			},
			mouseleave: function(){
				$(this).stop().animate({left: 0}, 300);
			}
		});

		$('.slider-next').find('span').on({
			mouseenter: function(){
				$(this).stop().animate({left: -10}, 200);
			},
			mouseleave: function(){
				$(this).stop().animate({left: 0}, 300);
			}
		});
	};
	if($('#main-hero .slider').length) {
		mainHeroSlider();
	}

	var subHeroSlider = function() {
		function getMargin(newItems) {
			var center  = newItems.eq(0).outerWidth(true) + (newItems.eq(1).outerWidth(true)/2);
			var minMarg = ($(window).width()/2) - center;

			return minMarg;
		}
		function centerIMG( newItems ) {
			var slideCenter = newItems.find('img').width();
			var imgCenter = ($(window).width() - slideCenter)/2;

			return imgCenter;
		}

		if($('#sub-hero .slider div').length < 2) {
			$('#sub-hero .slider-controls').hide();
		}
		// Slider functionality
		$("#sub-hero .slider").carouFredSel({
			responsive: false,
			height: 360,
			width: 920,
			items: {
				width: 920,
				height: 360,
				visible: {
					min: 1,
					max: 1
				}
			},
			pagination: {
				container: "#sub-hero .slider-pagin"
			},
			auto: {
				play: true,
				timeoutDuration: 5000,
				button: '#sub-hero .slider-play',
				pauseOnEvent: 'resume'
			},
			scroll: {
				items: 1,
				fx: 'crossfade',
				onBefore: function( data ) {

					data.items.old.removeClass('current');
					data.items['new'].addClass('current');
					data.items.visible.eq(0).addClass('current');

					var offsetW = (data.width  - $('#sub-hero').width())/2;
					var offsetH = (data.height - $('#sub-hero').height())/2;

					$('#sub-hero .slider div img').css({
						'marginLeft': '0px',
						'marginTop': '0px'
					});

					//$(window).resize();
				}
			},
			onCreate: function( data ) {

				data.items.addClass('current');

				var offsetW = (data.width - $('#sub-hero').width())/2;
				var offsetH = (data.height - $('#sub-hero').height())/2;

				$('#sub-hero .slider div img').css({
					'marginLeft': '0px',
					'marginTop': '0px'
				});
				

				$('#sub-hero').animate({
					'left': 0
				}, function() {
					$(window).resize();
					$(this).animate({
						'opacity': 1
					});
					if($('html').hasClass('lt-ie7')){
						var heroHeight = $('#sub-hero').height();
						$('#sub-hero').find('.slider-nav').find('span').css({height: heroHeight});
					}
				});

			},
			swipe: true
		});

		$('.slider-prev').find('span').on({
			mouseenter: function(){
				$(this).stop().animate({left: 10}, 200);
			},
			mouseleave: function(){
				$(this).stop().animate({left: 0}, 300);
			}
		});

		$('.slider-next').find('span').on({
			mouseenter: function(){
				$(this).stop().animate({left: -10}, 200);
			},
			mouseleave: function(){
				$(this).stop().animate({left: 0}, 300);
			}
		});
	};
	if($('#sub-hero .slider').length) {
		subHeroSlider();
	}

	var subSlider = function() {
		function getMargin(newItems) {
			var center  = newItems.eq(0).outerWidth(true) + (newItems.eq(1).outerWidth(true)/2);
			var minMarg = ($(window).width()/2) - center;

			return minMarg;
		}
		function centerIMG( newItems ) {
			var slideCenter = newItems.find('img').width();
			var imgCenter = ($(window).width() - slideCenter)/2;

			return imgCenter;
		}

		// Slider functionality
		$(".sub-slider .slider").carouFredSel({
			responsive: false,
			height: 288,
			width: 735,
			items: {
				width: 735,
				height: 288,
				visible: {
					min: 1,
					max: 1
				}
			},
			pagination: {
				container: function() {
					return $(this).parent().parent().find(".slider-pagin");
				}
			},
			auto: {
				play: true,
				timeoutDuration: 5000,
				button: function() {
					return $(this).parent().parent().find(".slider-play");
				},
				pauseOnEvent: 'resume'
			},
			scroll: {
				items: 1,
				fx: 'crossfade'
			},
			onCreate: function( data ) {

				$('.sub-slider').animate({
					'left': 0
				}, function() {
					$(this).animate({
						'opacity': 1
					});
					if($('html').hasClass('lt-ie7')){
						var heroHeight = $('.sub-slider').height();
						$('.sub-slider').find('.slider-nav').find('span').css({height: heroHeight});
					}
				});

			},
			swipe: true
		});
	};
	if($('.sub-slider .slider').length) {
		subSlider();
	}

	var tabModule = function(){
		var $container = $('.btns');
		$container.parents('.module').find('.active').addClass('inview');
		$container.find('li:not(.spacer)').on({
			mouseenter : function(){
				if(!$(this).hasClass('active')){
					$(this).addClass('hover');
				}
			},
			mouseleave: function(){
				$(this).removeClass('hover');
			},
			click : function(){
				var tabIndex = $(this).data('tab'),
					tempTabIndex = $(this).parent().find('.active').data('tab'),
					tabContent = $(this).parents('.module').find('.tab'),
					direction = 1;
				$(this).parent().find('li a').removeClass('current');
				$(this).find('a').addClass('current');
				tabContent.each(function(){

					direction = (tabIndex > tempTabIndex) ? 1 : -1;

					if($(this).data('index') === tabIndex){
						$(this).addClass('inview');
						$(this).css({display : 'block', position: 'relative', left: (direction)*(1000)});
						$(this).animate({left: 0, opacity: 1}, 1000, 'easeOutQuint');
						//$(this).parent().animate({height : $(this).outerHeight(true)}, 1000, 'easeOutQuint');
					} else {
						$(this).removeClass('inview');
						$(this).css({position: 'absolute', top: 0});
						$(this).animate({left: (direction)*(-1000), opacity: 0}, 1000, 'easeOutQuint');
					}
				});
			}
		});

		//resize btn container
		// $container.each(function(){
		// 	var containerWidth = 0;
		// 	$(this).find('li').each(function(){
		// 		containerWidth += $(this).outerWidth(true);
		// 	});
		// 	$(this).css('width', containerWidth);
		// });
		//set container height
		// $(window).load(function(){
		// 	$('.tab-content .tab .accordian-wrap').each(function(){
		// 		var tabHeight = $(this).outerHeight(true);
		// 		$(this).css('height', tabHeight);
		// 	});
		// });
	};
	if($('.tab').length){
		tabModule();
	}
	var propertyGallery = {

		dom : {},
		load: function() {
			propertyGallery.initdom();
			propertyGallery.setup();
			$(window).resize(function() {
				propertyGallery.setup();
			});
		},
		initdom: function() {

			this.dom.page = $('#property-gallery');
			this.dom.work = $('#work');
			this.dom.slider = $('#slider');
			this.dom.menu = $('#menu');

		},
		setup: function() {

			var li    = this.dom.work.find('li');
			var steps = (li.length);
			var step  = Math.floor((960 / li.length));

			var featured		= Math.floor(li.filter('li[rel=featured]').length * step);
			var beijing 		= Math.floor(li.filter('li[rel=beijing]').length * step);
			var shanghai	 	= Math.floor(li.filter('li[rel=shanghai]').length * step);
			//var hainan	 		= Math.floor(li.filter('li[rel=hainan]').length * step);

			this.dom.slider.find('.featured').css('width', (featured)).css('left', '0');
			this.dom.slider.find('.beijing').css('width', (beijing)).css('left', featured);
			this.dom.slider.find('.shanghai').css('width', (shanghai)).css('left', featured+beijing);
			//this.dom.slider.find('.hainan').css('width', hainan).css('left', featured+beijing+shanghai);

			this.dom.menu.animate({'opacity' : 1}, 150);

			this.dom.slider.slider({
					min : 0,
					max : steps,
					animate : true,
					slide:
						function(event, ui) {
							//console.log(event, ui.value);
							if(ui.value >= (steps)) ui.value = (steps);
							var element = li.filter(':eq(' + ui.value + ')');
							element.siblings('li').removeClass('active');//.animate({ opacity: .3 }, 300);
							element.trigger('click');
						}
			});

			//if(window.location.hash.length > 0 && window.location.hash != '#featured/WangjingSOHO') {

			/* OUT TO FIX REDIRECT LOOP:
			if(window.location.hash.length > 0) {

				var parts = window.location.hash.split('/');
				var id    = parts[1];
				var img   = parts[0];
				var loc   = img.split('#')[1];

				//propertyGallery.select($('#' + id));
				propertyGallery.dom.work.find('li').removeClass('active');
				propertyGallery.select(this.dom.work.find('li.'+loc+'').filter('li[data-url='+id+']'), img);

			}*/

			var winW = $(window).width();
			var page = propertyGallery.dom.work.width();

			propertyGallery.dom.work.css({'left': ((winW-page)/2)+220+'px'});

			propertyGallery.dom.work.find('ul').css({'width':(li.width()*steps)+'px'});
			//propertyGallery.dom.slider.find('ul').css({'width':(steps*step)+'px'});
			propertyGallery.dom.slider.find('.ui-slider-handle').css({'width':step+'px'});
			//propertyGallery.dom.work.find('li').first().addClass('active').animate({ opacity: 1 }, 300);
			if(window.location.hash.length <= 0) {
				//propertyGallery.dom.work.find('li:eq(1)').addClass('active').animate({ opacity: 1 }, 300);
				propertyGallery.select(this.dom.work.find('li:eq(1)'));
			}

			$(document).keydown(function(event) {

				switch(event.keyCode) {
					case 37: // left arrow
						event.preventDefault();
						propertyGallery.skip(true);
						break;
					case 39: // right arrow
						event.preventDefault();
						propertyGallery.skip(false);
						break;
				}

			});

			propertyGallery.dom.work.find('li').click(function() {
				if($(this).hasClass('active')) {
					//propertyGallery.open();
				} else {
					propertyGallery.select($(this));
				}
			});

		},
		skip: function(back) {

	        var active = this.dom.work.find('li.active');
	        var next = (back) ? active.prev() : active.next();
	        // console.log(active);
	        // console.log(next);
	        if(next.length == 0) return;
	        next.trigger('click');

		},
		select: function(element, rel) {

			this.close();
	        this.dom.work.find('.active').removeClass('active');//.animate({ opacity: .3 }, 300);;
	        element.addClass('active');
	        element.animate({ opacity: 1 }, 300);

	        var index  = element.prevAll().length;
	        var offset = -(index * 450);

	        this.dom.slider.slider('value', index);
	        this.dom.work.stop().animate({'margin-left' : offset}, 300);

	        //document.title = element.attr('data');
	        // OUT TO FIX REDIRECT LOOP:
	        //window.location.hash = element.attr('rel') + '/' + element.attr('data-url');

		},
		open: function(openImage) {
			return false;
		},
		close: function() {

			if(this.dom == {}) return false;
     		$('#slider').stop().animate({'opacity' : 1}, 300);
			var base = $('#work').find('li.active');
			// OUT TO FIX REDIRECT LOOP:
        	//window.location.hash = base.attr('rel') + '/' + base.attr('data-url');

		}

	};
	if($('#property-gallery').length) {
		propertyGallery.load();
	}

	var globalSubmenu = function() {
		var $container = $('#property-dropdown'),
			$listTrigger = $('#main-nav').find('a.sub-menu'),
			$caret = $('#main-nav').find('.caret');

		$container.css({width: $(window).width()});

		$listTrigger.on({
			click: function() {
				if($(this).hasClass('open')) {
					$caret.animate({bottom: -10, opacity: 0}, 400, 'easeOutQuint');
					$container.animate({top: -160}, 600, 'easeOutQuint');
					$(this).removeClass('open');
				} else {
					$caret.animate({bottom: -20, opacity: 1}, 400, 'easeOutQuint');
					$container.animate({top: 70}, 600, 'easeOutQuint');
					$(this).addClass('open');
				}
				return false;
			}
		});

		$(document).keyup(function(e){
			if(e.keyCode === 27 && $listTrigger.hasClass('open')){
				$listTrigger.trigger('click');
			}
		});

		$(window).resize(function(){
			if($(window).width() > 980){
				$container.css({width: $(window).width()});
			}
		});

		// Requires jquery.ba-outside-events.min.js Plugin
		$listTrigger.bind('clickoutside', function(event) {
			$caret.animate({bottom: -10, opacity: 0}, 400, 'easeOutQuint');
			$container.animate({top: -160}, 600, 'easeOutQuint');
			$(this).removeClass('open');
		});
 	};

	if($('#property-dropdown').length) {
 		globalSubmenu();
 	}

	var accordionToggle = function() {
		var $container = $('.accordion'),
			$listTrigger = $container.find('a.more-toggle');
		$container.find('.info').css({display: 'block'}).slideUp(600, 'easeOutQuint').find('li.open').removeClass('open');
		$listTrigger.on({
			click: function() {
				if($(this).parent().hasClass('open')) {
					//Toggle Close

					$(this).parent().find('.info').css({display: 'block'}).slideUp(600, 'easeOutQuint');
					$(this).parent().removeClass('open');
					$(this).removeClass('open');

				} else {
					// Toggle Open
					$(this).addClass('open');
					$(this).parent().find('.info').slideDown(600, 'easeOutQuint');
					$(this).parent().addClass('open');
				}
				return false;
			}
		});

	};
	if($('.accordion').length) {
		accordionToggle();
	}

	var contactAccordianToggle = function() {
		$('.module').find('.open').css('height', '400px');

		var $container = $('.contact-2-column'),
			$listTrigger = $container.find('a.more-toggle');
		$listTrigger.on({
			click: function() {
				if($(this).parent().hasClass('open')) {
					//Toggle Close
					$(this).parent().removeClass('open');
					$(this).parent().animate({height: "-=170"}, 600, 'easeOutQuint');
				} else {
					//console.log('open!');
					$(this).parent().addClass('open');
					$(this).parent().animate({height: "+=170"}, 600, 'easeOutQuint');
				}
			}
		});
	};
	//if($('.contact-2-column').length) {
		//contactAccordianToggle();

	//}

	var homepageSlider = function(){
		var $container = $('#featured-property'),
			numSlides = $container.find('.inner-content').length,
			$lastSlide = $container.find('.inner-content').eq(numSlides-1),
			$firstSlide = $container.find('.inner-content').eq(0),
			flag = 1;

		$container.find('.slider-next').on({
			click: function(){
				var $currentSlide = $container.find('.current');
				if(flag === 1){
					flag = 0;
					if($currentSlide.next().length){
						$currentSlide.fadeOut('fast').next().fadeIn('slow', function(){
							$currentSlide.removeClass('current');
							flag = 1;
						}).addClass('current');
					} else {
						$currentSlide.fadeOut('fast');
						$firstSlide.fadeIn('slow', function(){
							$currentSlide.removeClass('current');
							flag = 1;
						}).addClass('current');
					}
				}
			}
		});

		$container.find('.slider-prev').on({
			click: function(){
				var $currentSlide = $container.find('.current');
				if(flag === 1){
					flag = 0;
					if($currentSlide.prev().length){
						$currentSlide.fadeOut('fast').prev().fadeIn('slow', function(){
							$currentSlide.removeClass('current');
							flag = 1;
						}).addClass('current');
					} else {
						$currentSlide.fadeOut('fast');
						$lastSlide.fadeIn('slow', function(){
							$currentSlide.removeClass('current');
							flag = 1;
						}).addClass('current');
					}
				}
			}
		});
	};

	if($('#featured-property').length){
		homepageSlider();
	}

	var formatArticle = function(){
		var $images = $('#article-container').find('img');
		$('#article-img-container').append($images);
		$('#article-container').find('img').remove();
	}

	if($('#news-article').length){
		formatArticle();
	}

	var loadYouku = function(){

		var videoID = $('#youku-player').data('video');
		 if($('html').hasClass('touch')){
		 	youku.loadPlayer("ios_m3u8", videoID , "youku-player", null ,960,600);
		 	$('#youku-player').addClass('mobile');
		} else {
		$('#youku-player').append('<embed src="http://player.youku.com/player.php/sid/'+ videoID +'/v.swf" quality="high" width="960" height="600" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></embed>');
		}
	};


	if($('#youku-player').length){
		loadYouku();
	}

	var centerSubNav = function(){
		var $container = $('#sub-nav'),
			containerWidth = 0;

		$container.find('li').each(function(){
			containerWidth += $(this).outerWidth(true);
		});

		$container.find('ul').css({width: containerWidth+20});

	};

	if($('#sub-nav').length){
		centerSubNav();
	}

	var pageTitleBG = function(){
		var $container = $('#page-title').find('img');
		$(window).resize(function(){
			if($(window).width() > 1800){
				$container.addClass('resize').css({width: $(window).width()});
			} else {
				$container.removeClass('resize').css({width: '1800',left:'0'});
			}
		});
		$(window).resize();
	};

	if($('#page-title').length){
		pageTitleBG();
	}

})();