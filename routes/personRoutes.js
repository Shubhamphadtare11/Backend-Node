const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

//Post route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    //Create a new Person document using the mongoose model
    const newPerson = new Person(data);

    //Save the new person to database
    const response = await newPerson.save();
    console.log("data saved successfully!");

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server errror" });
  }
});

// Login Route
router.post('/login', async(req, res) => {
  try{
      // Extract username and password from request body
      const {username, password} = req.body;

      // Find the user by username
      const user = await Person.findOne({username: username});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token 
      const payload = {
          id: user.id,
          username: user.username
      }
      const token = generateToken(payload);

      // resturn token as response
      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

//GET method to get the person
router.get("/", jwtAuthMiddleware,async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from URL paramter
    const updatedPersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run mongoose validations
      }
    );

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from URL paramter

    //Assuming you have person model
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
