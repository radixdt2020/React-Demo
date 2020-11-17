var express = require('express');
var router = express.Router();
var verifyToken = require('../Token/verifyToken');
var dbSQL = require('../SQL/SqlConfig');
var verifyToken = require('../Token/verifyToken');

/* #START: GET student data */
router.get('/getData', verifyToken , function (req, res, next) {
  dbSQL.query("select * from StudentList", (err, data) => {
    if (!err) {
        res.send(data.recordset);
    }
  });
})
/* #END: GET student data */

/* #START: Insert Student data */
router.post('/insertData', verifyToken , function (req, res, next) {
  let student = {
      StudentName: req.body.StudentName,
      RollNumber: req.body.RollNumber,
      Age: req.body.Age,
      Gender: req.body.Gender,
      EmailId: req.body.EmailId,
      Country : req.body.Country
  };
  dbSQL.query("INSERT INTO StudentList(StudentName,RollNumber,Age,Gender,EmailId,Country) VALUES('" + student.StudentName + "'," + student.RollNumber + "," + student.Age + ",'" + 
                student.Gender + "','" + student.EmailId + "','" + student.Country +  "')", (err, data) => {
      if (!err) {
          res.status(200).json({
              message: "Insert data.",
          });
      }
  });
})
/* #END: Insert Student data */

/* #START: Delete Student data by id */
router.delete('/:StudentId', verifyToken , function (req, res, next) {
  let student = {
      StudentId: req.params.StudentId,
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
/* #END: Delete Student data by id */

/* #START: Get Student data by id */
router.get('/:studentID', verifyToken , function (req, res, next) {
  var id = req.params.studentID;
  
  dbSQL.query("select * from StudentList WHERE StudentId = " + id, (err, data) => {
      if (!err) {
          if (data.recordset == "") {
              res.status(200).json({
                  mesage: "Student is not exist."
              });
          }
          else {
              res.send(data.recordset);
          }
      }
  });
})
/* #END: Get Student data by id */

/* #START: Update Student data by id */
router.put('/:studentID', verifyToken , function (req, res, next) {
  let student = {
      StudentId: req.params.studentID,
      StudentName: req.body.StudentName,
      RollNumber: req.body.RollNumber,
      Age: req.body.Age,
      Gender: req.body.Gender,
      EmailId: req.body.EmailId,
      Country: req.body.Country
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
                      + "', Gender = '" + student.Gender + "', EmailId = '" + student.EmailId + "', Country = '" + student.Country + "' WHERE StudentId = " + student.StudentId, (err, data) => {
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
/* #END: Update Student data by id */
module.exports = router;
