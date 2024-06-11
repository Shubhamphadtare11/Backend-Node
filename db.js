//vid 7 part 1

const mongoose = require('mongoose')
require('dotenv').config();

//Define MongoDB connection URL
const mongoURL = process.env.DB_URL;
              

//Setup MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB conenction
const db = mongoose.connection;

//Define event listeners for database connection

db.on("connected",()=>{
    console.log("Connected to MongoDB server")
})

db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

db.on("disconnected",()=>{
    console.log("MongoDB disconnected")
})

//Export the database connection

module.exports = db;