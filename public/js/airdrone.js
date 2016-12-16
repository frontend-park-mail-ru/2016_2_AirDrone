const cookie = require('js-cookie');
import Router from './modules/router';
import LoginView from './views/loginView';
import RegistrationView from './views/registrationView';
import ScoreboardView from './views/scoreboardView';
import RoomsView from './views/roomsView';
import GameView from './views/gameView';

let router = new Router();
router.addRoute('/login', LoginView);
router.addRoute('/registration', RegistrationView);
router.addRoute('/scoreboard', ScoreboardView);
router.addRoute('/rooms', RoomsView);
router.addRoute('/game', GameView);
router.addRoute('/', LoginView);
router.start();
window.router = router;
