import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, CardMedia, Button, useTheme, useMediaQuery, Typography, styled } from "@mui/material";

const DetailsCard = (props) => {
    const { bookname, bookprice, bookauthor, bookcategory, img, getBookDetail } = props;
    const theme = useTheme();
    const mediumSize = useMediaQuery(theme.breakpoints.down('md'));
    const smallSize = useMediaQuery(theme.breakpoints.down('sm'))

    const detailsstyle = {
        textAlign: "left"
    }

    const cardStyle = {
        width: "250px",
        height: "380px",
        p: 1
    }

    const cardMediaStyle = {
        display: "flex"
    }

    const TitleText = styled(Typography)(({ theme }) => ({
        color: "#8c8c8c",
        textOverflow : "ellipsis",
        // overflow : "hidden",
        // whiteSpace : "nowrap",
        // wordBreak : "break-word",
}))

const PriceText = styled(Typography)(({ theme }) => ({
    color: "black",
    fontWeight: 500
}))
return (
    <>
        <Card sx={cardStyle} elevation={2} onClick={getBookDetail} >
            {/* <Link to="/book"> */}
            <CardMedia
                component="img"
                sx={{ objectFit: "cover", height: "240px", width: "160px", margin: "auto", cursor: "pointer" }}
                image={img}
                title={bookname}
            />
            {/* </Link> */}

            <CardContent sx={{ width: "70%", height: "30%", margin: "auto", p: 1 }}>
                <Typography sx={{ textOverflow: "ellipsis", overflow : "hidden", whiteSpace : "nowrap", wordBreak : "break-word", height : "1.6em" }}>{bookname}</Typography>
                <TitleText>{bookauthor}</TitleText>
                <TitleText>{bookcategory}</TitleText>
                <PriceText variant="h6">₹{bookprice}</PriceText>
            </CardContent>
        </Card>
    </>
)
}

export default DetailsCard;