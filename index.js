const express = require('express');
var net = require('net');
const http = require('http')
const config = require('config')
const WebSocket = require('ws')
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
const temp = ()=>{
    let student_ids = []
    student_ids = snj.send_notification_job()
    student_ids.then(res=>{
        wss.on('connection', ws => {
            ws.on('message', message => {
            console.log(`Received message => ${message}`)
            })
            res.forEach((key,value) => {
                ws.send(value + " Please submit assignment " + key)
            });
        })
        console.log(res,"Submit your assignment")}).catch((err)=>console.log(err,"errrrrrrrrr"))
}

nodeCron.schedule("*/10 * * * * *", temp);
module.exports = app