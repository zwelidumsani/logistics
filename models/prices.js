var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	oneKg:{type: Number, required: true,trim: true},
	twoKg:{type: Number, required: true,trim: true},
	threeKg:{type: Number, required: true, trim: true},
	fourKg:{type: Number, required: true, trim: true},
	fiveKg:{type: Number, required: true, trim: true}	
});

module.exports = mongoose.model('Prices', schema);
 