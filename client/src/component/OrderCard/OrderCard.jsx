import React from "react";
import { Card, CardMedia, Box, Typography, styled, Stack } from "@mui/material";

const OrderCard = (props) => {
    let { bookName, bookImage, bookPrice, bookQuantity, bookAuthor} = props;
    const img = "https://m.media-amazon.com/images/I/81KAg5fnOhL.jpg";
    const TitleText = styled(Typography)(({ theme }) => ({
        color: "#8c8c8c",
        textOverflow: 'ellipsis',
        fontSize: "13px"
    }));

    const cardDesign = {
        display: "flex", 
        width: "100%", 
        alignItems: "start", 
        justifyContent : "center",
        gap : 4,
        margin : "8px 0px"
    }

    return (
        <>
            <Card
                sx={cardDesign}
                elevation={2}
            >
                <CardMedia
                    component="img"
                    sx={{ width: 80 }}
                    image={bookImage}
                />

                <Stack direction="column" spacing={4}>
                    <Box>
                        <Typography sx={{ fontSize: "18px", color: "black" }}>{bookName}</Typography>
                        <TitleText>by {bookAuthor}</TitleText>
                    </Box>

                    <Box>
                        <Typography>Qty : {bookQuantity}</Typography>
                    </Box>
                </Stack>

                <Typography variant="h6">₹{bookPrice}</Typography>
            </Card>
        </>
    )
}

export default OrderCard;