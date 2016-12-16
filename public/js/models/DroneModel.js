export default class DroneModel {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.color = data.color || undefined;
        this.playerLogin = data.playerLogin;
        this.playerEmail = data.playerEmail;
        this.host = data.host;
        this.error = '';
    }

    save(room) {
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
                    playerEmail: this.playerEmail,
                },
            })
        }).then(response => {
            if (response.status !== 200) {
                reject(response);
            }
            return response.json();
        }).then(data => {
            this.error = '';
        }).catch(() => {
            this.error = 'Failed to save drone!';
        });
    }
}
