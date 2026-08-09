let readerAudio;
let isManualScroll = false;
let scrollTimer;

let screenShot, reviewTextContainer, siteReviewTitle, prosAndCons, btnVisit, reviewTextHeight;
let hScreenShot, hReviewContainer, hSiteReviewTitle, hProsAndCons, hBtnVisit, hReviewTextHeight;
let voicePrints = [];
let lastWordLength = 0;

let reviewContainer = document.querySelector(".review_con .con");
let scrollProgress = document.querySelector(".scroll_progress");
let scrollThumb = document.querySelector(".scroll_thumb");
let scrolThumbHeight = 0;

let isNotLightHouse = true;
let reviewMainContainer = document.querySelector(".main_con.review_container");
let currentSiteId = reviewMainContainer?.dataset.siteid;
let catId = reviewMainContainer?.dataset.category;

let footer = document.querySelector('#footer');
let fBar = document.querySelector('.floating_bar');

let categoryData, categorySiteList = [];
wInnerWidth = window.innerWidth;
let eleAudio = null;

if(isNotLightHouse){
	screenShot = document.querySelector(".screan_shot");
	reviewTextContainer = document.querySelector(".review_scroll_container .con");
	siteReviewTitle = document.querySelector(".site_review_title_content");
	prosAndCons = document.querySelector(".pros_and_cons");
	btnVisit = document.querySelector(".visit_web");

	eleAudio = document.querySelector('audio');

	/*if(window.onload){
		window.onload = window.onload.extend(onReviewPageLoad);
	}else{
		window.onload = onReviewPageLoad();
	}*/
}

function onReviewPageLoad(){
	setTimeout(function (){
		loadJS('/wp-content/themes/mpg/js/prick2025.js', initPrick, document.body);

		loadJS('/wp-content/themes/mpg/js/mark.min.js', null, document.body);
	}, 200);


	initReviewPage();
}

function initReviewPage(){
	readerAudio = document.querySelector("audio");
	body = document.querySelector("body");

	screan_shot = document.querySelector(".screan_shot");
	reviewContainer = document.querySelector(".review_con .con");
	siteReviewTitle = document.querySelector(".site_review_title_content");
	prosAndCons = document.querySelector(".pros_and_cons");
	btnVisit = document.querySelector(".visit_web");

	setTimeout(delayedFunctions, 200);

}



function initNonLightHouse(){


	adjustBreadCrumbIcons();

	initScrollThumb();
	onReviewBoxScroll();
	reviewContainer.addEventListener("scroll",
		function() {
			onReviewBoxScroll();
		},
		{ passive: true }
	);

	if(isNotLightHouse){
		initGameCategoryVideos();
	}
}

function delayedFunctions(){
	if(isNotLightHouse){

		initScrollContainer();

		initNonLightHouse();

		//initPrick();

		initAudioReview();



		new ReportModal()
	}
}

function initPrick(){
	if(document.querySelectorAll(".main_con.review_container.show_me").length){
		var popType = document.querySelector(".main_con.review_container.show_me").dataset.pop_type;

		if(DeviceUtils.mobileAndTabletcheck()){
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
				.bindTo(['.review_container.show_me a', '.screan_shot.show_me a', 'a.visit_web.show_me'])
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
				.bindTo(['.review_container.show_me a', '.screan_shot.show_me a', 'a.visit_web.show_me'])
				.add("/wp-content/themes/mpg/pop/"+catId, {
				  under: false,
				  newTab: false,
				  cookieName:'category_pop',
				  cookieExpires: 60*60*24,
				  device:'mobile',
				});
			}


		}else{
			Prick
			.config({
			  debug: true,
			  perpage: 2,
			  //coverTags: ['iframe']
			  webkitAnchorBlank:true,
			  tabUnderIgnoreTargetBlank: true,
			  coverScrollbar: false
			})
			.bindTo(['.review_container.show_me a', '.screan_shot.show_me a', 'a.visit_web.show_me'])
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

function loadAudioReview(){
	readerAudio = document.createElement('audio');
	readerAudio.controls = true;

// Create the source element
	let sourceElement = document.createElement('source');
	sourceElement.src = document.querySelector('.click_for_audio').dataset.audioSrc;

// Append the source to the audio element
	readerAudio.appendChild(sourceElement);

// Append the audio element to the desired location in the DOM
	document.querySelector('.review_container').appendChild(readerAudio);
}
function initAudioReview(){
	let isPlaying = false;

	if(document.querySelector(".click_for_audio")){
		loadAudioReview();
		document.querySelector(".click_for_audio").onclick = function(){
			if(!isPlaying){
				isPlaying = true;

				readerAudio.play();

			}else{
				isPlaying = false;
				readerAudio.pause();
			}
		}

		if(document.querySelectorAll('audio').length){
			initPlayEvent();
		}
	}
}
function initScrollContainer(){
	var scrollContainer = document.querySelector("#cs_com");
	if(scrollContainer){
		if(scrollContainer.style.overflow=='visible'){
			scrollContainer = document.querySelector('.main-outer');

			scrollContainer.ontouchmove = function(){
				isManualScroll = true;

				if(typeof scrollTimer !=="undefined"){
					clearTimeout(scrollTimer);
				}

				scrollTimer = setTimeout(function(){
					isManualScroll =  false;
				}, 5000);
			}
		}else{
			scrollContainer.onscroll = function(){
				isManualScroll = true;

				if(typeof scrollTimer !=="undefined"){
					clearTimeout(scrollTimer);
				}

				scrollTimer = setTimeout(function(){
					isManualScroll =  false;
				}, 5000);
			}
		}
	}

}


function initPlayEvent(){
	//var vid = document.querySelector("audio");
	loadTranscription(currentSiteId);

	readerAudio.ondurationchange = function(e) {
		lastWordLength = 0;
	};
	readerAudio.ontimeupdate = function() {

		if(voicePrints.length){
			let playTime = readerAudio.currentTime;
			let foundWord = voicePrints.reduce((p,v)=> Math.abs(p.start-playTime) < Math.abs(v.start-playTime) ? p : v);

			performMark(foundWord.endOffset);
		}else{
			performMark(parseInt(readerAudio.currentTime*17));
		}

		var currentPosition = parseInt(readerAudio.currentTime);
		if(currentPosition%2){

			if(!isManualScroll){
				scrollToMark();
			}
		}
	};
}

function scrollToMark(){
	var marks = document.querySelectorAll("#cs_com mark");

	if(marks.length){
		if(document.querySelector("#cs_com").style.overflow == 'visible'){

			var markY = marks[marks.length-1].getBoundingClientRect().top + document.querySelector(".main-outer").scrollTop + 200;

			doScrolling(markY, 500);
		}else{
			var markY = marks[marks.length-1].getBoundingClientRect().top - document.querySelector("#cs_com").getBoundingClientRect().top + document.querySelector("#cs_com").scrollTop - 200;
			scrollElement(document.querySelector("#cs_com"), markY, 500);
		}
	}
}

function performMark(charLength) {

	var reviewText = document.querySelector("#cs_com").innerText;
	var highlightText = reviewText.substring(0, charLength);
	var markInstance = new Mark(document.querySelector("#cs_com"));
	var keywordInput = document.querySelector("input[name='keyword']");
	var keyword = highlightText;

	var options = {};
	options['separateWordSearch']=false;
	options['diacritics']=false;
	options['debug']=false;
	options['acrossElements']=true;
	options['ignoreJoiners']=true;

	markInstance.unmark({
		done: function(){
			//markInstance.mark(keyword, options);

			markInstance.markRanges([{
				start: 0,
				length: charLength
			}]);
		}
	});
};

function scrollElement(ele, elementY, duration) {
	var startingY = ele.scrollTop;
	var diff = elementY - startingY;
	var start;

	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(function step(timestamp) {
		if (!start) start = timestamp;
		// Elapsed milliseconds since start of scrolling.
		var time = timestamp - start;
		// Get percent of completion in range [0, 1].
		var percent = Math.min(time / duration, 1);

		ele.scrollTo(0, startingY + diff * percent);

		// Proceed with animation as long as we wanted it to.
		if (time < duration) {
			window.requestAnimationFrame(step);
		}
	})
}

//var body = document.querySelector("body");
if(isNotLightHouse){
	checkAndPositionCrumbs();

//resizeReviewBox();

	window.addEventListener('scroll', function(e) {
		checkAndPositionCrumbs();
	});

	window.onresize = function(e){
		//resizeReviewBox();
	};
}

function resizeReviewBox(){
	if(document.body.getBoundingClientRect().width>992){
		hScreenShot = screenShot.getBoundingClientRect().height;
		hSiteReviewTitle = siteReviewTitle.getBoundingClientRect().height;
		hProsAndCons = prosAndCons.getBoundingClientRect().height;
		hBtnVisit = btnVisit.getBoundingClientRect().height;

		hReviewTextHeight = hScreenShot - hSiteReviewTitle - hProsAndCons - hBtnVisit;


		console.log(''+hScreenShot+' - '+hSiteReviewTitle+' - '+hProsAndCons+' - '+hBtnVisit);

	}else{
		hReviewTextHeight = 5000;
	}

	reviewTextContainer.style.maxHeight = hReviewTextHeight+'px';
}

function checkAndPositionCrumbs(){
	body = document.querySelector("body");
	last_known_scroll_position = window.scrollY;


}


function adjustBreadCrumbIcons(){
	//let iconsContainer = document.querySelectorAll('.icons');
	let iconsContainer = document.querySelectorAll('.show_similar_sites_mobile');


	iconsContainer.forEach(function(container, index){
			let containerW = container.offsetWidth;
			let availableSlots = parseInt(containerW/24);

			let innerIcons = container.querySelectorAll('.deIcon');
			innerIcons.forEach(function(singleIcon, iconIndex){
				if(iconIndex>availableSlots){
					//singleIcon.style.display = 'none';
				}else{
					//singleIcon.style.display = 'block';
				}
			});
	});
}


function initScrollThumb(){
	if(reviewContainer){
		scrolThumbHeight = (reviewContainer.clientHeight/reviewContainer.scrollHeight)*reviewContainer.clientHeight;
		scrollThumb.style.setProperty("height", scrolThumbHeight+"px");
	}
}

function onReviewBoxScroll(){

	let scrollTop = reviewContainer.scrollTop;
	let scrollBottom = reviewContainer.scrollHeight - reviewContainer.clientHeight;
	scrolThumbHeight = (reviewContainer.clientHeight/reviewContainer.scrollHeight)*reviewContainer.clientHeight;
	let scrollPercent = scrollTop / scrollBottom * 100;
	let scrollY = (scrollTop / reviewContainer.scrollHeight) * reviewContainer.clientHeight;
	let scrollH = scrollY;

	scrollThumb.style.setProperty("top", scrollH+'px');

	scrollH = scrolThumbHeight - 20;

	if(scrollPercent>99){
		scrollH = scrolThumbHeight;
	}

	scrollProgress.style.setProperty("height", scrollH+"px");
}

function loadTranscription(_id){
	voicePrints = [];

	var request = new XMLHttpRequest();
	request.open('GET', '/wp-json/mpg/speech/'+_id+'/', true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			// Success!
			var alignments = JSON.parse(request.responseText);
			if(alignments){
				alignments.forEach(function (item, index){
					let _start = item.start;
					let _end = item.end;
					let _word = item.word;
					voicePrints[_start*100] = item;
				});
			}
		} else {
			// We reached our target server, but it returned an error
		}
	};

	request.onerror = function() {
		// There was a connection error of some sort
	};

	request.send();
}





