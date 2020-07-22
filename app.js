const express =require('express');
const bodyParser =require('body-parser');
const { graphqlHTTP } = require('express-graphql');  // exports a middleware function, it will takes requests and funnel them through the graphql query parser
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolver = require('./graphql/resolvers/index');
const Event =require('./models/event');
const app = express();

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

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
	schema: graphQLSchema,
	rootValue: graphQLResolver,
	
	graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-eoevk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(()=>{
	app.listen(8000);
}).catch(err =>{
	console.log(err);
});

// mongoose.connect( // marcello's connection string
//     `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ddczh.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(() =>{
//         app.listen(3000);
//      }).catch(err =>{
//         console.log(err);
//      }); 

