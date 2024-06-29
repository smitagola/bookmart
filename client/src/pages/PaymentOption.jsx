import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
    Paper
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/userSlice";

const PaymentOption = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const cartBookDetails = useSelector(state => state.user.cartBookDetails);
    const user = useSelector(state => state.user.userDetails);
    const userId = user.id;
    const shippingId = useSelector(state => state.user.shippingId);
    const totalAmount = useSelector(state => state.user.totalPrice);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handlePaymentSubmit = (event) => {
        const data = {
            paymentMethod,
            totalAmount,
            cartBookDetails,
            userId,
            shippingId
        }
        axios.post("http://localhost:7001/order/place-order", data)
            .then((response) => {
                if (response.data.url) {
                    window.location.href = response.data.url
                }
            })
            .catch((err) => console.log(err))

        // dispatch(clearCart());
        if(paymentMethod === "COD")
             navigate("/myaccount")
    };

    return (
        <>
            <Paper elevation={3} sx={{ margin: "10px auto", width: "500px", padding: "20px" }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>Payment Options</Typography>

                <Box sx={{ margin: "20px 150px", width: "100%" }}>
                    <FormControl component="fieldset">
                        <FormLabel>Select Payment Method</FormLabel>
                        <RadioGroup
                            aria-label="payment-method"
                            name="payment-method"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                        >
                            <FormControlLabel
                                value="COD"
                                control={<Radio />}
                                label="COD(Cash On Delivery)"
                            />
                            <FormControlLabel
                                value="Card"
                                control={<Radio />}
                                label="Debit/Credit Card"
                            />
                        </RadioGroup>
                        <Button variant="contained" onClick={(e) => handlePaymentSubmit(e)}>
                            {
                                (paymentMethod === "COD") ? "Continue" : "Procced to Payment"
                            }
                        </Button>
                    </FormControl>
                </Box>
            </Paper>
        </>
    )
}

export default PaymentOption;