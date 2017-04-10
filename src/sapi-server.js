const WebSocket = require('ws');
const EventEmitter = require('events').EventEmitter;
const SAPIMessage = require('./sapi-message.js');

class SAPIServer extends EventEmitter{
    constructor(){
        
    }
}

const wss = new WebSocket.Server({port: 8080});
 
// Broadcast to all
wss.broadcast = function broadcast(data){
    wss.clients.forEach(function each(client){
        if(client.readyState === WebSocket.OPEN){
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws){
    ws.on('message', function incoming(data){
        wss.clients.forEach(function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data);
            }
        });
    });
});