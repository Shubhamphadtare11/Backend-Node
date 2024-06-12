//vid 4 Part 1

// var os = require('os');
// var fs = require('fs');

// var user= os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile("greeting.txt","Hi " + user.username + '!\n',()=>  console.log("file is created"))

//-----------------------------------------------------

//vid 4 Part 2

// const notes = require("./notes.js");

// console.log("Current Age : " + notes.age);

// let result = notes.addNumber(notes.age,10)

// console.log("Age after ten years : " + result);

//----------------------------------------------

//vid 4 Part 3

//  const _ = require("lodash");

// var data = ["person","person",1,1,2,3,3,4,5,6,7,7,"name","age","age"];

// var filteredArray = _.uniq(data);

// console.log(filteredArray);

//-----------------------------------------------

//vid 5 part 1 

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.post('/items',(req,res)=>{
//     res.send('Items saved')
// })

//below is sample payload data for post req in postman

// {
//     "name": "Mango Smoothie",
//     "price": 4.99,
//     "taste": "Sweet",
//     "is_drink": true,
//     "ingredients": [
//         "mango",
//         "yogurt",
//         "honey"
//     ],
//     "num_sales": 45
// }


// app.get('/idli', (req, res) => {

//     let customised_idli={
//         name:"Special Idli",
//         size:"20cm diamter",
//         isSambhar:true
//     }

//     res.send(customised_idli)
//   })

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`)
// })

//----------------------------------

//vid 6

const express = require('express')
const app = express()
//vid 7 part 1
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')  
//vid 7 part 2
const bodyParser = require('body-parser');
app.use(bodyParser.json())//it will store parsed data in req.body
const PORT = process.env.PORT || 3000;

//Vid 10
//Middleware Function
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next(); //Move on to the next phase
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/',(req, res) => {
  res.send('Hello World!')
})

//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

