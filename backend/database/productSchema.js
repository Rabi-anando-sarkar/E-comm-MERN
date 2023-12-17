const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productname : String,
    productprice : Number,
    productcategory : String,
    userId : String,
    productcompany : String
});

module.exports = mongoose.model('products',ProductSchema);