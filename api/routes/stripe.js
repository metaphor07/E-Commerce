const router = require("express").Router();
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cartitems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.img],
          description: item.desc,
          metadata: {
            id: item._id,
            size: item.size,
            color: item.color,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

module.exports = router;
