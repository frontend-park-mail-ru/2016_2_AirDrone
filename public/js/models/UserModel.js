import request from '../libs';
const cookie = require('js-cookie');

export default class UserModel {
    constructor(data = {}) {
        this.username = data.username || '';
        this.email = data.email;
        this.password = data.password;
        this.score = 0;
        this.games = 0;

        this.emailError = '';
        this.passwordError = '';
        this.loginError = '';
    }

    validateLogin () {
        if (this.username.length < 1) {
            this.loginError = 'Пожалуйста, введите кликуху!';
            return false;
        }
        this.loginError = '';
        return true;
    }

    validatePassword() {
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

    validateEmail() {
        if (this.email.search(/.+@.+\..+/) === -1) {
            this.emailError = 'Пожалуйста, проверьте правильность e-mail';
            return false;
        }
        this.emailError = '';
        return true;
    }

    validate() {
        const self = this;
        return self.validateEmail() && self.validateLogin() && self.validatePassword();
    }

    getEmailError () {
        return this.emailError;
    }

    getLoginError () {
        return this.loginError;
    }

    getPasswordError () {
        return this.passwordError;
    }

    save () {
        const data = {
            username: this.username,
            email: this.email,
            password: this.password,
            games: this.games,
            score: this.score,
        };
        if (!this.validate()) {
            return null;
        }
        const response = request('https://air-drone.herokuapp.com/user', 'POST', data);
        switch (response.status) {
            case 400:
            case 403: this.emailError = 'Пользователь с таким адресом уже летает!';
                      this.passwordError = '';
                      break;
            case 200: this.emailError = this.passwordError = this.loginError = '';
                      cookie.remove('airdroneEmail');
                      cookie.set('airdroneEmail', data.email);
                      break;
            default: console.log('Что-то не так, но не 400');
        }
        return response;
    }

    delete () {
        // TODO
    }

    login () {
        const data = {
            email: this.email,
            password: this.password,
        };
        const response = request('https://air-drone.herokuapp.com/session', 'POST', data);
        console.log(response.status)
        switch (response.status) {
            case 400:
            case 403: this.emailError = 'Неверный логин или пароль!';
                      this.passwordError = '';
                      break;
            case 200: this.emailError = this.passwordError = this.loginError = '';
                      this.username = response.response.username; // Когда не будет работать, ошибку искать здесь.
                      this.score = response.response.score;
                      this.games = response.response.games;
                      cookie.remove('airdroneEmail');
                      cookie.set('airdroneEmail', data.email);
                      break;
            default: console.log('Что-то не так, но не 400');
        }
        return response;
    }

    getScore() {
        return this.score;
    }
}
