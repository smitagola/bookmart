import express from "express";
import { db } from "./db.js";
import books from "./routes/books.js";
import users from "./routes/users.js";
import categories from "./routes/categories.js";
import payments from "./routes/payments.js"; 
import shipping from "./routes/shippingDetails.js";
import order from "./routes/orders.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import Stripe from "stripe";

const app = express();
db.connect((error) => {
    if (error) {
        console.log("There is an error while connecting to the MYSQL server.");
    } else {
        console.log("Connected to the MYSQL server.");
    }
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5001" }));

//middlware
app.use("/books", books);
app.use("/users", users);
app.use("/category", categories);
app.use("/payment", payments);
app.use("/shippingDetails", shipping);
app.use("/order", order);

app.listen(7001, () => {
    console.log('connected to database.');
}); 