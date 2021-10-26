import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';
import ioEvents from './public/io-events.js';
import { timeStamp } from 'console';

const PORT = 8787;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.use(express.static('public'));
app.use(express.static('www'));

httpServer.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
});


// Connexion des clients

socketServer.on(IOEVENTS.CONNECTION, async (socket) => {

    console.log(socket.id);
    await newUser(socket);

    socket.on(IOEVENTS.SEND_MESSAGE, message =>{
        console.log(message);
        const messageToBroadcast ={
            socketId: socket.id, // qui l'a send
            text:message.text, // le message
            timestamp: dayjs(), // le temps de l'envoie
            avatar: socket.data.identity.avatar,
            name: socket.data.identity.name
        }
        socketServer.emit(IOEVENTS.NEW_MESSAGE, messageToBroadcast); // Message envoyer à tous
    });

    //Reception d'une demande de changement de nom
    socket.on(IOEVENTS.CHANGE_USERNAME, identity =>{
        socket.data.identity.name = identity.name;
        sendUserIdentities();
    })
    socket.on(IOEVENTS.DISCONNECT, reason =>{
        console.log(reason);
        sendUserIdentities();
    })
});

async function newUser(socket) {
const newUser = {
    id:socket.id,
    name: 'Anonyme',
    avatar: randomAvatarImage()
};
socket.data.identity=newUser;
await sendUserIdentities();
}


async function sendUserIdentities() {
    const sockets = await socketServer.fetchSockets();
    const users = sockets.map(s => s.data.identity) // map retourne un tableau(il fait une boucle dans tout le tableau)

    socketServer.emit(IOEVENTS.LIST_USERS, users); // Dit qu'un user s'est connecté
}

function randomAvatarImage() {
    const avatarNumber = Math.floor(Math.random() * 8 + 1);
    return `./images/avatar${avatarNumber}.png`;
}