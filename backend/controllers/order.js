import { db } from "../db.js";
import axios from "axios";

export const placeOrder = (req, res) => {
    const orderTable = "INSERT INTO `order` (`CustomerId`, `OrderDate`, `TotalAmount`) VALUES (?,?,?)";
    const orderDetailsTable = "INSERT INTO orderdetails (`OrderId`,`ProductId`,`Quantity`) VALUES (?,?,?)";
    const paymentTable = "INSERT INTO paymentdetails (`Payment_customer_fk`, `PaymentDate`,`PaymentMethod`,`Amount`,`TransactionId`,`Status`) VALUES (?)";

    const paymentMethod = req.body.paymentMethod;
    const amount = req.body.totalAmount;
    const cartDetails = req.body.cartBookDetails;
    const userId = req.body.userId;
    const shippingId = req.body.shippingId;
    const mysqlDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    let orderId;

    let data = [
        userId,
        mysqlDate,
        amount
    ]

    db.query(orderTable, data, (err, result) => {
        if (err) console.log(err);
    });

    const getOrderId = "SELECT OrderId FROM `order` ORDER BY OrderId DESC LIMIT 1;"
    db.query(getOrderId, (err, data) => {
        if (err) console.log(err);
        data = data[0];
        let orderId = data.OrderId;

        for (let i = 0; i < cartDetails.length; i++) {
            db.query(orderDetailsTable, [orderId, cartDetails[i].BookISBNNumber, cartDetails[i].units], (err, data) => {
                if (err) console.log(err);
            })
        }
    });

    if (paymentMethod === "COD") {
        const codQuery = "INSERT INTO paymentdetails (`Payment_customer_fk`,`PaymentMethod`,`Amount`,`Status`) VALUES (?,?,?,?)";
        db.query(codQuery, [userId, paymentMethod, amount, "Pending"], (err, data) => {
            if (err) console.log(err);
            console.log(data);
        })
    } else if (paymentMethod === "Card") {
        let details = {
            cartDetails,
            userId,
            amount
        }
        axios.post("http://localhost:7001/payment/create-checkout-session", details)
            .then((response) => {
                if (response.data.url)
                    res.send({ url: response.data.url })
            })
            .catch((err) => console.log(err))
    }
}

export const getOrderDetails = (req, res) => {
    let id = req.params.id;

    const q = `SELECT ord.OrderId, ord.CustomerId, ordersd.Quantity, bd.BookName, bd.BookPrice, bd.AuthorName, bd.BookImage
    FROM \`order\` ord 
    INNER JOIN (SELECT OrderId, ProductId, Quantity FROM orderdetails) ordersd ON ord.OrderId = ordersd.OrderId 
    INNER JOIN (SELECT BookISBNNumber, BookName, BookPrice, AuthorName, BookImage FROM bookdetails) bd ON ordersd.ProductId = bd.BookISBNNumber
    INNER JOIN (SELECT MAX(OrderId) AS LatestOrderId FROM \`order\` WHERE CustomerId = ${id}) lo ON ord.OrderId = lo.LatestOrderId
    INNER JOIN usertable u ON ord.CustomerId = u.UserId WHERE ord.CustomerId = ${id}`

    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'An error occurred while fetching orders' });
        }
        return res.json(data);
    })
}

export const orderDetails = (req,res) => {
    const q = `SELECT o.OrderId, u.Name, o.OrderDate, o.TotalAmount,bd.BookName, bd.BookPrice, od.Quantity, p.PaymentMethod, p.Amount, p.Status
    FROM \`order\` o INNER JOIN usertable u ON o.CustomerId = u.UserId
    INNER JOIN orderdetails od ON o.OrderId = od.OrderId
    INNER JOIN paymentdetails p ON u.UserId = p.Payment_customer_fk
    INNER JOIN bookdetails bd ON bd.BookISBNNumber = od.ProductId
    ORDER BY o.OrderId;`

    db.query(q, (err,data) => {
        if(err) console.log(err);
        return res.json(data);
    })
}