const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3000 })
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('Hello! Message From Server!!')
})



// var net = require('net');
// var client = net.connect({port: 8080}, function() {
//   // we can send data back
//   client.write();
// });
// client.on('data', function(data) {
//   // receive data here
// });
// client.on('end', function() {
//   // we received a FIN packet
// });