const User = require('../../models/user');
const { dateToString } = require('../../createDate_helper');

const user = async userId => {
    try {
      const user = await User.findById(userId);
      return {
          ...user._doc,
          _id: user.id,
          createdEvents: events.bind(this, user._doc.createdEvents)
      };
    } catch (err) {
      throw err;
    }
  };

  events: () => {
    return Event.find().then(events =>{
        return events.map(event =>{
            return {...event._doc};
        });
    }).catch(err =>{
        throw err;
    });

}
