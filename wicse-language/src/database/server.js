
const { MongoClient, ServerApiVersion } = require('mongodb');
const Product = require ('./models/product.model');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());


const uri = "mongodb+srv://abigailerefah:<password>@user-authentication.atn31.mongodb.net/?retryWrites=true&w=majority&appName=User-Authentication";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

app.get('/', (req,res) => {
  console.log(req.body);
  res.send("hello from node");
});


app.post('/api/products', async(req, res) => {//used to save something
  try{
    const product = await Product.create(req.body);
    res.status(200).json(product);
  }catch (error) {
    res.status(500).json({message: error.message});
  }
});

mongoose.connect(uri)
.then(() => {
  console.log("connected to db", mongoose.connection.name);
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
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
