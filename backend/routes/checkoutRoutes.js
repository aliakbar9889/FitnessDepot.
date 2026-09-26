const express = require("express");
const Stripe = require("stripe");

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-session", async (req, res) => {
  try {
    const { products, shipping } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.description?.slice(0, 500) || "",
          images: product.image
            ? [`${process.env.CLIENT_URL}${product.image}`]
            : [],
        },
        unit_amount: Math.round(product.price / 280 * 100),
      },
      quantity: 1,
    }));

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
          },
          unit_amount: Math.round(shipping / 280 * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      line_items: lineItems,

      success_url:
        `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${process.env.CLIENT_URL}/cart`,

      billing_address_collection: "required",

      shipping_address_collection: {
        allowed_countries: ["PK"],
      },
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    res.status(500).json({
      message: "Failed to create Stripe checkout session",
    });
  }
});

module.exports = router;