let letterData = [];
let loggedUsername='';
let logoutUrl='';
let sortTimout;
let favouriteList = [];

const initTheme = () => {
	let toggleSwitch = document.querySelector('#toggle-mode');
	if(toggleSwitch){
		toggleSwitch.addEventListener('change', (event) => {
			if (event.target.checked) {
				createCookie("is_dark", "1", 7);
				document.documentElement.classList.remove('light');
			} else {
				createCookie("is_dark", "0", 7);
				document.documentElement.classList.add('light');
			}
		})
	}

	var isDark = getCookieMpgCookie("is_dark");
	if(isDark==''){
		isDark = '1';
	}
	if(isDark=='1'){
		//document.documentElement.classList.remove('light');
		toggleSwitch.checked = true;
	}else{
		//document.documentElement.classList.add('light');
		toggleSwitch.checked = false;
	}
}
initTheme();



const renderFavourites = () => {
	/*if(isMobileDevice){
		return;
	}*/

	isLoggedUser = getCookieMpgCookie('logged_username');

	if(isLoggedUser==''){
		//loadLoginForm();
		return;
	}

	const favouritesDropDown = document.querySelector('[view-favorites-drop-js]');


	let favouritesHtml = '';

	postRequest(ajaxEndpoint, {
		action:'is_logged',
		logout:'/',
		is_fav:true
	}, function (res) {
		console.log('Favouroites');
		console.log(res);
		if(res.status){
			if(res.status=='true'){
				isLoggedUser = true;

				window.logoutUrl = res.logout;

				if(document.querySelector('.header__action-link--logout')){
					document.querySelector('.header__action-link--logout').setAttribute('href', res.logout);
				}



				if(document.querySelector('.mobile_signup_link')){
					document.querySelector('.mobile_signup_link').setAttribute('href', res.logout);
				}



			}else{
				//loadLoginForm();
			}

			document.querySelectorAll('.is-active[favorites-toggle-js]').forEach(function (fav) {
				fav.classList.remove('is-active');
			})

			if(res.fav_list){
				favouriteList = [];
				res.fav_list.map(function (fav, index) {
					if(!favouriteList.includes(fav.id)){
						favouriteList.push(fav.id);
					}


					favouritesHtml += '<div class="header__view-link" >' +
						'<div><span>'+(index+1)+'.</span></div>' +
						'<div><img src="'+fav.favicon+'"/><p><a href="'+fav.permalink+'">'+fav.title+'</a></p></div>' +
						'<div><button type="button" data-id="'+fav.id+'" un-favorites-js><i class="icon-font icon-delete"></i></button><a href="'+fav.permalink+'" class="glass"><i class="icon-font icon-search"></i></a></div>' +
						'</div>';

					/*let favLink = document.querySelector('[data-id="'+fav.id+'"] [favorites-toggle-js]');
					if(favLink){
						favLink.classList.add('is-active');
					}

					if(document.querySelector('.list__box-favorites[data-id="'+fav.id+'"]')){
						document.querySelector('.list__box-favorites[data-id="'+fav.id+'"]').classList.add('is-active');
					}
					if(document.querySelector('.list__specification-circle[data-id="'+fav.id+'"]')){
						document.querySelector('.list__specification-circle[data-id="'+fav.id+'"]').classList.add('is-active');
					}*/

				})

				favouritesDropDown.innerHTML = favouritesHtml;

				renderMobileFavourites(res);
			}
		}

		markFavourites();
	});

}

function renderMobileFavourites(response){
	window.fav_list = [];
	var favHtml = '';
	var favIndex = 1;
	response.fav_list.forEach(function(fav){
		favHtml += '<li class="site_listitem fav_link fv_'+fav.id+' deIcon fi'+fav.id+' fx_'+fav.fx+' fy_'+fav.fy+'"><div class="id_number">'+favIndex+'.</div><a class="link" target="_blank" href="'+fav.permalink+'">'+fav.title+'</a><a class="fav_delete" data-id="'+fav.id+'"><i></i></a><a href="'+fav.permalink+'" title="'+fav.title+'" class="preview_link"></a></li>';
		window.fav_list.push(fav.id);
		favIndex++;
	});

	window.favHtmlMobile = '<div class="hdrfav mobile_fav_link"><div class="hdrfavttl">Your Favourite Sites</div><div class="site_list favourite_list">'+favHtml+'</div></div>'

	if(document.querySelector(".main_mobile_menu")){
		document.querySelector(".main_mobile_menu").insertAdjacentHTML("afterbegin", window.favHtmlMobile);
		document.querySelector('.mobile_fav_link .hdrfavttl').onclick = function(event){
			document.querySelector('.mobile_fav_link').classList.toggle('open');
		}
	}
}

const markFavourites = () =>{
	let currentFavourites = document.querySelectorAll('.list__box-favorites.is-active');
	for(let i = 0; i< currentFavourites.length; i++) {
		currentFavourites[i].classList.remove('is-active');
	}


	favouriteList.map(fav=>{
		let favLink = document.querySelector('[data-id="'+fav+'"] [favorites-toggle-js]');
		if(favLink){
			favLink.classList.add('is-active');
		}

		if(document.querySelector('.list__box-favorites[data-id="'+fav+'"]')){
			document.querySelector('.list__box-favorites[data-id="'+fav+'"]').classList.add('is-active');
		}
		if(document.querySelector('.list__specification-favorites[data-id="'+fav+'"]')){
			document.querySelector('.list__specification-favorites[data-id="'+fav+'"]').classList.add('is-active');
		}
	})
}

const letterSearch = () => {
	fetch('/wp-json/mpg/letter_matrix/')
		.then(res => res.json())
		.then((result) => {
			Object.keys(result).forEach(function (key) {
				var letter = key;
				var suggestions = result[key];

				var letterSuggestions = [];

				suggestions.map(function (suggestion) {
					let sName = suggestion.name;
					let sIcon = suggestion.icon;
					let sHd = suggestion.hd;
					let sFree = suggestion.free;

					letterSuggestions.push(suggestion);
				});

				letterData[letter] = letterSuggestions;
			});
			renderSorting();
		})
		.catch(err => { throw err });



	/*getRequest('/wp-json/mpg/letter_matrix/', {

	}, function (result) {
		Object.keys(result).forEach(function (key) {
			var letter = key;
			var suggestions = result[key];

			var letterSuggestions = [];

			suggestions.map(function (suggestion) {
				let sName = suggestion.name;
				let sIcon = suggestion.icon;
				let sHd = suggestion.hd;
				let sFree = suggestion.free;

				letterSuggestions.push(suggestion);
			});

			letterData[letter] = letterSuggestions;
		});
		renderSorting();
		//initLetterHover();
	});*/
}

const renderSorting = () => {
	let letterHtml = '';

	Object.entries(letterData).forEach(function (letter){
		letterHtml += '<a class="sort__drop-link" sort-letter-collapse-js data-letter="'+letter[0]+'">'+letter[0].toUpperCase()+'</a>';
	});
	letterHtml += '<div class="sort__drop-inner"></div>';

	const sortcontainer = document.querySelector('[sort-node-js]');
	if(sortcontainer){
		sortcontainer.innerHTML = letterHtml;
	}

	//onSortLetterClick(_ev.closest('[sort-letter-collapse-js]'));

	document.querySelectorAll('[sort-letter-collapse-js]').forEach(function (searchLetter){
		searchLetter.addEventListener('click', function (_ev) {

			onSortLetterClick(_ev.target);

			/*if(sortTimout){
				clearTimeout(sortTimout);
			}

			sortTimout = setTimeout(function (){
				onSortLetterClick(_ev.target);
			}, 1000);*/
		});
	});


}

const onSortLetterClick = (letterItem) => {
	let letter = letterItem.dataset.letter;
	let suggessionIndex = 1;
	let letterSuggessions = '';

	let suggessionsTop = 10;
	if(!isMobileDevice){
		if(letter=='e' | letter=='f' | letter=='g' | letter=='h' ){
			suggessionsTop = 44;
		}else if(letter=='i' | letter=='j' | letter=='k' | letter=='l' ){
			suggessionsTop = 78;
		}else if(letter=='m' | letter=='n' | letter=='o' | letter=='p' ){
			suggessionsTop = 112;
		}else if(letter=='q' | letter=='r' | letter=='s' | letter=='t' ){
			suggessionsTop = 146;
		}else if(letter=='u' | letter=='v' | letter=='w' | letter=='x' ){
			suggessionsTop = 180;
		}else if(letter=='y'){
			suggessionsTop = 214;
		}
	}

	letterData[letter].forEach(function (suggession){
		let suggessionName = suggession.name;
		let uL = letter.toUpperCase();
		//suggessionName = suggessionName.replace(letter, '<span>'+letter+'</span>');
		//suggessionName = suggessionName.replace(uL, '<span>'+uL+'</span>');

		let siteFree = suggession.free;
		let siteHd = suggession.hd;
		let catIcon = suggession.icon;

		let htmlFree = '';
		if(siteFree){
			htmlFree = '<a href="'+siteFree+'" class="site_free"><span>Free</span></a>';
		}
		let htmlHd = '';
		if(siteHd){
			htmlHd = '<a href="'+siteHd+'"><img src="'+themeBase +'images/img-badge-premium.png" srcset="'+themeBase+'images/img-badge-premium@2x.png 2x" alt=""/></a>';
		}

		let showLetterToggle = false;
		if(siteFree!='' && siteHd!=''){
			showLetterToggle = true;
		}

		if(showLetterToggle) {
			letterSuggessions += '<div class="sort__collapse">' +
				'<a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-'+suggessionIndex+'">'+
				'<div><span>#'+suggessionIndex+'</span></div>'+
				'<div><img src="'+catIcon+'" />'+
				'<p>'+suggessionName+'</p>'+
				'</div>'+
				'<div><i class="icon-font icon-arrow-angle"></i></div></a>'+
				'<div class="sort__collapse-body" id="sort-collapse-'+suggessionIndex+'" collapse-body-js>'+
				htmlFree +
				htmlHd+
				'</div>'+
				'</div>';
		}else{
			letterSuggessions += '<div class="sort__collapse">' +
				'<a class="sort__collapse-toggle" href="'+((siteHd!='')?siteHd:siteFree)+'">'+
				'<div><span>#'+suggessionIndex+'</span></div>'+
				'<div><img src="'+catIcon+'" />'+
				'<p>'+suggessionName+'</p>'+
				'</div>'+
				'</a>'+
				'<div class="sort__collapse-body" id="sort-collapse-'+suggessionIndex+'" collapse-body-js>'+
				htmlFree +
				htmlHd+
				'</div>'+
				'</div>';
		}




		suggessionIndex++;
	});

	let activeSortLetter = document.querySelector('.sort__drop-link.is-active');
	if(activeSortLetter){
		activeSortLetter.classList.remove('is-active');
	}

	const sortSuggesionContainer = document.querySelector('.sort__drop-inner');
	sortSuggesionContainer.classList.add('is-open');
	letterItem.classList.add('is-active');

	if(!isMobileDevice){
		sortSuggesionContainer.style.top=suggessionsTop+'px';
	}

	sortSuggesionContainer.innerHTML = letterSuggessions;

}

const onSortToggle = (sortToggle) => {
	let sortContainer = sortToggle.dataset.container;
	let sC = document.querySelector('#'+sortContainer);
	if(sC != undefined && sC.classList.contains('is-open')){
		sC.classList.remove('is-open');
		return;
	}

	let activeSortCollapse = document.querySelector('.sort__collapse-body.is-open');
	if(activeSortCollapse){
		activeSortCollapse.classList.remove('is-open');
	}

	if(sC){
		sC.classList.toggle('is-open');
		/*if(sC.classList.contains('is-open')){
			sC.classList.remove('is-open');
		}else{
			sC.classList.add('is-open');
		}*/
	}
}

const loadLoginForm = () => {
	if(!isLoggedUser){
		if(!document.querySelector('#login_popup')){
			let htmlLogin = '<div class="login_container">'+
        '<div class="login_container_inner user_container_popup login">'+
            '<div class="user_tab_login">'+
                '<div class="login_form">'+
										'<div class="login_top">'+
                        '<div class="title">Log in</div>'+
                    '</div>'+

                    '<form class="cleanlogin-form ajax-login-form cleanlogin-container login_bottom" action="login" method="post">'+
                        '<p class="status result-message"></p>'+
                        '<fieldset>'+
                            '<div class="cleanlogin-field">'+
                                '<input class="cleanlogin-field-username log_username" type="text" name="username" placeholder="Username">'+
                            '</div>'+
                            '<div class="cleanlogin-field">'+
                                '<input class="cleanlogin-field-password log_password" type="password" name="password" placeholder="Password">'+
                            '</div>'+
                        '</fieldset>'+
                        '<fieldset>'+
                            '<div>'+
                                '<input class="submit cleanlogin-field" type="submit" value="Login" name="submit">'+
                                '<div class="remeber_me is_mobile">'+
                                    '<input type="checkbox" name="rememberme" value="forever">'+
                                    '<label>Keep me logged in?</label>'+
                                '</div>'+

                                '<a class="signup is_desktop popup_link_signup" href="/sign-up/">Sign up now</a>'+

                                '<a class="forgot popup_link_forgot" href="/forgot/">Forgot password?</a>'+
                            '</div>'+
                        '</fieldset>'+
                    '</form>'+

                    '<div class="info_create_mobile is_mobile">'+
                        '<a class="popup_link_signup" href="/sign-up/">Create New Account</a>'+
                    '</div>'+
                '</div>'+

                '<img class="login_banner" src="/wp-content/themes/mpg/images/bg_login.png"/>'+
            '</div>'+
            '<div class="user_tab_forgot">'+
                '<div class="login_form">'+
                    '<div class="login_top">'+
                        '<div class="title">Forgot Password</div>'+
                        '<p class="is_mobile top_forgot_text">Enter the email address associated with your account. An email will then be sent with a link to set up a new password.</p>'+
                    '</div>'+


                    '<div class="forgot_page">'+
                        '<form class="cleanlogin-form cleanlogin-container login_bottom" method="post" action="#">'+
                            '<div class="info is_desktop">'+
                                'Enter your email address and we\'ll email you a link to reset your password or <a href="/sign-up/" class="popup_link_signup">Sign Up</a>'+

                                '<p class="status result-message"></p>'+
                            '</div>'+

                            '<input type="hidden" name="website""value=".">'+

                            '<fieldset>'+
                                '<div class="cleanlogin-field">'+
                                    '<input class="cleanlogin-field-username" type="text" name="username" value="" placeholder="Username (or E-mail)">'+
                                '</div>'+
                            '</fieldset>'+

                            '<div>'+
                                '<input type="submit" value="Restore password" name="submit">'+
                                '<input type="hidden" name="action" value="restore">'+
                            '</div>'+
                        '</form>'+

                        '<div class="info_create_mobile is_mobile">'+
                            'If you have not registered join now for free! <a class="popup_link_signup" href="/sign-up/">Create New Account</a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+

                '<img class="login_banner" src="/wp-content/themes/mpg/images/bg_forgot.png"/>'+
            '</div>'+
            '<div class="user_tab_join">'+
                '<div class="login_form">'+
                    '<div class="login_top">'+
                        '<div class="title">Sign up</div>'+
                    '</div>'+
                    '<div class="cleanlogin-container login_bottom">'+
                        '<form class="cleanlogin-form fv-form fv-form-bootstrap registraion-form" method="post" action="#" novalidate="novalidate">'+
                            '<div class="join_results">'+
                                '<div class="indicator"></div>'+
                                '<div class="alert result-message"></div>'+
                            '</div>'+
                            '<fieldset>'+
                                '<div class="cleanlogin-field form-group">'+
                                    '<input class="cleanlogin-field-username" type="text" name="user_login" value="" placeholder="Username" data-fv-notempty="true" data-fv-notempty-message="Username is required" data-fv-stringlength="true" data-fv-stringlength-min="4" data-fv-stringlength-max="12" data-fv-stringlength-message="The username must be greater than 4 and less than 12 characters" data-fv-field="user_login">'+
                                '</div>'+
                                '<div class="cleanlogin-field form-group">'+
                                    '<input class="cleanlogin-field-password" type="password" name="user_pass" value="" autocomplete="off" placeholder="Password" data-fv-notempty="true" data-fv-notempty-message="The password is required" data-fv-stringlength="true" data-fv-stringlength-min="4" data-fv-stringlength-max="12" data-fv-stringlength-message="The password must be greater than 4 and less than 12 characters" data-fv-field="pass1">'+
                                '</div>'+
                                '<div class="cleanlogin-field form-group">'+
                                    '<input class="cleanlogin-field-email" type="email" name="user_email" value="" placeholder="E-mail" data-fv-notempty="true" data-fv-notempty-message="Email is required" data-fv-emailaddress="true" data-fv-emailaddress-message="Enter a valid email address" data-fv-field="user_email">'+
                                '</div>'+
                            '</fieldset>'+
                            '<div>'+
                                '<input type="submit" class="join_button" value="JOIN MR PORN GEEK NOW!" name="submit" onclick1="this.form.submit(); this.disabled = true;">'+
                                '<input type="hidden" name="action" value="register">'+
                            '</div>'+
                            '<div class="already_have is_desktop">'+
                                'Already Have an Account? <a class="popup_link_login" href="/login/">Log in now</a>'+
                            '</div>'+

                            '<div class="already_have is_mobile">'+
                                'By registering on Mr Porn Geek. I certify I am at least 18 years old and have read and agree to its <a href="/terms/">Terms of Use</a> and <a href="/privacy-policy/">Privacy Policy</a>.'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                '</div>'+

                '<img class="login_banner" src="/wp-content/themes/mpg/images/bg_signup.png"/>'+
            '</div>'+
        '</div>'+
    '</div>';



			/*postTextRequest(ajaxAdminEndpoint, {
				action:'get_login_form'
			}, function (result) {

				let loginHtml = '<a class="login_popup_close"><img src="'+themeBase+'images/btn_close.png"/></a>'+result;

				var e = document.createElement('div');
				e.setAttribute('id', 'login_popup');
				e.innerHTML = loginHtml;

				document.body.appendChild(e);

				renderLoginForm();
			});*/

			let loginHtml = '<a class="login_popup_close"><img src="'+themeBase+'images/btn_close.png"/></a>'+htmlLogin;

			var e = document.createElement('div');
			e.setAttribute('id', 'login_popup');
			e.innerHTML = loginHtml;

			document.body.appendChild(e);

			//afrenderLoginForm();
		}
	}
}
const renderLoginForm = () => {
	if(!isLoggedUser){
		if(!document.querySelector('#login_popup')){
			loadLoginForm();

			setTimeout(function (){
				if(document.querySelector('#login_popup')){
					document.querySelector('#login_popup').classList.toggle('is-open');

					initLoginScripts();
				}
			}, 300)
		}else{
			if(document.querySelector('#login_popup')){
				document.querySelector('#login_popup').classList.toggle('is-open');

				initLoginScripts();
			}
		}

	}

}
const closeLoginPopups = () => {
	if(document.querySelector('#login_popup')){
		document.querySelector('#login_popup').classList.remove('is-open');
	}
}
function toggleLoginPopups(type){
	let userPopup = document.querySelector('.user_container_popup');
	if(userPopup){
		if(type=='login'){
			userPopup.classList.remove('join');
			userPopup.classList.remove('forgot');
			userPopup.classList.add('login');

			initLoginScripts();
		}else if(type=='join'){
			userPopup.classList.remove('login');
			userPopup.classList.remove('forgot');
			userPopup.classList.add('join');

			initRegistration();
		}else if(type=='forgot'){
			userPopup.classList.remove('login');
			userPopup.classList.remove('join');
			userPopup.classList.add('forgot');

			initForgot();
		}
	}
}

