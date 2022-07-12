const mongoose = require("mongoose");

var mongoDB = 'mongodb://127.0.0.1/onboarding_cms';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function (err) {
    if (err) {
        console.log(`Error in Connecting to Database: ${err}`);
        return;
    }
    console.log("Successfully Connected to Database");
})