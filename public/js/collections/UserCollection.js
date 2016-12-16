const cookie = require('js-cookie');

export default class UserCollection {
    construtor() {
        this._data = [];
    }

    fetch() {
        return fetch('/rating').then(response => {
                    if (response.status !== 200) {
                        reject(response);
                    }
                    return response.json();
                }).then(data => {
                    this._data = data;
                    this.sort();
                }).catch();
    }

    sort() {
        this._data.sort((a, b) => b.score - a.score);
    }

    getCollection() {
        return this._data;
    }
}
