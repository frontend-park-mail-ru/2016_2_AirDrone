import View from '../modules/view';
import UserModel from '../models/UserModel';
import template from '../../templates/registration.tmpl.xml';
const cookie = require('js-cookie');

export default class RegistrationView extends View {
    constructor (options = {}) {
        super({ element: '.js-registration', bodyClass: 'body-registration' });
    }

    render() {
        if (cookie.get('airdroneEmail')) {
            this.router.go('/rooms');
            return;
        }
        this._el.innerHTML = template(this.data);
        this._form = this._el.querySelector('.js-registration-form');
        this._form.onsubmit = (function () { this.register(); return false; }).bind(this);
        this._form.children.email.onblur = (function () { this.validateEmail(); }).bind(this);
        this._form.children.password.onblur = (function () { this.validatePassword(); }).bind(this);
        this._form.children.password.onkeyup = (function (e) { 
            if (e.keyCode !== 8 && e.keyCode !== 9) {
                this.validatePassword();
            }
        }).bind(this);
        this._form.children.password2.onblur = (function () { this.validatePassword(); }).bind(this);
        this._form.children.password2.onkeyup = (function (e) {
            if (e.keyCode !== 8 && e.keyCode !== 9) {
                this.validatePassword();
            }
        }).bind(this);
        this._form.children.login.onblur = (function () { this.validateLogin(); }).bind(this);
        this.emailError = this._form.children.emailError;
        this.passwordError = this._form.children.passwordError;
        this.loginError = this._form.children.loginError;
    }

    validateEmail() {
        if (this._form.elements.email.value.search(/.+@.+\..+/) === -1) {
            this.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail';
            this.emailError.style.display = 'block';
            return false;
        }
        this.emailError.hidden = true;
        this.emailError.innerHTML = '';
        return true;
    }

    validatePassword() {
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
        if (this._form.elements.password2.value.length > 0
            && this._form.elements.password.value != this._form.elements.password2.value) {
            this._form.children.passwordError.innerHTML = 'Пароли не совпадают!';
            this.passwordError.hidden = false;
            return false;
        }
        this.passwordError.innerHTML = '';
        this.passwordError.hidden = true;
        return true;
    }

    validateLogin() {
        if (this._form.elements.login.value.length < 1) {
            this.loginError.innerHTML = 'Пожалуйста, введите кликуху!';
            this.loginError.style.display = 'block';
            return false;
        }
        this.loginError.hidden = true;
        this.loginError.innerHTML = '';
        return true;
    }

    validate() {
        return this.validateEmail(this) && this.validatePassword(this) && this.validateLogin(this);
    }

    register() {
        if (!this.validate()) {
            return;
        }
        const user = new UserModel({
            username: this._form.elements.login.value,
            email: this._form.elements.email.value,
            password: this._form.elements.password.value,
        });

        const response = user.save();
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
}
