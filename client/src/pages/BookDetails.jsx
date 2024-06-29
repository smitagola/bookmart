import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/userSlice';
import { Card, CardActions, CardMedia, CardContent, Button, Typography, Stack, styled, Divider, Box, Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import { DetailsCard } from '../component';
import { LoggedIn } from '../App';

const BookDetails = () => {
    let navigate = useNavigate();
    let id = useParams();
    let isLogin = useContext(LoggedIn);
    let details = useSelector(state => state.book.bookinformation);
    let dispatch = useDispatch();
    const [showMsg, setShowMsg] = useState(false);
    const handleOpen = () => { setShowMsg(true) }
    const handleClose = () => { setShowMsg(false) }

    const TitleText = styled(Typography)(({ theme }) => ({
        color: "#8c8c8c",
        textOverflow: 'ellipsis',
        fontSize: "18px"
    }));

    const AddToCart = () => {
        if (isLogin) {
            let bookObj = {
                BookName: details[0].BookName,
                BookImage: details[0].BookImage,
                AuthorName: details[0].AuthorName,
                BookPrice: details[0].BookPrice,
                units: 1,
                BookISBNNumber: details[0].BookISBNNumber,
                BookCategory: details[0].CategoryName
            }
            dispatch(addToCart(bookObj));
            handleOpen();
        } else {
            navigate("/login");
        }
    }

    const buyNow = () => {
        if (isLogin) {
            let bookObj = {
                BookName: details[0].BookName,
                BookImage: details[0].BookImage,
                AuthorName: details[0].AuthorName,
                BookPrice: details[0].BookPrice,
                units: 1,
                BookISBNNumber: details[0].BookISBNNumber,
                BookCategory: details[0].CategoryName
            }
            dispatch(addToCart(bookObj));
            navigate("/shippingDetails")
        } else {
            navigate("/login");
        }
    }
    return (
        <>

            <Card elevation={2} sx={{ height: "100%", width: "70%", margin: "4% auto", display: "flex" }}>
                <CardMedia
                    component="img"
                    sx={{ objectFit: "cover", height: "400px", width: "260px", padding: "5px" }}
                    image={details[0]?.BookImage}
                    title={details[0]?.BookName}
                />

                <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "left", gap: 3, alignItems: "left" }}>
                        <Box>
                            <Typography sx={{ fontSize: "28px", color: "black" }}>{details[0]?.BookName}</Typography>
                            <TitleText>by {details[0]?.AuthorName}</TitleText>
                            <TitleText sx={{ color: "black" }}>₹ {details[0]?.BookPrice}</TitleText>
                            <TitleText>{details[0]?.CategoryName}</TitleText>
                        </Box>

                        <CardActions>
                            <Button variant='contained' onClick={AddToCart} >Add to cart</Button>
                            <Button variant='outlined' onClick={buyNow}>Buy Now</Button>
                        </CardActions>

                        <Box>
                            <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "black" }}>ISBN : <TitleText>{details[0]?.BookISBNNumber}</TitleText></Typography>

                            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>Language : <TitleText>{details[0]?.BookLanguage}</TitleText></Typography>

                            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>Edition : <TitleText>{details[0]?.BookEdition}</TitleText></Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Stack sx={{ p: 2, m: 3 }} gap={2}>
                <Stack sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                    <Typography variant="h5">Similar Books</Typography>
                    <Link to="/books" style={{ textDecoration: "none" }}>See All</Link>
                </Stack>

                <Stack direction="row" gap={2} >
                    <DetailsCard bookname={"Elon Musk"} bookprice={"300"} bookauthor={"Meet Panchal"} bookcategory={"biography"} img={"https://m.media-amazon.com/images/I/81KAg5fnOhL.jpg"} />
                    <DetailsCard bookname={"Steve Jobs"} bookprice={"267.89"} bookauthor={"Walter Isaacon"} bookcategory={"biography"} img={"https://m.media-amazon.com/images/I/41n1edvVlLL.jpg"} />
                    <DetailsCard bookname={"The Freedom Manifesto"} bookprice={"500"} bookauthor={"Karan Bajaj"} bookcategory={"biography"} img={"https://m.media-amazon.com/images/I/6150aRkZ-gL.jpg"} />
                    <DetailsCard bookname={"The Introverts Edge"} bookprice={"373"} bookauthor={"Matthew Pollard"} bookcategory={"Self-Improvement"} img={"https://m.media-amazon.com/images/I/81t1k8agEXS.jpg"} />
                    <DetailsCard bookname={"How to talk to anyone"} bookprice={"300"} bookauthor={"Leil Lowndndes"} bookcategory={"Self-Improvement"} img={"https://m.media-amazon.com/images/I/61MLInWDeJL.jpg"} />
                </Stack>
            </Stack>

            <Stack sx={{ p: 2, m: 3 }} gap={2}>
                <Stack sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                    <Typography variant="h5">New Arrivals</Typography>
                    <Link to="/books" style={{ textDecoration: "none" }}>See All</Link>
                </Stack>

                <Stack direction="row" gap={2} >
                    <DetailsCard bookname={"Elon Musk"} bookprice={"300"} bookauthor={"Meet Panchal"} bookcategory={"biography"} img={"https://m.media-amazon.com/images/I/81KAg5fnOhL.jpg"} />
                    <DetailsCard bookname={"Steve Jobs"} bookprice={"267.89"} bookauthor={"Walter Isaacon"} bookcategory={"biography"} img={"https://m.media-amazon.com/images/I/41n1edvVlLL.jpg"} />
                    <DetailsCard bookname={"The Freedom Manifesto"} bookprice={"500"} bookauthor={"Karan Bajaj"} bookcategory={"biography"} img={"https://m.media-amazon.com/images/I/6150aRkZ-gL.jpg"} />
                    <DetailsCard bookname={"The Introverts Edge"} bookprice={"373"} bookauthor={"Matthew Pollard"} bookcategory={"Self-Improvement"} img={"https://m.media-amazon.com/images/I/81t1k8agEXS.jpg"} />
                    <DetailsCard bookname={"How to talk to anyone"} bookprice={"300"} bookauthor={"Leil Lowndndes"} bookcategory={"Self-Improvement"} img={"https://m.media-amazon.com/images/I/61MLInWDeJL.jpg"} />
                </Stack>
            </Stack>

            <Snackbar
                open={showMsg}
                onClose={handleClose}
                // TransitionComponent={transition}
                message="1 Book added in cart"
            />
        </>
    )
}

export default BookDetails