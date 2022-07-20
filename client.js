const WebSocket = require('ws')
const url = 'ws://localhost:3000'
const connection = new WebSocket(url)
connection.onopen = () => {
    connection.send("hello") 
}
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
connection.onmessage = (e) => {
  console.log(e.data)
}


