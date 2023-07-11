let express = require("express");
let route = express.Router();
//const mongoose = require('mongoose');

let FCPS_Supervisor = require("../models/fcps_supervisor.modal");

route.get("/:depart_id", (req, res) => {
  let department_id = req.params.depart_id;
  console.log("department id: ", department_id);
  //res.send('departid:' + department_id);

  FCPS_Supervisor.find({ depart_id: department_id })
    .then((doc) => {
      console.log("specific supervisor: ", doc);
      if (doc.length >= 0) {
        res.json(doc);
        console.log("ward name", doc.depart_id.ward_name);
      } else {
        res.json({ message: "No data found" });
      }
    })
    .catch((err) => console.log(err));
});

//route.post('/', (req, res, next) => {
//console.log('Fee generatede');
//res.render('index');
//let feesPolicy = [];

/*
    console.log(req.body.txtsuper_name);
    console.log(req.body.txtmobile);
    console.log(req.body.txtemail);
    console.log(req.body.cmbpresent);
    */

// const studentData = new FCPS_Supervisor({
//     super_name: req.body.txtsuper_name,
//     mobile: req.body.txtmobile,
//     ispresent: req.body.cmbpresent,
//     email: req.body.txtemail,
//     depart_id: req.body.cmbward
//     //do_birth: req.body.txtdo_birth,

// });

// studentData.save().then(doc => {
//     console.log(doc);

// }).catch(err => console.log(err));

// res.json({ message: req.body});

/*
    Student.find({}, (err, data) => {
        for(let i = 0; i < data.length; i++){
            console.log(data[i].feepolicy);

            Student.update({}, function(err, students){
                if(err){
                    res.send(err);
                }
                else{
                    let finalmonth = req.body.cmbmonthof + '-' + req.body.cmbyear;
                    console.log(finalmonth);
                    //console.log(Student.sname);
        
                    Student.update({},
                        {$push: {"fees": { monthof: finalmonth, amount: '1090', paydate: (new Date), status: 'UnPaid'}}},
                        { multi: true},
                        function(err, model) {
                            if(err){ console.log('update err', err); }
                            console.log('update model', model);                    
                        }
                    );
                }
            });
        }
        
    });
    */

//res.send('Supervisor');
//});

module.exports = route;
