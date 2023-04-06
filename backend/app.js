const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Employee = require('./models/employee');
const Department = require('./models/department');
const Schedule = require('./models/schedule');


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

//Employee -- Start

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
    });
  });
});

app.get('/api/employees', (req, res, next) => {
  Employee.find().then(documents => {
    res.status(200).json({
      message: 'Employees fetched successfully',
      employee: documents
    })
  })
})

//Employee -- End


//Department -- Start
app.post("/api/departments", (req, res, next) => {
  const department = new Department({
    departmentName : req.body.departmentName,
  });
  department.save().then((createdPost)=> {
    res.status(201).json({
      message : 'Department added successfully-',
      });
    });
});

app.get('/api/departments', (req, res, next) => {
  Department.find().then(documents => {
    res.status(200).json({
      message: 'Departments fetched successfully',
      department: documents
    })
  })
})

//Department -- End

//Schedule -- Start
app.post("/api/schedules", (req, res, next) => {
  const schedule = new Schedule({
    employeeID : req.body.employeeID,
    date: req.body.date,
    workLocation : req.body.workLocation,
    workHours: req.body.workHours,
    workReport : req.body.workReport,
    supervisorComments : req.body.supervisorComments,
    status : req.body.status
  });
  schedule.save().then((createdPost)=> {
    res.status(201).json({
      message : 'Schedule added successfully-',
      });
    });
});

app.get('/api/schedules', (req, res, next) => {
  Schedule.find().then(documents => {
    res.status(200).json({
      message: 'Schedules fetched successfully',
      schedule: documents
    })
  })
})
//Schedule -- End


module.exports = app;
