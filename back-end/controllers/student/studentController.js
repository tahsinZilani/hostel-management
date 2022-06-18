const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const Student= require("../../Model/student");
const BookingDetails = require("../../Model/bookingDetails");
const Hostel = require("../../Model/hostel");


//student singup
async function studentSignup(req, res, next) {
    
    const name = req.body.name;
    const user = await Student.find({name});

    if(user && user.length>0){
      res.status(404).json({
        error: 'User Name already exists'
      });
    }else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newStudent = new Student({
          ...req.body,
          password: hashedPassword
        });
        // save student or send error
        try {
          const result = await newStudent.save();
          res.status(200).json({
            message: "Student was added successfully!",
          });
        } catch (err) {
          res.status(500).json({
            error: 'Error while saving new student'
          });
        }
    }    
}

//student login
async function studentLogin(req, res, next) {
    
    const name = req.body.name;
    const password = req.body.password;

    try{
        const loggedInstudent = await Student.find({name});

        if(loggedInstudent && loggedInstudent.length>0){
              const isValidPassword = await bcrypt.compare(
                password,
                loggedInstudent[0].password,
              );
              
              if(isValidPassword){
                    
                    //set cookie
                    const obj = {
                      name,
                      password
                    };
                    const token = jwt.sign(obj, process.env.JWT_TOKEN,{
                      expiresIn: process.env.JWT_EXPIRY 
                    });
                  
                    res.cookie(process.env.COOKIE_NAME, token, {
                      maxAge: process.env.JWT_EXPIRY,
                      // httpOnly: true,
                      signed: true,
                    });

                    res.send(obj);
              }else {
                res.status(401).json({
                  msg: 'Incorrect Password'
                });
              }
        }else {
            res.status(404).json({
                msg: 'User does not exist'
              });      
        }
    }catch {
        res.status(500).json({
          msg: 'Server Side Error'
        });
    }
}

async function hostelBook(req, res, next){
      // save student or send error
      const newBooking = new BookingDetails(req.body);
      try {
        const result = await newBooking.save();
        res.status(200).json({
          message: "Booked Successfully!",
        });
      } catch (err) {
        res.status(500).json({
          error: 'Error while booking'
        });
      }
      
}

module.exports = {
  studentLogin,
  studentSignup,
  hostelBook
}
