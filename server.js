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
const port = 3000
//vid 7 part 1
const db = require('./db')
//vid 7 part 2
const bodyParser = require('body-parser')
app.use(bodyParser.json())//it will store parsed data in req.body
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Post route to add a person
app.post('/person',async(req,res)=>{

    try{
        const data = req.body //Assuming the request body contains the person data

        //Create a new Person document using the mongoose model
        const newPerson = new Person(data);

        //Save the new person to database
        const response = await newPerson.save();
        console.log("data saved successfully!");
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server errror"})
    }

   
})

//GET method to get the person
app.get('/person',async(req,res)=>{

    try{
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data); 
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server errror"})
    }

   
})

//vid 8 part 1
//post method to add Menu Item

app.post('/menu',async(req,res)=>{
    try{
        const data=req.body;
        const newMenu= new MenuItem(data);
        const response = await newMenu.save();
        console.log("data saved");
        res.status(200).json(response);

    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
})

//get method to fetch Menu Items

app.get('/menu',async(req,res)=>{

    try{
        const data = await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data)
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
})

//vid 8 part 2
// parameterised URL

app.get('/person/:workType',async(req,res)=>{

    try{
        const workType = req.params.workType //Extract the workType from URL parameter

        if(workType=="chef" || workType=="manager" || workType=="waiter"){
            const response = await Person.find({work:workType});
            console.log("response fetched")
            res.status(200).json(response);
        }
        else{
            res.status(400).json({error:"invalid worktype"})
        }
    }
    catch(error){
                console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

