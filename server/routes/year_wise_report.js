let express = require('express');
let route = express.Router();
const mongoose = require('mongoose');
var dateFormat = require('dateformat');

let FCPS = require('../models/student.model');


route.get('/', (req, res, next) => {
    FCPS.find( { "doj": {'$gte': '2007-01-01T00:00:00Z', '$lte': '2007-12-31T00:00:00Z'} } ).sort({'depart_id': 1, 'supervisor_id':1 }).populate('depart_id', 'ward_name').populate('supervisor_id', 'super_name').exec().then(      
        doc => {
            //console.log(doc);
            if(doc.length >= 0) {
                console.log('doc', doc);
                res.json(doc);
            }
            else{
                res.json({ message: 'No data found' });
            }
            //res.json(doc);            
            //console.log('STUDENT', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }
    ).catch(err => console.log(err));
});


/*
route.get('/:id', (req, res, next) => {
    //res.render('index');
    let studentid = req.params.id;

    let mbbsdata = [];
    Student.findById(studentid).exec().then(
        doc => {
            res.json(doc);            
            //console.log('STUDENT', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }).catch(err => console.log(err));
});
*/

module.exports = route