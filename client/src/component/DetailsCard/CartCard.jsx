import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Stack, IconButton, Box, styled } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, incrementUnit, decrementUnit } from '../../features/userSlice';

const CartCard = props => {
    const { bookname, bookprice, bookauthor, bookcategory, img, units, isbnNumber } = props;
    const dispatch = useDispatch();
    const productCard = {
        width: "90%",
        display: "flex",
        gap: 3,
        margin: 'auto'
    }

    const TitleText = styled(Typography)(({ theme }) => ({
        color: "#8c8c8c",
        textOverflow: 'ellipsis'
    }))

    const removeProduct = (ISBN) => {
        console.log(ISBN)
        dispatch(removeFromCart(ISBN))
    }
    return (
        <>
            <Card elevation={2} sx={productCard}>
                <CardMedia
                    component={"img"}
                    sx={{ height: "150px", width: "110px", objectFit: "cover", p: 2 }}
                    image={img}
                    title={bookname}
                />

                <Stack>
                    <CardContent>
                        <Typography>{bookname}</Typography>
                        <TitleText>by {bookauthor}</TitleText>
                        <Typography variant="h6">₹{bookprice}</Typography>
                    </CardContent>

                    <CardActions sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
                            <Box sx={{ backgroundColor: "#f3f3f3" }}>
                                <IconButton onClick={() => {
                                    if (units === 0)
                                        dispatch(removeProduct(isbnNumber))
                                    else
                                        dispatch(decrementUnit(isbnNumber))
                                }}>
                                    <RemoveIcon />
                                </IconButton>
                            </Box>
                            <Typography>{units}</Typography>
                            <Box sx={{ backgroundColor: "#f3f3f3" }}>
                                <IconButton onClick={() => dispatch(incrementUnit(isbnNumber))}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        <IconButton onClick={() => removeProduct(isbnNumber)}>
                            <DeleteIcon color='red' />
                        </IconButton>
                    </CardActions>
                </Stack>
            </Card>
        </>
    )
}

export default CartCard