import RoomModel from '../models/RoomModel';

export default class RoomCollection {
    constructor() {
        this._data = [];
    }

    fetch() {
        return fetch('/games').then(response => {
            if (response.status !== 200) {
                reject(response);
            }
            return response.json();
        }).then(data => {
            this._data = data;
        }).catch();
    }

    getCollection() {
        return this._data;
    }
}
