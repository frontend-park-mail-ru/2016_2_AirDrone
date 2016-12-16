export default class GameModel {
    constructor (options = {}) {
        this.host = options.host || '/image/fill.jpg';
        this.wsHost = options.wsHost || '/socket';
        this.ws = new WebSocket(`wss://${this.wsHost}`);
        this.ws.onopen = function () {
            console.log('socket opened');
            document.window.onkeydown = function(e) {
                switch (e.key) {
                    case 'i':
                        this.ws.send(JSON.stringify({ direction: 'height', state: 1 }));
                        break;
                    case 'k':
                        this.ws.send(JSON.stringify({ direction: 'height', state: -1 }));
                        break;
                    case 'j':
                        this.ws.send(JSON.stringify({ direction: 'strafe', state: -1 }));
                        break;
                    case 'l':
                        this.ws.send(JSON.stringify({ direction: 'strafe', state: 1 }));
                        break;
                    case 'w':
                        this.ws.send(JSON.stringify({ direction: 'front', state: 1 }));
                        break;
                    case 's':
                        this.ws.send(JSON.stringify({ direction: 'front', state: -1 }));
                        break;
                    case 'a':
                        this.ws.send(JSON.stringify({ direction: 'turn', state: 1 }));
                        break;
                    case 'd':
                        this.ws.send(JSON.stringify({ direction: 'turn', state: -1 }));
                    default:
                        break;
                }
            }

            document.window.onkeyup = function(e) {
                switch (e.key) {
                    case 'i':
                    case 'k':
                        this.ws.send(JSON.stringify({ direction: 'height', state: 0 }));
                        break;
                    case 'j':
                    case 'l':
                        this.ws.send(JSON.stringify({ direction: 'strafe', state: 0 }));
                        break;
                    case 'w':
                    case 's':
                        this.ws.send(JSON.stringify({ direction: 'front', state: 0 }));
                        break;
                    case 'a':
                    case 'd':
                        this.ws.send(JSON.stringify({ direction: 'turn', state: 0 }));
                    default:
                        break;
                }
            }
        }

        this.ws.onmessage = function (e) {
            const incomingMessage = event.data;
			const message = JSON.parse(incomingMessage);
            switch (message.message) {
                case 1:
                    window.mode1();
                    break;
                case 2:
                    window.mode2();
                    break;
                default:
                    window.mode = 0;
            }
        }
        this.error = '';
    }

    getHost () {
        return fetch('/host').then(response => {
            if (response.status !== 200) {
                return undefined;
            }
            return response.json();
        }).then(data => {
            this.host = data.host;
            this.error = '';
        }).catch(() => {
            this.error = `Can't reach the host ${this.host}!`;
        });
    }

    getVideo() {
        this.getHost();
        return this.host;
    }
}
