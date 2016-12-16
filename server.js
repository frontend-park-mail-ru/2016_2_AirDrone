let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');
let path = require('path');

let technolibs = require('technolibs');

app.use('/', express.static('public', { maxAge: 1 }));
app.use('/chat', express.static('public', {maxAge: 1}));
app.use('/login', express.static('public', {maxAge: 1}));
app.use('/registration', express.static('public', {maxAge: 1}));
app.use('/scoreboard', express.static('public', {maxAge: 1}));
app.use('/rooms', express.static('public', {maxAge: 1}));
app.use('/game', express.static('public', {maxAge: 1}));
technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.get('/api/session', (req, res) => {
	res.send(technoDoc.mock(require('./api/scheme/Session')))
});

app.post('/api/session', (req, res) => {
	res.send(technoDoc.mock(require('./api/scheme/Session')))
});


app.post('/api/messages', (req, res) => {
	technolibs.publish(req.body).then(body => res.json(req.body));
});

app.get('/api/messages', function (req, res) {
	res.send([
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message'))
	])
});

app.post('/user', (req, res) => {
         res.send(String('Пользователь зарегистрирован'));
         });

app.post('/session', (req, res) => {
         res.send(String('Добро пожаловать, пользователь!'));
         });

app.get('/host', (req,res) => {
    res.send(String('http://besplatnosms.ucoz.com/fon_meniaetsia/nastol.com.ua_32804.jpg'));
});

app.get('/rating', (req, res) => {
    res.send(JSON.stringify([{username: 'abc1', email: 'q@q.qqqqqqq', score: 43, games: 3 }, {username: 'abs2', email: 'w@wwwwwwwww.www', score: 23, games: 553}]));
});

app.get('/games', (req, res) =>{
    res.send(JSON.stringify([{
        id: 1,
        name: 'room1',
        ip: '1.1.1.1',
        drones: [{
            id: 188,
            color: '#ffff00',
            playerLogin: 'vasya',
            playerId: 1,
        }, {
            id: 199,
            color: '#0000ff',
            playerLogin: 'masha',
            playerId: 54,
        }],
        endCondition: 0,
        endValue: 43,
        availableColors: ['#fff', '#000', '#ff8'],
    }, {
        id: 9,
        name: 'room2',
        ip: '1.1.1.2',
        drones: [{
            id: 191,
            color: '#ff0000',
            playerLogin: 'djigurda',
            playerId: 50,
        }],
        endCondition: 1,
        endValue: 42,
        availableColors: ['#ff0', '#0f0', '#ff8'],
    }]));
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
