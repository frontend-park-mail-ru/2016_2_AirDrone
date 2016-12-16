// TODO: user id from cookie to drone model
import View from '../modules/view';
import RoomCollection from '../collections/RoomCollection';
import DroneModel from '../models/DroneModel';
import template from '../../templates/rooms.tmpl.xml';
const cookie = require('js-cookie');

export default class RoomsView extends View {
    constructor (data = {}) {
        super({ element: '.js-rooms', bodyClass: 'body-rooms' });
        this.roomCollection = new RoomCollection();
        this.drone = new DroneModel({ playerEmail: cookie.get('airdroneEmail') });
        this.selectedRoom = undefined;
    }

    render () {
        this.roomCollection.fetch().then(() => {
        if (!cookie.get('airdroneEmail')) {
            this.router.go('/');
            return;
        }
            console.log('roomCollection fetch began');
            this._el.innerHTML = template(this.roomCollection.getCollection());

            this.error = this._el.querySelector('.js-error');
    
            this.rooms = this._el.querySelectorAll('.rooms__room');
            for (const room of this.rooms) {
                room.onclick = (function () { this.selectRoom(room, room.nextSibling) }).bind(this);
            }
    
            this.colors = this._el.querySelectorAll('.js-color');
            console.log(this.colors);
            for (const color of this.colors) {
                console.log(color);
                color.onclick = (function () { console.log('entered color click'); this.selectColor(color) }).bind(this);
            }
            console.log('before join');
    
            this._join = this._el.querySelector('.js-join');
            console.log(this.join);
            this._join.onclick = (function () { this.join(); }).bind(this);
            console.log('final');

            this._el.querySelector('.js-create').onclick = (function () { this.router.go('/scoreboard'); }).bind(this);
        });
    }

    selectRoom (room, details) {
        for (let i = 0; i < this.rooms.length; ++i) {
            if (this.rooms[i] !== room) {
                this.rooms[i].hidden = true;
            } else {
                this.selectedRoom = this.roomCollection.getCollection()[i].id;
            }
        }
        details.hidden = false;
    }

    selectColor(color) {
        for (const c of this.colors) {
            if (c === color) {
                c.classList.add('rooms__details__colors__color-clicked');
                c.classList.remove('rooms__details__colors__color');
            } else {
                c.classList.add('rooms__details__colors__color');
                c.classList.remove('rooms__details__colors__color-clicked');
            }
        }
        this.drone.color = color.style['background-color'];
        this.error.textContent = '';
        this.error.hidden = true;
    }

    join() {
        if (this.drone.color !== undefined) {
            this.error.textContent = '';
            this.error.hidden = true;
            this.drone.save(this.selectedRoom).then(() => {
                if (this.drone.error !== '') {
                    this.error.textContent = 'Что-то пошло не так. Попробуйте еще раз!';
                    this.error.hidden = false;
                }
                this.router.go('/game');
            });
        } else {
            this.error.textContent = 'Выберите цвет дрона!';
            this.error.hidden = false;
        }
    }

    back (details) {
        details.hidden = true;
        for (r of this.rooms) {
            r.hidden = false;
        }
        this.selectedRoom = undefined;
    }

}
