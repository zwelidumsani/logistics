var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	companyName:{type: String, required: true,trim: true},
	companyEmail:{type: String, required: true,trim: true},
	companyPhone:{type: String, required: true, trim: true},
	companyStreet:{type: String, required: true, trim: true},
	companyTown:{type: String, required: true, trim: true},
	companyCountry:{type: String, required: true, trim: true}
});

module.exports = mongoose.model('Company', schema);
 