const mongoose =require('mongoose');

const Schema =mongoose.Schema;

const ticketSchema =new Schema({
	ticketNum: String,
	user: {
		type: Schema.Types.ObjectId,
		ref:'User'
	},
	event: {
		type: Schema.Types.ObjectId,
		ref:'Event'
	},
	date: {
		type: Date,
		required: true
	}

});

module.exports = mongoose.model('Ticket',ticketSchema);