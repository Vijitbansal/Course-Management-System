const WebSocket = require('ws')
// const snj = require("./Jobs/send_notification_job")
const url = 'ws://localhost:3000'
const connection = new WebSocket(url)
// let student_to_send_mail = []
// if(student_to_send_mail)
// {
// console.log(student_to_send_mail)
// }
connection.onopen = () => {
    connection.send("hello") 
}
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
connection.onmessage = (e) => {
  console.log(e.data)
}


