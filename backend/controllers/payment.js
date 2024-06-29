import express from "express";
import Stripe from "stripe";

const stripe = Stripe("sk_test_51Mk8csSDOpj5LyOrVMTpRGFjtD9sM9LrH4jB697VyOpWnTvR191hjZnYfAfn9eHoIXSRKD6mw4R9DIjNMio6X8gd00ceovwZtn");

export const cardPayment = async (req, res) => {
    const line_items = req.body.map(item => {
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
        payment_method_types : ['card'],
        success_url: 'http://localhost:5001/payment-options',
        cancel_url: 'http://localhost:5001/',
    });

    res.send({ url : session.url });
    console.log({ stripeSession: session.id })
    // console.log(req.body.cartBokDetails)
}
