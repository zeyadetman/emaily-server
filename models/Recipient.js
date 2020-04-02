const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  checked: { type: Boolean, default: false },
  email: String
});

module.exports = recipientSchema;
