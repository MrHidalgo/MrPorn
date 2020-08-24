let letterData = [];

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
	if(isDark=='1'){
		document.documentElement.classList.remove('light');
		toggleSwitch.checked = true;
	}else{
		document.documentElement.classList.add('light');
		toggleSwitch.checked = false;
	}
}
initTheme();

const renderFavourites = () => {
	if(isMobileDevice){
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
			document.querySelectorAll('.is-active[favorites-toggle-js]').forEach(function (fav) {
				fav.classList.remove('is-active');
			})

			if(res.fav_list){
				res.fav_list.map(function (fav, index) {
					favouritesHtml += '<div class="header__view-link" >' +
						'<div><span>'+(index+1)+'.</span></div>' +
						'<div><img src="'+fav.favicon+'"/><p><a href="'+fav.permalink+'">'+fav.title+'</a></p></div>' +
						'<div><button type="button" data-id="'+fav.id+'" un-favorites-js><i class="icon-font icon-delete"></i></button><button type="button"><i class="icon-font icon-search"></i></button></div>' +
						'</div>';

					let favLink = document.querySelector('[data-id="'+fav.id+'"] [favorites-toggle-js]');
					if(favLink){
						favLink.classList.add('is-active');
					}
				})

				favouritesDropDown.innerHTML = favouritesHtml;
			}
		}
	});

}

const letterSearch = () => {
	postRequest(ajaxEndpoint, {
		action:'letter_search'
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
	});
}

const renderSorting = () => {
	let letterHtml = '';

	Object.entries(letterData).forEach(function (letter){
		letterHtml += '<a class="sort__drop-link" sort-letter-collapse-js data-letter="'+letter[0]+'">'+letter[0].toUpperCase()+'</a>';
	});
	letterHtml += '<div class="sort__drop-inner"></div>';

	const sortcontainer = document.querySelector('[sort-node-js]');
	sortcontainer.innerHTML = letterHtml;
}

const onSortLetterClick = (letterItem) => {
	let letter = letterItem.dataset.letter;
	let suggessionIndex = 1;
	let letterSuggessions = '';

	letterData[letter].forEach(function (suggession){
		let suggessionName = suggession.name;
		let uL = letter.toUpperCase();
		suggessionName = suggessionName.replace(letter, '<span>'+letter+'</span>');
		suggessionName = suggessionName.replace(uL, '<span>'+uL+'</span>');

		let siteFree = suggession.free;
		let siteHd = suggession.hd;

		let htmlFree = '';
		if(siteFree){
			htmlFree = '<a href="'+siteFree+'" class="site_free"><span>Free</span></a>';
		}
		let htmlHd = '';
		if(siteHd){
			htmlHd = '<a href="'+siteHd+'"><img src="'+themeBase +'images/img-badge-premium.png" srcset="'+themeBase+'images/img-badge-premium@2x.png 2x" alt=""/></a>';
		}


		letterSuggessions += '<div class="sort__collapse">' +
			'<a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-'+suggessionIndex+'">'+
			'<div><span>#'+suggessionIndex+'</span></div>'+
			'<div><img src="images/images-black-porn-sites.png" srcset="images/images-black-porn-sites@2x.png 2x" alt=""/>'+
			'<p>'+suggessionName+'</p>'+
			'</div>'+
			'<div><i class="icon-font icon-arrow-angle"></i></div></a>'+
			'<div class="sort__collapse-body" id="sort-collapse-'+suggessionIndex+'" collapse-body-js>'+
			htmlFree +
			htmlHd+
			'</div>'+
			'</div>';

		suggessionIndex++;
	});

	const sortSuggesionContainer = document.querySelector('.sort__drop-inner');
	sortSuggesionContainer.classList.add('is-open');
	letterItem.classList.add('is-active');
	sortSuggesionContainer.innerHTML = letterSuggessions;

}

const onSortToggle = (sortToggle) => {
	let sortContainer = sortToggle.dataset.container;

	let activeSortCollapse = document.querySelector('.sort__collapse-body.is-open');
	if(activeSortCollapse){
		activeSortCollapse.classList.remove('is-open');
	}
	let sC = document.querySelector('#'+sortContainer);
	if(sC){
		if(sC.classList.contains('is-open')){
			sC.classList.remove('is-open');
		}else{
			sC.classList.add('is-open');
		}
	}
}


