const mongoose = require ('mongoose');

const employeeSchema = mongoose.Schema({
  password : { type:String , requried : true},
  name: {type: String, required: true},
  position : { type:String , requried : true},
  email: {type: String, required: true},
  FWAstatus : { type:String , requried : true},
  supervisorID : { type:String , requried : true},
  departmentID: {type: String, required: true},
  status : { type:String , requried : true}

});

module.exports = mongoose.model('Employee', employeeSchema );
