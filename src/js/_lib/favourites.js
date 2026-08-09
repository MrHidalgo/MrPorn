/**
 * Favourites add / remove.
 *
 * These live here rather than in _lib/frontpage.js because the favourites dropdown renders on
 * every page (themes/mpg/header.php) while frontpage.js is excluded from app.js by
 * gulp/task/javascript.js:24 and only enqueued on the front page - so removeFavourite and
 * addToFavourites were undefined everywhere except the homepage, and every click on the
 * remove button was a silent ReferenceError.
 */

function isLoggedIn(){

}

function addToFavourites(siteId){
	postRequest(ajaxEndpoint, {
		action:'add_to_fav',
		site:siteId
	}, function (res) {
		renderFavourites();
	});
}

/**
 * Ids arrive as numbers from the JSON payload but as strings from dataset, so compare loosely.
 * ArrayUtils.remove() is not usable here - it matches with indexOf, i.e. strictly.
 */
function removeFavouriteId(list, favId){
	if(!Array.isArray(list)){
		return false;
	}

	const index = list.findIndex(function (id) {
		return String(id) === String(favId);
	});

	if(index === -1){
		return false;
	}

	list.splice(index, 1);

	return true;
}

/**
 * markFavourites() (_lib/header.js:161) clears is-active on .list__box-favorites only, but sets
 * it on three different selectors, and renderFavourites() - which we deliberately skip - is the
 * only thing that clears [favorites-toggle-js]. So clear every one of them for this id here, or
 * the site stays visibly favourited on the page after being removed from the list.
 */
function clearFavouriteHighlight(favId){
	const selectors = [
		'[data-id="' + favId + '"] [favorites-toggle-js]',
		'[favorites-toggle-js][data-id="' + favId + '"]',
		'.list__box-favorites[data-id="' + favId + '"]',
		'.list__specification-favorites[data-id="' + favId + '"]',
		'.list__box__item-fav[data-id="' + favId + '"]'
	];

	selectors.forEach(function (selector) {
		document.querySelectorAll(selector).forEach(function (el) {
			el.classList.remove('is-active');
		});
	});
}

/**
 * The "N." prefix is baked into the markup as literal text (_lib/header.js:120 desktop,
 * :144 mobile), so removing a row leaves a gap in the sequence unless both lists are renumbered.
 */
function renumberFavourites(){
	document.querySelectorAll('[view-favorites-drop-js] .header__view-link').forEach(function (row, i) {
		const ordinal = row.querySelector('div:first-child span');
		if(ordinal){
			ordinal.textContent = (i + 1) + '.';
		}
	});

	document.querySelectorAll('.mobile_fav_link .site_listitem').forEach(function (row, i) {
		const ordinal = row.querySelector('.id_number');
		if(ordinal){
			ordinal.textContent = (i + 1) + '.';
		}
	});
}

/**
 * Remove a favourite optimistically.
 *
 * The row disappears on click rather than after the round-trip, because the previous behaviour
 * waited on remove_fav and then a second is_logged request before re-rendering the whole
 * dropdown - long enough that users assumed nothing had happened and clicked again.
 *
 * Safe to do optimistically: the server delete is idempotent (mpg-data/user.php:112) and returns
 * status true whether or not a row existed. If the request fails, or reports status false because
 * the login cookie expired, everything is put back.
 */
function removeFavourite(favItem){
	if(favItem.dataset.pending === '1'){
		return;
	}

	const favId = favItem.dataset.id;
	const row = favItem.closest('.header__view-link');

	if(!favId || !row){
		return;
	}

	favItem.dataset.pending = '1';

	// Comment nodes hold each row's original position so a rollback restores it in place
	// rather than appending it to the end of the list.
	const marker = document.createComment('fav-' + favId);
	row.parentNode.insertBefore(marker, row);

	const mobileRow = document.querySelector('.mobile_fav_link .site_listitem.fv_' + favId);
	const mobileMarker = mobileRow ? document.createComment('fav-' + favId) : null;
	if(mobileRow){
		mobileRow.parentNode.insertBefore(mobileMarker, mobileRow);
	}

	const wasInFavouriteList = removeFavouriteId(favouriteList, favId);
	const wasInWindowList = removeFavouriteId(window.fav_list, favId);

	row.remove();
	if(mobileRow){
		mobileRow.remove();
	}
	clearFavouriteHighlight(favId);
	renumberFavourites();

	const settle = function () {
		if(marker.parentNode){
			marker.remove();
		}
		if(mobileMarker && mobileMarker.parentNode){
			mobileMarker.remove();
		}
		delete favItem.dataset.pending;
	};

	const restore = function () {
		if(marker.parentNode){
			marker.parentNode.insertBefore(row, marker);
		}
		if(mobileRow && mobileMarker && mobileMarker.parentNode){
			mobileMarker.parentNode.insertBefore(mobileRow, mobileMarker);
		}
		if(wasInFavouriteList){
			favouriteList.push(favId);
		}
		if(wasInWindowList){
			window.fav_list.push(favId);
		}
		settle();
		renumberFavourites();
		markFavourites();
	};

	postRequest(ajaxEndpoint, {
		action:'remove_fav',
		site:favId
	}, function (res) {
		if(res && res.status === 'true'){
			settle();
		}else{
			restore();
		}
	}).catch(function () {
		// postRequest rethrows and never calls the callback on a failed request (_lib/ajax.js:50).
		restore();
	});
}
