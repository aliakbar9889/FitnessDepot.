const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Stripe = require("stripe");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log(
  "Stripe environment variable loaded:",
  !!process.env.STRIPE_SECRET_KEY
);

const connectDB = require("./config/db");

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

connectDB();

app.use("/api/products", require("./routes/productRoutes"));

app.post("/api/checkout/create-session", async (req, res) => {
  try {
    const { products, shipping } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    const exchangeRate =
      Number(process.env.STRIPE_PKR_TO_USD_RATE) || 280;

    const lineItems = products.map((product) => {
      const priceInUSD = Math.round(
        (Number(product.price) / exchangeRate) * 100
      );

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description
              ? product.description.substring(0, 500)
              : "",
          },
          unit_amount: priceInUSD,
        },
        quantity: 1,
      };
    });

    if (Number(shipping) > 0) {
      const shippingInUSD = Math.round(
        (Number(shipping) / exchangeRate) * 100
      );

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
          },
          unit_amount: shippingInUSD,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,

      success_url:
        `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${process.env.CLIENT_URL}/cart`,

      billing_address_collection: "required",
    });

    return res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    return res.status(500).json({
      message:
        error?.message || "Unable to create Stripe checkout session",
    });
  }
});

app.get("/", (req, res) => {
  res.send("E-commerce Backend is Running");
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;