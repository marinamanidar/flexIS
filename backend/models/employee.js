const mongoose = require ('mongoose');

const employeeSchema = mongoose.Schema({
  password : { type:String , required : true},
  name: {type: String, required: true},
  position : { type:String , required : true},
  email: {type: String, required: true},
  FWAstatus : { type:String , required : true},
  supervisorID : { type:String , required : true},
  departmentID: {type: String, required: true},
  status : { type:String , required : true}

});

module.exports = mongoose.model('Employee', employeeSchema );
