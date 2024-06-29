import { db } from "../db.js";

// db.connect((error) => {
//     if (error) {
//         console.log("There is an error while connecting to the MYSQL server.");
//     } else {
//         console.log("Connected to the MYSQL server.");
//     }
// });

export const getBookCategoris = (req,res) => {
    const q = "SELECT * FROM bookcategory";
    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
}
