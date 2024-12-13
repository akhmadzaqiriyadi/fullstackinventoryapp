const prisma = require('../config/database');

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// POST create new product
const createProduct = async (req, res) => {
  const { name, categoryId, rackId, stock, purchasePrice, sellingPrice } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        categoryId,
        rackId,
        stock,
        pricePurchase: purchasePrice,
        priceSell: sellingPrice,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// PUT update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId, rackId, stock, purchasePrice, sellingPrice } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        categoryId,
        rackId, // Tambahkan rackId di sini
        stock,
        pricePurchase: purchasePrice,
        priceSell: sellingPrice,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
