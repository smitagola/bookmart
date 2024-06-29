import { useState, useEffect } from 'react';
import { createNewBook, updateBook, fetchBooks, fetchCategories } from '../../../features/bookSlice';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Stack, Paper, Button, TextField, Box, styled, FormControl, FormControlLabel, FormLabel, Select, InputLabel, Typography, useMediaQuery, useTheme, MenuItem, FormHelperText, InputAdornment, CircularProgress } from "@mui/material";
import { BOOK_DETAILS_ERROR, BOOK_DETAILS_ERRORTEXT } from '../../../constant/Constant';

const ProductForm = (props) => {
    const { isbnNumber, resetIsbn } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const loading = useSelector(state => state.book.loading);
    const BOOK_CATEGORIES = useSelector(state => state.book.categories);
    const mediumSize = useMediaQuery(theme.breakpoints.down('md'));

    const obj = {
        BookISBNNumber: "",
        BookName: "",
        BookPrice: 0,
        AuthorName: "",
        PublisherName: "",
        BookEdition: "",
        BookLanguage: "English",
        BookImage: "",
        CategoryId: 0
    }
    const [isBookUpdate, setIsBookUpdate] = useState(false);
    const [bookDetails, setBookDetails] = useState(obj);
    const [bookDetailsError, setBookDetailsError] = useState(BOOK_DETAILS_ERROR);
    const [errorText, setErrorText] = useState(BOOK_DETAILS_ERRORTEXT);

    const { BookISBNNumber, BookName, BookPrice, AuthorName, PublisherName, BookEdition, BookLanguage, BookImage, CategoryId } = bookDetails;
    const { bookISBNNumber, bookName, bookPrice, authorName, publisherName, bookEdition, bookLanguage, bookImage, category } = bookDetailsError;
    const { BookISBNNumberText, BookNameText, BookPriceText, AuthorNameText, BookEditionText, BookLanguageText, BookImageText, CategoryText, PublisherText } = errorText;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookDetails({ ...bookDetails, [name]: value });
    }

    const handleSubmit = () => {
        if (BookISBNNumber == "" && BookName == "" && BookPrice == "" && AuthorName == "" && PublisherName == "" && BookEdition == "" && CategoryId == 0 && BookImage == "") {
            setBookDetailsError({
                bookISBNNumber: true,
                bookName: true,
                bookPrice: true,
                authorName: true,
                publisherName: true,
                bookEdition: true,
                bookLanguage: true,
                bookImage: true,
                category: true
            })
        } else if (BookISBNNumber == "") {
            setBookDetailsError({ ...bookDetailsError, bookISBNNumber: true })
        } else if (BookName == "") {
            setBookDetailsError({ ...bookDetailsError, bookName: true })
        } else if (BookPrice == 0) {
            setBookDetailsError({ ...bookDetailsError, bookPrice: true })
        } else if (AuthorName == "") {
            setBookDetailsError({ ...bookDetailsError, authorName: true })
        } else if (PublisherName == "") {
            setBookDetailsError({ ...bookDetailsError, publisherName: true })
        } else if (BookEdition == "") {
            setBookDetailsError({ ...bookDetailsError, bookEdition: true })
        } else if (CategoryId == 0) {
            setBookDetailsError({ ...bookDetailsError, category: true })
        } else if (BookImage == "") {
            setBookDetailsError({ ...bookDetailsError, bookImage: true })
        } else {
            if (isBookUpdate) {
                console.log(bookDetails)
                dispatch(updateBook(bookDetails))
                setIsBookUpdate(false);
                resetIsbn();
            } else {
                dispatch(createNewBook(bookDetails));
            }
            setBookDetails(obj);
            dispatch(fetchBooks());
            navigate("/admin/inventory-table");
        }
    }

    const getBook = async () => {
        await axios.get(`http://localhost:7001/books/${isbnNumber}`)
            .then(res => {
                const { CategoryName, ...rest } = res.data[0];
                setBookDetails(rest);
                setIsBookUpdate(true)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (isbnNumber !== 0) {
            getBook();
        }
    }, [isbnNumber])

    return (
        <>
            <Paper sx={{ margin: "20px auto", width: "80%" }}>
                <Box sx={{ padding: "5px 30px" }}>
                    <Typography variant="h5" gutterBottom={true}>Book Details</Typography>
                    <Stack direction={mediumSize ? "column" : "row"}>
                        <Box sx={{
                            margin: "0px 5px",
                            width: "100%",
                            maxWidth: "450px"
                        }}>
                            <TextField margin="dense" size="normal" label="Book Name" placeholder='Elon Musk' InputLabelProps={{ shrink: true }} variant="standard" sx={{ width: "100%" }} value={BookName} name="BookName" onChange={(e) => { handleChange(e); setBookDetailsError({ ...bookDetailsError, bookName: false }) }} error={bookName} helperText={bookName && BookNameText} />
                        </Box>

                        <Box sx={{
                            margin: "0px 5px",
                            width: "100%",
                            maxWidth: "450px"
                        }}>
                            <TextField margin="dense" size="normal" label="ISBN Number" placeholder='123456789874' InputLabelProps={{ shrink: true }} variant="standard" value={BookISBNNumber} name="BookISBNNumber" sx={{ width: "100%" }} onChange={(e) => { handleChange(e); setBookDetailsError({ ...bookDetailsError, bookISBNNumber: false }) }} error={bookISBNNumber} helperText={bookISBNNumber && BookISBNNumberText} />
                        </Box>
                    </Stack>

                    <Stack direction={mediumSize ? "column" : "row"}>
                        <Box sx={{
                            margin: "0px 5px",
                            width: "100%",
                            maxWidth: "450px"
                        }}>
                            <TextField margin="dense" size="normal" label="Book Price" placeholder='₹1000.05' InputLabelProps={{ shrink: true }} variant="standard" sx={{ width: "100%" }} name="BookPrice" value={BookPrice} onChange={(e) => { handleChange(e); setBookDetailsError({ ...bookDetailsError, bookPrice: false }) }} error={bookPrice} helperText={bookPrice && BookPriceText} />
                        </Box>

                        <Box sx={{
                            margin: "0px 5px",
                            width: "100%",
                            maxWidth: "450px"
                        }}>
                            <TextField margin="dense" size="normal" label="Auther Name" placeholder='Chetan Bhagat' InputLabelProps={{ shrink: true }} variant="standard" sx={{ width: "100%" }} name="AuthorName" value={AuthorName} onChange={(e) => { handleChange(e); setBookDetailsError({ ...bookDetailsError, authorName: false }) }} error={authorName} helperText={authorName && AuthorNameText} />
                        </Box>
                    </Stack>

                    <Stack direction={mediumSize ? "column" : "row"}>
                        <Box sx={{
                            margin: "0px 5px",
                            width: "100%",
                            maxWidth: "450px"
                        }}>
                            <TextField margin="dense" size="normal" label="Publisher Name" placeholder='McGraw Hill' InputLabelProps={{ shrink: true }} variant="standard" sx={{ width: "100%" }} name="PublisherName" value={PublisherName} onChange={(e) => { handleChange(e); setBookDetailsError({ ...bookDetailsError, publisherName: false }) }} error={publisherName} helperText={publisherName && PublisherText} />
                        </Box>

                        <Box sx={{
                            margin: "0px 5px",
                            width: "100%",
                            maxWidth: "450px"
                        }}>
                            <TextField margin="dense" type="text" size="normal" label="Edition" placeholder='1st Edition' InputLabelProps={{ shrink: true }} variant="standard" sx={{ width: "100%" }} name="BookEdition" value={BookEdition} onChange={(e) => { handleChange(e); setBookDetailsError({ ...bookDetailsError, bookEdition: false }) }} error={bookEdition} helperText={bookEdition && BookEditionText} />
                        </Box>
                    </Stack>

                    <Stack direction={mediumSize ? "column" : "row"} >
                        <Box sx={{
                            margin: "0px 5px",
                            width: "100%",
                            maxWidth: "450px"
                        }}>
                            <FormControl variant="standard" sx={{ width: "100%", marginTop: 1 }}>
                                <InputLabel InputLabelProps={{ shrink: true }}>Category</InputLabel>

                                <Select value={CategoryId} name="CategoryId" onSelect={() => { dispatch(fetchCategories())}} onChange={(e) => { setBookDetails({ ...bookDetails, CategoryId: e.target.value }); setBookDetailsError({ ...bookDetailsError, category: false }) }} error={category}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            {loading && <CircularProgress />}
                                        </InputAdornment>
                                    }
                                >
                                    {
                                        BOOK_CATEGORIES?.map((category) => (<MenuItem key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</MenuItem>))
                                    }
                                </Select>
                                {
                                    (category && <FormHelperText sx={{ color: "#d32f2f" }}>{CategoryText}</FormHelperText>)
                                }
                            </FormControl>
                        </Box>

                        <Box sx={{
                            margin: "0px 5px",
                            width: "100%",
                            maxWidth: "450px"
                        }}>
                            <TextField margin="dense" ssize="normal" label="Image Link" placeholder='https://abc.com' InputLabelProps={{ shrink: true }} variant="standard" sx={{ width: "100%" }} name="BookImage" value={BookImage} onChange={(e) => { handleChange(e); setBookDetailsError({ ...bookDetailsError, bookImage: false }) }} error={bookImage} helperText={bookImage && BookImageText} />
                        </Box>
                    </Stack>
                </Box>

                <Box sx={{ margin: "5px 0px 10px 18px", padding: 2 }}>
                    <Button variant="contained" sx={{ width: "250px" }} size="large" onClick={handleSubmit}>{isbnNumber ? "Update Bookdetails" : "Add new book"}</Button>
                </Box>
            </Paper>
        </>
    )
}

export default ProductForm