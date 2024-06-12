//vid 7 part 2

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})



personSchema.pre('save', async function(next){
    const person = this;

    //Hash the password only if it has been modified or new
    if(!person.isModified('password')) return next();

    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override the plain password with the hashed one
        person.password = hashedPassword;

        next()
    }
    catch(error){
        return next(error)
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(error){
        throw error;
    }
}

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