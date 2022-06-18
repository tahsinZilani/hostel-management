const bcrypt = require('bcrypt');

const HostelOwner = require('../../Model/hostelOwner');
const BookingDetails = require("../../Model/bookingDetails");


//hostelOwner singup
async function hostelOwnerSignup(req, res, next) {
    
    const name = req.body.name;
    const user = await HostelOwner.find({name});

    if(user && user.length>0){
      res.status(409).json({
        error: 'User Name already exists'
      });
    }else {
      const newHostelOwner = new HostelOwner({
        ...req.body
      });
  
      // save hostelOwner or send error
      try {
        const result = await newHostelOwner.save();
        res.status(200).json({
          message: "New HostelOwner was added successfully!",
        });
      } catch (err) {
        res.status(500).json({
          error: 'Error while saving new admin'
        });
      }
    }

}

//hostelOwner login
async function hostelOwnerLogin(req, res, next) {
    const password = req.body.password;
    const name = req.body.name;
    try{
      const loggedInHostelOwner = await HostelOwner.find({name, password});
    
      if(loggedInHostelOwner && loggedInHostelOwner.length>0){
        res.send('Login Successful');
      }else {
        res.status(401).json({
          msg: 'Authentication error'
        });
      }
    }catch{
      res.status(400).json({
        msg: 'Password didnt match'
      });

    }
}

async function statusUpdate(req, res, next){
  const id = req.params.id;
  try{
    const result = await BookingDetails.findByIdAndUpdate( id , req.body);
    res.status(200).json({
        message: "Hostel Status was updated successfully!",
      });
  }catch(err){
    console.log(err);
    res.status(401).json({ msg: "Error while updating a hostel status" });
}
}

module.exports = {
  hostelOwnerLogin,
  hostelOwnerSignup,
  statusUpdate
}