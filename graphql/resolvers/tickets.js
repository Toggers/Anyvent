const Ticket = require('../../models/ticket');
const Event= require('../../models/event');

const {ticket_event_function, user_function, events_function} =require('./merge');


module.exports ={
	tickets: async (args,req) =>{
		if(!req.isAuth){
            throw new Error('Not authenticated!');
        }
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
	createTicket: async (args, req) =>{
		if(!req.isAuth){
            throw new Error('Not authenticated!');
        }

		const foundEvent =await Event.findOne({_id: args.eventID});

		const newTicket= new Ticket({          //create new event


			ticketNum: ('_' + Math.random().toString(36).substr(2, 9)).toUpperCase()+(Math.floor(Math.random() * 1000)+100),
			event: foundEvent,
			user: args.userID,
			date: (new Date(Date.now()) +"")
		});

		const result =await newTicket.save();
		return {
			...result._doc, 
			user: user_function.bind(this,result._doc.user),
			event:  ticket_event_function.bind(this, result._doc.event),
			date: new Date(newTicket._doc.date).toISOString()
		};


	},
	cancelTicket : async (args,req) =>{
		if(!req.isAuth){
            throw new Error('Not authenticated!');
        }
        
		try{
			const ticket =await Ticket.findById(args.ticketID).populate('event');    //now there is event info inside variable ticket 

			const event ={...ticket.event._doc, 
				author: user_function.bind(this,ticket.event._doc.author)}

		
			await Ticket.deleteOne({_id: args.ticketID});

			return event;
		}catch(err){
			throw err;
		}
	}

}