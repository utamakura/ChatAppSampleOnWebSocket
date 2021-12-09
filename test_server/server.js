const app = require('express')();

const fs = require('fs');
const SERVER_KEY = './certificate/server_key.pem';
const SERVER_CERT = './certificate/server_cert.pem';
const credentials = {
    key: fs.readFileSync(SERVER_KEY),
    cert: fs.readFileSync(SERVER_CERT),
    rejectUnauthorized: false,
}
const https = require('https').createServer(credentials, app);
const PORT = 8443;
const io = require('socket.io')(https, {
    cors: {
        methods: ['GET', 'POST'],
        origin: "*"
    }
});

https.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
    console.log('new client connected. socket.id=' + socket.id);
    socket.emit('connection', null);

    socket.on('sendMessage', (message) => {
        console.log('request sendMessage. message=' + JSON.stringify(message));
        io.emit('message', message);
    });
});
