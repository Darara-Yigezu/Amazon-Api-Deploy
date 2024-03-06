const express=require('express');
const cors=require( 'cors' );
const dotenv=require('dotenv');
dotenv.config();
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const app = express();

app.post("/payment/create", async (req, res) => {
    const total = req.query.total;
    if (total > 0) {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: "USD",
            });
            res.status(201).json({
                clientSecret: paymentIntent.client_secret,
            });
           
        
    } else {
        res.status(403).json({ message: "Total must be greater than 0" });
    }
});

app.listen(5000,(err)=>{
    if(err) throw err
    console.log("Amazon Server is Running on PORT:5000,http://localhost:5000")
})
