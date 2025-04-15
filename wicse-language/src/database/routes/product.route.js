//al routes leading to produt are here

const express = require('express');
const Product = requrie ("../models/prodcut.model.js");
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
      }catch (error){
        res.status(500).json({message: error.message});
      }
});