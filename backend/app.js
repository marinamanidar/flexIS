const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const employee = require('./models/employee');


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
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/employees", (req, res, next) => {
  const emp = new employee({
    password : req.body.employee.password,
    name: req.body.employee.name,
    position : req.body.employee.position,
    email: req.body.employee.email,
    FWAstatus : req.body.employee.FWAstatus,
    supervisorID : req.body.employee.supervisorID,
    departmentID: req.body.employee.departmentID,
    status : req.body.employee.status
  });

  employee.save().then((createdEmp)=> {
    res.status(201).json({
      message: "Employee added successfully",
      empId: createdEmp._id
    });
  });
  // console.log(employee);

});

// app.use('/api/employees' ,(req, res, next) => {
//   // Add dummy posts content. Later should get from database
//   const employee = [
//     {
//         password : 'test',
//         name: 'test',
//         position : 'test',
//         email: 'test',
//         FWAstatus : 'test',
//         supervisorID : 'test',
//         departmentID: 'test',
//         status : 'test',
//     },
//   ];

//   res.status(200).json({
//     //message property
//     message: 'Post fetched successfully',
//     //post property that get the dummy data above
//     posts: posts
//   })

//   res.send('Hello from express')
// });

app.get('/api/employees', (req, res, next) => {
  employee.find().then(documents => {
    res.status(200).json({
      message: 'Employees fetched successfully',
      employee: documents
    })
  })
})

//export for other module can import
module.exports = app;
