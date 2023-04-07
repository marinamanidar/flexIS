const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Employee = require('./models/employee');
const Request = require('./models/request')

const checkAuth = require('./middleware/check-auth');


const app = express();

mongoose.connect("mongodb+srv://weichung:NS4ZOCstkSqBgsDh@flexis.exovldf.mongodb.net/flexIS?retryWrites=true&w=majority")
  .then(()=> {
    console.log('connected to database');
  })
  .catch ((err) => {
    console.log('connection failed', err);
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("app.use set header n nove nxt");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.get('/api/employees', (req, res, next) => {
  Employee.find().then(documents => {
    res.status(200).json({
      message: 'Employees fetched successfully',
      employee: documents
    })
  })
})

app.post("/api/employees", (req, res, next) => {
  const employee = new Employee({
    password : req.body.password,
    name: req.body.name,
    position : req.body.position,
    email: req.body.email,
    FWAstatus : req.body.FWAstatus,
    supervisorID : req.body.supervisorID,
    departmentID: req.body.departmentID,
    status : req.body.status
  });

  employee.save().then((createdPost)=> {
    res.status(201).json({
      message : 'Employee added successfully-',
      // employeeId : createdPost.employeeId
    });
    // console.log(employeeId);
  });

});

app.get('/api/requests', (req, res, next) => {
  Request.find().then(documents => {
    res.status(200).json({
      message: 'Requests fetched successfully',
      requests: documents
    })
  })
})

app.post("/api/requests", (req, res, next) => {
  const request = new Request({
    employeeID: req.body.employeeID,
    requestID: req.body._id,
    requestDate: req.body.requestDate,
    workType: req.body.workType,
    description: req.body.description,
    reason: req.body.reason,
    status: req.body.status,
    comment: req.body.comment
  });
  request.save().then((createdPost)=> {
    res.status(201).json({
      message : 'Request added successfully-',
      // employeeId : createdPost.employeeId
    });
    // console.log(employeeId);
  });

});


// app.use('/api/employees', (req,res,next)=> {
//   const employee= [
//     {
//       id: 'admin',
//       password: 'admin',
//       name: "",
//       position: "",
//       email: "",
//       FWAstatus: "",
//       supervisorID: "",
//       departmentID: "",
//       status: "",

//     },

//     {
//       id: 'S100',
//       password: "super",
//       name: "supervisor",
//       position: "Supervisor",
//       email: "supervisor@supervisor.com",
//       FWAstatus: "WFH",
//       supervisorID: "",
//       departmentID: "D1",
//       status: "New",
//     }
//   ];

//   res.status(200).json({
//     message: 'Employees fetched successfully',
//     employees: employee
//   });
// });



module.exports = app;
