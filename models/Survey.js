const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  dateSent: Date,
  lastResponded: Date,
  recipients: [RecipientSchema]
});

module.exports = mongoose.model("surveys", surveySchema);
