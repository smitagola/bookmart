import React, { useState, useEffect, useMemo } from "react";
import { OrderCard } from "../component";
import { useSelector } from "react-redux";
import axios from "axios";
import { Box } from "@mui/material";

const MyAccount = () => {
    const userData = useSelector(state => state.user.userDetails);
    const userId = userData.id;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`http://localhost:7001/order/get-order-details/${userId}`)
            const data = await response.data;
            setOrders(data);
        };
        fetchOrders();
    }, [userId]);
    const memoizedOrders = useMemo(() => orders, [orders]);

    return (
        <>
            <Box sx={{ width: "55%", margin: "0px auto" }}>
            <h2 style={{ textAlign : "left"}}>My Order details</h2>
                {
                    memoizedOrders.map((order,index) => (
                        <OrderCard 
                            key={index}
                            bookName={order.BookName}
                            bookImage={order.BookImage}
                            bookPrice={order.BookPrice}
                            bookQuantity={order.Quantity}
                            bookAuthor={order.AuthorName}
                        />
                    ))
                }
            </Box>
        </>
    )
}

export default MyAccount;