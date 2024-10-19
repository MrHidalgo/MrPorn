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

  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    clearOldLocalData(); // if (e == QUOTA_EXCEEDED_ERR) {
    // 	console.log('storage exceeded');
    // 	clearOldLocalData();
    // }
  }
}

function clearOldLocalData() {
  for (var key in localStorage) {
    if (key.indexOf('cat_') > -1 || key.indexOf('site_') > -1) {
      localStorage.removeItem(key);
    }
  }
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
  return response;
}

function postRequestAbortable() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var signal = arguments.length > 1 ? arguments[1] : undefined;
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var callback = arguments.length > 3 ? arguments[3] : undefined;
  var searchParams = Object.keys(data).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&'); // Default options are marked with *

  var response = fetch(url, {
    method: 'POST',
    // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    signal: signal,
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
  })["catch"](function (err) {// console.log(err);
    // throw err;
  });
  return response;
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
/*
* Category page scripts
* */


var categorySidebar;

function initCategoryPage() {
  function createSidebar() {
    var desktopMenulist = document.querySelector('.desktop_menu_list ul');
    var otherCategoryItems = document.querySelectorAll('#other_categories .category_item_title');
    otherCategoryItems.forEach(function (_category) {
      var $this = _category;

      var link = _category.getAttribute('href');

      var $categoryTitle = _category.querySelector('.catD');

      if ($categoryTitle) {
        var smallElement = $categoryTitle.querySelector('small');

        if (smallElement) {
          smallElement.parentNode.removeChild(smallElement);
        }
      }

      var categorySites = $this.querySelectorAll('.url_link_list_sites .deIcon');
      var categoryThumb = $this.dataset.thumbnail;
      var categoryTitle = '<span class="category_title">' + $categoryTitle.innerHTML + '</span>';
      var categorySiteCount = $this.querySelector('.url_link_count_sites');
      var count_sites = categorySiteCount.textContent.replace('+', '');
      var icons = '';
      categorySites.forEach(function (_site) {
        icons += '<span><span class="' + _site.getAttribute('class') + '"></span></span>';
      }); //var item = '<li class="item ' + item_class + '" data-id="' + $this.attr('data-id') + '">' + '<a  href="' + link + '" class="mobile_category_name" data-group-link="' + $this.find('.url_link_caption').attr('data-group-link') + '">' + '<span>' + title + '</span>' + '<div class="mobile_link_icons">' + icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + count_sites + '</span>' + '</div>' + '</a>' + '</li>';

      var item = '<li class="item" >' + '<a  href="' + link + '" class="mobile_category_name"><span>' + categoryTitle + '</span><div class="mobile_link_icons">' + icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + count_sites + '</span>' + '</div>' + '</a>' + '</li>'; // console.log('categoryItems '+ _category.getAttribute('href')+' - '+categoryTitle + ' - ' + icons)

      desktopMenulist.insertAdjacentHTML('beforeend', item);
    });

    if (otherCategoryItems.length) {
      document.querySelector('.category_list-sites').classList.add('has_sidebar');
    }
    /*if(document.querySelectorAll('.desktop_menu_list').length>0){
    	var sidebar = new StickySidebar('.desktop_menu_list', {
    		topSpacing: 20,
    		bottomSpacing: 20,
    		// containerSelector: '.category_container',
    		// innerWrapperSelector: '.inner-wrapper-sticky',
    		resizeSensor: true
    	});
    	}*/

  }

  if (document.body.classList.contains('category')) {
    createSidebar();

    if (document.querySelectorAll('.desktop_menu_list').length > 0) {
      categorySidebar = new StickySidebar('.desktop_menu_list', {
        topSpacing: 20,
        bottomSpacing: 20,
        // containerSelector: '.category_container',
        // innerWrapperSelector: '.inner-wrapper-sticky',
        resizeSensor: true
      });
    } // setInterval(function (){
    // 	categorySidebar.updateSticky()
    // }, 300)

  }
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
          options.complete();
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


var searchPage = 1;
var isSearchActive = false;

var initHamburger = function initHamburger() {
  var btnHamburger = document.querySelector("[hamburger-js]"),
      hideScrollContainer = document.querySelectorAll("html, body"),
      //mobileContainer = document.querySelector("[mobile-block-js]");
  mobileContainer = document.querySelector(".header__bottom");
  var mobileMenuTop = document.querySelector(".pre-header__mobile-top");

  if (btnHamburger) {
    btnHamburger.addEventListener("click", function (ev) {
      var elem = ev.currentTarget;

      if (!mobileMenuTop) {// renderMobileMenu();
        // initMobileThemeToggle()
      }

      elem.classList.toggle("is-active");
      mobileContainer.classList.toggle("is-open");
      hideScrollContainer.forEach(function (val, idx) {
        val.classList.toggle("is-hideScroll");
      }); // initMobileThemeToggle();

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
      setInnerHeight(); // disableScroll()

      isSearchActive = true;
      bodyScrollLock.disableBodyScroll(searchViewContainer);
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

  var searchClose = document.querySelector('.search__close');

  if (searchClose) {
    searchClose.addEventListener("click", function (ev) {
      searchContainer.classList.toggle("is-open");
      hideScrollContainer.forEach(function (val, idx) {
        val.classList.toggle("is-hideScroll");
      });
      document.querySelector('[search-js]').value = '';
      hide(document.querySelector('[search-drop-mobile-js]'));
      document.querySelector('.search__drop').classList.remove('is-open');
      setInnerHeight();
      isSearchActive = false; // enableScroll()

      bodyScrollLock.enableBodyScroll(searchViewContainer);
      document.body.classList.remove('has_search');
      var searchPagination = document.querySelector('.search_pagination');

      if (searchPagination) {
        searchPagination.style.display = 'block';
      }

      if (searchPage) {
        searchPage = 0;
      }
    });
  }
};

var renderMobileMenu = function renderMobileMenu() {
  var langHtml = document.querySelector('.lang').outerHTML;
  var mobileContainer = document.querySelector("[mobile-block-js]");
  var navCategoriesLink = document.querySelector('.header__nav-link.link_categories').getAttribute('href');
  var navLinkGames = document.querySelector('.header_nav_games').getAttribute('href');
  var navLinkMeet = document.querySelector('.header_nav_meet').getAttribute('href');
  var navLinkLiveSex = document.querySelector('.header_nav_dating.live_sex_nav').getAttribute('href');
  var currentLang = document.documentElement.getAttribute('lang');
  var linkSignup = '<div><a class="pre-header__signup mobile_signup_link" href="/sign-up/"><i class="icon-font icon-key"></i><span>' + _t('sign_up', 'Sign Up') + '</span></a></div>';

  if (window.logoutUrl) {
    linkSignup = '<div><a class="pre-header__signup mobile_signup_link" href="' + window.logoutUrl + '"><i class="icon-font icon-key"></i><span>LOGOUT</span></a></div>';
  }

  if (!window.favHtmlMobile) {
    window.favHtmlMobile = '';
  }

  var mobileNavHtml = '<div>' + '            <div class="pre-header__mobile-top">' + '              <div><a class="pre-header__signin mobile_login_link" href="/login/"><i class="icon-font icon-enter"></i><span>' + _t('login', 'Login') + '</span></a></div>' + linkSignup + '            </div>' + '            <div class="pre-header__mobile-middle">' + '<p class="pre-header__heading"><i></i><span>' + _t('main', 'Main') + '</span></p>' + '<div class="header__toggle">' + '                <input type="checkbox" name="" id="toggle-mode-mobile" class="toggle-mode">' + '                <label for="toggle-mode-mobile">' + '                    <div class="header__toggle-left"><i class="icon-font icon-sun"></i></div>' + '                    <div class="header__toggle-right"><i class="icon-font icon-moon"></i></div><span></span>' + '                </label>' + '            </div>' + '              <div>' + langHtml + '</div>' + '            </div>' + '            <div class="pre-header__mobile-bottom main_mobile_menu">' + window.favHtmlMobile + '              <ul class="header__nav">' + '                <li class="header__nav-item"><a class="header__nav-link" href="' + navCategoriesLink + '">' + '                    <div><img class="icon-nav-folder" src="/wp-content/themes/mpg/images/menu/menu.svg#folder"/></div>' + '                    <div><span>' + _t('view_all_categories', 'View All Categories') + '</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/blog/">' + '                    <div><img class="icon-nav-blog" src="/wp-content/themes/mpg/images/menu/menu.svg#blog"/></div>' + '                    <div><span>' + _t('blog', 'Blog') + '</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/webcam-videos/">' + '                    <div><img class="icon-nav-videos" src="/wp-content/themes/mpg/images/menu/menu.svg#videos"/></div>' + '                    <div><span>' + _t('videos', 'Videos') + '</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/pornstars/">' + '                    <div><img class="icon-nav-pornstars" src="/wp-content/themes/mpg/images/menu/menu.svg#pornstars"/></div>' + '                    <div><span>' + _t('pornstars', 'Pornstars') + '</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="/porn-deals/">' + '                    <div><img class="icon-nav-porncoupons" src="/wp-content/themes/mpg/images/menu/menu.svg#ticket"/></div>' + '                    <div><span>' + _t('porn-coupons', 'Porn Coupons') + '</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="' + navLinkGames + '" target="_blank">' + '                    <div><img class="icon-nav-porngames" src="/wp-content/themes/mpg/images/menu/menu.svg#joystick"/></div>' + '                    <div><span>' + _t('porn-games', 'Sex Games') + '</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="' + navLinkMeet + '" target="_blank" rel="nofollow">' + '                    <div><img class="icon-nav-sex" src="/wp-content/themes/mpg/images/menu/sex-icon.png"/></div>' + '                    <div><span>' + _t('meet-and-fuck', 'Meet & Fuck') + '</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="' + navLinkLiveSex + '" rel="nofollow" target="_blank">' + '                    <div><img class="icon-nav-livesex" src="/wp-content/themes/mpg/images/menu/menu.svg#webcam"/></div>' + '                    <div><span>' + _t('live-sex', 'Live sex') + '</span></div></a></li>' + '              </ul>' + '            </div>' + '            <div class="pre-header__mobile-middle">' + '              <div>' + '                <p class="pre-header__heading"><i></i><span>' + _t('connect_with_us', 'Connect With Us') + '</span></p>' + '              </div>' + '              <div></div>' + '            </div>' + '            <div class="pre-header__mobile-bottom">' + '              <ul class="header__nav">' + '                <li class="header__nav-item"><a class="header__nav-link" href="' + translateLink('about-us') + '">' + '                    <div><img class="icon-nav-info" src="/wp-content/themes/mpg/images/menu/menu.svg#info"/></div>' + '                    <div><span>' + _t('footer_about', 'About Us') + '</span></div></a></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="' + translateLink('contact') + '">' + '                    <div><img class="icon-nav-mail" src="/wp-content/themes/mpg/images/menu/menu.svg#mail"/></div>' + '                    <div><span>' + _t('footer_contact', 'Contact Us') + '</span></div></a></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="' + translateLink('advertising') + '">' + '                    <div><img class="icon-nav-megaphone" src="/wp-content/themes/mpg/images/menu/menu.svg#megaphone"/></div>' + '                    <div><span>' + _t('title_advertising', 'Advertising') + '</span></div></a></li>' + '              </ul>' + '            </div>' + '          </div>';
  mobileContainer.innerHTML = mobileNavHtml;
  initFavDelete();

  if (typeof initLoggedUser === "function") {
    if (window.innerWidth > 1024) {
      initLoggedUser();
    }
  }
};

function translateLink(link) {
  if (currentLang == 'en') {
    return '/' + link + '/';
  }

  return '/' + currentLang + '/' + link + '/';
}

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
var translations = [];
var favouriteList = [];
var isDark = '1';
var toggleSwitch = document.querySelector('#toggle-mode');

var initTheme = function initTheme() {
  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', function (event) {
      if (document.documentElement.classList.contains('light')) {
        createCookie("is_dark", "1", 7);
        document.documentElement.classList.remove('light');
      } else {
        createCookie("is_dark", "0", 7);
        document.documentElement.classList.add('light');
      }
    });
  }

  isDark = getCookieMpgCookie("is_dark");

  if (isDark == '') {
    isDark = '0';
  }

  if (isDark == '1') {
    document.documentElement.classList.remove('light');
    toggleSwitch.checked = true;
  } else {
    document.documentElement.classList.add('light');
    toggleSwitch.checked = false;
  }
};

var initMobileThemeToggle = function initMobileThemeToggle() {
  var toggleMobileSwitch = document.querySelector('#toggle-mode-mobile');

  if (toggleMobileSwitch) {
    toggleMobileSwitch.addEventListener('change', function (event) {
      if (document.documentElement.classList.contains('light')) {
        createCookie("is_dark", "1", 7);
        document.documentElement.classList.remove('light');
      } else {
        createCookie("is_dark", "0", 7);
        document.documentElement.classList.add('light');
      }
    });

    if (isDark == '1') {
      toggleMobileSwitch.checked = true;
      toggleSwitch.checked = true;
    } else {
      toggleMobileSwitch.checked = false;
      toggleSwitch.checked = false;
    }
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

  var hfToggle = document.querySelector('.header_f_toggle');

  if (hfToggle) {
    hfToggle.innerHTML = '<p>VIEW YOUR FAVORITES!</p><u></u><span>Quickly Access All Your Favorite Sites Here!</span>';
  }

  var favouritesDropDown = document.querySelector('[view-favorites-drop-js]');
  var favouritesHtml = '';
  postRequest(ajaxEndpoint, {
    action: 'is_logged',
    logout: '/',
    is_fav: true
  }, function (res) {
    if (res.status) {
      if (res.status == 'true') {
        isLoggedUser = true;
        var logoutLink = '/wp-login.php?action=logout';

        if (document.querySelector('.header__action-link--logout')) {
          document.querySelector('.header__action-link--logout').setAttribute('href', logoutLink);
        }

        if (document.querySelector('.mobile_signup_link')) {
          document.querySelector('.mobile_signup_link').setAttribute('href', logoutLink);
        }
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
  var menuUserBlock = document.querySelector('.header__user-block');

  if (menuUserBlock) {
    menuUserBlock.insertAdjacentHTML("beforeend", window.favHtmlMobile);

    document.querySelector('.mobile_fav_link .hdrfavttl').onclick = function (event) {
      document.querySelector('.mobile_fav_link').classList.toggle('open1');
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
  letterData = getWithExpiry("letter_data_" + dataTime);

  if (!letterData) {
    letterData = [];
  }

  if (!letterData | letterData.length === 0) {
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
      setWithExpiry("letter_data_" + dataTime, letterData, 30 * 60 * 1000);
    })["catch"](function (err) {// console.log('didnt load letter matrix');
    });
  }
};

var loadTranslations = function loadTranslations() {
  translations = getWithExpiry("i18n_" + dataTime);

  if (!translations) {
    translations = [];
  }

  if (!translations | translations.length === 0) {
    fetch('/wp-json/mpg/i18n/').then(function (res) {
      return res.json();
    }).then(function (result) {
      translations = result;
      setWithExpiry("i18n_" + dataTime, translations, 60 * 60 * 1000);
    })["catch"](function (err) {// console.log('didnt load translations');
    });
  }
};

var _t = function _t(key, _default) {
  if (!currentLang || currentLang == 'en') {
    currentLang = document.documentElement.getAttribute('lang');
  }

  if (translations) {
    if (currentLang == 'en') {
      return _default;
    } else if (translations[key]) {
      var transVal = translations[key];

      if (transVal[currentLang]) {
        //return 	transVal[currentLang]
        return decodeURIComponent(JSON.parse('"' + transVal[currentLang].replace(/\"/g, '\\"') + '"'));
      }

      return _default;
    }
  }

  return _default;
};

var renderSorting = function renderSorting() {
  var letterHtml = '';
  Object.entries(letterData).forEach(function (letter) {
    letterHtml += '<span class="sort__drop-link" sort-letter-collapse-js data-letter="' + letter[0] + '">' + letter[0].toUpperCase() + '</span>';
  });
  letterHtml += '<div class="sort__drop-inner"></div>';
  var sortcontainer = document.querySelector('[sort-node-js]');

  if (sortcontainer) {
    sortcontainer.innerHTML = letterHtml;
  }

  document.querySelectorAll('[sort-letter-collapse-js]').forEach(function (searchLetter) {
    searchLetter.addEventListener('click', function (_ev) {
      onSortLetterClick(_ev.target);
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

  var siteOrigin = document.location.origin;
  letterData[letter].forEach(function (suggession) {
    var suggessionName = suggession.name;
    var uL = letter.toUpperCase();
    var siteFree = suggession.free;
    var freeId = suggession.free_id;
    var siteHd = suggession.hd;
    var hdId = suggession.hd_id;
    var catIcon = '/wp-content/uploads/' + suggession.icon;

    if (currentLang != 'en') {
      siteFree = siteFree.replace(siteOrigin + '/', siteOrigin + '/' + currentLang + '/');
      siteHd = siteHd.replace(siteOrigin + '/', siteOrigin + '/' + currentLang + '/');

      if (currentLang != 'en' && siteFree != '') {
        siteFree = '/' + currentLang + siteFree;
      }

      if (currentLang != 'en' && siteHd != '') {
        siteHd = '/' + currentLang + siteHd;
      }
    }

    var htmlFree = '';

    if (siteFree) {
      htmlFree = '<a href="' + siteFree + '" class="site_free scroll_to_category11" data-category="' + freeId + '"><span>Free</span></a>';
    }

    var htmlHd = '';

    if (siteHd) {
      htmlHd = '<a href="' + siteHd + '" class="scroll_to_category11" data-category="' + hdId + '"><img src="' + themeBase + 'images/img-badge-premium.png" srcset="' + themeBase + 'images/img-badge-premium@2x.png 2x" alt=""/></a>';
    }

    var showLetterToggle = false;

    if (siteFree != '' && siteHd != '') {
      showLetterToggle = true;
    }

    if (showLetterToggle) {
      letterSuggessions += '<div class="sort__collapse">' + '<div class="sort__collapse-toggle" collapse-toggle-js data-container="sort-collapse-' + suggessionIndex + '">' + '<div><span>#' + suggessionIndex + '</span></div>' + '<div><img src="' + catIcon + '" />' + '<p>' + suggessionName + '</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></div>' + '<div class="sort__collapse-body" id="sort-collapse-' + suggessionIndex + '" collapse-body-js>' + htmlFree + htmlHd + '</div>' + '</div>';
    } else {
      var toggleLink = siteHd != '' ? siteHd : siteFree;
      letterSuggessions += '<div class="sort__collapse">' + '<a class="sort__collapse-toggle scroll_to_category11" data-category="' + (hdId != '' ? hdId : freeId) + '" href="' + toggleLink + '">' + '<div><span>#' + suggessionIndex + '</span></div>' + '<div><img src="' + catIcon + '" />' + '<p>' + suggessionName + '</p>' + '</div>' + '</a>' + '<div class="sort__collapse-body" id="sort-collapse-' + suggessionIndex + '" collapse-body-js>' + htmlFree + htmlHd + '</div>' + '</div>';
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
      var htmlLogin = '<div class="login_container">' + '<div class="login_container_inner user_container_popup login">' + '<div class="user_tab_login">' + '<div class="login_form">' + '<div class="login_top">' + '<div class="title">Log in</div>' + '</div>' + '<form class="cleanlogin-form ajax-login-form cleanlogin-container login_bottom" action="/login/" method="post">' + '<p class="status result-message"></p>' + '<fieldset>' + '<div class="cleanlogin-field">' + '<input class="cleanlogin-field-username log_username" type="text" name="username" placeholder="Username">' + '</div>' + '<div class="cleanlogin-field">' + '<input class="cleanlogin-field-password log_password" type="password" name="password" placeholder="Password">' + '</div>' + '</fieldset>' + '<fieldset>' + '<div>' + '<input class="submit cleanlogin-field" type="submit" value="Login" name="submit">' + '<div class="remeber_me is_mobile">' + '<input type="checkbox" name="rememberme" value="forever">' + '<label>Keep me logged in?</label>' + '</div>' + '<a class="signup is_desktop popup_link_signup" href="/sign-up/">Sign up now</a>' + '<a class="forgot popup_link_forgot" href="/forgot/">Forgot password?</a>' + '</div>' + '</fieldset>' + '</form>' + '<div class="info_create_mobile is_mobile">' + '<a class="popup_link_signup" href="/sign-up/">Create New Account</a>' + '</div>' + '</div>' + '<img class="login_banner" src="/wp-content/themes/mpg/images/bg_login.png"/>' + '</div>' + '<div class="user_tab_forgot">' + '<div class="login_form">' + '<div class="login_top">' + '<div class="title">Forgot Password</div>' + '<p class="is_mobile top_forgot_text">Enter the email address associated with your account. An email will then be sent with a link to set up a new password.</p>' + '</div>' + '<div class="forgot_page">' + '<form class="cleanlogin-form cleanlogin-container login_bottom" method="post" action="/forgot/">' + '<div class="info is_desktop">' + 'Enter your email address and we\'ll email you a link to reset your password or <a href="/sign-up/" class="popup_link_signup">Sign Up</a>' + '<p class="status result-message"></p>' + '</div>' + '<input type="hidden" name="website""value=".">' + '<fieldset>' + '<div class="cleanlogin-field">' + '<input class="cleanlogin-field-username" type="text" name="username" value="" placeholder="Username (or E-mail)">' + '</div>' + '</fieldset>' + '<div>' + '<input type="submit" value="Restore password" name="submit">' + '<input type="hidden" name="action" value="restore">' + '</div>' + '</form>' + '<div class="info_create_mobile is_mobile">' + 'If you have not registered join now for free! <a class="popup_link_signup" href="/sign-up/">Create New Account</a>' + '</div>' + '</div>' + '</div>' + '<img class="login_banner" src="/wp-content/themes/mpg/images/bg_forgot.png"/>' + '</div>' + '<div class="user_tab_join">' + '<div class="login_form">' + '<div class="login_top">' + '<div class="title">Sign up</div>' + '</div>' + '<div class="cleanlogin-container login_bottom">' + '<form class="cleanlogin-form fv-form fv-form-bootstrap registraion-form" method="post" action="/sign-up/" novalidate="novalidate">' + '<div class="join_results">' + '<div class="indicator"></div>' + '<div class="alert result-message"></div>' + '</div>' + '<fieldset>' + '<div class="cleanlogin-field form-group">' + '<input class="cleanlogin-field-username" type="text" name="user_login" value="" placeholder="Username" data-fv-notempty="true" data-fv-notempty-message="Username is required" data-fv-stringlength="true" data-fv-stringlength-min="4" data-fv-stringlength-max="12" data-fv-stringlength-message="The username must be greater than 4 and less than 12 characters" data-fv-field="user_login">' + '</div>' + '<div class="cleanlogin-field form-group">' + '<input class="cleanlogin-field-password" type="password" name="user_pass" value="" autocomplete="off" placeholder="Password" data-fv-notempty="true" data-fv-notempty-message="The password is required" data-fv-stringlength="true" data-fv-stringlength-min="4" data-fv-stringlength-max="12" data-fv-stringlength-message="The password must be greater than 4 and less than 12 characters" data-fv-field="pass1">' + '</div>' + '<div class="cleanlogin-field form-group">' + '<input class="cleanlogin-field-email" type="email" name="user_email" value="" placeholder="E-mail" data-fv-notempty="true" data-fv-notempty-message="Email is required" data-fv-emailaddress="true" data-fv-emailaddress-message="Enter a valid email address" data-fv-field="user_email">' + '</div>' + '</fieldset>' + '<div>' + '<input type="submit" class="join_button" value="JOIN MR PORN GEEK NOW!" name="submit" onclick1="this.form.submit(); this.disabled = true;">' + '<input type="hidden" name="action" value="register">' + '</div>' + '<div class="already_have is_desktop">' + 'Already Have an Account? <a class="popup_link_login" href="/login/">Log in now</a>' + '</div>' + '<div class="already_have is_mobile">' + 'By registering on Mr Porn Geek. I certify I am at least 18 years old and have read and agree to its <a href="/terms/">Terms of Use</a> and <a href="/privacy-policy/">Privacy Policy</a>.' + '</div>' + '</form>' + '</div>' + '</div>' + '<img class="login_banner" src="/wp-content/themes/mpg/images/bg_signup.png"/>' + '</div>' + '</div>' + '</div>';
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

function showThumbInfoOnHover() {
  function showThumbInfo(el) {
    var $this = el,
        $links = $this.querySelector('.category_sites_item_title'),
        review_link = $links.getAttribute('href'),
        link_rel = $links.getAttribute('rel'),
        external_link = $links.getAttribute('data-site-link'),
        $parents = $this.parents('.category_sites'),
        $parent = $parents.length > 0 ? $parents[0] : undefined,
        text_read = $parent.getAttribute('data-text-read'),
        text_open = $parent.getAttribute('data-text-open'),
        category = $parent.getAttribute('data-category');
    var linkOpenSite = '';

    if ($this.hasAttribute('data-showopen')) {
      linkOpenSite = '<a class="link_site" rel="' + link_rel + '" href="' + external_link + '" target="_blank">' + text_open + '<i class="icon-font icon-out"></i>' + '</a>';
    }

    var $block = '<div class="category_sites_item_overlay">' + '<a class="link_read" href="' + review_link + '" target="_blank">' + text_read + '<i class="icon-font icon-arrow-angle right_angle"></i>' + '</a>' + linkOpenSite + '</div>';
    $this.insertAdjacentHTML('beforeend', $block);
    /*if (review_link == external_link) {
    	$this.find('.link1').addClass('visibility-hidden');
    }*/
  }

  function removeThumbInfo(el) {
    var siteItemOverlay = el.querySelector('.category_sites_item_overlay');

    if (siteItemOverlay) {
      siteItemOverlay.remove();
    }
  }

  var isMobileDevice = /Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|mobile/i.test(top.navigator.userAgent);
  var categorySitesItems = document.querySelectorAll('.category_sites_item_content');
  categorySitesItems.forEach(function (element) {
    if (isMobileDevice) {
      element.querySelector('.category_sites_item_thumb').addEventListener('click', function (ev) {
        // console.log('clicking thumb info', element.classList)
        if (!element.querySelector('.category_video_item')) {
          ev.preventDefault();
        } // ev.preventDefault();


        element.classList.add('touched');

        if (lastMobileSimilarSite) {
          lastMobileSimilarSite.classList.remove('touched');
        }

        showThumbInfo(element);
        lastMobileSimilarSite = element;
      });
    } else {
      element.addEventListener('mouseenter', function () {
        showThumbInfo(element);
      });
      element.addEventListener('mouseleave', function () {
        removeThumbInfo(element);
      });
    }
  });
}

function Marquee(selector, speed) {
  var parentSelector = document.querySelector(selector);
  var clone = parentSelector.innerHTML;
  var firstElement = parentSelector.children[0];
  var i = 0;
  console.log(firstElement);
  var interval;
  parentSelector.insertAdjacentHTML('beforeend', clone);
  parentSelector.insertAdjacentHTML('beforeend', clone);

  parentSelector.onmouseover = function (e) {
    clearInterval(interval);
  };

  parentSelector.onmouseleave = function (e) {
    startMarquee();
  };

  function startMarquee() {
    interval = setInterval(function () {
      firstElement.style.marginLeft = "-".concat(i, "px");

      if (i > firstElement.clientWidth) {
        i = 0;
      }

      i = i + speed;
    }, 0.01);
  }

  startMarquee();
}
/**
 * POLYFILL
 * ===================================
 */


var isMobileDevice = false;
var isLoggedUser = false;
var dataTime = '';
var videoPaused = false;
var currentLang = 'en';
var goTop;
var headerHeight = null;
var isSingleBlog = false;
var blogContent;
var blogContentHeight = 0;
var blogScrollPercent = 0;
var blogProgressBar;

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

var themeBase = '/wp-content/themes/mpg/';
var ajaxEndpoint = '/wp-content/themes/mpg/ajax-handler-wp.php';
/**
 * end POLYFILL
 * ===================================
 */

function initWebWorker() {
  currentLang = document.documentElement.getAttribute('lang');

  if (document.body.classList.contains('home')) {} else if (document.body.classList.contains('single-sites')) {
    var event = new Event('loadCategoryData');
    window.dispatchEvent(event); // console.log('emiting category load event');
  }
}

function showAgeVerification() {
  if (document.documentElement.lang == 'de') {
    var isVerified = getCookieMpgCookie("age");

    if (!isVerified) {
      var avHtml = '<div class="modal_age">' + '<div class="modal_inner">' + '<img src="/wp-content/themes/mpg/images/logo-mob.png"/>' + '<div class="title">Altersüberprüfung</div>' + '<p>MrPornGeek ist eine Erwachsenen-Community, die altersbeschränkte Inhalte enthält.<br/>' + 'Du musst 18 Jahre oder älter sein, um teilnehmen zu können.</p>' + '<button class="btnPrimary greyButton js-closeAgeModal">Ich bin 18 oder älter - Eingabe</button>' + '</div>' + '</div>';
      document.body.insertAdjacentHTML('beforeend', avHtml);
    }
  }
}

function verifyAge() {
  createCookie("age", "1", 356);

  if (document.querySelector('.modal_age')) {
    document.querySelector('.modal_age').remove();
  }
}

function showAcceptCookie() {
  if (document.documentElement.lang == 'de') {
    var isAccepted = getCookieMpgCookie("accept");

    if (!isAccepted) {
      var avHtml = '<div class="cookieBanner">' + 'Wir benutzen Cookies um die Funktionalität der Webseite zu optimieren und dir die beste Erfahrung mit uns zu bieten. ' + '<button id="acceptCookie" class="acceptCookie">OK</button>' + '</div>';
      document.body.insertAdjacentHTML('beforeend', avHtml);
    }
  }
}

function verifyCookie() {
  createCookie("accept", "1", 356);

  if (document.querySelector('.cookieBanner')) {
    document.querySelector('.cookieBanner').remove();
  }
}

function setInnerHeight() {
  var vh = window.innerHeight;
  var deviceHeight = window.innerHeight;
  var keyboardHeight = 0;

  if (window.visualViewport) {
    vh = window.visualViewport.height;
  }

  keyboardHeight = deviceHeight - vh;

  if (keyboardHeight > 0) {
    keyboardHeight += 100;
  }

  document.documentElement.style.setProperty('--kh', "".concat(keyboardHeight, "px"));
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  var wInnerHeight = window.innerHeight;
  document.documentElement.style.setProperty('--wih', "".concat(wInnerHeight, "px"));
}

function preventDefault(e) {
  e.preventDefault();
}

function disableScroll() {
  document.body.addEventListener('touchmove', preventDefault, {
    passive: false
  });
}

function enableScroll() {
  document.body.removeEventListener('touchmove', preventDefault);
}

var lastMobileSimilarSite;

(function () {
  /**
   * MAIN CALLBACK
   * ===================================
   */
  var initHome = function initHome() {
    var cGridList = document.querySelector('.c-grid.list');

    if (cGridList) {}
  };

  var bodyClick = function bodyClick() {
    var className = '.header__view-wrapper, .sort';
    document.addEventListener('click', function (ev) {
      var _ev = ev.target;
      var currentMobileSimilarSite;

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

      if (_ev.closest('.scroll_to_category')) {
        if (document.body.classList.contains('home') && !document.body.classList.contains('is-mobile')) {
          ev.preventDefault();
          scrollToCategoryOnHome(ev, _ev.closest('.scroll_to_category'));
          hide(document.querySelector('[search-drop-js]'));
        }
      }

      if (_ev.classList.contains('search_category_item')) {
        if (document.body.classList.contains('home') && !document.body.classList.contains('is-mobile')) {
          scrollToCategoryOnHome(ev, _ev);
          hide(document.querySelector('[search-drop-js]'));
        }
      } else if (_ev.classList.contains('js-closeAgeModal')) {
        verifyAge();
      } else if (_ev.classList.contains('acceptCookie')) {
        verifyCookie();
      } else if (_ev.closest('[un-favorites-js]')) {
        removeFavourite(_ev.closest('[un-favorites-js]'));
      } else if (_ev.closest('[collapse-toggle-js]')) {
        onSortToggle(_ev.closest('[collapse-toggle-js]'));
      } else if (_ev.closest('.rating_stars') || _ev.classList.contains('rating_stars')) {
        onRatingClick();
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
      } else if (isMobileOrTablet && (currentMobileSimilarSite = _ev.closest('.category_sites_item .category_sites_item_thumb'))) {
        onSimilarSiteTouch(ev, currentMobileSimilarSite);
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
  };

  function onSimilarSiteTouch(ev, siteItem) {
    if (!siteItem.parentNode.classList.contains('touched')) {
      if (!siteItem.classList.contains('.category_video_item')) {
        ev.preventDefault();
      }
    }
  }

  var viewFavoritesToggle = function viewFavoritesToggle() {
    var _btn = document.querySelector('[view-favorites-toggle-js]'),
        _node = document.querySelector('[view-favorites-drop-js]');

    if (_btn) {
      _btn.addEventListener('click', function (ev) {
        _btn.classList.toggle('is-active');

        _node.classList.toggle('is-open');

        var sortNode = document.querySelector('[sort-node-js]');

        if (sortNode) {
          sortNode.classList.remove('is-open');
        }

        var sortDropInner = document.querySelector('.sort__drop-inner');

        if (sortDropInner) {
          sortDropInner.classList.remove('is-open');
        }

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

      if (toggleSort) {
        toggleSort.addEventListener('click', function (ev) {
          if (nodeSort.innerHTML.trim() == '') {
            renderSorting();
            sortDropInner();
            sortCollapse();
          }

          nodeSort.classList.toggle('is-open');
        }, false);
      }
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

  function initGotoTop() {
    window.onscroll = function () {
      if (window.scrollY > 200) {
        show(goTop);
      } else {
        hide(goTop);
      }

      if (isSingleBlog && blogContent) {
        onBlogScroll();
      }
    };

    if (goTop) {
      goTop.onclick = function (event) {
        doScrolling(0, 200);
        return false;
      };
    }
  }

  function onBlogScroll() {
    if (window.scrollY < blogContentHeight | blogScrollPercent < 101) {
      blogScrollPercent = window.scrollY / blogContentHeight * 100;
      blogProgressBar.style.width = blogScrollPercent + '%';
    }
  }

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

    currentLang = document.documentElement.getAttribute('lang'); // lib
    //initSwiper();

    initHamburger(); // ==========================================
    // callback

    detectDevice();
    bodyClick();
    loadTranslations();
    initHome();
    renderFavourites();
    viewFavoritesToggle(); // initBtcShare();
    //sortCB();

    if (isMobileOrTablet) {
      sortCB();
    }

    goTop = document.querySelector('.go-top');
    initGotoTop();
    letterSearch();
    search();
    showThumbInfoOnHover();

    if (document.body.classList.contains('home')) {
      getLikesAndDislikes();
      initHomeTooltip();

      if (isLoggedUser != '') {
        renderFavouriteButtons();
      }
    } else if (document.body.classList.contains('single-blog')) {
      isSingleBlog = true;
      blogContent = document.querySelector('.blog_content');

      if (blogContent) {
        blogContentHeight = blogContent.getBoundingClientRect().height - window.innerHeight - 10;
        blogProgressBar = document.querySelector('.blog_progress');
        onBlogScroll();
      }
    } //		boxMore();
    // ==========================================
    //loadJS('/wp-content/themes/mpg/js/vendor.js', initWebWorker, document.body);


    initWebWorker();
    initCategoryPage();
    showAgeVerification();
    showAcceptCookie();
  };
  /**
   * @description Init all CB after page load
   */


  window.addEventListener('load', function (ev) {
    initNative();
    window.addEventListener('resize', function () {
      headerHeight = document.querySelector('#header').getBoundingClientRect().height;
      setInnerHeight();
    });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", function () {
        setInnerHeight();
      });
    }

    if (document.body.classList.contains('single-sites')) {
      onReviewPageLoad();
    }
  });
})();