const express = require('express');
const router = express.Router();
const Product = require('../models/Product_Schema');

// Route to create a new product
router.post('/', async (req, res) => {
    const { url, name, paragraph, brand, desc, price, discount, rating, id } = req.body;

    try {
        // Create a new product instance
        const product = new Product({
            url,
            name,
            paragraph,
            brand,
            desc,
            price,
            discount,
            rating,
            id
        });

        // Save the product to the database
        await product.save();

        return res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// Route to get a product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const product = await Product.findOne({ id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
});

// Route to update a product by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    try {
        const product = await Product.findOneAndUpdate({ id }, updates, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// Route to delete a product by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await Product.deleteOne({ id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

module.exports = router;
