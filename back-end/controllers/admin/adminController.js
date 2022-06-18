const Admin = require("../../Model/admin");
const Hostel = require("../../Model/hostel");

//admin singup
async function adminSignup(req, res, next) {
  const newAdmin = new Admin({
    ...req.body,
  });

  // save admin or send error
  try {
    const result = await newAdmin.save();
    res.status(200).json({
      message: "Admin was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Error while saving new admin",
    });
  }
}

//admin login
async function adminLogin(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  try {
    const loggedInAdmin = await Admin.find({ email, password });
    console.log(loggedInAdmin);
    if (loggedInAdmin && loggedInAdmin.length > 0) {
      res.send("Login Successful");
    } else {
      res.status(401).json({
        msg: "Authentication error",
      });
    }
  } catch {
    res.status(400).json({
      msg: "Password didnt match",
    });
  }

  // const authorizePassword = await bcrypt.compare(password, loggedInAdmin.password);
  // if (authorizePassword){
  //   res.status(500, {
  //     msg: 'success'
  //   })
  // }else{
  //   res.status(400).json({
  //     msg: 'Password didnt match'
  //   })
  // }
}
//admin approval
async function adminHostelApproval(req, res, next) {
  const id = req.params.id;
  if (req.params.mode === "APPROVE") {
    try {
      var hostels = await Hostel.findOneAndUpdate(
        { _id: id },
        { $set: { approved: true } },
        { new: true }
      );
      res.send(hostels);
    } catch (err) {
      next(err);
    }
  }else {
    try {
      var hostels = await Hostel.findOneAndUpdate(
        { _id: id },
        { $set: { approved: false } },
        { new: true }
      );
      res.send(hostels);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  adminLogin,
  adminSignup,
  adminHostelApproval,
};
