const authResolver = require('./auth');
const eventsResolver = require('./events');
const ticketResolver = require('./tickets');

const rootResolver = {
    ...authResolver,
    ...eventsResolver,
    ...ticketResolver
};

module.exports = rootResolver;