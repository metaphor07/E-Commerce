const Cart = require("../model/Cart");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthor,
  verifyToken,
} = require("./verifyToken");
const router = require("express").Router();

// Create only admin
router.post("/", verifyToken, async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const result = await newCart.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Update user
router.put("/:id", verifyTokenAndAuthor, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete product
router.delete("/:id", verifyTokenAndAuthor, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart Deleted Successfully...");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Cart
router.get("/find/:id", verifyTokenAndAuthor, async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.params.id });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
