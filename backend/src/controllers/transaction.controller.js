const prisma = require('../config/database');

// GET all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        details: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// POST create transaction
const createTransaction = async (req, res) => {
  const { trxType, notes, details } = req.body;

  try {
    const newTransaction = await prisma.transaction.create({
        data: {
            trxType,
            notes,
            details: {
              create: await Promise.all(
                details.map(async (item) => {
                  // Dapatkan harga produk
                  const product = await prisma.product.findUnique({
                    where: { id: item.productId },
                  });
    
                  // Hitung totalPrice
                  const totalPrice = product.priceSell * item.qty; // atau product.pricePurchase jika transaksi "in"
                  
                  return {
                    productId: item.productId,
                    qty: item.qty,
                    totalPrice: totalPrice, // menambahkan totalPrice
                  };
                })
              ),
            },
          },
            include: {
                details: true,
            },
    });

    // Update stock
    for (const item of details) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      const updatedStock =
        trxType === 'in'
          ? product.stock + item.qty
          : product.stock - item.qty;

      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: updatedStock },
      });
    }

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

// GET transaction by ID
const getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
      include: {
        details: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
};

// DELETE transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
  getTransactionById,
  deleteTransaction,
};
