import View from '../modules/view';
import template from '../../templates/game.tmpl.xml';
import GameModel from '../models/GameModel';
import gameCanvas from '../canvas';
const fetchRetry = require('fetch-retry');
const cookie = require('js-cookie');

export default class GameView extends View {
    constructor (data = {}) {
        super({ element: '.js-game', bodyClass: 'body-game' });
        this._game = new GameModel();
    }

    render () {
       if (!cookie.get('airdroneEmail')) {
           this.router.go('/');
           return;
       }
       this._el.innerHTML = template({ source: this._game.getVideo() });
        // check the connection:
        fetchRetry('https://air-drone.herokuapp.com/user', {
            retries: 10,
            retryDelay: 500,
        }).then(response => {
            document.querySelector('.js-noconnection').hidden = true;
        }).catch(function () {
            document.querySelector('.js-noconnection').hidden = false;
            fetchRetry('https://air-drone.herokuapp.com/user', {
                retries: 100,
                retryDelay: 1000,
            }).then(response => {
                document.querySelector('.js-noconnection').hidden = true;
            });
        });
        gameCanvas();
    }
}
