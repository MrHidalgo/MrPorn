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

var isMobileOrTablet = false;

if (!navigator.userAgent.toLowerCase().includes('lighthouse')) {
  isMobileOrTablet = window.mobileAndTabletcheck();
}

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
      console.log('closing hamburger');
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
var loggedUsername = '';
var logoutUrl = '';
var sortTimout;
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
    console.log('current theme' + isDark);

    if (isDark == '1') {
      toggleMobileSwitch.checked = true;
      toggleSwitch.checked = true;
    } else {
      toggleMobileSwitch.checked = false;
      toggleSwitch.checked = false;
    }
  }
};

if (!navigator.userAgent.toLowerCase().includes('lighthouse')) {
  initTheme();
}

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
    console.log('Favouroites');
    console.log(res);

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

  var siteOrigin = document.location.origin;
  letterData[letter].forEach(function (suggession) {
    var suggessionName = suggession.name;
    var uL = letter.toUpperCase(); //suggessionName = suggessionName.replace(letter, '<span>'+letter+'</span>');
    //suggessionName = suggessionName.replace(uL, '<span>'+uL+'</span>');

    var siteFree = suggession.free;
    var freeId = suggession.free_id;
    var siteHd = suggession.hd;
    var hdId = suggession.hd_id;
    var catIcon = suggession.icon;

    if (currentLang != 'en') {
      siteFree = siteFree.replace(siteOrigin + '/', siteOrigin + '/' + currentLang + '/');
      siteHd = siteHd.replace(siteOrigin + '/', siteOrigin + '/' + currentLang + '/');
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

      if (currentLang != 'en') {//toggleLink = toggleLink.replace(siteOrigin+'/', siteOrigin+'/'+currentLang+'/');
      }

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
var videoPaused = false;
var currentLang = 'en';
var goTop;
var wInnerWidth;
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

var cdnLink = '//mpgcdn.b-cdn.net';
var contentBase = '/wp-content/';
var themeBase = '/wp-content/themes/mpg/';
var ajaxEndpoint = '/wp-content/themes/mpg/ajax-handler-wp.php';
var ajaxAdminEndpoint = '/wp-admin/admin-ajax.php';
/**
 * end POLYFILL
 * ===================================
 */

function initWebWorker() {
  currentLang = document.documentElement.getAttribute('lang');
  var dataTag = "homepage_data_" + dataTime + '_' + currentLang;
  removeOtherStorageKeys(dataTime, currentLang);
  homeData = getWithExpiry("homepage_data_" + dataTime + '_' + currentLang);

  if (homeData) {} else {
    if (!navigator.userAgent.toLowerCase().includes('lighthouse')) {
      loadHomeData();
    }
  }

  if (document.body.classList.contains('home')) {} else if (document.body.classList.contains('single-sites')) {
    var event = new Event('loadCategoryData');
    window.dispatchEvent(event); // console.log('emiting category load event');
  }
}

var loadHomeData = function loadHomeData() {
  var url = '/wp-json/mpg/home/';

  if (currentLang != 'en') {
    url = '/wp-json/mpg/home/?lang=' + currentLang;
  }

  homeData = getWithExpiry("homepage_data_" + dataTime + '_' + currentLang);

  if (homeData) {} else {
    fetch(url).then(function (res) {
      return res.json();
    }).then(function (out) {
      homeData = out;

      if (homeData.code == 'rest_login_required') {} else {
        setWithExpiry("homepage_data_" + dataTime + '_' + currentLang, homeData, 30 * 60 * 1000);
      }
    })["catch"](function (err) {// console.log('didnt load home data');
    });
  }
};

function removeOtherStorageKeys(dataTime, currentLang) {
  var homeDataKey = "homepage_data_" + dataTime + '_' + currentLang;
  var translationDataKey = "i18n_" + dataTime;
  var letterMatrixDataKey = "letter_data_" + dataTime;

  for (var key in localStorage) {
    if (key.includes('homepage_data_')) {
      if (homeDataKey != key) {
        localStorage.removeItem(key);
      }
    }

    if (key.includes('i18n_')) {
      if (translationDataKey != key) {
        localStorage.removeItem(key);
      }
    }

    if (key.includes('letter_data_')) {
      if (letterMatrixDataKey != key) {
        localStorage.removeItem(key);
      }
    }
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

var isCategoriesRendered = false;
var lastMobileSimilarSite;

(function () {
  /**
   * MAIN CALLBACK
   * ===================================
   */

  /*if(!navigator.userAgent.toLowerCase().includes('lighthouse')){
  	initLoggedUser();
  }*/
  var initHome = function initHome() {
    var cGridList = document.querySelector('.c-grid.list');

    if (cGridList) {}
  };

  var bodyClick = function bodyClick() {
    var className = '.header__view-wrapper, .sort';
    document.addEventListener('click', function (ev) {
      var _ev = ev.target;
      var currentMobileSimilarSite;

      if (_ev.closest('[sort-node-js]')) {
        console.log('Clicked sorting');
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

      if (_ev.closest('.scroll_to_category')) {
        if (document.body.classList.contains('home') && !document.body.classList.contains('is-mobile')) {
          ev.preventDefault();
          scrollToCategoryOnHome(ev, _ev.closest('.scroll_to_category'));
        }
      }

      if (_ev.classList.contains('search_category_item')) {
        if (document.body.classList.contains('home') && !document.body.classList.contains('is-mobile')) {
          scrollToCategoryOnHome(ev, _ev);
          hide(document.querySelector('[search-drop-js]'));
        }
      } else if (_ev.classList.contains('list__specification-visit')) {
        if (document.querySelector('[video-js]')) {
          playPause(document.querySelector('[video-js]'));
        }
      } else if (_ev.closest('.show_more_sites_trigger')) {
        toggleMoreSimilarSites();
      } else if (_ev.classList.contains('read_more') | _ev.closest('.read_more') | _ev.closest('.list__specification-more')) {} else if (_ev.classList.contains('list__specification-close') | _ev.parentNode.classList.contains('list__specification-close')) {
        closeBanner(_ev);
      } else if (_ev.closest('.site--link.review-site-link') && isMobileOrTablet) {
        ev.preventDefault();
        showBanner(_ev.closest('.site--link.review-site-link').dataset.id, false, ev);
      } else if (_ev.closest('.list__box-more')) {
        showBanner(_ev.closest('.list__box-more').dataset.id, false, ev); //openSlideModal(ev);
      } else if (_ev.closest('[more-toggle-js]')) {
        //showBanner(_ev);
        showBanner(_ev.closest('[more-toggle-js]').dataset.id, false, ev);
      } else if (_ev.closest('[spec-like-js]')) {
        onBannerLikeClick(_ev.closest('[spec-like-js]'));
      } else if (_ev.closest('[spec-dislike-js]')) {
        onBannerDislikeClick(_ev.closest('[spec-dislike-js]'));
      } else if (_ev.classList.contains('js-closeAgeModal')) {
        verifyAge();
      } else if (_ev.classList.contains('acceptCookie')) {
        verifyCookie();
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
      } else if (_ev.closest('.rating_stars') || _ev.classList.contains('rating_stars')) {
        onRatingClick();
      } else if (_ev.closest('.list__specification-play')) {
        onPlayClick(_ev.closest('.list__specification-play'));
      } else if (_ev.classList.contains('list__specification-play')) {
        onPlayClick(_ev);
      } else if (_ev.closest('.list__specification-pause')) {
        onPauseClick(_ev.closest('.list__specification-pause'));
      } else if (_ev.classList.contains('list__specification-pause')) {
        onPauseClick(_ev);
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
        console.log('clicked similar site');
      } else if (_ev.classList.contains('hdrfavttl')) {
        ev.preventDefault();
        document.querySelector('.mobile_fav_link').classList.toggle('open');
      } else if (_ev.classList.contains('close-modal') | _ev.parentNode.classList.contains('close-modal')) {
        if (!isMobileOrTablet) {
          cancelModal(ev);
        }
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
      ev.preventDefault();
    }

    siteItem.parentNode.classList.add('touched');

    if (lastMobileSimilarSite) {
      lastMobileSimilarSite.classList.remove('touched');
    }

    lastMobileSimilarSite = siteItem.parentNode;
  }

  function onSiteBoxHoverClick(_el) {
    var siteBoxLink = _el.querySelector('.site_link');

    if (siteBoxLink && siteBoxLink.tagName == 'A') {
      siteBoxLink.click();
    }
  }

  var initBtcShare = function initBtcShare() {
    var canShowBtc = getCookieMpgCookie("btch");

    if (!ifBot() && canShowBtc == '' | canShowBtc != '1') {
      renderBtcShare();
      var btcContainer = document.querySelector('.header__action_bitcoin');
      var btcHash = document.querySelector('.header__action_bitcoin_inner');

      if (btcHash) {
        var btcHashAddress = document.querySelector('.header__action_bitcoin .btc_hash');
        btcHash.addEventListener('click', function (ev) {
          if (btcHashAddress) {
            navigator.clipboard.writeText(btcHashAddress.innerText);
            console.log('copied btc');

            if (btcContainer) {
              btcContainer.classList.add('copied');
              setTimeout(function () {
                btcContainer.classList.remove('copied');
              }, 3700);
            }
          }
        });
      }

      var btcClose = document.querySelector('.btc-close');

      if (btcClose) {
        btcClose.addEventListener('click', function (ev) {
          document.body.classList.remove('fund');
          createCookie("btch", "1", 7);
        });
      }
    }
  };

  var ifBot = function ifBot() {
    var botUserAgentsArray = ['googlebot', 'bingbot', 'linkedinbot', 'mediapartners-google', 'lighthouse', 'insights'];
    var agent = window.navigator.userAgent;
    var isBotUserAgent = false;
    botUserAgentsArray.forEach(function (_agent) {
      if (agent.toLowerCase().indexOf(_agent.toLowerCase()) !== -1) {
        return true;
      }
    });
    return false;
  };

  var renderBtcShare = function renderBtcShare() {
    var _btcHtml = '<div class="header__action_bitcoin-outer">' + '<div class="header__action_bitcoin">' + '        <div class="header__action_bitcoin_inner">Show Some Love For Our Work? <span class="btc_hash"><img src="/wp-content/themes/mpg/images/bitcoin.svg"/> 1Avmt3WehQVuX4uto7rRStAuEwbYZrS9op</span></div>' + '        <div class="header__action_bitcoin_copied">Copied <img src="/wp-content/themes/mpg/images/tick-icon.svg"/></div>' + '    </div>' + '        <i class="icon-font btc-close icon-close"></i>' + '    </div>';

    var btcContainer = document.querySelector('.c-grid.bitcoin');

    if (btcContainer) {
      btcContainer.innerHTML = _btcHtml;
      document.body.classList.add('fund');
    }
  };

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

  function playPause(vid) {
    if (vid.paused) {
      videoPaused = false;
      vid.play();
    } else {
      vid.pause();
      videoPaused = true;
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

    for (var _i2 = 0, _len = videoPauseBtns.length; _i2 < _len; _i2++) {
      videoPauseBtns[_i2].addEventListener('click', function (ev) {
        var el = ev.currentTarget;
        onPauseClick(el);
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
    var videoJs = document.querySelector('[video-js]');

    if (videoJs.paused) {
      videoPaused = true;
    }
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

    var elID = el.dataset.id,
        elParent = el.closest('.list__box-wrapper');
    console.log('Fav box ' + elID);
    el.classList.toggle('is-active');
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

    var listFavoritesBtn = document.querySelector('.list__box-favorites[data-id="' + elID + '"]');
    console.log('Clicking favourite button');
    el.classList.toggle('is-active');

    if (listFavoritesBtn) {
      listFavoritesBtn.classList.toggle('is-active');
    }
  }

  function onSiteBoxLikeClick(el) {
    var elID = el.getAttribute('data-id');
    el.classList.toggle('is-active');
    onLike(el, elID);
    document.querySelector('.list__box-dislike[data-id="' + elID + '"]').classList.toggle('is-hide'); //const specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]');

    var specificationBlock = document.querySelector('.list__specification[data-id="' + elID + '"]');

    if (specificationBlock) {
      var specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]'),
          specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]');
      specificationLikeBtn.classList.toggle('is-active');
      specificationDislikeBtn.parentElement.classList.toggle('is-hide');
    }
  }

  function onBannerLikeClick(el) {
    var elID = el.getAttribute('data-like'),
        elActionNode = el.closest('[spec-actionNode-js]'),
        dislikeBtn = elActionNode.querySelector('[spec-dislike-js]');
    console.log('Trying to like ' + elID);
    dislikeBtn.parentElement.classList.toggle('is-hide'); //const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
    // 	const listLikeBtn = document.querySelector('.list__specification-like.list__box-like[data-like="' + elID + '"]'),
    // 	listDislikeBtn = document.querySelector('.list__box-dislike.list__specification-dislike[data-dislike="' + elID + '"]');

    var listLikeBtn = document.querySelector('.list__specification-like[data-id="' + elID + '"]'),
        listDislikeBtn = document.querySelector('.list__specification-dislike[data-id="' + elID + '"]');

    if (!listLikeBtn) {
      listLikeBtn = document.querySelector('.list__specification-like[data-like="' + elID + '"]');
    }

    if (!listDislikeBtn) {
      listDislikeBtn = document.querySelector('.list__specification-dislike[data-dislike="' + elID + '"]');
    } //el.classList.toggle('is-active');


    if (listLikeBtn) {
      listLikeBtn.classList.toggle('is-active');
    }

    if (listDislikeBtn) {
      listDislikeBtn.classList.remove('is-active');
    }

    listDislikeBtn.classList.toggle('is-hide');
    onLike(el, elID);
  }

  function onSiteBoxDislikeClick(el) {
    var elID = el.getAttribute('data-id');
    console.log('Disliking ' + elID);
    document.querySelector('.list__box-like[data-id="' + elID + '"]').classList.toggle('is-hide');
    var specificationBlock = document.querySelector('.previewModal[data-site-id="' + elID + '"]');

    if (specificationBlock) {
      var specificationLikeBtn = specificationBlock.querySelector('.list__box-like[data-id="' + elID + '"]'),
          specificationDislikeBtn = specificationBlock.querySelector('.list__box-dislike[data-id="' + elID + '"]');
      specificationLikeBtn.classList.remove('is-active');
      specificationDislikeBtn.classList.toggle('is-active');
      specificationLikeBtn.parentElement.classList.toggle('is-hide');
      onDisLike(el, elID);
    }
  }

  function onBannerDislikeClick(el) {
    var elID = el.getAttribute('data-dislike'),
        elActionNode = el.closest('[spec-actionNode-js]'),
        likeBtn = elActionNode.querySelector('[spec-like-js]');
    likeBtn.parentElement.classList.toggle('is-hide'); //const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
    // const listLikeBtn = document.querySelector('.list__specification-like.list__box-like[data-id="' + elID + '"]'),
    // 	listDislikeBtn = document.querySelector('.list__box-dislike.list__specification-dislike[data-id="' + elID + '"]');

    var listLikeBtn = document.querySelector('.list__specification-like[data-id="' + elID + '"]'),
        listDislikeBtn = document.querySelector('.list__specification-dislike[data-id="' + elID + '"]');

    if (!listLikeBtn) {
      listLikeBtn = document.querySelector('.list__specification-like[data-like="' + elID + '"]');
    }

    if (!listDislikeBtn) {
      listDislikeBtn = document.querySelector('.list__specification-dislike[data-dislike="' + elID + '"]');
    }

    if (listLikeBtn) {
      listLikeBtn.classList.remove('is-active');
    }

    if (listDislikeBtn) {
      listDislikeBtn.classList.toggle('is-active');
    }

    listLikeBtn.classList.toggle('is-hide');
    onDisLike(el, elID);
  }

  function initGotoTop() {
    /*if(isMobileOrTablet){
    	document.querySelector('body').ontouchmove = function(){
    		var mainScroll = -document.body.getBoundingClientRect().top;
    		if (mainScroll > 200) {
    			show(goTop);
    		} else {
    			hide(goTop);
    		}
    	}
    }else{
    	}*/
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
      console.log('blog scroll percentage ' + window.scrollY + ' - ' + blogContentHeight, blogScrollPercent);
    }
  }

  function adjustStickHeader() {
    if (!isMobileDevice && !document.body.classList.contains('single-sites')) {
      if (window.pageYOffset >= 60) {
        document.body.classList.add('sticky_header');
      } else {
        document.body.classList.remove('sticky_header');
      }
    }
  } //Loading other categories on home


  function loadOtherHomeCategories() {
    var myEls = document.querySelectorAll(".observer-block");

    if (myEls.length == 0) {
      return;
    }

    var myObserver = new IntersectionObserver(function (elements) {
      elements.forEach(function (index) {
        if (index.intersectionRatio > 0) {
          if (homeData && homeData.categories_indexes) {
            if (!isCategoriesRendered) {
              isCategoriesRendered = true;
              renderAllOtherCategories();
              myObserver.unobserve(myEls[0]);
            }
          }
        }
      });
    });

    if (myEls.length) {
      myObserver.observe(myEls[0]);
    }

    if (myEls.offsetTop < window.scrollY) {
      renderAllOtherCategories();
    }
    /*if (document.body.classList.contains('home') && window.scrollY > 500) {
    	if(homeData && homeData.categories_indexes){
    		if(!isCategoriesRendered){
    			isCategoriesRendered = true;
    			renderAllOtherCategories();
    			}
    	}
    }*/

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

    var _listContainer = document.querySelector('.c-grid.list .list__box-wrapper'),
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

  var skipModal = function skipModal() {};

  function onSkip(el) {
    var elID = el.getAttribute('data-id'),
        elCategory = el.getAttribute('data-category'),
        elParent = listBoxWrappers[elCategory];
    var currentCategory = el.dataset.category;

    if (popupVideo = document.querySelector('[video-js]')) {
      popupVideo.pause();
    }

    if (wInnerWidth < 1024) {
      cloneCurrentPopupBanner();
    }

    var nextSite = elParent.querySelector('.swiper-slide[data-siteid="' + elID + '"]').nextSibling;

    if (nextSite == null || nextSite === undefined) {
      nextSite = elParent.querySelector('.swiper-slide');
    }

    if (nextSite) {
      if (isMobileOrTablet) {
        showBanner(nextSite.dataset.siteid, true);
      } else {
        var nextIndex = nextSite.dataset.index;
        var nextSiteMore = nextSite.querySelector('.list__box');
        var prevItem = renderHompageSiteSlide(currentCategory, nextIndex); //renderMobileMoreButton()

        if (prevItem && nextSite) {
          nextSite.innerHTML = prevItem;
          showBanner(nextSiteMore, true);
        }
      }
    } else {
      var firstSite = elParent.querySelector('.swiper-slide').firstChild;

      if (firstSite) {
        var firstSiteMore = firstSite.querySelector('.list__box-more');

        if (firstSiteMore) {
          showBanner(firstSiteMore, true);
        }
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
    console.log('initNative');
    wInnerWidth = window.innerWidth; // default

    initPreventBehavior(); // ==========================================

    currentLang = document.documentElement.getAttribute('lang'); // lib
    //initSwiper();

    initHamburger(); // ==========================================
    // callback

    detectDevice();
    bodyClick();
    dataTime = document.querySelector('meta[name="data_time"]').content;
    loadTranslations();
    initHome();
    renderFavourites();
    viewFavoritesToggle(); //sortCB();

    if (isMobileOrTablet) {
      sortCB();
    }

    goTop = document.querySelector('.go-top');
    initGotoTop();
    loadOtherHomeCategories();
    letterSearch();
    search();

    if (document.body.classList.contains('home')) {
      boxHover(); //videoToggle();
      //listIndicator();
      //detailsToggleAction();

      skipModal();
      toggleMoreBox();
      getLikesAndDislikes();
      initHomeSwippers();
    } //		boxMore();
    // ==========================================
    //loadHomeData();
    //loadJS('/wp-content/themes/mpg/js/vendor.js', initWebWorker, document.body);


    initWebWorker();
    showAgeVerification();
    showAcceptCookie();
  };

  var onWindowBlur = function onWindowBlur() {
    if (document.querySelector('[video-js]')) {
      document.querySelector('[video-js]').pause();
    }
  };

  var onWindowChange = function onWindowChange() {
    if (document.body.classList.contains('home')) {
      var __vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty('--vh', "".concat(__vh, "px"));
    }
  };
  /**
   * @description Init all CB after page load
   */


  if (!navigator.userAgent.toLowerCase().includes('lighthouse')) {
    window.addEventListener('load', function (ev) {
      // initNative();
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
        wInnerWidth = window.innerWidth;
        headerHeight = document.querySelector('#header').getBoundingClientRect().height;

        if (document.body.classList.contains('home')) {
          var vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
        }

        if (wInnerWidth > 1023) {
          if (document.querySelector('.list__specification.is-open')) {
            document.getElementsByTagName('html')[0].classList.remove('is-hideScroll');
            document.getElementsByTagName('body')[0].classList.remove('is-hideScroll');
          }
        } else {
          onWindowChange();
          setTimeout(function () {
            onWindowChange();
          }, 500);

          if (!isMobileOrTablet) {
            if (document.querySelector('.list__specification.is-open')) {
              document.getElementsByTagName('html')[0].classList.add('is-hideScroll');
              document.getElementsByTagName('body')[0].classList.add('is-hideScroll');
            }
          }
        }
      });
    });
    initNative();
  }
})();

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

var _lastGreenBarTransformX;

var _lastGreenBarTranslate;

var _greenBarDW = 0;
var greenBarWidth;

var _lastSwiperWrapper;

var _lastSlideSwiper;

var _touchStartPosition = 0;

var _greenBarTimer;

var _isGreenBarMoving = false;
var isAnimationStarted = false;
var maxLeft;
var minLeft;
var swiperSlideWidth = 230;
var pauseHoverAnimation = false;
var swiperClientWidth = null;
var swiperClientHeight = null;
var defaultSlideWidth = 0;
var defaultSlidePaddingLeft = 0;
var defaultSlidePaddingRight = 0;
var defaultSlideMarginLeft = 0;
var defaultSlideMarginRight = 0;
var currentBannerSection = null;

var _slideWidth,
    _slidePaddingLeft,
    _slidePaddingRight,
    _slideMarginLeft,
    _slideMarginRight,
    _slideBoxSizing = null;

var swiperWrappers = [];
var listBoxWrappers = [];
var popupVideo = null;
var siteModal = document.querySelector('#site_modal');
var modalStartX = 0;
var modalStartY = 0;
var toScaleX = 0;
var toScaleY = 0;
var trigger;
var isClosing = false; // Select DOM

var modalTriggersDom = document.querySelectorAll('.modal-trigger');
var dimmer = document.querySelector('.overlay');
var modalContainer = document.querySelector('.modal-container');
var modal = document.querySelector('.modal');

function openSlideModal(e, siteId) {
  if (!e.target) {
    return;
  }

  trigger = document.querySelector('.swiper-slide[data-siteid="' + siteId + '"]');

  if (!trigger) {
    return true;
  }

  if (wInnerWidth > 767) {
    document.body.classList.add('opened'); // Get bounding box of triggering element
    //new popup effect

    siteModal.classList.remove('prev_state');
    modalContainer.style.display = 'block';
    var triggerBBox = trigger.getBoundingClientRect();
    var modalBBox = siteModal.getBoundingClientRect();
    var modalMaxWidth = wInnerWidth * .75;

    if (wInnerWidth < 1450) {
      modalMaxWidth = 1300;
    }

    var modalXTo = (wInnerWidth - modalMaxWidth) / 2;
    toScaleX = triggerBBox.width / modalBBox.width;
    toScaleY = triggerBBox.height / modalBBox.height;
    document.documentElement.style.setProperty('--mtx', "".concat(modalXTo, "px"));
    document.documentElement.style.setProperty('--mh', "".concat(modalBBox.height, "px"));
    document.documentElement.style.setProperty('--mscx', toScaleX);
    document.documentElement.style.setProperty('--mscy', toScaleY);
    setTimeout(function () {
      dimmer.style.display = 'block';
      dimmer.classList.add('open');
      siteModal.style.transform = 'scaleX(' + toScaleX + ') scaleY(' + toScaleY + ')';
      siteModal.style.display = 'block';

      siteModal.animate([{
        transform: 'scaleX(' + toScaleX + ') scaleY(' + toScaleY + ')',
        opacity: 0,
        left: modalStartX,
        top: modalStartY
      }, {
        transform: 'scaleX(1) scaleY(1)',
        opacity: 1,
        top: 100 + 'px',
        left: modalXTo + 'px'
      }], {
        duration: 300,
        iterations: 1 // direction: 'alternate'

      }).onfinish = function (e) {
        //e.target.effect.target.style.opacity = 1;
        siteModal.classList.remove('scaled');
        siteModal.style.transform = 'scaleX(1) scaleY(1)';
        siteModal.style.left = modalXTo + 'px';
        siteModal.style.top = '100px';
      };
    });
  } else {
    if (modalContainer) {
      modalContainer.style.display = 'flex';
    }
  }
}

function cancelModal(e) {
  if (e.target && e.target.classList.contains('cancel-modal') && !isClosing) {
    e.stopPropagation();
  }

  isClosing = true;

  if (document.querySelector('[video-js]')) {
    document.querySelector('[video-js]').pause();
  }

  document.body.classList.remove('opened');

  if (window.innerWidth < 767) {
    var _isOpen = document.querySelector('.list__specification.is-open');

    if (_isOpen) {
      _isOpen.classList.remove('is-open');
    }

    setTimeout(function () {
      modalContainer.style.display = 'none';
    }, 400);
  } else {
    console.log('closing modal x ' + modalStartX + ' -- ' + modalStartY + ' - ' + toScaleX + ' - ' + toScaleY);

    siteModal.animate([{
      transform: 'scaleX(1) scaleY(1)',
      opacity: 1,
      top: 100 + 'px'
    }, {
      transform: 'scaleX(' + toScaleX + ') scaleY(' + toScaleY + ')',
      opacity: 0,
      left: modalStartX,
      top: modalStartY
    }], {
      duration: 300,
      iterations: 1 // direction: 'alternate'

    }).onfinish = function (e) {
      //e.target.effect.target.style.opacity = 1;
      // siteModal.classList.add('scaled');
      siteModal.style.transform = 'scaleX(1) scaleY(1)';
      siteModal.style.left = modalStartX;
      siteModal.style.top = modalStartY; // siteModal.style.display = 'none';

      modalContainer.style.display = 'none';
      dimmer.style.display = 'none';
    };
  }
}

function cloneCurrentPopupBanner() {
  currentPopupBanner = document.querySelector('.list__specification.is-open');

  if (currentPopupBanner) {
    //let popupBannerWrapper = currentPopupBanner.closest('.list__specification-wrapper');
    var popupBannerWrapper = siteModal;

    if (popupBannerWrapper) {
      clonedPopupBanner = currentPopupBanner.cloneNode(true);
      clonedPopupBanner.setAttribute('class', 'list__snapshot is-snapshot');
      popupBannerWrapper.insertBefore(clonedPopupBanner, currentPopupBanner);
    }
  }
}

function closeBanner(_el) {
  //closeAllSnapshots();
  if (true) {
    cancelModal(_el);
    return;
  }

  parent = _el.closest('.list__specification');

  _el.closest('.list__box-wrapper').classList.remove('is-open');

  _el.closest('.list__specification').classList.remove('is-open');

  document.body.classList.remove('is_open');

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

function scrollToCategoryOnHome(ev, _ev) {
  if (_ev) {
    var catId = _ev.dataset.objectId ? _ev.dataset.objectId : _ev.dataset.category;

    if (catId) {
      if (document.querySelector('#category_wrapper_' + catId)) {
        ev.preventDefault();

        if (catId != 55 && !document.body.classList.contains('sticky_header')) {
          document.body.classList.add('sticky_header');
        }

        pauseHoverAnimation = true;
        document.querySelector('#category_wrapper_' + catId).scrollIntoView({
          behavior: 'smooth'
        });
        var elParent = document.querySelector('.list__box-wrapper[data-name="category_' + catId + '"]');
        var scrollGreenBar = document.querySelector('.list__box-wrapper[data-name="category_' + catId + '"] .list__box-line');
        scrollGreenBar.setAttribute('style', 'background-color: #d5f34a;'); //elParent.querySelectorAll('.swiper-slide')[0].classList.add('is-hover');

        tempRepositionGreenBar(elParent, 0, true);
        setTimeout(function () {
          //document.querySelector('.list__box-wrapper[data-name="category_'+catId+'"] .category_title_inner').classList.add('animate__animated', 'animate__pulse', 'animate__repeat-2');
          //scrollGreenBar.classList.add('animate__animated', 'animate__fadeOut');
          setTimeout(function () {
            scrollGreenBar.setAttribute('style', 'background-color: rgb(25, 26, 40);');
            setTimeout(function () {
              pauseHoverAnimation = false;
            }, 1000);
          }, 1000);
        }, 1300); //animate__animated', 'animate__pulse', 'animate__repeat-2
      }
    }
  }
}

function renderHompageSiteSlide(category, index) {
  //rendering single slide
  var siteItem = homeData.categories[category].sites[index];

  if (siteItem) {
    var siteId = siteItem.id;
    var siteLink = siteItem.link;
    var siteName = siteItem.name;
    var siteThumb = siteItem.banner_image ? siteItem.banner_image : siteItem.thumb;
    var siteLogo = siteItem.logo ? siteItem.logo.src : '';
    var siteTagline = siteItem.tagline;

    if (siteTagline) {
      siteTagline = siteTagline.replace(/\\(.)/mg, "$1");
    }

    var slideHtml = '<div class="list__box" list-box-js  data-id="' + siteId + '">' + '<a class="site--link review-site-link" data-id="' + siteId + '" href="' + siteLink + '" hreflang="' + currentLang + '">' + '<img class="list__box__thumb" src="' + siteItem.banner_image + '"/>' + '<p class="list__box--title">' + siteName + '</p>' + '<p class="list__box--tagline">' + siteTagline + '</p>' + '</a>' + '</div>';
    return slideHtml;
  }

  return false;
}

function renderSiteHoverContent(category, index, siteId, siteLink, siteName, siteTagline, siteRating) {
  //console.log('current site link '+siteId+' - - '+siteName+' - - '+siteLink)
  var ratingHtml = '';

  for (var _i = siteRating; _i < 5; _i++) {
    ratingHtml += '<i class="icon-font icon-star-fill"></i>';
  }

  for (var _i3 = 0; _i3 < siteRating; _i3++) {
    ratingHtml += '<i class="icon-font icon-star"></i>';
  }

  var btnFav = isLoggedUser != "" ? '<button class="list__box-favorites" type="button" data-id="' + siteId + '" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>' : '<button class="list__box-favorites" type="button" data-id="' + siteId + '" more-toggle-js><i class="icon-font icon-arrow-angle icon-more-arrow"></i></button>';
  var btnFavToolTip = isLoggedUser != "" ? _t('add-to-favourites', 'Add To Favourites') : _t('more-info', 'More Info');
  var hoverContent = '<div class="list__box-details-left">' + '<a class="site_link" href="' + siteLink + '" target="_blank">' + '<i class="icon-font icon-out"></i>' + '<p class="list__box-details-title">' + siteName + '</p>' + '</a>' + '<div class="list__rating">' + '<div class="list__rating--front">' + '<span>' + _t('user_rating', 'User Rating') + ':</span>' + '<div class="rating_stars">' + ratingHtml + '</div>' + '</div>' + '<div class="list__rating--back">' + _t('thanks-for-voting', 'Thanks for voting!') + '</div>' + '</div>' + '</div>' + '<div class="list__box-details-right">' + '<button class="list__box-like" type="button" data-id="' + siteId + '" like-toggle-js><i class="icon-font icon-like"></i></button>' + '<button class="list__box-dislike" type="button" data-id="' + siteId + '" dislike-toggle-js><i class="icon-font icon-like"></i></button>' + '<div class="c-popper">' + btnFav + '<div class="c-poppertext">' + '<u>' + btnFavToolTip + '</u>' + '<u>' + _t('remove-from-favorites', 'Remove From Favourites') + '</u>' + '</div>' + '</div>' + '</div>' + '<a href="' + siteLink + '" target="_blank" class="list__box--tooltip">' + siteTagline + '</a>';
  return hoverContent;
}

function onRatingClick() {
  previewModal.querySelector('.list__rating').classList.add('active');
  setTimeout(function () {
    previewModal.querySelector('.list__rating').classList.remove('active');
  }, 2000);
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
    var isNoFollow = siteItem.is_nofollow;
    var tagLIne = siteItem.tagline;

    if (tagLIne != '') {
      tagLIne = tagLIne.replaceAll("\'", "'");
      tagLIne = tagLIne.replaceAll("\\'", "'");
    }

    var siteUrl = siteItem.url;
    var siteLink = siteItem.link;

    if (siteItem.review_link) {
      siteLink = siteItem.review_link;
    }

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
        moreSites += '<div class="list__box_more_item" list-box-more-js  data-id="' + moreSite.id + '" data-count="1" >' + //'<a class="list__box_more_thumb" href="'+moreSite.link+'" style="background-image: url(https://mpg-images.b-cdn.net'+moreSite.banner_image+')"></a>' +
        '<a class="list__box_more_thumb" href="' + moreSite.link + '" style="background-image: url(' + moreSite.banner_image + ')"></a>' + '</div>';
        moreSiteCount++;
      }
    });
    var bannerHtml = '<div class="list__specification ' + bannerClass + '" data-id="' + siteId + '">' + '<a class="list__specification-close" ><i class="icon-font icon-close"></i></a>' + '<div class="list__specification__inner">' + '<div class="list__specification-header">' + '<img class="list__specification-logo" src="' + siteLogo + '"/>' + '<a class="list__specification-close" >' + '<i class="icon-font icon-close"></i>' + '</a>' + '</div>' + '<div class="list__specification-left">' + '<div>' + '<img class="list__specification-logo" src="' + siteLogo + '"/>' + '<div class="list__specification-action" spec-actionNode-js>' + '<div><a class="list__specification-visit nav_link" href="' + siteUrl + '" target="_blank" ' + (isNoFollow ? 'rel="nofollow"' : '') + '>' + _t('lbl_visit_website', 'VISIT WEBSITE') + '</a></div>' + '<div><a class="list__specification-read nav_link" href="' + siteLink + '" hreflang="' + currentLang + '" target="_blank">' + _t('read_review', 'READ REVIEW') + '</a></div>' + '<div class="list__specification-action-desc">' + '<p>' + tagLIne + '</p>' + '</div>' + '<div class="list__specification-action-skip"><a class="list__specification-circle list__specification-skip" data-id="' + siteId + '" data-category="' + category + '" data-index="' + index + '" spec-skip-js><i class="icon-font icon-point"></i><span>Skip</span></a></div>' + '<div class="list__specification-action-circle">' + '<button class="list__specification-circle list__specification-like" data-id="' + siteId + '" data-like="' + siteId + '" spec-like-js><i class="icon-font icon-like"></i><span>Like</span></button>' + '</div>' + '<div class="list__specification-action-circle">' + '<button class="list__specification-circle list__specification-dislike" data-id="' + siteId + '" data-dislike="' + siteId + '" spec-dislike-js><i class="icon-font icon-like"></i><span>Dislike</span></button>' + '</div>' + '<div class="list__specification-action-circle">' + '<div class="c-popper">' + '<button class="list__specification-circle list__specification-favorites" data-id="' + siteId + '" data-favorites="' + siteId + '" spec-favorites-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i><span>Favorites</span></button>' + '<div class="c-poppertext">' + '<u>' + _t('add-to-favourites', 'Add To Favourites') + '</u>' + '<u>' + _t('remove-from-favorites', 'Remove From Favourites') + '</u>' + '</div>' + '</div>' + '</div>' + '</div>' + '<p class="list__specification-desc">' + tagLIne + '</p>' + '</div>' + '</div>' + bannerRight + '<div class="list__specification-more">' + '<div>' + '<p>' + _t('more-like-this', 'More Like This') + '</p>' + '</div>' + '<div class="site_banner_more_sites">' + moreSites + '</div>' + '</div>' + '</div>' + getPopupSimilarSites(category, siteId) + '</div>'; //Loading bottom part in the drop down

    return bannerHtml;
  }

  return false;
}

function getPopupSimilarSites(category, currentSiteId) {
  var totalSimilarSiteCount = homeData.categories[category].sites.length - 1;
  var similarHtml = '<div class="list__specification-bottom">';
  similarHtml += '<div class="similar_site_title">' + _t('more_similar_sites', 'MORE SIMILAR SITES') + '</div>';
  similarHtml += '<div class="similar_site_list show_10" data-count="' + totalSimilarSiteCount + '">';
  var similarSiteCount = 0;

  if (!homeData.categories[category]) {
    return '';
  }

  homeData.categories[category].sites.map(function (moreSite, index) {
    if (currentSiteId != moreSite.id) {
      var moreSiteLogo = moreSite.logo ? moreSite.logo.src : '';
      var similarSiteItemClass = 'similar_site_item';

      if (similarSiteCount == 0) {
        similarSiteItemClass += ' hover';
      }

      var siteTagLine = moreSite.tagline;

      if (siteTagLine) {
        if (window.innerWidth < 1366.98) {
          siteTagLine = siteTagLine.substr(0, 116);
        } else if (window.innerWidth < 1441) {
          siteTagLine = siteTagLine.substr(0, 130);
        } else {
          siteTagLine = siteTagLine.substr(0, 180);
        }
      }

      var siteLink = moreSite.link;

      if (moreSite.review_link) {
        siteLink = moreSite.review_link;
      }

      var bannerVideoPoster = moreSite.banner_video_poster;
      var bannerVideo = moreSite.banner_video;
      var similarSiteVideo = '';
      var siteHasVideo = '';

      if (bannerVideo) {
        similarSiteVideo = 'data-video="' + bannerVideo + '" data-poster="' + bannerVideoPoster + '"';
        siteHasVideo = ' has_video';
      }

      var isNoFollow = moreSite.is_nofollow ? ' rel="nofollow"' : '';
      similarHtml += '<div class="' + similarSiteItemClass + ' ' + siteHasVideo + '" ' + similarSiteVideo + '>' + '<div class="similar_site_item_inner">' + '<a class="similar_site_item_link" href="' + siteLink + '" hreflang="' + currentLang + '">' + '<div class="similar_site_item_thumb" style="background-image: url(' + moreSite.banner_image + ')"></div>' + '<div class="similar_site_item_content">' + '<h3 class="title">' + moreSite.name + '</h3>' + //'<p>'+moreSite.tagline+' <a class="readmore" href="'+moreSite.link+'">Read More</a></p>'+
      '<p>' + siteTagLine + '... <span class="read_more">' + _t('read_more', 'Read More') + '</span></p>' + '</div>' + '</a>' + '<div class="similar_site_item_buttons">' + '<a class="visit_site list__specification-read nav_link" href="' + moreSite.url + '" target="_blank"' + isNoFollow + '>' + _t('lbl_visit_website', 'VISIT WEBSITE') + '</a>' + '<a class="read_review list__specification-visit nav_link" href="' + siteLink + '"  hreflang="' + currentLang + '">' + _t('read_review', 'READ REVIEW') + '</a>' + '</div>' + '</div>' + '</div>';
      similarSiteCount++;
    }
  });
  similarHtml += '</div>';
  var _catCount = homeData.categories[category].count;
  var _catTitle = homeData.categories[category].title;
  var _catLink = homeData.categories[category].link;
  var _catIconUrl = homeData.categories[category].logo.url;

  var _catIcon = '<img src="' + _catIconUrl + '"/>';

  var showCategoryLink = false;

  if (totalSimilarSiteCount > 10) {
    similarHtml += '<div class="show_more_sites">' + '<button class="show_more_sites_trigger">' + '<i class="icon-font icon-arrow-angle"></i>' + '</button>' + '</div>';
  } else {
    showCategoryLink = true;
  } //Category link


  similarHtml += '<div class="category_link ' + (showCategoryLink ? 'show' : '') + '">';
  similarHtml += '<a class="link_btn" href="' + _catLink + '">' + _catIcon + _t('see_all', 'See All') + ' (' + _catCount + ') ' + _catTitle + '</a>';
  similarHtml += '</div>'; //Category link end

  similarHtml += '<div id="other_categories" class="more_terms">';
  similarHtml += '<div class="similar_site_title">' + _t('more_categories', 'MORE CATEGORIES') + '</div>';
  similarHtml += '<div class="more_categories_list category_box">';
  homeData['more_terms'].map(function (term, index) {
    var moreTermCat = homeData.categories[term];
    var moreTermHtml = '<div class="category_item">';
    moreTermHtml += '<a class="category_item_inner" hreflang="en" href="' + moreTermCat.link + '">';
    var youtubeIcon = moreTermCat['youtube_hd_opt'];

    if (Array.isArray(youtubeIcon)) {
      youtubeIcon = youtubeIcon.join().trim();
    }

    youtubeIcon = youtubeIcon.trim();

    if (youtubeIcon == 'hdbadge') {
      //moreTermHtml += '<i className="'+moreTermCat['youtube_hd_opt']+'"></i>';
      moreTermHtml += '<img class="yt_icon" src="/wp-content/themes/mpg/images/icon_hd.png"/>';
    } else if (youtubeIcon == 'ytbadge') {
      moreTermHtml += '<img class="yt_icon" src="/wp-content/themes/mpg/images/icon_youtube.png"/>';
    }

    var videoThumb = moreTermCat['video_thumb'];

    if (videoThumb != '') {
      moreTermHtml += '<video class="category_item__content nolazy" autoplay loop muted playsinline><source src="' + videoThumb + '" type="video/mp4">Your browser does not support the video tag.</video>';
    } else {
      moreTermHtml += '<img class="category_item__content nolazy" src="' + moreTermCat['thumbnail'] + '" alt="' + moreTermCat['title'] + '"/>';
    }

    moreTermHtml += '<div class="catD">' + moreTermCat['title'] + '<small>' + _t('click_here_to_see', 'Click Here to See') + ' (' + moreTermCat['count'] + ') ' + _t('sites', 'Sites') + '</small></div>';
    moreTermHtml += '</a>';
    moreTermHtml += '</div>';
    similarHtml += moreTermHtml;
  });
  similarHtml += '</div>';
  similarHtml += '</div>';
  similarHtml += '</div>';
  return similarHtml;
}

function toggleMoreSimilarSites() {
  var similarSiteList = document.querySelector('.similar_site_list');

  if (similarSiteList) {
    var siteCount = similarSiteList.dataset.count;

    var _categoryLink = document.querySelector('.list__specification-bottom .category_link');

    if (siteCount > 10 && similarSiteList.classList.contains('show_10')) {
      similarSiteList.classList.remove('show_10');
      similarSiteList.classList.add('show_20');

      if (siteCount < 21) {
        document.querySelector('.show_more_sites').remove();

        _categoryLink.classList.add('show');
      }
    } else if (siteCount > 20 && similarSiteList.classList.contains('show_20')) {
      similarSiteList.classList.remove('show_20');
      similarSiteList.classList.add('show_30');

      if (siteCount < 31) {
        document.querySelector('.show_more_sites').remove();

        _categoryLink.classList.add('show');
      }
    } else if (siteCount > 30 && similarSiteList.classList.contains('show_30')) {
      similarSiteList.classList.remove('show_30');
      similarSiteList.classList.add('show_40');

      if (siteCount < 41) {
        document.querySelector('.show_more_sites').remove();

        _categoryLink.classList.add('show');
      }
    } else if (siteCount > 40 && similarSiteList.classList.contains('show_40')) {
      similarSiteList.classList.remove('show_40');
      similarSiteList.classList.add('show_60');

      if (siteCount < 51) {
        document.querySelector('.show_more_sites').remove();

        _categoryLink.classList.add('show');
      }
    }
  }
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
    var similarSiteCount = homeData.categories[category].sites.length;
    var msStart = 0;
    var msEnd = 6;

    if (index > 3) {
      msStart = index - 3;
      msEnd = index + 3;

      if (msEnd > similarSiteCount) {
        msEnd = similarSiteCount;
      }
    } else {
      msEnd = similarSiteCount;
    }

    for (var i = msStart; i < msEnd; i++) {
      var moreSite = homeData.categories[category].sites[i];

      if (moreSiteCount < 6 && moreSite.id != siteId) {
        var moreSiteLogo = moreSite.logo ? moreSite.logo.src : '';
        moreSites += '<div class="list__box_more_item" list-box-more-js  data-id="' + moreSite.id + '" data-count="1" >' + '<a class="list__box_more_thumb" href="' + moreSite.link + '" style="background-image: url(' + moreSite.banner_image + ')"></a>' + '</div>';
        moreSiteCount++;
      }
    }

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
    document.querySelector('.list__specification .list__specification-read.nav_link').setAttribute('href', siteLink); //document.querySelector('.site_banner_more_sites').innerHTML = moreSites;

    document.querySelectorAll('.site_banner_more_sites').forEach(function (moreSiteDiv, index) {
      moreSiteDiv.innerHTML = moreSites;
    });

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

    categorySites += '<div class="swiper-slide" data-index="' + index + '" data-siteid="' + site.id + '" data-init="0">' + '<div class="list__box" list-box-js  data-id="' + site.id + '">' + '<a class="site--link review-site-link" data-id="' + site.id + '" href="' + site.link + '" hreflang="' + currentLang + '">' + '<img class="list__box__thumb" src="' + site.banner_image + '"/>' + '<p class="list__box--title">' + site.name + '</p>' + '<p class="list__box--tagline">' + site.tagline + '</p>' + '</a>' + '</div>' + '</div>';
  });
  var categoryTagLine = categoryData.tagline;

  if (categoryTagLine != '') {
    categoryTagLine = categoryTagLine.replaceAll("\'", "'");
    categoryTagLine = categoryTagLine.replaceAll("\\'", "'");
  }

  var categoryBoxHtml = '<div class="list__box-wrapper" list-parent-js data-name="category_' + categoryId + '" data-index="' + categoryIndex + '">' + '<div id="category_wrapper_' + categoryId + '" class="list__box-wrapper-handle"></div>' + '<div class="list__box-head">' + '<img className="list__info-circle" src="' + categoryLogo + '" alt=""/>' + '<div class="list__info--title category_title">' + '<a class="list__info--title_a" href="' + categoryData.link + '" hreflang="' + currentLang + '">' + categoryData.title + '</a>' + '<span class="list__info--title_span">' + categoryTagLine + '</span>' + '</div>' + '<a class="list__btn nav_link" href="' + categoryData.link + '" hreflang="' + currentLang + '">' + _t('see', 'SEE') + '&nbsp;<span>' + categoryData.count + ' ' + _t('more', 'MORE') + '</span><i class="icon-font icon-arrow-angle"></i></a>' + '</div>' + '<div class="list__box-line">' + '<u list-line-ind-js></u><span class="list_green_line" list-line-js></span>' + '</div>' + '<div class="list__box-body">' + '<div class="list__arrow-wrapper">' + '<a class="list__arrow list__arrow--prev" >' + '<div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>' + '</a>' + '<a class="list__arrow list__arrow--next" >' + '<div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>' + '</a>' + '</div>' + '<div class=.swiper listSwiper" data-id="listSlider_' + categoryData.id + '" data-category="18">' + '<div class="swiper-wrapper' + (parseInt(categoryData.count) < 6 ? ' short_list' : '') + '" data-category="' + categoryData.id + '" data-count="' + categoryData.count + '" data-slidecount="' + categoryData.site_limit + '">' + categorySites + '</div>' + '</div>' + '</div>' + '<div class="list__specification-wrapper"></div>' + '</div>';
  return categoryBoxHtml;
}

function renderAllOtherCategories() {
  if (navigator.userAgent.toLowerCase().includes('lighthouse')) {
    return;
  }

  for (var i = 0; i < homeData.categories_count; i++) {
    var catId = homeData.categories_indexes[i];
    renderMissingSlides(catId); // generateSwiper(catId);
  } // boxHover();

}

function renderMissingSlides(catId) {
  if (homeData.categories[catId]) {
    var categoryWrapper = swiperWrappers[catId];
    var missingSlidesHtml = '';
    console.log('rendering missing slides');
    homeData.categories[catId].sites.map(function (site, index) {
      if (!categoryWrapper.querySelector('.swiper-slide[data-siteid="' + site.id + '"]')) {
        var siteSlide = '<div class="swiper-slide" data-index="' + index + '" data-siteid="' + site.id + '" data-init="0">' + '<div class="list__box" list-box-js  data-id="' + site.id + '">' + '<a class="site--link" href="' + site.link + '" hreflang="' + currentLang + '">' + '<img class="list__box__thumb" src="' + site.banner_image + '"/>' + '<p class="list__box--title">' + site.name + '</p>' + '<p class="list__box--tagline">' + site.tagline + '</p>' + '</a>' + '</div>' + '</div>';
        missingSlidesHtml += siteSlide;
      }
    });
    categoryWrapper.insertAdjacentHTML('beforeend', missingSlidesHtml);
  }
}

function generateSwiper(catId) {
  var swiperArrows = '<div class="list__arrow-wrapper">' + '                                    <a class="list__arrow list__arrow--prev" href="#">' + '                                        <div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>' + '                                    </a>' + '                                    <a class="list__arrow list__arrow--next" href="#">' + '                                        <div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>' + '                                    </a>' + '                                </div>';
  var swiperBody = document.querySelector('.list__box-body[data-id="listSlider_' + catId + '"]');

  if (swiperBody) {
    swiperBody.insertAdjacentHTML('afterbegin', swiperArrows);
  }

  swiperCB(".swiper[data-id=\"listSlider_".concat(catId, "\"]"), ".list__box-wrapper[data-name='category_".concat(catId, "']"));
  /*if(!categoryWrapper.querySelector('.list__specification-wrapper')){
  	categoryWrapper.insertAdjacentHTML('beforeend', '<div class="list__specification-wrapper"></div>');
  }*/
}

function initHomeSwippers() {
  if (navigator.userAgent.toLowerCase().includes('lighthouse')) {
    return;
  }

  var visibleSlides = 3;
  var greenBarWidth = 74;
  _greenBarDW = 10;

  if (wInnerWidth < 1279) {
    swiperSlideWidth = 100;
  } else if (wInnerWidth <= 1024) {
    swiperSlideWidth = 150;
    greenBarWidth = 74;
  } else if (wInnerWidth < 768) {
    swiperSlideWidth = 195;
    greenBarWidth = 48;
  }

  if (wInnerWidth < 768) {
    _greenBarDW = 18;
  } else if (wInnerWidth <= 1024) {
    _greenBarDW = 30;
  }

  maxLeft = (visibleSlides - 1) * (swiperSlideWidth + 6) + (swiperSlideWidth - greenBarWidth) / 2 + 12;
  minLeft = swiperSlideWidth / 2 - (swiperSlideWidth - greenBarWidth) / 2;
  swiperClientWidth = document.querySelector('.listSwiper').clientWidth;
  swiperClientHeight = document.querySelector('.listSwiper').clientHeight;
  listBoxWrappers = [];

  var _listBoxWrappers = document.querySelectorAll('.list__box-wrapper');

  if (_listBoxWrappers) {
    _listBoxWrappers.forEach(function (wrapper, wrapperIndex) {
      var catId = wrapper.dataset.category;
      listBoxWrappers[catId] = wrapper;
      generateSwiper(catId);
    });
  }

  swiperWrappers = [];

  var _sWrappers = document.querySelectorAll('.swiper-wrapper');

  _sWrappers.forEach(function (sw) {
    swiperWrappers[sw.dataset.category] = sw;
  });
}

var tOut = null,
    hoverBool = false;
var previousHoverBox = null;
var delayPreview = false;
var previewModal = document.querySelector('#previewModal');
var previewModalInner = previewModal.querySelector('.previewModal--inner');
var prevContainer = previewModal.querySelector('.previewModal--container');

var boxHover = function boxHover() {
  var swiperSlides = document.querySelectorAll('.swiper-slide'),
      parentSlides = document.querySelectorAll('[list-parent-js]'),
      listBoxBody = document.querySelectorAll('.list__box-body');

  if (document.body.classList.contains('home')) {
    for (var i = 0, len = swiperSlides.length; i < len; i++) {
      if (isMobileOrTablet) {
        swiperSlides[i].removeEventListener('touchend', onSlideTouchEnd);
        swiperSlides[i].addEventListener('touchend', onSlideTouchEnd, false);
        swiperSlides[i].removeEventListener('touchstart', onSlideTouchStart);
        swiperSlides[i].addEventListener('touchstart', onSlideTouchStart, {
          passive: true
        }); //swiperSlides[i].removeEventListener('touchmove', onSlideTouchMove);
        //swiperSlides[i].addEventListener('touchmove', onSlideTouchMove, false);
      } else {
        swiperSlides[i].removeEventListener('mouseleave', onSlideLeave);
        swiperSlides[i].addEventListener('mouseleave', onSlideLeave, false);
        swiperSlides[i].removeEventListener('mouseenter', onSlideEnter);
        swiperSlides[i].addEventListener('mouseenter', onSlideEnter, false);
      }

      swiperSlides[i].setAttribute('data-init', '1');
    }
  }

  if (!isMobileOrTablet) {
    for (var _i4 = 0, _len2 = parentSlides.length; _i4 < _len2; _i4++) {
      parentSlides[_i4].removeEventListener('mouseleave', onParentSideLeave);

      parentSlides[_i4].addEventListener('mouseleave', onParentSideLeave, false);
    }
  }

  if (previewModal) {
    var previewContainer = previewModal.querySelector('.previewModal--container');

    if (previewContainer) {
      previewContainer.addEventListener('mouseleave', onPreviewLeave, false);
    }
  }
};

function onSlideLeave(ev) {
  if (window.innerWidth >= 1280) {
    var el = ev.currentTarget,
        elParent = el.closest('[list-parent-js]'),
        slideSwiper = elParent.querySelector('.swiper'),
        slideIndex = el.dataset.index;
    var greenBar = elParent.querySelector('[list-line-js]'); //clearTimeout(tOut);

    el.classList.remove('is-hover'); //previewModal.classList.remove('slide-open');

    el.classList.remove('last-box');
    elParent.classList.remove('last-box-selected');

    if (lastActiveHoverBox) {
      var activeSlide = 0;

      if (slideSwiper) {
        activeSlide = slideSwiper.swiper.activeIndex;
      }

      var hoverBoxPosition = slideIndex - activeSlide;
      var hoverBoxLeft = 188 * hoverBoxPosition + 64;

      if (hoverBoxPosition > 0) {//hoverBoxLeft-=10;
      } //let transformVal = 'left: '+hoverBoxLeft+'px';


      var transformVal = 'transform: translateX(' + hoverBoxLeft + 'px)';

      if (greenBar) {
        greenBar.setAttribute('style', transformVal + ';width: 64px');
      }
    }
  }
}

function onSlideEnter(ev) {
  if (pauseHoverAnimation) {
    return;
  }

  var zoomLevel = Math.round(window.devicePixelRatio * 100);
  var minScreenWidth = 1280;

  if (zoomLevel > 100) {
    minScreenWidth = minScreenWidth / zoomLevel * 100;
  }

  if (window.innerWidth >= minScreenWidth) {
    var el = ev.currentTarget,
        elParent = el.closest('[list-parent-js]'),
        elBox = el.querySelector('.list__box'),
        lineInd = elParent.querySelector('[list-line-js]'),
        slideSwiper = elParent.querySelector('.swiper'),
        siteLink = el.querySelector('.site--link'),
        siteTitle = el.querySelector('.list__box--title'),
        tagLine = el.querySelector('.list__box--tagline');

    if (!siteLink) {
      return;
    }

    if (siteTitle) {
      siteTitle = siteTitle.innerHTML;
    }

    if (tagLine) {
      tagLine = tagLine.innerHTML;
    }

    if (!slideSwiper.swiper) {
      return;
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

    var siteRating = el.dataset.rating;
    var _siteId = el.dataset.siteid;
    var _siteUrl = siteLink.href;
    var swiperParent = el.parentNode;
    var slideIndex = el.dataset.index;
    var slideCategory = swiperParent.dataset.category;
    var slideHoverContent = renderSiteHoverContent(slideCategory, slideIndex, _siteId, _siteUrl, siteTitle, tagLine, siteRating);
    slideHoverContent += '<button class="list__box-more" type="button" data-id="' + _siteId + '"><i class="icon-font icon-arrow-angle"></i></button>';
    previewModalInner.innerHTML = slideHoverContent;

    if (delayPreview) {
      setTimeout(function () {
        generatePreviewModal(elBox);
      }, 600);
    } else {
      generatePreviewModal(elBox);
    }

    previousHoverBox = el;
  }

  markFavourites();
  markLikesDislikes();
}

function generatePreviewModal(slideBox) {
  if (previewModal && slideBox) {
    var _siteId = slideBox.dataset.id;
    previewModal.dataset.siteId = _siteId;
    var slideThumb = slideBox.querySelector('img.list__box__thumb');

    if (slideThumb) {
      var boxBounds = slideBox.getBoundingClientRect();
      var boxW = boxBounds.width;
      var boxH = boxBounds.height;
      var boxX = boxBounds.x + boxW / 2;
      var boxY = boxBounds.y + boxH / 2 + window.scrollY;
      var modalY = boxBounds.y; //let slideHoverContent = renderSiteHoverContent(slideCategory, slideIndex, _siteId, _siteUrl, siteTitle, tagLine, siteRating);

      var slideThumbSrc = slideThumb.src; //previewModal.querySelector('.previewModal--banner').src = slideThumbSrc;

      previewModal.querySelector('.previewModal--inner').style.backgroundImage = 'url(' + slideThumbSrc + ')';

      if (boxX < 175) {
        boxX = boxBounds.x;
        previewModalInner.classList.add('left');
      } else if (window.innerWidth - boxX < 210) {
        boxX = boxBounds.x + boxW;
        previewModalInner.classList.add('right');
      } else {
        previewModalInner.classList.remove('left');
        previewModalInner.classList.remove('right');
      }

      if (prevContainer) {
        // prevContainer.style.width = boxW+'px';
        // prevContainer.style.height = boxH+'px';
        prevContainer.style.width = 1 + 'px';
        prevContainer.style.height = 1 + 'px';
        prevContainer.style.left = boxX + 'px';
        prevContainer.style.top = boxY + 'px'; //setting preview container position

        siteModal.classList.add('prev_state');
        siteModal.style.left = boxX - 175 + 'px';
        siteModal.style.top = modalY + 'px';
        siteModal.classList.add('scaled');
        modalStartX = boxX - 175 + 'px';
        modalStartY = modalY + 'px';
        document.documentElement.style.setProperty('--msx', "".concat(boxX - 175, "px"));
        document.documentElement.style.setProperty('--msy', "".concat(modalY, "px"));
        document.documentElement.style.setProperty('--mcx', "".concat(boxX - 92.5, "px"));
        document.documentElement.style.setProperty('--mcy', "".concat(modalY, "px"));
      }

      previewModal.classList.add('slide-open');
    }
  }
}

function onPreviewLeave() {
  previewModal.classList.remove('slide-open');
}

function onSwiperWrapperDragStart(ev) {
  var el = ev.currentTarget,
      slideIndex = el.dataset.index,
      swiperWrapper = el.parentNode,
      slideSwiper = swiperWrapper.parentNode;
  console.log('Drag start');
}

function onSwiperWrapperDragEnd(ev) {
  var el = ev.currentTarget,
      slideIndex = el.dataset.index,
      swiperWrapper = el.parentNode,
      slideSwiper = swiperWrapper.parentNode;
  console.log('Drag ended');
}

function onSlideTouchStart(ev) {
  var el = ev.currentTarget,
      slideIndex = el.dataset.index,
      swiperWrapper = _lastSwiperWrapper = el.parentNode,
      slideSwiper = _lastSlideSwiper = swiperWrapper.parentNode; //_lastGreenBar.classList.remove('no_anim');

  var slideCategory = swiperWrapper.dataset.category;
  var elParent = listBoxWrappers[slideCategory];
  var greenBar = elParent.querySelector('[list-line-js]');
  isMouseDown = true;
  _touchStartPosition = ev.touches[0].pageX;

  if (greenBar) {
    _lastGreenBar = greenBar;
  }

  lastActiveHoverBox = el;
  var activeSlide = 0;

  if (slideSwiper) {
    activeSlide = slideSwiper.swiper.activeIndex;
  }

  var hoverBoxPosition = slideIndex - activeSlide;
  var slideWidth = 188,
      slideOffset = 178,
      greenBarWidth = 74;

  if (wInnerWidth < 768) {
    slideWidth = 100 + 6;
    greenBarWidth = 48;
  } else if (wInnerWidth < 1024) {
    slideWidth = 150 + 6;
    greenBarWidth = 74;
  } else {
    slideWidth = 185 + 6;
  }

  slideOffset = (slideWidth - greenBarWidth) / 2;
  var hoverBoxLeft = slideWidth * hoverBoxPosition + slideOffset; //let barLeft = getGreenBarTranslateX(greenBar);

  _greenBarAnimSpeed = 0;
  _greenBarLeft = hoverBoxLeft;

  if (_greenBarLeft < 0) {
    _greenBarLeft = 0;
  } else if (_greenBarLeft > maxLeft) {
    _greenBarLeft = maxLeft;
  }

  _greenBarWidth = greenBarWidth; //greenBar.style['transition-duration'] = _greenBarAnimSpeed;
  //greenBar.style.width = greenBarWidth+'px';

  if (!isAnimationStarted) {
    isAnimationStarted = true; //requestAnimationFrame(animateGreenBar);
  }

  _lastGreenBarTransformX = _greenBarLeft;
  greenBar.setAttribute('style', 'transform: translateX(' + _greenBarLeft + 'px); width: ' + greenBarWidth + 'px');
}

function onSlideTouchMove(ev) {
  var el = ev.currentTarget,
      elParent = el.closest('[list-parent-js]'),
      slideIndex = el.dataset.index,
      slideSwiper = elParent.querySelector('.swiper'),
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
  var slideWidth = 188,
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
      slideIndex = el.dataset.index,
      swiperWrapper = el.parentNode,
      slideSwiper = swiperWrapper.parentNode;
  var slideCategory = swiperWrapper.dataset.category;
  var elParent = listBoxWrappers[slideCategory];
  var greenBar = elParent.querySelector('[list-line-js]');
  var activeSlide = 0;

  if (slideSwiper) {
    activeSlide = slideSwiper.swiper.activeIndex;
  }

  var hoverBoxPosition = slideIndex - activeSlide;
  var slideWidth = 188,
      slideOffset = 178;
  greenBarWidth = 64;

  if (wInnerWidth < 768) {
    slideWidth = 100 + 6;
    greenBarWidth = 19;
  } else if (wInnerWidth < 1024) {
    slideWidth = 150 + 6;
    greenBarWidth = 34;
  } else {
    slideWidth = 185 + 6;
  }

  slideOffset = (slideWidth - greenBarWidth) / 2;
  greenBar.classList.remove('no_anim');
  var hoverBoxLeft = slideWidth * hoverBoxPosition + slideOffset;
  _greenBarLeft = hoverBoxLeft;
  greenBar.setAttribute('style', 'transform: translateX(' + _greenBarLeft + 'px); width: ' + greenBarWidth + 'px');
}

function onSwiperTranslate(e, translate) {
  if (!isMobileOrTablet) {
    return;
  }

  if (typeof lastActiveHoverBox === "undefined") {
    return;
  } //_lastGreenBar.classList.add('no_anim');


  var el = lastActiveHoverBox,
      elParent = el.closest('[list-parent-js]'),
      slideIndex = el.dataset.index,
      slideSwiper = elParent.querySelector('.swiper'),
      greenBar = elParent.querySelector('[list-line-js]');
  var matrix = new WebKitCSSMatrix(_lastGreenBar.webkitTransform);
  var _transformX = matrix.m41;
  _greenBarLeft = _lastGreenBarTransformX + translate - _lastGreenBarTranslate;

  if (_greenBarLeft < minLeft) {
    _greenBarLeft = minLeft;
  } else if (_greenBarLeft > maxLeft) {
    _greenBarLeft = maxLeft;
  }

  greenBar.setAttribute('style', 'transform: translateX(' + (_greenBarLeft + _greenBarDW) + 'px); width: ' + greenBarWidth + 'px');
  /*if(!_isGreenBarMoving){
  	_isGreenBarMoving = true;
  }
  
  let translateDiff = lastTranslate - translate;
  translateDiff = +translateDiff;
  	let deltaTranslate = translateDiff;
  	if(translateDiff<0){
  	translateDiff = -translateDiff;
  }
  let isLargeJump = false;
  if(translateDiff>15){
  	isLargeJump = true;
  }
  lastTranslate = translate;
  
  let slideWidth = 236,
  	slideOffset = 178,
  	greenBarWidth = 34,
  	hoverBoxLeft = parseInt(greenBar.style.transform.replace("translateX(", ""));
  	let sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');
  if(sliderBox){
  	slideWidth = 	sliderBox.offsetWidth + 6;
  }
  	if(window.innerWidth<768){
  	greenBarWidth = 20;
  }else if(window.innerWidth<1024){
  	greenBarWidth = 34;
  }
  	if(greenBar){
  		slideOffset = (slideWidth - greenBarWidth)/2;
  
  	let barLeft = getGreenBarTranslateX(greenBar);
  
  		//hoverBoxLeft = barLeft-deltaTranslate;
  		hoverBoxLeft = ((slideIndex*slideWidth) + translate)+slideOffset-12;
  		if(hoverBoxLeft < minLeft){
  		hoverBoxLeft = minLeft;
  	}
  		if(hoverBoxLeft > maxLeft){
  		hoverBoxLeft = maxLeft;
  	}
  		if(isLargeJump){
  		//console.log('large jump '+translate);
  		_greenBarDuration = 500;
  		_isGreenBarMoving = false;
  			if(barLeft<0){
  			barLeft = 0;
  		}
  		if(hoverBoxLeft<0){
  			hoverBoxLeft = minLeft;
  		}
  			if(_greenBarTimer){
  			clearInterval(_greenBarTimer);
  		}
  			moveGreenBar(barLeft, hoverBoxLeft+12);
  			//_greenBarLeft = hoverBoxLeft;
  	}else{
  		if(_greenBarTimer){
  			clearInterval(_greenBarTimer);
  		}
  		_greenBarLeft = hoverBoxLeft;
  		if(_greenBarLeft<0){
  			_greenBarLeft = minLeft;
  		}else if(_greenBarLeft>maxLeft){
  			_greenBarLeft = maxLeft;
  		}
  	}
  	}*/
}

function tempRepositionGreenBar(elParent, hoverBoxPosition, isSmall) {
  var greenBar = elParent.querySelector('[list-line-js]');
  var activeBox = elParent.querySelector('.swiper-slide.is-hover');
  var slideSwiper = elParent.querySelector('.swiper');
  var slideWidth = 0;
  var sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');

  if (sliderBox) {
    slideWidth = sliderBox.offsetWidth + 6;
  }

  if (isSmall) {
    return;
  }

  if (activeBox) {
    if (activeBox) {
      lastActiveHoverBox = activeBox;
    }

    var hoverBoxLeft = 0;

    if (greenBar) {
      hoverBoxLeft = 188 * hoverBoxPosition;

      if (window.innerWidth < 1449 && hoverBoxPosition == 4) {
        hoverBoxLeft -= 55;
      }

      var transformVal = 'transform: translateX(' + hoverBoxLeft + 'px);';

      if (isSmall) {
        var activeSlide = 0;

        if (slideSwiper) {
          activeSlide = slideSwiper.swiper.activeIndex;
        }

        console.log('active index ' + activeSlide);
        greenBar.setAttribute('style', transformVal + ';width: 64px');
      } else {
        greenBar.setAttribute('style', transformVal + ';width: 190px');
      }
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
      elParent = __ev.currentTarget.closest('[list-parent-js]'),
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

function showBanner(siteId) {
  var isSkip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  videoPaused = true;
  var siteBox = document.querySelector('.swiper-slide[data-siteid="' + siteId + '"]');

  if (!siteBox) {
    return;
  }

  var swiperSlide = siteBox;
  var slideIndex = swiperSlide.dataset.index;
  var swiperWrapper = siteBox.closest('.swiper-wrapper');
  var slideCategory = swiperWrapper.dataset.category;

  if (currentBannerSection && !isSkip) {
    currentBannerSection.remove();
  }

  if (isSkip) {
    currentBannerSection.classList.add('skip');
    renderSkipSiteBottomBanner(slideCategory, slideIndex);
    setTimeout(function () {
      currentBannerSection.classList.remove('skip');
    }, 300);
  } else {
    var bottomBanner = renderSiteBottomBanner(slideCategory, slideIndex);

    if (bottomBanner) {
      siteModal.innerHTML = bottomBanner;
      currentBannerSection = document.querySelector('.list__specification');
      console.log('opening modal');
      openSlideModal(target, siteId);
      initSimilarSiteEvents();
    }
  }

  var _specificationBox = document.querySelector('.list__specification');

  var _isActive = document.querySelector('.list__box.is-active');

  if (_isActive) {
    _isActive.classList.remove('is-active');
  }

  var _isOpen = document.querySelector('.list__specification.is-open');

  if (_isOpen && !isSkip) {
    _isOpen.classList.remove('is-open');

    document.body.classList.remove('is_open');
  }

  if (wInnerWidth < 768) {
    setTimeout(function () {
      //_boxParent.classList.add('is-active');

      /*let __vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${__vh}px`);*/
      if (_specificationBox) {
        _specificationBox.classList.add('is-open');
      }
    }, 100);

    if (currentBannerSection) {
      setTimeout(function () {
        currentBannerSection.classList.remove('skip');
      }, 350);
    }
  } else {
    //_boxParent.classList.add('is-active');
    if (_specificationBox) {
      _specificationBox.classList.add('is-open'); //document.body.classList.add('is_open');

    }
  }

  markFavourites();
  markLikesDislikes();
}

function onModalContainerScroll(e) {
  var popupSpecInner = document.querySelector('.list__specification__inner');
  var mC = document.querySelector('.modal-container');

  if (popupSpecInner) {
    var videoY = popupSpecInner.getBoundingClientRect().height + 150;
    var vidPlayer = document.querySelector('[video-js]');

    if (mC.scrollTop > videoY) {
      if (vidPlayer) {
        vidPlayer.pause();
      }
    } else {
      if (!videoPaused && vidPlayer.paused) {
        vidPlayer.play();
      }
    }
  }
}

function initSimilarSiteEvents() {
  var mC = document.querySelector('.modal-container');

  if (mC) {
    mC.removeEventListener('scroll', onModalContainerScroll);
    mC.addEventListener('scroll', onModalContainerScroll);
  }

  document.querySelectorAll(".similar_site_item").forEach(function (linkTo) {
    linkTo.addEventListener('mouseenter', function (ev) {
      var el = ev.currentTarget;
      var oldSSIH = document.querySelector('.similar_site_item.hover');

      if (oldSSIH) {
        oldSSIH.classList.remove('hover');
      }

      el.classList.add('hover');
    }, false);
  });
  document.querySelectorAll(".similar_site_item.has_video").forEach(function (linkTo) {
    linkTo.addEventListener('mouseenter', function (ev) {
      var oldSimilarSiteVideo = document.querySelector('.similar_site_video_item');

      if (oldSimilarSiteVideo) {
        oldSimilarSiteVideo.remove();
      }

      var el = ev.currentTarget;
      var siteVideoUrl = el.dataset.video;
      var siteVideoPoster = el.dataset.poster;
      var siteVideoContainer = el.querySelector('.similar_site_item_thumb');

      if (siteVideoContainer) {
        var similarSiteVideo = '<video class="similar_site_video_item" preload="none" autoplay loop playsinline muted poster="' + siteVideoPoster + '" video-js>' + '<source src="' + siteVideoUrl + '" type="video/mp4">' + '</video>';
        siteVideoContainer.insertAdjacentHTML('beforeend', similarSiteVideo);
      }
    }, false);
    linkTo.addEventListener('mouseleave', function (ev) {
      var oldSimilarSiteVideo = document.querySelector('.similar_site_video_item');

      if (oldSimilarSiteVideo) {
        oldSimilarSiteVideo.remove();
      }
    }, false);
  });
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
  //el.classList.toggle('is-active');
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