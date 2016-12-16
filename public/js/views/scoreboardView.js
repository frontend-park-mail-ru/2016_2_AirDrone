import View from '../modules/view';
import UserCollection from '../collections/UserCollection';
import template from '../../templates/scoreboard.tmpl.xml';

export default class ScoreboardView extends View {
    constructor (options = {}) {
        super({ element: '.js-scoreboard' });
        this.userCollection = new UserCollection();
    }

    resume(options = {}) {
        this.render();
        this.show();
    }

    render() {
        this.userCollection.fetch().then(() => {
            console.log('got here');
            this._el.innerHTML = template(this.userCollection.getCollection());
        });
    }

    show(options = {}) {
        super.show();
        document.body.classList.add('body-scoreboard');
    }

    hide(options = {}) {
        super.hide();
        document.body.classList.remove('body-scoreboard');
    }
}
