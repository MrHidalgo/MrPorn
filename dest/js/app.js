"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var AdBlockDetector = /*#__PURE__*/function () {
  function AdBlockDetector() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AdBlockDetector);

    this.testUrl = options.testUrl || 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    this.timeout = options.timeout || 1500;

    this.onDetected = options.onDetected || function () {
      console.warn('AdBlocker detected');
    };

    this.onNotDetected = options.onNotDetected || function () {
      console.log('No AdBlocker detected');
    };

    this.onClose = options.onClose || function () {
      console.warn('AdBlocker closed');
    };
  }

  _createClass(AdBlockDetector, [{
    key: "createNotice",
    value: function createNotice() {
      var _this = this;

      var el = document.createElement('div');
      el.id = 'adblock-notice';
      el.className = 'adblock-notice';
      el.innerHTML = "<span><b>Ad blocker detected!</b> Some features and links may not load or function correctly while it's enabled. Switch it off for the best experience.</span><button class=\"adblock-notice-close\"><svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0.51 0.51 22.99 22.99\" width=\"16px\" height=\"16px\" fill=\"#ffffff\">\n" + "<path d=\"M23.1294 21.4152L2.58488 0.870773C2.10409 0.38998 1.33062 0.383984 0.85722 0.85738C0.383824 1.33078 0.38982 2.10425 0.870613 2.58504L21.4151 23.1295C21.8959 23.6103 22.6694 23.6163 23.1428 23.1429C23.6161 22.6695 23.6101 21.896 23.1294 21.4152Z\"></path>\n" + "<path d=\"M21.415 0.870638L0.870529 21.4151C0.389736 21.8959 0.38374 22.6694 0.857136 23.1428C1.33053 23.6162 2.10401 23.6102 2.5848 23.1294L23.1293 2.58491C23.6101 2.10412 23.6161 1.33064 23.1427 0.857245C22.6693 0.383849 21.8958 0.389845 21.415 0.870638Z\"></path>\n" + "</svg></button>";
      document.body.prepend(el);
      var closeButton = el.querySelector('.adblock-notice-close');
      closeButton.addEventListener('click', function () {
        _this.onClose();

        el.remove();
      });
    }
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      var xhr = new XMLHttpRequest();
      xhr.open('HEAD', this.testUrl, true);
      xhr.timeout = this.timeout;

      xhr.onload = function () {
        // If we get here, the resource was likely loaded successfully.
        _this2.onNotDetected();
      };

      xhr.onerror = function () {
        // If there's an error, it's probably blocked
        _this2.onDetected();

        _this2.createNotice();
      };

      xhr.ontimeout = function () {
        // Timeout is also likely due to blocking
        _this2.onDetected();
      };

      try {
        xhr.send();
      } catch (e) {
        this.onDetected();
      }
    }
  }]);

  return AdBlockDetector;
}();

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

var A2ZPopup = /*#__PURE__*/function () {
  function A2ZPopup(data) {
    var _document$querySelect;

    _classCallCheck(this, A2ZPopup);

    this.data = data.categories;
    this.popular = data.popular;
    this.currentLetter = '';
    this.letters = [];
    this.categories = [];
    this.filteredCategories = [];
    this.selectedCategoryLink = '';
    this.headerViewActions = document.querySelector('.header__view-actions');
    this.a2zContainer = document.querySelector('#a2z-modal .micromodal-container');
    this.processA2ZData(); // this.init();

    var parent = this;
    (_document$querySelect = document.querySelector('.sort__toggle')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener('click', function () {
      var _document$querySelect2;

      // document.querySelector('.search__close')?.click()
      (_document$querySelect2 = document.querySelector('[search-mobile-js]')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.classList.remove("is-open");
      parent.showA2ZPopup();
    }); // this.popup = document.querySelector('.a2z-popup');
    // this.popupClose = document.querySelector('.a2z-popup__close');
    // this.popupOpen = document.querySelector('.a2z-popup__open');
    //
    // this.popupOpen.addEventListener('click', this.openPopup.bind(this));
    // this.popupClose.addEventListener('click', this.closePopup.bind(this));
  }

  _createClass(A2ZPopup, [{
    key: "showA2ZPopup",
    value: function showA2ZPopup() {
      var parent = this;

      if (!document.querySelector("#a2z-modal")) {
        var modalHTML = this.generateA2ZPopupContent();
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.addA2ZPopupListeners();
        this.initCategoryEvents();
      }

      if (isMobileOrTablet) {
        var _document$querySelect3;

        var a2zModal = document.querySelector('#a2z-modal');
        a2zModal === null || a2zModal === void 0 ? void 0 : a2zModal.classList.add('is-open');

        if (parent.headerViewActions) {
          bodyScrollLock.enableBodyScroll(parent.headerViewActions);
        }

        if (parent.a2zContainer) {
          bodyScrollLock.disableBodyScroll(parent.a2zContainer);
        }

        (_document$querySelect3 = document.querySelector('#a2z-modal .micromodal-close')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.addEventListener('click', function (evt) {
          a2zModal.classList.remove('is-open');

          if (parent.a2zContainer) {
            bodyScrollLock.enableBodyScroll(parent.a2zContainer);
          }

          document.documentElement.classList.remove('is-hideScroll');
          document.body.classList.remove('is-hideScroll');
        });
      } else {
        MicroModal.show('a2z-modal', {
          onShow: function onShow() {
            if (parent.headerViewActions) {
              bodyScrollLock.enableBodyScroll(parent.headerViewActions);
            }

            if (parent.a2zContainer) {
              bodyScrollLock.disableBodyScroll(parent.a2zContainer);
            }

            document.body.classList.add('is-hideScroll');
            var filterInput = document.querySelector('#filter_tag_input');
            filterInput === null || filterInput === void 0 ? void 0 : filterInput.setAttribute('tabindex', '-1');
            filterInput === null || filterInput === void 0 ? void 0 : filterInput.blur();
          },
          onClose: function onClose() {
            document.querySelector('#a2z-modal').remove();
            document.documentElement.classList.remove('is-hideScroll');
            document.body.classList.remove('is-hideScroll');

            if (parent.a2zContainer) {
              bodyScrollLock.disableBodyScroll(parent.a2zContainer);
            }
          }
        });
      }
    }
  }, {
    key: "addA2ZPopupListeners",
    value: function addA2ZPopupListeners() {
      var _document$querySelect4;

      var parent = this;
      (_document$querySelect4 = document.querySelector('#filter_tag_input')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.addEventListener('input', debounce(function (evt) {
        var filter = evt.target.value.toLowerCase().trim();

        if (filter == '') {
          if (parent.currentLetter === '') {
            parent.updateCategories(parent.categories, true);
          } else if (parent.currentLetter === 'popular') {
            parent.updateCategories(parent.popular, true);
          } else {
            parent.updateCategories(parent.data[parent.currentLetter], true);
          }

          return;
        } // parent.filteredCategories = parent.filterCategories(filter);


        parent.filteredCategories = parent.searchCategories(filter);
        parent.updateCategories(parent.filteredCategories);
      }));
      document.querySelectorAll('.a2z-letter-item').forEach(function (letter) {
        letter.addEventListener('click', function (evt) {
          var _document$querySelect5;

          parent.currentLetter = evt.target.dataset.letter;
          (_document$querySelect5 = document.querySelector('.a2z-letter-item.active')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.classList.remove('active');
          evt.target.classList.add('active');

          if (parent.currentLetter === '') {
            parent.updateCategories(parent.categories, true);
            return;
          } else if (parent.currentLetter === 'popular') {
            parent.updateCategories([], true);
          } else {
            parent.updateCategories(parent.data[parent.currentLetter]);
          }
        });
      });
      document.querySelector('.a2z-reset').addEventListener('click', function () {
        var _document$querySelect6, _document$querySelect7;

        (_document$querySelect6 = document.querySelector('.a2z-letter-item.active')) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.classList.remove('active');
        (_document$querySelect7 = document.querySelector('.a2z-letter-item.all')) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7.classList.add('active');
        document.querySelector('#filter_tag_input').value = '';
        parent.currentLetter = '';
        parent.updateCategories(parent.categories, true);
        parent.selectedCategoryLink = '';
      });
      document.querySelector('.a2z-apply').addEventListener('click', function (evt) {
        evt.target.disabled = true;

        if (parent.selectedCategoryLink === '') {
          MicroModal.close('a2z-modal');
          return;
        }

        window.location.href = parent.selectedCategoryLink;
      });
    }
  }, {
    key: "processA2ZData",
    value: function processA2ZData() {
      for (var key in this.data) {
        if (this.data.hasOwnProperty(key)) {
          this.letters.push(key);
          this.categories = this.categories.concat(this.data[key]);
          this.categories.sort();
        }
      }

      this.letters.sort();
    }
  }, {
    key: "searchCategories",
    value: function searchCategories(filter) {
      var filteredCategories = _toConsumableArray(this.categories);

      filteredCategories = filteredCategories.filter(function (item) {
        return item.title.toLowerCase().includes(filter.toLowerCase());
      });
      filteredCategories.forEach(function (item, index) {
        item.index = index;
      });
      var premiumItems = filteredCategories.filter(function (item) {
        return item.title.toLowerCase().includes("premium") && item.title.toLowerCase().includes(filter.toLowerCase());
      });
      var nonPremiumItems = filteredCategories.filter(function (item) {
        return !(item.title.toLowerCase().includes("premium") && item.title.toLowerCase().includes(filter.toLowerCase()));
      }); // Remove 'Premium' items

      nonPremiumItems = nonPremiumItems.sort(function (a, b) {
        return a.index - b.index;
      });
      filteredCategories = premiumItems.concat(nonPremiumItems);
      return filteredCategories;
    }
  }, {
    key: "filterCategories",
    value: function filterCategories(filter) {
      var filteredCategories = _toConsumableArray(this.categories);

      filteredCategories = filteredCategories.sort(function (a, b) {
        var titleA = a.title.toLowerCase();
        var titleB = b.title.toLowerCase();
        var posA = titleA.indexOf(filter);
        var posB = titleB.indexOf(filter); // Strings with the search term come first

        if (posA !== -1 && posB === -1) return -1;
        if (posA === -1 && posB !== -1) return 1; // If both contain the term, sort by position

        if (posA !== -1 && posB !== -1) return posA - posB; // Otherwise, keep the original order

        return a.order - b.order;
      });
      filteredCategories.forEach(function (item, index) {
        item.index = index;
      });
      var premiumItems = filteredCategories.filter(function (item) {
        return item.title.toLowerCase().includes("premium") && item.title.toLowerCase().includes(filter.toLowerCase());
      });
      var nonPremiumItems = filteredCategories.filter(function (item) {
        return !(item.title.toLowerCase().includes("premium") && item.title.toLowerCase().includes(filter.toLowerCase()));
      }); // Remove 'Premium' items

      nonPremiumItems = nonPremiumItems.sort(function (a, b) {
        return a.index - b.index;
      });
      filteredCategories = premiumItems.concat(nonPremiumItems);
      return filteredCategories;
    }
  }, {
    key: "generateA2ZPopupContent",
    value: function generateA2ZPopupContent() {
      var categoriesLink = '/categories/';

      if (currentLang != 'en') {
        categoriesLink = '/' + currentLang + '/categories/';
      }

      var popupContent = "\n\t\t  <div class=\"micromodal micromodal-slide\" id=\"a2z-modal\" aria-hidden=\"false\">\n\t\t\t  <div class=\"micromodal-overlay\" tabindex=\"-1\">\n\t\t\t\t<div class=\"micromodal-container custom-scrollbar\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"boogie-title\">\n\t\t\t\t  <div class=\"micromodal-content a2z-content\">\n\t\t\t\t\t  <div class=\"micromodal-header\">\n\t\t\t\t\t\t\t<div class=\"micromodal-title\" id=\"boogie-title\">\n\t\t\t\t\t\t\t\t<div class=\"micromodal-title-text\">A-Z Category List</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"a2z-header\">\n\t\t\t\t\t\t\t\t".concat(this.renderA2ZLetters(), "\n\n\t\t\t\t\t\t\t\t<div class=\"filter_tag\">\n\t\t\t\t\t\t\t\t\t<input placeholder=\"Type to search...\" type=\"text\" id=\"filter_tag_input\" autocomplete=\"off\"/>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t<div class=\"micromodal-close\" data-micromodal-close=\"\">\n\t\t\t\t\t\t\t\t<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0.51 0.51 22.99 22.99\" width=\"16px\" height=\"16px\">\n\t\t\t\t\t\t\t\t\t<path d=\"M23.1294 21.4152L2.58488 0.870773C2.10409 0.38998 1.33062 0.383984 0.85722 0.85738C0.383824 1.33078 0.38982 2.10425 0.870613 2.58504L21.4151 23.1295C21.8959 23.6103 22.6694 23.6163 23.1428 23.1429C23.6161 22.6695 23.6101 21.896 23.1294 21.4152Z\"></path>\n\t\t\t\t\t\t\t\t\t<path d=\"M21.415 0.870638L0.870529 21.4151C0.389736 21.8959 0.38374 22.6694 0.857136 23.1428C1.33053 23.6162 2.10401 23.6102 2.5848 23.1294L23.1293 2.58491C23.6101 2.10412 23.6161 1.33064 23.1427 0.857245C22.6693 0.383849 21.8958 0.389845 21.415 0.870638Z\"></path>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t  </div>\n\n\t\t\t\t\t  <div class=\"micromodal-body\">\n\t\t\t\t\t\t\t").concat(this.renderCategories(), "\n\t\t\t\t\t  </div>\n\t\t\t\t\t  <div class=\"micromodal-footer\">\n\t\t\t\t\t\t\t<a href=\"").concat(categoriesLink, "\" class=\"a2z-categories\">All Categories & Tags \u2197</a>\n\t\t\t\t\t\t\t<button class=\"btn btn-secondary a2z-reset\">Reset all</button>\n\t\t\t\t\t\t\t<button class=\"btn btn-success a2z-apply progress-button\">\n\t\t\t\t\t\t\t\t<span class=\"progress-spinner\"></span>\n\t\t\t\t\t\t\t\tApply\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t  </div>\n\t\t\t</div>\n\t\t");
      return popupContent;
    }
  }, {
    key: "renderA2ZLetters",
    value: function renderA2ZLetters() {
      var letters = this.letters.map(function (letter) {
        return "<li class=\"a2z-letter-item\" data-letter=\"".concat(letter, "\">").concat(letter, "</li>");
      });
      var a2ZLetterContent = "<ul class=\"a2z-letters-container\">\n\t\t\t<li class=\"a2z-letter-item popular\" data-letter=\"popular\">Popular</li>\n\t\t\t<li class=\"a2z-letter-item all\" data-letter=\"\">#</li>\n\t\t\t".concat(letters.join(''), "\n\t\t</ul>");
      return a2ZLetterContent;
    }
  }, {
    key: "renderPopular",
    value: function renderPopular() {
      var popular = this.popular.map(function (category) {
        return "<button class=\"a2z-btn a2z-category-item a2z-popular-item\" data-link=\"".concat(category.link, "\">").concat(category.title, "</button>");
      });
      return popular.join('');
    }
  }, {
    key: "renderCategories",
    value: function renderCategories() {
      var currentCategories = [];

      if (this.currentLetter === 'popular') {
        currentCategories = [];
      } else if (this.currentLetter !== '') {
        var _this$data$this$curre;

        currentCategories = (_this$data$this$curre = this.data[this.currentLetter]) !== null && _this$data$this$curre !== void 0 ? _this$data$this$curre : [];
      } else {
        currentCategories = this.categories;
      }

      var popular = [];

      if (this.currentLetter === 'popular' || this.currentLetter === '') {
        popular = this.popular.map(function (category) {
          return "<button class=\"a2z-btn a2z-category-item a2z-popular-item\" data-link=\"".concat(category.link, "\">").concat(category.title, "</button>");
        });
      }

      var categories = currentCategories.map(function (category) {
        return "<button class=\"a2z-btn a2z-category-item\" data-link=\"".concat(category.link, "\">").concat(category.title, "</button>");
      });
      var a2ZCategoryContent = "<div class=\"a2z-categories-container\">".concat(popular.join('')).concat(categories.join(''), "</div>");
      return a2ZCategoryContent;
    }
  }, {
    key: "updateCategories",
    value: function updateCategories(categories) {
      var isPopular = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var popular = [];

      if (isPopular) {
        popular = this.popular.map(function (category) {
          return "<button class=\"a2z-btn a2z-category-item a2z-popular-item\" data-link=\"".concat(category.link, "\">").concat(category.title, "</button>");
        });
      }

      var categoriesList = categories.map(function (category) {
        return "<button class=\"a2z-btn a2z-category-item\" data-link=\"".concat(category.link, "\">").concat(category.title, "</button>");
      });
      document.querySelector('.a2z-categories-container').innerHTML = popular.join('') + categoriesList.join('');
      this.initCategoryEvents();
    }
  }, {
    key: "initCategoryEvents",
    value: function initCategoryEvents() {
      var parent = this;
      document.querySelectorAll('.a2z-category-item').forEach(function (category) {
        category.addEventListener('click', function (evt) {
          var _document$querySelect8;

          (_document$querySelect8 = document.querySelector('.a2z-category-item.active')) === null || _document$querySelect8 === void 0 ? void 0 : _document$querySelect8.classList.remove('active');
          var cat = evt.target;
          cat.classList.toggle('active');

          if (cat.classList.contains('active')) {
            parent.selectedCategoryLink = cat.dataset.link;
          } else {
            parent.selectedCategoryLink = '';
          }
        });
      });
    }
  }]);

  return A2ZPopup;
}();

var initCategoriesPage = function initCategoriesPage() {
  document.querySelectorAll('.categories-tags-item').forEach(function (tagElement) {
    var tag = tagElement.dataset.tag;
    tagElement.addEventListener('click', function (evt) {
      if (tag) {
        var tagSection = document.querySelector('.tag-section.tag-' + tag);
        var headerOffset = isMobileOrTablet ? 120 : 0;
        var elementPosition = tagSection.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
  document.querySelectorAll('.tag-section-more').forEach(function (moreElement) {
    moreElement.addEventListener('click', function (evt) {
      var tagSection = evt.target.parentNode;

      if (tagSection) {
        tagSection.classList.add('show_all');
      }
    });
  });
};
/*
* Category page scripts
* */
// const {TheiaStickySidebar} = require("theia-sticky-sidebar");


function initCategoryPage() {
  var _getCookieMpgCookie, _getCookieMpgCookie2;

  var categorySidebar;
  var isMobile = isMobileOrTablet;
  var sidebarContainer = isMobile ? '.header__categories-mobile' : '.desktop_menu_list';
  var leftSidebar = document.querySelector('.desktop_menu_list');
  var desktopMenuList = document.querySelector('.category-list-menu');
  var desktopMenuListContainer = document.querySelector('.category-list-left');
  var mobileMenuList = document.querySelector('.category-list-menu-mobile');
  var categoriesPageList = document.querySelector('.categories-list');
  var categoryListContainer = document.querySelector(sidebarContainer + ' .category-list-container');
  var catListSites = document.querySelector('.category_list-sites');
  var categoryFilterBtn = document.querySelector(sidebarContainer + ' .category-list-filter-btn');
  var categoryFilterOptions = document.querySelector(sidebarContainer + ' .category-list-options');
  var categoryFilterOptionsIsOpen = false;
  var filterOptionScroll = document.querySelector(sidebarContainer + ' .category_filter_option_scroll');
  var filterOptionA2Z = document.querySelector(sidebarContainer + ' .category_filter_option_a2z');
  var filterOptionPopular = document.querySelector(sidebarContainer + ' .category_filter_option_popular');
  var filterOptionRandom = document.querySelector(sidebarContainer + ' .category_filter_option_random');
  var filterOptionTags = document.querySelector(sidebarContainer + ' #category_filter_option_tags');
  var sidebarAllTags = document.querySelector('#sidebar-all-tags');
  var initializedListeners = false;
  var categoryListLetters = document.querySelector(sidebarContainer + ' .category-list-letters');
  var reviewTypeSlider = document.querySelector('.review_type_slider');
  var rtsThumb = document.querySelector('.review_type_slider_thumb');
  var letterOffsets = {};
  var bodyClasses = document.body.classList;
  var isCategoriesPage = bodyClasses.contains('page-template-page-categories');
  var filterType = '';
  var categoryItems = [];
  var otherCategoryItems = [];
  var a2zCategories = [];
  var a2zLetters = [];
  var sidebarCategories = [];
  var a2zCookie = getCookieMpgCookie("category_filter_a2z");
  var allTagsCookie = getCookieMpgCookie("category_filter_all_tags");
  var filterScroll = bodyClasses.contains('page-template-page-categories') ? 0 : (_getCookieMpgCookie = +getCookieMpgCookie("category_filter_scroll")) !== null && _getCookieMpgCookie !== void 0 ? _getCookieMpgCookie : 0;
  var filterA2z = 1; // (bodyClasses.contains('home') || isCategoriesPage) ? 1:  +getCookieMpgCookie("category_filter_a2z") ?? 1;

  if (bodyClasses.contains('home') || isCategoriesPage) {
    filterA2z = 1;
  } else {
    if (a2zCookie == '') {
      filterA2z = 1;
    } else {
      filterA2z = +a2zCookie;
    }
  }

  var filterPopular = (_getCookieMpgCookie2 = +getCookieMpgCookie("category_filter_popular")) !== null && _getCookieMpgCookie2 !== void 0 ? _getCookieMpgCookie2 : 0;
  var frontListA2Z = false;
  var frontMainFilter = document.querySelector('.main_filter');

  if (!isMobileOrTablet && document.body.classList.contains('single-sites')) {
    filterA2z = 0;
  }

  if (filterScroll) {
    document.querySelectorAll('.category_filter_option_scroll').forEach(function (checkbox) {
      checkbox.checked = true;
    });
  }

  if (a2zCookie != '') {
    document.querySelectorAll('.category_filter_option_a2z').forEach(function (checkbox) {
      checkbox.checked = !filterA2z;
    });
  }

  if (allTagsCookie == '1') {
    document.querySelectorAll('.category_filter_option_tags').forEach(function (checkbox) {
      checkbox.checked = true;
    });

    if (sidebarAllTags) {
      sidebarAllTags.classList.add('show');
    }
  }

  var processCategoryDataFromDom = function processCategoryDataFromDom() {
    var isPreLoaded = false;

    if (mobileMenuList.classList.contains('loaded')) {
      isPreLoaded = true;
      otherCategoryItems = document.querySelectorAll('.category-list-menu-mobile .category-list-link ');
    } else {
      otherCategoryItems = document.querySelectorAll('#other_categories .category_item_link, .category_box.category_col');
    }

    var categoryIndex = 0;
    otherCategoryItems.forEach(function (_category) {
      var $this = _category;
      var link = '';
      var categoryId = '';
      var categoryOrder = 0;
      var isVisited = '';
      var isVisitedClass = '';
      var categorySites = [];
      var count_sites = 0;
      var categoryTitle = '';

      if (isPreLoaded) {
        // Category list is already loaded
        link = _category.getAttribute('href');
        categoryId = _category.dataset.id;
        categoryOrder = +categoryIndex;
        isVisited = _category.classList.contains('visited');
        isVisitedClass = isVisited ? 'visited' : '';
        categorySites = $this.querySelectorAll('.category-list-icons .category-site-icon');
        count_sites = +_category.querySelector('.mobile_link_count').innerHTML;

        var $categoryTitle = _category.querySelector('.category-list-title');

        categoryTitle = $categoryTitle.innerHTML;
        categoryIndex++;
      } else if (bodyClasses.contains('home')) {
        var catLink = _category.querySelector('.list__box-head-a');

        link = catLink.getAttribute('href');
        categoryId = catLink.dataset.id;
        categoryOrder = +catLink.dataset.order;
        isVisited = _category.classList.contains('visited');
        isVisitedClass = isVisited ? 'visited' : '';
        categorySites = $this.querySelectorAll('.list__box__item-icon');
        count_sites = +_category.dataset.count;

        var _$categoryTitle = _category.querySelector('.list__box-head-a');

        categoryTitle = _$categoryTitle.innerHTML;
      } else {
        link = _category.getAttribute('href');
        categoryId = _category.dataset.id;
        categoryOrder = +_category.dataset.order;
        isVisited = _category.classList.contains('visited');
        isVisitedClass = isVisited ? 'visited' : '';
        categorySites = $this.querySelectorAll('.url_link_list_sites .deIcon');
        var categorySiteCount = $this.querySelector('.url_link_count_sites');
        count_sites = categorySiteCount.textContent.replace('+', '');

        var _$categoryTitle2 = _category.querySelector('.category_item_caption_title');

        categoryTitle = _$categoryTitle2.innerHTML;
      }

      var $categoryIcon = _category.querySelector('.icon-category');

      var categoryIcon = $categoryIcon.className;
      var icons = '';
      var siteIndex = 0;
      categorySites.forEach(function (_site) {
        if (siteIndex < 5) {
          icons += '<i class="category-site-icon ' + _site.getAttribute('class') + '"></i>';
          siteIndex++;
        }
      });
      categoryItems.push({
        'id': categoryId,
        'title': categoryTitle,
        'icon': categoryIcon,
        'link': link,
        'count': count_sites,
        'icons': icons,
        'visited': isVisited,
        'visited_o': isVisited,
        'order': categoryOrder
      });
    });
  };

  function createSidebar() {
    var parent = this;

    if (!desktopMenuList || desktopMenuList.children.length == 0 || bodyClasses.contains('home') || isCategoriesPage) {
      renderCategorySidebar(filterA2z ? a2zCategories : categoryItems);
    }

    var categoryFilter = document.querySelectorAll('.category-list-filter');

    if (categoryFilter.length > 0) {
      for (var i = 0; i < categoryFilter.length; i++) {
        categoryFilter[i].addEventListener('input', debounce(function (evt) {
          var filter = evt.target.value.toLowerCase().trim();

          if (filter == '') {
            renderCategorySidebar(filterA2z ? a2zCategories : categoryItems);
            return;
          }

          var filteredCategories = _toConsumableArray(categoryItems);

          if (filterA2z) {
            filteredCategories = Array.prototype.slice.call(a2zCategories);
          }

          var catCount = filteredCategories.length; // categoryItems = categoryItems.sort((a, b) => b.title.localeCompare(a.title));

          filteredCategories = filteredCategories.sort(function (a, b) {
            var titleA = a.title.toLowerCase();
            var titleB = b.title.toLowerCase();
            var posA = titleA.indexOf(filter);
            var posB = titleB.indexOf(filter); // Strings with the search term come first

            if (posA !== -1 && posB === -1) return -1;
            if (posA === -1 && posB !== -1) return 1; // If both contain the term, sort by position

            if (posA !== -1 && posB !== -1) return posA - posB; // Otherwise, keep the original order

            return a.order - b.order;
          });
          filteredCategories.forEach(function (item, index) {
            item.index = index;
          });
          var premiumItems = filteredCategories.filter(function (item) {
            return item.title.toLowerCase().includes("premium") && item.title.toLowerCase().includes(filter.toLowerCase());
          });
          var nonPremiumItems = filteredCategories.filter(function (item) {
            return !(item.title.toLowerCase().includes("premium") && item.title.toLowerCase().includes(filter.toLowerCase()));
          }); // Remove 'Premium' items

          nonPremiumItems = nonPremiumItems.sort(function (a, b) {
            return a.index - b.index;
          });
          filteredCategories = premiumItems.concat(nonPremiumItems);
          renderCategorySidebar(filteredCategories, filter, true);
          desktopMenuListContainer === null || desktopMenuListContainer === void 0 ? void 0 : desktopMenuListContainer.scrollTo({
            top: 0,
            behavior: "smooth"
          });
          mobileMenuList === null || mobileMenuList === void 0 ? void 0 : mobileMenuList.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }));
      }
    }

    if (otherCategoryItems.length) {
      if (catListSites) {
        catListSites.classList.add('has_sidebar');
      }
    }

    var timeoutId;

    if (!isMobile) {
      categoryFilterBtn === null || categoryFilterBtn === void 0 ? void 0 : categoryFilterBtn.addEventListener('mouseover', function () {
        clearTimeout(timeoutId);

        if (!categoryFilterOptions.classList.contains('open')) {
          categoryFilterOptions.classList.add('open');
        }
      });
      categoryFilterBtn === null || categoryFilterBtn === void 0 ? void 0 : categoryFilterBtn.addEventListener('mouseout', function () {
        timeoutId = setTimeout(function () {
          categoryFilterOptions.classList.remove('open');
        }, 700); // 2000 milliseconds = 2 seconds
      });
    }

    categoryFilterBtn === null || categoryFilterBtn === void 0 ? void 0 : categoryFilterBtn.addEventListener('click', function () {
      console.log('categoryFilterOptions ', categoryFilterOptions.classList);

      if (categoryFilterOptions.classList.contains('open')) {
        categoryFilterOptions.classList.remove('open');
      } else {
        renderMobileCatFilters();
        categoryFilterOptions.classList.add('open');
      }
    });

    if (filterScroll) {
      onScrollChecked(filterScroll);
    }

    if (!initializedListeners) {
      var _document$querySelect9;

      filterOptionScroll === null || filterOptionScroll === void 0 ? void 0 : filterOptionScroll.addEventListener('change', function () {
        onScrollChecked(this.checked);
      }, false);
      filterOptionA2Z === null || filterOptionA2Z === void 0 ? void 0 : filterOptionA2Z.addEventListener('change', function () {
        onA2ZChecked(!this.checked);
      }, false);
      filterOptionRandom === null || filterOptionRandom === void 0 ? void 0 : filterOptionRandom.addEventListener('change', function () {
        gotoRandomCategory();
      });
      filterOptionTags === null || filterOptionTags === void 0 ? void 0 : filterOptionTags.addEventListener('change', function () {
        if (this.checked) {
          createCookie("category_filter_all_tags", 1, 356);
          sidebarAllTags === null || sidebarAllTags === void 0 ? void 0 : sidebarAllTags.classList.add('show');
        } else {
          createCookie("category_filter_all_tags", 0, 356);
          sidebarAllTags === null || sidebarAllTags === void 0 ? void 0 : sidebarAllTags.classList.remove('show');
        }
      });
      (_document$querySelect9 = document.querySelector('.category-list-switcher')) === null || _document$querySelect9 === void 0 ? void 0 : _document$querySelect9.addEventListener('click', function () {
        onA2ZChecked(frontListA2Z);
        frontListA2Z = !frontListA2Z;

        if (frontListA2Z) {
          frontMainFilter === null || frontMainFilter === void 0 ? void 0 : frontMainFilter.classList.remove('a2z');
        } else {
          frontMainFilter === null || frontMainFilter === void 0 ? void 0 : frontMainFilter.classList.add('a2z');
        }
      });
      initializedListeners = true;
    }
  }

  var renderMobileCatFilters = function renderMobileCatFilters() {
    var spanA2z = document.querySelector('.category-list-options .icon_a2z span');
    var spanRandom = document.querySelector('.category-list-options .icon_random span');

    if (spanA2z) {
      spanA2z.innerHTML = 'Icon View';
    }

    if (spanRandom) {
      spanRandom.innerHTML = 'Random category';
    }
  };

  var gotoRandomCategory = function gotoRandomCategory() {
    var randomCategory = categoryItems[Math.floor(Math.random() * categoryItems.length)];
    window.location.href = randomCategory.link;
  };

  var onScrollChecked = function onScrollChecked(checked) {
    filterScroll = checked;

    if (checked) {
      createCookie("category_filter_scroll", 1, 356);
      leftSidebar === null || leftSidebar === void 0 ? void 0 : leftSidebar.classList.add('scroll');
      catListSites === null || catListSites === void 0 ? void 0 : catListSites.classList.remove('has_sidebar');
      catListSites === null || catListSites === void 0 ? void 0 : catListSites.classList.add('scroll');

      if (categorySidebar) {
        categorySidebar.destroy();
      }

      console.log('Destroying sidebar ', categorySidebar);
      setSidebarHeight();
    } else {
      var _document$querySelect10;

      createCookie("category_filter_scroll", 0, 356);
      leftSidebar === null || leftSidebar === void 0 ? void 0 : leftSidebar.classList.remove('scroll');
      (_document$querySelect10 = document.querySelector('.category_list-sites')) === null || _document$querySelect10 === void 0 ? void 0 : _document$querySelect10.classList.add('has_sidebar');
      catListSites === null || catListSites === void 0 ? void 0 : catListSites.classList.remove('scroll');
      setSidebarHeight(true);
      initStickySidebar();
    }
  };

  var onA2ZChecked = function onA2ZChecked(checked) {
    filterA2z = checked;

    if (checked) {
      createCookie("category_filter_a2z", 1, 356);
      leftSidebar === null || leftSidebar === void 0 ? void 0 : leftSidebar.classList.add('scroll');
    } else {
      createCookie("category_filter_a2z", 0, 356);
      leftSidebar === null || leftSidebar === void 0 ? void 0 : leftSidebar.classList.remove('scroll');
    }

    renderCategorySidebar(filterA2z ? a2zCategories : categoryItems);
  };

  var setSidebarHeight = function setSidebarHeight() {
    var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!categoryListContainer) {
      return;
    }

    if (reset) {
      categoryListContainer === null || categoryListContainer === void 0 ? void 0 : categoryListContainer.style.removeProperty('height');
    } else {
      var firstSiteItem = document.querySelector('.category_sites_item.category_site_col');

      if (firstSiteItem) {
        var sidebarHeight = firstSiteItem.getBoundingClientRect().height * 2;
        sidebarHeight -= 60;
        categoryListContainer.style.height = sidebarHeight + 'px';
      } else if (document.body.classList.contains('page-template-page-categories')) {
        var _firstSiteItem = document.querySelector('#other_categories .category_item');

        var _sidebarHeight = _firstSiteItem.getBoundingClientRect().height * 2 + 20;

        console.log(_sidebarHeight);
        var awardWinningHeight = document.querySelector('.award_winning_container');

        if (awardWinningHeight) {
          _sidebarHeight += awardWinningHeight.getBoundingClientRect().height;
        }

        console.log(_sidebarHeight);
        var categoryHeaderHeight = document.querySelector('.categories_list h1');

        if (categoryHeaderHeight) {
          _sidebarHeight += categoryHeaderHeight.getBoundingClientRect().height;
        }

        console.log(_sidebarHeight);
        _sidebarHeight -= 60;
        categoryListContainer.style.height = _sidebarHeight + 'px';
        categoryListContainer.style.maxHeight = _sidebarHeight + 'px';
      }
    }
  };

  var renderA2ZLetters = function renderA2ZLetters() {
    if (!categoryListLetters) {
      return;
    }

    categoryListLetters.innerHTML = '';

    var _iterator = _createForOfIteratorHelper(a2zLetters),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var letter = _step.value;
        var liChar = document.createElement("li");
        liChar.textContent = letter.toUpperCase();
        liChar.className = "category-list-letter letter_" + letter;
        liChar.dataset.letter = letter;
        categoryListLetters.appendChild(liChar);
        liChar.addEventListener("click", function (e) {
          var _document$querySelect11;

          var triggeredLetter = e.currentTarget.dataset.letter;
          (_document$querySelect11 = document.querySelector('.category-list-letter.active')) === null || _document$querySelect11 === void 0 ? void 0 : _document$querySelect11.classList.remove('active');
          var letterTop = document.querySelector(sidebarContainer + ' .category-list-item-letter.letter_' + triggeredLetter).offsetTop;
          console.log('letter top ' + triggeredLetter, letterTop);
          desktopMenuListContainer === null || desktopMenuListContainer === void 0 ? void 0 : desktopMenuListContainer.scrollTo({
            top: letterTop,
            behavior: "smooth"
          });
          letterTop -= 45;
          mobileMenuList === null || mobileMenuList === void 0 ? void 0 : mobileMenuList.scrollTo({
            top: letterTop,
            behavior: "smooth"
          });
          e.currentTarget.classList.add('active');
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  var initLetterScroll = function initLetterScroll() {
    var letterLinks = document.querySelectorAll('.category-list-letter');

    if (letterLinks.length == 0) {
      return;
    }

    letterLinks.forEach(function (letterLink) {
      letterLink.addEventListener('click', function (e) {
        var _container$querySelec;

        e.preventDefault();
        var container = e.target.closest('.category-list-container');
        var letterList = container.querySelector('.category-list-left');
        var letter = e.target.dataset.letter;
        var letterElement = container.querySelector(".category-list-item-letter.letter_".concat(letter));
        var letterTop = letterElement.offsetTop;

        if (isMobileOrTablet) {
          letterTop -= 45;
        }

        (_container$querySelec = container.querySelector('.category-list-letter.active')) === null || _container$querySelec === void 0 ? void 0 : _container$querySelec.classList.remove('active');
        e.target.classList.add('active');
        letterList.scrollTo({
          top: letterTop,
          behavior: 'smooth'
        });
      });
    });
  };

  var renderCategorySidebar = function renderCategorySidebar(categoryItems) {
    var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var hideVisited = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // categoryListContainer?.classList.remove('a2z');
    // mobileMenuList?.classList.remove('a2z');
    if (filterA2z) {
      categoryListContainer === null || categoryListContainer === void 0 ? void 0 : categoryListContainer.classList.add('a2z');
      renderA2ZLetters();
    } else {
      categoryListContainer === null || categoryListContainer === void 0 ? void 0 : categoryListContainer.classList.remove('a2z');
    }

    if (desktopMenuList !== null) desktopMenuList.innerHTML = '';
    if (mobileMenuList !== null) mobileMenuList.innerHTML = '';
    var categoryIndex = 0;
    categoryItems.map(function (categoryItem) {
      var catTitle = categoryItem.title;
      var catExtraClasses = hideVisited ? '' : categoryItem.visited ? ' visited' : '';

      if (filter != '' && catTitle.toLowerCase().indexOf(filter) > -1) {
        catTitle = catTitle.replace(new RegExp(filter, 'gi'), function (match) {
          return "<span class=\"highlight\">".concat(match, "</span>");
        });
        catExtraClasses += ' pulse';
      }

      var item = '<li class="category-list-item" >' + '<a  href="' + categoryItem.link + '" class="category-list-link ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><i class="' + categoryItem.icon + '"></i><span class="category-list-title">' + catTitle + '</span><div class="category-list-icons">' + categoryItem.icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + categoryItem.count + '</span>' + '</div>' + '</a>' + '</li>';

      if (filterA2z) {
        var catIcon = '';

        if (+categoryItem.is_webcam > 0) {
          catIcon = '<i class="webcam"></i>';
        }

        item = '<li class="category-list-item" >' + '<a  href="' + categoryItem.link + '" class="category-list-link-a2z ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><span class="category-list-title">' + catTitle + catIcon + '</span><span class="mobile_link_count">' + categoryItem.count + '</span></a>' + '</li>';
      }

      if (categoryItem.letter) {
        item = '<li class="category-list-item category-list-item-letter letter_' + categoryItem.letter + '">' + categoryItem.letter.toUpperCase() + '</li>';
      }

      desktopMenuList === null || desktopMenuList === void 0 ? void 0 : desktopMenuList.insertAdjacentHTML('beforeend', item);
      mobileMenuList === null || mobileMenuList === void 0 ? void 0 : mobileMenuList.insertAdjacentHTML('beforeend', item);

      if (isCategoriesPage && !filterA2z) {
        var categoryBoxItem = document.querySelector('.category_item_link[data-id="' + categoryItem.id + '"]');

        if (categoryBoxItem) {
          if (hideVisited) {
            categoryBoxItem.setAttribute('class', 'category_item_link ' + catExtraClasses);
          }

          categoryBoxItem.querySelector('.category_item_caption_title').innerHTML = catTitle;
          categoryBoxItem.parentElement.style.order = "".concat(categoryIndex);
          categoryBoxItem.parentElement.dataset.order = "".concat(categoryIndex);
          categoryIndex++;
        }
      }
    });
    reorderCategories();

    if (filterA2z) {
      var _iterator2 = _createForOfIteratorHelper(a2zLetters),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _desktopMenuListConta;

          var letter = _step2.value;
          var letterTop = desktopMenuListContainer === null || desktopMenuListContainer === void 0 ? void 0 : (_desktopMenuListConta = desktopMenuListContainer.querySelector('.category-list-item-letter.letter_' + letter)) === null || _desktopMenuListConta === void 0 ? void 0 : _desktopMenuListConta.offsetTop;
          letterOffsets[letter] = letterTop;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      desktopMenuListContainer === null || desktopMenuListContainer === void 0 ? void 0 : desktopMenuListContainer.addEventListener("scroll", function () {
        var scrollTop = desktopMenuListContainer.scrollTop;
        var activeLetter = null;

        for (var key in letterOffsets) {
          if (scrollTop >= letterOffsets[key]) {
            activeLetter = key;
          }
        } // Update active class


        categoryListContainer.querySelectorAll(".category-list-letter").forEach(function (div) {
          div.classList.toggle("active", div.dataset.letter === activeLetter);
        });
      });
    }
  };

  var reorderCategories = function reorderCategories() {
    if (bodyClasses.contains('page-template-page-categories')) {
      return;
    }

    var container = document.querySelector('.category_sites');

    if (container) {
      var items = Array.from(container.children);
      items.sort(function (a, b) {
        return a.dataset.order - b.dataset.order;
      });
      items.forEach(function (item) {
        return container.appendChild(item);
      });
    }
  };

  var initStickySidebar = function initStickySidebar() {
    console.log("Init sticky sidebar ".concat(filterScroll));
    var bodyClasses = document.body.classList;

    if (bodyClasses.contains('term-production')) {
      categorySidebar = new StickySidebar('.categories-container', {
        innerWrapperSelector: '.inner-wrapper-sticky',
        bottomSpacing: 0,
        resizeSensor: true
      });
    } else if (!filterScroll && document.querySelectorAll('.desktop_menu_list').length > 0) {
      categorySidebar = new StickySidebar('.desktop_menu_list', {
        // topSpacing: 20,
        bottomSpacing: 0,
        // containerSelector: '.category_site_container',
        innerWrapperSelector: '.inner-wrapper-sticky',
        resizeSensor: true
      });
    }
  };

  var fetchA2Z = function fetchA2Z() {
    var url = '/wp-json/mpg/a2z/';
    var cacheKey = 'a2z_data__';

    var _lang = document.documentElement.getAttribute('lang');

    if (_lang != 'en') {
      url += '?lang=' + currentLang;
      cacheKey += '_' + currentLang;
    }

    if (getWithExpiry(cacheKey)) {
      processA2ZData(getWithExpiry(cacheKey));
      return;
    }

    fetch(url).then(function (res) {
      return res.json();
    }).then(function (result) {
      setWithExpiry(cacheKey, result, 30 * 60 * 1000);
      processA2ZData(result);
      console.log(cacheKey, result); // let filteredCategories = [...categoryItems];
    })["catch"](function (err) {// console.log('didnt load translations');
    });
  };

  var processHomeCategories = function processHomeCategories(result) {
    var _result$terms;

    sidebarCategories = [];
    (_result$terms = result.terms) === null || _result$terms === void 0 ? void 0 : _result$terms.forEach(function (term) {
      var icons = '';
      var siteIndex = 0;
      term.category_sites.forEach(function (_site) {
        if (siteIndex < 5) {
          icons += '<i class="category-site-icon deIcon ' + _site + '"></i>';
          siteIndex++;
        }
      });
      sidebarCategories.push({
        'id': term.term_id,
        'title': term.category_title_2,
        'icon': 'icon-category ' + term.icon_class,
        'link': term.term_link,
        'count': term.count,
        'icons': icons,
        'visited': 0,
        'visited_o': 0,
        'order': term.position
      });
    });
    categoryItems = sidebarCategories;
  };

  var processA2ZData = function processA2ZData(result) {
    a2zCategories = [];
    a2zLetters = [];
    new A2ZPopup(result);
    var a2zOrder = 0;

    for (var letter in result.categories) {
      a2zCategories.push({
        'letter': letter,
        'title': '',
        'order': a2zOrder
      });
      a2zLetters.push(letter);

      var _iterator3 = _createForOfIteratorHelper(result.categories[letter]),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var categoryItem = _step3.value;
          a2zCategories.push({
            'id': categoryItem.category,
            'title': categoryItem.title,
            'link': categoryItem.link,
            'count': categoryItem.count,
            'is_webcam': categoryItem.is_webcam,
            'order': a2zOrder
          });
          a2zOrder++;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      a2zOrder++;
    }

    if (bodyClasses.contains('home')) {
      processHomeCategories(result);
    } else {
      processCategoryDataFromDom();
    }

    initCategorySidebar();
    initLetterScroll();
  };

  var initCategorySidebar = function initCategorySidebar() {
    createSidebar();

    if (!filterScroll) {
      initStickySidebar();
    }
  };

  fetchA2Z();
}

function loadJS(url, implementationCode, location) {
  //url is URL of external file, implementationCode is the code
  //to be called from the file, location is the location to
  //insert the <script> element
  var scriptTag = document.createElement('script');
  scriptTag.src = url;
  scriptTag.onload = implementationCode;
  scriptTag.onreadystatechange = implementationCode;
  location.appendChild(scriptTag);
}

;
document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.querySelector('.dropdown-toggle');
  var dropdownMenu = document.querySelector('.tag-dropdown-menu');

  if (!toggleButton || !dropdownMenu) {
    return;
  }

  toggleButton.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show');
    toggleButton.classList.toggle('show'); // Add 'show' class to the button for icon rotation
  }); // Close the dropdown if clicked outside

  document.addEventListener('click', function (event) {
    if (!toggleButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('show');
      toggleButton.classList.remove('show'); // Remove 'show' class from the button
    }
  });
});

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

function initGameCategoryVideos() {
  var catSites = document.querySelectorAll('.category_sites_item_thumb.has_video');

  for (var i = 0, len = catSites.length; i < len; i++) {
    if (isMobileOrTablet) {
      catSites[i].removeEventListener('touchstart', onVideoCatEnter);
      catSites[i].addEventListener('touchstart', onVideoCatEnter, {
        passive: true
      });
    } else {
      catSites[i].removeEventListener('mouseleave', onVideoCatLeave);
      catSites[i].addEventListener('mouseleave', onVideoCatLeave, false);
      catSites[i].removeEventListener('mouseenter', onVideoCatEnter);
      catSites[i].addEventListener('mouseenter', onVideoCatEnter, false);
    }
  }
}

function onVideoCatEnter(ev) {
  var oldVideo = document.querySelector('.category_video_item');

  if (oldVideo) {
    oldVideo.remove();
  }

  var hoverCategory = ev.currentTarget;

  if (hoverCategory.classList.contains('category_sites_item_thumb')) {
    var videoUrl = hoverCategory.dataset.video;
    var videoPosterUrl = hoverCategory.dataset.poster;
    var categoryVideo = '<video class="category_video_item" preload="none" autoplay loop playsinline muted poster="' + videoPosterUrl + '" video-js>' + '<source src="' + videoUrl + '" type="video/mp4">' + '</video>';
    hoverCategory.insertAdjacentHTML('beforeend', categoryVideo);
  }
}

function onVideoCatLeave(ev) {
  var oldVideo = document.querySelector('.category_video_item');

  if (oldVideo) {
    oldVideo.remove();
  }
}
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
      mobileContainer = document.querySelector(".header__bottom");

  if (btnHamburger) {
    btnHamburger.addEventListener("click", function (ev) {
      var elem = ev.currentTarget;
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
    document.documentElement.classList.add('dark');
    toggleSwitch.checked = true;
  } else {
    document.documentElement.classList.remove('dark');
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
  window.favHtmlMobile = '<div class="hdrfavttl">Your Favourite Sites</div><div class="site_list favourite_list">' + favHtml + '</div>';
  var menuUserBlock = document.querySelector('.mobile_fav_link');

  if (menuUserBlock) {
    menuUserBlock.innerHTML = window.favHtmlMobile;

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
    var catIcon = suggession.icon;

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
      letterSuggessions += '<div class="sort__collapse">' + '<div class="sort__collapse-toggle" collapse-toggle-js data-container="sort-collapse-' + suggessionIndex + '">' + '<div><span>#' + suggessionIndex + '</span></div>' + '<div class="sort__collapse-title">' + '<i class="icon-category ' + catIcon + '"></i>' + '<p>' + suggessionName + '</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></div>' + '<div class="sort__collapse-body" id="sort-collapse-' + suggessionIndex + '" collapse-body-js>' + htmlFree + htmlHd + '</div>' + '</div>';
    } else {
      var toggleLink = siteHd != '' ? siteHd : siteFree;
      letterSuggessions += '<div class="sort__collapse">' + '<a class="sort__collapse-toggle scroll_to_category11" data-category="' + (hdId != '' ? hdId : freeId) + '" href="' + toggleLink + '">' + '<div><span>#' + suggessionIndex + '</span></div>' + '<div class="sort__collapse-title">' + '<i class="icon-category ' + catIcon + '"></i>' + '<p>' + suggessionName + '</p>' + '</div>' + '</a>' + '<div class="sort__collapse-body" id="sort-collapse-' + suggessionIndex + '" collapse-body-js>' + htmlFree + htmlHd + '</div>' + '</div>';
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

var ReportModal = /*#__PURE__*/function () {
  function ReportModal() {
    _classCallCheck(this, ReportModal);

    this.lastRequestTime = 0;
    this.rateLimitTime = 5000; // 5 seconds

    this.reportData = [{
      tag: "broken",
      title: "Broken or incorrect Link",
      icon: "broken-link",
      desc: "If the link is incorrect or broken, please report it here."
    }, {
      tag: "inaccuracy",
      title: "Review inaccuracy",
      icon: "inaccuracy",
      desc: "If the site has materially changed and lacks something mentioned in this review, please report it here."
    }, {
      tag: "outdated_ss",
      title: "Outdated or inaccurate screenshot",
      icon: "screenshot",
      desc: "If the screenshot presented is different from how the site appears, please report it here."
    }, {
      tag: "incorrect_cat",
      title: "Inaccurate categorization",
      icon: "categories",
      desc: "If you think the site has been placed into the wrong category, please report it here."
    }, {
      tag: "spam",
      title: "Spam or malicious content",
      icon: "spam",
      desc: "If the website has changed significantly and you believe it is now malicious or spammy, please report it here."
    }, {
      tag: "exploit",
      title: "Underage content",
      icon: "age-limit",
      desc: 'Please report the website to the webhost, local law enforcement and the NCMEC (<a class="color-success boogie-link" href="https://www.missingkids.org" target="_blank" rel="noopener noreferrer">https://www.missingkids.org</a>) in addition to your report here.'
    }, {
      tag: "revenge",
      title: "Nonconsensual content",
      icon: "revenge",
      desc: "If you believe a website has revenge porn and shows non-consensual activity, report it to the web host and local law enforcement in addition to your report here."
    }, {
      tag: "feedback",
      title: "General Feedback",
      icon: "comment-bubble",
      desc: "If you have other feedback or information that doesn't fit into one of the above categories, please report it here."
    }, {
      tag: "recommendations",
      title: "Website Submission for ",
      headerTitle: "Website Submission for ",
      icon: "comment-bubble",
      desc: "Know a website in this niche we don't have? Submit it!",
      disclaimer: "If you know of a great website that isn't listed in this category and think it deserves a place here, Mr. Porn Geek would love to hear about it! Please provide the website URL, and I'll personally review it. If it's popular, has good content, and is updated regularly, we'll include it here.",
      hideInList: true
    }];
    var bodyClasses = document.body.classList;

    if (bodyClasses.contains('category')) {
      this.parentContainer = document.querySelector('.review_type_container');
      this.additionalActions = document.querySelector('.review_type_trigger-dropdown');
      this.typeTriggerBtn = document.querySelector('.review_type_trigger-outer');
      this.typeFilter = document.querySelector('.review_type_trigger');
      this.reviewTypeSlider = document.querySelector('.review_type_slider');
      this.type_status = this.parentContainer.querySelector('.review_type_slider_status');
      this.rtsThumb = this.parentContainer.querySelector('.review_type_slider_thumb');
      var activeFilter = document.querySelector('.review_type_container .option.active');
      this.selectedFilter = activeFilter ? activeFilter.dataset.type : 'all';
      this.selectedFilterTagline = activeFilter ? activeFilter.dataset.tip : '';
      this.selectedFilterTipX = 0;
      this.selectedFilterTipW = 0;
      this.filterPopupContent = '';
      this.addCategoryReportClickListeners();
    }

    if (bodyClasses.contains('single-sites')) {
      this.title = document.querySelector('.review-title-line h1').innerHTML;
      this.addReviewReportClickListeners();
    } else if (bodyClasses.contains('category')) {
      this.title = document.querySelector('.bread-crumb-links .category_title').innerHTML;
      this.reportData.splice(1, 2);
    }
  }

  _createClass(ReportModal, [{
    key: "initReviewReportModal",
    value: function initReviewReportModal() {
      this.addReviewReportClickListeners();
    }
  }, {
    key: "initCategoryReportModal",
    value: function initCategoryReportModal() {
      this.addCategoryReportClickListeners();
    }
  }, {
    key: "addReviewReportClickListeners",
    value: function addReviewReportClickListeners() {
      var _this3 = this;

      var reportBtn = document.querySelectorAll('.report-button');
      reportBtn.forEach(function (item) {
        item.addEventListener('click', function (event) {
          var tag = event.currentTarget.dataset.tag;

          _this3.injectReportReviewModal();
        });
      });
    }
  }, {
    key: "addCategoryReportClickListeners",
    value: function addCategoryReportClickListeners() {
      var _this4 = this,
          _document$querySelect12,
          _document$querySelect13,
          _document$querySelect14;

      var parent = this;
      var reportBtn = document.querySelectorAll('.additional_action.report');
      reportBtn.forEach(function (item) {
        item.addEventListener('click', function (event) {
          var tag = event.currentTarget.dataset.tag;

          _this4.injectReportReviewModal('', 'Report a Problem for');
        });
      });
      (_document$querySelect12 = document.querySelector('.review_type_trigger.mobile')) === null || _document$querySelect12 === void 0 ? void 0 : _document$querySelect12.addEventListener('click', function (evt) {
        parent.showFilterPopup();
      });
      (_document$querySelect13 = document.querySelector('.additional_action.recommendations')) === null || _document$querySelect13 === void 0 ? void 0 : _document$querySelect13.addEventListener('click', function (event) {
        _this4.injectReportReviewModal('recommendations', 'Website Recommendations for');
      });
      (_document$querySelect14 = document.querySelector('.additional_action.feedback')) === null || _document$querySelect14 === void 0 ? void 0 : _document$querySelect14.addEventListener('click', function (event) {
        _this4.injectReportReviewModal('feedback', 'Send Feedback for');
      });
      this.checkAvailability();
      this.initTypeTriggerEvents();
      this.initFilterEvents();
    }
  }, {
    key: "initTypeTriggerEvents",
    value: function initTypeTriggerEvents() {
      var _this5 = this;

      var timeoutId;

      if (this.additionalActions) {
        var _this$typeTriggerBtn, _this$typeTriggerBtn2, _this$typeTriggerBtn3;

        (_this$typeTriggerBtn = this.typeTriggerBtn) === null || _this$typeTriggerBtn === void 0 ? void 0 : _this$typeTriggerBtn.addEventListener('mouseover', function () {
          clearTimeout(timeoutId);

          _this5.additionalActions.classList.add('open');
        });
        (_this$typeTriggerBtn2 = this.typeTriggerBtn) === null || _this$typeTriggerBtn2 === void 0 ? void 0 : _this$typeTriggerBtn2.addEventListener('mouseout', function () {
          timeoutId = setTimeout(function () {
            _this5.additionalActions.classList.remove('open');
          }, 700); // 2000 milliseconds = 2 seconds
        });
        (_this$typeTriggerBtn3 = this.typeTriggerBtn) === null || _this$typeTriggerBtn3 === void 0 ? void 0 : _this$typeTriggerBtn3.addEventListener('click', function () {
          if (_this5.additionalActions.classList.contains('open')) {
            clearTimeout(timeoutId);

            _this5.additionalActions.classList.remove('open');
          } else {
            _this5.additionalActions.classList.add('open');
          }
        });
      }
    }
  }, {
    key: "addReviewReportItemClickListeners",
    value: function addReviewReportItemClickListeners() {
      var _this6 = this;

      var listItems = document.querySelectorAll('.boogie-list-item');
      listItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
          var tag = event.currentTarget.dataset.tag;
          var desc = event.currentTarget.dataset.tag;

          _this6.showReportForm(tag);

          document.querySelector('.boogie-fields textarea').focus();
        });
      });
    }
  }, {
    key: "injectReportReviewModal",
    value: function injectReportReviewModal() {
      var initialTag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var headerTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Submit Review Feedback for';
      var modalHTML = this.generateReportReviewContent(this.title, headerTitle);

      if (document.querySelector('#boogie-modal')) {
        document.querySelector('#boogie-modal').innerHTML = modalHTML;
      } else {
        document.body.insertAdjacentHTML('beforeend', "<div class=\"micromodal micromodal-slide boogie-modal is-open\" id=\"boogie-modal\" aria-hidden=\"false\">".concat(modalHTML, "</div>"));
      }

      if (initialTag == '') {
        this.addReviewReportItemClickListeners();
      } else {
        this.showReportForm(initialTag, true);
      } // Initialize and show the modal


      MicroModal.show('boogie-modal', {
        // awaitOpenAnimation: true,
        awaitCloseAnimation: true,
        onShow: function onShow() {
          document.body.classList.add('is-hideScroll'); // document.querySelector('#boogie-modal')?.remove()
        },
        onClose: function onClose() {
          if (!isMobileOrTablet || window.innerWidth < 768) {
            document.querySelector('#boogie-modal').remove();
          }

          document.body.classList.remove('is-hideScroll');
        }
      });
    }
  }, {
    key: "switchToReport",
    value: function switchToReport() {
      var modalHTML = this.generateReportReviewContent(this.title, 'Report a Problem for');
      document.querySelector('#boogie-modal').innerHTML = modalHTML;
      this.addReviewReportItemClickListeners(); // if(initialTag == ''){
      // 	this.addReviewReportItemClickListeners()
      // }else{
      // 	this.showReportForm(initialTag, true)
      // }
    }
  }, {
    key: "generateReportReviewContent",
    value: function generateReportReviewContent(reviewName) {
      var headerTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Submit Review Feedback for';
      var modalOuter = "<div class=\"micromodal micromodal-slide boogie-modal is-open\" id=\"boogie-modal\" aria-hidden=\"false\"></div>";
      var modalHTML = "\n\t\t  <div class=\"micromodal-overlay\" tabindex=\"-1\">\n\t\t\t\t\t<div class=\"micromodal-container custom-scrollbar\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"boogie-title\">\n\t\t\t\t\t\t<div class=\"micromodal-content boogie-issues-content\">\n\t\t\t\t\t\t\t<div class=\"micromodal-header\">\n\t\t\t\t\t\t\t\t<h4 class=\"micromodal-title\" id=\"boogie-title\">\n\t\t\t\t\t\t\t\t\t<span class=\"inline-icon icon-thumbsup\"></span>\n\n\t\t\t\t\t\t\t\t\t<div class=\"micromodal-title-text\">\n\t\t\t\t\t\t\t\t\t\t<span>".concat(headerTitle, "</span>\n\t\t\t\t\t\t\t\t\t\t<span id=\"report_review_title\" class=\"color-primary\">").concat(reviewName, "</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t\t\t<div class=\"micromodal-close\" data-micromodal-close=\"\">\n\t\t\t\t\t\t\t\t\t<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0.51 0.51 22.99 22.99\" width=\"24px\" height=\"24px\">\n\t\t\t\t\t\t\t\t\t<path d=\"M23.1294 21.4152L2.58488 0.870773C2.10409 0.38998 1.33062 0.383984 0.85722 0.85738C0.383824 1.33078 0.38982 2.10425 0.870613 2.58504L21.4151 23.1295C21.8959 23.6103 22.6694 23.6163 23.1428 23.1429C23.6161 22.6695 23.6101 21.896 23.1294 21.4152Z\"></path>\n\t\t\t\t\t\t\t\t\t<path d=\"M21.415 0.870638L0.870529 21.4151C0.389736 21.8959 0.38374 22.6694 0.857136 23.1428C1.33053 23.6162 2.10401 23.6102 2.5848 23.1294L23.1293 2.58491C23.6101 2.10412 23.6161 1.33064 23.1427 0.857245C22.6693 0.383849 21.8958 0.389845 21.415 0.870638Z\"></path>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<hr>\n\n\t\t\t\t\t\t\t<div class=\"micromodal-body\">\n\t\t\t\t\t\t\t").concat(this.getReportBodyContent(), "\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t  </div>\n\t\t");
      return modalHTML;
    }
  }, {
    key: "getReportBodyContent",
    value: function getReportBodyContent() {
      var reportItemsContent = '';
      this.reportData.forEach(function (item) {
        if (item.hideInList) {
          return;
        }

        reportItemsContent += "<li class=\"boogie-list-item\" data-icon=\"broken-link\" data-tag=\"".concat(item.tag, "\">\n\t\t\t\t\t\t<div class=\"boogie-list-text\">\n\t\t\t\t\t\t  <span class=\"inline-icon icon-").concat(item.icon, "\"></span>\n\t\t\t\t\t\t  <div>").concat(item.title, "</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<svg class=\"arrow\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0.5 18 11\" fill=\"currentColor\">\n\t\t\t\t\t\t\t<path d=\"M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z\"></path>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t  </li>\n");
      });
      var bodyContent = "<div class=\"color-secondary\">\n\t\t\t\t\t\t  What's the issue?\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<ul class=\"boogie-list\">\n\t\t\t\t\t\t\t".concat(reportItemsContent, "\n\t\t\t\t\t\t</ul>");
      return bodyContent;
    }
  }, {
    key: "showReportForm",
    value: function showReportForm(tag) {
      var _this7 = this;

      var changeBack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var parent = this;
      var reviewTitle = this.title;
      var selectedTag = this.getDescriptionByTag(tag);
      var desc = selectedTag ? selectedTag.desc : '';
      var reportType = selectedTag ? selectedTag.title : '';
      var checkboxLabel = "I am submitting feedback for a ".concat(reviewTitle, " website review");

      if (document.body.classList.contains('category')) {
        checkboxLabel = 'I confirm and wish to proceed with my submission';
      }

      var reportFormContent = "<p>".concat(desc, "</p>\n\n        <div class=\"boogie-disclaimer\">\n        ").concat((selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.disclaimer) || "<p>Please note that Mr. Porn Geek doesn't manage any of the third-party platforms he reviews. If you have a problem with payments, content or something else, contact the site directly.</p><p>Mr. Porn Geek's reviews are written in a comedic way and with parody of the industry as its central focus. The character himself is fictional, and is merely an attempt to be a satirical take on the business of adult entertainment.</p>", "\n\n        </div>\n\n        <form method=\"post\" class=\"boogie-form\" action=\"#\" data-code=\"broke\">\n        \t<input type=\"hidden\" class=\"boogie-input\" name=\"tag\" value=\"").concat(reportType, "\">\n          <div class=\"boogie-form-body\">\n            <div class=\"boogie-fields\">\n              <div class=\"boogie-field boogie-field-textarea\">\n                <textarea class=\"boogie-input\" id=\"message\" name=\"message\" placeholder=\"Please enter details of your request\"></textarea>\n              </div>\n\n              <div class=\"boogie-field\">\n                <input class=\"boogie-input\" type=\"text\" id=\"name\" name=\"name\" placeholder=\"Your Name\">\n              </div>\n\n              <div class=\"boogie-field\">\n                <input class=\"boogie-input\" type=\"email\" id=\"email\" name=\"email\" placeholder=\"Your Email\">\n              </div>\n            </div>\n\n            <div class=\"boogie-checkbox\">\n              <input class=\"boogie-checkbox-input\" type=\"checkbox\" id=\"boogie-checkbox-input\" name=\"checkbox\">\n\n              <label class=\"boogie-checkbox-label\" for=\"boogie-checkbox-input\">").concat(checkboxLabel, "</label>\n            </div>\n          </div>\n\n          <hr>\n\n          <div class=\"boogie-form-footer\">\n            <button class=\"btn btn-secondary btn-back\" type=\"button\" ").concat(changeBack ? 'data-micromodal-close' : '', ">\n            \t").concat(changeBack ? '' : '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11">\n								<path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path>\n							</svg>', "\n\t\t\t\t\t\t\t").concat(changeBack ? 'Close' : 'Back', "</button>\n\n            <button class=\"btn btn-success btn-submit submit-report\" type=\"submit\">\n              <span class=\"btn-text\">Submit</span>\n              <div class=\"lds-dual-ring\"></div>\n            </button>\n          </div>\n        </form>");
      document.querySelector('#boogie-modal .micromodal-body').innerHTML = reportFormContent;
      document.querySelector('.boogie-form-footer .btn-back').addEventListener('click', function (event) {
        document.querySelector('#boogie-modal .micromodal-body').innerHTML = _this7.getReportBodyContent();

        _this7.addReviewReportItemClickListeners();
      }); // document.querySelector('.boogie-form input').addEventListener('change', (event) => {
      //
      // });

      var name = document.querySelector('.boogie-input[name="name"]');
      var email = document.querySelector('.boogie-input[name="email"]');
      var message = document.querySelector('.boogie-input[name="message"]');
      var debouncedValidateName = debounce(function () {
        return _this7.validateField(name);
      }, 300);
      var debouncedValidateMessage = debounce(function () {
        return _this7.validateField(message);
      }, 300);
      var debouncedValidateEmail = debounce(function () {
        return _this7.validateField(email);
      }, 300);
      name.addEventListener('input', debouncedValidateName);
      message.addEventListener('input', debouncedValidateMessage);
      email.addEventListener('input', debouncedValidateEmail);
      document.querySelector('.boogie-form').addEventListener('submit', function (event) {
        event.preventDefault();
        parent.submitForm();
      });
    }
  }, {
    key: "debounce",
    value: function debounce(func, delay) {
      var timeout;
      return function () {
        var _this8 = this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        clearTimeout(timeout);
        timeout = setTimeout(function () {
          return func.apply(_this8, args);
        }, delay);
      };
    }
  }, {
    key: "validateField",
    value: function validateField(field) {
      var value = field.value.trim();

      if (field.id === 'message') {
        if (value.length < 3) {
          field.classList.add('has_error');
        } else {
          field.classList.remove('has_error');
        }
      }

      if (field.id === 'name') {
        if (value.length < 3) {
          field.classList.add('has_error');
        } else {
          field.classList.remove('has_error');
        }
      } else if (field.id === 'email') {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          field.classList.add('has_error');
        } else {
          field.classList.remove('has_error');
        }
      }
    }
  }, {
    key: "getDescriptionByTag",
    value: function getDescriptionByTag(tagName) {
      var selectedTag = this.reportData.filter(function (item) {
        return item.tag === tagName;
      });
      return selectedTag.length > 0 ? selectedTag[0] : null;
    }
  }, {
    key: "showSuccessDialog",
    value: function showSuccessDialog() {
      var successContent = "\n        <div class=\"micromodal-hero\">\n          <h4 class=\"micromodal-title\">\n            Your contributions are truly appreciated!\n          </h4>\n          <span class=\"inline-icon icon-report-success\"></span>\n          <p>\n          \tThank you for your feedback! Your input is what helps make <span class=\"color-primary\">MrPornGeek.com</span> better for everyone.\n          </p>\n          <div class=\"micromodal-hero-actions\">\n            <button class=\"btn btn-primary btn-ok\" type=\"button\" data-micromodal-close=\"\">Ok</button>\n          </div>\n        </div>";
      document.querySelector('#boogie-modal hr').remove();
      document.querySelector('#boogie-modal .micromodal-header').innerHTML = '';
      document.querySelector('#boogie-modal .micromodal-body').innerHTML = successContent;
    }
  }, {
    key: "isReportValid",
    value: function isReportValid(name, email, message, accepted) {
      var hasError = false; // let accepted = document.querySelector('#boogie-checkbox-input').checked

      if (!accepted) {
        document.querySelector('.boogie-checkbox-label').classList.add('has_error');
        hasError = true;
      } else {
        document.querySelector('.boogie-checkbox-label').classList.remove('has_error');
      }

      if (name == '') {
        document.querySelector('.boogie-input[name="name"]').classList.add('has_error');
        hasError = true;
      } else {
        document.querySelector('.boogie-input[name="name"]').classList.remove('has_error');
      }

      if (email == '') {
        document.querySelector('.boogie-input[name="email"]').classList.add('has_error');
        hasError = true;
      } else {
        document.querySelector('.boogie-input[name="email"]').classList.remove('has_error');
      }

      if (message == '') {
        document.querySelector('.boogie-input[name="message"]').classList.add('has_error');
        hasError = true;
      } else {
        document.querySelector('.boogie-input[name="message"]').classList.remove('has_error');
      }

      if (hasError) {
        return false;
      }

      var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      hasError = emailRegex.test(email);
      return hasError;
    } // Function to handle form submission

  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this9 = this;

      var tag = document.querySelector('.boogie-input[name="tag"]').value.trim();
      var name = document.querySelector('.boogie-input[name="name"]').value.trim();
      var email = document.querySelector('.boogie-input[name="email"]').value.trim();
      var message = document.querySelector('.boogie-input[name="message"]').value.trim();
      var reviewUrl = window.location.href;
      var reviewId = document.querySelector('.main_con.review_container').dataset.siteid;
      var accepted = document.querySelector('#boogie-checkbox-input').checked; // let reviewTitle = document.querySelector('.review_site_link .site_name').innerHTML;
      // Validate email format

      if (!this.isReportValid(name, email, message, accepted)) {
        return false;
      } // Rate limit check


      var currentTime = Date.now();

      if (currentTime - this.lastRequestTime < this.rateLimitTime) {
        return;
      }

      document.querySelector('.boogie-form .submit-report').classList.add('spin'); // Update the last request time

      this.lastRequestTime = currentTime; // If valid email, proceed with the POST request

      fetch("/wp-content/themes/mpg/ajax-handler-wp.php?action=submit_report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reporter_name: name,
          email: email,
          message: message,
          tag: tag,
          post_id: reviewId
        })
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      }).then(function (responseData) {
        if (responseData.success) {
          _this9.showSuccessDialog();
        } else {
          console.log('error');

          _this9.showSuccessDialog();
        }
      })["catch"](function (error) {
        console.error("Error:", error);
      });
    }
  }, {
    key: "generateTypeFilterPopupContent",
    value: function generateTypeFilterPopupContent() {
      var _document$querySelect15;

      var withParent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var filterOptions = (_document$querySelect15 = document.querySelector('.review_type_slider')) === null || _document$querySelect15 === void 0 ? void 0 : _document$querySelect15.innerHTML;
      var popupContent = "\n\t\t\t<div class=\"micromodal-overlay\" tabindex=\"-1\">\n\t\t\t\t<div class=\"micromodal-container custom-scrollbar\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"boogie-title\">\n\t\t\t\t  <div class=\"micromodal-content filter_type_content\" data-type=\"all\">\n\t\t\t\t\t  <div class=\"micromodal-header\">\n\t\t\t\t\t\t\t<h4 class=\"micromodal-title\" id=\"boogie-title\">\n\t\t\t\t\t\t\t\t<span class=\"inline-icon icon-thumbsup\"></span>\n\n\t\t\t\t\t\t\t\t<div class=\"micromodal-title-text\">\n\t\t\t\t\t\t\t\t\t<span>Filter by Free or Premium</span>\n\t\t\t\t\t\t\t\t\t<span id=\"report_review_title\" class=\"color-primary\"></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t\t<div class=\"micromodal-close\" data-micromodal-close=\"\">\n\t\t\t\t\t\t\t\t<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0.51 0.51 22.99 22.99\" width=\"24px\" height=\"24px\">\n\t\t\t\t\t\t\t\t<path d=\"M23.1294 21.4152L2.58488 0.870773C2.10409 0.38998 1.33062 0.383984 0.85722 0.85738C0.383824 1.33078 0.38982 2.10425 0.870613 2.58504L21.4151 23.1295C21.8959 23.6103 22.6694 23.6163 23.1428 23.1429C23.6161 22.6695 23.6101 21.896 23.1294 21.4152Z\"></path>\n\t\t\t\t\t\t\t\t<path d=\"M21.415 0.870638L0.870529 21.4151C0.389736 21.8959 0.38374 22.6694 0.857136 23.1428C1.33053 23.6162 2.10401 23.6102 2.5848 23.1294L23.1293 2.58491C23.6101 2.10412 23.6161 1.33064 23.1427 0.857245C22.6693 0.383849 21.8958 0.389845 21.415 0.870638Z\"></path>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t  </div>\n\t\t\t\t\t   <hr>\n\n\t\t\t\t\t  <div class=\"micromodal-body\">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<div class=\"review_type_slider mobile\">\n\t\t\t\t\t\t\t\t\t".concat(filterOptions, "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"review_type_slider_status\"></div>\n\t\t\t\t\t\t\t<div class=\"color-secondary\">Additional Actions</div>\n\t\t\t\t\t\t\t<ul class=\"additional_actions boogie-list\">\n\t\t\t\t\t\t\t\t<li class=\"boogie-list-item problem\" data-icon=\"problem\" data-tag=\"problem\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"boogie-list-text\">\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"inline-icon icon-problem\"></span>\n\t\t\t\t\t\t\t\t\t\t\t<div>Report a Problem</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<svg class=\"arrow\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0.5 18 11\" fill=\"currentColor\">\n\t\t\t\t\t\t\t\t\t\t\t<path d=\"M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z\"></path>\n\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li class=\"boogie-list-item recommendations\" data-icon=\"recommendations\" data-tag=\"recommendations\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"boogie-list-text\">\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"inline-icon icon-recommendations\"></span>\n\t\t\t\t\t\t\t\t\t\t\t<div>Site Recommendations</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<svg class=\"arrow\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0.5 18 11\" fill=\"currentColor\">\n\t\t\t\t\t\t\t\t\t\t\t<path d=\"M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z\"></path>\n\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li class=\"boogie-list-item feedback\" data-icon=\"feedback\" data-tag=\"feedback\">\n\t\t\t\t\t\t\t\t\t<div class=\"boogie-list-text\">\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"inline-icon icon-feedback\"></span>\n\t\t\t\t\t\t\t\t\t\t\t<div>Send feedback</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<svg class=\"arrow\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0.5 18 11\" fill=\"currentColor\">\n\t\t\t\t\t\t\t\t\t\t\t<path d=\"M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z\"></path>\n\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t  </div>\n\n\t\t\t\t\t\t<div class=\"loading_spinner mobile\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t  </div>\n\t\t");

      if (withParent) {
        return "<div class=\"micromodal micromodal-category\" id=\"boogie-modal\" aria-hidden=\"false\">".concat(popupContent, "</div>");
      }

      return popupContent;
    }
  }, {
    key: "showFilterPopup",
    value: function showFilterPopup() {
      var parent = this;

      if (!document.querySelector("#boogie-modal")) {
        var modalHTML = this.generateTypeFilterPopupContent(true);
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.filterPopupContent = document.querySelector('#boogie-modal').innerHTML; // parent.preselectFilter()
      } else {
        // let modalHTML = this.generateTypeFilterPopupContent()
        document.querySelector('#boogie-modal').innerHTML = this.filterPopupContent;
      }

      MicroModal.show('boogie-modal', {
        // awaitOpenAnimation: true,
        awaitCloseAnimation: true,
        onShow: function onShow() {
          var _parent$reviewTypeSli;

          document.body.classList.add('is-hideScroll');
          parent.parentContainer = document.querySelector('#boogie-modal');
          parent.type_status = parent.parentContainer.querySelector('.review_type_slider_status');
          parent.type_error = parent.parentContainer.querySelector('.review_type_slider_error');
          parent.reviewTypeSlider = document.querySelector('.review_type_slider.mobile');
          parent.rtsThumb = document.querySelector('.review_type_slider.mobile .review_type_slider_thumb');
          parent.filterTypeContainer = document.querySelector('.filter_type_content');
          parent.preselectFilter();
          parent.initFilterEvents();
          parent.initPopupEvents();
          parent.checkAvailability();
          var opt = (_parent$reviewTypeSli = parent.reviewTypeSlider) === null || _parent$reviewTypeSli === void 0 ? void 0 : _parent$reviewTypeSli.querySelector('.option.active');

          if ((opt === null || opt === void 0 ? void 0 : opt.dataset.type) == 'all') {
            parent.slideToType(parent.reviewTypeSlider.querySelector('.option.active'));
          }
        },
        onClose: function onClose() {
          // document.querySelector('#type-filter-modal').remove()
          document.documentElement.classList.remove('is-hideScroll');
          document.body.classList.remove('is-hideScroll');
        }
      });
    }
  }, {
    key: "preselectFilter",
    value: function preselectFilter() {
      var viewFilter = document.querySelector('.viewing-filter');
      var filter = this.reviewTypeSlider.querySelector('.option.active');

      if (filter == undefined) {
        filter = this.reviewTypeSlider.querySelector('.option.all');
      }

      if (filter && filter.dataset.type != 'all') {
        var _filter, _filter2;

        this.rtsThumb.classList.add('no_anim');
        this.selectedFilterTagline = (_filter = filter) === null || _filter === void 0 ? void 0 : _filter.dataset.tip;
        this.slideToType(filter);
        this.repositionStatusTooltip(filter);
        this.rtsThumb.classList.remove('no_anim');
        this.type_status.innerHTML = (_filter2 = filter) === null || _filter2 === void 0 ? void 0 : _filter2.dataset.tip;
        this.type_status.classList.add('show');

        if (viewFilter) {
          viewFilter.innerHTML = "Viewing ".concat(filter.dataset.type, " Sites \u2014 Change ^");
        }
      } else if (filter) {
        this.slideToType(filter);

        if (viewFilter) {
          viewFilter.innerHTML = "";
        }
      }
    }
  }, {
    key: "initFilterEvents",
    value: function initFilterEvents() {
      var parent = this;
      var timeoutId;
      this.parentContainer.querySelectorAll('.review_type_slider .option').forEach(function (option) {
        option.addEventListener('click', function (evt) {
          parent.onOptionClicked(evt.currentTarget);
        });

        if (option.classList.contains('disabled')) {
          if (isMobileOrTablet || window.innerWidth < 768) {
            option.addEventListener('click', function (evtT) {
              clearTimeout(timeoutId);
              parent.repositionStatusTooltip(evtT.currentTarget, true);
              parent.type_status.innerHTML = 'No ' + evtT.currentTarget.dataset.type + ' sites listed in this category'; // evt.currentTarget?.dataset.tip;

              if (!parent.type_status) return;

              if (!parent.type_status.classList.contains('show')) {
                parent.type_status.classList.add('show');
              }

              parent.type_status.classList.add('error');
            });
          } else {
            option.addEventListener('mouseover', function (evtT) {
              clearTimeout(timeoutId);
              parent.repositionStatusTooltip(evtT.currentTarget, true);
              parent.type_status.innerHTML = 'No ' + evtT.currentTarget.dataset.type + ' sites listed in this category'; // evt.currentTarget?.dataset.tip;

              if (!parent.type_status) return;

              if (!parent.type_status.classList.contains('show')) {
                parent.type_status.classList.add('show');
              }

              parent.type_status.classList.add('error');
            });
            option.addEventListener('mouseout', function () {
              parent.startTypeErrorTimer();
            });
          }
        }
      }.bind(this));
    }
  }, {
    key: "onOptionClicked",
    value: function onOptionClicked(target) {
      var _this$parentContainer, _document$querySelect16, _document$querySelect17;

      var sitesArchive = document.querySelector('.category_sites.cat_archive');
      var type = target.dataset.type;
      var parent = this;

      if (this.currentFilter == type) {
        return;
      }

      if (target.classList.contains('disabled')) {
        if (this.type_status) {
          this.type_status.innerHTML = "No ".concat(type, " sites listed in this category");
          this.type_status.classList.add('show');

          if (isMobileOrTablet || window.innerWidth < 768) {
            this.type_status.classList.add('error');
            parent.repositionStatusTooltip(target, true);
            setTimeout(function () {
              parent.type_status.classList.remove('error');

              if (parent.currentFilter != 'all') {
                parent.type_status.innerHTML = parent.selectedFilterTagline;
                parent.type_status.style.setProperty('--tip_rx', "".concat(parent.selectedFilterTipX, "px"));
              } else {
                parent.type_status.classList.remove('show');
              }
            }, 2000);
          }
        }

        return;
      }

      var siteType = target.dataset.type;
      setWithExpiry('term_filter_' + document.body.dataset.page, siteType, 3000 * 60 * 1000);
      setWithExpiry('term_filter_id', document.body.dataset.page, 3000 * 60 * 1000);
      this.currentFilter = siteType;

      if (this.filterTypeContainer) {
        this.filterTypeContainer.dataset.type = siteType;
      }

      (_this$parentContainer = this.parentContainer.querySelector('.review_type_slider .option.active')) === null || _this$parentContainer === void 0 ? void 0 : _this$parentContainer.classList.remove('active');
      this.slideToType(target);
      (_document$querySelect16 = document.querySelector('.review_type_container .option.active')) === null || _document$querySelect16 === void 0 ? void 0 : _document$querySelect16.classList.remove('active');
      (_document$querySelect17 = document.querySelector('.review_type_container .option.' + siteType)) === null || _document$querySelect17 === void 0 ? void 0 : _document$querySelect17.classList.add('active');
      target.classList.add('active');
      var viewFilter = document.querySelector('.viewing-filter');
      console.log("Switching to --- ".concat(siteType));
      sitesArchive.dataset.type = siteType;

      if (this.type_status) {
        if (siteType == 'all') {
          this.type_status.innerHTML = '';
          this.selectedFilterTagline = '';
          this.type_status.classList.remove('show');

          if (isMobileOrTablet && viewFilter) {
            viewFilter.innerHTML = '';
          }
        } else {
          var tooltip = document.querySelector('.review_type_container .option.' + siteType + ' .tooltip');

          if (tooltip) {
            this.type_status.innerHTML = tooltip.innerHTML;
          } else {
            this.type_status.innerHTML = "You're Viewing All ".concat(siteType, " Sites");
          }

          if (isMobileOrTablet && viewFilter) {
            viewFilter.innerHTML = "Viewing ".concat(siteType, " Sites \u2014 Change ^");
          }

          this.type_status.classList.add('show');
          this.type_status.classList.remove('error');
          this.repositionStatusTooltip(target);
          this.selectedFilter = target;
          this.selectedFilterTagline = (target === null || target === void 0 ? void 0 : target.dataset.tip) || '';
          this.type_status.innerHTML = target === null || target === void 0 ? void 0 : target.dataset.tip;
          setWithExpiry('term_filter_' + document.body.dataset.page + '_tagline', this.type_status.innerHTML, 3000 * 60 * 1000);

          if (!this.type_status.classList.contains('show')) {
            this.type_status.classList.add('show');
          }
        }
      }

      if (document.querySelector('#boogie-modal')) {
        this.filterPopupContent = document.querySelector('#boogie-modal').innerHTML;
      }

      this.showProgress();
    }
  }, {
    key: "repositionStatusTooltip",
    value: function repositionStatusTooltip(target) {
      var isDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var typeSliderContainer = this.parentContainer.querySelector('.review_type_slider');

      var _typeSliderContainer$ = typeSliderContainer.getBoundingClientRect(),
          x = _typeSliderContainer$.x,
          width = _typeSliderContainer$.width;

      var _target$getBoundingCl = target.getBoundingClientRect(),
          optionX = _target$getBoundingCl.x,
          optionWidth = _target$getBoundingCl.width;

      var tipX = x + width - (optionX + optionWidth / 2);

      if (!isDisabled) {
        this.selectedFilterTipX = tipX;
      }

      this.type_status.style.setProperty('--tip_rx', "".concat(tipX, "px"));
    }
  }, {
    key: "startTypeErrorTimer",
    value: function startTypeErrorTimer() {
      var parent = this;

      if (parent.type_status) {
        // setTimeout(() => {
        // 	// parent.repositionStatusTooltip(parent.selectedFilter)
        // }, 2500);
        if (parent.type_status && parent.type_status.innerHTML != '') {
          parent.type_status.classList.add('show');
        } // parent.type_status.innerHTML = parent.selectedFilterTagline;


        if (parent.selectedFilterTagline === '' || parent.selectedFilterTagline === undefined) {
          parent.type_status.classList.remove('show');
          return;
        }

        parent.type_status.innerHTML = parent.selectedFilterTagline;
        parent.type_status.classList.remove('error');
        parent.type_status.style.setProperty('--tip_rx', "".concat(parent.selectedFilterTipX, "px"));
      }
    }
  }, {
    key: "checkAvailability",
    value: function checkAvailability() {
      var _this$parentContainer2;

      (_this$parentContainer2 = this.parentContainer) === null || _this$parentContainer2 === void 0 ? void 0 : _this$parentContainer2.querySelectorAll('.review_type_slider .option').forEach(function (option) {
        var type = option.dataset.type;

        if (type == 'all') {
          return;
        }

        var sites = document.querySelectorAll('.category_sites_item.' + type).length;

        if (sites == 0) {
          option.classList.add('disabled'); // option.insertAdjacentHTML('beforeend', '<div class="review_type_slider_tooltip">No ' + type + ' sites listed in this category</div>');
        }
      });
    }
  }, {
    key: "slideToType",
    value: function slideToType(target) {
      var sliderContainerX = this.reviewTypeSlider.getBoundingClientRect().x;
      var optionBounds = target.getBoundingClientRect();
      var thumbX = optionBounds.x - sliderContainerX;
      this.rtsThumb.style.left = thumbX + 'px';
      this.rtsThumb.style.width = optionBounds.width + 'px';
      document.querySelectorAll('.review_type_slider_thumb').forEach(function (thumb) {
        thumb.style.left = thumbX + 'px';
        thumb.style.width = optionBounds.width + 'px';
        setWithExpiry('term_filter_' + document.body.dataset.page + '_x', thumbX, 3000 * 60 * 1000);
        setWithExpiry('term_filter_' + document.body.dataset.page + '_w', optionBounds.width, 3000 * 60 * 1000);
      }); // rtsThumbMobile

      console.log(sliderContainerX, optionBounds);
    }
  }, {
    key: "showProgress",
    value: function showProgress() {
      var _this10 = this;

      var isMobile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var progress = document.querySelector('.loading_spinner.desktop');

      if (isMobileOrTablet || window.innerWidth < 768) {
        progress = document.querySelector('.loading_spinner.mobile');
      }

      if (progress) {
        progress.classList.add('show');
        setTimeout(function () {
          progress.classList.remove('show');

          if (isMobileOrTablet || window.innerWidth < 768) {
            _this10.filterPopupContent = document.querySelector('#boogie-modal').innerHTML;
            MicroModal.close('boogie-modal');
          }
        }, 2000);
      }
    }
  }, {
    key: "initPopupEvents",
    value: function initPopupEvents() {
      var _document$querySelect18, _document$querySelect19, _document$querySelect20;

      var parent = this;
      (_document$querySelect18 = document.querySelector('.boogie-list-item.problem')) === null || _document$querySelect18 === void 0 ? void 0 : _document$querySelect18.addEventListener('click', function (evt) {
        evt.preventDefault(); // MicroModal.close('type-filter-modal');
        // document.querySelector('#type-filter-modal')?.remove()
        // parent.injectReportReviewModal('', 'Report a Problem for')

        parent.switchToReport();
      });
      (_document$querySelect19 = document.querySelector('.boogie-list-item.recommendations')) === null || _document$querySelect19 === void 0 ? void 0 : _document$querySelect19.addEventListener('click', function (evt) {
        evt.preventDefault(); // MicroModal.close('type-filter-modal');

        parent.injectReportReviewModal('recommendations', 'Website Recommendations for'); // parent.showReportForm('recommendations')
      });
      (_document$querySelect20 = document.querySelector('.boogie-list-item.feedback')) === null || _document$querySelect20 === void 0 ? void 0 : _document$querySelect20.addEventListener('click', function (evt) {
        evt.preventDefault(); // MicroModal.close('type-filter-modal');

        parent.injectReportReviewModal('feedback', 'Send Feedback for');
      });
    }
  }]);

  return ReportModal;
}();

var findTheClosestValueInArray = function findTheClosestValueInArray(needle, haystack) {
  return haystack.reduce(function (prev, cur) {
    return Math.abs(cur - needle) < Math.abs(prev - needle) ? cur : prev;
  });
};

var initResize = function initResize(_ref) {
  var _ref$breakpoints = _ref.breakpoints,
      breakpoints = _ref$breakpoints === void 0 ? [] : _ref$breakpoints,
      _ref$onInit = _ref.onInit,
      onInit = _ref$onInit === void 0 ? function () {} : _ref$onInit,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$onResize = _ref.onResize,
      onResize = _ref$onResize === void 0 ? function () {} : _ref$onResize;
  breakpoints = Array.isArray(breakpoints) ? breakpoints : [breakpoints];
  if (!breakpoints.length) return;
  var mappedBreakpoints = breakpoints.map(function (key) {
    return {
      width: +key,
      isEqual: false,
      isLess: false,
      isLessOrEqual: false,
      isMore: false,
      isMoreOrEqual: false
    };
  });

  var handleResize = function handleResize() {
    var toBeResized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var windowWidth = window.innerWidth;
    var closestWidth = findTheClosestValueInArray(windowWidth, breakpoints);
    var closestBp = mappedBreakpoints.find(function (bp) {
      return closestWidth === bp.width;
    });
    var state = {
      width: closestWidth,
      isEqual: windowWidth === closestBp.width,
      isLess: windowWidth < closestBp.width,
      isMore: windowWidth > closestBp.width,
      isLessOrEqual: windowWidth <= closestBp.width,
      isMoreOrEqual: windowWidth >= closestBp.width
    };
    var isStateChanged = Object.keys(state).some(function (key) {
      return state[key] !== closestBp[key];
    });
    Object.assign(closestBp, state);
    toBeResized ? onResize(closestBp) : onInit(closestBp);
    isStateChanged && onChange(closestBp);
  };

  var bindResize = function bindResize() {
    return window.addEventListener('resize', handleResize);
  };

  handleResize(false);
  bindResize();
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

var getWindowScrollTop = function getWindowScrollTop() {
  return window.scrollY || window.pageYOffSet || document.documentElement.scrollTop;
};

var isDelegatedElement = function isDelegatedElement($target, trigger) {
  var match = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var method = match ? 'matches' : 'closest';
  if (!$target || !$target[method]) return false;
  if (typeof trigger === 'string') return !!$target[method](trigger);
  if (Array.isArray(trigger)) return trigger.some(function (className) {
    return !!$target[method](className);
  });
  return false;
};

var debounce = function debounce(cb) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var timer = null;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    clearTimeout(timer);
    timer = setTimeout(function () {
      return cb.apply(void 0, args);
    }, delay);
  };
};

var initScrollSpyButton = function initScrollSpyButton(_ref2) {
  var _ref2$container = _ref2.container,
      container = _ref2$container === void 0 ? null : _ref2$container,
      _ref2$sections = _ref2.sections,
      sections = _ref2$sections === void 0 ? [] : _ref2$sections,
      _ref2$topOffset = _ref2.topOffset,
      topOffset = _ref2$topOffset === void 0 ? 0 : _ref2$topOffset,
      _ref2$onBeforeClick = _ref2.onBeforeClick,
      onBeforeClickAction = _ref2$onBeforeClick === void 0 ? function () {} : _ref2$onBeforeClick,
      _ref2$onBeforeScroll = _ref2.onBeforeScroll,
      onBeforeScrollAction = _ref2$onBeforeScroll === void 0 ? function () {} : _ref2$onBeforeScroll;
  var $body = document.body; // const $buttons = $body.querySelectorAll('.scrollspy-btn');

  var $buttons = $body.querySelectorAll('.scrollspy-btn');
  var $container = container;
  var $sections = sections;

  var _topOffset = Math.floor(topOffset);

  var setContainer = function setContainer($el) {
    return $container = $el;
  };

  var setSections = function setSections($els) {
    return $sections = $els;
  };

  var setTopOffset = function setTopOffset() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return _topOffset = Math.floor(val);
  };

  var getPercent = function getPercent() {
    if (!$sections.length) return 0;
    var $lastSection = $sections[$sections.length - 1];
    var windowScrollTop = Math.floor(getWindowScrollTop());

    var lastSectionTop = windowScrollTop + Math.floor($lastSection.getBoundingClientRect().top) - _topOffset;

    return Math.min(windowScrollTop / lastSectionTop, 1);
  };

  var setPercentCSSProperty = function setPercentCSSProperty() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return $buttons.forEach(function ($btn) {
      return $btn.style.setProperty('--percent', val);
    });
  };

  var toggleTopClass = function toggleTopClass() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return $buttons.forEach(function ($btn) {
      return $btn.classList.toggle('scroll-to-top', val >= 1);
    });
  };

  var onScroll = function onScroll() {
    onBeforeScrollAction();
    var percent = getPercent();

    if (!document.body.classList.contains('home') && percent > 0.95) {
      percent = 1;
    }

    setPercentCSSProperty(percent);
    toggleTopClass(percent);
  };

  var onClick = function onClick(e) {
    if (!isDelegatedElement(e.target, '.scrollspy-btn')) return;
    onBeforeClickAction();
    var windowScrollTop = Math.floor(getWindowScrollTop());
    var windowHeight = Math.floor(window.innerHeight);
    var top = 0;
    Array.from($sections).some(function ($section, idx) {
      var sectionTop = windowScrollTop + Math.floor($section.getBoundingClientRect().top);
      var sectionBottom = windowScrollTop + Math.floor($section.getBoundingClientRect().bottom);
      var isInView = sectionTop < windowScrollTop + windowHeight && sectionBottom > windowScrollTop + _topOffset;

      if (isInView) {
        top = $sections[idx + 1] ? windowScrollTop + Math.floor($sections[idx + 1].getBoundingClientRect().top) - _topOffset : 0;
        return true;
      }
    });

    if ($buttons[0].classList.contains('scroll-to-top')) {
      top = 0;
    }

    scrollTo({
      top: top,
      behavior: top ? 'smooth' : 'instant'
    });
    console.log('Scrolling to next section');
  };

  var toggleBindScroll = function toggleBindScroll() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return window["".concat(val ? 'add' : 'remove', "EventListener")]('scroll', onScroll);
  };

  var toggleBindClick = function toggleBindClick() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return $body["".concat(val ? 'add' : 'remove', "EventListener")]('click', debounce(onClick));
  };

  toggleBindScroll();
  toggleBindClick();
  onScroll();
  return {
    setContainer: setContainer,
    setSections: setSections,
    setTopOffset: setTopOffset,
    toggleBindScroll: toggleBindScroll,
    toggleBindClick: toggleBindClick
  };
};

var searchViewContainer = document.querySelector('.header__view-actions');

function initSearch() {
  var searchClient;
  var algo_index_sites;
  var algo_index_categories;
  var algo_index_blogs;
  var searchLang = 'en';
  var searchedSites = [];
  var searchedBlogs = [];
  var searchSynonyms = [];
  var searchedCategories = [];
  var searchResultsPanel;
  var searchResultsSites;
  var searchResultsCategory;
  var searchResultCount;
  var searchPaginationContainer;
  var searchPageCount = 0;
  var searchTotalPageCount = 0;
  var searchPageMax = 5;
  var searchTerm = '';
  var lastQuery = '';
  var currentSearchIndex = 1;
  var lastQuerySiteId = '';
  var lastQueryCateogryId = '';
  var lastQueryBlogId = '';
  var searchAlternatives = false;
  var perPage = 8;
  var currentLang = document.documentElement.getAttribute('lang');
  window._userToken = '';
  var searchSpinner = '<div class="loading_spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
  document.addEventListener('DOMContentLoaded', function () {
    // loadJS('/wp-content/themes/mpg/js/bodyScrollLock.min.js', function (){}, document.body);
    initSearchAd();
    loadSearchData();
  });

  function initSearchAd() {
    if (getCookieMpgCookie("wasitgoodfuckbitch") === 'yes') {
      return;
    }

    var searchResultBox = document.querySelector('.search__drop.search_results_box');
    var searchAdBox = document.createElement('div');
    searchAdBox.setAttribute('class', 'search__ad');
    var searchAdStatus = searchResultBox.dataset['search_status'];
    var searchAdIcon = searchResultBox.dataset['search_icon'];
    var searchAdContent = searchResultBox.dataset['search_content'];
    var searchAdUrl = searchResultBox.dataset['search_url'];

    if (!searchAdStatus) {
      return;
    }

    searchAdBox.innerHTML = '<a class="search__ad__link" href="' + searchAdUrl + '" target="_blank">' + '<img class="search__ad-icon" src="' + searchAdIcon + '"/>' + '<span class="search__ad-content">' + searchAdContent + '</span>' + '</a><div class="search__ad-close">Ad &#x2715</div>';
    var searchResultsPanel = document.querySelector('[search-drop-desktop-js]');
    ;

    if (isMobileOrTablet && window.innerWidth < 769) {
      searchResultsPanel = document.querySelector('[search-drop-mobile-js]');
    }

    searchResultsPanel.appendChild(searchAdBox);
    searchAdBox.classList.remove('hide');
    var searchAdClose = document.querySelector('.search__ad-close');

    if (searchAdClose) {
      searchAdClose.addEventListener('click', function () {
        searchAdBox.classList.add('hide');
        createCookie("wasitgoodfuckbitch", 'yes', 1);
      });
    }
  }

  function initSearchKey() {
    var searchInput = document.querySelector('.searchinput');

    if (searchInput) {
      searchInput.addEventListener("keyup", function (event) {
        searchPage = 1;
        currentSearchIndex = 1;
        searchSites(searchInput.value);
      });
    }
  }

  function searchSites(term, searchPage) {
    var isPaged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isBlog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (window.innerWidth < 767) {
      perPage = 6;
    } else if (window.innerWidth < 1367 && window.innerWidth > 1024) {
      perPage = 8;
    } else if (isMobileOrTablet) {
      perPage = 9;
    }

    var jsonSites = jsonData.sites;
    var jsonSynonyms = jsonData.synonyms;
    searchPage = void 0 !== searchPage ? parseInt(searchPage) : 0;
    searchPage = parseInt(searchPage);

    if ((term = term.trim()).trim().length < 2) {
      hideSearch();
    } else {
      var searchTerms = [term];
      var foundSynonyms = jsonSynonyms.filter(function (_synonym, n) {
        if (_synonym.type == 'synonyms') {
          if (_synonym.synonyms.find(function (text) {
            return text === term;
          })) {
            return 1;
          }

          return 0;
        } else if (_synonym.type == 'one-way' && _synonym.search_term == term) {
          return true;
        }
      });
      searchedCategories = [];

      if (foundSynonyms && foundSynonyms.length) {
        var foundSynonym = foundSynonyms[0];

        if (foundSynonym.type == 'synonyms') {
          searchTerms = foundSynonym.synonyms;
        } else if (foundSynonym.type == 'one-way') {
          searchTerms = foundSynonym.alternatives;
        }
      }

      0 === (searchedSites = jsonSites.filter(function (t, n) {
        for (var _ti = 0; _ti < searchTerms.length; _ti++) {
          var _searchTerm = searchTerms[_ti];

          if (null !== new RegExp(_searchTerm, "i").exec(t.n) | null !== new RegExp(_searchTerm, "i").exec(t.tn)) {
            if (null == searchedCategories.find(function (e) {
              return e.ti == t.ti;
            })) {
              searchedCategories.push(t);
            }

            return true;
          }
        }

        return false; // if (null !== new RegExp(_searchTerm,"i").exec(t.n) | null !== new RegExp(_searchTerm,"i").exec(t.tn))
        //     return null == searchedCategories.find(e=>e.ti == t.ti) && searchedCategories.push(t),
        //         !0
      })).length ? ((searchedSites = jsonSites.filter(function (e) {
        return !0 === e.a;
      })).map(function (e) {
        null == searchedCategories.find(function (t) {
          return t.ti == e.ti;
        }) && searchedCategories.push(e);
      }), searchAlternatives = !0) : searchAlternatives = !1;
      0 === (searchPageCount = Math.ceil(searchedSites.length / perPage)) && (searchPageCount = 1);
      ;

      if (searchAlternatives) {
        searchedSites.sort(function (_siteA, _siteB) {
          return _siteA.ao - _siteB.ao;
        });
      } else {
        searchedSites.sort(function (_siteA, _siteB) {
          return _siteA.o - _siteB.o;
        });
      }

      searchedSites.sort(function (_siteA, _siteB) {
        var siteAIndex = _siteA.n.indexOf(term);

        var siteBIndex = _siteB.n.indexOf(term);

        if (siteAIndex > -1 && siteBIndex > -1) {
          return siteAIndex - siteBIndex;
        }

        return _siteA.o - _siteB.o;
      });
      lastQuery = term;
      searchTotalPageCount = searchedSites.length;
      renderSearchResults();

      if (searchPageCount > 1) {
        if (!isMobileOrTablet | window.innerWidth > 768) {
          Pagination.Init(document.querySelector('.search_pagination'), {
            size: searchPageCount,
            // pages size
            page: 1,
            // selected page
            step: 3,
            // pages before and after current
            onChange: pageSearchResults
          });
        } else {
          if (document.querySelectorAll('.search_load_more').length == 0) {
            document.querySelector('.search_pagination').innerHTML = '<div class="search__drop-footer"><a class="search__load search_load_more">' + searchSpinner + _t('load_more', 'Load More') + '</a></div>';
          }

          if (document.querySelector('.search_load_more')) {
            document.querySelector('.search_load_more').removeEventListener('click', onLoadMore);
          }

          document.querySelector('.search_load_more').addEventListener('click', onLoadMore, false);
        }
      } else {
        document.querySelector('.search_pagination').innerHTML = '';
      }
    }
  }

  function hideSearch() {}

  function searchBlogs(lang, index, term, searchPage) {
    var isPaged = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var isBlog = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    searchPage = typeof searchPage !== 'undefined' ? parseInt(searchPage) : 0;
    searchPage = parseInt(searchPage);
    term = term.trim();

    if (term.trim().length < 2) {
      return;
    }

    var perPage = 8;

    if (window.innerWidth < 767) {
      perPage = 6;
    } else if (isMobileOrTablet) {
      perPage = 9;
    }

    index.search(term, {
      page: searchPage,
      hitsPerPage: perPage,
      clickAnalytics: true
    }).then(function (content, err) {
      currentSearchIndex = +searchPage;
      lastQueryBlogId = content.queryID;
      searchedBlogs = content.hits;
      searchTotalPageCount = content.nbHits;
      searchPageCount = parseInt(content.nbPages);

      if (parseFloat(searchTotalPageCount / 8) < parseFloat(content.nbPages)) {
        --searchPageCount;
      }

      if (searchPageCount == 125) {
        searchPageCount = 124;
      }

      if (searchPageCount == 0) {
        searchPageCount = 1;
      }

      renderSearchResults(isPaged, content.query, isBlog);

      if (term != undefined && lastQuery != term) {
        lastQuery = term;

        if (searchPageCount > 1) {
          if (!isMobileOrTablet) {
            Pagination.Init(document.querySelector('.search_pagination'), {
              size: searchPageCount,
              // pages size
              page: 1,
              // selected page
              step: 3,
              // pages before and after current
              onChange: pageBlogResults
            });
          } else {
            if (document.querySelectorAll('.search_load_more').length == 0) {
              document.querySelector('.search_pagination').innerHTML = '<div class="search__drop-footer"><a class="search__load search_load_more">' + searchSpinner + _t('load_more', 'Load More') + '</a></div>';
            }

            if (document.querySelector('.search_load_more')) {
              document.querySelector('.search_load_more').removeEventListener('click', onLoadMore);
            }

            document.querySelector('.search_load_more').addEventListener('click', onLoadMore, false);
          }
        } else {
          document.querySelector('.search_pagination').innerHTML = '';
        }
      }
    });
  }

  function onLoadMore(e) {
    setInnerHeight();
    e.preventDefault();

    if (searchPageCount > +currentSearchIndex + 1) {
      var btSearchMore = document.querySelector('.search_load_more');

      if (btSearchMore) {
        btSearchMore.classList.add('loading');
      }

      searchPage = ++currentSearchIndex;
      var paginatedSites = getSearchSiteList();
      searchResultsSites.insertAdjacentHTML('beforeend', paginatedSites);
      initSearchCategoryScroll();
      initSearchItemTouch();
      setInnerHeight();

      if (btSearchMore) {
        btSearchMore.classList.remove('loading');
      } // disableScroll()


      document.body.classList.add('has_search');
    }
  }

  function renderSearchResults() {
    var isPaged = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var query = arguments.length > 1 ? arguments[1] : undefined;
    var isBlog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var htmlSites = getSearchSiteList();
    var htmlBlogs = getSearchBlogList();
    var htmlCategories = getSearchCategoryList();
    var htmlPagination = getPaginateSearch();

    if (htmlBlogs != '') {
      htmlSites = htmlBlogs;
    }

    query = lastQuery;

    if (!searchResultsPanel) {
      var search = ''; //  '<div class="search_results">';

      if (searchAlternatives | query == 'no_results' | typeof query === 'undefined' | searchTotalPageCount == 0) {
        if (isMobileOrTablet) {
          search += '<div class="search_results_top"><div class="top_results">' + _t('no-results', 'No Results') + '. <span>' + _t('alternatives', 'Alternatives') + ':</span></div><div class="search_results_tags">' + htmlCategories + '</div></div>';
        } else {
          search += '<div class="search_results_top"><div class="top_results">' + _t('no-results', 'No Results') + ' (0) <span> ' + _t('alternatives', 'Check Alternatives') + ':</span></div><div class="search_results_tags">' + htmlCategories + '</div></div>';
        }
      } else {
        if (isMobileOrTablet | searchTotalPageCount == 0) {
          search += '<div class="search_results_top"><div class="top_results">Results (' + searchTotalPageCount + ')</div><div class="search_results_tags">' + htmlCategories + '</div></div>';
        } else {
          search += '<div class="search_results_top"><div class="top_results">' + _t('top_results', 'Top Results') + ' (' + searchTotalPageCount + ')</div><div class="search_results_tags">' + htmlCategories + '</div></div>';
        }
      }

      search += '<div class="search_result_box">';
      search += '<div class="search_results_sites">' + htmlSites + '</div>';
      search += '<div class="search_pagination"></div>';
      search += '</div>'; // search += '</div>';

      if (isMobileOrTablet && window.innerWidth < 769) {
        searchResultsPanel = document.querySelector('[search-drop-mobile-js]');
      } else {
        searchResultsPanel = document.querySelector('[search-drop-desktop-js]');
      }

      var searchRoot = document.createElement("div");
      searchRoot.setAttribute('class', 'search_results');
      searchRoot.innerHTML = search;
      searchResultsPanel.appendChild(searchRoot);
      searchResultsCategory = document.querySelector('.search_results_tags');
      searchResultsSites = document.querySelector('.search_results_sites');
      searchResultCount = document.querySelector('.top_results span');
      searchPaginationContainer = document.querySelector('.search_pagination');
    } else {
      show(searchResultsPanel);

      if (!searchResultsCategory) {
        searchResultsCategory = document.querySelector('.search_results_tags');
      }

      if (!searchResultsSites) {
        searchResultsSites = document.querySelector('.search_results_sites');
      }

      if (!searchResultCount) {
        searchResultCount = document.querySelector('.top_results span');
      }

      if (!searchPaginationContainer) {
        searchPaginationContainer = document.querySelector('.search_pagination');
      }

      if (typeof query !== 'undefined') {
        if (searchAlternatives | query == 'no_results' | searchTotalPageCount == 0) {
          if (isMobileOrTablet) {
            document.querySelector('.top_results').innerHTML = _t('no-results', 'No Results') + '. <span>' + _t('alternatives', 'Alternatives') + ':</span>';
          } else {
            document.querySelector('.top_results').innerHTML = _t('no-results', 'No Results') + ' (0) <span>' + _t('alternatives', 'Check Alternatives') + ':</span>';
          }
        } else {
          if (isMobileOrTablet) {
            document.querySelector('.top_results').innerHTML = _t('top_results', 'Results') + ' (' + searchTotalPageCount + ')';
          } else {
            document.querySelector('.top_results').innerHTML = _t('top_results', 'Top Results') + ' (' + searchTotalPageCount + ')';
          } //searchResultCount.innerHTML = ''+searchTotalPageCount;

        }
      }

      searchResultsCategory.innerHTML = htmlCategories;

      if (isPaged) {
        if (isMobileOrTablet && window.innerWidth < 769) {
          searchResultsSites.insertAdjacentHTML('beforeend', htmlSites);
          var searchResultBox = document.querySelector('.search_result_box');
        } else {
          searchResultsSites.innerHTML = htmlSites;
        }
      } else {
        searchResultsSites.innerHTML = htmlSites;
      }
    }

    initSearchCategoryScroll();
    initSearchItemTouch();
    setInnerHeight();
    var btSearchMore = document.querySelector('.search_load_more');

    if (btSearchMore) {
      btSearchMore.classList.remove('loading');
    } // disableScroll()


    document.body.classList.add('has_search');
  }

  function pageSearchResults(_searchPage) {
    //searchPage = e.target.dataset.page;
    var _sp = _searchPage - 1;

    if (_sp < 0) {
      _sp = 0;
    }

    searchPage = _searchPage;
    renderSearchResults(true);
  }

  function pageBlogResults(searchPage) {
    searchPage--;

    if (searchPage < 0) {
      searchPage = 0;
    }

    searchBlogs(searchLang, algo_index_blogs, searchTerm, searchPage, true);
  }

  function initSearchPagination() {
    searchPaginationContainer.onclick = function (e) {
      if (e.target.tagName == 'A') {
        if (!isNaN(e.target.dataset.page)) {
          searchPage = e.target.dataset.page;
          searchSites(searchLang, algo_index_sites, searchTerm, searchPage, true);
        }
      }
    };
  }

  function getSearchCategoryList() {
    var categoryList = "";
    var position = 0;
    searchedCategories.map(function (category) {
      var catLogoHtml = '<i class="icon-category icon-sm ' + category.tt + ' icon-circled"></i>';
      var catName = '';

      if (jsonData.categories && jsonData.categories[category.ti]) {
        var _catItem = jsonData.categories[category.ti];
        catName = _catItem.title;
      }

      position++;
      var catLink = category.tl;

      if (currentLang != 'en') {
        catLink = '/' + currentLang + catLink;
      }

      categoryList += '<a class="search_category_item icPost' + category.ti + ' search-category-convert scroll_to_category" data-slug="category_title_' + category.ti + '" data-object-id="' + category.ti + '" data-position="' + position + '" href="' + catLink + '">' + catLogoHtml + '<span>' + catName + '</span>' + '</a>';
    });
    var siteCategories = [];

    if (searchedCategories.length == 0) {
      searchedSites.map(function (site) {
        if (site.category_data) {
          var siteCat = site.category_data[0];

          if (siteCat) {
            if (!siteCategories.includes(siteCat.id)) {
              siteCategories.push(siteCat.id);
              var catLogoHtml = '';
              var catName = '';

              if (jsonData.categories && jsonData.categories[siteCat.id]) {
                var _catItem = jsonData.categories[category.ti];
                var categoryLogo = _catItem.logo;
                catName = _catItem.title;

                if (categoryLogo) {
                  catLogoHtml = '<img src="/wp-content/uploads/' + categoryLogo + '"/>';
                }
              }

              position++;
              var catLink = siteCat.link;

              if (currentLang != 'en') {
                catLink = catLink.replace('www.mrporngeek.com/', 'www.mrporngeek.com/' + currentLang + '/');
              }

              categoryList += '<a class="search_category_item icPost' + siteCat.id + ' " data-slug="category_title_' + siteCat.id + '" data-object-id="' + siteCat.id + '" href="' + catLink + '">' + catLogoHtml + "<span>".concat(catName, "</span>") + '</a>';
            }
          }
        }
      });
    }

    return categoryList;
  }

  function getSearchSiteList() {
    var siteList = "";
    var position = 0;

    var _start = (searchPage - 1) * perPage;

    var _to = searchPage * perPage;

    var _sitesBatch = []; //console.log('listing from '+_start+' to '+_to+' total='+searchedSites.length+' -- '+perPage);

    for (var i = _start; i < _to; i++) {
      searchedSites[i] !== undefined && _sitesBatch.push(searchedSites[i]);
    }

    _sitesBatch.map(function (site) {
      var siteTag = '';
      var siteTagId = site.ti;
      var siteTagName = site.tn;
      var siteCategoryLink = site.tl;
      var siteCategoryId = site.ti;
      var siteIcon = site.ico;
      var fIcons = siteIcon.split(',');
      var fx = fIcons[0];
      var fy = fIcons[1]; //siteTagName = _tCategoryTitle(siteTagId, siteTagName);

      if (currentLang != 'en') {
        siteCategoryLink = '/' + currentLang + siteCategoryLink;
      } //let siteThumb = 'https://www.mrporngeek.com'+site.th;


      var siteThumb = site.th;
      var siteUrl = site.u;
      position++;
      var siteLink = site.l; // if(currentLang!='en'){
      //     siteLink = '/'+currentLang+ siteLink;
      // }

      if (isMobileOrTablet && window.innerWidth < 769) {
        siteList += '<div class="search_site_item">' + '<div  class="search_site_item_inner">' + '<a href="' + siteLink + '" class="title search-site-convert deIcon fx_' + fx + ' fy_' + fy + '" data-object-id="' + site.objectID + '" data-position="' + position + '">' + '<span>' + site.n + '</span>' + '</a>' + '<div class="thumb search_site_thumb"><img src="' + siteThumb + '"/></div>' + '<div class="site_category">' + '<a href="' + siteCategoryLink + '" class="search_category_link" data-object-id="' + siteCategoryId + '">' + siteTagName + '</a>' + '</div>' + '</div>' + '<div class="search_item_overlay">' + '<a href="' + siteLink + '" class="link_read search-site-convert" data-object-id="' + site.i + '" data-position="' + position + '">' + _t('read_review', 'Read Review') + ' <i class="icon-font icon-arrow-angle right_angle"></i></a>' + '<a href="' + siteUrl + '" class="link_site" target="_blank" rel="nofollow">' + _t('open_site', 'Open Site') + ' <i class="icon-font icon-out"></i></a>' + '</div>' + '</div>';
      } else {
        siteList += '<div class="search_site_item">' + '<div  class="search_site_item_inner" >' + '<a href="' + siteLink + '" data-object-id="' + site.i + '" data-position="' + position + '" class="title search-site-convert deIcon fx_' + fx + ' fy_' + fy + '">' + '<span>' + site.n + '</span>' + '</a>' + '<div class="thumb search_site_thumb"><img src="' + siteThumb + '"/></div>' + '<div class="site_category">' + '<a href="' + siteCategoryLink + '" class="search_category_link" data-object-id="' + siteCategoryId + '">' + siteTagName + '</a>' + '</div>' + '</div>' + '<div class="search_item_overlay">' + '<a href="' + siteLink + '" class="link_read search-site-convert" data-object-id="' + site.i + '" data-position="' + position + '">' + _t('read_review', 'Read Review') + ' <i class="icon-font icon-arrow-angle right_angle"></i></a>' + '<a href="' + siteUrl + '" class="link_site" target="_blank" rel="nofollow">' + _t('open_site', 'Open Site') + ' <i class="icon-font icon-out"></i></a>' + '</div>' + '</div>';
      }
    });

    return siteList;
  }

  function getSearchBlogList() {
    var blogList = "";
    var position = 0;
    searchedBlogs.map(function (blog) {
      position++;
      blogList += '<div class="search_site_item">' + '<a href="' + blog.permalink + '" class="search-blog-convert" data-object-id="' + blog.objectID + '" data-position="' + position + '">' + '<div class="title deIcon"><span>' + blog.post_title + '</span></div><div class="thumb"><img src="' + blog.thumbnail + '"/></div><div class="site_category">Blog</div>' + '</a>' + '</div>';
    });
    return blogList;
  }

  function initSearchCategoryScroll() {
    var isDown = false;
    var startX;
    var scrollLeft;
    searchResultsCategory.addEventListener('mousedown', function (e) {
      isDown = true;
      searchResultsCategory.classList.add('active');
      startX = e.pageX - searchResultsCategory.offsetLeft;
      scrollLeft = searchResultsCategory.scrollLeft;
    });
    searchResultsCategory.addEventListener('mouseleave', function () {
      isDown = false;
      searchResultsCategory.classList.remove('active');
    });
    searchResultsCategory.addEventListener('mouseup', function () {
      isDown = false;
      searchResultsCategory.classList.remove('active');
    });
    searchResultsCategory.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - searchResultsCategory.offsetLeft;
      var walk = (x - startX) * 3; //scroll-fast

      searchResultsCategory.scrollLeft = scrollLeft - walk;
    });
  }

  function getPaginateSearch() {
    var htmlPage = '';
    searchPage = parseInt(searchPage);

    if (isMobileOrTablet && window.innerWidth < 769) {
      var nextPage = parseInt(searchPage) + 1;
      htmlPage += '<div class="search__drop-footer">';
      htmlPage += '<a class="search__load" data-page="' + nextPage + '">' + _t('load_more', 'Load More') + '</a>';
      htmlPage += '</div>';
    } else {
      if (searchPage > 1) {
        htmlPage += '<a class="item prev" data-page="' + (searchPage - 1) + '"></a>';
      }

      var pageStart = searchPage < 3 ? 0 : searchPage - 2;
      var pageEnd = searchPage < 3 ? 6 : searchPage + 4;

      if (pageEnd > searchPageCount) {
        pageEnd = searchPageCount;
      }

      for (var page = pageStart; page < pageEnd; page++) {
        page = parseInt(page);

        if (searchPage < 3 && page < 6 || Math.abs(page - searchPage) < 3 || page == 0) {
          var pageLinkClass = page == searchPage ? 'active' : '';
          htmlPage += '<a class="item ' + pageLinkClass + '" data-page="' + page + '">' + (page + 1) + '</a>';
        }
      }

      if (searchPageCount > 6 | searchPage > 0) {
        htmlPage += '<a class="item next" data-page="' + (searchPage + 1) + '"></a>';
      }
    }

    return htmlPage;
  }

  function onSearchItemClick(ev) {
    if (isMobileOrTablet) {
      var touchedSearchItems = document.querySelectorAll('.search_site_item.touched');
      touchedSearchItems.forEach(function (item) {
        item.classList.remove('touched');
      });
      ev.classList.add('touched');
    }
  }

  document.addEventListener('click', function (event) {
    var clickedTarget = event.target;

    if (clickedTarget.closest('.search_site_item .thumb')) {
      onSearchItemClick(clickedTarget.closest('.search_site_item'));
    }
  });

  function initSearchItemTouch() {
    var searchSites = document.querySelectorAll('.search_site_item');

    for (var i = 0, len = searchSites.length; i < len; i++) {
      if (isMobileOrTablet) {
        searchSites[i].removeEventListener('touchstart', onSearchItemEnter);
        searchSites[i].addEventListener('touchstart', onSearchItemEnter, false);
      }
    }
  }

  function onSearchItemEnter(ev) {
    if (!ev.currentTarget.classList.contains('touched')) {
      var touchedSearchItems = document.querySelectorAll('.search_site_item.touched');
      touchedSearchItems.forEach(function (item) {
        item.classList.remove('touched');
      });

      if (ev.target.closest('.search_site_thumb')) {
        ev.target.closest('.search_site_thumb').parentNode.parentNode.classList.add('touched');
      }
    }
  }

  function _tCategoryTitle(catId, defaultTitle) {
    if (homeData) {
      var hC = homeData['categories'];

      if (hC[catId]) {
        return hC[catId]['title'];
      }
    }

    return defaultTitle;
  }

  var loadSearchData = function loadSearchData() {
    var url = '/wp-json/mpg/search/';
    currentLang = document.documentElement.getAttribute('lang');

    if (currentLang != 'en') {
      url = '/wp-json/mpg/search/?lang=' + currentLang;
    }

    fetch(url).then(function (res) {
      return res.json();
    }).then(function (out) {
      // searchData = out;
      var searchDataDiv = document.createElement('script');
      searchDataDiv.type = 'text/javascript';
      searchDataDiv.text = 'var jsonData=' + out;

      if (document.body && searchDataDiv) {
        document.body.appendChild(searchDataDiv);
      } // document.body.insertAdjacentHTML('beforeend', out);


      initSearchKey();
    })["catch"](function (err) {// console.log('didnt load home data');
    });
  };
}

initSearch();

var visitedSites = function visitedSites() {
  var getVisitedViews = function getVisitedViews(key) {
    var visitedSites = getCookieMpgCookie(key);
    return JSON.parse(visitedSites || '[]');
  };

  var setVisitedView = function setVisitedView(key, id) {
    if (!id) return;
    var views = getVisitedViews(key);
    if (views.includes(id)) return;
    views.push(+id);
    createCookie(key, JSON.stringify(views), 3);
  };

  var showVisitedViews = function showVisitedViews(key, elementSelector) {
    var visitedSites = getVisitedViews(key);
    var $els = document.querySelectorAll(elementSelector);
    $els.forEach(function ($el) {
      var id = +$el.getAttribute('data-id');
      visitedSites.includes(id) && $el.classList.add('visited');
    });
  };

  var initVisitedSites = function initVisitedSites(selector) {
    document.addEventListener('click', function (event) {
      var targetClasses = event.target.classList;

      if (targetClasses.contains('list__box__item-link') || targetClasses.contains('list__box__item-preview')) {
        event.target.parentNode.classList.add('visited');
        setVisitedView('visitedViews', event.target.dataset.id);
      } else if (targetClasses.contains('link_read') || targetClasses.contains('link_site') || targetClasses.contains('category_sites_item_title')) {
        console.log('targetClasses:', targetClasses);
        var siteItem = event.target.closest('.category_sites_item');
        siteItem.classList.add('visited');
        setVisitedView('visitedViews', siteItem.dataset.id);
      } else if (targetClasses.contains('category_sites_item_thumb') && targetClasses.contains('has_video')) {
        var _siteItem = event.target.closest('.category_sites_item');

        _siteItem.classList.add('visited');

        setVisitedView('visitedViews', _siteItem.dataset.id);
      } else if (targetClasses.contains('list__box-head-a') || targetClasses.contains('category-list-link')) {
        event.target.parentNode.classList.add('visited');
        setVisitedView('visitedTerms', event.target.dataset.id);
      } else if (targetClasses.contains('icon-category') || targetClasses.contains('category-list-title') || targetClasses.contains('category-list-icons') || targetClasses.contains('category-site-icon') || targetClasses.contains('category_item_caption') || targetClasses.contains('category_item_caption_title') || targetClasses.contains('category_item_inner') || targetClasses.contains('url_link_count_sites') || targetClasses.contains('category_item_inner-overlay') || targetClasses.contains('url_link_list_sites')) {
        var _siteItem2 = event.target.closest('.category-list-link');

        if (_siteItem2) {
          _siteItem2.classList.add('visited');

          setVisitedView('visitedTerms', _siteItem2.dataset.id);
        } else {
          _siteItem2 = event.target.closest('.category_item_link');

          if (_siteItem2) {
            _siteItem2.classList.add('visited');

            setVisitedView('visitedTerms', _siteItem2.dataset.id);
          }
        }
      } else if (targetClasses.contains('category_item_link')) {
        event.target.parentNode.classList.add('visited');
        setVisitedView('visitedTerms', event.target.dataset.id);
      } // list__box__item-preview

    });
    showVisitedViews('visitedViews', selector);
    showVisitedViews('visitedTerms', selector);
  };

  return {
    initVisitedSites: initVisitedSites,
    setVisitedView: setVisitedView,
    getVisitedViews: getVisitedViews
  };
};
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

      if (_ev.classList.contains('search_category_item')) {
        if (document.body.classList.contains('home') && !document.body.classList.contains('is-mobile')) {
          scrollToCategoryOnHome(ev, _ev);
          hide(document.querySelector('[search-drop-js]'));
        }
      } else if (_ev.classList.contains('js-closeAgeModal')) {
        verifyAge();
      } else if (_ev.classList.contains('acceptCookie')) {
        verifyCookie();
      } else if (_ev.closest('[favorites-toggle-js]')) {
        onSiteBoxFavourite(_ev.closest('[favorites-toggle-js]'));
      } else if (_ev.closest('[un-favorites-js]')) {
        removeFavourite(_ev.closest('[un-favorites-js]'));
      } else if (_ev.closest('[collapse-toggle-js]')) {
        onSortToggle(_ev.closest('[collapse-toggle-js]'));
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

  function onSiteBoxFavourite(el) {
    if (!isLoggedUser) {
      renderLoginForm();
      return;
    }

    var elID = el.dataset.id,
        elParent = el.closest('.list__box-wrapper');
    el.classList.toggle('is-active');
    addToFavourites(elID);
  }

  function initGotoTop() {
    var scrollOffset = 0;
    var bodyClasses = document.body.classList;

    if (bodyClasses.contains('single-sites') || bodyClasses.contains('category') || bodyClasses.contains('page-template-page-categories') || bodyClasses.contains('tax-category-tag')) {
      initReviewScroll();
    } else if (bodyClasses.contains('home')) {
      initHomeScroll();
    } else if (bodyClasses.contains('single-blog')) {
      window.onscroll = function () {
        onBlogScroll();
      };
    }

    if (bodyClasses.contains('show_2nd_header_1') && bodyClasses.contains('single-sites')) {
      scrollOffset = 85;

      if (isMobileDevice) {
        scrollOffset = 120;
      }
    } else if (isMobileDevice) {
      scrollOffset = 85;
    }
  }

  var initHomeScroll = function initHomeScroll() {
    var headerHeights = {
      get mobileHeaderHeight() {
        return document.querySelector("#header").offsetHeight;
      }

    };
    var topOffset = isMobileDevice ? headerHeights.mobileHeaderHeight : 0;
    var homeSections = [];

    if (isMobileDevice) {
      homeSections = document.querySelectorAll('.category_col');
    } else {
      var items = Array.from(document.querySelectorAll('.category_col.column_1'));
      homeSections = items.sort(function (a, b) {
        return Number(a.dataset.row) - Number(b.dataset.row);
      });
    }

    var scroller = initScrollSpyButton({
      sections: homeSections
    });

    var handleResize = function handleResize() {
      return initResize({
        breakpoints: 992,
        // Breakpoint for mobile vs desktop
        onChange: function onChange(_ref3) {
          var isLessOrEqual = _ref3.isLessOrEqual;
          // const topOffset = getTopOffset(isLessOrEqual); // Determine top offset
          scroller.setTopOffset(topOffset + 5); // Set the new top offset in scroll spy
        }
      });
    };

    handleResize();
  };

  var initReviewScroll = function initReviewScroll() {
    var headerHeights = {
      get mobileHeaderHeight() {
        return document.querySelector("#header").offsetHeight;
      },

      get topBarHeight() {
        var reviewHeader = document.querySelector(".review_header");
        return reviewHeader ? reviewHeader.offsetHeight : 0;
      }

    };
    var topOffset = isMobileDevice ? headerHeights.mobileHeaderHeight : headerHeights.topBarHeight;
    var scroller = initScrollSpyButton({
      sections: document.querySelectorAll("[data-section]")
    });

    var handleResize = function handleResize() {
      return initResize({
        breakpoints: 992,
        // Breakpoint for mobile vs desktop
        onChange: function onChange(_ref4) {
          var isLessOrEqual = _ref4.isLessOrEqual;
          // const topOffset = getTopOffset(isLessOrEqual); // Determine top offset
          scroller.setTopOffset(topOffset); // Set the new top offset in scroll spy
        }
      });
    };

    handleResize();
  };

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

  var lazyLoadImages = function lazyLoadImages() {
    document.querySelectorAll('.lazyload').forEach(function (img) {
      img.classList.add('lazyloaded');
    });
  };

  var pukeCheck = function pukeCheck() {
    if (getCookieMpgCookie("is_adb_closed") === '1') {
      return;
    }

    var detector = new AdBlockDetector({
      onDetected: function onDetected() {
        console.log("Ad Blocker is ON!"); // Optional: redirect or hide certain features
      },
      onNotDetected: function onNotDetected() {
        console.log("Ad Blocker is OFF.");
      },
      onClose: function onClose() {
        createCookie("is_adb_closed", "1", 1);
      }
    });
    detector.run();
  };
  /**
   * end MAIN CALLBACK
   * ===================================
   */


  var initFooterTextBehaviour = function initFooterTextBehaviour() {
    document.querySelector('.btn_show_more-text').addEventListener('click', function (evt) {
      evt.preventDefault();
      document.querySelector('.footer_description').classList.add('show_all');
    });
  };
  /**
   * @name initNative
   *
   * @description Init all method
   */


  var initNative = function initNative() {
    // default
    initPreventBehavior(); // ==========================================

    currentLang = document.documentElement.getAttribute('lang'); // lib

    initHamburger(); // ==========================================
    // callback

    detectDevice();
    bodyClick();
    loadTranslations();
    initHome();
    renderFavourites();
    viewFavoritesToggle();
    goTop = document.querySelector('.go-top');
    initGotoTop();
    lazyLoadImages();
    search();
    showThumbInfoOnHover();
    var bodyClasses = document.body.classList;

    if (bodyClasses.contains('home')) {
      getLikesAndDislikes(); // initHomeTooltip()

      if (isLoggedUser != '') {
        renderFavouriteButtons();
      }

      visitedSites().initVisitedSites('.list__box__item');
      initFooterTextBehaviour();
    } else if (bodyClasses.contains('single-blog')) {
      isSingleBlog = true;
      blogContent = document.querySelector('.blog_content');

      if (blogContent) {
        blogContentHeight = blogContent.getBoundingClientRect().height - window.innerHeight - 10;
        blogProgressBar = document.querySelector('.blog_progress');
        onBlogScroll();
      }
    } else if (bodyClasses.contains('category')) {
      visitedSites().initVisitedSites('.category_sites_item, .category_item_link');
    } else if (bodyClasses.contains('single-sites')) {
      visitedSites().initVisitedSites('.category_sites_item, .category_item_link, .category-list-link, .cat_item');
    } else if (bodyClasses.contains('page-template-page-categories')) {
      visitedSites().initVisitedSites('.category_item_link, .category-list-link');
    }

    initWebWorker();
    initCategoryPage();
    showAgeVerification();
    showAcceptCookie();

    if (bodyClasses.contains('page-template-page-categories')) {
      initCategoriesPage();
    } // new CategoryPopup()


    if (!isMobileOrTablet) {
      pukeCheck();
    }
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