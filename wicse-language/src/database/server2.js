
const { MongoClient, ServerApiVersion } = require('mongodb');
const User = require ('./models/user.model');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


//middleware config
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//routes
//app.use("/api/products", productRoute);

const PORT = process.env.PORT || 3000; //dynamic port or default

const uri = "mongodb+srv://abigailerefah:8491NKQcpKBhEvJn@user-authentication.atn31.mongodb.net/User?retryWrites=true&w=majority&appName=User-Authentication";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

//may have to save remeberMe, maybe a boolean

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

app.get('/', (req,res) => {
  console.log(req.body);
  res.send("hello from node");
});

//connecting to frontend
/*app.post('/login', (req, res) => {
  User.create(req.body)
  .then(users => res.json(users))
  .catch(err => res.json(err))
}); */

app.post('/login', async(req, res) => {//used to create and save users
  try{
    const users = await User.create(req.body);
    res.status(200).json(users); //choosing 200 to indicate that its a success
  }catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.get('/login', async (req, res) => { // Check if a user is in the database
  try {
    const { user, pass } = req.query; // Use query parameters
    const login = await User.findOne({ email: user, password: pass });
    if (login) {
      res.status(200).json(login);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});