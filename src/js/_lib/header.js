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
			res.fav_list.map(function (fav, index) {
				favouritesHtml += '<a class="header__view-link" href="'+fav.permalink+'">' +
					'<div><span>'+(index+1)+'.</span></div>' +
					'<div><img src="'+fav.favicon+'"/><p>'+fav.title+'</p></div>' +
					'<div><button type="button"><i class="icon-font icon-delete"></i></button><button type="button"><i class="icon-font icon-search"></i></button></div>' +
					'</a>';
			})
			favouritesDropDown.innerHTML = favouritesHtml;
		}
	});

}

const renderSorting = () => {
		const sortingHtml = '<a class="sort__drop-link" href="#">A</a><a class="sort__drop-link" href="#">B</a><a class="sort__drop-link" href="#">C</a><a class="sort__drop-link" href="#">D</a><a class="sort__drop-link" href="#">E</a><a class="sort__drop-link" href="#">F</a><a class="sort__drop-link" href="#">G</a><a class="sort__drop-link" href="#">H</a><a class="sort__drop-link" href="#">I</a><a class="sort__drop-link" href="#">J</a><a class="sort__drop-link" href="#">K</a><a class="sort__drop-link" href="#">L</a><a class="sort__drop-link" href="#">M</a><a class="sort__drop-link" href="#">N</a><a class="sort__drop-link" href="#">O</a><a class="sort__drop-link" href="#">P</a><a class="sort__drop-link" href="#">Q</a><a class="sort__drop-link" href="#">R</a><a class="sort__drop-link" href="#">S</a><a class="sort__drop-link" href="#">T</a><a class="sort__drop-link" href="#">U</a><a class="sort__drop-link" href="#">V</a><a class="sort__drop-link" href="#">W</a><a class="sort__drop-link" href="#">X</a><a class="sort__drop-link" href="#">Y</a><a class="sort__drop-link" href="#">Z</a>'+
                      '<div class="sort__drop-inner">'+
                        '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-1">'+
                            '<div><span>#1</span></div>'+
                            '<div><img src="img/img-black-porn-sites.png" srcset="img/img-black-porn-sites@2x.png 2x" alt="">'+
                              '<p><span>B</span>lack Porn Sites</p>'+
                            '</div>'+
                            '<div><i class="icon-font icon-arrow-angle"></i></div></a>'+
                          '<div class="sort__collapse-body" id="sort-collapse-1" collapse-body-js>'+
                            '<button type="button"><span>Free</span></button><img src="img/img-badge-premium.png" srcset="img/img-badge-premium@2x.png 2x" alt="">'+
                          '</div>'+
                        '</div>'+
                        '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-2">'+
                            '<div><span>#2</span></div>'+
                            '<div><img src="img/img-blog.png" srcset="img/img-blog@2x.png 2x" alt="">'+
                              '<p>Porn <span>B</span>logs</p>'+
                            '</div>'+
                            '<div><i class="icon-font icon-arrow-angle"></i></div></a>'+
                          '<div class="sort__collapse-body" id="sort-collapse-2" collapse-body-js>'+
                            '<button type="button"><span>Free</span></button><img src="img/img-badge-premium.png" srcset="img/img-badge-premium@2x.png 2x" alt="">'+
                          '</div>'+
                        '</div>'+
                        '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-3">'+
                            '<div><span>#3</span></div>'+
                            '<div><img src="img/img-best-webcam-girls.png" srcset="img/img-best-webcam-girls@2x.png 2x" alt="">'+
                              '<p><span>B</span>est Webcam Girls</p>'+
                            '</div>'+
                            '<div><i class="icon-font icon-arrow-angle"></i></div></a>'+
                          '<div class="sort__collapse-body" id="sort-collapse-3" collapse-body-js>'+
                            '<button type="button"><span>Free</span></button><img src="img/img-badge-premium.png" srcset="img/img-badge-premium@2x.png 2x" alt="">'+
                          '</div>'+
                        '</div>'+
                        '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-4">'+
                            '<div><span>#4</span></div>'+
                            '<div><img src="img/img-best-adult-ad-networks.png" srcset="img/img-best-adult-ad-networks@2x.png 2x" alt="">'+
                              '<p><span>B</span>est Adult Ad Networks</p>'+
                            '</div>'+
                            '<div><i class="icon-font icon-arrow-angle"></i></div></a>'+
                          '<div class="sort__collapse-body" id="sort-collapse-4" collapse-body-js>'+
                            '<button type="button"><span>Free</span></button><img src="img/img-badge-premium.png" srcset="img/img-badge-premium@2x.png 2x" alt="">'+
                          '</div>'+
                        '</div>'+
                      '</div>';

	const sortcontainer = document.querySelector('[sort-node-js]');
	sortcontainer.innerHTML = sortingHtml;
}
