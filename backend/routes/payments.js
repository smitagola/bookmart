import express from "express";
import Stripe from "stripe";
import { db } from "../db.js";

const stripe = Stripe("sk_test_51Mk8csSDOpj5LyOrVMTpRGFjtD9sM9LrH4jB697VyOpWnTvR191hjZnYfAfn9eHoIXSRKD6mw4R9DIjNMio6X8gd00ceovwZtn");
// stripe endpointSecret key
const endpointSecret = "whsec_46a8cf125f1f0580396a72a966c3e0d22dafa0d862e8b75eca2fc21e5949f84a";

const router = express.Router();
let id, totalamount;
const mysqlDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
const paymentTable = "INSERT INTO paymentdetails (`Payment_customer_fk`, `PaymentDate`,`PaymentMethod`,`Amount`,`TransactionId`,`Status`) VALUES (?,?,?,?,?,?)";

router.post("/create-checkout-session", async (req, res) => {
    console.log(req.body);

    const { cartDetails, userId, amount } = req.body;
    id = userId;
    totalamount = amount;

    const line_items = cartDetails.map(item => {
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.BookName,
                    images: [item.BookImage],
                    description: item.BookCategory,
                    metadata: { isbn: item.BookISBNNumber },
                },
                unit_amount: item.BookPrice * 100,
            },
            quantity: item.units
        }
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: 'http://localhost:5001/myaccount',
        cancel_url: 'http://localhost:5001/',
    });

    res.send({ url: session.url });
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    let event = req.body;

    if (endpointSecret) {
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
        }
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // for get id we have to write paymentIntent.id;
            console.log("Payment Complete details", paymentIntent);
            db.query(paymentTable, [id, mysqlDate, 'Card', totalamount, paymentIntent.id, "Paid"], (err, data) => {
                if (err) console.log(err);
                console.log(data)
            });
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            break;
        default:
            console.log(`Unhandled event type ${event.type}.`);
    }


    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send();
});

router.get("/get-payment-details", async (req,res) => {
    const q = "SELECT * FROM paymentdetails";

    db.query(q, (err, data) => {
        if(err) console.log(err);
        return res.json(data);
    })
})

export default router;