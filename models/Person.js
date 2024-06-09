//vid 7 part 2

const mongoose = require('mongoose');

//Define the Person schema

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    },
})

//Create person model
const Person = mongoose.model("Person",personSchema)
module.exports=Person;


//below is sample data


 //below is sample payoad for person get and post methods
    // {

    //     "name": "Alice",
        
    //     "age": 28,
        
    //     "work": "chef",
        
    //     "mobile": "123-456-7890",
        
    //     "email":"alice@example.com",
        
    //     "address": "123 Main St, City",
        
    //     "salary": 60000
        
    //     }