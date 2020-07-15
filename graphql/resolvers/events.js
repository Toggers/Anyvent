const Event = require('../../models/event');


module.exports = {
    events: () => {
        return Event.find().then(events => {
            return events.map(event => {
                return { ...event._doc };
            });
        }).catch(err => {
            throw err;
        });

    },
    createEvent: (args) => {

        const newEvent = new Event({          //create new event
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date)
        });

        return newEvent.save().then(result => {     //save to mongoDB
            console.log(result);
            return { ...result._doc };
        }).catch(err => {
            console.log(err);
            throw err;
        });


    }
}