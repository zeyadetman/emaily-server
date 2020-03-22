const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id,
      description: "Pay 5$ for us"
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
