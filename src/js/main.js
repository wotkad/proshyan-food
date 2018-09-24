//mobile menu
var menu = document.querySelector('.menu__controls-button');
var menuList = document.querySelector('.menu__list');
var menuClose = document.querySelector('.menu__controls-close');
var mobList = document.querySelector('.mob__list');
var body = document.body;

//mob menu and menu
function resizeHandler() {
	if($(window).width() < 880) {
		menuList.style.display = 'none';
		mobList.style.display = 'flex';
		menu.onclick = function() {
			mobList.style.transform = 'translateX(0)';
			menu.style.transform = 'translateY(50px)';
			menuClose.style.transform = 'translateY(50px)';
		}
		menuClose.onclick = function() {
			mobList.style.transform = 'translateX(100%)';
			menu.style.transform = 'translateY(0px)';
			menuClose.style.transform = 'translateY(0px)';
		}
	} else {
		menuList.style.display = 'flex';
		mobList.style.display = 'none';
		menu.onclick = function() {
			menuList.style.transform = 'translateX(-100%)';
			menu.style.transform = 'translateY(50px)';
			menuClose.style.transform = 'translateY(50px)';
		}
		menuClose.onclick = function() {
			menuList.style.transform = 'translateX(0)';
			menu.style.transform = 'translateY(0px)';
			menuClose.style.transform = 'translateY(0px)';
		}
	}
}
resizeHandler();
$(window).resize(resizeHandler);
//if user resize window popup is close

window.onresize = function() {
	menuList.style.transform = 'translateX(0)';
	menu.style.transform = 'translateY(0px)';
	menuClose.style.transform = 'translateY(0px)';
	mobList.style.transform = 'translateX(100%)';
	popupPolicy.style.opacity = '0';
	popupPolicy.style.zIndex = '-1';
}

// slider
var swiper = new Swiper('.swiper-container', {
	slidesPerView: 3,
	spaceBetween: 20,
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true,
	},
	breakpoints: {
		640: {
			slidesPerView: 1,
		},
		991: {
			slidesPerView: 2,
		}
	},
  })

//send mail
var sendMail = function sendMail(selector) {
  return fetch('mail.php', {
	method: 'POST',
	body: new FormData(document.querySelector(selector))
  }).catch(function (error) {
	alertify.error("Ошибка. Повторите отправку позже");
  });
};

// alert for sendmessage
const sendMessage = () => {
	const form = document.querySelector('.form__container')
	if (form !== null) {
		form.onsubmit = (e) => {
		e.preventDefault();
		sendMail('.form__container').then(alertify.success('Ваша заявка отправленна, Мы свяжемся с вами в ближайшее время!')/*, yaCounter********.reachGoal('****', function () {})*/).then(form.reset())
		}
	}
}
sendMessage();

//smoothscroll
new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    after: function() {
        document.querySelector("body").style.overflow = "", document.querySelector("body").style.paddingRight = "0px"
    }
});

//close menu by click on item
var mobItem = document.querySelectorAll('.mob__item');
for (i = 0; i < mobItem.length; i++){
	mobItem[i].onclick = function() {
		mobItems.style.transform = 'translateX(-100%)';
		body.style.overflowY = 'auto';
	}
}

// mask for "tel" input
var input = document.querySelectorAll('input[type="tel"]')
var mask = new Inputmask("+7 (999) 999-99-99");
for (i = 0; i < input.length; i++){
var input = document.querySelectorAll('input[type="tel"]')
	mask.mask(input[i]);
}

//right sticky menu
var menu_selector = ".rightnav__block"; // Переменная должна содержать название класса или идентификатора, обертки нашего меню.
function onScroll(){
	var scroll_top = $(document).scrollTop();
	$(".rightnav__block-dot").each(function(){
		var hash = $(this).attr("href");
		var target = $(hash);
		if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
			$(menu_selector + " .rightnav__block-dot-active").removeClass("rightnav__block-dot-active");
			$(this).addClass("rightnav__block-dot-active");
		} else {
			$(this).removeClass(".rightnav__block-dot-active");
		}
	});
}
$(document).ready(function () {
	$(document).on("scroll", onScroll);
	$(".rightnav__block-dot").each(function(){ $(this).click(function(e){
		e.preventDefault();
		$(document).off("scroll");
		$(menu_selector + " rightnav__block-dot-active").removeClass("rightnav__block-dot-active");
		$(this).addClass("rightnav__block-dot-active");
		var hash = $(this).attr("href");
		var target = $(hash);
		$("html, body").animate({
			scrollTop: target.offset().top
		}, 500, function(){
			window.location.hash = hash;
			$(document).on("scroll", onScroll);
		});
	});
	});
});

//progress bar for single blog
$(function() {
	$(window).on("scroll resize", function() {
		var progress = document.querySelector('progress');
		if (progress !== null) {
			var o = $(window).scrollTop() / ($(document).height() - $(window).height());
			$(".progress__container-bar").css({
				"width": (100 * o | 0) + "%"
			});
			$('progress')[0].value = o;
		}
	})
});

//vk widget
var vk = document.getElementById('vk_groups')
if (vk !== null) {
	VK.Widgets.Group("vk_groups", {mode: 4, wide: 2, width: "auto", height: "390"}, 170904039);
}

//facebook widget
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = 'https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v3.1';
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//preloader
var preloader = document.querySelector('.preloader');
var loadercircle = document.querySelector('.loader-circle');
loadercircle.style.opacity = '1';
$(document).ready(function() {
    var siteContent = document.querySelector('.wrapper');
    setTimeout(() => siteContent.classList.add('render'), 1337);
	setTimeout(() => preloader.style.display = 'none', 1300);
})

// scroll is off until document is not ready
function checkLoad() {
	var body = document.body;
	body.style.overflow = 'hidden';
	setTimeout(() => body.style.overflow = '', 1437);
}
checkLoad();

//popup
var buttonPolicy = document.querySelectorAll('.footer__info-policy, .form__container-policy-link');
var popupPolicy = document.querySelector('.popuppolicy');
var closePopup = document.querySelector('.popuppolicy__header-close');

for (i = 0; i < buttonPolicy.length; i++) {
	//popup
	buttonPolicy[i].onclick = function () {
		popupPolicy.style.opacity = '1';
		popupPolicy.style.zIndex = '99999';
		body.style.overflow = 'hidden';
	}

	//popup close by button
	closePopup.onclick = function () {
		popupPolicy.style.opacity = '0';
		popupPolicy.style.zIndex = '-1';
		body.style.overflow = '';
	}
}

//close popup by "esc" button
window.onkeydown = function( event ) {
	if ( event.keyCode == 27 ) {
		popupPolicy.style.opacity = '0';
		popupPolicy.style.zIndex = '-1';
		body.style.overflow = '';
	}
};
