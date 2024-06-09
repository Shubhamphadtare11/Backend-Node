const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

//Post route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    //Create a new Person document using the mongoose model
    const newPerson = new Person(data);

    //Save the new person to database
    const response = await newPerson.save();
    console.log("data saved successfully!");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server errror" });
  }
});

//GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server errror" });
  }
});

//vid 8 part 2
// parameterised URL

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Extract the workType from URL parameter

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "invalid worktype" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update data
router.put('/:id',async(req,res)=>{
    try{
        const personId = req.params.id; // Extract the id from URL paramter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true, // Return the updated document
            runValidators: true // Run mongoose validations
        })

        if(!response){
            return res.status(404).json({error:"person not found"})
        }

        console.log("data updated");
        res.status(200).json(response)
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId = req.params.id; // Extract the id from URL paramter

        //Assuming you have person model
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:"Person not found"})
        }
        console.log("data deleted");
        res.status(200).json({message: "Person deleted successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;
