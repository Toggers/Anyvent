const Ticket = require('../../models/ticket');
const Event= require('../../models/event');

const {ticket_event_function, user_function} =require('./merge');


module.exports ={
	tickets: async () =>{
		try{
			const tickets = await Ticket.find();
			return tickets.map(ticket =>{
				return {...ticket._doc,
					user: user_function.bind(this,ticket._doc.user),
					event:  ticket_event_function.bind(this,ticket._doc.event),
					date: new Date(ticket._doc.date).toISOString()	
				};
			});
		}catch(err){
			throw err;
		}


	},
	createTicket: async (args) =>{
		const foundEvent =await Event.findOne({_id: args.eventID});
		const newTicket= new Ticket({          //create new event


			ticketNum: "ABC242142",
			event: foundEvent,
			user: '5f0fbb9d33fd28024c74694f',
			date: (new Date(Date.now()) +"")
		});

		const result =await newTicket.save();
		return {
			...result._doc, 
			user: user_function.bind(this,result._doc.user),
			event:  ticket_event_function.bind(this,result._doc.event),
			date: new Date(newTicket._doc.date).toISOString()
		};


	},
	cancelTicket : async (args) =>{
		try{
			const ticket =await Ticket.findById(args.ticketID).populate('event');    //now there is event info inside variable ticket 
			const event ={...ticket.event._doc, 
				author: user_function.bind(this,ticket.event._doc.author)}
			await Ticket.deleteOne({_id:args.ticketID});

			return event;
		}catch(err){
			throw err;
		}
	}

}