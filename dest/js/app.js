"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @name initBarbaJSTransition
 *
 * @description Barba.js - pjax transition pages.
 */
function initBarbaJSTransition() {
  var HideShowTransition = Barba.BaseTransition.extend({
    start: function start() {
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       */
      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
    },
    fadeOut: function fadeOut() {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */
      return $(this.oldContainer).animate({
        opacity: 0
      }).promise();
    },
    fadeIn: function fadeIn() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */
      var _this = this,
          $el = $(this.newContainer);

      $(this.oldContainer).hide();
      $el.css({
        visibility: 'visible',
        opacity: 0
      });
      $el.animate({
        opacity: 1
      }, 300, function () {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */
        _this.done();
      });
    }
  });

  Barba.Pjax.getTransition = function () {
    return HideShowTransition;
  };

  Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, newPageRawHTML) {});
  Barba.Pjax.start();
  Barba.Prefetch.init();
}
/**
 *
 * @type {{init(): void, change(): void, chooseVal(*): void, focusElem(*): void, blurElem(*): void}}
 * @private
 */


var _customSelect = {
  init: function init() {
    var _select = document.querySelectorAll('select');

    var _iterator = _createForOfIteratorHelper(_select),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var elem = _step.value;
        elem.previousElementSibling.innerHTML = elem.options[elem.selectedIndex].text;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  change: function change() {
    var _select = document.querySelectorAll('select');

    var _iterator2 = _createForOfIteratorHelper(_select),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var elem = _step2.value;
        var _selectedOption = elem.options[elem.selectedIndex],
            _selectedValue = _selectedOption.value,
            _selectedText = _selectedOption.text;

        if (_selectedValue !== '') {
          this.chooseVal(elem);
        }

        elem.previousElementSibling.innerHTML = _selectedText;
        this.blurElem(elem);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  },
  chooseVal: function chooseVal(elem) {
    elem.closest('.c-form__select-wrapper').classList.add('is-choose');
  },
  focusElem: function focusElem(elem) {
    elem.closest('.c-form__select-wrapper').classList.add('is-focus');
  },
  blurElem: function blurElem(elem) {
    elem.closest('.c-form__select-wrapper').classList.remove('is-focus');
  }
};
/**
 * @name initCustomSelect
 *
 * @description
 */

var initCustomSelect = function initCustomSelect() {
  var _select = document.querySelectorAll('select');

  _customSelect.init();

  var _iterator3 = _createForOfIteratorHelper(_select),
      _step3;

  try {
    var _loop = function _loop() {
      var elem = _step3.value;
      elem.addEventListener('change', function () {
        _customSelect.change(elem);
      });
      elem.addEventListener('focus', function () {
        _customSelect.focusElem(elem);
      });
      elem.addEventListener('click', function () {
        _customSelect.focusElem(elem);
      });
      elem.addEventListener('blur', function () {
        _customSelect.blurElem(elem);
      });
    };

    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
};
/**
 * @name initGetBrowserNameVersion
 * @description
 */


function initGetBrowserNameVersion() {
  var ua = navigator.userAgent,
      tem,
      M = ua.match(/(opera|edge|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {
      name: 'IE',
      version: tem[1] || ''
    };
  }

  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/);

    if (tem != null) {
      return {
        name: 'Opera',
        version: tem[1]
      };
    }

    tem = ua.match(/\edge\/(\d+)/i);

    if (tem != null) {
      return {
        name: 'Edge',
        version: tem[1]
      };
    }
  }

  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }

  return {
    name: M[0],
    version: M[1]
  };
}
/**
 * @name initHeaderFixed
 *
 * @description Fixing the site header in the scrolling page.
 */


var initHeaderFixed = function initHeaderFixed() {
  var countScroll = $(window).scrollTop(),
      headerElement = $('.header');

  if (countScroll > 10) {
    headerElement.addClass("header--fixed");
  } else {
    headerElement.removeClass("header--fixed");
  }
};
/**
 * @description Document DOM ready.
 */


$(document).ready(function (ev) {
  /**
   *
   * @type {*|jQuery|HTMLElement}
   * @private
   */
  var _document = $(document),
      _window = $(window);
  /*
  * =============================================
  * CALLBACK :: start
  * ============================================= */

  /*
  * CALLBACK :: end
  * ============================================= */

  /**
   * @description Init all method
   */


  var initJquery = function initJquery() {
    // default
    initWebFontLoader();
    initPreventBehavior();
    initSvg4everybody(); // ==========================================
    // lib
    // ==========================================
    // callback
    // ==========================================
  };

  initJquery();
});
/**
 * @description Window on load.
 */

$(window).on("load", function (ev) {});
/**
 * @description Window on resize.
 */

$(window).on("resize", function (ev) {});
/**
 * @description Window on scroll.
 */

$(window).on("scroll", function (ev) {});
/**
 * @description Window on load.
 */

window.addEventListener('load', function (ev) {});
/**
 * @description Window on resize.
 */

window.addEventListener('resize', function (ev) {});
/**
 * @description Window on scroll.
 */

window.addEventListener('scroll', function (ev) {});
/**
 * @name initInputFocus
 *
 * @description
 */

var initInputFocus = function initInputFocus() {
  var inputElem = $("[input-js]");
  /**
   * @description
   */

  inputElem.on("focus", function (e) {
    var curElem = $(e.target);
    curElem.closest(".form__field").addClass("is-focus");
  });
  /**
   * @description
   */

  inputElem.on("blur", function (e) {
    var curElem = $(e.target),
        curElemVal = curElem.val().trim();

    if (curElemVal === "") {
      curElem.closest(".form__field").removeClass("is-focus");
    }
  });
};
/**
 * @name initPopups
 *
 * @description
 */


var initPopups = function initPopups() {
  $('[popup-js]').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'is-show',
    callbacks: {
      beforeOpen: function beforeOpen() {
        this.st.mainClass = this.st.el.attr('data-effect');
      },
      close: function close() {}
    }
  });
};
/**
 * @name initSelectric
 *
 * @description
 */


var initSelectric = function initSelectric() {
  var selectName = $("[selectric-js]");
  selectName.selectric({
    responsive: true,
    inheritOriginalWidth: false,
    disableOnMobile: false
  });
};
/**
 * @name initSmoothScroll
 *
 * @description Smooth transition to anchors to the block.
 */


var initSmoothScroll = function initSmoothScroll() {
  var btnName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "[anchor-js]";
  var animateSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  $(btnName).on("click", function (e) {
    var linkHref = $(e.currentTarget).attr('href'),
        headerHeight = $(".header").outerHeight() || 0,
        topHeightOffset = $(linkHref).offset().top - headerHeight;
    $('body, html').animate({
      scrollTop: topHeightOffset
    }, animateSpeed);
  });
};
/**
 * @name initStellar
 * @description Stellar.js is a jQuery plugin that provides parallax scrolling effects to any scrolling element.
 *
 * Parallax Elements
 * - data-stellar-ratio="1"
 *
 * Parallax Backgrounds
 * - data-stellar-background-ratio="1"
 */


var initStellar = function initStellar() {
  if ($("[parallax-js]").length) {
    $(function () {
      $.stellar({
        // Set scrolling to be in either one or both directions
        horizontalScrolling: false,
        verticalScrolling: true,
        // Set the global alignment offsets
        horizontalOffset: 0,
        verticalOffset: 0,
        // Refreshes parallax content on window load and resize
        responsive: false,
        // Select which property is used to calculate scroll.
        // Choose 'scroll', 'position', 'margin' or 'transform',
        // or write your own 'scrollProperty' plugin.
        scrollProperty: 'scroll',
        // Select which property is used to position elements.
        // Choose between 'position' or 'transform',
        // or write your own 'positionProperty' plugin.
        positionProperty: 'position',
        // Enable or disable the two types of parallax
        parallaxBackgrounds: true,
        parallaxElements: true,
        // Hide parallax elements that move outside the viewport
        hideDistantElements: false,
        // Customise how elements are shown and hidden
        hideElement: function hideElement($elem) {
          $elem.hide();
        },
        showElement: function showElement($elem) {
          $elem.show();
        }
      });
    });
  }
};
/**
 * @name initSvg4everybody
 *
 * @description SVG for Everybody adds external spritemaps support to otherwise SVG-capable browsers.
 */


var initSvg4everybody = function initSvg4everybody() {
  svg4everybody();
};
/**
 * @name initValidation
 *
 * @description
 */


var initValidation = function initValidation() {
  /**
   *
   * @param form
   */
  var validationSubmitHandler = function validationSubmitHandler(form) {
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function success(response) {
        var data = $.parseJSON(response);

        if (data.status === 'success') {// do something
        } else {// do something
          }
      }
    });
  };
  /**
   *
   * @param error
   * @param element
   */


  var validationErrorPlacement = function validationErrorPlacement(error, element) {
    error.appendTo(element.closest('.c-form__field'));
  };
  /**
   *
   * @param element
   */


  var validationHighlight = function validationHighlight(element) {
    $(element).closest('.c-form__field').addClass('is-error');
  };
  /**
   *
   * @param element
   */


  var validationUnhighlight = function validationUnhighlight(element) {
    $(element).closest('.c-form__field').removeClass('is-error');
  };
  /**
   * @description
   */


  $("#formName").validate({
    submitHandler: validationSubmitHandler,
    errorPlacement: validationErrorPlacement,
    highlight: validationHighlight,
    unhighlight: validationUnhighlight,
    rules: {
      name: 'required',
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 8
      },
      message: 'required',
      select: 'required',
      radio: 'required',
      checkbox: 'required'
    }
  });
};
/**
 * @name scrollAnimation
 *
 * @param elem
 * @param el
 *
 * @description
 */


var scrollAnimation = function scrollAnimation(elem, el) {
  $(elem).css({
    'animation-name': $(el).data('animation-name') ? $(el).data('animation-name') + ", fadeIn" : 'slideInUp, fadeIn',
    'animation-delay': $(el).data('animation-delay') || '0s',
    'animation-duration': $(el).data('animation-duration') || '1s'
  });
};
/**
 * @name initViewPortChecker
 *
 * @param className {String}              - default is `viewport-hide-js`
 * @param classNameToAdd {String}         - default is `viewport-show-js animated`
 * @param offsetVal {Number}              - default is 100
 * @param callbackFunctionName {Object}   - default is `scrollAnimation()`
 *
 * @description Detects if an element is in the viewport and adds a class to it
 *
 * You can to add some attribute:
 * - <div data-vp-add-class="random"></div>                       > classToAdd
 * - <div data-vp-remove-class="random"></div>                    > classToRemove
 * - <div data-vp-remove-after-animation="true|false"></div>      > Removes added classes after CSS3 animation has completed
 * - <div data-vp-offset="[100 OR 10%]"></div>                    > offset
 * - <div data-vp-repeat="true"></div>                            > repeat
 * - <div data-vp-scrollHorizontal="false"></div>                 > scrollHorizontal
 */


var initViewPortChecker = function initViewPortChecker() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "viewport-hide-js";
  var classNameToAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "viewport-show-js animated";
  var offsetVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var callbackFunctionName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : scrollAnimation;
  $("." + className).not(".full-visible").each(function (idx, el) {
    $(el).viewportChecker({
      classToAdd: classNameToAdd,
      classToAddForFullView: 'full-visible',
      classToRemove: className,
      removeClassAfterAnimation: true,
      offset: offsetVal,
      repeat: false,
      callbackFunction: function callbackFunction(elem, action) {
        callbackFunctionName(elem, el);
      }
    });
  });
};
/**
 * @name initWebFontLoader
 *
 * @description Loading fonts regardless of the source, then adds a standard set of events you may use to control the loading experience... for more details => https://github.com/typekit/fvd
 */


var initWebFontLoader = function initWebFontLoader() {
  /**
    * @description
   */
  setTimeout(function () {
    WebFont.load({
      google: {
        families: ['Roboto:100,300,400,500,700,900']
      }
    });
  }, 300);
  /**
    * @description
   */
  // const WebFontConfig = {
  //   custom: {
  //     families: [
  //       'Lato:n1,n3,n4,n5,n6,n7,n9'
  //     ]
  //   }
  // };
};

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

var currentBannerTimeout;
var lastActiveHoverBox;
var isMouseDown = false;
var _greenBarLeft = 0;
var greenBarWidth;
var isAnimationStarted = false;
var pauseHoverAnimation = false;
var swiperClientWidth = null;
var swiperClientHeight = null;
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
var trigger;
var isClosing = false; // Select DOM

var modalTriggersDom = document.querySelectorAll('.modal-trigger');
var dimmer = document.querySelector('.overlay');
var modalContainer = document.querySelector('.modal-container');
var modal = document.querySelector('.modal');
var homeMainContainer = document.querySelector('.c-grid--inner');
var isPopVisible = false;
var popover = document.querySelector('.popover');
var popoverOuter = document.querySelector('.popover-outer');
var popoverTitle;
var popoverLink;
var popoverTagline;
var categoryContainers = [];

function openSlideModal(e, siteId) {
  if (!e.target) {
    return;
  }

  trigger = document.querySelector('.swiper-slide[data-siteid="' + siteId + '"]');

  if (!trigger) {
    return true;
  }

  if (wInnerWidth > 767) {} else {
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
  } else {}
}

function initHomeTooltip() {
  categoryContainers = document.querySelectorAll('.list__box-list');

  if (!window.mobileAndTabletcheck()) {
    if (homeGridInner) {
      categoryContainers.forEach(function (_container) {
        _container.onmouseleave = function (e) {
          if (popover.style.display == 'block') {
            popover.style.display = 'none';
          }
        };
      });

      homeGridInner.onmouseover = function (e) {
        var hoverTarget = e.target;

        if (hoverTarget.matches('.list__box__item') | hoverTarget.parents('.list__box__item').length > 0) {
          if (hoverTarget.parents('.list__box__item').length > 0) {
            hoverTarget = hoverTarget.parents('.list__box__item')[0];
          }

          var siteId = hoverTarget.dataset.id;
          var siteCategory = hoverTarget.dataset.category;
          var siteIndex = hoverTarget.dataset.index;

          if (homeData && homeData.categories !== undefined) {
            var siteData = homeData.categories[siteCategory].sites[siteIndex];

            if (siteData) {
              var siteName = siteData.name;
              var siteTagline = siteData.tagline;
              siteTagline = siteTagline.replace("\\", "").replace("\\", "");
              var siteReviewLink = siteData.review_link;
              var siteFx = siteData.f_x;
              var siteFy = siteData.f_y;
              var wallDimensions = homeMainContainer.getBoundingClientRect();
              var wallX = wallDimensions.left;
              var wallY = wallDimensions.top;
              var hoverTargetBounds = hoverTarget.getBoundingClientRect();
              var popW = hoverTargetBounds.width - 7;
              var popY = hoverTargetBounds.top - wallY - 10;
              var popX = hoverTargetBounds.left + 7 - wallX;
              popover.style.display = 'block';
              popover.style.top = popY + 'px';
              popover.style.left = popX + 'px';
              popover.style.width = popW + 'px';

              if (!popoverOuter) {
                popover.innerHTML = '<div class="popover-outer">\n' + '            <div class="popover-title deIcon">\n' + '                    <a class="popover-title-a link direct_1 step_1_" target="_blank" href=""></a>\n' + '            </div>\n' + '            <div class="popover-content"></div>\n' + '        </div>';
                popoverTitle = popover.querySelector('.popover-title');
                popoverLink = popover.querySelector('.popover-title-a');
                popoverTagline = popover.querySelector('.popover-content');
              }

              popoverLink.innerHTML = siteName;
              popoverTitle.className = 'popover-title deIcon  fx_' + siteFx + ' fy_' + siteFy + ' fi' + siteId;
              popoverLink.setAttribute('href', siteReviewLink);
              popoverTagline.innerHTML = siteTagline;
              isPopVisible = true;
            }
          }
        } else {
          if (isPopVisible) {
            popover.style.display = 'none';
          }
        }
      };
    }
  }
}

function renderFavouriteButtons() {
  var sitePreviewItems = document.querySelectorAll('.list__box__item-preview');
  sitePreviewItems.forEach(function (linkPreview) {
    var favI = '<i class="list__box__item-fav icon-star-fill" data-id="' + linkPreview.dataset.id + '" favorites-toggle-js></i>';
    linkPreview.insertAdjacentHTML('beforebegin', favI);
  });
}

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
        scrollGreenBar.setAttribute('style', 'background-color: #d5f34a;');
        setTimeout(function () {
          setTimeout(function () {
            scrollGreenBar.setAttribute('style', 'background-color: rgb(25, 26, 40);');
            setTimeout(function () {
              pauseHoverAnimation = false;
            }, 1000);
          }, 1000);
        }, 1300);
      }
    }
  }
}

function onRatingClick() {
  previewModal.querySelector('.list__rating').classList.add('active');
  setTimeout(function () {
    previewModal.querySelector('.list__rating').classList.remove('active');
  }, 2000);
}

var tOut = null;
var homeGridInner = document.querySelector(".c-grid--inner");

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

  var _isActive = document.querySelector('.list__box.is-active');

  if (_isActive) {
    _isActive.classList.remove('is-active');
  }

  var _isOpen = document.querySelector('.list__specification.is-open');

  if (_isOpen && !isSkip) {
    _isOpen.classList.remove('is-open');

    document.body.classList.remove('is_open');
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