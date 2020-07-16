const Event = require('../../models/event');
const User =require('../../models/user');

const {user_function} =require('./merge');

module.exports = {
   events: async () =>{
            try{
                const events=await Event.find();
             
                return events.map(event =>{
                    return {...event._doc,
                            date: (new Date(event._doc.date)+""),
                            eventDate:  (new Date(event._doc.eventDate)+""),
                            author: user_function.bind(this,event._doc.author)};
                });
            }catch(err){
                throw err;
            
            }

    },
    createEvent: async (args, req) =>{
        if(!req.isAuth){
            throw new Error('Not authenticated!');
        }

        const newEvent= new Event({          //create new event
                category: args.eventInput.category,
                title: args.eventInput.title,
                description: args.eventInput.description,
                address_location: args.eventInput.address_location,
                address_city: args.eventInput.address_city,
                address_state: args.eventInput.address_state,
                address_zipcode: args.eventInput.address_zipcode,
                capacity: args.eventInput.capacity,
                price: +args.eventInput.price,
                eventDate: new Date(args.eventInput.eventDate),
                date: new Date(args.eventInput.date),
                author: '5f0fbb9d33fd28024c74694f'
        });

        let newCreatedEvent;

        try{
            const result= await newEvent.save()    //save to mongoDB

            newCreatedEvent= {...result._doc, 
                            date: new Date(newEvent._doc.date).toISOString(),
                            eventDate: (new Date(result._doc.eventDate)+""),
                            author: user_function.bind(this,result._doc.author)};

            const foundUser= await User.findById('5f0fbb9d33fd28024c74694f');


            if(!foundUser){
                throw new Error('User not found ');
            }

            foundUser.createdEvents.push(newEvent);
            await foundUser.save();

            return newCreatedEvent;
        }catch(err){
            console.log(err);
            throw err;
        }   



    }
}
