const Hostel = require("../Model/hostel");
const BookingDetails = require("../Model/bookingDetails");

//getHostels
async function getHostels(req, res, next) {
  try {
    const hostels = await Hostel.find();
    res.send(hostels);
  } catch (err) {
    next(err);
  }
}

async function getHostelsAdminDashboard(req, res, next) {
  try {
    const approvedHostelsByAdmin = await Hostel.find({ approved: true });
    const pendingApprovalsByAdmin = await Hostel.find({ approved: false });
    res.send({ approvedHostelsByAdmin, pendingApprovalsByAdmin });
  } catch (err) {
    next(err);
  }
}

async function getHostel(req, res, next) {
  const owner = req.params.name;
  try {
    const approvedHostelsByAdmin = await Hostel.find({ approved: true });
    const pendingApprovalsByAdmin = await Hostel.find({ approved: false });
    res.send({ approvedHostelsByAdmin, pendingApprovalsByAdmin });
  } catch (err) {
    next(err);
  }
}

// async function getPendingHostel(req, res, next){
//   const owner = req.params.name;

//     try {
//       const hostels = await Hostel.find({approved: false});
//       res.send(hostels);
//     } catch (err) {
//       next(err);
//     }
// }

//delete hostel

async function deleteHostel(req, res, next) {
  try {
    Hostel.findByIdAndDelete({
      id: req.params.id,
    });
    res.status(200).json({
      message: "Hostel was removed successfully!",
    });
  } catch {
    res.status(401).json({ msg: "Error while deleting a hostel" });
  }
}

//add hostel
async function addHostel(req, res, next) {
  const obj = {
    name: req.body.name,
    location: req.body.location,
    owner: req.body.owner,
    ownerEmail: req.body.ownerEmail,
    availableRooms: req.body.availableRooms,
    singleBed: req.body.singleBed,
    doubleBed: req.body.doubleBed,
    singleBedPrice: req.body.singleBedPrice,
    doubleBedPrice: req.body.doubleBedPrice,
    approved: req.body.approvedByAdmin,
  };

  const newHostel = new Hostel(obj);

  // save hostel or send error
  try {
    const result = await newHostel.save();
    res.status(200).json({
      message: "Hostel was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Error while saving new Hostel",
    });
  }
}

//edit hostel
async function editHostel(req, res, next) {
  const id = req.params.id;
  try {
    await Hostel.findByIdAndUpdate(id, req.body);
    // await .save();
    res.status(200).json({
      message: "Hostel was updated successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Error while updating a hostel" });
  }
}

//getBookingHostel
async function getHostelBooking(req, res, next) {
  console.log(req.params);
  if (req.params.mode === 'student') {
    const bookerName = req.params.name;
    try {
      const hostels = await BookingDetails.find({ bookerName });
      res.send(hostels);
    } catch (err) {
      next(err);
    }
  } else {
    const owner = req.params.name;
    try {
      const hostels = await BookingDetails.find({ owner });
      res.send(hostels);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  getHostels,
  getHostel,
  // getPendingHostel,
  getHostelsAdminDashboard,
  deleteHostel,
  addHostel,
  editHostel,
  getHostelBooking,
};
