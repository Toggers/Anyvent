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





const cors = require("cors");
const stripe = require("stripe")("sk_test_51H7UtaGly4p9IMX2juR09QKXXst4fXSTVceG254ohQePYBNA17MYAq2gnJegyO1xw8bxJBlp69X1TNyAAqSw73mH00reiNwwM6");
const { v4: uuidV4 } = require('uuid');

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { token, event } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuidV4();
    const charge = await stripe.charges.create(
      {
        amount: event.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${event.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});




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

