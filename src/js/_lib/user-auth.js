(function () {

	function initLoginScripts(){
		if(document.querySelector('a#show_login')){
			document.querySelector('a#show_login').onclick = function(e){
				FX.fadeIn(document.querySelector(".ajax_login_overlay"), {
					duration: 500,
					complete: function(){

					}
				});
				FX.fadeIn(document.querySelector("form#login"), {
					duration: 500,
					complete: function(){

					}
				});
				e.preventDefault();
			}
		}
		if(document.querySelector('.ajax_login_overlay')){
			FX.fadeOut(document.querySelector("form#login"), {
				duration: 500,
				complete: function(){

				}
			});
			FX.fadeOut(document.querySelector(".ajax_login_overlay"), {
				duration: 500,
				complete: function(){

				}
			});
			hide(document.querySelector('form#register_form'));
			document.querySelector('.ajax_login .status').innerHTML = '';
			document.querySelector('#registration-error-message').innerHTML = '';
			hide(document.querySelector('form#login'));
			document.querySelector('form#register_form .field input').value = '';
		}

		if(document.querySelector('form.ajax-login-form')){
			document.querySelector('form.ajax-login-form').onsubmit = function(e){
				e.preventDefault();
				var loginForm = e.target;
				var loginStatus = loginForm.querySelector('p.status');
				let loginBtn = loginForm.querySelector('.btn_ajax');
				loginBtn.classList.add('loading');


				grecaptcha.ready(function () {
					grecaptcha.execute('6Lfk0QkhAAAAAOX44ynDJ4xteoMvyUcXHrTkGDYs', { action: 'mpg_login' }).then(function (token) {
						var recaptchaResponse = document.getElementById('recaptchaResponse');
						recaptchaResponse.value = token;

						show(loginStatus);

						loginStatus.classList.remove('alert-danger');

						var reqData = {
							'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
							'username': loginForm.querySelector('[name=username]').value,
							'password': loginForm.querySelector('[name=password]').value,
							'rec_token':token
						}

						postRequest('/wp-json/mpg/user/login/', reqData, function (data) {
							loginBtn.classList.remove('loading');
							if (data.loggedin === true){
								document.location.href = '/';
							}else{
								loginStatus.innerHTML = data.message;
								loginStatus.classList.add('alert-danger');
							}
						});
					});
				});

				e.preventDefault();
			}
		}
	}

	function initForgot(){
		if(document.querySelector('.forgot_page .cleanlogin-form')){
			document.querySelector('.forgot_page .cleanlogin-form').onsubmit = function(e){
				e.preventDefault();
				var forgotForm = e.target;
				var forgotStatus = forgotForm.querySelector('p.status');
				forgotStatus.classList.remove('alert-danger');

				let forgotBtn = forgotForm.querySelector('.btn_ajax');
				forgotBtn.classList.add('loading');


				let mobileTopForget = document.querySelector('.is_mobile.top_forgot_text');

				grecaptcha.ready(function () {
					grecaptcha.execute('6Lfk0QkhAAAAAOX44ynDJ4xteoMvyUcXHrTkGDYs', { action: 'mpg_forgot' }).then(function (token) {
						var recaptchaResponse = document.getElementById('recaptchaResponse');
						recaptchaResponse.value = token;

						var reqData = {
							'action': 'forgot_password', //calls wp_ajax_nopriv_ajaxlogin
							'username': forgotForm.querySelector('[name=username]').value,
							'website': forgotForm.querySelector('[name=website]').value,
							'rec_token':token
						}

						postRequest('/wp-json/mpg/user/forgot/', reqData, function (data) {
							forgotBtn.classList.remove('loading');

							mobileTopForget.style.display = 'none';
							if (data.status === 'ok'){
								forgotForm.innerHTML = '<div class="forgot_success">An email with password reset instructions has been sent to your email address.<br/><br/><span class="check_folder">(Please check your spam folder in case it\'s inside there)</span></div>';
								forgotStatus.classList.remove('alert-danger');
							}else{
								forgotStatus.innerHTML = data.message;
								forgotStatus.classList.add('alert-danger');
							}
						});
					});
				});

				e.preventDefault();
			}
		}

		if(document.querySelector('#update_password')){
			document.querySelector('#update_password').onsubmit = function(e){
				e.preventDefault();
				var forgotForm = e.target;
				var forgotStatus = forgotForm.querySelector('p.status');
				forgotStatus.classList.remove('alert-danger');

				let forgotBtn = forgotForm.querySelector('.btn_ajax');
				forgotBtn.classList.add('loading');

				grecaptcha.ready(function () {
					grecaptcha.execute('6Lfk0QkhAAAAAOX44ynDJ4xteoMvyUcXHrTkGDYs', { action: 'mpg_reset' }).then(function (token) {
						var recaptchaResponse = document.getElementById('recaptchaResponse');
						recaptchaResponse.value = token;

						var reqData = {
							'action': 'update_password', //calls wp_ajax_nopriv_ajaxlogin
							'key': forgotForm.querySelector('[name=key]').value,
							'login': forgotForm.querySelector('[name=login]').value,
							'password': forgotForm.querySelector('[name=password]').value,
							'password_2': forgotForm.querySelector('[name=password_2]').value,
							'rec_token':token
						}

						postRequest('/wp-json/mpg/user/reset/', reqData, function (data) {
							forgotBtn.classList.remove('loading');

							if (data.status === 'ok'){
								forgotForm.innerHTML = '<div class="forgot_success">Your password has been updated. Please <a href="/login/">Login</a></div>';
								forgotStatus.classList.remove('alert-danger');
							}else {
								forgotStatus.innerHTML = data.message;
								forgotStatus.classList.add('alert-danger');
							}
						});
					});
				});

				e.preventDefault();
			}
		}
	}

	function initRegistration(){

		if(document.querySelector('form.registraion-form')){
			document.querySelector('form.registraion-form').onsubmit = function(e){
				var registerForm = e.target;
				var formError = false;

				e.preventDefault();

				let registerBtn = registerForm.querySelector('.btn_ajax');
				registerBtn.classList.add('loading');

				var indicator = registerForm.querySelector('.indicator');
				var registerMessage = registerForm.querySelector('.result-message');

				var reg_user = registerForm.querySelector('[name=user_login]').value;
				var reg_pass = registerForm.querySelector('[name=user_pass]').value;
				var reg_mail = registerForm.querySelector('[name=user_email]').value;

				if(reg_user==''){
					registerForm.querySelector('[name=user_login]').classList.add('error');
					formError = true;
				}
				if(reg_pass==''){
					registerForm.querySelector('[name=user_pass]').classList.add('error');
					formError = true;
				}
				if(reg_mail=='' || !validateEmail(reg_mail)){
					registerForm.querySelector('[name=user_email]').classList.add('error');
					formError = true;
				}

				if(formError){
					registerBtn.classList.remove('loading');
					return false;
				}

				var useTurnstile = document.querySelector('.cf-turnstile') !== null;

				if (useTurnstile) {
					// Sign-up page: Turnstile flow
					var turnstileInput = document.querySelector('[name="cf-turnstile-response"]');
					var token = turnstileInput ? turnstileInput.value : '';
					if (!token) {
						registerBtn.classList.remove('loading');
						registerMessage.innerHTML = 'Please complete the security challenge.';
						registerMessage.classList.add('alert-danger');
						registerMessage.classList.remove('alert-success');
						show(registerMessage);
						return false;
					}
					show(indicator);
					hide(registerMessage);
					submitWithToken(registerForm, registerBtn, indicator, registerMessage, reg_user, reg_pass, reg_mail, token, 'cf-turnstile-response');
				} else {
					// Popup modal: reCAPTCHA flow
					grecaptcha.ready(function () {
						grecaptcha.execute('6Lfk0QkhAAAAAOX44ynDJ4xteoMvyUcXHrTkGDYs', { action: 'mpg_register' }).then(function (token) {
							show(indicator);
							hide(registerMessage);
							submitWithToken(registerForm, registerBtn, indicator, registerMessage, reg_user, reg_pass, reg_mail, token, 'rec_token');
						});
					});
				}

				return false;
			}
		}
	}

	function submitWithToken(registerForm, registerBtn, indicator, registerMessage, reg_user, reg_pass, reg_mail, token, tokenKey) {
		fetch('/wp-admin/admin-ajax.php?action=mpg_get_fresh_register_nonce')
			.then(function(r) { return r.json(); })
			.then(function(nonceResp) {
				var nonce = (nonceResp.success && nonceResp.data && nonceResp.data.nonce)
							  ? nonceResp.data.nonce : '';

				var reqData = {
					action: 'register_user',
					user_login: reg_user,
					user_pass: reg_pass,
					user_email: reg_mail,
					nonce: nonce
				};
				reqData[tokenKey] = token;

				postRequest('/wp-json/mpg/user/register/', reqData, function (response) {
					if( response ) {
						registerBtn.classList.remove('loading');
						hide(indicator);

						if( response.status === 'ok' ) {
							registerMessage.innerHTML = 'Your submission is complete.';
							registerMessage.classList.add('alert-success');
							registerMessage.classList.remove('alert-danger');
							show(registerMessage);
							document.location.href = '/';
						} else {
							registerMessage.innerHTML = response.message;
							registerMessage.classList.add('alert-danger');
							registerMessage.classList.remove('alert-success');
							show(registerMessage);
							if (tokenKey === 'cf-turnstile-response' && typeof turnstile !== 'undefined') {
								turnstile.reset();
							}
						}
					}
				});
			});
	}

	function validateEmail(mail){
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
			return (true)
		}
		return (false)
	}

	document.addEventListener('DOMContentLoaded', function () {
		initLoginScripts();
		initForgot();
		initRegistration();
	});

})();
