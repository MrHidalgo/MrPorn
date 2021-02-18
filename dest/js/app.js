"use strict";

/*
* ============================
*
* Include lib:
* - preventBehavior.js;
* - swiper.js;
* - hamburger;
*
* ============================
* */
function setWithExpiry(key, value, ttl) {
  var now = new Date(); // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire

  var item = {
    value: value,
    expiry: now.getTime() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  var itemStr = localStorage.getItem(key); // if the item doesn't exist, return null

  if (!itemStr) {
    return null;
  }

  var item = JSON.parse(itemStr);
  var now = new Date(); // compare the expiry time of the item with the current time

  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

Element.prototype.parents = function (selector) {
  var elements = [];
  var elem = this;
  var ishaveselector = selector !== undefined;

  while ((elem = elem.parentElement) !== null) {
    if (elem.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    if (!ishaveselector || elem.matches(selector)) {
      elements.push(elem);
    }
  }

  return elements;
};

Function.prototype.extend = function () {
  var fns = [this].concat([].slice.call(arguments));
  return function () {
    for (var i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments);
    }
  };
};

Array.prototype.remove = function () {
  var what,
      a = arguments,
      L = a.length,
      ax;

  while (L && this.length) {
    what = a[--L];

    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }

  return this;
};

window.mobileAndTabletcheck = function () {
  var check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
};

var show = function show(elem) {
  if (elem) {
    elem.style.display = 'block';
  }
};

var hide = function hide(elem) {
  if (elem) {
    elem.style.display = 'none';
  }
};

var removeElement = function removeElement(elem) {
  if (elem) {
    elem.remove();
  }
};

var toggleClass = function toggleClass(element, className) {
  if (element.classList) {
    element.classList.toggle(className);
  } else {
    // For IE9
    var classes = element.className.split(" ");
    var i = classes.indexOf(className);
    if (i >= 0) classes.splice(i, 1);else classes.push(className);
    element.className = classes.join(" ");
  }
};

function doScrolling(elementY, duration) {
  var startingY = window.pageYOffset;
  var diff = elementY - startingY;
  var start; // Bootstrap our animation - it will get called right before next frame shall be rendered.

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp; // Elapsed milliseconds since start of scrolling.

    var time = timestamp - start; // Get percent of completion in range [0, 1].

    var percent = Math.min(time / duration, 1);
    window.scrollTo(0, startingY + diff * percent); // Proceed with animation as long as we wanted it to.

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

var createCookie = function createCookie(name, value, days) {
  var expires;

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }

  document.cookie = name + "=" + value + expires + "; path=/";
};

var isMobileOrTablet = window.mobileAndTabletcheck();

function findAncestor(el, sel) {
  while ((el = el.parentElement) && !(el.matches || el.matchesSelector).call(el, sel)) {
    ;
  }

  return el;
}

function getRequest() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  var searchParams = Object.keys(data).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&'); // Default options are marked with *

  var response = fetch(url, {
    method: 'GET',
    // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    mode: 'cors',
    // no-cors, *cors, same-origin
    cache: 'no-cache',
    // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    // include, *same-origin, omit
    redirect: 'follow',
    // manual, *follow, error
    referrerPolicy: 'no-referrer',
    // no-referrer, *client
    body: searchParams // body data type must match "Content-Type" header

  }).then(function (response) {
    return response.json();
  }).then(function (out) {
    console.log('Checkout this JSON! ', out);
    console.log(data);
    callback(out);
  })["catch"](function (err) {
    console.log(err);
    throw err;
  });
}

function postRequest() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  var searchParams = Object.keys(data).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&'); // Default options are marked with *

  var response = fetch(url, {
    method: 'POST',
    // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    mode: 'cors',
    // no-cors, *cors, same-origin
    cache: 'no-cache',
    // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    // include, *same-origin, omit
    redirect: 'follow',
    // manual, *follow, error
    referrerPolicy: 'no-referrer',
    // no-referrer, *client
    body: searchParams // body data type must match "Content-Type" header

  }).then(function (response) {
    return response.json();
  }).then(function (out) {
    callback(out);
  })["catch"](function (err) {
    console.log(err);
    throw err;
  });
}

function postTextRequest() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  var searchParams = Object.keys(data).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&'); // Default options are marked with *

  var response = fetch(url, {
    method: 'POST',
    // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    mode: 'cors',
    // no-cors, *cors, same-origin
    cache: 'no-cache',
    // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    // include, *same-origin, omit
    redirect: 'follow',
    // manual, *follow, error
    referrerPolicy: 'no-referrer',
    // no-referrer, *client
    body: searchParams // body data type must match "Content-Type" header

  }).then(function (response) {
    return response.text();
  }).then(function (out) {
    callback(out);
  })["catch"](function (err) {
    console.log(err);
    throw err;
  });
}

var webworkerFrontpage;
var currentBannerTimeout;
var lastActiveHoverBox;
var lastTranslate = 0;
var isMouseDown = false;
var _greenBarLeft = 0;
var _greenBarWidth = 20;
var _greenBarCurrent = 0;
var _greenBarAnimSpeed = 0;
var _greenBarDuration = 500;
var _greenBarFrom = 0;

var _lastGreenBar;

var _touchStartPosition = 0;

var _greenBarTimer;

var _isGreenBarMoving = false;
var isAnimationStarted = false;
var maxLeft;
var minLeft;
var swiperSlideWidth = 230;

var initHomeLazyLoad = function initHomeLazyLoad() {
  var listElm = document.querySelector('#infinite-list');
  var nextItem = 1;

  var loadMore = function loadMore() {
    for (var i = 0; i < 20; i++) {
      var item = document.createElement('li');
      item.innerText = 'Item ' + nextItem++;
      listElm.appendChild(item);
    }
  }; // Detect when scrolled to bottom.


  listElm.addEventListener('scroll', function () {
    if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
      loadMore();
    }
  }); // Initially load some items.

  loadMore();
};

var loadHomeData = function loadHomeData() {
  var currentLang = document.documentElement.getAttribute('lang');
  console.log('Loading home data');
  var url = '/wp-json/mpg/home/';

  if (currentLang != 'en') {
    url = '/wp-json/mpg/home/?lang=' + currentLang;
  }

  homeData = getWithExpiry("homepage_data_" + dataTime + '_' + currentLang);

  if (homeData) {
    renderAllOtherCategories();
  } else {
    fetch(url).then(function (res) {
      return res.json();
    }).then(function (out) {
      homeData = out;

      if (homeData.code == 'rest_login_required') {} else {
        setWithExpiry("homepage_data_" + dataTime + '_' + currentLang, homeData, 30 * 60 * 1000);
      } //renderAllOtherCategories();


      setTimeout(renderAllOtherCategories, 100);
    })["catch"](function (err) {
      throw err;
    });
  }
};

function renderHompageSiteSlide(category, index) {
  var siteItem = homeData.categories[category].sites[index];

  if (siteItem) {
    var siteId = siteItem.id;
    var siteLink = siteItem.link;
    var siteName = siteItem.name;
    var siteThumb = siteItem.banner_image ? siteItem.banner_image : siteItem.thumb;
    var siteLogo = siteItem.logo ? siteItem.logo.src : '';
    var btnFav = isLoggedUser != "" ? '<button class="list__box-favorites" type="button" data-id="' + siteId + '" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>' : '<button class="list__box-favorites" type="button" data-id="' + siteId + '" more-toggle-js><i class="icon-font icon-arrow-angle icon-more-arrow"></i></button>';
    var btnFavToolTip = isLoggedUser != "" ? 'Add To Favourites' : 'More Info';
    var slideHtml = '<div class="list__box nolazy" list-box-js data-id="' + siteId + '" style="background-image: url(' + siteThumb + ')">' +
    /*'<div class="list__box-overlay"></div>'+*/
    '<div class="list__box-border"></div>' + '<a href="' + siteLink + '" hreflang="' + currentLang + '" target="_blank"></a>' + //'<img class="list__box-logo nolazy" src="'+siteLogo+'" alt=""/>'+
    '<div class="list__box-details">' + '<div class="list__box-details-left">' + '<a class="site_link" href="' + siteLink + '" hreflang="' + currentLang + '" target="_blank">' + '<i class="icon-font icon-out"></i>' + '<p class="list__box-details-title">' + siteName + '</p>' + '</a>' + '<div class="list__rating"><span>User Rating:</span>' + '<div><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star-fill"></i></div>' + '</div>' + '</div>' + '<div class="list__box-details-right">' + '<button class="list__box-like" type="button" data-id="' + siteId + '" like-toggle-js><i class="icon-font icon-like"></i></button>' + '<button class="list__box-dislike" type="button" data-id="' + siteId + '" dislike-toggle-js><i class="icon-font icon-like"></i></button>' + '<div class="c-popper">' + btnFav + '<div class="c-poppertext">' + '<u>' + btnFavToolTip + '</u>' + '<u>Remove From Favourites</u>' + '</div>' + '</div>' + '</div>' + '</div>' + '<button class="list__box-more" type="button"><i class="icon-font icon-arrow-angle"></i></button>' + '</div>';
    return slideHtml;
  }

  return false;
}

function renderSiteHoverContent(category, index) {
  if (!homeData) {
    return false;
  }

  if (homeData.categories === undefined) {
    return false;
  }

  if (!homeData.categories[category]) {
    return false;
  }

  var siteItem = homeData.categories[category].sites[index];

  if (siteItem) {
    var siteId = siteItem.id;
    var siteLink = siteItem.link;
    var siteName = siteItem.name;
    var siteThumb = siteItem.thumb;
    var btnFav = isLoggedUser != "" ? '<button class="list__box-favorites" type="button" data-id="' + siteId + '" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>' : '<button class="list__box-favorites" type="button" data-id="' + siteId + '" more-toggle-js><i class="icon-font icon-arrow-angle icon-more-arrow"></i></button>';
    var btnFavToolTip = isLoggedUser != "" ? 'Add To Favourites' : 'More Info';
    var hoverContent = '<div class="list__box-details-left">' + '<a class="site_link" href="' + siteLink + '" target="_blank">' + '<i class="icon-font icon-out"></i>' + '<p class="list__box-details-title">' + siteName + '</p>' + '</a>' + '<div class="list__rating"><span>User Rating:</span>' + '<div><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star-fill"></i></div>' + '</div>' + '</div>' + '<div class="list__box-details-right">' + '<button class="list__box-like" type="button" data-id="' + siteId + '" like-toggle-js><i class="icon-font icon-like"></i></button>' + '<button class="list__box-dislike" type="button" data-id="' + siteId + '" dislike-toggle-js><i class="icon-font icon-like"></i></button>' + '<div class="c-popper">' + btnFav + '<div class="c-poppertext">' + '<u>' + btnFavToolTip + '</u>' + '<u>Remove From Favourites</u>' + '</div>' + '</div>' + '</div>';
    return hoverContent;
  }

  return false;
}

function renderSiteBottomBanner(category, index) {
  var siteItem = homeData.categories[category].sites[index];

  if (siteItem) {
    var siteId = siteItem.id;
    var bannerType = siteItem.banner_type;
    var bannerImage = siteItem.banner_image;
    var bannerVideo = siteItem.banner_video;
    var bannerVideoPoster = siteItem.banner_video_poster;
    var siteLogo = siteItem.logo;
    var tagLIne = siteItem.tagline;

    if (tagLIne != '') {
      tagLIne = tagLIne.replaceAll("\'", "'");
      tagLIne = tagLIne.replaceAll("\\'", "'");
    }

    var siteUrl = siteItem.url;
    var bannerRight = '';
    var bannerClass = '';

    if (bannerType == 'image') {
      bannerClass = 'list__specification--banner';

      if (bannerImage != '') {
        bannerRight = '<div class="list__specification-right">' + '<div><img src="' + contentBase + 'screenshots/' + siteId + '.png"/></div>' + '</div>';
      }
    } else {
      bannerClass = 'list__specification--video';

      if (bannerVideo != '') {
        bannerRight = '<div class="list__specification-right">' + '<div video-parent-js>' + '<!--video(preload="none" video-js)-->' + '<video preload="none" autoplay loop playsinline poster="' + bannerVideoPoster + '" video-js>' + '<source src="' + bannerVideo + '" type="video/mp4">' + '</video>' + '<a class="list__specification-play is-active" video-toggle-js><i class="icon-font icon-play-button" video-play-js></i></a>' + '<a class="list__specification-pause is-active" video-pause-js><i class="icon-font icon-pause"></i></a>' + '</div>' + '</div>';
      }
    }

    var moreSites = '';
    var moreSiteCount = 0;
    homeData.categories[category].sites.map(function (moreSite, index) {
      if (moreSiteCount < 6 && moreSite.id != siteId) {
        var moreSiteLogo = moreSite.logo ? moreSite.logo.src : '';
        /*moreSites +='<a class="list__box" list-box-more-js href="'+moreSite.link+'" data-id="'+moreSite.id+'" data-count="1" style="background-image: url(https://mpg-images.b-cdn.net'+moreSite.banner_image+')">'+
        	'<div class="list__box-border"></div>' +
        	'</a>';*/

        moreSites += '<div class="list__box_more_item" list-box-more-js  data-id="' + moreSite.id + '" data-count="1" >' + //'<a class="list__box_more_thumb" href="'+moreSite.link+'" style="background-image: url(https://mpg-images.b-cdn.net'+moreSite.banner_image+')"></a>' +
        '<a class="list__box_more_thumb" href="' + moreSite.link + '" style="background-image: url(' + moreSite.banner_image + ')"></a>' + '</div>';
        moreSiteCount++;
      }
    });
    var bannerHtml = '<div class="list__specification ' + bannerClass + '" data-id="' + siteId + '">' + '<a class="list__specification-close" ><i class="icon-font icon-close"></i></a>' + '<div class="list__specification__inner">' + '<div class="list__specification-header">' + '<img class="list__specification-logo" src="' + siteLogo + '"/>' + '<a class="list__specification-close" >' + '<i class="icon-font icon-close"></i>' + '</a>' + '</div>' + '<div class="list__specification-left">' + '<div>' + '<img class="list__specification-logo" src="' + siteLogo + '"/>' + '<div class="list__specification-action" spec-actionNode-js>' + '<div><a class="list__specification-visit nav_link" href="' + siteUrl + '" target="_blank">VISIT WEBSITE</a></div>' + '<div><a class="list__specification-read nav_link" href="' + siteItem.link + '" hreflang="' + currentLang + '" target="_blank">READ REVIEW</a></div>' + '<div class="list__specification-action-desc">' + '<p>' + tagLIne + '</p>' + '</div>' + '<div class="list__specification-action-skip"><a class="list__specification-circle list__specification-skip" data-id="' + siteId + '" data-category="' + category + '" data-index="' + index + '" spec-skip-js><i class="icon-font icon-point"></i><span>Skip</span></a></div>' + '<div class="list__specification-action-circle">' + '<button class="list__specification-circle list__specification-like" data-like="' + siteId + '" spec-like-js><i class="icon-font icon-like"></i><span>Like</span></button>' + '</div>' + '<div class="list__specification-action-circle">' + '<button class="list__specification-circle list__specification-dislike" data-dislike="' + siteId + '" spec-dislike-js><i class="icon-font icon-like"></i><span>Dislike</span></button>' + '</div>' + '<div class="list__specification-action-circle">' + '<div class="c-popper">' + '<button class="list__specification-circle list__specification-favorites" data-id="' + siteId + '" data-favorites="' + siteId + '" spec-favorites-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i><span>Favorites</span></button>' + '<div class="c-poppertext">' + '<u>Add To Favourites</u>' + '<u>Remove From Favourites</u>' + '</div>' + '</div>' + '</div>' + '</div>' + '<p class="list__specification-desc">' + tagLIne + '</p>' + '</div>' + '</div>' + bannerRight + '<div class="list__specification-more">' + '<div>' + '<p>More Like This</p>' + '</div>' + '<div class="site_banner_more_sites">' + moreSites + '</div>' + '</div>' + '</div>' + getPopupSimilarSites(category, siteId) + '</div>'; //Loading bottom part in the drop down

    return bannerHtml;
  }

  return false;
}

function getPopupSimilarSites(category, currentSiteId) {
  var similarHtml = '<div class="list__specification-bottom">';
  similarHtml += '<div class="similar_site_title">MORE SIMILAR SITES</div>';
  similarHtml += '<div class="similar_site_list">';
  var similarSiteCount = 0;

  if (!homeData.categories[category]) {
    return '';
  }

  homeData.categories[category].sites.map(function (moreSite, index) {
    if (currentSiteId != moreSite.id && similarSiteCount < 6) {
      var moreSiteLogo = moreSite.logo ? moreSite.logo.src : '';
      similarHtml += '<div class="similar_site_item">' + '<div class="similar_site_item_inner">' + '<a class="similar_site_item_thumb" href="' + moreSite.link + '" style="background-image: url(' + moreSite.banner_image + ')"></a>' + '<div class="similar_site_item_content">' + '<div class="title">' + moreSite.name + '</div>' + '<p>' + moreSite.tagline + ' <a class="readmore" href="' + moreSite.link + '">READ MORE</a></p>' + '</div>' + '<div class="similar_site_item_buttons">' + '<a class="visit_site list__specification-read nav_link" href="' + moreSite.url + '" target="_blank">VISIT WEBSITE</a>' + '<a class="read_review list__specification-visit nav_link" href="' + moreSite.link + '">READ REVIEW</a>' + '</div>' + '</div>' + '</div>';
      similarSiteCount++;
    }
  });
  similarHtml += '</div>';
  similarHtml += '<div id="other_categories" class="more_terms">';
  similarHtml += '<div class="similar_site_title">MORE CATEGORIES</div>';
  similarHtml += '<div class="more_categories_list category_box">';
  homeData['more_terms'].map(function (term, index) {
    var moreTermCat = homeData.categories[term];
    var moreTermHtml = '<div class="category_item">';
    moreTermHtml += '<a class="category_item_inner" hreflang="en" href="' + moreTermCat.link + '">';

    if (moreTermCat['youtube_hd_opt']) {
      moreTermHtml += '<i className="' + moreTermCat['youtube_hd_opt'] + '"></i>';
    }

    var videoThumb = moreTermCat['video_thumb'];

    if (videoThumb != '') {
      moreTermHtml += '<video autoplay loop muted playsinline><source src="' + videoThumb + '" type="video/mp4">Your browser does not support the video tag.</video>';
    } else {
      moreTermHtml += '<img src="' + moreTermCat['thumbnail'] + '" alt="' + moreTermCat['title'] + '"/>';
    }

    moreTermHtml += '<div class="catD">' + moreTermCat['title'] + '<small>Click Here to See (' + moreTermCat['count'] + ') Sites</small></div>';
    moreTermHtml += '</a>';
    moreTermHtml += '</div>';
    similarHtml += moreTermHtml;
  });
  similarHtml += '</div>';
  similarHtml += '</div>';
  similarHtml += '</div>';
  return similarHtml;
}

function renderSkipSiteBottomBanner(category, index) {
  var siteItem = homeData.categories[category].sites[index];

  if (siteItem) {
    var siteId = siteItem.id;
    var bannerType = siteItem.banner_type;
    var bannerImage = siteItem.banner_image;
    var bannerVideo = siteItem.banner_video;
    var bannerVideoPoster = siteItem.banner_video_poster;
    var siteLogo = siteItem.logo;
    var tagLIne = siteItem.tagline;

    if (tagLIne != '') {
      tagLIne = tagLIne.replaceAll("\'", "'");
      tagLIne = tagLIne.replaceAll("\\'", "'");
    }

    var siteExternalUrl = siteItem.url;
    var siteLink = siteItem.link;
    var popupBanner = document.querySelector('.list__specification');
    var bannerRight = '';
    var bannerClass = '';

    if (bannerType == 'image') {
      bannerClass = 'list__specification--banner';

      if (bannerImage != '') {
        bannerRight = '<div><img src="' + contentBase + 'screenshots/' + siteId + '.png"/></div>';
        popupBanner.classList.remove('list__specification--video');
        popupBanner.classList.add('list__specification--banner');
      }
    } else {
      bannerClass = 'list__specification--video';

      if (bannerVideo != '') {
        popupBanner.classList.remove('list__specification--banner');
        popupBanner.classList.add('list__specification--video');
        bannerRight = '<div video-parent-js>' + '<video preload="none" autoplay loop playsinline poster="' + bannerVideoPoster + '" video-js>' + '<source src="' + bannerVideo + '" type="video/mp4">' + '</video>' + '<a class="list__specification-play is-active" video-toggle-js><i class="icon-font icon-play-button" video-play-js></i></a>' + '<a class="list__specification-pause is-active" video-pause-js><i class="icon-font icon-pause"></i></a>' + '</div>';
      }
    }

    var moreSites = '';
    var moreSiteCount = 0;
    homeData.categories[category].sites.map(function (moreSite, index) {
      if (moreSiteCount < 6 && moreSite.id != siteId) {
        var moreSiteLogo = moreSite.logo ? moreSite.logo.src : '';
        moreSites += '<div class="list__box_more_item" list-box-more-js  data-id="' + moreSite.id + '" data-count="1" >' + '<a class="list__box_more_thumb" href="' + moreSite.link + '" style="background-image: url(' + moreSite.banner_image + ')"></a>' + '</div>';
        moreSiteCount++;
      }
    });
    document.querySelector('.list__specification .list__specification-right').innerHTML = bannerRight;
    document.querySelector('.list__specification .list__specification-action-desc p').innerHTML = tagLIne;
    document.querySelector('.list__specification .list__specification-logo').setAttribute('src', '');
    document.querySelector('.list__specification .list__specification-logo').setAttribute('src', siteLogo); //document.querySelector('.list__specification .list__specification-action-desc').innerHTML ='<p>'+tagLIne+' <a href="'+siteLink+'">READ MORE</a></p>';

    document.querySelector('.list__specification .list__specification-visit').setAttribute('href', siteExternalUrl);
    document.querySelector('.list__specification').setAttribute('href', siteLink);
    document.querySelector('.list__specification .list__specification-skip').setAttribute('data-id', siteId);
    document.querySelector('.list__specification .list__specification-like').setAttribute('data-like', siteId);
    document.querySelector('.list__specification .list__specification-dislike').setAttribute('data-dislike', siteId);
    document.querySelector('.list__specification .list__specification-favorites').setAttribute('data-id', siteId);
    document.querySelector('.site_banner_more_sites').innerHTML = moreSites;

    if (clonedPopupBanner) {
      if (clonedPopupTimeout) {
        clearTimeout(clonedPopupTimeout);
      }

      clonedPopupTimeout = setTimeout(function () {
        //clonedPopupBanner.remove();
        closeAllSnapshots();
      }, 1000);
    }
  }
}

function closeAllSnapshots() {
  var snapshots = document.querySelectorAll('.list__snapshot');
  snapshots.forEach(function (snapshot) {
    snapshot.remove();
  });
}

function shuffleArray(arra1) {
  var ctr = arra1.length,
      temp,
      index; // While there are elements in the array

  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr); // Decrease ctr by 1

    ctr--; // And swap the last element with it

    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }

  return arra1;
}

function renderSiteCategory(categoryIndex) {
  var categoryId = homeData.categories_indexes[categoryIndex];
  var categoryData = homeData.categories[categoryId];

  if (!categoryData) {
    return '';
  }

  var categoryLogo = categoryData.logo;

  if (categoryLogo) {
    categoryLogo = categoryLogo.url;
  }

  var categorySites = '';
  homeData.categories[categoryId].sites.map(function (site, index) {
    var siteLogo = site.logo ? site.logo.src : '';

    if (siteLogo != '') {
      siteLogo = '<img class="list__box-logo nolazy" src="' + siteLogo + '" alt=""/>';
    }

    categorySites += '<div class="swiper-slide" data-index="' + index + '" data-siteid="' + site.id + '" data-init="0">' + '<div class="list__box" list-box-js  data-id="' + site.id + '" style="background-image: url(' + site.banner_image + ')">' +
    /*'<div class="list__box-overlay"></div>'+*/
    '<div class="list__box-border"></div>' + '<a class="nav_link" href="' + site.link + '" hreflang="' + currentLang + '">' + //siteLogo+
    '</a>' + '<div class="list__box-details">' + '</div>' + '<button class="list__box-more" type="button"><i class="icon-font icon-arrow-angle"></i></button>' + '</div>' + '</div>';
  });
  var categoryTagLine = categoryData.tagline;

  if (categoryTagLine != '') {
    categoryTagLine = categoryTagLine.replaceAll("\'", "'");
    categoryTagLine = categoryTagLine.replaceAll("\\'", "'");
  }

  var categoryBoxHtml = '<div class="list__box-wrapper" list-parent-js data-name="category_' + categoryId + '" data-index="' + categoryIndex + '">' + '<div class="list__box-head">' + '<div class="list__info">' + '<div class="list__info-circle"><img src="' + categoryLogo + '" alt=""/></div>' + '<div class="category_title">' + '<a href="' + categoryData.link + '" hreflang="' + currentLang + '">' + categoryData.title + '</a><span>' + categoryTagLine + '</span>' + '</div>' + '</div>' + '<a class="list__btn nav_link" href="' + categoryData.link + '" hreflang="' + currentLang + '">SEE&nbsp;<span>' + categoryData.count + ' MORE</span><i class="icon-font icon-arrow-angle"></i></a>' + '</div>' + '<div class="list__box-line">' + '<u list-line-ind-js></u><span class="list_green_line" list-line-js></span>' + '</div>' + '<div class="list__box-body">' + '<div class="list__arrow-wrapper">' + '<a class="list__arrow list__arrow--prev" href="#">' + '<div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>' + '</a>' + '<a class="list__arrow list__arrow--next" href="#">' + '<div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>' + '</a>' + '</div>' + '<div class="swiper-container listSwiper" data-id="listSlider_' + categoryData.id + '" data-category="18">' + '<div class="swiper-wrapper' + (parseInt(categoryData.count) < 6 ? ' short_list' : '') + '" data-category="' + categoryData.id + '" data-count="' + categoryData.count + '" data-slidecount="' + categoryData.site_limit + '">' + categorySites + '</div>' + '</div>' + '</div>' + '<div class="list__specification-wrapper"></div>' + '</div>';
  return categoryBoxHtml;
}

function renderAllOtherCategories() {
  var catListContainer = document.querySelector('#list .c-grid');

  for (var i = 0; i < homeData.categories_count; i++) {
    var catId = homeData.categories_indexes[i];
    var catBox = document.querySelector('.list__box-wrapper[data-name="category_' + catId + '"]');

    if (!catBox) {
      var listBoxes = document.querySelectorAll('.list__box-wrapper');
      var categoryHtml = renderSiteCategory(i);
      catListContainer.insertAdjacentHTML('beforeend', categoryHtml);
      swiperCB(".swiper-container[data-id=\"listSlider_".concat(catId, "\"]"), ".list__box-wrapper[data-name='category_".concat(catId, "']"));
    }
  }

  boxHover();
}

var tOut = null,
    hoverBool = false;
var previousHoverBox = null;

var boxHover = function boxHover() {
  //const swiperSlides = document.querySelectorAll('.swiper-slide[data-init="0"]'),
  var swiperSlides = document.querySelectorAll('.swiper-slide'),
      parentSlides = document.querySelectorAll('[list-parent-js]'),
      listBoxBody = document.querySelectorAll('.list__box-body');

  if (document.body.classList.contains('home')) {
    for (var i = 0, len = swiperSlides.length; i < len; i++) {
      if (isMobileOrTablet) {
        swiperSlides[i].removeEventListener('touchend', onSlideTouchEnd);
        swiperSlides[i].addEventListener('touchend', onSlideTouchEnd, false);
        swiperSlides[i].removeEventListener('touchstart', onSlideTouchStart);
        swiperSlides[i].addEventListener('touchstart', onSlideTouchStart, false); //swiperSlides[i].removeEventListener('touchmove', onSlideTouchMove);
        //swiperSlides[i].addEventListener('touchmove', onSlideTouchMove, false);
      } else {
        swiperSlides[i].removeEventListener('mouseleave', onSlideLeave);
        swiperSlides[i].addEventListener('mouseleave', onSlideLeave, false);
        swiperSlides[i].removeEventListener('mouseenter', onSlideEnter);
        swiperSlides[i].addEventListener('mouseenter', onSlideEnter, false);
      }

      if (swiperSlides[i].querySelector('.list__box-more')) {
        swiperSlides[i].querySelector('.list__box-more').removeEventListener('mouseover', onShowBannerEnter);
        swiperSlides[i].querySelector('.list__box-more').addEventListener('mouseover', onShowBannerEnter, false);
        swiperSlides[i].querySelector('.list__box-more').addEventListener('mouseout', onShowBannerLeave, false);
      }

      swiperSlides[i].setAttribute('data-init', '1');
    }
  }

  for (var _i = 0, _len = listBoxBody.length; _i < _len; _i++) {
    listBoxBody[_i].addEventListener('mouseleave', function (ev) {
      if (window.innerWidth >= 1280) {
        hoverBool = false;
        clearTimeout(tOut);

        for (var j = 0, l = swiperSlides.length; j < l; j++) {
          swiperSlides[j].classList.remove('is-hover');
        }
      }
    }, false);
  }

  if (!isMobileOrTablet) {
    for (var _i2 = 0, _len2 = parentSlides.length; _i2 < _len2; _i2++) {
      parentSlides[_i2].removeEventListener('mouseleave', onParentSideLeave);

      parentSlides[_i2].addEventListener('mouseleave', onParentSideLeave, false);
    }
  }
};

function onSlideLeave(ev) {
  if (window.innerWidth >= 1280) {
    var el = ev.currentTarget,
        elParent = el.closest('[list-parent-js]'),
        slideSwiper = elParent.querySelector('.swiper-container'),
        slideIndex = el.dataset.index;
    var greenBar = elParent.querySelector('[list-line-js]'); //clearTimeout(tOut);

    el.classList.remove('is-hover');
    el.classList.remove('last-box');
    elParent.classList.remove('last-box-selected');

    if (lastActiveHoverBox) {
      var activeSlide = 0;

      if (slideSwiper) {
        activeSlide = slideSwiper.swiper.activeIndex;
      }

      var hoverBoxPosition = slideIndex - activeSlide;
      var hoverBoxLeft = 236 * hoverBoxPosition + 93;

      if (hoverBoxPosition > 0) {
        hoverBoxLeft -= 10;
      } //let transformVal = 'left: '+hoverBoxLeft+'px';


      var transformVal = 'transform: translateX(' + hoverBoxLeft + 'px)';

      if (greenBar) {
        greenBar.setAttribute('style', transformVal + ';width: 64px');
      }
    }
  }
}

function onSlideEnter(ev) {
  if (window.innerWidth >= 1280) {
    var el = ev.currentTarget,
        elParent = el.closest('[list-parent-js]'),
        elBox = el.querySelector('.list__box'),
        lineInd = elParent.querySelector('[list-line-js]'),
        slideSwiper = elParent.querySelector('.swiper-container');
    var swiperParent = el.parentNode;
    var slideIndex = el.dataset.index;
    var slideCategory = swiperParent.dataset.category;
    var slideHoverContainer = el.querySelector('.list__box-details');

    if (slideHoverContainer && slideHoverContainer.innerHTML.trim() == '') {
      var slideHoverContent = renderSiteHoverContent(slideCategory, slideIndex);

      if (slideHoverContent) {
        slideHoverContainer.innerHTML = slideHoverContent;
      }
    }

    var activeSlide = 0;

    if (slideSwiper) {
      activeSlide = slideSwiper.swiper.activeIndex;
    }

    var hoverBoxPosition = slideIndex - activeSlide;

    if (slideIndex - activeSlide == 4) {
      elParent.classList.add('last-box-selected');
    } else {
      elParent.classList.remove('last-box-selected');
    }

    if (window.innerWidth < 1449) {
      if (slideIndex - activeSlide == 4) {
        el.classList.add('last-box');
      }
    }

    if (hoverBool) {
      el.classList.add('is-hover');

      if (elBox) {
        tempRepositionGreenBar(elParent, hoverBoxPosition);
      }
    } else {
      hoverBool = true;
      el.classList.add('is-hover');
      tempRepositionGreenBar(elParent, hoverBoxPosition);
    }

    previousHoverBox = el;
  }

  markFavourites();
  markLikesDislikes();
}

function onSlideTouchStart(ev) {
  var el = ev.currentTarget,
      elParent = el.closest('[list-parent-js]'),
      slideIndex = el.dataset.index,
      slideSwiper = elParent.querySelector('.swiper-container'),
      greenBar = elParent.querySelector('[list-line-js]');
  isMouseDown = true;
  _touchStartPosition = ev.touches[0].pageX;

  if (greenBar) {
    greenBar.classList.add('no_anim');
    _lastGreenBar = greenBar;
  }

  lastActiveHoverBox = el;
  var isLastBox = false;

  if (typeof el.nextSibling === "undefined" | el.nextSibling == null) {
    isLastBox = true;
  }

  var activeSlide = 0;

  if (slideSwiper) {
    activeSlide = slideSwiper.swiper.activeIndex;
  }

  var hoverBoxPosition = slideIndex - activeSlide;
  var slideWidth = 236,
      slideOffset = 178,
      greenBarWidth = 74;
  var sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');

  if (sliderBox) {
    slideWidth = sliderBox.offsetWidth + 6;
    slideOffset = slideWidth / 2;
  }

  if (window.innerWidth < 768) {
    greenBarWidth = 48;
  } else if (window.innerWidth <= 1024) {
    greenBarWidth = 74;
  }

  slideOffset = (slideWidth - greenBarWidth) / 2;
  var hoverBoxLeft = slideWidth * hoverBoxPosition + slideOffset;
  var barLeft = getGreenBarTranslateX(greenBar);
  _greenBarAnimSpeed = 0;
  _greenBarLeft = hoverBoxLeft;

  if (_greenBarLeft < 0) {
    _greenBarLeft = 0;
  } else if (_greenBarLeft > maxLeft) {
    _greenBarLeft = maxLeft;
  }

  _greenBarWidth = greenBarWidth; //greenBar.style['transition-duration'] = _greenBarAnimSpeed;

  greenBar.style.width = greenBarWidth + 'px';

  if (!isAnimationStarted) {
    isAnimationStarted = true;
    requestAnimationFrame(animateGreenBar);
  }

  if (_greenBarTimer) {
    clearInterval(_greenBarTimer);
  }

  moveGreenBar(barLeft, hoverBoxLeft); //greenBar.setAttribute('style', transformVal + '; transition-duration:350ms; width: '+greenBarWidth+'px');
}

function onSlideTouchMove(ev) {
  var el = ev.currentTarget,
      elParent = el.closest('[list-parent-js]'),
      slideIndex = el.dataset.index,
      slideSwiper = elParent.querySelector('.swiper-container'),
      greenBar = elParent.querySelector('[list-line-js]');
  var isLastBox = false;

  if (typeof el.nextSibling === "undefined" | el.nextSibling == null) {
    isLastBox = true;
  }

  var activeSlide = 0;

  if (slideSwiper) {
    activeSlide = slideSwiper.swiper.activeIndex;
  }

  var hoverBoxPosition = slideIndex - activeSlide;
  var slideWidth = 236,
      slideOffset = 178,
      greenBarWidth = 74;
  var sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');

  if (sliderBox) {
    slideWidth = sliderBox.offsetWidth + 6;
    slideOffset = slideWidth / 2;
  }

  if (window.innerWidth < 768) {
    greenBarWidth = 48;
    slideWidth = 100;
  } else if (window.innerWidth <= 1024) {
    greenBarWidth = 74;
  }

  var hoverBoxLeft = 0;
  slideOffset = (slideWidth - greenBarWidth) / 2;

  if (lastActiveHoverBox) {
    hoverBoxLeft = lastActiveHoverBox.getBoundingClientRect().left + slideOffset - 6;
  } //_greenBarLeft = hoverBoxLeft;


  _greenBarWidth = greenBarWidth; //console.log(ev.touches[0].pageX+' - '+_touchStartPosition+' - '+_greenBarCurrent);
  //greenBar.setAttribute('style', transformVal + '; transition-duration:10ms; width: '+greenBarWidth+'px');
}

function animateGreenBar() {
  if (isMouseDown) {
    // check if mouse is down
    requestAnimationFrame(animateGreenBar); // request 60 fps animation
  } else {
    console.log('Missing animation frame');
  }

  if (_greenBarLeft < 0) {
    _greenBarLeft = minLeft;
  }

  _lastGreenBar.style.transform = "translate3d(" + _greenBarLeft + "px, 0, 0)";
}

function getGreenBarTranslateX(greenBar) {
  var translateX = parseInt(getComputedStyle(greenBar, null).getPropertyValue("transform").split(",")[4]);
  return translateX; // get translateX value
}

function easeInOutQuad(x, t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t + b;
  } else {
    return -c / 2 * (--t * (t - 2) - 1) + b;
  }
}

function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

function moveGreenBar(from, to) {
  _greenBarFrom = from;
  var start = new Date().getTime();

  if (to < 0) {
    clearInterval(_greenBarTimer);
    return;
  }

  _greenBarTimer = setInterval(function () {
    var time = new Date().getTime() - start;
    var x = easeInOutQuart(time, _greenBarFrom, to - _greenBarFrom, _greenBarDuration);

    if (x < 0) {
      clearInterval(_greenBarTimer);
    } else if (x > maxLeft) {
      clearInterval(_greenBarTimer);
    }

    _greenBarLeft = x;
    if (time >= _greenBarDuration) clearInterval(_greenBarTimer);
  }, 1000 / 60); //rect.setAttribute('x', from);

  if (_greenBarLeft > maxLeft) {
    _greenBarLeft = maxLeft;
  }

  if (_greenBarLeft < 0) {
    _greenBarLeft = minLeft;
  }

  if (_greenBarFrom > 0) {
    _greenBarLeft = _greenBarFrom;
  }
}

function onSlideTouchEnd(ev) {
  var el = ev.currentTarget,
      elParent = el.closest('[list-parent-js]'),
      slideIndex = el.dataset.index,
      slideSwiper = elParent.querySelector('.swiper-container'),
      greenBar = elParent.querySelector('[list-line-js]'); // isMouseDown = false;

  if (greenBar) {//greenBar.classList.remove('no_anim');
  }

  var slideWidth = 236,
      slideOffset = 178,
      greenBarWidth = 34;
  var sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');
  var isLastBox = false;

  if (typeof el.nextSibling === "undefined" | el.nextSibling == null) {
    isLastBox = true;
  }

  if (sliderBox) {
    slideWidth = sliderBox.offsetWidth + 6;
    slideOffset = slideWidth / 2;
  }

  if (window.innerWidth < 768) {
    greenBarWidth = 20;
  } else if (window.innerWidth < 1024) {
    greenBarWidth = 34;
  }

  console.log('Bar width ' + greenBarWidth + ' - ' + slideSwiper.swiper.translate); //hoverBoxLeft = ((slideIndex*slideWidth) + translate)+slideOffset-12;

  if (!_isGreenBarMoving) {
    var barLeft = getGreenBarTranslateX(greenBar);
    var hoverBoxLeft = slideIndex * slideWidth + slideSwiper.swiper.translate + slideOffset - 12;

    if (hoverBoxLeft < 0) {
      hoverBoxLeft = minLeft;
    }

    if (hoverBoxLeft > 0) {
      if (_greenBarTimer) {
        clearInterval(_greenBarTimer);
      }

      moveGreenBar(barLeft, hoverBoxLeft);
    }
  }

  greenBar.style.width = greenBarWidth + 'px';
}

function onSwiperTranslate(e, translate) {
  if (!isMobileOrTablet) {
    return;
  }

  if (typeof lastActiveHoverBox === "undefined") {
    return;
  }

  var el = lastActiveHoverBox,
      elParent = el.closest('[list-parent-js]'),
      slideIndex = el.dataset.index,
      slideSwiper = elParent.querySelector('.swiper-container'),
      greenBar = elParent.querySelector('[list-line-js]');

  if (!_isGreenBarMoving) {
    _isGreenBarMoving = true;
  }

  var translateDiff = lastTranslate - translate;
  translateDiff = +translateDiff;
  var deltaTranslate = translateDiff;

  if (translateDiff < 0) {
    translateDiff = -translateDiff;
  }

  var isLargeJump = false;

  if (translateDiff > 15) {
    isLargeJump = true;
  }

  lastTranslate = translate;
  var slideWidth = 236,
      slideOffset = 178,
      greenBarWidth = 34,
      hoverBoxLeft = parseInt(greenBar.style.transform.replace("translateX(", ""));
  var sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');

  if (sliderBox) {
    slideWidth = sliderBox.offsetWidth + 6;
  }

  if (window.innerWidth < 768) {
    greenBarWidth = 20;
  } else if (window.innerWidth < 1024) {
    greenBarWidth = 34;
  }

  if (greenBar) {
    slideOffset = (slideWidth - greenBarWidth) / 2;
    var barLeft = getGreenBarTranslateX(greenBar); //hoverBoxLeft = barLeft-deltaTranslate;

    hoverBoxLeft = slideIndex * slideWidth + translate + slideOffset - 12;

    if (hoverBoxLeft < minLeft) {
      hoverBoxLeft = minLeft;
    }

    if (hoverBoxLeft > maxLeft) {
      hoverBoxLeft = maxLeft;
    }

    if (isLargeJump) {
      console.log('large jump ' + translate);
      _greenBarDuration = 500;
      _isGreenBarMoving = false;

      if (barLeft < 0) {
        barLeft = 0;
      }

      if (hoverBoxLeft < 0) {
        hoverBoxLeft = minLeft;
      }

      if (_greenBarTimer) {
        clearInterval(_greenBarTimer);
      }

      moveGreenBar(barLeft, hoverBoxLeft + 12); //_greenBarLeft = hoverBoxLeft;
    } else {
      if (_greenBarTimer) {
        clearInterval(_greenBarTimer);
      }

      _greenBarLeft = hoverBoxLeft;

      if (_greenBarLeft < 0) {
        _greenBarLeft = minLeft;
      } else if (_greenBarLeft > maxLeft) {
        _greenBarLeft = maxLeft;
      }
    }
  }
}

function tempRepositionGreenBar(elParent, hoverBoxPosition) {
  var greenBar = elParent.querySelector('[list-line-js]');
  var activeBox = elParent.querySelector('.swiper-slide.is-hover');
  var slideWidth = 0;
  var sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');

  if (sliderBox) {
    slideWidth = sliderBox.offsetWidth + 6;
  }

  if (activeBox) {
    lastActiveHoverBox = activeBox;
    var hoverBoxLeft = 0;

    if (greenBar) {
      hoverBoxLeft = 236 * hoverBoxPosition + 83;

      if (window.innerWidth < 1449 && hoverBoxPosition == 4) {
        hoverBoxLeft -= 55;
      }

      var transformVal = 'transform: translateX(' + hoverBoxLeft + 'px);';
      greenBar.setAttribute('style', transformVal + ';width: 190px');
    }
  }
}

function onParentSideLeave(ev) {
  var parentSlideBox = ev.target;

  if (parentSlideBox) {
    var openBanner = parentSlideBox.querySelector('.list__specification.is-open');

    if (openBanner) {
      var btCloseBanner = openBanner.querySelector('.list__specification-close');

      if (btCloseBanner) {
        btCloseBanner.click();
      }
    }
  }
}

function onShowBannerEnter(__ev) {
  var el = lastActiveHoverBox,
      elParent = el.closest('[list-parent-js]'),
      greenBar = elParent.querySelector('[list-line-js]');

  if (currentBannerTimeout) {
    clearTimeout(currentBannerTimeout);
  }

  currentBannerTimeout = window.setTimeout(function () {
    showBanner(__ev.target);
  }, 1000);
}

function onShowBannerLeave(__ev) {
  window.clearTimeout(currentBannerTimeout);
}

function showBanner(_el) {
  var isSkip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var _boxParent = _el.closest('.list__box'),
      _boxID = _boxParent.getAttribute('data-id'),
      _parentNode = _el.closest('.list__box-wrapper');

  var currentBannerBox = document.querySelector('.list__specification[data-id="' + _boxID + '"]');

  if (currentBannerBox && currentBannerBox.classList.contains('is-open')) {
    return;
  }

  var swiperSlide = _el.closest('.swiper-slide');

  var swiperWrapper = _el.closest('.swiper-wrapper');

  var listBoxWrapper = _el.closest('.list__box-wrapper');

  var bannerWrapper = listBoxWrapper.querySelector('.list__specification-wrapper');
  var currentBannerSection = document.querySelector('.list__specification');

  if (currentBannerSection && !isSkip) {
    currentBannerSection.remove();
  } //homeData.categories[category].sites[index];


  if (isSkip) {
    renderSkipSiteBottomBanner(swiperWrapper.dataset.category, swiperSlide.dataset.index);
  } else {
    var bottomBanner = renderSiteBottomBanner(swiperWrapper.dataset.category, swiperSlide.dataset.index);

    if (bottomBanner) {
      bannerWrapper.innerHTML = bottomBanner;
    }
  }

  var hideScrollContainer = document.querySelectorAll("html, body"),
      //_specificationBox = _parentNode.querySelector('.list__specification[data-id="' + _boxID + '"]');
  _specificationBox = _parentNode.querySelector('.list__specification');

  var jInner = null,
      lInner = document.querySelectorAll('[video-toggle-js]').length;

  var _isActive = document.querySelector('.list__box.is-active');

  if (_isActive) {
    _isActive.classList.remove('is-active');
  }

  var _isOpen = document.querySelector('.list__specification.is-open');

  if (_isOpen && !isSkip) {
    _isOpen.classList.remove('is-open');
  }

  if (window.innerWidth < 1024) {
    setTimeout(function () {
      _parentNode.classList.add('is-open');

      _boxParent.classList.add('is-active');

      var __vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty('--vh', "".concat(__vh, "px"));

      if (_specificationBox) {
        _specificationBox.classList.add('is-open');
      }
    }, 100);
  } else {
    _parentNode.classList.add('is-open');

    _boxParent.classList.add('is-active');

    if (_specificationBox) {
      _specificationBox.classList.add('is-open');
    }
  }

  if (window.innerWidth <= 1023) {
    hideScrollContainer.forEach(function (val, idx) {
      val.classList.add("is-hideScroll");
    });
  }

  markFavourites();
  markLikesDislikes();
}

function addToFavourites(siteId) {
  postRequest(ajaxEndpoint, {
    action: 'add_to_fav',
    site: siteId
  }, function (res) {
    console.log('Favouroites');
    console.log(res);
    renderFavourites();
  });
}

function isLoggedIn() {}

function removeFavourite(favItem) {
  var favId = favItem.dataset.id;
  postRequest(ajaxEndpoint, {
    action: 'remove_fav',
    site: favId
  }, function (res) {
    console.log('Removed Favouroites');
    renderFavourites();
  });
}

function initWebWorker() {
  var currentLang = document.documentElement.getAttribute('lang');
  homeData = getWithExpiry("homepage_data_" + dataTime + '_' + currentLang);

  if (homeData) {
    if (document.body.classList.contains('home')) {
      renderAllOtherCategories();
    }
  } else {
    if (!navigator.userAgent.toLowerCase().includes('lighthouse')) {
      if (document.body.classList.contains('home')) {
        loadHomeData();
      }
    }
  }
}

function getLikesAndDislikes() {
  window.dislikes = [];
  window.likes = getWithExpiry("likes");
  window.dislikes = getWithExpiry("dislikes");

  if (!window.likes) {
    window.likes = [];
  }

  if (!window.dislikes) {
    window.dislikes = [];
  }
}

function onLike(el, elID) {
  if (el.classList.contains('is-active')) {
    window.likes.push(elID);
  } else {
    window.likes.remove(elID);
  }

  setWithExpiry("likes", window.likes, 30 * 24 * 3600 * 1000);
}

function onDisLike(el, elID) {
  el.classList.toggle('is-active');

  if (el.classList.contains('is-active')) {
    window.dislikes.push(elID);
  } else {
    window.dislikes.remove(elID);
  }

  setWithExpiry("dislikes", window.dislikes, 30 * 24 * 3600 * 1000);
}

var markLikesDislikes = function markLikesDislikes() {
  window.likes.map(function (id) {
    var btnLike = document.querySelector('.list__box-like[data-id="' + id + '"]');

    if (btnLike) {
      btnLike.classList.remove('is-hide');
      btnLike.classList.add('is-active');
    }

    var btnDislike = document.querySelector('.list__box-dislike[data-id="' + id + '"]');

    if (btnDislike) {
      btnDislike.classList.remove('is-active');
      btnDislike.classList.add('is-hide');
    }

    btnLike = document.querySelector('.list__specification-like[data-like="' + id + '"]');

    if (btnLike) {
      btnLike.parentNode.classList.remove('is-hide');
      btnLike.classList.add('is-active');
    }

    btnDislike = document.querySelector('.list__specification-dislike[data-dislike="' + id + '"]');

    if (btnDislike) {
      btnDislike.classList.remove('is-active');
      btnDislike.parentNode.classList.add('is-hide');
    }
  });
  window.dislikes.map(function (id) {
    var btnDislike = document.querySelector('.list__box-dislike[data-id="' + id + '"]');

    if (btnDislike) {
      btnDislike.classList.remove('is-hide');
      btnDislike.classList.add('is-active');
    }

    var btnLike = document.querySelector('.list__box-like[data-id="' + id + '"]');

    if (btnLike) {
      btnLike.classList.remove('is-active');
      btnLike.classList.add('is-hide');
    }

    btnDislike = document.querySelector('.list__specification-dislike[data-dislike="' + id + '"]');

    if (btnDislike) {
      btnDislike.parentNode.classList.remove('is-hide');
      btnDislike.classList.add('is-active');
    }

    btnLike = document.querySelector('.list__specification-like[data-like="' + id + '"]');

    if (btnLike) {
      btnLike.classList.remove('is-active');
      btnLike.parentNode.classList.add('is-hide');
    }
  });
};

(function () {
  var FX = {
    easing: {
      linear: function linear(progress) {
        return progress;
      },
      quadratic: function quadratic(progress) {
        return Math.pow(progress, 2);
      },
      swing: function swing(progress) {
        return 0.5 - Math.cos(progress * Math.PI) / 2;
      },
      circ: function circ(progress) {
        return 1 - Math.sin(Math.acos(progress));
      },
      back: function back(progress, x) {
        return Math.pow(progress, 2) * ((x + 1) * progress - x);
      },
      bounce: function bounce(progress) {
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
          if (progress >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
          }
        }
      },
      elastic: function elastic(progress, x) {
        return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
      }
    },
    animate: function animate(options) {
      var start = new Date();
      var id = setInterval(function () {
        var timePassed = new Date() - start;
        var progress = timePassed / options.duration;

        if (progress > 1) {
          progress = 1;
        }

        options.progress = progress;
        var delta = options.delta(progress);
        options.step(delta);

        if (progress == 1) {
          clearInterval(id);

          if (options.complete) {
            options.complete();
          }
        }
      }, options.delay || 10);
    },
    fadeOut: function fadeOut(element, options) {
      var to = 1;
      this.animate({
        duration: options.duration,
        delta: function delta(progress) {
          progress = this.progress;
          return FX.easing.swing(progress);
        },
        complete: options.complete,
        step: function step(delta) {
          element.style.opacity = to - delta;
        }
      });
    },
    fadeIn: function fadeIn(element, options) {
      var to = 0;
      this.animate({
        duration: options.duration,
        delta: function delta(progress) {
          progress = this.progress;
          return FX.easing.swing(progress);
        },
        complete: options.complete,
        step: function step(delta) {
          element.style.opacity = to + delta;
        }
      });
    }
  };
  window.FX = FX;
})();
/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */


var initHamburger = function initHamburger() {
  var btnHamburger = document.querySelector("[hamburger-js]"),
      hideScrollContainer = document.querySelectorAll("html, body"),
      mobileContainer = document.querySelector("[mobile-block-js]");
  var mobileMenuTop = document.querySelector(".pre-header__mobile-top");

  if (btnHamburger) {
    btnHamburger.addEventListener("click", function (ev) {
      var elem = ev.currentTarget;

      if (!mobileMenuTop) {
        renderMobileMenu();
      }

      elem.classList.toggle("is-active");
      mobileContainer.classList.toggle("is-open");
      hideScrollContainer.forEach(function (val, idx) {
        val.classList.toggle("is-hideScroll");
      });

      if (document.body.classList.contains('is-hideScroll')) {
        setTimeout(function () {
          document.querySelector('.searchinput').focus();
        }, 500);
      }
    });
  }

  var searchHamburger = document.querySelector('.pre-header__hamburger'),
      searchContainer = document.querySelector('[search-mobile-js]');

  if (searchHamburger) {
    searchHamburger.addEventListener("click", function (ev) {
      btnHamburger.classList.remove("is-active");

      if (mobileContainer.classList.contains('is-open')) {
        mobileContainer.classList.remove("is-open");
        searchContainer.classList.toggle("is-open");
      } else {
        mobileContainer.classList.remove("is-open");
        searchContainer.classList.toggle("is-open");
        hideScrollContainer.forEach(function (val, idx) {
          val.classList.toggle("is-hideScroll");
        });
      }
    });
  }

  var searchClose = document.querySelector('.category__close');

  if (searchClose) {
    searchClose.addEventListener("click", function (ev) {
      searchContainer.classList.toggle("is-open");
      hideScrollContainer.forEach(function (val, idx) {
        val.classList.toggle("is-hideScroll");
      });
      document.querySelector('[search-js]').value = '';
      hide(document.querySelector('[search-drop-mobile-js]'));
      document.querySelector('.category__drop').classList.remove('is-open');
    });
  }
};

var renderMobileMenu = function renderMobileMenu() {
  var langHtml = document.querySelector('.lang').outerHTML;
  var mobileContainer = document.querySelector("[mobile-block-js]");
  var navLinkGames = document.querySelector('.header_nav_games').getAttribute('href');
  var navLinkMeet = document.querySelector('.header_nav_meet').getAttribute('href');
  var navLinkLiveSex = document.querySelector('.header_nav_dating').getAttribute('href');
  var currentLang = document.documentElement.getAttribute('lang');
  var linkSignup = '<div><a class="pre-header__signup mobile_signup_link" href="/sign-up/"><i class="icon-font icon-key"></i><span>Sign Up</span></a></div>';

  if (window.logoutUrl) {
    linkSignup = '<div><a class="pre-header__signup mobile_signup_link" href="' + window.logoutUrl + '"><i class="icon-font icon-key"></i><span>LOGOUT</span></a></div>';
  }

  if (!window.favHtmlMobile) {
    window.favHtmlMobile = '';
  }

  var mobileNavHtml = '<div>' + '            <div class="pre-header__mobile-top">' + '              <div><a class="pre-header__signin mobile_login_link" href="/login/"><i class="icon-font icon-enter"></i><span>Login</span></a></div>' + linkSignup + '            </div>' + '            <div class="pre-header__mobile-middle">' + '<p class="pre-header__heading"><i></i><span>Main</span></p>' + '              <div>' + langHtml + '</div>' + '            </div>' + '            <div class="pre-header__mobile-bottom main_mobile_menu">' + window.favHtmlMobile + '              <ul class="header__nav">' + '                <li class="header__nav-item"><a class="header__nav-link" href="/categories/" hreflang="' + currentLang + '">' + '                    <div><i class="icon-png header-nav-folder"></i></div>' + '                    <div><span>View All Categories</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/blog/" hreflang="en">' + '                    <div><i class="icon-png header-nav-blog"></i></div>' + '                    <div><span>Blog</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/webcam-videos/" hreflang="en">' + '                    <div><i class="icon-png header-nav-videos"></i></div>' + '                    <div><span>Videos</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/pornstars/" hreflang="en">' + '                    <div><i class="icon-png header-nav-pornstars"></i></div>' + '                    <div><span>Pornstars</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/coupons/" hreflang="en">' + '                    <div><i class="icon-png header-nav-porncoupons"></i></div>' + '                    <div><span>Porn Coupons</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="' + navLinkGames + '" target="_blank">' + '                    <div><i class="icon-png header-nav-porngames"></i></div>' + '                    <div><span>Porn Games</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="' + navLinkMeet + '" target="_blank">' + '                    <div><i class="icon-png header-nav-meetfuck"></i></div>' + '                    <div><span>Meet & Fuck</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="' + navLinkLiveSex + '" target="_blank">' + '                    <div><i class="icon-png header-nav-livesex"></i></div>' + '                    <div><span>Live sex</span></div></a></li>' + '              </ul>' + '            </div>' + '            <div class="pre-header__mobile-middle">' + '              <div>' + '                <p class="pre-header__heading"><i></i><span>Connect With Us</span></p>' + '              </div>' + '              <div></div>' + '            </div>' + '            <div class="pre-header__mobile-bottom">' + '              <ul class="header__nav">' + '                <li class="header__nav-item"><a class="header__nav-link" href="/about-us/">' + '                    <div><i class="icon-png header-nav-info"></i></div>' + '                    <div><span>About Us</span></div></a></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/contact/">' + '                    <div><i class="icon-png header-nav-email"></i></div>' + '                    <div><span>Contact Us</span></div></a></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/advertising/">' + '                    <div><i class="icon-png header-nav-megaphone"></i></div>' + '                    <div><span>Advertising</span></div></a></li>' + '              </ul>' + '            </div>' + '          </div>';
  mobileContainer.innerHTML = mobileNavHtml;
  initFavDelete();

  if (typeof initLoggedUser === "function") {
    initLoggedUser();
  }
};

function initFavDelete() {
  document.querySelectorAll(".fav_delete").forEach(function (target) {
    target.onclick = function (event) {
      var siteId = 0;

      if (event.target.classList.contains('fav_delete')) {
        siteId = event.target.dataset.id;
      } else if (event.target.parents('.fav_delete')) {
        siteId = event.target.parents('.fav_delete')[0].dataset.id;
      }

      if (siteId) {
        var deleteLink = event.target;
        var data = {
          action: 'remove_fav',
          site: siteId
        };
        postRequest(ajaxEndpoint, data, function (res) {
          event.target.closest('.site_listitem').remove();
        });
      }
    };
  });
}

var letterData = [];
var loggedUsername = '';
var logoutUrl = '';
var sortTimout;
var favouriteList = [];

var initTheme = function initTheme() {
  var toggleSwitch = document.querySelector('#toggle-mode');

  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', function (event) {
      if (event.target.checked) {
        createCookie("is_dark", "1", 7);
        document.documentElement.classList.remove('light');
      } else {
        createCookie("is_dark", "0", 7);
        document.documentElement.classList.add('light');
      }
    });
  }

  var isDark = getCookieMpgCookie("is_dark");

  if (isDark == '') {
    isDark = '1';
  }

  if (isDark == '1') {
    //document.documentElement.classList.remove('light');
    toggleSwitch.checked = true;
  } else {
    //document.documentElement.classList.add('light');
    toggleSwitch.checked = false;
  }
};

initTheme();

var renderFavourites = function renderFavourites() {
  /*if(isMobileDevice){
  	return;
  }*/
  isLoggedUser = getCookieMpgCookie('logged_username');

  if (isLoggedUser == '') {
    //loadLoginForm();
    return;
  }

  var favouritesDropDown = document.querySelector('[view-favorites-drop-js]');
  var favouritesHtml = '';
  postRequest(ajaxEndpoint, {
    action: 'is_logged',
    logout: '/',
    is_fav: true
  }, function (res) {
    console.log('Favouroites');
    console.log(res);

    if (res.status) {
      if (res.status == 'true') {
        isLoggedUser = true;
        window.logoutUrl = res.logout;

        if (document.querySelector('.header__action-link--logout')) {
          document.querySelector('.header__action-link--logout').setAttribute('href', res.logout);
        }

        if (document.querySelector('.mobile_signup_link')) {
          document.querySelector('.mobile_signup_link').setAttribute('href', res.logout);
        }
      } else {//loadLoginForm();
      }

      document.querySelectorAll('.is-active[favorites-toggle-js]').forEach(function (fav) {
        fav.classList.remove('is-active');
      });

      if (res.fav_list) {
        favouriteList = [];
        res.fav_list.map(function (fav, index) {
          if (!favouriteList.includes(fav.id)) {
            favouriteList.push(fav.id);
          }

          favouritesHtml += '<div class="header__view-link" >' + '<div><span>' + (index + 1) + '.</span></div>' + '<div><img src="' + fav.favicon + '"/><p><a href="' + fav.permalink + '">' + fav.title + '</a></p></div>' + '<div><button type="button" data-id="' + fav.id + '" un-favorites-js><i class="icon-font icon-delete"></i></button><a href="' + fav.permalink + '" class="glass"><i class="icon-font icon-search"></i></a></div>' + '</div>';
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
        });

        if (favouritesDropDown) {
          favouritesDropDown.innerHTML = favouritesHtml;
        }

        renderMobileFavourites(res);
      }
    }

    markFavourites();
  });
};

function renderMobileFavourites(response) {
  window.fav_list = [];
  var favHtml = '';
  var favIndex = 1;
  response.fav_list.forEach(function (fav) {
    favHtml += '<li class="site_listitem fav_link fv_' + fav.id + ' deIcon fi' + fav.id + ' fx_' + fav.fx + ' fy_' + fav.fy + '"><div class="id_number">' + favIndex + '.</div><a class="link" target="_blank" href="' + fav.permalink + '">' + fav.title + '</a><a class="fav_delete" data-id="' + fav.id + '"><i></i></a><a href="' + fav.permalink + '" title="' + fav.title + '" class="preview_link"></a></li>';
    window.fav_list.push(fav.id);
    favIndex++;
  });
  window.favHtmlMobile = '<div class="hdrfav mobile_fav_link"><div class="hdrfavttl">Your Favourite Sites</div><div class="site_list favourite_list">' + favHtml + '</div></div>';

  if (document.querySelector(".main_mobile_menu")) {
    document.querySelector(".main_mobile_menu").insertAdjacentHTML("afterbegin", window.favHtmlMobile);

    document.querySelector('.mobile_fav_link .hdrfavttl').onclick = function (event) {
      document.querySelector('.mobile_fav_link').classList.toggle('open');
    };
  }
}

var markFavourites = function markFavourites() {
  var currentFavourites = document.querySelectorAll('.list__box-favorites.is-active');

  for (var i = 0; i < currentFavourites.length; i++) {
    currentFavourites[i].classList.remove('is-active');
  }

  favouriteList.map(function (fav) {
    var favLink = document.querySelector('[data-id="' + fav + '"] [favorites-toggle-js]');

    if (favLink) {
      favLink.classList.add('is-active');
    }

    if (document.querySelector('.list__box-favorites[data-id="' + fav + '"]')) {
      document.querySelector('.list__box-favorites[data-id="' + fav + '"]').classList.add('is-active');
    }

    if (document.querySelector('.list__specification-favorites[data-id="' + fav + '"]')) {
      document.querySelector('.list__specification-favorites[data-id="' + fav + '"]').classList.add('is-active');
    }
  });
};

var letterSearch = function letterSearch() {
  fetch('/wp-json/mpg/letter_matrix/').then(function (res) {
    return res.json();
  }).then(function (result) {
    Object.keys(result).forEach(function (key) {
      var letter = key;
      var suggestions = result[key];
      var letterSuggestions = [];
      suggestions.map(function (suggestion) {
        var sName = suggestion.name;
        var sIcon = suggestion.icon;
        var sHd = suggestion.hd;
        var sFree = suggestion.free;
        letterSuggestions.push(suggestion);
      });
      letterData[letter] = letterSuggestions;
    });
    renderSorting();
  })["catch"](function (err) {
    throw err;
  });
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
};

var renderSorting = function renderSorting() {
  var letterHtml = '';
  Object.entries(letterData).forEach(function (letter) {
    letterHtml += '<a class="sort__drop-link" sort-letter-collapse-js data-letter="' + letter[0] + '">' + letter[0].toUpperCase() + '</a>';
  });
  letterHtml += '<div class="sort__drop-inner"></div>';
  var sortcontainer = document.querySelector('[sort-node-js]');

  if (sortcontainer) {
    sortcontainer.innerHTML = letterHtml;
  } //onSortLetterClick(_ev.closest('[sort-letter-collapse-js]'));


  document.querySelectorAll('[sort-letter-collapse-js]').forEach(function (searchLetter) {
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
};

var onSortLetterClick = function onSortLetterClick(letterItem) {
  var letter = letterItem.dataset.letter;
  var suggessionIndex = 1;
  var letterSuggessions = '';
  var suggessionsTop = 10;

  if (!isMobileDevice) {
    if (letter == 'e' | letter == 'f' | letter == 'g' | letter == 'h') {
      suggessionsTop = 44;
    } else if (letter == 'i' | letter == 'j' | letter == 'k' | letter == 'l') {
      suggessionsTop = 78;
    } else if (letter == 'm' | letter == 'n' | letter == 'o' | letter == 'p') {
      suggessionsTop = 112;
    } else if (letter == 'q' | letter == 'r' | letter == 's' | letter == 't') {
      suggessionsTop = 146;
    } else if (letter == 'u' | letter == 'v' | letter == 'w' | letter == 'x') {
      suggessionsTop = 180;
    } else if (letter == 'y') {
      suggessionsTop = 214;
    }
  }

  letterData[letter].forEach(function (suggession) {
    var suggessionName = suggession.name;
    var uL = letter.toUpperCase(); //suggessionName = suggessionName.replace(letter, '<span>'+letter+'</span>');
    //suggessionName = suggessionName.replace(uL, '<span>'+uL+'</span>');

    var siteFree = suggession.free;
    var siteHd = suggession.hd;
    var catIcon = suggession.icon;
    var htmlFree = '';

    if (siteFree) {
      htmlFree = '<a href="' + siteFree + '" class="site_free"><span>Free</span></a>';
    }

    var htmlHd = '';

    if (siteHd) {
      htmlHd = '<a href="' + siteHd + '"><img src="' + themeBase + 'images/img-badge-premium.png" srcset="' + themeBase + 'images/img-badge-premium@2x.png 2x" alt=""/></a>';
    }

    var showLetterToggle = false;

    if (siteFree != '' && siteHd != '') {
      showLetterToggle = true;
    }

    if (showLetterToggle) {
      letterSuggessions += '<div class="sort__collapse">' + '<a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-' + suggessionIndex + '">' + '<div><span>#' + suggessionIndex + '</span></div>' + '<div><img src="' + catIcon + '" />' + '<p>' + suggessionName + '</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></a>' + '<div class="sort__collapse-body" id="sort-collapse-' + suggessionIndex + '" collapse-body-js>' + htmlFree + htmlHd + '</div>' + '</div>';
    } else {
      letterSuggessions += '<div class="sort__collapse">' + '<a class="sort__collapse-toggle" href="' + (siteHd != '' ? siteHd : siteFree) + '">' + '<div><span>#' + suggessionIndex + '</span></div>' + '<div><img src="' + catIcon + '" />' + '<p>' + suggessionName + '</p>' + '</div>' + '</a>' + '<div class="sort__collapse-body" id="sort-collapse-' + suggessionIndex + '" collapse-body-js>' + htmlFree + htmlHd + '</div>' + '</div>';
    }

    suggessionIndex++;
  });
  var activeSortLetter = document.querySelector('.sort__drop-link.is-active');

  if (activeSortLetter) {
    activeSortLetter.classList.remove('is-active');
  }

  var sortSuggesionContainer = document.querySelector('.sort__drop-inner');
  sortSuggesionContainer.classList.add('is-open');
  letterItem.classList.add('is-active');

  if (!isMobileDevice) {
    sortSuggesionContainer.style.top = suggessionsTop + 'px';
  }

  sortSuggesionContainer.innerHTML = letterSuggessions;
};

var onSortToggle = function onSortToggle(sortToggle) {
  var sortContainer = sortToggle.dataset.container;
  var sC = document.querySelector('#' + sortContainer);

  if (sC != undefined && sC.classList.contains('is-open')) {
    sC.classList.remove('is-open');
    return;
  }

  var activeSortCollapse = document.querySelector('.sort__collapse-body.is-open');

  if (activeSortCollapse) {
    activeSortCollapse.classList.remove('is-open');
  }

  if (sC) {
    sC.classList.toggle('is-open');
    /*if(sC.classList.contains('is-open')){
    	sC.classList.remove('is-open');
    }else{
    	sC.classList.add('is-open');
    }*/
  }
};

var loadLoginForm = function loadLoginForm() {
  if (!isLoggedUser) {
    if (!document.querySelector('#login_popup')) {
      var htmlLogin = '<div class="login_container">' + '<div class="login_container_inner user_container_popup login">' + '<div class="user_tab_login">' + '<div class="login_form">' + '<div class="login_top">' + '<div class="title">Log in</div>' + '</div>' + '<form class="cleanlogin-form ajax-login-form cleanlogin-container login_bottom" action="login" method="post">' + '<p class="status result-message"></p>' + '<fieldset>' + '<div class="cleanlogin-field">' + '<input class="cleanlogin-field-username log_username" type="text" name="username" placeholder="Username">' + '</div>' + '<div class="cleanlogin-field">' + '<input class="cleanlogin-field-password log_password" type="password" name="password" placeholder="Password">' + '</div>' + '</fieldset>' + '<fieldset>' + '<div>' + '<input class="submit cleanlogin-field" type="submit" value="Login" name="submit">' + '<div class="remeber_me is_mobile">' + '<input type="checkbox" name="rememberme" value="forever">' + '<label>Keep me logged in?</label>' + '</div>' + '<a class="signup is_desktop popup_link_signup" href="/sign-up/">Sign up now</a>' + '<a class="forgot popup_link_forgot" href="/forgot/">Forgot password?</a>' + '</div>' + '</fieldset>' + '</form>' + '<div class="info_create_mobile is_mobile">' + '<a class="popup_link_signup" href="/sign-up/">Create New Account</a>' + '</div>' + '</div>' + '<img class="login_banner" src="/wp-content/themes/mpg/images/bg_login.png"/>' + '</div>' + '<div class="user_tab_forgot">' + '<div class="login_form">' + '<div class="login_top">' + '<div class="title">Forgot Password</div>' + '<p class="is_mobile top_forgot_text">Enter the email address associated with your account. An email will then be sent with a link to set up a new password.</p>' + '</div>' + '<div class="forgot_page">' + '<form class="cleanlogin-form cleanlogin-container login_bottom" method="post" action="#">' + '<div class="info is_desktop">' + 'Enter your email address and we\'ll email you a link to reset your password or <a href="/sign-up/" class="popup_link_signup">Sign Up</a>' + '<p class="status result-message"></p>' + '</div>' + '<input type="hidden" name="website""value=".">' + '<fieldset>' + '<div class="cleanlogin-field">' + '<input class="cleanlogin-field-username" type="text" name="username" value="" placeholder="Username (or E-mail)">' + '</div>' + '</fieldset>' + '<div>' + '<input type="submit" value="Restore password" name="submit">' + '<input type="hidden" name="action" value="restore">' + '</div>' + '</form>' + '<div class="info_create_mobile is_mobile">' + 'If you have not registered join now for free! <a class="popup_link_signup" href="/sign-up/">Create New Account</a>' + '</div>' + '</div>' + '</div>' + '<img class="login_banner" src="/wp-content/themes/mpg/images/bg_forgot.png"/>' + '</div>' + '<div class="user_tab_join">' + '<div class="login_form">' + '<div class="login_top">' + '<div class="title">Sign up</div>' + '</div>' + '<div class="cleanlogin-container login_bottom">' + '<form class="cleanlogin-form fv-form fv-form-bootstrap registraion-form" method="post" action="#" novalidate="novalidate">' + '<div class="join_results">' + '<div class="indicator"></div>' + '<div class="alert result-message"></div>' + '</div>' + '<fieldset>' + '<div class="cleanlogin-field form-group">' + '<input class="cleanlogin-field-username" type="text" name="user_login" value="" placeholder="Username" data-fv-notempty="true" data-fv-notempty-message="Username is required" data-fv-stringlength="true" data-fv-stringlength-min="4" data-fv-stringlength-max="12" data-fv-stringlength-message="The username must be greater than 4 and less than 12 characters" data-fv-field="user_login">' + '</div>' + '<div class="cleanlogin-field form-group">' + '<input class="cleanlogin-field-password" type="password" name="user_pass" value="" autocomplete="off" placeholder="Password" data-fv-notempty="true" data-fv-notempty-message="The password is required" data-fv-stringlength="true" data-fv-stringlength-min="4" data-fv-stringlength-max="12" data-fv-stringlength-message="The password must be greater than 4 and less than 12 characters" data-fv-field="pass1">' + '</div>' + '<div class="cleanlogin-field form-group">' + '<input class="cleanlogin-field-email" type="email" name="user_email" value="" placeholder="E-mail" data-fv-notempty="true" data-fv-notempty-message="Email is required" data-fv-emailaddress="true" data-fv-emailaddress-message="Enter a valid email address" data-fv-field="user_email">' + '</div>' + '</fieldset>' + '<div>' + '<input type="submit" class="join_button" value="JOIN MR PORN GEEK NOW!" name="submit" onclick1="this.form.submit(); this.disabled = true;">' + '<input type="hidden" name="action" value="register">' + '</div>' + '<div class="already_have is_desktop">' + 'Already Have an Account? <a class="popup_link_login" href="/login/">Log in now</a>' + '</div>' + '<div class="already_have is_mobile">' + 'By registering on Mr Porn Geek. I certify I am at least 18 years old and have read and agree to its <a href="/terms/">Terms of Use</a> and <a href="/privacy-policy/">Privacy Policy</a>.' + '</div>' + '</form>' + '</div>' + '</div>' + '<img class="login_banner" src="/wp-content/themes/mpg/images/bg_signup.png"/>' + '</div>' + '</div>' + '</div>';
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

      var loginHtml = '<a class="login_popup_close"><img src="' + themeBase + 'images/btn_close.png"/></a>' + htmlLogin;
      var e = document.createElement('div');
      e.setAttribute('id', 'login_popup');
      e.innerHTML = loginHtml;
      document.body.appendChild(e); //afrenderLoginForm();
    }
  }
};

var renderLoginForm = function renderLoginForm() {
  if (!isLoggedUser) {
    if (!document.querySelector('#login_popup')) {
      loadLoginForm();
      setTimeout(function () {
        if (document.querySelector('#login_popup')) {
          document.querySelector('#login_popup').classList.toggle('is-open');
          initLoginScripts();
        }
      }, 300);
    } else {
      if (document.querySelector('#login_popup')) {
        document.querySelector('#login_popup').classList.toggle('is-open');
        initLoginScripts();
      }
    }
  }
};

var closeLoginPopups = function closeLoginPopups() {
  if (document.querySelector('#login_popup')) {
    document.querySelector('#login_popup').classList.remove('is-open');
  }
};

function toggleLoginPopups(type) {
  var userPopup = document.querySelector('.user_container_popup');

  if (userPopup) {
    if (type == 'login') {
      userPopup.classList.remove('join');
      userPopup.classList.remove('forgot');
      userPopup.classList.add('login');
      initLoginScripts();
    } else if (type == 'join') {
      userPopup.classList.remove('login');
      userPopup.classList.remove('forgot');
      userPopup.classList.add('join');
      initRegistration();
    } else if (type == 'forgot') {
      userPopup.classList.remove('login');
      userPopup.classList.remove('join');
      userPopup.classList.add('forgot');
      initForgot();
    }
  }
}

var Pagination = {
  code: '',
  // --------------------
  // Utility
  // --------------------
  // converting initialize data
  Extend: function Extend(data) {
    data = data || {};
    Pagination.size = data.size || 300;
    Pagination.page = data.page || 1;
    Pagination.step = data.step || 3;
    Pagination.onChange = data.onChange || onChangePage;
  },
  onChangePage: function onChangePage(page) {},
  // add pages by number (from [s] to [f])
  Add: function Add(s, f) {
    for (var i = s; i < f; i++) {
      Pagination.code += '<a class="item">' + i + '</a>';
    }
  },
  // add last page with separator
  Last: function Last() {
    Pagination.code += '<i>...</i><a class="item">' + Pagination.size + '</a>';
  },
  // add first page with separator
  First: function First() {
    Pagination.code += '<a class="item">1</a><i>...</i>';
  },
  // --------------------
  // Handlers
  // --------------------
  // change page
  Click: function Click() {
    Pagination.page = +this.innerHTML;
    Pagination.Start();
    console.log('changing page ' + Pagination.page);

    if (Pagination.onChange != undefined) {
      Pagination.onChange(Pagination.page);
    }
  },
  // previous page
  Prev: function Prev() {
    Pagination.page--;

    if (Pagination.page < 1) {
      Pagination.page = 1;
    }

    Pagination.Start();

    if (Pagination.onChange != undefined) {
      Pagination.onChange(Pagination.page);
    }
  },
  // next page
  Next: function Next() {
    Pagination.page++;

    if (Pagination.page > Pagination.size) {
      Pagination.page = Pagination.size;
    }

    Pagination.Start();

    if (Pagination.onChange != undefined) {
      Pagination.onChange(Pagination.page);
    }
  },
  // --------------------
  // Script
  // --------------------
  // binding pages
  Bind: function Bind() {
    var a = Pagination.e.getElementsByTagName('a');

    for (var i = 0; i < a.length; i++) {
      if (+a[i].innerHTML === Pagination.page) a[i].className = 'item active';
      a[i].addEventListener('click', Pagination.Click, false);
    }
  },
  // write pagination
  Finish: function Finish() {
    Pagination.e.innerHTML = Pagination.code;
    Pagination.code = '';
    Pagination.Bind();
  },
  // find pagination type
  Start: function Start() {
    if (Pagination.size < Pagination.step * 2 + 4) {
      Pagination.Add(1, Pagination.size + 1);
    } else if (Pagination.page < Pagination.step * 2 + 1) {
      Pagination.Add(1, Pagination.step * 2 + 3);
      Pagination.Last();
    } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
      Pagination.First();
      Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
    } else {
      Pagination.First();
      Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
      Pagination.Last();
    }

    Pagination.Finish();
  },
  // --------------------
  // Initialization
  // --------------------
  // binding buttons
  Buttons: function Buttons(e) {
    var nav = e.getElementsByTagName('a');
    nav[0].addEventListener('click', Pagination.Prev, false);
    nav[1].addEventListener('click', Pagination.Next, false);
  },
  // create skeleton
  Create: function Create(e) {
    var html = ['<a class="item prev"></a>', // previous button
    '<span></span>', // pagination container
    '<a class="item next"></a>' // next button
    ];
    e.innerHTML = html.join('');
    Pagination.e = e.getElementsByTagName('span')[0];
    Pagination.Buttons(e);
  },
  // init
  Init: function Init(e, data) {
    Pagination.Extend(data);
    Pagination.Create(e);
    Pagination.Start();
  }
};
/**
 * @name initPreventBehavior
 *
 * @description
 */

var initPreventBehavior = function initPreventBehavior() {
  var link = document.querySelectorAll("a");
  link.forEach(function (val, idx) {
    val.addEventListener("click", function (e) {
      if (val.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
  });
};

var renderSearch = function renderSearch() {
  var searchHtml = '<div class="category__drop-head">\n' + '                        <div>\n' + '                          <p class="category__title">Top Results (1257)</p>\n' + '                        </div>\n' + '                        <div>\n' + '                          <div class="category__btn-wrapper"><a class="category__btn category__btn--1" href="#"><images src="images/images-black-porn-sites.png" srcset="images/images-black-porn-sites@2x.png 2x" alt=""><span>Black Porn Sites</span></a><a class="category__btn category__btn--2" href="#"><images src="images/images-blog.png" srcset="images/images-blog@2x.png 2x" alt=""><span>Porn Blogs</span></a><a class="category__btn category__btn--3" href="#"><images src="images/images-black-porn-sites.png" srcset="images/images-black-porn-sites@2x.png 2x" alt=""><span>Black Porn Sites</span></a><a class="category__btn category__btn--4" href="#"><images src="images/images-blog.png" srcset="images/images-blog@2x.png 2x" alt=""><span>Porn Blogs</span></a><a class="category__btn category__btn--5" href="#"><images src="images/images-blog.png" srcset="images/images-blog@2x.png 2x" alt=""><span>Amateur Porn Sites</span></a></div>\n' + '                        </div>\n' + '                      </div>\n' + '                      <div class="category__drop-body">\n' + '                        <div class="category__list-wrapper">\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><images src="images/images-pornhub-icon.png" srcset="images/images-pornhub-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Pornhub Premium</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-view-pornhub-premium.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><images src="images/images-brazzers-icon.png" srcset="images/images-brazzers-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Brazzers</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-view-bruzzers.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><images src="images/images-pornhub-icon.png" srcset="images/images-pornhub-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Pornhub Premium</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-view-pornhub-premium.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><images src="images/images-pornhub-icon.png" srcset="images/images-pornhub-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Pornhub Premium</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-view-pornhub-premium.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><images src="images/images-brazzers-icon.png" srcset="images/images-brazzers-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Brazzers</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-view-bruzzers.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><images src="images/images-pornhub-icon.png" srcset="images/images-pornhub-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Pornhub Premium</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-view-pornhub-premium.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--pink"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>WatchMyGF</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-watchmygf.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--green"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>GF Sex</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-gfsex.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--pink"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>WatchMyGF</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-watchmygf.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--pink"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>WatchMyGF</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-watchmygf.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--green"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>GF Sex</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-gfsex.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--pink"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>WatchMyGF</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><images src="images/images-watchmygf.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                        </div>\n' + '                      </div>\n' + '                      <div class="category__drop-footer"><a class="category__load" href="#">Load More</a>\n' + '                        <div class="category__pagination"><a class="category__pagination-btn is-active" href="#">1</a><a class="category__pagination-btn" href="#">2</a><a class="category__pagination-btn" href="#">3</a><a class="category__pagination-btn" href="#">4</a><a class="category__pagination-arrow" href="#"><i class="icon-font icon-arrow-angle"></i></a></div>\n' + '                      </div>';
  var searchDropdownContainer = document.querySelector('[search-drop-js]');
  searchDropdownContainer.innerHTML = searchHtml;
};
/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */


function swiperCB(swiperName, sliderArrow, scrollBar) {
  var categorySwiper = new Swiper(swiperName, {
    loop: false,
    grabCursor: false,
    effect: 'slide',
    speed: 900,
    touchMoveStopPropagation: false,
    simulateTouch: false,
    allowSwipeToNext: true,
    allowSwipeToPrev: true,
    allowPageScroll: "auto",
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    spaceBetween: 0,
    slidesPerGroup: 3,
    navigation: {
      nextEl: sliderArrow + ' .list__arrow--next',
      prevEl: sliderArrow + ' .list__arrow--prev'
    },
    on: {
      init: function init() {
        var swiperSlide = document.querySelectorAll('.swiper-slide');
        document.querySelector(swiperName).closest('.list__box-wrapper').style.opacity = '1';
        document.querySelector(swiperName).closest('.list__box-wrapper').classList.add('is-visible');
        swiperSlide[swiperSlide.length - 1].classList.add('is-last');
        var visibleSlides = document.querySelectorAll('[list-parent-js]')[0].querySelectorAll('.swiper-slide-visible').length;
        var greenBarWidth = 74;

        if (window.innerWidth < 1279) {
          swiperSlideWidth = 100;
        } else if (window.innerWidth <= 1024) {
          swiperSlideWidth = 150;
        } else if (window.innerWidth < 768) {
          swiperSlideWidth = 195;
        }

        if (window.innerWidth < 768) {
          greenBarWidth = 48;
        } else if (window.innerWidth <= 1024) {
          greenBarWidth = 74;
        }

        maxLeft = (visibleSlides - 1) * (swiperSlideWidth + 6) + (swiperSlideWidth - greenBarWidth) / 2 + 12;
        minLeft = swiperSlideWidth / 2 - (swiperSlideWidth - greenBarWidth) / 2;
      },
      slidePrevTransitionEnd: function slidePrevTransitionEnd(e) {
        var swipeWrapper = categorySwiper.$wrapperEl[0];
        renderLeftAndRight(swipeWrapper.dataset.category, categorySwiper);
      },
      slideNextTransitionEnd: function slideNextTransitionEnd(e) {
        var swipeWrapper = categorySwiper.$wrapperEl[0];
        renderLeftAndRight(swipeWrapper.dataset.category, categorySwiper);
      },
      setTranslate: function setTranslate(e, translate) {
        onSwiperTranslate(e, translate);
      }
    }
  });
}

var initSwiper = function initSwiper() {
  var sliders = document.querySelectorAll('.listSwiper'),
      slidersNode = document.querySelectorAll('.list__box-wrapper');
  var idx = null,
      len = sliders.length;

  for (idx = 0; idx < len; idx++) {
    var sliderName = sliders[idx].getAttribute('data-id'),
        sliderWrapper = slidersNode[idx].getAttribute('data-name');
    swiperCB(".swiper-container[data-id=\"".concat(sliderName, "\"]"), ".list__box-wrapper[data-name='".concat(sliderWrapper, "']"), ".swiper-scrollbar[data-id=\"".concat(sliderName, "\"]"));
  }
};

function fixPrevSlides(category, swiper) {
  var swipeWrapper = swiper.$wrapperEl[0];
  var totalSites = swipeWrapper.dataset.count;
  var currentLoadedcount = swipeWrapper.dataset.slidecount;
  var currentSlideIndex = swiper.activeIndex;
  var slidsCount = swiper.slides.length;

  if (slidsCount > 12) {
    console.log('Removing slides ' + currentSlideIndex);

    for (var i = 0; i < currentSlideIndex - 6; i++) {//swiper.removeSlide(i);
    }

    swiper.slides[0].innerHTML = '';
  }

  console.log('changing slide -' + swipeWrapper.dataset.category + ' - ' + swiper.slides.length + ' - ' + currentSlideIndex);
}

function fixNextSlides(category, swiper) {
  var swipeWrapper = swiper.$wrapperEl[0];
  var totalSites = swipeWrapper.dataset.count;
  var currentSlideIndex = swiper.activeIndex;
  var loadedSlideCount = swipeWrapper.dataset.slidecount;
  var firstSlide = swiper.slides[0],
      lastSlide = swiper.slides[swiper.slides.length - 1];
  var firstIndex = parseInt(firstSlide.dataset.index);
  loadNextSlide(category, swiper);
  loadNextSlide(category, swiper);
  loadNextSlide(category, swiper);
}

function adjustNextSlides(category, swiper) {
  var swipeWrapper = swiper.$wrapperEl[0];
  var totalSites = swipeWrapper.dataset.count;
  var lastSlide = swiper.slides[swiper.slides.length - 1];
  var lastIndex = parseInt(lastSlide.dataset.index);

  if (totalSites > lastIndex) {
    var nextItem = renderHompageSiteSlide(category, lastIndex + 1);

    if (nextItem) {
      swiper.appendSlide(nextItem);
    }
  }
}

function onSwiperLeft(category, swiper) {
  var currentSlideIndex = swiper.activeIndex;
  var swipeWrapper = swiper.$wrapperEl[0];
  var totalSites = swipeWrapper.dataset.count;
  var prevLastIndex = currentSlideIndex - 6;
  var prevFirstIndex = prevLastIndex - 6;

  if (prevFirstIndex < 0) {
    prevFirstIndex = 0;
  }

  var loadedPrevSlides = 0;
  console.log("prev start " + currentSlideIndex);

  for (var i = currentSlideIndex; i >= 0; i--) {
    if (swiper.slides[i].innerHTML.trim() == '') {
      if (loadedPrevSlides < 6) {
        console.log(currentSlideIndex + ' - rendering slide ' + i);
        var prevItem = renderHompageSiteSlide(category, i);

        if (prevItem && swiper.slides[i]) {
          swiper.slides[i].innerHTML = prevItem;
          loadedPrevSlides++;
        }
      }
    }
  }

  if (currentSlideIndex > 6) {
    for (var i = currentSlideIndex + 8; i < totalSites; i++) {
      if (swiper.slides[i] && swiper.slides[i].innerHTML != '') {
        swiper.slides[i].innerHTML = '';
      }
    }
  }

  renderLeftAndRight(category, swiper);
}

function onSwiperRight(category, swiper) {
  var currentSlideIndex = swiper.activeIndex;
  var swipeWrapper = swiper.$wrapperEl[0];
  var totalSites = swipeWrapper.dataset.count;
  /*if(currentSlideIndex>6){
  	for(var i=0; i<(currentSlideIndex-8); i++){
  		if(swiper.slides[i]){
  			swiper.slides[i].innerHTML = '';
  		}
  	}
  }*/

  var nextSlideIndex = 0;
  console.log("next start " + currentSlideIndex);

  for (var i = currentSlideIndex; i < totalSites; i++) {
    if (nextSlideIndex < 6) {
      if (swiper.slides[i] && swiper.slides[i].innerHTML == '') {
        var nextItem = renderHompageSiteSlide(category, i);

        if (nextItem) {
          swiper.slides[i].innerHTML = nextItem;
          nextSlideIndex++;
        }
      }
    }
  }

  renderLeftAndRight(category, swiper);
}

function renderLeftAndRight(category, swiper) {
  var currentSlideIndex = swiper.activeIndex;
  var swipeWrapper = swiper.$wrapperEl[0];
  var totalSites = swipeWrapper.dataset.count;

  for (var i = 0; i < totalSites; i++) {
    if (i > currentSlideIndex - 6 && i < currentSlideIndex + 8) {
      if (swiper.slides[i] && swiper.slides[i].innerHTML.trim() == '') {
        var slideItem = renderHompageSiteSlide(category, i);

        if (slideItem) {
          swiper.slides[i].innerHTML = slideItem;
        }
      }
    } else {
      if (swiper.slides[i]) {//swiper.slides[i].innerHTML = '';
      }
    }
  }

  boxHover();
}
/**
 * POLYFILL
 * ===================================
 */


var isMobileDevice = false;
var homeData = [];
var currentPopupBanner;
var clonedPopupBanner;
var clonedPopupTimeout;
var isLoggedUser = false;
var dataTime;
var currentLang = 'en';

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}

var cdnLink = '//mpgcdn.b-cdn.net';
var contentBase = '/wp-content/';
var themeBase = '/wp-content/themes/mpg/';
var ajaxEndpoint = '/wp-content/themes/mpg/ajax-handler-wp.php';
var ajaxAdminEndpoint = '/wp-admin/admin-ajax.php';
/**
 * end POLYFILL
 * ===================================
 */

(function () {
  /**
   * MAIN CALLBACK
   * ===================================
   */
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  initLoggedUser();
  initGotoTop();
  var headerHeight = 0;

  var initHome = function initHome() {
    homeScroll();
    document.querySelector('#list').addEventListener('mouseover', function (_ev) {
      if (_ev.target.closest('[list-box-js]')) {
        siteBoxHover(_ev.target.closest('[list-box-js]'));
      }
    });
  };

  var homeScroll = function homeScroll() {
    if (document.body.classList.contains('home')) {
      window.addEventListener('scroll', function (e) {
        onHomeScroll(e);
      });
    }
  };

  var onHomeScroll = function onHomeScroll(e) {
    var wY = window.scrollY;
    headerHeight = document.querySelector('#header').getBoundingClientRect().height;
    var categoryListH = document.querySelector('#list').getBoundingClientRect().height;
    var listBoxes = document.querySelectorAll('.list__box-wrapper');
    var firstCategoryListHeight = listBoxes[0].getBoundingClientRect().height;
    var expectedY = headerHeight + categoryListH - firstCategoryListHeight * 8;
    var catListContainer = document.querySelector('#list .c-grid');

    if (wY > expectedY) {
      if (!document.querySelector('[category_list_' + (listBoxes.length + 1) + ']')) {
        if (homeData && homeData.categories_indexes) {
          var catId = homeData.categories_indexes[listBoxes.length];
          var categoryHtml = renderSiteCategory(listBoxes.length);
          catListContainer.insertAdjacentHTML('beforeend', categoryHtml);
          swiperCB(".swiper-container[data-id=\"listSlider_".concat(catId, "\"]"), ".list__box-wrapper[data-name='category_".concat(catId, "']"));
          boxHover();
        }
      }
    }
  };

  var bodyClick = function bodyClick() {
    var className = '.header__view-wrapper, .sort';
    document.addEventListener('click', function (ev) {
      var _ev = ev.target;

      if (!_ev.closest('.nav_link')) {//ev.preventDefault();
      }

      if (!_ev.closest('[sort-node-js]')) {
        var openSort = document.querySelector('.sort__drop.is-open');

        if (openSort) {
          openSort.classList.remove('is-open');
        }
      }

      if (!_ev.closest('.awe_search_result')) {
        if (document.querySelector('#awe_search_term')) {
          document.querySelector('#awe_search_term').value = '';
        }

        hide(document.querySelector('.awe_search_result'));
      }

      if (_ev.closest('.list__specification-close')) {
        closeBanner(_ev);
      } else if (_ev.closest('.list__box-more')) {
        showBanner(_ev);
      } else if (_ev.closest('[more-toggle-js]')) {
        showBanner(_ev);
      } else if (_ev.closest('[spec-like-js]')) {
        onBannerLikeClick(_ev.closest('[spec-like-js]'));
      } else if (_ev.closest('[spec-dislike-js]')) {
        onBannerDislikeClick(_ev.closest('[spec-dislike-js]'));
      } else if (_ev.closest('[like-toggle-js]')) {
        onSiteBoxLikeClick(_ev.closest('[like-toggle-js]'));
      } else if (_ev.closest('[dislike-toggle-js]')) {
        onSiteBoxDislikeClick(_ev.closest('[dislike-toggle-js]'));
      } else if (_ev.closest('[favorites-toggle-js]')) {
        onSiteBoxFavourite(_ev.closest('[favorites-toggle-js]'));
      } else if (_ev.closest('[un-favorites-js]')) {
        removeFavourite(_ev.closest('[un-favorites-js]'));
      } else if (_ev.closest('[spec-favorites-js]')) {
        onBannerFavourite(_ev.closest('[spec-favorites-js]'));
      } else if (_ev.closest('[video-toggle-js]')) {
        onPlayClick(_ev.closest('[video-toggle-js]'));
      } else if (_ev.closest('[video-pause-js]')) {
        onPauseClick(_ev.closest('[video-pause-js]'));
      } else if (_ev.classList.contains('[video-parent-js]')) {
        toggleVideoPlay(_ev);
      } else if (_ev.closest('[video-parent-js]')) {
        toggleVideoPlay(_ev.closest('[video-parent-js]'));
      } else if (_ev.closest('[spec-skip-js]')) {
        onSkip(_ev.closest('[spec-skip-js]'));
      } else if (_ev.closest('[sort-letter-collapse-js]')) {//onSortLetterClick(_ev.closest('[sort-letter-collapse-js]'));
      } else if (_ev.closest('[collapse-toggle-js]')) {
        onSortToggle(_ev.closest('[collapse-toggle-js]'));
      } else if (_ev.classList.contains('list__box-details')) {
        onSiteBoxHoverClick(_ev);
      } else if (_ev.closest('.login_popup_close')) {
        closeLoginPopups();
      } else if (_ev.classList.contains('popup_link_signup')) {
        ev.preventDefault();
        toggleLoginPopups('join');
      } else if (_ev.classList.contains('popup_link_login')) {
        ev.preventDefault();
        toggleLoginPopups('login');
      } else if (_ev.classList.contains('popup_link_forgot')) {
        ev.preventDefault();
        toggleLoginPopups('forgot');
      } else if (_ev.classList.contains('hdrfavttl')) {
        ev.preventDefault();
        document.querySelector('.mobile_fav_link').classList.toggle('open');
      } else if (_ev.parentNode && !_ev.closest('[search-parent-js]')) {
        if (!isMobileOrTablet) {
          if (document.querySelector('[search-js]')) {
            document.querySelector('[search-js]').value = '';
          }

          if (!_ev.closest('[search-parent-js]')) {
            hide(document.querySelector('[search-drop-js]'));
          }
        }
      }

      if (!_ev.closest(className)) {
        // VIEW FAVORITES
        if (document.querySelector('[view-favorites-toggle-js]')) {
          document.querySelector('[view-favorites-toggle-js]').classList.remove('is-active');
        }

        if (document.querySelector('[view-favorites-drop-js]')) {
          document.querySelector('[view-favorites-drop-js]').classList.remove('is-open');
        } // SORT


        if (!isMobileOrTablet) {
          if (document.querySelector('[sort-node-js]')) {
            document.querySelector('[sort-node-js]').classList.remove('is-open');
          }
        }

        if (document.querySelector('.sort__drop-inner')) {
          document.querySelector('.sort__drop-inner').classList.remove('is-open');
        }

        var _isActive = document.querySelector('.sort__drop-link.is-active');

        if (_isActive) {
          _isActive.classList.toggle('is-active');
        }
      }
    }, false);
    /*let cGrid = document.querySelector('#list .c-grid');
    if(cGrid){
    	cGrid.addEventListener('mouseenter', function(ev) {
    		const _ev = ev.target;
    		if(_ev){
    			console.log(_ev.classList);
    			if(_ev.classList.contains('list__box-more') | _ev.closest('.list__box-more')){
    				onShowBannerEnter(_ev);
    			}
    		}
    	}, false);
    		cGrid.addEventListener('mouseout', function(ev) {
    		const _ev = ev.target;
    		if(_ev){
    			console.log(_ev.classList);
    			if(_ev.classList.contains('list__box-more') | _ev.closest('.list__box-more')){
    				onShowBannerLeave(_ev);
    			}
    		}
    	}, false);
    }*/
  };

  function onSiteBoxHoverClick(_el) {
    var siteBoxLink = _el.previousSibling;

    if (siteBoxLink && siteBoxLink.tagName == 'A') {
      siteBoxLink.click();
    }
  }

  var viewFavoritesToggle = function viewFavoritesToggle() {
    var _btn = document.querySelector('[view-favorites-toggle-js]'),
        _node = document.querySelector('[view-favorites-drop-js]');

    if (_btn) {
      _btn.addEventListener('click', function (ev) {
        _btn.classList.toggle('is-active');

        _node.classList.toggle('is-open');

        document.querySelector('[sort-node-js]').classList.remove('is-open');
        document.querySelector('.sort__drop-inner').classList.remove('is-open');
        var i = null,
            len = document.querySelectorAll('.sort__drop-link').length;

        for (i = 0; i < len; i++) {
          document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
        }
      }, false);
    }
  };

  var sortCB = function sortCB() {
    var sortToggle = function sortToggle() {
      var toggleSort = document.querySelector('[sort-toggle-js]'),
          nodeSort = document.querySelector('[sort-node-js]');
      toggleSort.addEventListener('click', function (ev) {
        if (nodeSort.innerHTML.trim() == '') {
          renderSorting();
          sortDropInner();
          sortCollapse();
        }

        nodeSort.classList.toggle('is-open');
      }, false);
    };

    var sortDropInner = function sortDropInner() {
      var links = document.querySelectorAll('.sort__drop-link'),
          nodeDropInner = document.querySelector('.sort__drop-inner');
      var i = null,
          len = links.length;

      for (i = 0; i < len; i++) {
        links[i].addEventListener('click', function (ev) {
          var el = ev.currentTarget;

          if (el.classList.contains('is-active')) {
            el.classList.remove('is-active');
            nodeDropInner.classList.remove('is-open');
          } else {
            for (var j = 0; j < links.length; j++) {
              links[j].classList.remove('is-active');
            }

            el.classList.add('is-active');
            nodeDropInner.classList.add('is-open');
          }
        }, false);
      }
    };

    var sortCollapse = function sortCollapse() {
      var toggles = document.querySelectorAll('[collapse-toggle-js]');
      var i = null,
          len = toggles.length;

      for (i = 0; i < len; i++) {
        toggles[i].addEventListener('click', function (ev) {
          var el = ev.currentTarget,
              container = document.getElementById(el.dataset.container);

          if (document.querySelector('.sort__collapse-body.is-open')) {
            document.querySelector('.sort__collapse-toggle.is-active').classList.remove('is-active');
            document.querySelector('.sort__collapse-body.is-open').classList.remove('is-open');
          }

          el.classList.toggle('is-active');
          container.classList.toggle('is-open');
        }, false);
      }
    };

    sortToggle();
  };

  var search = function search() {
    var searchInput = document.querySelector('[search-js]');

    if (searchInput) {
      searchInput.addEventListener('keyup', function (ev) {
        var self = ev.currentTarget,
            selfVal = self.value,
            parentNode = self.closest('[search-parent-js]'),
            dropNode = parentNode.querySelector('[search-drop-js]');

        if (selfVal.length > 0) {
          dropNode.classList.add('is-open');
        } else {
          dropNode.classList.remove('is-open');
        }
      }, false);
    }
  };

  function playPause11(vid) {
    vid.pause();
    vid.currentTime = 0;
    vid.load();
  }

  function playPause(vid) {
    if (vid.paused) {
      vid.play();
    } else {
      vid.pause();
    }
  }

  function cloneCurrentPopupBanner() {
    currentPopupBanner = document.querySelector('.list__specification.is-open');

    if (currentPopupBanner) {
      var popupBannerWrapper = currentPopupBanner.closest('.list__specification-wrapper');

      if (popupBannerWrapper) {
        clonedPopupBanner = currentPopupBanner.cloneNode(true);
        clonedPopupBanner.setAttribute('class', 'list__snapshot is-snapshot');
        popupBannerWrapper.insertBefore(clonedPopupBanner, currentPopupBanner);
      }
    }
  }

  function closeBanner(_el) {
    //closeAllSnapshots();
    parent = _el.closest('.list__specification');

    _el.closest('.list__box-wrapper').classList.remove('is-open');

    _el.closest('.list__specification').classList.remove('is-open');

    if (window.innerWidth <= 1024) {
      document.querySelectorAll("html, body").forEach(function (val, idx) {
        val.classList.remove("is-hideScroll");
      });
    }

    if (document.querySelector('[video-js]')) {
      document.querySelector('[video-js]').pause(); //playPause(document.querySelector('[video-js]'));
    }

    if (parent.querySelector('[video-toggle-js]')) {
      parent.querySelector('[video-pause-js]').classList.remove('is-active');
      parent.querySelector('[video-toggle-js]').classList.remove('is-active');
    }

    var jInner = null,
        lInner = document.querySelectorAll('.list__box-more').length;

    for (jInner = 0; jInner < lInner; jInner++) {
      if (document.querySelectorAll('.list__box-more')[jInner].closest('.list__box').classList.contains('is-active')) {
        document.querySelectorAll('.list__box-more')[jInner].closest('.list__box').classList.remove('is-active');
      }
    }
  }

  var videoToggle = function videoToggle() {
    var videoPlayBtns = document.querySelectorAll('[video-toggle-js]'),
        videoPauseBtns = document.querySelectorAll('[video-pause-js]');

    for (var i = 0, len = videoPlayBtns.length; i < len; i++) {
      videoPlayBtns[i].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onPlayClick(el);
      }, false);
    }

    for (var _i3 = 0, _len3 = videoPauseBtns.length; _i3 < _len3; _i3++) {
      videoPauseBtns[_i3].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onPauseClick(el);
      }, false);
    }
  };

  var detailsToggleAction = function detailsToggleAction() {
    var favoritesBtns = document.querySelectorAll('[favorites-toggle-js]'),
        specFavoritesBtns = document.querySelectorAll('[spec-favorites-js]'),
        likeBtns = document.querySelectorAll('[like-toggle-js]'),
        specLikeBtns = document.querySelectorAll('[spec-like-js]'),
        dislikeBtns = document.querySelectorAll('[dislike-toggle-js]'),
        specDislikeBtns = document.querySelectorAll('[spec-dislike-js]'),
        skipBtns = document.querySelectorAll('.list__specification-skip');

    for (var i = 0, len = favoritesBtns.length; i < len; i++) {
      favoritesBtns[i].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onSiteBoxFavourite(el);
      }, false);
    }

    for (var _i4 = 0, _len4 = skipBtns.length; _i4 < _len4; _i4++) {
      skipBtns[_i4].addEventListener('click', function (ev) {
        ev.currentTarget.classList.toggle('is-active');
      }, false);
    }

    for (var _i5 = 0, _len5 = specFavoritesBtns.length; _i5 < _len5; _i5++) {
      specFavoritesBtns[_i5].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onBannerFavourite(el);
      }, false);
    }

    for (var _i6 = 0, _len6 = likeBtns.length; _i6 < _len6; _i6++) {
      likeBtns[_i6].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onSiteBoxLikeClick(el);
      }, false);
    }

    for (var _i7 = 0, _len7 = specLikeBtns.length; _i7 < _len7; _i7++) {
      specLikeBtns[_i7].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onBannerLikeClick(el);
      }, false);
    }

    for (var _i8 = 0, _len8 = dislikeBtns.length; _i8 < _len8; _i8++) {
      dislikeBtns[_i8].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onSiteBoxDislikeClick(el);
      }, false);
    }

    for (var _i9 = 0, _len9 = specDislikeBtns.length; _i9 < _len9; _i9++) {
      specDislikeBtns[_i9].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onBannerDislikeClick(el);
      }, false);
    }
  };

  function onPlayClick(el) {
    var parentVideoNode = el.closest('[video-parent-js]');
    el.classList.add('is-active');
    parentVideoNode.querySelector('[video-pause-js]').classList.add('is-active');
    playPause(parentVideoNode.querySelector('[video-js]'));
  }

  function onPauseClick(el) {
    var parentVideoNode = el.closest('[video-parent-js]');
    el.classList.remove('is-active');
    parentVideoNode.querySelector('[video-toggle-js]').classList.remove('is-active');
    playPause(parentVideoNode.querySelector('[video-js]'));
  }

  function toggleVideoPlay(el) {
    var parentVideoNode = el;
    var video = el.querySelector('[video-js]');

    if (video.paused) {
      el.classList.add('is-active');
      parentVideoNode.querySelector('[video-toggle-js]').classList.add('is-active');
      parentVideoNode.querySelector('[video-pause-js]').classList.add('is-active');
    } else {
      el.classList.remove('is-active');
      parentVideoNode.querySelector('[video-toggle-js]').classList.remove('is-active');
      parentVideoNode.querySelector('[video-pause-js]').classList.remove('is-active');
    }

    playPause(el.querySelector('[video-js]'));
  }

  function onSiteBoxFavourite(el) {
    if (!isLoggedUser) {
      renderLoginForm();
      return;
    }

    var elID = el.getAttribute('data-id'),
        elParent = el.closest('.list__box-wrapper');
    console.log('Fav box ' + elID);
    var specificationFavoritesBtn = elParent.querySelector('[data-favorites="' + elID + '"]');
    el.classList.toggle('is-active');

    if (specificationFavoritesBtn) {//specificationFavoritesBtn.classList.toggle('is-active');
    }

    addToFavourites(elID);
  }

  function onBannerFavourite(el) {
    if (!isLoggedUser) {
      renderLoginForm();
      return;
    }

    var elID = el.getAttribute('data-id'),
        elParent = el.closest('.list__box-wrapper');
    addToFavourites(elID); //const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),

    var listFavoritesBtn = elParent.querySelector('.list__box-favorites[data-id="' + elID + '"]');
    console.log('Clicking favourite button');
    el.classList.toggle('is-active');

    if (listFavoritesBtn) {
      listFavoritesBtn.classList.toggle('is-active');
    }
  }

  function onSiteBoxLikeClick(el) {
    var elID = el.getAttribute('data-id'),
        elParent = el.closest('.list__box-wrapper');
    el.classList.toggle('is-active');
    onLike(el, elID);
    elParent.querySelector('[dislike-toggle-js][data-id="' + elID + '"]').classList.toggle('is-hide');
    var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]');

    if (specificationBlock) {
      var specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]'),
          specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]');
      specificationLikeBtn.classList.toggle('is-active');
      specificationDislikeBtn.parentElement.classList.toggle('is-hide');
    }
  }

  function onBannerLikeClick(el) {
    var elID = el.getAttribute('data-like'),
        elParent = el.closest('.list__box-wrapper'),
        elActionNode = el.closest('[spec-actionNode-js]'),
        dislikeBtn = elActionNode.querySelector('[spec-dislike-js]');
    console.log('Trying to like ' + elID);
    dislikeBtn.parentElement.classList.toggle('is-hide');
    var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
        listLikeBtn = listBlock.querySelector('.list__box-like'),
        listDislikeBtn = listBlock.querySelector('.list__box-dislike');
    el.classList.toggle('is-active');
    onLike(el, elID);
    listLikeBtn.classList.toggle('is-active');
    listDislikeBtn.classList.toggle('is-hide');
  }

  function onSiteBoxDislikeClick(el) {
    var elID = el.getAttribute('data-id'),
        elParent = el.closest('.list__box-wrapper');
    console.log('Disliking ' + elID);
    onDisLike(el, elID);
    elParent.querySelector('[like-toggle-js][data-id="' + elID + '"]').classList.toggle('is-hide');
    var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]');

    if (specificationBlock) {
      var specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]'),
          specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]');
      specificationDislikeBtn.classList.toggle('is-active');
      specificationLikeBtn.parentElement.classList.toggle('is-hide');
    }
  }

  function onBannerDislikeClick(el) {
    var elID = el.getAttribute('data-dislike'),
        elParent = el.closest('.list__box-wrapper'),
        elActionNode = el.closest('[spec-actionNode-js]'),
        likeBtn = elActionNode.querySelector('[spec-like-js]');
    likeBtn.parentElement.classList.toggle('is-hide');
    var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
        listDislikeBtn = listBlock.querySelector('.list__box-dislike'),
        listLikeBtn = listBlock.querySelector('.list__box-like');
    onDisLike(el, elID);
    listDislikeBtn.classList.toggle('is-active');
    listLikeBtn.classList.toggle('is-hide');
  }

  function initGotoTop() {
    var goTop = document.querySelector('.go-top');

    window.onscroll = function () {
      if (window.scrollY > 200) {
        show(goTop);
      } else {
        hide(goTop);
      }
    };

    document.querySelector('body').ontouchmove = function () {
      if (document.querySelector(".main-outer")) {
        var mainScroll = -document.querySelector(".main-outer").getBoundingClientRect().top;

        if (mainScroll > 200) {
          show(goTop);
        } else {
          hide(goTop);
        }
      }
    };

    goTop.onclick = function (event) {
      doScrolling(0, 200);
      return false;
    };
  }

  var siteBoxHover = function siteBoxHover(el) {
    var elID = el.getAttribute('data-id'),
        elWidth = el.clientWidth;
    var parent = el.closest('[list-parent-js]'),
        listIndicator = parent.querySelector('[list-line-js]');
    var listIndicatorWidth = 0;

    if (window.innerWidth >= 1024) {
      listIndicatorWidth = 64;
    } else if (window.innerWidth >= 768) {
      listIndicatorWidth = 34;
    } else {
      listIndicatorWidth = 14;
    }

    var _elRect = el.getBoundingClientRect();

    var _listContainer = document.querySelector('#list .list__box-wrapper'),
        _listContainerDimm = _listContainer.getBoundingClientRect();

    var _sum = 0;

    for (var idx = 1; idx < elID; idx++) {
      if (_elRect.width * idx < _elRect.x - _listContainerDimm.x) {
        _sum++;
      } else {
        break;
      }
    }

    var _indicatorOffset = (elWidth - listIndicatorWidth) / 2,
        _lineOffset = _elRect.width * _sum + (_sum * 6 - 3) + _indicatorOffset;
    /*listIndicator.setAttribute(
    	'style',
    	'transform: translateX(' + _lineOffset + 'px)'
    );*/

  };

  var detectDevice = function detectDevice() {
    var check = false;

    function _helper() {
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);

      if (check) {
        isMobileDevice = true;
        document.getElementsByTagName('body')[0].classList.add('is-mobile');
      } else {
        isMobileDevice = false;
        document.getElementsByTagName('body')[0].classList.remove('is-mobile');
      }
    }

    _helper();

    window.addEventListener('resize', function () {
      _helper();
    });
  };

  var skipModal = function skipModal() {
    var skipBtns = document.querySelectorAll('[spec-skip-js]');
  };

  function onSkip(el) {
    var elID = el.getAttribute('data-id'),
        elParent = el.closest('.list__box-wrapper');
    var currentCategory = el.dataset.category;

    if (window.innerWidth < 1024) {
      cloneCurrentPopupBanner();
    }

    el.closest('.list__specification').querySelector('.list__specification-close').click();
    setTimeout(function () {
      var nextSite = elParent.querySelector('.swiper-slide[data-siteid="' + elID + '"]').nextSibling;

      if (nextSite) {
        console.log('Next site ' + nextSite.dataset.siteid);

        if (nextSite.querySelector('.list__box-more')) {
          showBanner(nextSite.querySelector('.list__box-more'), true);
        } else {
          var nextIndex = nextSite.dataset.index;
          var prevItem = renderHompageSiteSlide(currentCategory, nextIndex);

          if (prevItem && nextSite) {
            nextSite.innerHTML = prevItem;
            showBanner(nextSite.querySelector('.list__box-more'), true);
          }
        }
      } else {
        var firstSite = elParent.querySelector('.swiper-slide').firstChild;

        if (firstSite) {
          if (firstSite.querySelector('.list__box-more')) {
            showBanner(firstSite.querySelector('.list__box-more'), true);
          }
        }
      }
    }, 100);
  }

  var toggleMoreBox = function toggleMoreBox() {
    var moreBoxes = document.querySelectorAll('[list-box-more-js]');

    for (var i = 0; i < moreBoxes.length; i++) {
      moreBoxes[i].addEventListener('click', function (ev) {
        var el = ev.currentTarget,
            elID = Number(el.getAttribute('data-id')),
            elCount = Number(el.getAttribute('data-count')),
            elParent = el.closest('.list__box-wrapper');
        var listBoxCount = elParent.querySelectorAll('.list__box-body .list__box').length;
        el.closest('.list__specification').querySelector('.list__specification-close').click();

        if (elID + 6 <= listBoxCount) {
          elParent.querySelector('.list__specification[data-id="' + (elID + elCount) + '"]').classList.add('is-open');
        } else {
          var remainder = 6 - (listBoxCount - elID);

          if (remainder === 6) {
            elParent.querySelector('.list__specification[data-id="' + elCount + '"]').classList.add('is-open');
          } else {
            elParent.querySelector('.list__specification[data-id="' + (elID + elCount) + '"]').classList.add('is-open');
          }

          elParent.querySelector('.list__specification[data-id="' + elCount + '"]').classList.add('is-open');
        }
      }, false);
    }
  };
  /**
   * end MAIN CALLBACK
   * ===================================
   */

  /**
   * @name initNative
   *
   * @description Init all method
   */


  var initNative = function initNative() {
    console.log('initNative'); // default

    initPreventBehavior(); // ==========================================

    currentLang = document.documentElement.getAttribute('lang'); // lib

    initSwiper();
    initHamburger(); // ==========================================
    // callback

    detectDevice();
    bodyClick();
    initHome();
    renderFavourites();
    viewFavoritesToggle(); //sortCB();

    if (isMobileOrTablet) {
      sortCB();
    }

    letterSearch();
    search();
    boxHover(); //		boxMore();

    videoToggle(); //listIndicator();
    //detailsToggleAction();

    skipModal();
    toggleMoreBox(); // ==========================================
    //loadHomeData();

    dataTime = document.querySelector('meta[name="data_time"]').content;
    initWebWorker();
    getLikesAndDislikes();
  };

  var onWindowBlur = function onWindowBlur() {
    if (document.querySelector('[video-js]')) {
      document.querySelector('[video-js]').pause();
    }
  };

  var onWindowChange = function onWindowChange() {
    var __vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', "".concat(__vh, "px"));
  };
  /**
   * @description Init all CB after page load
   */


  window.addEventListener('load', function (ev) {
    initNative();
  });
  window.addEventListener('blur', function (ev) {
    onWindowBlur();
  });
  window.addEventListener("orientationchange", function (event) {
    onWindowChange();
    setTimeout(function () {
      onWindowChange();
    }, 500);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1023) {
      if (document.querySelector('.list__specification.is-open')) {
        document.getElementsByTagName('html')[0].classList.remove('is-hideScroll');
        document.getElementsByTagName('body')[0].classList.remove('is-hideScroll');
      }
    } else {
      onWindowChange();
      setTimeout(function () {
        onWindowChange();
      }, 500);

      if (document.querySelector('.list__specification.is-open')) {
        document.getElementsByTagName('html')[0].classList.add('is-hideScroll');
        document.getElementsByTagName('body')[0].classList.add('is-hideScroll');
      }
    }
  });
})();