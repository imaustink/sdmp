var SAPIMessage = require('./sapi-message.js');

var sapi0Message = new SAPIMessage();
var message = sapi0Message.stringify({
    resource: 'users',
    method: 'getAll',
    type: 'json'
}, {
    message: 'Hello World!'
});
console.log(message);
console.log(SAPIMessage.parse(message));