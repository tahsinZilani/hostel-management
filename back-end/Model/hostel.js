const mongoose = require("mongoose");

const hostelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    singleBed: {
      type: Number,
      required: true,
    },
    doubleBed: {
        type: Number,
        required: true,
      },
    availableRooms: {
        type: Number,
        required: true,
    },
    owner: {
      type: String,
      required: true
    },
    ownerEmail: {
      type: String,
      required: true
    },
    singleBedPrice: {
      type: Number,
      required: true,
    },
    doubleBedPrice: {
      type: Number,
      required: true,
    },
    approved: {
      type: Boolean
    }

  }
);

const Hostel = mongoose.model("hostel", hostelSchema);

module.exports = Hostel;