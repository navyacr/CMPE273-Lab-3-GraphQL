const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var customersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    nickname: { type: String },
    yelpsince: { type: Date, default: Date.now },
    thingsilove: { type: String },
    findmein: { type: String },
    website: { type: String },
    phonenumber: { type: String },
    filename: { type: String },
    headline: { type: String },
  },
  {
    versionKey: false,
  }
);

const customersModel = mongoose.model("customers", customersSchema);
module.exports = customersModel;
