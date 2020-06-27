const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt= require('bcrypt');

router.get('/',(req,res)=>{
  res.send("hello")
})

router.post('/signup',(req,res)=>{
  const {name,email,password}=req.body;
  console.log(req.body.name);
  if(!name || !email || !password){
    return res.status(422).json({error:"please send all fields"})
  }
  //res.json({message:"successfully posted"});
  User.findOne({email:email})
  .then((savedUser)=>{
    if(savedUser){
       return res.status(422).json({error:"User already exist"})
    }
    bcrypt.hash(password,12)
    .then(hashedPassword=>{
      const user = new User({
        name,
        email,
        password:hashedPassword
      });
      user
        .save()
        .then((user) => res.json({ message: "Saved successfully" }))
        .catch((err) => {
          console.log(err);
        });
    })
    
})
.catch(error=>{
  console.log(error);
})
})

module.exports = router;