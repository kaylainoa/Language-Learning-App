
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const app = express();


const uri = "mongodb+srv://abigailerefah:<password>@user-authentication.atn31.mongodb.net/?retryWrites=true&w=majority&appName=User-Authentication";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

app.get('/', (req,res) => {
  console.log(req.body);
  res.send("hello from node");
});

app.post('/api/products', (req, res) => {
  req.body
  res.send("data recieved");
});

mongoose.connect(uri)
.then(() => {
  console.log("connected to db");
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch((error) => {
  console.error("connection failed: ", error);
});


/*const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect(uri); //connect to mongodb
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/
