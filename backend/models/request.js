const mongoose = require ('mongoose');

const requestSchema = mongoose.Schema({
  employeeID : { type:String , required : true},
  requestDate : { type:String , required : true},
  workType: {type: String, required: true},
  description : { type:String , required : true},
  reason : { type:String , required : true},
  status: { type: String, required: true},
  comment : { type:String}

});

module.exports = mongoose.model('Request', requestSchema );
