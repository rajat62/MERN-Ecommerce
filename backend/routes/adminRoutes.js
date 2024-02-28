const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Create a new product (accessible only to admin users)
router.post('/products', authMiddleware, adminMiddleware, productController.createProduct);

// Update a product (accessible only to admin users)
router.patch('/products/:id', authMiddleware, adminMiddleware, productController.updateProduct);

// Delete a product (accessible only to admin users)
router.delete('/products/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

router.get('/', authMiddleware, adminMiddleware,productController.getProducts);


module.exports = router;
