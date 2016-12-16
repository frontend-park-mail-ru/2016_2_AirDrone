import View from '../modules/view';
import UserModel from '../models/UserModel';
import template from '../../templates/login.tmpl.xml';
const cookie = require('js-cookie');

export default class LoginView extends View {
    constructor () {
        super({ element: '.js-login', bodyClass: 'body-login' });
    }

    render() {
        if (cookie.get('airdroneEmail')) {
            this.router.go('/rooms');
            return;
        }
        this._el.innerHTML = template(this.data);
        this._form = this._el.querySelector('.js-login-form');
        this._form.onsubmit = (function () { this.login(); return false; }).bind(this);
        this._form.children.email.onblur = (function () { this.validateEmail(); }).bind(this);
        this._form.children.password.onblur = (function () { this.validatePassword(); }).bind(this);
        this._form.children.password.onkeyup = (function (e) { 
            if (e.keyCode !== 8 && e.keyCode !== 9) {
                this.validatePassword();
            }
        }).bind(this);
        this._form.children.registration.onclick = (function () { this.router.go('/registration'); }).bind(this);
        this.emailError = this._form.children.emailError;
        this.passwordError = this._form.children.passwordError;
    }

    validateEmail() {
        if (this._form.elements.email.value.search(/.@./) === -1) {
            this.emailError.hidden = false;
            this.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail!';
            return false;
        }
        this.emailError.hidden = true;
        this.emailError.innerHTML = '';
        return true;
    }

    validatePassword() {
        if (this._form.elements.password.value.length < 1) {
            this.passwordError.hidden = false;
            this.passwordError.innerHTML = 'Пожалуйста, введите пароль!';
            return false;
        }
        this.passwordError.hidden = true;
        this.passwordError.innerHTML = '';
        return true;
    }

    validate() {
        return this.validateEmail() && this.validatePassword();
    }

    login() {
        if (!this.validate()) {
            return;
        }
        const user = new UserModel({
            email: this._form.elements.email.value,
            password: this._form.elements.password.value,
        });

        const response = user.login();
        this._form.children.emailError.innerHTML = user.getEmailError();
        this._form.children.passwordError.innerHTML = user.getPasswordError();
        this._form.children.emailError.hidden = this._form.children.emailError.innerHTML ? false : true;
        this._form.children.passwordError.hidden = this._form.children.passwordError.innerHTML ? false : true;
        if (response.status == 200) {
            this.router.go('/rooms');
        }
    }
}
