const mongoose = require("mongoose");
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
  recipients: {
    type: Schema.Types.ObjectId,
    ref: "Recipient"
  }
});

module.exports = mongoose.model("surveys", surveySchema);
