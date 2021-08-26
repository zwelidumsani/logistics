var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	companyName:{type: Schema.Types.ObjectId, ref: 'Company'},
	invoicePath:{type: String, required: true,trim: true},
	service:{type: String, required: true, trim: true},
	weight:{type: String, required: true, trim: true},
	price:{type: String, required: true, trim: true},
	destination:{type: String, required: true, trim: true},
	createdAt: {type: String, required: true, trim: true}
    });

module.exports = mongoose.model('Invoice', schema);
 