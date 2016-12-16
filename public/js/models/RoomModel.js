export default class RoomModel {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.name = data.name || 'New Room';
        this.ip = data.ip || '127.0.0.1';
        this.drones = data.drones || [];
        this.endCondition = data.endCondition || 0;
        this.endValue = data.endValue || 0;
        this.availableColors = data.availableColors || [];
        this.error = '';
    }

    fetch() {
        return fetch('/room', {
            body: JSON.stringify({
                room: this.id,
            })
        }).then(response => {
            if (response.status !== 200) {
                reject(response);
            }
            return response.json();
        }).then(data => {
            this.id = data.id;
            this.name = data.name;
            this.ip = data.ip;
            this.drones = data.drones;
            this.endCondition = data.endCondition;
            this.endValue = data.endValue;
            this.availableColors = data.availableColors;
            this.error = 0;
        }).catch(() => {
            this.error = 'Wrong room name';
        });
    }

    save() {
        return fetch('/room', {
            method: 'POST',
            body: JSON.stringify({
                name: this.name,
                ip: this.ip,
                drones: [],
                endCondition: this.endCondition,
                endValue: this.endValue,
            }).then(response => {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(data => {
                this.error = '';
            }).catch(() => {
                this.error = 'Duplicated rooms!';
            })
        });
    }

    listDrones() {
        return this.drones;
    }
}
