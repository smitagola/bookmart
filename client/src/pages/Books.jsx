import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchBooks, fetchBookDetails, searchBook } from '../features/bookSlice';
import { BOOK_CATEGORY, BOOK_AUTHOR, BOOK_PUBLISHER } from '../constant/Constant';
import { Stack, Box, styled, Paper, FormControl, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem, ImageList, useTheme, useMediaQuery, Typography, TextField, InputAdornment, Tooltip, IconButton, Container } from "@mui/material";
import NoData from "../Images/no_data.svg";
import { DetailsCard } from "../component";
import { unwrapResult } from '@reduxjs/toolkit';

const Books = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let result;
  let bookDetails = useSelector(state => state.book.booksdetails);
  let bookDetail = useSelector(state => state.book.bookinformation);
  const theme = useTheme();
  const mediumSize = useMediaQuery(theme.breakpoints.down('md'));
  const smallSize = useMediaQuery(theme.breakpoints.down('sm'));
  const [bookData, setBookData] = useState([]);
  const [dummyArray, setDummyArray] = useState([]);
  const [query, setQuery] = useState("");
  const [filterBooks, setFilterBooks] = useState("");


  const getRecords = async () => {
    try {
      const records = await dispatch(fetchBooks());
      result = unwrapResult(records);
      setBookData(result);
      setDummyArray(result);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }

  const showBookDetails = async (isbn) => {
    dispatch(fetchBookDetails(isbn));
    navigate(`/book/${isbn}`);
  }


  useEffect(() => {
    getRecords();
  }, [])

  useEffect(() => {
    const searchData = async () => {
      const res = await axios.get(`http://localhost:7001/books/search/${query}`);
      setBookData(res.data);
    }

    if (query.length === 0)
      getRecords();
    else
      searchData();
  }, [query])

  const getFilterBooks = () => {
    if (filterBooks === "")
      return bookData;

    return bookData.filter((item) => item.CategoryName === filterBooks)
  }

  var filterData = useMemo(getFilterBooks, [filterBooks, bookData]);

  // Style for main Box (MainContainer)
  const boxStyle = {
    display: "flex",
    flexDirection: "row",
    padding: "5px 20px",
    gap: "2%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  }

  // Style for category container
  const CategoryBarside = styled(Paper)(({ theme }) => ({
    marginLeft: 4,
    marginTop: "30px",
    padding: 20,
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  }));

  const CategoryDropdown = styled(FormControl)(({ theme }) => ({
    marginTop: "10px",
    [theme.breakpoints.up("md")]: { display: "none" }
  }));

  return (
    <>
      <Box sx={boxStyle}>
        <Stack>
          <Stack direction="column" sx={{ ml: 4 }}>
            <CategoryBarside elevation={2}>
              <FormControl>
                <Typography variant="h5" sx={{ color: "black" }}>Categories</Typography>
                <RadioGroup value={filterBooks}>
                  {
                    BOOK_CATEGORY?.map((category) => (
                      <FormControlLabel sx={{ fontSize: "10px" }} name="category" key={category.id} value={category.value} control={<Radio />} label={category.key} onClick={(e) => setFilterBooks(e.target.value)} />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CategoryBarside>

          </Stack>
        </Stack>

        <Stack direction="column" sx={{ width: "80%" }} >
          <TextField
            placeholder={"Search..."}
            size="small"
            name="query"
            sx={{ width: "50%", margin: "14px auto" }}
            onChange={(e) => { setQuery(e.target.value) }}
          />

          {
            (bookData.length !== 0) ? (
              <>
                <ImageList cols={3} sx={{ p: 1 }}>
                  {
                    filterData?.map((book) => (
                      <DetailsCard
                        key={book.BookISBNNumber}
                        bookname={book.BookName}
                        bookprice={book.BookPrice}
                        bookauthor={book.AuthorName}
                        bookcategory={book.CategoryName}
                        img={book.BookImage}
                        getBookDetail={() => showBookDetails(book.BookISBNNumber)}
                      />
                    ))
                  }
                </ImageList>
              </>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px" }}>
                <img src={NoData} alt="No Data found" height={"100px"} />
                <Typography>No Data Found</Typography>
              </Box>
            )
          }

        </Stack>
      </Box>
    </>
  )
}

export default Books