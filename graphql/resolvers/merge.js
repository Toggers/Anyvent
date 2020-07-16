const User = require('../../models/user');
const Event = require('../../models/event');

// const { dateToString } = require('../../createDate_helper');

const user_function = async userId => {
    try {
      const user = await User.findById(userId);
      return {
          ...user._doc,
          _id: user.id,
          createdEvents: events_function.bind(this, user._doc.createdEvents)
      };
    } catch (err) {
      throw err;
    }
}

//   events: () => {
//     return Event.find().then(events =>{
//         return events.map(event =>{
//              return {...event._doc,
//                     date: (new Date(event._doc.date)+"")};
//         });
//     }).catch(err =>{
//         throw err;
//     });

// }


const events_function = async eventIds =>{                          //use async and await, instead of return
    try{
        const events = await Event.find({_id:{$in: eventIds}});
        return events.map (event=>{
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),      // to get reable date from mongodb 
                author: user_function.bind(this,event.author)
            };
        });
    }catch(err){
        throw err;
    }

}



const ticket_event_function =async eventID =>{
    try{
    const event = await Event.findById(eventID);
        return{
            ...event._doc,
            author: user_function.bind(this, event.author),
            date: new Date(event._doc.date).toISOString()
        }
    }catch(err){
        throw err;
    }
}


exports.user_function= user_function;
// exports.events_function = events_function;
exports.ticket_event_function = ticket_event_function;