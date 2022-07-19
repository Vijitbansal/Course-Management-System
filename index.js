const express = require('express');
var net = require('net');

// const socketIO = require('socket.io')
const http = require('http')
const config = require('config')
// const mongoose = require('mongoose')
const WebSocket = require('ws')
// const url = 'ws://localhost:8080'
// const connection = new WebSocket(url)


const nodeCron = require('node-cron');
const ucsj = require("./Jobs/update_course_status_job")
const snj = require("./Jobs/send_notification_job")
const cors = require("cors");


const app = express();
global.__basedir = __dirname;
app.use(cors());

const routes = require("./routes");
const db = require("./config/mongoose");
app.use(express.urlencoded());
app.use(express.json());

const Course = require("./models/course");


// nodeCron.schedule("*/10 * * * * *" , async function() {
//     try{
//         let courses = await Course.find({}) 
//         let current_date = new Date();
//         if(courses){
//             courses.forEach((course) => {
//                if(course.status == "RUNNING" && course.end_date < current_date ){
//                             console.log(course);
//                     course.status = "COMPLETED";
//                     course.save();
//                }   
//             // console.log(courses);
//             })
//         }
//         console.log("Updating the status of the course.");
//     }
//     catch{
//         console.log("Error in updating the status of the job.")
//     }
// } )
nodeCron.schedule("*/10 * * * * *", ucsj.update_course_status_job);


app.use("/", routes);
app.listen(8000, function (err) {
    if (err) {
        console.log(`Error :${err}`);
        return;
    }
    console.log("Server Is Running");
})

const wss = new WebSocket.Server({ port: 3000 })
// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log(`Received message => ${message}`)
//   })
//   ws.send('Hello! Message From Server!!')
// })

const temp = ()=>{
    let student_ids = []
    student_ids = snj.send_notification_job()
    // console.log(student_ids,"last attempttttt")
    student_ids.then(res=>{
        wss.on('connection', ws => {
            ws.on('message', message => {
            console.log(`Received message => ${message}`)
            })
            res.forEach((key,value) => {
                ws.send(value + " Please submit assignment " + key)
            });
            // ws.send(`${res}`)
        })
        console.log(res,"Submit your assignment")}).catch((err)=>console.log(err,"errrrrrrrrr"))
}

nodeCron.schedule("*/10 * * * * *", temp);

// connection.onopen = () => {
//     res.forEach( async (student_id)=>{
//         connection.send(`${student_id} + Please submit the assignment`) 
//     });
//     }
// connection.onerror = (error) => {
//     console.log(`WebSocket error: ${error}`)
//   }
//   connection.onmessage = (e) => {
//     console.log(e.data)
//   }

// if(student_ids){
//     connection.onopen = () => {
//         if(student_ids){
//         student_ids.forEach( async (student_id)=>{
//             connection.send(`${student_id} + Please submit the assignment`) 
//         });
//         }
        
//     }
//     connection.onerror = (error) => {
//         console.log(`WebSocket error: ${error}`)
//       }
//       connection.onmessage = (e) => {
//         console.log(e.data)
//       }
      
// }



// const server = http.createServer(app)
// const io = socketIO(server, {
//   path: '/notification/'
// })
// require('./controllers/notification')(io)

// // require('./routes')(app)

// const port = config.port || 3000
// server.listen(port, () => {
//   console.log(`Notification Mgmt running on port ${port}.`)
// })

module.exports = app