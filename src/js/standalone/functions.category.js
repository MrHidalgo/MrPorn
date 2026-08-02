var readerAudio;
var isManualScroll = false;
var scrollTimer;

let firstSite, categoryDescription;

const similarSitesMobile = document.querySelector(".show_similar_sites_mobile");

var reviewContainer = document.querySelector(".review_con .con");
var scrollProgress = document.querySelector(".scroll_progress");
var scrollThumb = document.querySelector(".scroll_thumb");
var scrolThumbHeight = 0;

let activeCategoryVideo;

if(window.onload){
	window.onload = window.onload.extend(initCategoryFunctions);
}else{
	window.onload = initCategoryFunctions();
}

document.addEventListener('DOMContentLoaded', function () {
	setTimeout(function (){
		loadJS('/wp-content/themes/mpg/js/prick2025.js', initPrick, document.body);
	}, 200);

	//initPrick();
});

function initPrick(){
	if(document.querySelectorAll(".category_sites_item.show_me").length){
		var catId = document.querySelector(".main_con.review_container").dataset.category;
		var popType = document.querySelector(".main_con.review_container").dataset.pop_type;

		console.log("Init prick functions");

		if(DeviceUtils.mobileAndTabletcheck()){
			console.log('before blocking mobile');
			if(popType==0){
				Prick
					.config({
						//debug: true,
						perpage: 2,
						//coverTags: ['iframe']
						webkitAnchorBlank:true,
						tabUnderIgnoreTargetBlank: true,
						coverScrollbar: false
					})
					.bindTo(['.category_sites_item.show_me a', '.screan_shot.show_me a', 'a.visit_web.show_me', '.category_site_col.show_me a'])
					.add("/wp-content/themes/mpg/pop/"+catId, {
						under: true,
						newTab: false,
						cookieName:'category_pop',
						cookieExpires: 60*60*24,
						device:'mobile',
					});
			}else{
				Prick
					.config({
						//debug: true,
						perpage: 2,
						//coverTags: ['iframe']
						webkitAnchorBlank:true,
						tabUnderIgnoreTargetBlank: true,
						coverScrollbar: false
					})
					.bindTo(['.category_sites_item.show_me a', '.screan_shot.show_me a', 'a.visit_web.show_me', '.category_site_col.show_me a'])
					.add("/wp-content/themes/mpg/pop/"+catId, {
						under: false,
						newTab: false,
						cookieName:'category_pop',
						cookieExpires: 60*60*24,
						device:'mobile',
					});
			}


		}else{
			console.log('before blocking');
			Prick
				.config({
					debug: true,
					perpage: 2,
					//coverTags: ['iframe']
					webkitAnchorBlank:true,
					tabUnderIgnoreTargetBlank: true,
					coverScrollbar: false
				})
				.bindTo(['.category_sites_item.show_me a', '.screan_shot.show_me a', 'a.visit_web.show_me', '.category_site_col.show_me a'])
				.add("/wp-content/themes/mpg/pop/"+catId, {
					under: false,
					newTab: false,
					device:'desktop',
					width:1200,
					height:800,
					cookieExpires: 60*60*24,
					cookieName:'category_pop',
				});
		}
	}
}

function initCategoryFunctions(){


	if(document.querySelector('.category_sites_description__readmore')){
		document.querySelector('.category_sites_description__readmore').onclick = function () {
			toggleClass(document.querySelector('.category_sites_description'), 'show_all');
		};
	}

	initMoreButton();

	initGameCategoryVideos();

	if(document.querySelector('.dropAll span')){
		document.querySelector('.dropAll span').onclick = function () {
			toggleClass(document.querySelector('.dropAll'), 'active');
			return false;
		}
	}

	// new marquee( document.querySelector( '#babe_slider .slider' ), {
	// 	duplicated: true,
	// 	startVisible: true,
	// 	pauseOnHover: true,
	// 	speed: isMobileOrTablet ?100: 150,
	// 	gap: 0
	// });

	new ReportModal()
}

function initMoreButton(){
	let moreButton = document.querySelector(".click_for_more_games");
	let catSiteContainer = document.querySelector(".category_site_container");
	if(moreButton){
		moreButton.onclick = function(){
			catSiteContainer.classList.add('show_all');
		};
	}
}