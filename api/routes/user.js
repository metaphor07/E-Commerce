const User = require("../model/User");
const {
  verifyToken,
  verifyTokenAndAuthor,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// Update user
router.put("/:id", verifyTokenAndAuthor, async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete user
router.delete("/:id", verifyTokenAndAuthor, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted Successfully...");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All User
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    //   const { password, ...info } = user._doc;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get User Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const result = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } }, //find the user which createdAt time is greaterthen lastyear
      {
        $project: {
          month: { $month: "$createdAt" }, //next, we are create a variable("month") which get the month{"$month"-> predefined method of mongodb to get the month from "createdAt"} number from {createdAt}
        },
      },
      //   next, create a group and it will be return to the "result"
      {
        $group: {
          _id: "$month", //we need to give an unique "id" to the group and here, we get the total registerd users, on basis of "month" so, we assign the month number to the id
          total: { $sum: 1 }, //and, assign a variable("total") and set the total user number of the particular month which store inside the _id
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
