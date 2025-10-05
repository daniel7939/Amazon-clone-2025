
const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
// Automatically allow cross-origin requests
app.use(cors({origin: true}));
// build your functions here
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
const paymentIntent = await stripe.paymentIntents.create({
  amount: total, // subunits of the currency
  currency: "usd",
});

res.status(201).json({
    clientSecret: paymentIntent.client_secret,
});
  } else {
    res.status(403).json({message: "Invalid amount"});
}
 
});
exports.api = onRequest(app);


setGlobalOptions({ maxInstances: 10 });

