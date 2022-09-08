const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");

const cors = require("cors");
const { response, request } = require("express");

const stripe = require("stripe")(
  "sk_test_51Lc2CcSHUsU6zRQzlPs7gY7rElOlH0Qjtt9YCfy3D77zv1ZkBkqGw9kiK4141WL41iYKJ2Ctn9co9UkYz8kOJ9hy00Orh9DD4X"
);

// Api

// App config
const app = express();

// MiddleWare
app.use(cors({ origin: true }));
app.use(express.json());

// Api routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payment/create", async (request, response) => {
  const total = request.query.total;
  console.log("payment Received", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-9b86d/us-central1/api
