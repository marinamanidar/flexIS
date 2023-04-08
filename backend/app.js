const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const checkAuth = require("./middleware/check-auth");
const mongoose = require('mongoose');
const Employee = require('./models/employee');
const User = require('./models/employee');
const Department = require('./models/department');
const Schedule = require('./models/schedule');
const bcrypt = require("bcrypt");
const cors = require('cors');

const app = express();
app.use(cors());

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

app.post('/api/employees/signup', checkAuth, (req,res,next) => {
  bcrypt.hash(req.body.password,10)
  .then(hash => {
    const employee = new Employee({
      password : hash,
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
    })
    .catch(err=> {
      res.status(500).json({
        error : err
      });
    });
  });
});

app.post('/api/employee/login', (req,res,next) =>{
  let fetchedUser ;
  
  User.findOne({email:req.body.email})
  .then ( user=>{
    console.log(user)
    if(!user) {
      return res.status(401).json ({
        message : 'Auth failed - user does not exist'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password)
  })
  .then (result => {
    if(!result) {
      console.log("fail")
      return res.status(401).json("Password is wrong");
    }
  const token = jwt.sign(
    {email:fetchedUser.email , employeeID : fetchedUser._id},
    'pkey',
    {expiresIn: '1h' }
  );
  res.status(200).json({
    token : token
  })
  })
  .catch(err => {
    return res.status(401).json({
      message : ' Auth failed'
    });
  })
  
  });

// app.post("/api/employees", (req, res, next) => {
//   const employee = new Employee({
//     password : req.body.password,
//     name: req.body.name,
//     position : req.body.position,
//     email: req.body.email,
//     FWAstatus : req.body.FWAstatus,
//     supervisorID : req.body.supervisorID,
//     departmentID: req.body.departmentID,
//     status : req.body.status
//   });
//   employee.save().then((createdPost)=> {
//     res.status(201).json({
//       message : 'Employee added successfully-',
//     });
//   })
//   .catch(err => {
//     res.status(500).json({
//       error:err
//     });
//   });
// });

app.get('/api/employees', (req, res, next) => {
  Employee.find().then(documents => {
    res.status(200).json({
      message: 'Employees fetched successfully',
      employee: documents
    });
  })
})

//Employee -- End


//Department -- Start
app.post("/api/departments", checkAuth, (req, res, next) => {
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
app.post("/api/schedules", checkAuth, (req, res, next) => {
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
