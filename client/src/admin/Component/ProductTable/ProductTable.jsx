import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, deleteBook } from '../../../features/bookSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, Tooltip, IconButton, TableRow, TableSortLabel, Typography } from "@mui/material";
import Pagination from "../Pagination/Pagination";

export const HEADCELLS = [
    {
        id: "book_url",
        numeric: false,
        disablePadding: false,
        label: "Image"
    },
    {
        id: 'book_name',
        numeric: false,
        disablePadding: true,
        label: 'Book Name',
    },
    {
        id: 'isbn_number',
        numeric: true,
        disablePadding: false,
        label: 'ISBN',
    },
    {
        id: 'book_price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'author_name',
        numeric: false,
        disablePadding: false,
        label: 'Author',
    },
    {
        id: 'publisher_name',
        numeric: false,
        disablePadding: false,
        label: 'Pulisher Name',
    },
    {
        id: 'book_edition',
        numeric: true,
        disablePadding: true,
        label: 'Edition',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: true,
        label: 'Category',
    }
];

// const TABLE_DATA = [
//     {
//         book_id: 1,
//         book_name: "Five Survive",
//         isbn_number: 9780008507237,
//         book_price: "₹200.50",
//         author_name: "john doe",
//         publisher_name: "Electric Monkey",
//         book_edition: "1st edition",
//         category: "self-improvement",
//         book_url: "https://m.media-amazon.com/images/I/71lkayG+yqL.jpg",
//     },
//     {
//         book_id: 2,
//         book_name: "Five Survive",
//         isbn_number: 9780008507237,
//         book_price: "₹200.50",
//         author_name: "john doe",
//         publisher_name: "Electric Monkey",
//         book_edition: "1st edition",
//         category: "self-improvement",
//         book_url: "https://m.media-amazon.com/images/I/81s2XYP2D6L.jpg",
//     },
//     {
//         book_id: 3,
//         book_name: "Five Survive",
//         isbn_number: 9780008507237,
//         book_price: "₹200.50",
//         author_name: "john doe",
//         publisher_name: "Electric Monkey",
//         book_edition: "1st edition",
//         category: "self-improvement",
//         book_url: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg",
//     }
// ]

const ProductTable = (props) => {
    const { setBookIsbn } = props;
    const dispatch = useDispatch();
    const TABLE_DATA = useSelector(state => state.book.bookdetails);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    const deleteBookRecord = (isbn) => {
        dispatch(deleteBook(isbn));
        dispatch(fetchBooks());
    }

    return (
        <>
            <TableContainer sx={{ maxHeight: 500, backgroundColor: "white", padding: "10px" }}>
                <h2>Product Table</h2>
                <Table stickyHeader >
                    <TableHead sx={{ top : 0}}>
                        <TableRow>
                            {
                                HEADCELLS?.map(head => (
                                    <TableCell key={head.id}>
                                        <TableSortLabel
                                            active={orderBy === head.id}
                                            direction={orderBy === head.id ? order : 'asc'}
                                        >
                                            {head.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            TABLE_DATA?.slice(currentPage * recordsPerPage, currentPage * recordsPerPage + recordsPerPage).map(book => (
                                <TableRow key={book.BookISBNNumber}>
                                    <TableCell>
                                        <img src={book.BookImage} alt={book.BookName} style={{ height: 110, width: 80 }} />
                                    </TableCell>
                                    <TableCell>{book.BookName}</TableCell>
                                    <TableCell>{book.BookISBNNumber}</TableCell>
                                    <TableCell>{book.BookPrice}</TableCell>
                                    <TableCell>{book.AuthorName}</TableCell>
                                    <TableCell>{book.PublisherName}</TableCell>
                                    <TableCell>{book.BookEdition}</TableCell>
                                    <TableCell>{book.CategoryName}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => setBookIsbn(book.BookISBNNumber)}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => { deleteBookRecord(book.BookISBNNumber) }}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={TABLE_DATA.length}
                rowsPerPage={recordsPerPage}
                page={currentPage}
                setPage={setCurrentPage}
                setRowsPerPage={setRecordsPerPage}
            />
        </>
    )
}

export default ProductTable