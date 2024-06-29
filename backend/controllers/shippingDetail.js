import { db } from "../db.js";

export const getShippingDetails = (req,res) => {
    const UserId = req.params.id;

    const q = "SELECT * FROM shippingDetails WHERE UserId = ?";

    db.query(q, [UserId], (err,data) => {
        if(err) return res.status(500).json(err);
        
        if(data.length !== 0){
            data = data[0];
            res.status(200).json(data);
        } else if(data.length === 0){
            res.status(404).json({ message : "No Data Found"});
        }
    })
}

export const saveShippingDetails = (req,res) => {
    console.log(req.body);
    const q = "INSERT INTO shippingDetails (`UserId`,`FullName`, `Mobile`, `Pincode`, `ResidentialDetails`, `Area`, `Landmark`, `City`, `State`) VALUES (?)";

    const values = [
        req.body.userId,
        req.body.FullName,
        req.body.Mobile,
        req.body.Pincode,
        req.body.ResidentialDetails,
        req.body.Area,
        req.body.Landmark,
        req.body.State,
        req.body.City
    ]

    db.query(q, [values], (err,data) => {
        if(err) return res.status(500).json(err);
        console.log(data.insertId);
        // return res.status(200).json(data);
    })
}