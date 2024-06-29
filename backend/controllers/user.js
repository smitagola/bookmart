import { db } from "../db.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_TOKEN_KEY = "bookmart";

export const getUsers = (req, res) => {
    const q = "SELECT * FROM usertable";

    db.query(q, (err, data) => {
        if (err) return res.status(501).json(err);
        return res.status(200).json(data);
    });
}

export const getUser = (req, res) => {
    const q = "SELECT * FROM usertable WHERE Email = ? AND Password = ?";

    db.query(q, [req.body.mail, req.body.password], (err, data) => {
        if (err) return res.status(501).json(err);

        if (data.length !== 0) {
            data = data[0];
            const token = jwt.sign({ id: data.UserId, type: data.Type }, JWT_TOKEN_KEY);
            res.json({
                id: data.UserId,
                username: data.Name,
                type: data.Type,
                token
            })
        }
        else
            return res.status(201).json({ message: "No User Found" });
    });
}

export const createUser = (req, res) => {
    const checkDataQuery = "SELECT * FROM usertable WHERE Email = ?";
    const q = "INSERT INTO usertable (`Name`,`Email`, `Password`, `Type`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.mail,
        req.body.password,
        req.body.type
    ];

    let mail = req.body.mail;

    db.query(checkDataQuery, [mail], (err, data) => {
        if (err) {
            return res.status(501).json("this is an error");
        }

        if (data.length !== 0) {
            return res.status(201).json({ message: "User Exist" });
        } else {
            db.query(q, [values], (err, data) => {
                if (err) return res.status(501).json(err);
                return res.status(200).json({ message: "User Register successfully" });
            })
        }
    })
}

export const forgotPassword = (req, res) => {
    const { email } = req.body;
    const q = "SELECT * FROM usertable WHERE Email = ?";

    db.query(q, email, (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length !== 0) {
            const token = jwt.sign({ email: data.Email, id: data.UserId }, JWT_TOKEN_KEY, { expiresIn: "5m" });
            const link = `http://localhost:7001/user/reset-password/${data.UserId}/${token}`;

            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "info.bookmartservice@gmail.com",
                    pass: "#book@1234",
                },
            });

            var mailOptions = {
                from: "info.bookmartservice@gmail.com",
                to: `meetpanchal2803@gmail.com`,
                subject: "Password Reset Link",
                text: link,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } else {
            return res.status(404).json({ message : "user not found"})
        }
    })
}

export const resetPassword = (req,res) => {
    return res.json("Hello world")
}