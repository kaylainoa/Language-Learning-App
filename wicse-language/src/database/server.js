
const { MongoClient, ServerApiVersion } = require('mongodb');
const Product = require ('./models/product.model');
const express = require('express');
const mongoose = require('mongoose');

const app = express();


//middleware config
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(cors());

//routes
//app.use("/api/products", productRoute);

const PORT = process.env.PORT || 3000; //dynamic port or default
//const uri = "mongodb+srv://abigailerefah:8491NKQcpKBhEvJn@user-authentication.atn31.mongodb.net/?retryWrites=true&w=majority&appName=User-Authentication";
const uri = "mongodb+srv://abigailerefah:8491NKQcpKBhEvJn@user-authentication.atn31.mongodb.net/?retryWrites=true&w=majority&appName=User-Authentication";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

app.get('/', (req,res) => {
  console.log(req.body);
  res.send("hello from node");
});

//connecting to frontend
app.post('/login', (req, res) => {
  Product.create(req.body)
  .then(products => res.json(products))
  .catch(err => res.json(err))
});

app.get('/api/products', async (req, res) => {
  try{
    const products = await Product.find({});
    res.status(200).json(products);
  }catch (error){
    res.status(500).json({message: error.message});
  }
});

//get specific item depending on its ID
app.get('/api/products/:id', async (req, res) => {
  try {
    
    const { id } = req.params; //get id from url
    const product = await Product.findById(id); //retrieve it
    res.status(200).json(product);
  }catch (error){
    res.status(500).json({message: error.message});
  }
});



app.post('/api/products/', async(req, res) => {//used to save something check something
  try{
    const product = await Product.create(req.body);
    res.status(200).json(product); //choosing 200 to indicate that its a success
  }catch (error) {
    res.status(500).json({message: error.message});
  }
});

//upate a product
app.put('/api/products/:id', async(req, res) => {
  try{
    const {id} = req.params;
   // console.log('product id:', id);
    //console.log('request body:', req.body);

    const product =  await Product.findByIdAndUpdate(id, req.body); //req.body is whatever the user inputted, update it with that
    if (!product){ //if the product is not found
      return res.status(404).json({message: "Product not found"});
    }
    //best for the product to be checked again from the database
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);

  }catch (error) {
    res.status(500).json({message: error.message});
  }
});

//delete product
app.delete('/api/products/:id', async(req,res) => {
  try {
    const {id}  =req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product){
      return res.status(404).json({message: "prduct not found"});
    }

    res.status(200).json({message: "product was deleted"});
  }catch (error){
    res.status(500).json({message: error.message})
  }
});


mongoose.connect(uri)
.then(() => {
  console.log("connected to db", mongoose.connection.name);
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
