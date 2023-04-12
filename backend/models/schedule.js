const mongoose = require ('mongoose');

const scheduleSchema = mongoose.Schema({
  employeeID : { type:String , required : true},
  date: {type: String, required: true},
  workLocation : { type:String , required : true},
  workHours: {type: String, required: true},
  workReport : { type:String , required : true},
  supervisorComments : { type:String , required : true},
  status : { type:String , required : true}
});

module.exports = mongoose.model('Schedule', scheduleSchema );