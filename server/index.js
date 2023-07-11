const express = require("express");
const app = express();

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/pg", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// New Routes
const depart = require("./routes/department");

//--------------------------------

// Old Routes
const loginRoute = require("./routes/login");
const studentRoute = require("./routes/student");
const addMBBSRoute = require("./routes/addmbbs");
const editStudent = require("./routes/editstudent");
//const feesRoute = require('./routes/fees');
const fcpsWardRoute = require("./routes/fcps_ward");
const fcpsSupervisorRoute = require("./routes/fcps_supervisor");
const departSupervisor = require("./routes/depart_supervisor");
const allPgReport = require("./routes/all_pg_report");
const current_Supervisor = require("./routes/current_supervisor");
const supervisor_Wise_Total = require("./routes/supervisor_wise_report");
const no_present = require("./routes/no_present");
const yearWiseReport = require("./routes/year_wise_report");

//const editFeeRoute = require('./routes/editfee');

// app.get('/' (req, res) => {
//     console.log('ge request');
//     res.send('get req');
// })

// New Routes
app.use("/depart", depart); // DONE

//--------------------------------------
// All Routes
app.use("/", loginRoute);
app.use("/fcpspresent", studentRoute); // DONE
app.use("/addfcps", addMBBSRoute); // DONE
app.use("/editfcps", editStudent); // DONE

//app.use('/fees', feesRoute);

app.use("/fcpsward", fcpsWardRoute);
app.use("/fcps_supervisor", fcpsSupervisorRoute);
app.use("/depart_supervisor", departSupervisor); // PROCESS

// ------------------ REPORTS ---------------------
app.use("/allpg_report", allPgReport); // PROCESS
app.use("/current_supervisors", current_Supervisor); // DONE
app.use("/supervisor_wise_total", supervisor_Wise_Total);
app.use("/nopresent", no_present); // DONE
app.use("/yearwise_report", yearWiseReport);

app.listen(3001, () => console.log("Example app listening on port 3001!"));
