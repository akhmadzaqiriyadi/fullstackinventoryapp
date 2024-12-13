const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

const router = express.Router();

// Routes untuk product
router.get('/', getAllProducts); // Get all products
router.post('/',  authenticateToken, authorizeRole('admin'), createProduct); // Create new product
router.put('/:id', authenticateToken, authorizeRole('admin'), updateProduct); // Update product
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteProduct); // Delete product

module.exports = router;
