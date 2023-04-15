const Order = require("../model/Order");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthor,
  verifyToken,
} = require("./verifyToken");
const router = require("express").Router();

// Create only admin
router.post("/", verifyToken, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const result = await newOrder.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Update user
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Deleted Successfully...");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Order
router.get("/find/:id", verifyTokenAndAuthor, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Order
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get monthly Income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  //   basically calculate the last two month income for comparision
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" }, //it will add the total sales amount of a month
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
