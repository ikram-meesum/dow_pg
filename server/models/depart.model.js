let mongoose = require("mongoose");

let departSchema = mongoose.Schema({
  ward_name: { type: String, uppercase: true },
  createdOn: { type: Date, default: Date.now() },
  ispresent: { type: String, default: "YES" },
});

let Fcps_Depart = mongoose.model("Fcpsward", departSchema);
module.exports = Fcps_Depart;
