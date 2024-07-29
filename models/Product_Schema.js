const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    paragraph: { type: String, required: true },
    brand: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true }, // Changed to Number for numerical values
    discount: { type: Number, required: true }, // Changed to Number for numerical values
    rating: { type: Number, required: true }, // Changed to Number for numerical values
    id: { type: Number, required: true }
}, { collection: 'products' }); // Changed collection name to 'products'

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
