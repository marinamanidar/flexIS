const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Employee = require('./models/employee');

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

// app.post("/api/employees", (req, res, next) => {
//   var employee = new EmployeeModel(req.body)
//   res.status(201).json({
//     message: 'Post added successfully'
//   });
// });


app.post("/api/employees", (req, res, next) => {
  const employee = new Employee({
    password : req.body.password,
    name: req.body.password,
    position : req.body.password,
    email: req.body.password,
    FWAstatus : req.body.password,
    supervisorID : req.body.password,
    departmentID: req.body.password,
    status : req.body.password
  });
  employee.save(function(){}).then((createdPost)=> {
    res.status(201).json({
      message : 'Employee added successfully-',
      employeeId : createdPost.id
    });
    console.log(employeeId);
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



module.exports = app;
