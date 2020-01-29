const mongoose = require("mongoose");
const RegSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  }
});
const Registration = (module.exports = mongoose.model(
  "Registration",
  RegSchema
));
