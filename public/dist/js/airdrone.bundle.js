webpackJsonp([0],{

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = __webpack_require__(140);

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

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _gameTmpl = __webpack_require__(127);

var _gameTmpl2 = _interopRequireDefault(_gameTmpl);

var _GameModel = __webpack_require__(137);

var _GameModel2 = _interopRequireDefault(_GameModel);

var _canvas = __webpack_require__(132);

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fetchRetry = __webpack_require__(324);

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

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _UserModel = __webpack_require__(89);

var _UserModel2 = _interopRequireDefault(_UserModel);

var _loginTmpl = __webpack_require__(128);

var _loginTmpl2 = _interopRequireDefault(_loginTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginView = function (_View) {
    _inherits(LoginView, _View);

    function LoginView() {
        _classCallCheck(this, LoginView);

        return _possibleConstructorReturn(this, (LoginView.__proto__ || Object.getPrototypeOf(LoginView)).call(this, { element: '.js-login', bodyClass: 'body-login' }));
    }

    _createClass(LoginView, [{
        key: 'render',
        value: function render() {
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

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _UserModel = __webpack_require__(89);

var _UserModel2 = _interopRequireDefault(_UserModel);

var _registrationTmpl = __webpack_require__(129);

var _registrationTmpl2 = _interopRequireDefault(_registrationTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _RoomCollection = __webpack_require__(133);

var _RoomCollection2 = _interopRequireDefault(_RoomCollection);

var _DroneModel = __webpack_require__(136);

var _DroneModel2 = _interopRequireDefault(_DroneModel);

var _roomsTmpl = __webpack_require__(130);

var _roomsTmpl2 = _interopRequireDefault(_roomsTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // TODO: user id from cookie to drone model


var RoomsView = function (_View) {
    _inherits(RoomsView, _View);

    function RoomsView() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, RoomsView);

        var _this = _possibleConstructorReturn(this, (RoomsView.__proto__ || Object.getPrototypeOf(RoomsView)).call(this, { element: '.js-rooms', bodyClass: 'body-rooms' }));

        _this.roomCollection = new _RoomCollection2.default();
        _this.drone = new _DroneModel2.default();
        _this.selectedRoom = undefined;
        return _this;
    }

    _createClass(RoomsView, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.roomCollection.fetch().then(function () {
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
                    var r = _step4.value;

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

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _UserCollection = __webpack_require__(134);

var _UserCollection2 = _interopRequireDefault(_UserCollection);

var _scoreboardTmpl = __webpack_require__(131);

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

/***/ 127:
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

/***/ 128:
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

/***/ 129:
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

/***/ 130:
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

/***/ 131:
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

/***/ 132:
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = gameCanvas;
function gameCanvas() {
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

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
        switch (mode) {
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
                    mode = 0;
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
                            mode = 0;
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
    window.onkeydown = function (evt) {
        evt = evt || window.event;
        //Квадракоптер под ударом
        if (evt.keyCode == 90) {
            mode = 1;
            status = parseFloat(0.0);
        }
        //Захват противника
        else if (evt.keyCode == 88) {
                mode = 2;
                status = parseFloat(0.0);
            }
    };
}

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RoomModel = __webpack_require__(138);

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

/***/ 134:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ 135:
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

/***/ 136:
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
        this.color = data.color || undefined;
        this.playerLogin = data.playerLogin || 'New Player';
        this.playerId = data.playerId || 0;
        this.error = '';
    }

    _createClass(RoomModel, [{
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
                        playerId: this.playerId
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

    return RoomModel;
}();

exports.default = RoomModel;

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
                    response(reject);
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

/***/ 138:
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

/***/ 139:
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

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathToRegex = __webpack_require__(139);

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

/***/ 141:
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(86), __webpack_require__(88), __webpack_require__(87).setImmediate))

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var fetch = __webpack_require__(325);
var Promise = __webpack_require__(141);

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

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(327);
module.exports = self.fetch.bind(self);


/***/ },

/***/ 327:
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

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _router = __webpack_require__(118);

var _router2 = _interopRequireDefault(_router);

var _loginView = __webpack_require__(120);

var _loginView2 = _interopRequireDefault(_loginView);

var _registrationView = __webpack_require__(121);

var _registrationView2 = _interopRequireDefault(_registrationView);

var _scoreboardView = __webpack_require__(123);

var _scoreboardView2 = _interopRequireDefault(_scoreboardView);

var _roomsView = __webpack_require__(122);

var _roomsView2 = _interopRequireDefault(_roomsView);

var _gameView = __webpack_require__(119);

var _gameView2 = _interopRequireDefault(_gameView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/***/ 45:
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

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(86).nextTick;
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(87).setImmediate, __webpack_require__(87).clearImmediate))

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _libs = __webpack_require__(135);

var _libs2 = _interopRequireDefault(_libs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

},[328]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL2dhbWVWaWV3LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy92aWV3cy9sb2dpblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL3JlZ2lzdHJhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL3Jvb21zVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3Mvc2NvcmVib2FyZFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9nYW1lLnRtcGwueG1sIiwid2VicGFjazovLy8uL3B1YmxpYy90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9yZWdpc3RyYXRpb24udG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9yb29tcy50bXBsLnhtbCIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvdGVtcGxhdGVzL3Njb3JlYm9hcmQudG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvY29sbGVjdGlvbnMvUm9vbUNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9saWJzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2RlbHMvRHJvbmVNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kZWxzL0dhbWVNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kZWxzL1Jvb21Nb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9wYXRoVG9SZWdleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL2Jyb3dzZXIvYmx1ZWJpcmQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mZXRjaC1yZXRyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzb21vcnBoaWMtZmV0Y2gvZmV0Y2gtbnBtLWJyb3dzZXJpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2FpcmRyb25lLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2R1bGVzL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vfi90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2RlbHMvVXNlck1vZGVsLmpzIl0sIm5hbWVzIjpbIlJvdXRlciIsIl9faW5zdGFuY2UiLCJyb3V0ZXMiLCJhY3RpdmVSb3V0ZSIsImhpc3RvcnkiLCJ3aW5kb3ciLCJwYXRobmFtZSIsInZpZXciLCJvcHRpb25zIiwicm91dGUiLCJzZXRSb3V0ZXIiLCJwdXNoIiwic3RhdGUiLCJvbnBvcHN0YXRlIiwiZXZlbnQiLCJsb2NhdGlvbiIsIm9ucm91dGUiLCJiaW5kIiwiZmluZCIsIm1hdGNoIiwibGVhdmUiLCJuYXZpZ2F0ZSIsInB1c2hTdGF0ZSIsImJhY2siLCJmb3J3YXJkIiwiZmV0Y2hSZXRyeSIsInJlcXVpcmUiLCJHYW1lVmlldyIsImRhdGEiLCJlbGVtZW50IiwiYm9keUNsYXNzIiwiX2dhbWUiLCJfZWwiLCJpbm5lckhUTUwiLCJzb3VyY2UiLCJnZXRWaWRlbyIsInJldHJpZXMiLCJyZXRyeURlbGF5IiwidGhlbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhpZGRlbiIsImNhdGNoIiwiTG9naW5WaWV3IiwiX2Zvcm0iLCJvbnN1Ym1pdCIsImxvZ2luIiwiY2hpbGRyZW4iLCJlbWFpbCIsIm9uYmx1ciIsInZhbGlkYXRlRW1haWwiLCJwYXNzd29yZCIsInZhbGlkYXRlUGFzc3dvcmQiLCJvbmtleXVwIiwiZSIsImtleUNvZGUiLCJyZWdpc3RyYXRpb24iLCJvbmNsaWNrIiwicm91dGVyIiwiZ28iLCJlbWFpbEVycm9yIiwicGFzc3dvcmRFcnJvciIsImVsZW1lbnRzIiwidmFsdWUiLCJzZWFyY2giLCJsZW5ndGgiLCJ2YWxpZGF0ZSIsInVzZXIiLCJyZXNwb25zZSIsImdldEVtYWlsRXJyb3IiLCJnZXRQYXNzd29yZEVycm9yIiwic3RhdHVzIiwiUmVnaXN0cmF0aW9uVmlldyIsInJlZ2lzdGVyIiwicGFzc3dvcmQyIiwidmFsaWRhdGVMb2dpbiIsImxvZ2luRXJyb3IiLCJzdHlsZSIsImRpc3BsYXkiLCJ1c2VybmFtZSIsInNhdmUiLCJ0ZXh0Q29udGVudCIsImdldExvZ2luRXJyb3IiLCJjb25zb2xlIiwibG9nIiwiUm9vbXNWaWV3Iiwicm9vbUNvbGxlY3Rpb24iLCJkcm9uZSIsInNlbGVjdGVkUm9vbSIsInVuZGVmaW5lZCIsImZldGNoIiwiZ2V0Q29sbGVjdGlvbiIsImVycm9yIiwicm9vbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicm9vbSIsInNlbGVjdFJvb20iLCJuZXh0U2libGluZyIsImNvbG9ycyIsImNvbG9yIiwic2VsZWN0Q29sb3IiLCJfam9pbiIsImpvaW4iLCJkZXRhaWxzIiwiaSIsImlkIiwiYyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInIiLCJTY29yZWJvYXJkVmlldyIsInVzZXJDb2xsZWN0aW9uIiwicmVuZGVyIiwic2hvdyIsImJvZHkiLCJnYW1lQ2FudmFzIiwibW9kZSIsInBhcnRpY2xlcyIsImNhbnZhcyIsImNvbnRleHQyRCIsImdldENvbnRleHQiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsIndpZHRoIiwiaW5uZXJXaWR0aCIsImZyYW1lUmF0ZSIsImZyYW1lRGVsYXkiLCJwYXJzZUZsb2F0Iiwic3RhcnRUaW1lIiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGUiLCJyYW5kb21GbG9hdCIsIm1pbiIsIm1heCIsIk1hdGgiLCJyYW5kb20iLCJQYXJ0aWNsZSIsInNjYWxlIiwieCIsInkiLCJyYWRpdXMiLCJ2ZWxvY2l0eVgiLCJ2ZWxvY2l0eVkiLCJzY2FsZVNwZWVkIiwibXMiLCJkcmF3IiwidHJhbnNsYXRlIiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJjbG9zZVBhdGgiLCJmaWxsU3R5bGUiLCJmaWxsIiwicmVzdG9yZSIsImNyZWF0ZUV4cGxvc2lvbiIsIm1pblNpemUiLCJtYXhTaXplIiwiY291bnQiLCJtaW5TcGVlZCIsIm1heFNwZWVkIiwibWluU2NhbGVTcGVlZCIsIm1heFNjYWxlU3BlZWQiLCJhbmdsZSIsInJvdW5kIiwicGFydGljbGUiLCJzcGVlZCIsImNvcyIsInNpbiIsInJlY3RTaXplIiwibWFyZ2luWSIsInN0YXR1c01hcmdpbiIsImFsZXJ0U2l6ZSIsImFsZXJ0TWFyZ2luIiwiY2xlYXJSZWN0Iiwic3BsaWNlIiwiZHJhd1N0YXR1cyIsInJvdW5kUmVjdCIsImdsb2JhbEFscGhhIiwiZm9udCIsInRleHRBbGlnbiIsImZpbGxUZXh0Iiwic2Vjb25kcyIsIkRhdGUiLCJnZXRUaW1lIiwicGFyc2VJbnQiLCJzaXplIiwib2Zmc2V0WSIsImxhYmVsIiwicmVhbFNpemUiLCJ4TWFyZ2luIiwic3Ryb2tlIiwidGwiLCJ0ciIsImJyIiwiYmwiLCJkZWZhdWx0UmFkaXVzIiwic2lkZSIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwicXVhZHJhdGljQ3VydmVUbyIsIm9ua2V5ZG93biIsImV2dCIsIlJvb21Db2xsZWN0aW9uIiwiX2RhdGEiLCJyZWplY3QiLCJqc29uIiwiVXNlckNvbGxlY3Rpb24iLCJzb3J0IiwiYSIsImIiLCJzY29yZSIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJSb29tTW9kZWwiLCJwbGF5ZXJMb2dpbiIsInBsYXllcklkIiwiR2FtZU1vZGVsIiwiaG9zdCIsIndzIiwiZ2V0SG9zdCIsIm5hbWUiLCJpcCIsImRyb25lcyIsImVuZENvbmRpdGlvbiIsImVuZFZhbHVlIiwiYXZhaWxhYmxlQ29sb3JzIiwicGF0aFRvUmVnZXgiLCJrZXlOYW1lcyIsInBhcnRzIiwic3BsaXQiLCJmaWx0ZXIiLCJwYXJ0IiwibWFwIiwiZXhlYyIsInNsaWNlIiwiUmVnRXhwIiwicGF0aCIsImtleXMiLCJjaGVjayIsImV2ZXJ5IiwicmVnZXhwIiwic3RlcCIsInRtcCIsInJlcGxhY2UiLCJyZWR1Y2UiLCJwcmV2IiwiY3VyciIsInBvcyIsIlJvdXRlIiwicmVnZXgiLCJWaWV3IiwiX3ZpZXciLCJpbml0IiwiX19yb3V0ZXIiLCJyZXN1bWUiLCJPYmplY3QiLCJhc3NpZ24iLCJwYXVzZSIsImFkZFJvdXRlIiwic3RhcnQiLCJ0YWdOYW1lIiwiY3JlYXRlRWxlbWVudCIsImhpZGUiLCJzZXRBdHRycyIsImF0dHJzIiwic2VsZiIsImVsIiwiYXBwZW5kQ2hpbGQiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlIiwib3V0ZXJIVE1MIiwiVXNlck1vZGVsIiwiZ2FtZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7SUFDcUJBLE07QUFDcEI7OztBQUdBLG1CQUFjO0FBQUE7O0FBQ2IsTUFBSUEsT0FBT0MsVUFBWCxFQUF1QjtBQUN0QixVQUFPRCxPQUFPQyxVQUFkO0FBQ0E7O0FBRUQsT0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxPQUFLQyxXQUFMLEdBQW1CLElBQW5COztBQUVBLE9BQUtDLE9BQUwsR0FBZUMsT0FBT0QsT0FBdEI7O0FBRUFKLFNBQU9DLFVBQVAsR0FBb0IsSUFBcEI7QUFDQTs7QUFFRDs7Ozs7Ozs7Ozs7MkJBT1NLLFEsRUFBVUMsSSxFQUFvQjtBQUFBLE9BQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFDdEMsT0FBSUMsUUFBUSxvQkFBVUgsUUFB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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1Qiw2QkFBNkI7QUFDcEQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUsWUFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msc0JBQXNCO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwrQkFBK0IsaUJBQWlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDLEVBQUUsdUJBQXVCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEdBQUc7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxvRUFBb0U7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUE2QixjQUFjOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxFQUFFO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFFBQVE7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQix1QkFBdUI7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLFFBQVE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Q0FBeUMsUUFBUTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLGNBQWM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw0QkFBNEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxvQkFBb0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDLEVBQUUsWUFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsRUFBRSxxQ0FBcUM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxFQUFFLFlBQVk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGFBQWE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsYUFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUIseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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OztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsRUFBRSx1QkFBdUI7QUFDMUI7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEdBQUc7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxTQUFTO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEVBQUUsWUFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MscUNBQXFDO0FBQ3JFLGdDQUFnQyxtQ0FBbUM7QUFDbkUsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEVBQUUsWUFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEVBQUUsWUFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHlCQUF5QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMsRUFBRSwwQkFBMEI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMsR0FBRztBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDLEVBQUUsWUFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLHVDQUF1QztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx3Q0FBd0MsZ0JBQWdCLEVBQUU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLENBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLFNBQVM7QUFDdkM7O0FBRUE7QUFD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UDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qix1QkFBdUI7QUFDckQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSx1Q0FBdUMsMEJBQTBCO0FBQ2pFO0FBQ0E7QUFD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Q0F1RCxvQkFBUUMsR0FBUixDQUFZaEIsU0FBU0csTUFBckI7QUFDQSxvQkFBUUgsU0FBU0csTUFBakI7QUFDSSxxQkFBSyxHQUFMO0FBQ0EscUJBQUssR0FBTDtBQUFVLHlCQUFLWCxVQUFMLEdBQWtCLDRCQUFsQjtBQUNBLHlCQUFLQyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0E7QUFDVixxQkFBSyxHQUFMO0FBQVUseUJBQUtELFVBQUwsR0FBa0IsS0FBS0MsYUFBTCxHQUFxQixLQUFLZSxVQUFMLEdBQWtCLEVBQXpEO0FBQ0EseUJBQUtHLFFBQUwsR0FBZ0JYLFNBQVNBLFFBQVQsQ0FBa0JXLFFBQWxDLENBRFYsQ0FDc0Q7QUFDNUMseUJBQUtzSSxLQUFMLEdBQWFqSixTQUFTQSxRQUFULENBQWtCaUosS0FBL0I7QUFDQSx5QkFBS3NFLEtBQUwsR0FBYXZOLFNBQVNBLFFBQVQsQ0FBa0J1TixLQUEvQjtBQUNBO0FBQ1Y7QUFBU3hNLDRCQUFRQyxHQUFSLENBQVksMEJBQVo7QUFWYjtBQVlBLG1CQUFPaEIsUUFBUDtBQUNIOzs7bUNBRVU7QUFDUCxtQkFBTyxLQUFLaUosS0FBWjtBQUNIOzs7Ozs7a0JBakhnQnFFLFMiLCJmaWxlIjoianMvYWlyZHJvbmUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlIGZyb20gJy4vcm91dGUnO1xuXG4vKiog0JrQu9Cw0YHRgSDRgNC+0YPRgtC10YDQsCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIHtcblx0LyoqXG5cdCAqINCh0L7Qt9C00LDRkdGCINC90L7QstGL0Lkg0YDQvtGD0YLQtdGAINC40LvQuCDQstC+0LfQstGA0LDRidCw0LXRgiDRg9C20LUg0YHQvtC30LTQsNC90L3Ri9C5INC40L3RgdGC0LDQvdGBXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRpZiAoUm91dGVyLl9faW5zdGFuY2UpIHtcblx0XHRcdHJldHVybiBSb3V0ZXIuX19pbnN0YW5jZTtcblx0XHR9XG5cblx0XHR0aGlzLnJvdXRlcyA9IFtdO1xuXHRcdHRoaXMuYWN0aXZlUm91dGUgPSBudWxsO1xuXG5cdFx0dGhpcy5oaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG5cblx0XHRSb3V0ZXIuX19pbnN0YW5jZSA9IHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICog0JTQvtCx0LDQstC70Y/QtdGCINC90L7QstGL0LkgUm91dGUg0LIg0YDQvtGD0YLQtdGAXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSAtINCo0LDQsdC70L7QvSDQv9GD0YLQuFxuXHQgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgLSDQmtC70LDRgdGBINC60L7QvdC60YDQtdGC0L3QvtC5IFZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdGL0LUg0L/QsNGA0LDQvNC10YLRgNGLLCDQutC+0YLQvtGA0YvQtSDQsdGD0LTRg9GCINC/0LXRgNC10LTQsNC90Ysg0LLQviB2aWV3INC/0YDQuCDQtdGRINGB0L7Qt9C00LDQvdC40Lgg0Lgg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0ICogQHJldHVybnMge1JvdXRlcn1cblx0ICovXG5cdGFkZFJvdXRlKHBhdGhuYW1lLCB2aWV3LCBvcHRpb25zID0ge30pIHtcblx0XHRsZXQgcm91dGUgPSBuZXcgUm91dGUocGF0aG5hbWUsIHZpZXcsIG9wdGlvbnMpO1xuXHRcdHJvdXRlLnNldFJvdXRlcih0aGlzKTtcblx0XHR0aGlzLnJvdXRlcy5wdXNoKHJvdXRlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiDQl9Cw0L/Rg9GB0LrQsNC10YIg0YDQvtGD0YLQtdGAINC4INC/0LXRgNC10YXQvtC00LjRgiDQv9C+INGC0LXQutGD0YnQtdC80YMg0L/Rg9GC0Lgg0LIg0L/RgNC40LvQvtC20LXQvdC40Lhcblx0ICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZT17fV0gLSDQntCx0YrQtdC60YIgc3RhdGUsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LTQsNGR0YLRgdGPINCyINC/0LXRgNCy0YvQuSDQstGL0LfQvtCyIG9ucm91dGVcblx0ICovXG5cdHN0YXJ0KHN0YXRlID0ge30pIHtcblx0XHR3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0bGV0IHN0YXRlID0gZXZlbnQuc3RhdGU7XG5cdFx0XHRsZXQgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cdFx0XHR0aGlzLm9ucm91dGUocGF0aG5hbWUsIHN0YXRlKTtcblx0XHR9LmJpbmQodGhpcyk7XG5cblx0XHRjb25zdCBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblx0XHR0aGlzLm9ucm91dGUocGF0aG5hbWUsIHN0YXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQpNGD0L3QutGG0LjRjywg0LLRi9C30YvQstCw0LXQvNCw0Y8g0L/RgNC4INC/0LXRgNC10YXQvtC00LUg0L3QsCDQvdC+0LLRi9C5INGA0L7Rg9GCINCyINC/0YDQuNC70L7QttC10L3QuNC4XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSAtINCf0YPRgtGMLCDQv9C+INC60L7RgtC+0YDQvtC80YMg0L/RgNC+0LjRgdGF0L7QtNC40YIg0L/QtdGA0LXRhdC+0LRcblx0ICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZT17fV0gLSDQntCx0YrQtdC60YIgc3RhdGUsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LTQsNGR0YLRgdGPINCyINCy0YvQt9C+0LIg0LzQtdGC0L7QtNCwIG5hdmlnYXRlXG5cdCAqL1xuXHRvbnJvdXRlKHBhdGhuYW1lLCBzdGF0ZSA9IHt9KSB7XG5cdFx0bGV0IHJvdXRlID0gdGhpcy5yb3V0ZXMuZmluZChyb3V0ZSA9PiByb3V0ZS5tYXRjaChwYXRobmFtZSkpO1xuXHRcdGlmICghcm91dGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5hY3RpdmVSb3V0ZSkge1xuXHRcdFx0dGhpcy5hY3RpdmVSb3V0ZS5sZWF2ZSgpO1xuXHRcdH1cblxuXHRcdHRoaXMuYWN0aXZlUm91dGUgPSByb3V0ZTtcblx0XHR0aGlzLmFjdGl2ZVJvdXRlLm5hdmlnYXRlKHBhdGhuYW1lLCBzdGF0ZSk7XG5cdH1cblxuXHQvKipcblx0ICog0J/RgNC+0LPRgNCw0LzQvNC90YvQuSDQv9C10YDQtdGF0L7QtCDQvdCwINC90L7QstGL0Lkg0L/Rg9GC0Yxcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0J/Rg9GC0Yxcblx0ICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZT17fV0gLSDQntCx0YrQtdC60YIgc3RhdGUsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LTQsNGR0YLRgdGPINCyINCy0YvQt9C+0LIgaGlzdG9yeS5wdXNoU3RhdGVcblx0ICovXG5cdGdvKHBhdGhuYW1lLCBzdGF0ZSA9IHt9KSB7XG5cdFx0aWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gcGF0aG5hbWUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5oaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgJycsIHBhdGhuYW1lKTtcblx0XHR0aGlzLm9ucm91dGUocGF0aG5hbWUsIHN0YXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LfQstC+0LvRj9C10YIg0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0YHQstC+0Y4g0YHQvtCx0YHRgtCy0LXQvdC90YPRjiDRgNC10LDQu9C40LfQsNGG0LjRjiBIaXN0b3J5IEFQSVxuXHQgKiBAcGFyYW0ge09iamVjdH0gaGlzdG9yeSAtINC00L7Qu9C20LXQvSDQv9GA0LXQtNC+0YHRgtCw0LLQu9GP0YLRjCDRgNC10LDQu9C40LfQsNGG0LjRjiDQvNC10YLQvtC00L7QsiBiYWNrKCksIGZvcndhcmQoKSwgcHVzaFN0YXRlKClcblx0ICovXG5cdHNldEhpc3RvcnkoaGlzdG9yeSkge1xuXHRcdHRoaXMuaGlzdG9yeSA9IGhpc3Rvcnk7XG5cdH1cblxuXHQvKipcblx0ICog0JLQvtC30LLRgNCw0YIg0L3QsCDQvtC00LjQvSDRiNCw0LMg0L3QsNC30LDQtCDQsiDQuNGB0YLQvtGA0LjQuCDQsdGA0LDRg9C30LXRgNCwXG5cdCAqL1xuXHRiYWNrKCkge1xuXHRcdHRoaXMuaGlzdG9yeS5iYWNrKCk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QtdGA0LXRhdC+0LQg0L3QsCDQvtC00LjQvSDRiNCw0LMg0LLQv9C10YDRkdC0INCyINC40YHRgtC+0YDQuNC4INCx0YDQsNGD0LfQtdGA0LBcblx0ICovXG5cdGZvcndhcmQoKSB7XG5cdFx0dGhpcy5oaXN0b3J5LmZvcndhcmQoKTtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZHVsZXMvcm91dGVyLmpzIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi4vbW9kdWxlcy92aWV3JztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvZ2FtZS50bXBsLnhtbCc7XG5pbXBvcnQgR2FtZU1vZGVsIGZyb20gJy4uL21vZGVscy9HYW1lTW9kZWwnO1xuaW1wb3J0IGdhbWVDYW52YXMgZnJvbSAnLi4vY2FudmFzJztcbmNvbnN0IGZldGNoUmV0cnkgPSByZXF1aXJlKCdmZXRjaC1yZXRyeScpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVmlldyBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yIChkYXRhID0ge30pIHtcbiAgICAgICAgc3VwZXIoeyBlbGVtZW50OiAnLmpzLWdhbWUnLCBib2R5Q2xhc3M6ICdib2R5LWdhbWUnIH0pO1xuICAgICAgICB0aGlzLl9nYW1lID0gbmV3IEdhbWVNb2RlbCgpO1xuICAgIH1cblxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIHRoaXMuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHsgc291cmNlOiB0aGlzLl9nYW1lLmdldFZpZGVvKCkgfSk7XG4gICAgICAgIC8vIGNoZWNrIHRoZSBjb25uZWN0aW9uOlxuICAgICAgICBmZXRjaFJldHJ5KCdodHRwczovL2Fpci1kcm9uZS5oZXJva3VhcHAuY29tL3VzZXInLCB7XG4gICAgICAgICAgICByZXRyaWVzOiAxMCxcbiAgICAgICAgICAgIHJldHJ5RGVsYXk6IDUwMCxcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbm9jb25uZWN0aW9uJykuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW5vY29ubmVjdGlvbicpLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgZmV0Y2hSZXRyeSgnaHR0cHM6Ly9haXItZHJvbmUuaGVyb2t1YXBwLmNvbS91c2VyJywge1xuICAgICAgICAgICAgICAgIHJldHJpZXM6IDEwMCxcbiAgICAgICAgICAgICAgICByZXRyeURlbGF5OiAxMDAwLFxuICAgICAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW5vY29ubmVjdGlvbicpLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdhbWVDYW52YXMoKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvdmlld3MvZ2FtZVZpZXcuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFVzZXJNb2RlbCBmcm9tICcuLi9tb2RlbHMvVXNlck1vZGVsJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1sb2dpbicsIGJvZHlDbGFzczogJ2JvZHktbG9naW4nIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5fZWwuaW5uZXJIVE1MID0gdGVtcGxhdGUodGhpcy5kYXRhKTtcbiAgICAgICAgdGhpcy5fZm9ybSA9IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1sb2dpbi1mb3JtJyk7XG4gICAgICAgIHRoaXMuX2Zvcm0ub25zdWJtaXQgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLmxvZ2luKCk7IHJldHVybiBmYWxzZTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbC5vbmJsdXIgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnZhbGlkYXRlRW1haWwoKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmJsdXIgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmtleXVwID0gKGZ1bmN0aW9uIChlKSB7IFxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOCAmJiBlLmtleUNvZGUgIT09IDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5yZWdpc3RyYXRpb24ub25jbGljayA9IChmdW5jdGlvbiAoKSB7IHRoaXMucm91dGVyLmdvKCcvcmVnaXN0cmF0aW9uJyk7IH0pLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZW1haWxFcnJvciA9IHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvcjtcbiAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yO1xuICAgIH1cblxuICAgIHZhbGlkYXRlRW1haWwoKSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JtLmVsZW1lbnRzLmVtYWlsLnZhbHVlLnNlYXJjaCgvLkAuLykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmVtYWlsRXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQv9GA0L7QstC10YDRjNGC0LUg0L/RgNCw0LLQuNC70YzQvdC+0YHRgtGMIGUtbWFpbCEnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1haWxFcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlUGFzc3dvcmQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjCEnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFzc3dvcmRFcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUVtYWlsKCkgJiYgdGhpcy52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgfVxuXG4gICAgbG9naW4oKSB7XG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyTW9kZWwoe1xuICAgICAgICAgICAgZW1haWw6IHRoaXMuX2Zvcm0uZWxlbWVudHMuZW1haWwudmFsdWUsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5fZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB1c2VyLmxvZ2luKCk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci5pbm5lckhUTUwgPSB1c2VyLmdldEVtYWlsRXJyb3IoKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9IHVzZXIuZ2V0UGFzc3dvcmRFcnJvcigpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IuaGlkZGVuID0gdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLmlubmVySFRNTCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLmhpZGRlbiA9IHRoaXMuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5nbygnL3Jvb21zJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvdmlld3MvbG9naW5WaWV3LmpzIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi4vbW9kdWxlcy92aWV3JztcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSAnLi4vbW9kZWxzL1VzZXJNb2RlbCc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vdGVtcGxhdGVzL3JlZ2lzdHJhdGlvbi50bXBsLnhtbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZ2lzdHJhdGlvblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1yZWdpc3RyYXRpb24nLCBib2R5Q2xhc3M6ICdib2R5LXJlZ2lzdHJhdGlvbicgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLl9lbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzLmRhdGEpO1xuICAgICAgICB0aGlzLl9mb3JtID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmpzLXJlZ2lzdHJhdGlvbi1mb3JtJyk7XG4gICAgICAgIHRoaXMuX2Zvcm0ub25zdWJtaXQgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnJlZ2lzdGVyKCk7IHJldHVybiBmYWxzZTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbC5vbmJsdXIgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnZhbGlkYXRlRW1haWwoKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmJsdXIgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmtleXVwID0gKGZ1bmN0aW9uIChlKSB7IFxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOCAmJiBlLmtleUNvZGUgIT09IDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZDIub25ibHVyID0gKGZ1bmN0aW9uICgpIHsgdGhpcy52YWxpZGF0ZVBhc3N3b3JkKCk7IH0pLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmQyLm9ua2V5dXAgPSAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgIT09IDggJiYgZS5rZXlDb2RlICE9PSA5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4ubG9naW4ub25ibHVyID0gKGZ1bmN0aW9uICgpIHsgdGhpcy52YWxpZGF0ZUxvZ2luKCk7IH0pLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZW1haWxFcnJvciA9IHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvcjtcbiAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yO1xuICAgICAgICB0aGlzLmxvZ2luRXJyb3IgPSB0aGlzLl9mb3JtLmNoaWxkcmVuLmxvZ2luRXJyb3I7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVFbWFpbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0uZWxlbWVudHMuZW1haWwudmFsdWUuc2VhcmNoKC8uK0AuK1xcLi4rLykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQv9GA0L7QstC10YDRjNGC0LUg0L/RgNCw0LLQuNC70YzQvdC+0YHRgtGMIGUtbWFpbCc7XG4gICAgICAgICAgICB0aGlzLmVtYWlsRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWFpbEVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1haWxFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQYXNzd29yZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMISc7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUubGVuZ3RoIDwgOCkge1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICfQn9Cw0YDQvtC70Ywg0L3Rg9C20LXQvSDQtNC70LjQvdC90LXQtSA4INGB0LjQvNCy0L7Qu9C+0LIgPSgnO1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkMi52YWx1ZS5sZW5ndGggPiAwXG4gICAgICAgICAgICAmJiB0aGlzLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlICE9IHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQyLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0LDRgNC+0LvQuCDQvdC1INGB0L7QstC/0LDQtNCw0Y7RgiEnO1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlTG9naW4oKSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JtLmVsZW1lbnRzLmxvZ2luLnZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5FcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC60LvQuNC60YPRhdGDISc7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2dpbkVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5FcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlRW1haWwodGhpcykgJiYgdGhpcy52YWxpZGF0ZVBhc3N3b3JkKHRoaXMpICYmIHRoaXMudmFsaWRhdGVMb2dpbih0aGlzKTtcbiAgICB9XG5cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXJNb2RlbCh7XG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy5fZm9ybS5lbGVtZW50cy5sb2dpbi52YWx1ZSxcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLl9mb3JtLmVsZW1lbnRzLmVtYWlsLnZhbHVlLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gdXNlci5zYXZlKCk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci50ZXh0Q29udGVudCA9IHVzZXIuZ2V0RW1haWxFcnJvcigpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IudGV4dENvbnRlbnQgPSB1c2VyLmdldFBhc3N3b3JkRXJyb3IoKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5sb2dpbkVycm9yLnRleHRDb250ZW50ID0gdXNlci5nZXRMb2dpbkVycm9yKCk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci5oaWRkZW4gPSB0aGlzLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IudGV4dENvbnRlbnQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4ubG9naW5FcnJvci5oaWRkZW4gPSB0aGlzLl9mb3JtLmNoaWxkcmVuLmxvZ2luRXJyb3IudGV4dENvbnRlbnQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci5oaWRkZW4gPSB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IudGV4dENvbnRlbnQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIuZ28oJy9yb29tcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NvbWUgc2VydmVyIG1hZ2ljIGVycm9yJyk7XG4gICAgICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IudGV4dENvbnRlbnQgPSB1c2VyLmdldEVtYWlsRXJyb3IoKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci50ZXh0Q29udGVudCA9ICfQotC+INC70LggZS1tYWlsLCDRgtC+INC70Lgg0L/QsNGA0L7Qu9GMINC90LUg0L/QvtC00YXQvtC00Y/Rgi4g0K8g0YLQsNC6INC4INC90LUg0L/QvtC90Y/QuyDQu9C+0LPQuNC60YMg0YHQtdGA0LLQsNC60LAnO1xuICAgICAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL3JlZ2lzdHJhdGlvblZpZXcuanMiLCIvLyBUT0RPOiB1c2VyIGlkIGZyb20gY29va2llIHRvIGRyb25lIG1vZGVsXG5pbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFJvb21Db2xsZWN0aW9uIGZyb20gJy4uL2NvbGxlY3Rpb25zL1Jvb21Db2xsZWN0aW9uJztcbmltcG9ydCBEcm9uZU1vZGVsIGZyb20gJy4uL21vZGVscy9Ecm9uZU1vZGVsJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvcm9vbXMudG1wbC54bWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tc1ZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAoZGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1yb29tcycsIGJvZHlDbGFzczogJ2JvZHktcm9vbXMnIH0pO1xuICAgICAgICB0aGlzLnJvb21Db2xsZWN0aW9uID0gbmV3IFJvb21Db2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuZHJvbmUgPSBuZXcgRHJvbmVNb2RlbCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICB0aGlzLnJvb21Db2xsZWN0aW9uLmZldGNoKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9lbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzLnJvb21Db2xsZWN0aW9uLmdldENvbGxlY3Rpb24oKSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuanMtZXJyb3InKTtcbiAgICBcbiAgICAgICAgICAgIHRoaXMucm9vbXMgPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yQWxsKCcucm9vbXNfX3Jvb20nKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgcm9vbSBvZiB0aGlzLnJvb21zKSB7XG4gICAgICAgICAgICAgICAgcm9vbS5vbmNsaWNrID0gKGZ1bmN0aW9uICgpIHsgdGhpcy5zZWxlY3RSb29tKHJvb20sIHJvb20ubmV4dFNpYmxpbmcpIH0pLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1jb2xvcicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jb2xvcnMpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb2xvciBvZiB0aGlzLmNvbG9ycykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbG9yKTtcbiAgICAgICAgICAgICAgICBjb2xvci5vbmNsaWNrID0gKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ2VudGVyZWQgY29sb3IgY2xpY2snKTsgdGhpcy5zZWxlY3RDb2xvcihjb2xvcikgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdiZWZvcmUgam9pbicpO1xuICAgIFxuICAgICAgICAgICAgdGhpcy5fam9pbiA9IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1qb2luJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmpvaW4pO1xuICAgICAgICAgICAgdGhpcy5fam9pbi5vbmNsaWNrID0gKGZ1bmN0aW9uICgpIHsgdGhpcy5qb2luKCk7IH0pLmJpbmQodGhpcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmluYWwnKTtcblxuICAgICAgICAgICAgdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmpzLWNyZWF0ZScpLm9uY2xpY2sgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnJvdXRlci5nbygnL3Njb3JlYm9hcmQnKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0Um9vbSAocm9vbSwgZGV0YWlscykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm9vbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb21zW2ldICE9PSByb29tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbSA9IHRoaXMucm9vbUNvbGxlY3Rpb24uZ2V0Q29sbGVjdGlvbigpW2ldLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRldGFpbHMuaGlkZGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2VsZWN0Q29sb3IoY29sb3IpIHtcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHRoaXMuY29sb3JzKSB7XG4gICAgICAgICAgICBpZiAoYyA9PT0gY29sb3IpIHtcbiAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5hZGQoJ3Jvb21zX19kZXRhaWxzX19jb2xvcnNfX2NvbG9yLWNsaWNrZWQnKTtcbiAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvb21zX19kZXRhaWxzX19jb2xvcnNfX2NvbG9yJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LmFkZCgncm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3InKTtcbiAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvb21zX19kZXRhaWxzX19jb2xvcnNfX2NvbG9yLWNsaWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyb25lLmNvbG9yID0gY29sb3Iuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgICAgdGhpcy5lcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICB0aGlzLmVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgam9pbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvbmUuY29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5lcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kcm9uZS5zYXZlKHRoaXMuc2VsZWN0ZWRSb29tKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcm9uZS5lcnJvciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvci50ZXh0Q29udGVudCA9ICfQp9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6LiDQn9C+0L/RgNC+0LHRg9C50YLQtSDQtdGJ0LUg0YDQsNC3ISc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLmdvKCcvZ2FtZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yLnRleHRDb250ZW50ID0gJ9CS0YvQsdC10YDQuNGC0LUg0YbQstC10YIg0LTRgNC+0L3QsCEnO1xuICAgICAgICAgICAgdGhpcy5lcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJhY2sgKGRldGFpbHMpIHtcbiAgICAgICAgZGV0YWlscy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IHIgb2YgdGhpcy5yb29tcykge1xuICAgICAgICAgICAgci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy92aWV3cy9yb29tc1ZpZXcuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFVzZXJDb2xsZWN0aW9uIGZyb20gJy4uL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvc2NvcmVib2FyZC50bXBsLnhtbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlYm9hcmRWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtc2NvcmVib2FyZCcgfSk7XG4gICAgICAgIHRoaXMudXNlckNvbGxlY3Rpb24gPSBuZXcgVXNlckNvbGxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICByZXN1bWUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy51c2VyQ29sbGVjdGlvbi5mZXRjaCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dvdCBoZXJlJyk7XG4gICAgICAgICAgICB0aGlzLl9lbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzLnVzZXJDb2xsZWN0aW9uLmdldENvbGxlY3Rpb24oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3cob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyLnNob3coKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdib2R5LXNjb3JlYm9hcmQnKTtcbiAgICB9XG5cbiAgICBoaWRlKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlci5oaWRlKCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnYm9keS1zY29yZWJvYXJkJyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL3Njb3JlYm9hcmRWaWV3LmpzIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9nYW1lLnRtcGwgdGVtcGxhdGVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8aW1nIGNsYXNzPVxcXCJnYW1lX192aWRlb1xcXCIgc3JjPVxcXCJcIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChqc29uLnNvdXJjZSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIzXCIpO31fX2Zlc3RfYnVmKz0oXCJcXFwiLz48Y2FudmFzIGNsYXNzPVxcXCJnYW1lX19jYW52YXNcXFwiPtCS0LDRiCDQsdGA0LDRg9C30LXRgCDQvNC+0YDQsNC70YzQvdC+INGD0YHRgtCw0YDQtdC7LiDQntCx0L3QvtCy0LjRgtC1LiDQkdGL0YHRgtGA0L4uPC9jYW52YXM+PGRpdiBjbGFzcz1cXFwianMtbm9jb25uZWN0aW9uIGdhbWVfX25vY29ubmVjdGlvblxcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjxkaXYgY2xhc3M9XFxcImdhbWVfX25vY29ubmVjdGlvbl9faGVhZGVyXFxcIj7QndCV0KIg0JjQndCi0JXQoNCd0JXQotCQPC9kaXY+PC9kaXY+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3RlbXBsYXRlcy9nYW1lLnRtcGwueG1sXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9sb2dpbi50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGZvcm0gY2xhc3M9XFxcImpzLWxvZ2luLWZvcm0gbG9naW5fX2Zvcm1cXFwiIG5hbWU9XFxcImxvZ2luRm9ybVxcXCI+PGgxIGNsYXNzPVxcXCJsb2dpbl9faGVhZGVyXFxcIj7QktGF0L7QtDwvaDE+PHNwYW4gY2xhc3M9XFxcImpzLWVtYWlsLWVycm9yIGxvZ2luX19mb3JtX19lcnJvclxcXCIgbmFtZT1cXFwiZW1haWxFcnJvclxcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjwvc3Bhbj48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIkUtbWFpbFxcXCIgY2xhc3M9XFxcImpzLWVtYWlsIGxvZ2luX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwiZW1haWxcXFwiIHR5cGU9XFxcInRleHRcXFwiLz48c3BhbiBjbGFzcz1cXFwianMtcGFzc3dvcmQtZXJyb3IgbG9naW5fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJwYXNzd29yZEVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZCBsb2dpbl9fZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcInBhc3N3b3JkXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIvPjxidXR0b24gY2xhc3M9XFxcImpzX3N1Ym1pdCBsb2dpbl9fZm9ybV9fYnV0dG9uXFxcIiBuYW1lPVxcXCJidXR0b25cXFwiPtCS0L7QudGC0LghPC9idXR0b24+PGEgY2xhc3M9XFxcImxvZ2luX19mb3JtX19saW5rXFxcIiBuYW1lPVxcXCJyZWdpc3RyYXRpb25cXFwiPtCg0LXQs9C40YHRgtGA0LDRhtC40Y88L2E+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWxcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKiBcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIC9ob21lL2l2YW4vRG9jdW1lbnRzLzIwMTZfMl9BaXJEcm9uZS9wdWJsaWMvdGVtcGxhdGVzL3JlZ2lzdHJhdGlvbi50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGZvcm0gY2xhc3M9XFxcImpzLXJlZ2lzdHJhdGlvbi1mb3JtIHJlZ2lzdHJhdGlvbl9fZm9ybVxcXCI+PGgxIGNsYXNzPVxcXCJyZWdpc3RyYXRpb25fX2hlYWRlclxcXCI+0J/QvtC30L3QsNC60L7QvNC40LzRgdGPPzwvaDE+PHNwYW4gY2xhc3M9XFxcImpzLWVtYWlsLWVycm9yIHJlZ2lzdHJhdGlvbl9fZm9ybV9fZXJyb3JcXFwiIG5hbWU9XFxcImVtYWlsRXJyb3JcXFwiIGhpZGRlbj1cXFwiaGlkZGVuXFxcIj48L3NwYW4+PGlucHV0IHBsYWNlaG9sZGVyPVxcXCJFLW1haWxcXFwiIGNsYXNzPVxcXCJqcy1lbWFpbCByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJlbWFpbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIvPjxzcGFuIGNsYXNzPVxcXCJqcy1wYXNzd29yZC1lcnJvciByZWdpc3RyYXRpb25fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJwYXNzd29yZEVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZCByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJwYXNzd29yZFxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiLz48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIkNvbmZpcm0gcGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZDIgcmVnaXN0cmF0aW9uX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwicGFzc3dvcmQyXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIvPjxzcGFuIGNsYXNzPVxcXCJqcy1sb2dpbi1lcnJvciByZWdpc3RyYXRpb25fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJsb2dpbkVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwi0JrQu9C40LrRg9GF0LBcXFwiIGNsYXNzPVxcXCJqcy1sb2dpbiByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJsb2dpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIvPjxidXR0b24gY2xhc3M9XFxcImpzLXN1Ym1pdCByZWdpc3RyYXRpb25fX2Zvcm1fX2J1dHRvblxcXCIgbmFtZT1cXFwiYnV0dG9uXFxcIj7Ql9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y8hPC9idXR0b24+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvcmVnaXN0cmF0aW9uLnRtcGwueG1sXG4vLyBtb2R1bGUgaWQgPSAxMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9yb29tcy50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGgxIGNsYXNzPVxcXCJyb29tc19faGVhZGVyXFxcIj7QktGL0LHQtdGA0LjRgtC1INC40LPRgNGDPC9oMT5cIik7dmFyIGkscm9vbSxfX2Zlc3RfaXRlcmF0b3IwO3RyeXtfX2Zlc3RfaXRlcmF0b3IwPWpzb24gfHwge307fWNhdGNoKGUpe19fZmVzdF9pdGVyYXRvcj17fTtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fWZvcihpIGluIF9fZmVzdF9pdGVyYXRvcjApe3Jvb209X19mZXN0X2l0ZXJhdG9yMFtpXTtfX2Zlc3RfYnVmKz0oXCI8ZGl2IGNsYXNzPVxcXCJyb29tc19fcm9vbVxcXCI+PGgyIGNsYXNzPVxcXCJyb29tc19fcm9vbV9faGVhZGVyXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChyb29tLm5hbWUpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiNFwiKTt9X19mZXN0X2J1Zis9KFwiIChcIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChyb29tLmlwKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjRcIik7fV9fZmVzdF9idWYrPShcIik8L2gyPjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PGgxIGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19faGVhZGVyXFxcIj7QktGL0LHQtdGA0LjRgtC1INC60LLQsNC00YDQvtC60L7Qv9GC0LXRgDo8L2gxPjxkaXYgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19jb2xvcnNcXFwiPlwiKTt2YXIgaSxjb2xvcixfX2Zlc3RfaXRlcmF0b3IxO3RyeXtfX2Zlc3RfaXRlcmF0b3IxPXJvb20uYXZhaWxhYmxlQ29sb3JzIHx8IHt9O31jYXRjaChlKXtfX2Zlc3RfaXRlcmF0b3I9e307X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31mb3IoaSBpbiBfX2Zlc3RfaXRlcmF0b3IxKXtjb2xvcj1fX2Zlc3RfaXRlcmF0b3IxW2ldO19fZmVzdF9idWYrPShcIjxpbnB1dCBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3IganMtY29sb3JcXFwiIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGNvbG9yKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjEyXCIpO31fX2Zlc3RfYnVmKz0oXCI7IGNvbG9yOlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGNvbG9yKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjEyXCIpO31fX2Zlc3RfYnVmKz0oXCI7XFxcIi8+XCIpO31fX2Zlc3RfYnVmKz0oXCI8L2Rpdj48cCBjbGFzcz1cXFwianMtZXJyb3Igcm9vbXNfX2RldGFpbHNfX2Vycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9wPjxidXR0b24gY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19qb2luIGpzLWpvaW5cXFwiPtCf0YDQuNGB0L7QtdC00LjQvdC40YLRjNGB0Y8hPC9idXR0b24+PGhyLz48aDEgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19oZWFkZXJcXFwiPtCj0LbQtSDQsiDQuNCz0YDQtTo8L2gxPjx0YWJsZSBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX3VsXFxcIj48dWw+XCIpO3ZhciBpLGRyb25lLF9fZmVzdF9pdGVyYXRvcjI7dHJ5e19fZmVzdF9pdGVyYXRvcjI9cm9vbS5kcm9uZXMgfHwge307fWNhdGNoKGUpe19fZmVzdF9pdGVyYXRvcj17fTtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fWZvcihpIGluIF9fZmVzdF9pdGVyYXRvcjIpe2Ryb25lPV9fZmVzdF9pdGVyYXRvcjJbaV07X19mZXN0X2J1Zis9KFwiPHRyIGNsYXNzPVxcXCJyb29tX19kZXRhaWxzX191bF9fbGlcXFwiPjx0ZD48bGk+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoZHJvbmUucGxheWVyTG9naW4pKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMjdcIik7fV9fZmVzdF9idWYrPShcIjwvbGk+PC90ZD48dGQ+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19fdWxfX2xpX19jb2xvclxcXCIgZGlzYWJsZWQ9XFxcImRpc2FibGVkXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjpcIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChkcm9uZS5jb2xvcikpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIzM1wiKTt9X19mZXN0X2J1Zis9KFwiO1xcXCIvPjwvdGQ+PC90cj5cIik7fV9fZmVzdF9idWYrPShcIjwvdWw+PC90YWJsZT48L2Rpdj5cIik7fV9fZmVzdF9idWYrPShcIjxoci8+PGJ1dHRvbiBjbGFzcz1cXFwianMtY3JlYXRlIHJvb21zX19jcmVhdGVcXFwiPtCb0LjQtNC10YDRizwvYnV0dG9uPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvcm9vbXMudG1wbC54bWxcbi8vIG1vZHVsZSBpZCA9IDEzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKiBcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIC9ob21lL2l2YW4vRG9jdW1lbnRzLzIwMTZfMl9BaXJEcm9uZS9wdWJsaWMvdGVtcGxhdGVzL3Njb3JlYm9hcmQudG1wbCB0ZW1wbGF0ZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfXZhciBqc29uPV9fZmVzdF9jb250ZXh0O19fZmVzdF9idWYrPShcIjxoMSBjbGFzcz1cXFwic2NvcmVib2FyZF9faGVhZGVyXFxcIj7Qm9C40LTQtdGA0Ys8L2gxPjx0YWJsZSBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVcXFwiPjx0ciBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyXFxcIj48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPiM8L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+0JjQvNGPPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPtCa0L7Qu9C40YfQtdGB0YLQstC+INCx0L7QtdCyPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPtCf0YDQvtGG0LXQvdGCINC/0L7QsdC10LQ8L3RkPjwvdHI+XCIpO3ZhciBpLGRhdGEsX19mZXN0X2l0ZXJhdG9yMDt0cnl7X19mZXN0X2l0ZXJhdG9yMD1qc29uIHx8IHt9O31jYXRjaChlKXtfX2Zlc3RfaXRlcmF0b3I9e307X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31mb3IoaSBpbiBfX2Zlc3RfaXRlcmF0b3IwKXtkYXRhPV9fZmVzdF9pdGVyYXRvcjBbaV07X19mZXN0X2J1Zis9KFwiPHRyIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJcXFwiPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoaSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIxMlwiKTt9X19mZXN0X2J1Zis9KFwiPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGRhdGEudXNlcm5hbWUpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMTNcIik7fV9fZmVzdF9idWYrPShcIjwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChkYXRhLmdhbWVzKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjE0XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoZGF0YS5zY29yZSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIxNVwiKTt9X19mZXN0X2J1Zis9KFwiICU8L3RkPjwvdHI+XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RhYmxlPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvc2NvcmVib2FyZC50bXBsLnhtbFxuLy8gbW9kdWxlIGlkID0gMTMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdhbWVDYW52YXMobW9kZSA9IDApIHtcclxuICAgIGxldCBwYXJ0aWNsZXMgPSBbXTtcclxuICAgIFxyXG4gICAgLy8gY2FudmFzIGFuZCAyRCBjb250ZXh0IGluaXRpYWxpemF0aW9uXHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVfX2NhbnZhc1wiKTtcclxuICAgIGNvbnN0IGNvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBcclxuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIFxyXG4gICAgLy8gc3RhcnRpbmcgdGhlIGdhbWUgbG9vcCBhdCA2MCBmcmFtZXMgcGVyIHNlY29uZFxyXG4gICAgY29uc3QgZnJhbWVSYXRlID0gNjAuMDtcclxuICAgIGNvbnN0IGZyYW1lRGVsYXkgPSAxMDAwLjAvZnJhbWVSYXRlO1xyXG4gICAgXHJcbiAgICBsZXQgc3RhdHVzID0gcGFyc2VGbG9hdCgxLjApO1xyXG4gICAgXHJcbiAgICBsZXQgc3RhcnRUaW1lID0gMDtcclxuICAgIFxyXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZShmcmFtZURlbGF5KTtcclxuICAgICAgICAgICAgICAgIH0sIGZyYW1lRGVsYXkpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiByYW5kb21GbG9hdCAobWluLCBtYXgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGgucmFuZG9tKCkqKG1heC1taW4pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogQSBzaW5nbGUgZXhwbG9zaW9uIHBhcnRpY2xlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFBhcnRpY2xlICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IDEuMjtcclxuICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSAyMDtcclxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwXCI7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eVggPSAwO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHlZID0gMDtcclxuICAgICAgICB0aGlzLnNjYWxlU3BlZWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbihtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHNocmlua2luZ1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlIC09IHRoaXMuc2NhbGVTcGVlZCAqIG1zIC8gMTAwMC4wO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbGUgPD0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIG1vdmluZyBhd2F5IGZyb20gZXhwbG9zaW9uIGNlbnRlclxyXG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eVggKiBtcy8xMDAwLjA7XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5WSAqIG1zLzEwMDAuMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHRyYW5zbGF0aW5nIHRoZSAyRCBjb250ZXh0IHRvIHRoZSBwYXJ0aWNsZSBjb29yZGluYXRlc1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuc2F2ZSgpO1xyXG4gICAgICAgICAgICBjb250ZXh0MkQudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAgICAgY29udGV4dDJELnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZHJhd2luZyBhIGZpbGxlZCBjaXJjbGUgaW4gdGhlIHBhcnRpY2xlJ3MgbG9jYWwgc3BhY2VcclxuICAgICAgICAgICAgY29udGV4dDJELmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuYXJjKDAsIDAsIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb250ZXh0MkQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dDJELmZpbGwoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIEFkdmFuY2VkIEV4cGxvc2lvbiBlZmZlY3RcclxuICAgICAqIEVhY2ggcGFydGljbGUgaGFzIGEgZGlmZmVyZW50IHNpemUsIG1vdmUgc3BlZWQgYW5kIHNjYWxlIHNwZWVkLlxyXG4gICAgICpcclxuICAgICAqIFBhcmFtZXRlcnM6XHJcbiAgICAgKiBcdHgsIHkgLSBleHBsb3Npb24gY2VudGVyXHJcbiAgICAgKiBcdGNvbG9yIC0gcGFydGljbGVzJyBjb2xvclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFeHBsb3Npb24oeCwgeSwgY29sb3IpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbWluU2l6ZSA9IDg7XHJcbiAgICAgICAgY29uc3QgbWF4U2l6ZSA9IDMwO1xyXG4gICAgICAgIGNvbnN0IGNvdW50ID0gMTU7XHJcbiAgICAgICAgY29uc3QgbWluU3BlZWQgPSA4MC4wO1xyXG4gICAgICAgIGNvbnN0IG1heFNwZWVkID0gMjIwLjA7XHJcbiAgICAgICAgY29uc3QgbWluU2NhbGVTcGVlZCA9IDEuMDtcclxuICAgICAgICBjb25zdCBtYXhTY2FsZVNwZWVkID0gMi4wO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGFuZ2xlPTA7IGFuZ2xlPDM2MDsgYW5nbGUgKz0gTWF0aC5yb3VuZCgzNjAvY291bnQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJ0aWNsZS54ID0geDtcclxuICAgICAgICAgICAgcGFydGljbGUueSA9IHk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJ0aWNsZS5yYWRpdXMgPSByYW5kb21GbG9hdChtaW5TaXplLCBtYXhTaXplKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhcnRpY2xlLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJ0aWNsZS5zY2FsZVNwZWVkID0gcmFuZG9tRmxvYXQobWluU2NhbGVTcGVlZCwgbWF4U2NhbGVTcGVlZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc3BlZWQgPSByYW5kb21GbG9hdChtaW5TcGVlZCwgbWF4U3BlZWQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHlYID0gc3BlZWQgKiBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODAuMCk7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlLnZlbG9jaXR5WSA9IHNwZWVkICogTWF0aC5zaW4oYW5nbGUgKiBNYXRoLlBJIC8gMTgwLjApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFydGljbGVzLnB1c2gocGFydGljbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9Db25zdCBzaXplIHZhcmlhYmxlc1xyXG4gICAgY29uc3QgcmVjdFNpemUgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDM7XHJcbiAgICBjb25zdCBtYXJnaW5ZID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3RTaXplKSAqIDAuNTtcclxuICAgIGNvbnN0IHN0YXR1c01hcmdpbiA9ICgod2luZG93LmlubmVySGVpZ2h0IC0gcmVjdFNpemUpICogMC41KSArIHJlY3RTaXplICsgNTtcclxuICAgIGNvbnN0IGFsZXJ0U2l6ZSA9IDAuNyAqIHJlY3RTaXplO1xyXG4gICAgY29uc3QgYWxlcnRNYXJnaW4gPSAwLjE1ICogcmVjdFNpemU7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHVwZGF0ZSAoZnJhbWVEZWxheSlcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0MkQuY2xlYXJSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSBhbmQgZHJhdyBwYXJ0aWNsZXNcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8cGFydGljbGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHBhcnRpY2xlID0gcGFydGljbGVzW2ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFydGljbGUudXBkYXRlKGZyYW1lRGVsYXkpO1xyXG4gICAgICAgICAgICBwYXJ0aWNsZS5kcmF3KGNvbnRleHQyRCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5zY2FsZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGRyYXcgYWltaW5nIHdpbmRvd1xyXG4gICAgICAgIGRyYXdTdGF0dXMoMC41ICogcmVjdFNpemUsIDAuMSAqIHJlY3RTaXplLCBtYXJnaW5ZIC0gcmVjdFNpemUgKiAwLjEgLSA1LCBcIiM0ZDRkNGRcIiwgXCLQl9C+0L3QsCDQt9Cw0YXQstCw0YLQsFwiLCAxLCAxMCk7XHJcbiAgICAgICAgcm91bmRSZWN0KGNvbnRleHQyRCwgcmVjdFNpemUsIG1hcmdpblksIHJlY3RTaXplLCByZWN0U2l6ZSwgMjAsIFwicmVkXCIsIGZhbHNlKTtcclxuICAgICAgICBzd2l0Y2ggKG1vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBkcmF3U3RhdHVzKHJlY3RTaXplLCAwLjIgKiAwLjcgKiByZWN0U2l6ZSwgc3RhdHVzTWFyZ2luLCBcImdyZWVuXCIsIFwi0JfQsNGF0LLQsNGCINGG0LXQu9C4Li4uXCIsIHN0YXR1cywgMjApO1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzID0gcGFyc2VGbG9hdChzdGF0dXMpICsgcGFyc2VGbG9hdCgwLjAwNyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID4gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IGNhbnZhcy53aWR0aCAgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSBjYW52YXMuaGVpZ2h0ICogMC41O1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGxvc2lvbih4LCB5LCBcIiM1MjUyNTJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRXhwbG9zaW9uKHgsIHksIFwiI0ZGQTMxOFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFeHBsb3Npb24oeCwgeSwgXCIjNTI1MjUyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGxvc2lvbih4LCB5LCBcIiNGRkEzMThcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA8IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd1N0YXR1cyhyZWN0U2l6ZSwgMC4yICogMC43ICogcmVjdFNpemUsIHN0YXR1c01hcmdpbiwgXCIjY2MwMDAwXCIsIFwi0JLRiyDQv9C+0LQg0YPQtNCw0YDQvtC8IVwiLCBzdGF0dXMsIDIwKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSBwYXJzZUZsb2F0KHN0YXR1cykgKyBwYXJzZUZsb2F0KDAuMDA3KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzdGFydFRpbWUgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5nbG9iYWxBbHBoYSA9IDAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kUmVjdChjb250ZXh0MkQsIHJlY3RTaXplICsgYWxlcnRNYXJnaW4sIG1hcmdpblkgKyBhbGVydE1hcmdpbiwgYWxlcnRTaXplLCBhbGVydFNpemUsIDIwLCBcIiM0ZDRkNGRcIiwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQuZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQuZm9udD0nMjVweCBIZWx2ZXRpY2EnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQuZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELnRleHRBbGlnbj1cImNlbnRlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQuZmlsbFRleHQoXCLQktGLINC/0L7QtNCx0LjRgtGLIVwiLCByZWN0U2l6ZSArIHJlY3RTaXplICogMC41LCBtYXJnaW5ZICsgYWxlcnRNYXJnaW4gKyAwLjMgKiBhbGVydFNpemUsIGFsZXJ0U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5mb250PScyMHB4IEhlbHZldGljYSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5maWxsVGV4dChcItCe0LPRgNCw0L3QuNGH0LXQvdC40LUg0LTQtdC50YHRgtCy0YPQtdGCOlwiLCByZWN0U2l6ZSArIHJlY3RTaXplICogMC41LCBtYXJnaW5ZICsgYWxlcnRNYXJnaW4gKyAwLjUgKiBhbGVydFNpemUsIGFsZXJ0U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWNvbmRzID0gMTAgLSAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAtIHN0YXJ0VGltZSkgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRzID0gcGFyc2VJbnQoc2Vjb25kcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5maWxsVGV4dChzZWNvbmRzICsgXCIg0YHQtdC60YPQvdC0XCIsIHJlY3RTaXplICsgcmVjdFNpemUgKiAwLjUsIG1hcmdpblkgKyBhbGVydE1hcmdpbiArIDAuNiAqIGFsZXJ0U2l6ZSwgYWxlcnRTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2Vjb25kcyA8PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGRyYXdTdGF0dXMoc2l6ZSwgaGVpZ2h0LCBvZmZzZXRZLCBjb2xvciwgbGFiZWwsIHJlYWxTaXplLCByYWRpdXMpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dDJELmdsb2JhbEFscGhhID0gMC41O1xyXG4gICAgICAgIGNvbnN0IHhNYXJnaW4gPSAod2luZG93LmlubmVyV2lkdGggLSBzaXplKSAqIDAuNTtcclxuICAgICAgICByb3VuZFJlY3QoY29udGV4dDJELCB4TWFyZ2luLCBvZmZzZXRZLCBzaXplICogcmVhbFNpemUsIGhlaWdodCwgcmFkaXVzLCBjb2xvciwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIHJvdW5kUmVjdChjb250ZXh0MkQsIHhNYXJnaW4sIG9mZnNldFksIHNpemUsIGhlaWdodCwgcmFkaXVzLCBjb2xvciwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIGNvbnRleHQyRC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICAgICAgY29udGV4dDJELmZvbnQ9JzIwcHggSGVsdmV0aWNhJztcclxuICAgICAgICBjb250ZXh0MkQuZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgICAgICBjb250ZXh0MkQudGV4dEFsaWduPVwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dDJELmZpbGxUZXh0KGxhYmVsLHhNYXJnaW4gKyBzaXplICogMC41LG9mZnNldFkgKyBoZWlnaHQgKiAwLjYsIHNpemUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiByb3VuZFJlY3QoY29udGV4dDJELCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMsIGNvbG9yLCBmaWxsLCBzdHJva2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb2xvciA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBjb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdHJva2UgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgc3Ryb2tlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiByYWRpdXMgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJhZGl1cyA9IDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcmFkaXVzID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByYWRpdXMgPSB7dGw6IHJhZGl1cywgdHI6IHJhZGl1cywgYnI6IHJhZGl1cywgYmw6IHJhZGl1c307XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRSYWRpdXMgPSB7dGw6IDAsIHRyOiAwLCBicjogMCwgYmw6IDB9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBzaWRlIGluIGRlZmF1bHRSYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgIHJhZGl1c1tzaWRlXSA9IHJhZGl1c1tzaWRlXSB8fCBkZWZhdWx0UmFkaXVzW3NpZGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRleHQyRC5saW5lV2lkdGg9MTA7XHJcbiAgICAgICAgY29udGV4dDJELnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgY29udGV4dDJELmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGNvbnRleHQyRC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb250ZXh0MkQubW92ZVRvKHggKyByYWRpdXMudGwsIHkpO1xyXG4gICAgICAgIGNvbnRleHQyRC5saW5lVG8oeCArIHdpZHRoIC0gcmFkaXVzLnRyLCB5KTtcclxuICAgICAgICBjb250ZXh0MkQucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHksIHggKyB3aWR0aCwgeSArIHJhZGl1cy50cik7XHJcbiAgICAgICAgY29udGV4dDJELmxpbmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQgLSByYWRpdXMuYnIpO1xyXG4gICAgICAgIGNvbnRleHQyRC5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCwgeCArIHdpZHRoIC0gcmFkaXVzLmJyLCB5ICsgaGVpZ2h0KTtcclxuICAgICAgICBjb250ZXh0MkQubGluZVRvKHggKyByYWRpdXMuYmwsIHkgKyBoZWlnaHQpO1xyXG4gICAgICAgIGNvbnRleHQyRC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHkgKyBoZWlnaHQsIHgsIHkgKyBoZWlnaHQgLSByYWRpdXMuYmwpO1xyXG4gICAgICAgIGNvbnRleHQyRC5saW5lVG8oeCwgeSArIHJhZGl1cy50bCk7XHJcbiAgICAgICAgY29udGV4dDJELnF1YWRyYXRpY0N1cnZlVG8oeCwgeSwgeCArIHJhZGl1cy50bCwgeSk7XHJcbiAgICAgICAgY29udGV4dDJELmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIGlmIChmaWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdHJva2UpIHtcclxuICAgICAgICAgICAgY29udGV4dDJELnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/Qp9GC0L7QsdGLINGB0LHRgNC+0YHQuNGC0Ywg0LLRi9C/0L7Qu9C90LXQvdC40Y8g0LDQvdC40LzQsNGG0LjQuCAo0LHRi9Cy0LDQtdGCINCyINGN0YLQvtC8INC90LDQtNC+0LHQvdC+0YHRgtGMKVxyXG4gICAgLy/QtNC+0YHRgtCw0YLQvtGH0L3QviDQv9GA0LjRgNCw0LLQvdGP0YLRjCBtb2RlINC90YPQu9GOIVxyXG4gICAgXHJcbiAgICAvL9Cn0YLQvtCx0Ysg0LfQsNC/0YPRgdGC0LjRgtGMINCw0L3QuNC80LDRhtC40Lgg0L3Rg9C20L3QviDQv9GA0L7RgdGC0L4g0LLRi9GB0YLQsNCy0LjRgtGMINC90YPQttC90YvQuSBtb2RlXHJcbiAgICAvL9C4INC+0LHQvdGD0LvQuNGC0Ywg0L/QtdGA0LXQvNC10L3QvdGD0Y4g0L/RgNC+0LPRgNC10YHRgSDQsdCw0YDQsFxyXG4gICAgd2luZG93Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGV2dClcclxuICAgIHtcclxuICAgICAgICBldnQgPSBldnQgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgIC8v0JrQstCw0LTRgNCw0LrQvtC/0YLQtdGAINC/0L7QtCDRg9C00LDRgNC+0LxcclxuICAgICAgICBpZiAoZXZ0LmtleUNvZGUgPT0gOTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gMTtcclxuICAgICAgICAgICAgc3RhdHVzID0gcGFyc2VGbG9hdCgwLjApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL9CX0LDRhdCy0LDRgiDQv9GA0L7RgtC40LLQvdC40LrQsFxyXG4gICAgICAgIGVsc2UgaWYgKGV2dC5rZXlDb2RlID09IDg4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZSA9IDI7XHJcbiAgICAgICAgICAgIHN0YXR1cyA9IHBhcnNlRmxvYXQoMC4wKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9jYW52YXMuanMiLCJpbXBvcnQgUm9vbU1vZGVsIGZyb20gJy4uL21vZGVscy9Sb29tTW9kZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9XG5cbiAgICBmZXRjaCgpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKCcvZ2FtZXMnKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIH0pLmNhdGNoKCk7XG4gICAgfVxuXG4gICAgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1Jvb21Db2xsZWN0aW9uLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnV0b3IoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9XG5cbiAgICBmZXRjaCgpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKCcvcmF0aW5nJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnQoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgpO1xuICAgIH1cblxuICAgIHNvcnQoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuICAgIH1cblxuICAgIGdldENvbGxlY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9jb2xsZWN0aW9ucy9Vc2VyQ29sbGVjdGlvbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVlc3QodXJsLCBtZXRob2QsIGRhdGEpIHtcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKG1ldGhvZCwgdXJsLCBmYWxzZSk7XG4gIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cbiAgcmV0dXJuIHhocjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9saWJzLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbU1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQgfHwgMDtcbiAgICAgICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3IgfHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnBsYXllckxvZ2luID0gZGF0YS5wbGF5ZXJMb2dpbiB8fCAnTmV3IFBsYXllcic7XG4gICAgICAgIHRoaXMucGxheWVySWQgPSBkYXRhLnBsYXllcklkIHx8IDA7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICB9XG5cbiAgICBzYXZlKHJvb20pIHtcbiAgICAgICAgaWYgKCFyb29tKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gJ05vIHJvb20hJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmV0Y2goJy9nYW1lcycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgcm9vbTogcm9vbSxcbiAgICAgICAgICAgICAgICBkcm9uZToge1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckxvZ2luOiB0aGlzLnBsYXllckxvZ2luLFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogdGhpcy5wbGF5ZXJJZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICdGYWlsZWQgdG8gc2F2ZSBkcm9uZSEnO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kZWxzL0Ryb25lTW9kZWwuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gb3B0aW9ucy5ob3N0IHx8ICcvaW1hZ2UvZmlsbC5qcGcnO1xuICAgICAgICB0aGlzLndzID0gW107IC8vIHRoaXMgaXMgZm9yIHdlYnNvY2tldFxuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgfVxuXG4gICAgZ2V0SG9zdCAoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCgnL2hvc3QnKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlKHJlamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5ob3N0ID0gZGF0YS5ob3N0O1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gYENhbid0IHJlYWNoIHRoZSBob3N0ICR7dGhpcy5ob3N0fSFgO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRWaWRlbygpIHtcbiAgICAgICAgdGhpcy5nZXRIb3N0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLmhvc3Q7XG4gICAgfVxuXG4gICAgbWVjaGFuaWNzICgpIHtcblxuICAgIH1cblxuICAgIGNvbm5lY3QgKCkge1xuXG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCAoKSB7XG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kZWxzL0dhbWVNb2RlbC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb21Nb2RlbCB7XG4gICAgY29uc3RydWN0b3IoZGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLmlkIHx8IDA7XG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZSB8fCAnTmV3IFJvb20nO1xuICAgICAgICB0aGlzLmlwID0gZGF0YS5pcCB8fCAnMTI3LjAuMC4xJztcbiAgICAgICAgdGhpcy5kcm9uZXMgPSBkYXRhLmRyb25lcyB8fCBbXTtcbiAgICAgICAgdGhpcy5lbmRDb25kaXRpb24gPSBkYXRhLmVuZENvbmRpdGlvbiB8fCAwO1xuICAgICAgICB0aGlzLmVuZFZhbHVlID0gZGF0YS5lbmRWYWx1ZSB8fCAwO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNvbG9ycyA9IGRhdGEuYXZhaWxhYmxlQ29sb3JzIHx8IFtdO1xuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgfVxuXG4gICAgZmV0Y2goKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCgnL3Jvb20nLCB7XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgcm9vbTogdGhpcy5pZCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgICAgIHRoaXMuaXAgPSBkYXRhLmlwO1xuICAgICAgICAgICAgdGhpcy5kcm9uZXMgPSBkYXRhLmRyb25lcztcbiAgICAgICAgICAgIHRoaXMuZW5kQ29uZGl0aW9uID0gZGF0YS5lbmRDb25kaXRpb247XG4gICAgICAgICAgICB0aGlzLmVuZFZhbHVlID0gZGF0YS5lbmRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlQ29sb3JzID0gZGF0YS5hdmFpbGFibGVDb2xvcnM7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gMDtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICdXcm9uZyByb29tIG5hbWUnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goJy9yb29tJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgIGlwOiB0aGlzLmlwLFxuICAgICAgICAgICAgICAgIGRyb25lczogW10sXG4gICAgICAgICAgICAgICAgZW5kQ29uZGl0aW9uOiB0aGlzLmVuZENvbmRpdGlvbixcbiAgICAgICAgICAgICAgICBlbmRWYWx1ZTogdGhpcy5lbmRWYWx1ZSxcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9ICdEdXBsaWNhdGVkIHJvb21zISc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsaXN0RHJvbmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kcm9uZXM7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZGVscy9Sb29tTW9kZWwuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXRoVG9SZWdleCAocGF0aG5hbWUpIHtcblx0bGV0IGtleU5hbWVzID0gW107XG5cdGxldCBwYXJ0cyA9IHBhdGhuYW1lXG5cdFx0LnNwbGl0KCcvJylcblx0XHQuZmlsdGVyKHBhcnQgPT4gcGFydClcblx0XHQubWFwKHBhcnQgPT4ge1xuXHRcdFx0aWYgKC9eOi8uZXhlYyhwYXJ0KSkge1xuXHRcdFx0XHRrZXlOYW1lcy5wdXNoKHBhcnQuc2xpY2UoMSkpO1xuXHRcdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cChgXlxcLyhbXi9dKylgLCBgaWApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoYF5cXC8ke3BhcnR9YCwgYGlgKTtcblx0XHR9KTtcblxuXG5cdHJldHVybiBmdW5jdGlvbiAocGF0aCkge1xuXG5cdFx0bGV0IGtleXMgPSBbXTtcblx0XHRsZXQgY2hlY2sgPSBwYXJ0cy5ldmVyeSgocmVnZXhwLCBzdGVwKSA9PiB7XG5cdFx0XHRsZXQgdG1wID0gcmVnZXhwLmV4ZWMocGF0aCk7XG5cdFx0XHRpZiAoIXRtcCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAodG1wLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRrZXlzLnB1c2godG1wWzFdKTtcblx0XHRcdH1cblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UocmVnZXhwLCAnJyk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdGlmIChjaGVjaykge1xuXHRcdFx0cmV0dXJuIGtleXMucmVkdWNlKChwcmV2LCBjdXJyLCBwb3MpID0+IHtcblx0XHRcdFx0cHJldltrZXlOYW1lc1twb3NdXSA9IGN1cnI7XG5cdFx0XHRcdHJldHVybiBwcmV2O1xuXHRcdFx0fSwge30pO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kdWxlcy9wYXRoVG9SZWdleC5qcyIsImxldCBpZCA9IDA7XG5pbXBvcnQgcGF0aFRvUmVnZXggZnJvbSAnLi9wYXRoVG9SZWdleCc7XG5cbi8qKiDQmtC70LDRgdGBINC/0YDQtdC00YHRgtCw0LLQu9GP0LXRgiDRgdC+0LHQvtC5INCf0YPRgtGMINCyINCy0LDRiNC10Lwg0L/RgNC40LvQvtC20LXQvdC40LggKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIHtcblx0LyoqXG5cdCAqINCh0L7Qt9C00LDRkdGCINC90L7QstGL0LkgUm91dGUgLSDQsNGB0YHQvtGG0LjQuNGA0YPQtdGCINC90LXQutC+0YLQvtGA0YPRjiB2aWV3INGBINGI0LDQsdC70L7QvdC+0Lwg0L/Rg9GC0Lhcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0KjQsNCx0LvQvtC9INC/0YPRgtC4XG5cdCAqIEBwYXJhbSB7Vmlld30gdmlldyAtINCa0LvQsNGB0YEg0LrQvtC90LrRgNC10YLQvdC+0LkgVmlld1xuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQtSDQv9Cw0YDQsNC80LXRgtGA0YssINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L/QtdGA0LXQtNCw0L3RiyDQstC+IHZpZXcg0L/RgNC4INC10ZEg0YHQvtC30LTQsNC90LjQuCDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHQgKi9cblx0Y29uc3RydWN0b3IocGF0aG5hbWUsIHZpZXcsIG9wdGlvbnMgPSB7fSkge1xuXHRcdC8vVE9ETzog0KHRg9GJ0LjQuSDQsNC00LjRidC1LCDQvdCw0Lwg0L3Rg9C20L3QviDQvNC10L3QtdC00LbQtdGA0LjRgtGMINC00LXQv9GB0Ytcblx0XHR0aGlzLnBhdGhUb1JlZ2V4ID0gcGF0aFRvUmVnZXg7XG5cblx0XHR0aGlzLmlkID0gJ3AnICsgaWQ7XG5cdFx0aWQrKztcblx0XHR0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG5cdFx0dGhpcy5yZWdleCA9IHRoaXMucGF0aFRvUmVnZXgocGF0aG5hbWUpO1xuXHRcdHRoaXMuVmlldyA9IHZpZXc7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9GA0L7QstC10YDRj9C10YIsINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINC70Lgg0L/QtdGA0LXQtNCw0L3QvdGL0LkgcGF0aG5hbWUg0YLQtdC60YPRidC10LzRgyBSb3V0ZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQn9GD0YLRjCDQsiDQv9GA0LjQu9C+0LbQtdC90LjQuFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0g0KDQtdC30YPQu9GM0YLQsNGCINC/0YDQvtCy0LXRgNC60Lhcblx0ICovXG5cdG1hdGNoKHBhdGhuYW1lKSB7XG5cdFx0cmV0dXJuICEhdGhpcy5yZWdleChwYXRobmFtZSk7XG5cdH1cblxuXHQvKipcblx0ICog0JDQutGC0LjQstC40YDRg9C10YIg0YLQtdC60YPRidC40LkgUm91dGUgKNC/0LXRgNC10YXQvtC00LjRgiDQv9C+INC90LXQvNGDKVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQn9GD0YLRjCDQsiDQv9GA0LjQu9C+0LbQtdC90LjQuFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlPXt9XSAtINCe0LHRitC10LrRgiBzdGF0ZSwg0LrQvtGC0L7RgNGL0Lkg0LHRi9C7INC/0LXRgNC10LTQsNC9INCyINGB0L7QsdGL0YLQuNC1IHBvcHN0YXRlINC00LvRjyDQvtCx0YrQtdC60YLQsCB3aW5kb3dcblx0ICovXG5cdG5hdmlnYXRlKHBhdGhuYW1lLCBzdGF0ZSA9IHt9KSB7XG5cdFx0c3RhdGUgPSBzdGF0ZSB8fCB7fTtcblx0XHRsZXQga2V5cyA9IHRoaXMucmVnZXgocGF0aG5hbWUpO1xuXHRcdGlmICghdGhpcy5fdmlldykge1xuXHRcdFx0bGV0IHZpZXcgPSBuZXcgdGhpcy5WaWV3KHRoaXMub3B0aW9ucyk7XG5cdFx0XHR2aWV3LmluaXQodGhpcy5vcHRpb25zKTtcblx0XHRcdHZpZXcuc2V0Um91dGVyKHRoaXMuX19yb3V0ZXIpO1xuXHRcdFx0dGhpcy5fdmlldyA9IHZpZXc7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdmlldy5yZXN1bWUoT2JqZWN0LmFzc2lnbihzdGF0ZSwga2V5cykpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCU0LXQsNC60YLQuNCy0LjRgNGD0LXRgiDRgtC10LrRg9GJ0LjQuSBSb3V0ZVxuXHQgKi9cblx0bGVhdmUoKSB7XG5cdFx0dGhpcy5fdmlldyAmJiB0aGlzLl92aWV3LnBhdXNlKCk7XG5cdH1cblxuXHQvKipcblx0ICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YPRidC10LzRgyBSb3V0ZSDQuNC90YHRgtCw0L3RgSDRgNC+0YPRgtC10YDQsFxuXHQgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIC0g0JjQvdGB0YLQsNC90YEg0YDQvtGD0YLQtdGA0LBcblx0ICovXG5cdHNldFJvdXRlcihyb3V0ZXIpIHtcblx0XHR0aGlzLl9fcm91dGVyID0gcm91dGVyO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZS5qcyIsIi8qIEBwcmVzZXJ2ZVxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxMy0yMDE1IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG4vKipcbiAqIGJsdWViaXJkIGJ1aWxkIHZlcnNpb24gMy40LjZcbiAqIEZlYXR1cmVzIGVuYWJsZWQ6IGNvcmUsIHJhY2UsIGNhbGxfZ2V0LCBnZW5lcmF0b3JzLCBtYXAsIG5vZGVpZnksIHByb21pc2lmeSwgcHJvcHMsIHJlZHVjZSwgc2V0dGxlLCBzb21lLCB1c2luZywgdGltZXJzLCBmaWx0ZXIsIGFueSwgZWFjaFxuKi9cbiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGUpO2Vsc2V7dmFyIGY7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz9mPXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2Y9Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYoZj1zZWxmKSxmLlByb21pc2U9ZSgpfX0oZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIF9kZXJlcV89PVwiZnVuY3Rpb25cIiYmX2RlcmVxXztpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgX2RlcmVxXz09XCJmdW5jdGlvblwiJiZfZGVyZXFfO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xudmFyIFNvbWVQcm9taXNlQXJyYXkgPSBQcm9taXNlLl9Tb21lUHJvbWlzZUFycmF5O1xuZnVuY3Rpb24gYW55KHByb21pc2VzKSB7XG4gICAgdmFyIHJldCA9IG5ldyBTb21lUHJvbWlzZUFycmF5KHByb21pc2VzKTtcbiAgICB2YXIgcHJvbWlzZSA9IHJldC5wcm9taXNlKCk7XG4gICAgcmV0LnNldEhvd01hbnkoMSk7XG4gICAgcmV0LnNldFVud3JhcCgpO1xuICAgIHJldC5pbml0KCk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cblByb21pc2UuYW55ID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gICAgcmV0dXJuIGFueShwcm9taXNlcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5hbnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFueSh0aGlzKTtcbn07XG5cbn07XG5cbn0se31dLDI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZmlyc3RMaW5lRXJyb3I7XG50cnkge3Rocm93IG5ldyBFcnJvcigpOyB9IGNhdGNoIChlKSB7Zmlyc3RMaW5lRXJyb3IgPSBlO31cbnZhciBzY2hlZHVsZSA9IF9kZXJlcV8oXCIuL3NjaGVkdWxlXCIpO1xudmFyIFF1ZXVlID0gX2RlcmVxXyhcIi4vcXVldWVcIik7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG5cbmZ1bmN0aW9uIEFzeW5jKCkge1xuICAgIHRoaXMuX2N1c3RvbVNjaGVkdWxlciA9IGZhbHNlO1xuICAgIHRoaXMuX2lzVGlja1VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9sYXRlUXVldWUgPSBuZXcgUXVldWUoMTYpO1xuICAgIHRoaXMuX25vcm1hbFF1ZXVlID0gbmV3IFF1ZXVlKDE2KTtcbiAgICB0aGlzLl9oYXZlRHJhaW5lZFF1ZXVlcyA9IGZhbHNlO1xuICAgIHRoaXMuX3RyYW1wb2xpbmVFbmFibGVkID0gdHJ1ZTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5kcmFpblF1ZXVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fZHJhaW5RdWV1ZXMoKTtcbiAgICB9O1xuICAgIHRoaXMuX3NjaGVkdWxlID0gc2NoZWR1bGU7XG59XG5cbkFzeW5jLnByb3RvdHlwZS5zZXRTY2hlZHVsZXIgPSBmdW5jdGlvbihmbikge1xuICAgIHZhciBwcmV2ID0gdGhpcy5fc2NoZWR1bGU7XG4gICAgdGhpcy5fc2NoZWR1bGUgPSBmbjtcbiAgICB0aGlzLl9jdXN0b21TY2hlZHVsZXIgPSB0cnVlO1xuICAgIHJldHVybiBwcmV2O1xufTtcblxuQXN5bmMucHJvdG90eXBlLmhhc0N1c3RvbVNjaGVkdWxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXN0b21TY2hlZHVsZXI7XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuZW5hYmxlVHJhbXBvbGluZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3RyYW1wb2xpbmVFbmFibGVkID0gdHJ1ZTtcbn07XG5cbkFzeW5jLnByb3RvdHlwZS5kaXNhYmxlVHJhbXBvbGluZUlmTmVjZXNzYXJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHV0aWwuaGFzRGV2VG9vbHMpIHtcbiAgICAgICAgdGhpcy5fdHJhbXBvbGluZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuaGF2ZUl0ZW1zUXVldWVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1RpY2tVc2VkIHx8IHRoaXMuX2hhdmVEcmFpbmVkUXVldWVzO1xufTtcblxuXG5Bc3luYy5wcm90b3R5cGUuZmF0YWxFcnJvciA9IGZ1bmN0aW9uKGUsIGlzTm9kZSkge1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoXCJGYXRhbCBcIiArIChlIGluc3RhbmNlb2YgRXJyb3IgPyBlLnN0YWNrIDogZSkgK1xuICAgICAgICAgICAgXCJcXG5cIik7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRocm93TGF0ZXIoZSk7XG4gICAgfVxufTtcblxuQXN5bmMucHJvdG90eXBlLnRocm93TGF0ZXIgPSBmdW5jdGlvbihmbiwgYXJnKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYXJnID0gZm47XG4gICAgICAgIGZuID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBhcmc7IH07XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm4oYXJnKTtcbiAgICAgICAgfSwgMCk7XG4gICAgfSBlbHNlIHRyeSB7XG4gICAgICAgIHRoaXMuX3NjaGVkdWxlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm4oYXJnKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBhc3luYyBzY2hlZHVsZXIgYXZhaWxhYmxlXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBBc3luY0ludm9rZUxhdGVyKGZuLCByZWNlaXZlciwgYXJnKSB7XG4gICAgdGhpcy5fbGF0ZVF1ZXVlLnB1c2goZm4sIHJlY2VpdmVyLCBhcmcpO1xuICAgIHRoaXMuX3F1ZXVlVGljaygpO1xufVxuXG5mdW5jdGlvbiBBc3luY0ludm9rZShmbiwgcmVjZWl2ZXIsIGFyZykge1xuICAgIHRoaXMuX25vcm1hbFF1ZXVlLnB1c2goZm4sIHJlY2VpdmVyLCBhcmcpO1xuICAgIHRoaXMuX3F1ZXVlVGljaygpO1xufVxuXG5mdW5jdGlvbiBBc3luY1NldHRsZVByb21pc2VzKHByb21pc2UpIHtcbiAgICB0aGlzLl9ub3JtYWxRdWV1ZS5fcHVzaE9uZShwcm9taXNlKTtcbiAgICB0aGlzLl9xdWV1ZVRpY2soKTtcbn1cblxuaWYgKCF1dGlsLmhhc0RldlRvb2xzKSB7XG4gICAgQXN5bmMucHJvdG90eXBlLmludm9rZUxhdGVyID0gQXN5bmNJbnZva2VMYXRlcjtcbiAgICBBc3luYy5wcm90b3R5cGUuaW52b2tlID0gQXN5bmNJbnZva2U7XG4gICAgQXN5bmMucHJvdG90eXBlLnNldHRsZVByb21pc2VzID0gQXN5bmNTZXR0bGVQcm9taXNlcztcbn0gZWxzZSB7XG4gICAgQXN5bmMucHJvdG90eXBlLmludm9rZUxhdGVyID0gZnVuY3Rpb24gKGZuLCByZWNlaXZlciwgYXJnKSB7XG4gICAgICAgIGlmICh0aGlzLl90cmFtcG9saW5lRW5hYmxlZCkge1xuICAgICAgICAgICAgQXN5bmNJbnZva2VMYXRlci5jYWxsKHRoaXMsIGZuLCByZWNlaXZlciwgYXJnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuLmNhbGwocmVjZWl2ZXIsIGFyZyk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEFzeW5jLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAoZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyYW1wb2xpbmVFbmFibGVkKSB7XG4gICAgICAgICAgICBBc3luY0ludm9rZS5jYWxsKHRoaXMsIGZuLCByZWNlaXZlciwgYXJnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwocmVjZWl2ZXIsIGFyZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBBc3luYy5wcm90b3R5cGUuc2V0dGxlUHJvbWlzZXMgPSBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIGlmICh0aGlzLl90cmFtcG9saW5lRW5hYmxlZCkge1xuICAgICAgICAgICAgQXN5bmNTZXR0bGVQcm9taXNlcy5jYWxsKHRoaXMsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fc2V0dGxlUHJvbWlzZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuQXN5bmMucHJvdG90eXBlLmludm9rZUZpcnN0ID0gZnVuY3Rpb24gKGZuLCByZWNlaXZlciwgYXJnKSB7XG4gICAgdGhpcy5fbm9ybWFsUXVldWUudW5zaGlmdChmbiwgcmVjZWl2ZXIsIGFyZyk7XG4gICAgdGhpcy5fcXVldWVUaWNrKCk7XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuX2RyYWluUXVldWUgPSBmdW5jdGlvbihxdWV1ZSkge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgoKSA+IDApIHtcbiAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBmbi5fc2V0dGxlUHJvbWlzZXMoKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZWNlaXZlciA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIHZhciBhcmcgPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICBmbi5jYWxsKHJlY2VpdmVyLCBhcmcpO1xuICAgIH1cbn07XG5cbkFzeW5jLnByb3RvdHlwZS5fZHJhaW5RdWV1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fZHJhaW5RdWV1ZSh0aGlzLl9ub3JtYWxRdWV1ZSk7XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgICB0aGlzLl9oYXZlRHJhaW5lZFF1ZXVlcyA9IHRydWU7XG4gICAgdGhpcy5fZHJhaW5RdWV1ZSh0aGlzLl9sYXRlUXVldWUpO1xufTtcblxuQXN5bmMucHJvdG90eXBlLl9xdWV1ZVRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1RpY2tVc2VkKSB7XG4gICAgICAgIHRoaXMuX2lzVGlja1VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zY2hlZHVsZSh0aGlzLmRyYWluUXVldWVzKTtcbiAgICB9XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuX3Jlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lzVGlja1VzZWQgPSBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXN5bmM7XG5tb2R1bGUuZXhwb3J0cy5maXJzdExpbmVFcnJvciA9IGZpcnN0TGluZUVycm9yO1xuXG59LHtcIi4vcXVldWVcIjoyNixcIi4vc2NoZWR1bGVcIjoyOSxcIi4vdXRpbFwiOjM2fV0sMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwsIHRyeUNvbnZlcnRUb1Byb21pc2UsIGRlYnVnKSB7XG52YXIgY2FsbGVkQmluZCA9IGZhbHNlO1xudmFyIHJlamVjdFRoaXMgPSBmdW5jdGlvbihfLCBlKSB7XG4gICAgdGhpcy5fcmVqZWN0KGUpO1xufTtcblxudmFyIHRhcmdldFJlamVjdGVkID0gZnVuY3Rpb24oZSwgY29udGV4dCkge1xuICAgIGNvbnRleHQucHJvbWlzZVJlamVjdGlvblF1ZXVlZCA9IHRydWU7XG4gICAgY29udGV4dC5iaW5kaW5nUHJvbWlzZS5fdGhlbihyZWplY3RUaGlzLCByZWplY3RUaGlzLCBudWxsLCB0aGlzLCBlKTtcbn07XG5cbnZhciBiaW5kaW5nUmVzb2x2ZWQgPSBmdW5jdGlvbih0aGlzQXJnLCBjb250ZXh0KSB7XG4gICAgaWYgKCgodGhpcy5fYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XG4gICAgICAgIHRoaXMuX3Jlc29sdmVDYWxsYmFjayhjb250ZXh0LnRhcmdldCk7XG4gICAgfVxufTtcblxudmFyIGJpbmRpbmdSZWplY3RlZCA9IGZ1bmN0aW9uKGUsIGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQucHJvbWlzZVJlamVjdGlvblF1ZXVlZCkgdGhpcy5fcmVqZWN0KGUpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgaWYgKCFjYWxsZWRCaW5kKSB7XG4gICAgICAgIGNhbGxlZEJpbmQgPSB0cnVlO1xuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fcHJvcGFnYXRlRnJvbSA9IGRlYnVnLnByb3BhZ2F0ZUZyb21GdW5jdGlvbigpO1xuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fYm91bmRWYWx1ZSA9IGRlYnVnLmJvdW5kVmFsdWVGdW5jdGlvbigpO1xuICAgIH1cbiAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZSh0aGlzQXJnKTtcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHJldC5fcHJvcGFnYXRlRnJvbSh0aGlzLCAxKTtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0KCk7XG4gICAgcmV0Ll9zZXRCb3VuZFRvKG1heWJlUHJvbWlzZSk7XG4gICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7XG4gICAgICAgICAgICBwcm9taXNlUmVqZWN0aW9uUXVldWVkOiBmYWxzZSxcbiAgICAgICAgICAgIHByb21pc2U6IHJldCxcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgYmluZGluZ1Byb21pc2U6IG1heWJlUHJvbWlzZVxuICAgICAgICB9O1xuICAgICAgICB0YXJnZXQuX3RoZW4oSU5URVJOQUwsIHRhcmdldFJlamVjdGVkLCB1bmRlZmluZWQsIHJldCwgY29udGV4dCk7XG4gICAgICAgIG1heWJlUHJvbWlzZS5fdGhlbihcbiAgICAgICAgICAgIGJpbmRpbmdSZXNvbHZlZCwgYmluZGluZ1JlamVjdGVkLCB1bmRlZmluZWQsIHJldCwgY29udGV4dCk7XG4gICAgICAgIHJldC5fc2V0T25DYW5jZWwobWF5YmVQcm9taXNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXQuX3Jlc29sdmVDYWxsYmFjayh0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldEJvdW5kVG8gPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgaWYgKG9iaiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAyMDk3MTUyO1xuICAgICAgICB0aGlzLl9ib3VuZFRvID0gb2JqO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofjIwOTcxNTIpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc0JvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAyMDk3MTUyKSA9PT0gMjA5NzE1Mjtcbn07XG5cblByb21pc2UuYmluZCA9IGZ1bmN0aW9uICh0aGlzQXJnLCB2YWx1ZSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLmJpbmQodGhpc0FyZyk7XG59O1xufTtcblxufSx7fV0sNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBvbGQ7XG5pZiAodHlwZW9mIFByb21pc2UgIT09IFwidW5kZWZpbmVkXCIpIG9sZCA9IFByb21pc2U7XG5mdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgIHRyeSB7IGlmIChQcm9taXNlID09PSBibHVlYmlyZCkgUHJvbWlzZSA9IG9sZDsgfVxuICAgIGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBibHVlYmlyZDtcbn1cbnZhciBibHVlYmlyZCA9IF9kZXJlcV8oXCIuL3Byb21pc2VcIikoKTtcbmJsdWViaXJkLm5vQ29uZmxpY3QgPSBub0NvbmZsaWN0O1xubW9kdWxlLmV4cG9ydHMgPSBibHVlYmlyZDtcblxufSx7XCIuL3Byb21pc2VcIjoyMn1dLDU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgY3IgPSBPYmplY3QuY3JlYXRlO1xuaWYgKGNyKSB7XG4gICAgdmFyIGNhbGxlckNhY2hlID0gY3IobnVsbCk7XG4gICAgdmFyIGdldHRlckNhY2hlID0gY3IobnVsbCk7XG4gICAgY2FsbGVyQ2FjaGVbXCIgc2l6ZVwiXSA9IGdldHRlckNhY2hlW1wiIHNpemVcIl0gPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UpIHtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBjYW5FdmFsdWF0ZSA9IHV0aWwuY2FuRXZhbHVhdGU7XG52YXIgaXNJZGVudGlmaWVyID0gdXRpbC5pc0lkZW50aWZpZXI7XG5cbnZhciBnZXRNZXRob2RDYWxsZXI7XG52YXIgZ2V0R2V0dGVyO1xuaWYgKCF0cnVlKSB7XG52YXIgbWFrZU1ldGhvZENhbGxlciA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcImVuc3VyZU1ldGhvZFwiLCBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvYmopIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAndXNlIHN0cmljdCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5sZW5ndGg7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBlbnN1cmVNZXRob2Qob2JqLCAnbWV0aG9kTmFtZScpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBzd2l0Y2gobGVuKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUodGhpc1swXSk7ICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUodGhpc1swXSwgdGhpc1sxXSk7ICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUodGhpc1swXSwgdGhpc1sxXSwgdGhpc1syXSk7ICAgIFxcblxcXG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmoubWV0aG9kTmFtZS5hcHBseShvYmosIHRoaXMpOyAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIFwiLnJlcGxhY2UoL21ldGhvZE5hbWUvZywgbWV0aG9kTmFtZSkpKGVuc3VyZU1ldGhvZCk7XG59O1xuXG52YXIgbWFrZUdldHRlciA9IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwib2JqXCIsIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgcmV0dXJuIG9iai5wcm9wZXJ0eU5hbWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgXCIucmVwbGFjZShcInByb3BlcnR5TmFtZVwiLCBwcm9wZXJ0eU5hbWUpKTtcbn07XG5cbnZhciBnZXRDb21waWxlZCA9IGZ1bmN0aW9uKG5hbWUsIGNvbXBpbGVyLCBjYWNoZSkge1xuICAgIHZhciByZXQgPSBjYWNoZVtuYW1lXTtcbiAgICBpZiAodHlwZW9mIHJldCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGlmICghaXNJZGVudGlmaWVyKG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXQgPSBjb21waWxlcihuYW1lKTtcbiAgICAgICAgY2FjaGVbbmFtZV0gPSByZXQ7XG4gICAgICAgIGNhY2hlW1wiIHNpemVcIl0rKztcbiAgICAgICAgaWYgKGNhY2hlW1wiIHNpemVcIl0gPiA1MTIpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoY2FjaGUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkgZGVsZXRlIGNhY2hlW2tleXNbaV1dO1xuICAgICAgICAgICAgY2FjaGVbXCIgc2l6ZVwiXSA9IGtleXMubGVuZ3RoIC0gMjU2O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5nZXRNZXRob2RDYWxsZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIGdldENvbXBpbGVkKG5hbWUsIG1ha2VNZXRob2RDYWxsZXIsIGNhbGxlckNhY2hlKTtcbn07XG5cbmdldEdldHRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gZ2V0Q29tcGlsZWQobmFtZSwgbWFrZUdldHRlciwgZ2V0dGVyQ2FjaGUpO1xufTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlTWV0aG9kKG9iaiwgbWV0aG9kTmFtZSkge1xuICAgIHZhciBmbjtcbiAgICBpZiAob2JqICE9IG51bGwpIGZuID0gb2JqW21ldGhvZE5hbWVdO1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IFwiT2JqZWN0IFwiICsgdXRpbC5jbGFzc1N0cmluZyhvYmopICsgXCIgaGFzIG5vIG1ldGhvZCAnXCIgK1xuICAgICAgICAgICAgdXRpbC50b1N0cmluZyhtZXRob2ROYW1lKSArIFwiJ1wiO1xuICAgICAgICB0aHJvdyBuZXcgUHJvbWlzZS5UeXBlRXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHJldHVybiBmbjtcbn1cblxuZnVuY3Rpb24gY2FsbGVyKG9iaikge1xuICAgIHZhciBtZXRob2ROYW1lID0gdGhpcy5wb3AoKTtcbiAgICB2YXIgZm4gPSBlbnN1cmVNZXRob2Qob2JqLCBtZXRob2ROYW1lKTtcbiAgICByZXR1cm4gZm4uYXBwbHkob2JqLCB0aGlzKTtcbn1cblByb21pc2UucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpOztcbiAgICBpZiAoIXRydWUpIHtcbiAgICAgICAgaWYgKGNhbkV2YWx1YXRlKSB7XG4gICAgICAgICAgICB2YXIgbWF5YmVDYWxsZXIgPSBnZXRNZXRob2RDYWxsZXIobWV0aG9kTmFtZSk7XG4gICAgICAgICAgICBpZiAobWF5YmVDYWxsZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGhlbihcbiAgICAgICAgICAgICAgICAgICAgbWF5YmVDYWxsZXIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBhcmdzLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFyZ3MucHVzaChtZXRob2ROYW1lKTtcbiAgICByZXR1cm4gdGhpcy5fdGhlbihjYWxsZXIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBhcmdzLCB1bmRlZmluZWQpO1xufTtcblxuZnVuY3Rpb24gbmFtZWRHZXR0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9ialt0aGlzXTtcbn1cbmZ1bmN0aW9uIGluZGV4ZWRHZXR0ZXIob2JqKSB7XG4gICAgdmFyIGluZGV4ID0gK3RoaXM7XG4gICAgaWYgKGluZGV4IDwgMCkgaW5kZXggPSBNYXRoLm1heCgwLCBpbmRleCArIG9iai5sZW5ndGgpO1xuICAgIHJldHVybiBvYmpbaW5kZXhdO1xufVxuUHJvbWlzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuICAgIHZhciBpc0luZGV4ID0gKHR5cGVvZiBwcm9wZXJ0eU5hbWUgPT09IFwibnVtYmVyXCIpO1xuICAgIHZhciBnZXR0ZXI7XG4gICAgaWYgKCFpc0luZGV4KSB7XG4gICAgICAgIGlmIChjYW5FdmFsdWF0ZSkge1xuICAgICAgICAgICAgdmFyIG1heWJlR2V0dGVyID0gZ2V0R2V0dGVyKHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICBnZXR0ZXIgPSBtYXliZUdldHRlciAhPT0gbnVsbCA/IG1heWJlR2V0dGVyIDogbmFtZWRHZXR0ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXR0ZXIgPSBuYW1lZEdldHRlcjtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldHRlciA9IGluZGV4ZWRHZXR0ZXI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl90aGVuKGdldHRlciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHByb3BlcnR5TmFtZSwgdW5kZWZpbmVkKTtcbn07XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBhcGlSZWplY3Rpb24sIGRlYnVnKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciBhc3luYyA9IFByb21pc2UuX2FzeW5jO1xuXG5Qcm9taXNlLnByb3RvdHlwZVtcImJyZWFrXCJdID0gUHJvbWlzZS5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFkZWJ1Zy5jYW5jZWxsYXRpb24oKSkgcmV0dXJuIHRoaXMuX3dhcm4oXCJjYW5jZWxsYXRpb24gaXMgZGlzYWJsZWRcIik7XG5cbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgdmFyIGNoaWxkID0gcHJvbWlzZTtcbiAgICB3aGlsZSAocHJvbWlzZS5faXNDYW5jZWxsYWJsZSgpKSB7XG4gICAgICAgIGlmICghcHJvbWlzZS5fY2FuY2VsQnkoY2hpbGQpKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuX2lzRm9sbG93aW5nKCkpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5fZm9sbG93ZWUoKS5jYW5jZWwoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuX2NhbmNlbEJyYW5jaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJlbnQgPSBwcm9taXNlLl9jYW5jZWxsYXRpb25QYXJlbnQ7XG4gICAgICAgIGlmIChwYXJlbnQgPT0gbnVsbCB8fCAhcGFyZW50Ll9pc0NhbmNlbGxhYmxlKCkpIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9pc0ZvbGxvd2luZygpKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fZm9sbG93ZWUoKS5jYW5jZWwoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fY2FuY2VsQnJhbmNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2lzRm9sbG93aW5nKCkpIHByb21pc2UuX2ZvbGxvd2VlKCkuY2FuY2VsKCk7XG4gICAgICAgICAgICBwcm9taXNlLl9zZXRXaWxsQmVDYW5jZWxsZWQoKTtcbiAgICAgICAgICAgIGNoaWxkID0gcHJvbWlzZTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fYnJhbmNoSGFzQ2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbC0tO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2Vub3VnaEJyYW5jaGVzSGF2ZUNhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgdGhpcy5fYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCA8PSAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2NhbmNlbEJ5ID0gZnVuY3Rpb24oY2FuY2VsbGVyKSB7XG4gICAgaWYgKGNhbmNlbGxlciA9PT0gdGhpcykge1xuICAgICAgICB0aGlzLl9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID0gMDtcbiAgICAgICAgdGhpcy5faW52b2tlT25DYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYnJhbmNoSGFzQ2FuY2VsbGVkKCk7XG4gICAgICAgIGlmICh0aGlzLl9lbm91Z2hCcmFuY2hlc0hhdmVDYW5jZWxsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5faW52b2tlT25DYW5jZWwoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9jYW5jZWxCcmFuY2hlZCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9lbm91Z2hCcmFuY2hlc0hhdmVDYW5jZWxsZWQoKSkge1xuICAgICAgICB0aGlzLl9jYW5jZWwoKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLl9pc0NhbmNlbGxhYmxlKCkpIHJldHVybjtcbiAgICB0aGlzLl9zZXRDYW5jZWxsZWQoKTtcbiAgICBhc3luYy5pbnZva2UodGhpcy5fY2FuY2VsUHJvbWlzZXMsIHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fY2FuY2VsUHJvbWlzZXMgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fbGVuZ3RoKCkgPiAwKSB0aGlzLl9zZXR0bGVQcm9taXNlcygpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0T25DYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9vbkNhbmNlbEZpZWxkID0gdW5kZWZpbmVkO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzQ2FuY2VsbGFibGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1BlbmRpbmcoKSAmJiAhdGhpcy5faXNDYW5jZWxsZWQoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmlzQ2FuY2VsbGFibGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1BlbmRpbmcoKSAmJiAhdGhpcy5pc0NhbmNlbGxlZCgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2RvSW52b2tlT25DYW5jZWwgPSBmdW5jdGlvbihvbkNhbmNlbENhbGxiYWNrLCBpbnRlcm5hbE9ubHkpIHtcbiAgICBpZiAodXRpbC5pc0FycmF5KG9uQ2FuY2VsQ2FsbGJhY2spKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb25DYW5jZWxDYWxsYmFjay5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5fZG9JbnZva2VPbkNhbmNlbChvbkNhbmNlbENhbGxiYWNrW2ldLCBpbnRlcm5hbE9ubHkpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvbkNhbmNlbENhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvbkNhbmNlbENhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGlmICghaW50ZXJuYWxPbmx5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0cnlDYXRjaChvbkNhbmNlbENhbGxiYWNrKS5jYWxsKHRoaXMuX2JvdW5kVmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IGVycm9yT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F0dGFjaEV4dHJhVHJhY2UoZS5lKTtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMudGhyb3dMYXRlcihlLmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uQ2FuY2VsQ2FsbGJhY2suX3Jlc3VsdENhbmNlbGxlZCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pbnZva2VPbkNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvbkNhbmNlbENhbGxiYWNrID0gdGhpcy5fb25DYW5jZWwoKTtcbiAgICB0aGlzLl91bnNldE9uQ2FuY2VsKCk7XG4gICAgYXN5bmMuaW52b2tlKHRoaXMuX2RvSW52b2tlT25DYW5jZWwsIHRoaXMsIG9uQ2FuY2VsQ2FsbGJhY2spO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2ludm9rZUludGVybmFsT25DYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5faXNDYW5jZWxsYWJsZSgpKSB7XG4gICAgICAgIHRoaXMuX2RvSW52b2tlT25DYW5jZWwodGhpcy5fb25DYW5jZWwoKSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3Vuc2V0T25DYW5jZWwoKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jYW5jZWwoKTtcbn07XG5cbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSw3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihORVhUX0ZJTFRFUikge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGdldEtleXMgPSBfZGVyZXFfKFwiLi9lczVcIikua2V5cztcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xuXG5mdW5jdGlvbiBjYXRjaEZpbHRlcihpbnN0YW5jZXMsIGNiLCBwcm9taXNlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGJvdW5kVG8gPSBwcm9taXNlLl9ib3VuZFZhbHVlKCk7XG4gICAgICAgIHByZWRpY2F0ZUxvb3A6IGZvciAodmFyIGkgPSAwOyBpIDwgaW5zdGFuY2VzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGluc3RhbmNlc1tpXTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IEVycm9yIHx8XG4gICAgICAgICAgICAgICAgKGl0ZW0gIT0gbnVsbCAmJiBpdGVtLnByb3RvdHlwZSBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ5Q2F0Y2goY2IpLmNhbGwoYm91bmRUbywgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoZXNQcmVkaWNhdGUgPSB0cnlDYXRjaChpdGVtKS5jYWxsKGJvdW5kVG8sIGUpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzUHJlZGljYXRlID09PSBlcnJvck9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1ByZWRpY2F0ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZXNQcmVkaWNhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyeUNhdGNoKGNiKS5jYWxsKGJvdW5kVG8sIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXRpbC5pc09iamVjdChlKSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gZ2V0S2V5cyhpdGVtKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtW2tleV0gIT0gZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBwcmVkaWNhdGVMb29wO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnlDYXRjaChjYikuY2FsbChib3VuZFRvLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTkVYVF9GSUxURVI7XG4gICAgfTtcbn1cblxucmV0dXJuIGNhdGNoRmlsdGVyO1xufTtcblxufSx7XCIuL2VzNVwiOjEzLFwiLi91dGlsXCI6MzZ9XSw4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XG52YXIgbG9uZ1N0YWNrVHJhY2VzID0gZmFsc2U7XG52YXIgY29udGV4dFN0YWNrID0gW107XG5cblByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQ3JlYXRlZCA9IGZ1bmN0aW9uKCkge307XG5Qcm9taXNlLnByb3RvdHlwZS5fcHVzaENvbnRleHQgPSBmdW5jdGlvbigpIHt9O1xuUHJvbWlzZS5wcm90b3R5cGUuX3BvcENvbnRleHQgPSBmdW5jdGlvbigpIHtyZXR1cm4gbnVsbDt9O1xuUHJvbWlzZS5fcGVla0NvbnRleHQgPSBQcm9taXNlLnByb3RvdHlwZS5fcGVla0NvbnRleHQgPSBmdW5jdGlvbigpIHt9O1xuXG5mdW5jdGlvbiBDb250ZXh0KCkge1xuICAgIHRoaXMuX3RyYWNlID0gbmV3IENvbnRleHQuQ2FwdHVyZWRUcmFjZShwZWVrQ29udGV4dCgpKTtcbn1cbkNvbnRleHQucHJvdG90eXBlLl9wdXNoQ29udGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fdHJhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl90cmFjZS5fcHJvbWlzZUNyZWF0ZWQgPSBudWxsO1xuICAgICAgICBjb250ZXh0U3RhY2sucHVzaCh0aGlzLl90cmFjZSk7XG4gICAgfVxufTtcblxuQ29udGV4dC5wcm90b3R5cGUuX3BvcENvbnRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3RyYWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHRyYWNlID0gY29udGV4dFN0YWNrLnBvcCgpO1xuICAgICAgICB2YXIgcmV0ID0gdHJhY2UuX3Byb21pc2VDcmVhdGVkO1xuICAgICAgICB0cmFjZS5fcHJvbWlzZUNyZWF0ZWQgPSBudWxsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoKSB7XG4gICAgaWYgKGxvbmdTdGFja1RyYWNlcykgcmV0dXJuIG5ldyBDb250ZXh0KCk7XG59XG5cbmZ1bmN0aW9uIHBlZWtDb250ZXh0KCkge1xuICAgIHZhciBsYXN0SW5kZXggPSBjb250ZXh0U3RhY2subGVuZ3RoIC0gMTtcbiAgICBpZiAobGFzdEluZGV4ID49IDApIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHRTdGFja1tsYXN0SW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuQ29udGV4dC5DYXB0dXJlZFRyYWNlID0gbnVsbDtcbkNvbnRleHQuY3JlYXRlID0gY3JlYXRlQ29udGV4dDtcbkNvbnRleHQuZGVhY3RpdmF0ZUxvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uKCkge307XG5Db250ZXh0LmFjdGl2YXRlTG9uZ1N0YWNrVHJhY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIFByb21pc2VfcHVzaENvbnRleHQgPSBQcm9taXNlLnByb3RvdHlwZS5fcHVzaENvbnRleHQ7XG4gICAgdmFyIFByb21pc2VfcG9wQ29udGV4dCA9IFByb21pc2UucHJvdG90eXBlLl9wb3BDb250ZXh0O1xuICAgIHZhciBQcm9taXNlX1BlZWtDb250ZXh0ID0gUHJvbWlzZS5fcGVla0NvbnRleHQ7XG4gICAgdmFyIFByb21pc2VfcGVla0NvbnRleHQgPSBQcm9taXNlLnByb3RvdHlwZS5fcGVla0NvbnRleHQ7XG4gICAgdmFyIFByb21pc2VfcHJvbWlzZUNyZWF0ZWQgPSBQcm9taXNlLnByb3RvdHlwZS5fcHJvbWlzZUNyZWF0ZWQ7XG4gICAgQ29udGV4dC5kZWFjdGl2YXRlTG9uZ1N0YWNrVHJhY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wdXNoQ29udGV4dCA9IFByb21pc2VfcHVzaENvbnRleHQ7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wb3BDb250ZXh0ID0gUHJvbWlzZV9wb3BDb250ZXh0O1xuICAgICAgICBQcm9taXNlLl9wZWVrQ29udGV4dCA9IFByb21pc2VfUGVla0NvbnRleHQ7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wZWVrQ29udGV4dCA9IFByb21pc2VfcGVla0NvbnRleHQ7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQ3JlYXRlZCA9IFByb21pc2VfcHJvbWlzZUNyZWF0ZWQ7XG4gICAgICAgIGxvbmdTdGFja1RyYWNlcyA9IGZhbHNlO1xuICAgIH07XG4gICAgbG9uZ1N0YWNrVHJhY2VzID0gdHJ1ZTtcbiAgICBQcm9taXNlLnByb3RvdHlwZS5fcHVzaENvbnRleHQgPSBDb250ZXh0LnByb3RvdHlwZS5fcHVzaENvbnRleHQ7XG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX3BvcENvbnRleHQgPSBDb250ZXh0LnByb3RvdHlwZS5fcG9wQ29udGV4dDtcbiAgICBQcm9taXNlLl9wZWVrQ29udGV4dCA9IFByb21pc2UucHJvdG90eXBlLl9wZWVrQ29udGV4dCA9IHBlZWtDb250ZXh0O1xuICAgIFByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQ3JlYXRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3R4ID0gdGhpcy5fcGVla0NvbnRleHQoKTtcbiAgICAgICAgaWYgKGN0eCAmJiBjdHguX3Byb21pc2VDcmVhdGVkID09IG51bGwpIGN0eC5fcHJvbWlzZUNyZWF0ZWQgPSB0aGlzO1xuICAgIH07XG59O1xucmV0dXJuIENvbnRleHQ7XG59O1xuXG59LHt9XSw5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBDb250ZXh0KSB7XG52YXIgZ2V0RG9tYWluID0gUHJvbWlzZS5fZ2V0RG9tYWluO1xudmFyIGFzeW5jID0gUHJvbWlzZS5fYXN5bmM7XG52YXIgV2FybmluZyA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKS5XYXJuaW5nO1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGNhbkF0dGFjaFRyYWNlID0gdXRpbC5jYW5BdHRhY2hUcmFjZTtcbnZhciB1bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVkO1xudmFyIHBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uO1xudmFyIGJsdWViaXJkRnJhbWVQYXR0ZXJuID1cbiAgICAvW1xcXFxcXC9dYmx1ZWJpcmRbXFxcXFxcL11qc1tcXFxcXFwvXShyZWxlYXNlfGRlYnVnfGluc3RydW1lbnRlZCkvO1xudmFyIG5vZGVGcmFtZVBhdHRlcm4gPSAvXFwoKD86dGltZXJzXFwuanMpOlxcZCs6XFxkK1xcKS87XG52YXIgcGFyc2VMaW5lUGF0dGVybiA9IC9bXFwvPFxcKF0oLis/KTooXFxkKyk6KFxcZCspXFwpP1xccyokLztcbnZhciBzdGFja0ZyYW1lUGF0dGVybiA9IG51bGw7XG52YXIgZm9ybWF0U3RhY2sgPSBudWxsO1xudmFyIGluZGVudFN0YWNrRnJhbWVzID0gZmFsc2U7XG52YXIgcHJpbnRXYXJuaW5nO1xudmFyIGRlYnVnZ2luZyA9ICEhKHV0aWwuZW52KFwiQkxVRUJJUkRfREVCVUdcIikgIT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHRydWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmVudihcIkJMVUVCSVJEX0RFQlVHXCIpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5lbnYoXCJOT0RFX0VOVlwiKSA9PT0gXCJkZXZlbG9wbWVudFwiKSk7XG5cbnZhciB3YXJuaW5ncyA9ICEhKHV0aWwuZW52KFwiQkxVRUJJUkRfV0FSTklOR1NcIikgIT0gMCAmJlxuICAgIChkZWJ1Z2dpbmcgfHwgdXRpbC5lbnYoXCJCTFVFQklSRF9XQVJOSU5HU1wiKSkpO1xuXG52YXIgbG9uZ1N0YWNrVHJhY2VzID0gISEodXRpbC5lbnYoXCJCTFVFQklSRF9MT05HX1NUQUNLX1RSQUNFU1wiKSAhPSAwICYmXG4gICAgKGRlYnVnZ2luZyB8fCB1dGlsLmVudihcIkJMVUVCSVJEX0xPTkdfU1RBQ0tfVFJBQ0VTXCIpKSk7XG5cbnZhciB3Rm9yZ290dGVuUmV0dXJuID0gdXRpbC5lbnYoXCJCTFVFQklSRF9XX0ZPUkdPVFRFTl9SRVRVUk5cIikgIT0gMCAmJlxuICAgICh3YXJuaW5ncyB8fCAhIXV0aWwuZW52KFwiQkxVRUJJUkRfV19GT1JHT1RURU5fUkVUVVJOXCIpKTtcblxuUHJvbWlzZS5wcm90b3R5cGUuc3VwcHJlc3NVbmhhbmRsZWRSZWplY3Rpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX3RhcmdldCgpO1xuICAgIHRhcmdldC5fYml0RmllbGQgPSAoKHRhcmdldC5fYml0RmllbGQgJiAofjEwNDg1NzYpKSB8XG4gICAgICAgICAgICAgICAgICAgICAgNTI0Mjg4KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9lbnN1cmVQb3NzaWJsZVJlamVjdGlvbkhhbmRsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCh0aGlzLl9iaXRGaWVsZCAmIDUyNDI4OCkgIT09IDApIHJldHVybjtcbiAgICB0aGlzLl9zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xuICAgIGFzeW5jLmludm9rZUxhdGVyKHRoaXMuX25vdGlmeVVuaGFuZGxlZFJlamVjdGlvbiwgdGhpcywgdW5kZWZpbmVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9ub3RpZnlVbmhhbmRsZWRSZWplY3Rpb25Jc0hhbmRsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZmlyZVJlamVjdGlvbkV2ZW50KFwicmVqZWN0aW9uSGFuZGxlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQsIHVuZGVmaW5lZCwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0UmV0dXJuZWROb25VbmRlZmluZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMjY4NDM1NDU2O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3JldHVybmVkTm9uVW5kZWZpbmVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDI2ODQzNTQ1NikgIT09IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fbm90aWZ5VW5oYW5kbGVkUmVqZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9pc1JlamVjdGlvblVuaGFuZGxlZCgpKSB7XG4gICAgICAgIHZhciByZWFzb24gPSB0aGlzLl9zZXR0bGVkVmFsdWUoKTtcbiAgICAgICAgdGhpcy5fc2V0VW5oYW5kbGVkUmVqZWN0aW9uSXNOb3RpZmllZCgpO1xuICAgICAgICBmaXJlUmVqZWN0aW9uRXZlbnQoXCJ1bmhhbmRsZWRSZWplY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libHlVbmhhbmRsZWRSZWplY3Rpb24sIHJlYXNvbiwgdGhpcyk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldFVuaGFuZGxlZFJlamVjdGlvbklzTm90aWZpZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDI2MjE0NDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl91bnNldFVuaGFuZGxlZFJlamVjdGlvbklzTm90aWZpZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCAmICh+MjYyMTQ0KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc1VuaGFuZGxlZFJlamVjdGlvbk5vdGlmaWVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAyNjIxNDQpID4gMDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMTA0ODU3Njtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl91bnNldFJlamVjdGlvbklzVW5oYW5kbGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofjEwNDg1NzYpO1xuICAgIGlmICh0aGlzLl9pc1VuaGFuZGxlZFJlamVjdGlvbk5vdGlmaWVkKCkpIHtcbiAgICAgICAgdGhpcy5fdW5zZXRVbmhhbmRsZWRSZWplY3Rpb25Jc05vdGlmaWVkKCk7XG4gICAgICAgIHRoaXMuX25vdGlmeVVuaGFuZGxlZFJlamVjdGlvbklzSGFuZGxlZCgpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc1JlamVjdGlvblVuaGFuZGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgMTA0ODU3NikgPiAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3dhcm4gPSBmdW5jdGlvbihtZXNzYWdlLCBzaG91bGRVc2VPd25UcmFjZSwgcHJvbWlzZSkge1xuICAgIHJldHVybiB3YXJuKG1lc3NhZ2UsIHNob3VsZFVzZU93blRyYWNlLCBwcm9taXNlIHx8IHRoaXMpO1xufTtcblxuUHJvbWlzZS5vblBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIGRvbWFpbiA9IGdldERvbWFpbigpO1xuICAgIHBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uID1cbiAgICAgICAgdHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIgPyAoZG9tYWluID09PSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4gOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmbikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbn07XG5cblByb21pc2Uub25VbmhhbmRsZWRSZWplY3Rpb25IYW5kbGVkID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIGRvbWFpbiA9IGdldERvbWFpbigpO1xuICAgIHVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQgPVxuICAgICAgICB0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIiA/IChkb21haW4gPT09IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbiA6IHV0aWwuZG9tYWluQmluZChkb21haW4sIGZuKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xufTtcblxudmFyIGRpc2FibGVMb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbigpIHt9O1xuUHJvbWlzZS5sb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFzeW5jLmhhdmVJdGVtc1F1ZXVlZCgpICYmICFjb25maWcubG9uZ1N0YWNrVHJhY2VzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBlbmFibGUgbG9uZyBzdGFjayB0cmFjZXMgYWZ0ZXIgcHJvbWlzZXMgaGF2ZSBiZWVuIGNyZWF0ZWRcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbiAgICBpZiAoIWNvbmZpZy5sb25nU3RhY2tUcmFjZXMgJiYgbG9uZ1N0YWNrVHJhY2VzSXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICB2YXIgUHJvbWlzZV9jYXB0dXJlU3RhY2tUcmFjZSA9IFByb21pc2UucHJvdG90eXBlLl9jYXB0dXJlU3RhY2tUcmFjZTtcbiAgICAgICAgdmFyIFByb21pc2VfYXR0YWNoRXh0cmFUcmFjZSA9IFByb21pc2UucHJvdG90eXBlLl9hdHRhY2hFeHRyYVRyYWNlO1xuICAgICAgICBjb25maWcubG9uZ1N0YWNrVHJhY2VzID0gdHJ1ZTtcbiAgICAgICAgZGlzYWJsZUxvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGFzeW5jLmhhdmVJdGVtc1F1ZXVlZCgpICYmICFjb25maWcubG9uZ1N0YWNrVHJhY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGVuYWJsZSBsb25nIHN0YWNrIHRyYWNlcyBhZnRlciBwcm9taXNlcyBoYXZlIGJlZW4gY3JlYXRlZFxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fY2FwdHVyZVN0YWNrVHJhY2UgPSBQcm9taXNlX2NhcHR1cmVTdGFja1RyYWNlO1xuICAgICAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaEV4dHJhVHJhY2UgPSBQcm9taXNlX2F0dGFjaEV4dHJhVHJhY2U7XG4gICAgICAgICAgICBDb250ZXh0LmRlYWN0aXZhdGVMb25nU3RhY2tUcmFjZXMoKTtcbiAgICAgICAgICAgIGFzeW5jLmVuYWJsZVRyYW1wb2xpbmUoKTtcbiAgICAgICAgICAgIGNvbmZpZy5sb25nU3RhY2tUcmFjZXMgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2NhcHR1cmVTdGFja1RyYWNlID0gbG9uZ1N0YWNrVHJhY2VzQ2FwdHVyZVN0YWNrVHJhY2U7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9hdHRhY2hFeHRyYVRyYWNlID0gbG9uZ1N0YWNrVHJhY2VzQXR0YWNoRXh0cmFUcmFjZTtcbiAgICAgICAgQ29udGV4dC5hY3RpdmF0ZUxvbmdTdGFja1RyYWNlcygpO1xuICAgICAgICBhc3luYy5kaXNhYmxlVHJhbXBvbGluZUlmTmVjZXNzYXJ5KCk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5oYXNMb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNvbmZpZy5sb25nU3RhY2tUcmFjZXMgJiYgbG9uZ1N0YWNrVHJhY2VzSXNTdXBwb3J0ZWQoKTtcbn07XG5cbnZhciBmaXJlRG9tRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICAgICAgICAgIHV0aWwuZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvbUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUudG9Mb3dlckNhc2UoKSwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF1dGlsLmdsb2JhbC5kaXNwYXRjaEV2ZW50KGRvbUV2ZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgICAgICAgdXRpbC5nbG9iYWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tRXZlbnQgPSBuZXcgRXZlbnQobmFtZS50b0xvd2VyQ2FzZSgpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkb21FdmVudC5kZXRhaWwgPSBldmVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXV0aWwuZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZG9tRXZlbnQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQoXCJ0ZXN0aW5ndGhlZXZlbnRcIiwgZmFsc2UsIHRydWUsIHt9KTtcbiAgICAgICAgICAgIHV0aWwuZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvbUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICAgICAgICAgICAgICBkb21FdmVudC5pbml0Q3VzdG9tRXZlbnQobmFtZS50b0xvd2VyQ2FzZSgpLCBmYWxzZSwgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiAhdXRpbC5nbG9iYWwuZGlzcGF0Y2hFdmVudChkb21FdmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufSkoKTtcblxudmFyIGZpcmVHbG9iYWxFdmVudCA9IChmdW5jdGlvbigpIHtcbiAgICBpZiAodXRpbC5pc05vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW1pdC5hcHBseShwcm9jZXNzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdXRpbC5nbG9iYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IFwib25cIiArIG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSB1dGlsLmdsb2JhbFttZXRob2ROYW1lXTtcbiAgICAgICAgICAgIGlmICghbWV0aG9kKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBtZXRob2QuYXBwbHkodXRpbC5nbG9iYWwsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdChuYW1lLCBwcm9taXNlKSB7XG4gICAgcmV0dXJuIHtwcm9taXNlOiBwcm9taXNlfTtcbn1cblxudmFyIGV2ZW50VG9PYmplY3RHZW5lcmF0b3IgPSB7XG4gICAgcHJvbWlzZUNyZWF0ZWQ6IGdlbmVyYXRlUHJvbWlzZUxpZmVjeWNsZUV2ZW50T2JqZWN0LFxuICAgIHByb21pc2VGdWxmaWxsZWQ6IGdlbmVyYXRlUHJvbWlzZUxpZmVjeWNsZUV2ZW50T2JqZWN0LFxuICAgIHByb21pc2VSZWplY3RlZDogZ2VuZXJhdGVQcm9taXNlTGlmZWN5Y2xlRXZlbnRPYmplY3QsXG4gICAgcHJvbWlzZVJlc29sdmVkOiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdCxcbiAgICBwcm9taXNlQ2FuY2VsbGVkOiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdCxcbiAgICBwcm9taXNlQ2hhaW5lZDogZnVuY3Rpb24obmFtZSwgcHJvbWlzZSwgY2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIHtwcm9taXNlOiBwcm9taXNlLCBjaGlsZDogY2hpbGR9O1xuICAgIH0sXG4gICAgd2FybmluZzogZnVuY3Rpb24obmFtZSwgd2FybmluZykge1xuICAgICAgICByZXR1cm4ge3dhcm5pbmc6IHdhcm5pbmd9O1xuICAgIH0sXG4gICAgdW5oYW5kbGVkUmVqZWN0aW9uOiBmdW5jdGlvbiAobmFtZSwgcmVhc29uLCBwcm9taXNlKSB7XG4gICAgICAgIHJldHVybiB7cmVhc29uOiByZWFzb24sIHByb21pc2U6IHByb21pc2V9O1xuICAgIH0sXG4gICAgcmVqZWN0aW9uSGFuZGxlZDogZ2VuZXJhdGVQcm9taXNlTGlmZWN5Y2xlRXZlbnRPYmplY3Rcbn07XG5cbnZhciBhY3RpdmVGaXJlRXZlbnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBnbG9iYWxFdmVudEZpcmVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgZ2xvYmFsRXZlbnRGaXJlZCA9IGZpcmVHbG9iYWxFdmVudC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgYXN5bmMudGhyb3dMYXRlcihlKTtcbiAgICAgICAgZ2xvYmFsRXZlbnRGaXJlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGRvbUV2ZW50RmlyZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBkb21FdmVudEZpcmVkID0gZmlyZURvbUV2ZW50KG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VG9PYmplY3RHZW5lcmF0b3JbbmFtZV0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBhc3luYy50aHJvd0xhdGVyKGUpO1xuICAgICAgICBkb21FdmVudEZpcmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZG9tRXZlbnRGaXJlZCB8fCBnbG9iYWxFdmVudEZpcmVkO1xufTtcblxuUHJvbWlzZS5jb25maWcgPSBmdW5jdGlvbihvcHRzKSB7XG4gICAgb3B0cyA9IE9iamVjdChvcHRzKTtcbiAgICBpZiAoXCJsb25nU3RhY2tUcmFjZXNcIiBpbiBvcHRzKSB7XG4gICAgICAgIGlmIChvcHRzLmxvbmdTdGFja1RyYWNlcykge1xuICAgICAgICAgICAgUHJvbWlzZS5sb25nU3RhY2tUcmFjZXMoKTtcbiAgICAgICAgfSBlbHNlIGlmICghb3B0cy5sb25nU3RhY2tUcmFjZXMgJiYgUHJvbWlzZS5oYXNMb25nU3RhY2tUcmFjZXMoKSkge1xuICAgICAgICAgICAgZGlzYWJsZUxvbmdTdGFja1RyYWNlcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChcIndhcm5pbmdzXCIgaW4gb3B0cykge1xuICAgICAgICB2YXIgd2FybmluZ3NPcHRpb24gPSBvcHRzLndhcm5pbmdzO1xuICAgICAgICBjb25maWcud2FybmluZ3MgPSAhIXdhcm5pbmdzT3B0aW9uO1xuICAgICAgICB3Rm9yZ290dGVuUmV0dXJuID0gY29uZmlnLndhcm5pbmdzO1xuXG4gICAgICAgIGlmICh1dGlsLmlzT2JqZWN0KHdhcm5pbmdzT3B0aW9uKSkge1xuICAgICAgICAgICAgaWYgKFwid0ZvcmdvdHRlblJldHVyblwiIGluIHdhcm5pbmdzT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgd0ZvcmdvdHRlblJldHVybiA9ICEhd2FybmluZ3NPcHRpb24ud0ZvcmdvdHRlblJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoXCJjYW5jZWxsYXRpb25cIiBpbiBvcHRzICYmIG9wdHMuY2FuY2VsbGF0aW9uICYmICFjb25maWcuY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGlmIChhc3luYy5oYXZlSXRlbXNRdWV1ZWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIFwiY2Fubm90IGVuYWJsZSBjYW5jZWxsYXRpb24gYWZ0ZXIgcHJvbWlzZXMgYXJlIGluIHVzZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fY2xlYXJDYW5jZWxsYXRpb25EYXRhID1cbiAgICAgICAgICAgIGNhbmNlbGxhdGlvbkNsZWFyQ2FuY2VsbGF0aW9uRGF0YTtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX3Byb3BhZ2F0ZUZyb20gPSBjYW5jZWxsYXRpb25Qcm9wYWdhdGVGcm9tO1xuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fb25DYW5jZWwgPSBjYW5jZWxsYXRpb25PbkNhbmNlbDtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX3NldE9uQ2FuY2VsID0gY2FuY2VsbGF0aW9uU2V0T25DYW5jZWw7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9hdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayA9XG4gICAgICAgICAgICBjYW5jZWxsYXRpb25BdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjaztcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2V4ZWN1dGUgPSBjYW5jZWxsYXRpb25FeGVjdXRlO1xuICAgICAgICBwcm9wYWdhdGVGcm9tRnVuY3Rpb24gPSBjYW5jZWxsYXRpb25Qcm9wYWdhdGVGcm9tO1xuICAgICAgICBjb25maWcuY2FuY2VsbGF0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFwibW9uaXRvcmluZ1wiIGluIG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHMubW9uaXRvcmluZyAmJiAhY29uZmlnLm1vbml0b3JpbmcpIHtcbiAgICAgICAgICAgIGNvbmZpZy5tb25pdG9yaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIFByb21pc2UucHJvdG90eXBlLl9maXJlRXZlbnQgPSBhY3RpdmVGaXJlRXZlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIW9wdHMubW9uaXRvcmluZyAmJiBjb25maWcubW9uaXRvcmluZykge1xuICAgICAgICAgICAgY29uZmlnLm1vbml0b3JpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIFByb21pc2UucHJvdG90eXBlLl9maXJlRXZlbnQgPSBkZWZhdWx0RmlyZUV2ZW50O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZGVmYXVsdEZpcmVFdmVudCgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblByb21pc2UucHJvdG90eXBlLl9maXJlRXZlbnQgPSBkZWZhdWx0RmlyZUV2ZW50O1xuUHJvbWlzZS5wcm90b3R5cGUuX2V4ZWN1dGUgPSBmdW5jdGlvbihleGVjdXRvciwgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbn07XG5Qcm9taXNlLnByb3RvdHlwZS5fb25DYW5jZWwgPSBmdW5jdGlvbiAoKSB7fTtcblByb21pc2UucHJvdG90eXBlLl9zZXRPbkNhbmNlbCA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7IDsgfTtcblByb21pc2UucHJvdG90eXBlLl9hdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayA9IGZ1bmN0aW9uKG9uQ2FuY2VsKSB7XG4gICAgO1xufTtcblByb21pc2UucHJvdG90eXBlLl9jYXB0dXJlU3RhY2tUcmFjZSA9IGZ1bmN0aW9uICgpIHt9O1xuUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaEV4dHJhVHJhY2UgPSBmdW5jdGlvbiAoKSB7fTtcblByb21pc2UucHJvdG90eXBlLl9jbGVhckNhbmNlbGxhdGlvbkRhdGEgPSBmdW5jdGlvbigpIHt9O1xuUHJvbWlzZS5wcm90b3R5cGUuX3Byb3BhZ2F0ZUZyb20gPSBmdW5jdGlvbiAocGFyZW50LCBmbGFncykge1xuICAgIDtcbiAgICA7XG59O1xuXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25FeGVjdXRlKGV4ZWN1dG9yLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgdHJ5IHtcbiAgICAgICAgZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0LCBmdW5jdGlvbihvbkNhbmNlbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvbkNhbmNlbCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9uQ2FuY2VsIG11c3QgYmUgYSBmdW5jdGlvbiwgZ290OiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnRvU3RyaW5nKG9uQ2FuY2VsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9taXNlLl9hdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayhvbkNhbmNlbCk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25BdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayhvbkNhbmNlbCkge1xuICAgIGlmICghdGhpcy5faXNDYW5jZWxsYWJsZSgpKSByZXR1cm4gdGhpcztcblxuICAgIHZhciBwcmV2aW91c09uQ2FuY2VsID0gdGhpcy5fb25DYW5jZWwoKTtcbiAgICBpZiAocHJldmlvdXNPbkNhbmNlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh1dGlsLmlzQXJyYXkocHJldmlvdXNPbkNhbmNlbCkpIHtcbiAgICAgICAgICAgIHByZXZpb3VzT25DYW5jZWwucHVzaChvbkNhbmNlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRPbkNhbmNlbChbcHJldmlvdXNPbkNhbmNlbCwgb25DYW5jZWxdKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NldE9uQ2FuY2VsKG9uQ2FuY2VsKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbmNlbGxhdGlvbk9uQ2FuY2VsKCkge1xuICAgIHJldHVybiB0aGlzLl9vbkNhbmNlbEZpZWxkO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25TZXRPbkNhbmNlbChvbkNhbmNlbCkge1xuICAgIHRoaXMuX29uQ2FuY2VsRmllbGQgPSBvbkNhbmNlbDtcbn1cblxuZnVuY3Rpb24gY2FuY2VsbGF0aW9uQ2xlYXJDYW5jZWxsYXRpb25EYXRhKCkge1xuICAgIHRoaXMuX2NhbmNlbGxhdGlvblBhcmVudCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9vbkNhbmNlbEZpZWxkID0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25Qcm9wYWdhdGVGcm9tKHBhcmVudCwgZmxhZ3MpIHtcbiAgICBpZiAoKGZsYWdzICYgMSkgIT09IDApIHtcbiAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uUGFyZW50ID0gcGFyZW50O1xuICAgICAgICB2YXIgYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCA9IHBhcmVudC5fYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbDtcbiAgICAgICAgaWYgKGJyYW5jaGVzUmVtYWluaW5nVG9DYW5jZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50Ll9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID0gYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCArIDE7XG4gICAgfVxuICAgIGlmICgoZmxhZ3MgJiAyKSAhPT0gMCAmJiBwYXJlbnQuX2lzQm91bmQoKSkge1xuICAgICAgICB0aGlzLl9zZXRCb3VuZFRvKHBhcmVudC5fYm91bmRUbyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBiaW5kaW5nUHJvcGFnYXRlRnJvbShwYXJlbnQsIGZsYWdzKSB7XG4gICAgaWYgKChmbGFncyAmIDIpICE9PSAwICYmIHBhcmVudC5faXNCb3VuZCgpKSB7XG4gICAgICAgIHRoaXMuX3NldEJvdW5kVG8ocGFyZW50Ll9ib3VuZFRvKTtcbiAgICB9XG59XG52YXIgcHJvcGFnYXRlRnJvbUZ1bmN0aW9uID0gYmluZGluZ1Byb3BhZ2F0ZUZyb207XG5cbmZ1bmN0aW9uIGJvdW5kVmFsdWVGdW5jdGlvbigpIHtcbiAgICB2YXIgcmV0ID0gdGhpcy5fYm91bmRUbztcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXQuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQudmFsdWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBsb25nU3RhY2tUcmFjZXNDYXB0dXJlU3RhY2tUcmFjZSgpIHtcbiAgICB0aGlzLl90cmFjZSA9IG5ldyBDYXB0dXJlZFRyYWNlKHRoaXMuX3BlZWtDb250ZXh0KCkpO1xufVxuXG5mdW5jdGlvbiBsb25nU3RhY2tUcmFjZXNBdHRhY2hFeHRyYVRyYWNlKGVycm9yLCBpZ25vcmVTZWxmKSB7XG4gICAgaWYgKGNhbkF0dGFjaFRyYWNlKGVycm9yKSkge1xuICAgICAgICB2YXIgdHJhY2UgPSB0aGlzLl90cmFjZTtcbiAgICAgICAgaWYgKHRyYWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChpZ25vcmVTZWxmKSB0cmFjZSA9IHRyYWNlLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRyYWNlLmF0dGFjaEV4dHJhVHJhY2UoZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKCFlcnJvci5fX3N0YWNrQ2xlYW5lZF9fKSB7XG4gICAgICAgICAgICB2YXIgcGFyc2VkID0gcGFyc2VTdGFja0FuZE1lc3NhZ2UoZXJyb3IpO1xuICAgICAgICAgICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcChlcnJvciwgXCJzdGFja1wiLFxuICAgICAgICAgICAgICAgIHBhcnNlZC5tZXNzYWdlICsgXCJcXG5cIiArIHBhcnNlZC5zdGFjay5qb2luKFwiXFxuXCIpKTtcbiAgICAgICAgICAgIHV0aWwubm90RW51bWVyYWJsZVByb3AoZXJyb3IsIFwiX19zdGFja0NsZWFuZWRfX1wiLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zKHJldHVyblZhbHVlLCBwcm9taXNlQ3JlYXRlZCwgbmFtZSwgcHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQpIHtcbiAgICBpZiAocmV0dXJuVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBwcm9taXNlQ3JlYXRlZCAhPT0gbnVsbCAmJlxuICAgICAgICB3Rm9yZ290dGVuUmV0dXJuKSB7XG4gICAgICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnQuX3JldHVybmVkTm9uVW5kZWZpbmVkKCkpIHJldHVybjtcbiAgICAgICAgaWYgKChwcm9taXNlLl9iaXRGaWVsZCAmIDY1NTM1KSA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChuYW1lKSBuYW1lID0gbmFtZSArIFwiIFwiO1xuICAgICAgICB2YXIgaGFuZGxlckxpbmUgPSBcIlwiO1xuICAgICAgICB2YXIgY3JlYXRvckxpbmUgPSBcIlwiO1xuICAgICAgICBpZiAocHJvbWlzZUNyZWF0ZWQuX3RyYWNlKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2VMaW5lcyA9IHByb21pc2VDcmVhdGVkLl90cmFjZS5zdGFjay5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgIHZhciBzdGFjayA9IGNsZWFuU3RhY2sodHJhY2VMaW5lcyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhY2subGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHN0YWNrW2ldO1xuICAgICAgICAgICAgICAgIGlmICghbm9kZUZyYW1lUGF0dGVybi50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lTWF0Y2hlcyA9IGxpbmUubWF0Y2gocGFyc2VMaW5lUGF0dGVybik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlckxpbmUgID0gXCJhdCBcIiArIGxpbmVNYXRjaGVzWzFdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjpcIiArIGxpbmVNYXRjaGVzWzJdICsgXCI6XCIgKyBsaW5lTWF0Y2hlc1szXSArIFwiIFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RVc2VyTGluZSA9IHN0YWNrWzBdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhY2VMaW5lcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFjZUxpbmVzW2ldID09PSBmaXJzdFVzZXJMaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTGluZSA9IFwiXFxuXCIgKyB0cmFjZUxpbmVzW2kgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1zZyA9IFwiYSBwcm9taXNlIHdhcyBjcmVhdGVkIGluIGEgXCIgKyBuYW1lICtcbiAgICAgICAgICAgIFwiaGFuZGxlciBcIiArIGhhbmRsZXJMaW5lICsgXCJidXQgd2FzIG5vdCByZXR1cm5lZCBmcm9tIGl0LCBcIiArXG4gICAgICAgICAgICBcInNlZSBodHRwOi8vZ29vLmdsL3JScU1Vd1wiICtcbiAgICAgICAgICAgIGNyZWF0b3JMaW5lO1xuICAgICAgICBwcm9taXNlLl93YXJuKG1zZywgdHJ1ZSwgcHJvbWlzZUNyZWF0ZWQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVwcmVjYXRlZChuYW1lLCByZXBsYWNlbWVudCkge1xuICAgIHZhciBtZXNzYWdlID0gbmFtZSArXG4gICAgICAgIFwiIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uLlwiO1xuICAgIGlmIChyZXBsYWNlbWVudCkgbWVzc2FnZSArPSBcIiBVc2UgXCIgKyByZXBsYWNlbWVudCArIFwiIGluc3RlYWQuXCI7XG4gICAgcmV0dXJuIHdhcm4obWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHdhcm4obWVzc2FnZSwgc2hvdWxkVXNlT3duVHJhY2UsIHByb21pc2UpIHtcbiAgICBpZiAoIWNvbmZpZy53YXJuaW5ncykgcmV0dXJuO1xuICAgIHZhciB3YXJuaW5nID0gbmV3IFdhcm5pbmcobWVzc2FnZSk7XG4gICAgdmFyIGN0eDtcbiAgICBpZiAoc2hvdWxkVXNlT3duVHJhY2UpIHtcbiAgICAgICAgcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZSh3YXJuaW5nKTtcbiAgICB9IGVsc2UgaWYgKGNvbmZpZy5sb25nU3RhY2tUcmFjZXMgJiYgKGN0eCA9IFByb21pc2UuX3BlZWtDb250ZXh0KCkpKSB7XG4gICAgICAgIGN0eC5hdHRhY2hFeHRyYVRyYWNlKHdhcm5pbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSBwYXJzZVN0YWNrQW5kTWVzc2FnZSh3YXJuaW5nKTtcbiAgICAgICAgd2FybmluZy5zdGFjayA9IHBhcnNlZC5tZXNzYWdlICsgXCJcXG5cIiArIHBhcnNlZC5zdGFjay5qb2luKFwiXFxuXCIpO1xuICAgIH1cblxuICAgIGlmICghYWN0aXZlRmlyZUV2ZW50KFwid2FybmluZ1wiLCB3YXJuaW5nKSkge1xuICAgICAgICBmb3JtYXRBbmRMb2dFcnJvcih3YXJuaW5nLCBcIlwiLCB0cnVlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlY29uc3RydWN0U3RhY2sobWVzc2FnZSwgc3RhY2tzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFja3MubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgICAgIHN0YWNrc1tpXS5wdXNoKFwiRnJvbSBwcmV2aW91cyBldmVudDpcIik7XG4gICAgICAgIHN0YWNrc1tpXSA9IHN0YWNrc1tpXS5qb2luKFwiXFxuXCIpO1xuICAgIH1cbiAgICBpZiAoaSA8IHN0YWNrcy5sZW5ndGgpIHtcbiAgICAgICAgc3RhY2tzW2ldID0gc3RhY2tzW2ldLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrcy5qb2luKFwiXFxuXCIpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVEdXBsaWNhdGVPckVtcHR5SnVtcHMoc3RhY2tzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHN0YWNrc1tpXS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICgoaSArIDEgPCBzdGFja3MubGVuZ3RoKSAmJiBzdGFja3NbaV1bMF0gPT09IHN0YWNrc1tpKzFdWzBdKSkge1xuICAgICAgICAgICAgc3RhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ29tbW9uUm9vdHMoc3RhY2tzKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBzdGFja3NbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzdGFja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHByZXYgPSBzdGFja3NbaV07XG4gICAgICAgIHZhciBjdXJyZW50TGFzdEluZGV4ID0gY3VycmVudC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgY3VycmVudExhc3RMaW5lID0gY3VycmVudFtjdXJyZW50TGFzdEluZGV4XTtcbiAgICAgICAgdmFyIGNvbW1vblJvb3RNZWV0UG9pbnQgPSAtMTtcblxuICAgICAgICBmb3IgKHZhciBqID0gcHJldi5sZW5ndGggLSAxOyBqID49IDA7IC0taikge1xuICAgICAgICAgICAgaWYgKHByZXZbal0gPT09IGN1cnJlbnRMYXN0TGluZSkge1xuICAgICAgICAgICAgICAgIGNvbW1vblJvb3RNZWV0UG9pbnQgPSBqO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IGNvbW1vblJvb3RNZWV0UG9pbnQ7IGogPj0gMDsgLS1qKSB7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHByZXZbal07XG4gICAgICAgICAgICBpZiAoY3VycmVudFtjdXJyZW50TGFzdEluZGV4XSA9PT0gbGluZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQucG9wKCk7XG4gICAgICAgICAgICAgICAgY3VycmVudExhc3RJbmRleC0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gcHJldjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFuU3RhY2soc3RhY2spIHtcbiAgICB2YXIgcmV0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgbGluZSA9IHN0YWNrW2ldO1xuICAgICAgICB2YXIgaXNUcmFjZUxpbmUgPSBcIiAgICAoTm8gc3RhY2sgdHJhY2UpXCIgPT09IGxpbmUgfHxcbiAgICAgICAgICAgIHN0YWNrRnJhbWVQYXR0ZXJuLnRlc3QobGluZSk7XG4gICAgICAgIHZhciBpc0ludGVybmFsRnJhbWUgPSBpc1RyYWNlTGluZSAmJiBzaG91bGRJZ25vcmUobGluZSk7XG4gICAgICAgIGlmIChpc1RyYWNlTGluZSAmJiAhaXNJbnRlcm5hbEZyYW1lKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50U3RhY2tGcmFtZXMgJiYgbGluZS5jaGFyQXQoMCkgIT09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgbGluZSA9IFwiICAgIFwiICsgbGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldC5wdXNoKGxpbmUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHN0YWNrRnJhbWVzQXNBcnJheShlcnJvcikge1xuICAgIHZhciBzdGFjayA9IGVycm9yLnN0YWNrLnJlcGxhY2UoL1xccyskL2csIFwiXCIpLnNwbGl0KFwiXFxuXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzdGFja1tpXTtcbiAgICAgICAgaWYgKFwiICAgIChObyBzdGFjayB0cmFjZSlcIiA9PT0gbGluZSB8fCBzdGFja0ZyYW1lUGF0dGVybi50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgc3RhY2sgPSBzdGFjay5zbGljZShpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YWNrO1xufVxuXG5mdW5jdGlvbiBwYXJzZVN0YWNrQW5kTWVzc2FnZShlcnJvcikge1xuICAgIHZhciBzdGFjayA9IGVycm9yLnN0YWNrO1xuICAgIHZhciBtZXNzYWdlID0gZXJyb3IudG9TdHJpbmcoKTtcbiAgICBzdGFjayA9IHR5cGVvZiBzdGFjayA9PT0gXCJzdHJpbmdcIiAmJiBzdGFjay5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgPyBzdGFja0ZyYW1lc0FzQXJyYXkoZXJyb3IpIDogW1wiICAgIChObyBzdGFjayB0cmFjZSlcIl07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgc3RhY2s6IGNsZWFuU3RhY2soc3RhY2spXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0QW5kTG9nRXJyb3IoZXJyb3IsIHRpdGxlLCBpc1NvZnQpIHtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2U7XG4gICAgICAgIGlmICh1dGlsLmlzT2JqZWN0KGVycm9yKSkge1xuICAgICAgICAgICAgdmFyIHN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgICAgICAgICBtZXNzYWdlID0gdGl0bGUgKyBmb3JtYXRTdGFjayhzdGFjaywgZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZSA9IHRpdGxlICsgU3RyaW5nKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHByaW50V2FybmluZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBwcmludFdhcm5pbmcobWVzc2FnZSwgaXNTb2Z0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUubG9nID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZmlyZVJlamVjdGlvbkV2ZW50KG5hbWUsIGxvY2FsSGFuZGxlciwgcmVhc29uLCBwcm9taXNlKSB7XG4gICAgdmFyIGxvY2FsRXZlbnRGaXJlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYWxIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGxvY2FsRXZlbnRGaXJlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJyZWplY3Rpb25IYW5kbGVkXCIpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEhhbmRsZXIocHJvbWlzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvY2FsSGFuZGxlcihyZWFzb24sIHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBhc3luYy50aHJvd0xhdGVyKGUpO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSBcInVuaGFuZGxlZFJlamVjdGlvblwiKSB7XG4gICAgICAgIGlmICghYWN0aXZlRmlyZUV2ZW50KG5hbWUsIHJlYXNvbiwgcHJvbWlzZSkgJiYgIWxvY2FsRXZlbnRGaXJlZCkge1xuICAgICAgICAgICAgZm9ybWF0QW5kTG9nRXJyb3IocmVhc29uLCBcIlVuaGFuZGxlZCByZWplY3Rpb24gXCIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZlRmlyZUV2ZW50KG5hbWUsIHByb21pc2UpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0Tm9uRXJyb3Iob2JqKSB7XG4gICAgdmFyIHN0cjtcbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHN0ciA9IFwiW2Z1bmN0aW9uIFwiICtcbiAgICAgICAgICAgIChvYmoubmFtZSB8fCBcImFub255bW91c1wiKSArXG4gICAgICAgICAgICBcIl1cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBvYmogJiYgdHlwZW9mIG9iai50b1N0cmluZyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICA/IG9iai50b1N0cmluZygpIDogdXRpbC50b1N0cmluZyhvYmopO1xuICAgICAgICB2YXIgcnVzZWxlc3NUb1N0cmluZyA9IC9cXFtvYmplY3QgW2EtekEtWjAtOSRfXStcXF0vO1xuICAgICAgICBpZiAocnVzZWxlc3NUb1N0cmluZy50ZXN0KHN0cikpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1N0ciA9IEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgICAgICAgICAgICAgc3RyID0gbmV3U3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2goZSkge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHN0ciA9IFwiKGVtcHR5IGFycmF5KVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXCIoPFwiICsgc25pcChzdHIpICsgXCI+LCBubyBzdGFjayB0cmFjZSlcIik7XG59XG5cbmZ1bmN0aW9uIHNuaXAoc3RyKSB7XG4gICAgdmFyIG1heENoYXJzID0gNDE7XG4gICAgaWYgKHN0ci5sZW5ndGggPCBtYXhDaGFycykge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnN1YnN0cigwLCBtYXhDaGFycyAtIDMpICsgXCIuLi5cIjtcbn1cblxuZnVuY3Rpb24gbG9uZ1N0YWNrVHJhY2VzSXNTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBjYXB0dXJlU3RhY2tUcmFjZSA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG52YXIgc2hvdWxkSWdub3JlID0gZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfTtcbnZhciBwYXJzZUxpbmVJbmZvUmVnZXggPSAvW1xcLzxcXChdKFteOlxcL10rKTooXFxkKyk6KD86XFxkKylcXCk/XFxzKiQvO1xuZnVuY3Rpb24gcGFyc2VMaW5lSW5mbyhsaW5lKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBsaW5lLm1hdGNoKHBhcnNlTGluZUluZm9SZWdleCk7XG4gICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbGVOYW1lOiBtYXRjaGVzWzFdLFxuICAgICAgICAgICAgbGluZTogcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRCb3VuZHMoZmlyc3RMaW5lRXJyb3IsIGxhc3RMaW5lRXJyb3IpIHtcbiAgICBpZiAoIWxvbmdTdGFja1RyYWNlc0lzU3VwcG9ydGVkKCkpIHJldHVybjtcbiAgICB2YXIgZmlyc3RTdGFja0xpbmVzID0gZmlyc3RMaW5lRXJyb3Iuc3RhY2suc3BsaXQoXCJcXG5cIik7XG4gICAgdmFyIGxhc3RTdGFja0xpbmVzID0gbGFzdExpbmVFcnJvci5zdGFjay5zcGxpdChcIlxcblwiKTtcbiAgICB2YXIgZmlyc3RJbmRleCA9IC0xO1xuICAgIHZhciBsYXN0SW5kZXggPSAtMTtcbiAgICB2YXIgZmlyc3RGaWxlTmFtZTtcbiAgICB2YXIgbGFzdEZpbGVOYW1lO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlyc3RTdGFja0xpbmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBwYXJzZUxpbmVJbmZvKGZpcnN0U3RhY2tMaW5lc1tpXSk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGZpcnN0RmlsZU5hbWUgPSByZXN1bHQuZmlsZU5hbWU7XG4gICAgICAgICAgICBmaXJzdEluZGV4ID0gcmVzdWx0LmxpbmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RTdGFja0xpbmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBwYXJzZUxpbmVJbmZvKGxhc3RTdGFja0xpbmVzW2ldKTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgbGFzdEZpbGVOYW1lID0gcmVzdWx0LmZpbGVOYW1lO1xuICAgICAgICAgICAgbGFzdEluZGV4ID0gcmVzdWx0LmxpbmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmlyc3RJbmRleCA8IDAgfHwgbGFzdEluZGV4IDwgMCB8fCAhZmlyc3RGaWxlTmFtZSB8fCAhbGFzdEZpbGVOYW1lIHx8XG4gICAgICAgIGZpcnN0RmlsZU5hbWUgIT09IGxhc3RGaWxlTmFtZSB8fCBmaXJzdEluZGV4ID49IGxhc3RJbmRleCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2hvdWxkSWdub3JlID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICBpZiAoYmx1ZWJpcmRGcmFtZVBhdHRlcm4udGVzdChsaW5lKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIHZhciBpbmZvID0gcGFyc2VMaW5lSW5mbyhsaW5lKTtcbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIGlmIChpbmZvLmZpbGVOYW1lID09PSBmaXJzdEZpbGVOYW1lICYmXG4gICAgICAgICAgICAgICAgKGZpcnN0SW5kZXggPD0gaW5mby5saW5lICYmIGluZm8ubGluZSA8PSBsYXN0SW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIENhcHR1cmVkVHJhY2UocGFyZW50KSB7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX3Byb21pc2VzQ3JlYXRlZCA9IDA7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuX2xlbmd0aCA9IDEgKyAocGFyZW50ID09PSB1bmRlZmluZWQgPyAwIDogcGFyZW50Ll9sZW5ndGgpO1xuICAgIGNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIENhcHR1cmVkVHJhY2UpO1xuICAgIGlmIChsZW5ndGggPiAzMikgdGhpcy51bmN5Y2xlKCk7XG59XG51dGlsLmluaGVyaXRzKENhcHR1cmVkVHJhY2UsIEVycm9yKTtcbkNvbnRleHQuQ2FwdHVyZWRUcmFjZSA9IENhcHR1cmVkVHJhY2U7XG5cbkNhcHR1cmVkVHJhY2UucHJvdG90eXBlLnVuY3ljbGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5fbGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPCAyKSByZXR1cm47XG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgdmFyIHN0YWNrVG9JbmRleCA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIG5vZGUgPSB0aGlzOyBub2RlICE9PSB1bmRlZmluZWQ7ICsraSkge1xuICAgICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5fcGFyZW50O1xuICAgIH1cbiAgICBsZW5ndGggPSB0aGlzLl9sZW5ndGggPSBpO1xuICAgIGZvciAodmFyIGkgPSBsZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgc3RhY2sgPSBub2Rlc1tpXS5zdGFjaztcbiAgICAgICAgaWYgKHN0YWNrVG9JbmRleFtzdGFja10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3RhY2tUb0luZGV4W3N0YWNrXSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgY3VycmVudFN0YWNrID0gbm9kZXNbaV0uc3RhY2s7XG4gICAgICAgIHZhciBpbmRleCA9IHN0YWNrVG9JbmRleFtjdXJyZW50U3RhY2tdO1xuICAgICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCAmJiBpbmRleCAhPT0gaSkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgIG5vZGVzW2luZGV4IC0gMV0uX3BhcmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBub2Rlc1tpbmRleCAtIDFdLl9sZW5ndGggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZXNbaV0uX3BhcmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG5vZGVzW2ldLl9sZW5ndGggPSAxO1xuICAgICAgICAgICAgdmFyIGN5Y2xlRWRnZU5vZGUgPSBpID4gMCA/IG5vZGVzW2kgLSAxXSA6IHRoaXM7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA8IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBjeWNsZUVkZ2VOb2RlLl9wYXJlbnQgPSBub2Rlc1tpbmRleCArIDFdO1xuICAgICAgICAgICAgICAgIGN5Y2xlRWRnZU5vZGUuX3BhcmVudC51bmN5Y2xlKCk7XG4gICAgICAgICAgICAgICAgY3ljbGVFZGdlTm9kZS5fbGVuZ3RoID1cbiAgICAgICAgICAgICAgICAgICAgY3ljbGVFZGdlTm9kZS5fcGFyZW50Ll9sZW5ndGggKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjeWNsZUVkZ2VOb2RlLl9wYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY3ljbGVFZGdlTm9kZS5fbGVuZ3RoID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjdXJyZW50Q2hpbGRMZW5ndGggPSBjeWNsZUVkZ2VOb2RlLl9sZW5ndGggKyAxO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IGkgLSAyOyBqID49IDA7IC0taikge1xuICAgICAgICAgICAgICAgIG5vZGVzW2pdLl9sZW5ndGggPSBjdXJyZW50Q2hpbGRMZW5ndGg7XG4gICAgICAgICAgICAgICAgY3VycmVudENoaWxkTGVuZ3RoKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5DYXB0dXJlZFRyYWNlLnByb3RvdHlwZS5hdHRhY2hFeHRyYVRyYWNlID0gZnVuY3Rpb24oZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IuX19zdGFja0NsZWFuZWRfXykgcmV0dXJuO1xuICAgIHRoaXMudW5jeWNsZSgpO1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZVN0YWNrQW5kTWVzc2FnZShlcnJvcik7XG4gICAgdmFyIG1lc3NhZ2UgPSBwYXJzZWQubWVzc2FnZTtcbiAgICB2YXIgc3RhY2tzID0gW3BhcnNlZC5zdGFja107XG5cbiAgICB2YXIgdHJhY2UgPSB0aGlzO1xuICAgIHdoaWxlICh0cmFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0YWNrcy5wdXNoKGNsZWFuU3RhY2sodHJhY2Uuc3RhY2suc3BsaXQoXCJcXG5cIikpKTtcbiAgICAgICAgdHJhY2UgPSB0cmFjZS5fcGFyZW50O1xuICAgIH1cbiAgICByZW1vdmVDb21tb25Sb290cyhzdGFja3MpO1xuICAgIHJlbW92ZUR1cGxpY2F0ZU9yRW1wdHlKdW1wcyhzdGFja3MpO1xuICAgIHV0aWwubm90RW51bWVyYWJsZVByb3AoZXJyb3IsIFwic3RhY2tcIiwgcmVjb25zdHJ1Y3RTdGFjayhtZXNzYWdlLCBzdGFja3MpKTtcbiAgICB1dGlsLm5vdEVudW1lcmFibGVQcm9wKGVycm9yLCBcIl9fc3RhY2tDbGVhbmVkX19cIiwgdHJ1ZSk7XG59O1xuXG52YXIgY2FwdHVyZVN0YWNrVHJhY2UgPSAoZnVuY3Rpb24gc3RhY2tEZXRlY3Rpb24oKSB7XG4gICAgdmFyIHY4c3RhY2tGcmFtZVBhdHRlcm4gPSAvXlxccyphdFxccyovO1xuICAgIHZhciB2OHN0YWNrRm9ybWF0dGVyID0gZnVuY3Rpb24oc3RhY2ssIGVycm9yKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhY2sgPT09IFwic3RyaW5nXCIpIHJldHVybiBzdGFjaztcblxuICAgICAgICBpZiAoZXJyb3IubmFtZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvci50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXROb25FcnJvcihlcnJvcik7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID09PSBcIm51bWJlclwiICYmXG4gICAgICAgIHR5cGVvZiBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCArPSA2O1xuICAgICAgICBzdGFja0ZyYW1lUGF0dGVybiA9IHY4c3RhY2tGcmFtZVBhdHRlcm47XG4gICAgICAgIGZvcm1hdFN0YWNrID0gdjhzdGFja0Zvcm1hdHRlcjtcbiAgICAgICAgdmFyIGNhcHR1cmVTdGFja1RyYWNlID0gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2U7XG5cbiAgICAgICAgc2hvdWxkSWdub3JlID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuIGJsdWViaXJkRnJhbWVQYXR0ZXJuLnRlc3QobGluZSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihyZWNlaXZlciwgaWdub3JlVW50aWwpIHtcbiAgICAgICAgICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCArPSA2O1xuICAgICAgICAgICAgY2FwdHVyZVN0YWNrVHJhY2UocmVjZWl2ZXIsIGlnbm9yZVVudGlsKTtcbiAgICAgICAgICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCAtPSA2O1xuICAgICAgICB9O1xuICAgIH1cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG5cbiAgICBpZiAodHlwZW9mIGVyci5zdGFjayA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICBlcnIuc3RhY2suc3BsaXQoXCJcXG5cIilbMF0uaW5kZXhPZihcInN0YWNrRGV0ZWN0aW9uQFwiKSA+PSAwKSB7XG4gICAgICAgIHN0YWNrRnJhbWVQYXR0ZXJuID0gL0AvO1xuICAgICAgICBmb3JtYXRTdGFjayA9IHY4c3RhY2tGb3JtYXR0ZXI7XG4gICAgICAgIGluZGVudFN0YWNrRnJhbWVzID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNhcHR1cmVTdGFja1RyYWNlKG8pIHtcbiAgICAgICAgICAgIG8uc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgaGFzU3RhY2tBZnRlclRocm93O1xuICAgIHRyeSB7IHRocm93IG5ldyBFcnJvcigpOyB9XG4gICAgY2F0Y2goZSkge1xuICAgICAgICBoYXNTdGFja0FmdGVyVGhyb3cgPSAoXCJzdGFja1wiIGluIGUpO1xuICAgIH1cbiAgICBpZiAoIShcInN0YWNrXCIgaW4gZXJyKSAmJiBoYXNTdGFja0FmdGVyVGhyb3cgJiZcbiAgICAgICAgdHlwZW9mIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBzdGFja0ZyYW1lUGF0dGVybiA9IHY4c3RhY2tGcmFtZVBhdHRlcm47XG4gICAgICAgIGZvcm1hdFN0YWNrID0gdjhzdGFja0Zvcm1hdHRlcjtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNhcHR1cmVTdGFja1RyYWNlKG8pIHtcbiAgICAgICAgICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCArPSA2O1xuICAgICAgICAgICAgdHJ5IHsgdGhyb3cgbmV3IEVycm9yKCk7IH1cbiAgICAgICAgICAgIGNhdGNoKGUpIHsgby5zdGFjayA9IGUuc3RhY2s7IH1cbiAgICAgICAgICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCAtPSA2O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZvcm1hdFN0YWNrID0gZnVuY3Rpb24oc3RhY2ssIGVycm9yKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhY2sgPT09IFwic3RyaW5nXCIpIHJldHVybiBzdGFjaztcblxuICAgICAgICBpZiAoKHR5cGVvZiBlcnJvciA9PT0gXCJvYmplY3RcIiB8fFxuICAgICAgICAgICAgdHlwZW9mIGVycm9yID09PSBcImZ1bmN0aW9uXCIpICYmXG4gICAgICAgICAgICBlcnJvci5uYW1lICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdE5vbkVycm9yKGVycm9yKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG51bGw7XG5cbn0pKFtdKTtcblxuaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfTtcbiAgICBpZiAodXRpbC5pc05vZGUgJiYgcHJvY2Vzcy5zdGRlcnIuaXNUVFkpIHtcbiAgICAgICAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24obWVzc2FnZSwgaXNTb2Z0KSB7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBpc1NvZnQgPyBcIlxcdTAwMWJbMzNtXCIgOiBcIlxcdTAwMWJbMzFtXCI7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oY29sb3IgKyBtZXNzYWdlICsgXCJcXHUwMDFiWzBtXFxuXCIpO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoIXV0aWwuaXNOb2RlICYmIHR5cGVvZiAobmV3IEVycm9yKCkuc3RhY2spID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKG1lc3NhZ2UsIGlzU29mdCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiJWNcIiArIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NvZnQgPyBcImNvbG9yOiBkYXJrb3JhbmdlXCIgOiBcImNvbG9yOiByZWRcIik7XG4gICAgICAgIH07XG4gICAgfVxufVxuXG52YXIgY29uZmlnID0ge1xuICAgIHdhcm5pbmdzOiB3YXJuaW5ncyxcbiAgICBsb25nU3RhY2tUcmFjZXM6IGZhbHNlLFxuICAgIGNhbmNlbGxhdGlvbjogZmFsc2UsXG4gICAgbW9uaXRvcmluZzogZmFsc2Vcbn07XG5cbmlmIChsb25nU3RhY2tUcmFjZXMpIFByb21pc2UubG9uZ1N0YWNrVHJhY2VzKCk7XG5cbnJldHVybiB7XG4gICAgbG9uZ1N0YWNrVHJhY2VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5sb25nU3RhY2tUcmFjZXM7XG4gICAgfSxcbiAgICB3YXJuaW5nczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjb25maWcud2FybmluZ3M7XG4gICAgfSxcbiAgICBjYW5jZWxsYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY29uZmlnLmNhbmNlbGxhdGlvbjtcbiAgICB9LFxuICAgIG1vbml0b3Jpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY29uZmlnLm1vbml0b3Jpbmc7XG4gICAgfSxcbiAgICBwcm9wYWdhdGVGcm9tRnVuY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJvcGFnYXRlRnJvbUZ1bmN0aW9uO1xuICAgIH0sXG4gICAgYm91bmRWYWx1ZUZ1bmN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJvdW5kVmFsdWVGdW5jdGlvbjtcbiAgICB9LFxuICAgIGNoZWNrRm9yZ290dGVuUmV0dXJuczogY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zLFxuICAgIHNldEJvdW5kczogc2V0Qm91bmRzLFxuICAgIHdhcm46IHdhcm4sXG4gICAgZGVwcmVjYXRlZDogZGVwcmVjYXRlZCxcbiAgICBDYXB0dXJlZFRyYWNlOiBDYXB0dXJlZFRyYWNlLFxuICAgIGZpcmVEb21FdmVudDogZmlyZURvbUV2ZW50LFxuICAgIGZpcmVHbG9iYWxFdmVudDogZmlyZUdsb2JhbEV2ZW50XG59O1xufTtcblxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi91dGlsXCI6MzZ9XSwxMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xuZnVuY3Rpb24gcmV0dXJuZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG59XG5mdW5jdGlvbiB0aHJvd2VyKCkge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZVtcInJldHVyblwiXSA9XG5Qcm9taXNlLnByb3RvdHlwZS50aGVuUmV0dXJuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkgdmFsdWUuc3VwcHJlc3NVbmhhbmRsZWRSZWplY3Rpb25zKCk7XG4gICAgcmV0dXJuIHRoaXMuX3RoZW4oXG4gICAgICAgIHJldHVybmVyLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwge3ZhbHVlOiB2YWx1ZX0sIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZVtcInRocm93XCJdID1cblByb21pc2UucHJvdG90eXBlLnRoZW5UaHJvdyA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICByZXR1cm4gdGhpcy5fdGhlbihcbiAgICAgICAgdGhyb3dlciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHtyZWFzb246IHJlYXNvbn0sIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5jYXRjaFRocm93ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RoZW4oXG4gICAgICAgICAgICB1bmRlZmluZWQsIHRocm93ZXIsIHVuZGVmaW5lZCwge3JlYXNvbjogcmVhc29ufSwgdW5kZWZpbmVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgX3JlYXNvbiA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbigpIHt0aHJvdyBfcmVhc29uO307XG4gICAgICAgIHJldHVybiB0aGlzLmNhdWdodChyZWFzb24sIGhhbmRsZXIpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLmNhdGNoUmV0dXJuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPD0gMSkge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB2YWx1ZS5zdXBwcmVzc1VuaGFuZGxlZFJlamVjdGlvbnMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RoZW4oXG4gICAgICAgICAgICB1bmRlZmluZWQsIHJldHVybmVyLCB1bmRlZmluZWQsIHt2YWx1ZTogdmFsdWV9LCB1bmRlZmluZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBfdmFsdWUgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIGlmIChfdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSBfdmFsdWUuc3VwcHJlc3NVbmhhbmRsZWRSZWplY3Rpb25zKCk7XG4gICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oKSB7cmV0dXJuIF92YWx1ZTt9O1xuICAgICAgICByZXR1cm4gdGhpcy5jYXVnaHQodmFsdWUsIGhhbmRsZXIpO1xuICAgIH1cbn07XG59O1xuXG59LHt9XSwxMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwpIHtcbnZhciBQcm9taXNlUmVkdWNlID0gUHJvbWlzZS5yZWR1Y2U7XG52YXIgUHJvbWlzZUFsbCA9IFByb21pc2UuYWxsO1xuXG5mdW5jdGlvbiBwcm9taXNlQWxsVGhpcygpIHtcbiAgICByZXR1cm4gUHJvbWlzZUFsbCh0aGlzKTtcbn1cblxuZnVuY3Rpb24gUHJvbWlzZU1hcFNlcmllcyhwcm9taXNlcywgZm4pIHtcbiAgICByZXR1cm4gUHJvbWlzZVJlZHVjZShwcm9taXNlcywgZm4sIElOVEVSTkFMLCBJTlRFUk5BTCk7XG59XG5cblByb21pc2UucHJvdG90eXBlLmVhY2ggPSBmdW5jdGlvbiAoZm4pIHtcbiAgICByZXR1cm4gUHJvbWlzZVJlZHVjZSh0aGlzLCBmbiwgSU5URVJOQUwsIDApXG4gICAgICAgICAgICAgIC5fdGhlbihwcm9taXNlQWxsVGhpcywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5tYXBTZXJpZXMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICByZXR1cm4gUHJvbWlzZVJlZHVjZSh0aGlzLCBmbiwgSU5URVJOQUwsIElOVEVSTkFMKTtcbn07XG5cblByb21pc2UuZWFjaCA9IGZ1bmN0aW9uIChwcm9taXNlcywgZm4pIHtcbiAgICByZXR1cm4gUHJvbWlzZVJlZHVjZShwcm9taXNlcywgZm4sIElOVEVSTkFMLCAwKVxuICAgICAgICAgICAgICAuX3RoZW4ocHJvbWlzZUFsbFRoaXMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBwcm9taXNlcywgdW5kZWZpbmVkKTtcbn07XG5cblByb21pc2UubWFwU2VyaWVzID0gUHJvbWlzZU1hcFNlcmllcztcbn07XG5cblxufSx7fV0sMTI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZXM1ID0gX2RlcmVxXyhcIi4vZXM1XCIpO1xudmFyIE9iamVjdGZyZWV6ZSA9IGVzNS5mcmVlemU7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgaW5oZXJpdHMgPSB1dGlsLmluaGVyaXRzO1xudmFyIG5vdEVudW1lcmFibGVQcm9wID0gdXRpbC5ub3RFbnVtZXJhYmxlUHJvcDtcblxuZnVuY3Rpb24gc3ViRXJyb3IobmFtZVByb3BlcnR5LCBkZWZhdWx0TWVzc2FnZSkge1xuICAgIGZ1bmN0aW9uIFN1YkVycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFN1YkVycm9yKSkgcmV0dXJuIG5ldyBTdWJFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AodGhpcywgXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICB0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIiA/IG1lc3NhZ2UgOiBkZWZhdWx0TWVzc2FnZSk7XG4gICAgICAgIG5vdEVudW1lcmFibGVQcm9wKHRoaXMsIFwibmFtZVwiLCBuYW1lUHJvcGVydHkpO1xuICAgICAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRXJyb3IuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbmhlcml0cyhTdWJFcnJvciwgRXJyb3IpO1xuICAgIHJldHVybiBTdWJFcnJvcjtcbn1cblxudmFyIF9UeXBlRXJyb3IsIF9SYW5nZUVycm9yO1xudmFyIFdhcm5pbmcgPSBzdWJFcnJvcihcIldhcm5pbmdcIiwgXCJ3YXJuaW5nXCIpO1xudmFyIENhbmNlbGxhdGlvbkVycm9yID0gc3ViRXJyb3IoXCJDYW5jZWxsYXRpb25FcnJvclwiLCBcImNhbmNlbGxhdGlvbiBlcnJvclwiKTtcbnZhciBUaW1lb3V0RXJyb3IgPSBzdWJFcnJvcihcIlRpbWVvdXRFcnJvclwiLCBcInRpbWVvdXQgZXJyb3JcIik7XG52YXIgQWdncmVnYXRlRXJyb3IgPSBzdWJFcnJvcihcIkFnZ3JlZ2F0ZUVycm9yXCIsIFwiYWdncmVnYXRlIGVycm9yXCIpO1xudHJ5IHtcbiAgICBfVHlwZUVycm9yID0gVHlwZUVycm9yO1xuICAgIF9SYW5nZUVycm9yID0gUmFuZ2VFcnJvcjtcbn0gY2F0Y2goZSkge1xuICAgIF9UeXBlRXJyb3IgPSBzdWJFcnJvcihcIlR5cGVFcnJvclwiLCBcInR5cGUgZXJyb3JcIik7XG4gICAgX1JhbmdlRXJyb3IgPSBzdWJFcnJvcihcIlJhbmdlRXJyb3JcIiwgXCJyYW5nZSBlcnJvclwiKTtcbn1cblxudmFyIG1ldGhvZHMgPSAoXCJqb2luIHBvcCBwdXNoIHNoaWZ0IHVuc2hpZnQgc2xpY2UgZmlsdGVyIGZvckVhY2ggc29tZSBcIiArXG4gICAgXCJldmVyeSBtYXAgaW5kZXhPZiBsYXN0SW5kZXhPZiByZWR1Y2UgcmVkdWNlUmlnaHQgc29ydCByZXZlcnNlXCIpLnNwbGl0KFwiIFwiKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRob2RzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHR5cGVvZiBBcnJheS5wcm90b3R5cGVbbWV0aG9kc1tpXV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBBZ2dyZWdhdGVFcnJvci5wcm90b3R5cGVbbWV0aG9kc1tpXV0gPSBBcnJheS5wcm90b3R5cGVbbWV0aG9kc1tpXV07XG4gICAgfVxufVxuXG5lczUuZGVmaW5lUHJvcGVydHkoQWdncmVnYXRlRXJyb3IucHJvdG90eXBlLCBcImxlbmd0aFwiLCB7XG4gICAgdmFsdWU6IDAsXG4gICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbkFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZVtcImlzT3BlcmF0aW9uYWxcIl0gPSB0cnVlO1xudmFyIGxldmVsID0gMDtcbkFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmRlbnQgPSBBcnJheShsZXZlbCAqIDQgKyAxKS5qb2luKFwiIFwiKTtcbiAgICB2YXIgcmV0ID0gXCJcXG5cIiArIGluZGVudCArIFwiQWdncmVnYXRlRXJyb3Igb2Y6XCIgKyBcIlxcblwiO1xuICAgIGxldmVsKys7XG4gICAgaW5kZW50ID0gQXJyYXkobGV2ZWwgKiA0ICsgMSkuam9pbihcIiBcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBzdHIgPSB0aGlzW2ldID09PSB0aGlzID8gXCJbQ2lyY3VsYXIgQWdncmVnYXRlRXJyb3JdXCIgOiB0aGlzW2ldICsgXCJcIjtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxpbmVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICBsaW5lc1tqXSA9IGluZGVudCArIGxpbmVzW2pdO1xuICAgICAgICB9XG4gICAgICAgIHN0ciA9IGxpbmVzLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIHJldCArPSBzdHIgKyBcIlxcblwiO1xuICAgIH1cbiAgICBsZXZlbC0tO1xuICAgIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBPcGVyYXRpb25hbEVycm9yKG1lc3NhZ2UpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgT3BlcmF0aW9uYWxFcnJvcikpXG4gICAgICAgIHJldHVybiBuZXcgT3BlcmF0aW9uYWxFcnJvcihtZXNzYWdlKTtcbiAgICBub3RFbnVtZXJhYmxlUHJvcCh0aGlzLCBcIm5hbWVcIiwgXCJPcGVyYXRpb25hbEVycm9yXCIpO1xuICAgIG5vdEVudW1lcmFibGVQcm9wKHRoaXMsIFwibWVzc2FnZVwiLCBtZXNzYWdlKTtcbiAgICB0aGlzLmNhdXNlID0gbWVzc2FnZTtcbiAgICB0aGlzW1wiaXNPcGVyYXRpb25hbFwiXSA9IHRydWU7XG5cbiAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIG5vdEVudW1lcmFibGVQcm9wKHRoaXMsIFwibWVzc2FnZVwiLCBtZXNzYWdlLm1lc3NhZ2UpO1xuICAgICAgICBub3RFbnVtZXJhYmxlUHJvcCh0aGlzLCBcInN0YWNrXCIsIG1lc3NhZ2Uuc3RhY2spO1xuICAgIH0gZWxzZSBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuXG59XG5pbmhlcml0cyhPcGVyYXRpb25hbEVycm9yLCBFcnJvcik7XG5cbnZhciBlcnJvclR5cGVzID0gRXJyb3JbXCJfX0JsdWViaXJkRXJyb3JUeXBlc19fXCJdO1xuaWYgKCFlcnJvclR5cGVzKSB7XG4gICAgZXJyb3JUeXBlcyA9IE9iamVjdGZyZWV6ZSh7XG4gICAgICAgIENhbmNlbGxhdGlvbkVycm9yOiBDYW5jZWxsYXRpb25FcnJvcixcbiAgICAgICAgVGltZW91dEVycm9yOiBUaW1lb3V0RXJyb3IsXG4gICAgICAgIE9wZXJhdGlvbmFsRXJyb3I6IE9wZXJhdGlvbmFsRXJyb3IsXG4gICAgICAgIFJlamVjdGlvbkVycm9yOiBPcGVyYXRpb25hbEVycm9yLFxuICAgICAgICBBZ2dyZWdhdGVFcnJvcjogQWdncmVnYXRlRXJyb3JcbiAgICB9KTtcbiAgICBlczUuZGVmaW5lUHJvcGVydHkoRXJyb3IsIFwiX19CbHVlYmlyZEVycm9yVHlwZXNfX1wiLCB7XG4gICAgICAgIHZhbHVlOiBlcnJvclR5cGVzLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEVycm9yOiBFcnJvcixcbiAgICBUeXBlRXJyb3I6IF9UeXBlRXJyb3IsXG4gICAgUmFuZ2VFcnJvcjogX1JhbmdlRXJyb3IsXG4gICAgQ2FuY2VsbGF0aW9uRXJyb3I6IGVycm9yVHlwZXMuQ2FuY2VsbGF0aW9uRXJyb3IsXG4gICAgT3BlcmF0aW9uYWxFcnJvcjogZXJyb3JUeXBlcy5PcGVyYXRpb25hbEVycm9yLFxuICAgIFRpbWVvdXRFcnJvcjogZXJyb3JUeXBlcy5UaW1lb3V0RXJyb3IsXG4gICAgQWdncmVnYXRlRXJyb3I6IGVycm9yVHlwZXMuQWdncmVnYXRlRXJyb3IsXG4gICAgV2FybmluZzogV2FybmluZ1xufTtcblxufSx7XCIuL2VzNVwiOjEzLFwiLi91dGlsXCI6MzZ9XSwxMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgaXNFUzUgPSAoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gdGhpcyA9PT0gdW5kZWZpbmVkO1xufSkoKTtcblxuaWYgKGlzRVM1KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICAgIGZyZWV6ZTogT2JqZWN0LmZyZWV6ZSxcbiAgICAgICAgZGVmaW5lUHJvcGVydHk6IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgICAgICAgZ2V0RGVzY3JpcHRvcjogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgICAgICAga2V5czogT2JqZWN0LmtleXMsXG4gICAgICAgIG5hbWVzOiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgICAgICAgZ2V0UHJvdG90eXBlT2Y6IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICAgICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSxcbiAgICAgICAgaXNFUzU6IGlzRVM1LFxuICAgICAgICBwcm9wZXJ0eUlzV3JpdGFibGU6IGZ1bmN0aW9uKG9iaiwgcHJvcCkge1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgcHJvcCk7XG4gICAgICAgICAgICByZXR1cm4gISEoIWRlc2NyaXB0b3IgfHwgZGVzY3JpcHRvci53cml0YWJsZSB8fCBkZXNjcmlwdG9yLnNldCk7XG4gICAgICAgIH1cbiAgICB9O1xufSBlbHNlIHtcbiAgICB2YXIgaGFzID0ge30uaGFzT3duUHJvcGVydHk7XG4gICAgdmFyIHN0ciA9IHt9LnRvU3RyaW5nO1xuICAgIHZhciBwcm90byA9IHt9LmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcblxuICAgIHZhciBPYmplY3RLZXlzID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbykge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKG8sIGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXQucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcblxuICAgIHZhciBPYmplY3RHZXREZXNjcmlwdG9yID0gZnVuY3Rpb24obywga2V5KSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IG9ba2V5XX07XG4gICAgfTtcblxuICAgIHZhciBPYmplY3REZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvLCBrZXksIGRlc2MpIHtcbiAgICAgICAgb1trZXldID0gZGVzYy52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfTtcblxuICAgIHZhciBPYmplY3RGcmVlemUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcblxuICAgIHZhciBPYmplY3RHZXRQcm90b3R5cGVPZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qob2JqKS5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgQXJyYXlJc0FycmF5ID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5jYWxsKG9iaikgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICAgIGlzQXJyYXk6IEFycmF5SXNBcnJheSxcbiAgICAgICAga2V5czogT2JqZWN0S2V5cyxcbiAgICAgICAgbmFtZXM6IE9iamVjdEtleXMsXG4gICAgICAgIGRlZmluZVByb3BlcnR5OiBPYmplY3REZWZpbmVQcm9wZXJ0eSxcbiAgICAgICAgZ2V0RGVzY3JpcHRvcjogT2JqZWN0R2V0RGVzY3JpcHRvcixcbiAgICAgICAgZnJlZXplOiBPYmplY3RGcmVlemUsXG4gICAgICAgIGdldFByb3RvdHlwZU9mOiBPYmplY3RHZXRQcm90b3R5cGVPZixcbiAgICAgICAgaXNFUzU6IGlzRVM1LFxuICAgICAgICBwcm9wZXJ0eUlzV3JpdGFibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG59LHt9XSwxNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwpIHtcbnZhciBQcm9taXNlTWFwID0gUHJvbWlzZS5tYXA7XG5cblByb21pc2UucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIChmbiwgb3B0aW9ucykge1xuICAgIHJldHVybiBQcm9taXNlTWFwKHRoaXMsIGZuLCBvcHRpb25zLCBJTlRFUk5BTCk7XG59O1xuXG5Qcm9taXNlLmZpbHRlciA9IGZ1bmN0aW9uIChwcm9taXNlcywgZm4sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gUHJvbWlzZU1hcChwcm9taXNlcywgZm4sIG9wdGlvbnMsIElOVEVSTkFMKTtcbn07XG59O1xuXG59LHt9XSwxNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgdHJ5Q29udmVydFRvUHJvbWlzZSkge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIENhbmNlbGxhdGlvbkVycm9yID0gUHJvbWlzZS5DYW5jZWxsYXRpb25FcnJvcjtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG5cbmZ1bmN0aW9uIFBhc3NUaHJvdWdoSGFuZGxlckNvbnRleHQocHJvbWlzZSwgdHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIHRoaXMuY2FsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5jYW5jZWxQcm9taXNlID0gbnVsbDtcbn1cblxuUGFzc1Rocm91Z2hIYW5kbGVyQ29udGV4dC5wcm90b3R5cGUuaXNGaW5hbGx5SGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09IDA7XG59O1xuXG5mdW5jdGlvbiBGaW5hbGx5SGFuZGxlckNhbmNlbFJlYWN0aW9uKGZpbmFsbHlIYW5kbGVyKSB7XG4gICAgdGhpcy5maW5hbGx5SGFuZGxlciA9IGZpbmFsbHlIYW5kbGVyO1xufVxuXG5GaW5hbGx5SGFuZGxlckNhbmNlbFJlYWN0aW9uLnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgY2hlY2tDYW5jZWwodGhpcy5maW5hbGx5SGFuZGxlcik7XG59O1xuXG5mdW5jdGlvbiBjaGVja0NhbmNlbChjdHgsIHJlYXNvbikge1xuICAgIGlmIChjdHguY2FuY2VsUHJvbWlzZSAhPSBudWxsKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY3R4LmNhbmNlbFByb21pc2UuX3JlamVjdChyZWFzb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LmNhbmNlbFByb21pc2UuX2NhbmNlbCgpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5jYW5jZWxQcm9taXNlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc3VjY2VlZCgpIHtcbiAgICByZXR1cm4gZmluYWxseUhhbmRsZXIuY2FsbCh0aGlzLCB0aGlzLnByb21pc2UuX3RhcmdldCgpLl9zZXR0bGVkVmFsdWUoKSk7XG59XG5mdW5jdGlvbiBmYWlsKHJlYXNvbikge1xuICAgIGlmIChjaGVja0NhbmNlbCh0aGlzLCByZWFzb24pKSByZXR1cm47XG4gICAgZXJyb3JPYmouZSA9IHJlYXNvbjtcbiAgICByZXR1cm4gZXJyb3JPYmo7XG59XG5mdW5jdGlvbiBmaW5hbGx5SGFuZGxlcihyZWFzb25PclZhbHVlKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG4gICAgdmFyIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cbiAgICBpZiAoIXRoaXMuY2FsbGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHJldCA9IHRoaXMuaXNGaW5hbGx5SGFuZGxlcigpXG4gICAgICAgICAgICA/IGhhbmRsZXIuY2FsbChwcm9taXNlLl9ib3VuZFZhbHVlKCkpXG4gICAgICAgICAgICA6IGhhbmRsZXIuY2FsbChwcm9taXNlLl9ib3VuZFZhbHVlKCksIHJlYXNvbk9yVmFsdWUpO1xuICAgICAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHByb21pc2UuX3NldFJldHVybmVkTm9uVW5kZWZpbmVkKCk7XG4gICAgICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZShyZXQsIHByb21pc2UpO1xuICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW5jZWxQcm9taXNlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZS5faXNDYW5jZWxsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlYXNvbiA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IENhbmNlbGxhdGlvbkVycm9yKFwibGF0ZSBjYW5jZWxsYXRpb24gb2JzZXJ2ZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHJlYXNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvck9iai5lID0gcmVhc29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yT2JqO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1heWJlUHJvbWlzZS5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl9hdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmluYWxseUhhbmRsZXJDYW5jZWxSZWFjdGlvbih0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1heWJlUHJvbWlzZS5fdGhlbihcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZCwgZmFpbCwgdW5kZWZpbmVkLCB0aGlzLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2UuaXNSZWplY3RlZCgpKSB7XG4gICAgICAgIGNoZWNrQ2FuY2VsKHRoaXMpO1xuICAgICAgICBlcnJvck9iai5lID0gcmVhc29uT3JWYWx1ZTtcbiAgICAgICAgcmV0dXJuIGVycm9yT2JqO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrQ2FuY2VsKHRoaXMpO1xuICAgICAgICByZXR1cm4gcmVhc29uT3JWYWx1ZTtcbiAgICB9XG59XG5cblByb21pc2UucHJvdG90eXBlLl9wYXNzVGhyb3VnaCA9IGZ1bmN0aW9uKGhhbmRsZXIsIHR5cGUsIHN1Y2Nlc3MsIGZhaWwpIHtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRoaXMudGhlbigpO1xuICAgIHJldHVybiB0aGlzLl90aGVuKHN1Y2Nlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgZmFpbCxcbiAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IFBhc3NUaHJvdWdoSGFuZGxlckNvbnRleHQodGhpcywgdHlwZSwgaGFuZGxlciksXG4gICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmxhc3RseSA9XG5Qcm9taXNlLnByb3RvdHlwZVtcImZpbmFsbHlcIl0gPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLl9wYXNzVGhyb3VnaChoYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5SGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseUhhbmRsZXIpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUudGFwID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFzc1Rocm91Z2goaGFuZGxlciwgMSwgZmluYWxseUhhbmRsZXIpO1xufTtcblxucmV0dXJuIFBhc3NUaHJvdWdoSGFuZGxlckNvbnRleHQ7XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMTY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFwaVJlamVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSU5URVJOQUwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyeUNvbnZlcnRUb1Byb21pc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFByb3h5YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcpIHtcbnZhciBlcnJvcnMgPSBfZGVyZXFfKFwiLi9lcnJvcnNcIik7XG52YXIgVHlwZUVycm9yID0gZXJyb3JzLlR5cGVFcnJvcjtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG52YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xudmFyIHlpZWxkSGFuZGxlcnMgPSBbXTtcblxuZnVuY3Rpb24gcHJvbWlzZUZyb21ZaWVsZEhhbmRsZXIodmFsdWUsIHlpZWxkSGFuZGxlcnMsIHRyYWNlUGFyZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB5aWVsZEhhbmRsZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHRyYWNlUGFyZW50Ll9wdXNoQ29udGV4dCgpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdHJ5Q2F0Y2goeWllbGRIYW5kbGVyc1tpXSkodmFsdWUpO1xuICAgICAgICB0cmFjZVBhcmVudC5fcG9wQ29udGV4dCgpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iaikge1xuICAgICAgICAgICAgdHJhY2VQYXJlbnQuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgICAgICB2YXIgcmV0ID0gUHJvbWlzZS5yZWplY3QoZXJyb3JPYmouZSk7XG4gICAgICAgICAgICB0cmFjZVBhcmVudC5fcG9wQ29udGV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZShyZXN1bHQsIHRyYWNlUGFyZW50KTtcbiAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHJldHVybiBtYXliZVByb21pc2U7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBQcm9taXNlU3Bhd24oZ2VuZXJhdG9yRnVuY3Rpb24sIHJlY2VpdmVyLCB5aWVsZEhhbmRsZXIsIHN0YWNrKSB7XG4gICAgaWYgKGRlYnVnLmNhbmNlbGxhdGlvbigpKSB7XG4gICAgICAgIHZhciBpbnRlcm5hbCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICAgICAgdmFyIF9maW5hbGx5UHJvbWlzZSA9IHRoaXMuX2ZpbmFsbHlQcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICB0aGlzLl9wcm9taXNlID0gaW50ZXJuYWwubGFzdGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9maW5hbGx5UHJvbWlzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGludGVybmFsLl9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgICAgICBpbnRlcm5hbC5fc2V0T25DYW5jZWwodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICBwcm9taXNlLl9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgIH1cbiAgICB0aGlzLl9zdGFjayA9IHN0YWNrO1xuICAgIHRoaXMuX2dlbmVyYXRvckZ1bmN0aW9uID0gZ2VuZXJhdG9yRnVuY3Rpb247XG4gICAgdGhpcy5fcmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICB0aGlzLl9nZW5lcmF0b3IgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5feWllbGRIYW5kbGVycyA9IHR5cGVvZiB5aWVsZEhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/IFt5aWVsZEhhbmRsZXJdLmNvbmNhdCh5aWVsZEhhbmRsZXJzKVxuICAgICAgICA6IHlpZWxkSGFuZGxlcnM7XG4gICAgdGhpcy5feWllbGRlZFByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX2NhbmNlbGxhdGlvblBoYXNlID0gZmFsc2U7XG59XG51dGlsLmluaGVyaXRzKFByb21pc2VTcGF3biwgUHJveHlhYmxlKTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5faXNSZXNvbHZlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlID09PSBudWxsO1xufTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9nZW5lcmF0b3IgPSBudWxsO1xuICAgIGlmIChkZWJ1Zy5jYW5jZWxsYXRpb24oKSAmJiB0aGlzLl9maW5hbGx5UHJvbWlzZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9maW5hbGx5UHJvbWlzZS5fZnVsZmlsbCgpO1xuICAgICAgICB0aGlzLl9maW5hbGx5UHJvbWlzZSA9IG51bGw7XG4gICAgfVxufTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fcHJvbWlzZUNhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcbiAgICB2YXIgaW1wbGVtZW50c1JldHVybiA9IHR5cGVvZiB0aGlzLl9nZW5lcmF0b3JbXCJyZXR1cm5cIl0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICB2YXIgcmVzdWx0O1xuICAgIGlmICghaW1wbGVtZW50c1JldHVybikge1xuICAgICAgICB2YXIgcmVhc29uID0gbmV3IFByb21pc2UuQ2FuY2VsbGF0aW9uRXJyb3IoXG4gICAgICAgICAgICBcImdlbmVyYXRvciAucmV0dXJuKCkgc2VudGluZWxcIik7XG4gICAgICAgIFByb21pc2UuY29yb3V0aW5lLnJldHVyblNlbnRpbmVsID0gcmVhc29uO1xuICAgICAgICB0aGlzLl9wcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHJlYXNvbik7XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgIHJlc3VsdCA9IHRyeUNhdGNoKHRoaXMuX2dlbmVyYXRvcltcInRocm93XCJdKS5jYWxsKHRoaXMuX2dlbmVyYXRvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYXNvbik7XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3BvcENvbnRleHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wcm9taXNlLl9wdXNoQ29udGV4dCgpO1xuICAgICAgICByZXN1bHQgPSB0cnlDYXRjaCh0aGlzLl9nZW5lcmF0b3JbXCJyZXR1cm5cIl0pLmNhbGwodGhpcy5fZ2VuZXJhdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3BvcENvbnRleHQoKTtcbiAgICB9XG4gICAgdGhpcy5fY2FuY2VsbGF0aW9uUGhhc2UgPSB0cnVlO1xuICAgIHRoaXMuX3lpZWxkZWRQcm9taXNlID0gbnVsbDtcbiAgICB0aGlzLl9jb250aW51ZShyZXN1bHQpO1xufTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdGhpcy5feWllbGRlZFByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3Byb21pc2UuX3B1c2hDb250ZXh0KCk7XG4gICAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKHRoaXMuX2dlbmVyYXRvci5uZXh0KS5jYWxsKHRoaXMuX2dlbmVyYXRvciwgdmFsdWUpO1xuICAgIHRoaXMuX3Byb21pc2UuX3BvcENvbnRleHQoKTtcbiAgICB0aGlzLl9jb250aW51ZShyZXN1bHQpO1xufTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fcHJvbWlzZVJlamVjdGVkID0gZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgdGhpcy5feWllbGRlZFByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3Byb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UocmVhc29uKTtcbiAgICB0aGlzLl9wcm9taXNlLl9wdXNoQ29udGV4dCgpO1xuICAgIHZhciByZXN1bHQgPSB0cnlDYXRjaCh0aGlzLl9nZW5lcmF0b3JbXCJ0aHJvd1wiXSlcbiAgICAgICAgLmNhbGwodGhpcy5fZ2VuZXJhdG9yLCByZWFzb24pO1xuICAgIHRoaXMuX3Byb21pc2UuX3BvcENvbnRleHQoKTtcbiAgICB0aGlzLl9jb250aW51ZShyZXN1bHQpO1xufTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3lpZWxkZWRQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3lpZWxkZWRQcm9taXNlO1xuICAgICAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG51bGw7XG4gICAgICAgIHByb21pc2UuY2FuY2VsKCk7XG4gICAgfVxufTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5wcm9taXNlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xufTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fcnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2dlbmVyYXRvciA9IHRoaXMuX2dlbmVyYXRvckZ1bmN0aW9uLmNhbGwodGhpcy5fcmVjZWl2ZXIpO1xuICAgIHRoaXMuX3JlY2VpdmVyID1cbiAgICAgICAgdGhpcy5fZ2VuZXJhdG9yRnVuY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJvbWlzZUZ1bGZpbGxlZCh1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fY29udGludWUgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLl9wcm9taXNlO1xuICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgaWYgKHRoaXMuX2NhbmNlbGxhdGlvblBoYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlLl9yZWplY3RDYWxsYmFjayhyZXN1bHQuZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgIGlmIChyZXN1bHQuZG9uZSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgIGlmICh0aGlzLl9jYW5jZWxsYXRpb25QaGFzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2UuY2FuY2VsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHZhbHVlLCB0aGlzLl9wcm9taXNlKTtcbiAgICAgICAgaWYgKCEobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgICAgICAgIG1heWJlUHJvbWlzZSA9XG4gICAgICAgICAgICAgICAgcHJvbWlzZUZyb21ZaWVsZEhhbmRsZXIobWF5YmVQcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3lpZWxkSGFuZGxlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSk7XG4gICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvbWlzZVJlamVjdGVkKFxuICAgICAgICAgICAgICAgICAgICBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlICVzIHdhcyB5aWVsZGVkIHRoYXQgY291bGQgbm90IGJlIHRyZWF0ZWQgYXMgYSBwcm9taXNlXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVxcdTAwMGFcIi5yZXBsYWNlKFwiJXNcIiwgdmFsdWUpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRnJvbSBjb3JvdXRpbmU6XFx1MDAwYVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YWNrLnNwbGl0KFwiXFxuXCIpLnNsaWNlKDEsIC03KS5qb2luKFwiXFxuXCIpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYXliZVByb21pc2UgPSBtYXliZVByb21pc2UuX3RhcmdldCgpO1xuICAgICAgICB2YXIgYml0RmllbGQgPSBtYXliZVByb21pc2UuX2JpdEZpZWxkO1xuICAgICAgICA7XG4gICAgICAgIGlmICgoKGJpdEZpZWxkICYgNTAzOTcxODQpID09PSAwKSkge1xuICAgICAgICAgICAgdGhpcy5feWllbGRlZFByb21pc2UgPSBtYXliZVByb21pc2U7XG4gICAgICAgICAgICBtYXliZVByb21pc2UuX3Byb3h5KHRoaXMsIG51bGwpO1xuICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAzMzU1NDQzMikgIT09IDApKSB7XG4gICAgICAgICAgICBQcm9taXNlLl9hc3luYy5pbnZva2UoXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvbWlzZUZ1bGZpbGxlZCwgdGhpcywgbWF5YmVQcm9taXNlLl92YWx1ZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XG4gICAgICAgICAgICBQcm9taXNlLl9hc3luYy5pbnZva2UoXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvbWlzZVJlamVjdGVkLCB0aGlzLCBtYXliZVByb21pc2UuX3JlYXNvbigpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZUNhbmNlbGxlZCgpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuUHJvbWlzZS5jb3JvdXRpbmUgPSBmdW5jdGlvbiAoZ2VuZXJhdG9yRnVuY3Rpb24sIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIGdlbmVyYXRvckZ1bmN0aW9uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImdlbmVyYXRvckZ1bmN0aW9uIG11c3QgYmUgYSBmdW5jdGlvblxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgfVxuICAgIHZhciB5aWVsZEhhbmRsZXIgPSBPYmplY3Qob3B0aW9ucykueWllbGRIYW5kbGVyO1xuICAgIHZhciBQcm9taXNlU3Bhd24kID0gUHJvbWlzZVNwYXduO1xuICAgIHZhciBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBnZW5lcmF0b3JGdW5jdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB2YXIgc3Bhd24gPSBuZXcgUHJvbWlzZVNwYXduJCh1bmRlZmluZWQsIHVuZGVmaW5lZCwgeWllbGRIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjayk7XG4gICAgICAgIHZhciByZXQgPSBzcGF3bi5wcm9taXNlKCk7XG4gICAgICAgIHNwYXduLl9nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XG4gICAgICAgIHNwYXduLl9wcm9taXNlRnVsZmlsbGVkKHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbn07XG5cblByb21pc2UuY29yb3V0aW5lLmFkZFlpZWxkSGFuZGxlciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgIH1cbiAgICB5aWVsZEhhbmRsZXJzLnB1c2goZm4pO1xufTtcblxuUHJvbWlzZS5zcGF3biA9IGZ1bmN0aW9uIChnZW5lcmF0b3JGdW5jdGlvbikge1xuICAgIGRlYnVnLmRlcHJlY2F0ZWQoXCJQcm9taXNlLnNwYXduKClcIiwgXCJQcm9taXNlLmNvcm91dGluZSgpXCIpO1xuICAgIGlmICh0eXBlb2YgZ2VuZXJhdG9yRnVuY3Rpb24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZ2VuZXJhdG9yRnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICB9XG4gICAgdmFyIHNwYXduID0gbmV3IFByb21pc2VTcGF3bihnZW5lcmF0b3JGdW5jdGlvbiwgdGhpcyk7XG4gICAgdmFyIHJldCA9IHNwYXduLnByb21pc2UoKTtcbiAgICBzcGF3bi5fcnVuKFByb21pc2Uuc3Bhd24pO1xuICAgIHJldHVybiByZXQ7XG59O1xufTtcblxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi91dGlsXCI6MzZ9XSwxNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID1cbmZ1bmN0aW9uKFByb21pc2UsIFByb21pc2VBcnJheSwgdHJ5Q29udmVydFRvUHJvbWlzZSwgSU5URVJOQUwsIGFzeW5jLFxuICAgICAgICAgZ2V0RG9tYWluKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgY2FuRXZhbHVhdGUgPSB1dGlsLmNhbkV2YWx1YXRlO1xudmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG52YXIgcmVqZWN0O1xuXG5pZiAoIXRydWUpIHtcbmlmIChjYW5FdmFsdWF0ZSkge1xuICAgIHZhciB0aGVuQ2FsbGJhY2sgPSBmdW5jdGlvbihpKSB7XG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJ2YWx1ZVwiLCBcImhvbGRlclwiLCBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGhvbGRlci5wSW5kZXggPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGhvbGRlci5jaGVja0Z1bGZpbGxtZW50KHRoaXMpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFwiLnJlcGxhY2UoL0luZGV4L2csIGkpKTtcbiAgICB9O1xuXG4gICAgdmFyIHByb21pc2VTZXR0ZXIgPSBmdW5jdGlvbihpKSB7XG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJwcm9taXNlXCIsIFwiaG9sZGVyXCIsIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGhvbGRlci5wSW5kZXggPSBwcm9taXNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFwiLnJlcGxhY2UoL0luZGV4L2csIGkpKTtcbiAgICB9O1xuXG4gICAgdmFyIGdlbmVyYXRlSG9sZGVyQ2xhc3MgPSBmdW5jdGlvbih0b3RhbCkge1xuICAgICAgICB2YXIgcHJvcHMgPSBuZXcgQXJyYXkodG90YWwpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBwcm9wc1tpXSA9IFwidGhpcy5wXCIgKyAoaSsxKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXNzaWdubWVudCA9IHByb3BzLmpvaW4oXCIgPSBcIikgKyBcIiA9IG51bGw7XCI7XG4gICAgICAgIHZhciBjYW5jZWxsYXRpb25Db2RlPSBcInZhciBwcm9taXNlO1xcblwiICsgcHJvcHMubWFwKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IFwiICsgcHJvcCArIFwiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFwiO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICB2YXIgcGFzc2VkQXJndW1lbnRzID0gcHJvcHMuam9pbihcIiwgXCIpO1xuICAgICAgICB2YXIgbmFtZSA9IFwiSG9sZGVyJFwiICsgdG90YWw7XG5cblxuICAgICAgICB2YXIgY29kZSA9IFwicmV0dXJuIGZ1bmN0aW9uKHRyeUNhdGNoLCBlcnJvck9iaiwgUHJvbWlzZSwgYXN5bmMpIHsgICAgXFxuXFxcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGZ1bmN0aW9uIFtUaGVOYW1lXShmbikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBbVGhlUHJvcGVydGllc10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB0aGlzLmZuID0gZm47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB0aGlzLmFzeW5jTmVlZGVkID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB0aGlzLm5vdyA9IDA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFtUaGVOYW1lXS5wcm90b3R5cGUuX2NhbGxGdW5jdGlvbiA9IGZ1bmN0aW9uKHByb21pc2UpIHsgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9wdXNoQ29udGV4dCgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gdHJ5Q2F0Y2godGhpcy5mbikoW1RoZVBhc3NlZEFyZ3VtZW50c10pOyAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9wb3BDb250ZXh0KCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBpZiAocmV0ID09PSBlcnJvck9iaikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2socmV0LmUsIGZhbHNlKTsgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHJldCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFtUaGVOYW1lXS5wcm90b3R5cGUuY2hlY2tGdWxmaWxsbWVudCA9IGZ1bmN0aW9uKHByb21pc2UpIHsgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gKyt0aGlzLm5vdzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBpZiAobm93ID09PSBbVGhlVG90YWxdKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXN5bmNOZWVkZWQpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jLmludm9rZSh0aGlzLl9jYWxsRnVuY3Rpb24sIHRoaXMsIHByb21pc2UpOyAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxGdW5jdGlvbihwcm9taXNlKTsgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFtUaGVOYW1lXS5wcm90b3R5cGUuX3Jlc3VsdENhbmNlbGxlZCA9IGZ1bmN0aW9uKCkgeyAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBbQ2FuY2VsbGF0aW9uQ29kZV0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHJldHVybiBbVGhlTmFtZV07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgfSh0cnlDYXRjaCwgZXJyb3JPYmosIFByb21pc2UsIGFzeW5jKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgXCI7XG5cbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgvXFxbVGhlTmFtZVxcXS9nLCBuYW1lKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcW1RoZVRvdGFsXFxdL2csIHRvdGFsKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcW1RoZVBhc3NlZEFyZ3VtZW50c1xcXS9nLCBwYXNzZWRBcmd1bWVudHMpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxbVGhlUHJvcGVydGllc1xcXS9nLCBhc3NpZ25tZW50KVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcW0NhbmNlbGxhdGlvbkNvZGVcXF0vZywgY2FuY2VsbGF0aW9uQ29kZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcInRyeUNhdGNoXCIsIFwiZXJyb3JPYmpcIiwgXCJQcm9taXNlXCIsIFwiYXN5bmNcIiwgY29kZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICh0cnlDYXRjaCwgZXJyb3JPYmosIFByb21pc2UsIGFzeW5jKTtcbiAgICB9O1xuXG4gICAgdmFyIGhvbGRlckNsYXNzZXMgPSBbXTtcbiAgICB2YXIgdGhlbkNhbGxiYWNrcyA9IFtdO1xuICAgIHZhciBwcm9taXNlU2V0dGVycyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyArK2kpIHtcbiAgICAgICAgaG9sZGVyQ2xhc3Nlcy5wdXNoKGdlbmVyYXRlSG9sZGVyQ2xhc3MoaSArIDEpKTtcbiAgICAgICAgdGhlbkNhbGxiYWNrcy5wdXNoKHRoZW5DYWxsYmFjayhpICsgMSkpO1xuICAgICAgICBwcm9taXNlU2V0dGVycy5wdXNoKHByb21pc2VTZXR0ZXIoaSArIDEpKTtcbiAgICB9XG5cbiAgICByZWplY3QgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xuICAgIH07XG59fVxuXG5Qcm9taXNlLmpvaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxhc3QgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICB2YXIgZm47XG4gICAgaWYgKGxhc3QgPiAwICYmIHR5cGVvZiBhcmd1bWVudHNbbGFzdF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBmbiA9IGFyZ3VtZW50c1tsYXN0XTtcbiAgICAgICAgaWYgKCF0cnVlKSB7XG4gICAgICAgICAgICBpZiAobGFzdCA8PSA4ICYmIGNhbkV2YWx1YXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICAgICAgICAgICAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgICAgICAgICAgICAgdmFyIEhvbGRlckNsYXNzID0gaG9sZGVyQ2xhc3Nlc1tsYXN0IC0gMV07XG4gICAgICAgICAgICAgICAgdmFyIGhvbGRlciA9IG5ldyBIb2xkZXJDbGFzcyhmbik7XG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoZW5DYWxsYmFja3M7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3Q7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZShhcmd1bWVudHNbaV0sIHJldCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UgPSBtYXliZVByb21pc2UuX3RhcmdldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJpdEZpZWxkID0gbWF5YmVQcm9taXNlLl9iaXRGaWVsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKGJpdEZpZWxkICYgNTAzOTcxODQpID09PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fdGhlbihjYWxsYmFja3NbaV0sIHJlamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCByZXQsIGhvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVNldHRlcnNbaV0obWF5YmVQcm9taXNlLCBob2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGRlci5hc3luY05lZWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXS5jYWxsKHJldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX3ZhbHVlKCksIGhvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0Ll9yZWplY3QobWF5YmVQcm9taXNlLl9yZWFzb24oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5fY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0uY2FsbChyZXQsIG1heWJlUHJvbWlzZSwgaG9sZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghcmV0Ll9pc0ZhdGVTZWFsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaG9sZGVyLmFzeW5jTmVlZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9tYWluID0gZ2V0RG9tYWluKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9tYWluICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9sZGVyLmZuID0gdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgaG9sZGVyLmZuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXQuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXQuX3NldE9uQ2FuY2VsKGhvbGRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7O1xuICAgIGlmIChmbikgYXJncy5wb3AoKTtcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2VBcnJheShhcmdzKS5wcm9taXNlKCk7XG4gICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyByZXQuc3ByZWFkKGZuKSA6IHJldDtcbn07XG5cbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwxODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZUFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhcGlSZWplY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyeUNvbnZlcnRUb1Byb21pc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIElOVEVSTkFMLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zykge1xudmFyIGdldERvbWFpbiA9IFByb21pc2UuX2dldERvbWFpbjtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xudmFyIGFzeW5jID0gUHJvbWlzZS5fYXN5bmM7XG5cbmZ1bmN0aW9uIE1hcHBpbmdQcm9taXNlQXJyYXkocHJvbWlzZXMsIGZuLCBsaW1pdCwgX2ZpbHRlcikge1xuICAgIHRoaXMuY29uc3RydWN0b3IkKHByb21pc2VzKTtcbiAgICB0aGlzLl9wcm9taXNlLl9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgIHZhciBkb21haW4gPSBnZXREb21haW4oKTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IGRvbWFpbiA9PT0gbnVsbCA/IGZuIDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgZm4pO1xuICAgIHRoaXMuX3ByZXNlcnZlZFZhbHVlcyA9IF9maWx0ZXIgPT09IElOVEVSTkFMXG4gICAgICAgID8gbmV3IEFycmF5KHRoaXMubGVuZ3RoKCkpXG4gICAgICAgIDogbnVsbDtcbiAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgIHRoaXMuX2luRmxpZ2h0ID0gMDtcbiAgICB0aGlzLl9xdWV1ZSA9IFtdO1xuICAgIGFzeW5jLmludm9rZSh0aGlzLl9hc3luY0luaXQsIHRoaXMsIHVuZGVmaW5lZCk7XG59XG51dGlsLmluaGVyaXRzKE1hcHBpbmdQcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XG5cbk1hcHBpbmdQcm9taXNlQXJyYXkucHJvdG90eXBlLl9hc3luY0luaXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9pbml0JCh1bmRlZmluZWQsIC0yKTtcbn07XG5cbk1hcHBpbmdQcm9taXNlQXJyYXkucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge307XG5cbk1hcHBpbmdQcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlRnVsZmlsbGVkID0gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG4gICAgdmFyIHByZXNlcnZlZFZhbHVlcyA9IHRoaXMuX3ByZXNlcnZlZFZhbHVlcztcbiAgICB2YXIgbGltaXQgPSB0aGlzLl9saW1pdDtcblxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgaW5kZXggPSAoaW5kZXggKiAtMSkgLSAxO1xuICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIGlmIChsaW1pdCA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9pbkZsaWdodC0tO1xuICAgICAgICAgICAgdGhpcy5fZHJhaW5RdWV1ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobGltaXQgPj0gMSAmJiB0aGlzLl9pbkZsaWdodCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcXVldWUucHVzaChpbmRleCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXNlcnZlZFZhbHVlcyAhPT0gbnVsbCkgcHJlc2VydmVkVmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuXG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZTtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgIHZhciByZWNlaXZlciA9IHByb21pc2UuX2JvdW5kVmFsdWUoKTtcbiAgICAgICAgcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcbiAgICAgICAgdmFyIHJldCA9IHRyeUNhdGNoKGNhbGxiYWNrKS5jYWxsKHJlY2VpdmVyLCB2YWx1ZSwgaW5kZXgsIGxlbmd0aCk7XG4gICAgICAgIHZhciBwcm9taXNlQ3JlYXRlZCA9IHByb21pc2UuX3BvcENvbnRleHQoKTtcbiAgICAgICAgZGVidWcuY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zKFxuICAgICAgICAgICAgcmV0LFxuICAgICAgICAgICAgcHJvbWlzZUNyZWF0ZWQsXG4gICAgICAgICAgICBwcmVzZXJ2ZWRWYWx1ZXMgIT09IG51bGwgPyBcIlByb21pc2UuZmlsdGVyXCIgOiBcIlByb21pc2UubWFwXCIsXG4gICAgICAgICAgICBwcm9taXNlXG4gICAgICAgICk7XG4gICAgICAgIGlmIChyZXQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWplY3QocmV0LmUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZShyZXQsIHRoaXMuX3Byb21pc2UpO1xuICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgbWF5YmVQcm9taXNlID0gbWF5YmVQcm9taXNlLl90YXJnZXQoKTtcbiAgICAgICAgICAgIHZhciBiaXRGaWVsZCA9IG1heWJlUHJvbWlzZS5fYml0RmllbGQ7XG4gICAgICAgICAgICA7XG4gICAgICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICBpZiAobGltaXQgPj0gMSkgdGhpcy5faW5GbGlnaHQrKztcbiAgICAgICAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0gbWF5YmVQcm9taXNlO1xuICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fcHJveHkodGhpcywgKGluZGV4ICsgMSkgKiAtMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xuICAgICAgICAgICAgICAgIHJldCA9IG1heWJlUHJvbWlzZS5fdmFsdWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWplY3QobWF5YmVQcm9taXNlLl9yZWFzb24oKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbmNlbCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhbHVlc1tpbmRleF0gPSByZXQ7XG4gICAgfVxuICAgIHZhciB0b3RhbFJlc29sdmVkID0gKyt0aGlzLl90b3RhbFJlc29sdmVkO1xuICAgIGlmICh0b3RhbFJlc29sdmVkID49IGxlbmd0aCkge1xuICAgICAgICBpZiAocHJlc2VydmVkVmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXIodmFsdWVzLCBwcmVzZXJ2ZWRWYWx1ZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5NYXBwaW5nUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fZHJhaW5RdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcXVldWUgPSB0aGlzLl9xdWV1ZTtcbiAgICB2YXIgbGltaXQgPSB0aGlzLl9saW1pdDtcbiAgICB2YXIgdmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwICYmIHRoaXMuX2luRmxpZ2h0IDwgbGltaXQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSkgcmV0dXJuO1xuICAgICAgICB2YXIgaW5kZXggPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZUZ1bGZpbGxlZCh2YWx1ZXNbaW5kZXhdLCBpbmRleCk7XG4gICAgfVxufTtcblxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUuX2ZpbHRlciA9IGZ1bmN0aW9uIChib29sZWFucywgdmFsdWVzKSB7XG4gICAgdmFyIGxlbiA9IHZhbHVlcy5sZW5ndGg7XG4gICAgdmFyIHJldCA9IG5ldyBBcnJheShsZW4pO1xuICAgIHZhciBqID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIGlmIChib29sZWFuc1tpXSkgcmV0W2orK10gPSB2YWx1ZXNbaV07XG4gICAgfVxuICAgIHJldC5sZW5ndGggPSBqO1xuICAgIHRoaXMuX3Jlc29sdmUocmV0KTtcbn07XG5cbk1hcHBpbmdQcm9taXNlQXJyYXkucHJvdG90eXBlLnByZXNlcnZlZFZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlc2VydmVkVmFsdWVzO1xufTtcblxuZnVuY3Rpb24gbWFwKHByb21pc2VzLCBmbiwgb3B0aW9ucywgX2ZpbHRlcikge1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcbiAgICB9XG5cbiAgICB2YXIgbGltaXQgPSAwO1xuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jb25jdXJyZW5jeSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgICAgICAgICAgICAgbmV3IFR5cGVFcnJvcihcIidjb25jdXJyZW5jeScgbXVzdCBiZSBhIG51bWJlciBidXQgaXQgaXMgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5jbGFzc1N0cmluZyhvcHRpb25zLmNvbmN1cnJlbmN5KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGltaXQgPSBvcHRpb25zLmNvbmN1cnJlbmN5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvcHRpb25zIGFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0IGJ1dCBpdCBpcyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuY2xhc3NTdHJpbmcob3B0aW9ucykpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsaW1pdCA9IHR5cGVvZiBsaW1pdCA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICBpc0Zpbml0ZShsaW1pdCkgJiYgbGltaXQgPj0gMSA/IGxpbWl0IDogMDtcbiAgICByZXR1cm4gbmV3IE1hcHBpbmdQcm9taXNlQXJyYXkocHJvbWlzZXMsIGZuLCBsaW1pdCwgX2ZpbHRlcikucHJvbWlzZSgpO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoZm4sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbWFwKHRoaXMsIGZuLCBvcHRpb25zLCBudWxsKTtcbn07XG5cblByb21pc2UubWFwID0gZnVuY3Rpb24gKHByb21pc2VzLCBmbiwgb3B0aW9ucywgX2ZpbHRlcikge1xuICAgIHJldHVybiBtYXAocHJvbWlzZXMsIGZuLCBvcHRpb25zLCBfZmlsdGVyKTtcbn07XG5cblxufTtcblxufSx7XCIuL3V0aWxcIjozNn1dLDE5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPVxuZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwsIHRyeUNvbnZlcnRUb1Byb21pc2UsIGFwaVJlamVjdGlvbiwgZGVidWcpIHtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG5cblByb21pc2UubWV0aG9kID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBQcm9taXNlLlR5cGVFcnJvcihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIHJldC5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICAgICAgcmV0Ll9wdXNoQ29udGV4dCgpO1xuICAgICAgICB2YXIgdmFsdWUgPSB0cnlDYXRjaChmbikuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIHByb21pc2VDcmVhdGVkID0gcmV0Ll9wb3BDb250ZXh0KCk7XG4gICAgICAgIGRlYnVnLmNoZWNrRm9yZ290dGVuUmV0dXJucyhcbiAgICAgICAgICAgIHZhbHVlLCBwcm9taXNlQ3JlYXRlZCwgXCJQcm9taXNlLm1ldGhvZFwiLCByZXQpO1xuICAgICAgICByZXQuX3Jlc29sdmVGcm9tU3luY1ZhbHVlKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xufTtcblxuUHJvbWlzZS5hdHRlbXB0ID0gUHJvbWlzZVtcInRyeVwiXSA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcbiAgICB9XG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgcmV0Ll9wdXNoQ29udGV4dCgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZGVidWcuZGVwcmVjYXRlZChcImNhbGxpbmcgUHJvbWlzZS50cnkgd2l0aCBtb3JlIHRoYW4gMSBhcmd1bWVudFwiKTtcbiAgICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgdmFyIGN0eCA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgdmFsdWUgPSB1dGlsLmlzQXJyYXkoYXJnKSA/IHRyeUNhdGNoKGZuKS5hcHBseShjdHgsIGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRyeUNhdGNoKGZuKS5jYWxsKGN0eCwgYXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHRyeUNhdGNoKGZuKSgpO1xuICAgIH1cbiAgICB2YXIgcHJvbWlzZUNyZWF0ZWQgPSByZXQuX3BvcENvbnRleHQoKTtcbiAgICBkZWJ1Zy5jaGVja0ZvcmdvdHRlblJldHVybnMoXG4gICAgICAgIHZhbHVlLCBwcm9taXNlQ3JlYXRlZCwgXCJQcm9taXNlLnRyeVwiLCByZXQpO1xuICAgIHJldC5fcmVzb2x2ZUZyb21TeW5jVmFsdWUodmFsdWUpO1xuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVzb2x2ZUZyb21TeW5jVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IHV0aWwuZXJyb3JPYmopIHtcbiAgICAgICAgdGhpcy5fcmVqZWN0Q2FsbGJhY2sodmFsdWUuZSwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Jlc29sdmVDYWxsYmFjayh2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxufTtcbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwyMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBtYXliZVdyYXBBc0Vycm9yID0gdXRpbC5tYXliZVdyYXBBc0Vycm9yO1xudmFyIGVycm9ycyA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKTtcbnZhciBPcGVyYXRpb25hbEVycm9yID0gZXJyb3JzLk9wZXJhdGlvbmFsRXJyb3I7XG52YXIgZXM1ID0gX2RlcmVxXyhcIi4vZXM1XCIpO1xuXG5mdW5jdGlvbiBpc1VudHlwZWRFcnJvcihvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRXJyb3IgJiZcbiAgICAgICAgZXM1LmdldFByb3RvdHlwZU9mKG9iaikgPT09IEVycm9yLnByb3RvdHlwZTtcbn1cblxudmFyIHJFcnJvcktleSA9IC9eKD86bmFtZXxtZXNzYWdlfHN0YWNrfGNhdXNlKSQvO1xuZnVuY3Rpb24gd3JhcEFzT3BlcmF0aW9uYWxFcnJvcihvYmopIHtcbiAgICB2YXIgcmV0O1xuICAgIGlmIChpc1VudHlwZWRFcnJvcihvYmopKSB7XG4gICAgICAgIHJldCA9IG5ldyBPcGVyYXRpb25hbEVycm9yKG9iaik7XG4gICAgICAgIHJldC5uYW1lID0gb2JqLm5hbWU7XG4gICAgICAgIHJldC5tZXNzYWdlID0gb2JqLm1lc3NhZ2U7XG4gICAgICAgIHJldC5zdGFjayA9IG9iai5zdGFjaztcbiAgICAgICAgdmFyIGtleXMgPSBlczUua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgaWYgKCFyRXJyb3JLZXkudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICB1dGlsLm1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbihvYmopO1xuICAgIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIG5vZGViYWNrRm9yUHJvbWlzZShwcm9taXNlLCBtdWx0aUFyZ3MpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZXJyLCB2YWx1ZSkge1xuICAgICAgICBpZiAocHJvbWlzZSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB2YXIgd3JhcHBlZCA9IHdyYXBBc09wZXJhdGlvbmFsRXJyb3IobWF5YmVXcmFwQXNFcnJvcihlcnIpKTtcbiAgICAgICAgICAgIHByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2Uod3JhcHBlZCk7XG4gICAgICAgICAgICBwcm9taXNlLl9yZWplY3Qod3JhcHBlZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIW11bHRpQXJncykge1xuICAgICAgICAgICAgcHJvbWlzZS5fZnVsZmlsbCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTs7XG4gICAgICAgICAgICBwcm9taXNlLl9mdWxmaWxsKGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHByb21pc2UgPSBudWxsO1xuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm9kZWJhY2tGb3JQcm9taXNlO1xuXG59LHtcIi4vZXJyb3JzXCI6MTIsXCIuL2VzNVwiOjEzLFwiLi91dGlsXCI6MzZ9XSwyMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGFzeW5jID0gUHJvbWlzZS5fYXN5bmM7XG52YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcblxuZnVuY3Rpb24gc3ByZWFkQWRhcHRlcih2YWwsIG5vZGViYWNrKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuICAgIGlmICghdXRpbC5pc0FycmF5KHZhbCkpIHJldHVybiBzdWNjZXNzQWRhcHRlci5jYWxsKHByb21pc2UsIHZhbCwgbm9kZWJhY2spO1xuICAgIHZhciByZXQgPVxuICAgICAgICB0cnlDYXRjaChub2RlYmFjaykuYXBwbHkocHJvbWlzZS5fYm91bmRWYWx1ZSgpLCBbbnVsbF0uY29uY2F0KHZhbCkpO1xuICAgIGlmIChyZXQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgIGFzeW5jLnRocm93TGF0ZXIocmV0LmUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3VjY2Vzc0FkYXB0ZXIodmFsLCBub2RlYmFjaykge1xuICAgIHZhciBwcm9taXNlID0gdGhpcztcbiAgICB2YXIgcmVjZWl2ZXIgPSBwcm9taXNlLl9ib3VuZFZhbHVlKCk7XG4gICAgdmFyIHJldCA9IHZhbCA9PT0gdW5kZWZpbmVkXG4gICAgICAgID8gdHJ5Q2F0Y2gobm9kZWJhY2spLmNhbGwocmVjZWl2ZXIsIG51bGwpXG4gICAgICAgIDogdHJ5Q2F0Y2gobm9kZWJhY2spLmNhbGwocmVjZWl2ZXIsIG51bGwsIHZhbCk7XG4gICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgYXN5bmMudGhyb3dMYXRlcihyZXQuZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZXJyb3JBZGFwdGVyKHJlYXNvbiwgbm9kZWJhY2spIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgaWYgKCFyZWFzb24pIHtcbiAgICAgICAgdmFyIG5ld1JlYXNvbiA9IG5ldyBFcnJvcihyZWFzb24gKyBcIlwiKTtcbiAgICAgICAgbmV3UmVhc29uLmNhdXNlID0gcmVhc29uO1xuICAgICAgICByZWFzb24gPSBuZXdSZWFzb247XG4gICAgfVxuICAgIHZhciByZXQgPSB0cnlDYXRjaChub2RlYmFjaykuY2FsbChwcm9taXNlLl9ib3VuZFZhbHVlKCksIHJlYXNvbik7XG4gICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgYXN5bmMudGhyb3dMYXRlcihyZXQuZSk7XG4gICAgfVxufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5hc0NhbGxiYWNrID0gUHJvbWlzZS5wcm90b3R5cGUubm9kZWlmeSA9IGZ1bmN0aW9uIChub2RlYmFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG5vZGViYWNrID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB2YXIgYWRhcHRlciA9IHN1Y2Nlc3NBZGFwdGVyO1xuICAgICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIE9iamVjdChvcHRpb25zKS5zcHJlYWQpIHtcbiAgICAgICAgICAgIGFkYXB0ZXIgPSBzcHJlYWRBZGFwdGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RoZW4oXG4gICAgICAgICAgICBhZGFwdGVyLFxuICAgICAgICAgICAgZXJyb3JBZGFwdGVyLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIG5vZGViYWNrXG4gICAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwyMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG52YXIgbWFrZVNlbGZSZXNvbHV0aW9uRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXCJjaXJjdWxhciBwcm9taXNlIHJlc29sdXRpb24gY2hhaW5cXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xufTtcbnZhciByZWZsZWN0SGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZS5Qcm9taXNlSW5zcGVjdGlvbih0aGlzLl90YXJnZXQoKSk7XG59O1xudmFyIGFwaVJlamVjdGlvbiA9IGZ1bmN0aW9uKG1zZykge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKG1zZykpO1xufTtcbmZ1bmN0aW9uIFByb3h5YWJsZSgpIHt9XG52YXIgVU5ERUZJTkVEX0JJTkRJTkcgPSB7fTtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcblxudmFyIGdldERvbWFpbjtcbmlmICh1dGlsLmlzTm9kZSkge1xuICAgIGdldERvbWFpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmV0ID0gcHJvY2Vzcy5kb21haW47XG4gICAgICAgIGlmIChyZXQgPT09IHVuZGVmaW5lZCkgcmV0ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBnZXREb21haW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbn1cbnV0aWwubm90RW51bWVyYWJsZVByb3AoUHJvbWlzZSwgXCJfZ2V0RG9tYWluXCIsIGdldERvbWFpbik7XG5cbnZhciBlczUgPSBfZGVyZXFfKFwiLi9lczVcIik7XG52YXIgQXN5bmMgPSBfZGVyZXFfKFwiLi9hc3luY1wiKTtcbnZhciBhc3luYyA9IG5ldyBBc3luYygpO1xuZXM1LmRlZmluZVByb3BlcnR5KFByb21pc2UsIFwiX2FzeW5jXCIsIHt2YWx1ZTogYXN5bmN9KTtcbnZhciBlcnJvcnMgPSBfZGVyZXFfKFwiLi9lcnJvcnNcIik7XG52YXIgVHlwZUVycm9yID0gUHJvbWlzZS5UeXBlRXJyb3IgPSBlcnJvcnMuVHlwZUVycm9yO1xuUHJvbWlzZS5SYW5nZUVycm9yID0gZXJyb3JzLlJhbmdlRXJyb3I7XG52YXIgQ2FuY2VsbGF0aW9uRXJyb3IgPSBQcm9taXNlLkNhbmNlbGxhdGlvbkVycm9yID0gZXJyb3JzLkNhbmNlbGxhdGlvbkVycm9yO1xuUHJvbWlzZS5UaW1lb3V0RXJyb3IgPSBlcnJvcnMuVGltZW91dEVycm9yO1xuUHJvbWlzZS5PcGVyYXRpb25hbEVycm9yID0gZXJyb3JzLk9wZXJhdGlvbmFsRXJyb3I7XG5Qcm9taXNlLlJlamVjdGlvbkVycm9yID0gZXJyb3JzLk9wZXJhdGlvbmFsRXJyb3I7XG5Qcm9taXNlLkFnZ3JlZ2F0ZUVycm9yID0gZXJyb3JzLkFnZ3JlZ2F0ZUVycm9yO1xudmFyIElOVEVSTkFMID0gZnVuY3Rpb24oKXt9O1xudmFyIEFQUExZID0ge307XG52YXIgTkVYVF9GSUxURVIgPSB7fTtcbnZhciB0cnlDb252ZXJ0VG9Qcm9taXNlID0gX2RlcmVxXyhcIi4vdGhlbmFibGVzXCIpKFByb21pc2UsIElOVEVSTkFMKTtcbnZhciBQcm9taXNlQXJyYXkgPVxuICAgIF9kZXJlcV8oXCIuL3Byb21pc2VfYXJyYXlcIikoUHJvbWlzZSwgSU5URVJOQUwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5Q29udmVydFRvUHJvbWlzZSwgYXBpUmVqZWN0aW9uLCBQcm94eWFibGUpO1xudmFyIENvbnRleHQgPSBfZGVyZXFfKFwiLi9jb250ZXh0XCIpKFByb21pc2UpO1xuIC8qanNoaW50IHVudXNlZDpmYWxzZSovXG52YXIgY3JlYXRlQ29udGV4dCA9IENvbnRleHQuY3JlYXRlO1xudmFyIGRlYnVnID0gX2RlcmVxXyhcIi4vZGVidWdnYWJpbGl0eVwiKShQcm9taXNlLCBDb250ZXh0KTtcbnZhciBDYXB0dXJlZFRyYWNlID0gZGVidWcuQ2FwdHVyZWRUcmFjZTtcbnZhciBQYXNzVGhyb3VnaEhhbmRsZXJDb250ZXh0ID1cbiAgICBfZGVyZXFfKFwiLi9maW5hbGx5XCIpKFByb21pc2UsIHRyeUNvbnZlcnRUb1Byb21pc2UpO1xudmFyIGNhdGNoRmlsdGVyID0gX2RlcmVxXyhcIi4vY2F0Y2hfZmlsdGVyXCIpKE5FWFRfRklMVEVSKTtcbnZhciBub2RlYmFja0ZvclByb21pc2UgPSBfZGVyZXFfKFwiLi9ub2RlYmFja1wiKTtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG52YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xuZnVuY3Rpb24gY2hlY2soc2VsZiwgZXhlY3V0b3IpIHtcbiAgICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGV4ZWN1dG9yKSk7XG4gICAgfVxuICAgIGlmIChzZWxmLmNvbnN0cnVjdG9yICE9PSBQcm9taXNlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0aGUgcHJvbWlzZSBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgaW52b2tlZCBkaXJlY3RseVxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSAwO1xuICAgIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJvbWlzZTAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcmVjZWl2ZXIwID0gdW5kZWZpbmVkO1xuICAgIGlmIChleGVjdXRvciAhPT0gSU5URVJOQUwpIHtcbiAgICAgICAgY2hlY2sodGhpcywgZXhlY3V0b3IpO1xuICAgICAgICB0aGlzLl9yZXNvbHZlRnJvbUV4ZWN1dG9yKGV4ZWN1dG9yKTtcbiAgICB9XG4gICAgdGhpcy5fcHJvbWlzZUNyZWF0ZWQoKTtcbiAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlQ3JlYXRlZFwiLCB0aGlzKTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBQcm9taXNlXVwiO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuY2F1Z2h0ID0gUHJvbWlzZS5wcm90b3R5cGVbXCJjYXRjaFwiXSA9IGZ1bmN0aW9uIChmbikge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChsZW4gPiAxKSB7XG4gICAgICAgIHZhciBjYXRjaEluc3RhbmNlcyA9IG5ldyBBcnJheShsZW4gLSAxKSxcbiAgICAgICAgICAgIGogPSAwLCBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuIC0gMTsgKytpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGlmICh1dGlsLmlzT2JqZWN0KGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgY2F0Y2hJbnN0YW5jZXNbaisrXSA9IGl0ZW07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJleHBlY3RpbmcgYW4gb2JqZWN0IGJ1dCBnb3QgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkEgY2F0Y2ggc3RhdGVtZW50IHByZWRpY2F0ZSBcIiArIHV0aWwuY2xhc3NTdHJpbmcoaXRlbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoSW5zdGFuY2VzLmxlbmd0aCA9IGo7XG4gICAgICAgIGZuID0gYXJndW1lbnRzW2ldO1xuICAgICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgY2F0Y2hGaWx0ZXIoY2F0Y2hJbnN0YW5jZXMsIGZuLCB0aGlzKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBmbik7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5yZWZsZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl90aGVuKHJlZmxlY3RIYW5kbGVyLFxuICAgICAgICByZWZsZWN0SGFuZGxlciwgdW5kZWZpbmVkLCB0aGlzLCB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChkaWRGdWxmaWxsLCBkaWRSZWplY3QpIHtcbiAgICBpZiAoZGVidWcud2FybmluZ3MoKSAmJiBhcmd1bWVudHMubGVuZ3RoID4gMCAmJlxuICAgICAgICB0eXBlb2YgZGlkRnVsZmlsbCAhPT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIHR5cGVvZiBkaWRSZWplY3QgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB2YXIgbXNnID0gXCIudGhlbigpIG9ubHkgYWNjZXB0cyBmdW5jdGlvbnMgYnV0IHdhcyBwYXNzZWQ6IFwiICtcbiAgICAgICAgICAgICAgICB1dGlsLmNsYXNzU3RyaW5nKGRpZEZ1bGZpbGwpO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIG1zZyArPSBcIiwgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGRpZFJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd2Fybihtc2cpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdGhlbihkaWRGdWxmaWxsLCBkaWRSZWplY3QsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uIChkaWRGdWxmaWxsLCBkaWRSZWplY3QpIHtcbiAgICB2YXIgcHJvbWlzZSA9XG4gICAgICAgIHRoaXMuX3RoZW4oZGlkRnVsZmlsbCwgZGlkUmVqZWN0LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgICBwcm9taXNlLl9zZXRJc0ZpbmFsKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5zcHJlYWQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFsbCgpLl90aGVuKGZuLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgQVBQTFksIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJldCA9IHtcbiAgICAgICAgaXNGdWxmaWxsZWQ6IGZhbHNlLFxuICAgICAgICBpc1JlamVjdGVkOiBmYWxzZSxcbiAgICAgICAgZnVsZmlsbG1lbnRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICByZWplY3Rpb25SZWFzb246IHVuZGVmaW5lZFxuICAgIH07XG4gICAgaWYgKHRoaXMuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICByZXQuZnVsZmlsbG1lbnRWYWx1ZSA9IHRoaXMudmFsdWUoKTtcbiAgICAgICAgcmV0LmlzRnVsZmlsbGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNSZWplY3RlZCgpKSB7XG4gICAgICAgIHJldC5yZWplY3Rpb25SZWFzb24gPSB0aGlzLnJlYXNvbigpO1xuICAgICAgICByZXQuaXNSZWplY3RlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX3dhcm4oXCIuYWxsKCkgd2FzIHBhc3NlZCBhcmd1bWVudHMgYnV0IGl0IGRvZXMgbm90IHRha2UgYW55XCIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2VBcnJheSh0aGlzKS5wcm9taXNlKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiB0aGlzLmNhdWdodCh1dGlsLm9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uLCBmbik7XG59O1xuXG5Qcm9taXNlLmdldE5ld0xpYnJhcnlDb3B5ID0gbW9kdWxlLmV4cG9ydHM7XG5cblByb21pc2UuaXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIFByb21pc2U7XG59O1xuXG5Qcm9taXNlLmZyb21Ob2RlID0gUHJvbWlzZS5mcm9tQ2FsbGJhY2sgPSBmdW5jdGlvbihmbikge1xuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgcmV0Ll9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgIHZhciBtdWx0aUFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/ICEhT2JqZWN0KGFyZ3VtZW50c1sxXSkubXVsdGlBcmdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKGZuKShub2RlYmFja0ZvclByb21pc2UocmV0LCBtdWx0aUFyZ3MpKTtcbiAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iaikge1xuICAgICAgICByZXQuX3JlamVjdENhbGxiYWNrKHJlc3VsdC5lLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKCFyZXQuX2lzRmF0ZVNlYWxlZCgpKSByZXQuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZUFycmF5KHByb21pc2VzKS5wcm9taXNlKCk7XG59O1xuXG5Qcm9taXNlLmNhc3QgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHJldCA9IHRyeUNvbnZlcnRUb1Byb21pc2Uob2JqKTtcbiAgICBpZiAoIShyZXQgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgICByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIHJldC5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICAgICAgcmV0Ll9zZXRGdWxmaWxsZWQoKTtcbiAgICAgICAgcmV0Ll9yZWplY3Rpb25IYW5kbGVyMCA9IG9iajtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucmVzb2x2ZSA9IFByb21pc2UuZnVsZmlsbGVkID0gUHJvbWlzZS5jYXN0O1xuXG5Qcm9taXNlLnJlamVjdCA9IFByb21pc2UucmVqZWN0ZWQgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgcmV0Ll9yZWplY3RDYWxsYmFjayhyZWFzb24sIHRydWUpO1xuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLnNldFNjaGVkdWxlciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgIH1cbiAgICByZXR1cm4gYXN5bmMuc2V0U2NoZWR1bGVyKGZuKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl90aGVuID0gZnVuY3Rpb24gKFxuICAgIGRpZEZ1bGZpbGwsXG4gICAgZGlkUmVqZWN0LFxuICAgIF8sICAgIHJlY2VpdmVyLFxuICAgIGludGVybmFsRGF0YVxuKSB7XG4gICAgdmFyIGhhdmVJbnRlcm5hbERhdGEgPSBpbnRlcm5hbERhdGEgIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgcHJvbWlzZSA9IGhhdmVJbnRlcm5hbERhdGEgPyBpbnRlcm5hbERhdGEgOiBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX3RhcmdldCgpO1xuICAgIHZhciBiaXRGaWVsZCA9IHRhcmdldC5fYml0RmllbGQ7XG5cbiAgICBpZiAoIWhhdmVJbnRlcm5hbERhdGEpIHtcbiAgICAgICAgcHJvbWlzZS5fcHJvcGFnYXRlRnJvbSh0aGlzLCAzKTtcbiAgICAgICAgcHJvbWlzZS5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICAgICAgaWYgKHJlY2VpdmVyID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICgodGhpcy5fYml0RmllbGQgJiAyMDk3MTUyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgIGlmICghKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHRoaXMuX2JvdW5kVmFsdWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB0YXJnZXQgPT09IHRoaXMgPyB1bmRlZmluZWQgOiB0aGlzLl9ib3VuZFRvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmVFdmVudChcInByb21pc2VDaGFpbmVkXCIsIHRoaXMsIHByb21pc2UpO1xuICAgIH1cblxuICAgIHZhciBkb21haW4gPSBnZXREb21haW4oKTtcbiAgICBpZiAoISgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XG4gICAgICAgIHZhciBoYW5kbGVyLCB2YWx1ZSwgc2V0dGxlciA9IHRhcmdldC5fc2V0dGxlUHJvbWlzZUN0eDtcbiAgICAgICAgaWYgKCgoYml0RmllbGQgJiAzMzU1NDQzMikgIT09IDApKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRhcmdldC5fcmVqZWN0aW9uSGFuZGxlcjA7XG4gICAgICAgICAgICBoYW5kbGVyID0gZGlkRnVsZmlsbDtcbiAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0YXJnZXQuX2Z1bGZpbGxtZW50SGFuZGxlcjA7XG4gICAgICAgICAgICBoYW5kbGVyID0gZGlkUmVqZWN0O1xuICAgICAgICAgICAgdGFyZ2V0Ll91bnNldFJlamVjdGlvbklzVW5oYW5kbGVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXR0bGVyID0gdGFyZ2V0Ll9zZXR0bGVQcm9taXNlTGF0ZUNhbmNlbGxhdGlvbk9ic2VydmVyO1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgQ2FuY2VsbGF0aW9uRXJyb3IoXCJsYXRlIGNhbmNlbGxhdGlvbiBvYnNlcnZlclwiKTtcbiAgICAgICAgICAgIHRhcmdldC5fYXR0YWNoRXh0cmFUcmFjZSh2YWx1ZSk7XG4gICAgICAgICAgICBoYW5kbGVyID0gZGlkUmVqZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMuaW52b2tlKHNldHRsZXIsIHRhcmdldCwge1xuICAgICAgICAgICAgaGFuZGxlcjogZG9tYWluID09PSBudWxsID8gaGFuZGxlclxuICAgICAgICAgICAgICAgIDogKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgaGFuZGxlcikpLFxuICAgICAgICAgICAgcHJvbWlzZTogcHJvbWlzZSxcbiAgICAgICAgICAgIHJlY2VpdmVyOiByZWNlaXZlcixcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQuX2FkZENhbGxiYWNrcyhkaWRGdWxmaWxsLCBkaWRSZWplY3QsIHByb21pc2UsIHJlY2VpdmVyLCBkb21haW4pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2xlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYml0RmllbGQgJiA2NTUzNTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc0ZhdGVTZWFsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDExNzUwNjA0OCkgIT09IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5faXNGb2xsb3dpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDY3MTA4ODY0KSA9PT0gNjcxMDg4NjQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0TGVuZ3RoID0gZnVuY3Rpb24gKGxlbikge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gKHRoaXMuX2JpdEZpZWxkICYgLTY1NTM2KSB8XG4gICAgICAgIChsZW4gJiA2NTUzNSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0RnVsZmlsbGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAzMzU1NDQzMjtcbiAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlRnVsZmlsbGVkXCIsIHRoaXMpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldFJlamVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAxNjc3NzIxNjtcbiAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlUmVqZWN0ZWRcIiwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0Rm9sbG93aW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCA2NzEwODg2NDtcbiAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlUmVzb2x2ZWRcIiwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0SXNGaW5hbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgNDE5NDMwNDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc0ZpbmFsID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA0MTk0MzA0KSA+IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fdW5zZXRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkICYgKH42NTUzNik7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDY1NTM2O1xuICAgIHRoaXMuX2ZpcmVFdmVudChcInByb21pc2VDYW5jZWxsZWRcIiwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0V2lsbEJlQ2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDgzODg2MDg7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0QXN5bmNHdWFyYW50ZWVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGFzeW5jLmhhc0N1c3RvbVNjaGVkdWxlcigpKSByZXR1cm47XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDEzNDIxNzcyODtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWNlaXZlckF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgdmFyIHJldCA9IGluZGV4ID09PSAwID8gdGhpcy5fcmVjZWl2ZXIwIDogdGhpc1tcbiAgICAgICAgICAgIGluZGV4ICogNCAtIDQgKyAzXTtcbiAgICBpZiAocmV0ID09PSBVTkRFRklORURfQklORElORykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAocmV0ID09PSB1bmRlZmluZWQgJiYgdGhpcy5faXNCb3VuZCgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3VuZFZhbHVlKCk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcHJvbWlzZUF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXNbXG4gICAgICAgICAgICBpbmRleCAqIDQgLSA0ICsgMl07XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fZnVsZmlsbG1lbnRIYW5kbGVyQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpc1tcbiAgICAgICAgICAgIGluZGV4ICogNCAtIDQgKyAwXTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWplY3Rpb25IYW5kbGVyQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpc1tcbiAgICAgICAgICAgIGluZGV4ICogNCAtIDQgKyAxXTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9ib3VuZFZhbHVlID0gZnVuY3Rpb24oKSB7fTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX21pZ3JhdGVDYWxsYmFjazAgPSBmdW5jdGlvbiAoZm9sbG93ZXIpIHtcbiAgICB2YXIgYml0RmllbGQgPSBmb2xsb3dlci5fYml0RmllbGQ7XG4gICAgdmFyIGZ1bGZpbGwgPSBmb2xsb3dlci5fZnVsZmlsbG1lbnRIYW5kbGVyMDtcbiAgICB2YXIgcmVqZWN0ID0gZm9sbG93ZXIuX3JlamVjdGlvbkhhbmRsZXIwO1xuICAgIHZhciBwcm9taXNlID0gZm9sbG93ZXIuX3Byb21pc2UwO1xuICAgIHZhciByZWNlaXZlciA9IGZvbGxvd2VyLl9yZWNlaXZlckF0KDApO1xuICAgIGlmIChyZWNlaXZlciA9PT0gdW5kZWZpbmVkKSByZWNlaXZlciA9IFVOREVGSU5FRF9CSU5ESU5HO1xuICAgIHRoaXMuX2FkZENhbGxiYWNrcyhmdWxmaWxsLCByZWplY3QsIHByb21pc2UsIHJlY2VpdmVyLCBudWxsKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9taWdyYXRlQ2FsbGJhY2tBdCA9IGZ1bmN0aW9uIChmb2xsb3dlciwgaW5kZXgpIHtcbiAgICB2YXIgZnVsZmlsbCA9IGZvbGxvd2VyLl9mdWxmaWxsbWVudEhhbmRsZXJBdChpbmRleCk7XG4gICAgdmFyIHJlamVjdCA9IGZvbGxvd2VyLl9yZWplY3Rpb25IYW5kbGVyQXQoaW5kZXgpO1xuICAgIHZhciBwcm9taXNlID0gZm9sbG93ZXIuX3Byb21pc2VBdChpbmRleCk7XG4gICAgdmFyIHJlY2VpdmVyID0gZm9sbG93ZXIuX3JlY2VpdmVyQXQoaW5kZXgpO1xuICAgIGlmIChyZWNlaXZlciA9PT0gdW5kZWZpbmVkKSByZWNlaXZlciA9IFVOREVGSU5FRF9CSU5ESU5HO1xuICAgIHRoaXMuX2FkZENhbGxiYWNrcyhmdWxmaWxsLCByZWplY3QsIHByb21pc2UsIHJlY2VpdmVyLCBudWxsKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9hZGRDYWxsYmFja3MgPSBmdW5jdGlvbiAoXG4gICAgZnVsZmlsbCxcbiAgICByZWplY3QsXG4gICAgcHJvbWlzZSxcbiAgICByZWNlaXZlcixcbiAgICBkb21haW5cbikge1xuICAgIHZhciBpbmRleCA9IHRoaXMuX2xlbmd0aCgpO1xuXG4gICAgaWYgKGluZGV4ID49IDY1NTM1IC0gNCkge1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX3NldExlbmd0aCgwKTtcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgdGhpcy5fcHJvbWlzZTAgPSBwcm9taXNlO1xuICAgICAgICB0aGlzLl9yZWNlaXZlcjAgPSByZWNlaXZlcjtcbiAgICAgICAgaWYgKHR5cGVvZiBmdWxmaWxsID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjAgPVxuICAgICAgICAgICAgICAgIGRvbWFpbiA9PT0gbnVsbCA/IGZ1bGZpbGwgOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmdWxmaWxsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJlamVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWplY3Rpb25IYW5kbGVyMCA9XG4gICAgICAgICAgICAgICAgZG9tYWluID09PSBudWxsID8gcmVqZWN0IDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBiYXNlID0gaW5kZXggKiA0IC0gNDtcbiAgICAgICAgdGhpc1tiYXNlICsgMl0gPSBwcm9taXNlO1xuICAgICAgICB0aGlzW2Jhc2UgKyAzXSA9IHJlY2VpdmVyO1xuICAgICAgICBpZiAodHlwZW9mIGZ1bGZpbGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpc1tiYXNlICsgMF0gPVxuICAgICAgICAgICAgICAgIGRvbWFpbiA9PT0gbnVsbCA/IGZ1bGZpbGwgOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmdWxmaWxsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJlamVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzW2Jhc2UgKyAxXSA9XG4gICAgICAgICAgICAgICAgZG9tYWluID09PSBudWxsID8gcmVqZWN0IDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9zZXRMZW5ndGgoaW5kZXggKyAxKTtcbiAgICByZXR1cm4gaW5kZXg7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcHJveHkgPSBmdW5jdGlvbiAocHJveHlhYmxlLCBhcmcpIHtcbiAgICB0aGlzLl9hZGRDYWxsYmFja3ModW5kZWZpbmVkLCB1bmRlZmluZWQsIGFyZywgcHJveHlhYmxlLCBudWxsKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZXNvbHZlQ2FsbGJhY2sgPSBmdW5jdGlvbih2YWx1ZSwgc2hvdWxkQmluZCkge1xuICAgIGlmICgoKHRoaXMuX2JpdEZpZWxkICYgMTE3NTA2MDQ4KSAhPT0gMCkpIHJldHVybjtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMpXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWplY3RDYWxsYmFjayhtYWtlU2VsZlJlc29sdXRpb25FcnJvcigpLCBmYWxzZSk7XG4gICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodmFsdWUsIHRoaXMpO1xuICAgIGlmICghKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpKSByZXR1cm4gdGhpcy5fZnVsZmlsbCh2YWx1ZSk7XG5cbiAgICBpZiAoc2hvdWxkQmluZCkgdGhpcy5fcHJvcGFnYXRlRnJvbShtYXliZVByb21pc2UsIDIpO1xuXG4gICAgdmFyIHByb21pc2UgPSBtYXliZVByb21pc2UuX3RhcmdldCgpO1xuXG4gICAgaWYgKHByb21pc2UgPT09IHRoaXMpIHtcbiAgICAgICAgdGhpcy5fcmVqZWN0KG1ha2VTZWxmUmVzb2x1dGlvbkVycm9yKCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGJpdEZpZWxkID0gcHJvbWlzZS5fYml0RmllbGQ7XG4gICAgaWYgKCgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XG4gICAgICAgIHZhciBsZW4gPSB0aGlzLl9sZW5ndGgoKTtcbiAgICAgICAgaWYgKGxlbiA+IDApIHByb21pc2UuX21pZ3JhdGVDYWxsYmFjazAodGhpcyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHByb21pc2UuX21pZ3JhdGVDYWxsYmFja0F0KHRoaXMsIGkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldEZvbGxvd2luZygpO1xuICAgICAgICB0aGlzLl9zZXRMZW5ndGgoMCk7XG4gICAgICAgIHRoaXMuX3NldEZvbGxvd2VlKHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgdGhpcy5fZnVsZmlsbChwcm9taXNlLl92YWx1ZSgpKTtcbiAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XG4gICAgICAgIHRoaXMuX3JlamVjdChwcm9taXNlLl9yZWFzb24oKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlYXNvbiA9IG5ldyBDYW5jZWxsYXRpb25FcnJvcihcImxhdGUgY2FuY2VsbGF0aW9uIG9ic2VydmVyXCIpO1xuICAgICAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHJlYXNvbik7XG4gICAgICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWplY3RDYWxsYmFjayA9XG5mdW5jdGlvbihyZWFzb24sIHN5bmNocm9ub3VzLCBpZ25vcmVOb25FcnJvcldhcm5pbmdzKSB7XG4gICAgdmFyIHRyYWNlID0gdXRpbC5lbnN1cmVFcnJvck9iamVjdChyZWFzb24pO1xuICAgIHZhciBoYXNTdGFjayA9IHRyYWNlID09PSByZWFzb247XG4gICAgaWYgKCFoYXNTdGFjayAmJiAhaWdub3JlTm9uRXJyb3JXYXJuaW5ncyAmJiBkZWJ1Zy53YXJuaW5ncygpKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gXCJhIHByb21pc2Ugd2FzIHJlamVjdGVkIHdpdGggYSBub24tZXJyb3I6IFwiICtcbiAgICAgICAgICAgIHV0aWwuY2xhc3NTdHJpbmcocmVhc29uKTtcbiAgICAgICAgdGhpcy5fd2FybihtZXNzYWdlLCB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5fYXR0YWNoRXh0cmFUcmFjZSh0cmFjZSwgc3luY2hyb25vdXMgPyBoYXNTdGFjayA6IGZhbHNlKTtcbiAgICB0aGlzLl9yZWplY3QocmVhc29uKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZXNvbHZlRnJvbUV4ZWN1dG9yID0gZnVuY3Rpb24gKGV4ZWN1dG9yKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuICAgIHRoaXMuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgdGhpcy5fcHVzaENvbnRleHQoKTtcbiAgICB2YXIgc3luY2hyb25vdXMgPSB0cnVlO1xuICAgIHZhciByID0gdGhpcy5fZXhlY3V0ZShleGVjdXRvciwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHJlYXNvbiwgc3luY2hyb25vdXMpO1xuICAgIH0pO1xuICAgIHN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgdGhpcy5fcG9wQ29udGV4dCgpO1xuXG4gICAgaWYgKHIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9taXNlLl9yZWplY3RDYWxsYmFjayhyLCB0cnVlKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0dGxlUHJvbWlzZUZyb21IYW5kbGVyID0gZnVuY3Rpb24gKFxuICAgIGhhbmRsZXIsIHJlY2VpdmVyLCB2YWx1ZSwgcHJvbWlzZVxuKSB7XG4gICAgdmFyIGJpdEZpZWxkID0gcHJvbWlzZS5fYml0RmllbGQ7XG4gICAgaWYgKCgoYml0RmllbGQgJiA2NTUzNikgIT09IDApKSByZXR1cm47XG4gICAgcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcbiAgICB2YXIgeDtcbiAgICBpZiAocmVjZWl2ZXIgPT09IEFQUExZKSB7XG4gICAgICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlLmxlbmd0aCAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgeCA9IGVycm9yT2JqO1xuICAgICAgICAgICAgeC5lID0gbmV3IFR5cGVFcnJvcihcImNhbm5vdCAuc3ByZWFkKCkgYSBub24tYXJyYXk6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuY2xhc3NTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHggPSB0cnlDYXRjaChoYW5kbGVyKS5hcHBseSh0aGlzLl9ib3VuZFZhbHVlKCksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHggPSB0cnlDYXRjaChoYW5kbGVyKS5jYWxsKHJlY2VpdmVyLCB2YWx1ZSk7XG4gICAgfVxuICAgIHZhciBwcm9taXNlQ3JlYXRlZCA9IHByb21pc2UuX3BvcENvbnRleHQoKTtcbiAgICBiaXRGaWVsZCA9IHByb21pc2UuX2JpdEZpZWxkO1xuICAgIGlmICgoKGJpdEZpZWxkICYgNjU1MzYpICE9PSAwKSkgcmV0dXJuO1xuXG4gICAgaWYgKHggPT09IE5FWFRfRklMVEVSKSB7XG4gICAgICAgIHByb21pc2UuX3JlamVjdCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh4ID09PSBlcnJvck9iaikge1xuICAgICAgICBwcm9taXNlLl9yZWplY3RDYWxsYmFjayh4LmUsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkZWJ1Zy5jaGVja0ZvcmdvdHRlblJldHVybnMoeCwgcHJvbWlzZUNyZWF0ZWQsIFwiXCIsICBwcm9taXNlLCB0aGlzKTtcbiAgICAgICAgcHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHgpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl90YXJnZXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmV0ID0gdGhpcztcbiAgICB3aGlsZSAocmV0Ll9pc0ZvbGxvd2luZygpKSByZXQgPSByZXQuX2ZvbGxvd2VlKCk7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9mb2xsb3dlZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWplY3Rpb25IYW5kbGVyMDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRGb2xsb3dlZSA9IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICB0aGlzLl9yZWplY3Rpb25IYW5kbGVyMCA9IHByb21pc2U7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0dGxlUHJvbWlzZSA9IGZ1bmN0aW9uKHByb21pc2UsIGhhbmRsZXIsIHJlY2VpdmVyLCB2YWx1ZSkge1xuICAgIHZhciBpc1Byb21pc2UgPSBwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZTtcbiAgICB2YXIgYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZDtcbiAgICB2YXIgYXN5bmNHdWFyYW50ZWVkID0gKChiaXRGaWVsZCAmIDEzNDIxNzcyOCkgIT09IDApO1xuICAgIGlmICgoKGJpdEZpZWxkICYgNjU1MzYpICE9PSAwKSkge1xuICAgICAgICBpZiAoaXNQcm9taXNlKSBwcm9taXNlLl9pbnZva2VJbnRlcm5hbE9uQ2FuY2VsKCk7XG5cbiAgICAgICAgaWYgKHJlY2VpdmVyIGluc3RhbmNlb2YgUGFzc1Rocm91Z2hIYW5kbGVyQ29udGV4dCAmJlxuICAgICAgICAgICAgcmVjZWl2ZXIuaXNGaW5hbGx5SGFuZGxlcigpKSB7XG4gICAgICAgICAgICByZWNlaXZlci5jYW5jZWxQcm9taXNlID0gcHJvbWlzZTtcbiAgICAgICAgICAgIGlmICh0cnlDYXRjaChoYW5kbGVyKS5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgPT09IGVycm9yT2JqKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0KGVycm9yT2JqLmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPT09IHJlZmxlY3RIYW5kbGVyKSB7XG4gICAgICAgICAgICBwcm9taXNlLl9mdWxmaWxsKHJlZmxlY3RIYW5kbGVyLmNhbGwocmVjZWl2ZXIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZWNlaXZlciBpbnN0YW5jZW9mIFByb3h5YWJsZSkge1xuICAgICAgICAgICAgcmVjZWl2ZXIuX3Byb21pc2VDYW5jZWxsZWQocHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcm9taXNlIHx8IHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlQXJyYXkpIHtcbiAgICAgICAgICAgIHByb21pc2UuX2NhbmNlbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVjZWl2ZXIuY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgaWYgKCFpc1Byb21pc2UpIHtcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbChyZWNlaXZlciwgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFzeW5jR3VhcmFudGVlZCkgcHJvbWlzZS5fc2V0QXN5bmNHdWFyYW50ZWVkKCk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0bGVQcm9taXNlRnJvbUhhbmRsZXIoaGFuZGxlciwgcmVjZWl2ZXIsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVjZWl2ZXIgaW5zdGFuY2VvZiBQcm94eWFibGUpIHtcbiAgICAgICAgaWYgKCFyZWNlaXZlci5faXNSZXNvbHZlZCgpKSB7XG4gICAgICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlci5fcHJvbWlzZUZ1bGZpbGxlZCh2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyLl9wcm9taXNlUmVqZWN0ZWQodmFsdWUsIHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1Byb21pc2UpIHtcbiAgICAgICAgaWYgKGFzeW5jR3VhcmFudGVlZCkgcHJvbWlzZS5fc2V0QXN5bmNHdWFyYW50ZWVkKCk7XG4gICAgICAgIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xuICAgICAgICAgICAgcHJvbWlzZS5fZnVsZmlsbCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLl9yZWplY3QodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZVByb21pc2VMYXRlQ2FuY2VsbGF0aW9uT2JzZXJ2ZXIgPSBmdW5jdGlvbihjdHgpIHtcbiAgICB2YXIgaGFuZGxlciA9IGN0eC5oYW5kbGVyO1xuICAgIHZhciBwcm9taXNlID0gY3R4LnByb21pc2U7XG4gICAgdmFyIHJlY2VpdmVyID0gY3R4LnJlY2VpdmVyO1xuICAgIHZhciB2YWx1ZSA9IGN0eC52YWx1ZTtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBpZiAoIShwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbChyZWNlaXZlciwgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGxlUHJvbWlzZUZyb21IYW5kbGVyKGhhbmRsZXIsIHJlY2VpdmVyLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHByb21pc2UuX3JlamVjdCh2YWx1ZSk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZVByb21pc2VDdHggPSBmdW5jdGlvbihjdHgpIHtcbiAgICB0aGlzLl9zZXR0bGVQcm9taXNlKGN0eC5wcm9taXNlLCBjdHguaGFuZGxlciwgY3R4LnJlY2VpdmVyLCBjdHgudmFsdWUpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZVByb21pc2UwID0gZnVuY3Rpb24oaGFuZGxlciwgdmFsdWUsIGJpdEZpZWxkKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLl9wcm9taXNlMDtcbiAgICB2YXIgcmVjZWl2ZXIgPSB0aGlzLl9yZWNlaXZlckF0KDApO1xuICAgIHRoaXMuX3Byb21pc2UwID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3JlY2VpdmVyMCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9zZXR0bGVQcm9taXNlKHByb21pc2UsIGhhbmRsZXIsIHJlY2VpdmVyLCB2YWx1ZSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fY2xlYXJDYWxsYmFja0RhdGFBdEluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICB2YXIgYmFzZSA9IGluZGV4ICogNCAtIDQ7XG4gICAgdGhpc1tiYXNlICsgMl0gPVxuICAgIHRoaXNbYmFzZSArIDNdID1cbiAgICB0aGlzW2Jhc2UgKyAwXSA9XG4gICAgdGhpc1tiYXNlICsgMV0gPSB1bmRlZmluZWQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fZnVsZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBiaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkO1xuICAgIGlmICgoKGJpdEZpZWxkICYgMTE3NTA2MDQ4KSA+Pj4gMTYpKSByZXR1cm47XG4gICAgaWYgKHZhbHVlID09PSB0aGlzKSB7XG4gICAgICAgIHZhciBlcnIgPSBtYWtlU2VsZlJlc29sdXRpb25FcnJvcigpO1xuICAgICAgICB0aGlzLl9hdHRhY2hFeHRyYVRyYWNlKGVycik7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWplY3QoZXJyKTtcbiAgICB9XG4gICAgdGhpcy5fc2V0RnVsZmlsbGVkKCk7XG4gICAgdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjAgPSB2YWx1ZTtcblxuICAgIGlmICgoYml0RmllbGQgJiA2NTUzNSkgPiAwKSB7XG4gICAgICAgIGlmICgoKGJpdEZpZWxkICYgMTM0MjE3NzI4KSAhPT0gMCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRsZVByb21pc2VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhc3luYy5zZXR0bGVQcm9taXNlcyh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWplY3QgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgdmFyIGJpdEZpZWxkID0gdGhpcy5fYml0RmllbGQ7XG4gICAgaWYgKCgoYml0RmllbGQgJiAxMTc1MDYwNDgpID4+PiAxNikpIHJldHVybjtcbiAgICB0aGlzLl9zZXRSZWplY3RlZCgpO1xuICAgIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjAgPSByZWFzb247XG5cbiAgICBpZiAodGhpcy5faXNGaW5hbCgpKSB7XG4gICAgICAgIHJldHVybiBhc3luYy5mYXRhbEVycm9yKHJlYXNvbiwgdXRpbC5pc05vZGUpO1xuICAgIH1cblxuICAgIGlmICgoYml0RmllbGQgJiA2NTUzNSkgPiAwKSB7XG4gICAgICAgIGFzeW5jLnNldHRsZVByb21pc2VzKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2Vuc3VyZVBvc3NpYmxlUmVqZWN0aW9uSGFuZGxlZCgpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9mdWxmaWxsUHJvbWlzZXMgPSBmdW5jdGlvbiAobGVuLCB2YWx1ZSkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXJBdChpKTtcbiAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLl9wcm9taXNlQXQoaSk7XG4gICAgICAgIHZhciByZWNlaXZlciA9IHRoaXMuX3JlY2VpdmVyQXQoaSk7XG4gICAgICAgIHRoaXMuX2NsZWFyQ2FsbGJhY2tEYXRhQXRJbmRleChpKTtcbiAgICAgICAgdGhpcy5fc2V0dGxlUHJvbWlzZShwcm9taXNlLCBoYW5kbGVyLCByZWNlaXZlciwgdmFsdWUpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWplY3RQcm9taXNlcyA9IGZ1bmN0aW9uIChsZW4sIHJlYXNvbikge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzLl9yZWplY3Rpb25IYW5kbGVyQXQoaSk7XG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZUF0KGkpO1xuICAgICAgICB2YXIgcmVjZWl2ZXIgPSB0aGlzLl9yZWNlaXZlckF0KGkpO1xuICAgICAgICB0aGlzLl9jbGVhckNhbGxiYWNrRGF0YUF0SW5kZXgoaSk7XG4gICAgICAgIHRoaXMuX3NldHRsZVByb21pc2UocHJvbWlzZSwgaGFuZGxlciwgcmVjZWl2ZXIsIHJlYXNvbik7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZVByb21pc2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBiaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkO1xuICAgIHZhciBsZW4gPSAoYml0RmllbGQgJiA2NTUzNSk7XG5cbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDE2ODQyNzUyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgIHZhciByZWFzb24gPSB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXIwO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGxlUHJvbWlzZTAodGhpcy5fcmVqZWN0aW9uSGFuZGxlcjAsIHJlYXNvbiwgYml0RmllbGQpO1xuICAgICAgICAgICAgdGhpcy5fcmVqZWN0UHJvbWlzZXMobGVuLCByZWFzb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjA7XG4gICAgICAgICAgICB0aGlzLl9zZXR0bGVQcm9taXNlMCh0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXIwLCB2YWx1ZSwgYml0RmllbGQpO1xuICAgICAgICAgICAgdGhpcy5fZnVsZmlsbFByb21pc2VzKGxlbiwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldExlbmd0aCgwKTtcbiAgICB9XG4gICAgdGhpcy5fY2xlYXJDYW5jZWxsYXRpb25EYXRhKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0dGxlZFZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJpdEZpZWxkID0gdGhpcy5fYml0RmllbGQ7XG4gICAgaWYgKCgoYml0RmllbGQgJiAzMzU1NDQzMikgIT09IDApKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWplY3Rpb25IYW5kbGVyMDtcbiAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXIwO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGRlZmVyUmVzb2x2ZSh2KSB7dGhpcy5wcm9taXNlLl9yZXNvbHZlQ2FsbGJhY2sodik7fVxuZnVuY3Rpb24gZGVmZXJSZWplY3Qodikge3RoaXMucHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2sodiwgZmFsc2UpO31cblxuUHJvbWlzZS5kZWZlciA9IFByb21pc2UucGVuZGluZyA9IGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnLmRlcHJlY2F0ZWQoXCJQcm9taXNlLmRlZmVyXCIsIFwibmV3IFByb21pc2VcIik7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvbWlzZTogcHJvbWlzZSxcbiAgICAgICAgcmVzb2x2ZTogZGVmZXJSZXNvbHZlLFxuICAgICAgICByZWplY3Q6IGRlZmVyUmVqZWN0XG4gICAgfTtcbn07XG5cbnV0aWwubm90RW51bWVyYWJsZVByb3AoUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgXCJfbWFrZVNlbGZSZXNvbHV0aW9uRXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgbWFrZVNlbGZSZXNvbHV0aW9uRXJyb3IpO1xuXG5fZGVyZXFfKFwiLi9tZXRob2RcIikoUHJvbWlzZSwgSU5URVJOQUwsIHRyeUNvbnZlcnRUb1Byb21pc2UsIGFwaVJlamVjdGlvbixcbiAgICBkZWJ1Zyk7XG5fZGVyZXFfKFwiLi9iaW5kXCIpKFByb21pc2UsIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBkZWJ1Zyk7XG5fZGVyZXFfKFwiLi9jYW5jZWxcIikoUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBhcGlSZWplY3Rpb24sIGRlYnVnKTtcbl9kZXJlcV8oXCIuL2RpcmVjdF9yZXNvbHZlXCIpKFByb21pc2UpO1xuX2RlcmVxXyhcIi4vc3luY2hyb25vdXNfaW5zcGVjdGlvblwiKShQcm9taXNlKTtcbl9kZXJlcV8oXCIuL2pvaW5cIikoXG4gICAgUHJvbWlzZSwgUHJvbWlzZUFycmF5LCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBJTlRFUk5BTCwgYXN5bmMsIGdldERvbWFpbik7XG5Qcm9taXNlLlByb21pc2UgPSBQcm9taXNlO1xuUHJvbWlzZS52ZXJzaW9uID0gXCIzLjQuNlwiO1xuX2RlcmVxXygnLi9tYXAuanMnKShQcm9taXNlLCBQcm9taXNlQXJyYXksIGFwaVJlamVjdGlvbiwgdHJ5Q29udmVydFRvUHJvbWlzZSwgSU5URVJOQUwsIGRlYnVnKTtcbl9kZXJlcV8oJy4vY2FsbF9nZXQuanMnKShQcm9taXNlKTtcbl9kZXJlcV8oJy4vdXNpbmcuanMnKShQcm9taXNlLCBhcGlSZWplY3Rpb24sIHRyeUNvbnZlcnRUb1Byb21pc2UsIGNyZWF0ZUNvbnRleHQsIElOVEVSTkFMLCBkZWJ1Zyk7XG5fZGVyZXFfKCcuL3RpbWVycy5qcycpKFByb21pc2UsIElOVEVSTkFMLCBkZWJ1Zyk7XG5fZGVyZXFfKCcuL2dlbmVyYXRvcnMuanMnKShQcm9taXNlLCBhcGlSZWplY3Rpb24sIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBQcm94eWFibGUsIGRlYnVnKTtcbl9kZXJlcV8oJy4vbm9kZWlmeS5qcycpKFByb21pc2UpO1xuX2RlcmVxXygnLi9wcm9taXNpZnkuanMnKShQcm9taXNlLCBJTlRFUk5BTCk7XG5fZGVyZXFfKCcuL3Byb3BzLmpzJykoUHJvbWlzZSwgUHJvbWlzZUFycmF5LCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBhcGlSZWplY3Rpb24pO1xuX2RlcmVxXygnLi9yYWNlLmpzJykoUHJvbWlzZSwgSU5URVJOQUwsIHRyeUNvbnZlcnRUb1Byb21pc2UsIGFwaVJlamVjdGlvbik7XG5fZGVyZXFfKCcuL3JlZHVjZS5qcycpKFByb21pc2UsIFByb21pc2VBcnJheSwgYXBpUmVqZWN0aW9uLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBJTlRFUk5BTCwgZGVidWcpO1xuX2RlcmVxXygnLi9zZXR0bGUuanMnKShQcm9taXNlLCBQcm9taXNlQXJyYXksIGRlYnVnKTtcbl9kZXJlcV8oJy4vc29tZS5qcycpKFByb21pc2UsIFByb21pc2VBcnJheSwgYXBpUmVqZWN0aW9uKTtcbl9kZXJlcV8oJy4vZmlsdGVyLmpzJykoUHJvbWlzZSwgSU5URVJOQUwpO1xuX2RlcmVxXygnLi9lYWNoLmpzJykoUHJvbWlzZSwgSU5URVJOQUwpO1xuX2RlcmVxXygnLi9hbnkuanMnKShQcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHV0aWwudG9GYXN0UHJvcGVydGllcyhQcm9taXNlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB1dGlsLnRvRmFzdFByb3BlcnRpZXMoUHJvbWlzZS5wcm90b3R5cGUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgZnVuY3Rpb24gZmlsbFR5cGVzKHZhbHVlKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB2YXIgcCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgcC5fZnVsZmlsbG1lbnRIYW5kbGVyMCA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIHAuX3JlamVjdGlvbkhhbmRsZXIwID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBwLl9wcm9taXNlMCA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgcC5fcmVjZWl2ZXIwID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIC8vIENvbXBsZXRlIHNsYWNrIHRyYWNraW5nLCBvcHQgb3V0IG9mIGZpZWxkLXR5cGUgdHJhY2tpbmcgYW5kICAgICAgICAgICBcbiAgICAvLyBzdGFiaWxpemUgbWFwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgZmlsbFR5cGVzKHthOiAxfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGZpbGxUeXBlcyh7YjogMn0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBmaWxsVHlwZXMoe2M6IDN9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgZmlsbFR5cGVzKDEpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGZpbGxUeXBlcyhmdW5jdGlvbigpe30pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBmaWxsVHlwZXModW5kZWZpbmVkKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgZmlsbFR5cGVzKGZhbHNlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGZpbGxUeXBlcyhuZXcgUHJvbWlzZShJTlRFUk5BTCkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBkZWJ1Zy5zZXRCb3VuZHMoQXN5bmMuZmlyc3RMaW5lRXJyb3IsIHV0aWwubGFzdExpbmVFcnJvcik7ICAgICAgICAgICAgICAgXG4gICAgcmV0dXJuIFByb21pc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG59O1xuXG59LHtcIi4vYW55LmpzXCI6MSxcIi4vYXN5bmNcIjoyLFwiLi9iaW5kXCI6MyxcIi4vY2FsbF9nZXQuanNcIjo1LFwiLi9jYW5jZWxcIjo2LFwiLi9jYXRjaF9maWx0ZXJcIjo3LFwiLi9jb250ZXh0XCI6OCxcIi4vZGVidWdnYWJpbGl0eVwiOjksXCIuL2RpcmVjdF9yZXNvbHZlXCI6MTAsXCIuL2VhY2guanNcIjoxMSxcIi4vZXJyb3JzXCI6MTIsXCIuL2VzNVwiOjEzLFwiLi9maWx0ZXIuanNcIjoxNCxcIi4vZmluYWxseVwiOjE1LFwiLi9nZW5lcmF0b3JzLmpzXCI6MTYsXCIuL2pvaW5cIjoxNyxcIi4vbWFwLmpzXCI6MTgsXCIuL21ldGhvZFwiOjE5LFwiLi9ub2RlYmFja1wiOjIwLFwiLi9ub2RlaWZ5LmpzXCI6MjEsXCIuL3Byb21pc2VfYXJyYXlcIjoyMyxcIi4vcHJvbWlzaWZ5LmpzXCI6MjQsXCIuL3Byb3BzLmpzXCI6MjUsXCIuL3JhY2UuanNcIjoyNyxcIi4vcmVkdWNlLmpzXCI6MjgsXCIuL3NldHRsZS5qc1wiOjMwLFwiLi9zb21lLmpzXCI6MzEsXCIuL3N5bmNocm9ub3VzX2luc3BlY3Rpb25cIjozMixcIi4vdGhlbmFibGVzXCI6MzMsXCIuL3RpbWVycy5qc1wiOjM0LFwiLi91c2luZy5qc1wiOjM1LFwiLi91dGlsXCI6MzZ9XSwyMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwsIHRyeUNvbnZlcnRUb1Byb21pc2UsXG4gICAgYXBpUmVqZWN0aW9uLCBQcm94eWFibGUpIHtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBpc0FycmF5ID0gdXRpbC5pc0FycmF5O1xuXG5mdW5jdGlvbiB0b1Jlc29sdXRpb25WYWx1ZSh2YWwpIHtcbiAgICBzd2l0Y2godmFsKSB7XG4gICAgY2FzZSAtMjogcmV0dXJuIFtdO1xuICAgIGNhc2UgLTM6IHJldHVybiB7fTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIFByb21pc2VBcnJheSh2YWx1ZXMpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgaWYgKHZhbHVlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcHJvbWlzZS5fcHJvcGFnYXRlRnJvbSh2YWx1ZXMsIDMpO1xuICAgIH1cbiAgICBwcm9taXNlLl9zZXRPbkNhbmNlbCh0aGlzKTtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5fbGVuZ3RoID0gMDtcbiAgICB0aGlzLl90b3RhbFJlc29sdmVkID0gMDtcbiAgICB0aGlzLl9pbml0KHVuZGVmaW5lZCwgLTIpO1xufVxudXRpbC5pbmhlcml0cyhQcm9taXNlQXJyYXksIFByb3h5YWJsZSk7XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gaW5pdChfLCByZXNvbHZlVmFsdWVJZkVtcHR5KSB7XG4gICAgdmFyIHZhbHVlcyA9IHRyeUNvbnZlcnRUb1Byb21pc2UodGhpcy5fdmFsdWVzLCB0aGlzLl9wcm9taXNlKTtcbiAgICBpZiAodmFsdWVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuX3RhcmdldCgpO1xuICAgICAgICB2YXIgYml0RmllbGQgPSB2YWx1ZXMuX2JpdEZpZWxkO1xuICAgICAgICA7XG4gICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcblxuICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcy5fdGhlbihcbiAgICAgICAgICAgICAgICBpbml0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3JlamVjdCxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICByZXNvbHZlVmFsdWVJZkVtcHR5XG4gICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5fdmFsdWUoKTtcbiAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlamVjdCh2YWx1ZXMuX3JlYXNvbigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWx1ZXMgPSB1dGlsLmFzQXJyYXkodmFsdWVzKTtcbiAgICBpZiAodmFsdWVzID09PSBudWxsKSB7XG4gICAgICAgIHZhciBlcnIgPSBhcGlSZWplY3Rpb24oXG4gICAgICAgICAgICBcImV4cGVjdGluZyBhbiBhcnJheSBvciBhbiBpdGVyYWJsZSBvYmplY3QgYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcodmFsdWVzKSkucmVhc29uKCk7XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3JlamVjdENhbGxiYWNrKGVyciwgZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHJlc29sdmVWYWx1ZUlmRW1wdHkgPT09IC01KSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlRW1wdHlBcnJheSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSh0b1Jlc29sdXRpb25WYWx1ZShyZXNvbHZlVmFsdWVJZkVtcHR5KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pdGVyYXRlKHZhbHVlcyk7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9pdGVyYXRlID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMuZ2V0QWN0dWFsTGVuZ3RoKHZhbHVlcy5sZW5ndGgpO1xuICAgIHRoaXMuX2xlbmd0aCA9IGxlbjtcbiAgICB0aGlzLl92YWx1ZXMgPSB0aGlzLnNob3VsZENvcHlWYWx1ZXMoKSA/IG5ldyBBcnJheShsZW4pIDogdGhpcy5fdmFsdWVzO1xuICAgIHZhciByZXN1bHQgPSB0aGlzLl9wcm9taXNlO1xuICAgIHZhciBpc1Jlc29sdmVkID0gZmFsc2U7XG4gICAgdmFyIGJpdEZpZWxkID0gbnVsbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHZhbHVlc1tpXSwgcmVzdWx0KTtcblxuICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgbWF5YmVQcm9taXNlID0gbWF5YmVQcm9taXNlLl90YXJnZXQoKTtcbiAgICAgICAgICAgIGJpdEZpZWxkID0gbWF5YmVQcm9taXNlLl9iaXRGaWVsZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJpdEZpZWxkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1Jlc29sdmVkKSB7XG4gICAgICAgICAgICBpZiAoYml0RmllbGQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtYXliZVByb21pc2Uuc3VwcHJlc3NVbmhhbmRsZWRSZWplY3Rpb25zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYml0RmllbGQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICgoKGJpdEZpZWxkICYgNTAzOTcxODQpID09PSAwKSkge1xuICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fcHJveHkodGhpcywgaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzW2ldID0gbWF5YmVQcm9taXNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xuICAgICAgICAgICAgICAgIGlzUmVzb2x2ZWQgPSB0aGlzLl9wcm9taXNlRnVsZmlsbGVkKG1heWJlUHJvbWlzZS5fdmFsdWUoKSwgaSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgaXNSZXNvbHZlZCA9IHRoaXMuX3Byb21pc2VSZWplY3RlZChtYXliZVByb21pc2UuX3JlYXNvbigpLCBpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXNSZXNvbHZlZCA9IHRoaXMuX3Byb21pc2VDYW5jZWxsZWQoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpc1Jlc29sdmVkID0gdGhpcy5fcHJvbWlzZUZ1bGZpbGxlZChtYXliZVByb21pc2UsIGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghaXNSZXNvbHZlZCkgcmVzdWx0Ll9zZXRBc3luY0d1YXJhbnRlZWQoKTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX2lzUmVzb2x2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlcyA9PT0gbnVsbDtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZXMgPSBudWxsO1xuICAgIHRoaXMuX3Byb21pc2UuX2Z1bGZpbGwodmFsdWUpO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSB8fCAhdGhpcy5fcHJvbWlzZS5faXNDYW5jZWxsYWJsZSgpKSByZXR1cm47XG4gICAgdGhpcy5fdmFsdWVzID0gbnVsbDtcbiAgICB0aGlzLl9wcm9taXNlLl9jYW5jZWwoKTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3JlamVjdCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICB0aGlzLl92YWx1ZXMgPSBudWxsO1xuICAgIHRoaXMuX3Byb21pc2UuX3JlamVjdENhbGxiYWNrKHJlYXNvbiwgZmFsc2UpO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICB0aGlzLl92YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgdmFyIHRvdGFsUmVzb2x2ZWQgPSArK3RoaXMuX3RvdGFsUmVzb2x2ZWQ7XG4gICAgaWYgKHRvdGFsUmVzb2x2ZWQgPj0gdGhpcy5fbGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9jYW5jZWwoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VSZWplY3RlZCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICB0aGlzLl90b3RhbFJlc29sdmVkKys7XG4gICAgdGhpcy5fcmVqZWN0KHJlYXNvbik7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm47XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICB0aGlzLl9jYW5jZWwoKTtcbiAgICBpZiAodmFsdWVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB2YWx1ZXMuY2FuY2VsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZXNbaV0gaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzW2ldLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5zaG91bGRDb3B5VmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5nZXRBY3R1YWxMZW5ndGggPSBmdW5jdGlvbiAobGVuKSB7XG4gICAgcmV0dXJuIGxlbjtcbn07XG5cbnJldHVybiBQcm9taXNlQXJyYXk7XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMjQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMKSB7XG52YXIgVEhJUyA9IHt9O1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIG5vZGViYWNrRm9yUHJvbWlzZSA9IF9kZXJlcV8oXCIuL25vZGViYWNrXCIpO1xudmFyIHdpdGhBcHBlbmRlZCA9IHV0aWwud2l0aEFwcGVuZGVkO1xudmFyIG1heWJlV3JhcEFzRXJyb3IgPSB1dGlsLm1heWJlV3JhcEFzRXJyb3I7XG52YXIgY2FuRXZhbHVhdGUgPSB1dGlsLmNhbkV2YWx1YXRlO1xudmFyIFR5cGVFcnJvciA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKS5UeXBlRXJyb3I7XG52YXIgZGVmYXVsdFN1ZmZpeCA9IFwiQXN5bmNcIjtcbnZhciBkZWZhdWx0UHJvbWlzaWZpZWQgPSB7X19pc1Byb21pc2lmaWVkX186IHRydWV9O1xudmFyIG5vQ29weVByb3BzID0gW1xuICAgIFwiYXJpdHlcIiwgICAgXCJsZW5ndGhcIixcbiAgICBcIm5hbWVcIixcbiAgICBcImFyZ3VtZW50c1wiLFxuICAgIFwiY2FsbGVyXCIsXG4gICAgXCJjYWxsZWVcIixcbiAgICBcInByb3RvdHlwZVwiLFxuICAgIFwiX19pc1Byb21pc2lmaWVkX19cIlxuXTtcbnZhciBub0NvcHlQcm9wc1BhdHRlcm4gPSBuZXcgUmVnRXhwKFwiXig/OlwiICsgbm9Db3B5UHJvcHMuam9pbihcInxcIikgKyBcIikkXCIpO1xuXG52YXIgZGVmYXVsdEZpbHRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdXRpbC5pc0lkZW50aWZpZXIobmFtZSkgJiZcbiAgICAgICAgbmFtZS5jaGFyQXQoMCkgIT09IFwiX1wiICYmXG4gICAgICAgIG5hbWUgIT09IFwiY29uc3RydWN0b3JcIjtcbn07XG5cbmZ1bmN0aW9uIHByb3BzRmlsdGVyKGtleSkge1xuICAgIHJldHVybiAhbm9Db3B5UHJvcHNQYXR0ZXJuLnRlc3Qoa2V5KTtcbn1cblxuZnVuY3Rpb24gaXNQcm9taXNpZmllZChmbikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmbi5fX2lzUHJvbWlzaWZpZWRfXyA9PT0gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFzUHJvbWlzaWZpZWQob2JqLCBrZXksIHN1ZmZpeCkge1xuICAgIHZhciB2YWwgPSB1dGlsLmdldERhdGFQcm9wZXJ0eU9yRGVmYXVsdChvYmosIGtleSArIHN1ZmZpeCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb21pc2lmaWVkKTtcbiAgICByZXR1cm4gdmFsID8gaXNQcm9taXNpZmllZCh2YWwpIDogZmFsc2U7XG59XG5mdW5jdGlvbiBjaGVja1ZhbGlkKHJldCwgc3VmZml4LCBzdWZmaXhSZWdleHApIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICB2YXIga2V5ID0gcmV0W2ldO1xuICAgICAgICBpZiAoc3VmZml4UmVnZXhwLnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgdmFyIGtleVdpdGhvdXRBc3luY1N1ZmZpeCA9IGtleS5yZXBsYWNlKHN1ZmZpeFJlZ2V4cCwgXCJcIik7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJldC5sZW5ndGg7IGogKz0gMikge1xuICAgICAgICAgICAgICAgIGlmIChyZXRbal0gPT09IGtleVdpdGhvdXRBc3luY1N1ZmZpeCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHByb21pc2lmeSBhbiBBUEkgdGhhdCBoYXMgbm9ybWFsIG1ldGhvZHMgd2l0aCAnJXMnLXN1ZmZpeFxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCIlc1wiLCBzdWZmaXgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByb21pc2lmaWFibGVNZXRob2RzKG9iaiwgc3VmZml4LCBzdWZmaXhSZWdleHAsIGZpbHRlcikge1xuICAgIHZhciBrZXlzID0gdXRpbC5pbmhlcml0ZWREYXRhS2V5cyhvYmopO1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICB2YXIgcGFzc2VzRGVmYXVsdEZpbHRlciA9IGZpbHRlciA9PT0gZGVmYXVsdEZpbHRlclxuICAgICAgICAgICAgPyB0cnVlIDogZGVmYXVsdEZpbHRlcihrZXksIHZhbHVlLCBvYmopO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgICFpc1Byb21pc2lmaWVkKHZhbHVlKSAmJlxuICAgICAgICAgICAgIWhhc1Byb21pc2lmaWVkKG9iaiwga2V5LCBzdWZmaXgpICYmXG4gICAgICAgICAgICBmaWx0ZXIoa2V5LCB2YWx1ZSwgb2JqLCBwYXNzZXNEZWZhdWx0RmlsdGVyKSkge1xuICAgICAgICAgICAgcmV0LnB1c2goa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tWYWxpZChyZXQsIHN1ZmZpeCwgc3VmZml4UmVnZXhwKTtcbiAgICByZXR1cm4gcmV0O1xufVxuXG52YXIgZXNjYXBlSWRlbnRSZWdleCA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFskXSkvLCBcIlxcXFwkXCIpO1xufTtcblxudmFyIG1ha2VOb2RlUHJvbWlzaWZpZWRFdmFsO1xuaWYgKCF0cnVlKSB7XG52YXIgc3dpdGNoQ2FzZUFyZ3VtZW50T3JkZXIgPSBmdW5jdGlvbihsaWtlbHlBcmd1bWVudENvdW50KSB7XG4gICAgdmFyIHJldCA9IFtsaWtlbHlBcmd1bWVudENvdW50XTtcbiAgICB2YXIgbWluID0gTWF0aC5tYXgoMCwgbGlrZWx5QXJndW1lbnRDb3VudCAtIDEgLSAzKTtcbiAgICBmb3IodmFyIGkgPSBsaWtlbHlBcmd1bWVudENvdW50IC0gMTsgaSA+PSBtaW47IC0taSkge1xuICAgICAgICByZXQucHVzaChpKTtcbiAgICB9XG4gICAgZm9yKHZhciBpID0gbGlrZWx5QXJndW1lbnRDb3VudCArIDE7IGkgPD0gMzsgKytpKSB7XG4gICAgICAgIHJldC5wdXNoKGkpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxudmFyIGFyZ3VtZW50U2VxdWVuY2UgPSBmdW5jdGlvbihhcmd1bWVudENvdW50KSB7XG4gICAgcmV0dXJuIHV0aWwuZmlsbGVkUmFuZ2UoYXJndW1lbnRDb3VudCwgXCJfYXJnXCIsIFwiXCIpO1xufTtcblxudmFyIHBhcmFtZXRlckRlY2xhcmF0aW9uID0gZnVuY3Rpb24ocGFyYW1ldGVyQ291bnQpIHtcbiAgICByZXR1cm4gdXRpbC5maWxsZWRSYW5nZShcbiAgICAgICAgTWF0aC5tYXgocGFyYW1ldGVyQ291bnQsIDMpLCBcIl9hcmdcIiwgXCJcIik7XG59O1xuXG52YXIgcGFyYW1ldGVyQ291bnQgPSBmdW5jdGlvbihmbikge1xuICAgIGlmICh0eXBlb2YgZm4ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihmbi5sZW5ndGgsIDEwMjMgKyAxKSwgMCk7XG4gICAgfVxuICAgIHJldHVybiAwO1xufTtcblxubWFrZU5vZGVQcm9taXNpZmllZEV2YWwgPVxuZnVuY3Rpb24oY2FsbGJhY2ssIHJlY2VpdmVyLCBvcmlnaW5hbE5hbWUsIGZuLCBfLCBtdWx0aUFyZ3MpIHtcbiAgICB2YXIgbmV3UGFyYW1ldGVyQ291bnQgPSBNYXRoLm1heCgwLCBwYXJhbWV0ZXJDb3VudChmbikgLSAxKTtcbiAgICB2YXIgYXJndW1lbnRPcmRlciA9IHN3aXRjaENhc2VBcmd1bWVudE9yZGVyKG5ld1BhcmFtZXRlckNvdW50KTtcbiAgICB2YXIgc2hvdWxkUHJveHlUaGlzID0gdHlwZW9mIGNhbGxiYWNrID09PSBcInN0cmluZ1wiIHx8IHJlY2VpdmVyID09PSBUSElTO1xuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVDYWxsRm9yQXJndW1lbnRDb3VudChjb3VudCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50U2VxdWVuY2UoY291bnQpLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgdmFyIGNvbW1hID0gY291bnQgPiAwID8gXCIsIFwiIDogXCJcIjtcbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgaWYgKHNob3VsZFByb3h5VGhpcykge1xuICAgICAgICAgICAgcmV0ID0gXCJyZXQgPSBjYWxsYmFjay5jYWxsKHRoaXMsIHt7YXJnc319LCBub2RlYmFjayk7IGJyZWFrO1xcblwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0ID0gcmVjZWl2ZXIgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgID8gXCJyZXQgPSBjYWxsYmFjayh7e2FyZ3N9fSwgbm9kZWJhY2spOyBicmVhaztcXG5cIlxuICAgICAgICAgICAgICAgIDogXCJyZXQgPSBjYWxsYmFjay5jYWxsKHJlY2VpdmVyLCB7e2FyZ3N9fSwgbm9kZWJhY2spOyBicmVhaztcXG5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0LnJlcGxhY2UoXCJ7e2FyZ3N9fVwiLCBhcmdzKS5yZXBsYWNlKFwiLCBcIiwgY29tbWEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlQXJndW1lbnRTd2l0Y2hDYXNlKCkge1xuICAgICAgICB2YXIgcmV0ID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudE9yZGVyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICByZXQgKz0gXCJjYXNlIFwiICsgYXJndW1lbnRPcmRlcltpXSArXCI6XCIgK1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlQ2FsbEZvckFyZ3VtZW50Q291bnQoYXJndW1lbnRPcmRlcltpXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXQgKz0gXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgZGVmYXVsdDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGxlbiArIDEpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHZhciBpID0gMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGFyZ3NbaV0gPSBub2RlYmFjazsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFtDb2RlRm9yQ2FsbF0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgXCIucmVwbGFjZShcIltDb2RlRm9yQ2FsbF1cIiwgKHNob3VsZFByb3h5VGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwicmV0ID0gY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInJldCA9IGNhbGxiYWNrLmFwcGx5KHJlY2VpdmVyLCBhcmdzKTtcXG5cIikpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIHZhciBnZXRGdW5jdGlvbkNvZGUgPSB0eXBlb2YgY2FsbGJhY2sgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoXCJ0aGlzICE9IG51bGwgPyB0aGlzWydcIitjYWxsYmFjaytcIiddIDogZm5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImZuXCI7XG4gICAgdmFyIGJvZHkgPSBcIid1c2Ugc3RyaWN0JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICB2YXIgcmV0ID0gZnVuY3Rpb24gKFBhcmFtZXRlcnMpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgcHJvbWlzZS5fY2FwdHVyZVN0YWNrVHJhY2UoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgdmFyIG5vZGViYWNrID0gbm9kZWJhY2tGb3JQcm9taXNlKHByb21pc2UsIFwiICsgbXVsdGlBcmdzICsgXCIpOyAgIFxcblxcXG4gICAgICAgICAgICB2YXIgcmV0OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSB0cnlDYXRjaChbR2V0RnVuY3Rpb25Db2RlXSk7ICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBzd2l0Y2gobGVuKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgW0NvZGVGb3JTd2l0Y2hDYXNlXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBpZiAocmV0ID09PSBlcnJvck9iaikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2sobWF5YmVXcmFwQXNFcnJvcihyZXQuZSksIHRydWUsIHRydWUpO1xcblxcXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBpZiAoIXByb21pc2UuX2lzRmF0ZVNlYWxlZCgpKSBwcm9taXNlLl9zZXRBc3luY0d1YXJhbnRlZWQoKTsgICAgIFxcblxcXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIG5vdEVudW1lcmFibGVQcm9wKHJldCwgJ19faXNQcm9taXNpZmllZF9fJywgdHJ1ZSk7ICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIHJldHVybiByZXQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgXCIucmVwbGFjZShcIltDb2RlRm9yU3dpdGNoQ2FzZV1cIiwgZ2VuZXJhdGVBcmd1bWVudFN3aXRjaENhc2UoKSlcbiAgICAgICAgLnJlcGxhY2UoXCJbR2V0RnVuY3Rpb25Db2RlXVwiLCBnZXRGdW5jdGlvbkNvZGUpO1xuICAgIGJvZHkgPSBib2R5LnJlcGxhY2UoXCJQYXJhbWV0ZXJzXCIsIHBhcmFtZXRlckRlY2xhcmF0aW9uKG5ld1BhcmFtZXRlckNvdW50KSk7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcIlByb21pc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjZWl2ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2l0aEFwcGVuZGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1heWJlV3JhcEFzRXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm9kZWJhY2tGb3JQcm9taXNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRyeUNhdGNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVycm9yT2JqXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdEVudW1lcmFibGVQcm9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIklOVEVSTkFMXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5KShcbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgZm4sXG4gICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyLFxuICAgICAgICAgICAgICAgICAgICB3aXRoQXBwZW5kZWQsXG4gICAgICAgICAgICAgICAgICAgIG1heWJlV3JhcEFzRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIG5vZGViYWNrRm9yUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgdXRpbC50cnlDYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5lcnJvck9iaixcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcCxcbiAgICAgICAgICAgICAgICAgICAgSU5URVJOQUwpO1xufTtcbn1cblxuZnVuY3Rpb24gbWFrZU5vZGVQcm9taXNpZmllZENsb3N1cmUoY2FsbGJhY2ssIHJlY2VpdmVyLCBfLCBmbiwgX18sIG11bHRpQXJncykge1xuICAgIHZhciBkZWZhdWx0VGhpcyA9IChmdW5jdGlvbigpIHtyZXR1cm4gdGhpczt9KSgpO1xuICAgIHZhciBtZXRob2QgPSBjYWxsYmFjaztcbiAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjYWxsYmFjayA9IGZuO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcm9taXNpZmllZCgpIHtcbiAgICAgICAgdmFyIF9yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICBpZiAocmVjZWl2ZXIgPT09IFRISVMpIF9yZWNlaXZlciA9IHRoaXM7XG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICBwcm9taXNlLl9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgICAgICB2YXIgY2IgPSB0eXBlb2YgbWV0aG9kID09PSBcInN0cmluZ1wiICYmIHRoaXMgIT09IGRlZmF1bHRUaGlzXG4gICAgICAgICAgICA/IHRoaXNbbWV0aG9kXSA6IGNhbGxiYWNrO1xuICAgICAgICB2YXIgZm4gPSBub2RlYmFja0ZvclByb21pc2UocHJvbWlzZSwgbXVsdGlBcmdzKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNiLmFwcGx5KF9yZWNlaXZlciwgd2l0aEFwcGVuZGVkKGFyZ3VtZW50cywgZm4pKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBwcm9taXNlLl9yZWplY3RDYWxsYmFjayhtYXliZVdyYXBBc0Vycm9yKGUpLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByb21pc2UuX2lzRmF0ZVNlYWxlZCgpKSBwcm9taXNlLl9zZXRBc3luY0d1YXJhbnRlZWQoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHV0aWwubm90RW51bWVyYWJsZVByb3AocHJvbWlzaWZpZWQsIFwiX19pc1Byb21pc2lmaWVkX19cIiwgdHJ1ZSk7XG4gICAgcmV0dXJuIHByb21pc2lmaWVkO1xufVxuXG52YXIgbWFrZU5vZGVQcm9taXNpZmllZCA9IGNhbkV2YWx1YXRlXG4gICAgPyBtYWtlTm9kZVByb21pc2lmaWVkRXZhbFxuICAgIDogbWFrZU5vZGVQcm9taXNpZmllZENsb3N1cmU7XG5cbmZ1bmN0aW9uIHByb21pc2lmeUFsbChvYmosIHN1ZmZpeCwgZmlsdGVyLCBwcm9taXNpZmllciwgbXVsdGlBcmdzKSB7XG4gICAgdmFyIHN1ZmZpeFJlZ2V4cCA9IG5ldyBSZWdFeHAoZXNjYXBlSWRlbnRSZWdleChzdWZmaXgpICsgXCIkXCIpO1xuICAgIHZhciBtZXRob2RzID1cbiAgICAgICAgcHJvbWlzaWZpYWJsZU1ldGhvZHMob2JqLCBzdWZmaXgsIHN1ZmZpeFJlZ2V4cCwgZmlsdGVyKTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBtZXRob2RzLmxlbmd0aDsgaSA8IGxlbjsgaSs9IDIpIHtcbiAgICAgICAgdmFyIGtleSA9IG1ldGhvZHNbaV07XG4gICAgICAgIHZhciBmbiA9IG1ldGhvZHNbaSsxXTtcbiAgICAgICAgdmFyIHByb21pc2lmaWVkS2V5ID0ga2V5ICsgc3VmZml4O1xuICAgICAgICBpZiAocHJvbWlzaWZpZXIgPT09IG1ha2VOb2RlUHJvbWlzaWZpZWQpIHtcbiAgICAgICAgICAgIG9ialtwcm9taXNpZmllZEtleV0gPVxuICAgICAgICAgICAgICAgIG1ha2VOb2RlUHJvbWlzaWZpZWQoa2V5LCBUSElTLCBrZXksIGZuLCBzdWZmaXgsIG11bHRpQXJncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzaWZpZWQgPSBwcm9taXNpZmllcihmbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ha2VOb2RlUHJvbWlzaWZpZWQoa2V5LCBUSElTLCBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4sIHN1ZmZpeCwgbXVsdGlBcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcChwcm9taXNpZmllZCwgXCJfX2lzUHJvbWlzaWZpZWRfX1wiLCB0cnVlKTtcbiAgICAgICAgICAgIG9ialtwcm9taXNpZmllZEtleV0gPSBwcm9taXNpZmllZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1dGlsLnRvRmFzdFByb3BlcnRpZXMob2JqKTtcbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBwcm9taXNpZnkoY2FsbGJhY2ssIHJlY2VpdmVyLCBtdWx0aUFyZ3MpIHtcbiAgICByZXR1cm4gbWFrZU5vZGVQcm9taXNpZmllZChjYWxsYmFjaywgcmVjZWl2ZXIsIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2ssIG51bGwsIG11bHRpQXJncyk7XG59XG5cblByb21pc2UucHJvbWlzaWZ5ID0gZnVuY3Rpb24gKGZuLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgIH1cbiAgICBpZiAoaXNQcm9taXNpZmllZChmbikpIHtcbiAgICAgICAgcmV0dXJuIGZuO1xuICAgIH1cbiAgICBvcHRpb25zID0gT2JqZWN0KG9wdGlvbnMpO1xuICAgIHZhciByZWNlaXZlciA9IG9wdGlvbnMuY29udGV4dCA9PT0gdW5kZWZpbmVkID8gVEhJUyA6IG9wdGlvbnMuY29udGV4dDtcbiAgICB2YXIgbXVsdGlBcmdzID0gISFvcHRpb25zLm11bHRpQXJncztcbiAgICB2YXIgcmV0ID0gcHJvbWlzaWZ5KGZuLCByZWNlaXZlciwgbXVsdGlBcmdzKTtcbiAgICB1dGlsLmNvcHlEZXNjcmlwdG9ycyhmbiwgcmV0LCBwcm9wc0ZpbHRlcik7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvbWlzaWZ5QWxsID0gZnVuY3Rpb24gKHRhcmdldCwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGhlIHRhcmdldCBvZiBwcm9taXNpZnlBbGwgbXVzdCBiZSBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvblxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBPYmplY3Qob3B0aW9ucyk7XG4gICAgdmFyIG11bHRpQXJncyA9ICEhb3B0aW9ucy5tdWx0aUFyZ3M7XG4gICAgdmFyIHN1ZmZpeCA9IG9wdGlvbnMuc3VmZml4O1xuICAgIGlmICh0eXBlb2Ygc3VmZml4ICE9PSBcInN0cmluZ1wiKSBzdWZmaXggPSBkZWZhdWx0U3VmZml4O1xuICAgIHZhciBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICBpZiAodHlwZW9mIGZpbHRlciAhPT0gXCJmdW5jdGlvblwiKSBmaWx0ZXIgPSBkZWZhdWx0RmlsdGVyO1xuICAgIHZhciBwcm9taXNpZmllciA9IG9wdGlvbnMucHJvbWlzaWZpZXI7XG4gICAgaWYgKHR5cGVvZiBwcm9taXNpZmllciAhPT0gXCJmdW5jdGlvblwiKSBwcm9taXNpZmllciA9IG1ha2VOb2RlUHJvbWlzaWZpZWQ7XG5cbiAgICBpZiAoIXV0aWwuaXNJZGVudGlmaWVyKHN1ZmZpeCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJzdWZmaXggbXVzdCBiZSBhIHZhbGlkIGlkZW50aWZpZXJcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gdXRpbC5pbmhlcml0ZWREYXRhS2V5cyh0YXJnZXQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0YXJnZXRba2V5c1tpXV07XG4gICAgICAgIGlmIChrZXlzW2ldICE9PSBcImNvbnN0cnVjdG9yXCIgJiZcbiAgICAgICAgICAgIHV0aWwuaXNDbGFzcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHByb21pc2lmeUFsbCh2YWx1ZS5wcm90b3R5cGUsIHN1ZmZpeCwgZmlsdGVyLCBwcm9taXNpZmllcixcbiAgICAgICAgICAgICAgICBtdWx0aUFyZ3MpO1xuICAgICAgICAgICAgcHJvbWlzaWZ5QWxsKHZhbHVlLCBzdWZmaXgsIGZpbHRlciwgcHJvbWlzaWZpZXIsIG11bHRpQXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzaWZ5QWxsKHRhcmdldCwgc3VmZml4LCBmaWx0ZXIsIHByb21pc2lmaWVyLCBtdWx0aUFyZ3MpO1xufTtcbn07XG5cblxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi9ub2RlYmFja1wiOjIwLFwiLi91dGlsXCI6MzZ9XSwyNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oXG4gICAgUHJvbWlzZSwgUHJvbWlzZUFycmF5LCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBhcGlSZWplY3Rpb24pIHtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBpc09iamVjdCA9IHV0aWwuaXNPYmplY3Q7XG52YXIgZXM1ID0gX2RlcmVxXyhcIi4vZXM1XCIpO1xudmFyIEVzNk1hcDtcbmlmICh0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIpIEVzNk1hcCA9IE1hcDtcblxudmFyIG1hcFRvRW50cmllcyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzaXplID0gMDtcblxuICAgIGZ1bmN0aW9uIGV4dHJhY3RFbnRyeSh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHRoaXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIHRoaXNbaW5kZXggKyBzaXplXSA9IGtleTtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbWFwVG9FbnRyaWVzKG1hcCkge1xuICAgICAgICBzaXplID0gbWFwLnNpemU7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgdmFyIHJldCA9IG5ldyBBcnJheShtYXAuc2l6ZSAqIDIpO1xuICAgICAgICBtYXAuZm9yRWFjaChleHRyYWN0RW50cnksIHJldCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbn0pKCk7XG5cbnZhciBlbnRyaWVzVG9NYXAgPSBmdW5jdGlvbihlbnRyaWVzKSB7XG4gICAgdmFyIHJldCA9IG5ldyBFczZNYXAoKTtcbiAgICB2YXIgbGVuZ3RoID0gZW50cmllcy5sZW5ndGggLyAyIHwgMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBlbnRyaWVzW2xlbmd0aCArIGldO1xuICAgICAgICB2YXIgdmFsdWUgPSBlbnRyaWVzW2ldO1xuICAgICAgICByZXQuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gUHJvcGVydGllc1Byb21pc2VBcnJheShvYmopIHtcbiAgICB2YXIgaXNNYXAgPSBmYWxzZTtcbiAgICB2YXIgZW50cmllcztcbiAgICBpZiAoRXM2TWFwICE9PSB1bmRlZmluZWQgJiYgb2JqIGluc3RhbmNlb2YgRXM2TWFwKSB7XG4gICAgICAgIGVudHJpZXMgPSBtYXBUb0VudHJpZXMob2JqKTtcbiAgICAgICAgaXNNYXAgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gZXM1LmtleXMob2JqKTtcbiAgICAgICAgdmFyIGxlbiA9IGtleXMubGVuZ3RoO1xuICAgICAgICBlbnRyaWVzID0gbmV3IEFycmF5KGxlbiAqIDIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIGVudHJpZXNbaV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGVudHJpZXNbaSArIGxlbl0gPSBrZXk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb25zdHJ1Y3RvciQoZW50cmllcyk7XG4gICAgdGhpcy5faXNNYXAgPSBpc01hcDtcbiAgICB0aGlzLl9pbml0JCh1bmRlZmluZWQsIC0zKTtcbn1cbnV0aWwuaW5oZXJpdHMoUHJvcGVydGllc1Byb21pc2VBcnJheSwgUHJvbWlzZUFycmF5KTtcblxuUHJvcGVydGllc1Byb21pc2VBcnJheS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuUHJvcGVydGllc1Byb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XG4gICAgdGhpcy5fdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgIHZhciB0b3RhbFJlc29sdmVkID0gKyt0aGlzLl90b3RhbFJlc29sdmVkO1xuICAgIGlmICh0b3RhbFJlc29sdmVkID49IHRoaXMuX2xlbmd0aCkge1xuICAgICAgICB2YXIgdmFsO1xuICAgICAgICBpZiAodGhpcy5faXNNYXApIHtcbiAgICAgICAgICAgIHZhbCA9IGVudHJpZXNUb01hcCh0aGlzLl92YWx1ZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsID0ge307XG4gICAgICAgICAgICB2YXIga2V5T2Zmc2V0ID0gdGhpcy5sZW5ndGgoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmxlbmd0aCgpOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YWxbdGhpcy5fdmFsdWVzW2kgKyBrZXlPZmZzZXRdXSA9IHRoaXMuX3ZhbHVlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXNvbHZlKHZhbCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5Qcm9wZXJ0aWVzUHJvbWlzZUFycmF5LnByb3RvdHlwZS5zaG91bGRDb3B5VmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblByb3BlcnRpZXNQcm9taXNlQXJyYXkucHJvdG90eXBlLmdldEFjdHVhbExlbmd0aCA9IGZ1bmN0aW9uIChsZW4pIHtcbiAgICByZXR1cm4gbGVuID4+IDE7XG59O1xuXG5mdW5jdGlvbiBwcm9wcyhwcm9taXNlcykge1xuICAgIHZhciByZXQ7XG4gICAgdmFyIGNhc3RWYWx1ZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UocHJvbWlzZXMpO1xuXG4gICAgaWYgKCFpc09iamVjdChjYXN0VmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJjYW5ub3QgYXdhaXQgcHJvcGVydGllcyBvZiBhIG5vbi1vYmplY3RcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH0gZWxzZSBpZiAoY2FzdFZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICByZXQgPSBjYXN0VmFsdWUuX3RoZW4oXG4gICAgICAgICAgICBQcm9taXNlLnByb3BzLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IG5ldyBQcm9wZXJ0aWVzUHJvbWlzZUFycmF5KGNhc3RWYWx1ZSkucHJvbWlzZSgpO1xuICAgIH1cblxuICAgIGlmIChjYXN0VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHJldC5fcHJvcGFnYXRlRnJvbShjYXN0VmFsdWUsIDIpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5wcm9wcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvcHModGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3BzID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gICAgcmV0dXJuIHByb3BzKHByb21pc2VzKTtcbn07XG59O1xuXG59LHtcIi4vZXM1XCI6MTMsXCIuL3V0aWxcIjozNn1dLDI2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gYXJyYXlNb3ZlKHNyYywgc3JjSW5kZXgsIGRzdCwgZHN0SW5kZXgsIGxlbikge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGVuOyArK2opIHtcbiAgICAgICAgZHN0W2ogKyBkc3RJbmRleF0gPSBzcmNbaiArIHNyY0luZGV4XTtcbiAgICAgICAgc3JjW2ogKyBzcmNJbmRleF0gPSB2b2lkIDA7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBRdWV1ZShjYXBhY2l0eSkge1xuICAgIHRoaXMuX2NhcGFjaXR5ID0gY2FwYWNpdHk7XG4gICAgdGhpcy5fbGVuZ3RoID0gMDtcbiAgICB0aGlzLl9mcm9udCA9IDA7XG59XG5cblF1ZXVlLnByb3RvdHlwZS5fd2lsbEJlT3ZlckNhcGFjaXR5ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FwYWNpdHkgPCBzaXplO1xufTtcblxuUXVldWUucHJvdG90eXBlLl9wdXNoT25lID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuICAgIHRoaXMuX2NoZWNrQ2FwYWNpdHkobGVuZ3RoICsgMSk7XG4gICAgdmFyIGkgPSAodGhpcy5fZnJvbnQgKyBsZW5ndGgpICYgKHRoaXMuX2NhcGFjaXR5IC0gMSk7XG4gICAgdGhpc1tpXSA9IGFyZztcbiAgICB0aGlzLl9sZW5ndGggPSBsZW5ndGggKyAxO1xufTtcblxuUXVldWUucHJvdG90eXBlLl91bnNoaWZ0T25lID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgY2FwYWNpdHkgPSB0aGlzLl9jYXBhY2l0eTtcbiAgICB0aGlzLl9jaGVja0NhcGFjaXR5KHRoaXMubGVuZ3RoKCkgKyAxKTtcbiAgICB2YXIgZnJvbnQgPSB0aGlzLl9mcm9udDtcbiAgICB2YXIgaSA9ICgoKCggZnJvbnQgLSAxICkgJlxuICAgICAgICAgICAgICAgICAgICAoIGNhcGFjaXR5IC0gMSkgKSBeIGNhcGFjaXR5ICkgLSBjYXBhY2l0eSApO1xuICAgIHRoaXNbaV0gPSB2YWx1ZTtcbiAgICB0aGlzLl9mcm9udCA9IGk7XG4gICAgdGhpcy5fbGVuZ3RoID0gdGhpcy5sZW5ndGgoKSArIDE7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uKGZuLCByZWNlaXZlciwgYXJnKSB7XG4gICAgdGhpcy5fdW5zaGlmdE9uZShhcmcpO1xuICAgIHRoaXMuX3Vuc2hpZnRPbmUocmVjZWl2ZXIpO1xuICAgIHRoaXMuX3Vuc2hpZnRPbmUoZm4pO1xufTtcblxuUXVldWUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGgoKSArIDM7XG4gICAgaWYgKHRoaXMuX3dpbGxCZU92ZXJDYXBhY2l0eShsZW5ndGgpKSB7XG4gICAgICAgIHRoaXMuX3B1c2hPbmUoZm4pO1xuICAgICAgICB0aGlzLl9wdXNoT25lKHJlY2VpdmVyKTtcbiAgICAgICAgdGhpcy5fcHVzaE9uZShhcmcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBqID0gdGhpcy5fZnJvbnQgKyBsZW5ndGggLSAzO1xuICAgIHRoaXMuX2NoZWNrQ2FwYWNpdHkobGVuZ3RoKTtcbiAgICB2YXIgd3JhcE1hc2sgPSB0aGlzLl9jYXBhY2l0eSAtIDE7XG4gICAgdGhpc1soaiArIDApICYgd3JhcE1hc2tdID0gZm47XG4gICAgdGhpc1soaiArIDEpICYgd3JhcE1hc2tdID0gcmVjZWl2ZXI7XG4gICAgdGhpc1soaiArIDIpICYgd3JhcE1hc2tdID0gYXJnO1xuICAgIHRoaXMuX2xlbmd0aCA9IGxlbmd0aDtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZnJvbnQgPSB0aGlzLl9mcm9udCxcbiAgICAgICAgcmV0ID0gdGhpc1tmcm9udF07XG5cbiAgICB0aGlzW2Zyb250XSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9mcm9udCA9IChmcm9udCArIDEpICYgKHRoaXMuX2NhcGFjaXR5IC0gMSk7XG4gICAgdGhpcy5fbGVuZ3RoLS07XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5fY2hlY2tDYXBhY2l0eSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gICAgaWYgKHRoaXMuX2NhcGFjaXR5IDwgc2l6ZSkge1xuICAgICAgICB0aGlzLl9yZXNpemVUbyh0aGlzLl9jYXBhY2l0eSA8PCAxKTtcbiAgICB9XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuX3Jlc2l6ZVRvID0gZnVuY3Rpb24gKGNhcGFjaXR5KSB7XG4gICAgdmFyIG9sZENhcGFjaXR5ID0gdGhpcy5fY2FwYWNpdHk7XG4gICAgdGhpcy5fY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgICB2YXIgZnJvbnQgPSB0aGlzLl9mcm9udDtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5fbGVuZ3RoO1xuICAgIHZhciBtb3ZlSXRlbXNDb3VudCA9IChmcm9udCArIGxlbmd0aCkgJiAob2xkQ2FwYWNpdHkgLSAxKTtcbiAgICBhcnJheU1vdmUodGhpcywgMCwgdGhpcywgb2xkQ2FwYWNpdHksIG1vdmVJdGVtc0NvdW50KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUXVldWU7XG5cbn0se31dLDI3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihcbiAgICBQcm9taXNlLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSwgYXBpUmVqZWN0aW9uKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG5cbnZhciByYWNlTGF0ZXIgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24oYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIHJhY2UoYXJyYXksIHByb21pc2UpO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gcmFjZShwcm9taXNlcywgcGFyZW50KSB7XG4gICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UocHJvbWlzZXMpO1xuXG4gICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHJhY2VMYXRlcihtYXliZVByb21pc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2VzID0gdXRpbC5hc0FycmF5KHByb21pc2VzKTtcbiAgICAgICAgaWYgKHByb21pc2VzID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImV4cGVjdGluZyBhbiBhcnJheSBvciBhbiBpdGVyYWJsZSBvYmplY3QgYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcocHJvbWlzZXMpKTtcbiAgICB9XG5cbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXQuX3Byb3BhZ2F0ZUZyb20ocGFyZW50LCAzKTtcbiAgICB9XG4gICAgdmFyIGZ1bGZpbGwgPSByZXQuX2Z1bGZpbGw7XG4gICAgdmFyIHJlamVjdCA9IHJldC5fcmVqZWN0O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwcm9taXNlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICB2YXIgdmFsID0gcHJvbWlzZXNbaV07XG5cbiAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkICYmICEoaSBpbiBwcm9taXNlcykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgUHJvbWlzZS5jYXN0KHZhbCkuX3RoZW4oZnVsZmlsbCwgcmVqZWN0LCB1bmRlZmluZWQsIHJldCwgbnVsbCk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cblByb21pc2UucmFjZSA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xuICAgIHJldHVybiByYWNlKHByb21pc2VzLCB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUucmFjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmFjZSh0aGlzLCB1bmRlZmluZWQpO1xufTtcblxufTtcblxufSx7XCIuL3V0aWxcIjozNn1dLDI4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlQXJyYXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFwaVJlamVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5Q29udmVydFRvUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSU5URVJOQUwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKSB7XG52YXIgZ2V0RG9tYWluID0gUHJvbWlzZS5fZ2V0RG9tYWluO1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcblxuZnVuY3Rpb24gUmVkdWN0aW9uUHJvbWlzZUFycmF5KHByb21pc2VzLCBmbiwgaW5pdGlhbFZhbHVlLCBfZWFjaCkge1xuICAgIHRoaXMuY29uc3RydWN0b3IkKHByb21pc2VzKTtcbiAgICB2YXIgZG9tYWluID0gZ2V0RG9tYWluKCk7XG4gICAgdGhpcy5fZm4gPSBkb21haW4gPT09IG51bGwgPyBmbiA6IHV0aWwuZG9tYWluQmluZChkb21haW4sIGZuKTtcbiAgICBpZiAoaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaW5pdGlhbFZhbHVlID0gUHJvbWlzZS5yZXNvbHZlKGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIGluaXRpYWxWYWx1ZS5fYXR0YWNoQ2FuY2VsbGF0aW9uQ2FsbGJhY2sodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuX2luaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgICB0aGlzLl9jdXJyZW50Q2FuY2VsbGFibGUgPSBudWxsO1xuICAgIGlmKF9lYWNoID09PSBJTlRFUk5BTCkge1xuICAgICAgICB0aGlzLl9lYWNoVmFsdWVzID0gQXJyYXkodGhpcy5fbGVuZ3RoKTtcbiAgICB9IGVsc2UgaWYgKF9lYWNoID09PSAwKSB7XG4gICAgICAgIHRoaXMuX2VhY2hWYWx1ZXMgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2VhY2hWYWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuX3Byb21pc2UuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgdGhpcy5faW5pdCQodW5kZWZpbmVkLCAtNSk7XG59XG51dGlsLmluaGVyaXRzKFJlZHVjdGlvblByb21pc2VBcnJheSwgUHJvbWlzZUFycmF5KTtcblxuUmVkdWN0aW9uUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fZ290QWNjdW0gPSBmdW5jdGlvbihhY2N1bSkge1xuICAgIGlmICh0aGlzLl9lYWNoVmFsdWVzICE9PSB1bmRlZmluZWQgJiYgXG4gICAgICAgIHRoaXMuX2VhY2hWYWx1ZXMgIT09IG51bGwgJiYgXG4gICAgICAgIGFjY3VtICE9PSBJTlRFUk5BTCkge1xuICAgICAgICB0aGlzLl9lYWNoVmFsdWVzLnB1c2goYWNjdW0pO1xuICAgIH1cbn07XG5cblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX2VhY2hDb21wbGV0ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX2VhY2hWYWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fZWFjaFZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2VhY2hWYWx1ZXM7XG59O1xuXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24oKSB7fTtcblxuUmVkdWN0aW9uUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcmVzb2x2ZUVtcHR5QXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9yZXNvbHZlKHRoaXMuX2VhY2hWYWx1ZXMgIT09IHVuZGVmaW5lZCA/IHRoaXMuX2VhY2hWYWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuX2luaXRpYWxWYWx1ZSk7XG59O1xuXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLnNob3VsZENvcHlWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuUmVkdWN0aW9uUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdGhpcy5fcHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHZhbHVlKTtcbiAgICB0aGlzLl92YWx1ZXMgPSBudWxsO1xufTtcblxuUmVkdWN0aW9uUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgaWYgKHNlbmRlciA9PT0gdGhpcy5faW5pdGlhbFZhbHVlKSByZXR1cm4gdGhpcy5fY2FuY2VsKCk7XG4gICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSkgcmV0dXJuO1xuICAgIHRoaXMuX3Jlc3VsdENhbmNlbGxlZCQoKTtcbiAgICBpZiAodGhpcy5fY3VycmVudENhbmNlbGxhYmxlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50Q2FuY2VsbGFibGUuY2FuY2VsKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9pbml0aWFsVmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHRoaXMuX2luaXRpYWxWYWx1ZS5jYW5jZWwoKTtcbiAgICB9XG59O1xuXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9pdGVyYXRlID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICB2YXIgdmFsdWU7XG4gICAgdmFyIGk7XG4gICAgdmFyIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGg7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5faW5pdGlhbFZhbHVlO1xuICAgICAgICBpID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IFByb21pc2UucmVzb2x2ZSh2YWx1ZXNbMF0pO1xuICAgICAgICBpID0gMTtcbiAgICB9XG5cbiAgICB0aGlzLl9jdXJyZW50Q2FuY2VsbGFibGUgPSB2YWx1ZTtcblxuICAgIGlmICghdmFsdWUuaXNSZWplY3RlZCgpKSB7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjdHggPSB7XG4gICAgICAgICAgICAgICAgYWNjdW06IG51bGwsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IGxlbmd0aCxcbiAgICAgICAgICAgICAgICBhcnJheTogdGhpc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuX3RoZW4oZ290QWNjdW0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjdHgsIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZWFjaFZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVcbiAgICAgICAgICAgIC5fdGhlbih0aGlzLl9lYWNoQ29tcGxldGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzLCB1bmRlZmluZWQpO1xuICAgIH1cbiAgICB2YWx1ZS5fdGhlbihjb21wbGV0ZWQsIGNvbXBsZXRlZCwgdW5kZWZpbmVkLCB2YWx1ZSwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbiAoZm4sIGluaXRpYWxWYWx1ZSkge1xuICAgIHJldHVybiByZWR1Y2UodGhpcywgZm4sIGluaXRpYWxWYWx1ZSwgbnVsbCk7XG59O1xuXG5Qcm9taXNlLnJlZHVjZSA9IGZ1bmN0aW9uIChwcm9taXNlcywgZm4sIGluaXRpYWxWYWx1ZSwgX2VhY2gpIHtcbiAgICByZXR1cm4gcmVkdWNlKHByb21pc2VzLCBmbiwgaW5pdGlhbFZhbHVlLCBfZWFjaCk7XG59O1xuXG5mdW5jdGlvbiBjb21wbGV0ZWQodmFsdWVPclJlYXNvbiwgYXJyYXkpIHtcbiAgICBpZiAodGhpcy5pc0Z1bGZpbGxlZCgpKSB7XG4gICAgICAgIGFycmF5Ll9yZXNvbHZlKHZhbHVlT3JSZWFzb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Ll9yZWplY3QodmFsdWVPclJlYXNvbik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZWR1Y2UocHJvbWlzZXMsIGZuLCBpbml0aWFsVmFsdWUsIF9lYWNoKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgIH1cbiAgICB2YXIgYXJyYXkgPSBuZXcgUmVkdWN0aW9uUHJvbWlzZUFycmF5KHByb21pc2VzLCBmbiwgaW5pdGlhbFZhbHVlLCBfZWFjaCk7XG4gICAgcmV0dXJuIGFycmF5LnByb21pc2UoKTtcbn1cblxuZnVuY3Rpb24gZ290QWNjdW0oYWNjdW0pIHtcbiAgICB0aGlzLmFjY3VtID0gYWNjdW07XG4gICAgdGhpcy5hcnJheS5fZ290QWNjdW0oYWNjdW0pO1xuICAgIHZhciB2YWx1ZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodGhpcy52YWx1ZSwgdGhpcy5hcnJheS5fcHJvbWlzZSk7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB0aGlzLmFycmF5Ll9jdXJyZW50Q2FuY2VsbGFibGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlLl90aGVuKGdvdFZhbHVlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcywgdW5kZWZpbmVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ290VmFsdWUuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnb3RWYWx1ZSh2YWx1ZSkge1xuICAgIHZhciBhcnJheSA9IHRoaXMuYXJyYXk7XG4gICAgdmFyIHByb21pc2UgPSBhcnJheS5fcHJvbWlzZTtcbiAgICB2YXIgZm4gPSB0cnlDYXRjaChhcnJheS5fZm4pO1xuICAgIHByb21pc2UuX3B1c2hDb250ZXh0KCk7XG4gICAgdmFyIHJldDtcbiAgICBpZiAoYXJyYXkuX2VhY2hWYWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXQgPSBmbi5jYWxsKHByb21pc2UuX2JvdW5kVmFsdWUoKSwgdmFsdWUsIHRoaXMuaW5kZXgsIHRoaXMubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSBmbi5jYWxsKHByb21pc2UuX2JvdW5kVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjdW0sIHZhbHVlLCB0aGlzLmluZGV4LCB0aGlzLmxlbmd0aCk7XG4gICAgfVxuICAgIGlmIChyZXQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGFycmF5Ll9jdXJyZW50Q2FuY2VsbGFibGUgPSByZXQ7XG4gICAgfVxuICAgIHZhciBwcm9taXNlQ3JlYXRlZCA9IHByb21pc2UuX3BvcENvbnRleHQoKTtcbiAgICBkZWJ1Zy5jaGVja0ZvcmdvdHRlblJldHVybnMoXG4gICAgICAgIHJldCxcbiAgICAgICAgcHJvbWlzZUNyZWF0ZWQsXG4gICAgICAgIGFycmF5Ll9lYWNoVmFsdWVzICE9PSB1bmRlZmluZWQgPyBcIlByb21pc2UuZWFjaFwiIDogXCJQcm9taXNlLnJlZHVjZVwiLFxuICAgICAgICBwcm9taXNlXG4gICAgKTtcbiAgICByZXR1cm4gcmV0O1xufVxufTtcblxufSx7XCIuL3V0aWxcIjozNn1dLDI5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIHNjaGVkdWxlO1xudmFyIG5vQXN5bmNTY2hlZHVsZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBhc3luYyBzY2hlZHVsZXIgYXZhaWxhYmxlXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbn07XG52YXIgTmF0aXZlUHJvbWlzZSA9IHV0aWwuZ2V0TmF0aXZlUHJvbWlzZSgpO1xuaWYgKHV0aWwuaXNOb2RlICYmIHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIEdsb2JhbFNldEltbWVkaWF0ZSA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIFByb2Nlc3NOZXh0VGljayA9IHByb2Nlc3MubmV4dFRpY2s7XG4gICAgc2NoZWR1bGUgPSB1dGlsLmlzUmVjZW50Tm9kZVxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24oZm4pIHsgR2xvYmFsU2V0SW1tZWRpYXRlLmNhbGwoZ2xvYmFsLCBmbik7IH1cbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uKGZuKSB7IFByb2Nlc3NOZXh0VGljay5jYWxsKHByb2Nlc3MsIGZuKTsgfTtcbn0gZWxzZSBpZiAodHlwZW9mIE5hdGl2ZVByb21pc2UgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICB0eXBlb2YgTmF0aXZlUHJvbWlzZS5yZXNvbHZlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgbmF0aXZlUHJvbWlzZSA9IE5hdGl2ZVByb21pc2UucmVzb2x2ZSgpO1xuICAgIHNjaGVkdWxlID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgbmF0aXZlUHJvbWlzZS50aGVuKGZuKTtcbiAgICB9O1xufSBlbHNlIGlmICgodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpICYmXG4gICAgICAgICAgISh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yICYmXG4gICAgICAgICAgICAod2luZG93Lm5hdmlnYXRvci5zdGFuZGFsb25lIHx8IHdpbmRvdy5jb3Jkb3ZhKSkpIHtcbiAgICBzY2hlZHVsZSA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBvcHRzID0ge2F0dHJpYnV0ZXM6IHRydWV9O1xuICAgICAgICB2YXIgdG9nZ2xlU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBkaXYyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIG8yID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LnRvZ2dsZShcImZvb1wiKTtcbiAgICAgICAgICAgIHRvZ2dsZVNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgbzIub2JzZXJ2ZShkaXYyLCBvcHRzKTtcblxuICAgICAgICB2YXIgc2NoZWR1bGVUb2dnbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0b2dnbGVTY2hlZHVsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0b2dnbGVTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRpdjIuY2xhc3NMaXN0LnRvZ2dsZShcImZvb1wiKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBzY2hlZHVsZShmbikge1xuICAgICAgICAgICAgdmFyIG8gPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBvLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvLm9ic2VydmUoZGl2LCBvcHRzKTtcbiAgICAgICAgICAgIHNjaGVkdWxlVG9nZ2xlKCk7XG4gICAgICAgIH07XG4gICAgfSkoKTtcbn0gZWxzZSBpZiAodHlwZW9mIHNldEltbWVkaWF0ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNjaGVkdWxlID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZShmbik7XG4gICAgfTtcbn0gZWxzZSBpZiAodHlwZW9mIHNldFRpbWVvdXQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzY2hlZHVsZSA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBzY2hlZHVsZSA9IG5vQXN5bmNTY2hlZHVsZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNjaGVkdWxlO1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMzA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgZnVuY3Rpb24oUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBkZWJ1Zykge1xudmFyIFByb21pc2VJbnNwZWN0aW9uID0gUHJvbWlzZS5Qcm9taXNlSW5zcGVjdGlvbjtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcblxuZnVuY3Rpb24gU2V0dGxlZFByb21pc2VBcnJheSh2YWx1ZXMpIHtcbiAgICB0aGlzLmNvbnN0cnVjdG9yJCh2YWx1ZXMpO1xufVxudXRpbC5pbmhlcml0cyhTZXR0bGVkUHJvbWlzZUFycmF5LCBQcm9taXNlQXJyYXkpO1xuXG5TZXR0bGVkUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZVJlc29sdmVkID0gZnVuY3Rpb24gKGluZGV4LCBpbnNwZWN0aW9uKSB7XG4gICAgdGhpcy5fdmFsdWVzW2luZGV4XSA9IGluc3BlY3Rpb247XG4gICAgdmFyIHRvdGFsUmVzb2x2ZWQgPSArK3RoaXMuX3RvdGFsUmVzb2x2ZWQ7XG4gICAgaWYgKHRvdGFsUmVzb2x2ZWQgPj0gdGhpcy5fbGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblNldHRsZWRQcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlRnVsZmlsbGVkID0gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZUluc3BlY3Rpb24oKTtcbiAgICByZXQuX2JpdEZpZWxkID0gMzM1NTQ0MzI7XG4gICAgcmV0Ll9zZXR0bGVkVmFsdWVGaWVsZCA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlUmVzb2x2ZWQoaW5kZXgsIHJldCk7XG59O1xuU2V0dGxlZFByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VSZWplY3RlZCA9IGZ1bmN0aW9uIChyZWFzb24sIGluZGV4KSB7XG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlSW5zcGVjdGlvbigpO1xuICAgIHJldC5fYml0RmllbGQgPSAxNjc3NzIxNjtcbiAgICByZXQuX3NldHRsZWRWYWx1ZUZpZWxkID0gcmVhc29uO1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlUmVzb2x2ZWQoaW5kZXgsIHJldCk7XG59O1xuXG5Qcm9taXNlLnNldHRsZSA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xuICAgIGRlYnVnLmRlcHJlY2F0ZWQoXCIuc2V0dGxlKClcIiwgXCIucmVmbGVjdCgpXCIpO1xuICAgIHJldHVybiBuZXcgU2V0dGxlZFByb21pc2VBcnJheShwcm9taXNlcykucHJvbWlzZSgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuc2V0dGxlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBQcm9taXNlLnNldHRsZSh0aGlzKTtcbn07XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMzE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9XG5mdW5jdGlvbihQcm9taXNlLCBQcm9taXNlQXJyYXksIGFwaVJlamVjdGlvbikge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIFJhbmdlRXJyb3IgPSBfZGVyZXFfKFwiLi9lcnJvcnNcIikuUmFuZ2VFcnJvcjtcbnZhciBBZ2dyZWdhdGVFcnJvciA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKS5BZ2dyZWdhdGVFcnJvcjtcbnZhciBpc0FycmF5ID0gdXRpbC5pc0FycmF5O1xudmFyIENBTkNFTExBVElPTiA9IHt9O1xuXG5cbmZ1bmN0aW9uIFNvbWVQcm9taXNlQXJyYXkodmFsdWVzKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3RvciQodmFsdWVzKTtcbiAgICB0aGlzLl9ob3dNYW55ID0gMDtcbiAgICB0aGlzLl91bndyYXAgPSBmYWxzZTtcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xufVxudXRpbC5pbmhlcml0cyhTb21lUHJvbWlzZUFycmF5LCBQcm9taXNlQXJyYXkpO1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2hvd01hbnkgPT09IDApIHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZShbXSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faW5pdCQodW5kZWZpbmVkLCAtNSk7XG4gICAgdmFyIGlzQXJyYXlSZXNvbHZlZCA9IGlzQXJyYXkodGhpcy5fdmFsdWVzKTtcbiAgICBpZiAoIXRoaXMuX2lzUmVzb2x2ZWQoKSAmJlxuICAgICAgICBpc0FycmF5UmVzb2x2ZWQgJiZcbiAgICAgICAgdGhpcy5faG93TWFueSA+IHRoaXMuX2NhblBvc3NpYmx5RnVsZmlsbCgpKSB7XG4gICAgICAgIHRoaXMuX3JlamVjdCh0aGlzLl9nZXRSYW5nZUVycm9yKHRoaXMubGVuZ3RoKCkpKTtcbiAgICB9XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9pbml0KCk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5zZXRVbndyYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fdW53cmFwID0gdHJ1ZTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLmhvd01hbnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hvd01hbnk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5zZXRIb3dNYW55ID0gZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgdGhpcy5faG93TWFueSA9IGNvdW50O1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB0aGlzLl9hZGRGdWxmaWxsZWQodmFsdWUpO1xuICAgIGlmICh0aGlzLl9mdWxmaWxsZWQoKSA9PT0gdGhpcy5ob3dNYW55KCkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWVzLmxlbmd0aCA9IHRoaXMuaG93TWFueSgpO1xuICAgICAgICBpZiAodGhpcy5ob3dNYW55KCkgPT09IDEgJiYgdGhpcy5fdW53cmFwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHRoaXMuX3ZhbHVlc1swXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcblxufTtcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlUmVqZWN0ZWQgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgdGhpcy5fYWRkUmVqZWN0ZWQocmVhc29uKTtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tPdXRjb21lKCk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUNhbmNlbGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fdmFsdWVzIGluc3RhbmNlb2YgUHJvbWlzZSB8fCB0aGlzLl92YWx1ZXMgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FuY2VsKCk7XG4gICAgfVxuICAgIHRoaXMuX2FkZFJlamVjdGVkKENBTkNFTExBVElPTik7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrT3V0Y29tZSgpO1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX2NoZWNrT3V0Y29tZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmhvd01hbnkoKSA+IHRoaXMuX2NhblBvc3NpYmx5RnVsZmlsbCgpKSB7XG4gICAgICAgIHZhciBlID0gbmV3IEFnZ3JlZ2F0ZUVycm9yKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmxlbmd0aCgpOyBpIDwgdGhpcy5fdmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzW2ldICE9PSBDQU5DRUxMQVRJT04pIHtcbiAgICAgICAgICAgICAgICBlLnB1c2godGhpcy5fdmFsdWVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWplY3QoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX2Z1bGZpbGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxSZXNvbHZlZDtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZWplY3RlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzLmxlbmd0aCAtIHRoaXMubGVuZ3RoKCk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fYWRkUmVqZWN0ZWQgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgdGhpcy5fdmFsdWVzLnB1c2gocmVhc29uKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9hZGRGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZXNbdGhpcy5fdG90YWxSZXNvbHZlZCsrXSA9IHZhbHVlO1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX2NhblBvc3NpYmx5RnVsZmlsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGgoKSAtIHRoaXMuX3JlamVjdGVkKCk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fZ2V0UmFuZ2VFcnJvciA9IGZ1bmN0aW9uIChjb3VudCkge1xuICAgIHZhciBtZXNzYWdlID0gXCJJbnB1dCBhcnJheSBtdXN0IGNvbnRhaW4gYXQgbGVhc3QgXCIgK1xuICAgICAgICAgICAgdGhpcy5faG93TWFueSArIFwiIGl0ZW1zIGJ1dCBjb250YWlucyBvbmx5IFwiICsgY291bnQgKyBcIiBpdGVtc1wiO1xuICAgIHJldHVybiBuZXcgUmFuZ2VFcnJvcihtZXNzYWdlKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZXNvbHZlRW1wdHlBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZWplY3QodGhpcy5fZ2V0UmFuZ2VFcnJvcigwKSk7XG59O1xuXG5mdW5jdGlvbiBzb21lKHByb21pc2VzLCBob3dNYW55KSB7XG4gICAgaWYgKChob3dNYW55IHwgMCkgIT09IGhvd01hbnkgfHwgaG93TWFueSA8IDApIHtcbiAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImV4cGVjdGluZyBhIHBvc2l0aXZlIGludGVnZXJcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbiAgICB2YXIgcmV0ID0gbmV3IFNvbWVQcm9taXNlQXJyYXkocHJvbWlzZXMpO1xuICAgIHZhciBwcm9taXNlID0gcmV0LnByb21pc2UoKTtcbiAgICByZXQuc2V0SG93TWFueShob3dNYW55KTtcbiAgICByZXQuaW5pdCgpO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5Qcm9taXNlLnNvbWUgPSBmdW5jdGlvbiAocHJvbWlzZXMsIGhvd01hbnkpIHtcbiAgICByZXR1cm4gc29tZShwcm9taXNlcywgaG93TWFueSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5zb21lID0gZnVuY3Rpb24gKGhvd01hbnkpIHtcbiAgICByZXR1cm4gc29tZSh0aGlzLCBob3dNYW55KTtcbn07XG5cblByb21pc2UuX1NvbWVQcm9taXNlQXJyYXkgPSBTb21lUHJvbWlzZUFycmF5O1xufTtcblxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi91dGlsXCI6MzZ9XSwzMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xuZnVuY3Rpb24gUHJvbWlzZUluc3BlY3Rpb24ocHJvbWlzZSkge1xuICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UuX3RhcmdldCgpO1xuICAgICAgICB0aGlzLl9iaXRGaWVsZCA9IHByb21pc2UuX2JpdEZpZWxkO1xuICAgICAgICB0aGlzLl9zZXR0bGVkVmFsdWVGaWVsZCA9IHByb21pc2UuX2lzRmF0ZVNlYWxlZCgpXG4gICAgICAgICAgICA/IHByb21pc2UuX3NldHRsZWRWYWx1ZSgpIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fYml0RmllbGQgPSAwO1xuICAgICAgICB0aGlzLl9zZXR0bGVkVmFsdWVGaWVsZCA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG5cblByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5fc2V0dGxlZFZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRsZWRWYWx1ZUZpZWxkO1xufTtcblxudmFyIHZhbHVlID0gUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5pc0Z1bGZpbGxlZCgpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjYW5ub3QgZ2V0IGZ1bGZpbGxtZW50IHZhbHVlIG9mIGEgbm9uLWZ1bGZpbGxlZCBwcm9taXNlXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NldHRsZWRWYWx1ZSgpO1xufTtcblxudmFyIHJlYXNvbiA9IFByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5lcnJvciA9XG5Qcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUucmVhc29uID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbm5vdCBnZXQgcmVqZWN0aW9uIHJlYXNvbiBvZiBhIG5vbi1yZWplY3RlZCBwcm9taXNlXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NldHRsZWRWYWx1ZSgpO1xufTtcblxudmFyIGlzRnVsZmlsbGVkID0gUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLmlzRnVsZmlsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMDtcbn07XG5cbnZhciBpc1JlamVjdGVkID0gUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMDtcbn07XG5cbnZhciBpc1BlbmRpbmcgPSBQcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUuaXNQZW5kaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDA7XG59O1xuXG52YXIgaXNSZXNvbHZlZCA9IFByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5pc1Jlc29sdmVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA1MDMzMTY0OCkgIT09IDA7XG59O1xuXG5Qcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUuaXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgODQ1NDE0NCkgIT09IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fX2lzQ2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDY1NTM2KSA9PT0gNjU1MzY7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5faXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0KCkuX19pc0NhbmNlbGxlZCgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuaXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuX3RhcmdldCgpLl9iaXRGaWVsZCAmIDg0NTQxNDQpICE9PSAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuaXNQZW5kaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGlzUGVuZGluZy5jYWxsKHRoaXMuX3RhcmdldCgpKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaXNSZWplY3RlZC5jYWxsKHRoaXMuX3RhcmdldCgpKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmlzRnVsZmlsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGlzRnVsZmlsbGVkLmNhbGwodGhpcy5fdGFyZ2V0KCkpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuaXNSZXNvbHZlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBpc1Jlc29sdmVkLmNhbGwodGhpcy5fdGFyZ2V0KCkpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWUuY2FsbCh0aGlzLl90YXJnZXQoKSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5yZWFzb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0KCk7XG4gICAgdGFyZ2V0Ll91bnNldFJlamVjdGlvbklzVW5oYW5kbGVkKCk7XG4gICAgcmV0dXJuIHJlYXNvbi5jYWxsKHRhcmdldCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fdmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGxlZFZhbHVlKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVhc29uID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fdW5zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xuICAgIHJldHVybiB0aGlzLl9zZXR0bGVkVmFsdWUoKTtcbn07XG5cblByb21pc2UuUHJvbWlzZUluc3BlY3Rpb24gPSBQcm9taXNlSW5zcGVjdGlvbjtcbn07XG5cbn0se31dLDMzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCkge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciBpc09iamVjdCA9IHV0aWwuaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIHRyeUNvbnZlcnRUb1Byb21pc2Uob2JqLCBjb250ZXh0KSB7XG4gICAgaWYgKGlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFByb21pc2UpIHJldHVybiBvYmo7XG4gICAgICAgIHZhciB0aGVuID0gZ2V0VGhlbihvYmopO1xuICAgICAgICBpZiAodGhlbiA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0KSBjb250ZXh0Ll9wdXNoQ29udGV4dCgpO1xuICAgICAgICAgICAgdmFyIHJldCA9IFByb21pc2UucmVqZWN0KHRoZW4uZSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dCkgY29udGV4dC5fcG9wQ29udGV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBpZiAoaXNBbnlCbHVlYmlyZFByb21pc2Uob2JqKSkge1xuICAgICAgICAgICAgICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgICAgICAgICAgb2JqLl90aGVuKFxuICAgICAgICAgICAgICAgICAgICByZXQuX2Z1bGZpbGwsXG4gICAgICAgICAgICAgICAgICAgIHJldC5fcmVqZWN0LFxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIHJldCxcbiAgICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkb1RoZW5hYmxlKG9iaiwgdGhlbiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gZG9HZXRUaGVuKG9iaikge1xuICAgIHJldHVybiBvYmoudGhlbjtcbn1cblxuZnVuY3Rpb24gZ2V0VGhlbihvYmopIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZG9HZXRUaGVuKG9iaik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvck9iai5lID0gZTtcbiAgICAgICAgcmV0dXJuIGVycm9yT2JqO1xuICAgIH1cbn1cblxudmFyIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbmZ1bmN0aW9uIGlzQW55Qmx1ZWJpcmRQcm9taXNlKG9iaikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBoYXNQcm9wLmNhbGwob2JqLCBcIl9wcm9taXNlMFwiKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRvVGhlbmFibGUoeCwgdGhlbiwgY29udGV4dCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHZhciByZXQgPSBwcm9taXNlO1xuICAgIGlmIChjb250ZXh0KSBjb250ZXh0Ll9wdXNoQ29udGV4dCgpO1xuICAgIHByb21pc2UuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgaWYgKGNvbnRleHQpIGNvbnRleHQuX3BvcENvbnRleHQoKTtcbiAgICB2YXIgc3luY2hyb25vdXMgPSB0cnVlO1xuICAgIHZhciByZXN1bHQgPSB1dGlsLnRyeUNhdGNoKHRoZW4pLmNhbGwoeCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICBzeW5jaHJvbm91cyA9IGZhbHNlO1xuXG4gICAgaWYgKHByb21pc2UgJiYgcmVzdWx0ID09PSBlcnJvck9iaikge1xuICAgICAgICBwcm9taXNlLl9yZWplY3RDYWxsYmFjayhyZXN1bHQuZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHByb21pc2UgPSBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmUodmFsdWUpIHtcbiAgICAgICAgaWYgKCFwcm9taXNlKSByZXR1cm47XG4gICAgICAgIHByb21pc2UuX3Jlc29sdmVDYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgIHByb21pc2UgPSBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgICAgICAgaWYgKCFwcm9taXNlKSByZXR1cm47XG4gICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHJlYXNvbiwgc3luY2hyb25vdXMsIHRydWUpO1xuICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxucmV0dXJuIHRyeUNvbnZlcnRUb1Byb21pc2U7XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMzQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMLCBkZWJ1Zykge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIFRpbWVvdXRFcnJvciA9IFByb21pc2UuVGltZW91dEVycm9yO1xuXG5mdW5jdGlvbiBIYW5kbGVXcmFwcGVyKGhhbmRsZSkgIHtcbiAgICB0aGlzLmhhbmRsZSA9IGhhbmRsZTtcbn1cblxuSGFuZGxlV3JhcHBlci5wcm90b3R5cGUuX3Jlc3VsdENhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmhhbmRsZSk7XG59O1xuXG52YXIgYWZ0ZXJWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiBkZWxheSgrdGhpcykudGhlblJldHVybih2YWx1ZSk7IH07XG52YXIgZGVsYXkgPSBQcm9taXNlLmRlbGF5ID0gZnVuY3Rpb24gKG1zLCB2YWx1ZSkge1xuICAgIHZhciByZXQ7XG4gICAgdmFyIGhhbmRsZTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXQgPSBQcm9taXNlLnJlc29sdmUodmFsdWUpXG4gICAgICAgICAgICAgICAgLl90aGVuKGFmdGVyVmFsdWUsIG51bGwsIG51bGwsIG1zLCB1bmRlZmluZWQpO1xuICAgICAgICBpZiAoZGVidWcuY2FuY2VsbGF0aW9uKCkgJiYgdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXQuX3NldE9uQ2FuY2VsKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICAgICAgaGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbigpIHsgcmV0Ll9mdWxmaWxsKCk7IH0sICttcyk7XG4gICAgICAgIGlmIChkZWJ1Zy5jYW5jZWxsYXRpb24oKSkge1xuICAgICAgICAgICAgcmV0Ll9zZXRPbkNhbmNlbChuZXcgSGFuZGxlV3JhcHBlcihoYW5kbGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgfVxuICAgIHJldC5fc2V0QXN5bmNHdWFyYW50ZWVkKCk7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gKG1zKSB7XG4gICAgcmV0dXJuIGRlbGF5KG1zLCB0aGlzKTtcbn07XG5cbnZhciBhZnRlclRpbWVvdXQgPSBmdW5jdGlvbiAocHJvbWlzZSwgbWVzc2FnZSwgcGFyZW50KSB7XG4gICAgdmFyIGVycjtcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgZXJyID0gbWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVyciA9IG5ldyBUaW1lb3V0RXJyb3IoXCJvcGVyYXRpb24gdGltZWQgb3V0XCIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZXJyID0gbmV3IFRpbWVvdXRFcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdXRpbC5tYXJrQXNPcmlnaW5hdGluZ0Zyb21SZWplY3Rpb24oZXJyKTtcbiAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKGVycik7XG4gICAgcHJvbWlzZS5fcmVqZWN0KGVycik7XG5cbiAgICBpZiAocGFyZW50ICE9IG51bGwpIHtcbiAgICAgICAgcGFyZW50LmNhbmNlbCgpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHN1Y2Nlc3NDbGVhcih2YWx1ZSkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmhhbmRsZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBmYWlsdXJlQ2xlYXIocmVhc29uKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGFuZGxlKTtcbiAgICB0aHJvdyByZWFzb247XG59XG5cblByb21pc2UucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbiAobXMsIG1lc3NhZ2UpIHtcbiAgICBtcyA9ICttcztcbiAgICB2YXIgcmV0LCBwYXJlbnQ7XG5cbiAgICB2YXIgaGFuZGxlV3JhcHBlciA9IG5ldyBIYW5kbGVXcmFwcGVyKHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dFRpbWVvdXQoKSB7XG4gICAgICAgIGlmIChyZXQuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgIGFmdGVyVGltZW91dChyZXQsIG1lc3NhZ2UsIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9LCBtcykpO1xuXG4gICAgaWYgKGRlYnVnLmNhbmNlbGxhdGlvbigpKSB7XG4gICAgICAgIHBhcmVudCA9IHRoaXMudGhlbigpO1xuICAgICAgICByZXQgPSBwYXJlbnQuX3RoZW4oc3VjY2Vzc0NsZWFyLCBmYWlsdXJlQ2xlYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCBoYW5kbGVXcmFwcGVyLCB1bmRlZmluZWQpO1xuICAgICAgICByZXQuX3NldE9uQ2FuY2VsKGhhbmRsZVdyYXBwZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IHRoaXMuX3RoZW4oc3VjY2Vzc0NsZWFyLCBmYWlsdXJlQ2xlYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCBoYW5kbGVXcmFwcGVyLCB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG59O1xuXG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMzU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChQcm9taXNlLCBhcGlSZWplY3Rpb24sIHRyeUNvbnZlcnRUb1Byb21pc2UsXG4gICAgY3JlYXRlQ29udGV4dCwgSU5URVJOQUwsIGRlYnVnKSB7XG4gICAgdmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xuICAgIHZhciBUeXBlRXJyb3IgPSBfZGVyZXFfKFwiLi9lcnJvcnNcIikuVHlwZUVycm9yO1xuICAgIHZhciBpbmhlcml0cyA9IF9kZXJlcV8oXCIuL3V0aWxcIikuaW5oZXJpdHM7XG4gICAgdmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbiAgICB2YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xuICAgIHZhciBOVUxMID0ge307XG5cbiAgICBmdW5jdGlvbiB0aHJvd2VyKGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3Rocm93IGU7fSwgMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FzdFByZXNlcnZpbmdEaXNwb3NhYmxlKHRoZW5hYmxlKSB7XG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHRoZW5hYmxlKTtcbiAgICAgICAgaWYgKG1heWJlUHJvbWlzZSAhPT0gdGhlbmFibGUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGVuYWJsZS5faXNEaXNwb3NhYmxlID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGVuYWJsZS5fZ2V0RGlzcG9zZXIgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgdGhlbmFibGUuX2lzRGlzcG9zYWJsZSgpKSB7XG4gICAgICAgICAgICBtYXliZVByb21pc2UuX3NldERpc3Bvc2FibGUodGhlbmFibGUuX2dldERpc3Bvc2VyKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXliZVByb21pc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3Bvc2UocmVzb3VyY2VzLCBpbnNwZWN0aW9uKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGxlbiA9IHJlc291cmNlcy5sZW5ndGg7XG4gICAgICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIGZ1bmN0aW9uIGl0ZXJhdG9yKCkge1xuICAgICAgICAgICAgaWYgKGkgPj0gbGVuKSByZXR1cm4gcmV0Ll9mdWxmaWxsKCk7XG4gICAgICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gY2FzdFByZXNlcnZpbmdEaXNwb3NhYmxlKHJlc291cmNlc1tpKytdKTtcbiAgICAgICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlICYmXG4gICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl9pc0Rpc3Bvc2FibGUoKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX2dldERpc3Bvc2VyKCkudHJ5RGlzcG9zZShpbnNwZWN0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlcy5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd2VyKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF5YmVQcm9taXNlLl90aGVuKGl0ZXJhdG9yLCB0aHJvd2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZXJhdG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlcmF0b3IoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBEaXNwb3NlcihkYXRhLCBwcm9taXNlLCBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLl9wcm9taXNlID0gcHJvbWlzZTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG4gICAgRGlzcG9zZXIucHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH07XG5cbiAgICBEaXNwb3Nlci5wcm90b3R5cGUucHJvbWlzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfTtcblxuICAgIERpc3Bvc2VyLnByb3RvdHlwZS5yZXNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvbWlzZSgpLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21pc2UoKS52YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOVUxMO1xuICAgIH07XG5cbiAgICBEaXNwb3Nlci5wcm90b3R5cGUudHJ5RGlzcG9zZSA9IGZ1bmN0aW9uKGluc3BlY3Rpb24pIHtcbiAgICAgICAgdmFyIHJlc291cmNlID0gdGhpcy5yZXNvdXJjZSgpO1xuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIGlmIChjb250ZXh0ICE9PSB1bmRlZmluZWQpIGNvbnRleHQuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgIHZhciByZXQgPSByZXNvdXJjZSAhPT0gTlVMTFxuICAgICAgICAgICAgPyB0aGlzLmRvRGlzcG9zZShyZXNvdXJjZSwgaW5zcGVjdGlvbikgOiBudWxsO1xuICAgICAgICBpZiAoY29udGV4dCAhPT0gdW5kZWZpbmVkKSBjb250ZXh0Ll9wb3BDb250ZXh0KCk7XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3Vuc2V0RGlzcG9zYWJsZSgpO1xuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuXG4gICAgRGlzcG9zZXIuaXNEaXNwb3NlciA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiAoZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGQucmVzb3VyY2UgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBkLnRyeURpc3Bvc2UgPT09IFwiZnVuY3Rpb25cIik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIEZ1bmN0aW9uRGlzcG9zZXIoZm4sIHByb21pc2UsIGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvciQoZm4sIHByb21pc2UsIGNvbnRleHQpO1xuICAgIH1cbiAgICBpbmhlcml0cyhGdW5jdGlvbkRpc3Bvc2VyLCBEaXNwb3Nlcik7XG5cbiAgICBGdW5jdGlvbkRpc3Bvc2VyLnByb3RvdHlwZS5kb0Rpc3Bvc2UgPSBmdW5jdGlvbiAocmVzb3VyY2UsIGluc3BlY3Rpb24pIHtcbiAgICAgICAgdmFyIGZuID0gdGhpcy5kYXRhKCk7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHJlc291cmNlLCByZXNvdXJjZSwgaW5zcGVjdGlvbik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1heWJlVW53cmFwRGlzcG9zZXIodmFsdWUpIHtcbiAgICAgICAgaWYgKERpc3Bvc2VyLmlzRGlzcG9zZXIodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlc1t0aGlzLmluZGV4XS5fc2V0RGlzcG9zYWJsZSh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBSZXNvdXJjZUxpc3QobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLnByb21pc2UgPSBudWxsO1xuICAgICAgICB0aGlzW2xlbmd0aC0xXSA9IG51bGw7XG4gICAgfVxuXG4gICAgUmVzb3VyY2VMaXN0LnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBQcm9taXNlLnVzaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA8IDIpIHJldHVybiBhcGlSZWplY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcInlvdSBtdXN0IHBhc3MgYXQgbGVhc3QgMiBhcmd1bWVudHMgdG8gUHJvbWlzZS51c2luZ1wiKTtcbiAgICAgICAgdmFyIGZuID0gYXJndW1lbnRzW2xlbiAtIDFdO1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbnB1dDtcbiAgICAgICAgdmFyIHNwcmVhZEFyZ3MgPSB0cnVlO1xuICAgICAgICBpZiAobGVuID09PSAyICYmIEFycmF5LmlzQXJyYXkoYXJndW1lbnRzWzBdKSkge1xuICAgICAgICAgICAgaW5wdXQgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICBsZW4gPSBpbnB1dC5sZW5ndGg7XG4gICAgICAgICAgICBzcHJlYWRBcmdzID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnB1dCA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXNvdXJjZXMgPSBuZXcgUmVzb3VyY2VMaXN0KGxlbik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGlucHV0W2ldO1xuICAgICAgICAgICAgaWYgKERpc3Bvc2VyLmlzRGlzcG9zZXIocmVzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpc3Bvc2VyID0gcmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UgPSByZXNvdXJjZS5wcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UuX3NldERpc3Bvc2FibGUoZGlzcG9zZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZShyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UgPVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl90aGVuKG1heWJlVW53cmFwRGlzcG9zZXIsIG51bGwsIG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaVxuICAgICAgICAgICAgICAgICAgICB9LCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc291cmNlc1tpXSA9IHJlc291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlZmxlY3RlZFJlc291cmNlcyA9IG5ldyBBcnJheShyZXNvdXJjZXMubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWZsZWN0ZWRSZXNvdXJjZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHJlZmxlY3RlZFJlc291cmNlc1tpXSA9IFByb21pc2UucmVzb2x2ZShyZXNvdXJjZXNbaV0pLnJlZmxlY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHRQcm9taXNlID0gUHJvbWlzZS5hbGwocmVmbGVjdGVkUmVzb3VyY2VzKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oaW5zcGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluc3BlY3Rpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnNwZWN0aW9uID0gaW5zcGVjdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnNwZWN0aW9uLmlzUmVqZWN0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JPYmouZSA9IGluc3BlY3Rpb24uZXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvck9iajtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaW5zcGVjdGlvbi5pc0Z1bGZpbGxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRQcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluc3BlY3Rpb25zW2ldID0gaW5zcGVjdGlvbi52YWx1ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9taXNlLl9wdXNoQ29udGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgZm4gPSB0cnlDYXRjaChmbik7XG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IHNwcmVhZEFyZ3NcbiAgICAgICAgICAgICAgICAgICAgPyBmbi5hcHBseSh1bmRlZmluZWQsIGluc3BlY3Rpb25zKSA6IGZuKGluc3BlY3Rpb25zKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZUNyZWF0ZWQgPSBwcm9taXNlLl9wb3BDb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgZGVidWcuY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zKFxuICAgICAgICAgICAgICAgICAgICByZXQsIHByb21pc2VDcmVhdGVkLCBcIlByb21pc2UudXNpbmdcIiwgcHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBwcm9taXNlID0gcmVzdWx0UHJvbWlzZS5sYXN0bHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5zcGVjdGlvbiA9IG5ldyBQcm9taXNlLlByb21pc2VJbnNwZWN0aW9uKHJlc3VsdFByb21pc2UpO1xuICAgICAgICAgICAgcmV0dXJuIGRpc3Bvc2UocmVzb3VyY2VzLCBpbnNwZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc291cmNlcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICAgICAgcHJvbWlzZS5fc2V0T25DYW5jZWwocmVzb3VyY2VzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIFByb21pc2UucHJvdG90eXBlLl9zZXREaXNwb3NhYmxlID0gZnVuY3Rpb24gKGRpc3Bvc2VyKSB7XG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAxMzEwNzI7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VyID0gZGlzcG9zZXI7XG4gICAgfTtcblxuICAgIFByb21pc2UucHJvdG90eXBlLl9pc0Rpc3Bvc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAxMzEwNzIpID4gMDtcbiAgICB9O1xuXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX2dldERpc3Bvc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcG9zZXI7XG4gICAgfTtcblxuICAgIFByb21pc2UucHJvdG90eXBlLl91bnNldERpc3Bvc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofjEzMTA3Mik7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VyID0gdW5kZWZpbmVkO1xuICAgIH07XG5cbiAgICBQcm9taXNlLnByb3RvdHlwZS5kaXNwb3NlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb25EaXNwb3NlcihmbiwgdGhpcywgY3JlYXRlQ29udGV4dCgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgfTtcblxufTtcblxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi91dGlsXCI6MzZ9XSwzNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBlczUgPSBfZGVyZXFfKFwiLi9lczVcIik7XG52YXIgY2FuRXZhbHVhdGUgPSB0eXBlb2YgbmF2aWdhdG9yID09IFwidW5kZWZpbmVkXCI7XG5cbnZhciBlcnJvck9iaiA9IHtlOiB7fX07XG52YXIgdHJ5Q2F0Y2hUYXJnZXQ7XG52YXIgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDpcbiAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDpcbiAgICB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDpcbiAgICB0aGlzICE9PSB1bmRlZmluZWQgPyB0aGlzIDogbnVsbDtcblxuZnVuY3Rpb24gdHJ5Q2F0Y2hlcigpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdHJ5Q2F0Y2hUYXJnZXQ7XG4gICAgICAgIHRyeUNhdGNoVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyb3JPYmouZSA9IGU7XG4gICAgICAgIHJldHVybiBlcnJvck9iajtcbiAgICB9XG59XG5mdW5jdGlvbiB0cnlDYXRjaChmbikge1xuICAgIHRyeUNhdGNoVGFyZ2V0ID0gZm47XG4gICAgcmV0dXJuIHRyeUNhdGNoZXI7XG59XG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uKENoaWxkLCBQYXJlbnQpIHtcbiAgICB2YXIgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gICAgZnVuY3Rpb24gVCgpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvciA9IENoaWxkO1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yJCA9IFBhcmVudDtcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIFBhcmVudC5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgIGlmIChoYXNQcm9wLmNhbGwoUGFyZW50LnByb3RvdHlwZSwgcHJvcGVydHlOYW1lKSAmJlxuICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZS5jaGFyQXQocHJvcGVydHlOYW1lLmxlbmd0aC0xKSAhPT0gXCIkXCJcbiAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWUgKyBcIiRcIl0gPSBQYXJlbnQucHJvdG90eXBlW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgVC5wcm90b3R5cGUgPSBQYXJlbnQucHJvdG90eXBlO1xuICAgIENoaWxkLnByb3RvdHlwZSA9IG5ldyBUKCk7XG4gICAgcmV0dXJuIENoaWxkLnByb3RvdHlwZTtcbn07XG5cblxuZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsKSB7XG4gICAgcmV0dXJuIHZhbCA9PSBudWxsIHx8IHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IGZhbHNlIHx8XG4gICAgICAgIHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIjtcblxufVxuXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIG1heWJlV3JhcEFzRXJyb3IobWF5YmVFcnJvcikge1xuICAgIGlmICghaXNQcmltaXRpdmUobWF5YmVFcnJvcikpIHJldHVybiBtYXliZUVycm9yO1xuXG4gICAgcmV0dXJuIG5ldyBFcnJvcihzYWZlVG9TdHJpbmcobWF5YmVFcnJvcikpO1xufVxuXG5mdW5jdGlvbiB3aXRoQXBwZW5kZWQodGFyZ2V0LCBhcHBlbmRlZSkge1xuICAgIHZhciBsZW4gPSB0YXJnZXQubGVuZ3RoO1xuICAgIHZhciByZXQgPSBuZXcgQXJyYXkobGVuICsgMSk7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHJldFtpXSA9IHRhcmdldFtpXTtcbiAgICB9XG4gICAgcmV0W2ldID0gYXBwZW5kZWU7XG4gICAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0YVByb3BlcnR5T3JEZWZhdWx0KG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZiAoZXM1LmlzRVM1KSB7XG4gICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG5cbiAgICAgICAgaWYgKGRlc2MgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlc2MuZ2V0ID09IG51bGwgJiYgZGVzYy5zZXQgPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICA/IGRlc2MudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge30uaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgPyBvYmpba2V5XSA6IHVuZGVmaW5lZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vdEVudW1lcmFibGVQcm9wKG9iaiwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoaXNQcmltaXRpdmUob2JqKSkgcmV0dXJuIG9iajtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH07XG4gICAgZXM1LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gdGhyb3dlcihyKSB7XG4gICAgdGhyb3cgcjtcbn1cblxudmFyIGluaGVyaXRlZERhdGFLZXlzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBleGNsdWRlZFByb3RvdHlwZXMgPSBbXG4gICAgICAgIEFycmF5LnByb3RvdHlwZSxcbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZSxcbiAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlXG4gICAgXTtcblxuICAgIHZhciBpc0V4Y2x1ZGVkUHJvdG8gPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleGNsdWRlZFByb3RvdHlwZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChleGNsdWRlZFByb3RvdHlwZXNbaV0gPT09IHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgaWYgKGVzNS5pc0VTNSkge1xuICAgICAgICB2YXIgZ2V0S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gW107XG4gICAgICAgICAgICB2YXIgdmlzaXRlZEtleXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgICAgd2hpbGUgKG9iaiAhPSBudWxsICYmICFpc0V4Y2x1ZGVkUHJvdG8ob2JqKSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlzO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMgPSBnZXRLZXlzKG9iaik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkS2V5c1trZXldKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgdmlzaXRlZEtleXNba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXNjICE9IG51bGwgJiYgZGVzYy5nZXQgPT0gbnVsbCAmJiBkZXNjLnNldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iaiA9IGVzNS5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICBpZiAoaXNFeGNsdWRlZFByb3RvKG9iaikpIHJldHVybiBbXTtcbiAgICAgICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICAgICAgLypqc2hpbnQgZm9yaW46ZmFsc2UgKi9cbiAgICAgICAgICAgIGVudW1lcmF0aW9uOiBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc1Byb3AuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4Y2x1ZGVkUHJvdG90eXBlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1Byb3AuY2FsbChleGNsdWRlZFByb3RvdHlwZXNbaV0sIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBlbnVtZXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH07XG4gICAgfVxuXG59KSgpO1xuXG52YXIgdGhpc0Fzc2lnbm1lbnRQYXR0ZXJuID0gL3RoaXNcXHMqXFwuXFxzKlxcUytcXHMqPS87XG5mdW5jdGlvbiBpc0NsYXNzKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIga2V5cyA9IGVzNS5uYW1lcyhmbi5wcm90b3R5cGUpO1xuXG4gICAgICAgICAgICB2YXIgaGFzTWV0aG9kcyA9IGVzNS5pc0VTNSAmJiBrZXlzLmxlbmd0aCA+IDE7XG4gICAgICAgICAgICB2YXIgaGFzTWV0aG9kc090aGVyVGhhbkNvbnN0cnVjdG9yID0ga2V5cy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgIShrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSBcImNvbnN0cnVjdG9yXCIpO1xuICAgICAgICAgICAgdmFyIGhhc1RoaXNBc3NpZ25tZW50QW5kU3RhdGljTWV0aG9kcyA9XG4gICAgICAgICAgICAgICAgdGhpc0Fzc2lnbm1lbnRQYXR0ZXJuLnRlc3QoZm4gKyBcIlwiKSAmJiBlczUubmFtZXMoZm4pLmxlbmd0aCA+IDA7XG5cbiAgICAgICAgICAgIGlmIChoYXNNZXRob2RzIHx8IGhhc01ldGhvZHNPdGhlclRoYW5Db25zdHJ1Y3RvciB8fFxuICAgICAgICAgICAgICAgIGhhc1RoaXNBc3NpZ25tZW50QW5kU3RhdGljTWV0aG9kcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRvRmFzdFByb3BlcnRpZXMob2JqKSB7XG4gICAgLypqc2hpbnQgLVcwMjcsLVcwNTUsLVcwMzEqL1xuICAgIGZ1bmN0aW9uIEZha2VDb25zdHJ1Y3RvcigpIHt9XG4gICAgRmFrZUNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IG9iajtcbiAgICB2YXIgbCA9IDg7XG4gICAgd2hpbGUgKGwtLSkgbmV3IEZha2VDb25zdHJ1Y3RvcigpO1xuICAgIHJldHVybiBvYmo7XG4gICAgZXZhbChvYmopO1xufVxuXG52YXIgcmlkZW50ID0gL15bYS16JF9dW2EteiRfMC05XSokL2k7XG5mdW5jdGlvbiBpc0lkZW50aWZpZXIoc3RyKSB7XG4gICAgcmV0dXJuIHJpZGVudC50ZXN0KHN0cik7XG59XG5cbmZ1bmN0aW9uIGZpbGxlZFJhbmdlKGNvdW50LCBwcmVmaXgsIHN1ZmZpeCkge1xuICAgIHZhciByZXQgPSBuZXcgQXJyYXkoY291bnQpO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XG4gICAgICAgIHJldFtpXSA9IHByZWZpeCArIGkgKyBzdWZmaXg7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHNhZmVUb1N0cmluZyhvYmopIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gb2JqICsgXCJcIjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBcIltubyBzdHJpbmcgcmVwcmVzZW50YXRpb25dXCI7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0Vycm9yKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IG51bGwgJiZcbiAgICAgICAgICAgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICB0eXBlb2Ygb2JqLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgdHlwZW9mIG9iai5uYW1lID09PSBcInN0cmluZ1wiO1xufVxuXG5mdW5jdGlvbiBtYXJrQXNPcmlnaW5hdGluZ0Zyb21SZWplY3Rpb24oZSkge1xuICAgIHRyeSB7XG4gICAgICAgIG5vdEVudW1lcmFibGVQcm9wKGUsIFwiaXNPcGVyYXRpb25hbFwiLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2goaWdub3JlKSB7fVxufVxuXG5mdW5jdGlvbiBvcmlnaW5hdGVzRnJvbVJlamVjdGlvbihlKSB7XG4gICAgaWYgKGUgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAoKGUgaW5zdGFuY2VvZiBFcnJvcltcIl9fQmx1ZWJpcmRFcnJvclR5cGVzX19cIl0uT3BlcmF0aW9uYWxFcnJvcikgfHxcbiAgICAgICAgZVtcImlzT3BlcmF0aW9uYWxcIl0gPT09IHRydWUpO1xufVxuXG5mdW5jdGlvbiBjYW5BdHRhY2hUcmFjZShvYmopIHtcbiAgICByZXR1cm4gaXNFcnJvcihvYmopICYmIGVzNS5wcm9wZXJ0eUlzV3JpdGFibGUob2JqLCBcInN0YWNrXCIpO1xufVxuXG52YXIgZW5zdXJlRXJyb3JPYmplY3QgPSAoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCEoXCJzdGFja1wiIGluIG5ldyBFcnJvcigpKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChjYW5BdHRhY2hUcmFjZSh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIHRyeSB7dGhyb3cgbmV3IEVycm9yKHNhZmVUb1N0cmluZyh2YWx1ZSkpO31cbiAgICAgICAgICAgIGNhdGNoKGVycikge3JldHVybiBlcnI7fVxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGNhbkF0dGFjaFRyYWNlKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihzYWZlVG9TdHJpbmcodmFsdWUpKTtcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xuXG5mdW5jdGlvbiBjbGFzc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4ge30udG9TdHJpbmcuY2FsbChvYmopO1xufVxuXG5mdW5jdGlvbiBjb3B5RGVzY3JpcHRvcnMoZnJvbSwgdG8sIGZpbHRlcikge1xuICAgIHZhciBrZXlzID0gZXM1Lm5hbWVzKGZyb20pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgaWYgKGZpbHRlcihrZXkpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGVzNS5kZWZpbmVQcm9wZXJ0eSh0bywga2V5LCBlczUuZ2V0RGVzY3JpcHRvcihmcm9tLCBrZXkpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIGFzQXJyYXkgPSBmdW5jdGlvbih2KSB7XG4gICAgaWYgKGVzNS5pc0FycmF5KHYpKSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFN5bWJvbC5pdGVyYXRvcikge1xuICAgIHZhciBBcnJheUZyb20gPSB0eXBlb2YgQXJyYXkuZnJvbSA9PT0gXCJmdW5jdGlvblwiID8gZnVuY3Rpb24odikge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh2KTtcbiAgICB9IDogZnVuY3Rpb24odikge1xuICAgICAgICB2YXIgcmV0ID0gW107XG4gICAgICAgIHZhciBpdCA9IHZbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgICB2YXIgaXRSZXN1bHQ7XG4gICAgICAgIHdoaWxlICghKChpdFJlc3VsdCA9IGl0Lm5leHQoKSkuZG9uZSkpIHtcbiAgICAgICAgICAgIHJldC5wdXNoKGl0UmVzdWx0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICBhc0FycmF5ID0gZnVuY3Rpb24odikge1xuICAgICAgICBpZiAoZXM1LmlzQXJyYXkodikpIHtcbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9IGVsc2UgaWYgKHYgIT0gbnVsbCAmJiB0eXBlb2YgdltTeW1ib2wuaXRlcmF0b3JdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheUZyb20odik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbn1cblxudmFyIGlzTm9kZSA9IHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIGNsYXNzU3RyaW5nKHByb2Nlc3MpLnRvTG93ZXJDYXNlKCkgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiO1xuXG5mdW5jdGlvbiBlbnYoa2V5LCBkZWYpIHtcbiAgICByZXR1cm4gaXNOb2RlID8gcHJvY2Vzcy5lbnZba2V5XSA6IGRlZjtcbn1cblxuZnVuY3Rpb24gZ2V0TmF0aXZlUHJvbWlzZSgpIHtcbiAgICBpZiAodHlwZW9mIFByb21pc2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbigpe30pO1xuICAgICAgICAgICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwocHJvbWlzZSkgPT09IFwiW29iamVjdCBQcm9taXNlXVwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkb21haW5CaW5kKHNlbGYsIGNiKSB7XG4gICAgcmV0dXJuIHNlbGYuYmluZChjYik7XG59XG5cbnZhciByZXQgPSB7XG4gICAgaXNDbGFzczogaXNDbGFzcyxcbiAgICBpc0lkZW50aWZpZXI6IGlzSWRlbnRpZmllcixcbiAgICBpbmhlcml0ZWREYXRhS2V5czogaW5oZXJpdGVkRGF0YUtleXMsXG4gICAgZ2V0RGF0YVByb3BlcnR5T3JEZWZhdWx0OiBnZXREYXRhUHJvcGVydHlPckRlZmF1bHQsXG4gICAgdGhyb3dlcjogdGhyb3dlcixcbiAgICBpc0FycmF5OiBlczUuaXNBcnJheSxcbiAgICBhc0FycmF5OiBhc0FycmF5LFxuICAgIG5vdEVudW1lcmFibGVQcm9wOiBub3RFbnVtZXJhYmxlUHJvcCxcbiAgICBpc1ByaW1pdGl2ZTogaXNQcmltaXRpdmUsXG4gICAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICAgIGlzRXJyb3I6IGlzRXJyb3IsXG4gICAgY2FuRXZhbHVhdGU6IGNhbkV2YWx1YXRlLFxuICAgIGVycm9yT2JqOiBlcnJvck9iaixcbiAgICB0cnlDYXRjaDogdHJ5Q2F0Y2gsXG4gICAgaW5oZXJpdHM6IGluaGVyaXRzLFxuICAgIHdpdGhBcHBlbmRlZDogd2l0aEFwcGVuZGVkLFxuICAgIG1heWJlV3JhcEFzRXJyb3I6IG1heWJlV3JhcEFzRXJyb3IsXG4gICAgdG9GYXN0UHJvcGVydGllczogdG9GYXN0UHJvcGVydGllcyxcbiAgICBmaWxsZWRSYW5nZTogZmlsbGVkUmFuZ2UsXG4gICAgdG9TdHJpbmc6IHNhZmVUb1N0cmluZyxcbiAgICBjYW5BdHRhY2hUcmFjZTogY2FuQXR0YWNoVHJhY2UsXG4gICAgZW5zdXJlRXJyb3JPYmplY3Q6IGVuc3VyZUVycm9yT2JqZWN0LFxuICAgIG9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uOiBvcmlnaW5hdGVzRnJvbVJlamVjdGlvbixcbiAgICBtYXJrQXNPcmlnaW5hdGluZ0Zyb21SZWplY3Rpb246IG1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbixcbiAgICBjbGFzc1N0cmluZzogY2xhc3NTdHJpbmcsXG4gICAgY29weURlc2NyaXB0b3JzOiBjb3B5RGVzY3JpcHRvcnMsXG4gICAgaGFzRGV2VG9vbHM6IHR5cGVvZiBjaHJvbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgY2hyb21lICYmXG4gICAgICAgICAgICAgICAgIHR5cGVvZiBjaHJvbWUubG9hZFRpbWVzID09PSBcImZ1bmN0aW9uXCIsXG4gICAgaXNOb2RlOiBpc05vZGUsXG4gICAgZW52OiBlbnYsXG4gICAgZ2xvYmFsOiBnbG9iYWxPYmplY3QsXG4gICAgZ2V0TmF0aXZlUHJvbWlzZTogZ2V0TmF0aXZlUHJvbWlzZSxcbiAgICBkb21haW5CaW5kOiBkb21haW5CaW5kXG59O1xucmV0LmlzUmVjZW50Tm9kZSA9IHJldC5pc05vZGUgJiYgKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZXJzaW9uID0gcHJvY2Vzcy52ZXJzaW9ucy5ub2RlLnNwbGl0KFwiLlwiKS5tYXAoTnVtYmVyKTtcbiAgICByZXR1cm4gKHZlcnNpb25bMF0gPT09IDAgJiYgdmVyc2lvblsxXSA+IDEwKSB8fCAodmVyc2lvblswXSA+IDApO1xufSkoKTtcblxuaWYgKHJldC5pc05vZGUpIHJldC50b0Zhc3RQcm9wZXJ0aWVzKHByb2Nlc3MpO1xuXG50cnkge3Rocm93IG5ldyBFcnJvcigpOyB9IGNhdGNoIChlKSB7cmV0Lmxhc3RMaW5lRXJyb3IgPSBlO31cbm1vZHVsZS5leHBvcnRzID0gcmV0O1xuXG59LHtcIi4vZXM1XCI6MTN9XX0se30sWzRdKSg0KVxufSk7ICAgICAgICAgICAgICAgICAgICA7aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyAhPT0gbnVsbCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuUCA9IHdpbmRvdy5Qcm9taXNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiAhPT0gbnVsbCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5QID0gc2VsZi5Qcm9taXNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmx1ZWJpcmQvanMvYnJvd3Nlci9ibHVlYmlyZC5qc1xuLy8gbW9kdWxlIGlkID0gMTQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBmZXRjaCA9IHJlcXVpcmUoJ2lzb21vcnBoaWMtZmV0Y2gnKTtcbnZhciBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmwsIG9wdGlvbnMpIHtcblxuICB2YXIgcmV0cmllcyA9IDM7XG4gIHZhciByZXRyeURlbGF5ID0gMTAwMDtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJldHJpZXMpIHtcbiAgICByZXRyaWVzID0gb3B0aW9ucy5yZXRyaWVzO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeURlbGF5KSB7XG4gICAgcmV0cnlEZWxheSA9IG9wdGlvbnMucmV0cnlEZWxheTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgd3JhcHBlZEZldGNoID0gZnVuY3Rpb24obikge1xuICAgICAgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBpZiAobiA+IDApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHdyYXBwZWRGZXRjaCgtLW4pO1xuICAgICAgICAgICAgfSwgcmV0cnlEZWxheSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHdyYXBwZWRGZXRjaChyZXRyaWVzKTtcbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZldGNoLXJldHJ5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gdGhlIHdoYXR3Zy1mZXRjaCBwb2x5ZmlsbCBpbnN0YWxscyB0aGUgZmV0Y2goKSBmdW5jdGlvblxuLy8gb24gdGhlIGdsb2JhbCBvYmplY3QgKHdpbmRvdyBvciBzZWxmKVxuLy9cbi8vIFJldHVybiB0aGF0IGFzIHRoZSBleHBvcnQgZm9yIHVzZSBpbiBXZWJwYWNrLCBCcm93c2VyaWZ5IGV0Yy5cbnJlcXVpcmUoJ3doYXR3Zy1mZXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBzZWxmLmZldGNoLmJpbmQoc2VsZik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaXNvbW9ycGhpYy1mZXRjaC9mZXRjaC1ucG0tYnJvd3NlcmlmeS5qc1xuLy8gbW9kdWxlIGlkID0gMzI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcblxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnVybCA9IGlucHV0XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywgeyBib2R5OiB0aGlzLl9ib2R5SW5pdCB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgYm9keS50cmltKCkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuICAgIHJhd0hlYWRlcnMuc3BsaXQoJ1xcclxcbicpLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3doYXR3Zy1mZXRjaC9mZXRjaC5qc1xuLy8gbW9kdWxlIGlkID0gMzI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSb3V0ZXIgZnJvbSAnLi9tb2R1bGVzL3JvdXRlcic7XG5pbXBvcnQgTG9naW5WaWV3IGZyb20gJy4vdmlld3MvbG9naW5WaWV3JztcbmltcG9ydCBSZWdpc3RyYXRpb25WaWV3IGZyb20gJy4vdmlld3MvcmVnaXN0cmF0aW9uVmlldyc7XG5pbXBvcnQgU2NvcmVib2FyZFZpZXcgZnJvbSAnLi92aWV3cy9zY29yZWJvYXJkVmlldyc7XG5pbXBvcnQgUm9vbXNWaWV3IGZyb20gJy4vdmlld3Mvcm9vbXNWaWV3JztcbmltcG9ydCBHYW1lVmlldyBmcm9tICcuL3ZpZXdzL2dhbWVWaWV3JztcblxubGV0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbnJvdXRlci5hZGRSb3V0ZSgnL2xvZ2luJywgTG9naW5WaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnL3JlZ2lzdHJhdGlvbicsIFJlZ2lzdHJhdGlvblZpZXcpO1xucm91dGVyLmFkZFJvdXRlKCcvc2NvcmVib2FyZCcsIFNjb3JlYm9hcmRWaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnL3Jvb21zJywgUm9vbXNWaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnL2dhbWUnLCBHYW1lVmlldyk7XG5yb3V0ZXIuYWRkUm91dGUoJy8nLCBMb2dpblZpZXcpO1xucm91dGVyLnN0YXJ0KCk7XG53aW5kb3cucm91dGVyID0gcm91dGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2FpcmRyb25lLmpzIiwiLyoqXG4gKiDQmtC70LDRgdGBINC/0YDQtdC00YHRgtCw0LLQu9GP0LXRgiDRgdC+0LHQvtC5IHZpZXdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG5cdC8qKlxuXHQgKiDQodC+0LfQtNCw0ZHRgiDQvdC+0LLRg9GOIHZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5zZXRSb3V0ZXIod2luZG93LnJvdXRlcik7XG5cdFx0dGhpcy50YWdOYW1lID0gb3B0aW9ucy50YWdOYW1lIHx8ICdkaXYnO1xuICAgICAgICB0aGlzLl9lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5lbGVtZW50KSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnTmFtZSk7XG4gICAgICAgIHRoaXMuYm9keUNsYXNzID0gb3B0aW9ucy5ib2R5Q2xhc3M7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC/0LDRgNCw0LzQtdGC0YDQvtCyIHZpZXcgKNCy0YvQv9C+0LvQvdGP0LXRgtGB0Y8g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INGB0L7Qt9C00LDQvdC40Y8pXG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L/RgNC10LTQtdC70Y/RgtGMXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0aW5pdChvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLnNldEF0dHJzKG9wdGlvbnMuYXR0cnMpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQv9GA0LjQvtGB0YLQsNC90L7QstC60LUg0YDQsNCx0L7RgtGLIHZpZXcgKNC/0YDQuCDRgdC60YDRi9GC0LjQuCB2aWV3INC40LvQuCDQv9C10YDQtdGF0L7QtNC1INC90LAg0LTRgNGD0LPRg9GOIHZpZXcpXG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L7Qv9GA0LXQtNC10LvRj9GC0Ywg0YHQstC+0LXQuSDQu9C+0LPQuNC60L7QuVxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0J7QsdGK0LXQutGCINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lhcblx0ICovXG5cdHBhdXNlKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuaGlkZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQvdCw0YfQsNC70LUg0LjQu9C4INC/0YDQvtC00L7Qu9C20LXQvdC40Lgg0YDQsNCx0L7RgtGLIHZpZXcgKNC/0L7RgdC70LUg0YLQvtCz0L4sINC60LDQuiB2aWV3INCx0YvQu9CwINGB0LrRgNGL0YLQsClcblx0ICog0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQvtC/0YDQtdC00LXQu9GP0YLRjCDRgdCy0L7QtdC5INC70L7Qs9C40LrQvtC5XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0cmVzdW1lKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXHRcdHRoaXMuc2hvdygpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7QutCw0LfRi9Cy0LDQtdGCIHZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRzaG93KG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblx0XHRzZWxmLl9lbC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKHNlbGYuYm9keUNsYXNzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoc2VsZi5ib2R5Q2xhc3MpO1xuICAgICAgICB9XG5cdH1cblxuXHQvKipcblx0ICog0KHQutGA0YvQstCw0LXRgiB2aWV3XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0aGlkZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0c2VsZi5fZWwuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGYuYm9keUNsYXNzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoc2VsZi5ib2R5Q2xhc3MpO1xuICAgICAgICB9XG5cdH1cblxuXHQvKipcblx0ICog0KDQtdC90LTQtdGA0LjRgiB2aWV3XG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L7Qv9GA0LXQtNC10LvRj9GC0Yxcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRyZW5kZXIob3B0aW9ucyA9IHt9KSB7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiDQktGB0YLQsNCy0LvRj9C10YIg0YLQtdC60YPRidGD0Y4gdmlldyDQsiDQv9C10YDQtdC00LDQvdC90YvQuSDRjdC70LXQvNC10L3RglxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIEhUTUwt0Y3Qu9C10LzQtdC90YIsINC6INC60L7RgtC+0YDQvtC80YMg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqL1xuXHRhcHBlbmRUbyhlbCkge1xuXHRcdGVsLmFwcGVuZENoaWxkKHRoaXMuX2VsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQo9C00LDQu9GP0LXRgiDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqL1xuXHRyZW1vdmUoKSB7XG5cdFx0dGhpcy5fZWwgJiYgdGhpcy5fZWwucmVtb3ZlKCk7XG5cdH1cblxuXHQvKipcblx0ICog0JfQsNC80LXQvdGP0LXRgiDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gSFRNTC3RjdC70LXQvNC10L3Rgiwg0LrQvtGC0L7RgNGL0Lkg0YHRgtCw0L3QvtCy0LjRgtGB0Y8g0Y3Qu9C10LzQtdC90YLQvtC8INGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICovXG5cdHNldEVsZW1lbnQoZWwpIHtcblx0XHR0aGlzLl9lbCAmJiB0aGlzLl9lbC5yZW1vdmUoKTtcblx0XHR0aGlzLl9lbCA9IGVsO1xuXHR9XG5cblx0LyoqXG5cdCAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGC0LXQutGD0YnQtdC5IHZpZXcg0L3QsNCx0L7RgCDQsNGC0YDQuNCx0YPRgtC+0LJcblx0ICogQHBhcmFtIHtPYmplY3R9IFthdHRycz17fV0gLSDQntCx0YrQtdC60YIg0YEg0LDRgtGA0LjQsdGD0YLQsNC80LgsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0YPRgdGC0LDQvdC+0LLQu9C10L3RiyDRgyDRgtC10LrRg9GJ0LXQs9C+INGN0LvQtdC80LXQvdGC0LAgdmlld1xuXHQgKi9cblx0c2V0QXR0cnMoYXR0cnMgPSB7fSkge1xuXHRcdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0dGhpcy5fZWwuc2V0QXR0cmlidXRlKG5hbWUsIGF0dHJzW25hbWVdKTtcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0YLRgNC+0LrRgywg0YHQvtC00LXRgNC20LDRiNGD0Y4g0YLQtdC60YHRgtC+0LLQvtC1INC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9lbC5vdXRlckhUTUw7XG5cdH1cblxuXHQvKipcblx0ICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YPRidC10LkgdmlldyDRgNC+0YPRgtC10YBcblx0ICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtINC40L3RgdGC0LDQvdGBINGA0L7Rg9GC0LXRgNCwXG5cdCAqL1xuXHRzZXRSb3V0ZXIocm91dGVyKSB7XG5cdFx0dGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2R1bGVzL3ZpZXcuanMiLCJ2YXIgbmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzL2Jyb3dzZXIuanMnKS5uZXh0VGljaztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpbW1lZGlhdGVJZHMgPSB7fTtcbnZhciBuZXh0SW1tZWRpYXRlSWQgPSAwO1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkgeyB0aW1lb3V0LmNsb3NlKCk7IH07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwod2luZG93LCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gVGhhdCdzIG5vdCBob3cgbm9kZS5qcyBpbXBsZW1lbnRzIGl0IGJ1dCB0aGUgZXhwb3NlZCBhcGkgaXMgdGhlIHNhbWUuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldEltbWVkaWF0ZSA6IGZ1bmN0aW9uKGZuKSB7XG4gIHZhciBpZCA9IG5leHRJbW1lZGlhdGVJZCsrO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPCAyID8gZmFsc2UgOiBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgaW1tZWRpYXRlSWRzW2lkXSA9IHRydWU7XG5cbiAgbmV4dFRpY2soZnVuY3Rpb24gb25OZXh0VGljaygpIHtcbiAgICBpZiAoaW1tZWRpYXRlSWRzW2lkXSkge1xuICAgICAgLy8gZm4uY2FsbCgpIGlzIGZhc3RlciBzbyB3ZSBvcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiB1c2UtY2FzZVxuICAgICAgLy8gQHNlZSBodHRwOi8vanNwZXJmLmNvbS9jYWxsLWFwcGx5LXNlZ3VcbiAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm4uY2FsbChudWxsKTtcbiAgICAgIH1cbiAgICAgIC8vIFByZXZlbnQgaWRzIGZyb20gbGVha2luZ1xuICAgICAgZXhwb3J0cy5jbGVhckltbWVkaWF0ZShpZCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaWQ7XG59O1xuXG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gdHlwZW9mIGNsZWFySW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBjbGVhckltbWVkaWF0ZSA6IGZ1bmN0aW9uKGlkKSB7XG4gIGRlbGV0ZSBpbW1lZGlhdGVJZHNbaWRdO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gODdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vbGlicyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJNb2RlbCB7XG4gICAgY29uc3RydWN0b3IoZGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSBkYXRhLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgICB0aGlzLmVtYWlsID0gZGF0YS5lbWFpbDtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IGRhdGEucGFzc3dvcmQ7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLmdhbWVzID0gMDtcblxuICAgICAgICB0aGlzLmVtYWlsRXJyb3IgPSAnJztcbiAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gJyc7XG4gICAgICAgIHRoaXMubG9naW5FcnJvciA9ICcnO1xuICAgIH1cblxuICAgIHZhbGlkYXRlTG9naW4gKCkge1xuICAgICAgICBpZiAodGhpcy51c2VybmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3IgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC60LvQuNC60YPRhdGDISc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2dpbkVycm9yID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlUGFzc3dvcmQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhc3N3b3JkLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRFcnJvciA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMISc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGFzc3dvcmQubGVuZ3RoIDwgOCkge1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gJ9Cf0LDRgNC+0LvRjCDQvdGD0LbQtdC9INC00LvQuNC90L3QtdC1IDgg0YHQuNC80LLQvtC70L7QsiA9KCc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlRW1haWwoKSB7XG4gICAgICAgIGlmICh0aGlzLmVtYWlsLnNlYXJjaCgvLitALitcXC4uKy8pID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5lbWFpbEVycm9yID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQv9GA0L7QstC10YDRjNGC0LUg0L/RgNCw0LLQuNC70YzQvdC+0YHRgtGMIGUtbWFpbCc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWFpbEVycm9yID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHNlbGYudmFsaWRhdGVFbWFpbCgpICYmIHNlbGYudmFsaWRhdGVMb2dpbigpICYmIHNlbGYudmFsaWRhdGVQYXNzd29yZCgpO1xuICAgIH1cblxuICAgIGdldEVtYWlsRXJyb3IgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbWFpbEVycm9yO1xuICAgIH1cblxuICAgIGdldExvZ2luRXJyb3IgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2dpbkVycm9yO1xuICAgIH1cblxuICAgIGdldFBhc3N3b3JkRXJyb3IgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXNzd29yZEVycm9yO1xuICAgIH1cblxuICAgIHNhdmUgKCkge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlcm5hbWUsXG4gICAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgICAgICAgZ2FtZXM6IHRoaXMuZ2FtZXMsXG4gICAgICAgICAgICBzY29yZTogdGhpcy5zY29yZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdCgnaHR0cHM6Ly9haXItZHJvbmUuaGVyb2t1YXBwLmNvbS91c2VyJywgJ1BPU1QnLCBkYXRhKTtcbiAgICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgNDAwOlxuICAgICAgICAgICAgY2FzZSA0MDM6IHRoaXMuZW1haWxFcnJvciA9ICfQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YEg0YLQsNC60LjQvCDQsNC00YDQtdGB0L7QvCDRg9C20LUg0LvQtdGC0LDQtdGCISc7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDIwMDogdGhpcy5lbWFpbEVycm9yID0gdGhpcy5wYXNzd29yZEVycm9yID0gdGhpcy5sb2dpbkVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmxvZygn0KfRgtC+LdGC0L4g0L3QtSDRgtCw0LosINC90L4g0L3QtSA0MDAnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgZGVsZXRlICgpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgIH1cblxuICAgIGxvZ2luICgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdCgnaHR0cHM6Ly9haXItZHJvbmUuaGVyb2t1YXBwLmNvbS9zZXNzaW9uJywgJ1BPU1QnLCBkYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzKVxuICAgICAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSA0MDA6XG4gICAgICAgICAgICBjYXNlIDQwMzogdGhpcy5lbWFpbEVycm9yID0gJ9Cd0LXQstC10YDQvdGL0Lkg0LvQvtCz0LjQvSDQuNC70Lgg0L/QsNGA0L7Qu9GMISc7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDIwMDogdGhpcy5lbWFpbEVycm9yID0gdGhpcy5wYXNzd29yZEVycm9yID0gdGhpcy5sb2dpbkVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VybmFtZSA9IHJlc3BvbnNlLnJlc3BvbnNlLnVzZXJuYW1lOyAvLyDQmtC+0LPQtNCwINC90LUg0LHRg9C00LXRgiDRgNCw0LHQvtGC0LDRgtGMLCDQvtGI0LjQsdC60YMg0LjRgdC60LDRgtGMINC30LTQtdGB0YwuXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZSA9IHJlc3BvbnNlLnJlc3BvbnNlLnNjb3JlO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSByZXNwb25zZS5yZXNwb25zZS5nYW1lcztcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUubG9nKCfQp9GC0L4t0YLQviDQvdC1INGC0LDQuiwg0L3QviDQvdC1IDQwMCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBnZXRTY29yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmU7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZGVscy9Vc2VyTW9kZWwuanMiXSwic291cmNlUm9vdCI6IiJ9