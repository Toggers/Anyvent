const express =require('express');
const bodyParser =require('body-parser');

const { graphqlHTTP } = require('express-graphql');  // exports a middleware function, it will takes requests and funnel them through the graphql query parser
const { buildSchema }=require('graphql');
const mongoose = require('mongoose');


const Event =require('./models/event');
// const { dateToString} =require('./createDate_helper/date');
const app =express();

//------------------------------------backend and frontend connection--------------------------------
app.use((req,res,next) =>{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	
	if(req.method==='OPTIONS'){
		return res.sendStatus(200);
	}
	next();

});



app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
	schema: buildSchema(`
		type Event {
			_id: ID!
			title: String!
			description: String!
			price: Float!
			date:String!
		}

		input EventInput {
			title: String!
			description: String!
			price: Float!
			date:String!
		}

		type RootQuery{
			events: [Event!]!
		}

		type RootMutation{
			createEvent(eventInput: EventInput): Event
		}

		schema{
			query: RootQuery
			mutation: RootMutation
		}
	`),
	rootValue: {
		events: () =>{
			return Event.find().then(events =>{
				return events.map(event =>{
					return {...event._doc};
				});
			}).catch(err =>{
				throw err;
			});

		},
		createEvent: (args) =>{
			
			const newEvent= new Event({          //create new event
				title: args.eventInput.title,
				description: args.eventInput.description,
				price: +args.eventInput.price,
				date: new Date(args.eventInput.date)
			});
			
			return newEvent.save().then(result =>{     //save to mongoDB
				console.log(result);
				return {...result._doc};
			}).catch(err =>{
				console.log(err);
				throw err;
			});

			
		}

	},
	graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-eoevk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(()=>{
	app.listen(8000);
}).catch(err =>{
	console.log(err);
});





