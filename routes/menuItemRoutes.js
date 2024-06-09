const express = require("express");
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


//vid 8 part 1
//post method to add Menu Item

router.post('/',async(req,res)=>{
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

router.get('/',async(req,res)=>{

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

module.exports = router;