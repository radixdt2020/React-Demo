// JavaScript source code

var express = require('express');
var router = express.Router();
var verifyToken = require('../Token/verifyToken');
var dbSQL = require('../SQL/SqlConfig');
//var sqlServer = require("mssql");

//var role = require('./RoleConfig');
var empty = require('is-empty');

router.get('/', function (req, res, next) {
    console.log('46')
    let student = [
        {
            studentid: 1,
            studentname: 'Pooja'
        },
        {
            studentid: 2,
            studentname: 'Rita'
        },
        {
            studentid: 3,
            studentname: 'Imran'
        }
    ];

    res.json(student);
    
})

// Get all Student data
router.get('/getData', verifyToken, function (req, res, next) {
    console.log('getData')
    // config for your database
    //var config = {
    //    user: 'rxOnboard',
    //    password: 'rxOnboard',
    //    server: '192.168.100.193\\MSSQLSERVER2017',
    //    database: 'OnboardedToll'
    //};

    //// connect to your database
    //sqlServer.connect(config, function (err) {

    //    if (err) console.log(err);

    //    // create Request object
    //    var request = new sqlServer.Request();

    //    // query to the database and get the records
    //    request.query('select * from getUrl(5000)', function (err, recordset) {

    //        if (err) console.log(err)

    //        // send records as a response
    //        res.send(recordset);

    //    });
    //});

    dbSQL.query("select * from StudentList", (err, data) => {
        //console.log(data);
        if (!err) {
            //res.status(200).json({
            //    message: "Get all data.",
            //    result: data
            //});
            res.send(data.recordset);
        }
    });
})


//router.get('/getByID', verifyToken, function (req, res, next) {
//   //  config for your database
//    var config = {
//        user: 'RADIXLOCAL\\bela.patel',
//        password: '`1qwwq1`',
//        server: 'PC0610\\MSSQL2016',
//        database: 'EmployeeData'
//    };

//    // connect to your database
//    sqlServer.connect(config, function (err) {
//        console.log("hii");
//        if (err) console.log(err);

//        // create Request object
//        var request = new sqlServer.Request();

//        // query to the database and get the records
//        request.query('select * from users', function (err, recordset) {

//            if (err) console.log(err)

//            // send records as a response
//            res.send(recordset);

//        });
//    });

//})

// Get Student data by id
router.get('/:id', verifyToken, function (req, res, next) {
    var id = req.params.id;
    //console.log(id);
    //let users = {
    //    id: req.body.id,
    //};
    //console.log(users.id);
    dbSQL.query("select * from StudentList WHERE StudentId = " + id, (err, data) => {
        if (!err) {
            if (data.recordset == "") {
                res.status(200).json({
                    mesage: "Student is not exist."
                });
            }
            else {
                //res.status(200).json({
                //    message: "Get data by id.",
                //    result: data
                //});
                res.send(data.recordset);
            }
        }
    });
})


// Update Student data by id
router.put('/:id', verifyToken, function (req, res, next) {
    let student = {
        StudentId: req.params.id,
        StudentName: req.body.StudentName,
        RollNumber: req.body.RollNumber,
        Age: req.body.Age,
        Gender: req.body.Gender,
        EmailId: req.body.EmailId
    };
    if (student.StudentId > 0) {
        dbSQL.query("select * from StudentList WHERE StudentId = " + student.StudentId, (err, data) => {
            if (!err) {
                if (data.recordset == "") {
                    res.status(200).json({
                        mesage: "Student is not exist."
                    });
                }
                else {
                    dbSQL.query("update StudentList set StudentName = '" + student.StudentName + "', RollNumber = '" + student.RollNumber + "',Age ='" + student.Age
                        + "', Gender = '" + student.Gender + "', EmailId = '" + student.EmailId + "' WHERE StudentId = " + student.StudentId, (err, data) => {
                        if (!err) {
                            res.status(200).json({
                                message: "Update data.",
                                //result: data
                            });
                        }
                    });
                }
            }
        });
    }
})


// Insert Student data 

router.post('/insertData', verifyToken, function (req, res, next) {
    let student = {
        StudentName: req.body.StudentName,
        RollNumber: req.body.RollNumber,
        Age: req.body.Age,
        Gender: req.body.Gender,
        EmailId: req.body.EmailId
    };

    dbSQL.query("INSERT INTO StudentList(StudentName,RollNumber,Age,Gender,EmailId) VALUES('" + student.StudentName + "'," + student.RollNumber + "," + student.Age + ",'" + student.Gender + "','" + student.EmailId + "')", (err, data) => {
        if (!err) {
            res.status(200).json({
                message: "Insert data.",
                //result: data
            });
        }
    });
})


// Delete Student data by id

router.delete('/:id', verifyToken, function (req, res, next) {
    let student = {
        StudentId: req.params.id,
    };

    if (student.StudentId > 0) {
        dbSQL.query("select * from StudentList WHERE StudentId = " + student.StudentId, (err, data) => {
            if (!err) {
                //console.log(data.recordset.lenght);
                //console.log(data.recordset == "");
                //console.log(empty(data));
                if (data.recordset == "") {
                    res.status(200).json({
                        mesage: "Student is not exist."
                    });
                }
                else {
                    dbSQL.query("DELETE FROM StudentList WHERE StudentId = " + student.StudentId, (err, data) => {
                        if (!err) {
                            res.status(200).json({
                                message: "Delete data.",
                                //result: data
                            });
                        }
                    });
                }
            }
        });
    }
        
    })

module.exports = router;

