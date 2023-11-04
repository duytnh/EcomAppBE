const Product = require('../models/Products');

module.exports = {

    //create new product
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json("product created successfully")
        } catch (error) {
            res.status(500).json("product created fails")
        }
    },

    //get all product in database
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().sort({ createAt: - 1 })
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json("products get fails")
        }
    },

    //get a product by id
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json("product get fails")
        }
    },

    //search product
    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate([
                {
                    $search: {
                        index: "ecommerceapp",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ])
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json("product search fails")
        }
    },
}