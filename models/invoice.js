var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	companyName:{type: Schema.Types.ObjectId, ref: 'Company'},
	user:{type: Schema.Types.ObjectId, ref: 'User'},
	invoicePath:{type: String, required: true,trim: true},
	invoiceNumber:{type: String, required: true, trim: true},
	serviceNumber:{type: String, required: true, trim: true},
	date: {type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', schema);
 