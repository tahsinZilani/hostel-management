const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hotel_id: {
        type: String,
        require: true
    },
    owner: {
      type: String,
      required: true
    },
    bedType: {
        type: String,
        required: true,
        trim: true
    },
    pending: {
        type: Boolean
    },
    approved: {
        type: Boolean
    },
    rejected: {
        type: Boolean
    },
    bookerName: {
        type: String,
        required: true,
        trim: true
    }
  }
);

const BookingDetails = mongoose.model("bookingDetails", bookingSchema);


module.exports = BookingDetails;