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
    console.log('Checkout this JSON! ', out);
    console.log(data);
    callback(out);
  })["catch"](function (err) {
    console.log(err);
    throw err;
  });
}

var webworkerFrontpage;

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
  var url = 'http://mpg.c2136.cloudnet.cloud/wp-json/mpg/home/';
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (out) {
    homeData = out; //renderAllOtherCategories();

    setTimeout(renderAllOtherCategories, 100);
  })["catch"](function (err) {
    throw err;
  });
};

function renderHompageSiteSlide(category, index) {
  var siteItem = homeData.categories[category].sites[index];

  if (siteItem) {
    var siteId = siteItem.id;
    var siteLink = siteItem.link;
    var siteName = siteItem.name;
    var siteThumb = siteItem.thumb;
    var siteLogo = siteItem.logo ? siteItem.logo.src : '';
    var slideHtml = '<div class="swiper-slide" data-siteid="' + siteId + '" category_list_' + index + '>' + '<a class="list__box nolazy" list-box-js href="' + siteLink + '" target="_blank" data-id="' + siteId + '" style="background-image: url(' + siteThumb + ')">' + '<div class="list__box-overlay"></div>' + '<div class="list__box-border"></div><img class="list__box-logo nolazy" src="' + siteLogo + '" alt=""/>' + '<div class="list__box-details">' + '<div class="list__box-details-left">' + '<button class="list__box-external" type="button"><i class="icon-font icon-out"></i></button>' + '<p class="list__box-details-title"><a href="' + siteLink + '" target="_blank">' + siteName + '</a></p>' + '<div class="list__rating"><span>User Rating:</span>' + '<div><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star-fill"></i></div>' + '</div>' + '</div>' + '<div class="list__box-details-right">' + '<button class="list__box-like" type="button" data-id="1" like-toggle-js><i class="icon-font icon-like"></i></button>' + '<button class="list__box-dislike" type="button" data-id="1" dislike-toggle-js><i class="icon-font icon-like"></i></button>' + '<div class="c-popper">' + '<button class="list__box-favorites" type="button" data-id="1" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>' + '<div class="c-poppertext">' + '<u>Add To Favourites</u>' + '<u>Remove From Favourites</u>' + '</div>' + '</div>' + '</div>' + '</div>' + '<button class="list__box-more" type="button"><i class="icon-font icon-arrow-angle"></i></button>' + '</a>' + '</div>';
    return slideHtml;
  }

  return false;
}

function renderSiteHoverContent(category, index) {
  if (!homeData.categories[category]) {
    return false;
  }

  var siteItem = homeData.categories[category].sites[index];

  if (siteItem) {
    var siteId = siteItem.id;
    var siteLink = siteItem.link;
    var siteName = siteItem.name;
    var siteThumb = siteItem.thumb;
    var hoverContent = '<div class="list__box-details-left">' + '<button class="list__box-external" type="button"><i class="icon-font icon-out"></i></button>' + '<p class="list__box-details-title">' + siteName + '</p>' + '<div class="list__rating"><span>User Rating:</span>' + '<div><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star-fill"></i></div>' + '</div>' + '</div>' + '<div class="list__box-details-right">' + '<button class="list__box-like" type="button" data-id="' + siteId + '" like-toggle-js><i class="icon-font icon-like"></i></button>' + '<button class="list__box-dislike" type="button" data-id="' + siteId + '" dislike-toggle-js><i class="icon-font icon-like"></i></button>' + '<div class="c-popper">' + '<button class="list__box-favorites" type="button" data-id="' + siteId + '" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>' + '<div class="c-poppertext">' + '<u>Add To Favourites</u>' + '<u>Remove From Favourites</u>' + '</div>' + '</div>' + '</div>';
    return hoverContent;
  }

  return false;
}

function renderSiteBottomBanner(category, index) {
  console.log('rendering ' + category + ' - ' + index);
  var siteItem = homeData.categories[category].sites[index];

  if (siteItem) {
    var siteId = siteItem.id;
    var bannerType = siteItem.banner_type;
    var bannerImage = siteItem.banner_image;
    var bannerVideo = siteItem.banner_video;
    var bannerVideoPoster = siteItem.banner_video_poster;
    var siteLogo = siteItem.logo ? siteItem.logo.src : '';
    var tagLIne = siteItem.tagline;
    console.log(category + ' - ' + index);
    console.log(siteItem);
    var bannerRight = '';
    var bannerClass = '';

    if (bannerType == 'image') {
      bannerClass = 'list__specification--banner';

      if (bannerImage != '') {
        bannerRight = '<div class="list__specification-right">' + '<div><img src="' + bannerImage.url + '"/></div>' + '</div>';
      }
    } else {
      bannerClass = 'list__specification--video';

      if (bannerVideo != '') {
        bannerRight = '<div class="list__specification-right">' + '<div video-parent-js>' + '<!--video(preload="none" video-js)-->' + '<video preload="none" poster="' + bannerVideoPoster.url + '" video-js>' + '<source src="' + bannerVideo.url + '" type="' + bannerVideo.mime_type + '">' + '</video>' + '<a class="list__specification-play" video-toggle-js><i class="icon-font icon-play-button" video-play-js></i></a>' + '<a class="list__specification-pause" video-pause-js><i class="icon-font icon-pause"></i></a>' + '</div>' + '</div>';
      }
    }

    var moreSites = '';
    var moreSiteCount = 0;
    homeData.categories[category].sites.map(function (moreSite, index) {
      if (moreSiteCount < 6 && moreSite.id != siteId) {
        var moreSiteLogo = moreSite.logo ? moreSite.logo.src : '';
        moreSites += '<a class="list__box" list-box-more-js href="' + moreSite.link + '" data-id="' + moreSite.id + '" data-count="1" style="background-image: url(' + moreSite.thumb + ')">' + '<div class="list__box-overlay"></div>' + '<div class="list__box-border"></div><img class="list__box-logo" src="' + moreSiteLogo + '" alt=""/>' + '</a>';
        moreSiteCount++;
      }
    });
    var bannerHtml = '<div class="list__specification ' + bannerClass + '" data-id="' + siteId + '">' + '<a class="list__specification-close" ><i class="icon-font icon-close"></i></a>' + '<div>' + '<div class="list__specification-header">' + '<img class="list__specification-logo" src="' + siteLogo + '"/>' + '<a class="list__specification-close" >' + '<i class="icon-font icon-close"></i>' + '</a>' + '</div>' + '<div class="list__specification-left">' + '<div>' + '<img class="list__specification-logo" src="' + siteLogo + '"/>' + '<div class="list__specification-action" spec-actionNode-js>' + '<div><a class="list__specification-visit nav_link" href="#">VISIT WEBSITE</a></div>' + '<div><a class="list__specification-read nav_link" href="' + siteItem.link + '">READ REVIEW</a></div>' + '<div class="list__specification-action-desc">' + '<p>' + tagLIne + ' <a href="#">READ MORE</a></p>' + '</div>' + '<div class="list__specification-action-skip"><a class="list__specification-circle list__specification-skip" data-id="' + siteId + '" spec-skip-js><i class="icon-font icon-point"></i><span>Skip</span></a></div>' + '<div class="list__specification-action-circle">' + '<button class="list__specification-circle list__specification-like" data-like="' + siteId + '" spec-like-js><i class="icon-font icon-like"></i><span>Like</span></button>' + '</div>' + '<div class="list__specification-action-circle">' + '<button class="list__specification-circle list__specification-dislike" data-dislike="' + siteId + '" spec-dislike-js><i class="icon-font icon-like"></i><span>Dislike</span></button>' + '</div>' + '<div class="list__specification-action-circle">' + '<div class="c-popper">' + '<button class="list__specification-circle list__specification-favorites" data-id="' + siteId + '" data-favorites="' + siteId + '" spec-favorites-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i><span>Favorites</span></button>' + '<div class="c-poppertext">' + '<u>Add To Favourites</u>' + '<u>Remove From Favourites</u>' + '</div>' + '</div>' + '</div>' + '</div>' + '<p class="list__specification-desc">' + tagLIne + '</p>' + '</div>' + '</div>' + bannerRight + '<div class="list__specification-more">' + '<div>' + '<p>More Like This</p>' + '</div>' + '<div>' + moreSites + '</div>' + '</div>' + '</div>' + '</div>';
    return bannerHtml;
  }

  return false;
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

    categorySites += '<div class="swiper-slide" data-index="' + index + '" data-siteid="' + site.id + '" data-init="0">' + '<div class="list__box" list-box-js  data-id="' + site.id + '" style="background-image: url(' + site.thumb + ')">' + '<div class="list__box-overlay"></div>' + '<div class="list__box-border"></div>' + '<a class="nav_link" href="' + site.link + '">' + siteLogo + '</a>' + '<div class="list__box-details">' + '</div>' + '<button class="list__box-more" type="button"><i class="icon-font icon-arrow-angle"></i></button>' + '</div>' + '</div>';
  });
  var categoryBoxHtml = '<div class="list__box-wrapper" list-parent-js data-name="category_' + categoryId + '" data-index="' + categoryIndex + '">' + '<div class="list__box-head">' + '<div class="list__info">' + '<div class="list__info-circle"><img src="' + categoryLogo + '" alt=""/></div>' + '<div>' + '<p>' + categoryData.title + '</p><span>' + categoryData.tagline + '</span>' + '</div>' + '</div>' + '<div><a class="list__btn" href="#"><p>SEE&nbsp;<span>' + categoryData.count + ' MORE</span></p><i class="icon-font icon-arrow-angle"></i></a></div>' + '</div>' + '<div class="list__box-line">' + '<u list-line-ind-js></u><span list-line-js></span>' + '</div>' + '<div class="list__box-body">' + '<div class="list__arrow-wrapper">' + '<a class="list__arrow list__arrow--prev" href="#">' + '<div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>' + '</a>' + '<a class="list__arrow list__arrow--next" href="#">' + '<div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>' + '</a>' + '</div>' + '<div class="swiper-container listSwiper" data-id="listSlider_' + categoryData.id + '" data-category="18">' + '<div class="swiper-wrapper" data-category="' + categoryData.id + '" data-count="' + categoryData.count + '" data-slidecount="' + categoryData.site_limit + '">' + categorySites + '</div>' + '</div>' + '</div>' + '<div class="list__specification-wrapper"></div>' + '</div>';
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

var boxHover = function boxHover() {
  var swiperSlides = document.querySelectorAll('.swiper-slide[data-init="0"]'),
      listBoxBody = document.querySelectorAll('.list__box-body');
  var tOut = null,
      hoverBool = false;

  for (var i = 0, len = swiperSlides.length; i < len; i++) {
    swiperSlides[i].addEventListener('mouseenter', function (ev) {
      if (window.innerWidth >= 1280) {
        var el = ev.currentTarget,
            elParent = el.closest('[list-parent-js]'),
            lineInd = elParent.querySelector('[list-line-js]');
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

        setTimeout(function () {
          var transformVal = '';

          if (lineInd.getAttribute("style")) {
            var val = lineInd.getAttribute("style");

            if (val.indexOf(';') === -1) {
              transformVal = val;
            } else {
              transformVal = val.substring(0, val.indexOf(';'));
            }
          }

          if (hoverBool) {
            el.classList.add('is-hover');
            lineInd.setAttribute('style', transformVal + ';width: 189px');
          } else {
            tOut = setTimeout(function () {
              hoverBool = true;
              el.classList.add('is-hover');
              lineInd.setAttribute('style', transformVal + ';width: 189px');
            }, 750);
          }
        }, 0);
      }
    }, false);
    swiperSlides[i].setAttribute('data-init', '1');
    swiperSlides[i].addEventListener('mouseleave', function (ev) {
      if (window.innerWidth >= 1280) {
        var el = ev.currentTarget,
            elParent = el.closest('[list-parent-js]'),
            lineInd = elParent.querySelector('[list-line-js]');
        var transformVal = '';

        if (lineInd.getAttribute("style")) {
          var val = lineInd.getAttribute("style");

          if (val.indexOf(';') === -1) {
            transformVal = val;
          } else {
            transformVal = val.substring(0, val.indexOf(';'));
          }
        }

        clearTimeout(tOut);
        el.classList.remove('is-hover');
        lineInd.setAttribute('style', transformVal + ';width: 64px');
      }
    }, false);
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
};

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
  if (typeof Worker !== "undefined") {// Yes! Web worker support!
    // Some code.....
  } else {// Sorry! No Web Worker support..
    }

  if (typeof w == "undefined") {
    webworkerFrontpage = new Worker("./wp-content/themes/mpg/js/worker.js");
  }

  webworkerFrontpage.onmessage = function (event) {
    //document.getElementById("result").innerHTML = event.data;
    console.log('Webworker data');
    console.log(event.data);
    loadHomeData();
  };
}

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
    });
  }

  var searchHamburger = document.querySelector('.pre-header__hamburger'),
      searchContainer = document.querySelector('[search-mobile-js]');

  if (searchHamburger) {
    searchHamburger.addEventListener("click", function (ev) {
      btnHamburger.classList.remove("is-active");
      mobileContainer.classList.remove("is-open");
      searchContainer.classList.toggle("is-open");
      hideScrollContainer.forEach(function (val, idx) {
        val.classList.toggle("is-hideScroll");
      });
    });
  }

  var searchClose = document.querySelector('.category__close');
  searchClose.addEventListener("click", function (ev) {
    searchContainer.classList.toggle("is-open");
    hideScrollContainer.forEach(function (val, idx) {
      val.classList.toggle("is-hideScroll");
    });
    document.querySelector('[search-js]').value = '';
    document.querySelector('.category__drop').classList.remove('is-open');
  });
};

var renderMobileMenu = function renderMobileMenu() {
  var langHtml = document.querySelector('.lang').outerHTML;
  var mobileContainer = document.querySelector("[mobile-block-js]");
  var mobileNavHtml = '<div>' + '            <div class="pre-header__mobile-top">' + '              <div><a class="pre-header__signin" href="#"><i class="icon-font icon-enter"></i><span>Sign In</span></a></div>' + '              <div><a class="pre-header__signup" href="#"><i class="icon-font icon-key"></i><span>Sign Up</span></a></div>' + '            </div>' + '            <div class="pre-header__mobile-middle">' + '<p class="pre-header__heading"><i></i><span>Main</span></p>' + '              <div>' + langHtml + '</div>' + '            </div>' + '            <div class="pre-header__mobile-bottom">' + '              <ul class="header__nav">' + '                <li class="header__nav-item"><a class="header__nav-link" href="/categories/">' + '                    <div><i class="icon-png header-nav-folder"></i></div>' + '                    <div><span>View All Categories</span></div></a></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/">' + '                    <div><i class="icon-png header-nav-home"></i></div>' + '                    <div><span>Home</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/blog/">' + '                    <div><i class="icon-png header-nav-blog"></i></div>' + '                    <div><span>Blog</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/webcam-videos/">' + '                    <div><i class="icon-png header-nav-videos"></i></div>' + '                    <div><span>Videos</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/pornstars/">' + '                    <div><i class="icon-png header-nav-pornstars"></i></div>' + '                    <div><span>Pornstars</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/coupons/">' + '                    <div><i class="icon-png header-nav-porncoupons"></i></div>' + '                    <div><span>Porn Coupons</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-porngames"></i></div>' + '                    <div><span>Porn Games</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-meetfuck"></i></div>' + '                    <div><span>Meet & Fuck</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-livesex"></i></div>' + '                    <div><span>Live sex</span></div></a></li>' + '              </ul>' + '            </div>' + '            <div class="pre-header__mobile-middle">' + '              <div>' + '                <p class="pre-header__heading"><i></i><span>Connect With Us</span></p>' + '              </div>' + '              <div></div>' + '            </div>' + '            <div class="pre-header__mobile-bottom">' + '              <ul class="header__nav">' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-info"></i></div>' + '                    <div><span>About Us</span></div></a></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-email"></i></div>' + '                    <div><span>Contact Us</span></div></a></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-megaphone"></i></div>' + '                    <div><span>Advertising</span></div></a></li>' + '              </ul>' + '            </div>' + '          </div>';
  mobileContainer.innerHTML = mobileNavHtml;
};

var renderFavourites = function renderFavourites() {
  if (isMobileDevice) {
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
      document.querySelectorAll('.is-active[favorites-toggle-js]').forEach(function (fav) {
        fav.classList.remove('is-active');
      });

      if (res.fav_list) {
        res.fav_list.map(function (fav, index) {
          favouritesHtml += '<a class="header__view-link" href="' + fav.permalink + '">' + '<div><span>' + (index + 1) + '.</span></div>' + '<div><img src="' + fav.favicon + '"/><p>' + fav.title + '</p></div>' + '<div><button type="button" data-id="' + fav.id + '" un-favorites-js><i class="icon-font icon-delete"></i></button><button type="button"><i class="icon-font icon-search"></i></button></div>' + '</a>';
          var favLink = document.querySelector('[data-id="' + fav.id + '"] [favorites-toggle-js]');

          if (favLink) {
            favLink.classList.add('is-active');
          }
        });
        favouritesDropDown.innerHTML = favouritesHtml;
      }
    }
  });
};

var renderSorting = function renderSorting() {
  var sortingHtml = '<a class="sort__drop-link" href="#">A</a><a class="sort__drop-link" href="#">B</a><a class="sort__drop-link" href="#">C</a><a class="sort__drop-link" href="#">D</a><a class="sort__drop-link" href="#">E</a><a class="sort__drop-link" href="#">F</a><a class="sort__drop-link" href="#">G</a><a class="sort__drop-link" href="#">H</a><a class="sort__drop-link" href="#">I</a><a class="sort__drop-link" href="#">J</a><a class="sort__drop-link" href="#">K</a><a class="sort__drop-link" href="#">L</a><a class="sort__drop-link" href="#">M</a><a class="sort__drop-link" href="#">N</a><a class="sort__drop-link" href="#">O</a><a class="sort__drop-link" href="#">P</a><a class="sort__drop-link" href="#">Q</a><a class="sort__drop-link" href="#">R</a><a class="sort__drop-link" href="#">S</a><a class="sort__drop-link" href="#">T</a><a class="sort__drop-link" href="#">U</a><a class="sort__drop-link" href="#">V</a><a class="sort__drop-link" href="#">W</a><a class="sort__drop-link" href="#">X</a><a class="sort__drop-link" href="#">Y</a><a class="sort__drop-link" href="#">Z</a>' + '<div class="sort__drop-inner">' + '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-1">' + '<div><span>#1</span></div>' + '<div><images src="images/images-black-porn-sites.png" srcset="images/images-black-porn-sites@2x.png 2x" alt="">' + '<p><span>B</span>lack Porn Sites</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></a>' + '<div class="sort__collapse-body" id="sort-collapse-1" collapse-body-js>' + '<button type="button"><span>Free</span></button><images src="images/images-badge-premium.png" srcset="images/images-badge-premium@2x.png 2x" alt="">' + '</div>' + '</div>' + '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-2">' + '<div><span>#2</span></div>' + '<div><images src="images/images-blog.png" srcset="images/images-blog@2x.png 2x" alt="">' + '<p>Porn <span>B</span>logs</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></a>' + '<div class="sort__collapse-body" id="sort-collapse-2" collapse-body-js>' + '<button type="button"><span>Free</span></button><images src="images/images-badge-premium.png" srcset="images/images-badge-premium@2x.png 2x" alt="">' + '</div>' + '</div>' + '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-3">' + '<div><span>#3</span></div>' + '<div><images src="images/images-best-webcam-girls.png" srcset="images/images-best-webcam-girls@2x.png 2x" alt="">' + '<p><span>B</span>est Webcam Girls</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></a>' + '<div class="sort__collapse-body" id="sort-collapse-3" collapse-body-js>' + '<button type="button"><span>Free</span></button><images src="images/images-badge-premium.png" srcset="images/images-badge-premium@2x.png 2x" alt="">' + '</div>' + '</div>' + '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-4">' + '<div><span>#4</span></div>' + '<div><images src="images/images-best-adult-ad-networks.png" srcset="images/images-best-adult-ad-networks@2x.png 2x" alt="">' + '<p><span>B</span>est Adult Ad Networks</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></a>' + '<div class="sort__collapse-body" id="sort-collapse-4" collapse-body-js>' + '<button type="button"><span>Free</span></button><images src="images/images-badge-premium.png" srcset="images/images-badge-premium@2x.png 2x" alt="">' + '</div>' + '</div>' + '</div>';
  var sortcontainer = document.querySelector('[sort-node-js]');
  sortcontainer.innerHTML = sortingHtml;
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


function swiperCB(swiperName, sliderArrow) {
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
      },

      /*slideChange: function (e, t) {
      	let swipeWrapper = categorySwiper.$wrapperEl[0];
      	let currentSlideIndex = categorySwiper.activeIndex;
      		console.log('transisioning');
      	console.log(e);
      	console.log(t);
      	fixPrevSlides(swipeWrapper.dataset.category, categorySwiper);
      	fixNextSlides(swipeWrapper.dataset.category, categorySwiper);
      		//console.log('changing slide -'+swipeWrapper.dataset.category+' - '+categorySwiper.slides.length+' - '+currentSlideIndex);
      },*/
      slidePrevTransitionEnd: function slidePrevTransitionEnd(e) {
        var swipeWrapper = categorySwiper.$wrapperEl[0];
        renderLeftAndRight(swipeWrapper.dataset.category, categorySwiper);
      },
      slideNextTransitionEnd: function slideNextTransitionEnd(e) {
        var swipeWrapper = categorySwiper.$wrapperEl[0];
        renderLeftAndRight(swipeWrapper.dataset.category, categorySwiper);
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
    swiperCB(".swiper-container[data-id=\"".concat(sliderName, "\"]"), ".list__box-wrapper[data-name='".concat(sliderWrapper, "']"));
    console.log('init swiper ' + ".swiper-container[data-id=\"".concat(sliderName, "\"]") + ' ---- ' + ".list__box-wrapper[data-name='".concat(sliderWrapper, "']"));
  } //var mySwiper = document.querySelector('.swiper-container[data-category="18"]').swiper;

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
}
/**
 * POLYFILL
 * ===================================
 */


var isMobileDevice = false;
var homeData = [];

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
        if (homeData.categories_indexes) {
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

      if (_ev.closest('.list__specification-close')) {
        closeBanner(_ev);
      } else if (_ev.closest('.list__box-more')) {
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
      } else if (_ev.closest('[spec-skip-js]')) {
        onSkip(_ev.closest('[spec-skip-js]'));
      }

      if (!_ev.closest(className)) {
        // VIEW FAVORITES
        document.querySelector('[view-favorites-toggle-js]').classList.remove('is-active');
        document.querySelector('[view-favorites-drop-js]').classList.remove('is-open'); // SORT

        document.querySelector('[sort-node-js]').classList.remove('is-open');

        if (document.querySelector('.sort__drop-inner')) {
          document.querySelector('.sort__drop-inner').classList.remove('is-open');
        }

        for (var i = 0; i < document.querySelectorAll('.sort__drop-link').length; i++) {
          document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
        }
      }
    }, false);
  };

  var viewFavoritesToggle = function viewFavoritesToggle() {
    var _btn = document.querySelector('[view-favorites-toggle-js]'),
        _node = document.querySelector('[view-favorites-drop-js]');

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

  var boxMore = function boxMore() {
    var btns = document.querySelectorAll('.list__box-more'),
        closeBtns = document.querySelectorAll('.list__specification-close');
    var i = null,
        len = btns.length;

    for (i = 0; i < len; i++) {
      btns[i].addEventListener('click', function (ev) {
        showBanner(ev);
      }, false);
    }

    var idx = null,
        lenClose = closeBtns.length;

    for (idx = 0; idx < lenClose; idx++) {
      closeBtns[idx].addEventListener('click', function (ev) {
        var _el = ev.currentTarget;
        closeBanner(_el);
      }, false);
    }
  };

  function showBanner(_el) {
    var _boxParent = _el.closest('.list__box'),
        _boxID = _boxParent.getAttribute('data-id'),
        _parentNode = _el.closest('.list__box-wrapper');

    var swiperSlide = _el.closest('.swiper-slide');

    var swiperWrapper = _el.closest('.swiper-wrapper');

    var listBoxWrapper = _el.closest('.list__box-wrapper');

    var bannerWrapper = listBoxWrapper.querySelector('.list__specification-wrapper');
    var currentBannerSection = document.querySelector('.list__specification');

    if (currentBannerSection) {
      currentBannerSection.remove();
    }

    var bottomBanner = renderSiteBottomBanner(swiperWrapper.dataset.category, swiperSlide.dataset.index);

    if (bottomBanner) {
      bannerWrapper.innerHTML = bottomBanner;
    }

    var hideScrollContainer = document.querySelectorAll("html, body"),
        //_specificationBox = _parentNode.querySelector('.list__specification[data-id="' + _boxID + '"]');
    _specificationBox = _parentNode.querySelector('.list__specification');

    var jInner = null,
        lInner = document.querySelectorAll('[video-toggle-js]').length;

    for (jInner = 0; jInner < lInner; jInner++) {
      document.querySelectorAll('[video-toggle-js]')[jInner].classList.remove('is-active');
      document.querySelectorAll('[video-pause-js]')[jInner].classList.remove('is-active');

      if (document.querySelectorAll('.list__specification video')[jInner].length) {
        playPause(document.querySelectorAll('.list__specification video')[jInner]);
      }
    }

    for (var k = 0; k < document.querySelectorAll('.list__box').length; k++) {
      document.querySelectorAll('.list__box')[k].classList.remove('is-active');
    }

    for (var _k = 0; _k < document.querySelectorAll('.list__specification').length; _k++) {
      document.querySelectorAll('.list__specification')[_k].classList.remove('is-open');
    }

    if (window.innerWidth < 1024) {
      setTimeout(function () {
        _parentNode.classList.add('is-open');

        _boxParent.classList.add('is-active');

        if (_specificationBox) {
          _specificationBox.classList.add('is-open');
        }
      }, 500);
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
  }

  function closeBanner(_el) {
    parent = _el.closest('.list__specification');

    _el.closest('.list__box-wrapper').classList.remove('is-open');

    _el.closest('.list__specification').classList.remove('is-open');

    if (window.innerWidth <= 1024) {
      document.querySelectorAll("html, body").forEach(function (val, idx) {
        val.classList.remove("is-hideScroll");
      });
    }

    if (document.querySelector('[video-js]')) {
      playPause(document.querySelector('[video-js]'));
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

    for (var _i2 = 0, _len2 = videoPauseBtns.length; _i2 < _len2; _i2++) {
      videoPauseBtns[_i2].addEventListener('click', function (ev) {
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

    for (var _i3 = 0, _len3 = skipBtns.length; _i3 < _len3; _i3++) {
      skipBtns[_i3].addEventListener('click', function (ev) {
        ev.currentTarget.classList.toggle('is-active');
      }, false);
    }

    for (var _i4 = 0, _len4 = specFavoritesBtns.length; _i4 < _len4; _i4++) {
      specFavoritesBtns[_i4].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onBannerFavourite(el);
      }, false);
    }

    for (var _i5 = 0, _len5 = likeBtns.length; _i5 < _len5; _i5++) {
      likeBtns[_i5].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onSiteBoxLikeClick(el);
      }, false);
    }

    for (var _i6 = 0, _len6 = specLikeBtns.length; _i6 < _len6; _i6++) {
      specLikeBtns[_i6].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onBannerLikeClick(el);
      }, false);
    }

    for (var _i7 = 0, _len7 = dislikeBtns.length; _i7 < _len7; _i7++) {
      dislikeBtns[_i7].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onSiteBoxDislikeClick(el);
      }, false);
    }

    for (var _i8 = 0, _len8 = specDislikeBtns.length; _i8 < _len8; _i8++) {
      specDislikeBtns[_i8].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onBannerDislikeClick(el);
      }, false);
    }
  };

  function onPlayClick(el) {
    var parentVideoNode = el.closest('[video-parent-js]');
    console.log('on play click');
    console.log(parentVideoNode);
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

  function onSiteBoxFavourite(el) {
    var elID = el.getAttribute('data-id'),
        elParent = el.closest('.list__box-wrapper');
    console.log('Fav box ' + elID);
    var specificationFavoritesBtn = elParent.querySelector('[data-favorites="' + elID + '"]');
    el.classList.toggle('is-active');

    if (specificationFavoritesBtn) {
      specificationFavoritesBtn.classList.toggle('is-active');
    }

    addToFavourites(elID);
  }

  function onBannerFavourite(el) {
    var elID = el.getAttribute('data-id'),
        elParent = el.closest('.list__box-wrapper');
    addToFavourites(elID); //const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),

    var listFavoritesBtn = elParent.querySelector('.list__box-favorites[data-id="' + elID + '"]');
    el.classList.toggle('is-active');

    if (listFavoritesBtn) {
      listFavoritesBtn.classList.toggle('is-active');
    }
  }

  function onSiteBoxLikeClick(el) {
    var elID = el.getAttribute('data-id'),
        elParent = el.closest('.list__box-wrapper');
    el.classList.toggle('is-active');
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
    listLikeBtn.classList.toggle('is-active');
    listDislikeBtn.classList.toggle('is-hide');
  }

  function onSiteBoxDislikeClick(el) {
    var elID = el.getAttribute('data-id'),
        elParent = el.closest('.list__box-wrapper');
    console.log('Disliking ' + elID);
    el.classList.toggle('is-active');
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
    el.classList.toggle('is-active');
    listDislikeBtn.classList.toggle('is-active');
    listLikeBtn.classList.toggle('is-hide');
  }
  /*const listIndicator = () => {
  	const listBoxes = document.querySelectorAll('[list-box-js]');
  		for(let i = 0, len = listBoxes.length; i < len; i++) {
  		listBoxes[i].addEventListener('mouseenter', function(ev) {
  			const el = ev.currentTarget;
  				siteBoxHover(el);
  		});
  	}
  };*/


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

    listIndicator.setAttribute('style', 'transform: translateX(' + _lineOffset + 'px)');
  };

  var initHomeSlideEvent = function initHomeSlideEvent() {};

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

    for (var i = 0, len = skipBtns.length; i < len; i++) {
      skipBtns[i].addEventListener('click', function (ev) {
        var el = ev.currentTarget,
            elID = el.getAttribute('data-id'),
            elParent = el.closest('.list__box-wrapper');
        setTimeout(function () {
          el.closest('.list__specification').querySelector('.list__specification-close').click();
        }, 0);

        if (elParent.querySelector('.list__specification[data-id="' + (Number(elID) + 1) + '"]')) {
          elParent.querySelector('.list__specification[data-id="' + (Number(elID) + 1) + '"]').classList.add('is-open');
        }
      }, false);
    }
  };

  function onSkip(el) {
    var elID = el.getAttribute('data-id'),
        elParent = el.closest('.list__box-wrapper');
    setTimeout(function () {
      el.closest('.list__specification').querySelector('.list__specification-close').click();
    }, 0);
    var nextSite = elParent.querySelector('.swiper-slide[data-siteid="' + elID + '"]').nextSibling;

    if (nextSite) {
      if (nextSite.querySelector('.list__box-more')) {
        showBanner(nextSite.querySelector('.list__box-more'));
      }
    }
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
    // default
    initPreventBehavior(); // ==========================================
    // lib

    initSwiper();
    initHamburger(); // ==========================================
    // callback

    detectDevice();
    bodyClick();
    initHome();
    renderFavourites();
    viewFavoritesToggle();
    sortCB();
    search();
    boxHover(); //		boxMore();

    videoToggle(); //listIndicator();
    //detailsToggleAction();

    skipModal();
    toggleMoreBox(); // ==========================================
    //loadHomeData();

    initWebWorker();
  };
  /**
   * @description Init all CB after page load
   */


  window.addEventListener('load', function (ev) {
    initNative();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1023) {
      if (document.querySelector('.list__specification.is-open')) {
        document.getElementsByTagName('html')[0].classList.remove('is-hideScroll');
        document.getElementsByTagName('body')[0].classList.remove('is-hideScroll');
      }
    } else {
      if (document.querySelector('.list__specification.is-open')) {
        document.getElementsByTagName('html')[0].classList.add('is-hideScroll');
        document.getElementsByTagName('body')[0].classList.add('is-hideScroll');
      }
    }
  });
})();