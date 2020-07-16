const mongoose =require('mongoose');

const Schema =mongoose.Schema;

const eventSchema =new Schema({
	category:{
		type: String,
		required:true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	address_location:{
		type: String,
		required:true
	},
	address_city:{
		type: String,
		required:true
	},
	address_state:{
		type: String,
		required:true
	},
	address_zipcode:{
		type:Number,
		required:true
	},
	capacity:{
		type:Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	eventDate:{
		type: Date,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	author:{
		 type: Schema.Types.ObjectId, 
         ref: 'User'
	}
});

module.exports = mongoose.model('Event',eventSchema);