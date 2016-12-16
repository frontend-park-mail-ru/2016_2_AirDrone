webpackJsonp([0],{

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = __webpack_require__(141);

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Класс роутера */
var Router = function () {
	/**
  * Создаёт новый роутер или возвращает уже созданный инстанс
  */
	function Router() {
		_classCallCheck(this, Router);

		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.activeRoute = null;

		this.history = window.history;

		Router.__instance = this;
	}

	/**
  * Добавляет новый Route в роутер
  * @param {string} pathname - Шаблон пути
  * @param {View} view - Класс конкретной View
  * @param {Object} [options={}] - Дополнительные параметры, которые будут переданы во view при её создании и инициализации
  * @returns {Router}
  */


	_createClass(Router, [{
		key: 'addRoute',
		value: function addRoute(pathname, view) {
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			var route = new _route2.default(pathname, view, options);
			route.setRouter(this);
			this.routes.push(route);
			return this;
		}

		/**
   * Запускает роутер и переходит по текущему пути в приложении
   * @param {Object} [state={}] - Объект state, который передаётся в первый вызов onroute
   */

	}, {
		key: 'start',
		value: function start() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			window.onpopstate = function (event) {
				var state = event.state;
				var pathname = window.location.pathname;
				this.onroute(pathname, state);
			}.bind(this);

			var pathname = window.location.pathname;
			this.onroute(pathname, state);
		}

		/**
   * Функция, вызываемая при переходе на новый роут в приложении
   * @param {string} pathname - Путь, по которому происходит переход
   * @param {Object} [state={}] - Объект state, который передаётся в вызов метода navigate
   */

	}, {
		key: 'onroute',
		value: function onroute(pathname) {
			var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var route = this.routes.find(function (route) {
				return route.match(pathname);
			});
			if (!route) {
				return;
			}

			if (this.activeRoute) {
				this.activeRoute.leave();
			}

			this.activeRoute = route;
			this.activeRoute.navigate(pathname, state);
		}

		/**
   * Программный переход на новый путь
   * @param {string} pathname - Путь
   * @param {Object} [state={}] - Объект state, который передаётся в вызов history.pushState
   */

	}, {
		key: 'go',
		value: function go(pathname) {
			var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			if (window.location.pathname === pathname) {
				return;
			}
			this.history.pushState(state, '', pathname);
			this.onroute(pathname, state);
		}

		/**
   * Позволяет установить свою собственную реализацию History API
   * @param {Object} history - должен предоставлять реализацию методов back(), forward(), pushState()
   */

	}, {
		key: 'setHistory',
		value: function setHistory(history) {
			this.history = history;
		}

		/**
   * Возврат на один шаг назад в истории браузера
   */

	}, {
		key: 'back',
		value: function back() {
			this.history.back();
		}

		/**
   * Переход на один шаг вперёд в истории браузера
   */

	}, {
		key: 'forward',
		value: function forward() {
			this.history.forward();
		}
	}]);

	return Router;
}();

exports.default = Router;

/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(46);

var _view2 = _interopRequireDefault(_view);

var _gameTmpl = __webpack_require__(128);

var _gameTmpl2 = _interopRequireDefault(_gameTmpl);

var _GameModel = __webpack_require__(138);

var _GameModel2 = _interopRequireDefault(_GameModel);

var _canvas = __webpack_require__(133);

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fetchRetry = __webpack_require__(325);
var cookie = __webpack_require__(31);

var GameView = function (_View) {
    _inherits(GameView, _View);

    function GameView() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, GameView);

        var _this = _possibleConstructorReturn(this, (GameView.__proto__ || Object.getPrototypeOf(GameView)).call(this, { element: '.js-game', bodyClass: 'body-game' }));

        _this._game = new _GameModel2.default();
        return _this;
    }

    _createClass(GameView, [{
        key: 'render',
        value: function render() {
            if (!cookie.get('airdroneEmail')) {
                this.router.go('/');
                return;
            }
            this._el.innerHTML = (0, _gameTmpl2.default)({ source: this._game.getVideo() });
            // check the connection:
            fetchRetry('https://air-drone.herokuapp.com/user', {
                retries: 10,
                retryDelay: 500
            }).then(function (response) {
                document.querySelector('.js-noconnection').hidden = true;
            }).catch(function () {
                document.querySelector('.js-noconnection').hidden = false;
                fetchRetry('https://air-drone.herokuapp.com/user', {
                    retries: 100,
                    retryDelay: 1000
                }).then(function (response) {
                    document.querySelector('.js-noconnection').hidden = true;
                });
            });
            (0, _canvas2.default)();
        }
    }]);

    return GameView;
}(_view2.default);

exports.default = GameView;

/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(46);

var _view2 = _interopRequireDefault(_view);

var _UserModel = __webpack_require__(90);

var _UserModel2 = _interopRequireDefault(_UserModel);

var _loginTmpl = __webpack_require__(129);

var _loginTmpl2 = _interopRequireDefault(_loginTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cookie = __webpack_require__(31);

var LoginView = function (_View) {
    _inherits(LoginView, _View);

    function LoginView() {
        _classCallCheck(this, LoginView);

        return _possibleConstructorReturn(this, (LoginView.__proto__ || Object.getPrototypeOf(LoginView)).call(this, { element: '.js-login', bodyClass: 'body-login' }));
    }

    _createClass(LoginView, [{
        key: 'render',
        value: function render() {
            if (cookie.get('airdroneEmail')) {
                this.router.go('/rooms');
                return;
            }
            this._el.innerHTML = (0, _loginTmpl2.default)(this.data);
            this._form = this._el.querySelector('.js-login-form');
            this._form.onsubmit = function () {
                this.login();return false;
            }.bind(this);
            this._form.children.email.onblur = function () {
                this.validateEmail();
            }.bind(this);
            this._form.children.password.onblur = function () {
                this.validatePassword();
            }.bind(this);
            this._form.children.password.onkeyup = function (e) {
                if (e.keyCode !== 8 && e.keyCode !== 9) {
                    this.validatePassword();
                }
            }.bind(this);
            this._form.children.registration.onclick = function () {
                this.router.go('/registration');
            }.bind(this);
            this.emailError = this._form.children.emailError;
            this.passwordError = this._form.children.passwordError;
        }
    }, {
        key: 'validateEmail',
        value: function validateEmail() {
            if (this._form.elements.email.value.search(/.@./) === -1) {
                this.emailError.hidden = false;
                this.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail!';
                return false;
            }
            this.emailError.hidden = true;
            this.emailError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword() {
            if (this._form.elements.password.value.length < 1) {
                this.passwordError.hidden = false;
                this.passwordError.innerHTML = 'Пожалуйста, введите пароль!';
                return false;
            }
            this.passwordError.hidden = true;
            this.passwordError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validate',
        value: function validate() {
            return this.validateEmail() && this.validatePassword();
        }
    }, {
        key: 'login',
        value: function login() {
            if (!this.validate()) {
                return;
            }
            var user = new _UserModel2.default({
                email: this._form.elements.email.value,
                password: this._form.elements.password.value
            });

            var response = user.login();
            this._form.children.emailError.innerHTML = user.getEmailError();
            this._form.children.passwordError.innerHTML = user.getPasswordError();
            this._form.children.emailError.hidden = this._form.children.emailError.innerHTML ? false : true;
            this._form.children.passwordError.hidden = this._form.children.passwordError.innerHTML ? false : true;
            if (response.status == 200) {
                this.router.go('/rooms');
            }
        }
    }]);

    return LoginView;
}(_view2.default);

exports.default = LoginView;

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(46);

var _view2 = _interopRequireDefault(_view);

var _UserModel = __webpack_require__(90);

var _UserModel2 = _interopRequireDefault(_UserModel);

var _registrationTmpl = __webpack_require__(130);

var _registrationTmpl2 = _interopRequireDefault(_registrationTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cookie = __webpack_require__(31);

var RegistrationView = function (_View) {
    _inherits(RegistrationView, _View);

    function RegistrationView() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, RegistrationView);

        return _possibleConstructorReturn(this, (RegistrationView.__proto__ || Object.getPrototypeOf(RegistrationView)).call(this, { element: '.js-registration', bodyClass: 'body-registration' }));
    }

    _createClass(RegistrationView, [{
        key: 'render',
        value: function render() {
            if (cookie.get('airdroneEmail')) {
                this.router.go('/rooms');
                return;
            }
            this._el.innerHTML = (0, _registrationTmpl2.default)(this.data);
            this._form = this._el.querySelector('.js-registration-form');
            this._form.onsubmit = function () {
                this.register();return false;
            }.bind(this);
            this._form.children.email.onblur = function () {
                this.validateEmail();
            }.bind(this);
            this._form.children.password.onblur = function () {
                this.validatePassword();
            }.bind(this);
            this._form.children.password.onkeyup = function (e) {
                if (e.keyCode !== 8 && e.keyCode !== 9) {
                    this.validatePassword();
                }
            }.bind(this);
            this._form.children.password2.onblur = function () {
                this.validatePassword();
            }.bind(this);
            this._form.children.password2.onkeyup = function (e) {
                if (e.keyCode !== 8 && e.keyCode !== 9) {
                    this.validatePassword();
                }
            }.bind(this);
            this._form.children.login.onblur = function () {
                this.validateLogin();
            }.bind(this);
            this.emailError = this._form.children.emailError;
            this.passwordError = this._form.children.passwordError;
            this.loginError = this._form.children.loginError;
        }
    }, {
        key: 'validateEmail',
        value: function validateEmail() {
            if (this._form.elements.email.value.search(/.+@.+\..+/) === -1) {
                this.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail';
                this.emailError.style.display = 'block';
                return false;
            }
            this.emailError.hidden = true;
            this.emailError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword() {
            if (this._form.elements.password.value.length < 1) {
                this.passwordError.innerHTML = 'Пожалуйста, введите пароль!';
                this.passwordError.hidden = false;
                return false;
            }
            if (this._form.elements.password.value.length < 8) {
                this.passwordError.innerHTML = 'Пароль нужен длиннее 8 символов =(';
                this.passwordError.hidden = false;
                return false;
            }
            if (this._form.elements.password2.value.length > 0 && this._form.elements.password.value != this._form.elements.password2.value) {
                this._form.children.passwordError.innerHTML = 'Пароли не совпадают!';
                this.passwordError.hidden = false;
                return false;
            }
            this.passwordError.innerHTML = '';
            this.passwordError.hidden = true;
            return true;
        }
    }, {
        key: 'validateLogin',
        value: function validateLogin() {
            if (this._form.elements.login.value.length < 1) {
                this.loginError.innerHTML = 'Пожалуйста, введите кликуху!';
                this.loginError.style.display = 'block';
                return false;
            }
            this.loginError.hidden = true;
            this.loginError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validate',
        value: function validate() {
            return this.validateEmail(this) && this.validatePassword(this) && this.validateLogin(this);
        }
    }, {
        key: 'register',
        value: function register() {
            if (!this.validate()) {
                return;
            }
            var user = new _UserModel2.default({
                username: this._form.elements.login.value,
                email: this._form.elements.email.value,
                password: this._form.elements.password.value
            });

            var response = user.save();
            this._form.children.emailError.textContent = user.getEmailError();
            this._form.children.passwordError.textContent = user.getPasswordError();
            this._form.children.loginError.textContent = user.getLoginError();
            this._form.children.emailError.hidden = this._form.children.emailError.textContent ? false : true;
            this._form.children.loginError.hidden = this._form.children.loginError.textContent ? false : true;
            this._form.children.passwordError.hidden = this._form.children.passwordError.textContent ? false : true;
            if (response.status === 200) {
                this.router.go('/rooms');
            } else {
                console.log('some server magic error');
                this._form.children.emailError.textContent = user.getEmailError();
                this._form.children.emailError.textContent = 'То ли e-mail, то ли пароль не подходят. Я так и не понял логику сервака';
                this._form.children.emailError.hidden = false;
            }
        }
    }]);

    return RegistrationView;
}(_view2.default);

exports.default = RegistrationView;

/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(46);

var _view2 = _interopRequireDefault(_view);

var _RoomCollection = __webpack_require__(134);

var _RoomCollection2 = _interopRequireDefault(_RoomCollection);

var _DroneModel = __webpack_require__(137);

var _DroneModel2 = _interopRequireDefault(_DroneModel);

var _roomsTmpl = __webpack_require__(131);

var _roomsTmpl2 = _interopRequireDefault(_roomsTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // TODO: user id from cookie to drone model


var cookie = __webpack_require__(31);

var RoomsView = function (_View) {
    _inherits(RoomsView, _View);

    function RoomsView() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, RoomsView);

        var _this = _possibleConstructorReturn(this, (RoomsView.__proto__ || Object.getPrototypeOf(RoomsView)).call(this, { element: '.js-rooms', bodyClass: 'body-rooms' }));

        _this.roomCollection = new _RoomCollection2.default();
        _this.drone = new _DroneModel2.default({ playerEmail: cookie.get('airdroneEmail') });
        _this.selectedRoom = undefined;
        return _this;
    }

    _createClass(RoomsView, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.roomCollection.fetch().then(function () {
                if (!cookie.get('airdroneEmail')) {
                    _this2.router.go('/');
                    return;
                }
                console.log('roomCollection fetch began');
                _this2._el.innerHTML = (0, _roomsTmpl2.default)(_this2.roomCollection.getCollection());

                _this2.error = _this2._el.querySelector('.js-error');

                _this2.rooms = _this2._el.querySelectorAll('.rooms__room');
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    var _loop = function _loop() {
                        var room = _step.value;

                        room.onclick = function () {
                            this.selectRoom(room, room.nextSibling);
                        }.bind(_this2);
                    };

                    for (var _iterator = _this2.rooms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        _loop();
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                _this2.colors = _this2._el.querySelectorAll('.js-color');
                console.log(_this2.colors);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    var _loop2 = function _loop2() {
                        var color = _step2.value;

                        console.log(color);
                        color.onclick = function () {
                            console.log('entered color click');this.selectColor(color);
                        }.bind(_this2);
                    };

                    for (var _iterator2 = _this2.colors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        _loop2();
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                console.log('before join');

                _this2._join = _this2._el.querySelector('.js-join');
                console.log(_this2.join);
                _this2._join.onclick = function () {
                    this.join();
                }.bind(_this2);
                console.log('final');

                _this2._el.querySelector('.js-create').onclick = function () {
                    this.router.go('/scoreboard');
                }.bind(_this2);
            });
        }
    }, {
        key: 'selectRoom',
        value: function selectRoom(room, details) {
            for (var i = 0; i < this.rooms.length; ++i) {
                if (this.rooms[i] !== room) {
                    this.rooms[i].hidden = true;
                } else {
                    this.selectedRoom = this.roomCollection.getCollection()[i].id;
                }
            }
            details.hidden = false;
        }
    }, {
        key: 'selectColor',
        value: function selectColor(color) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.colors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var c = _step3.value;

                    if (c === color) {
                        c.classList.add('rooms__details__colors__color-clicked');
                        c.classList.remove('rooms__details__colors__color');
                    } else {
                        c.classList.add('rooms__details__colors__color');
                        c.classList.remove('rooms__details__colors__color-clicked');
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this.drone.color = color.style['background-color'];
            this.error.textContent = '';
            this.error.hidden = true;
        }
    }, {
        key: 'join',
        value: function join() {
            var _this3 = this;

            if (this.drone.color !== undefined) {
                this.error.textContent = '';
                this.error.hidden = true;
                this.drone.save(this.selectedRoom).then(function () {
                    if (_this3.drone.error !== '') {
                        _this3.error.textContent = 'Что-то пошло не так. Попробуйте еще раз!';
                        _this3.error.hidden = false;
                    }
                    _this3.router.go('/game');
                });
            } else {
                this.error.textContent = 'Выберите цвет дрона!';
                this.error.hidden = false;
            }
        }
    }, {
        key: 'back',
        value: function back(details) {
            details.hidden = true;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.rooms[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    r = _step4.value;

                    r.hidden = false;
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            this.selectedRoom = undefined;
        }
    }]);

    return RoomsView;
}(_view2.default);

exports.default = RoomsView;

/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _view = __webpack_require__(46);

var _view2 = _interopRequireDefault(_view);

var _UserCollection = __webpack_require__(135);

var _UserCollection2 = _interopRequireDefault(_UserCollection);

var _scoreboardTmpl = __webpack_require__(132);

var _scoreboardTmpl2 = _interopRequireDefault(_scoreboardTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoreboardView = function (_View) {
    _inherits(ScoreboardView, _View);

    function ScoreboardView() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, ScoreboardView);

        var _this = _possibleConstructorReturn(this, (ScoreboardView.__proto__ || Object.getPrototypeOf(ScoreboardView)).call(this, { element: '.js-scoreboard' }));

        _this.userCollection = new _UserCollection2.default();
        return _this;
    }

    _createClass(ScoreboardView, [{
        key: 'resume',
        value: function resume() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.render();
            this.show();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.userCollection.fetch().then(function () {
                console.log('got here');
                _this2._el.innerHTML = (0, _scoreboardTmpl2.default)(_this2.userCollection.getCollection());
            });
        }
    }, {
        key: 'show',
        value: function show() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _get(ScoreboardView.prototype.__proto__ || Object.getPrototypeOf(ScoreboardView.prototype), 'show', this).call(this);
            document.body.classList.add('body-scoreboard');
        }
    }, {
        key: 'hide',
        value: function hide() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _get(ScoreboardView.prototype.__proto__ || Object.getPrototypeOf(ScoreboardView.prototype), 'hide', this).call(this);
            document.body.classList.remove('body-scoreboard');
        }
    }]);

    return ScoreboardView;
}(_view2.default);

exports.default = ScoreboardView;

/***/ },

/***/ 128:
/***/ function(module, exports) {


/** 
 * =============================================================
 * /home/ivan/Documents/2016_2_AirDrone/public/templates/game.tmpl template
 * =============================================================
 */

module.exports = function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<img class=\"game__video\" src=\"");try{__fest_buf+=(__fest_escapeHTML(json.source))}catch(e){__fest_log_error(e.message + "3");}__fest_buf+=("\"/><canvas class=\"game__canvas\">Ваш браузер морально устарел. Обновите. Быстро.</canvas><div class=\"js-noconnection game__noconnection\" hidden=\"hidden\"><div class=\"game__noconnection__header\">НЕТ ИНТЕРНЕТА</div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 129:
/***/ function(module, exports) {


/** 
 * =============================================================
 * /home/ivan/Documents/2016_2_AirDrone/public/templates/login.tmpl template
 * =============================================================
 */

module.exports = function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<form class=\"js-login-form login__form\" name=\"loginForm\"><h1 class=\"login__header\">Вход</h1><span class=\"js-email-error login__form__error\" name=\"emailError\" hidden=\"hidden\"></span><input placeholder=\"E-mail\" class=\"js-email login__form__input\" name=\"email\" type=\"text\"/><span class=\"js-password-error login__form__error\" name=\"passwordError\" hidden=\"hidden\"></span><input placeholder=\"Password\" class=\"js-password login__form__input\" name=\"password\" type=\"password\"/><button class=\"js_submit login__form__button\" name=\"button\">Войти!</button><a class=\"login__form__link\" name=\"registration\">Регистрация</a></form>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 130:
/***/ function(module, exports) {


/** 
 * =============================================================
 * /home/ivan/Documents/2016_2_AirDrone/public/templates/registration.tmpl template
 * =============================================================
 */

module.exports = function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<form class=\"js-registration-form registration__form\"><h1 class=\"registration__header\">Познакомимся?</h1><span class=\"js-email-error registration__form__error\" name=\"emailError\" hidden=\"hidden\"></span><input placeholder=\"E-mail\" class=\"js-email registration__form__input\" name=\"email\" type=\"text\"/><span class=\"js-password-error registration__form__error\" name=\"passwordError\" hidden=\"hidden\"></span><input placeholder=\"Password\" class=\"js-password registration__form__input\" name=\"password\" type=\"password\"/><input placeholder=\"Confirm password\" class=\"js-password2 registration__form__input\" name=\"password2\" type=\"password\"/><span class=\"js-login-error registration__form__error\" name=\"loginError\" hidden=\"hidden\"></span><input placeholder=\"Кликуха\" class=\"js-login registration__form__input\" name=\"login\" type=\"text\"/><button class=\"js-submit registration__form__button\" name=\"button\">Зарегистрироваться!</button></form>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 131:
/***/ function(module, exports) {


/** 
 * =============================================================
 * /home/ivan/Documents/2016_2_AirDrone/public/templates/rooms.tmpl template
 * =============================================================
 */

module.exports = function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<h1 class=\"rooms__header\">Выберите игру</h1>");var i,room,__fest_iterator0;try{__fest_iterator0=json || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator0){room=__fest_iterator0[i];__fest_buf+=("<div class=\"rooms__room\"><h2 class=\"rooms__room__header\">");try{__fest_buf+=(__fest_escapeHTML(room.name))}catch(e){__fest_log_error(e.message + "4");}__fest_buf+=(" (");try{__fest_buf+=(__fest_escapeHTML(room.ip))}catch(e){__fest_log_error(e.message + "4");}__fest_buf+=(")</h2></div><div class=\"rooms__details\" hidden=\"hidden\"><h1 class=\"rooms__details__header\">Выберите квадрокоптер:</h1><div class=\"rooms__details__colors\">");var i,color,__fest_iterator1;try{__fest_iterator1=room.availableColors || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator1){color=__fest_iterator1[i];__fest_buf+=("<input class=\"rooms__details__colors__color js-color\" style=\"background-color:");try{__fest_buf+=(__fest_escapeHTML(color))}catch(e){__fest_log_error(e.message + "12");}__fest_buf+=("; color:");try{__fest_buf+=(__fest_escapeHTML(color))}catch(e){__fest_log_error(e.message + "12");}__fest_buf+=(";\"/>");}__fest_buf+=("</div><p class=\"js-error rooms__details__error\" hidden=\"hidden\"></p><button class=\"rooms__details__join js-join\">Присоединиться!</button><hr/><h1 class=\"rooms__details__header\">Уже в игре:</h1><table class=\"rooms__details__ul\"><ul>");var i,drone,__fest_iterator2;try{__fest_iterator2=room.drones || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator2){drone=__fest_iterator2[i];__fest_buf+=("<tr class=\"room__details__ul__li\"><td><li>");try{__fest_buf+=(__fest_escapeHTML(drone.playerLogin))}catch(e){__fest_log_error(e.message + "27");}__fest_buf+=("</li></td><td><input type=\"text\" class=\"rooms__details__ul__li__color\" disabled=\"disabled\" style=\"background-color:");try{__fest_buf+=(__fest_escapeHTML(drone.color))}catch(e){__fest_log_error(e.message + "33");}__fest_buf+=(";\"/></td></tr>");}__fest_buf+=("</ul></table></div>");}__fest_buf+=("<hr/><button class=\"js-create rooms__create\">Лидеры</button>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 132:
/***/ function(module, exports) {


/** 
 * =============================================================
 * /home/ivan/Documents/2016_2_AirDrone/public/templates/scoreboard.tmpl template
 * =============================================================
 */

module.exports = function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<h1 class=\"scoreboard__header\">Лидеры</h1><table class=\"scoreboard__table\"><tr class=\"scoreboard__table__tr\"><td class=\"scoreboard__table__tr__td\">#</td><td class=\"scoreboard__table__tr__td\">Имя</td><td class=\"scoreboard__table__tr__td\">Количество боев</td><td class=\"scoreboard__table__tr__td\">Процент побед</td></tr>");var i,data,__fest_iterator0;try{__fest_iterator0=json || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator0){data=__fest_iterator0[i];__fest_buf+=("<tr class=\"scoreboard__table__tr\"><td class=\"scoreboard__table__tr__td\">");try{__fest_buf+=(__fest_escapeHTML(i))}catch(e){__fest_log_error(e.message + "12");}__fest_buf+=("</td><td class=\"scoreboard__table__tr__td\">");try{__fest_buf+=(__fest_escapeHTML(data.username))}catch(e){__fest_log_error(e.message + "13");}__fest_buf+=("</td><td class=\"scoreboard__table__tr__td\">");try{__fest_buf+=(__fest_escapeHTML(data.games))}catch(e){__fest_log_error(e.message + "14");}__fest_buf+=("</td><td class=\"scoreboard__table__tr__td\">");try{__fest_buf+=(__fest_escapeHTML(data.score))}catch(e){__fest_log_error(e.message + "15");}__fest_buf+=(" %</td></tr>");}__fest_buf+=("</table>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 133:
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = gameCanvas;
function gameCanvas() {
    window.mode = 0;
    var particles = [];

    // canvas and 2D context initialization
    var canvas = document.querySelector(".game__canvas");
    var context2D = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // starting the game loop at 60 frames per second
    var frameRate = 60.0;
    var frameDelay = 1000.0 / frameRate;

    var status = parseFloat(1.0);

    var startTime = 0;

    setInterval(function () {
        update(frameDelay);
    }, frameDelay);

    function randomFloat(min, max) {
        return min + Math.random() * (max - min);
    }

    /*
     * A single explosion particle
     */
    function Particle() {
        this.scale = 1.2;
        this.x = 0;
        this.y = 0;
        this.radius = 20;
        this.color = "#000";
        this.velocityX = 0;
        this.velocityY = 0;
        this.scaleSpeed = 0.5;
        this.update = function (ms) {
            // shrinking
            this.scale -= this.scaleSpeed * ms / 1000.0;

            if (this.scale <= 0) {
                this.scale = 0;
            }

            // moving away from explosion center
            this.x += this.velocityX * ms / 1000.0;
            this.y += this.velocityY * ms / 1000.0;
        };

        this.draw = function (context2D) {
            // translating the 2D context to the particle coordinates
            context2D.save();
            context2D.translate(this.x, this.y);
            context2D.scale(this.scale, this.scale);

            // drawing a filled circle in the particle's local space
            context2D.beginPath();
            context2D.arc(0, 0, this.radius, 0, Math.PI * 2, true);
            context2D.closePath();

            context2D.fillStyle = this.color;
            context2D.fill();

            context2D.restore();
        };
    }

    /*
     * Advanced Explosion effect
     * Each particle has a different size, move speed and scale speed.
     *
     * Parameters:
     * 	x, y - explosion center
     * 	color - particles' color
     */
    function createExplosion(x, y, color) {
        var minSize = 8;
        var maxSize = 30;
        var count = 15;
        var minSpeed = 80.0;
        var maxSpeed = 220.0;
        var minScaleSpeed = 1.0;
        var maxScaleSpeed = 2.0;

        for (var angle = 0; angle < 360; angle += Math.round(360 / count)) {
            var particle = new Particle();

            particle.x = x;
            particle.y = y;

            particle.radius = randomFloat(minSize, maxSize);

            particle.color = color;

            particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);

            var speed = randomFloat(minSpeed, maxSpeed);

            particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
            particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

            particles.push(particle);
        }
    }

    //Const size variables
    var rectSize = window.innerWidth / 3;
    var marginY = (window.innerHeight - rectSize) * 0.5;
    var statusMargin = (window.innerHeight - rectSize) * 0.5 + rectSize + 5;
    var alertSize = 0.7 * rectSize;
    var alertMargin = 0.15 * rectSize;

    function update(frameDelay) {
        context2D.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // update and draw particles
        for (var i = 0; i < particles.length; i++) {
            var particle = particles[i];

            particle.update(frameDelay);
            particle.draw(context2D);
            if (particle.scale == 0) {
                particles.splice(i, 1);
            }
        }
        // draw aiming window
        drawStatus(0.5 * rectSize, 0.1 * rectSize, marginY - rectSize * 0.1 - 5, "#4d4d4d", "Зона захвата", 1, 10);
        roundRect(context2D, rectSize, marginY, rectSize, rectSize, 20, "red", false);
        switch (window.mode) {
            case 1:
                drawStatus(rectSize, 0.2 * 0.7 * rectSize, statusMargin, "green", "Захват цели...", status, 20);
                status = parseFloat(status) + parseFloat(0.007);
                if (status > 1) {
                    var x = canvas.width * 0.5;
                    var y = canvas.height * 0.5;
                    createExplosion(x, y, "#525252");
                    createExplosion(x, y, "#FFA318");
                    createExplosion(x, y, "#525252");
                    createExplosion(x, y, "#FFA318");
                    window.mode = 0;
                }
                break;
            case 2:
                if (status < 1) {
                    drawStatus(rectSize, 0.2 * 0.7 * rectSize, statusMargin, "#cc0000", "Вы под ударом!", status, 20);
                    status = parseFloat(status) + parseFloat(0.007);
                } else {
                    if (startTime != 0) {
                        context2D.globalAlpha = 0.75;
                        roundRect(context2D, rectSize + alertMargin, marginY + alertMargin, alertSize, alertSize, 20, "#4d4d4d", true, false);
                        context2D.globalAlpha = 1;
                        context2D.font = '25px Helvetica';
                        context2D.fillStyle = 'white';
                        context2D.textAlign = "center";
                        context2D.fillText("Вы подбиты!", rectSize + rectSize * 0.5, marginY + alertMargin + 0.3 * alertSize, alertSize);
                        context2D.font = '20px Helvetica';
                        context2D.fillText("Ограничение действует:", rectSize + rectSize * 0.5, marginY + alertMargin + 0.5 * alertSize, alertSize);
                        var seconds = 10 - (new Date().getTime() - startTime) / 1000;
                        seconds = parseInt(seconds);
                        context2D.fillText(seconds + " секунд", rectSize + rectSize * 0.5, marginY + alertMargin + 0.6 * alertSize, alertSize);
                        if (seconds <= 0) {
                            window.mode = 0;
                            startTime = 0;
                        }
                    } else {
                        startTime = new Date().getTime();
                    }
                }
                break;
        }
    }

    function drawStatus(size, height, offsetY, color, label, realSize, radius) {
        context2D.globalAlpha = 0.5;
        var xMargin = (window.innerWidth - size) * 0.5;
        roundRect(context2D, xMargin, offsetY, size * realSize, height, radius, color, true, false);
        roundRect(context2D, xMargin, offsetY, size, height, radius, color, true, false);
        context2D.globalAlpha = 1;
        context2D.font = '20px Helvetica';
        context2D.fillStyle = 'white';
        context2D.textAlign = "center";
        context2D.fillText(label, xMargin + size * 0.5, offsetY + height * 0.6, size);
    }

    function roundRect(context2D, x, y, width, height, radius, color, fill, stroke) {
        if (typeof color == 'undefined') {
            color = "black";
        }
        if (typeof stroke == 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
            var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        context2D.lineWidth = 10;
        context2D.strokeStyle = color;
        context2D.fillStyle = color;
        context2D.beginPath();
        context2D.moveTo(x + radius.tl, y);
        context2D.lineTo(x + width - radius.tr, y);
        context2D.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        context2D.lineTo(x + width, y + height - radius.br);
        context2D.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        context2D.lineTo(x + radius.bl, y + height);
        context2D.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        context2D.lineTo(x, y + radius.tl);
        context2D.quadraticCurveTo(x, y, x + radius.tl, y);
        context2D.closePath();
        if (fill) {
            context2D.fill();
        }
        if (stroke) {
            context2D.stroke();
        }
    }

    //Чтобы сбросить выполнения анимации (бывает в этом надобность)
    //достаточно приравнять mode нулю!

    //Чтобы запустить анимации нужно просто выставить нужный mode
    //и обнулить переменную прогресс бара
    //

    window.mode1 = function () {
        window.mode = 1;
        status = parseFloat(0.0);
    };
    window.mode2 = function () {
        window.mode = 2;
        status = parseFloat(0.0);
    };

    window.onkeydown = function (evt) {
        evt = evt || window.event;
        //Квадракоптер под ударом
        if (evt.keyCode == 90) {
            //            window.mode = 1;
            //            status = parseFloat(0.0);
            window.mode1();
        }
        //Захват противника
        else if (evt.keyCode == 88) {
                //            window.mode = 2;
                //            status = parseFloat(0.0);
                window.mode2();
            }
    };
}

/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RoomModel = __webpack_require__(139);

var _RoomModel2 = _interopRequireDefault(_RoomModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoomCollection = function () {
    function RoomCollection() {
        _classCallCheck(this, RoomCollection);

        this._data = [];
    }

    _createClass(RoomCollection, [{
        key: 'fetch',
        value: function (_fetch) {
            function fetch() {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function () {
            var _this = this;

            return fetch('/games').then(function (response) {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                _this._data = data;
            }).catch();
        })
    }, {
        key: 'getCollection',
        value: function getCollection() {
            return this._data;
        }
    }]);

    return RoomCollection;
}();

exports.default = RoomCollection;

/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cookie = __webpack_require__(31);

var UserCollection = function () {
    function UserCollection() {
        _classCallCheck(this, UserCollection);
    }

    _createClass(UserCollection, [{
        key: 'construtor',
        value: function construtor() {
            this._data = [];
        }
    }, {
        key: 'fetch',
        value: function (_fetch) {
            function fetch() {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function () {
            var _this = this;

            return fetch('/rating').then(function (response) {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                _this._data = data;
                _this.sort();
            }).catch();
        })
    }, {
        key: 'sort',
        value: function sort() {
            this._data.sort(function (a, b) {
                return b.score - a.score;
            });
        }
    }, {
        key: 'getCollection',
        value: function getCollection() {
            return this._data;
        }
    }]);

    return UserCollection;
}();

exports.default = UserCollection;

/***/ },

/***/ 136:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = request;
function request(url, method, data) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));

  return xhr;
}

/***/ },

/***/ 137:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DroneModel = function () {
    function DroneModel() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, DroneModel);

        this.id = data.id || 0;
        this.color = data.color || undefined;
        this.playerLogin = data.playerLogin;
        this.playerEmail = data.playerEmail;
        this.error = '';
    }

    _createClass(DroneModel, [{
        key: 'save',
        value: function save(room) {
            var _this = this;

            if (!room) {
                this.error = 'No room!';
                return;
            }
            return fetch('/games', {
                method: 'PUT',
                body: JSON.stringify({
                    room: room,
                    drone: {
                        id: this.id,
                        color: this.color,
                        playerLogin: this.playerLogin,
                        playerEmail: this.playerEmail
                    }
                })
            }).then(function (response) {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                _this.error = '';
            }).catch(function () {
                _this.error = 'Failed to save drone!';
            });
        }
    }]);

    return DroneModel;
}();

exports.default = DroneModel;

/***/ },

/***/ 138:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameModel = function () {
    function GameModel() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, GameModel);

        this.host = options.host || '/image/fill.jpg';
        this.ws = []; // this is for websocket
        this.error = '';
    }

    _createClass(GameModel, [{
        key: 'getHost',
        value: function getHost() {
            var _this = this;

            return fetch('/host').then(function (response) {
                if (response.status !== 200) {
                    return undefined;
                }
                return response.json();
            }).then(function (data) {
                _this.host = data.host;
                _this.error = '';
            }).catch(function () {
                _this.error = 'Can\'t reach the host ' + _this.host + '!';
            });
        }
    }, {
        key: 'getVideo',
        value: function getVideo() {
            this.getHost();
            return this.host;
        }
    }, {
        key: 'mechanics',
        value: function mechanics() {}
    }, {
        key: 'connect',
        value: function connect() {}
    }, {
        key: 'disconnect',
        value: function disconnect() {}
    }]);

    return GameModel;
}();

exports.default = GameModel;

/***/ },

/***/ 139:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoomModel = function () {
    function RoomModel() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, RoomModel);

        this.id = data.id || 0;
        this.name = data.name || 'New Room';
        this.ip = data.ip || '127.0.0.1';
        this.drones = data.drones || [];
        this.endCondition = data.endCondition || 0;
        this.endValue = data.endValue || 0;
        this.availableColors = data.availableColors || [];
        this.error = '';
    }

    _createClass(RoomModel, [{
        key: 'fetch',
        value: function (_fetch) {
            function fetch() {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function () {
            var _this = this;

            return fetch('/room', {
                body: JSON.stringify({
                    room: this.id
                })
            }).then(function (response) {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                _this.id = data.id;
                _this.name = data.name;
                _this.ip = data.ip;
                _this.drones = data.drones;
                _this.endCondition = data.endCondition;
                _this.endValue = data.endValue;
                _this.availableColors = data.availableColors;
                _this.error = 0;
            }).catch(function () {
                _this.error = 'Wrong room name';
            });
        })
    }, {
        key: 'save',
        value: function save() {
            var _this2 = this;

            return fetch('/room', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.name,
                    ip: this.ip,
                    drones: [],
                    endCondition: this.endCondition,
                    endValue: this.endValue
                }).then(function (response) {
                    if (response.status !== 200) {
                        reject(response);
                    }
                    return response.json();
                }).then(function (data) {
                    _this2.error = '';
                }).catch(function () {
                    _this2.error = 'Duplicated rooms!';
                })
            });
        }
    }, {
        key: 'listDrones',
        value: function listDrones() {
            return this.drones;
        }
    }]);

    return RoomModel;
}();

exports.default = RoomModel;

/***/ },

/***/ 140:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = pathToRegex;
function pathToRegex(pathname) {
	var keyNames = [];
	var parts = pathname.split('/').filter(function (part) {
		return part;
	}).map(function (part) {
		if (/^:/.exec(part)) {
			keyNames.push(part.slice(1));
			return new RegExp('^/([^/]+)', 'i');
		}
		return new RegExp('^/' + part, 'i');
	});

	return function (path) {

		var keys = [];
		var check = parts.every(function (regexp, step) {
			var tmp = regexp.exec(path);
			if (!tmp) {
				return false;
			}
			if (tmp.length === 2) {
				keys.push(tmp[1]);
			}
			path = path.replace(regexp, '');
			return true;
		});

		if (check) {
			return keys.reduce(function (prev, curr, pos) {
				prev[keyNames[pos]] = curr;
				return prev;
			}, {});
		}
		return null;
	};
};

/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathToRegex = __webpack_require__(140);

var _pathToRegex2 = _interopRequireDefault(_pathToRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var id = 0;

/** Класс представляет собой Путь в вашем приложении */
var Route = function () {
	/**
  * Создаёт новый Route - ассоциирует некоторую view с шаблоном пути
  * @param {string} pathname - Шаблон пути
  * @param {View} view - Класс конкретной View
  * @param {Object} [options={}] - Дополнительные параметры, которые будут переданы во view при её создании и инициализации
  */
	function Route(pathname, view) {
		var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		_classCallCheck(this, Route);

		//TODO: Сущий адище, нам нужно менеджерить депсы
		this.pathToRegex = _pathToRegex2.default;

		this.id = 'p' + id;
		id++;
		this.pathname = pathname;
		this.regex = this.pathToRegex(pathname);
		this.View = view;
		this.options = options;
	}

	/**
  * Проверяет, соответствует ли переданный pathname текущему Route
  * @param {string} pathname - Путь в приложении
  * @returns {boolean} Результат проверки
  */


	_createClass(Route, [{
		key: 'match',
		value: function match(pathname) {
			return !!this.regex(pathname);
		}

		/**
   * Активирует текущий Route (переходит по нему)
   * @param {string} pathname - Путь в приложении
   * @param {Object} [state={}] - Объект state, который был передан в событие popstate для объекта window
   */

	}, {
		key: 'navigate',
		value: function navigate(pathname) {
			var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			state = state || {};
			var keys = this.regex(pathname);
			if (!this._view) {
				var view = new this.View(this.options);
				view.init(this.options);
				view.setRouter(this.__router);
				this._view = view;
			}

			this._view.resume(Object.assign(state, keys));
		}

		/**
   * Деактивирует текущий Route
   */

	}, {
		key: 'leave',
		value: function leave() {
			this._view && this._view.pause();
		}

		/**
   * Устанавливает текущему Route инстанс роутера
   * @param {Router} router - Инстанс роутера
   */

	}, {
		key: 'setRouter',
		value: function setRouter(router) {
			this.__router = router;
		}
	}]);

	return Route;
}();

exports.default = Route;

/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2015 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.4.6
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var SomePromiseArray = Promise._SomePromiseArray;
function any(promises) {
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(1);
    ret.setUnwrap();
    ret.init();
    return promise;
}

Promise.any = function (promises) {
    return any(promises);
};

Promise.prototype.any = function () {
    return any(this);
};

};

},{}],2:[function(_dereq_,module,exports){
"use strict";
var firstLineError;
try {throw new Error(); } catch (e) {firstLineError = e;}
var schedule = _dereq_("./schedule");
var Queue = _dereq_("./queue");
var util = _dereq_("./util");

function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new Queue(16);
    this._normalQueue = new Queue(16);
    this._haveDrainedQueues = false;
    this._trampolineEnabled = true;
    var self = this;
    this.drainQueues = function () {
        self._drainQueues();
    };
    this._schedule = schedule;
}

Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
};

Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
};

Async.prototype.enableTrampoline = function() {
    this._trampolineEnabled = true;
};

Async.prototype.disableTrampolineIfNecessary = function() {
    if (util.hasDevTools) {
        this._trampolineEnabled = false;
    }
};

Async.prototype.haveItemsQueued = function () {
    return this._isTickUsed || this._haveDrainedQueues;
};


Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
            "\n");
        process.exit(2);
    } else {
        this.throwLater(e);
    }
};

Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
        arg = fn;
        fn = function () { throw arg; };
    }
    if (typeof setTimeout !== "undefined") {
        setTimeout(function() {
            fn(arg);
        }, 0);
    } else try {
        this._schedule(function() {
            fn(arg);
        });
    } catch (e) {
        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
};

function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncSettlePromises(promise) {
    this._normalQueue._pushOne(promise);
    this._queueTick();
}

if (!util.hasDevTools) {
    Async.prototype.invokeLater = AsyncInvokeLater;
    Async.prototype.invoke = AsyncInvoke;
    Async.prototype.settlePromises = AsyncSettlePromises;
} else {
    Async.prototype.invokeLater = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvokeLater.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                setTimeout(function() {
                    fn.call(receiver, arg);
                }, 100);
            });
        }
    };

    Async.prototype.invoke = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvoke.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                fn.call(receiver, arg);
            });
        }
    };

    Async.prototype.settlePromises = function(promise) {
        if (this._trampolineEnabled) {
            AsyncSettlePromises.call(this, promise);
        } else {
            this._schedule(function() {
                promise._settlePromises();
            });
        }
    };
}

Async.prototype.invokeFirst = function (fn, receiver, arg) {
    this._normalQueue.unshift(fn, receiver, arg);
    this._queueTick();
};

Async.prototype._drainQueue = function(queue) {
    while (queue.length() > 0) {
        var fn = queue.shift();
        if (typeof fn !== "function") {
            fn._settlePromises();
            continue;
        }
        var receiver = queue.shift();
        var arg = queue.shift();
        fn.call(receiver, arg);
    }
};

Async.prototype._drainQueues = function () {
    this._drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    this._drainQueue(this._lateQueue);
};

Async.prototype._queueTick = function () {
    if (!this._isTickUsed) {
        this._isTickUsed = true;
        this._schedule(this.drainQueues);
    }
};

Async.prototype._reset = function () {
    this._isTickUsed = false;
};

module.exports = Async;
module.exports.firstLineError = firstLineError;

},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
var calledBind = false;
var rejectThis = function(_, e) {
    this._reject(e);
};

var targetRejected = function(e, context) {
    context.promiseRejectionQueued = true;
    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
};

var bindingResolved = function(thisArg, context) {
    if (((this._bitField & 50397184) === 0)) {
        this._resolveCallback(context.target);
    }
};

var bindingRejected = function(e, context) {
    if (!context.promiseRejectionQueued) this._reject(e);
};

Promise.prototype.bind = function (thisArg) {
    if (!calledBind) {
        calledBind = true;
        Promise.prototype._propagateFrom = debug.propagateFromFunction();
        Promise.prototype._boundValue = debug.boundValueFunction();
    }
    var maybePromise = tryConvertToPromise(thisArg);
    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 1);
    var target = this._target();
    ret._setBoundTo(maybePromise);
    if (maybePromise instanceof Promise) {
        var context = {
            promiseRejectionQueued: false,
            promise: ret,
            target: target,
            bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, undefined, ret, context);
        maybePromise._then(
            bindingResolved, bindingRejected, undefined, ret, context);
        ret._setOnCancel(maybePromise);
    } else {
        ret._resolveCallback(target);
    }
    return ret;
};

Promise.prototype._setBoundTo = function (obj) {
    if (obj !== undefined) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
    } else {
        this._bitField = this._bitField & (~2097152);
    }
};

Promise.prototype._isBound = function () {
    return (this._bitField & 2097152) === 2097152;
};

Promise.bind = function (thisArg, value) {
    return Promise.resolve(value).bind(thisArg);
};
};

},{}],4:[function(_dereq_,module,exports){
"use strict";
var old;
if (typeof Promise !== "undefined") old = Promise;
function noConflict() {
    try { if (Promise === bluebird) Promise = old; }
    catch (e) {}
    return bluebird;
}
var bluebird = _dereq_("./promise")();
bluebird.noConflict = noConflict;
module.exports = bluebird;

},{"./promise":22}],5:[function(_dereq_,module,exports){
"use strict";
var cr = Object.create;
if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
}

module.exports = function(Promise) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var isIdentifier = util.isIdentifier;

var getMethodCaller;
var getGetter;
if (false) {
var makeMethodCaller = function (methodName) {
    return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
};

var makeGetter = function (propertyName) {
    return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
};

var getCompiled = function(name, compiler, cache) {
    var ret = cache[name];
    if (typeof ret !== "function") {
        if (!isIdentifier(name)) {
            return null;
        }
        ret = compiler(name);
        cache[name] = ret;
        cache[" size"]++;
        if (cache[" size"] > 512) {
            var keys = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
            cache[" size"] = keys.length - 256;
        }
    }
    return ret;
};

getMethodCaller = function(name) {
    return getCompiled(name, makeMethodCaller, callerCache);
};

getGetter = function(name) {
    return getCompiled(name, makeGetter, getterCache);
};
}

function ensureMethod(obj, methodName) {
    var fn;
    if (obj != null) fn = obj[methodName];
    if (typeof fn !== "function") {
        var message = "Object " + util.classString(obj) + " has no method '" +
            util.toString(methodName) + "'";
        throw new Promise.TypeError(message);
    }
    return fn;
}

function caller(obj) {
    var methodName = this.pop();
    var fn = ensureMethod(obj, methodName);
    return fn.apply(obj, this);
}
Promise.prototype.call = function (methodName) {
    var args = [].slice.call(arguments, 1);;
    if (false) {
        if (canEvaluate) {
            var maybeCaller = getMethodCaller(methodName);
            if (maybeCaller !== null) {
                return this._then(
                    maybeCaller, undefined, undefined, args, undefined);
            }
        }
    }
    args.push(methodName);
    return this._then(caller, undefined, undefined, args, undefined);
};

function namedGetter(obj) {
    return obj[this];
}
function indexedGetter(obj) {
    var index = +this;
    if (index < 0) index = Math.max(0, index + obj.length);
    return obj[index];
}
Promise.prototype.get = function (propertyName) {
    var isIndex = (typeof propertyName === "number");
    var getter;
    if (!isIndex) {
        if (canEvaluate) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
            getter = namedGetter;
        }
    } else {
        getter = indexedGetter;
    }
    return this._then(getter, undefined, undefined, propertyName, undefined);
};
};

},{"./util":36}],6:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, PromiseArray, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

Promise.prototype["break"] = Promise.prototype.cancel = function() {
    if (!debug.cancellation()) return this._warn("cancellation is disabled");

    var promise = this;
    var child = promise;
    while (promise._isCancellable()) {
        if (!promise._cancelBy(child)) {
            if (child._isFollowing()) {
                child._followee().cancel();
            } else {
                child._cancelBranched();
            }
            break;
        }

        var parent = promise._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
            if (promise._isFollowing()) {
                promise._followee().cancel();
            } else {
                promise._cancelBranched();
            }
            break;
        } else {
            if (promise._isFollowing()) promise._followee().cancel();
            promise._setWillBeCancelled();
            child = promise;
            promise = parent;
        }
    }
};

Promise.prototype._branchHasCancelled = function() {
    this._branchesRemainingToCancel--;
};

Promise.prototype._enoughBranchesHaveCancelled = function() {
    return this._branchesRemainingToCancel === undefined ||
           this._branchesRemainingToCancel <= 0;
};

Promise.prototype._cancelBy = function(canceller) {
    if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
    } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
            this._invokeOnCancel();
            return true;
        }
    }
    return false;
};

Promise.prototype._cancelBranched = function() {
    if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
    }
};

Promise.prototype._cancel = function() {
    if (!this._isCancellable()) return;
    this._setCancelled();
    async.invoke(this._cancelPromises, this, undefined);
};

Promise.prototype._cancelPromises = function() {
    if (this._length() > 0) this._settlePromises();
};

Promise.prototype._unsetOnCancel = function() {
    this._onCancelField = undefined;
};

Promise.prototype._isCancellable = function() {
    return this.isPending() && !this._isCancelled();
};

Promise.prototype.isCancellable = function() {
    return this.isPending() && !this.isCancelled();
};

Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
    if (util.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
    } else if (onCancelCallback !== undefined) {
        if (typeof onCancelCallback === "function") {
            if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());
                if (e === errorObj) {
                    this._attachExtraTrace(e.e);
                    async.throwLater(e.e);
                }
            }
        } else {
            onCancelCallback._resultCancelled(this);
        }
    }
};

Promise.prototype._invokeOnCancel = function() {
    var onCancelCallback = this._onCancel();
    this._unsetOnCancel();
    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
};

Promise.prototype._invokeInternalOnCancel = function() {
    if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
    }
};

Promise.prototype._resultCancelled = function() {
    this.cancel();
};

};

},{"./util":36}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function(NEXT_FILTER) {
var util = _dereq_("./util");
var getKeys = _dereq_("./es5").keys;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function catchFilter(instances, cb, promise) {
    return function(e) {
        var boundTo = promise._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
            var item = instances[i];

            if (item === Error ||
                (item != null && item.prototype instanceof Error)) {
                if (e instanceof item) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);
                if (matchesPredicate === errorObj) {
                    return matchesPredicate;
                } else if (matchesPredicate) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (util.isObject(e)) {
                var keys = getKeys(item);
                for (var j = 0; j < keys.length; ++j) {
                    var key = keys[j];
                    if (item[key] != e[key]) {
                        continue predicateLoop;
                    }
                }
                return tryCatch(cb).call(boundTo, e);
            }
        }
        return NEXT_FILTER;
    };
}

return catchFilter;
};

},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var longStackTraces = false;
var contextStack = [];

Promise.prototype._promiseCreated = function() {};
Promise.prototype._pushContext = function() {};
Promise.prototype._popContext = function() {return null;};
Promise._peekContext = Promise.prototype._peekContext = function() {};

function Context() {
    this._trace = new Context.CapturedTrace(peekContext());
}
Context.prototype._pushContext = function () {
    if (this._trace !== undefined) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
    }
};

Context.prototype._popContext = function () {
    if (this._trace !== undefined) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
    }
    return null;
};

function createContext() {
    if (longStackTraces) return new Context();
}

function peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return undefined;
}
Context.CapturedTrace = null;
Context.create = createContext;
Context.deactivateLongStackTraces = function() {};
Context.activateLongStackTraces = function() {
    var Promise_pushContext = Promise.prototype._pushContext;
    var Promise_popContext = Promise.prototype._popContext;
    var Promise_PeekContext = Promise._peekContext;
    var Promise_peekContext = Promise.prototype._peekContext;
    var Promise_promiseCreated = Promise.prototype._promiseCreated;
    Context.deactivateLongStackTraces = function() {
        Promise.prototype._pushContext = Promise_pushContext;
        Promise.prototype._popContext = Promise_popContext;
        Promise._peekContext = Promise_PeekContext;
        Promise.prototype._peekContext = Promise_peekContext;
        Promise.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
    };
    longStackTraces = true;
    Promise.prototype._pushContext = Context.prototype._pushContext;
    Promise.prototype._popContext = Context.prototype._popContext;
    Promise._peekContext = Promise.prototype._peekContext = peekContext;
    Promise.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
    };
};
return Context;
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, Context) {
var getDomain = Promise._getDomain;
var async = Promise._async;
var Warning = _dereq_("./errors").Warning;
var util = _dereq_("./util");
var canAttachTrace = util.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var bluebirdFramePattern =
    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
var stackFramePattern = null;
var formatStack = null;
var indentStackFrames = false;
var printWarning;
var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
                        (true ||
                         util.env("BLUEBIRD_DEBUG") ||
                         util.env("NODE_ENV") === "development"));

var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
    (debugging || util.env("BLUEBIRD_WARNINGS")));

var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

Promise.prototype.suppressUnhandledRejections = function() {
    var target = this._target();
    target._bitField = ((target._bitField & (~1048576)) |
                      524288);
};

Promise.prototype._ensurePossibleRejectionHandled = function () {
    if ((this._bitField & 524288) !== 0) return;
    this._setRejectionIsUnhandled();
    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
};

Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
    fireRejectionEvent("rejectionHandled",
                                  unhandledRejectionHandled, undefined, this);
};

Promise.prototype._setReturnedNonUndefined = function() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._returnedNonUndefined = function() {
    return (this._bitField & 268435456) !== 0;
};

Promise.prototype._notifyUnhandledRejection = function () {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent("unhandledRejection",
                                      possiblyUnhandledRejection, reason, this);
    }
};

Promise.prototype._setUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField | 262144;
};

Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField & (~262144);
};

Promise.prototype._isUnhandledRejectionNotified = function () {
    return (this._bitField & 262144) > 0;
};

Promise.prototype._setRejectionIsUnhandled = function () {
    this._bitField = this._bitField | 1048576;
};

Promise.prototype._unsetRejectionIsUnhandled = function () {
    this._bitField = this._bitField & (~1048576);
    if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
    }
};

Promise.prototype._isRejectionUnhandled = function () {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
    return warn(message, shouldUseOwnTrace, promise || this);
};

Promise.onPossiblyUnhandledRejection = function (fn) {
    var domain = getDomain();
    possiblyUnhandledRejection =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

Promise.onUnhandledRejectionHandled = function (fn) {
    var domain = getDomain();
    unhandledRejectionHandled =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

var disableLongStackTraces = function() {};
Promise.longStackTraces = function () {
    if (async.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            }
            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
            Context.deactivateLongStackTraces();
            async.enableTrampoline();
            config.longStackTraces = false;
        };
        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Context.activateLongStackTraces();
        async.disableTrampolineIfNecessary();
    }
};

Promise.hasLongStackTraces = function () {
    return config.longStackTraces && longStackTracesIsSupported();
};

var fireDomEvent = (function() {
    try {
        if (typeof CustomEvent === "function") {
            var event = new CustomEvent("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new CustomEvent(name.toLowerCase(), {
                    detail: event,
                    cancelable: true
                });
                return !util.global.dispatchEvent(domEvent);
            };
        } else if (typeof Event === "function") {
            var event = new Event("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new Event(name.toLowerCase(), {
                    cancelable: true
                });
                domEvent.detail = event;
                return !util.global.dispatchEvent(domEvent);
            };
        } else {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("testingtheevent", false, true, {});
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name.toLowerCase(), false, true,
                    event);
                return !util.global.dispatchEvent(domEvent);
            };
        }
    } catch (e) {}
    return function() {
        return false;
    };
})();

var fireGlobalEvent = (function() {
    if (util.isNode) {
        return function() {
            return process.emit.apply(process, arguments);
        };
    } else {
        if (!util.global) {
            return function() {
                return false;
            };
        }
        return function(name) {
            var methodName = "on" + name.toLowerCase();
            var method = util.global[methodName];
            if (!method) return false;
            method.apply(util.global, [].slice.call(arguments, 1));
            return true;
        };
    }
})();

function generatePromiseLifecycleEventObject(name, promise) {
    return {promise: promise};
}

var eventToObjectGenerator = {
    promiseCreated: generatePromiseLifecycleEventObject,
    promiseFulfilled: generatePromiseLifecycleEventObject,
    promiseRejected: generatePromiseLifecycleEventObject,
    promiseResolved: generatePromiseLifecycleEventObject,
    promiseCancelled: generatePromiseLifecycleEventObject,
    promiseChained: function(name, promise, child) {
        return {promise: promise, child: child};
    },
    warning: function(name, warning) {
        return {warning: warning};
    },
    unhandledRejection: function (name, reason, promise) {
        return {reason: reason, promise: promise};
    },
    rejectionHandled: generatePromiseLifecycleEventObject
};

var activeFireEvent = function (name) {
    var globalEventFired = false;
    try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
    } catch (e) {
        async.throwLater(e);
        globalEventFired = true;
    }

    var domEventFired = false;
    try {
        domEventFired = fireDomEvent(name,
                    eventToObjectGenerator[name].apply(null, arguments));
    } catch (e) {
        async.throwLater(e);
        domEventFired = true;
    }

    return domEventFired || globalEventFired;
};

Promise.config = function(opts) {
    opts = Object(opts);
    if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
            Promise.longStackTraces();
        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
            disableLongStackTraces();
        }
    }
    if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;

        if (util.isObject(warningsOption)) {
            if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
            }
        }
    }
    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async.haveItemsQueued()) {
            throw new Error(
                "cannot enable cancellation after promises are in use");
        }
        Promise.prototype._clearCancellationData =
            cancellationClearCancellationData;
        Promise.prototype._propagateFrom = cancellationPropagateFrom;
        Promise.prototype._onCancel = cancellationOnCancel;
        Promise.prototype._setOnCancel = cancellationSetOnCancel;
        Promise.prototype._attachCancellationCallback =
            cancellationAttachCancellationCallback;
        Promise.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
    }
    if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
            config.monitoring = true;
            Promise.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
            config.monitoring = false;
            Promise.prototype._fireEvent = defaultFireEvent;
        }
    }
};

function defaultFireEvent() { return false; }

Promise.prototype._fireEvent = defaultFireEvent;
Promise.prototype._execute = function(executor, resolve, reject) {
    try {
        executor(resolve, reject);
    } catch (e) {
        return e;
    }
};
Promise.prototype._onCancel = function () {};
Promise.prototype._setOnCancel = function (handler) { ; };
Promise.prototype._attachCancellationCallback = function(onCancel) {
    ;
};
Promise.prototype._captureStackTrace = function () {};
Promise.prototype._attachExtraTrace = function () {};
Promise.prototype._clearCancellationData = function() {};
Promise.prototype._propagateFrom = function (parent, flags) {
    ;
    ;
};

function cancellationExecute(executor, resolve, reject) {
    var promise = this;
    try {
        executor(resolve, reject, function(onCancel) {
            if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " +
                                    util.toString(onCancel));
            }
            promise._attachCancellationCallback(onCancel);
        });
    } catch (e) {
        return e;
    }
}

function cancellationAttachCancellationCallback(onCancel) {
    if (!this._isCancellable()) return this;

    var previousOnCancel = this._onCancel();
    if (previousOnCancel !== undefined) {
        if (util.isArray(previousOnCancel)) {
            previousOnCancel.push(onCancel);
        } else {
            this._setOnCancel([previousOnCancel, onCancel]);
        }
    } else {
        this._setOnCancel(onCancel);
    }
}

function cancellationOnCancel() {
    return this._onCancelField;
}

function cancellationSetOnCancel(onCancel) {
    this._onCancelField = onCancel;
}

function cancellationClearCancellationData() {
    this._cancellationParent = undefined;
    this._onCancelField = undefined;
}

function cancellationPropagateFrom(parent, flags) {
    if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === undefined) {
            branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
    }
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}

function bindingPropagateFrom(parent, flags) {
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}
var propagateFromFunction = bindingPropagateFrom;

function boundValueFunction() {
    var ret = this._boundTo;
    if (ret !== undefined) {
        if (ret instanceof Promise) {
            if (ret.isFulfilled()) {
                return ret.value();
            } else {
                return undefined;
            }
        }
    }
    return ret;
}

function longStackTracesCaptureStackTrace() {
    this._trace = new CapturedTrace(this._peekContext());
}

function longStackTracesAttachExtraTrace(error, ignoreSelf) {
    if (canAttachTrace(error)) {
        var trace = this._trace;
        if (trace !== undefined) {
            if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== undefined) {
            trace.attachExtraTrace(error);
        } else if (!error.__stackCleaned__) {
            var parsed = parseStackAndMessage(error);
            util.notEnumerableProp(error, "stack",
                parsed.message + "\n" + parsed.stack.join("\n"));
            util.notEnumerableProp(error, "__stackCleaned__", true);
        }
    }
}

function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                               parent) {
    if (returnValue === undefined && promiseCreated !== null &&
        wForgottenReturn) {
        if (parent !== undefined && parent._returnedNonUndefined()) return;
        if ((promise._bitField & 65535) === 0) return;

        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
            var traceLines = promiseCreated._trace.stack.split("\n");
            var stack = cleanStack(traceLines);
            for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];
                if (!nodeFramePattern.test(line)) {
                    var lineMatches = line.match(parseLinePattern);
                    if (lineMatches) {
                        handlerLine  = "at " + lineMatches[1] +
                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                    }
                    break;
                }
            }

            if (stack.length > 0) {
                var firstUserLine = stack[0];
                for (var i = 0; i < traceLines.length; ++i) {

                    if (traceLines[i] === firstUserLine) {
                        if (i > 0) {
                            creatorLine = "\n" + traceLines[i - 1];
                        }
                        break;
                    }
                }

            }
        }
        var msg = "a promise was created in a " + name +
            "handler " + handlerLine + "but was not returned from it, " +
            "see http://goo.gl/rRqMUw" +
            creatorLine;
        promise._warn(msg, true, promiseCreated);
    }
}

function deprecated(name, replacement) {
    var message = name +
        " is deprecated and will be removed in a future version.";
    if (replacement) message += " Use " + replacement + " instead.";
    return warn(message);
}

function warn(message, shouldUseOwnTrace, promise) {
    if (!config.warnings) return;
    var warning = new Warning(message);
    var ctx;
    if (shouldUseOwnTrace) {
        promise._attachExtraTrace(warning);
    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
        ctx.attachExtraTrace(warning);
    } else {
        var parsed = parseStackAndMessage(warning);
        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
    }

    if (!activeFireEvent("warning", warning)) {
        formatAndLogError(warning, "", true);
    }
}

function reconstructStack(message, stacks) {
    for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
    }
    if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
    }
    return message + "\n" + stacks.join("\n");
}

function removeDuplicateOrEmptyJumps(stacks) {
    for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 ||
            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
            stacks.splice(i, 1);
            i--;
        }
    }
}

function removeCommonRoots(stacks) {
    var current = stacks[0];
    for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;

        for (var j = prev.length - 1; j >= 0; --j) {
            if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
            }
        }

        for (var j = commonRootMeetPoint; j >= 0; --j) {
            var line = prev[j];
            if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
            } else {
                break;
            }
        }
        current = prev;
    }
}

function cleanStack(stack) {
    var ret = [];
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line ||
            stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
            if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
            }
            ret.push(line);
        }
    }
    return ret;
}

function stackFramesAsArray(error) {
    var stack = error.stack.replace(/\s+$/g, "").split("\n");
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
            break;
        }
    }
    if (i > 0) {
        stack = stack.slice(i);
    }
    return stack;
}

function parseStackAndMessage(error) {
    var stack = error.stack;
    var message = error.toString();
    stack = typeof stack === "string" && stack.length > 0
                ? stackFramesAsArray(error) : ["    (No stack trace)"];
    return {
        message: message,
        stack: cleanStack(stack)
    };
}

function formatAndLogError(error, title, isSoft) {
    if (typeof console !== "undefined") {
        var message;
        if (util.isObject(error)) {
            var stack = error.stack;
            message = title + formatStack(stack, error);
        } else {
            message = title + String(error);
        }
        if (typeof printWarning === "function") {
            printWarning(message, isSoft);
        } else if (typeof console.log === "function" ||
            typeof console.log === "object") {
            console.log(message);
        }
    }
}

function fireRejectionEvent(name, localHandler, reason, promise) {
    var localEventFired = false;
    try {
        if (typeof localHandler === "function") {
            localEventFired = true;
            if (name === "rejectionHandled") {
                localHandler(promise);
            } else {
                localHandler(reason, promise);
            }
        }
    } catch (e) {
        async.throwLater(e);
    }

    if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
            formatAndLogError(reason, "Unhandled rejection ");
        }
    } else {
        activeFireEvent(name, promise);
    }
}

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    } else {
        str = obj && typeof obj.toString === "function"
            ? obj.toString() : util.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function longStackTracesIsSupported() {
    return typeof captureStackTrace === "function";
}

var shouldIgnore = function() { return false; };
var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line) {
    var matches = line.match(parseLineInfoRegex);
    if (matches) {
        return {
            fileName: matches[1],
            line: parseInt(matches[2], 10)
        };
    }
}

function setBounds(firstLineError, lastLineError) {
    if (!longStackTracesIsSupported()) return;
    var firstStackLines = firstLineError.stack.split("\n");
    var lastStackLines = lastLineError.stack.split("\n");
    var firstIndex = -1;
    var lastIndex = -1;
    var firstFileName;
    var lastFileName;
    for (var i = 0; i < firstStackLines.length; ++i) {
        var result = parseLineInfo(firstStackLines[i]);
        if (result) {
            firstFileName = result.fileName;
            firstIndex = result.line;
            break;
        }
    }
    for (var i = 0; i < lastStackLines.length; ++i) {
        var result = parseLineInfo(lastStackLines[i]);
        if (result) {
            lastFileName = result.fileName;
            lastIndex = result.line;
            break;
        }
    }
    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
        firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
    }

    shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
            if (info.fileName === firstFileName &&
                (firstIndex <= info.line && info.line <= lastIndex)) {
                return true;
            }
        }
        return false;
    };
}

function CapturedTrace(parent) {
    this._parent = parent;
    this._promisesCreated = 0;
    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
    captureStackTrace(this, CapturedTrace);
    if (length > 32) this.uncycle();
}
util.inherits(CapturedTrace, Error);
Context.CapturedTrace = CapturedTrace;

CapturedTrace.prototype.uncycle = function() {
    var length = this._length;
    if (length < 2) return;
    var nodes = [];
    var stackToIndex = {};

    for (var i = 0, node = this; node !== undefined; ++i) {
        nodes.push(node);
        node = node._parent;
    }
    length = this._length = i;
    for (var i = length - 1; i >= 0; --i) {
        var stack = nodes[i].stack;
        if (stackToIndex[stack] === undefined) {
            stackToIndex[stack] = i;
        }
    }
    for (var i = 0; i < length; ++i) {
        var currentStack = nodes[i].stack;
        var index = stackToIndex[currentStack];
        if (index !== undefined && index !== i) {
            if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
            }
            nodes[i]._parent = undefined;
            nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

            if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];
                cycleEdgeNode._parent.uncycle();
                cycleEdgeNode._length =
                    cycleEdgeNode._parent._length + 1;
            } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
            }
            var currentChildLength = cycleEdgeNode._length + 1;
            for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
            }
            return;
        }
    }
};

CapturedTrace.prototype.attachExtraTrace = function(error) {
    if (error.__stackCleaned__) return;
    this.uncycle();
    var parsed = parseStackAndMessage(error);
    var message = parsed.message;
    var stacks = [parsed.stack];

    var trace = this;
    while (trace !== undefined) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
    }
    removeCommonRoots(stacks);
    removeDuplicateOrEmptyJumps(stacks);
    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
    util.notEnumerableProp(error, "__stackCleaned__", true);
};

var captureStackTrace = (function stackDetection() {
    var v8stackFramePattern = /^\s*at\s*/;
    var v8stackFormatter = function(stack, error) {
        if (typeof stack === "string") return stack;

        if (error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace = Error.captureStackTrace;

        shouldIgnore = function(line) {
            return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
            Error.stackTraceLimit += 6;
            captureStackTrace(receiver, ignoreUntil);
            Error.stackTraceLimit -= 6;
        };
    }
    var err = new Error();

    if (typeof err.stack === "string" &&
        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace(o) {
            o.stack = new Error().stack;
        };
    }

    var hasStackAfterThrow;
    try { throw new Error(); }
    catch(e) {
        hasStackAfterThrow = ("stack" in e);
    }
    if (!("stack" in err) && hasStackAfterThrow &&
        typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace(o) {
            Error.stackTraceLimit += 6;
            try { throw new Error(); }
            catch(e) { o.stack = e.stack; }
            Error.stackTraceLimit -= 6;
        };
    }

    formatStack = function(stack, error) {
        if (typeof stack === "string") return stack;

        if ((typeof error === "object" ||
            typeof error === "function") &&
            error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    return null;

})([]);

if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
    printWarning = function (message) {
        console.warn(message);
    };
    if (util.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
            console.warn(color + message + "\u001b[0m\n");
        };
    } else if (!util.isNode && typeof (new Error().stack) === "string") {
        printWarning = function(message, isSoft) {
            console.warn("%c" + message,
                        isSoft ? "color: darkorange" : "color: red");
        };
    }
}

var config = {
    warnings: warnings,
    longStackTraces: false,
    cancellation: false,
    monitoring: false
};

if (longStackTraces) Promise.longStackTraces();

return {
    longStackTraces: function() {
        return config.longStackTraces;
    },
    warnings: function() {
        return config.warnings;
    },
    cancellation: function() {
        return config.cancellation;
    },
    monitoring: function() {
        return config.monitoring;
    },
    propagateFromFunction: function() {
        return propagateFromFunction;
    },
    boundValueFunction: function() {
        return boundValueFunction;
    },
    checkForgottenReturns: checkForgottenReturns,
    setBounds: setBounds,
    warn: warn,
    deprecated: deprecated,
    CapturedTrace: CapturedTrace,
    fireDomEvent: fireDomEvent,
    fireGlobalEvent: fireGlobalEvent
};
};

},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function returner() {
    return this.value;
}
function thrower() {
    throw this.reason;
}

Promise.prototype["return"] =
Promise.prototype.thenReturn = function (value) {
    if (value instanceof Promise) value.suppressUnhandledRejections();
    return this._then(
        returner, undefined, undefined, {value: value}, undefined);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow = function (reason) {
    return this._then(
        thrower, undefined, undefined, {reason: reason}, undefined);
};

Promise.prototype.catchThrow = function (reason) {
    if (arguments.length <= 1) {
        return this._then(
            undefined, thrower, undefined, {reason: reason}, undefined);
    } else {
        var _reason = arguments[1];
        var handler = function() {throw _reason;};
        return this.caught(reason, handler);
    }
};

Promise.prototype.catchReturn = function (value) {
    if (arguments.length <= 1) {
        if (value instanceof Promise) value.suppressUnhandledRejections();
        return this._then(
            undefined, returner, undefined, {value: value}, undefined);
    } else {
        var _value = arguments[1];
        if (_value instanceof Promise) _value.suppressUnhandledRejections();
        var handler = function() {return _value;};
        return this.caught(value, handler);
    }
};
};

},{}],11:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseReduce = Promise.reduce;
var PromiseAll = Promise.all;

function promiseAllThis() {
    return PromiseAll(this);
}

function PromiseMapSeries(promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
}

Promise.prototype.each = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, this, undefined);
};

Promise.prototype.mapSeries = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
};

Promise.each = function (promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, promises, undefined);
};

Promise.mapSeries = PromiseMapSeries;
};


},{}],12:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var Objectfreeze = es5.freeze;
var util = _dereq_("./util");
var inherits = util.inherits;
var notEnumerableProp = util.notEnumerableProp;

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        notEnumerableProp(this, "message",
            typeof message === "string" ? message : defaultMessage);
        notEnumerableProp(this, "name", nameProperty);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Error.call(this);
        }
    }
    inherits(SubError, Error);
    return SubError;
}

var _TypeError, _RangeError;
var Warning = subError("Warning", "warning");
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");
var AggregateError = subError("AggregateError", "aggregate error");
try {
    _TypeError = TypeError;
    _RangeError = RangeError;
} catch(e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
}

var methods = ("join pop push shift unshift slice filter forEach some " +
    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
}

es5.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
});
AggregateError.prototype["isOperational"] = true;
var level = 0;
AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:" + "\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret += str + "\n";
    }
    level--;
    return ret;
};

function OperationalError(message) {
    if (!(this instanceof OperationalError))
        return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError");
    notEnumerableProp(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;

    if (message instanceof Error) {
        notEnumerableProp(this, "message", message.message);
        notEnumerableProp(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits(OperationalError, Error);

var errorTypes = Error["__BluebirdErrorTypes__"];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        OperationalError: OperationalError,
        RejectionError: OperationalError,
        AggregateError: AggregateError
    });
    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: errorTypes,
        writable: false,
        enumerable: false,
        configurable: false
    });
}

module.exports = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning: Warning
};

},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
var isES5 = (function(){
    "use strict";
    return this === undefined;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5,
        propertyIsWritable: function(obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
        }
    };
} else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    var ObjectKeys = function (o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    };

    var ObjectGetDescriptor = function(o, key) {
        return {value: o[key]};
    };

    var ObjectDefineProperty = function (o, key, desc) {
        o[key] = desc.value;
        return o;
    };

    var ObjectFreeze = function (obj) {
        return obj;
    };

    var ObjectGetPrototypeOf = function (obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    };

    var ArrayIsArray = function (obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    };

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        names: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        getDescriptor: ObjectGetDescriptor,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5,
        propertyIsWritable: function() {
            return true;
        }
    };
}

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseMap = Promise.map;

Promise.prototype.filter = function (fn, options) {
    return PromiseMap(this, fn, options, INTERNAL);
};

Promise.filter = function (promises, fn, options) {
    return PromiseMap(promises, fn, options, INTERNAL);
};
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, tryConvertToPromise) {
var util = _dereq_("./util");
var CancellationError = Promise.CancellationError;
var errorObj = util.errorObj;

function PassThroughHandlerContext(promise, type, handler) {
    this.promise = promise;
    this.type = type;
    this.handler = handler;
    this.called = false;
    this.cancelPromise = null;
}

PassThroughHandlerContext.prototype.isFinallyHandler = function() {
    return this.type === 0;
};

function FinallyHandlerCancelReaction(finallyHandler) {
    this.finallyHandler = finallyHandler;
}

FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
    checkCancel(this.finallyHandler);
};

function checkCancel(ctx, reason) {
    if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
            ctx.cancelPromise._reject(reason);
        } else {
            ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
    }
    return false;
}

function succeed() {
    return finallyHandler.call(this, this.promise._target()._settledValue());
}
function fail(reason) {
    if (checkCancel(this, reason)) return;
    errorObj.e = reason;
    return errorObj;
}
function finallyHandler(reasonOrValue) {
    var promise = this.promise;
    var handler = this.handler;

    if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler()
            ? handler.call(promise._boundValue())
            : handler.call(promise._boundValue(), reasonOrValue);
        if (ret !== undefined) {
            promise._setReturnedNonUndefined();
            var maybePromise = tryConvertToPromise(ret, promise);
            if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                    if (maybePromise._isCancelled()) {
                        var reason =
                            new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        errorObj.e = reason;
                        return errorObj;
                    } else if (maybePromise.isPending()) {
                        maybePromise._attachCancellationCallback(
                            new FinallyHandlerCancelReaction(this));
                    }
                }
                return maybePromise._then(
                    succeed, fail, undefined, this, undefined);
            }
        }
    }

    if (promise.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
    } else {
        checkCancel(this);
        return reasonOrValue;
    }
}

Promise.prototype._passThrough = function(handler, type, success, fail) {
    if (typeof handler !== "function") return this.then();
    return this._then(success,
                      fail,
                      undefined,
                      new PassThroughHandlerContext(this, type, handler),
                      undefined);
};

Promise.prototype.lastly =
Promise.prototype["finally"] = function (handler) {
    return this._passThrough(handler,
                             0,
                             finallyHandler,
                             finallyHandler);
};

Promise.prototype.tap = function (handler) {
    return this._passThrough(handler, 1, finallyHandler);
};

return PassThroughHandlerContext;
};

},{"./util":36}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          apiRejection,
                          INTERNAL,
                          tryConvertToPromise,
                          Proxyable,
                          debug) {
var errors = _dereq_("./errors");
var TypeError = errors.TypeError;
var util = _dereq_("./util");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
var yieldHandlers = [];

function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
    for (var i = 0; i < yieldHandlers.length; ++i) {
        traceParent._pushContext();
        var result = tryCatch(yieldHandlers[i])(value);
        traceParent._popContext();
        if (result === errorObj) {
            traceParent._pushContext();
            var ret = Promise.reject(errorObj.e);
            traceParent._popContext();
            return ret;
        }
        var maybePromise = tryConvertToPromise(result, traceParent);
        if (maybePromise instanceof Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
    if (debug.cancellation()) {
        var internal = new Promise(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
        this._promise = internal.lastly(function() {
            return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
    } else {
        var promise = this._promise = new Promise(INTERNAL);
        promise._captureStackTrace();
    }
    this._stack = stack;
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = undefined;
    this._yieldHandlers = typeof yieldHandler === "function"
        ? [yieldHandler].concat(yieldHandlers)
        : yieldHandlers;
    this._yieldedPromise = null;
    this._cancellationPhase = false;
}
util.inherits(PromiseSpawn, Proxyable);

PromiseSpawn.prototype._isResolved = function() {
    return this._promise === null;
};

PromiseSpawn.prototype._cleanup = function() {
    this._promise = this._generator = null;
    if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
    }
};

PromiseSpawn.prototype._promiseCancelled = function() {
    if (this._isResolved()) return;
    var implementsReturn = typeof this._generator["return"] !== "undefined";

    var result;
    if (!implementsReturn) {
        var reason = new Promise.CancellationError(
            "generator .return() sentinel");
        Promise.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result = tryCatch(this._generator["throw"]).call(this._generator,
                                                         reason);
        this._promise._popContext();
    } else {
        this._promise._pushContext();
        result = tryCatch(this._generator["return"]).call(this._generator,
                                                          undefined);
        this._promise._popContext();
    }
    this._cancellationPhase = true;
    this._yieldedPromise = null;
    this._continue(result);
};

PromiseSpawn.prototype._promiseFulfilled = function(value) {
    this._yieldedPromise = null;
    this._promise._pushContext();
    var result = tryCatch(this._generator.next).call(this._generator, value);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._promiseRejected = function(reason) {
    this._yieldedPromise = null;
    this._promise._attachExtraTrace(reason);
    this._promise._pushContext();
    var result = tryCatch(this._generator["throw"])
        .call(this._generator, reason);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._resultCancelled = function() {
    if (this._yieldedPromise instanceof Promise) {
        var promise = this._yieldedPromise;
        this._yieldedPromise = null;
        promise.cancel();
    }
};

PromiseSpawn.prototype.promise = function () {
    return this._promise;
};

PromiseSpawn.prototype._run = function () {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = undefined;
    this._promiseFulfilled(undefined);
};

PromiseSpawn.prototype._continue = function (result) {
    var promise = this._promise;
    if (result === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._rejectCallback(result.e, false);
        }
    }

    var value = result.value;
    if (result.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._resolveCallback(value);
        }
    } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise)) {
            maybePromise =
                promiseFromYieldHandler(maybePromise,
                                        this._yieldHandlers,
                                        this._promise);
            if (maybePromise === null) {
                this._promiseRejected(
                    new TypeError(
                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", value) +
                        "From coroutine:\u000a" +
                        this._stack.split("\n").slice(1, -7).join("\n")
                    )
                );
                return;
            }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        ;
        if (((bitField & 50397184) === 0)) {
            this._yieldedPromise = maybePromise;
            maybePromise._proxy(this, null);
        } else if (((bitField & 33554432) !== 0)) {
            Promise._async.invoke(
                this._promiseFulfilled, this, maybePromise._value()
            );
        } else if (((bitField & 16777216) !== 0)) {
            Promise._async.invoke(
                this._promiseRejected, this, maybePromise._reason()
            );
        } else {
            this._promiseCancelled();
        }
    }
};

Promise.coroutine = function (generatorFunction, options) {
    if (typeof generatorFunction !== "function") {
        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var yieldHandler = Object(options).yieldHandler;
    var PromiseSpawn$ = PromiseSpawn;
    var stack = new Error().stack;
    return function () {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                      stack);
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(undefined);
        return ret;
    };
};

Promise.coroutine.addYieldHandler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    yieldHandlers.push(fn);
};

Promise.spawn = function (generatorFunction) {
    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
    if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var spawn = new PromiseSpawn(generatorFunction, this);
    var ret = spawn.promise();
    spawn._run(Promise.spawn);
    return ret;
};
};

},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
         getDomain) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var reject;

if (false) {
if (canEvaluate) {
    var thenCallback = function(i) {
        return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
    };

    var promiseSetter = function(i) {
        return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
    };

    var generateHolderClass = function(total) {
        var props = new Array(total);
        for (var i = 0; i < props.length; ++i) {
            props[i] = "this.p" + (i+1);
        }
        var assignment = props.join(" = ") + " = null;";
        var cancellationCode= "var promise;\n" + props.map(function(prop) {
            return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
        }).join("\n");
        var passedArguments = props.join(", ");
        var name = "Holder$" + total;


        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

        code = code.replace(/\[TheName\]/g, name)
            .replace(/\[TheTotal\]/g, total)
            .replace(/\[ThePassedArguments\]/g, passedArguments)
            .replace(/\[TheProperties\]/g, assignment)
            .replace(/\[CancellationCode\]/g, cancellationCode);

        return new Function("tryCatch", "errorObj", "Promise", "async", code)
                           (tryCatch, errorObj, Promise, async);
    };

    var holderClasses = [];
    var thenCallbacks = [];
    var promiseSetters = [];

    for (var i = 0; i < 8; ++i) {
        holderClasses.push(generateHolderClass(i + 1));
        thenCallbacks.push(thenCallback(i + 1));
        promiseSetters.push(promiseSetter(i + 1));
    }

    reject = function (reason) {
        this._reject(reason);
    };
}}

Promise.join = function () {
    var last = arguments.length - 1;
    var fn;
    if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        if (false) {
            if (last <= 8 && canEvaluate) {
                var ret = new Promise(INTERNAL);
                ret._captureStackTrace();
                var HolderClass = holderClasses[last - 1];
                var holder = new HolderClass(fn);
                var callbacks = thenCallbacks;

                for (var i = 0; i < last; ++i) {
                    var maybePromise = tryConvertToPromise(arguments[i], ret);
                    if (maybePromise instanceof Promise) {
                        maybePromise = maybePromise._target();
                        var bitField = maybePromise._bitField;
                        ;
                        if (((bitField & 50397184) === 0)) {
                            maybePromise._then(callbacks[i], reject,
                                               undefined, ret, holder);
                            promiseSetters[i](maybePromise, holder);
                            holder.asyncNeeded = false;
                        } else if (((bitField & 33554432) !== 0)) {
                            callbacks[i].call(ret,
                                              maybePromise._value(), holder);
                        } else if (((bitField & 16777216) !== 0)) {
                            ret._reject(maybePromise._reason());
                        } else {
                            ret._cancel();
                        }
                    } else {
                        callbacks[i].call(ret, maybePromise, holder);
                    }
                }

                if (!ret._isFateSealed()) {
                    if (holder.asyncNeeded) {
                        var domain = getDomain();
                        if (domain !== null) {
                            holder.fn = util.domainBind(domain, holder.fn);
                        }
                    }
                    ret._setAsyncGuaranteed();
                    ret._setOnCancel(holder);
                }
                return ret;
            }
        }
    }
    var args = [].slice.call(arguments);;
    if (fn) args.pop();
    var ret = new PromiseArray(args).promise();
    return fn !== undefined ? ret.spread(fn) : ret;
};

};

},{"./util":36}],18:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

function MappingPromiseArray(promises, fn, limit, _filter) {
    this.constructor$(promises);
    this._promise._captureStackTrace();
    var domain = getDomain();
    this._callback = domain === null ? fn : util.domainBind(domain, fn);
    this._preservedValues = _filter === INTERNAL
        ? new Array(this.length())
        : null;
    this._limit = limit;
    this._inFlight = 0;
    this._queue = [];
    async.invoke(this._asyncInit, this, undefined);
}
util.inherits(MappingPromiseArray, PromiseArray);

MappingPromiseArray.prototype._asyncInit = function() {
    this._init$(undefined, -2);
};

MappingPromiseArray.prototype._init = function () {};

MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var values = this._values;
    var length = this.length();
    var preservedValues = this._preservedValues;
    var limit = this._limit;

    if (index < 0) {
        index = (index * -1) - 1;
        values[index] = value;
        if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return true;
        }
    } else {
        if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return false;
        }
        if (preservedValues !== null) preservedValues[index] = value;

        var promise = this._promise;
        var callback = this._callback;
        var receiver = promise._boundValue();
        promise._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length);
        var promiseCreated = promise._popContext();
        debug.checkForgottenReturns(
            ret,
            promiseCreated,
            preservedValues !== null ? "Promise.filter" : "Promise.map",
            promise
        );
        if (ret === errorObj) {
            this._reject(ret.e);
            return true;
        }

        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            ;
            if (((bitField & 50397184) === 0)) {
                if (limit >= 1) this._inFlight++;
                values[index] = maybePromise;
                maybePromise._proxy(this, (index + 1) * -1);
                return false;
            } else if (((bitField & 33554432) !== 0)) {
                ret = maybePromise._value();
            } else if (((bitField & 16777216) !== 0)) {
                this._reject(maybePromise._reason());
                return true;
            } else {
                this._cancel();
                return true;
            }
        }
        values[index] = ret;
    }
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= length) {
        if (preservedValues !== null) {
            this._filter(values, preservedValues);
        } else {
            this._resolve(values);
        }
        return true;
    }
    return false;
};

MappingPromiseArray.prototype._drainQueue = function () {
    var queue = this._queue;
    var limit = this._limit;
    var values = this._values;
    while (queue.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
    }
};

MappingPromiseArray.prototype._filter = function (booleans, values) {
    var len = values.length;
    var ret = new Array(len);
    var j = 0;
    for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
    }
    ret.length = j;
    this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues = function () {
    return this._preservedValues;
};

function map(promises, fn, options, _filter) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }

    var limit = 0;
    if (options !== undefined) {
        if (typeof options === "object" && options !== null) {
            if (typeof options.concurrency !== "number") {
                return Promise.reject(
                    new TypeError("'concurrency' must be a number but it is " +
                                    util.classString(options.concurrency)));
            }
            limit = options.concurrency;
        } else {
            return Promise.reject(new TypeError(
                            "options argument must be an object but it is " +
                             util.classString(options)));
        }
    }
    limit = typeof limit === "number" &&
        isFinite(limit) && limit >= 1 ? limit : 0;
    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
}

Promise.prototype.map = function (fn, options) {
    return map(this, fn, options, null);
};

Promise.map = function (promises, fn, options, _filter) {
    return map(promises, fn, options, _filter);
};


};

},{"./util":36}],19:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

Promise.method = function (fn) {
    if (typeof fn !== "function") {
        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
    }
    return function () {
        var ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
            value, promiseCreated, "Promise.method", ret);
        ret._resolveFromSyncValue(value);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._pushContext();
    var value;
    if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                  : tryCatch(fn).call(ctx, arg);
    } else {
        value = tryCatch(fn)();
    }
    var promiseCreated = ret._popContext();
    debug.checkForgottenReturns(
        value, promiseCreated, "Promise.try", ret);
    ret._resolveFromSyncValue(value);
    return ret;
};

Promise.prototype._resolveFromSyncValue = function (value) {
    if (value === util.errorObj) {
        this._rejectCallback(value.e, false);
    } else {
        this._resolveCallback(value, true);
    }
};
};

},{"./util":36}],20:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var maybeWrapAsError = util.maybeWrapAsError;
var errors = _dereq_("./errors");
var OperationalError = errors.OperationalError;
var es5 = _dereq_("./es5");

function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

var rErrorKey = /^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new OperationalError(obj);
        ret.name = obj.name;
        ret.message = obj.message;
        ret.stack = obj.stack;
        var keys = es5.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!rErrorKey.test(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    util.markAsOriginatingFromRejection(obj);
    return obj;
}

function nodebackForPromise(promise, multiArgs) {
    return function(err, value) {
        if (promise === null) return;
        if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        } else if (!multiArgs) {
            promise._fulfill(value);
        } else {
            var args = [].slice.call(arguments, 1);;
            promise._fulfill(args);
        }
        promise = null;
    };
}

module.exports = nodebackForPromise;

},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var util = _dereq_("./util");
var async = Promise._async;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function spreadAdapter(val, nodeback) {
    var promise = this;
    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
    var ret =
        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

function successAdapter(val, nodeback) {
    var promise = this;
    var receiver = promise._boundValue();
    var ret = val === undefined
        ? tryCatch(nodeback).call(receiver, null)
        : tryCatch(nodeback).call(receiver, null, val);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}
function errorAdapter(reason, nodeback) {
    var promise = this;
    if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
    }
    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                     options) {
    if (typeof nodeback == "function") {
        var adapter = successAdapter;
        if (options !== undefined && Object(options).spread) {
            adapter = spreadAdapter;
        }
        this._then(
            adapter,
            errorAdapter,
            undefined,
            this,
            nodeback
        );
    }
    return this;
};
};

},{"./util":36}],22:[function(_dereq_,module,exports){
"use strict";
module.exports = function() {
var makeSelfResolutionError = function () {
    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var reflectHandler = function() {
    return new Promise.PromiseInspection(this._target());
};
var apiRejection = function(msg) {
    return Promise.reject(new TypeError(msg));
};
function Proxyable() {}
var UNDEFINED_BINDING = {};
var util = _dereq_("./util");

var getDomain;
if (util.isNode) {
    getDomain = function() {
        var ret = process.domain;
        if (ret === undefined) ret = null;
        return ret;
    };
} else {
    getDomain = function() {
        return null;
    };
}
util.notEnumerableProp(Promise, "_getDomain", getDomain);

var es5 = _dereq_("./es5");
var Async = _dereq_("./async");
var async = new Async();
es5.defineProperty(Promise, "_async", {value: async});
var errors = _dereq_("./errors");
var TypeError = Promise.TypeError = errors.TypeError;
Promise.RangeError = errors.RangeError;
var CancellationError = Promise.CancellationError = errors.CancellationError;
Promise.TimeoutError = errors.TimeoutError;
Promise.OperationalError = errors.OperationalError;
Promise.RejectionError = errors.OperationalError;
Promise.AggregateError = errors.AggregateError;
var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {};
var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
var PromiseArray =
    _dereq_("./promise_array")(Promise, INTERNAL,
                               tryConvertToPromise, apiRejection, Proxyable);
var Context = _dereq_("./context")(Promise);
 /*jshint unused:false*/
var createContext = Context.create;
var debug = _dereq_("./debuggability")(Promise, Context);
var CapturedTrace = debug.CapturedTrace;
var PassThroughHandlerContext =
    _dereq_("./finally")(Promise, tryConvertToPromise);
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
var nodebackForPromise = _dereq_("./nodeback");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
function check(self, executor) {
    if (typeof executor !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(executor));
    }
    if (self.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
}

function Promise(executor) {
    this._bitField = 0;
    this._fulfillmentHandler0 = undefined;
    this._rejectionHandler0 = undefined;
    this._promise0 = undefined;
    this._receiver0 = undefined;
    if (executor !== INTERNAL) {
        check(this, executor);
        this._resolveFromExecutor(executor);
    }
    this._promiseCreated();
    this._fireEvent("promiseCreated", this);
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return apiRejection("expecting an object but got " +
                    "A catch statement predicate " + util.classString(item));
            }
        }
        catchInstances.length = j;
        fn = arguments[i];
        return this.then(undefined, catchFilter(catchInstances, fn, this));
    }
    return this.then(undefined, fn);
};

Promise.prototype.reflect = function () {
    return this._then(reflectHandler,
        reflectHandler, undefined, this, undefined);
};

Promise.prototype.then = function (didFulfill, didReject) {
    if (debug.warnings() && arguments.length > 0 &&
        typeof didFulfill !== "function" &&
        typeof didReject !== "function") {
        var msg = ".then() only accepts functions but was passed: " +
                util.classString(didFulfill);
        if (arguments.length > 1) {
            msg += ", " + util.classString(didReject);
        }
        this._warn(msg);
    }
    return this._then(didFulfill, didReject, undefined, undefined, undefined);
};

Promise.prototype.done = function (didFulfill, didReject) {
    var promise =
        this._then(didFulfill, didReject, undefined, undefined, undefined);
    promise._setIsFinal();
};

Promise.prototype.spread = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
};

Promise.prototype.toJSON = function () {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: undefined,
        rejectionReason: undefined
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this.value();
        ret.isFulfilled = true;
    } else if (this.isRejected()) {
        ret.rejectionReason = this.reason();
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function () {
    if (arguments.length > 0) {
        this._warn(".all() was passed arguments but it does not take any");
    }
    return new PromiseArray(this).promise();
};

Promise.prototype.error = function (fn) {
    return this.caught(util.originatesFromRejection, fn);
};

Promise.getNewLibraryCopy = module.exports;

Promise.is = function (val) {
    return val instanceof Promise;
};

Promise.fromNode = Promise.fromCallback = function(fn) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                         : false;
    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
    if (result === errorObj) {
        ret._rejectCallback(result.e, true);
    }
    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
    return ret;
};

Promise.all = function (promises) {
    return new PromiseArray(promises).promise();
};

Promise.cast = function (obj) {
    var ret = tryConvertToPromise(obj);
    if (!(ret instanceof Promise)) {
        ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._setFulfilled();
        ret._rejectionHandler0 = obj;
    }
    return ret;
};

Promise.resolve = Promise.fulfilled = Promise.cast;

Promise.reject = Promise.rejected = function (reason) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._rejectCallback(reason, true);
    return ret;
};

Promise.setScheduler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    return async.setScheduler(fn);
};

Promise.prototype._then = function (
    didFulfill,
    didReject,
    _,    receiver,
    internalData
) {
    var haveInternalData = internalData !== undefined;
    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
    var target = this._target();
    var bitField = target._bitField;

    if (!haveInternalData) {
        promise._propagateFrom(this, 3);
        promise._captureStackTrace();
        if (receiver === undefined &&
            ((this._bitField & 2097152) !== 0)) {
            if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
            } else {
                receiver = target === this ? undefined : this._boundTo;
            }
        }
        this._fireEvent("promiseChained", this, promise);
    }

    var domain = getDomain();
    if (!((bitField & 50397184) === 0)) {
        var handler, value, settler = target._settlePromiseCtx;
        if (((bitField & 33554432) !== 0)) {
            value = target._rejectionHandler0;
            handler = didFulfill;
        } else if (((bitField & 16777216) !== 0)) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
        } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
        }

        async.invoke(settler, target, {
            handler: domain === null ? handler
                : (typeof handler === "function" &&
                    util.domainBind(domain, handler)),
            promise: promise,
            receiver: receiver,
            value: value
        });
    } else {
        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
    }

    return promise;
};

Promise.prototype._length = function () {
    return this._bitField & 65535;
};

Promise.prototype._isFateSealed = function () {
    return (this._bitField & 117506048) !== 0;
};

Promise.prototype._isFollowing = function () {
    return (this._bitField & 67108864) === 67108864;
};

Promise.prototype._setLength = function (len) {
    this._bitField = (this._bitField & -65536) |
        (len & 65535);
};

Promise.prototype._setFulfilled = function () {
    this._bitField = this._bitField | 33554432;
    this._fireEvent("promiseFulfilled", this);
};

Promise.prototype._setRejected = function () {
    this._bitField = this._bitField | 16777216;
    this._fireEvent("promiseRejected", this);
};

Promise.prototype._setFollowing = function () {
    this._bitField = this._bitField | 67108864;
    this._fireEvent("promiseResolved", this);
};

Promise.prototype._setIsFinal = function () {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._isFinal = function () {
    return (this._bitField & 4194304) > 0;
};

Promise.prototype._unsetCancelled = function() {
    this._bitField = this._bitField & (~65536);
};

Promise.prototype._setCancelled = function() {
    this._bitField = this._bitField | 65536;
    this._fireEvent("promiseCancelled", this);
};

Promise.prototype._setWillBeCancelled = function() {
    this._bitField = this._bitField | 8388608;
};

Promise.prototype._setAsyncGuaranteed = function() {
    if (async.hasCustomScheduler()) return;
    this._bitField = this._bitField | 134217728;
};

Promise.prototype._receiverAt = function (index) {
    var ret = index === 0 ? this._receiver0 : this[
            index * 4 - 4 + 3];
    if (ret === UNDEFINED_BINDING) {
        return undefined;
    } else if (ret === undefined && this._isBound()) {
        return this._boundValue();
    }
    return ret;
};

Promise.prototype._promiseAt = function (index) {
    return this[
            index * 4 - 4 + 2];
};

Promise.prototype._fulfillmentHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 0];
};

Promise.prototype._rejectionHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 1];
};

Promise.prototype._boundValue = function() {};

Promise.prototype._migrateCallback0 = function (follower) {
    var bitField = follower._bitField;
    var fulfill = follower._fulfillmentHandler0;
    var reject = follower._rejectionHandler0;
    var promise = follower._promise0;
    var receiver = follower._receiverAt(0);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._migrateCallbackAt = function (follower, index) {
    var fulfill = follower._fulfillmentHandlerAt(index);
    var reject = follower._rejectionHandlerAt(index);
    var promise = follower._promiseAt(index);
    var receiver = follower._receiverAt(index);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._addCallbacks = function (
    fulfill,
    reject,
    promise,
    receiver,
    domain
) {
    var index = this._length();

    if (index >= 65535 - 4) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        this._receiver0 = receiver;
        if (typeof fulfill === "function") {
            this._fulfillmentHandler0 =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this._rejectionHandler0 =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    } else {
        var base = index * 4 - 4;
        this[base + 2] = promise;
        this[base + 3] = receiver;
        if (typeof fulfill === "function") {
            this[base + 0] =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this[base + 1] =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    }
    this._setLength(index + 1);
    return index;
};

Promise.prototype._proxy = function (proxyable, arg) {
    this._addCallbacks(undefined, undefined, arg, proxyable, null);
};

Promise.prototype._resolveCallback = function(value, shouldBind) {
    if (((this._bitField & 117506048) !== 0)) return;
    if (value === this)
        return this._rejectCallback(makeSelfResolutionError(), false);
    var maybePromise = tryConvertToPromise(value, this);
    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

    if (shouldBind) this._propagateFrom(maybePromise, 2);

    var promise = maybePromise._target();

    if (promise === this) {
        this._reject(makeSelfResolutionError());
        return;
    }

    var bitField = promise._bitField;
    if (((bitField & 50397184) === 0)) {
        var len = this._length();
        if (len > 0) promise._migrateCallback0(this);
        for (var i = 1; i < len; ++i) {
            promise._migrateCallbackAt(this, i);
        }
        this._setFollowing();
        this._setLength(0);
        this._setFollowee(promise);
    } else if (((bitField & 33554432) !== 0)) {
        this._fulfill(promise._value());
    } else if (((bitField & 16777216) !== 0)) {
        this._reject(promise._reason());
    } else {
        var reason = new CancellationError("late cancellation observer");
        promise._attachExtraTrace(reason);
        this._reject(reason);
    }
};

Promise.prototype._rejectCallback =
function(reason, synchronous, ignoreNonErrorWarnings) {
    var trace = util.ensureErrorObject(reason);
    var hasStack = trace === reason;
    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " +
            util.classString(reason);
        this._warn(message, true);
    }
    this._attachExtraTrace(trace, synchronous ? hasStack : false);
    this._reject(reason);
};

Promise.prototype._resolveFromExecutor = function (executor) {
    var promise = this;
    this._captureStackTrace();
    this._pushContext();
    var synchronous = true;
    var r = this._execute(executor, function(value) {
        promise._resolveCallback(value);
    }, function (reason) {
        promise._rejectCallback(reason, synchronous);
    });
    synchronous = false;
    this._popContext();

    if (r !== undefined) {
        promise._rejectCallback(r, true);
    }
};

Promise.prototype._settlePromiseFromHandler = function (
    handler, receiver, value, promise
) {
    var bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;
    promise._pushContext();
    var x;
    if (receiver === APPLY) {
        if (!value || typeof value.length !== "number") {
            x = errorObj;
            x.e = new TypeError("cannot .spread() a non-array: " +
                                    util.classString(value));
        } else {
            x = tryCatch(handler).apply(this._boundValue(), value);
        }
    } else {
        x = tryCatch(handler).call(receiver, value);
    }
    var promiseCreated = promise._popContext();
    bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;

    if (x === NEXT_FILTER) {
        promise._reject(value);
    } else if (x === errorObj) {
        promise._rejectCallback(x.e, false);
    } else {
        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
        promise._resolveCallback(x);
    }
};

Promise.prototype._target = function() {
    var ret = this;
    while (ret._isFollowing()) ret = ret._followee();
    return ret;
};

Promise.prototype._followee = function() {
    return this._rejectionHandler0;
};

Promise.prototype._setFollowee = function(promise) {
    this._rejectionHandler0 = promise;
};

Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
    var isPromise = promise instanceof Promise;
    var bitField = this._bitField;
    var asyncGuaranteed = ((bitField & 134217728) !== 0);
    if (((bitField & 65536) !== 0)) {
        if (isPromise) promise._invokeInternalOnCancel();

        if (receiver instanceof PassThroughHandlerContext &&
            receiver.isFinallyHandler()) {
            receiver.cancelPromise = promise;
            if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
            }
        } else if (handler === reflectHandler) {
            promise._fulfill(reflectHandler.call(receiver));
        } else if (receiver instanceof Proxyable) {
            receiver._promiseCancelled(promise);
        } else if (isPromise || promise instanceof PromiseArray) {
            promise._cancel();
        } else {
            receiver.cancel();
        }
    } else if (typeof handler === "function") {
        if (!isPromise) {
            handler.call(receiver, value, promise);
        } else {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (receiver instanceof Proxyable) {
        if (!receiver._isResolved()) {
            if (((bitField & 33554432) !== 0)) {
                receiver._promiseFulfilled(value, promise);
            } else {
                receiver._promiseRejected(value, promise);
            }
        }
    } else if (isPromise) {
        if (asyncGuaranteed) promise._setAsyncGuaranteed();
        if (((bitField & 33554432) !== 0)) {
            promise._fulfill(value);
        } else {
            promise._reject(value);
        }
    }
};

Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
    var handler = ctx.handler;
    var promise = ctx.promise;
    var receiver = ctx.receiver;
    var value = ctx.value;
    if (typeof handler === "function") {
        if (!(promise instanceof Promise)) {
            handler.call(receiver, value, promise);
        } else {
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (promise instanceof Promise) {
        promise._reject(value);
    }
};

Promise.prototype._settlePromiseCtx = function(ctx) {
    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
};

Promise.prototype._settlePromise0 = function(handler, value, bitField) {
    var promise = this._promise0;
    var receiver = this._receiverAt(0);
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._settlePromise(promise, handler, receiver, value);
};

Promise.prototype._clearCallbackDataAtIndex = function(index) {
    var base = index * 4 - 4;
    this[base + 2] =
    this[base + 3] =
    this[base + 0] =
    this[base + 1] = undefined;
};

Promise.prototype._fulfill = function (value) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._reject(err);
    }
    this._setFulfilled();
    this._rejectionHandler0 = value;

    if ((bitField & 65535) > 0) {
        if (((bitField & 134217728) !== 0)) {
            this._settlePromises();
        } else {
            async.settlePromises(this);
        }
    }
};

Promise.prototype._reject = function (reason) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    this._setRejected();
    this._fulfillmentHandler0 = reason;

    if (this._isFinal()) {
        return async.fatalError(reason, util.isNode);
    }

    if ((bitField & 65535) > 0) {
        async.settlePromises(this);
    } else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._fulfillPromises = function (len, value) {
    for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, value);
    }
};

Promise.prototype._rejectPromises = function (len, reason) {
    for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, reason);
    }
};

Promise.prototype._settlePromises = function () {
    var bitField = this._bitField;
    var len = (bitField & 65535);

    if (len > 0) {
        if (((bitField & 16842752) !== 0)) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
        } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
        }
        this._setLength(0);
    }
    this._clearCancellationData();
};

Promise.prototype._settledValue = function() {
    var bitField = this._bitField;
    if (((bitField & 33554432) !== 0)) {
        return this._rejectionHandler0;
    } else if (((bitField & 16777216) !== 0)) {
        return this._fulfillmentHandler0;
    }
};

function deferResolve(v) {this.promise._resolveCallback(v);}
function deferReject(v) {this.promise._rejectCallback(v, false);}

Promise.defer = Promise.pending = function() {
    debug.deprecated("Promise.defer", "new Promise");
    var promise = new Promise(INTERNAL);
    return {
        promise: promise,
        resolve: deferResolve,
        reject: deferReject
    };
};

util.notEnumerableProp(Promise,
                       "_makeSelfResolutionError",
                       makeSelfResolutionError);

_dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
    debug);
_dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
_dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
_dereq_("./direct_resolve")(Promise);
_dereq_("./synchronous_inspection")(Promise);
_dereq_("./join")(
    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
Promise.Promise = Promise;
Promise.version = "3.4.6";
_dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./call_get.js')(Promise);
_dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
_dereq_('./timers.js')(Promise, INTERNAL, debug);
_dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
_dereq_('./nodeify.js')(Promise);
_dereq_('./promisify.js')(Promise, INTERNAL);
_dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
_dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
_dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./settle.js')(Promise, PromiseArray, debug);
_dereq_('./some.js')(Promise, PromiseArray, apiRejection);
_dereq_('./filter.js')(Promise, INTERNAL);
_dereq_('./each.js')(Promise, INTERNAL);
_dereq_('./any.js')(Promise);
                                                         
    util.toFastProperties(Promise);                                          
    util.toFastProperties(Promise.prototype);                                
    function fillTypes(value) {                                              
        var p = new Promise(INTERNAL);                                       
        p._fulfillmentHandler0 = value;                                      
        p._rejectionHandler0 = value;                                        
        p._promise0 = value;                                                 
        p._receiver0 = value;                                                
    }                                                                        
    // Complete slack tracking, opt out of field-type tracking and           
    // stabilize map                                                         
    fillTypes({a: 1});                                                       
    fillTypes({b: 2});                                                       
    fillTypes({c: 3});                                                       
    fillTypes(1);                                                            
    fillTypes(function(){});                                                 
    fillTypes(undefined);                                                    
    fillTypes(false);                                                        
    fillTypes(new Promise(INTERNAL));                                        
    debug.setBounds(Async.firstLineError, util.lastLineError);               
    return Promise;                                                          

};

},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise,
    apiRejection, Proxyable) {
var util = _dereq_("./util");
var isArray = util.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -2: return [];
    case -3: return {};
    }
}

function PromiseArray(values) {
    var promise = this._promise = new Promise(INTERNAL);
    if (values instanceof Promise) {
        promise._propagateFrom(values, 3);
    }
    promise._setOnCancel(this);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(undefined, -2);
}
util.inherits(PromiseArray, Proxyable);

PromiseArray.prototype.length = function () {
    return this._length;
};

PromiseArray.prototype.promise = function () {
    return this._promise;
};

PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
    var values = tryConvertToPromise(this._values, this._promise);
    if (values instanceof Promise) {
        values = values._target();
        var bitField = values._bitField;
        ;
        this._values = values;

        if (((bitField & 50397184) === 0)) {
            this._promise._setAsyncGuaranteed();
            return values._then(
                init,
                this._reject,
                undefined,
                this,
                resolveValueIfEmpty
           );
        } else if (((bitField & 33554432) !== 0)) {
            values = values._value();
        } else if (((bitField & 16777216) !== 0)) {
            return this._reject(values._reason());
        } else {
            return this._cancel();
        }
    }
    values = util.asArray(values);
    if (values === null) {
        var err = apiRejection(
            "expecting an array or an iterable object but got " + util.classString(values)).reason();
        this._promise._rejectCallback(err, false);
        return;
    }

    if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    this._iterate(values);
};

PromiseArray.prototype._iterate = function(values) {
    var len = this.getActualLength(values.length);
    this._length = len;
    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
    var result = this._promise;
    var isResolved = false;
    var bitField = null;
    for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);

        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            bitField = maybePromise._bitField;
        } else {
            bitField = null;
        }

        if (isResolved) {
            if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
            }
        } else if (bitField !== null) {
            if (((bitField & 50397184) === 0)) {
                maybePromise._proxy(this, i);
                this._values[i] = maybePromise;
            } else if (((bitField & 33554432) !== 0)) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
            } else if (((bitField & 16777216) !== 0)) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
            } else {
                isResolved = this._promiseCancelled(i);
            }
        } else {
            isResolved = this._promiseFulfilled(maybePromise, i);
        }
    }
    if (!isResolved) result._setAsyncGuaranteed();
};

PromiseArray.prototype._isResolved = function () {
    return this._values === null;
};

PromiseArray.prototype._resolve = function (value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype._cancel = function() {
    if (this._isResolved() || !this._promise._isCancellable()) return;
    this._values = null;
    this._promise._cancel();
};

PromiseArray.prototype._reject = function (reason) {
    this._values = null;
    this._promise._rejectCallback(reason, false);
};

PromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

PromiseArray.prototype._promiseCancelled = function() {
    this._cancel();
    return true;
};

PromiseArray.prototype._promiseRejected = function (reason) {
    this._totalResolved++;
    this._reject(reason);
    return true;
};

PromiseArray.prototype._resultCancelled = function() {
    if (this._isResolved()) return;
    var values = this._values;
    this._cancel();
    if (values instanceof Promise) {
        values.cancel();
    } else {
        for (var i = 0; i < values.length; ++i) {
            if (values[i] instanceof Promise) {
                values[i].cancel();
            }
        }
    }
};

PromiseArray.prototype.shouldCopyValues = function () {
    return true;
};

PromiseArray.prototype.getActualLength = function (len) {
    return len;
};

return PromiseArray;
};

},{"./util":36}],24:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var THIS = {};
var util = _dereq_("./util");
var nodebackForPromise = _dereq_("./nodeback");
var withAppended = util.withAppended;
var maybeWrapAsError = util.maybeWrapAsError;
var canEvaluate = util.canEvaluate;
var TypeError = _dereq_("./errors").TypeError;
var defaultSuffix = "Async";
var defaultPromisified = {__isPromisified__: true};
var noCopyProps = [
    "arity",    "length",
    "name",
    "arguments",
    "caller",
    "callee",
    "prototype",
    "__isPromisified__"
];
var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

var defaultFilter = function(name) {
    return util.isIdentifier(name) &&
        name.charAt(0) !== "_" &&
        name !== "constructor";
};

function propsFilter(key) {
    return !noCopyPropsPattern.test(key);
}

function isPromisified(fn) {
    try {
        return fn.__isPromisified__ === true;
    }
    catch (e) {
        return false;
    }
}

function hasPromisified(obj, key, suffix) {
    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                                            defaultPromisified);
    return val ? isPromisified(val) : false;
}
function checkValid(ret, suffix, suffixRegexp) {
    for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                        .replace("%s", suffix));
                }
            }
        }
    }
}

function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
    var keys = util.inheritedDataKeys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var passesDefaultFilter = filter === defaultFilter
            ? true : defaultFilter(key, value, obj);
        if (typeof value === "function" &&
            !isPromisified(value) &&
            !hasPromisified(obj, key, suffix) &&
            filter(key, value, obj, passesDefaultFilter)) {
            ret.push(key, value);
        }
    }
    checkValid(ret, suffix, suffixRegexp);
    return ret;
}

var escapeIdentRegex = function(str) {
    return str.replace(/([$])/, "\\$");
};

var makeNodePromisifiedEval;
if (false) {
var switchCaseArgumentOrder = function(likelyArgumentCount) {
    var ret = [likelyArgumentCount];
    var min = Math.max(0, likelyArgumentCount - 1 - 3);
    for(var i = likelyArgumentCount - 1; i >= min; --i) {
        ret.push(i);
    }
    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
        ret.push(i);
    }
    return ret;
};

var argumentSequence = function(argumentCount) {
    return util.filledRange(argumentCount, "_arg", "");
};

var parameterDeclaration = function(parameterCount) {
    return util.filledRange(
        Math.max(parameterCount, 3), "_arg", "");
};

var parameterCount = function(fn) {
    if (typeof fn.length === "number") {
        return Math.max(Math.min(fn.length, 1023 + 1), 0);
    }
    return 0;
};

makeNodePromisifiedEval =
function(callback, receiver, originalName, fn, _, multiArgs) {
    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
    var shouldProxyThis = typeof callback === "string" || receiver === THIS;

    function generateCallForArgumentCount(count) {
        var args = argumentSequence(count).join(", ");
        var comma = count > 0 ? ", " : "";
        var ret;
        if (shouldProxyThis) {
            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
        } else {
            ret = receiver === undefined
                ? "ret = callback({{args}}, nodeback); break;\n"
                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
        }
        return ret.replace("{{args}}", args).replace(", ", comma);
    }

    function generateArgumentSwitchCase() {
        var ret = "";
        for (var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] +":" +
                generateCallForArgumentCount(argumentOrder[i]);
        }

        ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                ? "ret = callback.apply(this, args);\n"
                                : "ret = callback.apply(receiver, args);\n"));
        return ret;
    }

    var getFunctionCode = typeof callback === "string"
                                ? ("this != null ? this['"+callback+"'] : fn")
                                : "fn";
    var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
        .replace("[GetFunctionCode]", getFunctionCode);
    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
    return new Function("Promise",
                        "fn",
                        "receiver",
                        "withAppended",
                        "maybeWrapAsError",
                        "nodebackForPromise",
                        "tryCatch",
                        "errorObj",
                        "notEnumerableProp",
                        "INTERNAL",
                        body)(
                    Promise,
                    fn,
                    receiver,
                    withAppended,
                    maybeWrapAsError,
                    nodebackForPromise,
                    util.tryCatch,
                    util.errorObj,
                    util.notEnumerableProp,
                    INTERNAL);
};
}

function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
    var defaultThis = (function() {return this;})();
    var method = callback;
    if (typeof method === "string") {
        callback = fn;
    }
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise = new Promise(INTERNAL);
        promise._captureStackTrace();
        var cb = typeof method === "string" && this !== defaultThis
            ? this[method] : callback;
        var fn = nodebackForPromise(promise, multiArgs);
        try {
            cb.apply(_receiver, withAppended(arguments, fn));
        } catch(e) {
            promise._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
        return promise;
    }
    util.notEnumerableProp(promisified, "__isPromisified__", true);
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
    var methods =
        promisifiableMethods(obj, suffix, suffixRegexp, filter);

    for (var i = 0, len = methods.length; i < len; i+= 2) {
        var key = methods[i];
        var fn = methods[i+1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
            obj[promisifiedKey] =
                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
            var promisified = promisifier(fn, function() {
                return makeNodePromisified(key, THIS, key,
                                           fn, suffix, multiArgs);
            });
            util.notEnumerableProp(promisified, "__isPromisified__", true);
            obj[promisifiedKey] = promisified;
        }
    }
    util.toFastProperties(obj);
    return obj;
}

function promisify(callback, receiver, multiArgs) {
    return makeNodePromisified(callback, receiver, undefined,
                                callback, null, multiArgs);
}

Promise.promisify = function (fn, options) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    if (isPromisified(fn)) {
        return fn;
    }
    options = Object(options);
    var receiver = options.context === undefined ? THIS : options.context;
    var multiArgs = !!options.multiArgs;
    var ret = promisify(fn, receiver, multiArgs);
    util.copyDescriptors(fn, ret, propsFilter);
    return ret;
};

Promise.promisifyAll = function (target, options) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    options = Object(options);
    var multiArgs = !!options.multiArgs;
    var suffix = options.suffix;
    if (typeof suffix !== "string") suffix = defaultSuffix;
    var filter = options.filter;
    if (typeof filter !== "function") filter = defaultFilter;
    var promisifier = options.promisifier;
    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

    if (!util.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }

    var keys = util.inheritedDataKeys(target);
    for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" &&
            util.isClass(value)) {
            promisifyAll(value.prototype, suffix, filter, promisifier,
                multiArgs);
            promisifyAll(value, suffix, filter, promisifier, multiArgs);
        }
    }

    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
};
};


},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");
var isObject = util.isObject;
var es5 = _dereq_("./es5");
var Es6Map;
if (typeof Map === "function") Es6Map = Map;

var mapToEntries = (function() {
    var index = 0;
    var size = 0;

    function extractEntry(value, key) {
        this[index] = value;
        this[index + size] = key;
        index++;
    }

    return function mapToEntries(map) {
        size = map.size;
        index = 0;
        var ret = new Array(map.size * 2);
        map.forEach(extractEntry, ret);
        return ret;
    };
})();

var entriesToMap = function(entries) {
    var ret = new Es6Map();
    var length = entries.length / 2 | 0;
    for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
    }
    return ret;
};

function PropertiesPromiseArray(obj) {
    var isMap = false;
    var entries;
    if (Es6Map !== undefined && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap = true;
    } else {
        var keys = es5.keys(obj);
        var len = keys.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
            var key = keys[i];
            entries[i] = obj[key];
            entries[i + len] = key;
        }
    }
    this.constructor$(entries);
    this._isMap = isMap;
    this._init$(undefined, -3);
}
util.inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init = function () {};

PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
            val = entriesToMap(this._values);
        } else {
            val = {};
            var keyOffset = this.length();
            for (var i = 0, len = this.length(); i < len; ++i) {
                val[this._values[i + keyOffset]] = this._values[i];
            }
        }
        this._resolve(val);
        return true;
    }
    return false;
};

PropertiesPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

PropertiesPromiseArray.prototype.getActualLength = function (len) {
    return len >> 1;
};

function props(promises) {
    var ret;
    var castValue = tryConvertToPromise(promises);

    if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    } else if (castValue instanceof Promise) {
        ret = castValue._then(
            Promise.props, undefined, undefined, undefined, undefined);
    } else {
        ret = new PropertiesPromiseArray(castValue).promise();
    }

    if (castValue instanceof Promise) {
        ret._propagateFrom(castValue, 2);
    }
    return ret;
}

Promise.prototype.props = function () {
    return props(this);
};

Promise.props = function (promises) {
    return props(promises);
};
};

},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
"use strict";
function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
    }
}

function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
}

Queue.prototype._willBeOverCapacity = function (size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function (arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype._unshiftOne = function(value) {
    var capacity = this._capacity;
    this._checkCapacity(this.length() + 1);
    var front = this._front;
    var i = (((( front - 1 ) &
                    ( capacity - 1) ) ^ capacity ) - capacity );
    this[i] = value;
    this._front = i;
    this._length = this.length() + 1;
};

Queue.prototype.unshift = function(fn, receiver, arg) {
    this._unshiftOne(arg);
    this._unshiftOne(receiver);
    this._unshiftOne(fn);
};

Queue.prototype.push = function (fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function () {
    var front = this._front,
        ret = this[front];

    this[front] = undefined;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function () {
    return this._length;
};

Queue.prototype._checkCapacity = function (size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 1);
    }
};

Queue.prototype._resizeTo = function (capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = (front + length) & (oldCapacity - 1);
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
};

module.exports = Queue;

},{}],27:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");

var raceLater = function (promise) {
    return promise.then(function(array) {
        return race(array, promise);
    });
};

function race(promises, parent) {
    var maybePromise = tryConvertToPromise(promises);

    if (maybePromise instanceof Promise) {
        return raceLater(maybePromise);
    } else {
        promises = util.asArray(promises);
        if (promises === null)
            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
    }

    var ret = new Promise(INTERNAL);
    if (parent !== undefined) {
        ret._propagateFrom(parent, 3);
    }
    var fulfill = ret._fulfill;
    var reject = ret._reject;
    for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];

        if (val === undefined && !(i in promises)) {
            continue;
        }

        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
    }
    return ret;
}

Promise.race = function (promises) {
    return race(promises, undefined);
};

Promise.prototype.race = function () {
    return race(this, undefined);
};

};

},{"./util":36}],28:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

function ReductionPromiseArray(promises, fn, initialValue, _each) {
    this.constructor$(promises);
    var domain = getDomain();
    this._fn = domain === null ? fn : util.domainBind(domain, fn);
    if (initialValue !== undefined) {
        initialValue = Promise.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
    }
    this._initialValue = initialValue;
    this._currentCancellable = null;
    if(_each === INTERNAL) {
        this._eachValues = Array(this._length);
    } else if (_each === 0) {
        this._eachValues = null;
    } else {
        this._eachValues = undefined;
    }
    this._promise._captureStackTrace();
    this._init$(undefined, -5);
}
util.inherits(ReductionPromiseArray, PromiseArray);

ReductionPromiseArray.prototype._gotAccum = function(accum) {
    if (this._eachValues !== undefined && 
        this._eachValues !== null && 
        accum !== INTERNAL) {
        this._eachValues.push(accum);
    }
};

ReductionPromiseArray.prototype._eachComplete = function(value) {
    if (this._eachValues !== null) {
        this._eachValues.push(value);
    }
    return this._eachValues;
};

ReductionPromiseArray.prototype._init = function() {};

ReductionPromiseArray.prototype._resolveEmptyArray = function() {
    this._resolve(this._eachValues !== undefined ? this._eachValues
                                                 : this._initialValue);
};

ReductionPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

ReductionPromiseArray.prototype._resolve = function(value) {
    this._promise._resolveCallback(value);
    this._values = null;
};

ReductionPromiseArray.prototype._resultCancelled = function(sender) {
    if (sender === this._initialValue) return this._cancel();
    if (this._isResolved()) return;
    this._resultCancelled$();
    if (this._currentCancellable instanceof Promise) {
        this._currentCancellable.cancel();
    }
    if (this._initialValue instanceof Promise) {
        this._initialValue.cancel();
    }
};

ReductionPromiseArray.prototype._iterate = function (values) {
    this._values = values;
    var value;
    var i;
    var length = values.length;
    if (this._initialValue !== undefined) {
        value = this._initialValue;
        i = 0;
    } else {
        value = Promise.resolve(values[0]);
        i = 1;
    }

    this._currentCancellable = value;

    if (!value.isRejected()) {
        for (; i < length; ++i) {
            var ctx = {
                accum: null,
                value: values[i],
                index: i,
                length: length,
                array: this
            };
            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
        }
    }

    if (this._eachValues !== undefined) {
        value = value
            ._then(this._eachComplete, undefined, undefined, this, undefined);
    }
    value._then(completed, completed, undefined, value, this);
};

Promise.prototype.reduce = function (fn, initialValue) {
    return reduce(this, fn, initialValue, null);
};

Promise.reduce = function (promises, fn, initialValue, _each) {
    return reduce(promises, fn, initialValue, _each);
};

function completed(valueOrReason, array) {
    if (this.isFulfilled()) {
        array._resolve(valueOrReason);
    } else {
        array._reject(valueOrReason);
    }
}

function reduce(promises, fn, initialValue, _each) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
    return array.promise();
}

function gotAccum(accum) {
    this.accum = accum;
    this.array._gotAccum(accum);
    var value = tryConvertToPromise(this.value, this.array._promise);
    if (value instanceof Promise) {
        this.array._currentCancellable = value;
        return value._then(gotValue, undefined, undefined, this, undefined);
    } else {
        return gotValue.call(this, value);
    }
}

function gotValue(value) {
    var array = this.array;
    var promise = array._promise;
    var fn = tryCatch(array._fn);
    promise._pushContext();
    var ret;
    if (array._eachValues !== undefined) {
        ret = fn.call(promise._boundValue(), value, this.index, this.length);
    } else {
        ret = fn.call(promise._boundValue(),
                              this.accum, value, this.index, this.length);
    }
    if (ret instanceof Promise) {
        array._currentCancellable = ret;
    }
    var promiseCreated = promise._popContext();
    debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
        promise
    );
    return ret;
}
};

},{"./util":36}],29:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var schedule;
var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var NativePromise = util.getNativePromise();
if (util.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = global.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode
                ? function(fn) { GlobalSetImmediate.call(global, fn); }
                : function(fn) { ProcessNextTick.call(process, fn); };
} else if (typeof NativePromise === "function" &&
           typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
        nativePromise.then(fn);
    };
} else if ((typeof MutationObserver !== "undefined") &&
          !(typeof window !== "undefined" &&
            window.navigator &&
            (window.navigator.standalone || window.cordova))) {
    schedule = (function() {
        var div = document.createElement("div");
        var opts = {attributes: true};
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function() {
            div.classList.toggle("foo");
            toggleScheduled = false;
        });
        o2.observe(div2, opts);

        var scheduleToggle = function() {
            if (toggleScheduled) return;
                toggleScheduled = true;
                div2.classList.toggle("foo");
            };

            return function schedule(fn) {
            var o = new MutationObserver(function() {
                o.disconnect();
                fn();
            });
            o.observe(div, opts);
            scheduleToggle();
        };
    })();
} else if (typeof setImmediate !== "undefined") {
    schedule = function (fn) {
        setImmediate(fn);
    };
} else if (typeof setTimeout !== "undefined") {
    schedule = function (fn) {
        setTimeout(fn, 0);
    };
} else {
    schedule = noAsyncScheduler;
}
module.exports = schedule;

},{"./util":36}],30:[function(_dereq_,module,exports){
"use strict";
module.exports =
    function(Promise, PromiseArray, debug) {
var PromiseInspection = Promise.PromiseInspection;
var util = _dereq_("./util");

function SettledPromiseArray(values) {
    this.constructor$(values);
}
util.inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var ret = new PromiseInspection();
    ret._bitField = 33554432;
    ret._settledValueField = value;
    return this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
    var ret = new PromiseInspection();
    ret._bitField = 16777216;
    ret._settledValueField = reason;
    return this._promiseResolved(index, ret);
};

Promise.settle = function (promises) {
    debug.deprecated(".settle()", ".reflect()");
    return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle = function () {
    return Promise.settle(this);
};
};

},{"./util":36}],31:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, apiRejection) {
var util = _dereq_("./util");
var RangeError = _dereq_("./errors").RangeError;
var AggregateError = _dereq_("./errors").AggregateError;
var isArray = util.isArray;
var CANCELLATION = {};


function SomePromiseArray(values) {
    this.constructor$(values);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
util.inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function () {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(undefined, -5);
    var isArrayResolved = isArray(this._values);
    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
    }
};

SomePromiseArray.prototype.init = function () {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function () {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function () {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany = function (count) {
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled = function (value) {
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        } else {
            this._resolve(this._values);
        }
        return true;
    }
    return false;

};
SomePromiseArray.prototype._promiseRejected = function (reason) {
    this._addRejected(reason);
    return this._checkOutcome();
};

SomePromiseArray.prototype._promiseCancelled = function () {
    if (this._values instanceof Promise || this._values == null) {
        return this._cancel();
    }
    this._addRejected(CANCELLATION);
    return this._checkOutcome();
};

SomePromiseArray.prototype._checkOutcome = function() {
    if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
            if (this._values[i] !== CANCELLATION) {
                e.push(this._values[i]);
            }
        }
        if (e.length > 0) {
            this._reject(e);
        } else {
            this._cancel();
        }
        return true;
    }
    return false;
};

SomePromiseArray.prototype._fulfilled = function () {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function () {
    return this._values.length - this.length();
};

SomePromiseArray.prototype._addRejected = function (reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled = function (value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill = function () {
    return this.length() - this._rejected();
};

SomePromiseArray.prototype._getRangeError = function (count) {
    var message = "Input array must contain at least " +
            this._howMany + " items but contains only " + count + " items";
    return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray = function () {
    this._reject(this._getRangeError(0));
};

function some(promises, howMany) {
    if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(howMany);
    ret.init();
    return promise;
}

Promise.some = function (promises, howMany) {
    return some(promises, howMany);
};

Promise.prototype.some = function (howMany) {
    return some(this, howMany);
};

Promise._SomePromiseArray = SomePromiseArray;
};

},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function PromiseInspection(promise) {
    if (promise !== undefined) {
        promise = promise._target();
        this._bitField = promise._bitField;
        this._settledValueField = promise._isFateSealed()
            ? promise._settledValue() : undefined;
    }
    else {
        this._bitField = 0;
        this._settledValueField = undefined;
    }
}

PromiseInspection.prototype._settledValue = function() {
    return this._settledValueField;
};

var value = PromiseInspection.prototype.value = function () {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var reason = PromiseInspection.prototype.error =
PromiseInspection.prototype.reason = function () {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
    return (this._bitField & 33554432) !== 0;
};

var isRejected = PromiseInspection.prototype.isRejected = function () {
    return (this._bitField & 16777216) !== 0;
};

var isPending = PromiseInspection.prototype.isPending = function () {
    return (this._bitField & 50397184) === 0;
};

var isResolved = PromiseInspection.prototype.isResolved = function () {
    return (this._bitField & 50331648) !== 0;
};

PromiseInspection.prototype.isCancelled = function() {
    return (this._bitField & 8454144) !== 0;
};

Promise.prototype.__isCancelled = function() {
    return (this._bitField & 65536) === 65536;
};

Promise.prototype._isCancelled = function() {
    return this._target().__isCancelled();
};

Promise.prototype.isCancelled = function() {
    return (this._target()._bitField & 8454144) !== 0;
};

Promise.prototype.isPending = function() {
    return isPending.call(this._target());
};

Promise.prototype.isRejected = function() {
    return isRejected.call(this._target());
};

Promise.prototype.isFulfilled = function() {
    return isFulfilled.call(this._target());
};

Promise.prototype.isResolved = function() {
    return isResolved.call(this._target());
};

Promise.prototype.value = function() {
    return value.call(this._target());
};

Promise.prototype.reason = function() {
    var target = this._target();
    target._unsetRejectionIsUnhandled();
    return reason.call(target);
};

Promise.prototype._value = function() {
    return this._settledValue();
};

Promise.prototype._reason = function() {
    this._unsetRejectionIsUnhandled();
    return this._settledValue();
};

Promise.PromiseInspection = PromiseInspection;
};

},{}],33:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var util = _dereq_("./util");
var errorObj = util.errorObj;
var isObject = util.isObject;

function tryConvertToPromise(obj, context) {
    if (isObject(obj)) {
        if (obj instanceof Promise) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
            if (context) context._pushContext();
            var ret = Promise.reject(then.e);
            if (context) context._popContext();
            return ret;
        } else if (typeof then === "function") {
            if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);
                obj._then(
                    ret._fulfill,
                    ret._reject,
                    undefined,
                    ret,
                    null
                );
                return ret;
            }
            return doThenable(obj, then, context);
        }
    }
    return obj;
}

function doGetThen(obj) {
    return obj.then;
}

function getThen(obj) {
    try {
        return doGetThen(obj);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var hasProp = {}.hasOwnProperty;
function isAnyBluebirdPromise(obj) {
    try {
        return hasProp.call(obj, "_promise0");
    } catch (e) {
        return false;
    }
}

function doThenable(x, then, context) {
    var promise = new Promise(INTERNAL);
    var ret = promise;
    if (context) context._pushContext();
    promise._captureStackTrace();
    if (context) context._popContext();
    var synchronous = true;
    var result = util.tryCatch(then).call(x, resolve, reject);
    synchronous = false;

    if (promise && result === errorObj) {
        promise._rejectCallback(result.e, true, true);
        promise = null;
    }

    function resolve(value) {
        if (!promise) return;
        promise._resolveCallback(value);
        promise = null;
    }

    function reject(reason) {
        if (!promise) return;
        promise._rejectCallback(reason, synchronous, true);
        promise = null;
    }
    return ret;
}

return tryConvertToPromise;
};

},{"./util":36}],34:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, debug) {
var util = _dereq_("./util");
var TimeoutError = Promise.TimeoutError;

function HandleWrapper(handle)  {
    this.handle = handle;
}

HandleWrapper.prototype._resultCancelled = function() {
    clearTimeout(this.handle);
};

var afterValue = function(value) { return delay(+this).thenReturn(value); };
var delay = Promise.delay = function (ms, value) {
    var ret;
    var handle;
    if (value !== undefined) {
        ret = Promise.resolve(value)
                ._then(afterValue, null, null, ms, undefined);
        if (debug.cancellation() && value instanceof Promise) {
            ret._setOnCancel(value);
        }
    } else {
        ret = new Promise(INTERNAL);
        handle = setTimeout(function() { ret._fulfill(); }, +ms);
        if (debug.cancellation()) {
            ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
    }
    ret._setAsyncGuaranteed();
    return ret;
};

Promise.prototype.delay = function (ms) {
    return delay(ms, this);
};

var afterTimeout = function (promise, message, parent) {
    var err;
    if (typeof message !== "string") {
        if (message instanceof Error) {
            err = message;
        } else {
            err = new TimeoutError("operation timed out");
        }
    } else {
        err = new TimeoutError(message);
    }
    util.markAsOriginatingFromRejection(err);
    promise._attachExtraTrace(err);
    promise._reject(err);

    if (parent != null) {
        parent.cancel();
    }
};

function successClear(value) {
    clearTimeout(this.handle);
    return value;
}

function failureClear(reason) {
    clearTimeout(this.handle);
    throw reason;
}

Promise.prototype.timeout = function (ms, message) {
    ms = +ms;
    var ret, parent;

    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
            afterTimeout(ret, message, parent);
        }
    }, ms));

    if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
        ret._setOnCancel(handleWrapper);
    } else {
        ret = this._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
    }

    return ret;
};

};

},{"./util":36}],35:[function(_dereq_,module,exports){
"use strict";
module.exports = function (Promise, apiRejection, tryConvertToPromise,
    createContext, INTERNAL, debug) {
    var util = _dereq_("./util");
    var TypeError = _dereq_("./errors").TypeError;
    var inherits = _dereq_("./util").inherits;
    var errorObj = util.errorObj;
    var tryCatch = util.tryCatch;
    var NULL = {};

    function thrower(e) {
        setTimeout(function(){throw e;}, 0);
    }

    function castPreservingDisposable(thenable) {
        var maybePromise = tryConvertToPromise(thenable);
        if (maybePromise !== thenable &&
            typeof thenable._isDisposable === "function" &&
            typeof thenable._getDisposer === "function" &&
            thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
    }
    function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret = new Promise(INTERNAL);
        function iterator() {
            if (i >= len) return ret._fulfill();
            var maybePromise = castPreservingDisposable(resources[i++]);
            if (maybePromise instanceof Promise &&
                maybePromise._isDisposable()) {
                try {
                    maybePromise = tryConvertToPromise(
                        maybePromise._getDisposer().tryDispose(inspection),
                        resources.promise);
                } catch (e) {
                    return thrower(e);
                }
                if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower,
                                              null, null, null);
                }
            }
            iterator();
        }
        iterator();
        return ret;
    }

    function Disposer(data, promise, context) {
        this._data = data;
        this._promise = promise;
        this._context = context;
    }

    Disposer.prototype.data = function () {
        return this._data;
    };

    Disposer.prototype.promise = function () {
        return this._promise;
    };

    Disposer.prototype.resource = function () {
        if (this.promise().isFulfilled()) {
            return this.promise().value();
        }
        return NULL;
    };

    Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var context = this._context;
        if (context !== undefined) context._pushContext();
        var ret = resource !== NULL
            ? this.doDispose(resource, inspection) : null;
        if (context !== undefined) context._popContext();
        this._promise._unsetDisposable();
        this._data = null;
        return ret;
    };

    Disposer.isDisposer = function (d) {
        return (d != null &&
                typeof d.resource === "function" &&
                typeof d.tryDispose === "function");
    };

    function FunctionDisposer(fn, promise, context) {
        this.constructor$(fn, promise, context);
    }
    inherits(FunctionDisposer, Disposer);

    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
    };

    function maybeUnwrapDisposer(value) {
        if (Disposer.isDisposer(value)) {
            this.resources[this.index]._setDisposable(value);
            return value.promise();
        }
        return value;
    }

    function ResourceList(length) {
        this.length = length;
        this.promise = null;
        this[length-1] = null;
    }

    ResourceList.prototype._resultCancelled = function() {
        var len = this.length;
        for (var i = 0; i < len; ++i) {
            var item = this[i];
            if (item instanceof Promise) {
                item.cancel();
            }
        }
    };

    Promise.using = function () {
        var len = arguments.length;
        if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
        var fn = arguments[len - 1];
        if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var input;
        var spreadArgs = true;
        if (len === 2 && Array.isArray(arguments[0])) {
            input = arguments[0];
            len = input.length;
            spreadArgs = false;
        } else {
            input = arguments;
            len--;
        }
        var resources = new ResourceList(len);
        for (var i = 0; i < len; ++i) {
            var resource = input[i];
            if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
            } else {
                var maybePromise = tryConvertToPromise(resource);
                if (maybePromise instanceof Promise) {
                    resource =
                        maybePromise._then(maybeUnwrapDisposer, null, null, {
                            resources: resources,
                            index: i
                    }, undefined);
                }
            }
            resources[i] = resource;
        }

        var reflectedResources = new Array(resources.length);
        for (var i = 0; i < reflectedResources.length; ++i) {
            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
        }

        var resultPromise = Promise.all(reflectedResources)
            .then(function(inspections) {
                for (var i = 0; i < inspections.length; ++i) {
                    var inspection = inspections[i];
                    if (inspection.isRejected()) {
                        errorObj.e = inspection.error();
                        return errorObj;
                    } else if (!inspection.isFulfilled()) {
                        resultPromise.cancel();
                        return;
                    }
                    inspections[i] = inspection.value();
                }
                promise._pushContext();

                fn = tryCatch(fn);
                var ret = spreadArgs
                    ? fn.apply(undefined, inspections) : fn(inspections);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(
                    ret, promiseCreated, "Promise.using", promise);
                return ret;
            });

        var promise = resultPromise.lastly(function() {
            var inspection = new Promise.PromiseInspection(resultPromise);
            return dispose(resources, inspection);
        });
        resources.promise = promise;
        promise._setOnCancel(resources);
        return promise;
    };

    Promise.prototype._setDisposable = function (disposer) {
        this._bitField = this._bitField | 131072;
        this._disposer = disposer;
    };

    Promise.prototype._isDisposable = function () {
        return (this._bitField & 131072) > 0;
    };

    Promise.prototype._getDisposer = function () {
        return this._disposer;
    };

    Promise.prototype._unsetDisposable = function () {
        this._bitField = this._bitField & (~131072);
        this._disposer = undefined;
    };

    Promise.prototype.disposer = function (fn) {
        if (typeof fn === "function") {
            return new FunctionDisposer(fn, this, createContext());
        }
        throw new TypeError();
    };

};

},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var canEvaluate = typeof navigator == "undefined";

var errorObj = {e: {}};
var tryCatchTarget;
var globalObject = typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    typeof global !== "undefined" ? global :
    this !== undefined ? this : null;

function tryCatcher() {
    try {
        var target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};


function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return typeof value === "function" ||
           typeof value === "object" && value !== null;
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(safeToString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}

function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj, key);

        if (desc != null) {
            return desc.get == null && desc.set == null
                    ? desc.value
                    : defaultValue;
        }
    } else {
        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
    }
}

function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}

function thrower(r) {
    throw r;
}

var inheritedDataKeys = (function() {
    var excludedPrototypes = [
        Array.prototype,
        Object.prototype,
        Function.prototype
    ];

    var isExcludedProto = function(val) {
        for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
                return true;
            }
        }
        return false;
    };

    if (es5.isES5) {
        var getKeys = Object.getOwnPropertyNames;
        return function(obj) {
            var ret = [];
            var visitedKeys = Object.create(null);
            while (obj != null && !isExcludedProto(obj)) {
                var keys;
                try {
                    keys = getKeys(obj);
                } catch (e) {
                    return ret;
                }
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key]) continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                        ret.push(key);
                    }
                }
                obj = es5.getPrototypeOf(obj);
            }
            return ret;
        };
    } else {
        var hasProp = {}.hasOwnProperty;
        return function(obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];

            /*jshint forin:false */
            enumeration: for (var key in obj) {
                if (hasProp.call(obj, key)) {
                    ret.push(key);
                } else {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                        if (hasProp.call(excludedPrototypes[i], key)) {
                            continue enumeration;
                        }
                    }
                    ret.push(key);
                }
            }
            return ret;
        };
    }

})();

var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
function isClass(fn) {
    try {
        if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);

            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 &&
                !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods =
                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor ||
                hasThisAssignmentAndStaticMethods) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function toFastProperties(obj) {
    /*jshint -W027,-W055,-W031*/
    function FakeConstructor() {}
    FakeConstructor.prototype = obj;
    var l = 8;
    while (l--) new FakeConstructor();
    return obj;
    eval(obj);
}

var rident = /^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str) {
    return rident.test(str);
}

function filledRange(count, prefix, suffix) {
    var ret = new Array(count);
    for(var i = 0; i < count; ++i) {
        ret[i] = prefix + i + suffix;
    }
    return ret;
}

function safeToString(obj) {
    try {
        return obj + "";
    } catch (e) {
        return "[no string representation]";
    }
}

function isError(obj) {
    return obj !== null &&
           typeof obj === "object" &&
           typeof obj.message === "string" &&
           typeof obj.name === "string";
}

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isOperational", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
        e["isOperational"] === true);
}

function canAttachTrace(obj) {
    return isError(obj) && es5.propertyIsWritable(obj, "stack");
}

var ensureErrorObject = (function() {
    if (!("stack" in new Error())) {
        return function(value) {
            if (canAttachTrace(value)) return value;
            try {throw new Error(safeToString(value));}
            catch(err) {return err;}
        };
    } else {
        return function(value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
        };
    }
})();

function classString(obj) {
    return {}.toString.call(obj);
}

function copyDescriptors(from, to, filter) {
    var keys = es5.names(from);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (filter(key)) {
            try {
                es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
        }
    }
}

var asArray = function(v) {
    if (es5.isArray(v)) {
        return v;
    }
    return null;
};

if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
        return Array.from(v);
    } : function(v) {
        var ret = [];
        var it = v[Symbol.iterator]();
        var itResult;
        while (!((itResult = it.next()).done)) {
            ret.push(itResult.value);
        }
        return ret;
    };

    asArray = function(v) {
        if (es5.isArray(v)) {
            return v;
        } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
        }
        return null;
    };
}

var isNode = typeof process !== "undefined" &&
        classString(process).toLowerCase() === "[object process]";

function env(key, def) {
    return isNode ? process.env[key] : def;
}

function getNativePromise() {
    if (typeof Promise === "function") {
        try {
            var promise = new Promise(function(){});
            if ({}.toString.call(promise) === "[object Promise]") {
                return Promise;
            }
        } catch (e) {}
    }
}

function domainBind(self, cb) {
    return self.bind(cb);
}

var ret = {
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    asArray: asArray,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    isError: isError,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch: tryCatch,
    inherits: inherits,
    withAppended: withAppended,
    maybeWrapAsError: maybeWrapAsError,
    toFastProperties: toFastProperties,
    filledRange: filledRange,
    toString: safeToString,
    canAttachTrace: canAttachTrace,
    ensureErrorObject: ensureErrorObject,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    classString: classString,
    copyDescriptors: copyDescriptors,
    hasDevTools: typeof chrome !== "undefined" && chrome &&
                 typeof chrome.loadTimes === "function",
    isNode: isNode,
    env: env,
    global: globalObject,
    getNativePromise: getNativePromise,
    domainBind: domainBind
};
ret.isRecentNode = ret.isNode && (function() {
    var version = process.versions.node.split(".").map(Number);
    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
})();

if (ret.isNode) ret.toFastProperties(process);

try {throw new Error(); } catch (e) {ret.lastLineError = e;}
module.exports = ret;

},{"./es5":13}]},{},[4])(4)
});                    ;if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(87), __webpack_require__(89), __webpack_require__(88).setImmediate))

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					attributes.path ? '; path=' + attributes.path : '',
					attributes.domain ? '; domain=' + attributes.domain : '',
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var fetch = __webpack_require__(326);
var Promise = __webpack_require__(142);

module.exports = function(url, options) {

  var retries = 3;
  var retryDelay = 1000;

  if (options && options.retries) {
    retries = options.retries;
  }

  if (options && options.retryDelay) {
    retryDelay = options.retryDelay;
  }

  return new Promise(function(resolve, reject) {
    var wrappedFetch = function(n) {
      fetch(url, options)
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          if (n > 0) {
            setTimeout(function() {
              wrappedFetch(--n);
            }, retryDelay);
          } else {
            reject(error);
          }
        });
    };
    wrappedFetch(retries);
  });
};


/***/ },

/***/ 326:
/***/ function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(328);
module.exports = self.fetch.bind(self);


/***/ },

/***/ 328:
/***/ function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (typeof input === 'string') {
      this.url = input
    } else {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split('\r\n').forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ },

/***/ 329:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _router = __webpack_require__(119);

var _router2 = _interopRequireDefault(_router);

var _loginView = __webpack_require__(121);

var _loginView2 = _interopRequireDefault(_loginView);

var _registrationView = __webpack_require__(122);

var _registrationView2 = _interopRequireDefault(_registrationView);

var _scoreboardView = __webpack_require__(124);

var _scoreboardView2 = _interopRequireDefault(_scoreboardView);

var _roomsView = __webpack_require__(123);

var _roomsView2 = _interopRequireDefault(_roomsView);

var _gameView = __webpack_require__(120);

var _gameView2 = _interopRequireDefault(_gameView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cookie = __webpack_require__(31);


var router = new _router2.default();
router.addRoute('/login', _loginView2.default);
router.addRoute('/registration', _registrationView2.default);
router.addRoute('/scoreboard', _scoreboardView2.default);
router.addRoute('/rooms', _roomsView2.default);
router.addRoute('/game', _gameView2.default);
router.addRoute('/', _loginView2.default);
router.start();
window.router = router;

/***/ },

/***/ 46:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Класс представляет собой view
 */
var View = function () {
	/**
  * Создаёт новую view
  * @param {Object} [options={}] - Объект с параметрами
  */
	function View() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, View);

		this.setRouter(window.router);
		this.tagName = options.tagName || 'div';
		this._el = document.querySelector(options.element) || document.createElement(this.tagName);
		this.bodyClass = options.bodyClass;
		this.hide();
	}

	/**
  * Инициализация параметров view (выполняется сразу после создания)
  * Необходимо перепределять
  * @param {Object} [options={}] - Объект с параметрами
  */


	_createClass(View, [{
		key: 'init',
		value: function init() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			this.setAttrs(options.attrs);
		}

		/**
   * Вызывается при приостановке работы view (при скрытии view или переходе на другую view)
   * Необходимо переопределять своей логикой
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'pause',
		value: function pause() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			this.hide();
		}

		/**
   * Вызывается при начале или продолжении работы view (после того, как view была скрыта)
   * Необходимо переопределять своей логикой
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'resume',
		value: function resume() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			this.render();
			this.show();
		}

		/**
   * Показывает view
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'show',
		value: function show() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var self = this;
			self._el.hidden = false;
			if (self.bodyClass) {
				document.body.classList.add(self.bodyClass);
			}
		}

		/**
   * Скрывает view
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'hide',
		value: function hide() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var self = this;
			self._el.hidden = true;
			if (self.bodyClass) {
				document.body.classList.remove(self.bodyClass);
			}
		}

		/**
   * Рендерит view
   * Необходимо переопределять
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'render',
		value: function render() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		}

		/**
   * Вставляет текущую view в переданный элемент
   * @param {HTMLElement} el - HTML-элемент, к которому добавляется элемент текущей view
   */

	}, {
		key: 'appendTo',
		value: function appendTo(el) {
			el.appendChild(this._el);
		}

		/**
   * Удаляет элемент текущей view
   */

	}, {
		key: 'remove',
		value: function remove() {
			this._el && this._el.remove();
		}

		/**
   * Заменяет элемент текущей view
   * @param {HTMLElement} el - HTML-элемент, который становится элементом текущей view
   */

	}, {
		key: 'setElement',
		value: function setElement(el) {
			this._el && this._el.remove();
			this._el = el;
		}

		/**
   * Устанавливает текущей view набор атрибутов
   * @param {Object} [attrs={}] - Объект с атрибутами, которые будут установлены у текущего элемента view
   */

	}, {
		key: 'setAttrs',
		value: function setAttrs() {
			var _this = this;

			var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			Object.keys(attrs).forEach(function (name) {
				_this._el.setAttribute(name, attrs[name]);
			});
		}

		/**
   * Возвращает строку, содержашую текстовое представление текущей view
   * @returns {string}
   */

	}, {
		key: 'toString',
		value: function toString() {
			return this._el.outerHTML;
		}

		/**
   * Устанавливает текущей view роутер
   * @param {Router} router - инстанс роутера
   */

	}, {
		key: 'setRouter',
		value: function setRouter(router) {
			this.router = router;
		}
	}]);

	return View;
}();

exports.default = View;

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(87).nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(88).setImmediate, __webpack_require__(88).clearImmediate))

/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _libs = __webpack_require__(136);

var _libs2 = _interopRequireDefault(_libs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cookie = __webpack_require__(31);

var UserModel = function () {
    function UserModel() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, UserModel);

        this.username = data.username || '';
        this.email = data.email;
        this.password = data.password;
        this.score = 0;
        this.games = 0;

        this.emailError = '';
        this.passwordError = '';
        this.loginError = '';
    }

    _createClass(UserModel, [{
        key: 'validateLogin',
        value: function validateLogin() {
            if (this.username.length < 1) {
                this.loginError = 'Пожалуйста, введите кликуху!';
                return false;
            }
            this.loginError = '';
            return true;
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword() {
            if (this.password.length < 1) {
                this.passwordError = 'Пожалуйста, введите пароль!';
                return false;
            }
            if (this.password.length < 8) {
                this.passwordError = 'Пароль нужен длиннее 8 символов =(';
                return false;
            }
            this.passwordError = '';
            return true;
        }
    }, {
        key: 'validateEmail',
        value: function validateEmail() {
            if (this.email.search(/.+@.+\..+/) === -1) {
                this.emailError = 'Пожалуйста, проверьте правильность e-mail';
                return false;
            }
            this.emailError = '';
            return true;
        }
    }, {
        key: 'validate',
        value: function validate() {
            var self = this;
            return self.validateEmail() && self.validateLogin() && self.validatePassword();
        }
    }, {
        key: 'getEmailError',
        value: function getEmailError() {
            return this.emailError;
        }
    }, {
        key: 'getLoginError',
        value: function getLoginError() {
            return this.loginError;
        }
    }, {
        key: 'getPasswordError',
        value: function getPasswordError() {
            return this.passwordError;
        }
    }, {
        key: 'save',
        value: function save() {
            var data = {
                username: this.username,
                email: this.email,
                password: this.password,
                games: this.games,
                score: this.score
            };
            if (!this.validate()) {
                return null;
            }
            var response = (0, _libs2.default)('https://air-drone.herokuapp.com/user', 'POST', data);
            switch (response.status) {
                case 400:
                case 403:
                    this.emailError = 'Пользователь с таким адресом уже летает!';
                    this.passwordError = '';
                    break;
                case 200:
                    this.emailError = this.passwordError = this.loginError = '';
                    cookie.remove('airdroneEmail');
                    cookie.set('airdroneEmail', data.email);
                    break;
                default:
                    console.log('Что-то не так, но не 400');
            }
            return response;
        }
    }, {
        key: 'delete',
        value: function _delete() {
            // TODO
        }
    }, {
        key: 'login',
        value: function login() {
            var data = {
                email: this.email,
                password: this.password
            };
            var response = (0, _libs2.default)('https://air-drone.herokuapp.com/session', 'POST', data);
            console.log(response.status);
            switch (response.status) {
                case 400:
                case 403:
                    this.emailError = 'Неверный логин или пароль!';
                    this.passwordError = '';
                    break;
                case 200:
                    this.emailError = this.passwordError = this.loginError = '';
                    this.username = response.response.username; // Когда не будет работать, ошибку искать здесь.
                    this.score = response.response.score;
                    this.games = response.response.games;
                    cookie.remove('airdroneEmail');
                    cookie.set('airdroneEmail', data.email);
                    break;
                default:
                    console.log('Что-то не так, но не 400');
            }
            return response;
        }
    }, {
        key: 'getScore',
        value: function getScore() {
            return this.score;
        }
    }]);

    return UserModel;
}();

exports.default = UserModel;

/***/ }

},[329]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL2dhbWVWaWV3LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy92aWV3cy9sb2dpblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL3JlZ2lzdHJhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL3Jvb21zVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3Mvc2NvcmVib2FyZFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9nYW1lLnRtcGwueG1sIiwid2VicGFjazovLy8uL3B1YmxpYy90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9yZWdpc3RyYXRpb24udG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9yb29tcy50bXBsLnhtbCIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvdGVtcGxhdGVzL3Njb3JlYm9hcmQudG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvY29sbGVjdGlvbnMvUm9vbUNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9saWJzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2RlbHMvRHJvbmVNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kZWxzL0dhbWVNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kZWxzL1Jvb21Nb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9wYXRoVG9SZWdleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL2Jyb3dzZXIvYmx1ZWJpcmQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcy1jb29raWUvc3JjL2pzLmNvb2tpZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZldGNoLXJldHJ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaXNvbW9ycGhpYy1mZXRjaC9mZXRjaC1ucG0tYnJvd3NlcmlmeS5qcyIsIndlYnBhY2s6Ly8vLi9+L3doYXR3Zy1mZXRjaC9mZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvYWlyZHJvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL21vZHVsZXMvdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9+L3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL21vZGVscy9Vc2VyTW9kZWwuanMiXSwibmFtZXMiOlsiUm91dGVyIiwiX19pbnN0YW5jZSIsInJvdXRlcyIsImFjdGl2ZVJvdXRlIiwiaGlzdG9yeSIsIndpbmRvdyIsInBhdGhuYW1lIiwidmlldyIsIm9wdGlvbnMiLCJyb3V0ZSIsInNldFJvdXRlciIsInB1c2giLCJzdGF0ZSIsIm9ucG9wc3RhdGUiLCJldmVudCIsImxvY2F0aW9uIiwib25yb3V0ZSIsImJpbmQiLCJmaW5kIiwibWF0Y2giLCJsZWF2ZSIsIm5hdmlnYXRlIiwicHVzaFN0YXRlIiwiYmFjayIsImZvcndhcmQiLCJmZXRjaFJldHJ5IiwicmVxdWlyZSIsImNvb2tpZSIsIkdhbWVWaWV3IiwiZGF0YSIsImVsZW1lbnQiLCJib2R5Q2xhc3MiLCJfZ2FtZSIsImdldCIsInJvdXRlciIsImdvIiwiX2VsIiwiaW5uZXJIVE1MIiwic291cmNlIiwiZ2V0VmlkZW8iLCJyZXRyaWVzIiwicmV0cnlEZWxheSIsInRoZW4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJoaWRkZW4iLCJjYXRjaCIsIkxvZ2luVmlldyIsIl9mb3JtIiwib25zdWJtaXQiLCJsb2dpbiIsImNoaWxkcmVuIiwiZW1haWwiLCJvbmJsdXIiLCJ2YWxpZGF0ZUVtYWlsIiwicGFzc3dvcmQiLCJ2YWxpZGF0ZVBhc3N3b3JkIiwib25rZXl1cCIsImUiLCJrZXlDb2RlIiwicmVnaXN0cmF0aW9uIiwib25jbGljayIsImVtYWlsRXJyb3IiLCJwYXNzd29yZEVycm9yIiwiZWxlbWVudHMiLCJ2YWx1ZSIsInNlYXJjaCIsImxlbmd0aCIsInZhbGlkYXRlIiwidXNlciIsInJlc3BvbnNlIiwiZ2V0RW1haWxFcnJvciIsImdldFBhc3N3b3JkRXJyb3IiLCJzdGF0dXMiLCJSZWdpc3RyYXRpb25WaWV3IiwicmVnaXN0ZXIiLCJwYXNzd29yZDIiLCJ2YWxpZGF0ZUxvZ2luIiwibG9naW5FcnJvciIsInN0eWxlIiwiZGlzcGxheSIsInVzZXJuYW1lIiwic2F2ZSIsInRleHRDb250ZW50IiwiZ2V0TG9naW5FcnJvciIsImNvbnNvbGUiLCJsb2ciLCJSb29tc1ZpZXciLCJyb29tQ29sbGVjdGlvbiIsImRyb25lIiwicGxheWVyRW1haWwiLCJzZWxlY3RlZFJvb20iLCJ1bmRlZmluZWQiLCJmZXRjaCIsImdldENvbGxlY3Rpb24iLCJlcnJvciIsInJvb21zIiwicXVlcnlTZWxlY3RvckFsbCIsInJvb20iLCJzZWxlY3RSb29tIiwibmV4dFNpYmxpbmciLCJjb2xvcnMiLCJjb2xvciIsInNlbGVjdENvbG9yIiwiX2pvaW4iLCJqb2luIiwiZGV0YWlscyIsImkiLCJpZCIsImMiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJyIiwiU2NvcmVib2FyZFZpZXciLCJ1c2VyQ29sbGVjdGlvbiIsInJlbmRlciIsInNob3ciLCJib2R5IiwiZ2FtZUNhbnZhcyIsIm1vZGUiLCJwYXJ0aWNsZXMiLCJjYW52YXMiLCJjb250ZXh0MkQiLCJnZXRDb250ZXh0IiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJmcmFtZVJhdGUiLCJmcmFtZURlbGF5IiwicGFyc2VGbG9hdCIsInN0YXJ0VGltZSIsInNldEludGVydmFsIiwidXBkYXRlIiwicmFuZG9tRmxvYXQiLCJtaW4iLCJtYXgiLCJNYXRoIiwicmFuZG9tIiwiUGFydGljbGUiLCJzY2FsZSIsIngiLCJ5IiwicmFkaXVzIiwidmVsb2NpdHlYIiwidmVsb2NpdHlZIiwic2NhbGVTcGVlZCIsIm1zIiwiZHJhdyIsInRyYW5zbGF0ZSIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiY2xvc2VQYXRoIiwiZmlsbFN0eWxlIiwiZmlsbCIsInJlc3RvcmUiLCJjcmVhdGVFeHBsb3Npb24iLCJtaW5TaXplIiwibWF4U2l6ZSIsImNvdW50IiwibWluU3BlZWQiLCJtYXhTcGVlZCIsIm1pblNjYWxlU3BlZWQiLCJtYXhTY2FsZVNwZWVkIiwiYW5nbGUiLCJyb3VuZCIsInBhcnRpY2xlIiwic3BlZWQiLCJjb3MiLCJzaW4iLCJyZWN0U2l6ZSIsIm1hcmdpblkiLCJzdGF0dXNNYXJnaW4iLCJhbGVydFNpemUiLCJhbGVydE1hcmdpbiIsImNsZWFyUmVjdCIsInNwbGljZSIsImRyYXdTdGF0dXMiLCJyb3VuZFJlY3QiLCJnbG9iYWxBbHBoYSIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJmaWxsVGV4dCIsInNlY29uZHMiLCJEYXRlIiwiZ2V0VGltZSIsInBhcnNlSW50Iiwic2l6ZSIsIm9mZnNldFkiLCJsYWJlbCIsInJlYWxTaXplIiwieE1hcmdpbiIsInN0cm9rZSIsInRsIiwidHIiLCJiciIsImJsIiwiZGVmYXVsdFJhZGl1cyIsInNpZGUiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsIm1vdmVUbyIsImxpbmVUbyIsInF1YWRyYXRpY0N1cnZlVG8iLCJtb2RlMSIsIm1vZGUyIiwib25rZXlkb3duIiwiZXZ0IiwiUm9vbUNvbGxlY3Rpb24iLCJfZGF0YSIsInJlamVjdCIsImpzb24iLCJVc2VyQ29sbGVjdGlvbiIsInNvcnQiLCJhIiwiYiIsInNjb3JlIiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsIkRyb25lTW9kZWwiLCJwbGF5ZXJMb2dpbiIsIkdhbWVNb2RlbCIsImhvc3QiLCJ3cyIsImdldEhvc3QiLCJSb29tTW9kZWwiLCJuYW1lIiwiaXAiLCJkcm9uZXMiLCJlbmRDb25kaXRpb24iLCJlbmRWYWx1ZSIsImF2YWlsYWJsZUNvbG9ycyIsInBhdGhUb1JlZ2V4Iiwia2V5TmFtZXMiLCJwYXJ0cyIsInNwbGl0IiwiZmlsdGVyIiwicGFydCIsIm1hcCIsImV4ZWMiLCJzbGljZSIsIlJlZ0V4cCIsInBhdGgiLCJrZXlzIiwiY2hlY2siLCJldmVyeSIsInJlZ2V4cCIsInN0ZXAiLCJ0bXAiLCJyZXBsYWNlIiwicmVkdWNlIiwicHJldiIsImN1cnIiLCJwb3MiLCJSb3V0ZSIsInJlZ2V4IiwiVmlldyIsIl92aWV3IiwiaW5pdCIsIl9fcm91dGVyIiwicmVzdW1lIiwiT2JqZWN0IiwiYXNzaWduIiwicGF1c2UiLCJhZGRSb3V0ZSIsInN0YXJ0IiwidGFnTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJoaWRlIiwic2V0QXR0cnMiLCJhdHRycyIsInNlbGYiLCJlbCIsImFwcGVuZENoaWxkIiwiZm9yRWFjaCIsInNldEF0dHJpYnV0ZSIsIm91dGVySFRNTCIsIlVzZXJNb2RlbCIsImdhbWVzIiwic2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBO0lBQ3FCQSxNO0FBQ3BCOzs7QUFHQSxtQkFBYztBQUFBOztBQUNiLE1BQUlBLE9BQU9DLFVBQVgsRUFBdUI7QUFDdEIsVUFBT0QsT0FBT0MsVUFBZDtBQUNBOztBQUVELE9BQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixJQUFuQjs7QUFFQSxPQUFLQyxPQUFMLEdBQWVDLE9BQU9ELE9BQXRCOztBQUVBSixTQUFPQyxVQUFQLEdBQW9CLElBQXBCO0FB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QUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxFQUFFLFlBQVk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLDZCQUE2QjtBQUNwRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxzQkFBc0I7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLCtCQUErQixpQkFBaUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMsRUFBRSx1QkFBdUI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0QztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsR0FBRztBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLG9FQUFvRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCLGNBQWM7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELEVBQUU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFD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QkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEVBQUUsdUJBQXVCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGdCQUFnQjtBQUNoQixnQkFBZ0I7QUFDaEIsa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsR0FBRztBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxHQUFHO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEVBQUUsMEJBQTBCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixrQ0FBa0M7QUFDbEMsMENBQTBDO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixvQ0FBb0M7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0Esc0RBQXNEO0FBQ3RELDJDQUEyQztBQUMzQztBQUNBLHVDQUF1QztBQUN2QyxpREFBaUQ7QUFDakQscUNBQXFDO0FBQ3JDLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7QUFHQSx5RUFBeUU7QUFDekUseUJBQXlCO0FBQ3pCLG9DQUFvQztBQUNwQztBQUNBLDZCQUE2QjtBQUM3Qix3Q0FBd0M7QUFDeEMsNkJBQTZCO0FBQzdCLGFBQWE7QUFDYjtBQUNBLG1FQUFtRTtBQUNuRSx1Q0FBdUM7QUFDdkMsa0VBQWtFO0FBQ2xFLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFDdkMsMERBQTBEO0FBQzFELGlCQUFpQixPQUFPO0FBQ3hCLGtEQUFrRDtBQUNsRCxpQkFBaUI7QUFDakIsY0FBYztBQUNkO0FBQ0Esc0VBQXNFO0FBQ3RFLHFDQUFxQztBQUNyQyx5Q0FBeUM7QUFDekMsMkNBQTJDO0FBQzNDLHdFQUF3RTtBQUN4RSxxQkFBcUIsT0FBTztBQUM1QixvREFBb0Q7QUFDcEQscUJBQXFCO0FBQ3JCO0FBQ0EsaUJBQWlCO0FBQ2pCLGNBQWM7QUFDZDtBQUNBLCtEQUErRDtBQUMvRDtBQUNBLGNBQWM7QUFDZDtBQUNBLDZCQUE2QjtBQUM3QixTQUFTLHFDQUFxQztBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQixVQUFVO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLFlBQVk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsQ0FBQyxFQUFFLFlBQVk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxFQUFFLFlBQVk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLHFDQUFxQztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEVBQUUsWUFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsYUFBYTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixhQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjtBQUMxQix5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxFQUFFLHVCQUF1QjtBQUMxQjtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsR0FBRztBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFNBQVM7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLFlBQVk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGNBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxQ0FBcUM7QUFDckUsZ0NBQWdDLG1DQUFtQztBQUNuRSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMseUJBQXlCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQyxFQUFFLDBCQUEwQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQyxHQUFHO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0MsdUNBQXVDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdDQUF3QyxnQkFBZ0IsRUFBRTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLFlBQVk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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REFBdUQ7QUFDdkQsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qix1QkFBdUI7QUFDckQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSx1Q0FBdUMsMEJBQTBCO0FBQ2pFO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7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QUVRO0FBQ0wsZ0JBQU16QyxPQUFPO0FBQ1R1Qix1QkFBTyxLQUFLQSxLQURIO0FBRVRHLDBCQUFVLEtBQUtBO0FBRk4sYUFBYjtBQUlBLGdCQUFNZSxXQUFXLG9CQUFRLHlDQUFSLEVBQW1ELE1BQW5ELEVBQTJEekMsSUFBM0QsQ0FBakI7QUFDQXdELG9CQUFRQyxHQUFSLENBQVloQixTQUFTRyxNQUFyQjtBQUNBLG9CQUFRSCxTQUFTRyxNQUFqQjtBQUNJLHFCQUFLLEdBQUw7QUFDQSxxQkFBSyxHQUFMO0FBQVUseUJBQUtYLFVBQUwsR0FBa0IsNEJBQWxCO0FBQ0EseUJBQUtDLGFBQUwsR0FBcUIsRUFBckI7QUFDQTtBQUNWLHFCQUFLLEdBQUw7QUFBVSx5QkFBS0QsVUFBTCxHQUFrQixLQUFLQyxhQUFMLEdBQXFCLEtBQUtlLFVBQUwsR0FBa0IsRUFBekQ7QUFDQSx5QkFBS0csUUFBTCxHQUFnQlgsU0FBU0EsUUFBVCxDQUFrQlcsUUFBbEMsQ0FEVixDQUNzRDtBQUM1Qyx5QkFBS3lJLEtBQUwsR0FBYXBKLFNBQVNBLFFBQVQsQ0FBa0JvSixLQUEvQjtBQUNBLHlCQUFLc0UsS0FBTCxHQUFhMU4sU0FBU0EsUUFBVCxDQUFrQjBOLEtBQS9CO0FBQ0FyUSwyQkFBT3FGLE1BQVAsQ0FBYyxlQUFkO0FBQ0FyRiwyQkFBT3NRLEdBQVAsQ0FBVyxlQUFYLEVBQTRCcFEsS0FBS3VCLEtBQWpDO0FBQ0E7QUFDVjtBQUFTaUMsNEJBQVFDLEdBQVIsQ0FBWSwwQkFBWjtBQVpiO0FBY0EsbUJBQU9oQixRQUFQO0FBQ0g7OzttQ0FFVTtBQUNQLG1CQUFPLEtBQUtvSixLQUFaO0FBQ0g7Ozs7OztrQkFySGdCcUUsUyIsImZpbGUiOiJqcy9haXJkcm9uZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm91dGUgZnJvbSAnLi9yb3V0ZSc7XG5cbi8qKiDQmtC70LDRgdGBINGA0L7Rg9GC0LXRgNCwICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIge1xuXHQvKipcblx0ICog0KHQvtC30LTQsNGR0YIg0L3QvtCy0YvQuSDRgNC+0YPRgtC10YAg0LjQu9C4INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINGD0LbQtSDRgdC+0LfQtNCw0L3QvdGL0Lkg0LjQvdGB0YLQsNC90YFcblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGlmIChSb3V0ZXIuX19pbnN0YW5jZSkge1xuXHRcdFx0cmV0dXJuIFJvdXRlci5fX2luc3RhbmNlO1xuXHRcdH1cblxuXHRcdHRoaXMucm91dGVzID0gW107XG5cdFx0dGhpcy5hY3RpdmVSb3V0ZSA9IG51bGw7XG5cblx0XHR0aGlzLmhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcblxuXHRcdFJvdXRlci5fX2luc3RhbmNlID0gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiDQlNC+0LHQsNCy0LvRj9C10YIg0L3QvtCy0YvQuSBSb3V0ZSDQsiDRgNC+0YPRgtC10YBcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0KjQsNCx0LvQvtC9INC/0YPRgtC4XG5cdCAqIEBwYXJhbSB7Vmlld30gdmlldyAtINCa0LvQsNGB0YEg0LrQvtC90LrRgNC10YLQvdC+0LkgVmlld1xuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQtSDQv9Cw0YDQsNC80LXRgtGA0YssINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L/QtdGA0LXQtNCw0L3RiyDQstC+IHZpZXcg0L/RgNC4INC10ZEg0YHQvtC30LTQsNC90LjQuCDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHQgKiBAcmV0dXJucyB7Um91dGVyfVxuXHQgKi9cblx0YWRkUm91dGUocGF0aG5hbWUsIHZpZXcsIG9wdGlvbnMgPSB7fSkge1xuXHRcdGxldCByb3V0ZSA9IG5ldyBSb3V0ZShwYXRobmFtZSwgdmlldywgb3B0aW9ucyk7XG5cdFx0cm91dGUuc2V0Um91dGVyKHRoaXMpO1xuXHRcdHRoaXMucm91dGVzLnB1c2gocm91dGUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqINCX0LDQv9GD0YHQutCw0LXRgiDRgNC+0YPRgtC10YAg0Lgg0L/QtdGA0LXRhdC+0LTQuNGCINC/0L4g0YLQtdC60YPRidC10LzRgyDQv9GD0YLQuCDQsiDQv9GA0LjQu9C+0LbQtdC90LjQuFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlPXt9XSAtINCe0LHRitC10LrRgiBzdGF0ZSwg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXQtNCw0ZHRgtGB0Y8g0LIg0L/QtdGA0LLRi9C5INCy0YvQt9C+0LIgb25yb3V0ZVxuXHQgKi9cblx0c3RhcnQoc3RhdGUgPSB7fSkge1xuXHRcdHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRsZXQgc3RhdGUgPSBldmVudC5zdGF0ZTtcblx0XHRcdGxldCBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblx0XHRcdHRoaXMub25yb3V0ZShwYXRobmFtZSwgc3RhdGUpO1xuXHRcdH0uYmluZCh0aGlzKTtcblxuXHRcdGNvbnN0IHBhdGhuYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXHRcdHRoaXMub25yb3V0ZShwYXRobmFtZSwgc3RhdGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCk0YPQvdC60YbQuNGPLCDQstGL0LfRi9Cy0LDQtdC80LDRjyDQv9GA0Lgg0L/QtdGA0LXRhdC+0LTQtSDQvdCwINC90L7QstGL0Lkg0YDQvtGD0YIg0LIg0L/RgNC40LvQvtC20LXQvdC40Lhcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0J/Rg9GC0YwsINC/0L4g0LrQvtGC0L7RgNC+0LzRgyDQv9GA0L7QuNGB0YXQvtC00LjRgiDQv9C10YDQtdGF0L7QtFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlPXt9XSAtINCe0LHRitC10LrRgiBzdGF0ZSwg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXQtNCw0ZHRgtGB0Y8g0LIg0LLRi9C30L7QsiDQvNC10YLQvtC00LAgbmF2aWdhdGVcblx0ICovXG5cdG9ucm91dGUocGF0aG5hbWUsIHN0YXRlID0ge30pIHtcblx0XHRsZXQgcm91dGUgPSB0aGlzLnJvdXRlcy5maW5kKHJvdXRlID0+IHJvdXRlLm1hdGNoKHBhdGhuYW1lKSk7XG5cdFx0aWYgKCFyb3V0ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmFjdGl2ZVJvdXRlKSB7XG5cdFx0XHR0aGlzLmFjdGl2ZVJvdXRlLmxlYXZlKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hY3RpdmVSb3V0ZSA9IHJvdXRlO1xuXHRcdHRoaXMuYWN0aXZlUm91dGUubmF2aWdhdGUocGF0aG5hbWUsIHN0YXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9GA0L7Qs9GA0LDQvNC80L3Ri9C5INC/0LXRgNC10YXQvtC0INC90LAg0L3QvtCy0YvQuSDQv9GD0YLRjFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQn9GD0YLRjFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlPXt9XSAtINCe0LHRitC10LrRgiBzdGF0ZSwg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXQtNCw0ZHRgtGB0Y8g0LIg0LLRi9C30L7QsiBoaXN0b3J5LnB1c2hTdGF0ZVxuXHQgKi9cblx0Z28ocGF0aG5hbWUsIHN0YXRlID0ge30pIHtcblx0XHRpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBwYXRobmFtZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCAnJywgcGF0aG5hbWUpO1xuXHRcdHRoaXMub25yb3V0ZShwYXRobmFtZSwgc3RhdGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qt9Cy0L7Qu9GP0LXRgiDRg9GB0YLQsNC90L7QstC40YLRjCDRgdCy0L7RjiDRgdC+0LHRgdGC0LLQtdC90L3Rg9GOINGA0LXQsNC70LjQt9Cw0YbQuNGOIEhpc3RvcnkgQVBJXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBoaXN0b3J5IC0g0LTQvtC70LbQtdC9INC/0YDQtdC00L7RgdGC0LDQstC70Y/RgtGMINGA0LXQsNC70LjQt9Cw0YbQuNGOINC80LXRgtC+0LTQvtCyIGJhY2soKSwgZm9yd2FyZCgpLCBwdXNoU3RhdGUoKVxuXHQgKi9cblx0c2V0SGlzdG9yeShoaXN0b3J5KSB7XG5cdFx0dGhpcy5oaXN0b3J5ID0gaGlzdG9yeTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQktC+0LfQstGA0LDRgiDQvdCwINC+0LTQuNC9INGI0LDQsyDQvdCw0LfQsNC0INCyINC40YHRgtC+0YDQuNC4INCx0YDQsNGD0LfQtdGA0LBcblx0ICovXG5cdGJhY2soKSB7XG5cdFx0dGhpcy5oaXN0b3J5LmJhY2soKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C10YDQtdGF0L7QtCDQvdCwINC+0LTQuNC9INGI0LDQsyDQstC/0LXRgNGR0LQg0LIg0LjRgdGC0L7RgNC40Lgg0LHRgNCw0YPQt9C10YDQsFxuXHQgKi9cblx0Zm9yd2FyZCgpIHtcblx0XHR0aGlzLmhpc3RvcnkuZm9yd2FyZCgpO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZXIuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL3RlbXBsYXRlcy9nYW1lLnRtcGwueG1sJztcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSAnLi4vbW9kZWxzL0dhbWVNb2RlbCc7XG5pbXBvcnQgZ2FtZUNhbnZhcyBmcm9tICcuLi9jYW52YXMnO1xuY29uc3QgZmV0Y2hSZXRyeSA9IHJlcXVpcmUoJ2ZldGNoLXJldHJ5Jyk7XG5jb25zdCBjb29raWUgPSByZXF1aXJlKCdqcy1jb29raWUnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAoZGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1nYW1lJywgYm9keUNsYXNzOiAnYm9keS1nYW1lJyB9KTtcbiAgICAgICAgdGhpcy5fZ2FtZSA9IG5ldyBHYW1lTW9kZWwoKTtcbiAgICB9XG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgIGlmICghY29va2llLmdldCgnYWlyZHJvbmVFbWFpbCcpKSB7XG4gICAgICAgICAgIHRoaXMucm91dGVyLmdvKCcvJyk7XG4gICAgICAgICAgIHJldHVybjtcbiAgICAgICB9XG4gICAgICAgdGhpcy5fZWwuaW5uZXJIVE1MID0gdGVtcGxhdGUoeyBzb3VyY2U6IHRoaXMuX2dhbWUuZ2V0VmlkZW8oKSB9KTtcbiAgICAgICAgLy8gY2hlY2sgdGhlIGNvbm5lY3Rpb246XG4gICAgICAgIGZldGNoUmV0cnkoJ2h0dHBzOi8vYWlyLWRyb25lLmhlcm9rdWFwcC5jb20vdXNlcicsIHtcbiAgICAgICAgICAgIHJldHJpZXM6IDEwLFxuICAgICAgICAgICAgcmV0cnlEZWxheTogNTAwLFxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1ub2Nvbm5lY3Rpb24nKS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbm9jb25uZWN0aW9uJykuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICBmZXRjaFJldHJ5KCdodHRwczovL2Fpci1kcm9uZS5oZXJva3VhcHAuY29tL3VzZXInLCB7XG4gICAgICAgICAgICAgICAgcmV0cmllczogMTAwLFxuICAgICAgICAgICAgICAgIHJldHJ5RGVsYXk6IDEwMDAsXG4gICAgICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbm9jb25uZWN0aW9uJykuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2FtZUNhbnZhcygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy92aWV3cy9nYW1lVmlldy5qcyIsImltcG9ydCBWaWV3IGZyb20gJy4uL21vZHVsZXMvdmlldyc7XG5pbXBvcnQgVXNlck1vZGVsIGZyb20gJy4uL21vZGVscy9Vc2VyTW9kZWwnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL3RlbXBsYXRlcy9sb2dpbi50bXBsLnhtbCc7XG5jb25zdCBjb29raWUgPSByZXF1aXJlKCdqcy1jb29raWUnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW5WaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtbG9naW4nLCBib2R5Q2xhc3M6ICdib2R5LWxvZ2luJyB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmIChjb29raWUuZ2V0KCdhaXJkcm9uZUVtYWlsJykpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLmdvKCcvcm9vbXMnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzLmRhdGEpO1xuICAgICAgICB0aGlzLl9mb3JtID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmpzLWxvZ2luLWZvcm0nKTtcbiAgICAgICAgdGhpcy5fZm9ybS5vbnN1Ym1pdCA9IChmdW5jdGlvbiAoKSB7IHRoaXMubG9naW4oKTsgcmV0dXJuIGZhbHNlOyB9KS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLmVtYWlsLm9uYmx1ciA9IChmdW5jdGlvbiAoKSB7IHRoaXMudmFsaWRhdGVFbWFpbCgpOyB9KS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkLm9uYmx1ciA9IChmdW5jdGlvbiAoKSB7IHRoaXMudmFsaWRhdGVQYXNzd29yZCgpOyB9KS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkLm9ua2V5dXAgPSAoZnVuY3Rpb24gKGUpIHsgXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSA4ICYmIGUua2V5Q29kZSAhPT0gOSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQYXNzd29yZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnJlZ2lzdHJhdGlvbi5vbmNsaWNrID0gKGZ1bmN0aW9uICgpIHsgdGhpcy5yb3V0ZXIuZ28oJy9yZWdpc3RyYXRpb24nKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbWFpbEVycm9yID0gdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yO1xuICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3I7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVFbWFpbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0uZWxlbWVudHMuZW1haWwudmFsdWUuc2VhcmNoKC8uQC4vKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZW1haWxFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW1haWxFcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINC/0YDQvtCy0LXRgNGM0YLQtSDQv9GA0LDQstC40LvRjNC90L7RgdGC0YwgZS1tYWlsISc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWFpbEVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1haWxFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQYXNzd29yZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMISc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlRW1haWwoKSAmJiB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICB9XG5cbiAgICBsb2dpbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXJNb2RlbCh7XG4gICAgICAgICAgICBlbWFpbDogdGhpcy5fZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHVzZXIubG9naW4oKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLmlubmVySFRNTCA9IHVzZXIuZ2V0RW1haWxFcnJvcigpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gdXNlci5nZXRQYXNzd29yZEVycm9yKCk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci5oaWRkZW4gPSB0aGlzLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IuaW5uZXJIVE1MID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLmlubmVySFRNTCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLmdvKCcvcm9vbXMnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy92aWV3cy9sb2dpblZpZXcuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFVzZXJNb2RlbCBmcm9tICcuLi9tb2RlbHMvVXNlck1vZGVsJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvcmVnaXN0cmF0aW9uLnRtcGwueG1sJztcbmNvbnN0IGNvb2tpZSA9IHJlcXVpcmUoJ2pzLWNvb2tpZScpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdpc3RyYXRpb25WaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtcmVnaXN0cmF0aW9uJywgYm9keUNsYXNzOiAnYm9keS1yZWdpc3RyYXRpb24nIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKGNvb2tpZS5nZXQoJ2FpcmRyb25lRW1haWwnKSkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIuZ28oJy9yb29tcycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHRoaXMuZGF0YSk7XG4gICAgICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuanMtcmVnaXN0cmF0aW9uLWZvcm0nKTtcbiAgICAgICAgdGhpcy5fZm9ybS5vbnN1Ym1pdCA9IChmdW5jdGlvbiAoKSB7IHRoaXMucmVnaXN0ZXIoKTsgcmV0dXJuIGZhbHNlOyB9KS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLmVtYWlsLm9uYmx1ciA9IChmdW5jdGlvbiAoKSB7IHRoaXMudmFsaWRhdGVFbWFpbCgpOyB9KS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkLm9uYmx1ciA9IChmdW5jdGlvbiAoKSB7IHRoaXMudmFsaWRhdGVQYXNzd29yZCgpOyB9KS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkLm9ua2V5dXAgPSAoZnVuY3Rpb24gKGUpIHsgXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSA4ICYmIGUua2V5Q29kZSAhPT0gOSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQYXNzd29yZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkMi5vbmJsdXIgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZDIub25rZXl1cCA9IChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOCAmJiBlLmtleUNvZGUgIT09IDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5sb2dpbi5vbmJsdXIgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnZhbGlkYXRlTG9naW4oKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbWFpbEVycm9yID0gdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yO1xuICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3I7XG4gICAgICAgIHRoaXMubG9naW5FcnJvciA9IHRoaXMuX2Zvcm0uY2hpbGRyZW4ubG9naW5FcnJvcjtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUVtYWlsKCkge1xuICAgICAgICBpZiAodGhpcy5fZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZS5zZWFyY2goLy4rQC4rXFwuLisvKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZW1haWxFcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINC/0YDQvtCy0LXRgNGM0YLQtSDQv9GA0LDQstC40LvRjNC90L7RgdGC0YwgZS1tYWlsJztcbiAgICAgICAgICAgIHRoaXMuZW1haWxFcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtYWlsRXJyb3IuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWFpbEVycm9yLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBhc3N3b3JkKCkge1xuICAgICAgICBpZiAodGhpcy5fZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQstCy0LXQtNC40YLQtSDQv9Cw0YDQvtC70YwhJztcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZS5sZW5ndGggPCA4KSB7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0LDRgNC+0LvRjCDQvdGD0LbQtdC9INC00LvQuNC90L3QtdC1IDgg0YHQuNC80LLQvtC70L7QsiA9KCc7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQyLnZhbHVlLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICYmIHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUgIT0gdGhpcy5fZm9ybS5lbGVtZW50cy5wYXNzd29yZDIudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAn0J/QsNGA0L7Qu9C4INC90LUg0YHQvtCy0L/QsNC00LDRjtGCISc7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVMb2dpbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0uZWxlbWVudHMubG9naW4udmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5sb2dpbkVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0LrQu9C40LrRg9GF0YMhJztcbiAgICAgICAgICAgIHRoaXMubG9naW5FcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZ2luRXJyb3IuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkVycm9yLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVFbWFpbCh0aGlzKSAmJiB0aGlzLnZhbGlkYXRlUGFzc3dvcmQodGhpcykgJiYgdGhpcy52YWxpZGF0ZUxvZ2luKHRoaXMpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlck1vZGVsKHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLl9mb3JtLmVsZW1lbnRzLmxvZ2luLnZhbHVlLFxuICAgICAgICAgICAgZW1haWw6IHRoaXMuX2Zvcm0uZWxlbWVudHMuZW1haWwudmFsdWUsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5fZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB1c2VyLnNhdmUoKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLnRleHRDb250ZW50ID0gdXNlci5nZXRFbWFpbEVycm9yKCk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci50ZXh0Q29udGVudCA9IHVzZXIuZ2V0UGFzc3dvcmRFcnJvcigpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLmxvZ2luRXJyb3IudGV4dENvbnRlbnQgPSB1c2VyLmdldExvZ2luRXJyb3IoKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLmhpZGRlbiA9IHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci50ZXh0Q29udGVudCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5sb2dpbkVycm9yLmhpZGRlbiA9IHRoaXMuX2Zvcm0uY2hpbGRyZW4ubG9naW5FcnJvci50ZXh0Q29udGVudCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLmhpZGRlbiA9IHRoaXMuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci50ZXh0Q29udGVudCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5nbygnL3Jvb21zJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc29tZSBzZXJ2ZXIgbWFnaWMgZXJyb3InKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci50ZXh0Q29udGVudCA9IHVzZXIuZ2V0RW1haWxFcnJvcigpO1xuICAgICAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLnRleHRDb250ZW50ID0gJ9Ci0L4g0LvQuCBlLW1haWwsINGC0L4g0LvQuCDQv9Cw0YDQvtC70Ywg0L3QtSDQv9C+0LTRhdC+0LTRj9GCLiDQryDRgtCw0Log0Lgg0L3QtSDQv9C+0L3Rj9C7INC70L7Qs9C40LrRgyDRgdC10YDQstCw0LrQsCc7XG4gICAgICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvdmlld3MvcmVnaXN0cmF0aW9uVmlldy5qcyIsIi8vIFRPRE86IHVzZXIgaWQgZnJvbSBjb29raWUgdG8gZHJvbmUgbW9kZWxcbmltcG9ydCBWaWV3IGZyb20gJy4uL21vZHVsZXMvdmlldyc7XG5pbXBvcnQgUm9vbUNvbGxlY3Rpb24gZnJvbSAnLi4vY29sbGVjdGlvbnMvUm9vbUNvbGxlY3Rpb24nO1xuaW1wb3J0IERyb25lTW9kZWwgZnJvbSAnLi4vbW9kZWxzL0Ryb25lTW9kZWwnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL3RlbXBsYXRlcy9yb29tcy50bXBsLnhtbCc7XG5jb25zdCBjb29raWUgPSByZXF1aXJlKCdqcy1jb29raWUnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbXNWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKGRhdGEgPSB7fSkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtcm9vbXMnLCBib2R5Q2xhc3M6ICdib2R5LXJvb21zJyB9KTtcbiAgICAgICAgdGhpcy5yb29tQ29sbGVjdGlvbiA9IG5ldyBSb29tQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmRyb25lID0gbmV3IERyb25lTW9kZWwoeyBwbGF5ZXJFbWFpbDogY29va2llLmdldCgnYWlyZHJvbmVFbWFpbCcpIH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICB0aGlzLnJvb21Db2xsZWN0aW9uLmZldGNoKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICghY29va2llLmdldCgnYWlyZHJvbmVFbWFpbCcpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5nbygnLycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncm9vbUNvbGxlY3Rpb24gZmV0Y2ggYmVnYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHRoaXMucm9vbUNvbGxlY3Rpb24uZ2V0Q29sbGVjdGlvbigpKTtcblxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1lcnJvcicpO1xuICAgIFxuICAgICAgICAgICAgdGhpcy5yb29tcyA9IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb29tc19fcm9vbScpO1xuICAgICAgICAgICAgZm9yIChjb25zdCByb29tIG9mIHRoaXMucm9vbXMpIHtcbiAgICAgICAgICAgICAgICByb29tLm9uY2xpY2sgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnNlbGVjdFJvb20ocm9vbSwgcm9vbS5uZXh0U2libGluZykgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHRoaXMuY29sb3JzID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvckFsbCgnLmpzLWNvbG9yJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbG9ycyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbG9yIG9mIHRoaXMuY29sb3JzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29sb3IpO1xuICAgICAgICAgICAgICAgIGNvbG9yLm9uY2xpY2sgPSAoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZygnZW50ZXJlZCBjb2xvciBjbGljaycpOyB0aGlzLnNlbGVjdENvbG9yKGNvbG9yKSB9KS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2JlZm9yZSBqb2luJyk7XG4gICAgXG4gICAgICAgICAgICB0aGlzLl9qb2luID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmpzLWpvaW4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuam9pbik7XG4gICAgICAgICAgICB0aGlzLl9qb2luLm9uY2xpY2sgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLmpvaW4oKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaW5hbCcpO1xuXG4gICAgICAgICAgICB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuanMtY3JlYXRlJykub25jbGljayA9IChmdW5jdGlvbiAoKSB7IHRoaXMucm91dGVyLmdvKCcvc2NvcmVib2FyZCcpOyB9KS5iaW5kKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RSb29tIChyb29tLCBkZXRhaWxzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb29tcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucm9vbXNbaV0gIT09IHJvb20pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2ldLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tID0gdGhpcy5yb29tQ29sbGVjdGlvbi5nZXRDb2xsZWN0aW9uKClbaV0uaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGV0YWlscy5oaWRkZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZWxlY3RDb2xvcihjb2xvcikge1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5jb2xvcnMpIHtcbiAgICAgICAgICAgIGlmIChjID09PSBjb2xvcikge1xuICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LmFkZCgncm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3ItY2xpY2tlZCcpO1xuICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LnJlbW92ZSgncm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYy5jbGFzc0xpc3QuYWRkKCdyb29tc19fZGV0YWlsc19fY29sb3JzX19jb2xvcicpO1xuICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LnJlbW92ZSgncm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3ItY2xpY2tlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJvbmUuY29sb3IgPSBjb2xvci5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddO1xuICAgICAgICB0aGlzLmVycm9yLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIHRoaXMuZXJyb3IuaGlkZGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBqb2luKCkge1xuICAgICAgICBpZiAodGhpcy5kcm9uZS5jb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgICAgICB0aGlzLmVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRyb25lLnNhdmUodGhpcy5zZWxlY3RlZFJvb20pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyb25lLmVycm9yICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yLnRleHRDb250ZW50ID0gJ9Cn0YLQvi3RgtC+INC/0L7RiNC70L4g0L3QtSDRgtCw0LouINCf0L7Qv9GA0L7QsdGD0LnRgtC1INC10YnQtSDRgNCw0LchJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIuZ28oJy9nYW1lJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IudGV4dENvbnRlbnQgPSAn0JLRi9Cx0LXRgNC40YLQtSDRhtCy0LXRgiDQtNGA0L7QvdCwISc7XG4gICAgICAgICAgICB0aGlzLmVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmFjayAoZGV0YWlscykge1xuICAgICAgICBkZXRhaWxzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIGZvciAociBvZiB0aGlzLnJvb21zKSB7XG4gICAgICAgICAgICByLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tID0gdW5kZWZpbmVkO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL3Jvb21zVmlldy5qcyIsImltcG9ydCBWaWV3IGZyb20gJy4uL21vZHVsZXMvdmlldyc7XG5pbXBvcnQgVXNlckNvbGxlY3Rpb24gZnJvbSAnLi4vY29sbGVjdGlvbnMvVXNlckNvbGxlY3Rpb24nO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL3RlbXBsYXRlcy9zY29yZWJvYXJkLnRtcGwueG1sJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVib2FyZFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1zY29yZWJvYXJkJyB9KTtcbiAgICAgICAgdGhpcy51c2VyQ29sbGVjdGlvbiA9IG5ldyBVc2VyQ29sbGVjdGlvbigpO1xuICAgIH1cblxuICAgIHJlc3VtZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLnVzZXJDb2xsZWN0aW9uLmZldGNoKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ290IGhlcmUnKTtcbiAgICAgICAgICAgIHRoaXMuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHRoaXMudXNlckNvbGxlY3Rpb24uZ2V0Q29sbGVjdGlvbigpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvdyhvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIuc2hvdygpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2JvZHktc2NvcmVib2FyZCcpO1xuICAgIH1cblxuICAgIGhpZGUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyLmhpZGUoKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdib2R5LXNjb3JlYm9hcmQnKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvdmlld3Mvc2NvcmVib2FyZFZpZXcuanMiLCJcbi8qKiBcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIC9ob21lL2l2YW4vRG9jdW1lbnRzLzIwMTZfMl9BaXJEcm9uZS9wdWJsaWMvdGVtcGxhdGVzL2dhbWUudG1wbCB0ZW1wbGF0ZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfXZhciBqc29uPV9fZmVzdF9jb250ZXh0O19fZmVzdF9idWYrPShcIjxpbWcgY2xhc3M9XFxcImdhbWVfX3ZpZGVvXFxcIiBzcmM9XFxcIlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGpzb24uc291cmNlKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjNcIik7fV9fZmVzdF9idWYrPShcIlxcXCIvPjxjYW52YXMgY2xhc3M9XFxcImdhbWVfX2NhbnZhc1xcXCI+0JLQsNGIINCx0YDQsNGD0LfQtdGAINC80L7RgNCw0LvRjNC90L4g0YPRgdGC0LDRgNC10LsuINCe0LHQvdC+0LLQuNGC0LUuINCR0YvRgdGC0YDQvi48L2NhbnZhcz48ZGl2IGNsYXNzPVxcXCJqcy1ub2Nvbm5lY3Rpb24gZ2FtZV9fbm9jb25uZWN0aW9uXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PGRpdiBjbGFzcz1cXFwiZ2FtZV9fbm9jb25uZWN0aW9uX19oZWFkZXJcXFwiPtCd0JXQoiDQmNCd0KLQldCg0J3QldCi0JA8L2Rpdj48L2Rpdj5cIik7X19mZXN0X3RvPV9fZmVzdF9jaHVua3MubGVuZ3RoO2lmIChfX2Zlc3RfdG8pIHtfX2Zlc3RfaXRlcmF0b3IgPSAwO2ZvciAoO19fZmVzdF9pdGVyYXRvcjxfX2Zlc3RfdG87X19mZXN0X2l0ZXJhdG9yKyspIHtfX2Zlc3RfY2h1bms9X19mZXN0X2NodW5rc1tfX2Zlc3RfaXRlcmF0b3JdO2lmICh0eXBlb2YgX19mZXN0X2NodW5rPT09XCJzdHJpbmdcIikge19fZmVzdF9odG1sKz1fX2Zlc3RfY2h1bms7fSBlbHNlIHtfX2Zlc3RfZm49X19mZXN0X2Jsb2Nrc1tfX2Zlc3RfY2h1bmsubmFtZV07aWYgKF9fZmVzdF9mbikgX19mZXN0X2h0bWwrPV9fZmVzdF9jYWxsKF9fZmVzdF9mbixfX2Zlc3RfY2h1bmsucGFyYW1zLF9fZmVzdF9jaHVuay5jcCk7fX1yZXR1cm4gX19mZXN0X2h0bWwrX19mZXN0X2J1Zjt9IGVsc2Uge3JldHVybiBfX2Zlc3RfYnVmO319XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvdGVtcGxhdGVzL2dhbWUudG1wbC54bWxcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKiBcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIC9ob21lL2l2YW4vRG9jdW1lbnRzLzIwMTZfMl9BaXJEcm9uZS9wdWJsaWMvdGVtcGxhdGVzL2xvZ2luLnRtcGwgdGVtcGxhdGVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8Zm9ybSBjbGFzcz1cXFwianMtbG9naW4tZm9ybSBsb2dpbl9fZm9ybVxcXCIgbmFtZT1cXFwibG9naW5Gb3JtXFxcIj48aDEgY2xhc3M9XFxcImxvZ2luX19oZWFkZXJcXFwiPtCS0YXQvtC0PC9oMT48c3BhbiBjbGFzcz1cXFwianMtZW1haWwtZXJyb3IgbG9naW5fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJlbWFpbEVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiRS1tYWlsXFxcIiBjbGFzcz1cXFwianMtZW1haWwgbG9naW5fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJlbWFpbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIvPjxzcGFuIGNsYXNzPVxcXCJqcy1wYXNzd29yZC1lcnJvciBsb2dpbl9fZm9ybV9fZXJyb3JcXFwiIG5hbWU9XFxcInBhc3N3b3JkRXJyb3JcXFwiIGhpZGRlbj1cXFwiaGlkZGVuXFxcIj48L3NwYW4+PGlucHV0IHBsYWNlaG9sZGVyPVxcXCJQYXNzd29yZFxcXCIgY2xhc3M9XFxcImpzLXBhc3N3b3JkIGxvZ2luX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwicGFzc3dvcmRcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIi8+PGJ1dHRvbiBjbGFzcz1cXFwianNfc3VibWl0IGxvZ2luX19mb3JtX19idXR0b25cXFwiIG5hbWU9XFxcImJ1dHRvblxcXCI+0JLQvtC50YLQuCE8L2J1dHRvbj48YSBjbGFzcz1cXFwibG9naW5fX2Zvcm1fX2xpbmtcXFwiIG5hbWU9XFxcInJlZ2lzdHJhdGlvblxcXCI+0KDQtdCz0LjRgdGC0YDQsNGG0LjRjzwvYT48L2Zvcm0+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3RlbXBsYXRlcy9sb2dpbi50bXBsLnhtbFxuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqIFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogL2hvbWUvaXZhbi9Eb2N1bWVudHMvMjAxNl8yX0FpckRyb25lL3B1YmxpYy90ZW1wbGF0ZXMvcmVnaXN0cmF0aW9uLnRtcGwgdGVtcGxhdGVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8Zm9ybSBjbGFzcz1cXFwianMtcmVnaXN0cmF0aW9uLWZvcm0gcmVnaXN0cmF0aW9uX19mb3JtXFxcIj48aDEgY2xhc3M9XFxcInJlZ2lzdHJhdGlvbl9faGVhZGVyXFxcIj7Qn9C+0LfQvdCw0LrQvtC80LjQvNGB0Y8/PC9oMT48c3BhbiBjbGFzcz1cXFwianMtZW1haWwtZXJyb3IgcmVnaXN0cmF0aW9uX19mb3JtX19lcnJvclxcXCIgbmFtZT1cXFwiZW1haWxFcnJvclxcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjwvc3Bhbj48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIkUtbWFpbFxcXCIgY2xhc3M9XFxcImpzLWVtYWlsIHJlZ2lzdHJhdGlvbl9fZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcImVtYWlsXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIi8+PHNwYW4gY2xhc3M9XFxcImpzLXBhc3N3b3JkLWVycm9yIHJlZ2lzdHJhdGlvbl9fZm9ybV9fZXJyb3JcXFwiIG5hbWU9XFxcInBhc3N3b3JkRXJyb3JcXFwiIGhpZGRlbj1cXFwiaGlkZGVuXFxcIj48L3NwYW4+PGlucHV0IHBsYWNlaG9sZGVyPVxcXCJQYXNzd29yZFxcXCIgY2xhc3M9XFxcImpzLXBhc3N3b3JkIHJlZ2lzdHJhdGlvbl9fZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcInBhc3N3b3JkXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIvPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiQ29uZmlybSBwYXNzd29yZFxcXCIgY2xhc3M9XFxcImpzLXBhc3N3b3JkMiByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJwYXNzd29yZDJcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIi8+PHNwYW4gY2xhc3M9XFxcImpzLWxvZ2luLWVycm9yIHJlZ2lzdHJhdGlvbl9fZm9ybV9fZXJyb3JcXFwiIG5hbWU9XFxcImxvZ2luRXJyb3JcXFwiIGhpZGRlbj1cXFwiaGlkZGVuXFxcIj48L3NwYW4+PGlucHV0IHBsYWNlaG9sZGVyPVxcXCLQmtC70LjQutGD0YXQsFxcXCIgY2xhc3M9XFxcImpzLWxvZ2luIHJlZ2lzdHJhdGlvbl9fZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcImxvZ2luXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIi8+PGJ1dHRvbiBjbGFzcz1cXFwianMtc3VibWl0IHJlZ2lzdHJhdGlvbl9fZm9ybV9fYnV0dG9uXFxcIiBuYW1lPVxcXCJidXR0b25cXFwiPtCX0LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDRgtGM0YHRjyE8L2J1dHRvbj48L2Zvcm0+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3RlbXBsYXRlcy9yZWdpc3RyYXRpb24udG1wbC54bWxcbi8vIG1vZHVsZSBpZCA9IDEzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKiBcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIC9ob21lL2l2YW4vRG9jdW1lbnRzLzIwMTZfMl9BaXJEcm9uZS9wdWJsaWMvdGVtcGxhdGVzL3Jvb21zLnRtcGwgdGVtcGxhdGVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8aDEgY2xhc3M9XFxcInJvb21zX19oZWFkZXJcXFwiPtCS0YvQsdC10YDQuNGC0LUg0LjQs9GA0YM8L2gxPlwiKTt2YXIgaSxyb29tLF9fZmVzdF9pdGVyYXRvcjA7dHJ5e19fZmVzdF9pdGVyYXRvcjA9anNvbiB8fCB7fTt9Y2F0Y2goZSl7X19mZXN0X2l0ZXJhdG9yPXt9O19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9Zm9yKGkgaW4gX19mZXN0X2l0ZXJhdG9yMCl7cm9vbT1fX2Zlc3RfaXRlcmF0b3IwW2ldO19fZmVzdF9idWYrPShcIjxkaXYgY2xhc3M9XFxcInJvb21zX19yb29tXFxcIj48aDIgY2xhc3M9XFxcInJvb21zX19yb29tX19oZWFkZXJcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKHJvb20ubmFtZSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCI0XCIpO31fX2Zlc3RfYnVmKz0oXCIgKFwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKHJvb20uaXApKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiNFwiKTt9X19mZXN0X2J1Zis9KFwiKTwvaDI+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNcXFwiIGhpZGRlbj1cXFwiaGlkZGVuXFxcIj48aDEgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19oZWFkZXJcXFwiPtCS0YvQsdC10YDQuNGC0LUg0LrQstCw0LTRgNC+0LrQvtC/0YLQtdGAOjwvaDE+PGRpdiBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX2NvbG9yc1xcXCI+XCIpO3ZhciBpLGNvbG9yLF9fZmVzdF9pdGVyYXRvcjE7dHJ5e19fZmVzdF9pdGVyYXRvcjE9cm9vbS5hdmFpbGFibGVDb2xvcnMgfHwge307fWNhdGNoKGUpe19fZmVzdF9pdGVyYXRvcj17fTtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fWZvcihpIGluIF9fZmVzdF9pdGVyYXRvcjEpe2NvbG9yPV9fZmVzdF9pdGVyYXRvcjFbaV07X19mZXN0X2J1Zis9KFwiPGlucHV0IGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19fY29sb3JzX19jb2xvciBqcy1jb2xvclxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoY29sb3IpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMTJcIik7fV9fZmVzdF9idWYrPShcIjsgY29sb3I6XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoY29sb3IpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMTJcIik7fV9fZmVzdF9idWYrPShcIjtcXFwiLz5cIik7fV9fZmVzdF9idWYrPShcIjwvZGl2PjxwIGNsYXNzPVxcXCJqcy1lcnJvciByb29tc19fZGV0YWlsc19fZXJyb3JcXFwiIGhpZGRlbj1cXFwiaGlkZGVuXFxcIj48L3A+PGJ1dHRvbiBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX2pvaW4ganMtam9pblxcXCI+0J/RgNC40YHQvtC10LTQuNC90LjRgtGM0YHRjyE8L2J1dHRvbj48aHIvPjxoMSBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX2hlYWRlclxcXCI+0KPQttC1INCyINC40LPRgNC1OjwvaDE+PHRhYmxlIGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19fdWxcXFwiPjx1bD5cIik7dmFyIGksZHJvbmUsX19mZXN0X2l0ZXJhdG9yMjt0cnl7X19mZXN0X2l0ZXJhdG9yMj1yb29tLmRyb25lcyB8fCB7fTt9Y2F0Y2goZSl7X19mZXN0X2l0ZXJhdG9yPXt9O19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9Zm9yKGkgaW4gX19mZXN0X2l0ZXJhdG9yMil7ZHJvbmU9X19mZXN0X2l0ZXJhdG9yMltpXTtfX2Zlc3RfYnVmKz0oXCI8dHIgY2xhc3M9XFxcInJvb21fX2RldGFpbHNfX3VsX19saVxcXCI+PHRkPjxsaT5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChkcm9uZS5wbGF5ZXJMb2dpbikpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIyN1wiKTt9X19mZXN0X2J1Zis9KFwiPC9saT48L3RkPjx0ZD48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX191bF9fbGlfX2NvbG9yXFxcIiBkaXNhYmxlZD1cXFwiZGlzYWJsZWRcXFwiIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGRyb25lLmNvbG9yKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjMzXCIpO31fX2Zlc3RfYnVmKz0oXCI7XFxcIi8+PC90ZD48L3RyPlwiKTt9X19mZXN0X2J1Zis9KFwiPC91bD48L3RhYmxlPjwvZGl2PlwiKTt9X19mZXN0X2J1Zis9KFwiPGhyLz48YnV0dG9uIGNsYXNzPVxcXCJqcy1jcmVhdGUgcm9vbXNfX2NyZWF0ZVxcXCI+0JvQuNC00LXRgNGLPC9idXR0b24+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3RlbXBsYXRlcy9yb29tcy50bXBsLnhtbFxuLy8gbW9kdWxlIGlkID0gMTMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqIFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogL2hvbWUvaXZhbi9Eb2N1bWVudHMvMjAxNl8yX0FpckRyb25lL3B1YmxpYy90ZW1wbGF0ZXMvc2NvcmVib2FyZC50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGgxIGNsYXNzPVxcXCJzY29yZWJvYXJkX19oZWFkZXJcXFwiPtCb0LjQtNC10YDRizwvaDE+PHRhYmxlIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZVxcXCI+PHRyIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJcXFwiPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+IzwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj7QmNC80Y88L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+0JrQvtC70LjRh9C10YHRgtCy0L4g0LHQvtC10LI8L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+0J/RgNC+0YbQtdC90YIg0L/QvtCx0LXQtDwvdGQ+PC90cj5cIik7dmFyIGksZGF0YSxfX2Zlc3RfaXRlcmF0b3IwO3RyeXtfX2Zlc3RfaXRlcmF0b3IwPWpzb24gfHwge307fWNhdGNoKGUpe19fZmVzdF9pdGVyYXRvcj17fTtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fWZvcihpIGluIF9fZmVzdF9pdGVyYXRvcjApe2RhdGE9X19mZXN0X2l0ZXJhdG9yMFtpXTtfX2Zlc3RfYnVmKz0oXCI8dHIgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190clxcXCI+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChpKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjEyXCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoZGF0YS51c2VybmFtZSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIxM1wiKTt9X19mZXN0X2J1Zis9KFwiPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGRhdGEuZ2FtZXMpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMTRcIik7fV9fZmVzdF9idWYrPShcIjwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChkYXRhLnNjb3JlKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjE1XCIpO31fX2Zlc3RfYnVmKz0oXCIgJTwvdGQ+PC90cj5cIik7fV9fZmVzdF9idWYrPShcIjwvdGFibGU+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3RlbXBsYXRlcy9zY29yZWJvYXJkLnRtcGwueG1sXG4vLyBtb2R1bGUgaWQgPSAxMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZUNhbnZhcygpIHtcclxuICAgIHdpbmRvdy5tb2RlID0gMDtcclxuICAgIGxldCBwYXJ0aWNsZXMgPSBbXTtcclxuICAgIFxyXG4gICAgLy8gY2FudmFzIGFuZCAyRCBjb250ZXh0IGluaXRpYWxpemF0aW9uXHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVfX2NhbnZhc1wiKTtcclxuICAgIGNvbnN0IGNvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBcclxuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIFxyXG4gICAgLy8gc3RhcnRpbmcgdGhlIGdhbWUgbG9vcCBhdCA2MCBmcmFtZXMgcGVyIHNlY29uZFxyXG4gICAgY29uc3QgZnJhbWVSYXRlID0gNjAuMDtcclxuICAgIGNvbnN0IGZyYW1lRGVsYXkgPSAxMDAwLjAvZnJhbWVSYXRlO1xyXG4gICAgXHJcbiAgICBsZXQgc3RhdHVzID0gcGFyc2VGbG9hdCgxLjApO1xyXG4gICAgXHJcbiAgICBsZXQgc3RhcnRUaW1lID0gMDtcclxuICAgIFxyXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZShmcmFtZURlbGF5KTtcclxuICAgICAgICAgICAgICAgIH0sIGZyYW1lRGVsYXkpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiByYW5kb21GbG9hdCAobWluLCBtYXgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGgucmFuZG9tKCkqKG1heC1taW4pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogQSBzaW5nbGUgZXhwbG9zaW9uIHBhcnRpY2xlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFBhcnRpY2xlICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IDEuMjtcclxuICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSAyMDtcclxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwXCI7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eVggPSAwO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHlZID0gMDtcclxuICAgICAgICB0aGlzLnNjYWxlU3BlZWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbihtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHNocmlua2luZ1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlIC09IHRoaXMuc2NhbGVTcGVlZCAqIG1zIC8gMTAwMC4wO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbGUgPD0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIG1vdmluZyBhd2F5IGZyb20gZXhwbG9zaW9uIGNlbnRlclxyXG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eVggKiBtcy8xMDAwLjA7XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5WSAqIG1zLzEwMDAuMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHRyYW5zbGF0aW5nIHRoZSAyRCBjb250ZXh0IHRvIHRoZSBwYXJ0aWNsZSBjb29yZGluYXRlc1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuc2F2ZSgpO1xyXG4gICAgICAgICAgICBjb250ZXh0MkQudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAgICAgY29udGV4dDJELnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZHJhd2luZyBhIGZpbGxlZCBjaXJjbGUgaW4gdGhlIHBhcnRpY2xlJ3MgbG9jYWwgc3BhY2VcclxuICAgICAgICAgICAgY29udGV4dDJELmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuYXJjKDAsIDAsIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb250ZXh0MkQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dDJELmZpbGwoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIEFkdmFuY2VkIEV4cGxvc2lvbiBlZmZlY3RcclxuICAgICAqIEVhY2ggcGFydGljbGUgaGFzIGEgZGlmZmVyZW50IHNpemUsIG1vdmUgc3BlZWQgYW5kIHNjYWxlIHNwZWVkLlxyXG4gICAgICpcclxuICAgICAqIFBhcmFtZXRlcnM6XHJcbiAgICAgKiBcdHgsIHkgLSBleHBsb3Npb24gY2VudGVyXHJcbiAgICAgKiBcdGNvbG9yIC0gcGFydGljbGVzJyBjb2xvclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFeHBsb3Npb24oeCwgeSwgY29sb3IpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbWluU2l6ZSA9IDg7XHJcbiAgICAgICAgY29uc3QgbWF4U2l6ZSA9IDMwO1xyXG4gICAgICAgIGNvbnN0IGNvdW50ID0gMTU7XHJcbiAgICAgICAgY29uc3QgbWluU3BlZWQgPSA4MC4wO1xyXG4gICAgICAgIGNvbnN0IG1heFNwZWVkID0gMjIwLjA7XHJcbiAgICAgICAgY29uc3QgbWluU2NhbGVTcGVlZCA9IDEuMDtcclxuICAgICAgICBjb25zdCBtYXhTY2FsZVNwZWVkID0gMi4wO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGFuZ2xlPTA7IGFuZ2xlPDM2MDsgYW5nbGUgKz0gTWF0aC5yb3VuZCgzNjAvY291bnQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJ0aWNsZS54ID0geDtcclxuICAgICAgICAgICAgcGFydGljbGUueSA9IHk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJ0aWNsZS5yYWRpdXMgPSByYW5kb21GbG9hdChtaW5TaXplLCBtYXhTaXplKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhcnRpY2xlLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJ0aWNsZS5zY2FsZVNwZWVkID0gcmFuZG9tRmxvYXQobWluU2NhbGVTcGVlZCwgbWF4U2NhbGVTcGVlZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc3BlZWQgPSByYW5kb21GbG9hdChtaW5TcGVlZCwgbWF4U3BlZWQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHlYID0gc3BlZWQgKiBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODAuMCk7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlLnZlbG9jaXR5WSA9IHNwZWVkICogTWF0aC5zaW4oYW5nbGUgKiBNYXRoLlBJIC8gMTgwLjApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFydGljbGVzLnB1c2gocGFydGljbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9Db25zdCBzaXplIHZhcmlhYmxlc1xyXG4gICAgY29uc3QgcmVjdFNpemUgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDM7XHJcbiAgICBjb25zdCBtYXJnaW5ZID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3RTaXplKSAqIDAuNTtcclxuICAgIGNvbnN0IHN0YXR1c01hcmdpbiA9ICgod2luZG93LmlubmVySGVpZ2h0IC0gcmVjdFNpemUpICogMC41KSArIHJlY3RTaXplICsgNTtcclxuICAgIGNvbnN0IGFsZXJ0U2l6ZSA9IDAuNyAqIHJlY3RTaXplO1xyXG4gICAgY29uc3QgYWxlcnRNYXJnaW4gPSAwLjE1ICogcmVjdFNpemU7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHVwZGF0ZSAoZnJhbWVEZWxheSlcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0MkQuY2xlYXJSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSBhbmQgZHJhdyBwYXJ0aWNsZXNcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8cGFydGljbGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHBhcnRpY2xlID0gcGFydGljbGVzW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFydGljbGUudXBkYXRlKGZyYW1lRGVsYXkpO1xyXG4gICAgICAgICAgICBwYXJ0aWNsZS5kcmF3KGNvbnRleHQyRCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5zY2FsZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGRyYXcgYWltaW5nIHdpbmRvd1xyXG4gICAgICAgIGRyYXdTdGF0dXMoMC41ICogcmVjdFNpemUsIDAuMSAqIHJlY3RTaXplLCBtYXJnaW5ZIC0gcmVjdFNpemUgKiAwLjEgLSA1LCBcIiM0ZDRkNGRcIiwgXCLQl9C+0L3QsCDQt9Cw0YXQstCw0YLQsFwiLCAxLCAxMCk7XHJcbiAgICAgICAgcm91bmRSZWN0KGNvbnRleHQyRCwgcmVjdFNpemUsIG1hcmdpblksIHJlY3RTaXplLCByZWN0U2l6ZSwgMjAsIFwicmVkXCIsIGZhbHNlKTtcclxuICAgICAgICBzd2l0Y2ggKHdpbmRvdy5tb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgZHJhd1N0YXR1cyhyZWN0U2l6ZSwgMC4yICogMC43ICogcmVjdFNpemUsIHN0YXR1c01hcmdpbiwgXCJncmVlblwiLCBcItCX0LDRhdCy0LDRgiDRhtC10LvQuC4uLlwiLCBzdGF0dXMsIDIwKTtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IHBhcnNlRmxvYXQoc3RhdHVzKSArIHBhcnNlRmxvYXQoMC4wMDcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA+IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBjYW52YXMud2lkdGggICogMC41O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gY2FudmFzLmhlaWdodCAqIDAuNTtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFeHBsb3Npb24oeCwgeSwgXCIjNTI1MjUyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGxvc2lvbih4LCB5LCBcIiNGRkEzMThcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRXhwbG9zaW9uKHgsIHksIFwiIzUyNTI1MlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFeHBsb3Npb24oeCwgeSwgXCIjRkZBMzE4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tb2RlID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzIDwgMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3U3RhdHVzKHJlY3RTaXplLCAwLjIgKiAwLjcgKiByZWN0U2l6ZSwgc3RhdHVzTWFyZ2luLCBcIiNjYzAwMDBcIiwgXCLQktGLINC/0L7QtCDRg9C00LDRgNC+0LwhXCIsIHN0YXR1cywgMjApO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHBhcnNlRmxvYXQoc3RhdHVzKSArIHBhcnNlRmxvYXQoMC4wMDcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0YXJ0VGltZSAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmdsb2JhbEFscGhhID0gMC43NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bmRSZWN0KGNvbnRleHQyRCwgcmVjdFNpemUgKyBhbGVydE1hcmdpbiwgbWFyZ2luWSArIGFsZXJ0TWFyZ2luLCBhbGVydFNpemUsIGFsZXJ0U2l6ZSwgMjAsIFwiIzRkNGQ0ZFwiLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5mb250PScyNXB4IEhlbHZldGljYSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQudGV4dEFsaWduPVwiY2VudGVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5maWxsVGV4dChcItCS0Ysg0L/QvtC00LHQuNGC0YshXCIsIHJlY3RTaXplICsgcmVjdFNpemUgKiAwLjUsIG1hcmdpblkgKyBhbGVydE1hcmdpbiArIDAuMyAqIGFsZXJ0U2l6ZSwgYWxlcnRTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmZvbnQ9JzIwcHggSGVsdmV0aWNhJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmZpbGxUZXh0KFwi0J7Qs9GA0LDQvdC40YfQtdC90LjQtSDQtNC10LnRgdGC0LLRg9C10YI6XCIsIHJlY3RTaXplICsgcmVjdFNpemUgKiAwLjUsIG1hcmdpblkgKyBhbGVydE1hcmdpbiArIDAuNSAqIGFsZXJ0U2l6ZSwgYWxlcnRTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlY29uZHMgPSAxMCAtICgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSBwYXJzZUludChzZWNvbmRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmZpbGxUZXh0KHNlY29uZHMgKyBcIiDRgdC10LrRg9C90LRcIiwgcmVjdFNpemUgKyByZWN0U2l6ZSAqIDAuNSwgbWFyZ2luWSArIGFsZXJ0TWFyZ2luICsgMC42ICogYWxlcnRTaXplLCBhbGVydFNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWNvbmRzIDw9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGRyYXdTdGF0dXMoc2l6ZSwgaGVpZ2h0LCBvZmZzZXRZLCBjb2xvciwgbGFiZWwsIHJlYWxTaXplLCByYWRpdXMpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dDJELmdsb2JhbEFscGhhID0gMC41O1xyXG4gICAgICAgIGNvbnN0IHhNYXJnaW4gPSAod2luZG93LmlubmVyV2lkdGggLSBzaXplKSAqIDAuNTtcclxuICAgICAgICByb3VuZFJlY3QoY29udGV4dDJELCB4TWFyZ2luLCBvZmZzZXRZLCBzaXplICogcmVhbFNpemUsIGhlaWdodCwgcmFkaXVzLCBjb2xvciwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIHJvdW5kUmVjdChjb250ZXh0MkQsIHhNYXJnaW4sIG9mZnNldFksIHNpemUsIGhlaWdodCwgcmFkaXVzLCBjb2xvciwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIGNvbnRleHQyRC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICAgICAgY29udGV4dDJELmZvbnQ9JzIwcHggSGVsdmV0aWNhJztcclxuICAgICAgICBjb250ZXh0MkQuZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgICAgICBjb250ZXh0MkQudGV4dEFsaWduPVwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dDJELmZpbGxUZXh0KGxhYmVsLHhNYXJnaW4gKyBzaXplICogMC41LG9mZnNldFkgKyBoZWlnaHQgKiAwLjYsIHNpemUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiByb3VuZFJlY3QoY29udGV4dDJELCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMsIGNvbG9yLCBmaWxsLCBzdHJva2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb2xvciA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBjb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdHJva2UgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgc3Ryb2tlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiByYWRpdXMgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJhZGl1cyA9IDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcmFkaXVzID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByYWRpdXMgPSB7dGw6IHJhZGl1cywgdHI6IHJhZGl1cywgYnI6IHJhZGl1cywgYmw6IHJhZGl1c307XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRSYWRpdXMgPSB7dGw6IDAsIHRyOiAwLCBicjogMCwgYmw6IDB9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBzaWRlIGluIGRlZmF1bHRSYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgIHJhZGl1c1tzaWRlXSA9IHJhZGl1c1tzaWRlXSB8fCBkZWZhdWx0UmFkaXVzW3NpZGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRleHQyRC5saW5lV2lkdGg9MTA7XHJcbiAgICAgICAgY29udGV4dDJELnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgY29udGV4dDJELmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGNvbnRleHQyRC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb250ZXh0MkQubW92ZVRvKHggKyByYWRpdXMudGwsIHkpO1xyXG4gICAgICAgIGNvbnRleHQyRC5saW5lVG8oeCArIHdpZHRoIC0gcmFkaXVzLnRyLCB5KTtcclxuICAgICAgICBjb250ZXh0MkQucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHksIHggKyB3aWR0aCwgeSArIHJhZGl1cy50cik7XHJcbiAgICAgICAgY29udGV4dDJELmxpbmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQgLSByYWRpdXMuYnIpO1xyXG4gICAgICAgIGNvbnRleHQyRC5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCwgeCArIHdpZHRoIC0gcmFkaXVzLmJyLCB5ICsgaGVpZ2h0KTtcclxuICAgICAgICBjb250ZXh0MkQubGluZVRvKHggKyByYWRpdXMuYmwsIHkgKyBoZWlnaHQpO1xyXG4gICAgICAgIGNvbnRleHQyRC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHkgKyBoZWlnaHQsIHgsIHkgKyBoZWlnaHQgLSByYWRpdXMuYmwpO1xyXG4gICAgICAgIGNvbnRleHQyRC5saW5lVG8oeCwgeSArIHJhZGl1cy50bCk7XHJcbiAgICAgICAgY29udGV4dDJELnF1YWRyYXRpY0N1cnZlVG8oeCwgeSwgeCArIHJhZGl1cy50bCwgeSk7XHJcbiAgICAgICAgY29udGV4dDJELmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIGlmIChmaWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdHJva2UpIHtcclxuICAgICAgICAgICAgY29udGV4dDJELnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/Qp9GC0L7QsdGLINGB0LHRgNC+0YHQuNGC0Ywg0LLRi9C/0L7Qu9C90LXQvdC40Y8g0LDQvdC40LzQsNGG0LjQuCAo0LHRi9Cy0LDQtdGCINCyINGN0YLQvtC8INC90LDQtNC+0LHQvdC+0YHRgtGMKVxyXG4gICAgLy/QtNC+0YHRgtCw0YLQvtGH0L3QviDQv9GA0LjRgNCw0LLQvdGP0YLRjCBtb2RlINC90YPQu9GOIVxyXG4gICAgXHJcbiAgICAvL9Cn0YLQvtCx0Ysg0LfQsNC/0YPRgdGC0LjRgtGMINCw0L3QuNC80LDRhtC40Lgg0L3Rg9C20L3QviDQv9GA0L7RgdGC0L4g0LLRi9GB0YLQsNCy0LjRgtGMINC90YPQttC90YvQuSBtb2RlXHJcbiAgICAvL9C4INC+0LHQvdGD0LvQuNGC0Ywg0L/QtdGA0LXQvNC10L3QvdGD0Y4g0L/RgNC+0LPRgNC10YHRgSDQsdCw0YDQsFxyXG4gICAgLy9cclxuXHJcbiAgICB3aW5kb3cubW9kZTEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93Lm1vZGUgPSAxO1xyXG4gICAgICAgIHN0YXR1cyA9IHBhcnNlRmxvYXQoMC4wKTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5tb2RlMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cubW9kZSA9IDI7XHJcbiAgICAgICAgc3RhdHVzPSBwYXJzZUZsb2F0KDAuMCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGV2dClcclxuICAgIHtcclxuICAgICAgICBldnQgPSBldnQgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgIC8v0JrQstCw0LTRgNCw0LrQvtC/0YLQtdGAINC/0L7QtCDRg9C00LDRgNC+0LxcclxuICAgICAgICBpZiAoZXZ0LmtleUNvZGUgPT0gOTApXHJcbiAgICAgICAge1xyXG4vLyAgICAgICAgICAgIHdpbmRvdy5tb2RlID0gMTtcclxuLy8gICAgICAgICAgICBzdGF0dXMgPSBwYXJzZUZsb2F0KDAuMCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5tb2RlMSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL9CX0LDRhdCy0LDRgiDQv9GA0L7RgtC40LLQvdC40LrQsFxyXG4gICAgICAgIGVsc2UgaWYgKGV2dC5rZXlDb2RlID09IDg4KVxyXG4gICAgICAgIHtcclxuLy8gICAgICAgICAgICB3aW5kb3cubW9kZSA9IDI7XHJcbi8vICAgICAgICAgICAgc3RhdHVzID0gcGFyc2VGbG9hdCgwLjApO1xyXG4gICAgICAgICAgICB3aW5kb3cubW9kZTIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9jYW52YXMuanMiLCJpbXBvcnQgUm9vbU1vZGVsIGZyb20gJy4uL21vZGVscy9Sb29tTW9kZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9XG5cbiAgICBmZXRjaCgpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKCcvZ2FtZXMnKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIH0pLmNhdGNoKCk7XG4gICAgfVxuXG4gICAgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1Jvb21Db2xsZWN0aW9uLmpzIiwiY29uc3QgY29va2llID0gcmVxdWlyZSgnanMtY29va2llJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1dG9yKCkge1xuICAgICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfVxuXG4gICAgZmV0Y2goKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCgnL3JhdGluZycpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0KCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKTtcbiAgICB9XG5cbiAgICBzb3J0KCkge1xuICAgICAgICB0aGlzLl9kYXRhLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcbiAgICB9XG5cbiAgICBnZXRDb2xsZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvY29sbGVjdGlvbnMvVXNlckNvbGxlY3Rpb24uanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0KHVybCwgbWV0aG9kLCBkYXRhKSB7XG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub3BlbihtZXRob2QsIHVybCwgZmFsc2UpO1xuICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXG4gIHJldHVybiB4aHI7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbGlicy5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERyb25lTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5pZCB8fCAwO1xuICAgICAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvciB8fCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucGxheWVyTG9naW4gPSBkYXRhLnBsYXllckxvZ2luO1xuICAgICAgICB0aGlzLnBsYXllckVtYWlsID0gZGF0YS5wbGF5ZXJFbWFpbDtcbiAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgIH1cblxuICAgIHNhdmUocm9vbSkge1xuICAgICAgICBpZiAoIXJvb20pIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSAnTm8gcm9vbSEnO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmZXRjaCgnL2dhbWVzJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICByb29tOiByb29tLFxuICAgICAgICAgICAgICAgIGRyb25lOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyTG9naW46IHRoaXMucGxheWVyTG9naW4sXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckVtYWlsOiB0aGlzLnBsYXllckVtYWlsLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gJ0ZhaWxlZCB0byBzYXZlIGRyb25lISc7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2RlbHMvRHJvbmVNb2RlbC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNb2RlbCB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmhvc3QgPSBvcHRpb25zLmhvc3QgfHwgJy9pbWFnZS9maWxsLmpwZyc7XG4gICAgICAgIHRoaXMud3MgPSBbXTsgLy8gdGhpcyBpcyBmb3Igd2Vic29ja2V0XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICB9XG5cbiAgICBnZXRIb3N0ICgpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKCcvaG9zdCcpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhvc3QgPSBkYXRhLmhvc3Q7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBgQ2FuJ3QgcmVhY2ggdGhlIGhvc3QgJHt0aGlzLmhvc3R9IWA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFZpZGVvKCkge1xuICAgICAgICB0aGlzLmdldEhvc3QoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaG9zdDtcbiAgICB9XG5cbiAgICBtZWNoYW5pY3MgKCkge1xuXG4gICAgfVxuXG4gICAgY29ubmVjdCAoKSB7XG5cbiAgICB9XG5cbiAgICBkaXNjb25uZWN0ICgpIHtcblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2RlbHMvR2FtZU1vZGVsLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbU1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQgfHwgMDtcbiAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lIHx8ICdOZXcgUm9vbSc7XG4gICAgICAgIHRoaXMuaXAgPSBkYXRhLmlwIHx8ICcxMjcuMC4wLjEnO1xuICAgICAgICB0aGlzLmRyb25lcyA9IGRhdGEuZHJvbmVzIHx8IFtdO1xuICAgICAgICB0aGlzLmVuZENvbmRpdGlvbiA9IGRhdGEuZW5kQ29uZGl0aW9uIHx8IDA7XG4gICAgICAgIHRoaXMuZW5kVmFsdWUgPSBkYXRhLmVuZFZhbHVlIHx8IDA7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlQ29sb3JzID0gZGF0YS5hdmFpbGFibGVDb2xvcnMgfHwgW107XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICB9XG5cbiAgICBmZXRjaCgpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKCcvcm9vbScsIHtcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICByb29tOiB0aGlzLmlkLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICAgICAgdGhpcy5pcCA9IGRhdGEuaXA7XG4gICAgICAgICAgICB0aGlzLmRyb25lcyA9IGRhdGEuZHJvbmVzO1xuICAgICAgICAgICAgdGhpcy5lbmRDb25kaXRpb24gPSBkYXRhLmVuZENvbmRpdGlvbjtcbiAgICAgICAgICAgIHRoaXMuZW5kVmFsdWUgPSBkYXRhLmVuZFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVDb2xvcnMgPSBkYXRhLmF2YWlsYWJsZUNvbG9ycztcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSAwO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gJ1dyb25nIHJvb20gbmFtZSc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCgnL3Jvb20nLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgaXA6IHRoaXMuaXAsXG4gICAgICAgICAgICAgICAgZHJvbmVzOiBbXSxcbiAgICAgICAgICAgICAgICBlbmRDb25kaXRpb246IHRoaXMuZW5kQ29uZGl0aW9uLFxuICAgICAgICAgICAgICAgIGVuZFZhbHVlOiB0aGlzLmVuZFZhbHVlLFxuICAgICAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gJ0R1cGxpY2F0ZWQgcm9vbXMhJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxpc3REcm9uZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyb25lcztcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kZWxzL1Jvb21Nb2RlbC5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhdGhUb1JlZ2V4IChwYXRobmFtZSkge1xuXHRsZXQga2V5TmFtZXMgPSBbXTtcblx0bGV0IHBhcnRzID0gcGF0aG5hbWVcblx0XHQuc3BsaXQoJy8nKVxuXHRcdC5maWx0ZXIocGFydCA9PiBwYXJ0KVxuXHRcdC5tYXAocGFydCA9PiB7XG5cdFx0XHRpZiAoL146Ly5leGVjKHBhcnQpKSB7XG5cdFx0XHRcdGtleU5hbWVzLnB1c2gocGFydC5zbGljZSgxKSk7XG5cdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKGBeXFwvKFteL10rKWAsIGBpYCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cChgXlxcLyR7cGFydH1gLCBgaWApO1xuXHRcdH0pO1xuXG5cblx0cmV0dXJuIGZ1bmN0aW9uIChwYXRoKSB7XG5cblx0XHRsZXQga2V5cyA9IFtdO1xuXHRcdGxldCBjaGVjayA9IHBhcnRzLmV2ZXJ5KChyZWdleHAsIHN0ZXApID0+IHtcblx0XHRcdGxldCB0bXAgPSByZWdleHAuZXhlYyhwYXRoKTtcblx0XHRcdGlmICghdG1wKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0bXAubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdGtleXMucHVzaCh0bXBbMV0pO1xuXHRcdFx0fVxuXHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShyZWdleHAsICcnKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0aWYgKGNoZWNrKSB7XG5cdFx0XHRyZXR1cm4ga2V5cy5yZWR1Y2UoKHByZXYsIGN1cnIsIHBvcykgPT4ge1xuXHRcdFx0XHRwcmV2W2tleU5hbWVzW3Bvc11dID0gY3Vycjtcblx0XHRcdFx0cmV0dXJuIHByZXY7XG5cdFx0XHR9LCB7fSk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2R1bGVzL3BhdGhUb1JlZ2V4LmpzIiwibGV0IGlkID0gMDtcbmltcG9ydCBwYXRoVG9SZWdleCBmcm9tICcuL3BhdGhUb1JlZ2V4JztcblxuLyoqINCa0LvQsNGB0YEg0L/RgNC10LTRgdGC0LDQstC70Y/QtdGCINGB0L7QsdC+0Lkg0J/Rg9GC0Ywg0LIg0LLQsNGI0LXQvCDQv9GA0LjQu9C+0LbQtdC90LjQuCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGUge1xuXHQvKipcblx0ICog0KHQvtC30LTQsNGR0YIg0L3QvtCy0YvQuSBSb3V0ZSAtINCw0YHRgdC+0YbQuNC40YDRg9C10YIg0L3QtdC60L7RgtC+0YDRg9GOIHZpZXcg0YEg0YjQsNCx0LvQvtC90L7QvCDQv9GD0YLQuFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQqNCw0LHQu9C+0L0g0L/Rg9GC0Lhcblx0ICogQHBhcmFtIHtWaWV3fSB2aWV3IC0g0JrQu9Cw0YHRgSDQutC+0L3QutGA0LXRgtC90L7QuSBWaWV3XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQlNC+0L/QvtC70L3QuNGC0LXQu9GM0L3Ri9C1INC/0LDRgNCw0LzQtdGC0YDRiywg0LrQvtGC0L7RgNGL0LUg0LHRg9C00YPRgiDQv9C10YDQtdC00LDQvdGLINCy0L4gdmlldyDQv9GA0Lgg0LXRkSDRgdC+0LfQtNCw0L3QuNC4INC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihwYXRobmFtZSwgdmlldywgb3B0aW9ucyA9IHt9KSB7XG5cdFx0Ly9UT0RPOiDQodGD0YnQuNC5INCw0LTQuNGJ0LUsINC90LDQvCDQvdGD0LbQvdC+INC80LXQvdC10LTQttC10YDQuNGC0Ywg0LTQtdC/0YHRi1xuXHRcdHRoaXMucGF0aFRvUmVnZXggPSBwYXRoVG9SZWdleDtcblxuXHRcdHRoaXMuaWQgPSAncCcgKyBpZDtcblx0XHRpZCsrO1xuXHRcdHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcblx0XHR0aGlzLnJlZ2V4ID0gdGhpcy5wYXRoVG9SZWdleChwYXRobmFtZSk7XG5cdFx0dGhpcy5WaWV3ID0gdmlldztcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0YDQvtCy0LXRgNGP0LXRgiwg0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0LvQuCDQv9C10YDQtdC00LDQvdC90YvQuSBwYXRobmFtZSDRgtC10LrRg9GJ0LXQvNGDIFJvdXRlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSAtINCf0YPRgtGMINCyINC/0YDQuNC70L7QttC10L3QuNC4XG5cdCAqIEByZXR1cm5zIHtib29sZWFufSDQoNC10LfRg9C70YzRgtCw0YIg0L/RgNC+0LLQtdGA0LrQuFxuXHQgKi9cblx0bWF0Y2gocGF0aG5hbWUpIHtcblx0XHRyZXR1cm4gISF0aGlzLnJlZ2V4KHBhdGhuYW1lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQkNC60YLQuNCy0LjRgNGD0LXRgiDRgtC10LrRg9GJ0LjQuSBSb3V0ZSAo0L/QtdGA0LXRhdC+0LTQuNGCINC/0L4g0L3QtdC80YMpXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSAtINCf0YPRgtGMINCyINC/0YDQuNC70L7QttC10L3QuNC4XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhdGU9e31dIC0g0J7QsdGK0LXQutGCIHN0YXRlLCDQutC+0YLQvtGA0YvQuSDQsdGL0Lsg0L/QtdGA0LXQtNCw0L0g0LIg0YHQvtCx0YvRgtC40LUgcG9wc3RhdGUg0LTQu9GPINC+0LHRitC10LrRgtCwIHdpbmRvd1xuXHQgKi9cblx0bmF2aWdhdGUocGF0aG5hbWUsIHN0YXRlID0ge30pIHtcblx0XHRzdGF0ZSA9IHN0YXRlIHx8IHt9O1xuXHRcdGxldCBrZXlzID0gdGhpcy5yZWdleChwYXRobmFtZSk7XG5cdFx0aWYgKCF0aGlzLl92aWV3KSB7XG5cdFx0XHRsZXQgdmlldyA9IG5ldyB0aGlzLlZpZXcodGhpcy5vcHRpb25zKTtcblx0XHRcdHZpZXcuaW5pdCh0aGlzLm9wdGlvbnMpO1xuXHRcdFx0dmlldy5zZXRSb3V0ZXIodGhpcy5fX3JvdXRlcik7XG5cdFx0XHR0aGlzLl92aWV3ID0gdmlldztcblx0XHR9XG5cblx0XHR0aGlzLl92aWV3LnJlc3VtZShPYmplY3QuYXNzaWduKHN0YXRlLCBrZXlzKSk7XG5cdH1cblxuXHQvKipcblx0ICog0JTQtdCw0LrRgtC40LLQuNGA0YPQtdGCINGC0LXQutGD0YnQuNC5IFJvdXRlXG5cdCAqL1xuXHRsZWF2ZSgpIHtcblx0XHR0aGlzLl92aWV3ICYmIHRoaXMuX3ZpZXcucGF1c2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDRgtC10LrRg9GJ0LXQvNGDIFJvdXRlINC40L3RgdGC0LDQvdGBINGA0L7Rg9GC0LXRgNCwXG5cdCAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXIgLSDQmNC90YHRgtCw0L3RgSDRgNC+0YPRgtC10YDQsFxuXHQgKi9cblx0c2V0Um91dGVyKHJvdXRlcikge1xuXHRcdHRoaXMuX19yb3V0ZXIgPSByb3V0ZXI7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2R1bGVzL3JvdXRlLmpzIiwiLyogQHByZXNlcnZlXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDEzLTIwMTUgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cbi8qKlxuICogYmx1ZWJpcmQgYnVpbGQgdmVyc2lvbiAzLjQuNlxuICogRmVhdHVyZXMgZW5hYmxlZDogY29yZSwgcmFjZSwgY2FsbF9nZXQsIGdlbmVyYXRvcnMsIG1hcCwgbm9kZWlmeSwgcHJvbWlzaWZ5LCBwcm9wcywgcmVkdWNlLCBzZXR0bGUsIHNvbWUsIHVzaW5nLCB0aW1lcnMsIGZpbHRlciwgYW55LCBlYWNoXG4qL1xuIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sZSk7ZWxzZXt2YXIgZjtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P2Y9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Zj1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJihmPXNlbGYpLGYuUHJvbWlzZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgX2RlcmVxXz09XCJmdW5jdGlvblwiJiZfZGVyZXFfO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiBfZGVyZXFfPT1cImZ1bmN0aW9uXCImJl9kZXJlcV87Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XG52YXIgU29tZVByb21pc2VBcnJheSA9IFByb21pc2UuX1NvbWVQcm9taXNlQXJyYXk7XG5mdW5jdGlvbiBhbnkocHJvbWlzZXMpIHtcbiAgICB2YXIgcmV0ID0gbmV3IFNvbWVQcm9taXNlQXJyYXkocHJvbWlzZXMpO1xuICAgIHZhciBwcm9taXNlID0gcmV0LnByb21pc2UoKTtcbiAgICByZXQuc2V0SG93TWFueSgxKTtcbiAgICByZXQuc2V0VW53cmFwKCk7XG4gICAgcmV0LmluaXQoKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuUHJvbWlzZS5hbnkgPSBmdW5jdGlvbiAocHJvbWlzZXMpIHtcbiAgICByZXR1cm4gYW55KHByb21pc2VzKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmFueSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYW55KHRoaXMpO1xufTtcblxufTtcblxufSx7fV0sMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBmaXJzdExpbmVFcnJvcjtcbnRyeSB7dGhyb3cgbmV3IEVycm9yKCk7IH0gY2F0Y2ggKGUpIHtmaXJzdExpbmVFcnJvciA9IGU7fVxudmFyIHNjaGVkdWxlID0gX2RlcmVxXyhcIi4vc2NoZWR1bGVcIik7XG52YXIgUXVldWUgPSBfZGVyZXFfKFwiLi9xdWV1ZVwiKTtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcblxuZnVuY3Rpb24gQXN5bmMoKSB7XG4gICAgdGhpcy5fY3VzdG9tU2NoZWR1bGVyID0gZmFsc2U7XG4gICAgdGhpcy5faXNUaWNrVXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2xhdGVRdWV1ZSA9IG5ldyBRdWV1ZSgxNik7XG4gICAgdGhpcy5fbm9ybWFsUXVldWUgPSBuZXcgUXVldWUoMTYpO1xuICAgIHRoaXMuX2hhdmVEcmFpbmVkUXVldWVzID0gZmFsc2U7XG4gICAgdGhpcy5fdHJhbXBvbGluZUVuYWJsZWQgPSB0cnVlO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmRyYWluUXVldWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9kcmFpblF1ZXVlcygpO1xuICAgIH07XG4gICAgdGhpcy5fc2NoZWR1bGUgPSBzY2hlZHVsZTtcbn1cblxuQXN5bmMucHJvdG90eXBlLnNldFNjaGVkdWxlciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgdmFyIHByZXYgPSB0aGlzLl9zY2hlZHVsZTtcbiAgICB0aGlzLl9zY2hlZHVsZSA9IGZuO1xuICAgIHRoaXMuX2N1c3RvbVNjaGVkdWxlciA9IHRydWU7XG4gICAgcmV0dXJuIHByZXY7XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuaGFzQ3VzdG9tU2NoZWR1bGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbVNjaGVkdWxlcjtcbn07XG5cbkFzeW5jLnByb3RvdHlwZS5lbmFibGVUcmFtcG9saW5lID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fdHJhbXBvbGluZUVuYWJsZWQgPSB0cnVlO1xufTtcblxuQXN5bmMucHJvdG90eXBlLmRpc2FibGVUcmFtcG9saW5lSWZOZWNlc3NhcnkgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodXRpbC5oYXNEZXZUb29scykge1xuICAgICAgICB0aGlzLl90cmFtcG9saW5lRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cbn07XG5cbkFzeW5jLnByb3RvdHlwZS5oYXZlSXRlbXNRdWV1ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVGlja1VzZWQgfHwgdGhpcy5faGF2ZURyYWluZWRRdWV1ZXM7XG59O1xuXG5cbkFzeW5jLnByb3RvdHlwZS5mYXRhbEVycm9yID0gZnVuY3Rpb24oZSwgaXNOb2RlKSB7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgICBwcm9jZXNzLnN0ZGVyci53cml0ZShcIkZhdGFsIFwiICsgKGUgaW5zdGFuY2VvZiBFcnJvciA/IGUuc3RhY2sgOiBlKSArXG4gICAgICAgICAgICBcIlxcblwiKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGhyb3dMYXRlcihlKTtcbiAgICB9XG59O1xuXG5Bc3luYy5wcm90b3R5cGUudGhyb3dMYXRlciA9IGZ1bmN0aW9uKGZuLCBhcmcpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBhcmcgPSBmbjtcbiAgICAgICAgZm4gPSBmdW5jdGlvbiAoKSB7IHRocm93IGFyZzsgfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmbihhcmcpO1xuICAgICAgICB9LCAwKTtcbiAgICB9IGVsc2UgdHJ5IHtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmbihhcmcpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGFzeW5jIHNjaGVkdWxlciBhdmFpbGFibGVcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIEFzeW5jSW52b2tlTGF0ZXIoZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICB0aGlzLl9sYXRlUXVldWUucHVzaChmbiwgcmVjZWl2ZXIsIGFyZyk7XG4gICAgdGhpcy5fcXVldWVUaWNrKCk7XG59XG5cbmZ1bmN0aW9uIEFzeW5jSW52b2tlKGZuLCByZWNlaXZlciwgYXJnKSB7XG4gICAgdGhpcy5fbm9ybWFsUXVldWUucHVzaChmbiwgcmVjZWl2ZXIsIGFyZyk7XG4gICAgdGhpcy5fcXVldWVUaWNrKCk7XG59XG5cbmZ1bmN0aW9uIEFzeW5jU2V0dGxlUHJvbWlzZXMocHJvbWlzZSkge1xuICAgIHRoaXMuX25vcm1hbFF1ZXVlLl9wdXNoT25lKHByb21pc2UpO1xuICAgIHRoaXMuX3F1ZXVlVGljaygpO1xufVxuXG5pZiAoIXV0aWwuaGFzRGV2VG9vbHMpIHtcbiAgICBBc3luYy5wcm90b3R5cGUuaW52b2tlTGF0ZXIgPSBBc3luY0ludm9rZUxhdGVyO1xuICAgIEFzeW5jLnByb3RvdHlwZS5pbnZva2UgPSBBc3luY0ludm9rZTtcbiAgICBBc3luYy5wcm90b3R5cGUuc2V0dGxlUHJvbWlzZXMgPSBBc3luY1NldHRsZVByb21pc2VzO1xufSBlbHNlIHtcbiAgICBBc3luYy5wcm90b3R5cGUuaW52b2tlTGF0ZXIgPSBmdW5jdGlvbiAoZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyYW1wb2xpbmVFbmFibGVkKSB7XG4gICAgICAgICAgICBBc3luY0ludm9rZUxhdGVyLmNhbGwodGhpcywgZm4sIHJlY2VpdmVyLCBhcmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm4uY2FsbChyZWNlaXZlciwgYXJnKTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgQXN5bmMucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uIChmbiwgcmVjZWl2ZXIsIGFyZykge1xuICAgICAgICBpZiAodGhpcy5fdHJhbXBvbGluZUVuYWJsZWQpIHtcbiAgICAgICAgICAgIEFzeW5jSW52b2tlLmNhbGwodGhpcywgZm4sIHJlY2VpdmVyLCBhcmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChyZWNlaXZlciwgYXJnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEFzeW5jLnByb3RvdHlwZS5zZXR0bGVQcm9taXNlcyA9IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyYW1wb2xpbmVFbmFibGVkKSB7XG4gICAgICAgICAgICBBc3luY1NldHRsZVByb21pc2VzLmNhbGwodGhpcywgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9zZXR0bGVQcm9taXNlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5Bc3luYy5wcm90b3R5cGUuaW52b2tlRmlyc3QgPSBmdW5jdGlvbiAoZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICB0aGlzLl9ub3JtYWxRdWV1ZS51bnNoaWZ0KGZuLCByZWNlaXZlciwgYXJnKTtcbiAgICB0aGlzLl9xdWV1ZVRpY2soKTtcbn07XG5cbkFzeW5jLnByb3RvdHlwZS5fZHJhaW5RdWV1ZSA9IGZ1bmN0aW9uKHF1ZXVlKSB7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCgpID4gMCkge1xuICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGZuLl9zZXR0bGVQcm9taXNlcygpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlY2VpdmVyID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgdmFyIGFyZyA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIGZuLmNhbGwocmVjZWl2ZXIsIGFyZyk7XG4gICAgfVxufTtcblxuQXN5bmMucHJvdG90eXBlLl9kcmFpblF1ZXVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9kcmFpblF1ZXVlKHRoaXMuX25vcm1hbFF1ZXVlKTtcbiAgICB0aGlzLl9yZXNldCgpO1xuICAgIHRoaXMuX2hhdmVEcmFpbmVkUXVldWVzID0gdHJ1ZTtcbiAgICB0aGlzLl9kcmFpblF1ZXVlKHRoaXMuX2xhdGVRdWV1ZSk7XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuX3F1ZXVlVGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX2lzVGlja1VzZWQpIHtcbiAgICAgICAgdGhpcy5faXNUaWNrVXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3NjaGVkdWxlKHRoaXMuZHJhaW5RdWV1ZXMpO1xuICAgIH1cbn07XG5cbkFzeW5jLnByb3RvdHlwZS5fcmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faXNUaWNrVXNlZCA9IGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBc3luYztcbm1vZHVsZS5leHBvcnRzLmZpcnN0TGluZUVycm9yID0gZmlyc3RMaW5lRXJyb3I7XG5cbn0se1wiLi9xdWV1ZVwiOjI2LFwiLi9zY2hlZHVsZVwiOjI5LFwiLi91dGlsXCI6MzZ9XSwzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSwgZGVidWcpIHtcbnZhciBjYWxsZWRCaW5kID0gZmFsc2U7XG52YXIgcmVqZWN0VGhpcyA9IGZ1bmN0aW9uKF8sIGUpIHtcbiAgICB0aGlzLl9yZWplY3QoZSk7XG59O1xuXG52YXIgdGFyZ2V0UmVqZWN0ZWQgPSBmdW5jdGlvbihlLCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5wcm9taXNlUmVqZWN0aW9uUXVldWVkID0gdHJ1ZTtcbiAgICBjb250ZXh0LmJpbmRpbmdQcm9taXNlLl90aGVuKHJlamVjdFRoaXMsIHJlamVjdFRoaXMsIG51bGwsIHRoaXMsIGUpO1xufTtcblxudmFyIGJpbmRpbmdSZXNvbHZlZCA9IGZ1bmN0aW9uKHRoaXNBcmcsIGNvbnRleHQpIHtcbiAgICBpZiAoKCh0aGlzLl9iaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZUNhbGxiYWNrKGNvbnRleHQudGFyZ2V0KTtcbiAgICB9XG59O1xuXG52YXIgYmluZGluZ1JlamVjdGVkID0gZnVuY3Rpb24oZSwgY29udGV4dCkge1xuICAgIGlmICghY29udGV4dC5wcm9taXNlUmVqZWN0aW9uUXVldWVkKSB0aGlzLl9yZWplY3QoZSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKHRoaXNBcmcpIHtcbiAgICBpZiAoIWNhbGxlZEJpbmQpIHtcbiAgICAgICAgY2FsbGVkQmluZCA9IHRydWU7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wcm9wYWdhdGVGcm9tID0gZGVidWcucHJvcGFnYXRlRnJvbUZ1bmN0aW9uKCk7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9ib3VuZFZhbHVlID0gZGVidWcuYm91bmRWYWx1ZUZ1bmN0aW9uKCk7XG4gICAgfVxuICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHRoaXNBcmcpO1xuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgcmV0Ll9wcm9wYWdhdGVGcm9tKHRoaXMsIDEpO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl90YXJnZXQoKTtcbiAgICByZXQuX3NldEJvdW5kVG8obWF5YmVQcm9taXNlKTtcbiAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB2YXIgY29udGV4dCA9IHtcbiAgICAgICAgICAgIHByb21pc2VSZWplY3Rpb25RdWV1ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcHJvbWlzZTogcmV0LFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICBiaW5kaW5nUHJvbWlzZTogbWF5YmVQcm9taXNlXG4gICAgICAgIH07XG4gICAgICAgIHRhcmdldC5fdGhlbihJTlRFUk5BTCwgdGFyZ2V0UmVqZWN0ZWQsIHVuZGVmaW5lZCwgcmV0LCBjb250ZXh0KTtcbiAgICAgICAgbWF5YmVQcm9taXNlLl90aGVuKFxuICAgICAgICAgICAgYmluZGluZ1Jlc29sdmVkLCBiaW5kaW5nUmVqZWN0ZWQsIHVuZGVmaW5lZCwgcmV0LCBjb250ZXh0KTtcbiAgICAgICAgcmV0Ll9zZXRPbkNhbmNlbChtYXliZVByb21pc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldC5fcmVzb2x2ZUNhbGxiYWNrKHRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0Qm91bmRUbyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICBpZiAob2JqICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDIwOTcxNTI7XG4gICAgICAgIHRoaXMuX2JvdW5kVG8gPSBvYmo7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCAmICh+MjA5NzE1Mik7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzQm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDIwOTcxNTIpID09PSAyMDk3MTUyO1xufTtcblxuUHJvbWlzZS5iaW5kID0gZnVuY3Rpb24gKHRoaXNBcmcsIHZhbHVlKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkuYmluZCh0aGlzQXJnKTtcbn07XG59O1xuXG59LHt9XSw0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xudmFyIG9sZDtcbmlmICh0eXBlb2YgUHJvbWlzZSAhPT0gXCJ1bmRlZmluZWRcIikgb2xkID0gUHJvbWlzZTtcbmZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgdHJ5IHsgaWYgKFByb21pc2UgPT09IGJsdWViaXJkKSBQcm9taXNlID0gb2xkOyB9XG4gICAgY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGJsdWViaXJkO1xufVxudmFyIGJsdWViaXJkID0gX2RlcmVxXyhcIi4vcHJvbWlzZVwiKSgpO1xuYmx1ZWJpcmQubm9Db25mbGljdCA9IG5vQ29uZmxpY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGJsdWViaXJkO1xuXG59LHtcIi4vcHJvbWlzZVwiOjIyfV0sNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBjciA9IE9iamVjdC5jcmVhdGU7XG5pZiAoY3IpIHtcbiAgICB2YXIgY2FsbGVyQ2FjaGUgPSBjcihudWxsKTtcbiAgICB2YXIgZ2V0dGVyQ2FjaGUgPSBjcihudWxsKTtcbiAgICBjYWxsZXJDYWNoZVtcIiBzaXplXCJdID0gZ2V0dGVyQ2FjaGVbXCIgc2l6ZVwiXSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGNhbkV2YWx1YXRlID0gdXRpbC5jYW5FdmFsdWF0ZTtcbnZhciBpc0lkZW50aWZpZXIgPSB1dGlsLmlzSWRlbnRpZmllcjtcblxudmFyIGdldE1ldGhvZENhbGxlcjtcbnZhciBnZXRHZXR0ZXI7XG5pZiAoIXRydWUpIHtcbnZhciBtYWtlTWV0aG9kQ2FsbGVyID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiZW5zdXJlTWV0aG9kXCIsIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGVuc3VyZU1ldGhvZChvYmosICdtZXRob2ROYW1lJyk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHN3aXRjaChsZW4pIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBvYmoubWV0aG9kTmFtZSh0aGlzWzBdKTsgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBvYmoubWV0aG9kTmFtZSh0aGlzWzBdLCB0aGlzWzFdKTsgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBvYmoubWV0aG9kTmFtZSh0aGlzWzBdLCB0aGlzWzFdLCB0aGlzWzJdKTsgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBvYmoubWV0aG9kTmFtZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iai5tZXRob2ROYW1lLmFwcGx5KG9iaiwgdGhpcyk7ICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgXCIucmVwbGFjZSgvbWV0aG9kTmFtZS9nLCBtZXRob2ROYW1lKSkoZW5zdXJlTWV0aG9kKTtcbn07XG5cbnZhciBtYWtlR2V0dGVyID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJvYmpcIiwgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAndXNlIHN0cmljdCc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICByZXR1cm4gb2JqLnByb3BlcnR5TmFtZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICBcIi5yZXBsYWNlKFwicHJvcGVydHlOYW1lXCIsIHByb3BlcnR5TmFtZSkpO1xufTtcblxudmFyIGdldENvbXBpbGVkID0gZnVuY3Rpb24obmFtZSwgY29tcGlsZXIsIGNhY2hlKSB7XG4gICAgdmFyIHJldCA9IGNhY2hlW25hbWVdO1xuICAgIGlmICh0eXBlb2YgcmV0ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgaWYgKCFpc0lkZW50aWZpZXIobmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldCA9IGNvbXBpbGVyKG5hbWUpO1xuICAgICAgICBjYWNoZVtuYW1lXSA9IHJldDtcbiAgICAgICAgY2FjaGVbXCIgc2l6ZVwiXSsrO1xuICAgICAgICBpZiAoY2FjaGVbXCIgc2l6ZVwiXSA+IDUxMikge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhjYWNoZSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSBkZWxldGUgY2FjaGVba2V5c1tpXV07XG4gICAgICAgICAgICBjYWNoZVtcIiBzaXplXCJdID0ga2V5cy5sZW5ndGggLSAyNTY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn07XG5cbmdldE1ldGhvZENhbGxlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gZ2V0Q29tcGlsZWQobmFtZSwgbWFrZU1ldGhvZENhbGxlciwgY2FsbGVyQ2FjaGUpO1xufTtcblxuZ2V0R2V0dGVyID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBnZXRDb21waWxlZChuYW1lLCBtYWtlR2V0dGVyLCBnZXR0ZXJDYWNoZSk7XG59O1xufVxuXG5mdW5jdGlvbiBlbnN1cmVNZXRob2Qob2JqLCBtZXRob2ROYW1lKSB7XG4gICAgdmFyIGZuO1xuICAgIGlmIChvYmogIT0gbnVsbCkgZm4gPSBvYmpbbWV0aG9kTmFtZV07XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gXCJPYmplY3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKG9iaikgKyBcIiBoYXMgbm8gbWV0aG9kICdcIiArXG4gICAgICAgICAgICB1dGlsLnRvU3RyaW5nKG1ldGhvZE5hbWUpICsgXCInXCI7XG4gICAgICAgIHRocm93IG5ldyBQcm9taXNlLlR5cGVFcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZuO1xufVxuXG5mdW5jdGlvbiBjYWxsZXIob2JqKSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSB0aGlzLnBvcCgpO1xuICAgIHZhciBmbiA9IGVuc3VyZU1ldGhvZChvYmosIG1ldGhvZE5hbWUpO1xuICAgIHJldHVybiBmbi5hcHBseShvYmosIHRoaXMpO1xufVxuUHJvbWlzZS5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7O1xuICAgIGlmICghdHJ1ZSkge1xuICAgICAgICBpZiAoY2FuRXZhbHVhdGUpIHtcbiAgICAgICAgICAgIHZhciBtYXliZUNhbGxlciA9IGdldE1ldGhvZENhbGxlcihtZXRob2ROYW1lKTtcbiAgICAgICAgICAgIGlmIChtYXliZUNhbGxlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90aGVuKFxuICAgICAgICAgICAgICAgICAgICBtYXliZUNhbGxlciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGFyZ3MsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXJncy5wdXNoKG1ldGhvZE5hbWUpO1xuICAgIHJldHVybiB0aGlzLl90aGVuKGNhbGxlciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGFyZ3MsIHVuZGVmaW5lZCk7XG59O1xuXG5mdW5jdGlvbiBuYW1lZEdldHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqW3RoaXNdO1xufVxuZnVuY3Rpb24gaW5kZXhlZEdldHRlcihvYmopIHtcbiAgICB2YXIgaW5kZXggPSArdGhpcztcbiAgICBpZiAoaW5kZXggPCAwKSBpbmRleCA9IE1hdGgubWF4KDAsIGluZGV4ICsgb2JqLmxlbmd0aCk7XG4gICAgcmV0dXJuIG9ialtpbmRleF07XG59XG5Qcm9taXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lKSB7XG4gICAgdmFyIGlzSW5kZXggPSAodHlwZW9mIHByb3BlcnR5TmFtZSA9PT0gXCJudW1iZXJcIik7XG4gICAgdmFyIGdldHRlcjtcbiAgICBpZiAoIWlzSW5kZXgpIHtcbiAgICAgICAgaWYgKGNhbkV2YWx1YXRlKSB7XG4gICAgICAgICAgICB2YXIgbWF5YmVHZXR0ZXIgPSBnZXRHZXR0ZXIocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIGdldHRlciA9IG1heWJlR2V0dGVyICE9PSBudWxsID8gbWF5YmVHZXR0ZXIgOiBuYW1lZEdldHRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldHRlciA9IG5hbWVkR2V0dGVyO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2V0dGVyID0gaW5kZXhlZEdldHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RoZW4oZ2V0dGVyLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgcHJvcGVydHlOYW1lLCB1bmRlZmluZWQpO1xufTtcbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSw2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBQcm9taXNlQXJyYXksIGFwaVJlamVjdGlvbiwgZGVidWcpIHtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xudmFyIGFzeW5jID0gUHJvbWlzZS5fYXN5bmM7XG5cblByb21pc2UucHJvdG90eXBlW1wiYnJlYWtcIl0gPSBQcm9taXNlLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIWRlYnVnLmNhbmNlbGxhdGlvbigpKSByZXR1cm4gdGhpcy5fd2FybihcImNhbmNlbGxhdGlvbiBpcyBkaXNhYmxlZFwiKTtcblxuICAgIHZhciBwcm9taXNlID0gdGhpcztcbiAgICB2YXIgY2hpbGQgPSBwcm9taXNlO1xuICAgIHdoaWxlIChwcm9taXNlLl9pc0NhbmNlbGxhYmxlKCkpIHtcbiAgICAgICAgaWYgKCFwcm9taXNlLl9jYW5jZWxCeShjaGlsZCkpIHtcbiAgICAgICAgICAgIGlmIChjaGlsZC5faXNGb2xsb3dpbmcoKSkge1xuICAgICAgICAgICAgICAgIGNoaWxkLl9mb2xsb3dlZSgpLmNhbmNlbCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5fY2FuY2VsQnJhbmNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IHByb21pc2UuX2NhbmNlbGxhdGlvblBhcmVudDtcbiAgICAgICAgaWYgKHBhcmVudCA9PSBudWxsIHx8ICFwYXJlbnQuX2lzQ2FuY2VsbGFibGUoKSkge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2lzRm9sbG93aW5nKCkpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9mb2xsb3dlZSgpLmNhbmNlbCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9jYW5jZWxCcmFuY2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faXNGb2xsb3dpbmcoKSkgcHJvbWlzZS5fZm9sbG93ZWUoKS5jYW5jZWwoKTtcbiAgICAgICAgICAgIHByb21pc2UuX3NldFdpbGxCZUNhbmNlbGxlZCgpO1xuICAgICAgICAgICAgY2hpbGQgPSBwcm9taXNlO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHBhcmVudDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9icmFuY2hIYXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsLS07XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fZW5vdWdoQnJhbmNoZXNIYXZlQ2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JyYW5jaGVzUmVtYWluaW5nVG9DYW5jZWwgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICB0aGlzLl9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsIDw9IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fY2FuY2VsQnkgPSBmdW5jdGlvbihjYW5jZWxsZXIpIHtcbiAgICBpZiAoY2FuY2VsbGVyID09PSB0aGlzKSB7XG4gICAgICAgIHRoaXMuX2JyYW5jaGVzUmVtYWluaW5nVG9DYW5jZWwgPSAwO1xuICAgICAgICB0aGlzLl9pbnZva2VPbkNhbmNlbCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9icmFuY2hIYXNDYW5jZWxsZWQoKTtcbiAgICAgICAgaWYgKHRoaXMuX2Vub3VnaEJyYW5jaGVzSGF2ZUNhbmNlbGxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnZva2VPbkNhbmNlbCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2NhbmNlbEJyYW5jaGVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2Vub3VnaEJyYW5jaGVzSGF2ZUNhbmNlbGxlZCgpKSB7XG4gICAgICAgIHRoaXMuX2NhbmNlbCgpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuX2lzQ2FuY2VsbGFibGUoKSkgcmV0dXJuO1xuICAgIHRoaXMuX3NldENhbmNlbGxlZCgpO1xuICAgIGFzeW5jLmludm9rZSh0aGlzLl9jYW5jZWxQcm9taXNlcywgdGhpcywgdW5kZWZpbmVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9jYW5jZWxQcm9taXNlcyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9sZW5ndGgoKSA+IDApIHRoaXMuX3NldHRsZVByb21pc2VzKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fdW5zZXRPbkNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX29uQ2FuY2VsRmllbGQgPSB1bmRlZmluZWQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5faXNDYW5jZWxsYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmlzUGVuZGluZygpICYmICF0aGlzLl9pc0NhbmNlbGxlZCgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuaXNDYW5jZWxsYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmlzUGVuZGluZygpICYmICF0aGlzLmlzQ2FuY2VsbGVkKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fZG9JbnZva2VPbkNhbmNlbCA9IGZ1bmN0aW9uKG9uQ2FuY2VsQ2FsbGJhY2ssIGludGVybmFsT25seSkge1xuICAgIGlmICh1dGlsLmlzQXJyYXkob25DYW5jZWxDYWxsYmFjaykpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbkNhbmNlbENhbGxiYWNrLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLl9kb0ludm9rZU9uQ2FuY2VsKG9uQ2FuY2VsQ2FsbGJhY2tbaV0sIGludGVybmFsT25seSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9uQ2FuY2VsQ2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodHlwZW9mIG9uQ2FuY2VsQ2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgaWYgKCFpbnRlcm5hbE9ubHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZSA9IHRyeUNhdGNoKG9uQ2FuY2VsQ2FsbGJhY2spLmNhbGwodGhpcy5fYm91bmRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICBpZiAoZSA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXR0YWNoRXh0cmFUcmFjZShlLmUpO1xuICAgICAgICAgICAgICAgICAgICBhc3luYy50aHJvd0xhdGVyKGUuZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25DYW5jZWxDYWxsYmFjay5fcmVzdWx0Q2FuY2VsbGVkKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2ludm9rZU9uQ2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9uQ2FuY2VsQ2FsbGJhY2sgPSB0aGlzLl9vbkNhbmNlbCgpO1xuICAgIHRoaXMuX3Vuc2V0T25DYW5jZWwoKTtcbiAgICBhc3luYy5pbnZva2UodGhpcy5fZG9JbnZva2VPbkNhbmNlbCwgdGhpcywgb25DYW5jZWxDYWxsYmFjayk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5faW52b2tlSW50ZXJuYWxPbkNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9pc0NhbmNlbGxhYmxlKCkpIHtcbiAgICAgICAgdGhpcy5fZG9JbnZva2VPbkNhbmNlbCh0aGlzLl9vbkNhbmNlbCgpLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fdW5zZXRPbkNhbmNlbCgpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNhbmNlbCgpO1xufTtcblxufTtcblxufSx7XCIuL3V0aWxcIjozNn1dLDc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5FWFRfRklMVEVSKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgZ2V0S2V5cyA9IF9kZXJlcV8oXCIuL2VzNVwiKS5rZXlzO1xudmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG5cbmZ1bmN0aW9uIGNhdGNoRmlsdGVyKGluc3RhbmNlcywgY2IsIHByb21pc2UpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgYm91bmRUbyA9IHByb21pc2UuX2JvdW5kVmFsdWUoKTtcbiAgICAgICAgcHJlZGljYXRlTG9vcDogZm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0YW5jZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gaW5zdGFuY2VzW2ldO1xuXG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gRXJyb3IgfHxcbiAgICAgICAgICAgICAgICAoaXRlbSAhPSBudWxsICYmIGl0ZW0ucHJvdG90eXBlIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnlDYXRjaChjYikuY2FsbChib3VuZFRvLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlc1ByZWRpY2F0ZSA9IHRyeUNhdGNoKGl0ZW0pLmNhbGwoYm91bmRUbywgZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXNQcmVkaWNhdGUgPT09IGVycm9yT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzUHJlZGljYXRlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlc1ByZWRpY2F0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ5Q2F0Y2goY2IpLmNhbGwoYm91bmRUbywgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh1dGlsLmlzT2JqZWN0KGUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBnZXRLZXlzKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1ba2V5XSAhPSBlW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIHByZWRpY2F0ZUxvb3A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyeUNhdGNoKGNiKS5jYWxsKGJvdW5kVG8sIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBORVhUX0ZJTFRFUjtcbiAgICB9O1xufVxuXG5yZXR1cm4gY2F0Y2hGaWx0ZXI7XG59O1xuXG59LHtcIi4vZXM1XCI6MTMsXCIuL3V0aWxcIjozNn1dLDg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UpIHtcbnZhciBsb25nU3RhY2tUcmFjZXMgPSBmYWxzZTtcbnZhciBjb250ZXh0U3RhY2sgPSBbXTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Byb21pc2VDcmVhdGVkID0gZnVuY3Rpb24oKSB7fTtcblByb21pc2UucHJvdG90eXBlLl9wdXNoQ29udGV4dCA9IGZ1bmN0aW9uKCkge307XG5Qcm9taXNlLnByb3RvdHlwZS5fcG9wQ29udGV4dCA9IGZ1bmN0aW9uKCkge3JldHVybiBudWxsO307XG5Qcm9taXNlLl9wZWVrQ29udGV4dCA9IFByb21pc2UucHJvdG90eXBlLl9wZWVrQ29udGV4dCA9IGZ1bmN0aW9uKCkge307XG5cbmZ1bmN0aW9uIENvbnRleHQoKSB7XG4gICAgdGhpcy5fdHJhY2UgPSBuZXcgQ29udGV4dC5DYXB0dXJlZFRyYWNlKHBlZWtDb250ZXh0KCkpO1xufVxuQ29udGV4dC5wcm90b3R5cGUuX3B1c2hDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl90cmFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3RyYWNlLl9wcm9taXNlQ3JlYXRlZCA9IG51bGw7XG4gICAgICAgIGNvbnRleHRTdGFjay5wdXNoKHRoaXMuX3RyYWNlKTtcbiAgICB9XG59O1xuXG5Db250ZXh0LnByb3RvdHlwZS5fcG9wQ29udGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fdHJhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgdHJhY2UgPSBjb250ZXh0U3RhY2sucG9wKCk7XG4gICAgICAgIHZhciByZXQgPSB0cmFjZS5fcHJvbWlzZUNyZWF0ZWQ7XG4gICAgICAgIHRyYWNlLl9wcm9taXNlQ3JlYXRlZCA9IG51bGw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ29udGV4dCgpIHtcbiAgICBpZiAobG9uZ1N0YWNrVHJhY2VzKSByZXR1cm4gbmV3IENvbnRleHQoKTtcbn1cblxuZnVuY3Rpb24gcGVla0NvbnRleHQoKSB7XG4gICAgdmFyIGxhc3RJbmRleCA9IGNvbnRleHRTdGFjay5sZW5ndGggLSAxO1xuICAgIGlmIChsYXN0SW5kZXggPj0gMCkge1xuICAgICAgICByZXR1cm4gY29udGV4dFN0YWNrW2xhc3RJbmRleF07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5Db250ZXh0LkNhcHR1cmVkVHJhY2UgPSBudWxsO1xuQ29udGV4dC5jcmVhdGUgPSBjcmVhdGVDb250ZXh0O1xuQ29udGV4dC5kZWFjdGl2YXRlTG9uZ1N0YWNrVHJhY2VzID0gZnVuY3Rpb24oKSB7fTtcbkNvbnRleHQuYWN0aXZhdGVMb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgUHJvbWlzZV9wdXNoQ29udGV4dCA9IFByb21pc2UucHJvdG90eXBlLl9wdXNoQ29udGV4dDtcbiAgICB2YXIgUHJvbWlzZV9wb3BDb250ZXh0ID0gUHJvbWlzZS5wcm90b3R5cGUuX3BvcENvbnRleHQ7XG4gICAgdmFyIFByb21pc2VfUGVla0NvbnRleHQgPSBQcm9taXNlLl9wZWVrQ29udGV4dDtcbiAgICB2YXIgUHJvbWlzZV9wZWVrQ29udGV4dCA9IFByb21pc2UucHJvdG90eXBlLl9wZWVrQ29udGV4dDtcbiAgICB2YXIgUHJvbWlzZV9wcm9taXNlQ3JlYXRlZCA9IFByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQ3JlYXRlZDtcbiAgICBDb250ZXh0LmRlYWN0aXZhdGVMb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX3B1c2hDb250ZXh0ID0gUHJvbWlzZV9wdXNoQ29udGV4dDtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX3BvcENvbnRleHQgPSBQcm9taXNlX3BvcENvbnRleHQ7XG4gICAgICAgIFByb21pc2UuX3BlZWtDb250ZXh0ID0gUHJvbWlzZV9QZWVrQ29udGV4dDtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX3BlZWtDb250ZXh0ID0gUHJvbWlzZV9wZWVrQ29udGV4dDtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX3Byb21pc2VDcmVhdGVkID0gUHJvbWlzZV9wcm9taXNlQ3JlYXRlZDtcbiAgICAgICAgbG9uZ1N0YWNrVHJhY2VzID0gZmFsc2U7XG4gICAgfTtcbiAgICBsb25nU3RhY2tUcmFjZXMgPSB0cnVlO1xuICAgIFByb21pc2UucHJvdG90eXBlLl9wdXNoQ29udGV4dCA9IENvbnRleHQucHJvdG90eXBlLl9wdXNoQ29udGV4dDtcbiAgICBQcm9taXNlLnByb3RvdHlwZS5fcG9wQ29udGV4dCA9IENvbnRleHQucHJvdG90eXBlLl9wb3BDb250ZXh0O1xuICAgIFByb21pc2UuX3BlZWtDb250ZXh0ID0gUHJvbWlzZS5wcm90b3R5cGUuX3BlZWtDb250ZXh0ID0gcGVla0NvbnRleHQ7XG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX3Byb21pc2VDcmVhdGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdHggPSB0aGlzLl9wZWVrQ29udGV4dCgpO1xuICAgICAgICBpZiAoY3R4ICYmIGN0eC5fcHJvbWlzZUNyZWF0ZWQgPT0gbnVsbCkgY3R4Ll9wcm9taXNlQ3JlYXRlZCA9IHRoaXM7XG4gICAgfTtcbn07XG5yZXR1cm4gQ29udGV4dDtcbn07XG5cbn0se31dLDk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIENvbnRleHQpIHtcbnZhciBnZXREb21haW4gPSBQcm9taXNlLl9nZXREb21haW47XG52YXIgYXN5bmMgPSBQcm9taXNlLl9hc3luYztcbnZhciBXYXJuaW5nID0gX2RlcmVxXyhcIi4vZXJyb3JzXCIpLldhcm5pbmc7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgY2FuQXR0YWNoVHJhY2UgPSB1dGlsLmNhbkF0dGFjaFRyYWNlO1xudmFyIHVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQ7XG52YXIgcG9zc2libHlVbmhhbmRsZWRSZWplY3Rpb247XG52YXIgYmx1ZWJpcmRGcmFtZVBhdHRlcm4gPVxuICAgIC9bXFxcXFxcL11ibHVlYmlyZFtcXFxcXFwvXWpzW1xcXFxcXC9dKHJlbGVhc2V8ZGVidWd8aW5zdHJ1bWVudGVkKS87XG52YXIgbm9kZUZyYW1lUGF0dGVybiA9IC9cXCgoPzp0aW1lcnNcXC5qcyk6XFxkKzpcXGQrXFwpLztcbnZhciBwYXJzZUxpbmVQYXR0ZXJuID0gL1tcXC88XFwoXSguKz8pOihcXGQrKTooXFxkKylcXCk/XFxzKiQvO1xudmFyIHN0YWNrRnJhbWVQYXR0ZXJuID0gbnVsbDtcbnZhciBmb3JtYXRTdGFjayA9IG51bGw7XG52YXIgaW5kZW50U3RhY2tGcmFtZXMgPSBmYWxzZTtcbnZhciBwcmludFdhcm5pbmc7XG52YXIgZGVidWdnaW5nID0gISEodXRpbC5lbnYoXCJCTFVFQklSRF9ERUJVR1wiKSAhPSAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAodHJ1ZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuZW52KFwiQkxVRUJJUkRfREVCVUdcIikgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmVudihcIk5PREVfRU5WXCIpID09PSBcImRldmVsb3BtZW50XCIpKTtcblxudmFyIHdhcm5pbmdzID0gISEodXRpbC5lbnYoXCJCTFVFQklSRF9XQVJOSU5HU1wiKSAhPSAwICYmXG4gICAgKGRlYnVnZ2luZyB8fCB1dGlsLmVudihcIkJMVUVCSVJEX1dBUk5JTkdTXCIpKSk7XG5cbnZhciBsb25nU3RhY2tUcmFjZXMgPSAhISh1dGlsLmVudihcIkJMVUVCSVJEX0xPTkdfU1RBQ0tfVFJBQ0VTXCIpICE9IDAgJiZcbiAgICAoZGVidWdnaW5nIHx8IHV0aWwuZW52KFwiQkxVRUJJUkRfTE9OR19TVEFDS19UUkFDRVNcIikpKTtcblxudmFyIHdGb3Jnb3R0ZW5SZXR1cm4gPSB1dGlsLmVudihcIkJMVUVCSVJEX1dfRk9SR09UVEVOX1JFVFVSTlwiKSAhPSAwICYmXG4gICAgKHdhcm5pbmdzIHx8ICEhdXRpbC5lbnYoXCJCTFVFQklSRF9XX0ZPUkdPVFRFTl9SRVRVUk5cIikpO1xuXG5Qcm9taXNlLnByb3RvdHlwZS5zdXBwcmVzc1VuaGFuZGxlZFJlamVjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0KCk7XG4gICAgdGFyZ2V0Ll9iaXRGaWVsZCA9ICgodGFyZ2V0Ll9iaXRGaWVsZCAmICh+MTA0ODU3NikpIHxcbiAgICAgICAgICAgICAgICAgICAgICA1MjQyODgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2Vuc3VyZVBvc3NpYmxlUmVqZWN0aW9uSGFuZGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoKHRoaXMuX2JpdEZpZWxkICYgNTI0Mjg4KSAhPT0gMCkgcmV0dXJuO1xuICAgIHRoaXMuX3NldFJlamVjdGlvbklzVW5oYW5kbGVkKCk7XG4gICAgYXN5bmMuaW52b2tlTGF0ZXIodGhpcy5fbm90aWZ5VW5oYW5kbGVkUmVqZWN0aW9uLCB0aGlzLCB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX25vdGlmeVVuaGFuZGxlZFJlamVjdGlvbklzSGFuZGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmaXJlUmVqZWN0aW9uRXZlbnQoXCJyZWplY3Rpb25IYW5kbGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlZCwgdW5kZWZpbmVkLCB0aGlzKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRSZXR1cm5lZE5vblVuZGVmaW5lZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAyNjg0MzU0NTY7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmV0dXJuZWROb25VbmRlZmluZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgMjY4NDM1NDU2KSAhPT0gMDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9ub3RpZnlVbmhhbmRsZWRSZWplY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX2lzUmVqZWN0aW9uVW5oYW5kbGVkKCkpIHtcbiAgICAgICAgdmFyIHJlYXNvbiA9IHRoaXMuX3NldHRsZWRWYWx1ZSgpO1xuICAgICAgICB0aGlzLl9zZXRVbmhhbmRsZWRSZWplY3Rpb25Jc05vdGlmaWVkKCk7XG4gICAgICAgIGZpcmVSZWplY3Rpb25FdmVudChcInVuaGFuZGxlZFJlamVjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJseVVuaGFuZGxlZFJlamVjdGlvbiwgcmVhc29uLCB0aGlzKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0VW5oYW5kbGVkUmVqZWN0aW9uSXNOb3RpZmllZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMjYyMTQ0O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0VW5oYW5kbGVkUmVqZWN0aW9uSXNOb3RpZmllZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkICYgKH4yNjIxNDQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzVW5oYW5kbGVkUmVqZWN0aW9uTm90aWZpZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDI2MjE0NCkgPiAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldFJlamVjdGlvbklzVW5oYW5kbGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAxMDQ4NTc2O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0UmVqZWN0aW9uSXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCAmICh+MTA0ODU3Nik7XG4gICAgaWYgKHRoaXMuX2lzVW5oYW5kbGVkUmVqZWN0aW9uTm90aWZpZWQoKSkge1xuICAgICAgICB0aGlzLl91bnNldFVuaGFuZGxlZFJlamVjdGlvbklzTm90aWZpZWQoKTtcbiAgICAgICAgdGhpcy5fbm90aWZ5VW5oYW5kbGVkUmVqZWN0aW9uSXNIYW5kbGVkKCk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzUmVqZWN0aW9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAxMDQ4NTc2KSA+IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fd2FybiA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHNob3VsZFVzZU93blRyYWNlLCBwcm9taXNlKSB7XG4gICAgcmV0dXJuIHdhcm4obWVzc2FnZSwgc2hvdWxkVXNlT3duVHJhY2UsIHByb21pc2UgfHwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLm9uUG9zc2libHlVbmhhbmRsZWRSZWplY3Rpb24gPSBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgZG9tYWluID0gZ2V0RG9tYWluKCk7XG4gICAgcG9zc2libHlVbmhhbmRsZWRSZWplY3Rpb24gPVxuICAgICAgICB0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIiA/IChkb21haW4gPT09IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbiA6IHV0aWwuZG9tYWluQmluZChkb21haW4sIGZuKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xufTtcblxuUHJvbWlzZS5vblVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgZG9tYWluID0gZ2V0RG9tYWluKCk7XG4gICAgdW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlZCA9XG4gICAgICAgIHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiID8gKGRvbWFpbiA9PT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuIDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgZm4pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG59O1xuXG52YXIgZGlzYWJsZUxvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uKCkge307XG5Qcm9taXNlLmxvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoYXN5bmMuaGF2ZUl0ZW1zUXVldWVkKCkgJiYgIWNvbmZpZy5sb25nU3RhY2tUcmFjZXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGVuYWJsZSBsb25nIHN0YWNrIHRyYWNlcyBhZnRlciBwcm9taXNlcyBoYXZlIGJlZW4gY3JlYXRlZFxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgfVxuICAgIGlmICghY29uZmlnLmxvbmdTdGFja1RyYWNlcyAmJiBsb25nU3RhY2tUcmFjZXNJc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIHZhciBQcm9taXNlX2NhcHR1cmVTdGFja1RyYWNlID0gUHJvbWlzZS5wcm90b3R5cGUuX2NhcHR1cmVTdGFja1RyYWNlO1xuICAgICAgICB2YXIgUHJvbWlzZV9hdHRhY2hFeHRyYVRyYWNlID0gUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaEV4dHJhVHJhY2U7XG4gICAgICAgIGNvbmZpZy5sb25nU3RhY2tUcmFjZXMgPSB0cnVlO1xuICAgICAgICBkaXNhYmxlTG9uZ1N0YWNrVHJhY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoYXN5bmMuaGF2ZUl0ZW1zUXVldWVkKCkgJiYgIWNvbmZpZy5sb25nU3RhY2tUcmFjZXMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW5ub3QgZW5hYmxlIGxvbmcgc3RhY2sgdHJhY2VzIGFmdGVyIHByb21pc2VzIGhhdmUgYmVlbiBjcmVhdGVkXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFByb21pc2UucHJvdG90eXBlLl9jYXB0dXJlU3RhY2tUcmFjZSA9IFByb21pc2VfY2FwdHVyZVN0YWNrVHJhY2U7XG4gICAgICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fYXR0YWNoRXh0cmFUcmFjZSA9IFByb21pc2VfYXR0YWNoRXh0cmFUcmFjZTtcbiAgICAgICAgICAgIENvbnRleHQuZGVhY3RpdmF0ZUxvbmdTdGFja1RyYWNlcygpO1xuICAgICAgICAgICAgYXN5bmMuZW5hYmxlVHJhbXBvbGluZSgpO1xuICAgICAgICAgICAgY29uZmlnLmxvbmdTdGFja1RyYWNlcyA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fY2FwdHVyZVN0YWNrVHJhY2UgPSBsb25nU3RhY2tUcmFjZXNDYXB0dXJlU3RhY2tUcmFjZTtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaEV4dHJhVHJhY2UgPSBsb25nU3RhY2tUcmFjZXNBdHRhY2hFeHRyYVRyYWNlO1xuICAgICAgICBDb250ZXh0LmFjdGl2YXRlTG9uZ1N0YWNrVHJhY2VzKCk7XG4gICAgICAgIGFzeW5jLmRpc2FibGVUcmFtcG9saW5lSWZOZWNlc3NhcnkoKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLmhhc0xvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY29uZmlnLmxvbmdTdGFja1RyYWNlcyAmJiBsb25nU3RhY2tUcmFjZXNJc1N1cHBvcnRlZCgpO1xufTtcblxudmFyIGZpcmVEb21FdmVudCA9IChmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgICAgICAgdXRpbC5nbG9iYWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZS50b0xvd2VyQ2FzZSgpLCB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXV0aWwuZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZG9tRXZlbnQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgICAgICAgICB1dGlsLmdsb2JhbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihuYW1lLCBldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBkb21FdmVudCA9IG5ldyBFdmVudChuYW1lLnRvTG93ZXJDYXNlKCksIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRvbUV2ZW50LmRldGFpbCA9IGV2ZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiAhdXRpbC5nbG9iYWwuZGlzcGF0Y2hFdmVudChkb21FdmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudChcInRlc3Rpbmd0aGVldmVudFwiLCBmYWxzZSwgdHJ1ZSwge30pO1xuICAgICAgICAgICAgdXRpbC5nbG9iYWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgICAgICAgICAgIGRvbUV2ZW50LmluaXRDdXN0b21FdmVudChuYW1lLnRvTG93ZXJDYXNlKCksIGZhbHNlLCB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBldmVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF1dGlsLmdsb2JhbC5kaXNwYXRjaEV2ZW50KGRvbUV2ZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59KSgpO1xuXG52YXIgZmlyZUdsb2JhbEV2ZW50ID0gKGZ1bmN0aW9uKCkge1xuICAgIGlmICh1dGlsLmlzTm9kZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbWl0LmFwcGx5KHByb2Nlc3MsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF1dGlsLmdsb2JhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgICAgIHZhciBtZXRob2ROYW1lID0gXCJvblwiICsgbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IHV0aWwuZ2xvYmFsW21ldGhvZE5hbWVdO1xuICAgICAgICAgICAgaWYgKCFtZXRob2QpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIG1ldGhvZC5hcHBseSh1dGlsLmdsb2JhbCwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH1cbn0pKCk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUHJvbWlzZUxpZmVjeWNsZUV2ZW50T2JqZWN0KG5hbWUsIHByb21pc2UpIHtcbiAgICByZXR1cm4ge3Byb21pc2U6IHByb21pc2V9O1xufVxuXG52YXIgZXZlbnRUb09iamVjdEdlbmVyYXRvciA9IHtcbiAgICBwcm9taXNlQ3JlYXRlZDogZ2VuZXJhdGVQcm9taXNlTGlmZWN5Y2xlRXZlbnRPYmplY3QsXG4gICAgcHJvbWlzZUZ1bGZpbGxlZDogZ2VuZXJhdGVQcm9taXNlTGlmZWN5Y2xlRXZlbnRPYmplY3QsXG4gICAgcHJvbWlzZVJlamVjdGVkOiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdCxcbiAgICBwcm9taXNlUmVzb2x2ZWQ6IGdlbmVyYXRlUHJvbWlzZUxpZmVjeWNsZUV2ZW50T2JqZWN0LFxuICAgIHByb21pc2VDYW5jZWxsZWQ6IGdlbmVyYXRlUHJvbWlzZUxpZmVjeWNsZUV2ZW50T2JqZWN0LFxuICAgIHByb21pc2VDaGFpbmVkOiBmdW5jdGlvbihuYW1lLCBwcm9taXNlLCBjaGlsZCkge1xuICAgICAgICByZXR1cm4ge3Byb21pc2U6IHByb21pc2UsIGNoaWxkOiBjaGlsZH07XG4gICAgfSxcbiAgICB3YXJuaW5nOiBmdW5jdGlvbihuYW1lLCB3YXJuaW5nKSB7XG4gICAgICAgIHJldHVybiB7d2FybmluZzogd2FybmluZ307XG4gICAgfSxcbiAgICB1bmhhbmRsZWRSZWplY3Rpb246IGZ1bmN0aW9uIChuYW1lLCByZWFzb24sIHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHtyZWFzb246IHJlYXNvbiwgcHJvbWlzZTogcHJvbWlzZX07XG4gICAgfSxcbiAgICByZWplY3Rpb25IYW5kbGVkOiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdFxufTtcblxudmFyIGFjdGl2ZUZpcmVFdmVudCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGdsb2JhbEV2ZW50RmlyZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBnbG9iYWxFdmVudEZpcmVkID0gZmlyZUdsb2JhbEV2ZW50LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBhc3luYy50aHJvd0xhdGVyKGUpO1xuICAgICAgICBnbG9iYWxFdmVudEZpcmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZG9tRXZlbnRGaXJlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGRvbUV2ZW50RmlyZWQgPSBmaXJlRG9tRXZlbnQobmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUb09iamVjdEdlbmVyYXRvcltuYW1lXS5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGFzeW5jLnRocm93TGF0ZXIoZSk7XG4gICAgICAgIGRvbUV2ZW50RmlyZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBkb21FdmVudEZpcmVkIHx8IGdsb2JhbEV2ZW50RmlyZWQ7XG59O1xuXG5Qcm9taXNlLmNvbmZpZyA9IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICBvcHRzID0gT2JqZWN0KG9wdHMpO1xuICAgIGlmIChcImxvbmdTdGFja1RyYWNlc1wiIGluIG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHMubG9uZ1N0YWNrVHJhY2VzKSB7XG4gICAgICAgICAgICBQcm9taXNlLmxvbmdTdGFja1RyYWNlcygpO1xuICAgICAgICB9IGVsc2UgaWYgKCFvcHRzLmxvbmdTdGFja1RyYWNlcyAmJiBQcm9taXNlLmhhc0xvbmdTdGFja1RyYWNlcygpKSB7XG4gICAgICAgICAgICBkaXNhYmxlTG9uZ1N0YWNrVHJhY2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKFwid2FybmluZ3NcIiBpbiBvcHRzKSB7XG4gICAgICAgIHZhciB3YXJuaW5nc09wdGlvbiA9IG9wdHMud2FybmluZ3M7XG4gICAgICAgIGNvbmZpZy53YXJuaW5ncyA9ICEhd2FybmluZ3NPcHRpb247XG4gICAgICAgIHdGb3Jnb3R0ZW5SZXR1cm4gPSBjb25maWcud2FybmluZ3M7XG5cbiAgICAgICAgaWYgKHV0aWwuaXNPYmplY3Qod2FybmluZ3NPcHRpb24pKSB7XG4gICAgICAgICAgICBpZiAoXCJ3Rm9yZ290dGVuUmV0dXJuXCIgaW4gd2FybmluZ3NPcHRpb24pIHtcbiAgICAgICAgICAgICAgICB3Rm9yZ290dGVuUmV0dXJuID0gISF3YXJuaW5nc09wdGlvbi53Rm9yZ290dGVuUmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChcImNhbmNlbGxhdGlvblwiIGluIG9wdHMgJiYgb3B0cy5jYW5jZWxsYXRpb24gJiYgIWNvbmZpZy5jYW5jZWxsYXRpb24pIHtcbiAgICAgICAgaWYgKGFzeW5jLmhhdmVJdGVtc1F1ZXVlZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJjYW5ub3QgZW5hYmxlIGNhbmNlbGxhdGlvbiBhZnRlciBwcm9taXNlcyBhcmUgaW4gdXNlXCIpO1xuICAgICAgICB9XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9jbGVhckNhbmNlbGxhdGlvbkRhdGEgPVxuICAgICAgICAgICAgY2FuY2VsbGF0aW9uQ2xlYXJDYW5jZWxsYXRpb25EYXRhO1xuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fcHJvcGFnYXRlRnJvbSA9IGNhbmNlbGxhdGlvblByb3BhZ2F0ZUZyb207XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9vbkNhbmNlbCA9IGNhbmNlbGxhdGlvbk9uQ2FuY2VsO1xuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fc2V0T25DYW5jZWwgPSBjYW5jZWxsYXRpb25TZXRPbkNhbmNlbDtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrID1cbiAgICAgICAgICAgIGNhbmNlbGxhdGlvbkF0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrO1xuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGNhbmNlbGxhdGlvbkV4ZWN1dGU7XG4gICAgICAgIHByb3BhZ2F0ZUZyb21GdW5jdGlvbiA9IGNhbmNlbGxhdGlvblByb3BhZ2F0ZUZyb207XG4gICAgICAgIGNvbmZpZy5jYW5jZWxsYXRpb24gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoXCJtb25pdG9yaW5nXCIgaW4gb3B0cykge1xuICAgICAgICBpZiAob3B0cy5tb25pdG9yaW5nICYmICFjb25maWcubW9uaXRvcmluZykge1xuICAgICAgICAgICAgY29uZmlnLm1vbml0b3JpbmcgPSB0cnVlO1xuICAgICAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2ZpcmVFdmVudCA9IGFjdGl2ZUZpcmVFdmVudDtcbiAgICAgICAgfSBlbHNlIGlmICghb3B0cy5tb25pdG9yaW5nICYmIGNvbmZpZy5tb25pdG9yaW5nKSB7XG4gICAgICAgICAgICBjb25maWcubW9uaXRvcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2ZpcmVFdmVudCA9IGRlZmF1bHRGaXJlRXZlbnQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBkZWZhdWx0RmlyZUV2ZW50KCkgeyByZXR1cm4gZmFsc2U7IH1cblxuUHJvbWlzZS5wcm90b3R5cGUuX2ZpcmVFdmVudCA9IGRlZmF1bHRGaXJlRXZlbnQ7XG5Qcm9taXNlLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uKGV4ZWN1dG9yLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICB0cnkge1xuICAgICAgICBleGVjdXRvcihyZXNvbHZlLCByZWplY3QpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxufTtcblByb21pc2UucHJvdG90eXBlLl9vbkNhbmNlbCA9IGZ1bmN0aW9uICgpIHt9O1xuUHJvbWlzZS5wcm90b3R5cGUuX3NldE9uQ2FuY2VsID0gZnVuY3Rpb24gKGhhbmRsZXIpIHsgOyB9O1xuUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrID0gZnVuY3Rpb24ob25DYW5jZWwpIHtcbiAgICA7XG59O1xuUHJvbWlzZS5wcm90b3R5cGUuX2NhcHR1cmVTdGFja1RyYWNlID0gZnVuY3Rpb24gKCkge307XG5Qcm9taXNlLnByb3RvdHlwZS5fYXR0YWNoRXh0cmFUcmFjZSA9IGZ1bmN0aW9uICgpIHt9O1xuUHJvbWlzZS5wcm90b3R5cGUuX2NsZWFyQ2FuY2VsbGF0aW9uRGF0YSA9IGZ1bmN0aW9uKCkge307XG5Qcm9taXNlLnByb3RvdHlwZS5fcHJvcGFnYXRlRnJvbSA9IGZ1bmN0aW9uIChwYXJlbnQsIGZsYWdzKSB7XG4gICAgO1xuICAgIDtcbn07XG5cbmZ1bmN0aW9uIGNhbmNlbGxhdGlvbkV4ZWN1dGUoZXhlY3V0b3IsIHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcztcbiAgICB0cnkge1xuICAgICAgICBleGVjdXRvcihyZXNvbHZlLCByZWplY3QsIGZ1bmN0aW9uKG9uQ2FuY2VsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9uQ2FuY2VsICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib25DYW5jZWwgbXVzdCBiZSBhIGZ1bmN0aW9uLCBnb3Q6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwudG9TdHJpbmcob25DYW5jZWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb21pc2UuX2F0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrKG9uQ2FuY2VsKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbmNlbGxhdGlvbkF0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrKG9uQ2FuY2VsKSB7XG4gICAgaWYgKCF0aGlzLl9pc0NhbmNlbGxhYmxlKCkpIHJldHVybiB0aGlzO1xuXG4gICAgdmFyIHByZXZpb3VzT25DYW5jZWwgPSB0aGlzLl9vbkNhbmNlbCgpO1xuICAgIGlmIChwcmV2aW91c09uQ2FuY2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHV0aWwuaXNBcnJheShwcmV2aW91c09uQ2FuY2VsKSkge1xuICAgICAgICAgICAgcHJldmlvdXNPbkNhbmNlbC5wdXNoKG9uQ2FuY2VsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NldE9uQ2FuY2VsKFtwcmV2aW91c09uQ2FuY2VsLCBvbkNhbmNlbF0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0T25DYW5jZWwob25DYW5jZWwpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FuY2VsbGF0aW9uT25DYW5jZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29uQ2FuY2VsRmllbGQ7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbGxhdGlvblNldE9uQ2FuY2VsKG9uQ2FuY2VsKSB7XG4gICAgdGhpcy5fb25DYW5jZWxGaWVsZCA9IG9uQ2FuY2VsO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25DbGVhckNhbmNlbGxhdGlvbkRhdGEoKSB7XG4gICAgdGhpcy5fY2FuY2VsbGF0aW9uUGFyZW50ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX29uQ2FuY2VsRmllbGQgPSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbGxhdGlvblByb3BhZ2F0ZUZyb20ocGFyZW50LCBmbGFncykge1xuICAgIGlmICgoZmxhZ3MgJiAxKSAhPT0gMCkge1xuICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25QYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHZhciBicmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID0gcGFyZW50Ll9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsO1xuICAgICAgICBpZiAoYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBicmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID0gMDtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQuX2JyYW5jaGVzUmVtYWluaW5nVG9DYW5jZWwgPSBicmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsICsgMTtcbiAgICB9XG4gICAgaWYgKChmbGFncyAmIDIpICE9PSAwICYmIHBhcmVudC5faXNCb3VuZCgpKSB7XG4gICAgICAgIHRoaXMuX3NldEJvdW5kVG8ocGFyZW50Ll9ib3VuZFRvKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGJpbmRpbmdQcm9wYWdhdGVGcm9tKHBhcmVudCwgZmxhZ3MpIHtcbiAgICBpZiAoKGZsYWdzICYgMikgIT09IDAgJiYgcGFyZW50Ll9pc0JvdW5kKCkpIHtcbiAgICAgICAgdGhpcy5fc2V0Qm91bmRUbyhwYXJlbnQuX2JvdW5kVG8pO1xuICAgIH1cbn1cbnZhciBwcm9wYWdhdGVGcm9tRnVuY3Rpb24gPSBiaW5kaW5nUHJvcGFnYXRlRnJvbTtcblxuZnVuY3Rpb24gYm91bmRWYWx1ZUZ1bmN0aW9uKCkge1xuICAgIHZhciByZXQgPSB0aGlzLl9ib3VuZFRvO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAocmV0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgaWYgKHJldC5pc0Z1bGZpbGxlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldC52YWx1ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGxvbmdTdGFja1RyYWNlc0NhcHR1cmVTdGFja1RyYWNlKCkge1xuICAgIHRoaXMuX3RyYWNlID0gbmV3IENhcHR1cmVkVHJhY2UodGhpcy5fcGVla0NvbnRleHQoKSk7XG59XG5cbmZ1bmN0aW9uIGxvbmdTdGFja1RyYWNlc0F0dGFjaEV4dHJhVHJhY2UoZXJyb3IsIGlnbm9yZVNlbGYpIHtcbiAgICBpZiAoY2FuQXR0YWNoVHJhY2UoZXJyb3IpKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IHRoaXMuX3RyYWNlO1xuICAgICAgICBpZiAodHJhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlnbm9yZVNlbGYpIHRyYWNlID0gdHJhY2UuX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdHJhY2UuYXR0YWNoRXh0cmFUcmFjZShlcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoIWVycm9yLl9fc3RhY2tDbGVhbmVkX18pIHtcbiAgICAgICAgICAgIHZhciBwYXJzZWQgPSBwYXJzZVN0YWNrQW5kTWVzc2FnZShlcnJvcik7XG4gICAgICAgICAgICB1dGlsLm5vdEVudW1lcmFibGVQcm9wKGVycm9yLCBcInN0YWNrXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VkLm1lc3NhZ2UgKyBcIlxcblwiICsgcGFyc2VkLnN0YWNrLmpvaW4oXCJcXG5cIikpO1xuICAgICAgICAgICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcChlcnJvciwgXCJfX3N0YWNrQ2xlYW5lZF9fXCIsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0ZvcmdvdHRlblJldHVybnMocmV0dXJuVmFsdWUsIHByb21pc2VDcmVhdGVkLCBuYW1lLCBwcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCkge1xuICAgIGlmIChyZXR1cm5WYWx1ZSA9PT0gdW5kZWZpbmVkICYmIHByb21pc2VDcmVhdGVkICE9PSBudWxsICYmXG4gICAgICAgIHdGb3Jnb3R0ZW5SZXR1cm4pIHtcbiAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkICYmIHBhcmVudC5fcmV0dXJuZWROb25VbmRlZmluZWQoKSkgcmV0dXJuO1xuICAgICAgICBpZiAoKHByb21pc2UuX2JpdEZpZWxkICYgNjU1MzUpID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgaWYgKG5hbWUpIG5hbWUgPSBuYW1lICsgXCIgXCI7XG4gICAgICAgIHZhciBoYW5kbGVyTGluZSA9IFwiXCI7XG4gICAgICAgIHZhciBjcmVhdG9yTGluZSA9IFwiXCI7XG4gICAgICAgIGlmIChwcm9taXNlQ3JlYXRlZC5fdHJhY2UpIHtcbiAgICAgICAgICAgIHZhciB0cmFjZUxpbmVzID0gcHJvbWlzZUNyZWF0ZWQuX3RyYWNlLnN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICAgICAgdmFyIHN0YWNrID0gY2xlYW5TdGFjayh0cmFjZUxpbmVzKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFjay5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc3RhY2tbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlRnJhbWVQYXR0ZXJuLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmVNYXRjaGVzID0gbGluZS5tYXRjaChwYXJzZUxpbmVQYXR0ZXJuKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyTGluZSAgPSBcImF0IFwiICsgbGluZU1hdGNoZXNbMV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiOlwiICsgbGluZU1hdGNoZXNbMl0gKyBcIjpcIiArIGxpbmVNYXRjaGVzWzNdICsgXCIgXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBmaXJzdFVzZXJMaW5lID0gc3RhY2tbMF07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFjZUxpbmVzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWNlTGluZXNbaV0gPT09IGZpcnN0VXNlckxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0b3JMaW5lID0gXCJcXG5cIiArIHRyYWNlTGluZXNbaSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbXNnID0gXCJhIHByb21pc2Ugd2FzIGNyZWF0ZWQgaW4gYSBcIiArIG5hbWUgK1xuICAgICAgICAgICAgXCJoYW5kbGVyIFwiICsgaGFuZGxlckxpbmUgKyBcImJ1dCB3YXMgbm90IHJldHVybmVkIGZyb20gaXQsIFwiICtcbiAgICAgICAgICAgIFwic2VlIGh0dHA6Ly9nb28uZ2wvclJxTVV3XCIgK1xuICAgICAgICAgICAgY3JlYXRvckxpbmU7XG4gICAgICAgIHByb21pc2UuX3dhcm4obXNnLCB0cnVlLCBwcm9taXNlQ3JlYXRlZCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXByZWNhdGVkKG5hbWUsIHJlcGxhY2VtZW50KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBuYW1lICtcbiAgICAgICAgXCIgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24uXCI7XG4gICAgaWYgKHJlcGxhY2VtZW50KSBtZXNzYWdlICs9IFwiIFVzZSBcIiArIHJlcGxhY2VtZW50ICsgXCIgaW5zdGVhZC5cIjtcbiAgICByZXR1cm4gd2FybihtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gd2FybihtZXNzYWdlLCBzaG91bGRVc2VPd25UcmFjZSwgcHJvbWlzZSkge1xuICAgIGlmICghY29uZmlnLndhcm5pbmdzKSByZXR1cm47XG4gICAgdmFyIHdhcm5pbmcgPSBuZXcgV2FybmluZyhtZXNzYWdlKTtcbiAgICB2YXIgY3R4O1xuICAgIGlmIChzaG91bGRVc2VPd25UcmFjZSkge1xuICAgICAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHdhcm5pbmcpO1xuICAgIH0gZWxzZSBpZiAoY29uZmlnLmxvbmdTdGFja1RyYWNlcyAmJiAoY3R4ID0gUHJvbWlzZS5fcGVla0NvbnRleHQoKSkpIHtcbiAgICAgICAgY3R4LmF0dGFjaEV4dHJhVHJhY2Uod2FybmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9IHBhcnNlU3RhY2tBbmRNZXNzYWdlKHdhcm5pbmcpO1xuICAgICAgICB3YXJuaW5nLnN0YWNrID0gcGFyc2VkLm1lc3NhZ2UgKyBcIlxcblwiICsgcGFyc2VkLnN0YWNrLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuXG4gICAgaWYgKCFhY3RpdmVGaXJlRXZlbnQoXCJ3YXJuaW5nXCIsIHdhcm5pbmcpKSB7XG4gICAgICAgIGZvcm1hdEFuZExvZ0Vycm9yKHdhcm5pbmcsIFwiXCIsIHRydWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVjb25zdHJ1Y3RTdGFjayhtZXNzYWdlLCBzdGFja3MpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YWNrcy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICAgICAgc3RhY2tzW2ldLnB1c2goXCJGcm9tIHByZXZpb3VzIGV2ZW50OlwiKTtcbiAgICAgICAgc3RhY2tzW2ldID0gc3RhY2tzW2ldLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuICAgIGlmIChpIDwgc3RhY2tzLmxlbmd0aCkge1xuICAgICAgICBzdGFja3NbaV0gPSBzdGFja3NbaV0uam9pbihcIlxcblwiKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2tzLmpvaW4oXCJcXG5cIik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUR1cGxpY2F0ZU9yRW1wdHlKdW1wcyhzdGFja3MpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoc3RhY2tzW2ldLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgKChpICsgMSA8IHN0YWNrcy5sZW5ndGgpICYmIHN0YWNrc1tpXVswXSA9PT0gc3RhY2tzW2krMV1bMF0pKSB7XG4gICAgICAgICAgICBzdGFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgaS0tO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVDb21tb25Sb290cyhzdGFja3MpIHtcbiAgICB2YXIgY3VycmVudCA9IHN0YWNrc1swXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHN0YWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcHJldiA9IHN0YWNrc1tpXTtcbiAgICAgICAgdmFyIGN1cnJlbnRMYXN0SW5kZXggPSBjdXJyZW50Lmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBjdXJyZW50TGFzdExpbmUgPSBjdXJyZW50W2N1cnJlbnRMYXN0SW5kZXhdO1xuICAgICAgICB2YXIgY29tbW9uUm9vdE1lZXRQb2ludCA9IC0xO1xuXG4gICAgICAgIGZvciAodmFyIGogPSBwcmV2Lmxlbmd0aCAtIDE7IGogPj0gMDsgLS1qKSB7XG4gICAgICAgICAgICBpZiAocHJldltqXSA9PT0gY3VycmVudExhc3RMaW5lKSB7XG4gICAgICAgICAgICAgICAgY29tbW9uUm9vdE1lZXRQb2ludCA9IGo7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBqID0gY29tbW9uUm9vdE1lZXRQb2ludDsgaiA+PSAwOyAtLWopIHtcbiAgICAgICAgICAgIHZhciBsaW5lID0gcHJldltqXTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50W2N1cnJlbnRMYXN0SW5kZXhdID09PSBsaW5lKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudC5wb3AoKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50TGFzdEluZGV4LS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBwcmV2O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xlYW5TdGFjayhzdGFjaykge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBsaW5lID0gc3RhY2tbaV07XG4gICAgICAgIHZhciBpc1RyYWNlTGluZSA9IFwiICAgIChObyBzdGFjayB0cmFjZSlcIiA9PT0gbGluZSB8fFxuICAgICAgICAgICAgc3RhY2tGcmFtZVBhdHRlcm4udGVzdChsaW5lKTtcbiAgICAgICAgdmFyIGlzSW50ZXJuYWxGcmFtZSA9IGlzVHJhY2VMaW5lICYmIHNob3VsZElnbm9yZShsaW5lKTtcbiAgICAgICAgaWYgKGlzVHJhY2VMaW5lICYmICFpc0ludGVybmFsRnJhbWUpIHtcbiAgICAgICAgICAgIGlmIChpbmRlbnRTdGFja0ZyYW1lcyAmJiBsaW5lLmNoYXJBdCgwKSAhPT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICBsaW5lID0gXCIgICAgXCIgKyBsaW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0LnB1c2gobGluZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gc3RhY2tGcmFtZXNBc0FycmF5KGVycm9yKSB7XG4gICAgdmFyIHN0YWNrID0gZXJyb3Iuc3RhY2sucmVwbGFjZSgvXFxzKyQvZywgXCJcIikuc3BsaXQoXCJcXG5cIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgbGluZSA9IHN0YWNrW2ldO1xuICAgICAgICBpZiAoXCIgICAgKE5vIHN0YWNrIHRyYWNlKVwiID09PSBsaW5lIHx8IHN0YWNrRnJhbWVQYXR0ZXJuLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpID4gMCkge1xuICAgICAgICBzdGFjayA9IHN0YWNrLnNsaWNlKGkpO1xuICAgIH1cbiAgICByZXR1cm4gc3RhY2s7XG59XG5cbmZ1bmN0aW9uIHBhcnNlU3RhY2tBbmRNZXNzYWdlKGVycm9yKSB7XG4gICAgdmFyIHN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgdmFyIG1lc3NhZ2UgPSBlcnJvci50b1N0cmluZygpO1xuICAgIHN0YWNrID0gdHlwZW9mIHN0YWNrID09PSBcInN0cmluZ1wiICYmIHN0YWNrLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICA/IHN0YWNrRnJhbWVzQXNBcnJheShlcnJvcikgOiBbXCIgICAgKE5vIHN0YWNrIHRyYWNlKVwiXTtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICBzdGFjazogY2xlYW5TdGFjayhzdGFjaylcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRBbmRMb2dFcnJvcihlcnJvciwgdGl0bGUsIGlzU29mdCkge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB2YXIgbWVzc2FnZTtcbiAgICAgICAgaWYgKHV0aWwuaXNPYmplY3QoZXJyb3IpKSB7XG4gICAgICAgICAgICB2YXIgc3RhY2sgPSBlcnJvci5zdGFjaztcbiAgICAgICAgICAgIG1lc3NhZ2UgPSB0aXRsZSArIGZvcm1hdFN0YWNrKHN0YWNrLCBlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gdGl0bGUgKyBTdHJpbmcoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJpbnRXYXJuaW5nID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhtZXNzYWdlLCBpc1NvZnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAgICAgICB0eXBlb2YgY29uc29sZS5sb2cgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmaXJlUmVqZWN0aW9uRXZlbnQobmFtZSwgbG9jYWxIYW5kbGVyLCByZWFzb24sIHByb21pc2UpIHtcbiAgICB2YXIgbG9jYWxFdmVudEZpcmVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhbEhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbG9jYWxFdmVudEZpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBcInJlamVjdGlvbkhhbmRsZWRcIikge1xuICAgICAgICAgICAgICAgIGxvY2FsSGFuZGxlcihwcm9taXNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9jYWxIYW5kbGVyKHJlYXNvbiwgcHJvbWlzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGFzeW5jLnRocm93TGF0ZXIoZSk7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09IFwidW5oYW5kbGVkUmVqZWN0aW9uXCIpIHtcbiAgICAgICAgaWYgKCFhY3RpdmVGaXJlRXZlbnQobmFtZSwgcmVhc29uLCBwcm9taXNlKSAmJiAhbG9jYWxFdmVudEZpcmVkKSB7XG4gICAgICAgICAgICBmb3JtYXRBbmRMb2dFcnJvcihyZWFzb24sIFwiVW5oYW5kbGVkIHJlamVjdGlvbiBcIik7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhY3RpdmVGaXJlRXZlbnQobmFtZSwgcHJvbWlzZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXROb25FcnJvcihvYmopIHtcbiAgICB2YXIgc3RyO1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgc3RyID0gXCJbZnVuY3Rpb24gXCIgK1xuICAgICAgICAgICAgKG9iai5uYW1lIHx8IFwiYW5vbnltb3VzXCIpICtcbiAgICAgICAgICAgIFwiXVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IG9iaiAmJiB0eXBlb2Ygb2JqLnRvU3RyaW5nID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgID8gb2JqLnRvU3RyaW5nKCkgOiB1dGlsLnRvU3RyaW5nKG9iaik7XG4gICAgICAgIHZhciBydXNlbGVzc1RvU3RyaW5nID0gL1xcW29iamVjdCBbYS16QS1aMC05JF9dK1xcXS87XG4gICAgICAgIGlmIChydXNlbGVzc1RvU3RyaW5nLnRlc3Qoc3RyKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3U3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICAgICAgICAgICAgICBzdHIgPSBuZXdTdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc3RyID0gXCIoZW1wdHkgYXJyYXkpXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcIig8XCIgKyBzbmlwKHN0cikgKyBcIj4sIG5vIHN0YWNrIHRyYWNlKVwiKTtcbn1cblxuZnVuY3Rpb24gc25pcChzdHIpIHtcbiAgICB2YXIgbWF4Q2hhcnMgPSA0MTtcbiAgICBpZiAoc3RyLmxlbmd0aCA8IG1heENoYXJzKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIG1heENoYXJzIC0gMykgKyBcIi4uLlwiO1xufVxuXG5mdW5jdGlvbiBsb25nU3RhY2tUcmFjZXNJc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIGNhcHR1cmVTdGFja1RyYWNlID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbnZhciBzaG91bGRJZ25vcmUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9O1xudmFyIHBhcnNlTGluZUluZm9SZWdleCA9IC9bXFwvPFxcKF0oW146XFwvXSspOihcXGQrKTooPzpcXGQrKVxcKT9cXHMqJC87XG5mdW5jdGlvbiBwYXJzZUxpbmVJbmZvKGxpbmUpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IGxpbmUubWF0Y2gocGFyc2VMaW5lSW5mb1JlZ2V4KTtcbiAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlsZU5hbWU6IG1hdGNoZXNbMV0sXG4gICAgICAgICAgICBsaW5lOiBwYXJzZUludChtYXRjaGVzWzJdLCAxMClcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEJvdW5kcyhmaXJzdExpbmVFcnJvciwgbGFzdExpbmVFcnJvcikge1xuICAgIGlmICghbG9uZ1N0YWNrVHJhY2VzSXNTdXBwb3J0ZWQoKSkgcmV0dXJuO1xuICAgIHZhciBmaXJzdFN0YWNrTGluZXMgPSBmaXJzdExpbmVFcnJvci5zdGFjay5zcGxpdChcIlxcblwiKTtcbiAgICB2YXIgbGFzdFN0YWNrTGluZXMgPSBsYXN0TGluZUVycm9yLnN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuICAgIHZhciBmaXJzdEluZGV4ID0gLTE7XG4gICAgdmFyIGxhc3RJbmRleCA9IC0xO1xuICAgIHZhciBmaXJzdEZpbGVOYW1lO1xuICAgIHZhciBsYXN0RmlsZU5hbWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaXJzdFN0YWNrTGluZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHBhcnNlTGluZUluZm8oZmlyc3RTdGFja0xpbmVzW2ldKTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgZmlyc3RGaWxlTmFtZSA9IHJlc3VsdC5maWxlTmFtZTtcbiAgICAgICAgICAgIGZpcnN0SW5kZXggPSByZXN1bHQubGluZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdFN0YWNrTGluZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHBhcnNlTGluZUluZm8obGFzdFN0YWNrTGluZXNbaV0pO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBsYXN0RmlsZU5hbWUgPSByZXN1bHQuZmlsZU5hbWU7XG4gICAgICAgICAgICBsYXN0SW5kZXggPSByZXN1bHQubGluZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChmaXJzdEluZGV4IDwgMCB8fCBsYXN0SW5kZXggPCAwIHx8ICFmaXJzdEZpbGVOYW1lIHx8ICFsYXN0RmlsZU5hbWUgfHxcbiAgICAgICAgZmlyc3RGaWxlTmFtZSAhPT0gbGFzdEZpbGVOYW1lIHx8IGZpcnN0SW5kZXggPj0gbGFzdEluZGV4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzaG91bGRJZ25vcmUgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIGlmIChibHVlYmlyZEZyYW1lUGF0dGVybi50ZXN0KGxpbmUpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgdmFyIGluZm8gPSBwYXJzZUxpbmVJbmZvKGxpbmUpO1xuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgaWYgKGluZm8uZmlsZU5hbWUgPT09IGZpcnN0RmlsZU5hbWUgJiZcbiAgICAgICAgICAgICAgICAoZmlyc3RJbmRleCA8PSBpbmZvLmxpbmUgJiYgaW5mby5saW5lIDw9IGxhc3RJbmRleCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gQ2FwdHVyZWRUcmFjZShwYXJlbnQpIHtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fcHJvbWlzZXNDcmVhdGVkID0gMDtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5fbGVuZ3RoID0gMSArIChwYXJlbnQgPT09IHVuZGVmaW5lZCA/IDAgOiBwYXJlbnQuX2xlbmd0aCk7XG4gICAgY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgQ2FwdHVyZWRUcmFjZSk7XG4gICAgaWYgKGxlbmd0aCA+IDMyKSB0aGlzLnVuY3ljbGUoKTtcbn1cbnV0aWwuaW5oZXJpdHMoQ2FwdHVyZWRUcmFjZSwgRXJyb3IpO1xuQ29udGV4dC5DYXB0dXJlZFRyYWNlID0gQ2FwdHVyZWRUcmFjZTtcblxuQ2FwdHVyZWRUcmFjZS5wcm90b3R5cGUudW5jeWNsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZW5ndGggPSB0aGlzLl9sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA8IDIpIHJldHVybjtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgc3RhY2tUb0luZGV4ID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbm9kZSA9IHRoaXM7IG5vZGUgIT09IHVuZGVmaW5lZDsgKytpKSB7XG4gICAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIG5vZGUgPSBub2RlLl9wYXJlbnQ7XG4gICAgfVxuICAgIGxlbmd0aCA9IHRoaXMuX2xlbmd0aCA9IGk7XG4gICAgZm9yICh2YXIgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBzdGFjayA9IG5vZGVzW2ldLnN0YWNrO1xuICAgICAgICBpZiAoc3RhY2tUb0luZGV4W3N0YWNrXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdGFja1RvSW5kZXhbc3RhY2tdID0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjdXJyZW50U3RhY2sgPSBub2Rlc1tpXS5zdGFjaztcbiAgICAgICAgdmFyIGluZGV4ID0gc3RhY2tUb0luZGV4W2N1cnJlbnRTdGFja107XG4gICAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkICYmIGluZGV4ICE9PSBpKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgbm9kZXNbaW5kZXggLSAxXS5fcGFyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIG5vZGVzW2luZGV4IC0gMV0uX2xlbmd0aCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2Rlc1tpXS5fcGFyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgbm9kZXNbaV0uX2xlbmd0aCA9IDE7XG4gICAgICAgICAgICB2YXIgY3ljbGVFZGdlTm9kZSA9IGkgPiAwID8gbm9kZXNbaSAtIDFdIDogdGhpcztcblxuICAgICAgICAgICAgaWYgKGluZGV4IDwgbGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIGN5Y2xlRWRnZU5vZGUuX3BhcmVudCA9IG5vZGVzW2luZGV4ICsgMV07XG4gICAgICAgICAgICAgICAgY3ljbGVFZGdlTm9kZS5fcGFyZW50LnVuY3ljbGUoKTtcbiAgICAgICAgICAgICAgICBjeWNsZUVkZ2VOb2RlLl9sZW5ndGggPVxuICAgICAgICAgICAgICAgICAgICBjeWNsZUVkZ2VOb2RlLl9wYXJlbnQuX2xlbmd0aCArIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN5Y2xlRWRnZU5vZGUuX3BhcmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjeWNsZUVkZ2VOb2RlLl9sZW5ndGggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGN1cnJlbnRDaGlsZExlbmd0aCA9IGN5Y2xlRWRnZU5vZGUuX2xlbmd0aCArIDE7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gaSAtIDI7IGogPj0gMDsgLS1qKSB7XG4gICAgICAgICAgICAgICAgbm9kZXNbal0uX2xlbmd0aCA9IGN1cnJlbnRDaGlsZExlbmd0aDtcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGRMZW5ndGgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkNhcHR1cmVkVHJhY2UucHJvdG90eXBlLmF0dGFjaEV4dHJhVHJhY2UgPSBmdW5jdGlvbihlcnJvcikge1xuICAgIGlmIChlcnJvci5fX3N0YWNrQ2xlYW5lZF9fKSByZXR1cm47XG4gICAgdGhpcy51bmN5Y2xlKCk7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlU3RhY2tBbmRNZXNzYWdlKGVycm9yKTtcbiAgICB2YXIgbWVzc2FnZSA9IHBhcnNlZC5tZXNzYWdlO1xuICAgIHZhciBzdGFja3MgPSBbcGFyc2VkLnN0YWNrXTtcblxuICAgIHZhciB0cmFjZSA9IHRoaXM7XG4gICAgd2hpbGUgKHRyYWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RhY2tzLnB1c2goY2xlYW5TdGFjayh0cmFjZS5zdGFjay5zcGxpdChcIlxcblwiKSkpO1xuICAgICAgICB0cmFjZSA9IHRyYWNlLl9wYXJlbnQ7XG4gICAgfVxuICAgIHJlbW92ZUNvbW1vblJvb3RzKHN0YWNrcyk7XG4gICAgcmVtb3ZlRHVwbGljYXRlT3JFbXB0eUp1bXBzKHN0YWNrcyk7XG4gICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcChlcnJvciwgXCJzdGFja1wiLCByZWNvbnN0cnVjdFN0YWNrKG1lc3NhZ2UsIHN0YWNrcykpO1xuICAgIHV0aWwubm90RW51bWVyYWJsZVByb3AoZXJyb3IsIFwiX19zdGFja0NsZWFuZWRfX1wiLCB0cnVlKTtcbn07XG5cbnZhciBjYXB0dXJlU3RhY2tUcmFjZSA9IChmdW5jdGlvbiBzdGFja0RldGVjdGlvbigpIHtcbiAgICB2YXIgdjhzdGFja0ZyYW1lUGF0dGVybiA9IC9eXFxzKmF0XFxzKi87XG4gICAgdmFyIHY4c3RhY2tGb3JtYXR0ZXIgPSBmdW5jdGlvbihzdGFjaywgZXJyb3IpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFjayA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0YWNrO1xuXG4gICAgICAgIGlmIChlcnJvci5uYW1lICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdE5vbkVycm9yKGVycm9yKTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBFcnJvci5zdGFja1RyYWNlTGltaXQgPT09IFwibnVtYmVyXCIgJiZcbiAgICAgICAgdHlwZW9mIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ICs9IDY7XG4gICAgICAgIHN0YWNrRnJhbWVQYXR0ZXJuID0gdjhzdGFja0ZyYW1lUGF0dGVybjtcbiAgICAgICAgZm9ybWF0U3RhY2sgPSB2OHN0YWNrRm9ybWF0dGVyO1xuICAgICAgICB2YXIgY2FwdHVyZVN0YWNrVHJhY2UgPSBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZTtcblxuICAgICAgICBzaG91bGRJZ25vcmUgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gYmx1ZWJpcmRGcmFtZVBhdHRlcm4udGVzdChsaW5lKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlY2VpdmVyLCBpZ25vcmVVbnRpbCkge1xuICAgICAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ICs9IDY7XG4gICAgICAgICAgICBjYXB0dXJlU3RhY2tUcmFjZShyZWNlaXZlciwgaWdub3JlVW50aWwpO1xuICAgICAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0IC09IDY7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcblxuICAgIGlmICh0eXBlb2YgZXJyLnN0YWNrID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgIGVyci5zdGFjay5zcGxpdChcIlxcblwiKVswXS5pbmRleE9mKFwic3RhY2tEZXRlY3Rpb25AXCIpID49IDApIHtcbiAgICAgICAgc3RhY2tGcmFtZVBhdHRlcm4gPSAvQC87XG4gICAgICAgIGZvcm1hdFN0YWNrID0gdjhzdGFja0Zvcm1hdHRlcjtcbiAgICAgICAgaW5kZW50U3RhY2tGcmFtZXMgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY2FwdHVyZVN0YWNrVHJhY2Uobykge1xuICAgICAgICAgICAgby5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBoYXNTdGFja0FmdGVyVGhyb3c7XG4gICAgdHJ5IHsgdGhyb3cgbmV3IEVycm9yKCk7IH1cbiAgICBjYXRjaChlKSB7XG4gICAgICAgIGhhc1N0YWNrQWZ0ZXJUaHJvdyA9IChcInN0YWNrXCIgaW4gZSk7XG4gICAgfVxuICAgIGlmICghKFwic3RhY2tcIiBpbiBlcnIpICYmIGhhc1N0YWNrQWZ0ZXJUaHJvdyAmJlxuICAgICAgICB0eXBlb2YgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHN0YWNrRnJhbWVQYXR0ZXJuID0gdjhzdGFja0ZyYW1lUGF0dGVybjtcbiAgICAgICAgZm9ybWF0U3RhY2sgPSB2OHN0YWNrRm9ybWF0dGVyO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY2FwdHVyZVN0YWNrVHJhY2Uobykge1xuICAgICAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ICs9IDY7XG4gICAgICAgICAgICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IoKTsgfVxuICAgICAgICAgICAgY2F0Y2goZSkgeyBvLnN0YWNrID0gZS5zdGFjazsgfVxuICAgICAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0IC09IDY7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZm9ybWF0U3RhY2sgPSBmdW5jdGlvbihzdGFjaywgZXJyb3IpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFjayA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0YWNrO1xuXG4gICAgICAgIGlmICgodHlwZW9mIGVycm9yID09PSBcIm9iamVjdFwiIHx8XG4gICAgICAgICAgICB0eXBlb2YgZXJyb3IgPT09IFwiZnVuY3Rpb25cIikgJiZcbiAgICAgICAgICAgIGVycm9yLm5hbWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3IudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybWF0Tm9uRXJyb3IoZXJyb3IpO1xuICAgIH07XG5cbiAgICByZXR1cm4gbnVsbDtcblxufSkoW10pO1xuXG5pZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9O1xuICAgIGlmICh1dGlsLmlzTm9kZSAmJiBwcm9jZXNzLnN0ZGVyci5pc1RUWSkge1xuICAgICAgICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbihtZXNzYWdlLCBpc1NvZnQpIHtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGlzU29mdCA/IFwiXFx1MDAxYlszM21cIiA6IFwiXFx1MDAxYlszMW1cIjtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybihjb2xvciArIG1lc3NhZ2UgKyBcIlxcdTAwMWJbMG1cXG5cIik7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmICghdXRpbC5pc05vZGUgJiYgdHlwZW9mIChuZXcgRXJyb3IoKS5zdGFjaykgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24obWVzc2FnZSwgaXNTb2Z0KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCIlY1wiICsgbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU29mdCA/IFwiY29sb3I6IGRhcmtvcmFuZ2VcIiA6IFwiY29sb3I6IHJlZFwiKTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbnZhciBjb25maWcgPSB7XG4gICAgd2FybmluZ3M6IHdhcm5pbmdzLFxuICAgIGxvbmdTdGFja1RyYWNlczogZmFsc2UsXG4gICAgY2FuY2VsbGF0aW9uOiBmYWxzZSxcbiAgICBtb25pdG9yaW5nOiBmYWxzZVxufTtcblxuaWYgKGxvbmdTdGFja1RyYWNlcykgUHJvbWlzZS5sb25nU3RhY2tUcmFjZXMoKTtcblxucmV0dXJuIHtcbiAgICBsb25nU3RhY2tUcmFjZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY29uZmlnLmxvbmdTdGFja1RyYWNlcztcbiAgICB9LFxuICAgIHdhcm5pbmdzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy53YXJuaW5ncztcbiAgICB9LFxuICAgIGNhbmNlbGxhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjb25maWcuY2FuY2VsbGF0aW9uO1xuICAgIH0sXG4gICAgbW9uaXRvcmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjb25maWcubW9uaXRvcmluZztcbiAgICB9LFxuICAgIHByb3BhZ2F0ZUZyb21GdW5jdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBwcm9wYWdhdGVGcm9tRnVuY3Rpb247XG4gICAgfSxcbiAgICBib3VuZFZhbHVlRnVuY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYm91bmRWYWx1ZUZ1bmN0aW9uO1xuICAgIH0sXG4gICAgY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zOiBjaGVja0ZvcmdvdHRlblJldHVybnMsXG4gICAgc2V0Qm91bmRzOiBzZXRCb3VuZHMsXG4gICAgd2Fybjogd2FybixcbiAgICBkZXByZWNhdGVkOiBkZXByZWNhdGVkLFxuICAgIENhcHR1cmVkVHJhY2U6IENhcHR1cmVkVHJhY2UsXG4gICAgZmlyZURvbUV2ZW50OiBmaXJlRG9tRXZlbnQsXG4gICAgZmlyZUdsb2JhbEV2ZW50OiBmaXJlR2xvYmFsRXZlbnRcbn07XG59O1xuXG59LHtcIi4vZXJyb3JzXCI6MTIsXCIuL3V0aWxcIjozNn1dLDEwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XG5mdW5jdGlvbiByZXR1cm5lcigpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbn1cbmZ1bmN0aW9uIHRocm93ZXIoKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG59XG5cblByb21pc2UucHJvdG90eXBlW1wicmV0dXJuXCJdID1cblByb21pc2UucHJvdG90eXBlLnRoZW5SZXR1cm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB2YWx1ZS5zdXBwcmVzc1VuaGFuZGxlZFJlamVjdGlvbnMoKTtcbiAgICByZXR1cm4gdGhpcy5fdGhlbihcbiAgICAgICAgcmV0dXJuZXIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7dmFsdWU6IHZhbHVlfSwgdW5kZWZpbmVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlW1widGhyb3dcIl0gPVxuUHJvbWlzZS5wcm90b3R5cGUudGhlblRocm93ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHJldHVybiB0aGlzLl90aGVuKFxuICAgICAgICB0aHJvd2VyLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwge3JlYXNvbjogcmVhc29ufSwgdW5kZWZpbmVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmNhdGNoVGhyb3cgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPD0gMSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGhlbihcbiAgICAgICAgICAgIHVuZGVmaW5lZCwgdGhyb3dlciwgdW5kZWZpbmVkLCB7cmVhc29uOiByZWFzb259LCB1bmRlZmluZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBfcmVhc29uID0gYXJndW1lbnRzWzFdO1xuICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKCkge3Rocm93IF9yZWFzb247fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2F1Z2h0KHJlYXNvbiwgaGFuZGxlcik7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2hSZXR1cm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHZhbHVlLnN1cHByZXNzVW5oYW5kbGVkUmVqZWN0aW9ucygpO1xuICAgICAgICByZXR1cm4gdGhpcy5fdGhlbihcbiAgICAgICAgICAgIHVuZGVmaW5lZCwgcmV0dXJuZXIsIHVuZGVmaW5lZCwge3ZhbHVlOiB2YWx1ZX0sIHVuZGVmaW5lZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF92YWx1ZSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgaWYgKF92YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIF92YWx1ZS5zdXBwcmVzc1VuaGFuZGxlZFJlamVjdGlvbnMoKTtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbigpIHtyZXR1cm4gX3ZhbHVlO307XG4gICAgICAgIHJldHVybiB0aGlzLmNhdWdodCh2YWx1ZSwgaGFuZGxlcik7XG4gICAgfVxufTtcbn07XG5cbn0se31dLDExOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCkge1xudmFyIFByb21pc2VSZWR1Y2UgPSBQcm9taXNlLnJlZHVjZTtcbnZhciBQcm9taXNlQWxsID0gUHJvbWlzZS5hbGw7XG5cbmZ1bmN0aW9uIHByb21pc2VBbGxUaGlzKCkge1xuICAgIHJldHVybiBQcm9taXNlQWxsKHRoaXMpO1xufVxuXG5mdW5jdGlvbiBQcm9taXNlTWFwU2VyaWVzKHByb21pc2VzLCBmbikge1xuICAgIHJldHVybiBQcm9taXNlUmVkdWNlKHByb21pc2VzLCBmbiwgSU5URVJOQUwsIElOVEVSTkFMKTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuZWFjaCA9IGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiBQcm9taXNlUmVkdWNlKHRoaXMsIGZuLCBJTlRFUk5BTCwgMClcbiAgICAgICAgICAgICAgLl90aGVuKHByb21pc2VBbGxUaGlzLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcywgdW5kZWZpbmVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLm1hcFNlcmllcyA9IGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiBQcm9taXNlUmVkdWNlKHRoaXMsIGZuLCBJTlRFUk5BTCwgSU5URVJOQUwpO1xufTtcblxuUHJvbWlzZS5lYWNoID0gZnVuY3Rpb24gKHByb21pc2VzLCBmbikge1xuICAgIHJldHVybiBQcm9taXNlUmVkdWNlKHByb21pc2VzLCBmbiwgSU5URVJOQUwsIDApXG4gICAgICAgICAgICAgIC5fdGhlbihwcm9taXNlQWxsVGhpcywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHByb21pc2VzLCB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5tYXBTZXJpZXMgPSBQcm9taXNlTWFwU2VyaWVzO1xufTtcblxuXG59LHt9XSwxMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBlczUgPSBfZGVyZXFfKFwiLi9lczVcIik7XG52YXIgT2JqZWN0ZnJlZXplID0gZXM1LmZyZWV6ZTtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBpbmhlcml0cyA9IHV0aWwuaW5oZXJpdHM7XG52YXIgbm90RW51bWVyYWJsZVByb3AgPSB1dGlsLm5vdEVudW1lcmFibGVQcm9wO1xuXG5mdW5jdGlvbiBzdWJFcnJvcihuYW1lUHJvcGVydHksIGRlZmF1bHRNZXNzYWdlKSB7XG4gICAgZnVuY3Rpb24gU3ViRXJyb3IobWVzc2FnZSkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU3ViRXJyb3IpKSByZXR1cm4gbmV3IFN1YkVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBub3RFbnVtZXJhYmxlUHJvcCh0aGlzLCBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIHR5cGVvZiBtZXNzYWdlID09PSBcInN0cmluZ1wiID8gbWVzc2FnZSA6IGRlZmF1bHRNZXNzYWdlKTtcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AodGhpcywgXCJuYW1lXCIsIG5hbWVQcm9wZXJ0eSk7XG4gICAgICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBFcnJvci5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluaGVyaXRzKFN1YkVycm9yLCBFcnJvcik7XG4gICAgcmV0dXJuIFN1YkVycm9yO1xufVxuXG52YXIgX1R5cGVFcnJvciwgX1JhbmdlRXJyb3I7XG52YXIgV2FybmluZyA9IHN1YkVycm9yKFwiV2FybmluZ1wiLCBcIndhcm5pbmdcIik7XG52YXIgQ2FuY2VsbGF0aW9uRXJyb3IgPSBzdWJFcnJvcihcIkNhbmNlbGxhdGlvbkVycm9yXCIsIFwiY2FuY2VsbGF0aW9uIGVycm9yXCIpO1xudmFyIFRpbWVvdXRFcnJvciA9IHN1YkVycm9yKFwiVGltZW91dEVycm9yXCIsIFwidGltZW91dCBlcnJvclwiKTtcbnZhciBBZ2dyZWdhdGVFcnJvciA9IHN1YkVycm9yKFwiQWdncmVnYXRlRXJyb3JcIiwgXCJhZ2dyZWdhdGUgZXJyb3JcIik7XG50cnkge1xuICAgIF9UeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4gICAgX1JhbmdlRXJyb3IgPSBSYW5nZUVycm9yO1xufSBjYXRjaChlKSB7XG4gICAgX1R5cGVFcnJvciA9IHN1YkVycm9yKFwiVHlwZUVycm9yXCIsIFwidHlwZSBlcnJvclwiKTtcbiAgICBfUmFuZ2VFcnJvciA9IHN1YkVycm9yKFwiUmFuZ2VFcnJvclwiLCBcInJhbmdlIGVycm9yXCIpO1xufVxuXG52YXIgbWV0aG9kcyA9IChcImpvaW4gcG9wIHB1c2ggc2hpZnQgdW5zaGlmdCBzbGljZSBmaWx0ZXIgZm9yRWFjaCBzb21lIFwiICtcbiAgICBcImV2ZXJ5IG1hcCBpbmRleE9mIGxhc3RJbmRleE9mIHJlZHVjZSByZWR1Y2VSaWdodCBzb3J0IHJldmVyc2VcIikuc3BsaXQoXCIgXCIpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IG1ldGhvZHMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAodHlwZW9mIEFycmF5LnByb3RvdHlwZVttZXRob2RzW2ldXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIEFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZVttZXRob2RzW2ldXSA9IEFycmF5LnByb3RvdHlwZVttZXRob2RzW2ldXTtcbiAgICB9XG59XG5cbmVzNS5kZWZpbmVQcm9wZXJ0eShBZ2dyZWdhdGVFcnJvci5wcm90b3R5cGUsIFwibGVuZ3RoXCIsIHtcbiAgICB2YWx1ZTogMCxcbiAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWVcbn0pO1xuQWdncmVnYXRlRXJyb3IucHJvdG90eXBlW1wiaXNPcGVyYXRpb25hbFwiXSA9IHRydWU7XG52YXIgbGV2ZWwgPSAwO1xuQWdncmVnYXRlRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGluZGVudCA9IEFycmF5KGxldmVsICogNCArIDEpLmpvaW4oXCIgXCIpO1xuICAgIHZhciByZXQgPSBcIlxcblwiICsgaW5kZW50ICsgXCJBZ2dyZWdhdGVFcnJvciBvZjpcIiArIFwiXFxuXCI7XG4gICAgbGV2ZWwrKztcbiAgICBpbmRlbnQgPSBBcnJheShsZXZlbCAqIDQgKyAxKS5qb2luKFwiIFwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHN0ciA9IHRoaXNbaV0gPT09IHRoaXMgPyBcIltDaXJjdWxhciBBZ2dyZWdhdGVFcnJvcl1cIiA6IHRoaXNbaV0gKyBcIlwiO1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGluZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIGxpbmVzW2pdID0gaW5kZW50ICsgbGluZXNbal07XG4gICAgICAgIH1cbiAgICAgICAgc3RyID0gbGluZXMuam9pbihcIlxcblwiKTtcbiAgICAgICAgcmV0ICs9IHN0ciArIFwiXFxuXCI7XG4gICAgfVxuICAgIGxldmVsLS07XG4gICAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIE9wZXJhdGlvbmFsRXJyb3IobWVzc2FnZSkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBPcGVyYXRpb25hbEVycm9yKSlcbiAgICAgICAgcmV0dXJuIG5ldyBPcGVyYXRpb25hbEVycm9yKG1lc3NhZ2UpO1xuICAgIG5vdEVudW1lcmFibGVQcm9wKHRoaXMsIFwibmFtZVwiLCBcIk9wZXJhdGlvbmFsRXJyb3JcIik7XG4gICAgbm90RW51bWVyYWJsZVByb3AodGhpcywgXCJtZXNzYWdlXCIsIG1lc3NhZ2UpO1xuICAgIHRoaXMuY2F1c2UgPSBtZXNzYWdlO1xuICAgIHRoaXNbXCJpc09wZXJhdGlvbmFsXCJdID0gdHJ1ZTtcblxuICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AodGhpcywgXCJtZXNzYWdlXCIsIG1lc3NhZ2UubWVzc2FnZSk7XG4gICAgICAgIG5vdEVudW1lcmFibGVQcm9wKHRoaXMsIFwic3RhY2tcIiwgbWVzc2FnZS5zdGFjayk7XG4gICAgfSBlbHNlIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICB9XG5cbn1cbmluaGVyaXRzKE9wZXJhdGlvbmFsRXJyb3IsIEVycm9yKTtcblxudmFyIGVycm9yVHlwZXMgPSBFcnJvcltcIl9fQmx1ZWJpcmRFcnJvclR5cGVzX19cIl07XG5pZiAoIWVycm9yVHlwZXMpIHtcbiAgICBlcnJvclR5cGVzID0gT2JqZWN0ZnJlZXplKHtcbiAgICAgICAgQ2FuY2VsbGF0aW9uRXJyb3I6IENhbmNlbGxhdGlvbkVycm9yLFxuICAgICAgICBUaW1lb3V0RXJyb3I6IFRpbWVvdXRFcnJvcixcbiAgICAgICAgT3BlcmF0aW9uYWxFcnJvcjogT3BlcmF0aW9uYWxFcnJvcixcbiAgICAgICAgUmVqZWN0aW9uRXJyb3I6IE9wZXJhdGlvbmFsRXJyb3IsXG4gICAgICAgIEFnZ3JlZ2F0ZUVycm9yOiBBZ2dyZWdhdGVFcnJvclxuICAgIH0pO1xuICAgIGVzNS5kZWZpbmVQcm9wZXJ0eShFcnJvciwgXCJfX0JsdWViaXJkRXJyb3JUeXBlc19fXCIsIHtcbiAgICAgICAgdmFsdWU6IGVycm9yVHlwZXMsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgRXJyb3I6IEVycm9yLFxuICAgIFR5cGVFcnJvcjogX1R5cGVFcnJvcixcbiAgICBSYW5nZUVycm9yOiBfUmFuZ2VFcnJvcixcbiAgICBDYW5jZWxsYXRpb25FcnJvcjogZXJyb3JUeXBlcy5DYW5jZWxsYXRpb25FcnJvcixcbiAgICBPcGVyYXRpb25hbEVycm9yOiBlcnJvclR5cGVzLk9wZXJhdGlvbmFsRXJyb3IsXG4gICAgVGltZW91dEVycm9yOiBlcnJvclR5cGVzLlRpbWVvdXRFcnJvcixcbiAgICBBZ2dyZWdhdGVFcnJvcjogZXJyb3JUeXBlcy5BZ2dyZWdhdGVFcnJvcixcbiAgICBXYXJuaW5nOiBXYXJuaW5nXG59O1xuXG59LHtcIi4vZXM1XCI6MTMsXCIuL3V0aWxcIjozNn1dLDEzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBpc0VTNSA9IChmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiB0aGlzID09PSB1bmRlZmluZWQ7XG59KSgpO1xuXG5pZiAoaXNFUzUpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgICAgZnJlZXplOiBPYmplY3QuZnJlZXplLFxuICAgICAgICBkZWZpbmVQcm9wZXJ0eTogT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICAgICAgICBnZXREZXNjcmlwdG9yOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAgICAgICBrZXlzOiBPYmplY3Qua2V5cyxcbiAgICAgICAgbmFtZXM6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAgICAgICBnZXRQcm90b3R5cGVPZjogT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICAgICAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5LFxuICAgICAgICBpc0VTNTogaXNFUzUsXG4gICAgICAgIHByb3BlcnR5SXNXcml0YWJsZTogZnVuY3Rpb24ob2JqLCBwcm9wKSB7XG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBwcm9wKTtcbiAgICAgICAgICAgIHJldHVybiAhISghZGVzY3JpcHRvciB8fCBkZXNjcmlwdG9yLndyaXRhYmxlIHx8IGRlc2NyaXB0b3Iuc2V0KTtcbiAgICAgICAgfVxuICAgIH07XG59IGVsc2Uge1xuICAgIHZhciBoYXMgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbiAgICB2YXIgc3RyID0ge30udG9TdHJpbmc7XG4gICAgdmFyIHByb3RvID0ge30uY29uc3RydWN0b3IucHJvdG90eXBlO1xuXG4gICAgdmFyIE9iamVjdEtleXMgPSBmdW5jdGlvbiAobykge1xuICAgICAgICB2YXIgcmV0ID0gW107XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwobywga2V5KSkge1xuICAgICAgICAgICAgICAgIHJldC5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuXG4gICAgdmFyIE9iamVjdEdldERlc2NyaXB0b3IgPSBmdW5jdGlvbihvLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogb1trZXldfTtcbiAgICB9O1xuXG4gICAgdmFyIE9iamVjdERlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG8sIGtleSwgZGVzYykge1xuICAgICAgICBvW2tleV0gPSBkZXNjLnZhbHVlO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9O1xuXG4gICAgdmFyIE9iamVjdEZyZWV6ZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuXG4gICAgdmFyIE9iamVjdEdldFByb3RvdHlwZU9mID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdChvYmopLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBBcnJheUlzQXJyYXkgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgICAgaXNBcnJheTogQXJyYXlJc0FycmF5LFxuICAgICAgICBrZXlzOiBPYmplY3RLZXlzLFxuICAgICAgICBuYW1lczogT2JqZWN0S2V5cyxcbiAgICAgICAgZGVmaW5lUHJvcGVydHk6IE9iamVjdERlZmluZVByb3BlcnR5LFxuICAgICAgICBnZXREZXNjcmlwdG9yOiBPYmplY3RHZXREZXNjcmlwdG9yLFxuICAgICAgICBmcmVlemU6IE9iamVjdEZyZWV6ZSxcbiAgICAgICAgZ2V0UHJvdG90eXBlT2Y6IE9iamVjdEdldFByb3RvdHlwZU9mLFxuICAgICAgICBpc0VTNTogaXNFUzUsXG4gICAgICAgIHByb3BlcnR5SXNXcml0YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbn0se31dLDE0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCkge1xudmFyIFByb21pc2VNYXAgPSBQcm9taXNlLm1hcDtcblxuUHJvbWlzZS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGZuLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIFByb21pc2VNYXAodGhpcywgZm4sIG9wdGlvbnMsIElOVEVSTkFMKTtcbn07XG5cblByb21pc2UuZmlsdGVyID0gZnVuY3Rpb24gKHByb21pc2VzLCBmbiwgb3B0aW9ucykge1xuICAgIHJldHVybiBQcm9taXNlTWFwKHByb21pc2VzLCBmbiwgb3B0aW9ucywgSU5URVJOQUwpO1xufTtcbn07XG5cbn0se31dLDE1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCB0cnlDb252ZXJ0VG9Qcm9taXNlKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgQ2FuY2VsbGF0aW9uRXJyb3IgPSBQcm9taXNlLkNhbmNlbGxhdGlvbkVycm9yO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcblxuZnVuY3Rpb24gUGFzc1Rocm91Z2hIYW5kbGVyQ29udGV4dChwcm9taXNlLCB0eXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgdGhpcy5jYWxsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNhbmNlbFByb21pc2UgPSBudWxsO1xufVxuXG5QYXNzVGhyb3VnaEhhbmRsZXJDb250ZXh0LnByb3RvdHlwZS5pc0ZpbmFsbHlIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gMDtcbn07XG5cbmZ1bmN0aW9uIEZpbmFsbHlIYW5kbGVyQ2FuY2VsUmVhY3Rpb24oZmluYWxseUhhbmRsZXIpIHtcbiAgICB0aGlzLmZpbmFsbHlIYW5kbGVyID0gZmluYWxseUhhbmRsZXI7XG59XG5cbkZpbmFsbHlIYW5kbGVyQ2FuY2VsUmVhY3Rpb24ucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICBjaGVja0NhbmNlbCh0aGlzLmZpbmFsbHlIYW5kbGVyKTtcbn07XG5cbmZ1bmN0aW9uIGNoZWNrQ2FuY2VsKGN0eCwgcmVhc29uKSB7XG4gICAgaWYgKGN0eC5jYW5jZWxQcm9taXNlICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjdHguY2FuY2VsUHJvbWlzZS5fcmVqZWN0KHJlYXNvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdHguY2FuY2VsUHJvbWlzZS5fY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmNhbmNlbFByb21pc2UgPSBudWxsO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzdWNjZWVkKCkge1xuICAgIHJldHVybiBmaW5hbGx5SGFuZGxlci5jYWxsKHRoaXMsIHRoaXMucHJvbWlzZS5fdGFyZ2V0KCkuX3NldHRsZWRWYWx1ZSgpKTtcbn1cbmZ1bmN0aW9uIGZhaWwocmVhc29uKSB7XG4gICAgaWYgKGNoZWNrQ2FuY2VsKHRoaXMsIHJlYXNvbikpIHJldHVybjtcbiAgICBlcnJvck9iai5lID0gcmVhc29uO1xuICAgIHJldHVybiBlcnJvck9iajtcbn1cbmZ1bmN0aW9uIGZpbmFsbHlIYW5kbGVyKHJlYXNvbk9yVmFsdWUpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcbiAgICB2YXIgaGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblxuICAgIGlmICghdGhpcy5jYWxsZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsZWQgPSB0cnVlO1xuICAgICAgICB2YXIgcmV0ID0gdGhpcy5pc0ZpbmFsbHlIYW5kbGVyKClcbiAgICAgICAgICAgID8gaGFuZGxlci5jYWxsKHByb21pc2UuX2JvdW5kVmFsdWUoKSlcbiAgICAgICAgICAgIDogaGFuZGxlci5jYWxsKHByb21pc2UuX2JvdW5kVmFsdWUoKSwgcmVhc29uT3JWYWx1ZSk7XG4gICAgICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHJvbWlzZS5fc2V0UmV0dXJuZWROb25VbmRlZmluZWQoKTtcbiAgICAgICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHJldCwgcHJvbWlzZSk7XG4gICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbmNlbFByb21pc2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlLl9pc0NhbmNlbGxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVhc29uID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQ2FuY2VsbGF0aW9uRXJyb3IoXCJsYXRlIGNhbmNlbGxhdGlvbiBvYnNlcnZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UocmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yT2JqLmUgPSByZWFzb247XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF5YmVQcm9taXNlLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX2F0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGaW5hbGx5SGFuZGxlckNhbmNlbFJlYWN0aW9uKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF5YmVQcm9taXNlLl90aGVuKFxuICAgICAgICAgICAgICAgICAgICBzdWNjZWVkLCBmYWlsLCB1bmRlZmluZWQsIHRoaXMsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZS5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgY2hlY2tDYW5jZWwodGhpcyk7XG4gICAgICAgIGVycm9yT2JqLmUgPSByZWFzb25PclZhbHVlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2hlY2tDYW5jZWwodGhpcyk7XG4gICAgICAgIHJldHVybiByZWFzb25PclZhbHVlO1xuICAgIH1cbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuX3Bhc3NUaHJvdWdoID0gZnVuY3Rpb24oaGFuZGxlciwgdHlwZSwgc3VjY2VzcywgZmFpbCkge1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdGhpcy50aGVuKCk7XG4gICAgcmV0dXJuIHRoaXMuX3RoZW4oc3VjY2VzcyxcbiAgICAgICAgICAgICAgICAgICAgICBmYWlsLFxuICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgUGFzc1Rocm91Z2hIYW5kbGVyQ29udGV4dCh0aGlzLCB0eXBlLCBoYW5kbGVyKSxcbiAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubGFzdGx5ID1cblByb21pc2UucHJvdG90eXBlW1wiZmluYWxseVwiXSA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bhc3NUaHJvdWdoKGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHlIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5SGFuZGxlcik7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50YXAgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLl9wYXNzVGhyb3VnaChoYW5kbGVyLCAxLCBmaW5hbGx5SGFuZGxlcik7XG59O1xuXG5yZXR1cm4gUGFzc1Rocm91Z2hIYW5kbGVyQ29udGV4dDtcbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwxNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXBpUmVqZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBJTlRFUk5BTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5Q29udmVydFRvUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgUHJveHlhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zykge1xudmFyIGVycm9ycyA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKTtcbnZhciBUeXBlRXJyb3IgPSBlcnJvcnMuVHlwZUVycm9yO1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG52YXIgeWllbGRIYW5kbGVycyA9IFtdO1xuXG5mdW5jdGlvbiBwcm9taXNlRnJvbVlpZWxkSGFuZGxlcih2YWx1ZSwgeWllbGRIYW5kbGVycywgdHJhY2VQYXJlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHlpZWxkSGFuZGxlcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdHJhY2VQYXJlbnQuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgIHZhciByZXN1bHQgPSB0cnlDYXRjaCh5aWVsZEhhbmRsZXJzW2ldKSh2YWx1ZSk7XG4gICAgICAgIHRyYWNlUGFyZW50Ll9wb3BDb250ZXh0KCk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgICAgICB0cmFjZVBhcmVudC5fcHVzaENvbnRleHQoKTtcbiAgICAgICAgICAgIHZhciByZXQgPSBQcm9taXNlLnJlamVjdChlcnJvck9iai5lKTtcbiAgICAgICAgICAgIHRyYWNlUGFyZW50Ll9wb3BDb250ZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHJlc3VsdCwgdHJhY2VQYXJlbnQpO1xuICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkgcmV0dXJuIG1heWJlUHJvbWlzZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIFByb21pc2VTcGF3bihnZW5lcmF0b3JGdW5jdGlvbiwgcmVjZWl2ZXIsIHlpZWxkSGFuZGxlciwgc3RhY2spIHtcbiAgICBpZiAoZGVidWcuY2FuY2VsbGF0aW9uKCkpIHtcbiAgICAgICAgdmFyIGludGVybmFsID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICB2YXIgX2ZpbmFsbHlQcm9taXNlID0gdGhpcy5fZmluYWxseVByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBpbnRlcm5hbC5sYXN0bHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gX2ZpbmFsbHlQcm9taXNlO1xuICAgICAgICB9KTtcbiAgICAgICAgaW50ZXJuYWwuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgICAgIGludGVybmFsLl9zZXRPbkNhbmNlbCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIHByb21pc2UuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgfVxuICAgIHRoaXMuX3N0YWNrID0gc3RhY2s7XG4gICAgdGhpcy5fZ2VuZXJhdG9yRnVuY3Rpb24gPSBnZW5lcmF0b3JGdW5jdGlvbjtcbiAgICB0aGlzLl9yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgIHRoaXMuX2dlbmVyYXRvciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl95aWVsZEhhbmRsZXJzID0gdHlwZW9mIHlpZWxkSGFuZGxlciA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgID8gW3lpZWxkSGFuZGxlcl0uY29uY2F0KHlpZWxkSGFuZGxlcnMpXG4gICAgICAgIDogeWllbGRIYW5kbGVycztcbiAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG51bGw7XG4gICAgdGhpcy5fY2FuY2VsbGF0aW9uUGhhc2UgPSBmYWxzZTtcbn1cbnV0aWwuaW5oZXJpdHMoUHJvbWlzZVNwYXduLCBQcm94eWFibGUpO1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9pc1Jlc29sdmVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb21pc2UgPT09IG51bGw7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX2dlbmVyYXRvciA9IG51bGw7XG4gICAgaWYgKGRlYnVnLmNhbmNlbGxhdGlvbigpICYmIHRoaXMuX2ZpbmFsbHlQcm9taXNlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2ZpbmFsbHlQcm9taXNlLl9mdWxmaWxsKCk7XG4gICAgICAgIHRoaXMuX2ZpbmFsbHlQcm9taXNlID0gbnVsbDtcbiAgICB9XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9wcm9taXNlQ2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSkgcmV0dXJuO1xuICAgIHZhciBpbXBsZW1lbnRzUmV0dXJuID0gdHlwZW9mIHRoaXMuX2dlbmVyYXRvcltcInJldHVyblwiXSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKCFpbXBsZW1lbnRzUmV0dXJuKSB7XG4gICAgICAgIHZhciByZWFzb24gPSBuZXcgUHJvbWlzZS5DYW5jZWxsYXRpb25FcnJvcihcbiAgICAgICAgICAgIFwiZ2VuZXJhdG9yIC5yZXR1cm4oKSBzZW50aW5lbFwiKTtcbiAgICAgICAgUHJvbWlzZS5jb3JvdXRpbmUucmV0dXJuU2VudGluZWwgPSByZWFzb247XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UocmVhc29uKTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcbiAgICAgICAgcmVzdWx0ID0gdHJ5Q2F0Y2godGhpcy5fZ2VuZXJhdG9yW1widGhyb3dcIl0pLmNhbGwodGhpcy5fZ2VuZXJhdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhc29uKTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgIHJlc3VsdCA9IHRyeUNhdGNoKHRoaXMuX2dlbmVyYXRvcltcInJldHVyblwiXSkuY2FsbCh0aGlzLl9nZW5lcmF0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIH1cbiAgICB0aGlzLl9jYW5jZWxsYXRpb25QaGFzZSA9IHRydWU7XG4gICAgdGhpcy5feWllbGRlZFByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX2NvbnRpbnVlKHJlc3VsdCk7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9wcm9taXNlRnVsZmlsbGVkID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG51bGw7XG4gICAgdGhpcy5fcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcbiAgICB2YXIgcmVzdWx0ID0gdHJ5Q2F0Y2godGhpcy5fZ2VuZXJhdG9yLm5leHQpLmNhbGwodGhpcy5fZ2VuZXJhdG9yLCB2YWx1ZSk7XG4gICAgdGhpcy5fcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIHRoaXMuX2NvbnRpbnVlKHJlc3VsdCk7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9wcm9taXNlUmVqZWN0ZWQgPSBmdW5jdGlvbihyZWFzb24pIHtcbiAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG51bGw7XG4gICAgdGhpcy5fcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZShyZWFzb24pO1xuICAgIHRoaXMuX3Byb21pc2UuX3B1c2hDb250ZXh0KCk7XG4gICAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKHRoaXMuX2dlbmVyYXRvcltcInRocm93XCJdKVxuICAgICAgICAuY2FsbCh0aGlzLl9nZW5lcmF0b3IsIHJlYXNvbik7XG4gICAgdGhpcy5fcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIHRoaXMuX2NvbnRpbnVlKHJlc3VsdCk7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5feWllbGRlZFByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5feWllbGRlZFByb21pc2U7XG4gICAgICAgIHRoaXMuX3lpZWxkZWRQcm9taXNlID0gbnVsbDtcbiAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fZ2VuZXJhdG9yID0gdGhpcy5fZ2VuZXJhdG9yRnVuY3Rpb24uY2FsbCh0aGlzLl9yZWNlaXZlcik7XG4gICAgdGhpcy5fcmVjZWl2ZXIgPVxuICAgICAgICB0aGlzLl9nZW5lcmF0b3JGdW5jdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcm9taXNlRnVsZmlsbGVkKHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9jb250aW51ZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2U7XG4gICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgICAgICBpZiAodGhpcy5fY2FuY2VsbGF0aW9uUGhhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHJlc3VsdC5lLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgaWYgKHJlc3VsdC5kb25lID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgaWYgKHRoaXMuX2NhbmNlbGxhdGlvblBoYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlLl9yZXNvbHZlQ2FsbGJhY2sodmFsdWUpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodmFsdWUsIHRoaXMuX3Byb21pc2UpO1xuICAgICAgICBpZiAoIShtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgICAgICAgbWF5YmVQcm9taXNlID1cbiAgICAgICAgICAgICAgICBwcm9taXNlRnJvbVlpZWxkSGFuZGxlcihtYXliZVByb21pc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5feWllbGRIYW5kbGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlKTtcbiAgICAgICAgICAgIGlmIChtYXliZVByb21pc2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlUmVqZWN0ZWQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgJXMgd2FzIHlpZWxkZWQgdGhhdCBjb3VsZCBub3QgYmUgdHJlYXRlZCBhcyBhIHByb21pc2VcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXFx1MDAwYVwiLnJlcGxhY2UoXCIlc1wiLCB2YWx1ZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJGcm9tIGNvcm91dGluZTpcXHUwMDBhXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhY2suc3BsaXQoXCJcXG5cIikuc2xpY2UoMSwgLTcpLmpvaW4oXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1heWJlUHJvbWlzZSA9IG1heWJlUHJvbWlzZS5fdGFyZ2V0KCk7XG4gICAgICAgIHZhciBiaXRGaWVsZCA9IG1heWJlUHJvbWlzZS5fYml0RmllbGQ7XG4gICAgICAgIDtcbiAgICAgICAgaWYgKCgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XG4gICAgICAgICAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG1heWJlUHJvbWlzZTtcbiAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fcHJveHkodGhpcywgbnVsbCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgIFByb21pc2UuX2FzeW5jLmludm9rZShcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlRnVsZmlsbGVkLCB0aGlzLCBtYXliZVByb21pc2UuX3ZhbHVlKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMCkpIHtcbiAgICAgICAgICAgIFByb21pc2UuX2FzeW5jLmludm9rZShcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlUmVqZWN0ZWQsIHRoaXMsIG1heWJlUHJvbWlzZS5fcmVhc29uKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlQ2FuY2VsbGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5Qcm9taXNlLmNvcm91dGluZSA9IGZ1bmN0aW9uIChnZW5lcmF0b3JGdW5jdGlvbiwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgZ2VuZXJhdG9yRnVuY3Rpb24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZ2VuZXJhdG9yRnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICB9XG4gICAgdmFyIHlpZWxkSGFuZGxlciA9IE9iamVjdChvcHRpb25zKS55aWVsZEhhbmRsZXI7XG4gICAgdmFyIFByb21pc2VTcGF3biQgPSBQcm9taXNlU3Bhd247XG4gICAgdmFyIHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdlbmVyYXRvciA9IGdlbmVyYXRvckZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBzcGF3biA9IG5ldyBQcm9taXNlU3Bhd24kKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB5aWVsZEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrKTtcbiAgICAgICAgdmFyIHJldCA9IHNwYXduLnByb21pc2UoKTtcbiAgICAgICAgc3Bhd24uX2dlbmVyYXRvciA9IGdlbmVyYXRvcjtcbiAgICAgICAgc3Bhd24uX3Byb21pc2VGdWxmaWxsZWQodW5kZWZpbmVkKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xufTtcblxuUHJvbWlzZS5jb3JvdXRpbmUuYWRkWWllbGRIYW5kbGVyID0gZnVuY3Rpb24oZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XG4gICAgfVxuICAgIHlpZWxkSGFuZGxlcnMucHVzaChmbik7XG59O1xuXG5Qcm9taXNlLnNwYXduID0gZnVuY3Rpb24gKGdlbmVyYXRvckZ1bmN0aW9uKSB7XG4gICAgZGVidWcuZGVwcmVjYXRlZChcIlByb21pc2Uuc3Bhd24oKVwiLCBcIlByb21pc2UuY29yb3V0aW5lKClcIik7XG4gICAgaWYgKHR5cGVvZiBnZW5lcmF0b3JGdW5jdGlvbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJnZW5lcmF0b3JGdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbiAgICB2YXIgc3Bhd24gPSBuZXcgUHJvbWlzZVNwYXduKGdlbmVyYXRvckZ1bmN0aW9uLCB0aGlzKTtcbiAgICB2YXIgcmV0ID0gc3Bhd24ucHJvbWlzZSgpO1xuICAgIHNwYXduLl9ydW4oUHJvbWlzZS5zcGF3bik7XG4gICAgcmV0dXJuIHJldDtcbn07XG59O1xuXG59LHtcIi4vZXJyb3JzXCI6MTIsXCIuL3V0aWxcIjozNn1dLDE3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPVxuZnVuY3Rpb24oUHJvbWlzZSwgUHJvbWlzZUFycmF5LCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBJTlRFUk5BTCwgYXN5bmMsXG4gICAgICAgICBnZXREb21haW4pIHtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBjYW5FdmFsdWF0ZSA9IHV0aWwuY2FuRXZhbHVhdGU7XG52YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciByZWplY3Q7XG5cbmlmICghdHJ1ZSkge1xuaWYgKGNhbkV2YWx1YXRlKSB7XG4gICAgdmFyIHRoZW5DYWxsYmFjayA9IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcInZhbHVlXCIsIFwiaG9sZGVyXCIsIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgaG9sZGVyLnBJbmRleCA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgaG9sZGVyLmNoZWNrRnVsZmlsbG1lbnQodGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgXCIucmVwbGFjZSgvSW5kZXgvZywgaSkpO1xuICAgIH07XG5cbiAgICB2YXIgcHJvbWlzZVNldHRlciA9IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcInByb21pc2VcIiwgXCJob2xkZXJcIiwgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgaG9sZGVyLnBJbmRleCA9IHByb21pc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgXCIucmVwbGFjZSgvSW5kZXgvZywgaSkpO1xuICAgIH07XG5cbiAgICB2YXIgZ2VuZXJhdGVIb2xkZXJDbGFzcyA9IGZ1bmN0aW9uKHRvdGFsKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IG5ldyBBcnJheSh0b3RhbCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHByb3BzW2ldID0gXCJ0aGlzLnBcIiArIChpKzEpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhc3NpZ25tZW50ID0gcHJvcHMuam9pbihcIiA9IFwiKSArIFwiID0gbnVsbDtcIjtcbiAgICAgICAgdmFyIGNhbmNlbGxhdGlvbkNvZGU9IFwidmFyIHByb21pc2U7XFxuXCIgKyBwcm9wcy5tYXAoZnVuY3Rpb24ocHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gXCIgKyBwcm9wICsgXCI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmNhbmNlbCgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgXCI7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIHZhciBwYXNzZWRBcmd1bWVudHMgPSBwcm9wcy5qb2luKFwiLCBcIik7XG4gICAgICAgIHZhciBuYW1lID0gXCJIb2xkZXIkXCIgKyB0b3RhbDtcblxuXG4gICAgICAgIHZhciBjb2RlID0gXCJyZXR1cm4gZnVuY3Rpb24odHJ5Q2F0Y2gsIGVycm9yT2JqLCBQcm9taXNlLCBhc3luYykgeyAgICBcXG5cXFxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgZnVuY3Rpb24gW1RoZU5hbWVdKGZuKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIFtUaGVQcm9wZXJ0aWVzXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIHRoaXMuZm4gPSBmbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNOZWVkZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIHRoaXMubm93ID0gMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgW1RoZU5hbWVdLnByb3RvdHlwZS5fY2FsbEZ1bmN0aW9uID0gZnVuY3Rpb24ocHJvbWlzZSkgeyAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIHByb21pc2UuX3B1c2hDb250ZXh0KCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIHZhciByZXQgPSB0cnlDYXRjaCh0aGlzLmZuKShbVGhlUGFzc2VkQXJndW1lbnRzXSk7ICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIHByb21pc2UuX3BvcENvbnRleHQoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIGlmIChyZXQgPT09IGVycm9yT2JqKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLl9yZWplY3RDYWxsYmFjayhyZXQuZSwgZmFsc2UpOyAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLl9yZXNvbHZlQ2FsbGJhY2socmV0KTsgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgW1RoZU5hbWVdLnByb3RvdHlwZS5jaGVja0Z1bGZpbGxtZW50ID0gZnVuY3Rpb24ocHJvbWlzZSkgeyAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIHZhciBub3cgPSArK3RoaXMubm93OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIGlmIChub3cgPT09IFtUaGVUb3RhbF0pIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hc3luY05lZWRlZCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmMuaW52b2tlKHRoaXMuX2NhbGxGdW5jdGlvbiwgdGhpcywgcHJvbWlzZSk7ICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FsbEZ1bmN0aW9uKHByb21pc2UpOyAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgW1RoZU5hbWVdLnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7ICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIFtDYW5jZWxsYXRpb25Db2RlXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgcmV0dXJuIFtUaGVOYW1lXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICB9KHRyeUNhdGNoLCBlcnJvck9iaiwgUHJvbWlzZSwgYXN5bmMpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICBcIjtcblxuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXFtUaGVOYW1lXFxdL2csIG5hbWUpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxbVGhlVG90YWxcXF0vZywgdG90YWwpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxbVGhlUGFzc2VkQXJndW1lbnRzXFxdL2csIHBhc3NlZEFyZ3VtZW50cylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXFtUaGVQcm9wZXJ0aWVzXFxdL2csIGFzc2lnbm1lbnQpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxbQ2FuY2VsbGF0aW9uQ29kZVxcXS9nLCBjYW5jZWxsYXRpb25Db2RlKTtcblxuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwidHJ5Q2F0Y2hcIiwgXCJlcnJvck9ialwiLCBcIlByb21pc2VcIiwgXCJhc3luY1wiLCBjb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRyeUNhdGNoLCBlcnJvck9iaiwgUHJvbWlzZSwgYXN5bmMpO1xuICAgIH07XG5cbiAgICB2YXIgaG9sZGVyQ2xhc3NlcyA9IFtdO1xuICAgIHZhciB0aGVuQ2FsbGJhY2tzID0gW107XG4gICAgdmFyIHByb21pc2VTZXR0ZXJzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7ICsraSkge1xuICAgICAgICBob2xkZXJDbGFzc2VzLnB1c2goZ2VuZXJhdGVIb2xkZXJDbGFzcyhpICsgMSkpO1xuICAgICAgICB0aGVuQ2FsbGJhY2tzLnB1c2godGhlbkNhbGxiYWNrKGkgKyAxKSk7XG4gICAgICAgIHByb21pc2VTZXR0ZXJzLnB1c2gocHJvbWlzZVNldHRlcihpICsgMSkpO1xuICAgIH1cblxuICAgIHJlamVjdCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgdGhpcy5fcmVqZWN0KHJlYXNvbik7XG4gICAgfTtcbn19XG5cblByb21pc2Uuam9pbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGFzdCA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAgIHZhciBmbjtcbiAgICBpZiAobGFzdCA+IDAgJiYgdHlwZW9mIGFyZ3VtZW50c1tsYXN0XSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGZuID0gYXJndW1lbnRzW2xhc3RdO1xuICAgICAgICBpZiAoIXRydWUpIHtcbiAgICAgICAgICAgIGlmIChsYXN0IDw9IDggJiYgY2FuRXZhbHVhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICAgICAgICAgIHJldC5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICAgICAgICAgICAgICB2YXIgSG9sZGVyQ2xhc3MgPSBob2xkZXJDbGFzc2VzW2xhc3QgLSAxXTtcbiAgICAgICAgICAgICAgICB2YXIgaG9sZGVyID0gbmV3IEhvbGRlckNsYXNzKGZuKTtcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhlbkNhbGxiYWNrcztcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKGFyZ3VtZW50c1tpXSwgcmV0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZSA9IG1heWJlUHJvbWlzZS5fdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYml0RmllbGQgPSBtYXliZVByb21pc2UuX2JpdEZpZWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl90aGVuKGNhbGxiYWNrc1tpXSwgcmVqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsIHJldCwgaG9sZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlU2V0dGVyc1tpXShtYXliZVByb21pc2UsIGhvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9sZGVyLmFzeW5jTmVlZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAzMzU1NDQzMikgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldLmNhbGwocmV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fdmFsdWUoKSwgaG9sZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQuX3JlamVjdChtYXliZVByb21pc2UuX3JlYXNvbigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0Ll9jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXS5jYWxsKHJldCwgbWF5YmVQcm9taXNlLCBob2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXQuX2lzRmF0ZVNlYWxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChob2xkZXIuYXN5bmNOZWVkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb21haW4gPSBnZXREb21haW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb21haW4gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xkZXIuZm4gPSB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBob2xkZXIuZm4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldC5fc2V0QXN5bmNHdWFyYW50ZWVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldC5fc2V0T25DYW5jZWwoaG9sZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTs7XG4gICAgaWYgKGZuKSBhcmdzLnBvcCgpO1xuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZUFycmF5KGFyZ3MpLnByb21pc2UoKTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IHJldC5zcHJlYWQoZm4pIDogcmV0O1xufTtcblxufTtcblxufSx7XCIuL3V0aWxcIjozNn1dLDE4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlQXJyYXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFwaVJlamVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5Q29udmVydFRvUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSU5URVJOQUwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKSB7XG52YXIgZ2V0RG9tYWluID0gUHJvbWlzZS5fZ2V0RG9tYWluO1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG52YXIgYXN5bmMgPSBQcm9taXNlLl9hc3luYztcblxuZnVuY3Rpb24gTWFwcGluZ1Byb21pc2VBcnJheShwcm9taXNlcywgZm4sIGxpbWl0LCBfZmlsdGVyKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3RvciQocHJvbWlzZXMpO1xuICAgIHRoaXMuX3Byb21pc2UuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgdmFyIGRvbWFpbiA9IGdldERvbWFpbigpO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gZG9tYWluID09PSBudWxsID8gZm4gOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmbik7XG4gICAgdGhpcy5fcHJlc2VydmVkVmFsdWVzID0gX2ZpbHRlciA9PT0gSU5URVJOQUxcbiAgICAgICAgPyBuZXcgQXJyYXkodGhpcy5sZW5ndGgoKSlcbiAgICAgICAgOiBudWxsO1xuICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgdGhpcy5faW5GbGlnaHQgPSAwO1xuICAgIHRoaXMuX3F1ZXVlID0gW107XG4gICAgYXN5bmMuaW52b2tlKHRoaXMuX2FzeW5jSW5pdCwgdGhpcywgdW5kZWZpbmVkKTtcbn1cbnV0aWwuaW5oZXJpdHMoTWFwcGluZ1Byb21pc2VBcnJheSwgUHJvbWlzZUFycmF5KTtcblxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUuX2FzeW5jSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2luaXQkKHVuZGVmaW5lZCwgLTIpO1xufTtcblxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGgoKTtcbiAgICB2YXIgcHJlc2VydmVkVmFsdWVzID0gdGhpcy5fcHJlc2VydmVkVmFsdWVzO1xuICAgIHZhciBsaW1pdCA9IHRoaXMuX2xpbWl0O1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBpbmRleCA9IChpbmRleCAqIC0xKSAtIDE7XG4gICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKGxpbWl0ID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2luRmxpZ2h0LS07XG4gICAgICAgICAgICB0aGlzLl9kcmFpblF1ZXVlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsaW1pdCA+PSAxICYmIHRoaXMuX2luRmxpZ2h0ID49IGxpbWl0KSB7XG4gICAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9xdWV1ZS5wdXNoKGluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJlc2VydmVkVmFsdWVzICE9PSBudWxsKSBwcmVzZXJ2ZWRWYWx1ZXNbaW5kZXhdID0gdmFsdWU7XG5cbiAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLl9wcm9taXNlO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdmFyIHJlY2VpdmVyID0gcHJvbWlzZS5fYm91bmRWYWx1ZSgpO1xuICAgICAgICBwcm9taXNlLl9wdXNoQ29udGV4dCgpO1xuICAgICAgICB2YXIgcmV0ID0gdHJ5Q2F0Y2goY2FsbGJhY2spLmNhbGwocmVjZWl2ZXIsIHZhbHVlLCBpbmRleCwgbGVuZ3RoKTtcbiAgICAgICAgdmFyIHByb21pc2VDcmVhdGVkID0gcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgICAgICBkZWJ1Zy5jaGVja0ZvcmdvdHRlblJldHVybnMoXG4gICAgICAgICAgICByZXQsXG4gICAgICAgICAgICBwcm9taXNlQ3JlYXRlZCxcbiAgICAgICAgICAgIHByZXNlcnZlZFZhbHVlcyAhPT0gbnVsbCA/IFwiUHJvbWlzZS5maWx0ZXJcIiA6IFwiUHJvbWlzZS5tYXBcIixcbiAgICAgICAgICAgIHByb21pc2VcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdChyZXQuZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHJldCwgdGhpcy5fcHJvbWlzZSk7XG4gICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICBtYXliZVByb21pc2UgPSBtYXliZVByb21pc2UuX3RhcmdldCgpO1xuICAgICAgICAgICAgdmFyIGJpdEZpZWxkID0gbWF5YmVQcm9taXNlLl9iaXRGaWVsZDtcbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgIGlmICgoKGJpdEZpZWxkICYgNTAzOTcxODQpID09PSAwKSkge1xuICAgICAgICAgICAgICAgIGlmIChsaW1pdCA+PSAxKSB0aGlzLl9pbkZsaWdodCsrO1xuICAgICAgICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSBtYXliZVByb21pc2U7XG4gICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl9wcm94eSh0aGlzLCAoaW5kZXggKyAxKSAqIC0xKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAzMzU1NDQzMikgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gbWF5YmVQcm9taXNlLl92YWx1ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlamVjdChtYXliZVByb21pc2UuX3JlYXNvbigpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzW2luZGV4XSA9IHJldDtcbiAgICB9XG4gICAgdmFyIHRvdGFsUmVzb2x2ZWQgPSArK3RoaXMuX3RvdGFsUmVzb2x2ZWQ7XG4gICAgaWYgKHRvdGFsUmVzb2x2ZWQgPj0gbGVuZ3RoKSB7XG4gICAgICAgIGlmIChwcmVzZXJ2ZWRWYWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlcih2YWx1ZXMsIHByZXNlcnZlZFZhbHVlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbk1hcHBpbmdQcm9taXNlQXJyYXkucHJvdG90eXBlLl9kcmFpblF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBxdWV1ZSA9IHRoaXMuX3F1ZXVlO1xuICAgIHZhciBsaW1pdCA9IHRoaXMuX2xpbWl0O1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDAgJiYgdGhpcy5faW5GbGlnaHQgPCBsaW1pdCkge1xuICAgICAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm47XG4gICAgICAgIHZhciBpbmRleCA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICB0aGlzLl9wcm9taXNlRnVsZmlsbGVkKHZhbHVlc1tpbmRleF0sIGluZGV4KTtcbiAgICB9XG59O1xuXG5NYXBwaW5nUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fZmlsdGVyID0gZnVuY3Rpb24gKGJvb2xlYW5zLCB2YWx1ZXMpIHtcbiAgICB2YXIgbGVuID0gdmFsdWVzLmxlbmd0aDtcbiAgICB2YXIgcmV0ID0gbmV3IEFycmF5KGxlbik7XG4gICAgdmFyIGogPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgaWYgKGJvb2xlYW5zW2ldKSByZXRbaisrXSA9IHZhbHVlc1tpXTtcbiAgICB9XG4gICAgcmV0Lmxlbmd0aCA9IGo7XG4gICAgdGhpcy5fcmVzb2x2ZShyZXQpO1xufTtcblxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUucHJlc2VydmVkVmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVzZXJ2ZWRWYWx1ZXM7XG59O1xuXG5mdW5jdGlvbiBtYXAocHJvbWlzZXMsIGZuLCBvcHRpb25zLCBfZmlsdGVyKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgIH1cblxuICAgIHZhciBsaW1pdCA9IDA7XG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNvbmN1cnJlbmN5ICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgICAgICAgICAgICBuZXcgVHlwZUVycm9yKFwiJ2NvbmN1cnJlbmN5JyBtdXN0IGJlIGEgbnVtYmVyIGJ1dCBpdCBpcyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmNsYXNzU3RyaW5nKG9wdGlvbnMuY29uY3VycmVuY3kpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW1pdCA9IG9wdGlvbnMuY29uY3VycmVuY3k7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9wdGlvbnMgYXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QgYnV0IGl0IGlzIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5jbGFzc1N0cmluZyhvcHRpb25zKSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxpbWl0ID0gdHlwZW9mIGxpbWl0ID09PSBcIm51bWJlclwiICYmXG4gICAgICAgIGlzRmluaXRlKGxpbWl0KSAmJiBsaW1pdCA+PSAxID8gbGltaXQgOiAwO1xuICAgIHJldHVybiBuZXcgTWFwcGluZ1Byb21pc2VBcnJheShwcm9taXNlcywgZm4sIGxpbWl0LCBfZmlsdGVyKS5wcm9taXNlKCk7XG59XG5cblByb21pc2UucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbiwgb3B0aW9ucykge1xuICAgIHJldHVybiBtYXAodGhpcywgZm4sIG9wdGlvbnMsIG51bGwpO1xufTtcblxuUHJvbWlzZS5tYXAgPSBmdW5jdGlvbiAocHJvbWlzZXMsIGZuLCBvcHRpb25zLCBfZmlsdGVyKSB7XG4gICAgcmV0dXJuIG1hcChwcm9taXNlcywgZm4sIG9wdGlvbnMsIF9maWx0ZXIpO1xufTtcblxuXG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMTk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9XG5mdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSwgYXBpUmVqZWN0aW9uLCBkZWJ1Zykge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcblxuUHJvbWlzZS5tZXRob2QgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFByb21pc2UuVHlwZUVycm9yKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICAgICAgcmV0Ll9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgICAgICByZXQuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRyeUNhdGNoKGZuKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB2YXIgcHJvbWlzZUNyZWF0ZWQgPSByZXQuX3BvcENvbnRleHQoKTtcbiAgICAgICAgZGVidWcuY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zKFxuICAgICAgICAgICAgdmFsdWUsIHByb21pc2VDcmVhdGVkLCBcIlByb21pc2UubWV0aG9kXCIsIHJldCk7XG4gICAgICAgIHJldC5fcmVzb2x2ZUZyb21TeW5jVmFsdWUodmFsdWUpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG59O1xuXG5Qcm9taXNlLmF0dGVtcHQgPSBQcm9taXNlW1widHJ5XCJdID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgIH1cbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHJldC5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICByZXQuX3B1c2hDb250ZXh0KCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBkZWJ1Zy5kZXByZWNhdGVkKFwiY2FsbGluZyBQcm9taXNlLnRyeSB3aXRoIG1vcmUgdGhhbiAxIGFyZ3VtZW50XCIpO1xuICAgICAgICB2YXIgYXJnID0gYXJndW1lbnRzWzFdO1xuICAgICAgICB2YXIgY3R4ID0gYXJndW1lbnRzWzJdO1xuICAgICAgICB2YWx1ZSA9IHV0aWwuaXNBcnJheShhcmcpID8gdHJ5Q2F0Y2goZm4pLmFwcGx5KGN0eCwgYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdHJ5Q2F0Y2goZm4pLmNhbGwoY3R4LCBhcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gdHJ5Q2F0Y2goZm4pKCk7XG4gICAgfVxuICAgIHZhciBwcm9taXNlQ3JlYXRlZCA9IHJldC5fcG9wQ29udGV4dCgpO1xuICAgIGRlYnVnLmNoZWNrRm9yZ290dGVuUmV0dXJucyhcbiAgICAgICAgdmFsdWUsIHByb21pc2VDcmVhdGVkLCBcIlByb21pc2UudHJ5XCIsIHJldCk7XG4gICAgcmV0Ll9yZXNvbHZlRnJvbVN5bmNWYWx1ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZXNvbHZlRnJvbVN5bmNWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdXRpbC5lcnJvck9iaikge1xuICAgICAgICB0aGlzLl9yZWplY3RDYWxsYmFjayh2YWx1ZS5lLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZUNhbGxiYWNrKHZhbHVlLCB0cnVlKTtcbiAgICB9XG59O1xufTtcblxufSx7XCIuL3V0aWxcIjozNn1dLDIwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIG1heWJlV3JhcEFzRXJyb3IgPSB1dGlsLm1heWJlV3JhcEFzRXJyb3I7XG52YXIgZXJyb3JzID0gX2RlcmVxXyhcIi4vZXJyb3JzXCIpO1xudmFyIE9wZXJhdGlvbmFsRXJyb3IgPSBlcnJvcnMuT3BlcmF0aW9uYWxFcnJvcjtcbnZhciBlczUgPSBfZGVyZXFfKFwiLi9lczVcIik7XG5cbmZ1bmN0aW9uIGlzVW50eXBlZEVycm9yKG9iaikge1xuICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBFcnJvciAmJlxuICAgICAgICBlczUuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gRXJyb3IucHJvdG90eXBlO1xufVxuXG52YXIgckVycm9yS2V5ID0gL14oPzpuYW1lfG1lc3NhZ2V8c3RhY2t8Y2F1c2UpJC87XG5mdW5jdGlvbiB3cmFwQXNPcGVyYXRpb25hbEVycm9yKG9iaikge1xuICAgIHZhciByZXQ7XG4gICAgaWYgKGlzVW50eXBlZEVycm9yKG9iaikpIHtcbiAgICAgICAgcmV0ID0gbmV3IE9wZXJhdGlvbmFsRXJyb3Iob2JqKTtcbiAgICAgICAgcmV0Lm5hbWUgPSBvYmoubmFtZTtcbiAgICAgICAgcmV0Lm1lc3NhZ2UgPSBvYmoubWVzc2FnZTtcbiAgICAgICAgcmV0LnN0YWNrID0gb2JqLnN0YWNrO1xuICAgICAgICB2YXIga2V5cyA9IGVzNS5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICBpZiAoIXJFcnJvcktleS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIHV0aWwubWFya0FzT3JpZ2luYXRpbmdGcm9tUmVqZWN0aW9uKG9iaik7XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gbm9kZWJhY2tGb3JQcm9taXNlKHByb21pc2UsIG11bHRpQXJncykge1xuICAgIHJldHVybiBmdW5jdGlvbihlcnIsIHZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9taXNlID09PSBudWxsKSByZXR1cm47XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHZhciB3cmFwcGVkID0gd3JhcEFzT3BlcmF0aW9uYWxFcnJvcihtYXliZVdyYXBBc0Vycm9yKGVycikpO1xuICAgICAgICAgICAgcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZSh3cmFwcGVkKTtcbiAgICAgICAgICAgIHByb21pc2UuX3JlamVjdCh3cmFwcGVkKTtcbiAgICAgICAgfSBlbHNlIGlmICghbXVsdGlBcmdzKSB7XG4gICAgICAgICAgICBwcm9taXNlLl9mdWxmaWxsKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpOztcbiAgICAgICAgICAgIHByb21pc2UuX2Z1bGZpbGwoYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvbWlzZSA9IG51bGw7XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub2RlYmFja0ZvclByb21pc2U7XG5cbn0se1wiLi9lcnJvcnNcIjoxMixcIi4vZXM1XCI6MTMsXCIuL3V0aWxcIjozNn1dLDIxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgYXN5bmMgPSBQcm9taXNlLl9hc3luYztcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xuXG5mdW5jdGlvbiBzcHJlYWRBZGFwdGVyKHZhbCwgbm9kZWJhY2spIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgaWYgKCF1dGlsLmlzQXJyYXkodmFsKSkgcmV0dXJuIHN1Y2Nlc3NBZGFwdGVyLmNhbGwocHJvbWlzZSwgdmFsLCBub2RlYmFjayk7XG4gICAgdmFyIHJldCA9XG4gICAgICAgIHRyeUNhdGNoKG5vZGViYWNrKS5hcHBseShwcm9taXNlLl9ib3VuZFZhbHVlKCksIFtudWxsXS5jb25jYXQodmFsKSk7XG4gICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgYXN5bmMudGhyb3dMYXRlcihyZXQuZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdWNjZXNzQWRhcHRlcih2YWwsIG5vZGViYWNrKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuICAgIHZhciByZWNlaXZlciA9IHByb21pc2UuX2JvdW5kVmFsdWUoKTtcbiAgICB2YXIgcmV0ID0gdmFsID09PSB1bmRlZmluZWRcbiAgICAgICAgPyB0cnlDYXRjaChub2RlYmFjaykuY2FsbChyZWNlaXZlciwgbnVsbClcbiAgICAgICAgOiB0cnlDYXRjaChub2RlYmFjaykuY2FsbChyZWNlaXZlciwgbnVsbCwgdmFsKTtcbiAgICBpZiAocmV0ID09PSBlcnJvck9iaikge1xuICAgICAgICBhc3luYy50aHJvd0xhdGVyKHJldC5lKTtcbiAgICB9XG59XG5mdW5jdGlvbiBlcnJvckFkYXB0ZXIocmVhc29uLCBub2RlYmFjaykge1xuICAgIHZhciBwcm9taXNlID0gdGhpcztcbiAgICBpZiAoIXJlYXNvbikge1xuICAgICAgICB2YXIgbmV3UmVhc29uID0gbmV3IEVycm9yKHJlYXNvbiArIFwiXCIpO1xuICAgICAgICBuZXdSZWFzb24uY2F1c2UgPSByZWFzb247XG4gICAgICAgIHJlYXNvbiA9IG5ld1JlYXNvbjtcbiAgICB9XG4gICAgdmFyIHJldCA9IHRyeUNhdGNoKG5vZGViYWNrKS5jYWxsKHByb21pc2UuX2JvdW5kVmFsdWUoKSwgcmVhc29uKTtcbiAgICBpZiAocmV0ID09PSBlcnJvck9iaikge1xuICAgICAgICBhc3luYy50aHJvd0xhdGVyKHJldC5lKTtcbiAgICB9XG59XG5cblByb21pc2UucHJvdG90eXBlLmFzQ2FsbGJhY2sgPSBQcm9taXNlLnByb3RvdHlwZS5ub2RlaWZ5ID0gZnVuY3Rpb24gKG5vZGViYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygbm9kZWJhY2sgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBhZGFwdGVyID0gc3VjY2Vzc0FkYXB0ZXI7XG4gICAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgT2JqZWN0KG9wdGlvbnMpLnNwcmVhZCkge1xuICAgICAgICAgICAgYWRhcHRlciA9IHNwcmVhZEFkYXB0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdGhlbihcbiAgICAgICAgICAgIGFkYXB0ZXIsXG4gICAgICAgICAgICBlcnJvckFkYXB0ZXIsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgbm9kZWJhY2tcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xufTtcblxufSx7XCIuL3V0aWxcIjozNn1dLDIyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbnZhciBtYWtlU2VsZlJlc29sdXRpb25FcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcImNpcmN1bGFyIHByb21pc2UgcmVzb2x1dGlvbiBjaGFpblxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG59O1xudmFyIHJlZmxlY3RIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlLlByb21pc2VJbnNwZWN0aW9uKHRoaXMuX3RhcmdldCgpKTtcbn07XG52YXIgYXBpUmVqZWN0aW9uID0gZnVuY3Rpb24obXNnKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IobXNnKSk7XG59O1xuZnVuY3Rpb24gUHJveHlhYmxlKCkge31cbnZhciBVTkRFRklORURfQklORElORyA9IHt9O1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xuXG52YXIgZ2V0RG9tYWluO1xuaWYgKHV0aWwuaXNOb2RlKSB7XG4gICAgZ2V0RG9tYWluID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXQgPSBwcm9jZXNzLmRvbWFpbjtcbiAgICAgICAgaWYgKHJldCA9PT0gdW5kZWZpbmVkKSByZXQgPSBudWxsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG59IGVsc2Uge1xuICAgIGdldERvbWFpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xufVxudXRpbC5ub3RFbnVtZXJhYmxlUHJvcChQcm9taXNlLCBcIl9nZXREb21haW5cIiwgZ2V0RG9tYWluKTtcblxudmFyIGVzNSA9IF9kZXJlcV8oXCIuL2VzNVwiKTtcbnZhciBBc3luYyA9IF9kZXJlcV8oXCIuL2FzeW5jXCIpO1xudmFyIGFzeW5jID0gbmV3IEFzeW5jKCk7XG5lczUuZGVmaW5lUHJvcGVydHkoUHJvbWlzZSwgXCJfYXN5bmNcIiwge3ZhbHVlOiBhc3luY30pO1xudmFyIGVycm9ycyA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKTtcbnZhciBUeXBlRXJyb3IgPSBQcm9taXNlLlR5cGVFcnJvciA9IGVycm9ycy5UeXBlRXJyb3I7XG5Qcm9taXNlLlJhbmdlRXJyb3IgPSBlcnJvcnMuUmFuZ2VFcnJvcjtcbnZhciBDYW5jZWxsYXRpb25FcnJvciA9IFByb21pc2UuQ2FuY2VsbGF0aW9uRXJyb3IgPSBlcnJvcnMuQ2FuY2VsbGF0aW9uRXJyb3I7XG5Qcm9taXNlLlRpbWVvdXRFcnJvciA9IGVycm9ycy5UaW1lb3V0RXJyb3I7XG5Qcm9taXNlLk9wZXJhdGlvbmFsRXJyb3IgPSBlcnJvcnMuT3BlcmF0aW9uYWxFcnJvcjtcblByb21pc2UuUmVqZWN0aW9uRXJyb3IgPSBlcnJvcnMuT3BlcmF0aW9uYWxFcnJvcjtcblByb21pc2UuQWdncmVnYXRlRXJyb3IgPSBlcnJvcnMuQWdncmVnYXRlRXJyb3I7XG52YXIgSU5URVJOQUwgPSBmdW5jdGlvbigpe307XG52YXIgQVBQTFkgPSB7fTtcbnZhciBORVhUX0ZJTFRFUiA9IHt9O1xudmFyIHRyeUNvbnZlcnRUb1Byb21pc2UgPSBfZGVyZXFfKFwiLi90aGVuYWJsZXNcIikoUHJvbWlzZSwgSU5URVJOQUwpO1xudmFyIFByb21pc2VBcnJheSA9XG4gICAgX2RlcmVxXyhcIi4vcHJvbWlzZV9hcnJheVwiKShQcm9taXNlLCBJTlRFUk5BTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnlDb252ZXJ0VG9Qcm9taXNlLCBhcGlSZWplY3Rpb24sIFByb3h5YWJsZSk7XG52YXIgQ29udGV4dCA9IF9kZXJlcV8oXCIuL2NvbnRleHRcIikoUHJvbWlzZSk7XG4gLypqc2hpbnQgdW51c2VkOmZhbHNlKi9cbnZhciBjcmVhdGVDb250ZXh0ID0gQ29udGV4dC5jcmVhdGU7XG52YXIgZGVidWcgPSBfZGVyZXFfKFwiLi9kZWJ1Z2dhYmlsaXR5XCIpKFByb21pc2UsIENvbnRleHQpO1xudmFyIENhcHR1cmVkVHJhY2UgPSBkZWJ1Zy5DYXB0dXJlZFRyYWNlO1xudmFyIFBhc3NUaHJvdWdoSGFuZGxlckNvbnRleHQgPVxuICAgIF9kZXJlcV8oXCIuL2ZpbmFsbHlcIikoUHJvbWlzZSwgdHJ5Q29udmVydFRvUHJvbWlzZSk7XG52YXIgY2F0Y2hGaWx0ZXIgPSBfZGVyZXFfKFwiLi9jYXRjaF9maWx0ZXJcIikoTkVYVF9GSUxURVIpO1xudmFyIG5vZGViYWNrRm9yUHJvbWlzZSA9IF9kZXJlcV8oXCIuL25vZGViYWNrXCIpO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG5mdW5jdGlvbiBjaGVjayhzZWxmLCBleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZXhlY3V0b3IpKTtcbiAgICB9XG4gICAgaWYgKHNlbGYuY29uc3RydWN0b3IgIT09IFByb21pc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRoZSBwcm9taXNlIGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBpbnZva2VkIGRpcmVjdGx5XFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IDA7XG4gICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9yZWplY3Rpb25IYW5kbGVyMCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcm9taXNlMCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9yZWNlaXZlcjAgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGV4ZWN1dG9yICE9PSBJTlRFUk5BTCkge1xuICAgICAgICBjaGVjayh0aGlzLCBleGVjdXRvcik7XG4gICAgICAgIHRoaXMuX3Jlc29sdmVGcm9tRXhlY3V0b3IoZXhlY3V0b3IpO1xuICAgIH1cbiAgICB0aGlzLl9wcm9taXNlQ3JlYXRlZCgpO1xuICAgIHRoaXMuX2ZpcmVFdmVudChcInByb21pc2VDcmVhdGVkXCIsIHRoaXMpO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IFByb21pc2VdXCI7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5jYXVnaHQgPSBQcm9taXNlLnByb3RvdHlwZVtcImNhdGNoXCJdID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGxlbiA+IDEpIHtcbiAgICAgICAgdmFyIGNhdGNoSW5zdGFuY2VzID0gbmV3IEFycmF5KGxlbiAtIDEpLFxuICAgICAgICAgICAgaiA9IDAsIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW4gLSAxOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKHV0aWwuaXNPYmplY3QoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBjYXRjaEluc3RhbmNlc1tqKytdID0gaXRlbTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImV4cGVjdGluZyBhbiBvYmplY3QgYnV0IGdvdCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiQSBjYXRjaCBzdGF0ZW1lbnQgcHJlZGljYXRlIFwiICsgdXRpbC5jbGFzc1N0cmluZyhpdGVtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2hJbnN0YW5jZXMubGVuZ3RoID0gajtcbiAgICAgICAgZm4gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBjYXRjaEZpbHRlcihjYXRjaEluc3RhbmNlcywgZm4sIHRoaXMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIGZuKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnJlZmxlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RoZW4ocmVmbGVjdEhhbmRsZXIsXG4gICAgICAgIHJlZmxlY3RIYW5kbGVyLCB1bmRlZmluZWQsIHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCkge1xuICAgIGlmIChkZWJ1Zy53YXJuaW5ncygpICYmIGFyZ3VtZW50cy5sZW5ndGggPiAwICYmXG4gICAgICAgIHR5cGVvZiBkaWRGdWxmaWxsICE9PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgdHlwZW9mIGRpZFJlamVjdCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBtc2cgPSBcIi50aGVuKCkgb25seSBhY2NlcHRzIGZ1bmN0aW9ucyBidXQgd2FzIHBhc3NlZDogXCIgK1xuICAgICAgICAgICAgICAgIHV0aWwuY2xhc3NTdHJpbmcoZGlkRnVsZmlsbCk7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbXNnICs9IFwiLCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZGlkUmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl93YXJuKG1zZyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl90aGVuKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24gKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCkge1xuICAgIHZhciBwcm9taXNlID1cbiAgICAgICAgdGhpcy5fdGhlbihkaWRGdWxmaWxsLCBkaWRSZWplY3QsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICAgIHByb21pc2UuX3NldElzRmluYWwoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnNwcmVhZCA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWxsKCkuX3RoZW4oZm4sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBBUFBMWSwgdW5kZWZpbmVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmV0ID0ge1xuICAgICAgICBpc0Z1bGZpbGxlZDogZmFsc2UsXG4gICAgICAgIGlzUmVqZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBmdWxmaWxsbWVudFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIHJlamVjdGlvblJlYXNvbjogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBpZiAodGhpcy5pc0Z1bGZpbGxlZCgpKSB7XG4gICAgICAgIHJldC5mdWxmaWxsbWVudFZhbHVlID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICByZXQuaXNGdWxmaWxsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgcmV0LnJlamVjdGlvblJlYXNvbiA9IHRoaXMucmVhc29uKCk7XG4gICAgICAgIHJldC5pc1JlamVjdGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5fd2FybihcIi5hbGwoKSB3YXMgcGFzc2VkIGFyZ3VtZW50cyBidXQgaXQgZG9lcyBub3QgdGFrZSBhbnlcIik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZUFycmF5KHRoaXMpLnByb21pc2UoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgcmV0dXJuIHRoaXMuY2F1Z2h0KHV0aWwub3JpZ2luYXRlc0Zyb21SZWplY3Rpb24sIGZuKTtcbn07XG5cblByb21pc2UuZ2V0TmV3TGlicmFyeUNvcHkgPSBtb2R1bGUuZXhwb3J0cztcblxuUHJvbWlzZS5pcyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgUHJvbWlzZTtcbn07XG5cblByb21pc2UuZnJvbU5vZGUgPSBQcm9taXNlLmZyb21DYWxsYmFjayA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgdmFyIG11bHRpQXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gISFPYmplY3QoYXJndW1lbnRzWzFdKS5tdWx0aUFyZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICB2YXIgcmVzdWx0ID0gdHJ5Q2F0Y2goZm4pKG5vZGViYWNrRm9yUHJvbWlzZShyZXQsIG11bHRpQXJncykpO1xuICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgIHJldC5fcmVqZWN0Q2FsbGJhY2socmVzdWx0LmUsIHRydWUpO1xuICAgIH1cbiAgICBpZiAoIXJldC5faXNGYXRlU2VhbGVkKCkpIHJldC5fc2V0QXN5bmNHdWFyYW50ZWVkKCk7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UuYWxsID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlQXJyYXkocHJvbWlzZXMpLnByb21pc2UoKTtcbn07XG5cblByb21pc2UuY2FzdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgcmV0ID0gdHJ5Q29udmVydFRvUHJvbWlzZShvYmopO1xuICAgIGlmICghKHJldCBpbnN0YW5jZW9mIFByb21pc2UpKSB7XG4gICAgICAgIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICAgICAgcmV0Ll9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgICAgICByZXQuX3NldEZ1bGZpbGxlZCgpO1xuICAgICAgICByZXQuX3JlamVjdGlvbkhhbmRsZXIwID0gb2JqO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxuUHJvbWlzZS5yZXNvbHZlID0gUHJvbWlzZS5mdWxmaWxsZWQgPSBQcm9taXNlLmNhc3Q7XG5cblByb21pc2UucmVqZWN0ID0gUHJvbWlzZS5yZWplY3RlZCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHJldC5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICByZXQuX3JlamVjdENhbGxiYWNrKHJlYXNvbiwgdHJ1ZSk7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2Uuc2V0U2NoZWR1bGVyID0gZnVuY3Rpb24oZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XG4gICAgfVxuICAgIHJldHVybiBhc3luYy5zZXRTY2hlZHVsZXIoZm4pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3RoZW4gPSBmdW5jdGlvbiAoXG4gICAgZGlkRnVsZmlsbCxcbiAgICBkaWRSZWplY3QsXG4gICAgXywgICAgcmVjZWl2ZXIsXG4gICAgaW50ZXJuYWxEYXRhXG4pIHtcbiAgICB2YXIgaGF2ZUludGVybmFsRGF0YSA9IGludGVybmFsRGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBwcm9taXNlID0gaGF2ZUludGVybmFsRGF0YSA/IGludGVybmFsRGF0YSA6IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0KCk7XG4gICAgdmFyIGJpdEZpZWxkID0gdGFyZ2V0Ll9iaXRGaWVsZDtcblxuICAgIGlmICghaGF2ZUludGVybmFsRGF0YSkge1xuICAgICAgICBwcm9taXNlLl9wcm9wYWdhdGVGcm9tKHRoaXMsIDMpO1xuICAgICAgICBwcm9taXNlLl9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgICAgICBpZiAocmVjZWl2ZXIgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgKCh0aGlzLl9iaXRGaWVsZCAmIDIwOTcxNTIpICE9PSAwKSkge1xuICAgICAgICAgICAgaWYgKCEoKGJpdEZpZWxkICYgNTAzOTcxODQpID09PSAwKSkge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gdGhpcy5fYm91bmRWYWx1ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHRhcmdldCA9PT0gdGhpcyA/IHVuZGVmaW5lZCA6IHRoaXMuX2JvdW5kVG87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZUV2ZW50KFwicHJvbWlzZUNoYWluZWRcIiwgdGhpcywgcHJvbWlzZSk7XG4gICAgfVxuXG4gICAgdmFyIGRvbWFpbiA9IGdldERvbWFpbigpO1xuICAgIGlmICghKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIsIHZhbHVlLCBzZXR0bGVyID0gdGFyZ2V0Ll9zZXR0bGVQcm9taXNlQ3R4O1xuICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGFyZ2V0Ll9yZWplY3Rpb25IYW5kbGVyMDtcbiAgICAgICAgICAgIGhhbmRsZXIgPSBkaWRGdWxmaWxsO1xuICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRhcmdldC5fZnVsZmlsbG1lbnRIYW5kbGVyMDtcbiAgICAgICAgICAgIGhhbmRsZXIgPSBkaWRSZWplY3Q7XG4gICAgICAgICAgICB0YXJnZXQuX3Vuc2V0UmVqZWN0aW9uSXNVbmhhbmRsZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHRsZXIgPSB0YXJnZXQuX3NldHRsZVByb21pc2VMYXRlQ2FuY2VsbGF0aW9uT2JzZXJ2ZXI7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBDYW5jZWxsYXRpb25FcnJvcihcImxhdGUgY2FuY2VsbGF0aW9uIG9ic2VydmVyXCIpO1xuICAgICAgICAgICAgdGFyZ2V0Ll9hdHRhY2hFeHRyYVRyYWNlKHZhbHVlKTtcbiAgICAgICAgICAgIGhhbmRsZXIgPSBkaWRSZWplY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBhc3luYy5pbnZva2Uoc2V0dGxlciwgdGFyZ2V0LCB7XG4gICAgICAgICAgICBoYW5kbGVyOiBkb21haW4gPT09IG51bGwgPyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgOiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgICAgICB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBoYW5kbGVyKSksXG4gICAgICAgICAgICBwcm9taXNlOiBwcm9taXNlLFxuICAgICAgICAgICAgcmVjZWl2ZXI6IHJlY2VpdmVyLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC5fYWRkQ2FsbGJhY2tzKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCwgcHJvbWlzZSwgcmVjZWl2ZXIsIGRvbWFpbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fbGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9iaXRGaWVsZCAmIDY1NTM1O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzRmF0ZVNlYWxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgMTE3NTA2MDQ4KSAhPT0gMDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc0ZvbGxvd2luZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgNjcxMDg4NjQpID09PSA2NzEwODg2NDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRMZW5ndGggPSBmdW5jdGlvbiAobGVuKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSAodGhpcy5fYml0RmllbGQgJiAtNjU1MzYpIHxcbiAgICAgICAgKGxlbiAmIDY1NTM1KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRGdWxmaWxsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDMzNTU0NDMyO1xuICAgIHRoaXMuX2ZpcmVFdmVudChcInByb21pc2VGdWxmaWxsZWRcIiwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0UmVqZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDE2Nzc3MjE2O1xuICAgIHRoaXMuX2ZpcmVFdmVudChcInByb21pc2VSZWplY3RlZFwiLCB0aGlzKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRGb2xsb3dpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDY3MTA4ODY0O1xuICAgIHRoaXMuX2ZpcmVFdmVudChcInByb21pc2VSZXNvbHZlZFwiLCB0aGlzKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRJc0ZpbmFsID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCA0MTk0MzA0O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzRmluYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDQxOTQzMDQpID4gMDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl91bnNldENhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofjY1NTM2KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgNjU1MzY7XG4gICAgdGhpcy5fZmlyZUV2ZW50KFwicHJvbWlzZUNhbmNlbGxlZFwiLCB0aGlzKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRXaWxsQmVDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgODM4ODYwODtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRBc3luY0d1YXJhbnRlZWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoYXN5bmMuaGFzQ3VzdG9tU2NoZWR1bGVyKCkpIHJldHVybjtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMTM0MjE3NzI4O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3JlY2VpdmVyQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICB2YXIgcmV0ID0gaW5kZXggPT09IDAgPyB0aGlzLl9yZWNlaXZlcjAgOiB0aGlzW1xuICAgICAgICAgICAgaW5kZXggKiA0IC0gNCArIDNdO1xuICAgIGlmIChyZXQgPT09IFVOREVGSU5FRF9CSU5ESU5HKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmIChyZXQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLl9pc0JvdW5kKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdW5kVmFsdWUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpc1tcbiAgICAgICAgICAgIGluZGV4ICogNCAtIDQgKyAyXTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9mdWxmaWxsbWVudEhhbmRsZXJBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHJldHVybiB0aGlzW1xuICAgICAgICAgICAgaW5kZXggKiA0IC0gNCArIDBdO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3JlamVjdGlvbkhhbmRsZXJBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHJldHVybiB0aGlzW1xuICAgICAgICAgICAgaW5kZXggKiA0IC0gNCArIDFdO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2JvdW5kVmFsdWUgPSBmdW5jdGlvbigpIHt9O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fbWlncmF0ZUNhbGxiYWNrMCA9IGZ1bmN0aW9uIChmb2xsb3dlcikge1xuICAgIHZhciBiaXRGaWVsZCA9IGZvbGxvd2VyLl9iaXRGaWVsZDtcbiAgICB2YXIgZnVsZmlsbCA9IGZvbGxvd2VyLl9mdWxmaWxsbWVudEhhbmRsZXIwO1xuICAgIHZhciByZWplY3QgPSBmb2xsb3dlci5fcmVqZWN0aW9uSGFuZGxlcjA7XG4gICAgdmFyIHByb21pc2UgPSBmb2xsb3dlci5fcHJvbWlzZTA7XG4gICAgdmFyIHJlY2VpdmVyID0gZm9sbG93ZXIuX3JlY2VpdmVyQXQoMCk7XG4gICAgaWYgKHJlY2VpdmVyID09PSB1bmRlZmluZWQpIHJlY2VpdmVyID0gVU5ERUZJTkVEX0JJTkRJTkc7XG4gICAgdGhpcy5fYWRkQ2FsbGJhY2tzKGZ1bGZpbGwsIHJlamVjdCwgcHJvbWlzZSwgcmVjZWl2ZXIsIG51bGwpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX21pZ3JhdGVDYWxsYmFja0F0ID0gZnVuY3Rpb24gKGZvbGxvd2VyLCBpbmRleCkge1xuICAgIHZhciBmdWxmaWxsID0gZm9sbG93ZXIuX2Z1bGZpbGxtZW50SGFuZGxlckF0KGluZGV4KTtcbiAgICB2YXIgcmVqZWN0ID0gZm9sbG93ZXIuX3JlamVjdGlvbkhhbmRsZXJBdChpbmRleCk7XG4gICAgdmFyIHByb21pc2UgPSBmb2xsb3dlci5fcHJvbWlzZUF0KGluZGV4KTtcbiAgICB2YXIgcmVjZWl2ZXIgPSBmb2xsb3dlci5fcmVjZWl2ZXJBdChpbmRleCk7XG4gICAgaWYgKHJlY2VpdmVyID09PSB1bmRlZmluZWQpIHJlY2VpdmVyID0gVU5ERUZJTkVEX0JJTkRJTkc7XG4gICAgdGhpcy5fYWRkQ2FsbGJhY2tzKGZ1bGZpbGwsIHJlamVjdCwgcHJvbWlzZSwgcmVjZWl2ZXIsIG51bGwpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2FkZENhbGxiYWNrcyA9IGZ1bmN0aW9uIChcbiAgICBmdWxmaWxsLFxuICAgIHJlamVjdCxcbiAgICBwcm9taXNlLFxuICAgIHJlY2VpdmVyLFxuICAgIGRvbWFpblxuKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5fbGVuZ3RoKCk7XG5cbiAgICBpZiAoaW5kZXggPj0gNjU1MzUgLSA0KSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fc2V0TGVuZ3RoKDApO1xuICAgIH1cblxuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9wcm9taXNlMCA9IHByb21pc2U7XG4gICAgICAgIHRoaXMuX3JlY2VpdmVyMCA9IHJlY2VpdmVyO1xuICAgICAgICBpZiAodHlwZW9mIGZ1bGZpbGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMCA9XG4gICAgICAgICAgICAgICAgZG9tYWluID09PSBudWxsID8gZnVsZmlsbCA6IHV0aWwuZG9tYWluQmluZChkb21haW4sIGZ1bGZpbGwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmVqZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwID1cbiAgICAgICAgICAgICAgICBkb21haW4gPT09IG51bGwgPyByZWplY3QgOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGJhc2UgPSBpbmRleCAqIDQgLSA0O1xuICAgICAgICB0aGlzW2Jhc2UgKyAyXSA9IHByb21pc2U7XG4gICAgICAgIHRoaXNbYmFzZSArIDNdID0gcmVjZWl2ZXI7XG4gICAgICAgIGlmICh0eXBlb2YgZnVsZmlsbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzW2Jhc2UgKyAwXSA9XG4gICAgICAgICAgICAgICAgZG9tYWluID09PSBudWxsID8gZnVsZmlsbCA6IHV0aWwuZG9tYWluQmluZChkb21haW4sIGZ1bGZpbGwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmVqZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXNbYmFzZSArIDFdID1cbiAgICAgICAgICAgICAgICBkb21haW4gPT09IG51bGwgPyByZWplY3QgOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3NldExlbmd0aChpbmRleCArIDEpO1xuICAgIHJldHVybiBpbmRleDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9wcm94eSA9IGZ1bmN0aW9uIChwcm94eWFibGUsIGFyZykge1xuICAgIHRoaXMuX2FkZENhbGxiYWNrcyh1bmRlZmluZWQsIHVuZGVmaW5lZCwgYXJnLCBwcm94eWFibGUsIG51bGwpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Jlc29sdmVDYWxsYmFjayA9IGZ1bmN0aW9uKHZhbHVlLCBzaG91bGRCaW5kKSB7XG4gICAgaWYgKCgodGhpcy5fYml0RmllbGQgJiAxMTc1MDYwNDgpICE9PSAwKSkgcmV0dXJuO1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcylcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlamVjdENhbGxiYWNrKG1ha2VTZWxmUmVzb2x1dGlvbkVycm9yKCksIGZhbHNlKTtcbiAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZSh2YWx1ZSwgdGhpcyk7XG4gICAgaWYgKCEobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHJldHVybiB0aGlzLl9mdWxmaWxsKHZhbHVlKTtcblxuICAgIGlmIChzaG91bGRCaW5kKSB0aGlzLl9wcm9wYWdhdGVGcm9tKG1heWJlUHJvbWlzZSwgMik7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG1heWJlUHJvbWlzZS5fdGFyZ2V0KCk7XG5cbiAgICBpZiAocHJvbWlzZSA9PT0gdGhpcykge1xuICAgICAgICB0aGlzLl9yZWplY3QobWFrZVNlbGZSZXNvbHV0aW9uRXJyb3IoKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgYml0RmllbGQgPSBwcm9taXNlLl9iaXRGaWVsZDtcbiAgICBpZiAoKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuX2xlbmd0aCgpO1xuICAgICAgICBpZiAobGVuID4gMCkgcHJvbWlzZS5fbWlncmF0ZUNhbGxiYWNrMCh0aGlzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgcHJvbWlzZS5fbWlncmF0ZUNhbGxiYWNrQXQodGhpcywgaSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0Rm9sbG93aW5nKCk7XG4gICAgICAgIHRoaXMuX3NldExlbmd0aCgwKTtcbiAgICAgICAgdGhpcy5fc2V0Rm9sbG93ZWUocHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xuICAgICAgICB0aGlzLl9mdWxmaWxsKHByb21pc2UuX3ZhbHVlKCkpO1xuICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMCkpIHtcbiAgICAgICAgdGhpcy5fcmVqZWN0KHByb21pc2UuX3JlYXNvbigpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVhc29uID0gbmV3IENhbmNlbGxhdGlvbkVycm9yKFwibGF0ZSBjYW5jZWxsYXRpb24gb2JzZXJ2ZXJcIik7XG4gICAgICAgIHByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UocmVhc29uKTtcbiAgICAgICAgdGhpcy5fcmVqZWN0KHJlYXNvbik7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3JlamVjdENhbGxiYWNrID1cbmZ1bmN0aW9uKHJlYXNvbiwgc3luY2hyb25vdXMsIGlnbm9yZU5vbkVycm9yV2FybmluZ3MpIHtcbiAgICB2YXIgdHJhY2UgPSB1dGlsLmVuc3VyZUVycm9yT2JqZWN0KHJlYXNvbik7XG4gICAgdmFyIGhhc1N0YWNrID0gdHJhY2UgPT09IHJlYXNvbjtcbiAgICBpZiAoIWhhc1N0YWNrICYmICFpZ25vcmVOb25FcnJvcldhcm5pbmdzICYmIGRlYnVnLndhcm5pbmdzKCkpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcImEgcHJvbWlzZSB3YXMgcmVqZWN0ZWQgd2l0aCBhIG5vbi1lcnJvcjogXCIgK1xuICAgICAgICAgICAgdXRpbC5jbGFzc1N0cmluZyhyZWFzb24pO1xuICAgICAgICB0aGlzLl93YXJuKG1lc3NhZ2UsIHRydWUpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRhY2hFeHRyYVRyYWNlKHRyYWNlLCBzeW5jaHJvbm91cyA/IGhhc1N0YWNrIDogZmFsc2UpO1xuICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Jlc29sdmVGcm9tRXhlY3V0b3IgPSBmdW5jdGlvbiAoZXhlY3V0b3IpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgdGhpcy5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICB0aGlzLl9wdXNoQ29udGV4dCgpO1xuICAgIHZhciBzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgdmFyIHIgPSB0aGlzLl9leGVjdXRlKGV4ZWN1dG9yLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBwcm9taXNlLl9yZXNvbHZlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2socmVhc29uLCBzeW5jaHJvbm91cyk7XG4gICAgfSk7XG4gICAgc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICB0aGlzLl9wb3BDb250ZXh0KCk7XG5cbiAgICBpZiAociAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHIsIHRydWUpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXR0bGVQcm9taXNlRnJvbUhhbmRsZXIgPSBmdW5jdGlvbiAoXG4gICAgaGFuZGxlciwgcmVjZWl2ZXIsIHZhbHVlLCBwcm9taXNlXG4pIHtcbiAgICB2YXIgYml0RmllbGQgPSBwcm9taXNlLl9iaXRGaWVsZDtcbiAgICBpZiAoKChiaXRGaWVsZCAmIDY1NTM2KSAhPT0gMCkpIHJldHVybjtcbiAgICBwcm9taXNlLl9wdXNoQ29udGV4dCgpO1xuICAgIHZhciB4O1xuICAgIGlmIChyZWNlaXZlciA9PT0gQVBQTFkpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUubGVuZ3RoICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB4ID0gZXJyb3JPYmo7XG4gICAgICAgICAgICB4LmUgPSBuZXcgVHlwZUVycm9yKFwiY2Fubm90IC5zcHJlYWQoKSBhIG5vbi1hcnJheTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5jbGFzc1N0cmluZyh2YWx1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IHRyeUNhdGNoKGhhbmRsZXIpLmFwcGx5KHRoaXMuX2JvdW5kVmFsdWUoKSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IHRyeUNhdGNoKGhhbmRsZXIpLmNhbGwocmVjZWl2ZXIsIHZhbHVlKTtcbiAgICB9XG4gICAgdmFyIHByb21pc2VDcmVhdGVkID0gcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIGJpdEZpZWxkID0gcHJvbWlzZS5fYml0RmllbGQ7XG4gICAgaWYgKCgoYml0RmllbGQgJiA2NTUzNikgIT09IDApKSByZXR1cm47XG5cbiAgICBpZiAoeCA9PT0gTkVYVF9GSUxURVIpIHtcbiAgICAgICAgcHJvbWlzZS5fcmVqZWN0KHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHggPT09IGVycm9yT2JqKSB7XG4gICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHguZSwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnLmNoZWNrRm9yZ290dGVuUmV0dXJucyh4LCBwcm9taXNlQ3JlYXRlZCwgXCJcIiwgIHByb21pc2UsIHRoaXMpO1xuICAgICAgICBwcm9taXNlLl9yZXNvbHZlQ2FsbGJhY2soeCk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3RhcmdldCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXQgPSB0aGlzO1xuICAgIHdoaWxlIChyZXQuX2lzRm9sbG93aW5nKCkpIHJldCA9IHJldC5fZm9sbG93ZWUoKTtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2ZvbGxvd2VlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldEZvbGxvd2VlID0gZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgIHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwID0gcHJvbWlzZTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXR0bGVQcm9taXNlID0gZnVuY3Rpb24ocHJvbWlzZSwgaGFuZGxlciwgcmVjZWl2ZXIsIHZhbHVlKSB7XG4gICAgdmFyIGlzUHJvbWlzZSA9IHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlO1xuICAgIHZhciBiaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkO1xuICAgIHZhciBhc3luY0d1YXJhbnRlZWQgPSAoKGJpdEZpZWxkICYgMTM0MjE3NzI4KSAhPT0gMCk7XG4gICAgaWYgKCgoYml0RmllbGQgJiA2NTUzNikgIT09IDApKSB7XG4gICAgICAgIGlmIChpc1Byb21pc2UpIHByb21pc2UuX2ludm9rZUludGVybmFsT25DYW5jZWwoKTtcblxuICAgICAgICBpZiAocmVjZWl2ZXIgaW5zdGFuY2VvZiBQYXNzVGhyb3VnaEhhbmRsZXJDb250ZXh0ICYmXG4gICAgICAgICAgICByZWNlaXZlci5pc0ZpbmFsbHlIYW5kbGVyKCkpIHtcbiAgICAgICAgICAgIHJlY2VpdmVyLmNhbmNlbFByb21pc2UgPSBwcm9taXNlO1xuICAgICAgICAgICAgaWYgKHRyeUNhdGNoKGhhbmRsZXIpLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9yZWplY3QoZXJyb3JPYmouZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9PT0gcmVmbGVjdEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHByb21pc2UuX2Z1bGZpbGwocmVmbGVjdEhhbmRsZXIuY2FsbChyZWNlaXZlcikpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlY2VpdmVyIGluc3RhbmNlb2YgUHJveHlhYmxlKSB7XG4gICAgICAgICAgICByZWNlaXZlci5fcHJvbWlzZUNhbmNlbGxlZChwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1Byb21pc2UgfHwgcHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2VBcnJheSkge1xuICAgICAgICAgICAgcHJvbWlzZS5fY2FuY2VsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWNlaXZlci5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBpZiAoIWlzUHJvbWlzZSkge1xuICAgICAgICAgICAgaGFuZGxlci5jYWxsKHJlY2VpdmVyLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYXN5bmNHdWFyYW50ZWVkKSBwcm9taXNlLl9zZXRBc3luY0d1YXJhbnRlZWQoKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRsZVByb21pc2VGcm9tSGFuZGxlcihoYW5kbGVyLCByZWNlaXZlciwgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChyZWNlaXZlciBpbnN0YW5jZW9mIFByb3h5YWJsZSkge1xuICAgICAgICBpZiAoIXJlY2VpdmVyLl9pc1Jlc29sdmVkKCkpIHtcbiAgICAgICAgICAgIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyLl9wcm9taXNlRnVsZmlsbGVkKHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIuX3Byb21pc2VSZWplY3RlZCh2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzUHJvbWlzZSkge1xuICAgICAgICBpZiAoYXN5bmNHdWFyYW50ZWVkKSBwcm9taXNlLl9zZXRBc3luY0d1YXJhbnRlZWQoKTtcbiAgICAgICAgaWYgKCgoYml0RmllbGQgJiAzMzU1NDQzMikgIT09IDApKSB7XG4gICAgICAgICAgICBwcm9taXNlLl9mdWxmaWxsKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb21pc2UuX3JlamVjdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0dGxlUHJvbWlzZUxhdGVDYW5jZWxsYXRpb25PYnNlcnZlciA9IGZ1bmN0aW9uKGN0eCkge1xuICAgIHZhciBoYW5kbGVyID0gY3R4LmhhbmRsZXI7XG4gICAgdmFyIHByb21pc2UgPSBjdHgucHJvbWlzZTtcbiAgICB2YXIgcmVjZWl2ZXIgPSBjdHgucmVjZWl2ZXI7XG4gICAgdmFyIHZhbHVlID0gY3R4LnZhbHVlO1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGlmICghKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgICAgICAgaGFuZGxlci5jYWxsKHJlY2VpdmVyLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0bGVQcm9taXNlRnJvbUhhbmRsZXIoaGFuZGxlciwgcmVjZWl2ZXIsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcHJvbWlzZS5fcmVqZWN0KHZhbHVlKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0dGxlUHJvbWlzZUN0eCA9IGZ1bmN0aW9uKGN0eCkge1xuICAgIHRoaXMuX3NldHRsZVByb21pc2UoY3R4LnByb21pc2UsIGN0eC5oYW5kbGVyLCBjdHgucmVjZWl2ZXIsIGN0eC52YWx1ZSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0dGxlUHJvbWlzZTAgPSBmdW5jdGlvbihoYW5kbGVyLCB2YWx1ZSwgYml0RmllbGQpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UwO1xuICAgIHZhciByZWNlaXZlciA9IHRoaXMuX3JlY2VpdmVyQXQoMCk7XG4gICAgdGhpcy5fcHJvbWlzZTAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcmVjZWl2ZXIwID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3NldHRsZVByb21pc2UocHJvbWlzZSwgaGFuZGxlciwgcmVjZWl2ZXIsIHZhbHVlKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9jbGVhckNhbGxiYWNrRGF0YUF0SW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xuICAgIHZhciBiYXNlID0gaW5kZXggKiA0IC0gNDtcbiAgICB0aGlzW2Jhc2UgKyAyXSA9XG4gICAgdGhpc1tiYXNlICsgM10gPVxuICAgIHRoaXNbYmFzZSArIDBdID1cbiAgICB0aGlzW2Jhc2UgKyAxXSA9IHVuZGVmaW5lZDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9mdWxmaWxsID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIGJpdEZpZWxkID0gdGhpcy5fYml0RmllbGQ7XG4gICAgaWYgKCgoYml0RmllbGQgJiAxMTc1MDYwNDgpID4+PiAxNikpIHJldHVybjtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMpIHtcbiAgICAgICAgdmFyIGVyciA9IG1ha2VTZWxmUmVzb2x1dGlvbkVycm9yKCk7XG4gICAgICAgIHRoaXMuX2F0dGFjaEV4dHJhVHJhY2UoZXJyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlamVjdChlcnIpO1xuICAgIH1cbiAgICB0aGlzLl9zZXRGdWxmaWxsZWQoKTtcbiAgICB0aGlzLl9yZWplY3Rpb25IYW5kbGVyMCA9IHZhbHVlO1xuXG4gICAgaWYgKChiaXRGaWVsZCAmIDY1NTM1KSA+IDApIHtcbiAgICAgICAgaWYgKCgoYml0RmllbGQgJiAxMzQyMTc3MjgpICE9PSAwKSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGxlUHJvbWlzZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFzeW5jLnNldHRsZVByb21pc2VzKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3JlamVjdCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICB2YXIgYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZDtcbiAgICBpZiAoKChiaXRGaWVsZCAmIDExNzUwNjA0OCkgPj4+IDE2KSkgcmV0dXJuO1xuICAgIHRoaXMuX3NldFJlamVjdGVkKCk7XG4gICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMCA9IHJlYXNvbjtcblxuICAgIGlmICh0aGlzLl9pc0ZpbmFsKCkpIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLmZhdGFsRXJyb3IocmVhc29uLCB1dGlsLmlzTm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKChiaXRGaWVsZCAmIDY1NTM1KSA+IDApIHtcbiAgICAgICAgYXN5bmMuc2V0dGxlUHJvbWlzZXModGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlUG9zc2libGVSZWplY3Rpb25IYW5kbGVkKCk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2Z1bGZpbGxQcm9taXNlcyA9IGZ1bmN0aW9uIChsZW4sIHZhbHVlKSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlckF0KGkpO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2VBdChpKTtcbiAgICAgICAgdmFyIHJlY2VpdmVyID0gdGhpcy5fcmVjZWl2ZXJBdChpKTtcbiAgICAgICAgdGhpcy5fY2xlYXJDYWxsYmFja0RhdGFBdEluZGV4KGkpO1xuICAgICAgICB0aGlzLl9zZXR0bGVQcm9taXNlKHByb21pc2UsIGhhbmRsZXIsIHJlY2VpdmVyLCB2YWx1ZSk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3JlamVjdFByb21pc2VzID0gZnVuY3Rpb24gKGxlbiwgcmVhc29uKSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuX3JlamVjdGlvbkhhbmRsZXJBdChpKTtcbiAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLl9wcm9taXNlQXQoaSk7XG4gICAgICAgIHZhciByZWNlaXZlciA9IHRoaXMuX3JlY2VpdmVyQXQoaSk7XG4gICAgICAgIHRoaXMuX2NsZWFyQ2FsbGJhY2tEYXRhQXRJbmRleChpKTtcbiAgICAgICAgdGhpcy5fc2V0dGxlUHJvbWlzZShwcm9taXNlLCBoYW5kbGVyLCByZWNlaXZlciwgcmVhc29uKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0dGxlUHJvbWlzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJpdEZpZWxkID0gdGhpcy5fYml0RmllbGQ7XG4gICAgdmFyIGxlbiA9IChiaXRGaWVsZCAmIDY1NTM1KTtcblxuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIGlmICgoKGJpdEZpZWxkICYgMTY4NDI3NTIpICE9PSAwKSkge1xuICAgICAgICAgICAgdmFyIHJlYXNvbiA9IHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjA7XG4gICAgICAgICAgICB0aGlzLl9zZXR0bGVQcm9taXNlMCh0aGlzLl9yZWplY3Rpb25IYW5kbGVyMCwgcmVhc29uLCBiaXRGaWVsZCk7XG4gICAgICAgICAgICB0aGlzLl9yZWplY3RQcm9taXNlcyhsZW4sIHJlYXNvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLl9yZWplY3Rpb25IYW5kbGVyMDtcbiAgICAgICAgICAgIHRoaXMuX3NldHRsZVByb21pc2UwKHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjAsIHZhbHVlLCBiaXRGaWVsZCk7XG4gICAgICAgICAgICB0aGlzLl9mdWxmaWxsUHJvbWlzZXMobGVuLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0TGVuZ3RoKDApO1xuICAgIH1cbiAgICB0aGlzLl9jbGVhckNhbmNlbGxhdGlvbkRhdGEoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXR0bGVkVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZDtcbiAgICBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwO1xuICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjA7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZGVmZXJSZXNvbHZlKHYpIHt0aGlzLnByb21pc2UuX3Jlc29sdmVDYWxsYmFjayh2KTt9XG5mdW5jdGlvbiBkZWZlclJlamVjdCh2KSB7dGhpcy5wcm9taXNlLl9yZWplY3RDYWxsYmFjayh2LCBmYWxzZSk7fVxuXG5Qcm9taXNlLmRlZmVyID0gUHJvbWlzZS5wZW5kaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgZGVidWcuZGVwcmVjYXRlZChcIlByb21pc2UuZGVmZXJcIiwgXCJuZXcgUHJvbWlzZVwiKTtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBwcm9taXNlLFxuICAgICAgICByZXNvbHZlOiBkZWZlclJlc29sdmUsXG4gICAgICAgIHJlamVjdDogZGVmZXJSZWplY3RcbiAgICB9O1xufTtcblxudXRpbC5ub3RFbnVtZXJhYmxlUHJvcChQcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICAgICBcIl9tYWtlU2VsZlJlc29sdXRpb25FcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICBtYWtlU2VsZlJlc29sdXRpb25FcnJvcik7XG5cbl9kZXJlcV8oXCIuL21ldGhvZFwiKShQcm9taXNlLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSwgYXBpUmVqZWN0aW9uLFxuICAgIGRlYnVnKTtcbl9kZXJlcV8oXCIuL2JpbmRcIikoUHJvbWlzZSwgSU5URVJOQUwsIHRyeUNvbnZlcnRUb1Byb21pc2UsIGRlYnVnKTtcbl9kZXJlcV8oXCIuL2NhbmNlbFwiKShQcm9taXNlLCBQcm9taXNlQXJyYXksIGFwaVJlamVjdGlvbiwgZGVidWcpO1xuX2RlcmVxXyhcIi4vZGlyZWN0X3Jlc29sdmVcIikoUHJvbWlzZSk7XG5fZGVyZXFfKFwiLi9zeW5jaHJvbm91c19pbnNwZWN0aW9uXCIpKFByb21pc2UpO1xuX2RlcmVxXyhcIi4vam9pblwiKShcbiAgICBQcm9taXNlLCBQcm9taXNlQXJyYXksIHRyeUNvbnZlcnRUb1Byb21pc2UsIElOVEVSTkFMLCBhc3luYywgZ2V0RG9tYWluKTtcblByb21pc2UuUHJvbWlzZSA9IFByb21pc2U7XG5Qcm9taXNlLnZlcnNpb24gPSBcIjMuNC42XCI7XG5fZGVyZXFfKCcuL21hcC5qcycpKFByb21pc2UsIFByb21pc2VBcnJheSwgYXBpUmVqZWN0aW9uLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBJTlRFUk5BTCwgZGVidWcpO1xuX2RlcmVxXygnLi9jYWxsX2dldC5qcycpKFByb21pc2UpO1xuX2RlcmVxXygnLi91c2luZy5qcycpKFByb21pc2UsIGFwaVJlamVjdGlvbiwgdHJ5Q29udmVydFRvUHJvbWlzZSwgY3JlYXRlQ29udGV4dCwgSU5URVJOQUwsIGRlYnVnKTtcbl9kZXJlcV8oJy4vdGltZXJzLmpzJykoUHJvbWlzZSwgSU5URVJOQUwsIGRlYnVnKTtcbl9kZXJlcV8oJy4vZ2VuZXJhdG9ycy5qcycpKFByb21pc2UsIGFwaVJlamVjdGlvbiwgSU5URVJOQUwsIHRyeUNvbnZlcnRUb1Byb21pc2UsIFByb3h5YWJsZSwgZGVidWcpO1xuX2RlcmVxXygnLi9ub2RlaWZ5LmpzJykoUHJvbWlzZSk7XG5fZGVyZXFfKCcuL3Byb21pc2lmeS5qcycpKFByb21pc2UsIElOVEVSTkFMKTtcbl9kZXJlcV8oJy4vcHJvcHMuanMnKShQcm9taXNlLCBQcm9taXNlQXJyYXksIHRyeUNvbnZlcnRUb1Byb21pc2UsIGFwaVJlamVjdGlvbik7XG5fZGVyZXFfKCcuL3JhY2UuanMnKShQcm9taXNlLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSwgYXBpUmVqZWN0aW9uKTtcbl9kZXJlcV8oJy4vcmVkdWNlLmpzJykoUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBhcGlSZWplY3Rpb24sIHRyeUNvbnZlcnRUb1Byb21pc2UsIElOVEVSTkFMLCBkZWJ1Zyk7XG5fZGVyZXFfKCcuL3NldHRsZS5qcycpKFByb21pc2UsIFByb21pc2VBcnJheSwgZGVidWcpO1xuX2RlcmVxXygnLi9zb21lLmpzJykoUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBhcGlSZWplY3Rpb24pO1xuX2RlcmVxXygnLi9maWx0ZXIuanMnKShQcm9taXNlLCBJTlRFUk5BTCk7XG5fZGVyZXFfKCcuL2VhY2guanMnKShQcm9taXNlLCBJTlRFUk5BTCk7XG5fZGVyZXFfKCcuL2FueS5qcycpKFByb21pc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgdXRpbC50b0Zhc3RQcm9wZXJ0aWVzKFByb21pc2UpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHV0aWwudG9GYXN0UHJvcGVydGllcyhQcm9taXNlLnByb3RvdHlwZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBmdW5jdGlvbiBmaWxsVHlwZXModmFsdWUpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIHZhciBwID0gbmV3IFByb21pc2UoSU5URVJOQUwpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBwLl9mdWxmaWxsbWVudEhhbmRsZXIwID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgcC5fcmVqZWN0aW9uSGFuZGxlcjAgPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIHAuX3Byb21pc2UwID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBwLl9yZWNlaXZlcjAgPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgLy8gQ29tcGxldGUgc2xhY2sgdHJhY2tpbmcsIG9wdCBvdXQgb2YgZmllbGQtdHlwZSB0cmFja2luZyBhbmQgICAgICAgICAgIFxuICAgIC8vIHN0YWJpbGl6ZSBtYXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBmaWxsVHlwZXMoe2E6IDF9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgZmlsbFR5cGVzKHtiOiAyfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGZpbGxUeXBlcyh7YzogM30pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBmaWxsVHlwZXMoMSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgZmlsbFR5cGVzKGZ1bmN0aW9uKCl7fSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGZpbGxUeXBlcyh1bmRlZmluZWQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBmaWxsVHlwZXMoZmFsc2UpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgZmlsbFR5cGVzKG5ldyBQcm9taXNlKElOVEVSTkFMKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGRlYnVnLnNldEJvdW5kcyhBc3luYy5maXJzdExpbmVFcnJvciwgdXRpbC5sYXN0TGluZUVycm9yKTsgICAgICAgICAgICAgICBcbiAgICByZXR1cm4gUHJvbWlzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbn07XG5cbn0se1wiLi9hbnkuanNcIjoxLFwiLi9hc3luY1wiOjIsXCIuL2JpbmRcIjozLFwiLi9jYWxsX2dldC5qc1wiOjUsXCIuL2NhbmNlbFwiOjYsXCIuL2NhdGNoX2ZpbHRlclwiOjcsXCIuL2NvbnRleHRcIjo4LFwiLi9kZWJ1Z2dhYmlsaXR5XCI6OSxcIi4vZGlyZWN0X3Jlc29sdmVcIjoxMCxcIi4vZWFjaC5qc1wiOjExLFwiLi9lcnJvcnNcIjoxMixcIi4vZXM1XCI6MTMsXCIuL2ZpbHRlci5qc1wiOjE0LFwiLi9maW5hbGx5XCI6MTUsXCIuL2dlbmVyYXRvcnMuanNcIjoxNixcIi4vam9pblwiOjE3LFwiLi9tYXAuanNcIjoxOCxcIi4vbWV0aG9kXCI6MTksXCIuL25vZGViYWNrXCI6MjAsXCIuL25vZGVpZnkuanNcIjoyMSxcIi4vcHJvbWlzZV9hcnJheVwiOjIzLFwiLi9wcm9taXNpZnkuanNcIjoyNCxcIi4vcHJvcHMuanNcIjoyNSxcIi4vcmFjZS5qc1wiOjI3LFwiLi9yZWR1Y2UuanNcIjoyOCxcIi4vc2V0dGxlLmpzXCI6MzAsXCIuL3NvbWUuanNcIjozMSxcIi4vc3luY2hyb25vdXNfaW5zcGVjdGlvblwiOjMyLFwiLi90aGVuYWJsZXNcIjozMyxcIi4vdGltZXJzLmpzXCI6MzQsXCIuL3VzaW5nLmpzXCI6MzUsXCIuL3V0aWxcIjozNn1dLDIzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSxcbiAgICBhcGlSZWplY3Rpb24sIFByb3h5YWJsZSkge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGlzQXJyYXkgPSB1dGlsLmlzQXJyYXk7XG5cbmZ1bmN0aW9uIHRvUmVzb2x1dGlvblZhbHVlKHZhbCkge1xuICAgIHN3aXRjaCh2YWwpIHtcbiAgICBjYXNlIC0yOiByZXR1cm4gW107XG4gICAgY2FzZSAtMzogcmV0dXJuIHt9O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gUHJvbWlzZUFycmF5KHZhbHVlcykge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICBpZiAodmFsdWVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlLl9wcm9wYWdhdGVGcm9tKHZhbHVlcywgMyk7XG4gICAgfVxuICAgIHByb21pc2UuX3NldE9uQ2FuY2VsKHRoaXMpO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLl9sZW5ndGggPSAwO1xuICAgIHRoaXMuX3RvdGFsUmVzb2x2ZWQgPSAwO1xuICAgIHRoaXMuX2luaXQodW5kZWZpbmVkLCAtMik7XG59XG51dGlsLmluaGVyaXRzKFByb21pc2VBcnJheSwgUHJveHlhYmxlKTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUucHJvbWlzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiBpbml0KF8sIHJlc29sdmVWYWx1ZUlmRW1wdHkpIHtcbiAgICB2YXIgdmFsdWVzID0gdHJ5Q29udmVydFRvUHJvbWlzZSh0aGlzLl92YWx1ZXMsIHRoaXMuX3Byb21pc2UpO1xuICAgIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHZhbHVlcyA9IHZhbHVlcy5fdGFyZ2V0KCk7XG4gICAgICAgIHZhciBiaXRGaWVsZCA9IHZhbHVlcy5fYml0RmllbGQ7XG4gICAgICAgIDtcbiAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuXG4gICAgICAgIGlmICgoKGJpdEZpZWxkICYgNTAzOTcxODQpID09PSAwKSkge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZS5fc2V0QXN5bmNHdWFyYW50ZWVkKCk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzLl90aGVuKFxuICAgICAgICAgICAgICAgIGluaXQsXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVqZWN0LFxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIHJlc29sdmVWYWx1ZUlmRW1wdHlcbiAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLl92YWx1ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVqZWN0KHZhbHVlcy5fcmVhc29uKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbmNlbCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhbHVlcyA9IHV0aWwuYXNBcnJheSh2YWx1ZXMpO1xuICAgIGlmICh2YWx1ZXMgPT09IG51bGwpIHtcbiAgICAgICAgdmFyIGVyciA9IGFwaVJlamVjdGlvbihcbiAgICAgICAgICAgIFwiZXhwZWN0aW5nIGFuIGFycmF5IG9yIGFuIGl0ZXJhYmxlIG9iamVjdCBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyh2YWx1ZXMpKS5yZWFzb24oKTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2soZXJyLCBmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAocmVzb2x2ZVZhbHVlSWZFbXB0eSA9PT0gLTUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmVFbXB0eUFycmF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHRvUmVzb2x1dGlvblZhbHVlKHJlc29sdmVWYWx1ZUlmRW1wdHkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2l0ZXJhdGUodmFsdWVzKTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX2l0ZXJhdGUgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICB2YXIgbGVuID0gdGhpcy5nZXRBY3R1YWxMZW5ndGgodmFsdWVzLmxlbmd0aCk7XG4gICAgdGhpcy5fbGVuZ3RoID0gbGVuO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHRoaXMuc2hvdWxkQ29weVZhbHVlcygpID8gbmV3IEFycmF5KGxlbikgOiB0aGlzLl92YWx1ZXM7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX3Byb21pc2U7XG4gICAgdmFyIGlzUmVzb2x2ZWQgPSBmYWxzZTtcbiAgICB2YXIgYml0RmllbGQgPSBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodmFsdWVzW2ldLCByZXN1bHQpO1xuXG4gICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICBtYXliZVByb21pc2UgPSBtYXliZVByb21pc2UuX3RhcmdldCgpO1xuICAgICAgICAgICAgYml0RmllbGQgPSBtYXliZVByb21pc2UuX2JpdEZpZWxkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYml0RmllbGQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUmVzb2x2ZWQpIHtcbiAgICAgICAgICAgIGlmIChiaXRGaWVsZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5zdXBwcmVzc1VuaGFuZGxlZFJlamVjdGlvbnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChiaXRGaWVsZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XG4gICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl9wcm94eSh0aGlzLCBpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbaV0gPSBtYXliZVByb21pc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAzMzU1NDQzMikgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgaXNSZXNvbHZlZCA9IHRoaXMuX3Byb21pc2VGdWxmaWxsZWQobWF5YmVQcm9taXNlLl92YWx1ZSgpLCBpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICBpc1Jlc29sdmVkID0gdGhpcy5fcHJvbWlzZVJlamVjdGVkKG1heWJlUHJvbWlzZS5fcmVhc29uKCksIGkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpc1Jlc29sdmVkID0gdGhpcy5fcHJvbWlzZUNhbmNlbGxlZChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzUmVzb2x2ZWQgPSB0aGlzLl9wcm9taXNlRnVsZmlsbGVkKG1heWJlUHJvbWlzZSwgaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpc1Jlc29sdmVkKSByZXN1bHQuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5faXNSZXNvbHZlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzID09PSBudWxsO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlcyA9IG51bGw7XG4gICAgdGhpcy5fcHJvbWlzZS5fZnVsZmlsbCh2YWx1ZSk7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpIHx8ICF0aGlzLl9wcm9taXNlLl9pc0NhbmNlbGxhYmxlKCkpIHJldHVybjtcbiAgICB0aGlzLl92YWx1ZXMgPSBudWxsO1xuICAgIHRoaXMuX3Byb21pc2UuX2NhbmNlbCgpO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHRoaXMuX3ZhbHVlcyA9IG51bGw7XG4gICAgdGhpcy5fcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2socmVhc29uLCBmYWxzZSk7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlRnVsZmlsbGVkID0gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xuICAgIHRoaXMuX3ZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICB2YXIgdG90YWxSZXNvbHZlZCA9ICsrdGhpcy5fdG90YWxSZXNvbHZlZDtcbiAgICBpZiAodG90YWxSZXNvbHZlZCA+PSB0aGlzLl9sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZSh0aGlzLl92YWx1ZXMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUNhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2NhbmNlbCgpO1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZVJlamVjdGVkID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHRoaXMuX3RvdGFsUmVzb2x2ZWQrKztcbiAgICB0aGlzLl9yZWplY3QocmVhc29uKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc3VsdENhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcbiAgICB2YXIgdmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuICAgIHRoaXMuX2NhbmNlbCgpO1xuICAgIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHZhbHVlcy5jYW5jZWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlc1tpXSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbaV0uY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLnNob3VsZENvcHlWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLmdldEFjdHVhbExlbmd0aCA9IGZ1bmN0aW9uIChsZW4pIHtcbiAgICByZXR1cm4gbGVuO1xufTtcblxucmV0dXJuIFByb21pc2VBcnJheTtcbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwyNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwpIHtcbnZhciBUSElTID0ge307XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgbm9kZWJhY2tGb3JQcm9taXNlID0gX2RlcmVxXyhcIi4vbm9kZWJhY2tcIik7XG52YXIgd2l0aEFwcGVuZGVkID0gdXRpbC53aXRoQXBwZW5kZWQ7XG52YXIgbWF5YmVXcmFwQXNFcnJvciA9IHV0aWwubWF5YmVXcmFwQXNFcnJvcjtcbnZhciBjYW5FdmFsdWF0ZSA9IHV0aWwuY2FuRXZhbHVhdGU7XG52YXIgVHlwZUVycm9yID0gX2RlcmVxXyhcIi4vZXJyb3JzXCIpLlR5cGVFcnJvcjtcbnZhciBkZWZhdWx0U3VmZml4ID0gXCJBc3luY1wiO1xudmFyIGRlZmF1bHRQcm9taXNpZmllZCA9IHtfX2lzUHJvbWlzaWZpZWRfXzogdHJ1ZX07XG52YXIgbm9Db3B5UHJvcHMgPSBbXG4gICAgXCJhcml0eVwiLCAgICBcImxlbmd0aFwiLFxuICAgIFwibmFtZVwiLFxuICAgIFwiYXJndW1lbnRzXCIsXG4gICAgXCJjYWxsZXJcIixcbiAgICBcImNhbGxlZVwiLFxuICAgIFwicHJvdG90eXBlXCIsXG4gICAgXCJfX2lzUHJvbWlzaWZpZWRfX1wiXG5dO1xudmFyIG5vQ29weVByb3BzUGF0dGVybiA9IG5ldyBSZWdFeHAoXCJeKD86XCIgKyBub0NvcHlQcm9wcy5qb2luKFwifFwiKSArIFwiKSRcIik7XG5cbnZhciBkZWZhdWx0RmlsdGVyID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB1dGlsLmlzSWRlbnRpZmllcihuYW1lKSAmJlxuICAgICAgICBuYW1lLmNoYXJBdCgwKSAhPT0gXCJfXCIgJiZcbiAgICAgICAgbmFtZSAhPT0gXCJjb25zdHJ1Y3RvclwiO1xufTtcblxuZnVuY3Rpb24gcHJvcHNGaWx0ZXIoa2V5KSB7XG4gICAgcmV0dXJuICFub0NvcHlQcm9wc1BhdHRlcm4udGVzdChrZXkpO1xufVxuXG5mdW5jdGlvbiBpc1Byb21pc2lmaWVkKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZuLl9faXNQcm9taXNpZmllZF9fID09PSB0cnVlO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYXNQcm9taXNpZmllZChvYmosIGtleSwgc3VmZml4KSB7XG4gICAgdmFyIHZhbCA9IHV0aWwuZ2V0RGF0YVByb3BlcnR5T3JEZWZhdWx0KG9iaiwga2V5ICsgc3VmZml4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvbWlzaWZpZWQpO1xuICAgIHJldHVybiB2YWwgPyBpc1Byb21pc2lmaWVkKHZhbCkgOiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGNoZWNrVmFsaWQocmV0LCBzdWZmaXgsIHN1ZmZpeFJlZ2V4cCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHZhciBrZXkgPSByZXRbaV07XG4gICAgICAgIGlmIChzdWZmaXhSZWdleHAudGVzdChrZXkpKSB7XG4gICAgICAgICAgICB2YXIga2V5V2l0aG91dEFzeW5jU3VmZml4ID0ga2V5LnJlcGxhY2Uoc3VmZml4UmVnZXhwLCBcIlwiKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmV0Lmxlbmd0aDsgaiArPSAyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldFtqXSA9PT0ga2V5V2l0aG91dEFzeW5jU3VmZml4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcHJvbWlzaWZ5IGFuIEFQSSB0aGF0IGhhcyBub3JtYWwgbWV0aG9kcyB3aXRoICclcyctc3VmZml4XFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcIiVzXCIsIHN1ZmZpeCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcHJvbWlzaWZpYWJsZU1ldGhvZHMob2JqLCBzdWZmaXgsIHN1ZmZpeFJlZ2V4cCwgZmlsdGVyKSB7XG4gICAgdmFyIGtleXMgPSB1dGlsLmluaGVyaXRlZERhdGFLZXlzKG9iaik7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gICAgICAgIHZhciBwYXNzZXNEZWZhdWx0RmlsdGVyID0gZmlsdGVyID09PSBkZWZhdWx0RmlsdGVyXG4gICAgICAgICAgICA/IHRydWUgOiBkZWZhdWx0RmlsdGVyKGtleSwgdmFsdWUsIG9iaik7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgIWlzUHJvbWlzaWZpZWQodmFsdWUpICYmXG4gICAgICAgICAgICAhaGFzUHJvbWlzaWZpZWQob2JqLCBrZXksIHN1ZmZpeCkgJiZcbiAgICAgICAgICAgIGZpbHRlcihrZXksIHZhbHVlLCBvYmosIHBhc3Nlc0RlZmF1bHRGaWx0ZXIpKSB7XG4gICAgICAgICAgICByZXQucHVzaChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja1ZhbGlkKHJldCwgc3VmZml4LCBzdWZmaXhSZWdleHApO1xuICAgIHJldHVybiByZXQ7XG59XG5cbnZhciBlc2NhcGVJZGVudFJlZ2V4ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWyRdKS8sIFwiXFxcXCRcIik7XG59O1xuXG52YXIgbWFrZU5vZGVQcm9taXNpZmllZEV2YWw7XG5pZiAoIXRydWUpIHtcbnZhciBzd2l0Y2hDYXNlQXJndW1lbnRPcmRlciA9IGZ1bmN0aW9uKGxpa2VseUFyZ3VtZW50Q291bnQpIHtcbiAgICB2YXIgcmV0ID0gW2xpa2VseUFyZ3VtZW50Q291bnRdO1xuICAgIHZhciBtaW4gPSBNYXRoLm1heCgwLCBsaWtlbHlBcmd1bWVudENvdW50IC0gMSAtIDMpO1xuICAgIGZvcih2YXIgaSA9IGxpa2VseUFyZ3VtZW50Q291bnQgLSAxOyBpID49IG1pbjsgLS1pKSB7XG4gICAgICAgIHJldC5wdXNoKGkpO1xuICAgIH1cbiAgICBmb3IodmFyIGkgPSBsaWtlbHlBcmd1bWVudENvdW50ICsgMTsgaSA8PSAzOyArK2kpIHtcbiAgICAgICAgcmV0LnB1c2goaSk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG52YXIgYXJndW1lbnRTZXF1ZW5jZSA9IGZ1bmN0aW9uKGFyZ3VtZW50Q291bnQpIHtcbiAgICByZXR1cm4gdXRpbC5maWxsZWRSYW5nZShhcmd1bWVudENvdW50LCBcIl9hcmdcIiwgXCJcIik7XG59O1xuXG52YXIgcGFyYW1ldGVyRGVjbGFyYXRpb24gPSBmdW5jdGlvbihwYXJhbWV0ZXJDb3VudCkge1xuICAgIHJldHVybiB1dGlsLmZpbGxlZFJhbmdlKFxuICAgICAgICBNYXRoLm1heChwYXJhbWV0ZXJDb3VudCwgMyksIFwiX2FyZ1wiLCBcIlwiKTtcbn07XG5cbnZhciBwYXJhbWV0ZXJDb3VudCA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgaWYgKHR5cGVvZiBmbi5sZW5ndGggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGZuLmxlbmd0aCwgMTAyMyArIDEpLCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG59O1xuXG5tYWtlTm9kZVByb21pc2lmaWVkRXZhbCA9XG5mdW5jdGlvbihjYWxsYmFjaywgcmVjZWl2ZXIsIG9yaWdpbmFsTmFtZSwgZm4sIF8sIG11bHRpQXJncykge1xuICAgIHZhciBuZXdQYXJhbWV0ZXJDb3VudCA9IE1hdGgubWF4KDAsIHBhcmFtZXRlckNvdW50KGZuKSAtIDEpO1xuICAgIHZhciBhcmd1bWVudE9yZGVyID0gc3dpdGNoQ2FzZUFyZ3VtZW50T3JkZXIobmV3UGFyYW1ldGVyQ291bnQpO1xuICAgIHZhciBzaG91bGRQcm94eVRoaXMgPSB0eXBlb2YgY2FsbGJhY2sgPT09IFwic3RyaW5nXCIgfHwgcmVjZWl2ZXIgPT09IFRISVM7XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUNhbGxGb3JBcmd1bWVudENvdW50KGNvdW50KSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRTZXF1ZW5jZShjb3VudCkuam9pbihcIiwgXCIpO1xuICAgICAgICB2YXIgY29tbWEgPSBjb3VudCA+IDAgPyBcIiwgXCIgOiBcIlwiO1xuICAgICAgICB2YXIgcmV0O1xuICAgICAgICBpZiAoc2hvdWxkUHJveHlUaGlzKSB7XG4gICAgICAgICAgICByZXQgPSBcInJldCA9IGNhbGxiYWNrLmNhbGwodGhpcywge3thcmdzfX0sIG5vZGViYWNrKTsgYnJlYWs7XFxuXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXQgPSByZWNlaXZlciA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyBcInJldCA9IGNhbGxiYWNrKHt7YXJnc319LCBub2RlYmFjayk7IGJyZWFrO1xcblwiXG4gICAgICAgICAgICAgICAgOiBcInJldCA9IGNhbGxiYWNrLmNhbGwocmVjZWl2ZXIsIHt7YXJnc319LCBub2RlYmFjayk7IGJyZWFrO1xcblwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQucmVwbGFjZShcInt7YXJnc319XCIsIGFyZ3MpLnJlcGxhY2UoXCIsIFwiLCBjb21tYSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVBcmd1bWVudFN3aXRjaENhc2UoKSB7XG4gICAgICAgIHZhciByZXQgPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50T3JkZXIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHJldCArPSBcImNhc2UgXCIgKyBhcmd1bWVudE9yZGVyW2ldICtcIjpcIiArXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVDYWxsRm9yQXJndW1lbnRDb3VudChhcmd1bWVudE9yZGVyW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldCArPSBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICBkZWZhdWx0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobGVuICsgMSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgdmFyIGkgPSAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgYXJnc1tpXSA9IG5vZGViYWNrOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgW0NvZGVGb3JDYWxsXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICBcIi5yZXBsYWNlKFwiW0NvZGVGb3JDYWxsXVwiLCAoc2hvdWxkUHJveHlUaGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJyZXQgPSBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwicmV0ID0gY2FsbGJhY2suYXBwbHkocmVjZWl2ZXIsIGFyZ3MpO1xcblwiKSk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgdmFyIGdldEZ1bmN0aW9uQ29kZSA9IHR5cGVvZiBjYWxsYmFjayA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChcInRoaXMgIT0gbnVsbCA/IHRoaXNbJ1wiK2NhbGxiYWNrK1wiJ10gOiBmblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiZm5cIjtcbiAgICB2YXIgYm9keSA9IFwiJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIHZhciByZXQgPSBmdW5jdGlvbiAoUGFyYW1ldGVycykgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBwcm9taXNlLl9jYXB0dXJlU3RhY2tUcmFjZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB2YXIgbm9kZWJhY2sgPSBub2RlYmFja0ZvclByb21pc2UocHJvbWlzZSwgXCIgKyBtdWx0aUFyZ3MgKyBcIik7ICAgXFxuXFxcbiAgICAgICAgICAgIHZhciByZXQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHRyeUNhdGNoKFtHZXRGdW5jdGlvbkNvZGVdKTsgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHN3aXRjaChsZW4pIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBbQ29kZUZvclN3aXRjaENhc2VdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGlmIChyZXQgPT09IGVycm9yT2JqKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9yZWplY3RDYWxsYmFjayhtYXliZVdyYXBBc0Vycm9yKHJldC5lKSwgdHJ1ZSwgdHJ1ZSk7XFxuXFxcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGlmICghcHJvbWlzZS5faXNGYXRlU2VhbGVkKCkpIHByb21pc2UuX3NldEFzeW5jR3VhcmFudGVlZCgpOyAgICAgXFxuXFxcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AocmV0LCAnX19pc1Byb21pc2lmaWVkX18nLCB0cnVlKTsgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgcmV0dXJuIHJldDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICBcIi5yZXBsYWNlKFwiW0NvZGVGb3JTd2l0Y2hDYXNlXVwiLCBnZW5lcmF0ZUFyZ3VtZW50U3dpdGNoQ2FzZSgpKVxuICAgICAgICAucmVwbGFjZShcIltHZXRGdW5jdGlvbkNvZGVdXCIsIGdldEZ1bmN0aW9uQ29kZSk7XG4gICAgYm9keSA9IGJvZHkucmVwbGFjZShcIlBhcmFtZXRlcnNcIiwgcGFyYW1ldGVyRGVjbGFyYXRpb24obmV3UGFyYW1ldGVyQ291bnQpKTtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiUHJvbWlzZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWNlaXZlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aXRoQXBwZW5kZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF5YmVXcmFwQXNFcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub2RlYmFja0ZvclByb21pc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHJ5Q2F0Y2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3JPYmpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90RW51bWVyYWJsZVByb3BcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSU5URVJOQUxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkpKFxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICBmbixcbiAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZXIsXG4gICAgICAgICAgICAgICAgICAgIHdpdGhBcHBlbmRlZCxcbiAgICAgICAgICAgICAgICAgICAgbWF5YmVXcmFwQXNFcnJvcixcbiAgICAgICAgICAgICAgICAgICAgbm9kZWJhY2tGb3JQcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICB1dGlsLnRyeUNhdGNoLFxuICAgICAgICAgICAgICAgICAgICB1dGlsLmVycm9yT2JqLFxuICAgICAgICAgICAgICAgICAgICB1dGlsLm5vdEVudW1lcmFibGVQcm9wLFxuICAgICAgICAgICAgICAgICAgICBJTlRFUk5BTCk7XG59O1xufVxuXG5mdW5jdGlvbiBtYWtlTm9kZVByb21pc2lmaWVkQ2xvc3VyZShjYWxsYmFjaywgcmVjZWl2ZXIsIF8sIGZuLCBfXywgbXVsdGlBcmdzKSB7XG4gICAgdmFyIGRlZmF1bHRUaGlzID0gKGZ1bmN0aW9uKCkge3JldHVybiB0aGlzO30pKCk7XG4gICAgdmFyIG1ldGhvZCA9IGNhbGxiYWNrO1xuICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gZm47XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb21pc2lmaWVkKCkge1xuICAgICAgICB2YXIgX3JlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgICAgIGlmIChyZWNlaXZlciA9PT0gVEhJUykgX3JlY2VpdmVyID0gdGhpcztcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIHByb21pc2UuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgICAgIHZhciBjYiA9IHR5cGVvZiBtZXRob2QgPT09IFwic3RyaW5nXCIgJiYgdGhpcyAhPT0gZGVmYXVsdFRoaXNcbiAgICAgICAgICAgID8gdGhpc1ttZXRob2RdIDogY2FsbGJhY2s7XG4gICAgICAgIHZhciBmbiA9IG5vZGViYWNrRm9yUHJvbWlzZShwcm9taXNlLCBtdWx0aUFyZ3MpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2IuYXBwbHkoX3JlY2VpdmVyLCB3aXRoQXBwZW5kZWQoYXJndW1lbnRzLCBmbikpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKG1heWJlV3JhcEFzRXJyb3IoZSksIHRydWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcHJvbWlzZS5faXNGYXRlU2VhbGVkKCkpIHByb21pc2UuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcChwcm9taXNpZmllZCwgXCJfX2lzUHJvbWlzaWZpZWRfX1wiLCB0cnVlKTtcbiAgICByZXR1cm4gcHJvbWlzaWZpZWQ7XG59XG5cbnZhciBtYWtlTm9kZVByb21pc2lmaWVkID0gY2FuRXZhbHVhdGVcbiAgICA/IG1ha2VOb2RlUHJvbWlzaWZpZWRFdmFsXG4gICAgOiBtYWtlTm9kZVByb21pc2lmaWVkQ2xvc3VyZTtcblxuZnVuY3Rpb24gcHJvbWlzaWZ5QWxsKG9iaiwgc3VmZml4LCBmaWx0ZXIsIHByb21pc2lmaWVyLCBtdWx0aUFyZ3MpIHtcbiAgICB2YXIgc3VmZml4UmVnZXhwID0gbmV3IFJlZ0V4cChlc2NhcGVJZGVudFJlZ2V4KHN1ZmZpeCkgKyBcIiRcIik7XG4gICAgdmFyIG1ldGhvZHMgPVxuICAgICAgICBwcm9taXNpZmlhYmxlTWV0aG9kcyhvYmosIHN1ZmZpeCwgc3VmZml4UmVnZXhwLCBmaWx0ZXIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1ldGhvZHMubGVuZ3RoOyBpIDwgbGVuOyBpKz0gMikge1xuICAgICAgICB2YXIga2V5ID0gbWV0aG9kc1tpXTtcbiAgICAgICAgdmFyIGZuID0gbWV0aG9kc1tpKzFdO1xuICAgICAgICB2YXIgcHJvbWlzaWZpZWRLZXkgPSBrZXkgKyBzdWZmaXg7XG4gICAgICAgIGlmIChwcm9taXNpZmllciA9PT0gbWFrZU5vZGVQcm9taXNpZmllZCkge1xuICAgICAgICAgICAgb2JqW3Byb21pc2lmaWVkS2V5XSA9XG4gICAgICAgICAgICAgICAgbWFrZU5vZGVQcm9taXNpZmllZChrZXksIFRISVMsIGtleSwgZm4sIHN1ZmZpeCwgbXVsdGlBcmdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNpZmllZCA9IHByb21pc2lmaWVyKGZuLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFrZU5vZGVQcm9taXNpZmllZChrZXksIFRISVMsIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbiwgc3VmZml4LCBtdWx0aUFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1dGlsLm5vdEVudW1lcmFibGVQcm9wKHByb21pc2lmaWVkLCBcIl9faXNQcm9taXNpZmllZF9fXCIsIHRydWUpO1xuICAgICAgICAgICAgb2JqW3Byb21pc2lmaWVkS2V5XSA9IHByb21pc2lmaWVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHV0aWwudG9GYXN0UHJvcGVydGllcyhvYmopO1xuICAgIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIHByb21pc2lmeShjYWxsYmFjaywgcmVjZWl2ZXIsIG11bHRpQXJncykge1xuICAgIHJldHVybiBtYWtlTm9kZVByb21pc2lmaWVkKGNhbGxiYWNrLCByZWNlaXZlciwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaywgbnVsbCwgbXVsdGlBcmdzKTtcbn1cblxuUHJvbWlzZS5wcm9taXNpZnkgPSBmdW5jdGlvbiAoZm4sIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XG4gICAgfVxuICAgIGlmIChpc1Byb21pc2lmaWVkKGZuKSkge1xuICAgICAgICByZXR1cm4gZm47XG4gICAgfVxuICAgIG9wdGlvbnMgPSBPYmplY3Qob3B0aW9ucyk7XG4gICAgdmFyIHJlY2VpdmVyID0gb3B0aW9ucy5jb250ZXh0ID09PSB1bmRlZmluZWQgPyBUSElTIDogb3B0aW9ucy5jb250ZXh0O1xuICAgIHZhciBtdWx0aUFyZ3MgPSAhIW9wdGlvbnMubXVsdGlBcmdzO1xuICAgIHZhciByZXQgPSBwcm9taXNpZnkoZm4sIHJlY2VpdmVyLCBtdWx0aUFyZ3MpO1xuICAgIHV0aWwuY29weURlc2NyaXB0b3JzKGZuLCByZXQsIHByb3BzRmlsdGVyKTtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuUHJvbWlzZS5wcm9taXNpZnlBbGwgPSBmdW5jdGlvbiAodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0aGUgdGFyZ2V0IG9mIHByb21pc2lmeUFsbCBtdXN0IGJlIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICB9XG4gICAgb3B0aW9ucyA9IE9iamVjdChvcHRpb25zKTtcbiAgICB2YXIgbXVsdGlBcmdzID0gISFvcHRpb25zLm11bHRpQXJncztcbiAgICB2YXIgc3VmZml4ID0gb3B0aW9ucy5zdWZmaXg7XG4gICAgaWYgKHR5cGVvZiBzdWZmaXggIT09IFwic3RyaW5nXCIpIHN1ZmZpeCA9IGRlZmF1bHRTdWZmaXg7XG4gICAgdmFyIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSBcImZ1bmN0aW9uXCIpIGZpbHRlciA9IGRlZmF1bHRGaWx0ZXI7XG4gICAgdmFyIHByb21pc2lmaWVyID0gb3B0aW9ucy5wcm9taXNpZmllcjtcbiAgICBpZiAodHlwZW9mIHByb21pc2lmaWVyICE9PSBcImZ1bmN0aW9uXCIpIHByb21pc2lmaWVyID0gbWFrZU5vZGVQcm9taXNpZmllZDtcblxuICAgIGlmICghdXRpbC5pc0lkZW50aWZpZXIoc3VmZml4KSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcInN1ZmZpeCBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSB1dGlsLmluaGVyaXRlZERhdGFLZXlzKHRhcmdldCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRhcmdldFtrZXlzW2ldXTtcbiAgICAgICAgaWYgKGtleXNbaV0gIT09IFwiY29uc3RydWN0b3JcIiAmJlxuICAgICAgICAgICAgdXRpbC5pc0NsYXNzKHZhbHVlKSkge1xuICAgICAgICAgICAgcHJvbWlzaWZ5QWxsKHZhbHVlLnByb3RvdHlwZSwgc3VmZml4LCBmaWx0ZXIsIHByb21pc2lmaWVyLFxuICAgICAgICAgICAgICAgIG11bHRpQXJncyk7XG4gICAgICAgICAgICBwcm9taXNpZnlBbGwodmFsdWUsIHN1ZmZpeCwgZmlsdGVyLCBwcm9taXNpZmllciwgbXVsdGlBcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNpZnlBbGwodGFyZ2V0LCBzdWZmaXgsIGZpbHRlciwgcHJvbWlzaWZpZXIsIG11bHRpQXJncyk7XG59O1xufTtcblxuXG59LHtcIi4vZXJyb3JzXCI6MTIsXCIuL25vZGViYWNrXCI6MjAsXCIuL3V0aWxcIjozNn1dLDI1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihcbiAgICBQcm9taXNlLCBQcm9taXNlQXJyYXksIHRyeUNvbnZlcnRUb1Byb21pc2UsIGFwaVJlamVjdGlvbikge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGlzT2JqZWN0ID0gdXRpbC5pc09iamVjdDtcbnZhciBlczUgPSBfZGVyZXFfKFwiLi9lczVcIik7XG52YXIgRXM2TWFwO1xuaWYgKHR5cGVvZiBNYXAgPT09IFwiZnVuY3Rpb25cIikgRXM2TWFwID0gTWFwO1xuXG52YXIgbWFwVG9FbnRyaWVzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIHNpemUgPSAwO1xuXG4gICAgZnVuY3Rpb24gZXh0cmFjdEVudHJ5KHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdGhpc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgdGhpc1tpbmRleCArIHNpemVdID0ga2V5O1xuICAgICAgICBpbmRleCsrO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBtYXBUb0VudHJpZXMobWFwKSB7XG4gICAgICAgIHNpemUgPSBtYXAuc2l6ZTtcbiAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB2YXIgcmV0ID0gbmV3IEFycmF5KG1hcC5zaXplICogMik7XG4gICAgICAgIG1hcC5mb3JFYWNoKGV4dHJhY3RFbnRyeSwgcmV0KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xufSkoKTtcblxudmFyIGVudHJpZXNUb01hcCA9IGZ1bmN0aW9uKGVudHJpZXMpIHtcbiAgICB2YXIgcmV0ID0gbmV3IEVzNk1hcCgpO1xuICAgIHZhciBsZW5ndGggPSBlbnRyaWVzLmxlbmd0aCAvIDIgfCAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGVudHJpZXNbbGVuZ3RoICsgaV07XG4gICAgICAgIHZhciB2YWx1ZSA9IGVudHJpZXNbaV07XG4gICAgICAgIHJldC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBQcm9wZXJ0aWVzUHJvbWlzZUFycmF5KG9iaikge1xuICAgIHZhciBpc01hcCA9IGZhbHNlO1xuICAgIHZhciBlbnRyaWVzO1xuICAgIGlmIChFczZNYXAgIT09IHVuZGVmaW5lZCAmJiBvYmogaW5zdGFuY2VvZiBFczZNYXApIHtcbiAgICAgICAgZW50cmllcyA9IG1hcFRvRW50cmllcyhvYmopO1xuICAgICAgICBpc01hcCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleXMgPSBlczUua2V5cyhvYmopO1xuICAgICAgICB2YXIgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIGVudHJpZXMgPSBuZXcgQXJyYXkobGVuICogMik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgZW50cmllc1tpXSA9IG9ialtrZXldO1xuICAgICAgICAgICAgZW50cmllc1tpICsgbGVuXSA9IGtleTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbnN0cnVjdG9yJChlbnRyaWVzKTtcbiAgICB0aGlzLl9pc01hcCA9IGlzTWFwO1xuICAgIHRoaXMuX2luaXQkKHVuZGVmaW5lZCwgLTMpO1xufVxudXRpbC5pbmhlcml0cyhQcm9wZXJ0aWVzUHJvbWlzZUFycmF5LCBQcm9taXNlQXJyYXkpO1xuXG5Qcm9wZXJ0aWVzUHJvbWlzZUFycmF5LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHt9O1xuXG5Qcm9wZXJ0aWVzUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICB0aGlzLl92YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgdmFyIHRvdGFsUmVzb2x2ZWQgPSArK3RoaXMuX3RvdGFsUmVzb2x2ZWQ7XG4gICAgaWYgKHRvdGFsUmVzb2x2ZWQgPj0gdGhpcy5fbGVuZ3RoKSB7XG4gICAgICAgIHZhciB2YWw7XG4gICAgICAgIGlmICh0aGlzLl9pc01hcCkge1xuICAgICAgICAgICAgdmFsID0gZW50cmllc1RvTWFwKHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWwgPSB7fTtcbiAgICAgICAgICAgIHZhciBrZXlPZmZzZXQgPSB0aGlzLmxlbmd0aCgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoKCk7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgICAgIHZhbFt0aGlzLl92YWx1ZXNbaSArIGtleU9mZnNldF1dID0gdGhpcy5fdmFsdWVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jlc29sdmUodmFsKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblByb3BlcnRpZXNQcm9taXNlQXJyYXkucHJvdG90eXBlLnNob3VsZENvcHlWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuUHJvcGVydGllc1Byb21pc2VBcnJheS5wcm90b3R5cGUuZ2V0QWN0dWFsTGVuZ3RoID0gZnVuY3Rpb24gKGxlbikge1xuICAgIHJldHVybiBsZW4gPj4gMTtcbn07XG5cbmZ1bmN0aW9uIHByb3BzKHByb21pc2VzKSB7XG4gICAgdmFyIHJldDtcbiAgICB2YXIgY2FzdFZhbHVlID0gdHJ5Q29udmVydFRvUHJvbWlzZShwcm9taXNlcyk7XG5cbiAgICBpZiAoIWlzT2JqZWN0KGNhc3RWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImNhbm5vdCBhd2FpdCBwcm9wZXJ0aWVzIG9mIGEgbm9uLW9iamVjdFxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgfSBlbHNlIGlmIChjYXN0VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHJldCA9IGNhc3RWYWx1ZS5fdGhlbihcbiAgICAgICAgICAgIFByb21pc2UucHJvcHMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gbmV3IFByb3BlcnRpZXNQcm9taXNlQXJyYXkoY2FzdFZhbHVlKS5wcm9taXNlKCk7XG4gICAgfVxuXG4gICAgaWYgKGNhc3RWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcmV0Ll9wcm9wYWdhdGVGcm9tKGNhc3RWYWx1ZSwgMik7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cblByb21pc2UucHJvdG90eXBlLnByb3BzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcm9wcyh0aGlzKTtcbn07XG5cblByb21pc2UucHJvcHMgPSBmdW5jdGlvbiAocHJvbWlzZXMpIHtcbiAgICByZXR1cm4gcHJvcHMocHJvbWlzZXMpO1xufTtcbn07XG5cbn0se1wiLi9lczVcIjoxMyxcIi4vdXRpbFwiOjM2fV0sMjY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBhcnJheU1vdmUoc3JjLCBzcmNJbmRleCwgZHN0LCBkc3RJbmRleCwgbGVuKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBsZW47ICsraikge1xuICAgICAgICBkc3RbaiArIGRzdEluZGV4XSA9IHNyY1tqICsgc3JjSW5kZXhdO1xuICAgICAgICBzcmNbaiArIHNyY0luZGV4XSA9IHZvaWQgMDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIFF1ZXVlKGNhcGFjaXR5KSB7XG4gICAgdGhpcy5fY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgICB0aGlzLl9sZW5ndGggPSAwO1xuICAgIHRoaXMuX2Zyb250ID0gMDtcbn1cblxuUXVldWUucHJvdG90eXBlLl93aWxsQmVPdmVyQ2FwYWNpdHkgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICAgIHJldHVybiB0aGlzLl9jYXBhY2l0eSA8IHNpemU7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuX3B1c2hPbmUgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG4gICAgdGhpcy5fY2hlY2tDYXBhY2l0eShsZW5ndGggKyAxKTtcbiAgICB2YXIgaSA9ICh0aGlzLl9mcm9udCArIGxlbmd0aCkgJiAodGhpcy5fY2FwYWNpdHkgLSAxKTtcbiAgICB0aGlzW2ldID0gYXJnO1xuICAgIHRoaXMuX2xlbmd0aCA9IGxlbmd0aCArIDE7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuX3Vuc2hpZnRPbmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBjYXBhY2l0eSA9IHRoaXMuX2NhcGFjaXR5O1xuICAgIHRoaXMuX2NoZWNrQ2FwYWNpdHkodGhpcy5sZW5ndGgoKSArIDEpO1xuICAgIHZhciBmcm9udCA9IHRoaXMuX2Zyb250O1xuICAgIHZhciBpID0gKCgoKCBmcm9udCAtIDEgKSAmXG4gICAgICAgICAgICAgICAgICAgICggY2FwYWNpdHkgLSAxKSApIF4gY2FwYWNpdHkgKSAtIGNhcGFjaXR5ICk7XG4gICAgdGhpc1tpXSA9IHZhbHVlO1xuICAgIHRoaXMuX2Zyb250ID0gaTtcbiAgICB0aGlzLl9sZW5ndGggPSB0aGlzLmxlbmd0aCgpICsgMTtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24oZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICB0aGlzLl91bnNoaWZ0T25lKGFyZyk7XG4gICAgdGhpcy5fdW5zaGlmdE9uZShyZWNlaXZlcik7XG4gICAgdGhpcy5fdW5zaGlmdE9uZShmbik7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChmbiwgcmVjZWl2ZXIsIGFyZykge1xuICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCgpICsgMztcbiAgICBpZiAodGhpcy5fd2lsbEJlT3ZlckNhcGFjaXR5KGxlbmd0aCkpIHtcbiAgICAgICAgdGhpcy5fcHVzaE9uZShmbik7XG4gICAgICAgIHRoaXMuX3B1c2hPbmUocmVjZWl2ZXIpO1xuICAgICAgICB0aGlzLl9wdXNoT25lKGFyZyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGogPSB0aGlzLl9mcm9udCArIGxlbmd0aCAtIDM7XG4gICAgdGhpcy5fY2hlY2tDYXBhY2l0eShsZW5ndGgpO1xuICAgIHZhciB3cmFwTWFzayA9IHRoaXMuX2NhcGFjaXR5IC0gMTtcbiAgICB0aGlzWyhqICsgMCkgJiB3cmFwTWFza10gPSBmbjtcbiAgICB0aGlzWyhqICsgMSkgJiB3cmFwTWFza10gPSByZWNlaXZlcjtcbiAgICB0aGlzWyhqICsgMikgJiB3cmFwTWFza10gPSBhcmc7XG4gICAgdGhpcy5fbGVuZ3RoID0gbGVuZ3RoO1xufTtcblxuUXVldWUucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmcm9udCA9IHRoaXMuX2Zyb250LFxuICAgICAgICByZXQgPSB0aGlzW2Zyb250XTtcblxuICAgIHRoaXNbZnJvbnRdID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2Zyb250ID0gKGZyb250ICsgMSkgJiAodGhpcy5fY2FwYWNpdHkgLSAxKTtcbiAgICB0aGlzLl9sZW5ndGgtLTtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuUXVldWUucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xufTtcblxuUXVldWUucHJvdG90eXBlLl9jaGVja0NhcGFjaXR5ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgICBpZiAodGhpcy5fY2FwYWNpdHkgPCBzaXplKSB7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZVRvKHRoaXMuX2NhcGFjaXR5IDw8IDEpO1xuICAgIH1cbn07XG5cblF1ZXVlLnByb3RvdHlwZS5fcmVzaXplVG8gPSBmdW5jdGlvbiAoY2FwYWNpdHkpIHtcbiAgICB2YXIgb2xkQ2FwYWNpdHkgPSB0aGlzLl9jYXBhY2l0eTtcbiAgICB0aGlzLl9jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgIHZhciBmcm9udCA9IHRoaXMuX2Zyb250O1xuICAgIHZhciBsZW5ndGggPSB0aGlzLl9sZW5ndGg7XG4gICAgdmFyIG1vdmVJdGVtc0NvdW50ID0gKGZyb250ICsgbGVuZ3RoKSAmIChvbGRDYXBhY2l0eSAtIDEpO1xuICAgIGFycmF5TW92ZSh0aGlzLCAwLCB0aGlzLCBvbGRDYXBhY2l0eSwgbW92ZUl0ZW1zQ291bnQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBRdWV1ZTtcblxufSx7fV0sMjc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFxuICAgIFByb21pc2UsIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBhcGlSZWplY3Rpb24pIHtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcblxudmFyIHJhY2VMYXRlciA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbihhcnJheSkge1xuICAgICAgICByZXR1cm4gcmFjZShhcnJheSwgcHJvbWlzZSk7XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiByYWNlKHByb21pc2VzLCBwYXJlbnQpIHtcbiAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZShwcm9taXNlcyk7XG5cbiAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gcmFjZUxhdGVyKG1heWJlUHJvbWlzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZXMgPSB1dGlsLmFzQXJyYXkocHJvbWlzZXMpO1xuICAgICAgICBpZiAocHJvbWlzZXMgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGFuIGFycmF5IG9yIGFuIGl0ZXJhYmxlIG9iamVjdCBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhwcm9taXNlcykpO1xuICAgIH1cblxuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldC5fcHJvcGFnYXRlRnJvbShwYXJlbnQsIDMpO1xuICAgIH1cbiAgICB2YXIgZnVsZmlsbCA9IHJldC5fZnVsZmlsbDtcbiAgICB2YXIgcmVqZWN0ID0gcmV0Ll9yZWplY3Q7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHByb21pc2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHZhciB2YWwgPSBwcm9taXNlc1tpXTtcblxuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQgJiYgIShpIGluIHByb21pc2VzKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBQcm9taXNlLmNhc3QodmFsKS5fdGhlbihmdWxmaWxsLCByZWplY3QsIHVuZGVmaW5lZCwgcmV0LCBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxuUHJvbWlzZS5yYWNlID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gICAgcmV0dXJuIHJhY2UocHJvbWlzZXMsIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5yYWNlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByYWNlKHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuXG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMjg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2VBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXBpUmVqZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0cnlDb252ZXJ0VG9Qcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBJTlRFUk5BTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcpIHtcbnZhciBnZXREb21haW4gPSBQcm9taXNlLl9nZXREb21haW47XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xuXG5mdW5jdGlvbiBSZWR1Y3Rpb25Qcm9taXNlQXJyYXkocHJvbWlzZXMsIGZuLCBpbml0aWFsVmFsdWUsIF9lYWNoKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3RvciQocHJvbWlzZXMpO1xuICAgIHZhciBkb21haW4gPSBnZXREb21haW4oKTtcbiAgICB0aGlzLl9mbiA9IGRvbWFpbiA9PT0gbnVsbCA/IGZuIDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgZm4pO1xuICAgIGlmIChpbml0aWFsVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpbml0aWFsVmFsdWUgPSBQcm9taXNlLnJlc29sdmUoaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgaW5pdGlhbFZhbHVlLl9hdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5faW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICAgIHRoaXMuX2N1cnJlbnRDYW5jZWxsYWJsZSA9IG51bGw7XG4gICAgaWYoX2VhY2ggPT09IElOVEVSTkFMKSB7XG4gICAgICAgIHRoaXMuX2VhY2hWYWx1ZXMgPSBBcnJheSh0aGlzLl9sZW5ndGgpO1xuICAgIH0gZWxzZSBpZiAoX2VhY2ggPT09IDApIHtcbiAgICAgICAgdGhpcy5fZWFjaFZhbHVlcyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZWFjaFZhbHVlcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5fcHJvbWlzZS5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICB0aGlzLl9pbml0JCh1bmRlZmluZWQsIC01KTtcbn1cbnV0aWwuaW5oZXJpdHMoUmVkdWN0aW9uUHJvbWlzZUFycmF5LCBQcm9taXNlQXJyYXkpO1xuXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9nb3RBY2N1bSA9IGZ1bmN0aW9uKGFjY3VtKSB7XG4gICAgaWYgKHRoaXMuX2VhY2hWYWx1ZXMgIT09IHVuZGVmaW5lZCAmJiBcbiAgICAgICAgdGhpcy5fZWFjaFZhbHVlcyAhPT0gbnVsbCAmJiBcbiAgICAgICAgYWNjdW0gIT09IElOVEVSTkFMKSB7XG4gICAgICAgIHRoaXMuX2VhY2hWYWx1ZXMucHVzaChhY2N1bSk7XG4gICAgfVxufTtcblxuUmVkdWN0aW9uUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fZWFjaENvbXBsZXRlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodGhpcy5fZWFjaFZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9lYWNoVmFsdWVzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZWFjaFZhbHVlcztcbn07XG5cblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHt9O1xuXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZXNvbHZlRW1wdHlBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fZWFjaFZhbHVlcyAhPT0gdW5kZWZpbmVkID8gdGhpcy5fZWFjaFZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5faW5pdGlhbFZhbHVlKTtcbn07XG5cblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuc2hvdWxkQ29weVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB0aGlzLl9wcm9taXNlLl9yZXNvbHZlQ2FsbGJhY2sodmFsdWUpO1xuICAgIHRoaXMuX3ZhbHVlcyA9IG51bGw7XG59O1xuXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICBpZiAoc2VuZGVyID09PSB0aGlzLl9pbml0aWFsVmFsdWUpIHJldHVybiB0aGlzLl9jYW5jZWwoKTtcbiAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm47XG4gICAgdGhpcy5fcmVzdWx0Q2FuY2VsbGVkJCgpO1xuICAgIGlmICh0aGlzLl9jdXJyZW50Q2FuY2VsbGFibGUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRDYW5jZWxsYWJsZS5jYW5jZWwoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2luaXRpYWxWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgdGhpcy5faW5pdGlhbFZhbHVlLmNhbmNlbCgpO1xuICAgIH1cbn07XG5cblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX2l0ZXJhdGUgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aDtcbiAgICBpZiAodGhpcy5faW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLl9pbml0aWFsVmFsdWU7XG4gICAgICAgIGkgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gUHJvbWlzZS5yZXNvbHZlKHZhbHVlc1swXSk7XG4gICAgICAgIGkgPSAxO1xuICAgIH1cblxuICAgIHRoaXMuX2N1cnJlbnRDYW5jZWxsYWJsZSA9IHZhbHVlO1xuXG4gICAgaWYgKCF2YWx1ZS5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHtcbiAgICAgICAgICAgICAgICBhY2N1bTogbnVsbCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVzW2ldLFxuICAgICAgICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogbGVuZ3RoLFxuICAgICAgICAgICAgICAgIGFycmF5OiB0aGlzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5fdGhlbihnb3RBY2N1bSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGN0eCwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9lYWNoVmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVxuICAgICAgICAgICAgLl90aGVuKHRoaXMuX2VhY2hDb21wbGV0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMsIHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHZhbHVlLl90aGVuKGNvbXBsZXRlZCwgY29tcGxldGVkLCB1bmRlZmluZWQsIHZhbHVlLCB0aGlzKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uIChmbiwgaW5pdGlhbFZhbHVlKSB7XG4gICAgcmV0dXJuIHJlZHVjZSh0aGlzLCBmbiwgaW5pdGlhbFZhbHVlLCBudWxsKTtcbn07XG5cblByb21pc2UucmVkdWNlID0gZnVuY3Rpb24gKHByb21pc2VzLCBmbiwgaW5pdGlhbFZhbHVlLCBfZWFjaCkge1xuICAgIHJldHVybiByZWR1Y2UocHJvbWlzZXMsIGZuLCBpbml0aWFsVmFsdWUsIF9lYWNoKTtcbn07XG5cbmZ1bmN0aW9uIGNvbXBsZXRlZCh2YWx1ZU9yUmVhc29uLCBhcnJheSkge1xuICAgIGlmICh0aGlzLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgYXJyYXkuX3Jlc29sdmUodmFsdWVPclJlYXNvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXkuX3JlamVjdCh2YWx1ZU9yUmVhc29uKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlZHVjZShwcm9taXNlcywgZm4sIGluaXRpYWxWYWx1ZSwgX2VhY2gpIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XG4gICAgfVxuICAgIHZhciBhcnJheSA9IG5ldyBSZWR1Y3Rpb25Qcm9taXNlQXJyYXkocHJvbWlzZXMsIGZuLCBpbml0aWFsVmFsdWUsIF9lYWNoKTtcbiAgICByZXR1cm4gYXJyYXkucHJvbWlzZSgpO1xufVxuXG5mdW5jdGlvbiBnb3RBY2N1bShhY2N1bSkge1xuICAgIHRoaXMuYWNjdW0gPSBhY2N1bTtcbiAgICB0aGlzLmFycmF5Ll9nb3RBY2N1bShhY2N1bSk7XG4gICAgdmFyIHZhbHVlID0gdHJ5Q29udmVydFRvUHJvbWlzZSh0aGlzLnZhbHVlLCB0aGlzLmFycmF5Ll9wcm9taXNlKTtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHRoaXMuYXJyYXkuX2N1cnJlbnRDYW5jZWxsYWJsZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWUuX3RoZW4oZ290VmFsdWUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzLCB1bmRlZmluZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBnb3RWYWx1ZS5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdvdFZhbHVlKHZhbHVlKSB7XG4gICAgdmFyIGFycmF5ID0gdGhpcy5hcnJheTtcbiAgICB2YXIgcHJvbWlzZSA9IGFycmF5Ll9wcm9taXNlO1xuICAgIHZhciBmbiA9IHRyeUNhdGNoKGFycmF5Ll9mbik7XG4gICAgcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcbiAgICB2YXIgcmV0O1xuICAgIGlmIChhcnJheS5fZWFjaFZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldCA9IGZuLmNhbGwocHJvbWlzZS5fYm91bmRWYWx1ZSgpLCB2YWx1ZSwgdGhpcy5pbmRleCwgdGhpcy5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IGZuLmNhbGwocHJvbWlzZS5fYm91bmRWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2N1bSwgdmFsdWUsIHRoaXMuaW5kZXgsIHRoaXMubGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKHJldCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgYXJyYXkuX2N1cnJlbnRDYW5jZWxsYWJsZSA9IHJldDtcbiAgICB9XG4gICAgdmFyIHByb21pc2VDcmVhdGVkID0gcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIGRlYnVnLmNoZWNrRm9yZ290dGVuUmV0dXJucyhcbiAgICAgICAgcmV0LFxuICAgICAgICBwcm9taXNlQ3JlYXRlZCxcbiAgICAgICAgYXJyYXkuX2VhY2hWYWx1ZXMgIT09IHVuZGVmaW5lZCA/IFwiUHJvbWlzZS5lYWNoXCIgOiBcIlByb21pc2UucmVkdWNlXCIsXG4gICAgICAgIHByb21pc2VcbiAgICApO1xuICAgIHJldHVybiByZXQ7XG59XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMjk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgc2NoZWR1bGU7XG52YXIgbm9Bc3luY1NjaGVkdWxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGFzeW5jIHNjaGVkdWxlciBhdmFpbGFibGVcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xufTtcbnZhciBOYXRpdmVQcm9taXNlID0gdXRpbC5nZXROYXRpdmVQcm9taXNlKCk7XG5pZiAodXRpbC5pc05vZGUgJiYgdHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgR2xvYmFsU2V0SW1tZWRpYXRlID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbiAgICB2YXIgUHJvY2Vzc05leHRUaWNrID0gcHJvY2Vzcy5uZXh0VGljaztcbiAgICBzY2hlZHVsZSA9IHV0aWwuaXNSZWNlbnROb2RlXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbihmbikgeyBHbG9iYWxTZXRJbW1lZGlhdGUuY2FsbChnbG9iYWwsIGZuKTsgfVxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24oZm4pIHsgUHJvY2Vzc05leHRUaWNrLmNhbGwocHJvY2VzcywgZm4pOyB9O1xufSBlbHNlIGlmICh0eXBlb2YgTmF0aXZlUHJvbWlzZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgIHR5cGVvZiBOYXRpdmVQcm9taXNlLnJlc29sdmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBuYXRpdmVQcm9taXNlID0gTmF0aXZlUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgc2NoZWR1bGUgPSBmdW5jdGlvbihmbikge1xuICAgICAgICBuYXRpdmVQcm9taXNlLnRoZW4oZm4pO1xuICAgIH07XG59IGVsc2UgaWYgKCh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikgJiZcbiAgICAgICAgICAhKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IgJiZcbiAgICAgICAgICAgICh3aW5kb3cubmF2aWdhdG9yLnN0YW5kYWxvbmUgfHwgd2luZG93LmNvcmRvdmEpKSkge1xuICAgIHNjaGVkdWxlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIG9wdHMgPSB7YXR0cmlidXRlczogdHJ1ZX07XG4gICAgICAgIHZhciB0b2dnbGVTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGRpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgbzIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QudG9nZ2xlKFwiZm9vXCIpO1xuICAgICAgICAgICAgdG9nZ2xlU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBvMi5vYnNlcnZlKGRpdjIsIG9wdHMpO1xuXG4gICAgICAgIHZhciBzY2hlZHVsZVRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRvZ2dsZVNjaGVkdWxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRvZ2dsZVNjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGl2Mi5jbGFzc0xpc3QudG9nZ2xlKFwiZm9vXCIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNjaGVkdWxlKGZuKSB7XG4gICAgICAgICAgICB2YXIgbyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG8uZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG8ub2JzZXJ2ZShkaXYsIG9wdHMpO1xuICAgICAgICAgICAgc2NoZWR1bGVUb2dnbGUoKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xufSBlbHNlIGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc2NoZWR1bGUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlKGZuKTtcbiAgICB9O1xufSBlbHNlIGlmICh0eXBlb2Ygc2V0VGltZW91dCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNjaGVkdWxlID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59IGVsc2Uge1xuICAgIHNjaGVkdWxlID0gbm9Bc3luY1NjaGVkdWxlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gc2NoZWR1bGU7XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwzMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID1cbiAgICBmdW5jdGlvbihQcm9taXNlLCBQcm9taXNlQXJyYXksIGRlYnVnKSB7XG52YXIgUHJvbWlzZUluc3BlY3Rpb24gPSBQcm9taXNlLlByb21pc2VJbnNwZWN0aW9uO1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xuXG5mdW5jdGlvbiBTZXR0bGVkUHJvbWlzZUFycmF5KHZhbHVlcykge1xuICAgIHRoaXMuY29uc3RydWN0b3IkKHZhbHVlcyk7XG59XG51dGlsLmluaGVyaXRzKFNldHRsZWRQcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XG5cblNldHRsZWRQcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlUmVzb2x2ZWQgPSBmdW5jdGlvbiAoaW5kZXgsIGluc3BlY3Rpb24pIHtcbiAgICB0aGlzLl92YWx1ZXNbaW5kZXhdID0gaW5zcGVjdGlvbjtcbiAgICB2YXIgdG90YWxSZXNvbHZlZCA9ICsrdGhpcy5fdG90YWxSZXNvbHZlZDtcbiAgICBpZiAodG90YWxSZXNvbHZlZCA+PSB0aGlzLl9sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZSh0aGlzLl92YWx1ZXMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuU2V0dGxlZFByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlSW5zcGVjdGlvbigpO1xuICAgIHJldC5fYml0RmllbGQgPSAzMzU1NDQzMjtcbiAgICByZXQuX3NldHRsZWRWYWx1ZUZpZWxkID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXMuX3Byb21pc2VSZXNvbHZlZChpbmRleCwgcmV0KTtcbn07XG5TZXR0bGVkUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZVJlamVjdGVkID0gZnVuY3Rpb24gKHJlYXNvbiwgaW5kZXgpIHtcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2VJbnNwZWN0aW9uKCk7XG4gICAgcmV0Ll9iaXRGaWVsZCA9IDE2Nzc3MjE2O1xuICAgIHJldC5fc2V0dGxlZFZhbHVlRmllbGQgPSByZWFzb247XG4gICAgcmV0dXJuIHRoaXMuX3Byb21pc2VSZXNvbHZlZChpbmRleCwgcmV0KTtcbn07XG5cblByb21pc2Uuc2V0dGxlID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gICAgZGVidWcuZGVwcmVjYXRlZChcIi5zZXR0bGUoKVwiLCBcIi5yZWZsZWN0KClcIik7XG4gICAgcmV0dXJuIG5ldyBTZXR0bGVkUHJvbWlzZUFycmF5KHByb21pc2VzKS5wcm9taXNlKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5zZXR0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFByb21pc2Uuc2V0dGxlKHRoaXMpO1xufTtcbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwzMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID1cbmZ1bmN0aW9uKFByb21pc2UsIFByb21pc2VBcnJheSwgYXBpUmVqZWN0aW9uKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgUmFuZ2VFcnJvciA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKS5SYW5nZUVycm9yO1xudmFyIEFnZ3JlZ2F0ZUVycm9yID0gX2RlcmVxXyhcIi4vZXJyb3JzXCIpLkFnZ3JlZ2F0ZUVycm9yO1xudmFyIGlzQXJyYXkgPSB1dGlsLmlzQXJyYXk7XG52YXIgQ0FOQ0VMTEFUSU9OID0ge307XG5cblxuZnVuY3Rpb24gU29tZVByb21pc2VBcnJheSh2YWx1ZXMpIHtcbiAgICB0aGlzLmNvbnN0cnVjdG9yJCh2YWx1ZXMpO1xuICAgIHRoaXMuX2hvd01hbnkgPSAwO1xuICAgIHRoaXMuX3Vud3JhcCA9IGZhbHNlO1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG59XG51dGlsLmluaGVyaXRzKFNvbWVQcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5faG93TWFueSA9PT0gMCkge1xuICAgICAgICB0aGlzLl9yZXNvbHZlKFtdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pbml0JCh1bmRlZmluZWQsIC01KTtcbiAgICB2YXIgaXNBcnJheVJlc29sdmVkID0gaXNBcnJheSh0aGlzLl92YWx1ZXMpO1xuICAgIGlmICghdGhpcy5faXNSZXNvbHZlZCgpICYmXG4gICAgICAgIGlzQXJyYXlSZXNvbHZlZCAmJlxuICAgICAgICB0aGlzLl9ob3dNYW55ID4gdGhpcy5fY2FuUG9zc2libHlGdWxmaWxsKCkpIHtcbiAgICAgICAgdGhpcy5fcmVqZWN0KHRoaXMuX2dldFJhbmdlRXJyb3IodGhpcy5sZW5ndGgoKSkpO1xuICAgIH1cbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuX2luaXQoKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLnNldFVud3JhcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl91bndyYXAgPSB0cnVlO1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuaG93TWFueSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5faG93TWFueTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLnNldEhvd01hbnkgPSBmdW5jdGlvbiAoY291bnQpIHtcbiAgICB0aGlzLl9ob3dNYW55ID0gY291bnQ7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuX2FkZEZ1bGZpbGxlZCh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX2Z1bGZpbGxlZCgpID09PSB0aGlzLmhvd01hbnkoKSkge1xuICAgICAgICB0aGlzLl92YWx1ZXMubGVuZ3RoID0gdGhpcy5ob3dNYW55KCk7XG4gICAgICAgIGlmICh0aGlzLmhvd01hbnkoKSA9PT0gMSAmJiB0aGlzLl91bndyYXApIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fdmFsdWVzWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59O1xuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VSZWplY3RlZCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICB0aGlzLl9hZGRSZWplY3RlZChyZWFzb24pO1xuICAgIHJldHVybiB0aGlzLl9jaGVja091dGNvbWUoKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlQ2FuY2VsbGVkID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl92YWx1ZXMgaW5zdGFuY2VvZiBQcm9taXNlIHx8IHRoaXMuX3ZhbHVlcyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW5jZWwoKTtcbiAgICB9XG4gICAgdGhpcy5fYWRkUmVqZWN0ZWQoQ0FOQ0VMTEFUSU9OKTtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tPdXRjb21lKCk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fY2hlY2tPdXRjb21lID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuaG93TWFueSgpID4gdGhpcy5fY2FuUG9zc2libHlGdWxmaWxsKCkpIHtcbiAgICAgICAgdmFyIGUgPSBuZXcgQWdncmVnYXRlRXJyb3IoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMubGVuZ3RoKCk7IGkgPCB0aGlzLl92YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl92YWx1ZXNbaV0gIT09IENBTkNFTExBVElPTikge1xuICAgICAgICAgICAgICAgIGUucHVzaCh0aGlzLl92YWx1ZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdChlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbmNlbCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fZnVsZmlsbGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl90b3RhbFJlc29sdmVkO1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX3JlamVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZXMubGVuZ3RoIC0gdGhpcy5sZW5ndGgoKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9hZGRSZWplY3RlZCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICB0aGlzLl92YWx1ZXMucHVzaChyZWFzb24pO1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX2FkZEZ1bGZpbGxlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlc1t0aGlzLl90b3RhbFJlc29sdmVkKytdID0gdmFsdWU7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fY2FuUG9zc2libHlGdWxmaWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCgpIC0gdGhpcy5fcmVqZWN0ZWQoKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9nZXRSYW5nZUVycm9yID0gZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBcIklucHV0IGFycmF5IG11c3QgY29udGFpbiBhdCBsZWFzdCBcIiArXG4gICAgICAgICAgICB0aGlzLl9ob3dNYW55ICsgXCIgaXRlbXMgYnV0IGNvbnRhaW5zIG9ubHkgXCIgKyBjb3VudCArIFwiIGl0ZW1zXCI7XG4gICAgcmV0dXJuIG5ldyBSYW5nZUVycm9yKG1lc3NhZ2UpO1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc29sdmVFbXB0eUFycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3JlamVjdCh0aGlzLl9nZXRSYW5nZUVycm9yKDApKTtcbn07XG5cbmZ1bmN0aW9uIHNvbWUocHJvbWlzZXMsIGhvd01hbnkpIHtcbiAgICBpZiAoKGhvd01hbnkgfCAwKSAhPT0gaG93TWFueSB8fCBob3dNYW55IDwgMCkge1xuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGEgcG9zaXRpdmUgaW50ZWdlclxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgfVxuICAgIHZhciByZXQgPSBuZXcgU29tZVByb21pc2VBcnJheShwcm9taXNlcyk7XG4gICAgdmFyIHByb21pc2UgPSByZXQucHJvbWlzZSgpO1xuICAgIHJldC5zZXRIb3dNYW55KGhvd01hbnkpO1xuICAgIHJldC5pbml0KCk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cblByb21pc2Uuc29tZSA9IGZ1bmN0aW9uIChwcm9taXNlcywgaG93TWFueSkge1xuICAgIHJldHVybiBzb21lKHByb21pc2VzLCBob3dNYW55KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnNvbWUgPSBmdW5jdGlvbiAoaG93TWFueSkge1xuICAgIHJldHVybiBzb21lKHRoaXMsIGhvd01hbnkpO1xufTtcblxuUHJvbWlzZS5fU29tZVByb21pc2VBcnJheSA9IFNvbWVQcm9taXNlQXJyYXk7XG59O1xuXG59LHtcIi4vZXJyb3JzXCI6MTIsXCIuL3V0aWxcIjozNn1dLDMyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XG5mdW5jdGlvbiBQcm9taXNlSW5zcGVjdGlvbihwcm9taXNlKSB7XG4gICAgaWYgKHByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9taXNlID0gcHJvbWlzZS5fdGFyZ2V0KCk7XG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gcHJvbWlzZS5fYml0RmllbGQ7XG4gICAgICAgIHRoaXMuX3NldHRsZWRWYWx1ZUZpZWxkID0gcHJvbWlzZS5faXNGYXRlU2VhbGVkKClcbiAgICAgICAgICAgID8gcHJvbWlzZS5fc2V0dGxlZFZhbHVlKCkgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9iaXRGaWVsZCA9IDA7XG4gICAgICAgIHRoaXMuX3NldHRsZWRWYWx1ZUZpZWxkID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLl9zZXR0bGVkVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGxlZFZhbHVlRmllbGQ7XG59O1xuXG52YXIgdmFsdWUgPSBQcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbm5vdCBnZXQgZnVsZmlsbG1lbnQgdmFsdWUgb2YgYSBub24tZnVsZmlsbGVkIHByb21pc2VcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc2V0dGxlZFZhbHVlKCk7XG59O1xuXG52YXIgcmVhc29uID0gUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLmVycm9yID1cblByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5yZWFzb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmlzUmVqZWN0ZWQoKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2Fubm90IGdldCByZWplY3Rpb24gcmVhc29uIG9mIGEgbm9uLXJlamVjdGVkIHByb21pc2VcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc2V0dGxlZFZhbHVlKCk7XG59O1xuXG52YXIgaXNGdWxmaWxsZWQgPSBQcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUuaXNGdWxmaWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwO1xufTtcblxudmFyIGlzUmVqZWN0ZWQgPSBQcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUuaXNSZWplY3RlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwO1xufTtcblxudmFyIGlzUGVuZGluZyA9IFByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5pc1BlbmRpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMDtcbn07XG5cbnZhciBpc1Jlc29sdmVkID0gUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLmlzUmVzb2x2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDUwMzMxNjQ4KSAhPT0gMDtcbn07XG5cblByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5pc0NhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA4NDU0MTQ0KSAhPT0gMDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9faXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgNjU1MzYpID09PSA2NTUzNjtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc0NhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl90YXJnZXQoKS5fX2lzQ2FuY2VsbGVkKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5pc0NhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5fdGFyZ2V0KCkuX2JpdEZpZWxkICYgODQ1NDE0NCkgIT09IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5pc1BlbmRpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaXNQZW5kaW5nLmNhbGwodGhpcy5fdGFyZ2V0KCkpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuaXNSZWplY3RlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBpc1JlamVjdGVkLmNhbGwodGhpcy5fdGFyZ2V0KCkpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuaXNGdWxmaWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaXNGdWxmaWxsZWQuY2FsbCh0aGlzLl90YXJnZXQoKSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5pc1Jlc29sdmVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGlzUmVzb2x2ZWQuY2FsbCh0aGlzLl90YXJnZXQoKSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZS5jYWxsKHRoaXMuX3RhcmdldCgpKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnJlYXNvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl90YXJnZXQoKTtcbiAgICB0YXJnZXQuX3Vuc2V0UmVqZWN0aW9uSXNVbmhhbmRsZWQoKTtcbiAgICByZXR1cm4gcmVhc29uLmNhbGwodGFyZ2V0KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl92YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXR0bGVkVmFsdWUoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWFzb24gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl91bnNldFJlamVjdGlvbklzVW5oYW5kbGVkKCk7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRsZWRWYWx1ZSgpO1xufTtcblxuUHJvbWlzZS5Qcm9taXNlSW5zcGVjdGlvbiA9IFByb21pc2VJbnNwZWN0aW9uO1xufTtcblxufSx7fV0sMzM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xudmFyIGlzT2JqZWN0ID0gdXRpbC5pc09iamVjdDtcblxuZnVuY3Rpb24gdHJ5Q29udmVydFRvUHJvbWlzZShvYmosIGNvbnRleHQpIHtcbiAgICBpZiAoaXNPYmplY3Qob2JqKSkge1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUHJvbWlzZSkgcmV0dXJuIG9iajtcbiAgICAgICAgdmFyIHRoZW4gPSBnZXRUaGVuKG9iaik7XG4gICAgICAgIGlmICh0aGVuID09PSBlcnJvck9iaikge1xuICAgICAgICAgICAgaWYgKGNvbnRleHQpIGNvbnRleHQuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgICAgICB2YXIgcmV0ID0gUHJvbWlzZS5yZWplY3QodGhlbi5lKTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0KSBjb250ZXh0Ll9wb3BDb250ZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGlmIChpc0FueUJsdWViaXJkUHJvbWlzZShvYmopKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICAgICAgICAgICAgICBvYmouX3RoZW4oXG4gICAgICAgICAgICAgICAgICAgIHJldC5fZnVsZmlsbCxcbiAgICAgICAgICAgICAgICAgICAgcmV0Ll9yZWplY3QsXG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgcmV0LFxuICAgICAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRvVGhlbmFibGUob2JqLCB0aGVuLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBkb0dldFRoZW4ob2JqKSB7XG4gICAgcmV0dXJuIG9iai50aGVuO1xufVxuXG5mdW5jdGlvbiBnZXRUaGVuKG9iaikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkb0dldFRoZW4ob2JqKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yT2JqLmUgPSBlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgfVxufVxuXG52YXIgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuZnVuY3Rpb24gaXNBbnlCbHVlYmlyZFByb21pc2Uob2JqKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGhhc1Byb3AuY2FsbChvYmosIFwiX3Byb21pc2UwXCIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZG9UaGVuYWJsZSh4LCB0aGVuLCBjb250ZXh0KSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgdmFyIHJldCA9IHByb21pc2U7XG4gICAgaWYgKGNvbnRleHQpIGNvbnRleHQuX3B1c2hDb250ZXh0KCk7XG4gICAgcHJvbWlzZS5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICBpZiAoY29udGV4dCkgY29udGV4dC5fcG9wQ29udGV4dCgpO1xuICAgIHZhciBzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgdmFyIHJlc3VsdCA9IHV0aWwudHJ5Q2F0Y2godGhlbikuY2FsbCh4LCByZXNvbHZlLCByZWplY3QpO1xuICAgIHN5bmNocm9ub3VzID0gZmFsc2U7XG5cbiAgICBpZiAocHJvbWlzZSAmJiByZXN1bHQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHJlc3VsdC5lLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgcHJvbWlzZSA9IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICBpZiAoIXByb21pc2UpIHJldHVybjtcbiAgICAgICAgcHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgcHJvbWlzZSA9IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xuICAgICAgICBpZiAoIXByb21pc2UpIHJldHVybjtcbiAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2socmVhc29uLCBzeW5jaHJvbm91cywgdHJ1ZSk7XG4gICAgICAgIHByb21pc2UgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufVxuXG5yZXR1cm4gdHJ5Q29udmVydFRvUHJvbWlzZTtcbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwzNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwsIGRlYnVnKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgVGltZW91dEVycm9yID0gUHJvbWlzZS5UaW1lb3V0RXJyb3I7XG5cbmZ1bmN0aW9uIEhhbmRsZVdyYXBwZXIoaGFuZGxlKSAge1xuICAgIHRoaXMuaGFuZGxlID0gaGFuZGxlO1xufVxuXG5IYW5kbGVXcmFwcGVyLnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGFuZGxlKTtcbn07XG5cbnZhciBhZnRlclZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIGRlbGF5KCt0aGlzKS50aGVuUmV0dXJuKHZhbHVlKTsgfTtcbnZhciBkZWxheSA9IFByb21pc2UuZGVsYXkgPSBmdW5jdGlvbiAobXMsIHZhbHVlKSB7XG4gICAgdmFyIHJldDtcbiAgICB2YXIgaGFuZGxlO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldCA9IFByb21pc2UucmVzb2x2ZSh2YWx1ZSlcbiAgICAgICAgICAgICAgICAuX3RoZW4oYWZ0ZXJWYWx1ZSwgbnVsbCwgbnVsbCwgbXMsIHVuZGVmaW5lZCk7XG4gICAgICAgIGlmIChkZWJ1Zy5jYW5jZWxsYXRpb24oKSAmJiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldC5fc2V0T25DYW5jZWwodmFsdWUpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICBoYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyByZXQuX2Z1bGZpbGwoKTsgfSwgK21zKTtcbiAgICAgICAgaWYgKGRlYnVnLmNhbmNlbGxhdGlvbigpKSB7XG4gICAgICAgICAgICByZXQuX3NldE9uQ2FuY2VsKG5ldyBIYW5kbGVXcmFwcGVyKGhhbmRsZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldC5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICB9XG4gICAgcmV0Ll9zZXRBc3luY0d1YXJhbnRlZWQoKTtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbiAobXMpIHtcbiAgICByZXR1cm4gZGVsYXkobXMsIHRoaXMpO1xufTtcblxudmFyIGFmdGVyVGltZW91dCA9IGZ1bmN0aW9uIChwcm9taXNlLCBtZXNzYWdlLCBwYXJlbnQpIHtcbiAgICB2YXIgZXJyO1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBlcnIgPSBtZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyID0gbmV3IFRpbWVvdXRFcnJvcihcIm9wZXJhdGlvbiB0aW1lZCBvdXRcIik7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBlcnIgPSBuZXcgVGltZW91dEVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB1dGlsLm1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbihlcnIpO1xuICAgIHByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UoZXJyKTtcbiAgICBwcm9taXNlLl9yZWplY3QoZXJyKTtcblxuICAgIGlmIChwYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICBwYXJlbnQuY2FuY2VsKCk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gc3VjY2Vzc0NsZWFyKHZhbHVlKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGFuZGxlKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGZhaWx1cmVDbGVhcihyZWFzb24pIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oYW5kbGUpO1xuICAgIHRocm93IHJlYXNvbjtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uIChtcywgbWVzc2FnZSkge1xuICAgIG1zID0gK21zO1xuICAgIHZhciByZXQsIHBhcmVudDtcblxuICAgIHZhciBoYW5kbGVXcmFwcGVyID0gbmV3IEhhbmRsZVdyYXBwZXIoc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0VGltZW91dCgpIHtcbiAgICAgICAgaWYgKHJldC5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgYWZ0ZXJUaW1lb3V0KHJldCwgbWVzc2FnZSwgcGFyZW50KTtcbiAgICAgICAgfVxuICAgIH0sIG1zKSk7XG5cbiAgICBpZiAoZGVidWcuY2FuY2VsbGF0aW9uKCkpIHtcbiAgICAgICAgcGFyZW50ID0gdGhpcy50aGVuKCk7XG4gICAgICAgIHJldCA9IHBhcmVudC5fdGhlbihzdWNjZXNzQ2xlYXIsIGZhaWx1cmVDbGVhcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsIGhhbmRsZVdyYXBwZXIsIHVuZGVmaW5lZCk7XG4gICAgICAgIHJldC5fc2V0T25DYW5jZWwoaGFuZGxlV3JhcHBlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gdGhpcy5fdGhlbihzdWNjZXNzQ2xlYXIsIGZhaWx1cmVDbGVhcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsIGhhbmRsZVdyYXBwZXIsIHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbn07XG5cbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwzNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFByb21pc2UsIGFwaVJlamVjdGlvbiwgdHJ5Q29udmVydFRvUHJvbWlzZSxcbiAgICBjcmVhdGVDb250ZXh0LCBJTlRFUk5BTCwgZGVidWcpIHtcbiAgICB2YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG4gICAgdmFyIFR5cGVFcnJvciA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKS5UeXBlRXJyb3I7XG4gICAgdmFyIGluaGVyaXRzID0gX2RlcmVxXyhcIi4vdXRpbFwiKS5pbmhlcml0cztcbiAgICB2YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xuICAgIHZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG4gICAgdmFyIE5VTEwgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHRocm93ZXIoZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhyb3cgZTt9LCAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYXN0UHJlc2VydmluZ0Rpc3Bvc2FibGUodGhlbmFibGUpIHtcbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodGhlbmFibGUpO1xuICAgICAgICBpZiAobWF5YmVQcm9taXNlICE9PSB0aGVuYWJsZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoZW5hYmxlLl9pc0Rpc3Bvc2FibGUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoZW5hYmxlLl9nZXREaXNwb3NlciA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICB0aGVuYWJsZS5faXNEaXNwb3NhYmxlKCkpIHtcbiAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fc2V0RGlzcG9zYWJsZSh0aGVuYWJsZS5fZ2V0RGlzcG9zZXIoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heWJlUHJvbWlzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzcG9zZShyZXNvdXJjZXMsIGluc3BlY3Rpb24pIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbGVuID0gcmVzb3VyY2VzLmxlbmd0aDtcbiAgICAgICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICAgICAgZnVuY3Rpb24gaXRlcmF0b3IoKSB7XG4gICAgICAgICAgICBpZiAoaSA+PSBsZW4pIHJldHVybiByZXQuX2Z1bGZpbGwoKTtcbiAgICAgICAgICAgIHZhciBtYXliZVByb21pc2UgPSBjYXN0UHJlc2VydmluZ0Rpc3Bvc2FibGUocmVzb3VyY2VzW2krK10pO1xuICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UgJiZcbiAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX2lzRGlzcG9zYWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fZ2V0RGlzcG9zZXIoKS50cnlEaXNwb3NlKGluc3BlY3Rpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzLnByb21pc2UpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRocm93ZXIoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXliZVByb21pc2UuX3RoZW4oaXRlcmF0b3IsIHRocm93ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlcmF0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVyYXRvcigpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIERpc3Bvc2VyKGRhdGEsIHByb21pc2UsIGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBwcm9taXNlO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG5cbiAgICBEaXNwb3Nlci5wcm90b3R5cGUuZGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfTtcblxuICAgIERpc3Bvc2VyLnByb3RvdHlwZS5wcm9taXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgRGlzcG9zZXIucHJvdG90eXBlLnJlc291cmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9taXNlKCkuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZSgpLnZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE5VTEw7XG4gICAgfTtcblxuICAgIERpc3Bvc2VyLnByb3RvdHlwZS50cnlEaXNwb3NlID0gZnVuY3Rpb24oaW5zcGVjdGlvbikge1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSB0aGlzLnJlc291cmNlKCk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY29udGV4dDtcbiAgICAgICAgaWYgKGNvbnRleHQgIT09IHVuZGVmaW5lZCkgY29udGV4dC5fcHVzaENvbnRleHQoKTtcbiAgICAgICAgdmFyIHJldCA9IHJlc291cmNlICE9PSBOVUxMXG4gICAgICAgICAgICA/IHRoaXMuZG9EaXNwb3NlKHJlc291cmNlLCBpbnNwZWN0aW9uKSA6IG51bGw7XG4gICAgICAgIGlmIChjb250ZXh0ICE9PSB1bmRlZmluZWQpIGNvbnRleHQuX3BvcENvbnRleHQoKTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fdW5zZXREaXNwb3NhYmxlKCk7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBudWxsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICBEaXNwb3Nlci5pc0Rpc3Bvc2VyID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIChkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZC5yZXNvdXJjZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGQudHJ5RGlzcG9zZSA9PT0gXCJmdW5jdGlvblwiKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gRnVuY3Rpb25EaXNwb3NlcihmbiwgcHJvbWlzZSwgY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yJChmbiwgcHJvbWlzZSwgY29udGV4dCk7XG4gICAgfVxuICAgIGluaGVyaXRzKEZ1bmN0aW9uRGlzcG9zZXIsIERpc3Bvc2VyKTtcblxuICAgIEZ1bmN0aW9uRGlzcG9zZXIucHJvdG90eXBlLmRvRGlzcG9zZSA9IGZ1bmN0aW9uIChyZXNvdXJjZSwgaW5zcGVjdGlvbikge1xuICAgICAgICB2YXIgZm4gPSB0aGlzLmRhdGEoKTtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwocmVzb3VyY2UsIHJlc291cmNlLCBpbnNwZWN0aW9uKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWF5YmVVbndyYXBEaXNwb3Nlcih2YWx1ZSkge1xuICAgICAgICBpZiAoRGlzcG9zZXIuaXNEaXNwb3Nlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzW3RoaXMuaW5kZXhdLl9zZXREaXNwb3NhYmxlKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5wcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIFJlc291cmNlTGlzdChsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG51bGw7XG4gICAgICAgIHRoaXNbbGVuZ3RoLTFdID0gbnVsbDtcbiAgICB9XG5cbiAgICBSZXNvdXJjZUxpc3QucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXNbaV07XG4gICAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIFByb21pc2UudXNpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBpZiAobGVuIDwgMikgcmV0dXJuIGFwaVJlamVjdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieW91IG11c3QgcGFzcyBhdCBsZWFzdCAyIGFyZ3VtZW50cyB0byBQcm9taXNlLnVzaW5nXCIpO1xuICAgICAgICB2YXIgZm4gPSBhcmd1bWVudHNbbGVuIC0gMV07XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlucHV0O1xuICAgICAgICB2YXIgc3ByZWFkQXJncyA9IHRydWU7XG4gICAgICAgIGlmIChsZW4gPT09IDIgJiYgQXJyYXkuaXNBcnJheShhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGxlbiA9IGlucHV0Lmxlbmd0aDtcbiAgICAgICAgICAgIHNwcmVhZEFyZ3MgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0ID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgbGVuLS07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc291cmNlcyA9IG5ldyBSZXNvdXJjZUxpc3QobGVuKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgdmFyIHJlc291cmNlID0gaW5wdXRbaV07XG4gICAgICAgICAgICBpZiAoRGlzcG9zZXIuaXNEaXNwb3NlcihyZXNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlzcG9zZXIgPSByZXNvdXJjZTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZSA9IHJlc291cmNlLnByb21pc2UoKTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZS5fc2V0RGlzcG9zYWJsZShkaXNwb3Nlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX3RoZW4obWF5YmVVbndyYXBEaXNwb3NlciwgbnVsbCwgbnVsbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpXG4gICAgICAgICAgICAgICAgICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb3VyY2VzW2ldID0gcmVzb3VyY2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVmbGVjdGVkUmVzb3VyY2VzID0gbmV3IEFycmF5KHJlc291cmNlcy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZmxlY3RlZFJlc291cmNlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgcmVmbGVjdGVkUmVzb3VyY2VzW2ldID0gUHJvbWlzZS5yZXNvbHZlKHJlc291cmNlc1tpXSkucmVmbGVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdFByb21pc2UgPSBQcm9taXNlLmFsbChyZWZsZWN0ZWRSZXNvdXJjZXMpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihpbnNwZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5zcGVjdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluc3BlY3Rpb24gPSBpbnNwZWN0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3BlY3Rpb24uaXNSZWplY3RlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvck9iai5lID0gaW5zcGVjdGlvbi5lcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yT2JqO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpbnNwZWN0aW9uLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFByb21pc2UuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5zcGVjdGlvbnNbaV0gPSBpbnNwZWN0aW9uLnZhbHVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb21pc2UuX3B1c2hDb250ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICBmbiA9IHRyeUNhdGNoKGZuKTtcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gc3ByZWFkQXJnc1xuICAgICAgICAgICAgICAgICAgICA/IGZuLmFwcGx5KHVuZGVmaW5lZCwgaW5zcGVjdGlvbnMpIDogZm4oaW5zcGVjdGlvbnMpO1xuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlQ3JlYXRlZCA9IHByb21pc2UuX3BvcENvbnRleHQoKTtcbiAgICAgICAgICAgICAgICBkZWJ1Zy5jaGVja0ZvcmdvdHRlblJldHVybnMoXG4gICAgICAgICAgICAgICAgICAgIHJldCwgcHJvbWlzZUNyZWF0ZWQsIFwiUHJvbWlzZS51c2luZ1wiLCBwcm9taXNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHByb21pc2UgPSByZXN1bHRQcm9taXNlLmxhc3RseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpbnNwZWN0aW9uID0gbmV3IFByb21pc2UuUHJvbWlzZUluc3BlY3Rpb24ocmVzdWx0UHJvbWlzZSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcG9zZShyZXNvdXJjZXMsIGluc3BlY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzb3VyY2VzLnByb21pc2UgPSBwcm9taXNlO1xuICAgICAgICBwcm9taXNlLl9zZXRPbkNhbmNlbChyZXNvdXJjZXMpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX3NldERpc3Bvc2FibGUgPSBmdW5jdGlvbiAoZGlzcG9zZXIpIHtcbiAgICAgICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDEzMTA3MjtcbiAgICAgICAgdGhpcy5fZGlzcG9zZXIgPSBkaXNwb3NlcjtcbiAgICB9O1xuXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX2lzRGlzcG9zYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDEzMTA3MikgPiAwO1xuICAgIH07XG5cbiAgICBQcm9taXNlLnByb3RvdHlwZS5fZ2V0RGlzcG9zZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwb3NlcjtcbiAgICB9O1xuXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0RGlzcG9zYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCAmICh+MTMxMDcyKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIFByb21pc2UucHJvdG90eXBlLmRpc3Bvc2VyID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbkRpc3Bvc2VyKGZuLCB0aGlzLCBjcmVhdGVDb250ZXh0KCkpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICB9O1xuXG59O1xuXG59LHtcIi4vZXJyb3JzXCI6MTIsXCIuL3V0aWxcIjozNn1dLDM2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xudmFyIGVzNSA9IF9kZXJlcV8oXCIuL2VzNVwiKTtcbnZhciBjYW5FdmFsdWF0ZSA9IHR5cGVvZiBuYXZpZ2F0b3IgPT0gXCJ1bmRlZmluZWRcIjtcblxudmFyIGVycm9yT2JqID0ge2U6IHt9fTtcbnZhciB0cnlDYXRjaFRhcmdldDtcbnZhciBnbG9iYWxPYmplY3QgPSB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOlxuICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOlxuICAgIHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOlxuICAgIHRoaXMgIT09IHVuZGVmaW5lZCA/IHRoaXMgOiBudWxsO1xuXG5mdW5jdGlvbiB0cnlDYXRjaGVyKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0cnlDYXRjaFRhcmdldDtcbiAgICAgICAgdHJ5Q2F0Y2hUYXJnZXQgPSBudWxsO1xuICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvck9iai5lID0gZTtcbiAgICAgICAgcmV0dXJuIGVycm9yT2JqO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRyeUNhdGNoKGZuKSB7XG4gICAgdHJ5Q2F0Y2hUYXJnZXQgPSBmbjtcbiAgICByZXR1cm4gdHJ5Q2F0Y2hlcjtcbn1cblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24oQ2hpbGQsIFBhcmVudCkge1xuICAgIHZhciBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgICBmdW5jdGlvbiBUKCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gQ2hpbGQ7XG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IkID0gUGFyZW50O1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gUGFyZW50LnByb3RvdHlwZSkge1xuICAgICAgICAgICAgaWYgKGhhc1Byb3AuY2FsbChQYXJlbnQucHJvdG90eXBlLCBwcm9wZXJ0eU5hbWUpICYmXG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lLmNoYXJBdChwcm9wZXJ0eU5hbWUubGVuZ3RoLTEpICE9PSBcIiRcIlxuICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZSArIFwiJFwiXSA9IFBhcmVudC5wcm90b3R5cGVbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBULnByb3RvdHlwZSA9IFBhcmVudC5wcm90b3R5cGU7XG4gICAgQ2hpbGQucHJvdG90eXBlID0gbmV3IFQoKTtcbiAgICByZXR1cm4gQ2hpbGQucHJvdG90eXBlO1xufTtcblxuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWwpIHtcbiAgICByZXR1cm4gdmFsID09IG51bGwgfHwgdmFsID09PSB0cnVlIHx8IHZhbCA9PT0gZmFsc2UgfHxcbiAgICAgICAgdHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiO1xuXG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gbWF5YmVXcmFwQXNFcnJvcihtYXliZUVycm9yKSB7XG4gICAgaWYgKCFpc1ByaW1pdGl2ZShtYXliZUVycm9yKSkgcmV0dXJuIG1heWJlRXJyb3I7XG5cbiAgICByZXR1cm4gbmV3IEVycm9yKHNhZmVUb1N0cmluZyhtYXliZUVycm9yKSk7XG59XG5cbmZ1bmN0aW9uIHdpdGhBcHBlbmRlZCh0YXJnZXQsIGFwcGVuZGVlKSB7XG4gICAgdmFyIGxlbiA9IHRhcmdldC5sZW5ndGg7XG4gICAgdmFyIHJldCA9IG5ldyBBcnJheShsZW4gKyAxKTtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgcmV0W2ldID0gdGFyZ2V0W2ldO1xuICAgIH1cbiAgICByZXRbaV0gPSBhcHBlbmRlZTtcbiAgICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBnZXREYXRhUHJvcGVydHlPckRlZmF1bHQob2JqLCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmIChlczUuaXNFUzUpIHtcbiAgICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcblxuICAgICAgICBpZiAoZGVzYyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVzYy5nZXQgPT0gbnVsbCAmJiBkZXNjLnNldCA9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgID8gZGVzYy52YWx1ZVxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSA/IG9ialtrZXldIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbm90RW51bWVyYWJsZVByb3Aob2JqLCBuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChpc1ByaW1pdGl2ZShvYmopKSByZXR1cm4gb2JqO1xuICAgIHZhciBkZXNjcmlwdG9yID0ge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfTtcbiAgICBlczUuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiB0aHJvd2VyKHIpIHtcbiAgICB0aHJvdyByO1xufVxuXG52YXIgaW5oZXJpdGVkRGF0YUtleXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4Y2x1ZGVkUHJvdG90eXBlcyA9IFtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLFxuICAgICAgICBPYmplY3QucHJvdG90eXBlLFxuICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGVcbiAgICBdO1xuXG4gICAgdmFyIGlzRXhjbHVkZWRQcm90byA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4Y2x1ZGVkUHJvdG90eXBlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGV4Y2x1ZGVkUHJvdG90eXBlc1tpXSA9PT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBpZiAoZXM1LmlzRVM1KSB7XG4gICAgICAgIHZhciBnZXRLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgICAgIHZhciB2aXNpdGVkS2V5cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICB3aGlsZSAob2JqICE9IG51bGwgJiYgIWlzRXhjbHVkZWRQcm90byhvYmopKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleXM7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAga2V5cyA9IGdldEtleXMob2JqKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2l0ZWRLZXlzW2tleV0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB2aXNpdGVkS2V5c1trZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2MgIT0gbnVsbCAmJiBkZXNjLmdldCA9PSBudWxsICYmIGRlc2Muc2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqID0gZXM1LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgIGlmIChpc0V4Y2x1ZGVkUHJvdG8ob2JqKSkgcmV0dXJuIFtdO1xuICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgICAgICAvKmpzaGludCBmb3JpbjpmYWxzZSAqL1xuICAgICAgICAgICAgZW51bWVyYXRpb246IGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzUHJvcC5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhjbHVkZWRQcm90b3R5cGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzUHJvcC5jYWxsKGV4Y2x1ZGVkUHJvdG90eXBlc1tpXSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIGVudW1lcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcbiAgICB9XG5cbn0pKCk7XG5cbnZhciB0aGlzQXNzaWdubWVudFBhdHRlcm4gPSAvdGhpc1xccypcXC5cXHMqXFxTK1xccyo9LztcbmZ1bmN0aW9uIGlzQ2xhc3MoZm4pIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gZXM1Lm5hbWVzKGZuLnByb3RvdHlwZSk7XG5cbiAgICAgICAgICAgIHZhciBoYXNNZXRob2RzID0gZXM1LmlzRVM1ICYmIGtleXMubGVuZ3RoID4gMTtcbiAgICAgICAgICAgIHZhciBoYXNNZXRob2RzT3RoZXJUaGFuQ29uc3RydWN0b3IgPSBrZXlzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAhKGtleXMubGVuZ3RoID09PSAxICYmIGtleXNbMF0gPT09IFwiY29uc3RydWN0b3JcIik7XG4gICAgICAgICAgICB2YXIgaGFzVGhpc0Fzc2lnbm1lbnRBbmRTdGF0aWNNZXRob2RzID1cbiAgICAgICAgICAgICAgICB0aGlzQXNzaWdubWVudFBhdHRlcm4udGVzdChmbiArIFwiXCIpICYmIGVzNS5uYW1lcyhmbikubGVuZ3RoID4gMDtcblxuICAgICAgICAgICAgaWYgKGhhc01ldGhvZHMgfHwgaGFzTWV0aG9kc090aGVyVGhhbkNvbnN0cnVjdG9yIHx8XG4gICAgICAgICAgICAgICAgaGFzVGhpc0Fzc2lnbm1lbnRBbmRTdGF0aWNNZXRob2RzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9GYXN0UHJvcGVydGllcyhvYmopIHtcbiAgICAvKmpzaGludCAtVzAyNywtVzA1NSwtVzAzMSovXG4gICAgZnVuY3Rpb24gRmFrZUNvbnN0cnVjdG9yKCkge31cbiAgICBGYWtlQ29uc3RydWN0b3IucHJvdG90eXBlID0gb2JqO1xuICAgIHZhciBsID0gODtcbiAgICB3aGlsZSAobC0tKSBuZXcgRmFrZUNvbnN0cnVjdG9yKCk7XG4gICAgcmV0dXJuIG9iajtcbiAgICBldmFsKG9iaik7XG59XG5cbnZhciByaWRlbnQgPSAvXlthLXokX11bYS16JF8wLTldKiQvaTtcbmZ1bmN0aW9uIGlzSWRlbnRpZmllcihzdHIpIHtcbiAgICByZXR1cm4gcmlkZW50LnRlc3Qoc3RyKTtcbn1cblxuZnVuY3Rpb24gZmlsbGVkUmFuZ2UoY291bnQsIHByZWZpeCwgc3VmZml4KSB7XG4gICAgdmFyIHJldCA9IG5ldyBBcnJheShjb3VudCk7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgcmV0W2ldID0gcHJlZml4ICsgaSArIHN1ZmZpeDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gc2FmZVRvU3RyaW5nKG9iaikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBvYmogKyBcIlwiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIFwiW25vIHN0cmluZyByZXByZXNlbnRhdGlvbl1cIjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3Iob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJlxuICAgICAgICAgICB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgIHR5cGVvZiBvYmoubWVzc2FnZSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICB0eXBlb2Ygb2JqLm5hbWUgPT09IFwic3RyaW5nXCI7XG59XG5cbmZ1bmN0aW9uIG1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbihlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AoZSwgXCJpc09wZXJhdGlvbmFsXCIsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaChpZ25vcmUpIHt9XG59XG5cbmZ1bmN0aW9uIG9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uKGUpIHtcbiAgICBpZiAoZSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICgoZSBpbnN0YW5jZW9mIEVycm9yW1wiX19CbHVlYmlyZEVycm9yVHlwZXNfX1wiXS5PcGVyYXRpb25hbEVycm9yKSB8fFxuICAgICAgICBlW1wiaXNPcGVyYXRpb25hbFwiXSA9PT0gdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGNhbkF0dGFjaFRyYWNlKG9iaikge1xuICAgIHJldHVybiBpc0Vycm9yKG9iaikgJiYgZXM1LnByb3BlcnR5SXNXcml0YWJsZShvYmosIFwic3RhY2tcIik7XG59XG5cbnZhciBlbnN1cmVFcnJvck9iamVjdCA9IChmdW5jdGlvbigpIHtcbiAgICBpZiAoIShcInN0YWNrXCIgaW4gbmV3IEVycm9yKCkpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGNhbkF0dGFjaFRyYWNlKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgdHJ5IHt0aHJvdyBuZXcgRXJyb3Ioc2FmZVRvU3RyaW5nKHZhbHVlKSk7fVxuICAgICAgICAgICAgY2F0Y2goZXJyKSB7cmV0dXJuIGVycjt9XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoY2FuQXR0YWNoVHJhY2UodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKHNhZmVUb1N0cmluZyh2YWx1ZSkpO1xuICAgICAgICB9O1xuICAgIH1cbn0pKCk7XG5cbmZ1bmN0aW9uIGNsYXNzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKG9iaik7XG59XG5cbmZ1bmN0aW9uIGNvcHlEZXNjcmlwdG9ycyhmcm9tLCB0bywgZmlsdGVyKSB7XG4gICAgdmFyIGtleXMgPSBlczUubmFtZXMoZnJvbSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICBpZiAoZmlsdGVyKGtleSkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZXM1LmRlZmluZVByb3BlcnR5KHRvLCBrZXksIGVzNS5nZXREZXNjcmlwdG9yKGZyb20sIGtleSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgYXNBcnJheSA9IGZ1bmN0aW9uKHYpIHtcbiAgICBpZiAoZXM1LmlzQXJyYXkodikpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgU3ltYm9sLml0ZXJhdG9yKSB7XG4gICAgdmFyIEFycmF5RnJvbSA9IHR5cGVvZiBBcnJheS5mcm9tID09PSBcImZ1bmN0aW9uXCIgPyBmdW5jdGlvbih2KSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHYpO1xuICAgIH0gOiBmdW5jdGlvbih2KSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgdmFyIGl0ID0gdltTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgICAgIHZhciBpdFJlc3VsdDtcbiAgICAgICAgd2hpbGUgKCEoKGl0UmVzdWx0ID0gaXQubmV4dCgpKS5kb25lKSkge1xuICAgICAgICAgICAgcmV0LnB1c2goaXRSZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcblxuICAgIGFzQXJyYXkgPSBmdW5jdGlvbih2KSB7XG4gICAgICAgIGlmIChlczUuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH0gZWxzZSBpZiAodiAhPSBudWxsICYmIHR5cGVvZiB2W1N5bWJvbC5pdGVyYXRvcl0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5RnJvbSh2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xufVxuXG52YXIgaXNOb2RlID0gdHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgY2xhc3NTdHJpbmcocHJvY2VzcykudG9Mb3dlckNhc2UoKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCI7XG5cbmZ1bmN0aW9uIGVudihrZXksIGRlZikge1xuICAgIHJldHVybiBpc05vZGUgPyBwcm9jZXNzLmVudltrZXldIDogZGVmO1xufVxuXG5mdW5jdGlvbiBnZXROYXRpdmVQcm9taXNlKCkge1xuICAgIGlmICh0eXBlb2YgUHJvbWlzZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKCl7fSk7XG4gICAgICAgICAgICBpZiAoe30udG9TdHJpbmcuY2FsbChwcm9taXNlKSA9PT0gXCJbb2JqZWN0IFByb21pc2VdXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRvbWFpbkJpbmQoc2VsZiwgY2IpIHtcbiAgICByZXR1cm4gc2VsZi5iaW5kKGNiKTtcbn1cblxudmFyIHJldCA9IHtcbiAgICBpc0NsYXNzOiBpc0NsYXNzLFxuICAgIGlzSWRlbnRpZmllcjogaXNJZGVudGlmaWVyLFxuICAgIGluaGVyaXRlZERhdGFLZXlzOiBpbmhlcml0ZWREYXRhS2V5cyxcbiAgICBnZXREYXRhUHJvcGVydHlPckRlZmF1bHQ6IGdldERhdGFQcm9wZXJ0eU9yRGVmYXVsdCxcbiAgICB0aHJvd2VyOiB0aHJvd2VyLFxuICAgIGlzQXJyYXk6IGVzNS5pc0FycmF5LFxuICAgIGFzQXJyYXk6IGFzQXJyYXksXG4gICAgbm90RW51bWVyYWJsZVByb3A6IG5vdEVudW1lcmFibGVQcm9wLFxuICAgIGlzUHJpbWl0aXZlOiBpc1ByaW1pdGl2ZSxcbiAgICBpc09iamVjdDogaXNPYmplY3QsXG4gICAgaXNFcnJvcjogaXNFcnJvcixcbiAgICBjYW5FdmFsdWF0ZTogY2FuRXZhbHVhdGUsXG4gICAgZXJyb3JPYmo6IGVycm9yT2JqLFxuICAgIHRyeUNhdGNoOiB0cnlDYXRjaCxcbiAgICBpbmhlcml0czogaW5oZXJpdHMsXG4gICAgd2l0aEFwcGVuZGVkOiB3aXRoQXBwZW5kZWQsXG4gICAgbWF5YmVXcmFwQXNFcnJvcjogbWF5YmVXcmFwQXNFcnJvcixcbiAgICB0b0Zhc3RQcm9wZXJ0aWVzOiB0b0Zhc3RQcm9wZXJ0aWVzLFxuICAgIGZpbGxlZFJhbmdlOiBmaWxsZWRSYW5nZSxcbiAgICB0b1N0cmluZzogc2FmZVRvU3RyaW5nLFxuICAgIGNhbkF0dGFjaFRyYWNlOiBjYW5BdHRhY2hUcmFjZSxcbiAgICBlbnN1cmVFcnJvck9iamVjdDogZW5zdXJlRXJyb3JPYmplY3QsXG4gICAgb3JpZ2luYXRlc0Zyb21SZWplY3Rpb246IG9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uLFxuICAgIG1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbjogbWFya0FzT3JpZ2luYXRpbmdGcm9tUmVqZWN0aW9uLFxuICAgIGNsYXNzU3RyaW5nOiBjbGFzc1N0cmluZyxcbiAgICBjb3B5RGVzY3JpcHRvcnM6IGNvcHlEZXNjcmlwdG9ycyxcbiAgICBoYXNEZXZUb29sczogdHlwZW9mIGNocm9tZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjaHJvbWUgJiZcbiAgICAgICAgICAgICAgICAgdHlwZW9mIGNocm9tZS5sb2FkVGltZXMgPT09IFwiZnVuY3Rpb25cIixcbiAgICBpc05vZGU6IGlzTm9kZSxcbiAgICBlbnY6IGVudixcbiAgICBnbG9iYWw6IGdsb2JhbE9iamVjdCxcbiAgICBnZXROYXRpdmVQcm9taXNlOiBnZXROYXRpdmVQcm9taXNlLFxuICAgIGRvbWFpbkJpbmQ6IGRvbWFpbkJpbmRcbn07XG5yZXQuaXNSZWNlbnROb2RlID0gcmV0LmlzTm9kZSAmJiAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZlcnNpb24gPSBwcm9jZXNzLnZlcnNpb25zLm5vZGUuc3BsaXQoXCIuXCIpLm1hcChOdW1iZXIpO1xuICAgIHJldHVybiAodmVyc2lvblswXSA9PT0gMCAmJiB2ZXJzaW9uWzFdID4gMTApIHx8ICh2ZXJzaW9uWzBdID4gMCk7XG59KSgpO1xuXG5pZiAocmV0LmlzTm9kZSkgcmV0LnRvRmFzdFByb3BlcnRpZXMocHJvY2Vzcyk7XG5cbnRyeSB7dGhyb3cgbmV3IEVycm9yKCk7IH0gY2F0Y2ggKGUpIHtyZXQubGFzdExpbmVFcnJvciA9IGU7fVxubW9kdWxlLmV4cG9ydHMgPSByZXQ7XG5cbn0se1wiLi9lczVcIjoxM31dfSx7fSxbNF0pKDQpXG59KTsgICAgICAgICAgICAgICAgICAgIDtpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICE9PSBudWxsKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5QID0gd2luZG93LlByb21pc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmICE9PSBudWxsKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlAgPSBzZWxmLlByb21pc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ibHVlYmlyZC9qcy9icm93c2VyL2JsdWViaXJkLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBKYXZhU2NyaXB0IENvb2tpZSB2Mi4xLjNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qcy1jb29raWUvanMtY29va2llXG4gKlxuICogQ29weXJpZ2h0IDIwMDYsIDIwMTUgS2xhdXMgSGFydGwgJiBGYWduZXIgQnJhY2tcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG47KGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdHZhciByZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIgPSBmYWxzZTtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0XHRyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIgPSB0cnVlO1xuXHR9XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0XHRyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIgPSB0cnVlO1xuXHR9XG5cdGlmICghcmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyKSB7XG5cdFx0dmFyIE9sZENvb2tpZXMgPSB3aW5kb3cuQ29va2llcztcblx0XHR2YXIgYXBpID0gd2luZG93LkNvb2tpZXMgPSBmYWN0b3J5KCk7XG5cdFx0YXBpLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR3aW5kb3cuQ29va2llcyA9IE9sZENvb2tpZXM7XG5cdFx0XHRyZXR1cm4gYXBpO1xuXHRcdH07XG5cdH1cbn0oZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBleHRlbmQgKCkge1xuXHRcdHZhciBpID0gMDtcblx0XHR2YXIgcmVzdWx0ID0ge307XG5cdFx0Zm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhdHRyaWJ1dGVzID0gYXJndW1lbnRzWyBpIF07XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRyZXN1bHRba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGluaXQgKGNvbnZlcnRlcikge1xuXHRcdGZ1bmN0aW9uIGFwaSAoa2V5LCB2YWx1ZSwgYXR0cmlidXRlcykge1xuXHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV3JpdGVcblxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdGF0dHJpYnV0ZXMgPSBleHRlbmQoe1xuXHRcdFx0XHRcdHBhdGg6ICcvJ1xuXHRcdFx0XHR9LCBhcGkuZGVmYXVsdHMsIGF0dHJpYnV0ZXMpO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdHZhciBleHBpcmVzID0gbmV3IERhdGUoKTtcblx0XHRcdFx0XHRleHBpcmVzLnNldE1pbGxpc2Vjb25kcyhleHBpcmVzLmdldE1pbGxpc2Vjb25kcygpICsgYXR0cmlidXRlcy5leHBpcmVzICogODY0ZSs1KTtcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLmV4cGlyZXMgPSBleHBpcmVzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cdFx0XHRcdFx0aWYgKC9eW1xce1xcW10vLnRlc3QocmVzdWx0KSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSByZXN1bHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXG5cdFx0XHRcdGlmICghY29udmVydGVyLndyaXRlKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSlcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC8lKDIzfDI0fDI2fDJCfDNBfDNDfDNFfDNEfDJGfDNGfDQwfDVCfDVEfDVFfDYwfDdCfDdEfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gY29udmVydGVyLndyaXRlKHZhbHVlLCBrZXkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0a2V5ID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhrZXkpKTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8NUV8NjB8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9bXFwoXFwpXS9nLCBlc2NhcGUpO1xuXG5cdFx0XHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0gW1xuXHRcdFx0XHRcdGtleSwgJz0nLCB2YWx1ZSxcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLmV4cGlyZXMgPyAnOyBleHBpcmVzPScgKyBhdHRyaWJ1dGVzLmV4cGlyZXMudG9VVENTdHJpbmcoKSA6ICcnLCAvLyB1c2UgZXhwaXJlcyBhdHRyaWJ1dGUsIG1heC1hZ2UgaXMgbm90IHN1cHBvcnRlZCBieSBJRVxuXHRcdFx0XHRcdGF0dHJpYnV0ZXMucGF0aCA/ICc7IHBhdGg9JyArIGF0dHJpYnV0ZXMucGF0aCA6ICcnLFxuXHRcdFx0XHRcdGF0dHJpYnV0ZXMuZG9tYWluID8gJzsgZG9tYWluPScgKyBhdHRyaWJ1dGVzLmRvbWFpbiA6ICcnLFxuXHRcdFx0XHRcdGF0dHJpYnV0ZXMuc2VjdXJlID8gJzsgc2VjdXJlJyA6ICcnXG5cdFx0XHRcdF0uam9pbignJykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZWFkXG5cblx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdHJlc3VsdCA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG5cdFx0XHQvLyBpbiBjYXNlIHRoZXJlIGFyZSBubyBjb29raWVzIGF0IGFsbC4gQWxzbyBwcmV2ZW50cyBvZGQgcmVzdWx0IHdoZW5cblx0XHRcdC8vIGNhbGxpbmcgXCJnZXQoKVwiXG5cdFx0XHR2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZSA/IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXHRcdFx0dmFyIHJkZWNvZGUgPSAvKCVbMC05QS1aXXsyfSkrL2c7XG5cdFx0XHR2YXIgaSA9IDA7XG5cblx0XHRcdGZvciAoOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBjb29raWVzW2ldLnNwbGl0KCc9Jyk7XG5cdFx0XHRcdHZhciBjb29raWUgPSBwYXJ0cy5zbGljZSgxKS5qb2luKCc9Jyk7XG5cblx0XHRcdFx0aWYgKGNvb2tpZS5jaGFyQXQoMCkgPT09ICdcIicpIHtcblx0XHRcdFx0XHRjb29raWUgPSBjb29raWUuc2xpY2UoMSwgLTEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR2YXIgbmFtZSA9IHBhcnRzWzBdLnJlcGxhY2UocmRlY29kZSwgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0XHRjb29raWUgPSBjb252ZXJ0ZXIucmVhZCA/XG5cdFx0XHRcdFx0XHRjb252ZXJ0ZXIucmVhZChjb29raWUsIG5hbWUpIDogY29udmVydGVyKGNvb2tpZSwgbmFtZSkgfHxcblx0XHRcdFx0XHRcdGNvb2tpZS5yZXBsYWNlKHJkZWNvZGUsIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5qc29uKSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRjb29raWUgPSBKU09OLnBhcnNlKGNvb2tpZSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChrZXkgPT09IG5hbWUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGNvb2tpZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdFx0XHRyZXN1bHRbbmFtZV0gPSBjb29raWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGFwaS5zZXQgPSBhcGk7XG5cdFx0YXBpLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBhcGkuY2FsbChhcGksIGtleSk7XG5cdFx0fTtcblx0XHRhcGkuZ2V0SlNPTiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBhcGkuYXBwbHkoe1xuXHRcdFx0XHRqc29uOiB0cnVlXG5cdFx0XHR9LCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuXHRcdH07XG5cdFx0YXBpLmRlZmF1bHRzID0ge307XG5cblx0XHRhcGkucmVtb3ZlID0gZnVuY3Rpb24gKGtleSwgYXR0cmlidXRlcykge1xuXHRcdFx0YXBpKGtleSwgJycsIGV4dGVuZChhdHRyaWJ1dGVzLCB7XG5cdFx0XHRcdGV4cGlyZXM6IC0xXG5cdFx0XHR9KSk7XG5cdFx0fTtcblxuXHRcdGFwaS53aXRoQ29udmVydGVyID0gaW5pdDtcblxuXHRcdHJldHVybiBhcGk7XG5cdH1cblxuXHRyZXR1cm4gaW5pdChmdW5jdGlvbiAoKSB7fSk7XG59KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vanMtY29va2llL3NyYy9qcy5jb29raWUuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBmZXRjaCA9IHJlcXVpcmUoJ2lzb21vcnBoaWMtZmV0Y2gnKTtcbnZhciBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmwsIG9wdGlvbnMpIHtcblxuICB2YXIgcmV0cmllcyA9IDM7XG4gIHZhciByZXRyeURlbGF5ID0gMTAwMDtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJldHJpZXMpIHtcbiAgICByZXRyaWVzID0gb3B0aW9ucy5yZXRyaWVzO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeURlbGF5KSB7XG4gICAgcmV0cnlEZWxheSA9IG9wdGlvbnMucmV0cnlEZWxheTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgd3JhcHBlZEZldGNoID0gZnVuY3Rpb24obikge1xuICAgICAgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBpZiAobiA+IDApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHdyYXBwZWRGZXRjaCgtLW4pO1xuICAgICAgICAgICAgfSwgcmV0cnlEZWxheSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHdyYXBwZWRGZXRjaChyZXRyaWVzKTtcbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZldGNoLXJldHJ5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gdGhlIHdoYXR3Zy1mZXRjaCBwb2x5ZmlsbCBpbnN0YWxscyB0aGUgZmV0Y2goKSBmdW5jdGlvblxuLy8gb24gdGhlIGdsb2JhbCBvYmplY3QgKHdpbmRvdyBvciBzZWxmKVxuLy9cbi8vIFJldHVybiB0aGF0IGFzIHRoZSBleHBvcnQgZm9yIHVzZSBpbiBXZWJwYWNrLCBCcm93c2VyaWZ5IGV0Yy5cbnJlcXVpcmUoJ3doYXR3Zy1mZXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBzZWxmLmZldGNoLmJpbmQoc2VsZik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaXNvbW9ycGhpYy1mZXRjaC9mZXRjaC1ucG0tYnJvd3NlcmlmeS5qc1xuLy8gbW9kdWxlIGlkID0gMzI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcblxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnVybCA9IGlucHV0XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywgeyBib2R5OiB0aGlzLl9ib2R5SW5pdCB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgYm9keS50cmltKCkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuICAgIHJhd0hlYWRlcnMuc3BsaXQoJ1xcclxcbicpLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3doYXR3Zy1mZXRjaC9mZXRjaC5qc1xuLy8gbW9kdWxlIGlkID0gMzI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGNvb2tpZSA9IHJlcXVpcmUoJ2pzLWNvb2tpZScpO1xuaW1wb3J0IFJvdXRlciBmcm9tICcuL21vZHVsZXMvcm91dGVyJztcbmltcG9ydCBMb2dpblZpZXcgZnJvbSAnLi92aWV3cy9sb2dpblZpZXcnO1xuaW1wb3J0IFJlZ2lzdHJhdGlvblZpZXcgZnJvbSAnLi92aWV3cy9yZWdpc3RyYXRpb25WaWV3JztcbmltcG9ydCBTY29yZWJvYXJkVmlldyBmcm9tICcuL3ZpZXdzL3Njb3JlYm9hcmRWaWV3JztcbmltcG9ydCBSb29tc1ZpZXcgZnJvbSAnLi92aWV3cy9yb29tc1ZpZXcnO1xuaW1wb3J0IEdhbWVWaWV3IGZyb20gJy4vdmlld3MvZ2FtZVZpZXcnO1xuXG5sZXQgcm91dGVyID0gbmV3IFJvdXRlcigpO1xucm91dGVyLmFkZFJvdXRlKCcvbG9naW4nLCBMb2dpblZpZXcpO1xucm91dGVyLmFkZFJvdXRlKCcvcmVnaXN0cmF0aW9uJywgUmVnaXN0cmF0aW9uVmlldyk7XG5yb3V0ZXIuYWRkUm91dGUoJy9zY29yZWJvYXJkJywgU2NvcmVib2FyZFZpZXcpO1xucm91dGVyLmFkZFJvdXRlKCcvcm9vbXMnLCBSb29tc1ZpZXcpO1xucm91dGVyLmFkZFJvdXRlKCcvZ2FtZScsIEdhbWVWaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnLycsIExvZ2luVmlldyk7XG5yb3V0ZXIuc3RhcnQoKTtcbndpbmRvdy5yb3V0ZXIgPSByb3V0ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvYWlyZHJvbmUuanMiLCIvKipcbiAqINCa0LvQsNGB0YEg0L/RgNC10LTRgdGC0LDQstC70Y/QtdGCINGB0L7QsdC+0Lkgdmlld1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcblx0LyoqXG5cdCAqINCh0L7Qt9C00LDRkdGCINC90L7QstGD0Y4gdmlld1xuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0J7QsdGK0LXQutGCINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lhcblx0ICovXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLnNldFJvdXRlcih3aW5kb3cucm91dGVyKTtcblx0XHR0aGlzLnRhZ05hbWUgPSBvcHRpb25zLnRhZ05hbWUgfHwgJ2Rpdic7XG4gICAgICAgIHRoaXMuX2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLmVsZW1lbnQpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy50YWdOYW1lKTtcbiAgICAgICAgdGhpcy5ib2R5Q2xhc3MgPSBvcHRpb25zLmJvZHlDbGFzcztcbiAgICAgICAgdGhpcy5oaWRlKCk7XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0L/QsNGA0LDQvNC10YLRgNC+0LIgdmlldyAo0LLRi9C/0L7Qu9C90Y/QtdGC0YHRjyDRgdGA0LDQt9GDINC/0L7RgdC70LUg0YHQvtC30LTQsNC90LjRjylcblx0ICog0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQv9GA0LXQtNC10LvRj9GC0Yxcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRpbml0KG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuc2V0QXR0cnMob3B0aW9ucy5hdHRycyk7XG5cdH1cblxuXHQvKipcblx0ICog0JLRi9C30YvQstCw0LXRgtGB0Y8g0L/RgNC4INC/0YDQuNC+0YHRgtCw0L3QvtCy0LrQtSDRgNCw0LHQvtGC0YsgdmlldyAo0L/RgNC4INGB0LrRgNGL0YLQuNC4IHZpZXcg0LjQu9C4INC/0LXRgNC10YXQvtC00LUg0L3QsCDQtNGA0YPQs9GD0Y4gdmlldylcblx0ICog0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQvtC/0YDQtdC00LXQu9GP0YLRjCDRgdCy0L7QtdC5INC70L7Qs9C40LrQvtC5XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0cGF1c2Uob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5oaWRlKCk7XG5cdH1cblxuXHQvKipcblx0ICog0JLRi9C30YvQstCw0LXRgtGB0Y8g0L/RgNC4INC90LDRh9Cw0LvQtSDQuNC70Lgg0L/RgNC+0LTQvtC70LbQtdC90LjQuCDRgNCw0LHQvtGC0YsgdmlldyAo0L/QvtGB0LvQtSDRgtC+0LPQviwg0LrQsNC6IHZpZXcg0LHRi9C70LAg0YHQutGA0YvRgtCwKVxuXHQgKiDQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC+0L/RgNC10LTQtdC70Y/RgtGMINGB0LLQvtC10Lkg0LvQvtCz0LjQutC+0Llcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRyZXN1bWUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG5cdFx0dGhpcy5zaG93KCk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC60LDQt9GL0LLQsNC10YIgdmlld1xuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0J7QsdGK0LXQutGCINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lhcblx0ICovXG5cdHNob3cob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdHNlbGYuX2VsLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBpZiAoc2VsZi5ib2R5Q2xhc3MpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChzZWxmLmJvZHlDbGFzcyk7XG4gICAgICAgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQodC60YDRi9Cy0LDQtdGCIHZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRoaWRlKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblx0XHRzZWxmLl9lbC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBpZiAoc2VsZi5ib2R5Q2xhc3MpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShzZWxmLmJvZHlDbGFzcyk7XG4gICAgICAgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQoNC10L3QtNC10YDQuNGCIHZpZXdcblx0ICog0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQvtC/0YDQtdC00LXQu9GP0YLRjFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0J7QsdGK0LXQutGCINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lhcblx0ICovXG5cdHJlbmRlcihvcHRpb25zID0ge30pIHtcblxuXHR9XG5cblx0LyoqXG5cdCAqINCS0YHRgtCw0LLQu9GP0LXRgiDRgtC10LrRg9GJ0YPRjiB2aWV3INCyINC/0LXRgNC10LTQsNC90L3Ri9C5INGN0LvQtdC80LXQvdGCXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gSFRNTC3RjdC70LXQvNC10L3Rgiwg0Log0LrQvtGC0L7RgNC+0LzRgyDQtNC+0LHQsNCy0LvRj9C10YLRgdGPINGN0LvQtdC80LXQvdGCINGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICovXG5cdGFwcGVuZFRvKGVsKSB7XG5cdFx0ZWwuYXBwZW5kQ2hpbGQodGhpcy5fZWwpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCj0LTQsNC70Y/QtdGCINGN0LvQtdC80LXQvdGCINGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICovXG5cdHJlbW92ZSgpIHtcblx0XHR0aGlzLl9lbCAmJiB0aGlzLl9lbC5yZW1vdmUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQl9Cw0LzQtdC90Y/QtdGCINGN0LvQtdC80LXQvdGCINGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBIVE1MLdGN0LvQtdC80LXQvdGCLCDQutC+0YLQvtGA0YvQuSDRgdGC0LDQvdC+0LLQuNGC0YHRjyDRjdC70LXQvNC10L3RgtC+0Lwg0YLQtdC60YPRidC10Lkgdmlld1xuXHQgKi9cblx0c2V0RWxlbWVudChlbCkge1xuXHRcdHRoaXMuX2VsICYmIHRoaXMuX2VsLnJlbW92ZSgpO1xuXHRcdHRoaXMuX2VsID0gZWw7XG5cdH1cblxuXHQvKipcblx0ICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YPRidC10LkgdmlldyDQvdCw0LHQvtGAINCw0YLRgNC40LHRg9GC0L7QslxuXHQgKiBAcGFyYW0ge09iamVjdH0gW2F0dHJzPXt9XSAtINCe0LHRitC10LrRgiDRgSDQsNGC0YDQuNCx0YPRgtCw0LzQuCwg0LrQvtGC0L7RgNGL0LUg0LHRg9C00YPRgiDRg9GB0YLQsNC90L7QstC70LXQvdGLINGDINGC0LXQutGD0YnQtdCz0L4g0Y3Qu9C10LzQtdC90YLQsCB2aWV3XG5cdCAqL1xuXHRzZXRBdHRycyhhdHRycyA9IHt9KSB7XG5cdFx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHR0aGlzLl9lbC5zZXRBdHRyaWJ1dGUobmFtZSwgYXR0cnNbbmFtZV0pO1xuXHRcdH0pXG5cdH1cblxuXHQvKipcblx0ICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YHRgtGA0L7QutGDLCDRgdC+0LTQtdGA0LbQsNGI0YPRjiDRgtC10LrRgdGC0L7QstC+0LUg0L/RgNC10LTRgdGC0LDQstC70LXQvdC40LUg0YLQtdC60YPRidC10Lkgdmlld1xuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2VsLm91dGVySFRNTDtcblx0fVxuXG5cdC8qKlxuXHQgKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDRgtC10LrRg9GJ0LXQuSB2aWV3INGA0L7Rg9GC0LXRgFxuXHQgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIC0g0LjQvdGB0YLQsNC90YEg0YDQvtGD0YLQtdGA0LBcblx0ICovXG5cdHNldFJvdXRlcihyb3V0ZXIpIHtcblx0XHR0aGlzLnJvdXRlciA9IHJvdXRlcjtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZHVsZXMvdmlldy5qcyIsInZhciBuZXh0VGljayA9IHJlcXVpcmUoJ3Byb2Nlc3MvYnJvd3Nlci5qcycpLm5leHRUaWNrO1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGltbWVkaWF0ZUlkcyA9IHt9O1xudmFyIG5leHRJbW1lZGlhdGVJZCA9IDA7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7IHRpbWVvdXQuY2xvc2UoKTsgfTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbCh3aW5kb3csIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBUaGF0J3Mgbm90IGhvdyBub2RlLmpzIGltcGxlbWVudHMgaXQgYnV0IHRoZSBleHBvc2VkIGFwaSBpcyB0aGUgc2FtZS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogZnVuY3Rpb24oZm4pIHtcbiAgdmFyIGlkID0gbmV4dEltbWVkaWF0ZUlkKys7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBmYWxzZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICBpbW1lZGlhdGVJZHNbaWRdID0gdHJ1ZTtcblxuICBuZXh0VGljayhmdW5jdGlvbiBvbk5leHRUaWNrKCkge1xuICAgIGlmIChpbW1lZGlhdGVJZHNbaWRdKSB7XG4gICAgICAvLyBmbi5jYWxsKCkgaXMgZmFzdGVyIHNvIHdlIG9wdGltaXplIGZvciB0aGUgY29tbW9uIHVzZS1jYXNlXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9qc3BlcmYuY29tL2NhbGwtYXBwbHktc2VndVxuICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbi5jYWxsKG51bGwpO1xuICAgICAgfVxuICAgICAgLy8gUHJldmVudCBpZHMgZnJvbSBsZWFraW5nXG4gICAgICBleHBvcnRzLmNsZWFySW1tZWRpYXRlKGlkKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpZDtcbn07XG5cbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSB0eXBlb2YgY2xlYXJJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IGNsZWFySW1tZWRpYXRlIDogZnVuY3Rpb24oaWQpIHtcbiAgZGVsZXRlIGltbWVkaWF0ZUlkc1tpZF07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSA4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9saWJzJztcbmNvbnN0IGNvb2tpZSA9IHJlcXVpcmUoJ2pzLWNvb2tpZScpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gZGF0YS51c2VybmFtZSB8fCAnJztcbiAgICAgICAgdGhpcy5lbWFpbCA9IGRhdGEuZW1haWw7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBkYXRhLnBhc3N3b3JkO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5nYW1lcyA9IDA7XG5cbiAgICAgICAgdGhpcy5lbWFpbEVycm9yID0gJyc7XG4gICAgICAgIHRoaXMucGFzc3dvcmRFcnJvciA9ICcnO1xuICAgICAgICB0aGlzLmxvZ2luRXJyb3IgPSAnJztcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUxvZ2luICgpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlcm5hbWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5sb2dpbkVycm9yID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQstCy0LXQtNC40YLQtSDQutC70LjQutGD0YXRgyEnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9naW5FcnJvciA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBhc3N3b3JkKCkge1xuICAgICAgICBpZiAodGhpcy5wYXNzd29yZC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjCEnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhc3N3b3JkLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRFcnJvciA9ICfQn9Cw0YDQvtC70Ywg0L3Rg9C20LXQvSDQtNC70LjQvdC90LXQtSA4INGB0LjQvNCy0L7Qu9C+0LIgPSgnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFzc3dvcmRFcnJvciA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUVtYWlsKCkge1xuICAgICAgICBpZiAodGhpcy5lbWFpbC5zZWFyY2goLy4rQC4rXFwuLisvKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZW1haWxFcnJvciA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0L/RgNC+0LLQtdGA0YzRgtC1INC/0YDQsNCy0LjQu9GM0L3QvtGB0YLRjCBlLW1haWwnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1haWxFcnJvciA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzZWxmLnZhbGlkYXRlRW1haWwoKSAmJiBzZWxmLnZhbGlkYXRlTG9naW4oKSAmJiBzZWxmLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICB9XG5cbiAgICBnZXRFbWFpbEVycm9yICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxFcnJvcjtcbiAgICB9XG5cbiAgICBnZXRMb2dpbkVycm9yICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW5FcnJvcjtcbiAgICB9XG5cbiAgICBnZXRQYXNzd29yZEVycm9yICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFzc3dvcmRFcnJvcjtcbiAgICB9XG5cbiAgICBzYXZlICgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLFxuICAgICAgICAgICAgZW1haWw6IHRoaXMuZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgICAgICAgIGdhbWVzOiB0aGlzLmdhbWVzLFxuICAgICAgICAgICAgc2NvcmU6IHRoaXMuc2NvcmUsXG4gICAgICAgIH07XG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QoJ2h0dHBzOi8vYWlyLWRyb25lLmhlcm9rdWFwcC5jb20vdXNlcicsICdQT1NUJywgZGF0YSk7XG4gICAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIDQwMDpcbiAgICAgICAgICAgIGNhc2UgNDAzOiB0aGlzLmVtYWlsRXJyb3IgPSAn0J/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINGBINGC0LDQutC40Lwg0LDQtNGA0LXRgdC+0Lwg0YPQttC1INC70LXRgtCw0LXRgiEnO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFzc3dvcmRFcnJvciA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyMDA6IHRoaXMuZW1haWxFcnJvciA9IHRoaXMucGFzc3dvcmRFcnJvciA9IHRoaXMubG9naW5FcnJvciA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgIGNvb2tpZS5yZW1vdmUoJ2FpcmRyb25lRW1haWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb29raWUuc2V0KCdhaXJkcm9uZUVtYWlsJywgZGF0YS5lbWFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmxvZygn0KfRgtC+LdGC0L4g0L3QtSDRgtCw0LosINC90L4g0L3QtSA0MDAnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgZGVsZXRlICgpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgIH1cblxuICAgIGxvZ2luICgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdCgnaHR0cHM6Ly9haXItZHJvbmUuaGVyb2t1YXBwLmNvbS9zZXNzaW9uJywgJ1BPU1QnLCBkYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzKVxuICAgICAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSA0MDA6XG4gICAgICAgICAgICBjYXNlIDQwMzogdGhpcy5lbWFpbEVycm9yID0gJ9Cd0LXQstC10YDQvdGL0Lkg0LvQvtCz0LjQvSDQuNC70Lgg0L/QsNGA0L7Qu9GMISc7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDIwMDogdGhpcy5lbWFpbEVycm9yID0gdGhpcy5wYXNzd29yZEVycm9yID0gdGhpcy5sb2dpbkVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VybmFtZSA9IHJlc3BvbnNlLnJlc3BvbnNlLnVzZXJuYW1lOyAvLyDQmtC+0LPQtNCwINC90LUg0LHRg9C00LXRgiDRgNCw0LHQvtGC0LDRgtGMLCDQvtGI0LjQsdC60YMg0LjRgdC60LDRgtGMINC30LTQtdGB0YwuXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZSA9IHJlc3BvbnNlLnJlc3BvbnNlLnNjb3JlO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSByZXNwb25zZS5yZXNwb25zZS5nYW1lcztcbiAgICAgICAgICAgICAgICAgICAgICBjb29raWUucmVtb3ZlKCdhaXJkcm9uZUVtYWlsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgY29va2llLnNldCgnYWlyZHJvbmVFbWFpbCcsIGRhdGEuZW1haWwpO1xuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5sb2coJ9Cn0YLQvi3RgtC+INC90LUg0YLQsNC6LCDQvdC+INC90LUgNDAwJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIGdldFNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kZWxzL1VzZXJNb2RlbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=