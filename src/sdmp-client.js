var SDMPMessage = require('./sdmp-message.js');

var sdmp0Message = new SDMPMessage();
var message = sdmp0Message.stringify({
    resource: 'users',
    method: 'getAll',
    type: 'json'
}, {
    message: 'Hello World!'
});
console.log(message);
console.log(SDMPMessage.parse(message));