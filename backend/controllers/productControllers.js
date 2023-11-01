import Product from "../models/product.js";

// Get Products => /api/v1/products
export const getProducts = async (req, res) => {

    const products = await Product.find();

    res.status(200).json({ 
        success: true,
        count: products.length,
        products
    });
};


// Create new Product => /api/v1/admin/products
export const newProduct = async (req, res) => {
    
    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        product
    });
};


// Get single product details => /api/v1/products/:id
export const getProductDetails = async (req, res) => {
    
    try {
    // Use Promise.race to setup a timeout
    const product = await Promise.race([
            Product.findById(req?.params?.id),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 5000)) // 5 seconds timeout
        ]);

    res.status(200).json({
        product,
    });

    } catch (error) {
        // Handle the timeout error or any other error that might occur during the database query
        return res.status(500).json({ error: error.message });
    }

};


// Update product details => /api/v1/products/:id
export const updateProductDetails = async (req, res) => {
    
    try {
    // Use Promise.race to setup a timeout
    const product = await Promise.race([
            Product.findById(req?.params?.id),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 5000)) // 5 seconds timeout
        ]);

    product = await Product.findByIdAndUpdate(req?.params?.id, req?.body, {
        new: true,
    });

    res.status(200).json({
        product,
    });

    } catch (error) {
        // Handle the timeout error or any other error that might occur during the database query
        return res.status(500).json({ error: error.message });
    }

};

